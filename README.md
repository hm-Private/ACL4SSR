# A订阅转换前端

## 项目地址

普通前端： https://github.com/CareyWang/sub-web

订阅转换前端增强版:https://github.com/youshandefeiyang/sub-web-modify
(此版本可能端口8090)

## 安装前端

# 安装 node.js 和 yarn

需要先更新系统并安装 Node.js 和 Yarn （ubuntu/debina 为例，安装的是 14.x 版本，其他版本自行替换）

全版本 node.js 安装：https://github.com/nodesource/distributions/blob/master/README.md

``` bash
apt update -y
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install –g yarn
```

然后查看版本号，如果安装成功即会返回版本号

``` bash
node -v
yarn -version
```

## 安装程序

先 git clone 拉取项目（我放在了 /home 路径下）

``` bash
cd /home
git clone https://github.com/CareyWang/sub-web.git
cd sub-web
```

然后开始构建，时间较长，耐性等待

``` bash
yarn install
```

然后

``` bash
yarn serve
```

浏览器访问 http:// 你的 ip:8080/ 就可以看到前端预览了，宝塔要记得在安全里放行 8080 端口
然后 ctrl+c 停止程序
我们需要找到 Subconverter.vue 文件修改一下默认后端地址

``` bash
cd /home/sub-web/src/views
```

然后打开 Subconverter.vue （用 vi 打开，宝塔打开，finalshell 等带 ftp 功能的打开均可）
修改第 258 行的 backendOptions，将其改为你刚刚解析的后端的地址，需要加上 https
此外你还可以修改并添加更多的后端地址，格式如下比如：

``` bash
customBackend: {
          "EdNovas自用后端": "https://subsc.ednovas.xyz/sub?",
          "api.tsutsu.cc (つつ提供-国内裸奔小鸡)": "http://api.tsutsu.cc:520/sub?",
          "api2.tsutsu.cc (つつ提供-香港稳定)": "https://api2.tsutsu.cc/sub?",
          "api.v1.mk（肥羊提供-四端八核负载)": "https://api.v1.mk/sub?",
          "subcon.dlj.tf (subconverter作者提供) ": "https://subcon.dlj.tf/sub?",
          "api.dler.io (sub作者&lhie1提供)": "https://api.dler.io/sub?",
          "api.wcc.best (sub-web作者提供)": "https://api.wcc.best/sub?",
          "api.hope140.live (hope提供-vercel)": "https://api.hope140.live/sub?",
          "sub.proxypoolv2.tk (Allen Xu提供-vercel)": "https://sub.proxypoolv2.tk/sub?",
          "jp-aws.proxypoolv2.tk (Allen Xu提供-日本AWS）": "http://jp-aws.proxypoolv2.tk:25500/sub?",
          "sub.id9.cc (品云提供)": "https://sub.id9.cc/sub?",
        },
        backendOptions: [
          { value: "https://subsc.ednovas.xyz/sub?" },
          { value: "http://api.tsutsu.cc:520/sub?" },
          { value: "https://api2.tsutsu.cc/sub?" },
          { value: "https://api.v1.mk/sub?" },
          { value: "https://subcon.dlj.tf/sub?" },
          { value: "https://api.dler.io/sub?" },
          { value: "https://api.wcc.best/sub?" },
          { value: "https://api.hope140.live/sub?" },
          { value: "https://sub.proxypoolv2.tk/sub?" },
          { value: "https://sub.id9.cc/sub?" },
        ],
```

