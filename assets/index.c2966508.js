import{r as p,o as c,c as l,a as A,b as n,w as d,F,d as _,p as m,e as f,n as w,m as Q,f as v,g as E,h as b}from"./vendor.34da7af4.js";const y=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function u(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=u(t);fetch(t.href,o)}};y();var h=(e,r)=>{for(const[u,s]of r)e[u]=s;return e};const C={},R={class:"container"};function D(e,r,u,s,t,o){const i=p("router-view");return c(),l("div",R,[A(i)])}var U=h(C,[["render",D]]);var L="data:image/jpeg;base64,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";const W={setup(){return{logo:L,icons:[{url:"https://github.com/zkl2333",iconfont:"fa fa-github"},{url:"https://www.zkl2333.com",iconfont:"fa fa-home"},{url:"https://twitter.com/zkl2333",iconfont:"fa fa-twitter"},{url:"mailto:i@zkl2333.com",iconfont:"fa fa-envelope-o"},{url:"http://weibo.com/zkl2333",iconfont:"fa fa-weibo"}]}}},B=e=>(m("data-v-77a3e830"),e=e(),f(),e),O={id:"main"},S=["src"],I=B(()=>n("div",{class:"button"},"\u67E5\u770B\u7B80\u5386",-1)),x=B(()=>n("div",{id:"dis"},[n("p",null,"\u4F60\u597D\uFF0C\u5F88\u9AD8\u5174\u89C1\u5230\u4F60"),n("p",null,"\u6211\u53EB \u5F20\u514B\u51CC\uFF0C\u5E38\u7528 ID:zkl2333"),n("p",null,"\u662F\u4E00\u4E2A\u5F88\u83DC\u7684\u524D\u7AEF\u7231\u597D\u8005\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u627E\u5230\u6211")],-1)),M={id:"group-logo"},J=["href"],V=B(()=>n("footer",null,[n("i",{class:"fa fa-copyright"}),n("b",null,"zkl2333 2017-2021"),n("br"),n("a",{href:"https://beian.miit.gov.cn"},"\u6D59ICP\u590717004361\u53F7-1")],-1));function j(e,r,u,s,t,o){const i=p("router-link");return c(),l("div",O,[n("img",{id:"logo",src:s.logo},null,8,S),A(i,{to:"/resume"},{default:d(()=>[I]),_:1}),x,n("nav",null,[n("ul",M,[(c(!0),l(F,null,_(s.icons,a=>(c(),l("li",{key:a.url},[n("a",{href:a.url},[n("i",{class:w(a.iconfont)},null,2)],8,J)]))),128))])]),V])}var K=h(W,[["render",j],["__scopeId","data-v-77a3e830"]]),z=`# \u7B80\u5386

## \u8054\u7CFB\u65B9\u5F0F

- \u624B\u673A\uFF1A18906692313
- Email\uFF1Ai@zkl2333.com
- \u5FAE\u4FE1\u53F7\uFF1Azkl-2333

---

## \u4E2A\u4EBA\u4FE1\u606F

- \u5F20\u514B\u51CC/\u7537/1998
- \u535A\u5BA2\uFF1Ahttp://www.zkl2333.com
- Github\uFF1Ahttp://github.com/zkl2333
- \u671F\u671B\u804C\u4F4D\uFF1AWeb \u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08

---

## \u81EA\u6211\u4ECB\u7ECD

\u76EE\u524D\u5728\u4E00\u5BB6\u80FD\u6E90\u516C\u53F8\u4EFB\u804C\uFF0C\u8D1F\u8D23\u201C\u667A\u8054\u4E92\u5145\u201D\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u7684\u8BBE\u8BA1\u548C\u5F00\u53D1\uFF0C\u7535\u52A8\u6C7D\u8F66\u5145\u7535\u6869UI\u754C\u9762\u7684\u8BBE\u8BA1\u3001\u516C\u53F8\u5185\u90E8ERP\u3001OKR\u7B49\u7CFB\u7EDF\u7684\u524D\u7AEF\u5F00\u53D1\u3002 \u5728\u4E24\u5BB6\u65B0\u5A92\u4F53\u516C\u53F8\u6709\u8FC7\u5B9E\u4E60\u7ECF\u5386\uFF0C\u4E3B\u8981\u8D1F\u8D23\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4EE5\u53CA\u4F01\u4E1A\u5B98\u7F51\u3002

\u5728\u5B66\u4E60\u65B9\u9762\u672C\u4EBA\u523B\u82E6\u52AA\u529B\uFF0C\u865A\u5FC3\u597D\u5B66\uFF0C\u5BF9\u4E8E\u4E13\u4E1A\u77E5\u8BC6\u5174\u8DA3\u6D53\u539A\uFF0C\u5584\u4E8E\u601D\u8003\u548C\u5206\u6790\uFF0C\u5177\u5907\u4E00\u5B9A\u7684\u4E13\u4E1A\u77E5\u8BC6\u8FD0\u7528\u80FD\u529B\u548C\u5F88\u5F3A\u7684\u81EA\u5B66\u80FD\u529B\uFF0C\u9664\u5B66\u6821\u8BFE\u7A0B\u5916\u8FD8\u5927\u91CF\u901A\u8FC7\u7F51\u8BFE\u3001\u4E66\u7C4D\u7B49\u5E73\u53F0\u81EA\u5B66\uFF0C\u5728\u5927\u5B66\u671F\u95F4\u7684\u4F5C\u54C1\u83B7\u5F97\u4E86\u5168\u56FD\u5E94\u7528\u578B\u4EBA\u624D\u5927\u8D5B\u51B3\u8D5B\u4E8C\u7B49\u5956\u3002\u66FE\u62C5\u4EFB\u5B66\u6821\u7684\u521B\u65B0\u521B\u4E1A\u90E8\u8F6F\u4EF6\u7EC4\u7684\u7EC4\u957F\uFF0C\u5DE5\u4F5C\u8BA4\u771F\u8D1F\u8D23\u3002\u5E76\u5728\u5047\u671F\u591A\u6B21\u5728\u76F8\u5173\u4F01\u4E1A\u5B9E\u4E60\u3002

---

## \u5DE5\u4F5C\u7ECF\u5386

### \u676D\u5DDE\u84DD\u5DDD\u79D1\u6280\u6709\u9650\u516C\u53F8 \uFF082021 \u5E74 3 \u6708 \uFF5E \u81F3\u4ECA\uFF09

- #### \u8D1F\u8D23\u7535\u5546sass\u7C7B\u7684\u5C0F\u7A0B\u5E8F\u4EE5\u53CAweb\u5F00\u53D1\u3002

### \u6D59\u6C5F\u667A\u5145\u7535\u529B\u79D1\u6280\u6709\u9650\u516C\u53F8 ( 2019 \u5E74 12 \u6708 ~ 2021 \u5E74 3 \u6708)

- #### \u201C\u667A\u8054\u4E92\u5145\u201D\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F

  \u4ECE\u65E0\u5230\u6709\uFF0C\u524D\u7AEF\u90E8\u5206\u5355\u4EBA\u72EC\u7ACB\u5F00\u53D1\u7684\u5C0F\u7A0B\u5E8F\uFF0C\u5305\u542B\u626B\u7801\u3001\u6D3B\u52A8\u9875\u3001\u652F\u4ED8\u7B49\u5C0F\u7A0B\u5E8F\u5E38\u7528\u529F\u80FD\u3002

  - \u65E9\u671F\u7248\u672C\u4F7F\u7528\u539F\u751F\u5F00\u53D1\uFF0C\u53C8\u7528 gulp \u7F16\u5199\u4E86\u4E00\u5957\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u81EA\u52A8\u5316\u65B9\u6848\uFF0C\u6253\u5305\u7F16\u8BD1\u538B\u7F29 scss \u7B49\u6E90\u7801\uFF0C\u5E76\u4F7F\u7528 Git Submodule \u7EF4\u62A4\u5916\u90E8\u4F9D\u8D56\u3002
  - \u540E\u671F\u7248\u672C\u4F7F\u7528 uni-app \u5B8C\u5168\u91CD\u6784\uFF0C\u8E29\u4E86\u4E00\u904D\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4EE5\u53CA\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u7684\u5DEE\u5F02\uFF0C\u8FBE\u6210\u4E00\u5957\u4EE3\u7801\u591A\u7AEF\u53D1\u5E03\u3002

- #### \u7248\u672C\u7BA1\u7406\u6539\u9769

  - \u6211\u63A8\u52A8\u4E86\u516C\u53F8\u5185\u90E8\u7248\u672C\u7BA1\u7406\u5DE5\u5177\u7684\u6539\u9769\uFF0C\u5728\u53D1\u73B0 SVN \u5728\u524D\u7AEF\u4EE3\u7801\u7684\u7248\u672C\u7BA1\u7406\u4E0A\u6709\u4E0D\u8DB3\u540E\uFF0C\u5728\u56E2\u961F\u4E2D\u63A8\u5E7F Git \u6765\u7BA1\u7406\u4EE3\u7801\u3002\u5E76\u8D1F\u8D23\u642D\u5EFA\u548C\u7EF4\u62A4\u4E86\u4E00\u5957\u5185\u7F51\u7684 Git \u670D\u52A1\u3002

- #### \u5185\u90E8 ERP \u7CFB\u7EDF\u7684\u524D\u7AEF\u90E8\u5206\u81EA\u4E3B\u7814\u53D1

  \u4ECE\u65E0\u5230\u6709\uFF0C\u524D\u7AEF\u90E8\u5206\u5355\u4EBA\u72EC\u7ACB\u5F00\u53D1\u3002\u7CFB\u7EDF\u4F7F\u7528 VUE + ElementUI\u3002\u6211\u5206\u6790\u4E1A\u52A1\u62BD\u79BB\u6A21\u5757\uFF0C\u901A\u8FC7\u7F16\u5199\u4E86\u5F88\u591A\u901A\u7528\u7EC4\u4EF6\uFF0C\u7528\u642D\u79EF\u6728\u7684\u65B9\u5F0F\u53EF\u5FEB\u901F\u5B8C\u6210\u4E1A\u52A1\u4EE3\u7801\u7684\u7F16\u5199\u3002\u65B0\u9700\u6C42\u4EA7\u751F\u540E\u51E0\u5206\u949F\u5C31\u53EF\u4EE5\u642D\u5EFA\u51FA\u5BF9\u5E94\u7684\u4E1A\u52A1\u9875\u9762\u3002
  
  - \u7F16\u5199\u901A\u7528\u589E\u5220\u6539\u67E5\u7EC4\u4EF6\uFF0C\u540E\u7AEF\u4F7F\u7528\u5DE5\u5177\u5BFC\u51FA\u63A5\u53E3\u7C7B\u578B\u4F20\u7ED9\u524D\u7AEF\uFF0C\u524D\u7AEF\u52A8\u6001\u521B\u5EFA\u5217\u8868\u4EE5\u53CA\u7F16\u8F91\u754C\u9762\u3002
  - \u5C01\u88C5\u7F51\u7EDC\u8BF7\u6C42\u6A21\u5757\uFF0C\u5B9E\u73B0\u63A5\u53E3\u6309\u9700\u7F13\u5B58\u3001\u81EA\u52A8\u7EED\u7B7E TOKEN \u7B49\u529F\u80FD\u3002
  - \u8BBE\u8BA1\u591A\u5C42\u591A\u7EA7\u7684\u6743\u9650\u7CFB\u7EDF\uFF0C\u914D\u5408\u540E\u7AEF\u5B9E\u73B0\uFF1A\u89D2\u8272\u3001\u5B50\u7CFB\u7EDF\u3001\u83DC\u5355\u9879\u3001\u9875\u9762\u3001\u6570\u636E\u5217\u3001\u6570\u636E\u70B9\u7B49\u529F\u80FD\u3002
  - \u4F7F\u7528\u5185\u7F51\u7A7F\u900F\u6253\u901A\u4E86\u90E8\u5206\u9875\u9762\uFF0C\u4F7F\u9500\u552E\u4EBA\u5458\u5728\u8131\u79BB\u5185\u7F51\u7684\u60C5\u51B5\u4E0B\u53EF\u4EE5\u4F7F\u7528\u7CFB\u7EDF\u3002

---
## \u5B9E\u4E60\u7ECF\u5386

### \u6052\u8363\u516C\u53F8 \uFF08 2018 \u5E74 2 \u6708 ~ 2018 \u5E74 9 \u6708 \uFF09

- #### \u5F20\u4EC1\u4E9A\u515A\u7AE0\u5B66\u5802\u9879\u76EE

  \u6211\u5728\u6B64\u9879\u76EE\u4E2D\u8D1F\u8D23 psd \u8BBE\u8BA1\u56FE\u5230 HTML \u4EE3\u7801\u7684\u5207\u56FE\u5DE5\u4F5C\u3002

- #### \u519C\u4FE1\u793E\u9879\u76EE

  \u6211\u5728\u6B64\u9879\u76EE\u53C2\u4E0E\u4E86\u8BE5\u516C\u4F17\u53F7\u4E2D\u8425\u4E1A\u7F51\u70B9\u5230\u5730\u56FE\u7684\u6620\u5C04\u4EE3\u7801\u4F18\u5316\uFF0C\u89E3\u51B3\u4E86\u7F29\u653E\u5730\u56FE\u9020\u6210\u7684\u5B9A\u4F4D\u70B9\u6F02\u79FB\u548C\u5B57\u4F53\u7F29\u653E\u3002

- #### \u5317\u4ED1\u73AF\u4FDD\u5C0F\u7A0B\u5E8F

  \u6211\u5728\u6B64\u9879\u76EE\u53C2\u4E0E\u4E86\u5C0F\u7A0B\u5E8F\u7684\u5E94\u7528\u67B6\u6784\u3001\u63A5\u53E3\u8BBE\u8BA1\u3001\u63A5\u53E3\u5BF9\u63A5\u3001\u524D\u7AEF\u4EE3\u7801\u7F16\u5199\u7B49\u5DE5\u4F5C\u3002

- #### Nginx \u7B80\u5355\u7EF4\u62A4

  \u5411\u4E3B\u7BA1\u63A8\u8350\u4E86 Nginx\uFF0C\u5B9E\u73B0\u5728 window server \u4E0A\u7ED1\u5B9A\u591A\u4E2A\u57DF\u540D\u90E8\u7F72\u591A\u4E2A\u5C0F\u7A0B\u5E8F\u3002\u5728\u5DE5\u4F5C\u671F\u95F4\u8D1F\u8D23\u7EF4\u62A4 Nginx \u670D\u52A1\u7684\u7A33\u5B9A\uFF0C\u7F16\u5199\u4E86\u7B80\u5355\u9760\u8C31\u5B9E\u7528\u7684\u914D\u7F6E\u6587\u4EF6\u3002\u6539\u53D8\u4E86\u539F\u6709\u90E8\u7F72\u4E00\u4E2A\u5C0F\u7A0B\u5E8F\u4E70\u4E00\u53F0\u670D\u52A1\u5668\u7684\u65E7\u65B9\u5F0F\u3002

### \u653F\u5174\u65B0\u5A92\u4F53 ( 2019 \u5E74 2 \u6708 ~ 2019 \u5E74 9 \u6708)

- \u8D1F\u8D23\u4E24\u4E2A\u4F01\u4E1A\u7F51\u7AD9\u3001\u4E00\u4E2A\u5546\u57CE\u7C7B\u5C0F\u7A0B\u5E8F\u7684\u642D\u5EFA\u3002
- \u8DDF\u968F\u56E2\u961F\u7ECF\u5386\u4E86\u4E00\u6B21\u975E\u5E38\u5927\u578B\u7684\u5C55\u4F1A\u3001\u53D1\u5E03\u4F1A\u7684\u7B56\u5212\uFF0C\u53C2\u4E0E\u5C55\u4F1A\u7684\u5404\u5730\u7ECF\u9500\u5546\u4EE5\u53CA\u5458\u5DE5\u4EBA\u6570\u8D85\u8FC7\u4E09\u5343\u4EBA\u3002\u5728\u6B64\u671F\u95F4\u5B66\u4F1A\u4E86\u5F88\u591A\u5173\u4E8E\u5F85\u4EBA\u5904\u4E8B\u3001\u6C9F\u901A\u80FD\u529B\u4EE5\u53CA\u56E2\u961F\u7CBE\u795E\u65B9\u9762\u7684\u9053\u7406\u3002

---

## \u5F00\u6E90\u9879\u76EE\u548C\u4F5C\u54C1

- \u5FAE\u4FE1\u4E0A\u5899\u9879\u76EE

  <img src="https://s2.ax1x.com/2019/10/18/Ke8ilR.md.jpg" height="200" alt="\u622A\u56FE" style="display: block"/>
  \u4E3A 2017 \u7EA7\u65B0\u751F\u665A\u4F1A\u5236\u4F5C\u7684\u5FAE\u4FE1\u4E0A\u5899\u9879\u76EE\uFF0C\u5168\u6808\u9879\u76EE\u3002

  \u5927\u5C4F\u5E55\u524D\u7AEF\u4F7F\u7528\u4E86\u539F\u751F js\uFF0C\u8F6E\u8BE2\u670D\u52A1\u5668\u83B7\u53D6\u6570\u636E\uFF0C\u670D\u52A1\u5668\u4F7F\u7528\u4E86 thinkPHP \u6846\u67B6\u3002

  \u624B\u673A\u7AEF\u53D1\u9001\u6D88\u606F\u53EF\u4EE5\u6295\u9001\u5230\u5927\u5C4F\u5E55\uFF08\u63A5\u5165\u4E86\u5173\u952E\u5B57\u8FC7\u6EE4\u4EE5\u53CA\u57FA\u4E8E\u817E\u8BAF\u6587\u667A\u8BED\u4E49\u8BC6\u522B\u7684\u5783\u573E\u8BDD\u8FC7\u6EE4\uFF09\uFF0C\u8FD8\u6709\u8282\u76EE\u7684\u62A5\u5E55\u3002

- [MyDays (https://github.com/zkl2333/MyDays)](https://github.com/zkl2333/MyDays)\uFF1A\u4E00\u4E2A\u7B80\u5355\u7684\u8BB0\u5F55\u7EAA\u5FF5\u65E5\u7684\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3002

- [start (https://github.com/zkl2333/start)](https://github.com/zkl2333/start)\uFF1A\u4E00\u4E2A\u7B80\u5355\u7684\u7F51\u5740\u5BFC\u822A\uFF0C\u652F\u6301\u62D6\u62FD\u4EE5\u53CA\u7F16\u8F91\uFF0C\u4F7F\u7528\u672C\u5730 indexedDB \u672C\u5730\u5B58\u50A8\u6570\u636E\u3002

- [clarity (https://github.com/zkl2333/wxapp-clarity)](https://github.com/zkl2333/wxapp-clarity)\uFF1A\u4E00\u4E2A\u5C55\u793A\u676D\u5DDE\u672C\u5730\u6C34\u8D28\u53CA\u6C14\u8C61\u4FE1\u606F\u7684\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\uFF0C\u6B64\u9879\u76EE\u83B7\u5F97\u4E86\u201C\u5168\u56FD\u5E94\u7528\u578B\u4EBA\u624D\u5927\u8D5B\u201D\u7684\u4E8C\u7B49\u5956\u3002

- [web-love (https://github.com/zkl2333/web-love)](https://github.com/zkl2333/web-love)\uFF1A\u6A21\u4EFF\u6296\u97F3\u706B\u4E86\u4E00\u6BB5\u65F6\u95F4\u7684\u8868\u767D\u6548\u679C\u5236\u4F5C\u4E86\u4E00\u4E2A\u9875\u9762\uFF0C\u540E\u7AEF\u4F7F\u7528 node \u8FDE\u63A5 MySql \u5236\u4F5C\u3002

- [home-page (https://github.com/zkl2333/home-page)](https://github.com/zkl2333/home-page)\uFF1A\u7ED9\u81EA\u5DF1\u5199\u7684\u4E00\u4E2A\u7B80\u5355\u7684\u4E2A\u4EBA\u4E3B\u9875\uFF0C\u57FA\u4E8E\u6B64\u6A21\u677F\u53EF\u4EE5\u5FEB\u901F\u90E8\u7F72\u4E00\u4E2A\u7B80\u7EA6\u7684\u4E2A\u4EBA\u4E3B\u9875\u3002

- [aida64-to-json (https://github.com/zkl2333/aida64-to-json)](https://github.com/zkl2333/aida64-to-json)\uFF1A\u5F53\u8BBE\u7F6E aida64 \u5C06\u4F20\u611F\u5668\u6570\u636E\u5199\u5165\u6CE8\u518C\u8868\u65F6\uFF0C\u8BFB\u53D6\u6CE8\u518C\u8868\u4E2D\u7684\u4F20\u611F\u5668\u53C2\u6570\u5E76\u683C\u5F0F\u5316

## \u6280\u80FD\u6E05\u5355

\u4EE5\u4E0B\u4E3A\u6211\u5B66\u4E60\u8FC7\u7684\u6280\u80FD

- Web \u5F00\u53D1\uFF1Ahtml/css/javascript
- \u5C0F\u7A0B\u5E8F\uFF1A\u5FAE\u4FE1\u539F\u751F\u5C0F\u7A0B\u5E8F\u3001uni-app
- \u524D\u7AEF\u6846\u67B6\uFF1ABootstrap/vue
- \u684C\u9762\u7AEF\u6846\u67B6\uFF1Aelectron
- \u524D\u7AEF\u5DE5\u5177\uFF1Awebpack/Gulp/SaSS
- \u7248\u672C\u7BA1\u7406\uFF1AGit
- \u670D\u52A1\u5668\uFF1A\u7B80\u5355\u7684 Linux \u64CD\u4F5C\u3001nginx \u914D\u7F6E\u3001docker\u3001pm2

___

## \u5B66\u5386\uFF1A\u4E13\u79D1/\u6D59\u6C5F\u957F\u5F81\u804C\u4E1A\u6280\u672F\u5B66\u9662 \u8BA1\u7B97\u673A\u5E94\u7528\u4E13\u4E1A

---
## \u81F4\u8C22

\u611F\u8C22\u60A8\u82B1\u65F6\u95F4\u9605\u8BFB\u6211\u7684\u7B80\u5386\uFF0C\u671F\u5F85\u80FD\u6709\u673A\u4F1A\u548C\u60A8\u5171\u4E8B\u3002
`;const N={setup(){function e(){window.print()}return{resume:Q.exports.marked(z),print:e}}},g=e=>(m("data-v-0c1e36e8"),e=e(),f(),e),H={id:"resume"},G=g(()=>n("div",{class:"button"},"\u8FD4\u56DE",-1)),P=["innerHTML"],X=g(()=>n("div",{class:"button"},"\u8FD4\u56DE",-1));function Z(e,r,u,s,t,o){const i=p("router-link");return c(),l("div",H,[A(i,{to:"/"},{default:d(()=>[G]),_:1}),n("div",{class:"button",onClick:r[0]||(r[0]=(...a)=>s.print&&s.print(...a))},"\u6253\u5370"),n("section",{class:"markdown-body",innerHTML:s.resume},null,8,P),A(i,{to:"/"},{default:d(()=>[X]),_:1})])}var T=h(N,[["render",Z],["__scopeId","data-v-0c1e36e8"]]);const q=[{path:"/",component:K},{path:"/resume",component:T}],Y=v({history:E(),routes:q}),k=b(U);k.use(Y);k.mount("#app");
