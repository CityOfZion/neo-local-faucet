!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=10)}([function(e,t){e.exports=require("styled-components")},function(e,t){e.exports=require("react")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=process.env.NEO_REWARD||100,a=process.env.GAS_REWARD||2e3,o=function(e){var t=!1,n=!1;return e.forEach(function(e){"NEO"===e.asset&&(t=e.amount>=r),"GAS"===e.asset&&(n=e.amount>=a)}),t&&n};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){var t=e.body,n=e.styles,r=e.title;return'\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n      <title>'.concat(r,"</title>\n      ").concat(n,'\n      <link rel="stylesheet" type="text/css" href="https://unpkg.com/antd/dist/antd.min.css">\n      <link rel="shortcut icon" href="/assets/favicon.ico">\n    </head>\n    <body style="margin:0; background-color:#fff;">\n      <div id="app">').concat(t,"</div>\n    </body>\n  </html>\n")};t.default=r},function(e,t){e.exports=require("antd")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(1)),a=(o(n(0)),n(4));function o(e){return e&&e.__esModule?e:{default:e}}var u=a.Layout.Header,s=a.Layout.Content,c=a.Layout.Footer,l=(a.Layout.Sider,function(e){return r.default.createElement(a.Layout,null,r.default.createElement(u,{style:{textAlign:"center",backgroundColor:"#f0f2f5"}},r.default.createElement("h1",null,"⛽ NEO Privatenet Faucet")),r.default.createElement(s,{style:{padding:"0 50px"}},r.default.createElement(a.Layout,null,r.default.createElement(s,{style:{backgroundColor:"#ffffff",padding:32,minHeight:"calc(100vh - 133px)"}},r.default.createElement(a.Row,null,r.default.createElement(a.Col,{xs:{span:20,push:2},md:{span:16,push:4},lg:{span:12,push:6},xl:{span:8,push:8}},r.default.createElement("h2",null,"Current block height: ",e.blockHeight),e.faucetStatus?r.default.createElement(a.Alert,{message:"Faucet status: healthy",type:"success",showIcon:!0}):r.default.createElement(a.Alert,{message:"Faucet status: not healthy",type:"error",showIcon:!0}))),r.default.createElement(a.Row,null,r.default.createElement(a.Col,{xs:{span:20,push:2},md:{span:16,push:4},lg:{span:12,push:6},xl:{span:8,push:8}},r.default.createElement(a.Alert,{message:"Ready for refill",description:"Your address hasn't used the faucet recently, you're good to go.",type:"success",showIcon:!0})))))),r.default.createElement(c,{style:{textAlign:"center"}},"Made by City Of Zion"))});t.default=l},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";n(9);var r=f(n(8)),a=f(n(1)),o=n(7),u=n(0),s=n(6),c=f(n(5)),l=f(n(3)),i=f(n(2));function f(e){return e&&e.__esModule?e:{default:e}}var d=(0,r.default)(),p=process.env.NEOSCAN||"localhost",h=process.env.NEOSCAN_IP||4e3,v=(process.env.MIN_BLOCK,process.env.FAUCET_ADDRESS||"AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y"),m=process.env.PORT||4002;process.env.NEO_REWARD,process.env.GAS_REWARD;d.use("/assets",r.default.static("assets")),d.get("/",function(){var e,t=(e=regeneratorRuntime.mark(function e(t,n){var r,f,d,m,y,g,E,x,_,b;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=new u.ServerStyleSheet,e.next=3,(0,s.get)("http://".concat(p,":").concat(h,"/api/main_net/v1/get_balance/").concat(v));case 3:return f=e.sent,d=f.data,m=d.balance.map(function(e){return delete e.unspent,e}),y=(0,i.default)(m),e.next=9,(0,s.get)("http://".concat(p,":").concat(h,"/api/main_net/v1/get_height"));case 9:g=e.sent,E=g.data.height,x=(0,o.renderToString)(r.collectStyles(a.default.createElement(c.default,{faucetStatus:y,blockHeight:E}))),_=r.getStyleTags(),b="NEO faucet",n.send((0,l.default)({body:x,styles:_,title:b}));case 15:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e,t){try{var n=o[e](t),u=n.value}catch(e){return void a(e)}n.done?r(u):Promise.resolve(u).then(s,c)}function s(e){u("next",e)}function c(e){u("throw",e)}s()})});return function(e,n){return t.apply(this,arguments)}}()),d.get("/check/:addr",function(e,t){}),d.listen(m),console.log("Serving at http://localhost:".concat(m))}]);