(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"b1fc73a0-b339-4f23-8bc6-4511c8e7234e","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(n,r){n.stopPropagation(),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(){n.target.closest(".card").remove()})).catch((function(e){console.log("Произошла ошибка:",e)}))}function r(n,r){n.stopPropagation();var o=n.target.closest(".card").querySelector(".card__like-counter");n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(e){n.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Произошла ошибка:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(r).then((function(e){n.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Произошла ошибка:",e)}))}function o(e,t,n,r,o,a,c){var i=document.querySelector("#card-template").content.querySelector(".places__item.card").cloneNode(!0),s=i.querySelector(".card__title"),u=i.querySelector(".card__image"),l=i.querySelector(".card__like-counter"),d=i.querySelector(".card__delete-button"),p=e.name,f=e.link,m=e.likes.length;return s.textContent=p,u.src=f,u.alt=p,l.textContent=m,a!==c&&(d.style.cssText="display: none"),function(e,t,n,r,o,a,c,i){var s=e.querySelector(".card__delete-button"),u=e.querySelector(".card__like-button");s.addEventListener("click",(function(e){return o(e,i)})),u.addEventListener("click",(function(e){return a(e,i)})),t.addEventListener("click",(function(){c(n,r)}))}(i,u,f,p,t,n,r,o),i}var a=function(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))};function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}var s=function(e){(e.currentTarget===e.target||e.target.classList.contains("popup__close"))&&i(e.currentTarget)},u=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},l=function(e,t,n){d(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))},d=function(e){return e.some((function(e){return!e.validity.valid}))};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".content"),m=f.querySelector(".places__list");Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,a,c=(a=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],s=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw o}}return i}}(t,a)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=c[0],s=c[1],u=i._id;T.value=i.name,A.value=i.about;var l=document.createDocumentFragment();s.forEach((function(e){var t=e._id,a=e.owner._id,c=o(e,n,r,g,t,a,u);l.append(c)})),m.append(l),U.textContent=i.name,w.textContent=i.about,E.style.cssText='background-image: url("'.concat(i.avatar,'");')})).catch((function(e){alert(e)}));var v=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),h=(document.querySelector(".popup__close"),document.querySelector(".popup_avatar_edit")),b=y.querySelector(".popup__image"),S=y.querySelector(".popup__caption"),g=function(e,t){b.src=e,S.textContent=t,c(y)};v.classList.add("popup_is-animated"),_.classList.add("popup_is-animated"),y.classList.add("popup_is-animated"),h.classList.add("popup_is-animated");var k=f.querySelector(".profile__edit-button"),L=f.querySelector(".profile__add-button"),E=f.querySelector(".profile__image");k.addEventListener("click",(function(){c(v),T.value=U.textContent,A.value=w.textContent})),L.addEventListener("click",(function(){c(_)})),E.addEventListener("click",(function(){c(h)})),v.addEventListener("click",s),h.addEventListener("click",s),_.addEventListener("click",s),y.addEventListener("click",s);var q=document.forms["edit-profile"],C=document.forms["new-place"],x=document.forms["edit-avatar"];q.addEventListener("submit",(function(n){var r,o;n.preventDefault(),P(!0),(r=T.value,o=A.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){U.textContent=e.name,w.textContent=e.about,i(v)})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){P(!1)}))})),C.addEventListener("submit",(function(a){a.preventDefault();var c={name:j.value,link:D.value,likes:""};P(!0),function(n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",body:JSON.stringify({name:n.name,link:n.link,likes:n.likes.length}),headers:e.headers}).then(t)}(c).then((function(e){var t=e._id,a=o(c,n,r,g,t);m.prepend(a),i(_),C.reset(),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){u(e,n,t)})),l(n,e.querySelector(t.submitButtonSelector),t)}(_,B)})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){P(!1)}))})),x.addEventListener("submit",(function(n){var r;n.preventDefault(),P(!0),(r=O.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",body:JSON.stringify({avatar:r}),headers:e.headers}).then(t)).then((function(e){E.style.cssText='background-image: url("'.concat(e.avatar,'");'),i(h),x.reset()})).catch((function(e){console.log("Произошла ошибка:",e)})).finally((function(){P(!1)}))}));var T=q.elements.name,A=q.elements.description,U=f.querySelector(".profile__title"),w=f.querySelector(".profile__description");function P(e){document.querySelector(".button").textContent=e?"Сохранение...":"Сохранить"}var j=C.elements["place-name"],D=C.elements.link,O=x.elements.link,B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))})),l(n,r,t)}(t,e)}))}(B)})();