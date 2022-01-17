(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{18:function(e,n,t){},22:function(e,n,t){},23:function(e,n,t){"use strict";t.r(n);var i=t(1),a=t.n(i),s=t(7),c=t.n(s),o=(t(18),t(5)),r=t(6),l=t.n(r),d=t(9),u=t(12),h=t(4),g=t(24),m=t(10),j=t(11),p=t(2),f=600,x=1200,b=function(){function e(){var n=this;Object(m.a)(this,e),this.imageDimensions=void 0,this.mode=void 0,this.container=void 0,this.isDragging=void 0,this.startPanPoz=void 0,this.panPoz=void 0,this.scale=void 0,this.nameInInput=void 0,this.highlightedLineId=void 0,this.lines=void 0,this.currentLineIndex=void 0,this.imageLoaded=void 0,this.handleMouseEnter=function(){"image"===n.mode&&document.getElementsByTagName("body")[0].classList.add("stop-scrolling")},this.handleMouseLeave=function(){"image"===n.mode&&(document.getElementsByTagName("body")[0].classList.remove("stop-scrolling"),n.setIsDragging(!1))},this.setContainer=function(e){n.container=e},this.setStartPanPoz=function(e){n.startPanPoz=e},this.setPanPoz=function(e){n.panPoz=e},this.setScale=function(e){n.scale=e},this.handleMouseDown=function(e){e.preventDefault(),n.imageLoaded&&"image"===n.mode&&(n.setIsDragging(!0),n.setStartPanPoz({x:e.clientX-n.panPoz.x,y:e.clientY-n.panPoz.y}))},this.handleMouseUp=function(e){e.preventDefault(),n.imageLoaded&&"image"===n.mode&&n.setIsDragging(!1)},this.handleMouseMove=function(e){e.preventDefault(),n.imageLoaded&&"image"===n.mode&&n.isDragging&&n.setPanPoz({x:e.clientX-n.startPanPoz.x,y:e.clientY-n.startPanPoz.y})},this.handleWheel=function(e){if(n.imageLoaded&&"image"===n.mode){var t=Math.min(Math.max(.125,n.scale+-.002*e.deltaY),4);n.setScale(t)}},this.handleScroll=function(e){e.preventDefault()},this.loadLinesData=function(e){n.lines=e.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{points:e.points.map((function(e){return{x:e.x*x,y:e.y*f}}))})}))},this.createNewLine=function(){n.nameInInput?(n.lines.push({name:n.nameInInput,points:[],id:Object(g.a)()}),n.nameInInput="",n.currentLineIndex=n.lines.length-1):alert("Please enter a name for the line")},this.deleteLastPoint=function(){n.lines[n.currentLineIndex]&&n.lines[n.currentLineIndex].points.length>0&&n.lines[n.currentLineIndex].points.pop()},this.deleteLine=function(){n.lines[n.currentLineIndex]&&(n.lines.splice(n.currentLineIndex,1),n.currentLineIndex--)},this.updateSelectedLine=function(e){n.currentLineIndex=n.lines.findIndex((function(n){return n.name===e}))},this.updateLineNewName=function(e){n.nameInInput=e},this.editExistingLineName=function(e){n.lines[n.currentLineIndex].name=e},this.handleClick=function(e){if("lineEditing"===n.mode&&n.container){if(n.currentLineIndex<0)return void alert("first create a new line with a name");var t={x:e.clientX-n.container.offsetLeft+window.scrollX,y:e.clientY-n.container.offsetTop+window.scrollY};n.lines[n.currentLineIndex].points.push(t)}},Object(p.d)(this,{}),this.isDragging=!1,this.mode="lineEditing",this.imageDimensions={x:0,y:0},this.startPanPoz={x:0,y:0},this.panPoz={x:0,y:0},this.scale=1,this.lines=[],this.highlightedLineId="",this.nameInInput="",this.imageLoaded=!1,this.currentLineIndex=-1}return Object(j.a)(e,[{key:"setImageDimensions",value:function(e){this.imageDimensions=e,this.imageLoaded=!0}},{key:"setIsDragging",value:function(e){"image"===this.mode&&(this.isDragging=e)}}]),e}(),v=new b,O=Object(i.createContext)(v),L=O.Provider,y=function(){return Object(i.useContext)(O)},w=t(3),I=t.n(w),C=t(0),D=Object(h.a)((function(e){var n=e.image,t=e.imageStyle,i=y();return n?Object(C.jsx)("img",{className:I.a.cragImage,style:t,src:n,alt:"",onLoad:function(e){var n=e.target,t=0,a=0;n.height/n.width<.5?(a=x,t=n.height*(x/n.width)):(t=f,a=n.width*(f/n.height)),i.setImageDimensions({x:a,y:t})}}):null})),P=Object(h.a)((function(e){var n=e.line,t=e.selected,i=n.points.reduce((function(e,n){return"".concat(e," ").concat(n.x,",").concat(n.y)}),""),a=t?"#1ad34b":"#6247cb";return n.points.length?Object(C.jsx)("polyline",{points:i,style:{stroke:a,fill:"none",strokeWidth:3}}):null})),_=Object(h.a)((function(e){var n,t=e.svgStyle,i=y(),a=null===(n=i.lines[i.currentLineIndex])||void 0===n?void 0:n.id;return Object(C.jsx)("svg",{className:I.a.svgContainer,style:t,children:i.lines.map((function(e){return Object(C.jsx)(P,{line:e,selected:a===e.id},e.id)}))})})),N=Object(h.a)((function(){var e=y(),n=e.lines[e.currentLineIndex];return n?Object(C.jsxs)("div",{className:I.a.lineEditor,children:["Line Editor",Object(C.jsx)("div",{className:I.a.btn,onClick:function(){e.deleteLastPoint()},children:"Delete last point"}),Object(C.jsx)("div",{className:I.a.btn,onClick:function(){e.deleteLine()},children:"Delete Line"}),Object(C.jsxs)("div",{style:{display:"inline-block"},children:[Object(C.jsx)("span",{style:{paddingRight:"6px"},children:"Edit Line Name:"}),Object(C.jsx)("input",{type:"text",onChange:function(n){e.editExistingLineName(n.target.value)},value:n.name})]}),Object(C.jsx)("div",{style:{display:"inline-block",marginLeft:"6px"},children:e.lines.length>0&&Object(C.jsxs)(C.Fragment,{children:["Select Line:",Object(C.jsx)("select",{name:"linesSelector",onChange:function(n){e.updateSelectedLine(n.target.value)},value:n.name,children:e.lines.map((function(e){return Object(C.jsx)("option",{value:e.name,children:e.name},e.id)}))})]})})]}):null})),S=function(e){var n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,void 0,2)),t=document.createElement("a");t.setAttribute("href",n),t.setAttribute("download",Object(g.a)()+".json"),document.body.appendChild(t),t.click(),t.remove()},E=Object(h.a)((function(){var e=y(),n=a.a.useRef(null),t=e.imageDimensions,s=e.panPoz,c=e.scale,r=Object(i.useState)(),h=Object(u.a)(r,2),g=h[0],m=h[1],j=function(){var n=Object(d.a)(l.a.mark((function n(t){var i;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.target.files&&t.target.files[0]&&((i=new FileReader).readAsText(t.target.files[0],"UTF-8"),i.onload=function(n){var t;(null===(t=n.target)||void 0===t?void 0:t.result)&&e.loadLinesData(JSON.parse(n.target.result))});case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),p=function(){var n=Object(d.a)(l.a.mark((function n(){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:S(e.lines.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{points:e.points.map((function(e){return{x:e.x/x,y:e.y/f}}))})})));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),b={},v={};Object(i.useEffect)((function(){n.current&&e.setContainer(n.current)}),[n]),t.x&&(b.width="".concat(t.x*c,"px"),b.height="".concat(t.y*c,"px"),v.transform="scale(".concat(c,")"),v.width="".concat(t.x*c,"px"),v.height="".concat(t.y*c,"px")),s.x&&(b.left="".concat(s.x,"px"),v.left="".concat(s.x,"px")),s.y&&(b.top="".concat(s.y,"px"),v.top="".concat(s.y,"px"));return Object(C.jsxs)("div",{className:I.a.drawingCrags,children:[Object(C.jsx)("h2",{children:"Drawing Crags"}),Object(C.jsxs)("div",{children:[Object(C.jsx)("div",{children:"Welcome to the drawing crags app!"}),Object(C.jsxs)("div",{children:["To use the app:",Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:"Upload click on the upload crag image button to upload an image"}),Object(C.jsx)("li",{children:"Give a name to a line and create a new line"}),Object(C.jsx)("li",{children:"Start clicking on the image to draw the line points"}),Object(C.jsx)("li",{children:"Export the result file using the Export Lines Data button"})]})]}),Object(C.jsxs)("div",{style:{fontSize:"90%",color:"#727272"},children:["* You can also upload a previously generated file using the Import Lines Data button and edit Lines",Object(C.jsx)("br",{}),"Play around with the system a bit, we're sure you'll figure things out :)"]}),Object(C.jsx)("br",{})]}),Object(C.jsxs)("div",{children:[Object(C.jsxs)("div",{className:I.a.btnContainer,children:[Object(C.jsx)("div",{children:e.imageLoaded&&Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("div",{className:I.a.btn,onClick:function(){e.createNewLine()},children:"+ New Line"}),Object(C.jsx)("div",{className:I.a.lineName,children:Object(C.jsx)("input",{type:"text",onChange:function(n){e.updateLineNewName(n.target.value)},value:e.nameInInput})})]})}),Object(C.jsxs)("div",{children:[Object(C.jsxs)("label",{className:I.a.fileUpload,children:[Object(C.jsx)("input",{type:"file",multiple:!0,accept:"image/*",onChange:function(n){if(n.target.files&&n.target.files[0]){var t=URL.createObjectURL(n.target.files[0]);e.setImageDimensions({x:0,y:0}),e.setScale(1),m(t)}}}),"Upload Crag Image"]}),Object(C.jsxs)("label",{className:I.a.fileUpload,children:[Object(C.jsx)("input",{type:"file",onChange:j}),"Import Lines Data"]}),Object(C.jsx)("div",{className:I.a.btn+" "+I.a.last,onClick:p,children:"Export Lines Data"})]})]}),Object(C.jsx)(N,{})]}),Object(C.jsxs)("div",{ref:n,className:I.a.imageContainer,onMouseEnter:e.handleMouseEnter,onMouseLeave:e.handleMouseLeave,onMouseDown:e.handleMouseDown,onMouseUp:e.handleMouseUp,onClick:e.handleClick,onMouseMove:e.handleMouseMove,onWheel:e.handleWheel,onScroll:e.handleScroll,children:[Object(C.jsx)(D,{image:g,imageStyle:b}),Object(C.jsx)(_,{svgStyle:v})]})]})})),M=new b,k=function(){return Object(C.jsx)(L,{value:M,children:Object(C.jsx)(E,{})})},z=(t(22),function(){return Object(C.jsx)(k,{})}),U=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,25)).then((function(n){var t=n.getCLS,i=n.getFID,a=n.getFCP,s=n.getLCP,c=n.getTTFB;t(e),i(e),a(e),s(e),c(e)}))};c.a.render(Object(C.jsx)(a.a.StrictMode,{children:Object(C.jsx)(z,{})}),document.getElementById("root")),U()},3:function(e,n,t){e.exports={drawingCrags:"drawingCrags_drawingCrags__3pW90",imageContainer:"drawingCrags_imageContainer__36Bch",cragImage:"drawingCrags_cragImage__vtfuJ",svgContainer:"drawingCrags_svgContainer__3H_v0",btn:"drawingCrags_btn__J0OEV",last:"drawingCrags_last__1BVBA",fileUpload:"drawingCrags_fileUpload__1zDh6",btnContainer:"drawingCrags_btnContainer__3jUL_",lineName:"drawingCrags_lineName__AiLPr",lineEditor:"drawingCrags_lineEditor__BTi0e"}}},[[23,1,2]]]);
//# sourceMappingURL=main.530289e7.chunk.js.map