![Snipaste_2021-06-06_21-20-02](https://github.com/hm-Private/ACL4SSR/assets/67125126/b71e681c-7273-4a3a-931b-d9c7f325eacb)


然后修改下面的 remoteConfig 为以下内容（这个订阅转换比默认更好用）

``` bash
{
label: "ACL4SSR",
options: [
    {
    label: "ACL4SSR_Online 默认版 分组比较全 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini"
    },
    {
    label: "ACL4SSR_Online_AdblockPlus 更多去广告 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini"
    },
    {
    label: "ACL4SSR_Online_NoAuto 无自动测速 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini"
    },
    {
    label: "ACL4SSR_Online_NoReject 无广告拦截规则 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini"
    },
    {
    label: "ACL4SSR_Online_Mini 精简版 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini"
    },
    {
    label: "ACL4SSR_Online_Mini_AdblockPlus.ini 精简版 更多去广告 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini"
    },
    {
    label: "ACL4SSR_Online_Mini_NoAuto.ini 精简版 不带自动测速 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini"
    },
    {
    label: "ACL4SSR_Online_Mini_Fallback.ini 精简版 带故障转移 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini"
    },
    {
    label: "ACL4SSR_Online_Mini_MultiMode.ini 精简版 自动测速、故障转移、负载均衡 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini"
    },
    {
    label: "ACL4SSR_Online_Full 全分组 重度用户使用 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini"
    },
    {
    label: "ACL4SSR_Online_Full_NoAuto.ini 全分组 无自动测速 重度用户使用 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini"
    },
    {
    label: "ACL4SSR_Online_Full_AdblockPlus 全分组 重度用户使用 更多去广告 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini"
    },
    {
    label: "ACL4SSR_Online_Full_Netflix 全分组 重度用户使用 奈飞全量 (与Github同步)",
    value:
        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini"
    },
    {
    label: "ACL4SSR 本地 默认版 分组比较全",
    value: "config/ACL4SSR.ini"
    },
    {
    label: "ACL4SSR_Mini 本地 精简版",
    value: "config/ACL4SSR_Mini.ini"
    },
    {
    label: "ACL4SSR_Mini_NoAuto.ini 本地 精简版+无自动测速",
    value: "config/ACL4SSR_Mini_NoAuto.ini"
    },
    {
    label: "ACL4SSR_Mini_Fallback.ini 本地 精简版+fallback",
    value: "config/ACL4SSR_Mini_Fallback.ini"
    },
    {
    label: "ACL4SSR_BackCN 本地 回国",
    value: "config/ACL4SSR_BackCN.ini"
    },
    {
    label: "ACL4SSR_NoApple 本地 无苹果分流",
    value: "config/ACL4SSR_NoApple.ini"
    },
    {
    label: "ACL4SSR_NoAuto 本地 无自动测速 ",
    value: "config/ACL4SSR_NoAuto.ini"
    },
    {
    label: "ACL4SSR_NoAuto_NoApple 本地 无自动测速&无苹果分流",
    value: "config/ACL4SSR_NoAuto_NoApple.ini"
    },
    {
    label: "ACL4SSR_NoMicrosoft 本地 无微软分流",
    value: "config/ACL4SSR_NoMicrosoft.ini"
    },
    {
    label: "ACL4SSR_WithGFW 本地 GFW列表",
    value: "config/ACL4SSR_WithGFW.ini"
    },
    {
    label: "NeteaseUnblock(仅规则，No-Urltest)",
    value: "https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/special/netease.ini"
    }
]
},
```

替换到哪里呢，到 334 行这里


![Snipaste_2021-06-06_21-25-49](https://github.com/hm-Private/ACL4SSR/assets/67125126/efaaa633-5e82-40a6-9ff6-30767f96edd4)


全部替换掉

然后替换完成后可以看看效果

``` bash
yarn serve
```

然后还是访问之前的 ip + 端口页面

![Snipaste_2021-06-06_21-31-25](https://github.com/hm-Private/ACL4SSR/assets/67125126/90725cae-1a80-4539-9c7c-fd51e1913e4b)

然后还是 ctrl+c 停止调试页面，然后打包程序

``` bash
yarn build
```

然后就会在 /home/sub-web 下生成一个 dist 目录，网页信息就都在里面了。如果需要修改配置可以直接在该文件下改，或者删除改目录，然后 build 重建

## 宝塔安装网站

这里是用的 aapanel，已经安装了 lnmp 环境

添加网站，输入你的域名，然后最下面的 ssl 和 https 强制跳转打勾

然后等待片刻网站创建完毕后，进入网站根目录，删除所有文件，user.ini 的防跨站文件不用管他

然后去 /home/sub-web/dist 目录下复制所有文件粘贴到网站根目录

这个时候访问你的前端地址就有刚刚调试的一样的内容了
