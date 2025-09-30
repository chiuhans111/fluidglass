(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Kn(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const J={},ht=[],Oe=()=>{},Fs=()=>!1,ln=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Zn=t=>t.startsWith("onUpdate:"),fe=Object.assign,Qn=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Nr=Object.prototype.hasOwnProperty,j=(t,e)=>Nr.call(t,e),z=Array.isArray,Mt=t=>on(t)==="[object Map]",zr=t=>on(t)==="[object Set]",B=t=>typeof t=="function",ie=t=>typeof t=="string",gt=t=>typeof t=="symbol",ne=t=>t!==null&&typeof t=="object",As=t=>(ne(t)||B(t))&&B(t.then)&&B(t.catch),Br=Object.prototype.toString,on=t=>Br.call(t),kr=t=>on(t).slice(8,-1),$r=t=>on(t)==="[object Object]",Jn=t=>ie(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Tt=Kn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),cn=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Hr=/-\w/g,Ke=cn(t=>t.replace(Hr,e=>e.slice(1).toUpperCase())),Vr=/\B([A-Z])/g,rt=cn(t=>t.replace(Vr,"-$1").toLowerCase()),Ss=cn(t=>t.charAt(0).toUpperCase()+t.slice(1)),gn=cn(t=>t?`on${Ss(t)}`:""),Ye=(t,e)=>!Object.is(t,e),vn=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Rs=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},jr=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Fi;const an=()=>Fi||(Fi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ei(t){if(z(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],s=ie(i)?Xr(i):ei(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(ie(t)||ne(t))return t}const Gr=/;(?![^(]*\))/g,Wr=/:([^]+)/,qr=/\/\*[^]*?\*\//g;function Xr(t){const e={};return t.replace(qr,"").split(Gr).forEach(n=>{if(n){const i=n.split(Wr);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function ti(t){let e="";if(ie(t))e=t;else if(z(t))for(let n=0;n<t.length;n++){const i=ti(t[n]);i&&(e+=i+" ")}else if(ne(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Yr="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Kr=Kn(Yr);function Cs(t){return!!t||t===""}/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ge;class Zr{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ge,!e&&ge&&(this.index=(ge.scopes||(ge.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=ge;try{return ge=this,e()}finally{ge=n}}}on(){++this._on===1&&(this.prevScope=ge,ge=this)}off(){this._on>0&&--this._on===0&&(ge=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Qr(){return ge}let Q;const mn=new WeakSet;class Ds{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ge&&ge.active&&ge.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,mn.has(this)&&(mn.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ps(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ai(this),Is(this);const e=Q,n=be;Q=this,be=!0;try{return this.fn()}finally{Us(this),Q=e,be=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)si(e);this.deps=this.depsTail=void 0,Ai(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?mn.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Dn(this)&&this.run()}get dirty(){return Dn(this)}}let Os=0,Ft,At;function Ps(t,e=!1){if(t.flags|=8,e){t.next=At,At=t;return}t.next=Ft,Ft=t}function ni(){Os++}function ii(){if(--Os>0)return;if(At){let e=At;for(At=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ft;){let e=Ft;for(Ft=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function Is(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Us(t){let e,n=t.depsTail,i=n;for(;i;){const s=i.prevDep;i.version===-1?(i===n&&(n=s),si(i),Jr(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}t.deps=e,t.depsTail=n}function Dn(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Ls(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Ls(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===It)||(t.globalVersion=It,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Dn(t))))return;t.flags|=2;const e=t.dep,n=Q,i=be;Q=t,be=!0;try{Is(t);const s=t.fn(t._value);(e.version===0||Ye(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Q=n,be=i,Us(t),t.flags&=-3}}function si(t,e=!1){const{dep:n,prevSub:i,nextSub:s}=t;if(i&&(i.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)si(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Jr(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let be=!0;const Ns=[];function $e(){Ns.push(be),be=!1}function He(){const t=Ns.pop();be=t===void 0?!0:t}function Ai(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Q;Q=void 0;try{e()}finally{Q=n}}}let It=0;class el{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ri{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Q||!be||Q===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Q)n=this.activeLink=new el(Q,this),Q.deps?(n.prevDep=Q.depsTail,Q.depsTail.nextDep=n,Q.depsTail=n):Q.deps=Q.depsTail=n,zs(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Q.depsTail,n.nextDep=void 0,Q.depsTail.nextDep=n,Q.depsTail=n,Q.deps===n&&(Q.deps=i)}return n}trigger(e){this.version++,It++,this.notify(e)}notify(e){ni();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ii()}}}function zs(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)zs(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const On=new WeakMap,nt=Symbol(""),Pn=Symbol(""),Ut=Symbol("");function se(t,e,n){if(be&&Q){let i=On.get(t);i||On.set(t,i=new Map);let s=i.get(n);s||(i.set(n,s=new ri),s.map=i,s.key=n),s.track()}}function ke(t,e,n,i,s,r){const l=On.get(t);if(!l){It++;return}const o=c=>{c&&c.trigger()};if(ni(),e==="clear")l.forEach(o);else{const c=z(t),h=c&&Jn(n);if(c&&n==="length"){const a=Number(i);l.forEach((u,p)=>{(p==="length"||p===Ut||!gt(p)&&p>=a)&&o(u)})}else switch((n!==void 0||l.has(void 0))&&o(l.get(n)),h&&o(l.get(Ut)),e){case"add":c?h&&o(l.get("length")):(o(l.get(nt)),Mt(t)&&o(l.get(Pn)));break;case"delete":c||(o(l.get(nt)),Mt(t)&&o(l.get(Pn)));break;case"set":Mt(t)&&o(l.get(nt));break}}ii()}function lt(t){const e=V(t);return e===t?e:(se(e,"iterate",Ut),Ee(t)?e:e.map(ce))}function li(t){return se(t=V(t),"iterate",Ut),t}const tl={__proto__:null,[Symbol.iterator](){return _n(this,Symbol.iterator,ce)},concat(...t){return lt(this).concat(...t.map(e=>z(e)?lt(e):e))},entries(){return _n(this,"entries",t=>(t[1]=ce(t[1]),t))},every(t,e){return Le(this,"every",t,e,void 0,arguments)},filter(t,e){return Le(this,"filter",t,e,n=>n.map(ce),arguments)},find(t,e){return Le(this,"find",t,e,ce,arguments)},findIndex(t,e){return Le(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Le(this,"findLast",t,e,ce,arguments)},findLastIndex(t,e){return Le(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Le(this,"forEach",t,e,void 0,arguments)},includes(...t){return xn(this,"includes",t)},indexOf(...t){return xn(this,"indexOf",t)},join(t){return lt(this).join(t)},lastIndexOf(...t){return xn(this,"lastIndexOf",t)},map(t,e){return Le(this,"map",t,e,void 0,arguments)},pop(){return xt(this,"pop")},push(...t){return xt(this,"push",t)},reduce(t,...e){return Si(this,"reduce",t,e)},reduceRight(t,...e){return Si(this,"reduceRight",t,e)},shift(){return xt(this,"shift")},some(t,e){return Le(this,"some",t,e,void 0,arguments)},splice(...t){return xt(this,"splice",t)},toReversed(){return lt(this).toReversed()},toSorted(t){return lt(this).toSorted(t)},toSpliced(...t){return lt(this).toSpliced(...t)},unshift(...t){return xt(this,"unshift",t)},values(){return _n(this,"values",ce)}};function _n(t,e,n){const i=li(t),s=i[e]();return i!==t&&!Ee(t)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=n(r.value)),r}),s}const nl=Array.prototype;function Le(t,e,n,i,s,r){const l=li(t),o=l!==t&&!Ee(t),c=l[e];if(c!==nl[e]){const u=c.apply(t,r);return o?ce(u):u}let h=n;l!==t&&(o?h=function(u,p){return n.call(this,ce(u),p,t)}:n.length>2&&(h=function(u,p){return n.call(this,u,p,t)}));const a=c.call(l,h,i);return o&&s?s(a):a}function Si(t,e,n,i){const s=li(t);let r=n;return s!==t&&(Ee(t)?n.length>3&&(r=function(l,o,c){return n.call(this,l,o,c,t)}):r=function(l,o,c){return n.call(this,l,ce(o),c,t)}),s[e](r,...i)}function xn(t,e,n){const i=V(t);se(i,"iterate",Ut);const s=i[e](...n);return(s===-1||s===!1)&&hi(n[0])?(n[0]=V(n[0]),i[e](...n)):s}function xt(t,e,n=[]){$e(),ni();const i=V(t)[e].apply(t,n);return ii(),He(),i}const il=Kn("__proto__,__v_isRef,__isVue"),Bs=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(gt));function sl(t){gt(t)||(t=String(t));const e=V(this);return se(e,"has",t),e.hasOwnProperty(t)}class ks{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return r;if(n==="__v_raw")return i===(s?r?pl:js:r?Vs:Hs).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const l=z(e);if(!s){let c;if(l&&(c=tl[n]))return c;if(n==="hasOwnProperty")return sl}const o=Reflect.get(e,n,re(e)?e:i);if((gt(n)?Bs.has(n):il(n))||(s||se(e,"get",n),r))return o;if(re(o)){const c=l&&Jn(n)?o:o.value;return s&&ne(c)?Un(c):c}return ne(o)?s?Un(o):ci(o):o}}class $s extends ks{constructor(e=!1){super(!1,e)}set(e,n,i,s){let r=e[n];if(!this._isShallow){const c=st(r);if(!Ee(i)&&!st(i)&&(r=V(r),i=V(i)),!z(e)&&re(r)&&!re(i))return c||(r.value=i),!0}const l=z(e)&&Jn(n)?Number(n)<e.length:j(e,n),o=Reflect.set(e,n,i,re(e)?e:s);return e===V(s)&&(l?Ye(i,r)&&ke(e,"set",n,i):ke(e,"add",n,i)),o}deleteProperty(e,n){const i=j(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&i&&ke(e,"delete",n,void 0),s}has(e,n){const i=Reflect.has(e,n);return(!gt(n)||!Bs.has(n))&&se(e,"has",n),i}ownKeys(e){return se(e,"iterate",z(e)?"length":nt),Reflect.ownKeys(e)}}class rl extends ks{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const ll=new $s,ol=new rl,cl=new $s(!0);const In=t=>t,jt=t=>Reflect.getPrototypeOf(t);function al(t,e,n){return function(...i){const s=this.__v_raw,r=V(s),l=Mt(r),o=t==="entries"||t===Symbol.iterator&&l,c=t==="keys"&&l,h=s[t](...i),a=n?In:e?Ln:ce;return!e&&se(r,"iterate",c?Pn:nt),{next(){const{value:u,done:p}=h.next();return p?{value:u,done:p}:{value:o?[a(u[0]),a(u[1])]:a(u),done:p}},[Symbol.iterator](){return this}}}}function Gt(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function hl(t,e){const n={get(s){const r=this.__v_raw,l=V(r),o=V(s);t||(Ye(s,o)&&se(l,"get",s),se(l,"get",o));const{has:c}=jt(l),h=e?In:t?Ln:ce;if(c.call(l,s))return h(r.get(s));if(c.call(l,o))return h(r.get(o));r!==l&&r.get(s)},get size(){const s=this.__v_raw;return!t&&se(V(s),"iterate",nt),s.size},has(s){const r=this.__v_raw,l=V(r),o=V(s);return t||(Ye(s,o)&&se(l,"has",s),se(l,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const l=this,o=l.__v_raw,c=V(o),h=e?In:t?Ln:ce;return!t&&se(c,"iterate",nt),o.forEach((a,u)=>s.call(r,h(a),h(u),l))}};return fe(n,t?{add:Gt("add"),set:Gt("set"),delete:Gt("delete"),clear:Gt("clear")}:{add(s){!e&&!Ee(s)&&!st(s)&&(s=V(s));const r=V(this);return jt(r).has.call(r,s)||(r.add(s),ke(r,"add",s,s)),this},set(s,r){!e&&!Ee(r)&&!st(r)&&(r=V(r));const l=V(this),{has:o,get:c}=jt(l);let h=o.call(l,s);h||(s=V(s),h=o.call(l,s));const a=c.call(l,s);return l.set(s,r),h?Ye(r,a)&&ke(l,"set",s,r):ke(l,"add",s,r),this},delete(s){const r=V(this),{has:l,get:o}=jt(r);let c=l.call(r,s);c||(s=V(s),c=l.call(r,s)),o&&o.call(r,s);const h=r.delete(s);return c&&ke(r,"delete",s,void 0),h},clear(){const s=V(this),r=s.size!==0,l=s.clear();return r&&ke(s,"clear",void 0,void 0),l}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=al(s,t,e)}),n}function oi(t,e){const n=hl(t,e);return(i,s,r)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?i:Reflect.get(j(n,s)&&s in i?n:i,s,r)}const fl={get:oi(!1,!1)},ul={get:oi(!1,!0)},dl={get:oi(!0,!1)};const Hs=new WeakMap,Vs=new WeakMap,js=new WeakMap,pl=new WeakMap;function gl(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function vl(t){return t.__v_skip||!Object.isExtensible(t)?0:gl(kr(t))}function ci(t){return st(t)?t:ai(t,!1,ll,fl,Hs)}function ml(t){return ai(t,!1,cl,ul,Vs)}function Un(t){return ai(t,!0,ol,dl,js)}function ai(t,e,n,i,s){if(!ne(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=vl(t);if(r===0)return t;const l=s.get(t);if(l)return l;const o=new Proxy(t,r===2?i:n);return s.set(t,o),o}function St(t){return st(t)?St(t.__v_raw):!!(t&&t.__v_isReactive)}function st(t){return!!(t&&t.__v_isReadonly)}function Ee(t){return!!(t&&t.__v_isShallow)}function hi(t){return t?!!t.__v_raw:!1}function V(t){const e=t&&t.__v_raw;return e?V(e):t}function _l(t){return!j(t,"__v_skip")&&Object.isExtensible(t)&&Rs(t,"__v_skip",!0),t}const ce=t=>ne(t)?ci(t):t,Ln=t=>ne(t)?Un(t):t;function re(t){return t?t.__v_isRef===!0:!1}function xl(t){return yl(t,!1)}function yl(t,e){return re(t)?t:new bl(t,e)}class bl{constructor(e,n){this.dep=new ri,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:V(e),this._value=n?e:ce(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||Ee(e)||st(e);e=i?e:V(e),Ye(e,n)&&(this._rawValue=e,this._value=i?e:ce(e),this.dep.trigger())}}function El(t){return re(t)?t.value:t}const wl={get:(t,e,n)=>e==="__v_raw"?t:El(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const s=t[e];return re(s)&&!re(n)?(s.value=n,!0):Reflect.set(t,e,n,i)}};function Gs(t){return St(t)?t:new Proxy(t,wl)}class Ml{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new ri(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=It-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Q!==this)return Ps(this,!0),!0}get value(){const e=this.dep.track();return Ls(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Tl(t,e,n=!1){let i,s;return B(t)?i=t:(i=t.get,s=t.set),new Ml(i,s,n)}const Wt={},Zt=new WeakMap;let tt;function Fl(t,e=!1,n=tt){if(n){let i=Zt.get(n);i||Zt.set(n,i=[]),i.push(t)}}function Al(t,e,n=J){const{immediate:i,deep:s,once:r,scheduler:l,augmentJob:o,call:c}=n,h=_=>s?_:Ee(_)||s===!1||s===0?Xe(_,1):Xe(_);let a,u,p,g,v=!1,x=!1;if(re(t)?(u=()=>t.value,v=Ee(t)):St(t)?(u=()=>h(t),v=!0):z(t)?(x=!0,v=t.some(_=>St(_)||Ee(_)),u=()=>t.map(_=>{if(re(_))return _.value;if(St(_))return h(_);if(B(_))return c?c(_,2):_()})):B(t)?e?u=c?()=>c(t,2):t:u=()=>{if(p){$e();try{p()}finally{He()}}const _=tt;tt=a;try{return c?c(t,3,[g]):t(g)}finally{tt=_}}:u=Oe,e&&s){const _=u,C=s===!0?1/0:s;u=()=>Xe(_(),C)}const T=Qr(),b=()=>{a.stop(),T&&T.active&&Qn(T.effects,a)};if(r&&e){const _=e;e=(...C)=>{_(...C),b()}}let w=x?new Array(t.length).fill(Wt):Wt;const y=_=>{if(!(!(a.flags&1)||!a.dirty&&!_))if(e){const C=a.run();if(s||v||(x?C.some((P,k)=>Ye(P,w[k])):Ye(C,w))){p&&p();const P=tt;tt=a;try{const k=[C,w===Wt?void 0:x&&w[0]===Wt?[]:w,g];w=C,c?c(e,3,k):e(...k)}finally{tt=P}}}else a.run()};return o&&o(y),a=new Ds(u),a.scheduler=l?()=>l(y,!1):y,g=_=>Fl(_,!1,a),p=a.onStop=()=>{const _=Zt.get(a);if(_){if(c)c(_,4);else for(const C of _)C();Zt.delete(a)}},e?i?y(!0):w=a.run():l?l(y.bind(null,!0),!0):a.run(),b.pause=a.pause.bind(a),b.resume=a.resume.bind(a),b.stop=b,b}function Xe(t,e=1/0,n){if(e<=0||!ne(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,re(t))Xe(t.value,e,n);else if(z(t))for(let i=0;i<t.length;i++)Xe(t[i],e,n);else if(zr(t)||Mt(t))t.forEach(i=>{Xe(i,e,n)});else if($r(t)){for(const i in t)Xe(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Xe(t[i],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Bt(t,e,n,i){try{return i?t(...i):t()}catch(s){hn(s,e,n)}}function Pe(t,e,n,i){if(B(t)){const s=Bt(t,e,n,i);return s&&As(s)&&s.catch(r=>{hn(r,e,n)}),s}if(z(t)){const s=[];for(let r=0;r<t.length;r++)s.push(Pe(t[r],e,n,i));return s}}function hn(t,e,n,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:l}=e&&e.appContext.config||J;if(e){let o=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;o;){const a=o.ec;if(a){for(let u=0;u<a.length;u++)if(a[u](t,c,h)===!1)return}o=o.parent}if(r){$e(),Bt(r,null,10,[t,c,h]),He();return}}Sl(t,n,s,i,l)}function Sl(t,e,n,i=!0,s=!1){if(s)throw t;console.error(t)}const ae=[];let Re=-1;const ft=[];let We=null,ct=0;const Ws=Promise.resolve();let Qt=null;function Rl(t){const e=Qt||Ws;return t?e.then(this?t.bind(this):t):e}function Cl(t){let e=Re+1,n=ae.length;for(;e<n;){const i=e+n>>>1,s=ae[i],r=Lt(s);r<t||r===t&&s.flags&2?e=i+1:n=i}return e}function fi(t){if(!(t.flags&1)){const e=Lt(t),n=ae[ae.length-1];!n||!(t.flags&2)&&e>=Lt(n)?ae.push(t):ae.splice(Cl(e),0,t),t.flags|=1,qs()}}function qs(){Qt||(Qt=Ws.then(Ys))}function Dl(t){z(t)?ft.push(...t):We&&t.id===-1?We.splice(ct+1,0,t):t.flags&1||(ft.push(t),t.flags|=1),qs()}function Ri(t,e,n=Re+1){for(;n<ae.length;n++){const i=ae[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;ae.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Xs(t){if(ft.length){const e=[...new Set(ft)].sort((n,i)=>Lt(n)-Lt(i));if(ft.length=0,We){We.push(...e);return}for(We=e,ct=0;ct<We.length;ct++){const n=We[ct];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}We=null,ct=0}}const Lt=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Ys(t){try{for(Re=0;Re<ae.length;Re++){const e=ae[Re];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Bt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Re<ae.length;Re++){const e=ae[Re];e&&(e.flags&=-2)}Re=-1,ae.length=0,Xs(),Qt=null,(ae.length||ft.length)&&Ys()}}let De=null,Ks=null;function Jt(t){const e=De;return De=t,Ks=t&&t.type.__scopeId||null,e}function Ol(t,e=De,n){if(!e||t._n)return t;const i=(...s)=>{i._d&&Bi(-1);const r=Jt(e);let l;try{l=t(...s)}finally{Jt(r),i._d&&Bi(1)}return l};return i._n=!0,i._c=!0,i._d=!0,i}function Je(t,e,n,i){const s=t.dirs,r=e&&e.dirs;for(let l=0;l<s.length;l++){const o=s[l];r&&(o.oldValue=r[l].value);let c=o.dir[i];c&&($e(),Pe(c,n,8,[t.el,o,t,e]),He())}}const Pl=Symbol("_vte"),Il=t=>t.__isTeleport,Ul=Symbol("_leaveCb");function ui(t,e){t.shapeFlag&6&&t.component?(t.transition=e,ui(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Zs(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const en=new WeakMap;function Rt(t,e,n,i,s=!1){if(z(t)){t.forEach((v,x)=>Rt(v,e&&(z(e)?e[x]:e),n,i,s));return}if(Ct(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Rt(t,e,n,i.component.subTree);return}const r=i.shapeFlag&4?_i(i.component):i.el,l=s?null:r,{i:o,r:c}=t,h=e&&e.r,a=o.refs===J?o.refs={}:o.refs,u=o.setupState,p=V(u),g=u===J?Fs:v=>j(p,v);if(h!=null&&h!==c){if(Ci(e),ie(h))a[h]=null,g(h)&&(u[h]=null);else if(re(h)){h.value=null;const v=e;v.k&&(a[v.k]=null)}}if(B(c))Bt(c,o,12,[l,a]);else{const v=ie(c),x=re(c);if(v||x){const T=()=>{if(t.f){const b=v?g(c)?u[c]:a[c]:c.value;if(s)z(b)&&Qn(b,r);else if(z(b))b.includes(r)||b.push(r);else if(v)a[c]=[r],g(c)&&(u[c]=a[c]);else{const w=[r];c.value=w,t.k&&(a[t.k]=w)}}else v?(a[c]=l,g(c)&&(u[c]=l)):x&&(c.value=l,t.k&&(a[t.k]=l))};if(l){const b=()=>{T(),en.delete(t)};b.id=-1,en.set(t,b),me(b,n)}else Ci(t),T()}}}function Ci(t){const e=en.get(t);e&&(e.flags|=8,en.delete(t))}an().requestIdleCallback;an().cancelIdleCallback;const Ct=t=>!!t.type.__asyncLoader,Qs=t=>t.type.__isKeepAlive;function Ll(t,e){Js(t,"a",e)}function Nl(t,e){Js(t,"da",e)}function Js(t,e,n=he){const i=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(fn(e,i,n),n){let s=n.parent;for(;s&&s.parent;)Qs(s.parent.vnode)&&zl(i,e,n,s),s=s.parent}}function zl(t,e,n,i){const s=fn(e,t,i,!0);pi(()=>{Qn(i[e],s)},n)}function fn(t,e,n=he,i=!1){if(n){const s=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...l)=>{$e();const o=kt(n),c=Pe(e,n,t,l);return o(),He(),c});return i?s.unshift(r):s.push(r),r}}const Ve=t=>(e,n=he)=>{(!zt||t==="sp")&&fn(t,(...i)=>e(...i),n)},Bl=Ve("bm"),di=Ve("m"),kl=Ve("bu"),$l=Ve("u"),er=Ve("bum"),pi=Ve("um"),Hl=Ve("sp"),Vl=Ve("rtg"),jl=Ve("rtc");function Gl(t,e=he){fn("ec",t,e)}const Wl=Symbol.for("v-ndc"),Nn=t=>t?br(t)?_i(t):Nn(t.parent):null,Dt=fe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Nn(t.parent),$root:t=>Nn(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>nr(t),$forceUpdate:t=>t.f||(t.f=()=>{fi(t.update)}),$nextTick:t=>t.n||(t.n=Rl.bind(t.proxy)),$watch:t=>go.bind(t)}),yn=(t,e)=>t!==J&&!t.__isScriptSetup&&j(t,e),ql={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:s,props:r,accessCache:l,type:o,appContext:c}=t;let h;if(e[0]!=="$"){const g=l[e];if(g!==void 0)switch(g){case 1:return i[e];case 2:return s[e];case 4:return n[e];case 3:return r[e]}else{if(yn(i,e))return l[e]=1,i[e];if(s!==J&&j(s,e))return l[e]=2,s[e];if((h=t.propsOptions[0])&&j(h,e))return l[e]=3,r[e];if(n!==J&&j(n,e))return l[e]=4,n[e];zn&&(l[e]=0)}}const a=Dt[e];let u,p;if(a)return e==="$attrs"&&se(t.attrs,"get",""),a(t);if((u=o.__cssModules)&&(u=u[e]))return u;if(n!==J&&j(n,e))return l[e]=4,n[e];if(p=c.config.globalProperties,j(p,e))return p[e]},set({_:t},e,n){const{data:i,setupState:s,ctx:r}=t;return yn(s,e)?(s[e]=n,!0):i!==J&&j(i,e)?(i[e]=n,!0):j(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:s,propsOptions:r,type:l}},o){let c,h;return!!(n[o]||t!==J&&o[0]!=="$"&&j(t,o)||yn(e,o)||(c=r[0])&&j(c,o)||j(i,o)||j(Dt,o)||j(s.config.globalProperties,o)||(h=l.__cssModules)&&h[o])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:j(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Di(t){return z(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let zn=!0;function Xl(t){const e=nr(t),n=t.proxy,i=t.ctx;zn=!1,e.beforeCreate&&Oi(e.beforeCreate,t,"bc");const{data:s,computed:r,methods:l,watch:o,provide:c,inject:h,created:a,beforeMount:u,mounted:p,beforeUpdate:g,updated:v,activated:x,deactivated:T,beforeDestroy:b,beforeUnmount:w,destroyed:y,unmounted:_,render:C,renderTracked:P,renderTriggered:k,errorCaptured:q,serverPrefetch:ee,expose:H,inheritAttrs:X,components:W,directives:Y,filters:N}=e;if(h&&Yl(h,i,null),l)for(const te in l){const K=l[te];B(K)&&(i[te]=K.bind(n))}if(s){const te=s.call(n,n);ne(te)&&(t.data=ci(te))}if(zn=!0,r)for(const te in r){const K=r[te],Ze=B(K)?K.bind(n,n):B(K.get)?K.get.bind(n,n):Oe,Ht=!B(K)&&B(K.set)?K.set.bind(n):Oe,Qe=$o({get:Ze,set:Ht});Object.defineProperty(i,te,{enumerable:!0,configurable:!0,get:()=>Qe.value,set:Me=>Qe.value=Me})}if(o)for(const te in o)tr(o[te],i,n,te);if(c){const te=B(c)?c.call(n):c;Reflect.ownKeys(te).forEach(K=>{to(K,te[K])})}a&&Oi(a,t,"c");function le(te,K){z(K)?K.forEach(Ze=>te(Ze.bind(n))):K&&te(K.bind(n))}if(le(Bl,u),le(di,p),le(kl,g),le($l,v),le(Ll,x),le(Nl,T),le(Gl,q),le(jl,P),le(Vl,k),le(er,w),le(pi,_),le(Hl,ee),z(H))if(H.length){const te=t.exposed||(t.exposed={});H.forEach(K=>{Object.defineProperty(te,K,{get:()=>n[K],set:Ze=>n[K]=Ze,enumerable:!0})})}else t.exposed||(t.exposed={});C&&t.render===Oe&&(t.render=C),X!=null&&(t.inheritAttrs=X),W&&(t.components=W),Y&&(t.directives=Y),ee&&Zs(t)}function Yl(t,e,n=Oe){z(t)&&(t=Bn(t));for(const i in t){const s=t[i];let r;ne(s)?"default"in s?r=Xt(s.from||i,s.default,!0):r=Xt(s.from||i):r=Xt(s),re(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:l=>r.value=l}):e[i]=r}}function Oi(t,e,n){Pe(z(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function tr(t,e,n,i){let s=i.includes(".")?gr(n,i):()=>n[i];if(ie(t)){const r=e[t];B(r)&&En(s,r)}else if(B(t))En(s,t.bind(n));else if(ne(t))if(z(t))t.forEach(r=>tr(r,e,n,i));else{const r=B(t.handler)?t.handler.bind(n):e[t.handler];B(r)&&En(s,r,t)}}function nr(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:l}}=t.appContext,o=r.get(e);let c;return o?c=o:!s.length&&!n&&!i?c=e:(c={},s.length&&s.forEach(h=>tn(c,h,l,!0)),tn(c,e,l)),ne(e)&&r.set(e,c),c}function tn(t,e,n,i=!1){const{mixins:s,extends:r}=e;r&&tn(t,r,n,!0),s&&s.forEach(l=>tn(t,l,n,!0));for(const l in e)if(!(i&&l==="expose")){const o=Kl[l]||n&&n[l];t[l]=o?o(t[l],e[l]):e[l]}return t}const Kl={data:Pi,props:Ii,emits:Ii,methods:Et,computed:Et,beforeCreate:oe,created:oe,beforeMount:oe,mounted:oe,beforeUpdate:oe,updated:oe,beforeDestroy:oe,beforeUnmount:oe,destroyed:oe,unmounted:oe,activated:oe,deactivated:oe,errorCaptured:oe,serverPrefetch:oe,components:Et,directives:Et,watch:Ql,provide:Pi,inject:Zl};function Pi(t,e){return e?t?function(){return fe(B(t)?t.call(this,this):t,B(e)?e.call(this,this):e)}:e:t}function Zl(t,e){return Et(Bn(t),Bn(e))}function Bn(t){if(z(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function oe(t,e){return t?[...new Set([].concat(t,e))]:e}function Et(t,e){return t?fe(Object.create(null),t,e):e}function Ii(t,e){return t?z(t)&&z(e)?[...new Set([...t,...e])]:fe(Object.create(null),Di(t),Di(e??{})):e}function Ql(t,e){if(!t)return e;if(!e)return t;const n=fe(Object.create(null),t);for(const i in e)n[i]=oe(t[i],e[i]);return n}function ir(){return{app:null,config:{isNativeTag:Fs,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Jl=0;function eo(t,e){return function(i,s=null){B(i)||(i=fe({},i)),s!=null&&!ne(s)&&(s=null);const r=ir(),l=new WeakSet,o=[];let c=!1;const h=r.app={_uid:Jl++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Ho,get config(){return r.config},set config(a){},use(a,...u){return l.has(a)||(a&&B(a.install)?(l.add(a),a.install(h,...u)):B(a)&&(l.add(a),a(h,...u))),h},mixin(a){return r.mixins.includes(a)||r.mixins.push(a),h},component(a,u){return u?(r.components[a]=u,h):r.components[a]},directive(a,u){return u?(r.directives[a]=u,h):r.directives[a]},mount(a,u,p){if(!c){const g=h._ceVNode||it(i,s);return g.appContext=r,p===!0?p="svg":p===!1&&(p=void 0),t(g,a,p),c=!0,h._container=a,a.__vue_app__=h,_i(g.component)}},onUnmount(a){o.push(a)},unmount(){c&&(Pe(o,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(a,u){return r.provides[a]=u,h},runWithContext(a){const u=ut;ut=h;try{return a()}finally{ut=u}}};return h}}let ut=null;function to(t,e){if(he){let n=he.provides;const i=he.parent&&he.parent.provides;i===n&&(n=he.provides=Object.create(i)),n[t]=e}}function Xt(t,e,n=!1){const i=Uo();if(i||ut){let s=ut?ut._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&B(e)?e.call(i&&i.proxy):e}}const sr={},rr=()=>Object.create(sr),lr=t=>Object.getPrototypeOf(t)===sr;function no(t,e,n,i=!1){const s={},r=rr();t.propsDefaults=Object.create(null),or(t,e,s,r);for(const l in t.propsOptions[0])l in s||(s[l]=void 0);n?t.props=i?s:ml(s):t.type.props?t.props=s:t.props=r,t.attrs=r}function io(t,e,n,i){const{props:s,attrs:r,vnode:{patchFlag:l}}=t,o=V(s),[c]=t.propsOptions;let h=!1;if((i||l>0)&&!(l&16)){if(l&8){const a=t.vnode.dynamicProps;for(let u=0;u<a.length;u++){let p=a[u];if(un(t.emitsOptions,p))continue;const g=e[p];if(c)if(j(r,p))g!==r[p]&&(r[p]=g,h=!0);else{const v=Ke(p);s[v]=kn(c,o,v,g,t,!1)}else g!==r[p]&&(r[p]=g,h=!0)}}}else{or(t,e,s,r)&&(h=!0);let a;for(const u in o)(!e||!j(e,u)&&((a=rt(u))===u||!j(e,a)))&&(c?n&&(n[u]!==void 0||n[a]!==void 0)&&(s[u]=kn(c,o,u,void 0,t,!0)):delete s[u]);if(r!==o)for(const u in r)(!e||!j(e,u))&&(delete r[u],h=!0)}h&&ke(t.attrs,"set","")}function or(t,e,n,i){const[s,r]=t.propsOptions;let l=!1,o;if(e)for(let c in e){if(Tt(c))continue;const h=e[c];let a;s&&j(s,a=Ke(c))?!r||!r.includes(a)?n[a]=h:(o||(o={}))[a]=h:un(t.emitsOptions,c)||(!(c in i)||h!==i[c])&&(i[c]=h,l=!0)}if(r){const c=V(n),h=o||J;for(let a=0;a<r.length;a++){const u=r[a];n[u]=kn(s,c,u,h[u],t,!j(h,u))}}return l}function kn(t,e,n,i,s,r){const l=t[n];if(l!=null){const o=j(l,"default");if(o&&i===void 0){const c=l.default;if(l.type!==Function&&!l.skipFactory&&B(c)){const{propsDefaults:h}=s;if(n in h)i=h[n];else{const a=kt(s);i=h[n]=c.call(null,e),a()}}else i=c;s.ce&&s.ce._setProp(n,i)}l[0]&&(r&&!o?i=!1:l[1]&&(i===""||i===rt(n))&&(i=!0))}return i}const so=new WeakMap;function cr(t,e,n=!1){const i=n?so:e.propsCache,s=i.get(t);if(s)return s;const r=t.props,l={},o=[];let c=!1;if(!B(t)){const a=u=>{c=!0;const[p,g]=cr(u,e,!0);fe(l,p),g&&o.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}if(!r&&!c)return ne(t)&&i.set(t,ht),ht;if(z(r))for(let a=0;a<r.length;a++){const u=Ke(r[a]);Ui(u)&&(l[u]=J)}else if(r)for(const a in r){const u=Ke(a);if(Ui(u)){const p=r[a],g=l[u]=z(p)||B(p)?{type:p}:fe({},p),v=g.type;let x=!1,T=!0;if(z(v))for(let b=0;b<v.length;++b){const w=v[b],y=B(w)&&w.name;if(y==="Boolean"){x=!0;break}else y==="String"&&(T=!1)}else x=B(v)&&v.name==="Boolean";g[0]=x,g[1]=T,(x||j(g,"default"))&&o.push(u)}}const h=[l,o];return ne(t)&&i.set(t,h),h}function Ui(t){return t[0]!=="$"&&!Tt(t)}const gi=t=>t==="_"||t==="_ctx"||t==="$stable",vi=t=>z(t)?t.map(Ce):[Ce(t)],ro=(t,e,n)=>{if(e._n)return e;const i=Ol((...s)=>vi(e(...s)),n);return i._c=!1,i},ar=(t,e,n)=>{const i=t._ctx;for(const s in t){if(gi(s))continue;const r=t[s];if(B(r))e[s]=ro(s,r,i);else if(r!=null){const l=vi(r);e[s]=()=>l}}},hr=(t,e)=>{const n=vi(e);t.slots.default=()=>n},fr=(t,e,n)=>{for(const i in e)(n||!gi(i))&&(t[i]=e[i])},lo=(t,e,n)=>{const i=t.slots=rr();if(t.vnode.shapeFlag&32){const s=e._;s?(fr(i,e,n),n&&Rs(i,"_",s,!0)):ar(e,i)}else e&&hr(t,e)},oo=(t,e,n)=>{const{vnode:i,slots:s}=t;let r=!0,l=J;if(i.shapeFlag&32){const o=e._;o?n&&o===1?r=!1:fr(s,e,n):(r=!e.$stable,ar(e,s)),l=e}else e&&(hr(t,e),l={default:1});if(r)for(const o in s)!gi(o)&&l[o]==null&&delete s[o]},me=wo;function co(t){return ao(t)}function ao(t,e){const n=an();n.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:l,createText:o,createComment:c,setText:h,setElementText:a,parentNode:u,nextSibling:p,setScopeId:g=Oe,insertStaticContent:v}=t,x=(f,d,m,F=null,E=null,M=null,D=void 0,R=null,S=!!d.dynamicChildren)=>{if(f===d)return;f&&!yt(f,d)&&(F=Vt(f),Me(f,E,M,!0),f=null),d.patchFlag===-2&&(S=!1,d.dynamicChildren=null);const{type:A,ref:U,shapeFlag:O}=d;switch(A){case dn:T(f,d,m,F);break;case dt:b(f,d,m,F);break;case wn:f==null&&w(d,m,F,D);break;case Be:W(f,d,m,F,E,M,D,R,S);break;default:O&1?C(f,d,m,F,E,M,D,R,S):O&6?Y(f,d,m,F,E,M,D,R,S):(O&64||O&128)&&A.process(f,d,m,F,E,M,D,R,S,mt)}U!=null&&E?Rt(U,f&&f.ref,M,d||f,!d):U==null&&f&&f.ref!=null&&Rt(f.ref,null,M,f,!0)},T=(f,d,m,F)=>{if(f==null)i(d.el=o(d.children),m,F);else{const E=d.el=f.el;d.children!==f.children&&h(E,d.children)}},b=(f,d,m,F)=>{f==null?i(d.el=c(d.children||""),m,F):d.el=f.el},w=(f,d,m,F)=>{[f.el,f.anchor]=v(f.children,d,m,F,f.el,f.anchor)},y=({el:f,anchor:d},m,F)=>{let E;for(;f&&f!==d;)E=p(f),i(f,m,F),f=E;i(d,m,F)},_=({el:f,anchor:d})=>{let m;for(;f&&f!==d;)m=p(f),s(f),f=m;s(d)},C=(f,d,m,F,E,M,D,R,S)=>{d.type==="svg"?D="svg":d.type==="math"&&(D="mathml"),f==null?P(d,m,F,E,M,D,R,S):ee(f,d,E,M,D,R,S)},P=(f,d,m,F,E,M,D,R)=>{let S,A;const{props:U,shapeFlag:O,transition:I,dirs:L}=f;if(S=f.el=l(f.type,M,U&&U.is,U),O&8?a(S,f.children):O&16&&q(f.children,S,null,F,E,bn(f,M),D,R),L&&Je(f,null,F,"created"),k(S,f,f.scopeId,D,F),U){for(const Z in U)Z!=="value"&&!Tt(Z)&&r(S,Z,null,U[Z],M,F);"value"in U&&r(S,"value",null,U.value,M),(A=U.onVnodeBeforeMount)&&Se(A,F,f)}L&&Je(f,null,F,"beforeMount");const $=ho(E,I);$&&I.beforeEnter(S),i(S,d,m),((A=U&&U.onVnodeMounted)||$||L)&&me(()=>{A&&Se(A,F,f),$&&I.enter(S),L&&Je(f,null,F,"mounted")},E)},k=(f,d,m,F,E)=>{if(m&&g(f,m),F)for(let M=0;M<F.length;M++)g(f,F[M]);if(E){let M=E.subTree;if(d===M||mr(M.type)&&(M.ssContent===d||M.ssFallback===d)){const D=E.vnode;k(f,D,D.scopeId,D.slotScopeIds,E.parent)}}},q=(f,d,m,F,E,M,D,R,S=0)=>{for(let A=S;A<f.length;A++){const U=f[A]=R?qe(f[A]):Ce(f[A]);x(null,U,d,m,F,E,M,D,R)}},ee=(f,d,m,F,E,M,D)=>{const R=d.el=f.el;let{patchFlag:S,dynamicChildren:A,dirs:U}=d;S|=f.patchFlag&16;const O=f.props||J,I=d.props||J;let L;if(m&&et(m,!1),(L=I.onVnodeBeforeUpdate)&&Se(L,m,d,f),U&&Je(d,f,m,"beforeUpdate"),m&&et(m,!0),(O.innerHTML&&I.innerHTML==null||O.textContent&&I.textContent==null)&&a(R,""),A?H(f.dynamicChildren,A,R,m,F,bn(d,E),M):D||K(f,d,R,null,m,F,bn(d,E),M,!1),S>0){if(S&16)X(R,O,I,m,E);else if(S&2&&O.class!==I.class&&r(R,"class",null,I.class,E),S&4&&r(R,"style",O.style,I.style,E),S&8){const $=d.dynamicProps;for(let Z=0;Z<$.length;Z++){const G=$[Z],ue=O[G],de=I[G];(de!==ue||G==="value")&&r(R,G,ue,de,E,m)}}S&1&&f.children!==d.children&&a(R,d.children)}else!D&&A==null&&X(R,O,I,m,E);((L=I.onVnodeUpdated)||U)&&me(()=>{L&&Se(L,m,d,f),U&&Je(d,f,m,"updated")},F)},H=(f,d,m,F,E,M,D)=>{for(let R=0;R<d.length;R++){const S=f[R],A=d[R],U=S.el&&(S.type===Be||!yt(S,A)||S.shapeFlag&198)?u(S.el):m;x(S,A,U,null,F,E,M,D,!0)}},X=(f,d,m,F,E)=>{if(d!==m){if(d!==J)for(const M in d)!Tt(M)&&!(M in m)&&r(f,M,d[M],null,E,F);for(const M in m){if(Tt(M))continue;const D=m[M],R=d[M];D!==R&&M!=="value"&&r(f,M,R,D,E,F)}"value"in m&&r(f,"value",d.value,m.value,E)}},W=(f,d,m,F,E,M,D,R,S)=>{const A=d.el=f?f.el:o(""),U=d.anchor=f?f.anchor:o("");let{patchFlag:O,dynamicChildren:I,slotScopeIds:L}=d;L&&(R=R?R.concat(L):L),f==null?(i(A,m,F),i(U,m,F),q(d.children||[],m,U,E,M,D,R,S)):O>0&&O&64&&I&&f.dynamicChildren?(H(f.dynamicChildren,I,m,E,M,D,R),(d.key!=null||E&&d===E.subTree)&&ur(f,d,!0)):K(f,d,m,U,E,M,D,R,S)},Y=(f,d,m,F,E,M,D,R,S)=>{d.slotScopeIds=R,f==null?d.shapeFlag&512?E.ctx.activate(d,m,F,D,S):N(d,m,F,E,M,D,S):je(f,d,S)},N=(f,d,m,F,E,M,D)=>{const R=f.component=Io(f,F,E);if(Qs(f)&&(R.ctx.renderer=mt),Lo(R,!1,D),R.asyncDep){if(E&&E.registerDep(R,le,D),!f.el){const S=R.subTree=it(dt);b(null,S,d,m),f.placeholder=S.el}}else le(R,f,d,m,E,M,D)},je=(f,d,m)=>{const F=d.component=f.component;if(bo(f,d,m))if(F.asyncDep&&!F.asyncResolved){te(F,d,m);return}else F.next=d,F.update();else d.el=f.el,F.vnode=d},le=(f,d,m,F,E,M,D)=>{const R=()=>{if(f.isMounted){let{next:O,bu:I,u:L,parent:$,vnode:Z}=f;{const Fe=dr(f);if(Fe){O&&(O.el=Z.el,te(f,O,D)),Fe.asyncDep.then(()=>{f.isUnmounted||R()});return}}let G=O,ue;et(f,!1),O?(O.el=Z.el,te(f,O,D)):O=Z,I&&vn(I),(ue=O.props&&O.props.onVnodeBeforeUpdate)&&Se(ue,$,O,Z),et(f,!0);const de=Ni(f),Te=f.subTree;f.subTree=de,x(Te,de,u(Te.el),Vt(Te),f,E,M),O.el=de.el,G===null&&Eo(f,de.el),L&&me(L,E),(ue=O.props&&O.props.onVnodeUpdated)&&me(()=>Se(ue,$,O,Z),E)}else{let O;const{el:I,props:L}=d,{bm:$,m:Z,parent:G,root:ue,type:de}=f,Te=Ct(d);et(f,!1),$&&vn($),!Te&&(O=L&&L.onVnodeBeforeMount)&&Se(O,G,d),et(f,!0);{ue.ce&&ue.ce._def.shadowRoot!==!1&&ue.ce._injectChildStyle(de);const Fe=f.subTree=Ni(f);x(null,Fe,m,F,f,E,M),d.el=Fe.el}if(Z&&me(Z,E),!Te&&(O=L&&L.onVnodeMounted)){const Fe=d;me(()=>Se(O,G,Fe),E)}(d.shapeFlag&256||G&&Ct(G.vnode)&&G.vnode.shapeFlag&256)&&f.a&&me(f.a,E),f.isMounted=!0,d=m=F=null}};f.scope.on();const S=f.effect=new Ds(R);f.scope.off();const A=f.update=S.run.bind(S),U=f.job=S.runIfDirty.bind(S);U.i=f,U.id=f.uid,S.scheduler=()=>fi(U),et(f,!0),A()},te=(f,d,m)=>{d.component=f;const F=f.vnode.props;f.vnode=d,f.next=null,io(f,d.props,F,m),oo(f,d.children,m),$e(),Ri(f),He()},K=(f,d,m,F,E,M,D,R,S=!1)=>{const A=f&&f.children,U=f?f.shapeFlag:0,O=d.children,{patchFlag:I,shapeFlag:L}=d;if(I>0){if(I&128){Ht(A,O,m,F,E,M,D,R,S);return}else if(I&256){Ze(A,O,m,F,E,M,D,R,S);return}}L&8?(U&16&&vt(A,E,M),O!==A&&a(m,O)):U&16?L&16?Ht(A,O,m,F,E,M,D,R,S):vt(A,E,M,!0):(U&8&&a(m,""),L&16&&q(O,m,F,E,M,D,R,S))},Ze=(f,d,m,F,E,M,D,R,S)=>{f=f||ht,d=d||ht;const A=f.length,U=d.length,O=Math.min(A,U);let I;for(I=0;I<O;I++){const L=d[I]=S?qe(d[I]):Ce(d[I]);x(f[I],L,m,null,E,M,D,R,S)}A>U?vt(f,E,M,!0,!1,O):q(d,m,F,E,M,D,R,S,O)},Ht=(f,d,m,F,E,M,D,R,S)=>{let A=0;const U=d.length;let O=f.length-1,I=U-1;for(;A<=O&&A<=I;){const L=f[A],$=d[A]=S?qe(d[A]):Ce(d[A]);if(yt(L,$))x(L,$,m,null,E,M,D,R,S);else break;A++}for(;A<=O&&A<=I;){const L=f[O],$=d[I]=S?qe(d[I]):Ce(d[I]);if(yt(L,$))x(L,$,m,null,E,M,D,R,S);else break;O--,I--}if(A>O){if(A<=I){const L=I+1,$=L<U?d[L].el:F;for(;A<=I;)x(null,d[A]=S?qe(d[A]):Ce(d[A]),m,$,E,M,D,R,S),A++}}else if(A>I)for(;A<=O;)Me(f[A],E,M,!0),A++;else{const L=A,$=A,Z=new Map;for(A=$;A<=I;A++){const ve=d[A]=S?qe(d[A]):Ce(d[A]);ve.key!=null&&Z.set(ve.key,A)}let G,ue=0;const de=I-$+1;let Te=!1,Fe=0;const _t=new Array(de);for(A=0;A<de;A++)_t[A]=0;for(A=L;A<=O;A++){const ve=f[A];if(ue>=de){Me(ve,E,M,!0);continue}let Ae;if(ve.key!=null)Ae=Z.get(ve.key);else for(G=$;G<=I;G++)if(_t[G-$]===0&&yt(ve,d[G])){Ae=G;break}Ae===void 0?Me(ve,E,M,!0):(_t[Ae-$]=A+1,Ae>=Fe?Fe=Ae:Te=!0,x(ve,d[Ae],m,null,E,M,D,R,S),ue++)}const wi=Te?fo(_t):ht;for(G=wi.length-1,A=de-1;A>=0;A--){const ve=$+A,Ae=d[ve],Mi=d[ve+1],Ti=ve+1<U?Mi.el||Mi.placeholder:F;_t[A]===0?x(null,Ae,m,Ti,E,M,D,R,S):Te&&(G<0||A!==wi[G]?Qe(Ae,m,Ti,2):G--)}}},Qe=(f,d,m,F,E=null)=>{const{el:M,type:D,transition:R,children:S,shapeFlag:A}=f;if(A&6){Qe(f.component.subTree,d,m,F);return}if(A&128){f.suspense.move(d,m,F);return}if(A&64){D.move(f,d,m,mt);return}if(D===Be){i(M,d,m);for(let O=0;O<S.length;O++)Qe(S[O],d,m,F);i(f.anchor,d,m);return}if(D===wn){y(f,d,m);return}if(F!==2&&A&1&&R)if(F===0)R.beforeEnter(M),i(M,d,m),me(()=>R.enter(M),E);else{const{leave:O,delayLeave:I,afterLeave:L}=R,$=()=>{f.ctx.isUnmounted?s(M):i(M,d,m)},Z=()=>{M._isLeaving&&M[Ul](!0),O(M,()=>{$(),L&&L()})};I?I(M,$,Z):Z()}else i(M,d,m)},Me=(f,d,m,F=!1,E=!1)=>{const{type:M,props:D,ref:R,children:S,dynamicChildren:A,shapeFlag:U,patchFlag:O,dirs:I,cacheIndex:L}=f;if(O===-2&&(E=!1),R!=null&&($e(),Rt(R,null,m,f,!0),He()),L!=null&&(d.renderCache[L]=void 0),U&256){d.ctx.deactivate(f);return}const $=U&1&&I,Z=!Ct(f);let G;if(Z&&(G=D&&D.onVnodeBeforeUnmount)&&Se(G,d,f),U&6)Lr(f.component,m,F);else{if(U&128){f.suspense.unmount(m,F);return}$&&Je(f,null,d,"beforeUnmount"),U&64?f.type.remove(f,d,m,mt,F):A&&!A.hasOnce&&(M!==Be||O>0&&O&64)?vt(A,d,m,!1,!0):(M===Be&&O&384||!E&&U&16)&&vt(S,d,m),F&&bi(f)}(Z&&(G=D&&D.onVnodeUnmounted)||$)&&me(()=>{G&&Se(G,d,f),$&&Je(f,null,d,"unmounted")},m)},bi=f=>{const{type:d,el:m,anchor:F,transition:E}=f;if(d===Be){Ur(m,F);return}if(d===wn){_(f);return}const M=()=>{s(m),E&&!E.persisted&&E.afterLeave&&E.afterLeave()};if(f.shapeFlag&1&&E&&!E.persisted){const{leave:D,delayLeave:R}=E,S=()=>D(m,M);R?R(f.el,M,S):S()}else M()},Ur=(f,d)=>{let m;for(;f!==d;)m=p(f),s(f),f=m;s(d)},Lr=(f,d,m)=>{const{bum:F,scope:E,job:M,subTree:D,um:R,m:S,a:A}=f;Li(S),Li(A),F&&vn(F),E.stop(),M&&(M.flags|=8,Me(D,f,d,m)),R&&me(R,d),me(()=>{f.isUnmounted=!0},d)},vt=(f,d,m,F=!1,E=!1,M=0)=>{for(let D=M;D<f.length;D++)Me(f[D],d,m,F,E)},Vt=f=>{if(f.shapeFlag&6)return Vt(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const d=p(f.anchor||f.el),m=d&&d[Pl];return m?p(m):d};let pn=!1;const Ei=(f,d,m)=>{f==null?d._vnode&&Me(d._vnode,null,null,!0):x(d._vnode||null,f,d,null,null,null,m),d._vnode=f,pn||(pn=!0,Ri(),Xs(),pn=!1)},mt={p:x,um:Me,m:Qe,r:bi,mt:N,mc:q,pc:K,pbc:H,n:Vt,o:t};return{render:Ei,hydrate:void 0,createApp:eo(Ei)}}function bn({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function et({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function ho(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ur(t,e,n=!1){const i=t.children,s=e.children;if(z(i)&&z(s))for(let r=0;r<i.length;r++){const l=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=qe(s[r]),o.el=l.el),!n&&o.patchFlag!==-2&&ur(l,o)),o.type===dn&&o.patchFlag!==-1&&(o.el=l.el),o.type===dt&&!o.el&&(o.el=l.el)}}function fo(t){const e=t.slice(),n=[0];let i,s,r,l,o;const c=t.length;for(i=0;i<c;i++){const h=t[i];if(h!==0){if(s=n[n.length-1],t[s]<h){e[i]=s,n.push(i);continue}for(r=0,l=n.length-1;r<l;)o=r+l>>1,t[n[o]]<h?r=o+1:l=o;h<t[n[r]]&&(r>0&&(e[i]=n[r-1]),n[r]=i)}}for(r=n.length,l=n[r-1];r-- >0;)n[r]=l,l=e[l];return n}function dr(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:dr(e)}function Li(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const uo=Symbol.for("v-scx"),po=()=>Xt(uo);function En(t,e,n){return pr(t,e,n)}function pr(t,e,n=J){const{immediate:i,deep:s,flush:r,once:l}=n,o=fe({},n),c=e&&i||!e&&r!=="post";let h;if(zt){if(r==="sync"){const g=po();h=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=Oe,g.resume=Oe,g.pause=Oe,g}}const a=he;o.call=(g,v,x)=>Pe(g,a,v,x);let u=!1;r==="post"?o.scheduler=g=>{me(g,a&&a.suspense)}:r!=="sync"&&(u=!0,o.scheduler=(g,v)=>{v?g():fi(g)}),o.augmentJob=g=>{e&&(g.flags|=4),u&&(g.flags|=2,a&&(g.id=a.uid,g.i=a))};const p=Al(t,e,o);return zt&&(h?h.push(p):c&&p()),p}function go(t,e,n){const i=this.proxy,s=ie(t)?t.includes(".")?gr(i,t):()=>i[t]:t.bind(i,i);let r;B(e)?r=e:(r=e.handler,n=e);const l=kt(this),o=pr(s,r.bind(i),n);return l(),o}function gr(t,e){const n=e.split(".");return()=>{let i=t;for(let s=0;s<n.length&&i;s++)i=i[n[s]];return i}}const vo=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ke(e)}Modifiers`]||t[`${rt(e)}Modifiers`];function mo(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||J;let s=n;const r=e.startsWith("update:"),l=r&&vo(i,e.slice(7));l&&(l.trim&&(s=n.map(a=>ie(a)?a.trim():a)),l.number&&(s=n.map(jr)));let o,c=i[o=gn(e)]||i[o=gn(Ke(e))];!c&&r&&(c=i[o=gn(rt(e))]),c&&Pe(c,t,6,s);const h=i[o+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[o])return;t.emitted[o]=!0,Pe(h,t,6,s)}}const _o=new WeakMap;function vr(t,e,n=!1){const i=n?_o:e.emitsCache,s=i.get(t);if(s!==void 0)return s;const r=t.emits;let l={},o=!1;if(!B(t)){const c=h=>{const a=vr(h,e,!0);a&&(o=!0,fe(l,a))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!r&&!o?(ne(t)&&i.set(t,null),null):(z(r)?r.forEach(c=>l[c]=null):fe(l,r),ne(t)&&i.set(t,l),l)}function un(t,e){return!t||!ln(e)?!1:(e=e.slice(2).replace(/Once$/,""),j(t,e[0].toLowerCase()+e.slice(1))||j(t,rt(e))||j(t,e))}function Ni(t){const{type:e,vnode:n,proxy:i,withProxy:s,propsOptions:[r],slots:l,attrs:o,emit:c,render:h,renderCache:a,props:u,data:p,setupState:g,ctx:v,inheritAttrs:x}=t,T=Jt(t);let b,w;try{if(n.shapeFlag&4){const _=s||i,C=_;b=Ce(h.call(C,_,a,u,g,p,v)),w=o}else{const _=e;b=Ce(_.length>1?_(u,{attrs:o,slots:l,emit:c}):_(u,null)),w=e.props?o:xo(o)}}catch(_){Ot.length=0,hn(_,t,1),b=it(dt)}let y=b;if(w&&x!==!1){const _=Object.keys(w),{shapeFlag:C}=y;_.length&&C&7&&(r&&_.some(Zn)&&(w=yo(w,r)),y=pt(y,w,!1,!0))}return n.dirs&&(y=pt(y,null,!1,!0),y.dirs=y.dirs?y.dirs.concat(n.dirs):n.dirs),n.transition&&ui(y,n.transition),b=y,Jt(T),b}const xo=t=>{let e;for(const n in t)(n==="class"||n==="style"||ln(n))&&((e||(e={}))[n]=t[n]);return e},yo=(t,e)=>{const n={};for(const i in t)(!Zn(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function bo(t,e,n){const{props:i,children:s,component:r}=t,{props:l,children:o,patchFlag:c}=e,h=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return i?zi(i,l,h):!!l;if(c&8){const a=e.dynamicProps;for(let u=0;u<a.length;u++){const p=a[u];if(l[p]!==i[p]&&!un(h,p))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===l?!1:i?l?zi(i,l,h):!0:!!l;return!1}function zi(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==t[r]&&!un(n,r))return!0}return!1}function Eo({vnode:t,parent:e},n){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===t&&(i.el=t.el),i===t)(t=e.vnode).el=n,e=e.parent;else break}}const mr=t=>t.__isSuspense;function wo(t,e){e&&e.pendingBranch?z(t)?e.effects.push(...t):e.effects.push(t):Dl(t)}const Be=Symbol.for("v-fgt"),dn=Symbol.for("v-txt"),dt=Symbol.for("v-cmt"),wn=Symbol.for("v-stc"),Ot=[];let _e=null;function Mo(t=!1){Ot.push(_e=t?null:[])}function To(){Ot.pop(),_e=Ot[Ot.length-1]||null}let Nt=1;function Bi(t,e=!1){Nt+=t,t<0&&_e&&e&&(_e.hasOnce=!0)}function Fo(t){return t.dynamicChildren=Nt>0?_e||ht:null,To(),Nt>0&&_e&&_e.push(t),t}function Ao(t,e,n,i,s,r){return Fo(yr(t,e,n,i,s,r,!0))}function _r(t){return t?t.__v_isVNode===!0:!1}function yt(t,e){return t.type===e.type&&t.key===e.key}const xr=({key:t})=>t??null,Yt=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ie(t)||re(t)||B(t)?{i:De,r:t,k:e,f:!!n}:t:null);function yr(t,e=null,n=null,i=0,s=null,r=t===Be?0:1,l=!1,o=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&xr(e),ref:e&&Yt(e),scopeId:Ks,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:De};return o?(mi(c,n),r&128&&t.normalize(c)):n&&(c.shapeFlag|=ie(n)?8:16),Nt>0&&!l&&_e&&(c.patchFlag>0||r&6)&&c.patchFlag!==32&&_e.push(c),c}const it=So;function So(t,e=null,n=null,i=0,s=null,r=!1){if((!t||t===Wl)&&(t=dt),_r(t)){const o=pt(t,e,!0);return n&&mi(o,n),Nt>0&&!r&&_e&&(o.shapeFlag&6?_e[_e.indexOf(t)]=o:_e.push(o)),o.patchFlag=-2,o}if(ko(t)&&(t=t.__vccOpts),e){e=Ro(e);let{class:o,style:c}=e;o&&!ie(o)&&(e.class=ti(o)),ne(c)&&(hi(c)&&!z(c)&&(c=fe({},c)),e.style=ei(c))}const l=ie(t)?1:mr(t)?128:Il(t)?64:ne(t)?4:B(t)?2:0;return yr(t,e,n,i,s,l,r,!0)}function Ro(t){return t?hi(t)||lr(t)?fe({},t):t:null}function pt(t,e,n=!1,i=!1){const{props:s,ref:r,patchFlag:l,children:o,transition:c}=t,h=e?Do(s||{},e):s,a={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&xr(h),ref:e&&e.ref?n&&r?z(r)?r.concat(Yt(e)):[r,Yt(e)]:Yt(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Be?l===-1?16:l|16:l,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&pt(t.ssContent),ssFallback:t.ssFallback&&pt(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&i&&ui(a,c.clone(a)),a}function Co(t=" ",e=0){return it(dn,null,t,e)}function Ce(t){return t==null||typeof t=="boolean"?it(dt):z(t)?it(Be,null,t.slice()):_r(t)?qe(t):it(dn,null,String(t))}function qe(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:pt(t)}function mi(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(z(e))n=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),mi(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!lr(e)?e._ctx=De:s===3&&De&&(De.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else B(e)?(e={default:e,_ctx:De},n=32):(e=String(e),i&64?(n=16,e=[Co(e)]):n=8);t.children=e,t.shapeFlag|=n}function Do(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=ti([e.class,i.class]));else if(s==="style")e.style=ei([e.style,i.style]);else if(ln(s)){const r=e[s],l=i[s];l&&r!==l&&!(z(r)&&r.includes(l))&&(e[s]=r?[].concat(r,l):l)}else s!==""&&(e[s]=i[s])}return e}function Se(t,e,n,i=null){Pe(t,e,7,[n,i])}const Oo=ir();let Po=0;function Io(t,e,n){const i=t.type,s=(e?e.appContext:t.appContext)||Oo,r={uid:Po++,vnode:t,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Zr(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cr(i,s),emitsOptions:vr(i,s),emit:null,emitted:null,propsDefaults:J,inheritAttrs:i.inheritAttrs,ctx:J,data:J,props:J,attrs:J,slots:J,refs:J,setupState:J,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=mo.bind(null,r),t.ce&&t.ce(r),r}let he=null;const Uo=()=>he||De;let nn,$n;{const t=an(),e=(n,i)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(i),r=>{s.length>1?s.forEach(l=>l(r)):s[0](r)}};nn=e("__VUE_INSTANCE_SETTERS__",n=>he=n),$n=e("__VUE_SSR_SETTERS__",n=>zt=n)}const kt=t=>{const e=he;return nn(t),t.scope.on(),()=>{t.scope.off(),nn(e)}},ki=()=>{he&&he.scope.off(),nn(null)};function br(t){return t.vnode.shapeFlag&4}let zt=!1;function Lo(t,e=!1,n=!1){e&&$n(e);const{props:i,children:s}=t.vnode,r=br(t);no(t,i,r,e),lo(t,s,n||e);const l=r?No(t,e):void 0;return e&&$n(!1),l}function No(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,ql);const{setup:i}=n;if(i){$e();const s=t.setupContext=i.length>1?Bo(t):null,r=kt(t),l=Bt(i,t,0,[t.props,s]),o=As(l);if(He(),r(),(o||t.sp)&&!Ct(t)&&Zs(t),o){if(l.then(ki,ki),e)return l.then(c=>{$i(t,c)}).catch(c=>{hn(c,t,0)});t.asyncDep=l}else $i(t,l)}else Er(t)}function $i(t,e,n){B(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ne(e)&&(t.setupState=Gs(e)),Er(t)}function Er(t,e,n){const i=t.type;t.render||(t.render=i.render||Oe);{const s=kt(t);$e();try{Xl(t)}finally{He(),s()}}}const zo={get(t,e){return se(t,"get",""),t[e]}};function Bo(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,zo),slots:t.slots,emit:t.emit,expose:e}}function _i(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Gs(_l(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Dt)return Dt[n](t)},has(e,n){return n in e||n in Dt}})):t.proxy}function ko(t){return B(t)&&"__vccOpts"in t}const $o=(t,e)=>Tl(t,e,zt),Ho="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Hn;const Hi=typeof window<"u"&&window.trustedTypes;if(Hi)try{Hn=Hi.createPolicy("vue",{createHTML:t=>t})}catch{}const wr=Hn?t=>Hn.createHTML(t):t=>t,Vo="http://www.w3.org/2000/svg",jo="http://www.w3.org/1998/Math/MathML",ze=typeof document<"u"?document:null,Vi=ze&&ze.createElement("template"),Go={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const s=e==="svg"?ze.createElementNS(Vo,t):e==="mathml"?ze.createElementNS(jo,t):n?ze.createElement(t,{is:n}):ze.createElement(t);return t==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:t=>ze.createTextNode(t),createComment:t=>ze.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>ze.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,s,r){const l=n?n.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===r||!(s=s.nextSibling)););else{Vi.innerHTML=wr(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const o=Vi.content;if(i==="svg"||i==="mathml"){const c=o.firstChild;for(;c.firstChild;)o.appendChild(c.firstChild);o.removeChild(c)}e.insertBefore(o,n)}return[l?l.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Wo=Symbol("_vtc");function qo(t,e,n){const i=t[Wo];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const ji=Symbol("_vod"),Xo=Symbol("_vsh"),Yo=Symbol(""),Ko=/(?:^|;)\s*display\s*:/;function Zo(t,e,n){const i=t.style,s=ie(n);let r=!1;if(n&&!s){if(e)if(ie(e))for(const l of e.split(";")){const o=l.slice(0,l.indexOf(":")).trim();n[o]==null&&Kt(i,o,"")}else for(const l in e)n[l]==null&&Kt(i,l,"");for(const l in n)l==="display"&&(r=!0),Kt(i,l,n[l])}else if(s){if(e!==n){const l=i[Yo];l&&(n+=";"+l),i.cssText=n,r=Ko.test(n)}}else e&&t.removeAttribute("style");ji in t&&(t[ji]=r?i.display:"",t[Xo]&&(i.display="none"))}const Gi=/\s*!important$/;function Kt(t,e,n){if(z(n))n.forEach(i=>Kt(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=Qo(t,e);Gi.test(n)?t.setProperty(rt(i),n.replace(Gi,""),"important"):t[i]=n}}const Wi=["Webkit","Moz","ms"],Mn={};function Qo(t,e){const n=Mn[e];if(n)return n;let i=Ke(e);if(i!=="filter"&&i in t)return Mn[e]=i;i=Ss(i);for(let s=0;s<Wi.length;s++){const r=Wi[s]+i;if(r in t)return Mn[e]=r}return e}const qi="http://www.w3.org/1999/xlink";function Xi(t,e,n,i,s,r=Kr(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(qi,e.slice(6,e.length)):t.setAttributeNS(qi,e,n):n==null||r&&!Cs(n)?t.removeAttribute(e):t.setAttribute(e,r?"":gt(n)?String(n):n)}function Yi(t,e,n,i,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?wr(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(o!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let l=!1;if(n===""||n==null){const o=typeof t[e];o==="boolean"?n=Cs(n):n==null&&o==="string"?(n="",l=!0):o==="number"&&(n=0,l=!0)}try{t[e]=n}catch{}l&&t.removeAttribute(s||e)}function Jo(t,e,n,i){t.addEventListener(e,n,i)}function ec(t,e,n,i){t.removeEventListener(e,n,i)}const Ki=Symbol("_vei");function tc(t,e,n,i,s=null){const r=t[Ki]||(t[Ki]={}),l=r[e];if(i&&l)l.value=i;else{const[o,c]=nc(e);if(i){const h=r[e]=rc(i,s);Jo(t,o,h,c)}else l&&(ec(t,o,l,c),r[e]=void 0)}}const Zi=/(?:Once|Passive|Capture)$/;function nc(t){let e;if(Zi.test(t)){e={};let i;for(;i=t.match(Zi);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):rt(t.slice(2)),e]}let Tn=0;const ic=Promise.resolve(),sc=()=>Tn||(ic.then(()=>Tn=0),Tn=Date.now());function rc(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;Pe(lc(i,n.value),e,5,[i])};return n.value=t,n.attached=sc(),n}function lc(t,e){if(z(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Qi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,oc=(t,e,n,i,s,r)=>{const l=s==="svg";e==="class"?qo(t,i,l):e==="style"?Zo(t,n,i):ln(e)?Zn(e)||tc(t,e,n,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):cc(t,e,i,l))?(Yi(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Xi(t,e,i,l,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ie(i))?Yi(t,Ke(e),i,r,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),Xi(t,e,i,l))};function cc(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&Qi(e)&&B(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Qi(e)&&ie(n)?!1:e in t}const ac=fe({patchProp:oc},Go);let Ji;function hc(){return Ji||(Ji=co(ac))}const fc=((...t)=>{const e=hc().createApp(...t),{mount:n}=e;return e.mount=i=>{const s=dc(i);if(!s)return;const r=e._component;!B(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const l=n(s,!1,uc(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),l},e});function uc(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function dc(t){return ie(t)?document.querySelector(t):t}function Pt(t){let e=t[0],n=t[1],i=t[2];return Math.sqrt(e*e+n*n+i*i)}function Vn(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function pc(t,e,n,i){return t[0]=e,t[1]=n,t[2]=i,t}function es(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t}function ts(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t}function gc(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t[2]=e[2]*n[2],t}function vc(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t[2]=e[2]/n[2],t}function Fn(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t}function mc(t,e){let n=e[0]-t[0],i=e[1]-t[1],s=e[2]-t[2];return Math.sqrt(n*n+i*i+s*s)}function _c(t,e){let n=e[0]-t[0],i=e[1]-t[1],s=e[2]-t[2];return n*n+i*i+s*s}function ns(t){let e=t[0],n=t[1],i=t[2];return e*e+n*n+i*i}function xc(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t}function yc(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t}function jn(t,e){let n=e[0],i=e[1],s=e[2],r=n*n+i*i+s*s;return r>0&&(r=1/Math.sqrt(r)),t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t}function Mr(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function is(t,e,n){let i=e[0],s=e[1],r=e[2],l=n[0],o=n[1],c=n[2];return t[0]=s*c-r*o,t[1]=r*l-i*c,t[2]=i*o-s*l,t}function bc(t,e,n,i){let s=e[0],r=e[1],l=e[2];return t[0]=s+i*(n[0]-s),t[1]=r+i*(n[1]-r),t[2]=l+i*(n[2]-l),t}function Ec(t,e,n,i,s){const r=Math.exp(-i*s);let l=e[0],o=e[1],c=e[2];return t[0]=n[0]+(l-n[0])*r,t[1]=n[1]+(o-n[1])*r,t[2]=n[2]+(c-n[2])*r,t}function wc(t,e,n){let i=e[0],s=e[1],r=e[2],l=n[3]*i+n[7]*s+n[11]*r+n[15];return l=l||1,t[0]=(n[0]*i+n[4]*s+n[8]*r+n[12])/l,t[1]=(n[1]*i+n[5]*s+n[9]*r+n[13])/l,t[2]=(n[2]*i+n[6]*s+n[10]*r+n[14])/l,t}function Mc(t,e,n){let i=e[0],s=e[1],r=e[2],l=n[3]*i+n[7]*s+n[11]*r+n[15];return l=l||1,t[0]=(n[0]*i+n[4]*s+n[8]*r)/l,t[1]=(n[1]*i+n[5]*s+n[9]*r)/l,t[2]=(n[2]*i+n[6]*s+n[10]*r)/l,t}function Tc(t,e,n){let i=e[0],s=e[1],r=e[2];return t[0]=i*n[0]+s*n[3]+r*n[6],t[1]=i*n[1]+s*n[4]+r*n[7],t[2]=i*n[2]+s*n[5]+r*n[8],t}function Fc(t,e,n){let i=e[0],s=e[1],r=e[2],l=n[0],o=n[1],c=n[2],h=n[3],a=o*r-c*s,u=c*i-l*r,p=l*s-o*i,g=o*p-c*u,v=c*a-l*p,x=l*u-o*a,T=h*2;return a*=T,u*=T,p*=T,g*=2,v*=2,x*=2,t[0]=i+a+g,t[1]=s+u+v,t[2]=r+p+x,t}const Ac=(function(){const t=[0,0,0],e=[0,0,0];return function(n,i){Vn(t,n),Vn(e,i),jn(t,t),jn(e,e);let s=Mr(t,e);return s>1?0:s<-1?Math.PI:Math.acos(s)}})();function Sc(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}class ye extends Array{constructor(e=0,n=e,i=e){return super(e,n,i),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this[0]=e}set y(e){this[1]=e}set z(e){this[2]=e}set(e,n=e,i=e){return e.length?this.copy(e):(pc(this,e,n,i),this)}copy(e){return Vn(this,e),this}add(e,n){return n?es(this,e,n):es(this,this,e),this}sub(e,n){return n?ts(this,e,n):ts(this,this,e),this}multiply(e){return e.length?gc(this,this,e):Fn(this,this,e),this}divide(e){return e.length?vc(this,this,e):Fn(this,this,1/e),this}inverse(e=this){return yc(this,e),this}len(){return Pt(this)}distance(e){return e?mc(this,e):Pt(this)}squaredLen(){return ns(this)}squaredDistance(e){return e?_c(this,e):ns(this)}negate(e=this){return xc(this,e),this}cross(e,n){return n?is(this,e,n):is(this,this,e),this}scale(e){return Fn(this,this,e),this}normalize(){return jn(this,this),this}dot(e){return Mr(this,e)}equals(e){return Sc(this,e)}applyMatrix3(e){return Tc(this,this,e),this}applyMatrix4(e){return wc(this,this,e),this}scaleRotateMatrix4(e){return Mc(this,this,e),this}applyQuaternion(e){return Fc(this,this,e),this}angle(e){return Ac(this,e)}lerp(e,n){return bc(this,this,e,n),this}smoothLerp(e,n,i){return Ec(this,this,e,n,i),this}clone(){return new ye(this[0],this[1],this[2])}fromArray(e,n=0){return this[0]=e[n],this[1]=e[n+1],this[2]=e[n+2],this}toArray(e=[],n=0){return e[n]=this[0],e[n+1]=this[1],e[n+2]=this[2],e}transformDirection(e){const n=this[0],i=this[1],s=this[2];return this[0]=e[0]*n+e[4]*i+e[8]*s,this[1]=e[1]*n+e[5]*i+e[9]*s,this[2]=e[2]*n+e[6]*i+e[10]*s,this.normalize()}}const ss=new ye;let Rc=1,Cc=1,rs=!1;class Tr{constructor(e,n={}){e.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=e,this.attributes=n,this.id=Rc++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let i in n)this.addAttribute(i,n[i])}addAttribute(e,n){if(this.attributes[e]=n,n.id=Cc++,n.size=n.size||1,n.type=n.type||(n.data.constructor===Float32Array?this.gl.FLOAT:n.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),n.target=e==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,n.normalized=n.normalized||!1,n.stride=n.stride||0,n.offset=n.offset||0,n.count=n.count||(n.stride?n.data.byteLength/n.stride:n.data.length/n.size),n.divisor=n.instanced||0,n.needsUpdate=!1,n.usage=n.usage||this.gl.STATIC_DRAW,n.buffer||this.updateAttribute(n),n.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==n.count*n.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,n.count*n.divisor);this.instancedCount=n.count*n.divisor}else e==="index"?this.drawRange.count=n.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,n.count))}updateAttribute(e){const n=!e.buffer;n&&(e.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==e.buffer&&(this.gl.bindBuffer(e.target,e.buffer),this.glState.boundBuffer=e.buffer),n?this.gl.bufferData(e.target,e.data,e.usage):this.gl.bufferSubData(e.target,0,e.data),e.needsUpdate=!1}setIndex(e){this.addAttribute("index",e)}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}setInstancedCount(e){this.instancedCount=e}createVAO(e){this.VAOs[e.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.bindAttributes(e)}bindAttributes(e){e.attributeLocations.forEach((n,{name:i,type:s})=>{if(!this.attributes[i]){console.warn(`active attribute ${i} not being supplied`);return}const r=this.attributes[i];this.gl.bindBuffer(r.target,r.buffer),this.glState.boundBuffer=r.buffer;let l=1;s===35674&&(l=2),s===35675&&(l=3),s===35676&&(l=4);const o=r.size/l,c=l===1?0:l*l*4,h=l===1?0:l*4;for(let a=0;a<l;a++)this.gl.vertexAttribPointer(n+a,o,r.type,r.normalized,r.stride+c,r.offset+a*h),this.gl.enableVertexAttribArray(n+a),this.gl.renderer.vertexAttribDivisor(n+a,r.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:e,mode:n=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${e.attributeOrder}`&&(this.VAOs[e.attributeOrder]||this.createVAO(e),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${e.attributeOrder}`),e.attributeLocations.forEach((s,{name:r})=>{const l=this.attributes[r];l.needsUpdate&&this.updateAttribute(l)});let i=2;this.attributes.index?.type===this.gl.UNSIGNED_INT&&(i=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(n,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*i,this.instancedCount):this.gl.renderer.drawArraysInstanced(n,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(n,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*i):this.gl.drawArrays(n,this.drawRange.start,this.drawRange.count)}getPosition(){const e=this.attributes.position;if(e.data)return e;if(!rs)return console.warn("No position buffer data found to compute bounds"),rs=!0}computeBoundingBox(e){e||(e=this.getPosition());const n=e.data,i=e.size;this.bounds||(this.bounds={min:new ye,max:new ye,center:new ye,scale:new ye,radius:1/0});const s=this.bounds.min,r=this.bounds.max,l=this.bounds.center,o=this.bounds.scale;s.set(1/0),r.set(-1/0);for(let c=0,h=n.length;c<h;c+=i){const a=n[c],u=n[c+1],p=n[c+2];s.x=Math.min(a,s.x),s.y=Math.min(u,s.y),s.z=Math.min(p,s.z),r.x=Math.max(a,r.x),r.y=Math.max(u,r.y),r.z=Math.max(p,r.z)}o.sub(r,s),l.add(s,r).divide(2)}computeBoundingSphere(e){e||(e=this.getPosition());const n=e.data,i=e.size;this.bounds||this.computeBoundingBox(e);let s=0;for(let r=0,l=n.length;r<l;r+=i)ss.fromArray(n,r),s=Math.max(s,this.bounds.center.squaredDistance(ss));this.bounds.radius=Math.sqrt(s)}remove(){for(let e in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[e]),delete this.VAOs[e];for(let e in this.attributes)this.gl.deleteBuffer(this.attributes[e].buffer),delete this.attributes[e]}}let Dc=1;const ls={};class Fr{constructor(e,{vertex:n,fragment:i,uniforms:s={},transparent:r=!1,cullFace:l=e.BACK,frontFace:o=e.CCW,depthTest:c=!0,depthWrite:h=!0,depthFunc:a=e.LEQUAL}={}){e.canvas||console.error("gl not passed as first argument to Program"),this.gl=e,this.uniforms=s,this.id=Dc++,n||console.warn("vertex shader not supplied"),i||console.warn("fragment shader not supplied"),this.transparent=r,this.cullFace=l,this.frontFace=o,this.depthTest=c,this.depthWrite=h,this.depthFunc=a,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=e.createShader(e.VERTEX_SHADER),this.fragmentShader=e.createShader(e.FRAGMENT_SHADER),this.program=e.createProgram(),e.attachShader(this.program,this.vertexShader),e.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:n,fragment:i})}setShaders({vertex:e,fragment:n}){if(e&&(this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${os(e)}`)),n&&(this.gl.shaderSource(this.fragmentShader,n),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${os(n)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let i=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let l=0;l<i;l++){let o=this.gl.getActiveUniform(this.program,l);this.uniformLocations.set(o,this.gl.getUniformLocation(this.program,o.name));const c=o.name.match(/(\w+)/g);o.uniformName=c[0],o.nameComponents=c.slice(1)}this.attributeLocations=new Map;const s=[],r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const o=this.gl.getActiveAttrib(this.program,l),c=this.gl.getAttribLocation(this.program,o.name);c!==-1&&(s[c]=o.name,this.attributeLocations.set(o,c))}this.attributeOrder=s.join("")}setBlendFunc(e,n,i,s){this.blendFunc.src=e,this.blendFunc.dst=n,this.blendFunc.srcAlpha=i,this.blendFunc.dstAlpha=s,e&&(this.transparent=!0)}setBlendEquation(e,n){this.blendEquation.modeRGB=e,this.blendEquation.modeAlpha=n}setStencilFunc(e,n,i){this.stencilRef=n,this.stencilFunc.func=e,this.stencilFunc.ref=n,this.stencilFunc.mask=i}setStencilOp(e,n,i){this.stencilOp.stencilFail=e,this.stencilOp.depthFail=n,this.stencilOp.depthPass=i}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:e=!1}={}){let n=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((s,r)=>{let l=this.uniforms[r.uniformName];for(const o of r.nameComponents){if(!l)break;if(o in l)l=l[o];else{if(Array.isArray(l.value))break;l=void 0;break}}if(!l)return cs(`Active uniform ${r.name} has not been supplied`);if(l&&l.value===void 0)return cs(`${r.name} uniform is missing a value parameter`);if(l.value.texture)return n=n+1,l.value.update(n),An(this.gl,r.type,s,n);if(l.value.length&&l.value[0].texture){const o=[];return l.value.forEach(c=>{n=n+1,c.update(n),o.push(n)}),An(this.gl,r.type,s,o)}An(this.gl,r.type,s,l.value)}),this.applyState(),e&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}}function An(t,e,n,i){i=i.length?Oc(i):i;const s=t.renderer.state.uniformLocations.get(n);if(i.length)if(s===void 0||s.length!==i.length)t.renderer.state.uniformLocations.set(n,i.slice(0));else{if(Pc(s,i))return;s.set?s.set(i):Ic(s,i),t.renderer.state.uniformLocations.set(n,s)}else{if(s===i)return;t.renderer.state.uniformLocations.set(n,i)}switch(e){case 5126:return i.length?t.uniform1fv(n,i):t.uniform1f(n,i);case 35664:return t.uniform2fv(n,i);case 35665:return t.uniform3fv(n,i);case 35666:return t.uniform4fv(n,i);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return i.length?t.uniform1iv(n,i):t.uniform1i(n,i);case 35671:case 35667:return t.uniform2iv(n,i);case 35672:case 35668:return t.uniform3iv(n,i);case 35673:case 35669:return t.uniform4iv(n,i);case 35674:return t.uniformMatrix2fv(n,!1,i);case 35675:return t.uniformMatrix3fv(n,!1,i);case 35676:return t.uniformMatrix4fv(n,!1,i)}}function os(t){let e=t.split(`
`);for(let n=0;n<e.length;n++)e[n]=n+1+": "+e[n];return e.join(`
`)}function Oc(t){const e=t.length,n=t[0].length;if(n===void 0)return t;const i=e*n;let s=ls[i];s||(ls[i]=s=new Float32Array(i));for(let r=0;r<e;r++)s.set(t[r],r*n);return s}function Pc(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ic(t,e){for(let n=0,i=t.length;n<i;n++)t[n]=e[n]}let Sn=0;function cs(t){Sn>100||(console.warn(t),Sn++,Sn>100&&console.warn("More than 100 program warnings - stopping logs."))}const Rn=new ye;let Uc=1;class Lc{constructor({canvas:e=document.createElement("canvas"),width:n=300,height:i=150,dpr:s=1,alpha:r=!1,depth:l=!0,stencil:o=!1,antialias:c=!1,premultipliedAlpha:h=!1,preserveDrawingBuffer:a=!1,powerPreference:u="default",autoClear:p=!0,webgl:g=2}={}){const v={alpha:r,depth:l,stencil:o,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:a,powerPreference:u};this.dpr=s,this.alpha=r,this.color=!0,this.depth=l,this.stencil=o,this.premultipliedAlpha=h,this.autoClear=p,this.id=Uc++,g===2&&(this.gl=e.getContext("webgl2",v)),this.isWebgl2=!!this.gl,this.gl||(this.gl=e.getContext("webgl",v)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(n,i),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(e,n){this.width=e,this.height=n,this.gl.canvas.width=e*this.dpr,this.gl.canvas.height=n*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:e+"px",height:n+"px"})}setViewport(e,n,i=0,s=0){this.state.viewport.width===e&&this.state.viewport.height===n||(this.state.viewport.width=e,this.state.viewport.height=n,this.state.viewport.x=i,this.state.viewport.y=s,this.gl.viewport(i,s,e,n))}setScissor(e,n,i=0,s=0){this.gl.scissor(i,s,e,n)}enable(e){this.state[e]!==!0&&(this.gl.enable(e),this.state[e]=!0)}disable(e){this.state[e]!==!1&&(this.gl.disable(e),this.state[e]=!1)}setBlendFunc(e,n,i,s){this.state.blendFunc.src===e&&this.state.blendFunc.dst===n&&this.state.blendFunc.srcAlpha===i&&this.state.blendFunc.dstAlpha===s||(this.state.blendFunc.src=e,this.state.blendFunc.dst=n,this.state.blendFunc.srcAlpha=i,this.state.blendFunc.dstAlpha=s,i!==void 0?this.gl.blendFuncSeparate(e,n,i,s):this.gl.blendFunc(e,n))}setBlendEquation(e,n){e=e||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===e&&this.state.blendEquation.modeAlpha===n)&&(this.state.blendEquation.modeRGB=e,this.state.blendEquation.modeAlpha=n,n!==void 0?this.gl.blendEquationSeparate(e,n):this.gl.blendEquation(e))}setCullFace(e){this.state.cullFace!==e&&(this.state.cullFace=e,this.gl.cullFace(e))}setFrontFace(e){this.state.frontFace!==e&&(this.state.frontFace=e,this.gl.frontFace(e))}setDepthMask(e){this.state.depthMask!==e&&(this.state.depthMask=e,this.gl.depthMask(e))}setDepthFunc(e){this.state.depthFunc!==e&&(this.state.depthFunc=e,this.gl.depthFunc(e))}setStencilMask(e){this.state.stencilMask!==e&&(this.state.stencilMask=e,this.gl.stencilMask(e))}setStencilFunc(e,n,i){this.state.stencilFunc===e&&this.state.stencilRef===n&&this.state.stencilFuncMask===i||(this.state.stencilFunc=e||this.gl.ALWAYS,this.state.stencilRef=n||0,this.state.stencilFuncMask=i||0,this.gl.stencilFunc(e||this.gl.ALWAYS,n||0,i||0))}setStencilOp(e,n,i){this.state.stencilFail===e&&this.state.stencilDepthFail===n&&this.state.stencilDepthPass===i||(this.state.stencilFail=e,this.state.stencilDepthFail=n,this.state.stencilDepthPass=i,this.gl.stencilOp(e,n,i))}activeTexture(e){this.state.activeTextureUnit!==e&&(this.state.activeTextureUnit=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}bindFramebuffer({target:e=this.gl.FRAMEBUFFER,buffer:n=null}={}){this.state.framebuffer!==n&&(this.state.framebuffer=n,this.gl.bindFramebuffer(e,n))}getExtension(e,n,i){return n&&this.gl[n]?this.gl[n].bind(this.gl):(this.extensions[e]||(this.extensions[e]=this.gl.getExtension(e)),n?this.extensions[e]?this.extensions[e][i].bind(this.extensions[e]):null:this.extensions[e])}sortOpaque(e,n){return e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.program.id!==n.program.id?e.program.id-n.program.id:e.zDepth!==n.zDepth?e.zDepth-n.zDepth:n.id-e.id}sortTransparent(e,n){return e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.zDepth!==n.zDepth?n.zDepth-e.zDepth:n.id-e.id}sortUI(e,n){return e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.program.id!==n.program.id?e.program.id-n.program.id:n.id-e.id}getRenderList({scene:e,camera:n,frustumCull:i,sort:s}){let r=[];if(n&&i&&n.updateFrustum(),e.traverse(l=>{if(!l.visible)return!0;l.draw&&(i&&l.frustumCulled&&n&&!n.frustumIntersectsMesh(l)||r.push(l))}),s){const l=[],o=[],c=[];r.forEach(h=>{h.program.transparent?h.program.depthTest?o.push(h):c.push(h):l.push(h),h.zDepth=0,!(h.renderOrder!==0||!h.program.depthTest||!n)&&(h.worldMatrix.getTranslation(Rn),Rn.applyMatrix4(n.projectionViewMatrix),h.zDepth=Rn.z)}),l.sort(this.sortOpaque),o.sort(this.sortTransparent),c.sort(this.sortUI),r=l.concat(o,c)}return r}render({scene:e,camera:n,target:i=null,update:s=!0,sort:r=!0,frustumCull:l=!0,clear:o}){i===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(i),this.setViewport(i.width,i.height)),(o||this.autoClear&&o!==!1)&&(this.depth&&(!i||i.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!i||i.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),s&&e.updateMatrixWorld(),n&&n.updateMatrixWorld(),this.getRenderList({scene:e,camera:n,frustumCull:l,sort:r}).forEach(h=>{h.draw({camera:n})})}}function Nc(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function zc(t,e,n,i,s){return t[0]=e,t[1]=n,t[2]=i,t[3]=s,t}function Bc(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=n*n+i*i+s*s+r*r;return l>0&&(l=1/Math.sqrt(l)),t[0]=n*l,t[1]=i*l,t[2]=s*l,t[3]=r*l,t}function kc(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function $c(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function Hc(t,e,n){n=n*.5;let i=Math.sin(n);return t[0]=i*e[0],t[1]=i*e[1],t[2]=i*e[2],t[3]=Math.cos(n),t}function as(t,e,n){let i=e[0],s=e[1],r=e[2],l=e[3],o=n[0],c=n[1],h=n[2],a=n[3];return t[0]=i*a+l*o+s*h-r*c,t[1]=s*a+l*c+r*o-i*h,t[2]=r*a+l*h+i*c-s*o,t[3]=l*a-i*o-s*c-r*h,t}function Vc(t,e,n){n*=.5;let i=e[0],s=e[1],r=e[2],l=e[3],o=Math.sin(n),c=Math.cos(n);return t[0]=i*c+l*o,t[1]=s*c+r*o,t[2]=r*c-s*o,t[3]=l*c-i*o,t}function jc(t,e,n){n*=.5;let i=e[0],s=e[1],r=e[2],l=e[3],o=Math.sin(n),c=Math.cos(n);return t[0]=i*c-r*o,t[1]=s*c+l*o,t[2]=r*c+i*o,t[3]=l*c-s*o,t}function Gc(t,e,n){n*=.5;let i=e[0],s=e[1],r=e[2],l=e[3],o=Math.sin(n),c=Math.cos(n);return t[0]=i*c+s*o,t[1]=s*c-i*o,t[2]=r*c+l*o,t[3]=l*c-r*o,t}function Wc(t,e,n,i){let s=e[0],r=e[1],l=e[2],o=e[3],c=n[0],h=n[1],a=n[2],u=n[3],p,g,v,x,T;return g=s*c+r*h+l*a+o*u,g<0&&(g=-g,c=-c,h=-h,a=-a,u=-u),1-g>1e-6?(p=Math.acos(g),v=Math.sin(p),x=Math.sin((1-i)*p)/v,T=Math.sin(i*p)/v):(x=1-i,T=i),t[0]=x*s+T*c,t[1]=x*r+T*h,t[2]=x*l+T*a,t[3]=x*o+T*u,t}function qc(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=n*n+i*i+s*s+r*r,o=l?1/l:0;return t[0]=-n*o,t[1]=-i*o,t[2]=-s*o,t[3]=r*o,t}function Xc(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t}function Yc(t,e){let n=e[0]+e[4]+e[8],i;if(n>0)i=Math.sqrt(n+1),t[3]=.5*i,i=.5/i,t[0]=(e[5]-e[7])*i,t[1]=(e[6]-e[2])*i,t[2]=(e[1]-e[3])*i;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[s*3+s]&&(s=2);let r=(s+1)%3,l=(s+2)%3;i=Math.sqrt(e[s*3+s]-e[r*3+r]-e[l*3+l]+1),t[s]=.5*i,i=.5/i,t[3]=(e[r*3+l]-e[l*3+r])*i,t[r]=(e[r*3+s]+e[s*3+r])*i,t[l]=(e[l*3+s]+e[s*3+l])*i}return t}function Kc(t,e,n="YXZ"){let i=Math.sin(e[0]*.5),s=Math.cos(e[0]*.5),r=Math.sin(e[1]*.5),l=Math.cos(e[1]*.5),o=Math.sin(e[2]*.5),c=Math.cos(e[2]*.5);return n==="XYZ"?(t[0]=i*l*c+s*r*o,t[1]=s*r*c-i*l*o,t[2]=s*l*o+i*r*c,t[3]=s*l*c-i*r*o):n==="YXZ"?(t[0]=i*l*c+s*r*o,t[1]=s*r*c-i*l*o,t[2]=s*l*o-i*r*c,t[3]=s*l*c+i*r*o):n==="ZXY"?(t[0]=i*l*c-s*r*o,t[1]=s*r*c+i*l*o,t[2]=s*l*o+i*r*c,t[3]=s*l*c-i*r*o):n==="ZYX"?(t[0]=i*l*c-s*r*o,t[1]=s*r*c+i*l*o,t[2]=s*l*o-i*r*c,t[3]=s*l*c+i*r*o):n==="YZX"?(t[0]=i*l*c+s*r*o,t[1]=s*r*c+i*l*o,t[2]=s*l*o-i*r*c,t[3]=s*l*c-i*r*o):n==="XZY"&&(t[0]=i*l*c-s*r*o,t[1]=s*r*c-i*l*o,t[2]=s*l*o+i*r*c,t[3]=s*l*c+i*r*o),t}const Zc=Nc,Qc=zc,Jc=kc,ea=Bc;class xi extends Array{constructor(e=0,n=0,i=0,s=1){super(e,n,i,s),this.onChange=()=>{},this._target=this;const r=["0","1","2","3"];return new Proxy(this,{set(l,o){const c=Reflect.set(...arguments);return c&&r.includes(o)&&l.onChange(),c}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set w(e){this._target[3]=e,this.onChange()}identity(){return $c(this._target),this.onChange(),this}set(e,n,i,s){return e.length?this.copy(e):(Qc(this._target,e,n,i,s),this.onChange(),this)}rotateX(e){return Vc(this._target,this._target,e),this.onChange(),this}rotateY(e){return jc(this._target,this._target,e),this.onChange(),this}rotateZ(e){return Gc(this._target,this._target,e),this.onChange(),this}inverse(e=this._target){return qc(this._target,e),this.onChange(),this}conjugate(e=this._target){return Xc(this._target,e),this.onChange(),this}copy(e){return Zc(this._target,e),this.onChange(),this}normalize(e=this._target){return ea(this._target,e),this.onChange(),this}multiply(e,n){return n?as(this._target,e,n):as(this._target,this._target,e),this.onChange(),this}dot(e){return Jc(this._target,e)}fromMatrix3(e){return Yc(this._target,e),this.onChange(),this}fromEuler(e,n){return Kc(this._target,e,e.order),n||this.onChange(),this}fromAxisAngle(e,n){return Hc(this._target,e,n),this.onChange(),this}slerp(e,n){return Wc(this._target,this._target,e,n),this.onChange(),this}fromArray(e,n=0){return this._target[0]=e[n],this._target[1]=e[n+1],this._target[2]=e[n+2],this._target[3]=e[n+3],this.onChange(),this}toArray(e=[],n=0){return e[n]=this[0],e[n+1]=this[1],e[n+2]=this[2],e[n+3]=this[3],e}}const ta=1e-6;function na(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function ia(t,e,n,i,s,r,l,o,c,h,a,u,p,g,v,x,T){return t[0]=e,t[1]=n,t[2]=i,t[3]=s,t[4]=r,t[5]=l,t[6]=o,t[7]=c,t[8]=h,t[9]=a,t[10]=u,t[11]=p,t[12]=g,t[13]=v,t[14]=x,t[15]=T,t}function sa(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function ra(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=e[4],o=e[5],c=e[6],h=e[7],a=e[8],u=e[9],p=e[10],g=e[11],v=e[12],x=e[13],T=e[14],b=e[15],w=n*o-i*l,y=n*c-s*l,_=n*h-r*l,C=i*c-s*o,P=i*h-r*o,k=s*h-r*c,q=a*x-u*v,ee=a*T-p*v,H=a*b-g*v,X=u*T-p*x,W=u*b-g*x,Y=p*b-g*T,N=w*Y-y*W+_*X+C*H-P*ee+k*q;return N?(N=1/N,t[0]=(o*Y-c*W+h*X)*N,t[1]=(s*W-i*Y-r*X)*N,t[2]=(x*k-T*P+b*C)*N,t[3]=(p*P-u*k-g*C)*N,t[4]=(c*H-l*Y-h*ee)*N,t[5]=(n*Y-s*H+r*ee)*N,t[6]=(T*_-v*k-b*y)*N,t[7]=(a*k-p*_+g*y)*N,t[8]=(l*W-o*H+h*q)*N,t[9]=(i*H-n*W-r*q)*N,t[10]=(v*P-x*_+b*w)*N,t[11]=(u*_-a*P-g*w)*N,t[12]=(o*ee-l*X-c*q)*N,t[13]=(n*X-i*ee+s*q)*N,t[14]=(x*y-v*C-T*w)*N,t[15]=(a*C-u*y+p*w)*N,t):null}function Ar(t){let e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],l=t[5],o=t[6],c=t[7],h=t[8],a=t[9],u=t[10],p=t[11],g=t[12],v=t[13],x=t[14],T=t[15],b=e*l-n*r,w=e*o-i*r,y=e*c-s*r,_=n*o-i*l,C=n*c-s*l,P=i*c-s*o,k=h*v-a*g,q=h*x-u*g,ee=h*T-p*g,H=a*x-u*v,X=a*T-p*v,W=u*T-p*x;return b*W-w*X+y*H+_*ee-C*q+P*k}function hs(t,e,n){let i=e[0],s=e[1],r=e[2],l=e[3],o=e[4],c=e[5],h=e[6],a=e[7],u=e[8],p=e[9],g=e[10],v=e[11],x=e[12],T=e[13],b=e[14],w=e[15],y=n[0],_=n[1],C=n[2],P=n[3];return t[0]=y*i+_*o+C*u+P*x,t[1]=y*s+_*c+C*p+P*T,t[2]=y*r+_*h+C*g+P*b,t[3]=y*l+_*a+C*v+P*w,y=n[4],_=n[5],C=n[6],P=n[7],t[4]=y*i+_*o+C*u+P*x,t[5]=y*s+_*c+C*p+P*T,t[6]=y*r+_*h+C*g+P*b,t[7]=y*l+_*a+C*v+P*w,y=n[8],_=n[9],C=n[10],P=n[11],t[8]=y*i+_*o+C*u+P*x,t[9]=y*s+_*c+C*p+P*T,t[10]=y*r+_*h+C*g+P*b,t[11]=y*l+_*a+C*v+P*w,y=n[12],_=n[13],C=n[14],P=n[15],t[12]=y*i+_*o+C*u+P*x,t[13]=y*s+_*c+C*p+P*T,t[14]=y*r+_*h+C*g+P*b,t[15]=y*l+_*a+C*v+P*w,t}function la(t,e,n){let i=n[0],s=n[1],r=n[2],l,o,c,h,a,u,p,g,v,x,T,b;return e===t?(t[12]=e[0]*i+e[4]*s+e[8]*r+e[12],t[13]=e[1]*i+e[5]*s+e[9]*r+e[13],t[14]=e[2]*i+e[6]*s+e[10]*r+e[14],t[15]=e[3]*i+e[7]*s+e[11]*r+e[15]):(l=e[0],o=e[1],c=e[2],h=e[3],a=e[4],u=e[5],p=e[6],g=e[7],v=e[8],x=e[9],T=e[10],b=e[11],t[0]=l,t[1]=o,t[2]=c,t[3]=h,t[4]=a,t[5]=u,t[6]=p,t[7]=g,t[8]=v,t[9]=x,t[10]=T,t[11]=b,t[12]=l*i+a*s+v*r+e[12],t[13]=o*i+u*s+x*r+e[13],t[14]=c*i+p*s+T*r+e[14],t[15]=h*i+g*s+b*r+e[15]),t}function oa(t,e,n){let i=n[0],s=n[1],r=n[2];return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*s,t[5]=e[5]*s,t[6]=e[6]*s,t[7]=e[7]*s,t[8]=e[8]*r,t[9]=e[9]*r,t[10]=e[10]*r,t[11]=e[11]*r,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function ca(t,e,n,i){let s=i[0],r=i[1],l=i[2],o=Math.hypot(s,r,l),c,h,a,u,p,g,v,x,T,b,w,y,_,C,P,k,q,ee,H,X,W,Y,N,je;return Math.abs(o)<ta?null:(o=1/o,s*=o,r*=o,l*=o,c=Math.sin(n),h=Math.cos(n),a=1-h,u=e[0],p=e[1],g=e[2],v=e[3],x=e[4],T=e[5],b=e[6],w=e[7],y=e[8],_=e[9],C=e[10],P=e[11],k=s*s*a+h,q=r*s*a+l*c,ee=l*s*a-r*c,H=s*r*a-l*c,X=r*r*a+h,W=l*r*a+s*c,Y=s*l*a+r*c,N=r*l*a-s*c,je=l*l*a+h,t[0]=u*k+x*q+y*ee,t[1]=p*k+T*q+_*ee,t[2]=g*k+b*q+C*ee,t[3]=v*k+w*q+P*ee,t[4]=u*H+x*X+y*W,t[5]=p*H+T*X+_*W,t[6]=g*H+b*X+C*W,t[7]=v*H+w*X+P*W,t[8]=u*Y+x*N+y*je,t[9]=p*Y+T*N+_*je,t[10]=g*Y+b*N+C*je,t[11]=v*Y+w*N+P*je,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)}function aa(t,e){return t[0]=e[12],t[1]=e[13],t[2]=e[14],t}function Sr(t,e){let n=e[0],i=e[1],s=e[2],r=e[4],l=e[5],o=e[6],c=e[8],h=e[9],a=e[10];return t[0]=Math.hypot(n,i,s),t[1]=Math.hypot(r,l,o),t[2]=Math.hypot(c,h,a),t}function ha(t){let e=t[0],n=t[1],i=t[2],s=t[4],r=t[5],l=t[6],o=t[8],c=t[9],h=t[10];const a=e*e+n*n+i*i,u=s*s+r*r+l*l,p=o*o+c*c+h*h;return Math.sqrt(Math.max(a,u,p))}const Rr=(function(){const t=[1,1,1];return function(e,n){let i=t;Sr(i,n);let s=1/i[0],r=1/i[1],l=1/i[2],o=n[0]*s,c=n[1]*r,h=n[2]*l,a=n[4]*s,u=n[5]*r,p=n[6]*l,g=n[8]*s,v=n[9]*r,x=n[10]*l,T=o+u+x,b=0;return T>0?(b=Math.sqrt(T+1)*2,e[3]=.25*b,e[0]=(p-v)/b,e[1]=(g-h)/b,e[2]=(c-a)/b):o>u&&o>x?(b=Math.sqrt(1+o-u-x)*2,e[3]=(p-v)/b,e[0]=.25*b,e[1]=(c+a)/b,e[2]=(g+h)/b):u>x?(b=Math.sqrt(1+u-o-x)*2,e[3]=(g-h)/b,e[0]=(c+a)/b,e[1]=.25*b,e[2]=(p+v)/b):(b=Math.sqrt(1+x-o-u)*2,e[3]=(c-a)/b,e[0]=(g+h)/b,e[1]=(p+v)/b,e[2]=.25*b),e}})();function fa(t,e,n,i){let s=Pt([t[0],t[1],t[2]]);const r=Pt([t[4],t[5],t[6]]),l=Pt([t[8],t[9],t[10]]);Ar(t)<0&&(s=-s),n[0]=t[12],n[1]=t[13],n[2]=t[14];const c=t.slice(),h=1/s,a=1/r,u=1/l;c[0]*=h,c[1]*=h,c[2]*=h,c[4]*=a,c[5]*=a,c[6]*=a,c[8]*=u,c[9]*=u,c[10]*=u,Rr(e,c),i[0]=s,i[1]=r,i[2]=l}function ua(t,e,n,i){const s=t,r=e[0],l=e[1],o=e[2],c=e[3],h=r+r,a=l+l,u=o+o,p=r*h,g=r*a,v=r*u,x=l*a,T=l*u,b=o*u,w=c*h,y=c*a,_=c*u,C=i[0],P=i[1],k=i[2];return s[0]=(1-(x+b))*C,s[1]=(g+_)*C,s[2]=(v-y)*C,s[3]=0,s[4]=(g-_)*P,s[5]=(1-(p+b))*P,s[6]=(T+w)*P,s[7]=0,s[8]=(v+y)*k,s[9]=(T-w)*k,s[10]=(1-(p+x))*k,s[11]=0,s[12]=n[0],s[13]=n[1],s[14]=n[2],s[15]=1,s}function da(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=n+n,o=i+i,c=s+s,h=n*l,a=i*l,u=i*o,p=s*l,g=s*o,v=s*c,x=r*l,T=r*o,b=r*c;return t[0]=1-u-v,t[1]=a+b,t[2]=p-T,t[3]=0,t[4]=a-b,t[5]=1-h-v,t[6]=g+x,t[7]=0,t[8]=p+T,t[9]=g-x,t[10]=1-h-u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function pa(t,e,n,i,s){let r=1/Math.tan(e/2),l=1/(i-s);return t[0]=r/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(s+i)*l,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*s*i*l,t[15]=0,t}function ga(t,e,n,i,s,r,l){let o=1/(e-n),c=1/(i-s),h=1/(r-l);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+n)*o,t[13]=(s+i)*c,t[14]=(l+r)*h,t[15]=1,t}function va(t,e,n,i){let s=e[0],r=e[1],l=e[2],o=i[0],c=i[1],h=i[2],a=s-n[0],u=r-n[1],p=l-n[2],g=a*a+u*u+p*p;g===0?p=1:(g=1/Math.sqrt(g),a*=g,u*=g,p*=g);let v=c*p-h*u,x=h*a-o*p,T=o*u-c*a;return g=v*v+x*x+T*T,g===0&&(h?o+=1e-6:c?h+=1e-6:c+=1e-6,v=c*p-h*u,x=h*a-o*p,T=o*u-c*a,g=v*v+x*x+T*T),g=1/Math.sqrt(g),v*=g,x*=g,T*=g,t[0]=v,t[1]=x,t[2]=T,t[3]=0,t[4]=u*T-p*x,t[5]=p*v-a*T,t[6]=a*x-u*v,t[7]=0,t[8]=a,t[9]=u,t[10]=p,t[11]=0,t[12]=s,t[13]=r,t[14]=l,t[15]=1,t}function fs(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t[4]=e[4]+n[4],t[5]=e[5]+n[5],t[6]=e[6]+n[6],t[7]=e[7]+n[7],t[8]=e[8]+n[8],t[9]=e[9]+n[9],t[10]=e[10]+n[10],t[11]=e[11]+n[11],t[12]=e[12]+n[12],t[13]=e[13]+n[13],t[14]=e[14]+n[14],t[15]=e[15]+n[15],t}function us(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t[4]=e[4]-n[4],t[5]=e[5]-n[5],t[6]=e[6]-n[6],t[7]=e[7]-n[7],t[8]=e[8]-n[8],t[9]=e[9]-n[9],t[10]=e[10]-n[10],t[11]=e[11]-n[11],t[12]=e[12]-n[12],t[13]=e[13]-n[13],t[14]=e[14]-n[14],t[15]=e[15]-n[15],t}function ma(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*n,t[9]=e[9]*n,t[10]=e[10]*n,t[11]=e[11]*n,t[12]=e[12]*n,t[13]=e[13]*n,t[14]=e[14]*n,t[15]=e[15]*n,t}class sn extends Array{constructor(e=1,n=0,i=0,s=0,r=0,l=1,o=0,c=0,h=0,a=0,u=1,p=0,g=0,v=0,x=0,T=1){return super(e,n,i,s,r,l,o,c,h,a,u,p,g,v,x,T),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(e){this[12]=e}set y(e){this[13]=e}set z(e){this[14]=e}set w(e){this[15]=e}set(e,n,i,s,r,l,o,c,h,a,u,p,g,v,x,T){return e.length?this.copy(e):(ia(this,e,n,i,s,r,l,o,c,h,a,u,p,g,v,x,T),this)}translate(e,n=this){return la(this,n,e),this}rotate(e,n,i=this){return ca(this,i,e,n),this}scale(e,n=this){return oa(this,n,typeof e=="number"?[e,e,e]:e),this}add(e,n){return n?fs(this,e,n):fs(this,this,e),this}sub(e,n){return n?us(this,e,n):us(this,this,e),this}multiply(e,n){return e.length?n?hs(this,e,n):hs(this,this,e):ma(this,this,e),this}identity(){return sa(this),this}copy(e){return na(this,e),this}fromPerspective({fov:e,aspect:n,near:i,far:s}={}){return pa(this,e,n,i,s),this}fromOrthogonal({left:e,right:n,bottom:i,top:s,near:r,far:l}){return ga(this,e,n,i,s,r,l),this}fromQuaternion(e){return da(this,e),this}setPosition(e){return this.x=e[0],this.y=e[1],this.z=e[2],this}inverse(e=this){return ra(this,e),this}compose(e,n,i){return ua(this,e,n,i),this}decompose(e,n,i){return fa(this,e,n,i),this}getRotation(e){return Rr(e,this),this}getTranslation(e){return aa(e,this),this}getScaling(e){return Sr(e,this),this}getMaxScaleOnAxis(){return ha(this)}lookAt(e,n,i){return va(this,e,n,i),this}determinant(){return Ar(this)}fromArray(e,n=0){return this[0]=e[n],this[1]=e[n+1],this[2]=e[n+2],this[3]=e[n+3],this[4]=e[n+4],this[5]=e[n+5],this[6]=e[n+6],this[7]=e[n+7],this[8]=e[n+8],this[9]=e[n+9],this[10]=e[n+10],this[11]=e[n+11],this[12]=e[n+12],this[13]=e[n+13],this[14]=e[n+14],this[15]=e[n+15],this}toArray(e=[],n=0){return e[n]=this[0],e[n+1]=this[1],e[n+2]=this[2],e[n+3]=this[3],e[n+4]=this[4],e[n+5]=this[5],e[n+6]=this[6],e[n+7]=this[7],e[n+8]=this[8],e[n+9]=this[9],e[n+10]=this[10],e[n+11]=this[11],e[n+12]=this[12],e[n+13]=this[13],e[n+14]=this[14],e[n+15]=this[15],e}}function _a(t,e,n="YXZ"){return n==="XYZ"?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),Math.abs(e[8])<.99999?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):n==="YXZ"?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),Math.abs(e[9])<.99999?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):n==="ZXY"?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),Math.abs(e[6])<.99999?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):n==="ZYX"?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),Math.abs(e[2])<.99999?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):n==="YZX"?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),Math.abs(e[1])<.99999?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):n==="XZY"&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),Math.abs(e[4])<.99999?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0)),t}const ds=new sn;class Cr extends Array{constructor(e=0,n=e,i=e,s="YXZ"){super(e,n,i),this.order=s,this.onChange=()=>{},this._target=this;const r=["0","1","2"];return new Proxy(this,{set(l,o){const c=Reflect.set(...arguments);return c&&r.includes(o)&&l.onChange(),c}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set(e,n=e,i=e){return e.length?this.copy(e):(this._target[0]=e,this._target[1]=n,this._target[2]=i,this.onChange(),this)}copy(e){return this._target[0]=e[0],this._target[1]=e[1],this._target[2]=e[2],this.onChange(),this}reorder(e){return this._target.order=e,this.onChange(),this}fromRotationMatrix(e,n=this.order){return _a(this._target,e,n),this.onChange(),this}fromQuaternion(e,n=this.order,i){return ds.fromQuaternion(e),this._target.fromRotationMatrix(ds,n),i||this.onChange(),this}fromArray(e,n=0){return this._target[0]=e[n],this._target[1]=e[n+1],this._target[2]=e[n+2],this}toArray(e=[],n=0){return e[n]=this[0],e[n+1]=this[1],e[n+2]=this[2],e}}class xa{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new sn,this.worldMatrix=new sn,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new ye,this.quaternion=new xi,this.scale=new ye(1),this.rotation=new Cr,this.up=new ye(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(e,n=!0){this.parent&&e!==this.parent&&this.parent.removeChild(this,!1),this.parent=e,n&&e&&e.addChild(this,!1)}addChild(e,n=!0){~this.children.indexOf(e)||this.children.push(e),n&&e.setParent(this,!1)}removeChild(e,n=!0){~this.children.indexOf(e)&&this.children.splice(this.children.indexOf(e),1),n&&e.setParent(null,!1)}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||e)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,e=!0);for(let n=0,i=this.children.length;n<i;n++)this.children[n].updateMatrixWorld(e)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(e){if(!e(this))for(let n=0,i=this.children.length;n<i;n++)this.children[n].traverse(e)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(e,n=!1){n?this.matrix.lookAt(this.position,e,this.up):this.matrix.lookAt(e,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}}function ya(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t}function ba(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=n+n,o=i+i,c=s+s,h=n*l,a=i*l,u=i*o,p=s*l,g=s*o,v=s*c,x=r*l,T=r*o,b=r*c;return t[0]=1-u-v,t[3]=a-b,t[6]=p+T,t[1]=a+b,t[4]=1-h-v,t[7]=g-x,t[2]=p-T,t[5]=g+x,t[8]=1-h-u,t}function Ea(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function wa(t,e,n,i,s,r,l,o,c,h){return t[0]=e,t[1]=n,t[2]=i,t[3]=s,t[4]=r,t[5]=l,t[6]=o,t[7]=c,t[8]=h,t}function Ma(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function Ta(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=e[4],o=e[5],c=e[6],h=e[7],a=e[8],u=a*l-o*h,p=-a*r+o*c,g=h*r-l*c,v=n*u+i*p+s*g;return v?(v=1/v,t[0]=u*v,t[1]=(-a*i+s*h)*v,t[2]=(o*i-s*l)*v,t[3]=p*v,t[4]=(a*n-s*c)*v,t[5]=(-o*n+s*r)*v,t[6]=g*v,t[7]=(-h*n+i*c)*v,t[8]=(l*n-i*r)*v,t):null}function ps(t,e,n){let i=e[0],s=e[1],r=e[2],l=e[3],o=e[4],c=e[5],h=e[6],a=e[7],u=e[8],p=n[0],g=n[1],v=n[2],x=n[3],T=n[4],b=n[5],w=n[6],y=n[7],_=n[8];return t[0]=p*i+g*l+v*h,t[1]=p*s+g*o+v*a,t[2]=p*r+g*c+v*u,t[3]=x*i+T*l+b*h,t[4]=x*s+T*o+b*a,t[5]=x*r+T*c+b*u,t[6]=w*i+y*l+_*h,t[7]=w*s+y*o+_*a,t[8]=w*r+y*c+_*u,t}function Fa(t,e,n){let i=e[0],s=e[1],r=e[2],l=e[3],o=e[4],c=e[5],h=e[6],a=e[7],u=e[8],p=n[0],g=n[1];return t[0]=i,t[1]=s,t[2]=r,t[3]=l,t[4]=o,t[5]=c,t[6]=p*i+g*l+h,t[7]=p*s+g*o+a,t[8]=p*r+g*c+u,t}function Aa(t,e,n){let i=e[0],s=e[1],r=e[2],l=e[3],o=e[4],c=e[5],h=e[6],a=e[7],u=e[8],p=Math.sin(n),g=Math.cos(n);return t[0]=g*i+p*l,t[1]=g*s+p*o,t[2]=g*r+p*c,t[3]=g*l-p*i,t[4]=g*o-p*s,t[5]=g*c-p*r,t[6]=h,t[7]=a,t[8]=u,t}function Sa(t,e,n){let i=n[0],s=n[1];return t[0]=i*e[0],t[1]=i*e[1],t[2]=i*e[2],t[3]=s*e[3],t[4]=s*e[4],t[5]=s*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function Ra(t,e){let n=e[0],i=e[1],s=e[2],r=e[3],l=e[4],o=e[5],c=e[6],h=e[7],a=e[8],u=e[9],p=e[10],g=e[11],v=e[12],x=e[13],T=e[14],b=e[15],w=n*o-i*l,y=n*c-s*l,_=n*h-r*l,C=i*c-s*o,P=i*h-r*o,k=s*h-r*c,q=a*x-u*v,ee=a*T-p*v,H=a*b-g*v,X=u*T-p*x,W=u*b-g*x,Y=p*b-g*T,N=w*Y-y*W+_*X+C*H-P*ee+k*q;return N?(N=1/N,t[0]=(o*Y-c*W+h*X)*N,t[1]=(c*H-l*Y-h*ee)*N,t[2]=(l*W-o*H+h*q)*N,t[3]=(s*W-i*Y-r*X)*N,t[4]=(n*Y-s*H+r*ee)*N,t[5]=(i*H-n*W-r*q)*N,t[6]=(x*k-T*P+b*C)*N,t[7]=(T*_-v*k-b*y)*N,t[8]=(v*P-x*_+b*w)*N,t):null}class yi extends Array{constructor(e=1,n=0,i=0,s=0,r=1,l=0,o=0,c=0,h=1){return super(e,n,i,s,r,l,o,c,h),this}set(e,n,i,s,r,l,o,c,h){return e.length?this.copy(e):(wa(this,e,n,i,s,r,l,o,c,h),this)}translate(e,n=this){return Fa(this,n,e),this}rotate(e,n=this){return Aa(this,n,e),this}scale(e,n=this){return Sa(this,n,e),this}multiply(e,n){return n?ps(this,e,n):ps(this,this,e),this}identity(){return Ma(this),this}copy(e){return Ea(this,e),this}fromMatrix4(e){return ya(this,e),this}fromQuaternion(e){return ba(this,e),this}fromBasis(e,n,i){return this.set(e[0],e[1],e[2],n[0],n[1],n[2],i[0],i[1],i[2]),this}inverse(e=this){return Ta(this,e),this}getNormalMatrix(e){return Ra(this,e),this}}let Ca=0;class Dr extends xa{constructor(e,{geometry:n,program:i,mode:s=e.TRIANGLES,frustumCulled:r=!0,renderOrder:l=0}={}){super(),e.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=e,this.id=Ca++,this.geometry=n,this.program=i,this.mode=s,this.frustumCulled=r,this.renderOrder=l,this.modelViewMatrix=new sn,this.normalMatrix=new yi,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),this}onAfterRender(e){return this.afterRenderCallbacks.push(e),this}draw({camera:e}={}){e&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=e.projectionMatrix,this.program.uniforms.cameraPosition.value=e.worldPosition,this.program.uniforms.viewMatrix.value=e.viewMatrix,this.modelViewMatrix.multiply(e.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(i=>i&&i({mesh:this,camera:e}));let n=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:n}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(i=>i&&i({mesh:this,camera:e}))}}const gs=new Uint8Array(4);function vs(t){return(t&t-1)===0}let Da=1;class Gn{constructor(e,{image:n,target:i=e.TEXTURE_2D,type:s=e.UNSIGNED_BYTE,format:r=e.RGBA,internalFormat:l=r,wrapS:o=e.CLAMP_TO_EDGE,wrapT:c=e.CLAMP_TO_EDGE,wrapR:h=e.CLAMP_TO_EDGE,generateMipmaps:a=i===(e.TEXTURE_2D||e.TEXTURE_CUBE_MAP),minFilter:u=a?e.NEAREST_MIPMAP_LINEAR:e.LINEAR,magFilter:p=e.LINEAR,premultiplyAlpha:g=!1,unpackAlignment:v=4,flipY:x=i==(e.TEXTURE_2D||e.TEXTURE_3D),anisotropy:T=0,level:b=0,width:w,height:y=w,length:_=1}={}){this.gl=e,this.id=Da++,this.image=n,this.target=i,this.type=s,this.format=r,this.internalFormat=l,this.minFilter=u,this.magFilter=p,this.wrapS=o,this.wrapT=c,this.wrapR=h,this.generateMipmaps=a,this.premultiplyAlpha=g,this.unpackAlignment=v,this.flipY=x,this.anisotropy=Math.min(T,this.gl.renderer.parameters.maxAnisotropy),this.level=b,this.width=w,this.height=y,this.length=_,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(e=0){const n=!(this.image===this.store.image&&!this.needsUpdate);if((n||this.glState.textureUnits[e]!==this.id)&&(this.gl.renderer.activeTexture(e),this.bind()),!!n){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let i=0;i<6;i++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+i,this.level,this.internalFormat,this.format,this.type,this.image[i]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let i=0;i<this.image.length;i++)this.gl.compressedTexImage2D(this.target,i,this.internalFormat,this.image[i].width,this.image[i].height,0,this.image[i].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!vs(this.image.width)||!vs(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let i=0;i<6;i++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,gs);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,gs);this.store.image=this.image}}}class Wn{constructor(e,{width:n=e.canvas.width,height:i=e.canvas.height,target:s=e.FRAMEBUFFER,color:r=1,depth:l=!0,stencil:o=!1,depthTexture:c=!1,wrapS:h=e.CLAMP_TO_EDGE,wrapT:a=e.CLAMP_TO_EDGE,wrapR:u=e.CLAMP_TO_EDGE,minFilter:p=e.LINEAR,magFilter:g=p,type:v=e.UNSIGNED_BYTE,format:x=e.RGBA,internalFormat:T=x,unpackAlignment:b,premultiplyAlpha:w}={}){this.gl=e,this.width=n,this.height=i,this.depth=l,this.stencil=o,this.buffer=this.gl.createFramebuffer(),this.target=s,this.gl.renderer.bindFramebuffer(this),this.textures=[];const y=[];for(let _=0;_<r;_++)this.textures.push(new Gn(e,{width:n,height:i,wrapS:h,wrapT:a,wrapR:u,minFilter:p,magFilter:g,type:v,format:x,internalFormat:T,unpackAlignment:b,premultiplyAlpha:w,flipY:!1,generateMipmaps:!1})),this.textures[_].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+_,this.gl.TEXTURE_2D,this.textures[_].texture,0),y.push(this.gl.COLOR_ATTACHMENT0+_);y.length>1&&this.gl.renderer.drawBuffers(y),this.texture=this.textures[0],c&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new Gn(e,{width:n,height:i,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(l&&!o&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,n,i),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),o&&!l&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,n,i),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),l&&o&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,n,i),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(e,n){if(!(this.width===e&&this.height===n)){this.width=e,this.height=n,this.gl.renderer.bindFramebuffer(this);for(let i=0;i<this.textures.length;i++)this.textures[i].width=e,this.textures[i].height=n,this.textures[i].needsUpdate=!0,this.textures[i].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+i,this.gl.TEXTURE_2D,this.textures[i].texture,0);this.depthTexture?(this.depthTexture.width=e,this.depthTexture.height=n,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,n)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,n)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,n))),this.gl.renderer.bindFramebuffer({target:this.target})}}}function Oa(t,e){return t[0]=e[0],t[1]=e[1],t}function Pa(t,e,n){return t[0]=e,t[1]=n,t}function ms(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t}function _s(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t}function Ia(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t}function Ua(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t}function Cn(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t}function La(t,e){var n=e[0]-t[0],i=e[1]-t[1];return Math.sqrt(n*n+i*i)}function Na(t,e){var n=e[0]-t[0],i=e[1]-t[1];return n*n+i*i}function xs(t){var e=t[0],n=t[1];return Math.sqrt(e*e+n*n)}function za(t){var e=t[0],n=t[1];return e*e+n*n}function Ba(t,e){return t[0]=-e[0],t[1]=-e[1],t}function ka(t,e){return t[0]=1/e[0],t[1]=1/e[1],t}function $a(t,e){var n=e[0],i=e[1],s=n*n+i*i;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t}function Ha(t,e){return t[0]*e[0]+t[1]*e[1]}function ys(t,e){return t[0]*e[1]-t[1]*e[0]}function Va(t,e,n,i){var s=e[0],r=e[1];return t[0]=s+i*(n[0]-s),t[1]=r+i*(n[1]-r),t}function ja(t,e,n,i,s){const r=Math.exp(-i*s);let l=e[0],o=e[1];return t[0]=n[0]+(l-n[0])*r,t[1]=n[1]+(o-n[1])*r,t}function Ga(t,e,n){var i=e[0],s=e[1];return t[0]=n[0]*i+n[3]*s+n[6],t[1]=n[1]*i+n[4]*s+n[7],t}function Wa(t,e,n){let i=e[0],s=e[1];return t[0]=n[0]*i+n[4]*s+n[12],t[1]=n[1]*i+n[5]*s+n[13],t}function qa(t,e){return t[0]===e[0]&&t[1]===e[1]}class rn extends Array{constructor(e=0,n=e){return super(e,n),this}get x(){return this[0]}get y(){return this[1]}set x(e){this[0]=e}set y(e){this[1]=e}set(e,n=e){return e.length?this.copy(e):(Pa(this,e,n),this)}copy(e){return Oa(this,e),this}add(e,n){return n?ms(this,e,n):ms(this,this,e),this}sub(e,n){return n?_s(this,e,n):_s(this,this,e),this}multiply(e){return e.length?Ia(this,this,e):Cn(this,this,e),this}divide(e){return e.length?Ua(this,this,e):Cn(this,this,1/e),this}inverse(e=this){return ka(this,e),this}len(){return xs(this)}distance(e){return e?La(this,e):xs(this)}squaredLen(){return this.squaredDistance()}squaredDistance(e){return e?Na(this,e):za(this)}negate(e=this){return Ba(this,e),this}cross(e,n){return n?ys(e,n):ys(this,e)}scale(e){return Cn(this,this,e),this}normalize(){return $a(this,this),this}dot(e){return Ha(this,e)}equals(e){return qa(this,e)}applyMatrix3(e){return Ga(this,this,e),this}applyMatrix4(e){return Wa(this,this,e),this}lerp(e,n){return Va(this,this,e,n),this}smoothLerp(e,n,i){return ja(this,this,e,n,i),this}clone(){return new rn(this[0],this[1])}fromArray(e,n=0){return this[0]=e[n],this[1]=e[n+1],this}toArray(e=[],n=0){return e[n]=this[0],e[n+1]=this[1],e}}class Xa extends Tr{constructor(e,{attributes:n={}}={}){Object.assign(n,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,n)}}class Ya{constructor(e,{size:n=128,falloff:i=.3,alpha:s=1,dissipation:r=.98,type:l}={}){const o=this;this.gl=e,this.uniform={value:null},this.mask={read:null,write:null,swap:()=>{let a=o.mask.read;o.mask.read=o.mask.write,o.mask.write=a,o.uniform.value=o.mask.read.texture}},c(),this.aspect=1,this.mouse=new rn,this.velocity=new rn,this.mesh=h();function c(){l||(l=e.HALF_FLOAT||e.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES);let a=e.renderer.isWebgl2||e.renderer.extensions[`OES_texture_${l===e.FLOAT?"":"half_"}float_linear`]?e.LINEAR:e.NEAREST;const u={width:n,height:n,type:l,format:e.RGBA,internalFormat:e.renderer.isWebgl2?l===e.FLOAT?e.RGBA32F:e.RGBA16F:e.RGBA,minFilter:a,depth:!1};o.mask.read=new Wn(e,u),o.mask.write=new Wn(e,u),o.mask.swap()}function h(){return new Dr(e,{geometry:new Xa(e),program:new Fr(e,{vertex:Ka,fragment:Za,uniforms:{tMap:o.uniform,uFalloff:{value:i*.5},uAlpha:{value:s},uDissipation:{value:r},uAspect:{value:1},uMouse:{value:o.mouse},uVelocity:{value:o.velocity}},depthTest:!1})})}}update(){this.mesh.program.uniforms.uAspect.value=this.aspect,this.gl.renderer.render({scene:this.mesh,target:this.mask.write,clear:!1}),this.mask.swap()}}const Ka=`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`,Za=`
    precision highp float;

    uniform sampler2D tMap;

    uniform float uFalloff;
    uniform float uAlpha;
    uniform float uDissipation;
    
    uniform float uAspect;
    uniform vec2 uMouse;
    uniform vec2 uVelocity;

    varying vec2 vUv;

    void main() {
        vec4 color = texture2D(tMap, vUv) * uDissipation;

        vec2 cursor = vUv - uMouse;
        cursor.x *= uAspect;

        vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
        float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;

        color.rgb = mix(color.rgb, stamp, vec3(falloff));

        gl_FragColor = color;
    }
`,pe=new Lc,xe=pe.gl,Qa=new Tr(xe,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),qt=new Dr(xe,{geometry:Qa});function Ie(t,e,n){const i=new Fr(xe,{vertex:t,fragment:e,uniforms:n});return function(s,r){qt.program=i;for(const l in r)qt.program.uniforms[l].value=r[l];s?pe.render({scene:qt,target:s}):pe.render({scene:qt})}}var Ue=`attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}`,Ja=`precision highp float;

varying vec2 vUv;

void main() {
    gl_FragColor.rg = vUv.xy;
    gl_FragColor.b = 0.5;
    gl_FragColor.a = 1.0;
}`;Ie(Ue,Ja);var eh=`precision highp float;

uniform sampler2D textureMap;
uniform bool showAlpha;

varying vec2 vUv;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    gl_FragColor = texture2D(textureMap, vUv);
    if(showAlpha) {
        gl_FragColor.rgb = gl_FragColor.aaa;
    }
}`;const th=Ie(Ue,eh,{textureMap:{value:0},showAlpha:{value:!1}});function Ne(t,e,n=!1){th(t,{textureMap:e,showAlpha:n})}var nh=`precision highp float;

varying vec2 vUv;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    
    
    
    

    gl_FragColor.rgb = vec3(0.0);
    
    
    gl_FragColor.a = 0.0;
}`;const ih=Ie(Ue,nh);function sh(t){ih(t)}var rh=`precision highp float;

varying vec2 vUv;

uniform sampler2D inputMap;
uniform sampler2D velocityMap;

uniform vec2 uSize;
#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    vec2 delta = 1.0 / uSize;

    vec2 velocity = unpackField(texture2D(velocityMap, vUv));
    
    
    
    

    
    vec2 displacement = -velocity;
    float factor = 0.9;
    vec4 displaced = texture2D(inputMap, vUv + displacement * delta * 0.1);
    gl_FragColor = texture2D(inputMap, vUv) * (1.0 - factor) + displaced * factor;

}`;const lh=Ie(Ue,rh,{inputMap:{value:0},velocityMap:{value:0},uSize:{value:[0,0]}});function bs(t,e,n){lh(t,{inputMap:e,velocityMap:n,uSize:[t.width,t.height]})}var oh=`precision highp float;

