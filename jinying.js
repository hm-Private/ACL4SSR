var rule = {
  title: '金鹰资源网',
  host: 'https://jinyingzy.com',
  searchUrl: '/index.php/vod/search.html?wd=**',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: { 'User-Agent': 'Mozilla/5.0' },

  // 搜索：抓标题+详情链接，然后逐条补抓详情（封面/简介/播放地址）
  search: `js:
    let kw = (typeof KEY !== 'undefined' && KEY) ? KEY : input;
    let url = HOST + '/index.php/vod/search.html?wd=' + encodeURIComponent(kw);
    let html = request(url);
    let d = [];
    // 搜索结果中的详情页链接与标题
    let re = /href="(\\/index\\.php\\/vod\\/detail\\/id\\/\\d+\\.html[^"]*)"[\\s\\S]*?>([^<]+)<\\/a>/g;
    let m, seen = {};
    while ((m = re.exec(html)) !== null) {
      let href = m[1];
      let title = m[2].trim();
      if (seen[href]) continue;
      seen[href] = 1;

      // 进详情页补全封面/简介/播放
      let detailUrl = HOST + href;
      let dh = request(detailUrl);

      // 封面（详情页首个大图）
      let pic = '';
      let mPic = dh.match(/<img[^>]+src="([^"]+\\.(?:jpg|jpeg|png|webp))"[^>]*>/i);
      if (mPic) {
        pic = mPic[1].startsWith('http') ? mPic[1] : (HOST + mPic[1]);
      }

      // 标题（兜底：用 h1/h2 或 og:title）
      let name = title;
      let mH = dh.match(/<h1[^>]*>([^<]+)/) || dh.match(/<h2[^>]*>([^<]+)/) ||
               dh.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
      if (mH) name = (mH[1] || mH[0]).replace(/<[^>]+>/g,'').trim();

      // 简介：抓“剧情介绍：”后第一段纯文本
      let intro = '';
      let seg = dh.split('播放类型：')[0]; // 简介一般在播放列表之前
      let mIntro =
        seg.match(/剧情介绍[:：]\\s*([\\s\\S]*?)<(?:\\/p|\\/div|h\\d|ul)/i) ||
        seg.match(/剧情介绍[\\s\\S]*?<p[^>]*>([\\s\\S]*?)<\\/p>/i);
      if (mIntro) {
        intro = mIntro[1].replace(/<[^>]+>/g,'').replace(/\\s+/g,' ').trim();
      }

      // 播放源与分集：分成多个源，每个源用 $$$ 拼接，分集之间用 #
      let playFromArr = [];
      let playUrlArr  = [];

      // 以“播放类型：”切分源块
      let blocks = dh.split('播放类型：');
      blocks.shift(); // 去掉前面信息块
      if (blocks.length === 0) {
        // 兜底：不分块时全页面直接找分集
        blocks = [dh];
      }

      blocks.forEach(block => {
        // 源名：块起始的纯文本
        let sourceName = block.replace(/<[^>]+>/g,' ').trim().split(/\\s+/)[0] || '在线播放';

        // 抓“第xx集$URL”形式（含/不含 index.m3u8 都支持）
        let items = [];
        let reItem = /(第\\s*\\d+\\s*集)\\$\\s*((?:https?:)?\\/\\/[^"'<\\s]+)/g;
        let mItem;
        while ((mItem = reItem.exec(block)) !== null) {
          let ep = mItem[1].replace(/\\s+/g,'').replace('集','集');
          let u  = mItem[2];
          items.push(ep + '$' + u);
        }

        if (items.length) {
          playFromArr.push(sourceName);
          playUrlArr.push(items.join('#'));
        }
      });

      // 结果条目（直接可点进播放）
      d.push({
        title: name,
        img: pic,
        desc: intro,
        url: detailUrl,
        // 有的壳支持在搜索结果里就携带播放；不支持也没关系，进详情页会再取
        vod_play_from: playFromArr.join('$$$'),
        vod_play_url:  playUrlArr.join('$$$')
      });
    }
    setResult(d);
  `,

  // 详情：兼容一些内核需要在详情页再组装 VOD 的情况
  detail: `js:
    let html = request(input);
    let pic = (html.match(/<img[^>]+src="([^"]+\\.(?:jpg|jpeg|png|webp))"[^>]*>/i) || [,''])[1];
    if (pic && !pic.startsWith('http')) pic = HOST + pic;

    let name = (html.match(/<h1[^>]*>([^<]+)/) || html.match(/<h2[^>]*>([^<]+)/) ||
                html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) || [,''])[1] || '';
    name = name.replace(/<[^>]+>/g,'').trim();

    let seg = html.split('播放类型：')[0];
    let intro = '';
    let mIntro =
      seg.match(/剧情介绍[:：]\\s*([\\s\\S]*?)<(?:\\/p|\\/div|h\\d|ul)/i) ||
      seg.match(/剧情介绍[\\s\\S]*?<p[^>]*>([\\s\\S]*?)<\\/p>/i);
    if (mIntro) intro = mIntro[1].replace(/<[^>]+>/g,'').replace(/\\s+/g,' ').trim();

    let playFromArr = [], playUrlArr = [];
    let blocks = html.split('播放类型：'); blocks.shift(); if (!blocks.length) blocks=[html];
    blocks.forEach(block=>{
      let sourceName = block.replace(/<[^>]+>/g,' ').trim().split(/\\s+/)[0] || '在线播放';
      let items = [], m;
      let reItem = /(第\\s*\\d+\\s*集)\\$\\s*((?:https?:)?\\/\\/[^"'<\\s]+)/g;
      while ((m = reItem.exec(block)) !== null) {
        let ep = m[1].replace(/\\s+/g,'');
        items.push(ep + '$' + m[2]);
      }
      if (items.length) {
        playFromArr.push(sourceName);
        playUrlArr.push(items.join('#'));
      }
    });

    VOD = {
      vod_id: input,
      vod_name: name || input,
      vod_pic: pic || '',
      type_name: '',
      vod_year: '',
      vod_area: '',
      vod_remarks: '',
      vod_actor: '',
      vod_director: '',
      vod_content: intro || '',
      vod_play_from: playFromArr.join('$$$'),
      vod_play_url:  playUrlArr.join('$$$')
    };
  `,

  play_parse: true,   // 交给壳子解析直链（m3u8 等）
  lazy: '',
};
