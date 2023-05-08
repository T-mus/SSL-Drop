"use strict";import{sendForm}from"../../Modules/advanced.js";function clickOutside(e){document.addEventListener("click",(t=>{let r=t.target,o=null;"cart"===e?(o=cartCloseBtn.contains(r)||cartBody.contains(r)||cartIcon.contains(r),!o&&cartBody.classList.contains("_active")&&(document.body.classList.remove("_stop-scroll"),cartBody.classList.remove("_active"),header.classList.remove("_eclipse"))):"burger"===e&&(o=burgerBody.contains(r)||burgerIcon.contains(r),!o&&burgerBody.classList.contains("_active")&&(document.body.classList.remove("_stop-scroll"),burgerBody.classList.remove("_active"),burgerIcon.classList.remove("_active"),header.classList.remove("_eclipse")))}))}window.addEventListener("DOMContentLoaded",(()=>{}));let header=document.querySelector(".js-header"),burgerIcon=document.querySelector(".js-burger"),burgerBody=document.querySelector(".js-burger-body"),headerHeight=header.clientHeight,scrollPos=window.pageYOffset;function toFixHeader(){scrollPos=window.pageYOffset,scrollPos>headerHeight?header.classList.add("_fixed"):0==scrollPos&&header.classList.remove("_fixed")}burgerIcon.addEventListener("click",(e=>{e.preventDefault(),document.body.classList.toggle("_stop-scroll"),burgerBody.classList.toggle("_active"),burgerIcon.classList.toggle("_active"),header.classList.toggle("_eclipse"),clickOutside("burger")})),window.addEventListener("scroll",(()=>{toFixHeader()})),toFixHeader();let cartIcon=document.querySelector(".header__cart-icon"),cartBody=document.querySelector(".js-cart-header"),cartCloseBtn=cartBody.querySelector(".js-cart-close"),cartPreviewBtn=document.querySelector(".preview-cart__btn");cartIcon.addEventListener("click",(e=>{e.preventDefault(),document.body.classList.add("_stop-scroll"),cartBody.classList.add("_active"),header.classList.add("_eclipse"),clickOutside("cart"),cartCloseBtn.addEventListener("click",(e=>{e.preventDefault(),document.body.classList.remove("_stop-scroll"),cartBody.classList.remove("_active"),header.classList.remove("_eclipse")}))})),cartPreviewBtn.addEventListener("click",(e=>{e.preventDefault();let t=cartPreviewBtn.getAttribute("href"),r=document.querySelector(`${t}`);document.body.classList.remove("_stop-scroll"),cartBody.classList.remove("_active"),header.classList.remove("_eclipse"),r.scrollIntoView({behavior:"smooth",block:"start"})}));let pageURl,navLinks=document.querySelectorAll(".js-nav-link"),viewportWidth=window.innerWidth;for(let e of navLinks)e.addEventListener("click",(t=>{t.preventDefault();let r=e.getAttribute("href");function o(e){viewportWidth<=768&&header.classList.remove("_fixed"),document.querySelector(`${e}`).scrollIntoView({behavior:"smooth",block:"start"})}window.location.href.match(/index/g)?o(r):new Promise(((e,t)=>{window.location.href="../../index.html",window.addEventListener("load",(()=>{e(r)}))})).then((e=>{console.log("worked"),o(e)})).catch((e=>{console.log("Error:",e)}))}));!function(){let e=document.querySelector(".formalize__form-wrapper").clientHeight,t=document.querySelector(".formalize__cart-wrapper").querySelector(".cart-formalize__items");t.style.maxHeight=e-225+"px";let r=window.innerWidth;function o(){r>992&&function(){let e=new URL(window.location.href).searchParams.getAll("id").map(Number);async function r(){let r="../../Json/products.json",o=await fetch(r);try{!function(e,r){function o(){let e=document.querySelector(".formalize__popup");e.querySelector(".popup-formalize__btn").addEventListener("click",(t=>{e.classList.remove("_sended"),window.location.replace("../../index.html"),window.history.replaceState?window.history.replaceState(null,null,window.location.href):window.location.hash=""}))}e.reduce(((e,t)=>(r.includes(t.id)&&e.push(t),e)),[]).forEach((e=>{let r="",o="";o+=`\n                    <div class="cart-item-formalize__picture">\n                        <a href="" class="cart-item-formalize__img"><img src="${e.image}" alt=""></a>\n                    </div>\n                `,o+=`\n                    <div class="cart-item-formalize__subinfo">\n                        <p class="cart-item-formalize__text">${e.name}</p>\n                        <p class="cart-item-formalize__taste">${e.tastes[0]},<span class="cart-item-formalize__length">1шт.</span></p>\n                        <p class="cart-item-formalize__price"><span>${e.price}</span>грн.</p>\n                    </div>\n                `,r+='\n                    <div class="cart-formalize__item cart-item-formalize" data-cart-pid="2">\n                        <div class="cart-item-formalize__info">\n                ',r+=o,r+="</div></div>",t.insertAdjacentHTML("beforeend",r);let c=document.querySelector(".amount-formalize__price span"),i=document.querySelectorAll(".cart-item-formalize__price span"),a=0;i.forEach((e=>{a+=parseInt(e.innerHTML)})),c.innerHTML=a})),sendForm("js-formalize-form",{fieldsCheck:!0,processingSelect:!1}),o()}((await o.json()).products,e)}catch{alert("Something was wrong...")}}r()}()}window.addEventListener("resize",(e=>{r=window.innerWidth,o()})),o()}();