varying vec2 vUv;

uniform sampler2D velocityMap;

uniform vec2 uSize;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    vec2 delta = 4.0 / uSize;

    vec2 center = unpackField(texture2D(velocityMap, vUv));
    vec2 left = unpackField(texture2D(velocityMap, vUv + delta * vec2(-1, 0)));
    vec2 right = unpackField(texture2D(velocityMap, vUv + delta * vec2(1, 0)));
    vec2 bottom = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, -1)));
    vec2 top = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, 1)));

    float divergent = (right.x - left.x) + (top.y - bottom.y);

    gl_FragColor.rg = packFloat(divergent / 4.0 * 0.5 + 0.5);
}`;const ch=Ie(Ue,oh,{velocityMap:{value:0},uSize:{value:[0,0]}});function ah(t,e){ch(t,{velocityMap:e,uSize:[t.width,t.height]})}var hh=`precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D velocityMap;

uniform vec2 uSize;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    vec2 delta = 4.0 / uSize;

    float center = unpackFloat(texture2D(pressureMap, vUv).rg);
    float left = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(-1, 0)).rg);
    float right = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(1, 0)).rg);
    float bottom = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, -1)).rg);
    float top = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, 1)).rg);

    vec2 gradient = vec2(right - left, top - bottom);

    vec2 velocity = unpackField(texture2D(velocityMap, vUv)) + gradient * 2.0;

    gl_FragColor = packField(velocity);
}`;const fh=Ie(Ue,hh,{pressureMap:{value:0},velocityMap:{value:0},uSize:{value:[0,0]}});function uh(t,e,n){fh(t,{pressureMap:e,velocityMap:n,uSize:[t.width,t.height]})}var dh=`precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D velocityMap;
uniform sampler2D flowMap;

