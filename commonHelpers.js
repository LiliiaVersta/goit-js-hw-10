import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as m,i as S}from"./assets/vendor-77e16229.js";const f=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]"),h=document.querySelector("span[data-days]"),p=document.querySelector("span[data-hours]"),y=document.querySelector("span[data-minutes]"),g=document.querySelector("span[data-seconds]");e.addEventListener("click",q);let s="",c="";const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<=Date.now()?D():(s=t[0],e.disabled=!1)}};m(f,C);function M(){const t=s-new Date;if(console.log(t),t<=0){clearInterval(c);return}const{days:n,hours:o,minutes:a,seconds:r}=b(t);h.textContent=String(n).padStart(2,0),p.textContent=String(o).padStart(2,0),y.textContent=String(a).padStart(2,0),g.textContent=String(r).padStart(2,0),e.disabled=!0}function q(){c=setInterval(M,1e3)}function D(){S.error({backgroundColor:"tomato",message:"Please choose a date in the future",messageColor:"white",messageSize:"20",position:"topRight",close:!0})}function b(t){const u=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:i,minutes:d,seconds:l}}
//# sourceMappingURL=commonHelpers.js.map
