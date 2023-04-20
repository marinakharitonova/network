"use strict";(self.webpackChunknetwork_t=self.webpackChunknetwork_t||[]).push([[855],{60855:function(e,t,n){n.r(t),n.d(t,{default:function(){return be}});var o=n(29439),r=n(78792),i=n(73649),a=n(95811),l=n(27183),c=n(57689),s=n(11087),u=n(72791),d=n(63263),f=n(95635),p=n(20451),m=n(80184),g=function(e){var t=e.user,n=e.page,u=e.pageSize,g=(0,l.C)(d.H),v=(0,c.s0)(),h=(0,p.ov)(),y=(0,o.Z)(h,1)[0],b="/profile/".concat(t.id),Z=(0,f.Z)(),x=g&&g.id===t.id;return(0,m.jsx)(r.ZP.Item,{style:{minHeight:"73px"},actions:x?void 0:[(0,m.jsx)(i.Z,{type:"primary",onClick:function(){g?Z(y({userId:t.id,isFollowed:t.followed,page:n,pageSize:u})):v("/login")},children:t.followed?"Unfollow":"Follow"})],children:(0,m.jsx)(r.ZP.Item.Meta,{avatar:(0,m.jsx)(a.Z,{src:t.photos.small,size:40},t.id),title:(0,m.jsx)(s.rU,{to:b,children:t.name}),description:t.status})})},v=(0,u.memo)(g),h=function(e){var t=e.users,n=e.page,o=e.pageSize,i=e.isFetching?{opacity:.5,transition:"opacity 0.3s"}:{opacity:1,transition:"opacity 0.3s"};return(0,m.jsx)(r.ZP,{itemLayout:"horizontal",dataSource:t,renderItem:function(e){return(0,m.jsx)(v,{user:e,page:n,pageSize:o})},style:i,"data-testid":"users-list"})},y=n(55207),b=n(56399),Z=n(87462),x=n(4942),w=n(81694),S=n.n(w),E=n(71929),C=n(59373),k=n(55564),B=n(89922),O=n(55307),z=n(67521),I=n(18303),j=function(e){var t,n=e.componentCls,o=e.floatButtonSize,r=e.motionDurationSlow,i=e.motionEaseInOutCirc,a=n+"-group",l=new C.Keyframes("antFloatButtonMoveDownIn",{"0%":{transform:"translate3d(0, "+o+"px, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),c=new C.Keyframes("antFloatButtonMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, "+o+"px, 0)",transformOrigin:"0 0",opacity:0}});return[(0,x.Z)({},a+"-wrap",(0,Z.Z)({},(0,I.R)(a+"-wrap",l,c,r,!0))),(0,x.Z)({},a+"-wrap",(t={},(0,x.Z)(t,"\n          &"+a+"-wrap-enter,\n          &"+a+"-wrap-appear\n        ",{opacity:0,animationTimingFunction:i}),(0,x.Z)(t,"&"+a+"-wrap-leave",{animationTimingFunction:i}),t))]},N=function(e){var t,n,o,r=e.componentCls,i=e.floatButtonSize,a=e.margin,l=e.borderRadius,c=r+"-group";return o={},(0,x.Z)(o,c,(0,Z.Z)((0,Z.Z)({},(0,z.Wf)(e)),(t={zIndex:99,display:"block",border:"none",position:"fixed",width:i,height:"auto",boxShadow:"none",minHeight:i,insetInlineEnd:e.floatButtonInsetInlineEnd,insetBlockEnd:e.floatButtonInsetBlockEnd,borderRadius:e.borderRadius},(0,x.Z)(t,c+"-wrap",{zIndex:-1,display:"block",position:"relative",marginBottom:a}),(0,x.Z)(t,"&&-rtl",{direction:"rtl"}),(0,x.Z)(t,r,{position:"static"}),t))),(0,x.Z)(o,c+"-circle",(0,x.Z)({},r+"-circle:not(:last-child)",(0,x.Z)({marginBottom:e.margin},r+"-body",{width:i,height:i}))),(0,x.Z)(o,c+"-square",(n={},(0,x.Z)(n,r+"-square",{borderRadius:0,padding:0,"&:first-child":{borderStartStartRadius:l,borderStartEndRadius:l},"&:last-child":{borderEndStartRadius:l,borderEndEndRadius:l},"&:not(:last-child)":{borderBottom:e.lineWidth+"px "+e.lineType+" "+e.colorSplit}}),(0,x.Z)(n,c+"-wrap",(0,x.Z)({display:"block",borderRadius:l,boxShadow:e.boxShadowSecondary,overflow:"hidden"},r+"-square",(0,x.Z)({boxShadow:"none",marginTop:0,borderRadius:0,padding:e.paddingXXS,"&:first-child":{borderStartStartRadius:l,borderStartEndRadius:l},"&:last-child":{borderEndStartRadius:l,borderEndEndRadius:l},"&:not(:last-child)":{borderBottom:e.lineWidth+"px "+e.lineType+" "+e.colorSplit}},r+"-body",{width:i-2*e.paddingXXS,height:i-2*e.paddingXXS}))),n)),(0,x.Z)(o,c+"-circle-shadow",{boxShadow:"none"}),(0,x.Z)(o,c+"-square-shadow",(0,x.Z)({boxShadow:e.boxShadowSecondary},r+"-square",(0,x.Z)({boxShadow:"none",padding:e.paddingXXS},r+"-body",{width:i-2*e.paddingXXS,height:i-2*e.paddingXXS}))),o},R=function(e){var t,n,o,r=e.componentCls,i=e.floatButtonIconSize,a=e.floatButtonSize;return o={},(0,x.Z)(o,r,(0,Z.Z)((0,Z.Z)({},(0,z.Wf)(e)),(0,x.Z)({border:"none",position:"fixed",cursor:"pointer",overflow:"hidden",zIndex:99,display:"block",justifyContent:"center",alignItems:"center",width:a,height:a,insetInlineEnd:e.floatButtonInsetInlineEnd,insetBlockEnd:e.floatButtonInsetBlockEnd,boxShadow:e.boxShadowSecondary,"&-pure":{position:"relative",inset:"auto"},"&:empty":{display:"none"}},r+"-body",(0,x.Z)({width:a,height:a,display:"flex",justifyContent:"center",alignItems:"center",transition:"all "+e.motionDurationMid},r+"-content",(0,x.Z)({overflow:"hidden",textAlign:"center",minHeight:a,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"2px 4px"},r+"-icon",{textAlign:"center",margin:"auto",width:i,fontSize:i,lineHeight:1}))))),(0,x.Z)(o,r+"-circle",(0,x.Z)({height:a,borderRadius:"50%"},r+"-body",{borderRadius:"50%"})),(0,x.Z)(o,r+"-square",(0,x.Z)({height:"auto",minHeight:a,borderRadius:e.borderRadius},r+"-body",{height:"auto",borderRadius:e.borderRadiusSM})),(0,x.Z)(o,r+"-default",(0,x.Z)({backgroundColor:e.floatButtonBackgroundColor,transition:"background-color "+e.motionDurationMid},r+"-body",(0,x.Z)({backgroundColor:e.floatButtonBackgroundColor,transition:"background-color "+e.motionDurationMid,"&:hover":{backgroundColor:e.colorFillContent}},r+"-content",(t={},(0,x.Z)(t,r+"-icon",{color:e.colorText}),(0,x.Z)(t,r+"-description",{display:"flex",alignItems:"center",lineHeight:e.fontSizeLG+"px",color:e.colorText,fontSize:e.fontSizeSM}),t)))),(0,x.Z)(o,r+"-primary",(0,x.Z)({backgroundColor:e.colorPrimary},r+"-body",(0,x.Z)({backgroundColor:e.colorPrimary,transition:"background-color "+e.motionDurationMid,"&:hover":{backgroundColor:e.colorPrimaryHover}},r+"-content",(n={},(0,x.Z)(n,r+"-icon",{color:e.colorTextLightSolid}),(0,x.Z)(n,r+"-description",{display:"flex",alignItems:"center",lineHeight:e.fontSizeLG+"px",color:e.colorTextLightSolid,fontSize:e.fontSizeSM}),n)))),o},H=(0,k.Z)("FloatButton",(function(e){var t=e.colorTextLightSolid,n=e.colorBgElevated,o=e.controlHeightLG,r=e.marginXXL,i=e.marginLG,a=e.fontSize,l=e.fontSizeIcon,c=e.controlItemBgHover,s=(0,B.TS)(e,{floatButtonBackgroundColor:n,floatButtonColor:t,floatButtonHoverBackgroundColor:c,floatButtonFontSize:a,floatButtonIconSize:1.5*l,floatButtonSize:o,floatButtonInsetBlockEnd:r,floatButtonInsetInlineEnd:i});return[N(s),R(s),(0,O.J$)(e),j(s)]})),M=n(34400),T=n(1413),P={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"}}]},name:"file-text",theme:"outlined"},L=n(54291),F=function(e,t){return u.createElement(L.Z,(0,T.Z)((0,T.Z)({},e),{},{ref:t,icon:P}))};F.displayName="FileTextOutlined";var D=u.forwardRef(F),X=function(e){var t=e.icon,n=e.description,o=e.prefixCls,r=e.className,i=u.createElement("div",{className:o+"-icon"},u.createElement(D,null));return u.createElement("div",{onClick:e.onClick,onFocus:e.onFocus,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,className:S()(r,o+"-content")},t||n?u.createElement(u.Fragment,null,t&&u.createElement("div",{className:o+"-icon"},t),n&&u.createElement("div",{className:o+"-description"},n)):i)},_=(0,u.memo)(X),q=u.createContext(void 0),V=q.Provider,A=q,G=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},W="float-btn",U=function(e,t){var n=e.prefixCls,r=e.className,i=e.type,a=void 0===i?"default":i,l=e.shape,c=void 0===l?"circle":l,s=e.icon,d=e.description,f=e.tooltip,p=G(e,["prefixCls","className","type","shape","icon","description","tooltip"]),m=(0,u.useContext)(E.E_),g=m.getPrefixCls,v=m.direction,h=(0,u.useContext)(A),y=g(W,n),b=H(y),w=(0,o.Z)(b,2),C=w[0],k=w[1],B=h||c,O=S()(k,y,r,y+"-"+a,y+"-"+B,(0,x.Z)({},y+"-rtl","rtl"===v)),z=(0,u.useMemo)((function(){return{prefixCls:y,description:d,icon:s,type:a}}),[y,d,s,a]),I=f?u.createElement(M.Z,{title:f,placement:"left"},u.createElement("div",{className:y+"-body"},u.createElement(_,(0,Z.Z)({},z)))):u.createElement("div",{className:y+"-body"},u.createElement(_,(0,Z.Z)({},z)));return C(e.href?u.createElement("a",(0,Z.Z)({ref:t},p,{className:O}),I):u.createElement("button",(0,Z.Z)({ref:t},p,{className:O,type:"button"}),I))};var K=u.forwardRef(U),Y=n(60732),J=n(15207),Q=n(75179),$=function(e){var t,n=e.prefixCls,r=e.className,i=e.style,a=e.shape,l=void 0===a?"circle":a,c=e.type,s=void 0===c?"default":c,d=e.icon,f=void 0===d?u.createElement(D,null):d,p=e.closeIcon,m=void 0===p?u.createElement(Y.Z,null):p,g=e.description,v=e.trigger,h=e.children,y=e.onOpenChange,b=(0,u.useContext)(E.E_),w=b.direction,C=(0,b.getPrefixCls)(W,n),k=H(C),B=(0,o.Z)(k,2),O=B[0],z=B[1],I=C+"-group",j=S()(I,z,r,(t={},(0,x.Z)(t,I+"-rtl","rtl"===w),(0,x.Z)(t,I+"-"+l,l),(0,x.Z)(t,I+"-"+l+"-shadow",!v),t)),N=S()(z,I+"-wrap"),R=(0,Q.Z)(!1,{value:e.open}),M=(0,o.Z)(R,2),T=M[0],P=M[1],L=(0,u.useRef)({}),F=(0,u.useRef)({});return"click"===v&&(L.current={onClick:function(){P((function(e){return null===y||void 0===y||y(!e),!e}))}}),"hover"===v&&(F.current={onMouseEnter:function(){P(!0),null===y||void 0===y||y(!0)},onMouseLeave:function(){P(!1),null===y||void 0===y||y(!1)}}),O(u.createElement(V,{value:l},u.createElement("div",(0,Z.Z)({className:j,style:i},F.current),v&&["click","hover"].includes(v)?u.createElement(u.Fragment,null,u.createElement(J.default,{visible:T,motionName:I+"-wrap"},(function(e){var t=e.className;return u.createElement("div",{className:S()(t,N)},h)})),u.createElement(K,(0,Z.Z)({type:s,shape:l,icon:T?m:f,description:g},L.current))):h)))},ee=(0,u.memo)($),te={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"},ne=function(e,t){return u.createElement(L.Z,(0,T.Z)((0,T.Z)({},e),{},{ref:t,icon:te}))};ne.displayName="VerticalAlignTopOutlined";var oe=u.forwardRef(ne),re=n(31585);function ie(e){return null!==e&&void 0!==e&&e===e.window}function ae(e,t){var n,o;if("undefined"===typeof window)return 0;var r=t?"scrollTop":"scrollLeft",i=0;return ie(e)?i=e[t?"pageYOffset":"pageXOffset"]:e instanceof Document?i=e.documentElement[r]:(e instanceof HTMLElement||e)&&(i=e[r]),e&&!ie(e)&&"number"!==typeof i&&(i=null===(o=(null!==(n=e.ownerDocument)&&void 0!==n?n:e).documentElement)||void 0===o?void 0:o[r]),i}var le=n(75314);function ce(e,t,n,o){var r=n-t;return(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t}var se=n(93433);var ue=function(e){var t,n=function(n){return function(){t=null,e.apply(void 0,(0,se.Z)(n))}},o=function(){if(null==t){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];t=(0,le.Z)(n(o))}};return o.cancel=function(){le.Z.cancel(t),t=null},o},de=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},fe=function(e){var t=e.prefixCls,n=e.className,r=void 0===n?"":n,i=e.type,a=void 0===i?"default":i,l=e.shape,c=void 0===l?"circle":l,s=e.visibilityHeight,d=void 0===s?400:s,f=e.icon,p=void 0===f?u.createElement(oe,null):f,m=e.target,g=e.onClick,v=e.duration,h=void 0===v?450:v,y=de(e,["prefixCls","className","type","shape","visibilityHeight","icon","target","onClick","duration"]),b=(0,u.useState)(0===d),x=(0,o.Z)(b,2),w=x[0],C=x[1],k=(0,u.useRef)(null),B=(0,u.useRef)(null),O=function(){return k.current&&k.current.ownerDocument?k.current.ownerDocument:window},z=ue((function(e){var t=ae(e.target,!0);C(t>=d)}));(0,u.useEffect)((function(){return function(){var e=(m||O)();B.current=(0,re.Z)(e,"scroll",z),z({target:e})}(),function(){var e;z.cancel(),null===(e=B.current)||void 0===e||e.remove()}}),[m]);var I=function(e){!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.getContainer,o=void 0===n?function(){return window}:n,r=t.callback,i=t.duration,a=void 0===i?450:i,l=o(),c=ae(l,!0),s=Date.now(),u=function t(){var n=Date.now()-s,o=ce(n>a?a:n,c,e,a);ie(l)?l.scrollTo(window.pageXOffset,o):l instanceof Document||"HTMLDocument"===l.constructor.name?l.documentElement.scrollTop=o:l.scrollTop=o,n<a?(0,le.Z)(t):"function"===typeof r&&r()};(0,le.Z)(u)}(0,{getContainer:m||O,duration:h}),null===g||void 0===g||g(e)},j=(0,u.useContext)(E.E_).getPrefixCls,N=j(W,t),R=j(),M=H(N),T=(0,o.Z)(M,1)[0],P=(0,u.useContext)(A)||c,L=(0,Z.Z)({prefixCls:N,icon:p,type:a,shape:P},y);return T(u.createElement(J.default,{visible:w,motionName:R+"-fade"},(function(e){var t=e.className;return u.createElement(K,(0,Z.Z)({ref:k},L,{onClick:I,className:S()(r,t)}))})))},pe=(0,u.memo)(fe),me=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},ge=function(e){var t=e.backTop,n=me(e,["backTop"]);return t?u.createElement(pe,(0,Z.Z)({},n,{visibilityHeight:0})):u.createElement(K,(0,Z.Z)({},n))};function ve(e){var t=e.className,n=e.items,o=me(e,["className","items"]),r=o.prefixCls,i=(0,u.useContext(E.E_).getPrefixCls)(W,r)+"-pure";return n?u.createElement(ee,(0,Z.Z)({className:S()(t,i)},o),n.map((function(e,t){return u.createElement(ge,(0,Z.Z)({key:t},e))}))):u.createElement(ge,(0,Z.Z)({className:S()(t,i)},o))}var he=u.memo(ve);K.BackTop=pe,K.Group=ee,K._InternalPanelDoNotUseOrYouWillBeFired=he;var ye=K,be=function(){var e=(0,s.lr)(),t=(0,o.Z)(e,2),n=t[0],r=t[1],i=Number(n.get("page"))||1,a=(0,u.useState)(i),l=(0,o.Z)(a,2),c=l[0],d=l[1],f=(0,u.useState)(20),g=(0,o.Z)(f,1)[0];(0,u.useEffect)((function(){c!==i&&d(i)}),[i,c]);var v=(0,p.zQ)({page:c,pageSize:g}),Z=v.data,x=v.isLoading,w=v.isFetching,S=v.isSuccess,E=v.isError,C=v.error;return(0,m.jsx)(b.Z,{isError:E,isLoading:x,isSuccess:S,error:C,children:Z&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(ye.BackTop,{style:{bottom:"100px"}}),(0,m.jsx)(h,{users:Z.users,page:c,pageSize:g,isFetching:w}),(0,m.jsx)(y.Z,{total:Z.totalCount,pageSize:g,current:c,handler:function(e){d(e),r({page:e.toString(),count:g.toString()})}})]})})}},55207:function(e,t,n){var o=n(64099),r=n(80184);t.Z=function(e){var t=e.total,n=e.pageSize,i=e.current,a=e.handler;return(0,r.jsx)("div",{style:{textAlign:"center",marginTop:12,height:32,lineHeight:"32px"},children:(0,r.jsx)(o.Z,{total:t,pageSize:n,current:i,hideOnSinglePage:!0,onChange:function(e){a(e,n)},showSizeChanger:!1})})}}}]);
//# sourceMappingURL=855.bc903b99.chunk.js.map