uniform vec2 uSize;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    vec2 delta = 2.0 / uSize;

    vec2 velocity = unpackField(texture2D(velocityMap, vUv));
    vec2 velocity_left = unpackField(texture2D(velocityMap, vUv + delta * vec2(-1, 0)));
    vec2 velocity_right = unpackField(texture2D(velocityMap, vUv + delta * vec2(1, 0)));
    vec2 velocity_bottom = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, -1)));
    vec2 velocity_top = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, 1)));

    vec2 flow = unpackField(texture2D(flowMap, vUv));

    float center = texture2D(pressureMap, vUv).a;
    float right = texture2D(pressureMap, vUv + delta * vec2(1, 0)).a;
    float left = texture2D(pressureMap, vUv + delta * vec2(-1, 0)).a;
    float top = texture2D(pressureMap, vUv + delta * vec2(0, 1)).a;
    float bottom = texture2D(pressureMap, vUv + delta * vec2(0, -1)).a;
    vec2 gradient = vec2(right - left, top - bottom);

    vec2 diffusion = (velocity_left + velocity_right + velocity_bottom + velocity_top) / 4.0 - velocity;

    vec2 acceleration = -gradient * 0.01;

    
    
    

    
    velocity = velocity * 0.9995 + acceleration / (center + 0.001) + diffusion + flow * 0.1;

    

    float magnitude = length(velocity);
    velocity = velocity / max(1e-5, magnitude) * min(10.0, magnitude);

    gl_FragColor = packField(velocity);
}`;const ph=Ie(Ue,dh,{pressureMap:{value:0},velocityMap:{value:0},flowMap:{value:0},uSize:{value:[0,0]}});function gh(t,e,n,i){ph(t,{pressureMap:e,velocityMap:n,flowMap:i,uSize:[t.width,t.height]})}var vh=`precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D maskTexture;

uniform float feed0; 
uniform float kill0; 

uniform vec2 uSize;
#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

void main() {
    vec2 delta = 1.0 / uSize;

    vec4 center = texture2D(pressureMap, vUv);

    vec4 maskInput = texture2D(maskTexture, vUv);

    vec4 left = texture2D(pressureMap, vUv + delta * vec2(-1, 0));
    vec4 right = texture2D(pressureMap, vUv + delta * vec2(1, 0));
    vec4 bottom = texture2D(pressureMap, vUv + delta * vec2(0, -1));
    vec4 top = texture2D(pressureMap, vUv + delta * vec2(0, 1));

    vec4 corner1 = texture2D(pressureMap, vUv + delta * vec2(-1, 1));
    vec4 corner2 = texture2D(pressureMap, vUv + delta * vec2(1, 1));
    vec4 corner3 = texture2D(pressureMap, vUv + delta * vec2(-1, -1));
    vec4 corner4 = texture2D(pressureMap, vUv + delta * vec2(1, -1));

    vec4 laplacian = (left + right + bottom + top) * 0.2 + (corner1 + corner2 + corner3 + corner4) * 0.05 - center;

    float feed = feed0 + (vUv.x - 0.5) * 0.02;
    float kill_compensated = kill0 - 7.0 * ((feed - 0.065) * (feed - 0.065) - (feed0 - 0.065) * (feed0 - 0.065));

    float r = length((vUv - 0.5) * uSize) / min(uSize.x, uSize.y);
    float kill = kill_compensated + abs(vUv.y - 0.5) * 0.04;

    float mask = maskInput.r * 0.1;

    vec3 diffusion = vec3(0.4, 0.1, 0.1) * 8.0;
    vec3 reaction = vec3(-1.0, 1.0, 1.0);
    vec3 balance = vec3(1.0, mask, mask);
    vec3 damping = vec3(feed, feed + kill, feed + kill);
    vec3 density = vec3(1.0, 0.0, 0.0);

    vec3 change = diffusion * laplacian.xyz + reaction * center.x * center.y * center.z + (balance - center.xyz) * damping;

    vec3 result = center.xyz + change * 0.3;
    gl_FragColor.xyz = result.xyz;
    gl_FragColor.a = 1.0 - dot(density, result);

}`;function we(t,e,n=i=>i){let s=new URLSearchParams(window.location.search).get(t);try{if(s!==null)return n(s)}catch{}return e}function $t(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(r=>r+r).join(""));const e=parseInt(t,16),n=(e>>16&255)/255,i=(e>>8&255)/255,s=(e&255)/255;return[n,i,s]}const Or=we("feed",.054,Number),mh=we("kill",.0616,Number);console.log(Or);const _h=Ie(Ue,vh,{pressureMap:{value:0},maskTexture:{value:0},uSize:{value:[0,0]},feed0:{value:Or},kill0:{value:mh}});function xh(t,e,n){_h(t,{pressureMap:e,maskTexture:n,uSize:[t.width,t.height]})}const wt=document.createElement("canvas"),yh=wt.getContext("2d");let bt;function bh(t,e){return wt.width=t.width,wt.height=t.height,e(wt,yh),bt||(bt=new Gn(t.gl),bt.image=wt),bt.needsUpdate=!0,bt}var Eh=`precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D backgroundMap;
uniform vec3 glassColor;
uniform float shadowFactor;
uniform float brightFactor;

uniform vec2 parallax;

uniform vec2 uSize;
#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

vec3 my_reflection(vec3 normal, vec3 incoming) {
    float cos_value = dot(incoming, normal);
    vec3 cos_vec = cos_value * normal;
    vec3 reflected = incoming - cos_vec * 2.0;
    return reflected / length(reflected);
}

vec3 my_refraction(vec3 normal, vec3 incoming, float n2) {
    float cos_value = dot(incoming, normal);
    vec3 cos_vec = cos_value * normal;
    vec3 sin_vec = incoming - cos_vec;
    float sin_value = length(sin_vec);
    float cos_value22 = n2 * n2 - sin_value * sin_value;
    if(cos_value22 < 0.0)
        return my_reflection(normal, incoming);
    float cos_value2 = sqrt(cos_value22);
    vec3 refracted = cos_value2 * normal + sin_vec;
    return refracted / length(refracted);
}

float thickness(vec4 p) {
    float t = smoothstep(0.45, 0.95, p.a);
    return sqrt(t);
}

void main() {
    vec2 delta = 1.0 / uSize;

    vec4 final_color = vec4(0.0);

    for(int si = 0; si < 2; si++) {
        for(int sj = 0; sj < 2; sj++) {

            vec2 uv = vUv + delta * vec2(si, sj) * 0.5;

            vec4 center = texture2D(pressureMap, uv);
            vec4 left = texture2D(pressureMap, uv + delta * vec2(-1, 0));
            vec4 right = texture2D(pressureMap, uv + delta * vec2(1, 0));
            vec4 bottom = texture2D(pressureMap, uv + delta * vec2(0, -1));
            vec4 top = texture2D(pressureMap, uv + delta * vec2(0, 1));

            vec2 gradient = vec2(thickness(right) - thickness(left), thickness(top) - thickness(bottom)) * 0.7;

            vec3 normal = vec3(-gradient.x, -gradient.y, 1.0);
            normal = normal / length(normal);

            vec3 incoming = vec3(parallax, 1);
            incoming = incoming / length(incoming);

            float n2 = 1.33;

            vec3 refracted = my_refraction(normal, incoming, n2);
            refracted = my_refraction(normal * vec3(-1, -1, 1.0), refracted, 1.0 / n2);
            vec3 reflected = my_reflection(normal, incoming);

            vec2 displacement = refracted.xy / refracted.z - parallax;

            float r_r = texture2D(backgroundMap, uv + displacement * 1.0).r;
            float r_g = texture2D(backgroundMap, uv + displacement * 1.05).g;
            float r_b = texture2D(backgroundMap, uv + displacement * 1.1).b;

            vec4 background_T = vec4(r_r, r_g, r_b, 1.0);

            vec3 incoming_clamped = incoming;
            incoming_clamped.z = clamp(incoming_clamped.z, 0.8, 1.0);
            incoming_clamped.xy /= max(length(incoming_clamped.xy), 0.0001);
            incoming_clamped.xy *= sqrt(1.0 - incoming_clamped.z);
            vec3 reflected_clamped = my_reflection(normal, incoming_clamped);

            float light = abs(dot(reflected_clamped, vec3(-0.1, 0.6, 0.01)));
            light = step(0.1, light) * light * 8.0;
            
            

            vec4 background_R = vec4(vec3(light), 0) * vec4(glassColor, 1.0);

            
            float R = pow(1.0 - normal.z, 0.5) * smoothstep(0.0, 0.01, thickness(center));

            float t = thickness(center);

            vec4 color = background_R * R + background_T * (1.0 - R) * (1.0 - shadowFactor * t) + (t * brightFactor);
            color.rgb = color.rgb * mix(vec3(1), glassColor, t);
            final_color = final_color + color * 0.25;

            
            
        }
    }

    gl_FragColor = final_color;
    
    
}`;const wh=we("color",[1,1,1],$t),Mh=we("shadow",.05,Number),Th=we("bright",.05,Number),Fh=Ie(Ue,Eh,{pressureMap:{value:0},backgroundMap:{value:0},uSize:{value:[0,0]},glassColor:{value:wh},shadowFactor:{value:Mh},brightFactor:{value:Th},parallax:{value:[0,0]}});function Ah(t,e,n,i){Fh(t,{pressureMap:e,backgroundMap:n,parallax:i,uSize:[e.width,e.height]})}var Sh=`precision highp float;

varying vec2 vUv;

uniform vec2 uSize;
uniform vec3 clockHands;

uniform vec3 bgcolor;
uniform vec3 circlecolor1;
uniform vec3 circlecolor2;
uniform vec3 circlecolor3;

uniform vec2 parallax;

#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    
    
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    
    
    return v.rg;
}

vec3 drawCircle(vec2 coord, float t) {
    float radius = max(uSize.x, uSize.y) * 0.5;
    vec2 origin = vec2(sin(t * PI * 2.0), cos(t * PI * 2.0)) * radius;
    coord -= origin;

    float r = length(coord) / radius;
    float f = 1.0 / (abs(r - 1.0) * 100.0 + 1.0);

    vec2 displacement = -coord / (sqrt(max(0.0, 1.0 - r * r)) + 0.01) * f * step(r, 1.0);

    f = 1.0 / (abs(r - 1.0) * 200.0 + 1.0);
    f = f + step(r, 1.0) * 0.05 * (r + 1.0);

    return vec3(displacement, f);
}

void main() {
    vec3 final_color = vec3(0);

    for(int i = 0; i < 1; i++) {
        for(int j = 0; j < 1; j++) {
            vec2 coord = (vUv - 0.5) * uSize + vec2(i, j) / 2.0 + parallax * 2.0;
            float radius = length(coord) / min(uSize.x, uSize.y);
            float clock = atan(coord.y, coord.x);
            float tick = fract(0.25 - clock / PI / 2.0);
            

            vec3 circle3 = drawCircle(coord, clockHands.z / 60.0);
            coord += circle3.xy * 0.1 + parallax * 10.0;
            vec3 circle2 = drawCircle(coord, clockHands.y / 60.0);
            coord += circle2.xy * 0.1 + parallax * 20.0;
            vec3 circle1 = drawCircle(coord, clockHands.x / 12.0);

            vec3 color = bgcolor;
            color = mix(color, circlecolor1, circle1.z);
            color = mix(color, circlecolor2, circle2.z);
            color = mix(color, circlecolor3, circle3.z);

            final_color = final_color + color;

        }
    }

    
    
    
    

    gl_FragColor.rgb = final_color;
    gl_FragColor.a = 1.0;
}`;const Rh=we("bgcolor",[0,0,0],$t),Ch=we("color1",[.9686274509803922,.49411764705882355,.17647058823529413],$t),Dh=we("color2",[.19607843137254902,.21568627450980393,.2901960784313726],$t),Oh=we("color3",[.9607843137254902,.9607843137254902,.9607843137254902],$t),Ph=Ie(Ue,Sh,{uSize:{value:[0,0]},parallax:{value:[0,0]},clockHands:{value:[0,0,0]},bgcolor:{value:Rh},circlecolor1:{value:Ch},circlecolor2:{value:Dh},circlecolor3:{value:Oh}});function Ih(t,e){const n=new Date;Ph(t,{parallax:e,uSize:[t.width,t.height],clockHands:[n.getHours()+n.getMinutes()/60+n.getSeconds()/60/60,n.getMinutes()+n.getSeconds()/60+n.getMilliseconds()/1e3/60,n.getSeconds()+n.getMilliseconds()/1e3]})}const Ge=xl({x:0,y:0});let qn=1;const Es=new xi,Xn=new xi,ot=new yi,ws=new yi;let Yn=!1;function Ms(t){t.absolute;const e=t.alpha,n=t.beta,i=t.gamma;i&&(Yn||(qn=1,Yn=!0));const s=Math.PI/180,r=e?e*s:0,l=n?n*s:0,o=i?i*s:0;Xn.fromEuler(new Cr(r,l,o,"XYZ"))}let at={x:0,y:0};function Ts(t){at.x+=t.movementX*.001,at.y-=t.movementY*.001}let Pr=!0;function Ir(){Yn&&(Es.slerp(Xn,qn),qn=.01,ot.fromQuaternion(Es),ws.fromQuaternion(Xn),ot.inverse().multiply(ws),Ge.value.x=ot[1]/Math.max(ot[0],.1),Ge.value.y=-ot[2]/Math.max(ot[0],.1),console.log(Ge.value)),Pr&&requestAnimationFrame(Ir),Ge.value.x+=at.x*.1,Ge.value.y+=at.y*.1,Ge.value.x*=.99,Ge.value.y*=.99,at.x*=.8,at.y*=.8}function Uh(){return di(()=>{window.addEventListener("deviceorientation",Ms),window.addEventListener("mousemove",Ts),Ir()}),pi(()=>{Pr=!1,window.removeEventListener("deviceorientation",Ms),window.removeEventListener("mousemove",Ts)}),{parallax:Ge}}const Lh=(t,e)=>{const n=t.__vccOpts||t;for(const[i,s]of e)n[i]=s;return n},Nh={id:"ogl-canvas-root"},zh={__name:"App",setup(t){const{parallax:e}=Uh();let n,i;const s=[],r=[],l=we("debug",null,String),o=we("iteration",10,Number);function c(w=!1){const y=new Wn(xe,{width:512,height:512,type:xe.HALF_FLOAT,format:xe.RGBA,internalFormat:xe.RGBA16F,depth:!1,wrapS:xe.CLAMP_TO_EDGE,wrapT:xe.CLAMP_TO_EDGE});return w?r.push(y):s.push(y),y}let h=!0,a=[512,512];function u(){const w=n.getBoundingClientRect();pe.setSize(w.width,w.height),h=!0}function p(w,y){y.fillStyle="red",y.clearRect(0,0,w.width,w.height),y.textAlign="center",y.textBaseline="middle";const _=new Date;if(w.width>w.height*1.5){const C=w.width/8;y.font=Math.round(C)+"px Roboto Mono";const P=[_.getHours().toString().padStart(2,"0"),_.getMinutes().toString().padStart(2,"0"),_.getSeconds().toString().padStart(2,"0")].join(_.getMilliseconds()<500?":":" ");y.fillText(P,w.width/2,w.height/2)}else{const C=w.height/4;y.font=Math.round(C)+"px Roboto Mono",y.fillText(_.getHours().toString().padStart(2,"0"),w.width/2,w.height/2-C),y.fillText(_.getMinutes().toString().padStart(2,"0"),w.width/2,w.height/2),y.fillText(_.getSeconds().toString().padStart(2,"0"),w.width/2,w.height/2+C)}}function g(w){const y=n.getBoundingClientRect();i.mouse.set((w.x-0)/y.width,(y.bottom-w.y)/y.height),i.velocity.set(w.movementX/y.width*a[0],w.movementY/y.width*a[1])}function v(w){if(!w.touches||w.touches.length===0)return;const y=w.touches[0],_=n.getBoundingClientRect();w.preventDefault(),i.mouse.set((y.clientX-0)/_.width,(_.bottom-y.clientY)/_.height),v.prev||(v.prev={x:y.clientX,y:y.clientY}),i.velocity.set((y.clientX-v.prev.x)/_.width*a[0],(y.clientY-v.prev.y)/_.width*a[1]),v.prev.x=y.clientX,v.prev.y=y.clientY}let x=!0;async function T(){n=document.getElementById("ogl-canvas-root"),n.appendChild(xe.canvas),pe.setSize(window.innerWidth,window.innerHeight);let w=c(),y=c(),_=c(!0),C=c(),P=c(!0);i=new Ya(xe,{size:512,falloff:.12,alpha:.8,dissipation:.7}),window.addEventListener("resize",u),u(),window.addEventListener("touchmove",v,{passive:!1}),window.addEventListener("mousemove",g),sh(w);function k(q){if(x&&requestAnimationFrame(k),i.update(),i.velocity.set(0,0),h){h=!1,Ne(_,w.texture,!1),Ne(P,C.texture,!1);const H=Math.max(.4,Math.min(.8,1024/Math.min(pe.width,pe.height)*window.devicePixelRatio)),X=Math.round(pe.width*H/4)*4,W=Math.round(pe.height*H/4)*4;a=[X,W];for(let Y of s)Y.setSize(X,W);Ne(w,_.texture,!1),Ne(C,P.texture,!1);for(let Y of r)Y.setSize(X,W)}gh(P,w.texture,C.texture,i.mask.read.texture);const ee=bh(pe,p);for(let H=0;H<o;H++)ah(_,P.texture),uh(C,_.texture,P.texture),bs(P,C.texture,C.texture),bs(_,w.texture,C.texture),xh(w,_.texture,ee);Ne(C,P.texture,!1),Ih(y,[e.value.x,e.value.y]),Ah(pe,w.texture,y.texture,[e.value.x,e.value.y]),l=="velocity"?Ne(pe,C.texture,!1):l=="pressure"?Ne(pe,w.texture,!0):l=="background"?Ne(pe,y.texture,!1):l=="flowmap"&&Ne(null,i.mask.read.texture,!1)}requestAnimationFrame(k)}function b(){window.removeEventListener("resize",u),window.removeEventListener("touchmove",v),window.removeEventListener("mousemove",g),n.removeChild(xe.canvas),x=!1}return di(()=>{T()}),er(()=>{b()}),(w,y)=>(Mo(),Ao("div",Nh))}},Bh=Lh(zh,[["__scopeId","data-v-185a72fd"]]);fc(Bh).mount("#app");
