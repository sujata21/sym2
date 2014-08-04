// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);

// Backbone.js 0.9.2

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var l=this,y=l.Backbone,z=Array.prototype.slice,A=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:l.Backbone={};g.VERSION="0.9.2";var f=l._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var i=l.jQuery||l.Zepto||l.ender;g.setDomLibrary=function(a){i=a};g.noConflict=function(){l.Backbone=y;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var p=/\s+/,k=g.Events={on:function(a,b,c){var d,e,f,g,j;if(!b)return this;a=a.split(p);for(d=this._callbacks||(this._callbacks=
{});e=a.shift();)f=(j=d[e])?j.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:j?j.next:f};return this},off:function(a,b,c){var d,e,h,g,j,q;if(e=this._callbacks){if(!a&&!b&&!c)return delete this._callbacks,this;for(a=a?a.split(p):f.keys(e);d=a.shift();)if(h=e[d],delete e[d],h&&(b||c))for(g=h.tail;(h=h.next)!==g;)if(j=h.callback,q=h.context,b&&j!==b||c&&q!==c)this.on(d,j,q);return this}},trigger:function(a){var b,c,d,e,f,g;if(!(d=this._callbacks))return this;f=d.all;a=a.split(p);for(g=
z.call(arguments,1);b=a.shift();){if(c=d[b])for(e=c.tail;(c=c.next)!==e;)c.callback.apply(c.context||this,g);if(c=f){e=c.tail;for(b=[b].concat(g);(c=c.next)!==e;)c.callback.apply(c.context||this,b)}}return this}};k.bind=k.on;k.unbind=k.off;var o=g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=n(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");this.changed={};this._silent=
{};this._pending={};this.set(a,{silent:!0});this.changed={};this._silent={};this._pending={};this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(o.prototype,k,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.get(a);return this._escapedAttributes[a]=f.escape(null==
b?"":""+b)},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof o&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=c.changes={},h=this.attributes,g=this._escapedAttributes,j=this._previousAttributes||{};for(e in d){a=d[e];if(!f.isEqual(h[e],a)||c.unset&&f.has(h,e))delete g[e],(c.silent?this._silent:
b)[e]=!0;c.unset?delete h[e]:h[e]=a;!f.isEqual(j[e],a)||f.has(h,e)!=f.has(j,e)?(this.changed[e]=a,c.silent||(this._pending[e]=!0)):(delete this.changed[e],delete this._pending[e])}c.silent||this.change(c);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};
a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};if(c.wait){if(!this._validate(d,c))return!1;e=f.clone(this.attributes)}a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var h=this,i=c.success;c.success=function(a,b,e){b=h.parse(a,e);if(c.wait){delete c.wait;b=f.extend(d||{},b)}if(!h.set(b,c))return false;i?i(h,a):h.trigger("sync",h,a,c)};c.error=g.wrapError(c.error,
h,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d(),!1;a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=n(this,"urlRoot")||n(this.collection,"url")||t();
return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;for(;!f.isEmpty(this._pending);){this._pending=
{};this.trigger("change",this,a);for(c in this.changed)!this._pending[c]&&!this._silent[c]&&delete this.changed[c];this._previousAttributes=f.clone(this.attributes)}this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this.changed):f.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||
!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});var r=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);b.comparator&&(this.comparator=b.comparator);
this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(r.prototype,k,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,d,e,g,i,j={},k={},l=[];b||(b={});a=f.isArray(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");g=e.cid;i=e.id;j[g]||this._byCid[g]||null!=i&&(k[i]||this._byId[i])?
l.push(c):j[g]=k[i]=e}for(c=l.length;c--;)a.splice(l[c],1);c=0;for(d=a.length;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=e.id&&(this._byId[e.id]=e);this.length+=d;A.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=this.models.length;c<d;c++)if(j[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?
a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,b);return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:0},b));return a},
shift:function(a){var b=this.at(0);this.remove(b,a);return b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?
this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,f.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,
e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId=
{};this._byCid={}},_prepareModel:function(a,b){b||(b={});a instanceof o?a.collection||(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,
arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){r.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var u=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},B=/:\w+/g,
C=/\*\w+/g,D=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(u.prototype,k,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new m);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,
this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(D,"\\$&").replace(B,"([^/]+)").replace(C,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var m=g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")},s=/^[#\/]/,E=/msie [\w.]+/;m.started=!1;f.extend(m.prototype,k,{interval:50,getHash:function(a){return(a=(a?a.location:window.location).href.match(/#(.*)$/))?a[1]:
""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=this.getHash();a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(s,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=
!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=E.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?i(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?i(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,
this.interval));this.fragment=a;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(s,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},
stop:function(){i(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a==this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,
function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(s,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||
this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var v=g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},F=/^(\S+)\s*(.*)$/,w="model,collection,el,id,attributes,className,tagName".split(",");
f.extend(v.prototype,k,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);b&&i(a).attr(b);c&&i(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof i?a:i(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=n(this,"events"))){this.undelegateEvents();
for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(F),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=w.length;b<c;b++){var d=w[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,
!1);else{var a=n(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});o.extend=r.extend=u.extend=v.extend=function(a,b){var c=G(this,a,b);c.extend=this.extend;return c};var H={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=H[a];c||(c={});var e={type:d,dataType:"json"};c.url||(e.url=n(b,"url")||t());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",
e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return i.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var x=function(){},G=function(a,
b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);x.prototype=a.prototype;d.prototype=new x;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},n=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},t=function(){throw Error('A "url" property or function must be specified');}}).call(this);

/* VIE 2.1.0 may be freely distributed under the MIT license. See http://viejs.org/ for more details. */(function(){var a=this,d=a.jQuery,e=a.Backbone,b=a._;var c=a.VIE=function(f){this.config=(f)?f:{};this.services={};this.jQuery=d;this.entities=new this.Collection([],{vie:this});this.Entity.prototype.entities=this.entities;this.Entity.prototype.entityCollection=this.Collection;this.Entity.prototype.vie=this;this.Namespaces.prototype.vie=this;this.namespaces=new this.Namespaces((this.config.baseNamespace)?this.config.baseNamespace:"http://viejs.org/ns/",{owl:"http://www.w3.org/2002/07/owl#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",schema:"http://schema.org/",foaf:"http://xmlns.com/foaf/0.1/",geo:"http://www.w3.org/2003/01/geo/wgs84_pos#",dbpedia:"http://dbpedia.org/ontology/",dbprop:"http://dbpedia.org/property/",skos:"http://www.w3.org/2004/02/skos/core#",xsd:"http://www.w3.org/2001/XMLSchema#",sioc:"http://rdfs.org/sioc/ns#",dcterms:"http://purl.org/dc/terms/"});this.Type.prototype.vie=this;this.Types.prototype.vie=this;this.Attribute.prototype.vie=this;this.Attributes.prototype.vie=this;this.types=new this.Types();this.types.add("owl:Thing");if(this.config.classic===true){this.RDFa=new this.ClassicRDFa(this);this.RDFaEntities=new this.ClassicRDFaEntities(this);this.EntityManager=new this.ClassicEntityManager(this);this.cleanup=function(){this.entities.reset()}}};c.prototype.use=function(f,g){if(!g&&!f.name){throw new Error("Please provide a name for the service!")}f.vie=this;f.name=(g)?g:f.name;if(f.init){f.init()}this.services[f.name]=f;return this};c.prototype.service=function(f){if(!this.hasService(f)){throw"Undefined service "+f}return this.services[f]};c.prototype.hasService=function(f){if(!this.services[f]){return false}return true};c.prototype.getServicesArray=function(){return b.map(this.services,function(f){return f})};c.prototype.load=function(f){if(!f){f={}}f.vie=this;return new this.Loadable(f)};c.prototype.save=function(f){if(!f){f={}}f.vie=this;return new this.Savable(f)};c.prototype.remove=function(f){if(!f){f={}}f.vie=this;return new this.Removable(f)};c.prototype.analyze=function(f){if(!f){f={}}f.vie=this;return new this.Analyzable(f)};c.prototype.find=function(f){if(!f){f={}}f.vie=this;return new this.Findable(f)};c.prototype.loadSchema=function(g,f){f=(!f)?{}:f;if(!g){throw new Error("Please provide a proper URL")}else{var h=this;d.getJSON(g).success(function(i){try{c.Util.loadSchemaOrg(h,i,f.baseNS);if(f.success){f.success.call(h)}}catch(j){f.error.call(h,j);return}}).error(function(j,k,i){if(f.error){console.warn(j,k,i);f.error.call(h,"Could not load schema from URL ("+g+")")}})}return this};c.prototype.getTypedEntityClass=function(h){var g=this.types.get(h);if(!g){throw new Error("Unknown type "+h)}var f=function(i,j){if(!i){i={}}i["@type"]=h;this.set(i,j)};f.prototype=new this.Entity();f.prototype.schema=function(){return c.Util.getFormSchemaForType(g)};return f};if(typeof exports==="object"){exports.VIE=c;if(!d){d=require("jquery")}if(!e){e=require("backbone");e.setDomLibrary(d)}if(!b){b=require("underscore")._}}c.prototype.Able=function(){this.init=function(g,f){this.options=g;this.services=g.from||g.using||g.to||[];this.vie=g.vie;this.methodName=f;this.deferred=d.Deferred();this.resolve=this.deferred.resolve;this.resolveWith=this.deferred.resolveWith;this.reject=this.deferred.reject;this.rejectWith=this.deferred.rejectWith;this.success=this.done=this.deferred.done;this.fail=this.deferred.fail;this.then=this.deferred.then;this.always=this.deferred.always;this.from=this.using;this.to=this.using;return this};this.using=function(g){var f=this;g=(b.isArray(g))?g:[g];b.each(g,function(h){var i=(typeof h==="string")?f.vie.service(h):h;f.services.push(i)});return this};this.execute=function(){var f=this;b(this.services).each(function(g){g[f.methodName](f)});return this}};c.prototype.Loadable=function(f){this.init(f,"load")};c.prototype.Loadable.prototype=new c.prototype.Able();c.prototype.Savable=function(f){this.init(f,"save")};c.prototype.Savable.prototype=new c.prototype.Able();c.prototype.Removable=function(f){this.init(f,"remove")};c.prototype.Removable.prototype=new c.prototype.Able();c.prototype.Analyzable=function(f){this.init(f,"analyze")};c.prototype.Analyzable.prototype=new c.prototype.Able();c.prototype.Findable=function(f){this.init(f,"find")};c.prototype.Findable.prototype=new c.prototype.Able();c.Util={toCurie:function(g,j,i){if(c.Util.isCurie(g,i)){return g}var l=":";for(var f in i.toObj()){if(g.indexOf(i.get(f))===1){var h=new RegExp("^<?"+i.get(f));if(f===""){l=""}return((j)?"[":"")+g.replace(h,f+l).replace(/>$/,"")+((j)?"]":"")}}throw new Error("No prefix found for URI '"+g+"'!")},isCurie:function(f,g){if(c.Util.isUri(f)){return false}else{try{c.Util.toUri(f,g);return true}catch(h){return false}}},toUri:function(f,i){if(c.Util.isUri(f)){return f}var j=":";for(var h in i.toObj()){if(h!==""&&(f.indexOf(h+":")===0||f.indexOf("["+h+":")===0)){var g=new RegExp("^\\[{0,1}"+h+j);return"<"+f.replace(g,i.get(h)).replace(/\]{0,1}$/,"")+">"}}if(f.indexOf(j)===-1){return"<"+i.base()+f+">"}throw new Error("No prefix found for CURIE '"+f+"'!")},isUri:function(f){return(typeof f==="string"&&f.search(/^<.+>$/)===0)},mapAttributeNS:function(f,h){var g=f;if(h.isUri(f)||f.indexOf("@")===0){}else{if(h.isCurie(f)){g=h.uri(f)}else{if(!h.isUri(f)){if(f.indexOf(":")===-1){g="<"+h.base()+f+">"}else{g="<"+f+">"}}}}return g},rdf2Entities:function(m,g){if(typeof d.rdf!=="function"){return c.Util._rdf2EntitiesNoRdfQuery(m,g)}try{var l=(g instanceof d.rdf)?g.base(m.vie.namespaces.base()):d.rdf().base(m.vie.namespaces.base()).load(g,{});if(m.rules){var p=d.rdf.ruleset();for(var j in m.vie.namespaces.toObj()){if(j!==""){p.prefix(j,m.vie.namespaces.get(j))}}for(var h=0;h<m.rules.length;h++){if(m.rules.hasOwnProperty(h)){var o=m.rules[h];p.add(o.left,o.right)}}l=l.reason(p,10)}var k={};l.where("?subject ?property ?object").each(function(){var q=this.subject.toString();if(!k[q]){k[q]={"@subject":q,"@context":m.vie.namespaces.toObj(true),"@type":[]}}var s=this.property.toString();var t;try{t=m.vie.namespaces.curie(s)}catch(r){t=s}k[q][t]=k[q][t]||[];function i(u){if(typeof u.value==="string"){if(u.lang){var v={toString:function(){return this["@value"]},"@value":u.value.replace(/^"|"$/g,""),"@language":u.lang};return v}else{return u.value}return u.value.toString()}else{if(u.type==="uri"){return u.toString()}else{return u.value}}}k[q][t].push(i(this.object))});b(k).each(function(i){i["@type"]=i["@type"].concat(i["rdf:type"]);delete i["rdf:type"];b(i).each(function(r,q){if(r.length===1){i[q]=r[0]}})});var f=[];d.each(k,function(){var i=new m.vie.Entity(this);i=m.vie.entities.addOrUpdate(i);f.push(i)});return f}catch(n){console.warn("Something went wrong while parsing the returned results!",n);return[]}},getPreferredLangForPreferredProperty:function(k,q,i){var j,t,h,g,s,o,n,r,f,m=this;o=[];b.each(i,function(l){b.each(q,function(p){t=null;if(typeof p==="string"&&k.get(p)){t=b.flatten([k.get(p)]);b(t).each(function(u){var v,x,w;x=g;v=u["@language"];if(typeof u==="string"&&(u.indexOf("@")===u.length-3||u.indexOf("@")===u.length-5)){v=u.replace(/(^\"*|\"*@)..(..)?$/g,"")}if(v){if(v===l){x+=j}else{x+=20}}else{x+=10}w=u.toString();w=w.replace(/(^\"*|\"*@..$)/g,"");return o.push({score:x,value:w})})}else{if(typeof p==="object"&&k.get(p.property)){n=b.flatten([k.get(p.property)]);n=b(n).map(function(u){if(u.isEntity){return u.getSubject()}else{return u}});o.push({score:g,value:p.makeLabel(n)})}}})});o=b(o).sortBy(function(l){return l.score});if(o.length){return o[0].value}else{return"n/a"}},_rdf2EntitiesNoRdfQuery:function(f,g){var h=[];b.forEach(g,function(k,j){var i={};i["@subject"]="<"+j+">";b.forEach(k,function(m,l){l="<"+l+">";b.forEach(m,function(n){if(n.type==="uri"){n.value="<"+n.value+">"}if(i[l]&&!b.isArray(i[l])){i[l]=[i[l]]}if(b.isArray(i[l])){i[l].push(n.value);return}i[l]=n.value})});h.push(i)});return h},loadSchemaOrg:function(n,k,o){if(!k){throw new Error("Please load the schema.json file.")}n.types.remove("<http://schema.org/Thing>");var h=(o)?o:n.namespaces.base();n.namespaces.base(o);var i={DataType:"xsd:anyType",Boolean:"xsd:boolean",Date:"xsd:date",DateTime:"xsd:dateTime",Time:"xsd:time",Float:"xsd:float",Integer:"xsd:integer",Number:"xsd:anySimpleType",Text:"xsd:string",URL:"xsd:anyURI"};var j=function(t,u){var s=n.types.add(u,[{id:"value",range:i[u]}]);for(var r=0;r<t.length;r++){var q=(n.types.get(t[r]))?n.types.get(t[r]):j.call(n,k.datatypes[t[r]].supertypes,t[r]);s.inherit(q)}return s};for(var g in k.datatypes){if(!n.types.get(g)){var p=k.datatypes[g].supertypes;j.call(n,p,g)}}var m=function(r){var q={};if(r.label){q.label=r.label}if(r.url){q.url=r.url}if(r.comment){q.comment=r.comment}if(r.metadata){q=b.extend(q,r.metadata)}return q};var l=function(r){var q=[];b.each(k.types[r].specific_properties,function(s){var t=k.properties[s];q.push({id:t.id,range:t.ranges,min:t.min,max:t.max,metadata:m(t)})});return q};var f=function(v,w,u,s){var t=n.types.add(w,u,s);for(var r=0;r<v.length;r++){var q=(n.types.get(v[r]))?n.types.get(v[r]):f.call(n,k.types[v[r]].supertypes,v[r],l.call(n,v[r]),m(k.types[v[r]]));t.inherit(q)}if(w==="Thing"&&!t.isof("owl:Thing")){t.inherit("owl:Thing")}return t};b.each(k.types,function(s){if(n.types.get(s.id)){return}var r=s.supertypes;var q=m(s);f.call(n,r,s.id,l.call(n,s.id),q)});n.namespaces.base(h)},getEntityTypeUnion:function(f){var g=f.vie;return new g.Type("Union").inherit(f.get("@type"))},getFormSchemaForType:function(g,f){var h={};b.each(g.attributes.toArray(),function(j){var i=c.Util.toCurie(j.id,false,j.vie.namespaces);h[i]=c.Util.getFormSchemaForAttribute(j)});b.each(h,function(i,j){if(!i.type){delete h[j]}if(i.type==="URL"){i.type="Text";i.dataType="url"}if(i.type==="List"&&!i.listType){delete h[j]}if(!f){if(i.type==="NestedModel"||i.listType==="NestedModel"){delete h[j]}}});return h},getFormSchemaForAttribute:function(h){var f=h.range[0];var g={};var i=function(k){switch(k){case"xsd:anySimpleType":case"xsd:float":case"xsd:integer":return"Number";case"xsd:string":return"Text";case"xsd:date":return"Date";case"xsd:dateTime":return"DateTime";case"xsd:boolean":return"Checkbox";case"xsd:anyURI":return"URL";default:var j=h.vie.types.get(k);if(!j){return null}if(j.attributes.get("value")){return i(j.attributes.get("value").range[0])}return"NestedModel"}};g.title=c.Util.toCurie(h.id,false,h.vie.namespaces);if(h.min>0){g.validators=["required"]}if(h.max>1){g.type="List";g.listType=i(f);if(g.listType==="NestedModel"){g.nestedModelType=f}return g}g.type=i(f);if(g.type==="NestedModel"){g.nestedModelType=f}return g},getFormSchema:function(g){if(!g||!g.isEntity){return{}}var f=c.Util.getEntityTypeUnion(g);var h=c.Util.getFormSchemaForType(f,true);b.each(h,function(i,j){if(i.type!=="NestedModel"&&i.listType!=="NestedModel"){return}h[j].model=g.vie.getTypedEntityClass(i.nestedModelType)});return h},xsdDateTime:function(g){function l(p){var o=p.toString();return o.length<2?"0"+o:o}var m=g.getFullYear();var k=l(g.getMonth()+1);var f=l(g.getDate());var i=l(g.getHours());var j=l(g.getMinutes());var h=l(g.getSeconds());return m+"-"+k+"-"+f+"T"+i+":"+j+":"+h},extractLanguageString:function(o,s,m){var g,r,f,q,j;if(o&&typeof o!=="string"){s=(b.isArray(s))?s:[s];m=(b.isArray(m))?m:[m];for(g=0;g<s.length;g++){for(var k=0;k<m.length;k++){var h=m[k];r=s[g];if(o.has(r)){f=o.get(r);f=(b.isArray(f))?f:[f];for(q=0;q<f.length;q++){j=f[q];if(j.isEntity){j=c.Util.extractLanguageString(j,s,h)}else{if(typeof j==="string"){j=j}else{j=""}}if(j&&j.indexOf("@"+h)>-1){return j.replace(/"/g,"").replace(/@[a-z]+/,"").trim()}}}}}for(g=0;g<s.length;g++){r=s[g];if(o.has(r)){f=o.get(r);f=(b.isArray(f))?f:[f];for(q=0;q<f.length;q++){j=f[q];if(j.isEntity){j=c.Util.extractLanguageString(j,s,[])}if(j&&(typeof j==="string")&&j.indexOf("@")===-1){return j.replace(/"/g,"").replace(/@[a-z]+/,"").trim()}}}}}return undefined},transformationRules:function(f){var g=[{left:["?subject a dbpedia:Person","?subject rdfs:label ?label"],right:function(h){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+h.base()+"Person>",{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"name>",this.label,{namespaces:h.toObj()})]}}(f.vie.namespaces)},{left:["?subject a foaf:Person","?subject rdfs:label ?label"],right:function(h){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+h.base()+"Person>",{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"name>",this.label,{namespaces:h.toObj()})]}}(f.vie.namespaces)},{left:["?subject a dbpedia:Place","?subject rdfs:label ?label"],right:function(h){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+h.base()+"Place>",{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"name>",this.label.toString(),{namespaces:h.toObj()})]}}(f.vie.namespaces)},{left:["?subject a dbpedia:City","?subject rdfs:label ?label","?subject dbpedia:abstract ?abs","?subject dbpedia:country ?country"],right:function(h){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+h.base()+"City>",{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"name>",this.label.toString(),{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"description>",this.abs.toString(),{namespaces:h.toObj()}),d.rdf.triple(this.subject.toString(),"<"+h.base()+"containedIn>",this.country.toString(),{namespaces:h.toObj()})]}}(f.vie.namespaces)}];return g},getAdditionalRules:function(f){var h={Work:"CreativeWork",Film:"Movie",TelevisionEpisode:"TVEpisode",TelevisionShow:"TVSeries",Website:"WebPage",Painting:"Painting",Sculpture:"Sculpture",Event:"Event",SportsEvent:"SportsEvent",MusicFestival:"Festival",FilmFestival:"Festival",Place:"Place",Continent:"Continent",Country:"Country",City:"City",Airport:"Airport",Station:"TrainStation",Hospital:"GovernmentBuilding",Mountain:"Mountain",BodyOfWater:"BodyOfWater",Company:"Organization",Person:"Person"};var g=[];b.each(h,function(k,j){var i={left:["?subject a dbpedia:"+j,"?subject rdfs:label ?label"],right:function(l){return function(){return[d.rdf.triple(this.subject.toString(),"a","<"+l.base()+k+">",{namespaces:l.toObj()}),d.rdf.triple(this.subject.toString(),"<"+l.base()+"name>",this.label.toString(),{namespaces:l.toObj()})]}}(f.vie.namespaces)};g.push(i)});return g}};c.prototype.Entity=function(g,h){g=(g)?g:{};h=(h)?h:{};var f=this;if(g["@type"]!==undefined){g["@type"]=(b.isArray(g["@type"]))?g["@type"]:[g["@type"]];g["@type"]=b.map(g["@type"],function(j){if(!f.vie.types.get(j)){f.vie.types.add(j).inherit("owl:Thing")}return f.vie.types.get(j).id});g["@type"]=(g["@type"].length===1)?g["@type"][0]:g["@type"]}else{g["@type"]=f.vie.types.get("owl:Thing").id}b.each(g,function(k,j){var l=c.Util.mapAttributeNS(j,this.namespaces);if(j!==l){delete g[j];g[l]=k}},f.vie);var i=e.Model.extend({idAttribute:"@subject",initialize:function(j,k){if(j["@subject"]){this.id=this["@subject"]=this.toReference(j["@subject"])}else{this.id=this["@subject"]=j["@subject"]=this.cid.replace("c","_:bnode")}return this},schema:function(){return c.Util.getFormSchema(this)},get:function(j){j=c.Util.mapAttributeNS(j,f.vie.namespaces);var k=e.Model.prototype.get.call(this,j);k=(b.isArray(k))?k:[k];k=b.map(k,function(l){if(l!==undefined&&j==="@type"&&f.vie.types.get(l)){return f.vie.types.get(l)}else{if(l!==undefined&&f.vie.entities.get(l)){return f.vie.entities.get(l)}else{return l}}},this);if(k.length===0){return undefined}k=(k.length===1)?k[0]:k;return k},has:function(j){j=c.Util.mapAttributeNS(j,f.vie.namespaces);return e.Model.prototype.has.call(this,j)},hasRelations:function(){var j=false;b.each(this.attributes,function(k){if(k&&k.isCollection){j=true}});return j},set:function(m,l,o){if(!m){return this}if(m["@subject"]){m["@subject"]=this.toReference(m["@subject"])}if(typeof m==="string"){var p={};p[m]=l;return this.set(p,o)}if(m.attributes){m=m.attributes}var j=this;var n;b.each(m,function(r,q){var s=c.Util.mapAttributeNS(q,j.vie.namespaces);if(q!==s){delete m[q];m[s]=r}},this);b.each(m,function(s,r){if(!s){return}if(r.indexOf("@")===-1){if(s.isCollection){s.each(function(u){j.vie.entities.addOrUpdate(u)})}else{if(s.isEntity){j.vie.entities.addOrUpdate(s);n=new j.vie.Collection(s,{vie:j.vie,predicate:r});m[r]=n}else{if(b.isArray(s)){if(this.attributes[r]&&this.attributes[r].isCollection){var q=this.attributes[r].addOrUpdate(s);m[r]=this.attributes[r];m[r].reset(q)}}else{if(s["@value"]){}else{if(b.isObject(s)&&!b.isDate(s)){var t=new j.vie.Entity(s,l);j.vie.entities.addOrUpdate(t);n=new j.vie.Collection(s,{vie:j.vie,predicate:r});m[r]=n}else{}}}}}}},this);var k=e.Model.prototype.set.call(this,m,l);if(l&&l.ignoreChanges){this.changed={};this._previousAttributes=b.clone(this.attributes)}return k},unset:function(j,k){j=c.Util.mapAttributeNS(j,f.vie.namespaces);return e.Model.prototype.unset.call(this,j,k)},validate:function(j,m){if(m&&m.validate===false){return}var l=this.get("@type");if(b.isArray(l)){var k=[];b.each(l,function(o){var n=this.validateByType(o,j,m);if(n){k.push(n)}},this);if(b.isEmpty(k)){return}return b.flatten(k)}return this.validateByType(l,j,m)},validateByType:function(m,k,o){var n={max:"<%= property %> cannot contain more than <%= num %> items",min:"<%= property %> must contain at least <%= num %> items",required:"<%= property %> is required"};if(!m.attributes){return}var q=function(s,t,r){return{property:s.id,constraint:t,message:b.template(n[t],b.extend({property:s.id},r))}};var j=function(s,r){if(!r[s.id]||b.isEmpty(r[s.id])){return q(s,"required",{})}};var p=function(s,r){if(!r[s.id]){return}if(!r[s.id].isCollection&&!b.isArray(r[s.id])){return}if(r[s.id].length>s.max){return q(s,"max",{num:s.max})}};var l=[];b.each(m.attributes.list(),function(s){var r;if(s.max&&s.max!=-1){r=p(s,k);if(r){l.push(r)}}if(s.min&&s.min>0){r=j(s,k);if(r){l.push(r)}}});if(b.isEmpty(l)){return}return l},isNew:function(){if(this.getSubjectUri().substr(0,7)==="_:bnode"){return true}return false},hasChanged:function(j){if(this.markedChanged){return true}return e.Model.prototype.hasChanged.call(this,j)},forceChanged:function(j){this.markedChanged=j?true:false},getSubject:function(){if(typeof this.id==="undefined"){this.id=this.attributes[this.idAttribute]}if(typeof this.id==="string"){if(this.id.substr(0,7)==="http://"||this.id.substr(0,4)==="urn:"){return this.toReference(this.id)}return this.id}return this.cid.replace("c","_:bnode")},getSubjectUri:function(){return this.fromReference(this.getSubject())},isReference:function(j){var k=new RegExp("^\\<([^\\>]*)\\>$");if(k.exec(j)){return true}return false},toReference:function(m){if(b.isArray(m)){var j=this;return b.map(m,function(n){return j.toReference(n)})}var l=this.vie.namespaces;var k=m;if(m.substring(0,2)==="_:"){k=m}else{if(l.isCurie(m)){k=l.uri(m);if(k==="<"+l.base()+m+">"){k="<"+m+">"}}else{if(!l.isUri(m)){k="<"+m+">"}}}return k},fromReference:function(k){var j=this.vie.namespaces;if(!j.isUri(k)){return k}return k.substring(1,k.length-1)},as:function(j){if(j==="JSON"){return this.toJSON()}if(j==="JSONLD"){return this.toJSONLD()}throw new Error("Unknown encoding "+j)},toJSONLD:function(){var k={};var j=this;b.each(j.attributes,function(n,m){var l=n;if(n instanceof j.vie.Collection){l=n.map(function(o){return o.getSubject()})}k[m]=l});k["@subject"]=j.getSubject();return k},setOrAdd:function(l,k,m){var j=this;if(typeof l==="string"&&k){j._setOrAddOne(l,k,m)}else{if(typeof l==="object"){b(l).each(function(o,n){j._setOrAddOne(n,o,k)})}}return this},_setOrAddOne:function(k,o,m){if(!k||!o){return}m=(m)?m:{};var l;k=c.Util.mapAttributeNS(k,f.vie.namespaces);if(b.isArray(o)){for(l=0;l<o.length;l++){this._setOrAddOne(k,o[l],m)}return}if(k==="@type"&&o instanceof f.vie.Type){o=o.id}var p={};var n=e.Model.prototype.get.call(this,k);if(!n){p[k]=o;this.set(p,m)}else{if(n.isCollection){if(o.isCollection){o.each(function(q){n.add(q)})}else{if(o.isEntity){n.add(o)}else{if(typeof o==="object"){o=new this.vie.Entity(o);n.add(o)}else{throw new Error("you cannot add a literal to a collection of entities!")}}}this.trigger("change:"+k,this,o,{});this.change({})}else{if(b.isArray(n)){if(o.isCollection){for(l=0;l<o.size();l++){this._setOrAddOne(k,o.at(l).getSubject(),m)}}else{if(o.isEntity){this._setOrAddOne(k,o.getSubject(),m)}else{if(typeof o==="object"){o=new this.vie.Entity(o);this._setOrAddOne(k,o,m)}else{n.push(o);p[k]=n;this.set(p)}}}}else{var j=[n];j.push(o);p[k]=j;return this.set(p,m)}}}},hasType:function(j){j=f.vie.types.get(j);return this.hasPropertyValue("@type",j)},hasPropertyValue:function(l,k){var j=this.get(l);if(!(k instanceof Object)){k=f.vie.entities.get(k)}if(j instanceof Array){return j.indexOf(k)!==-1}else{return j===k}},isof:function(l){var k=this.get("@type");if(k===undefined){return false}k=(b.isArray(k))?k:[k];l=(f.vie.types.get(l))?f.vie.types.get(l):new f.vie.Type(l);for(var j=0;j<k.length;j++){if(f.vie.types.get(k[j])){if(f.vie.types.get(k[j]).isof(l)){return true}}else{var m=new f.vie.Type(k[j]);if(m.id===l.id){return true}}}return false},addTo:function(k,l){var j=this;if(k instanceof j.vie.Collection){if(l){k.addOrUpdate(j)}else{k.add(j)}return this}throw new Error("Please provide a proper collection of type VIE.Collection as argument!")},isEntity:true,vie:f.vie});return new i(g,h)};c.prototype.Collection=e.Collection.extend({model:c.prototype.Entity,initialize:function(g,f){if(!f||!f.vie){throw new Error("Each collection needs a VIE reference")}this.vie=f.vie;this.predicate=f.predicate},canAdd:function(f){return true},get:function(f){if(f===null){return null}f=(f.getSubject)?f.getSubject():f;if(typeof f==="string"&&f.indexOf("_:")===0){if(f.indexOf("bnode")===2){f=f.replace("_:bnode","c");return this._byCid[f]}else{return this._byId["<"+f+">"]}}else{f=this.toReference(f);return this._byId[f]}},addOrUpdate:function(g,f){f=f||{};var k=this;var i;if(b.isArray(g)){var j=[];b.each(g,function(l){j.push(k.addOrUpdate(l,f))});return j}if(g===undefined){throw new Error("No model given")}if(b.isString(g)){g={"@subject":g,id:g}}if(!g.isEntity){g=new this.model(g)}if(g.id&&this.get(g.id)){i=this.get(g.id)}if(this.getByCid(g.cid)){i=this.getByCid(g.cid)}if(i){var h={};b.each(g.attributes,function(n,m){if(!i.has(m)){h[m]=n;return true}if(m==="@subject"){if(g.isNew()&&!i.isNew()){return true}}if(i.get(m)===n){return true}var o=i.attributes[m];var l=n;if(o instanceof k.vie.Collection){return true}if(f.overrideAttributes){h[m]=n;return true}if(m==="@context"){h[m]=d.extend(true,{},o,l)}else{o=(d.isArray(o))?o:[o];l=(d.isArray(l))?l:[l];h[m]=b.uniq(o.concat(l));h[m]=(h[m].length===1)?h[m][0]:h[m]}});if(!b.isEmpty(h)){i.set(h,f.updateOptions)}return i}this.add(g,f.addOptions);return g},isReference:function(f){var g=new RegExp("^\\<([^\\>]*)\\>$");if(g.exec(f)){return true}return false},toReference:function(f){if(this.isReference(f)){return f}return"<"+f+">"},fromReference:function(f){if(!this.isReference(f)){return f}return f.substring(1,f.length-1)},isCollection:true});if(c.prototype.Type){throw new Error("ERROR: VIE.Type is already defined. Please check your installation!")}if(c.prototype.Types){throw new Error("ERROR: VIE.Types is already defined. Please check your installation!")}c.prototype.Type=function(h,f,g){if(h===undefined||typeof h!=="string"){throw"The type constructor needs an 'id' of type string! E.g., 'Person'"}this.id=this.vie.namespaces.isUri(h)?h:this.vie.namespaces.uri(h);if(this.vie.types.get(this.id)){throw new Error("The type "+this.id+" is already defined!")}this.supertypes=new this.vie.Types();this.subtypes=new this.vie.Types();this.attributes=new this.vie.Attributes(this,(f)?f:[]);this.metadata=g?g:{};this.isof=function(i){i=this.vie.types.get(i);if(i){return i.subsumes(this.id)}else{throw new Error("No valid type given")}};this.subsumes=function(i){i=this.vie.types.get(i);if(i){if(this.id===i.id){return true}var j=this.subtypes.list();for(var l=0;l<j.length;l++){var k=j[l];if(k){if(k.id===i.id||k.subsumes(i)){return true}}}return false}else{throw new Error("No valid type given")}};this.inherit=function(j){if(typeof j==="string"){this.inherit(this.vie.types.get(j))}else{if(j instanceof this.vie.Type){j.subtypes.addOrOverwrite(this);this.supertypes.addOrOverwrite(j);try{this.attributes.list()}catch(m){j.subtypes.remove(this);this.supertypes.remove(j);throw m}}else{if(d.isArray(j)){for(var k=0,l=j.length;k<l;k++){this.inherit(j[k])}}else{throw new Error("Wrong argument in VIE.Type.inherit()")}}}return this};this.hierarchy=function(){var k={id:this.id,subtypes:[]};var j=this.subtypes.list();for(var m=0,i=j.length;m<i;m++){var l=this.vie.types.get(j[m]);k.subtypes.push(l.hierarchy())}return k};this.instance=function(j,k){j=(j)?j:{};k=(k)?k:{};if(k.typeChecking!==false){for(var i in j){if(i.indexOf("@")!==0&&!this.attributes.get(i)){throw new Error("Cannot create an instance of "+this.id+" as the type does not allow an attribute '"+i+"'!")}}}if(j["@type"]){j["@type"].push(this.id)}else{j["@type"]=this.id}return new this.vie.Entity(j,k)};this.toString=function(){return this.id}};c.prototype.Types=function(){this._types={};this.add=function(i,f,h){if(b.isArray(i)){b.each(i,function(j){this.add(j)},this);return this}if(this.get(i)){throw new Error("Type '"+i+"' already registered.")}else{if(typeof i==="string"){var g=new this.vie.Type(i,f,h);this._types[g.id]=g;return g}else{if(i instanceof this.vie.Type){this._types[i.id]=i;return i}else{throw new Error("Wrong argument to VIE.Types.add()!")}}}return this};this.addOrOverwrite=function(g,f){if(this.get(g)){this.remove(g)}return this.add(g,f)};this.get=function(g){if(!g){return undefined}if(typeof g==="string"){var f=this.vie.namespaces.isUri(g)?g:this.vie.namespaces.uri(g);return this._types[f]}else{if(g instanceof this.vie.Type){return this.get(g.id)}}return undefined};this.remove=function(j){var f=this.get(j);if(!f){return this}if(!f||f.subsumes("owl:Thing")){console.warn("You are not allowed to remove 'owl:Thing'.");return this}delete this._types[f.id];var g=f.subtypes.list();for(var i=0;i<g.length;i++){var h=g[i];if(h.supertypes.list().length===1){this.remove(h)}else{h.supertypes.remove(f.id)}}return f};this.toArray=this.list=function(){var f=[];for(var g in this._types){f.push(this._types[g])}return f};this.sort=function(i,h){var n=this;i=(d.isArray(i))?i:[i];h=(h)?true:false;if(i.length===0){return[]}var f=[i[0]];var l,g;for(l=1,g=i.length;l<g;l++){var m=i[l];var j=n.get(m);if(j){for(var k=0;k<f.length;k++){if(j.subsumes(f[k])){f.splice(k,0,m);break}else{if(k===f.length-1){f.push(m)}}}}}for(l=0;l<f.length;l++){if(f.lastIndexOf(f[l])!==l){f.splice(l,1);l--}}if(!h){f.reverse()}return f}};if(c.prototype.Attribute){throw new Error("ERROR: VIE.Attribute is already defined. Please check your VIE installation!")}if(c.prototype.Attributes){throw new Error("ERROR: VIE.Attributes is already defined. Please check your VIE installation!")}c.prototype.Attribute=function(k,f,j,h,i,g){if(k===undefined||typeof k!=="string"){throw new Error("The attribute constructor needs an 'id' of type string! E.g., 'Person'")}if(f===undefined){throw new Error("The attribute constructor of "+k+" needs 'range'.")}if(j===undefined){throw new Error("The attribute constructor of "+k+" needs a 'domain'.")}this._domain=j;this.id=this.vie.namespaces.isUri(k)?k:this.vie.namespaces.uri(k);this.range=(b.isArray(f))?f:[f];h=h?h:0;this.min=(h>0)?h:0;i=i?i:1;if(i===-1){i=Number.MAX_VALUE}this.max=(i>=this.min)?i:this.min;this.metadata=g?g:{};this.applies=function(n){if(this.vie.types.get(n)){n=this.vie.types.get(n)}for(var o=0,m=this.range.length;o<m;o++){var l=this.vie.types.get(this.range[o]);if(l===undefined&&typeof n==="string"){if(n===this.range[o]){return true}}else{if(n.isof(this.range[o])){return true}}}return false}};c.prototype.Attributes=function(g,f){this._local={};this._attributes={};this.domain=g;this.add=function(m,j,l,h,k){if(b.isArray(m)){b.each(m,function(n){this.add(n)},this);return this}if(this.get(m)){throw new Error("Attribute '"+m+"' already registered for domain "+this.domain.id+"!")}else{if(typeof m==="string"){var i=new this.vie.Attribute(m,j,this.domain,l,h,k);this._local[i.id]=i;return i}else{if(m instanceof this.vie.Attribute){m.domain=this.domain;m.vie=this.vie;this._local[m.id]=m;return m}else{throw new Error("Wrong argument to VIE.Types.add()!")}}}};this.remove=function(i){var h=this.get(i);if(h.id in this._local){delete this._local[h.id];return h}throw new Error("The attribute "+i+" is inherited and cannot be removed from the domain "+this.domain.id+"!")};this.get=function(i){if(typeof i==="string"){var h=this.vie.namespaces.isUri(i)?i:this.vie.namespaces.uri(i);return this._inherit()._attributes[h]}else{if(i instanceof this.vie.Attribute){return this.get(i.id)}else{throw new Error("Wrong argument in VIE.Attributes.get()")}}};this._inherit=function(){var D,t,A;var q=d.extend(true,{},this._local);var E=b.map(this.domain.supertypes.list(),function(p){return p.attributes});var u={};var m={};var s,l;for(D=0,s=E.length;D<s;D++){var B=E[D].list();for(t=0,l=B.length;t<l;t++){A=B[t].id;if(!(A in q)){if(!(A in u)&&!(A in m)){u[A]=B[t]}else{if(!m[A]){m[A]={range:[],mins:[],maxs:[],metadatas:[]}}if(A in u){m[A].range=d.merge(m[A].range,u[A].range);m[A].mins=d.merge(m[A].mins,[u[A].min]);m[A].maxs=d.merge(m[A].maxs,[u[A].max]);m[A].metadatas=d.merge(m[A].metadatas,[u[A].metadata]);delete u[A]}m[A].range=d.merge(m[A].range,B[t].range);m[A].mins=d.merge(m[A].mins,[B[t].min]);m[A].maxs=d.merge(m[A].maxs,[B[t].max]);m[A].metadatas=d.merge(m[A].metadatas,[B[t].metadata]);m[A].range=b.uniq(m[A].range);m[A].mins=b.uniq(m[A].mins);m[A].maxs=b.uniq(m[A].maxs);m[A].metadatas=b.uniq(m[A].metadatas)}}}}d.extend(q,u);for(A in m){var z=m[A].range;var o=m[A].mins;var n=m[A].maxs;var j=m[A].metadatas;var k=[];for(var v=0,h=z.length;v<h;v++){var y=this.vie.types.get(z[v]);var F=false;if(y){for(t=0;t<h;t++){if(t===v){continue}var C=this.vie.types.get(z[t]);if(C&&C.isof(y)){F=true;break}}}if(!F){k.push(z[v])}}var i=b.max(o);var w=b.min(n);if(i<=w&&w>=0&&i>=0){q[A]=new this.vie.Attribute(A,k,this,i,w,j[0])}else{throw new Error("This inheritance is not allowed because of an invalid minCount/maxCount pair!")}}this._attributes=q;return this};this.toArray=this.list=function(j){var k=[];var i=this._inherit()._attributes;for(var h in i){if(!j||i[h].applies(j)){k.push(i[h])}}return k};f=b.isArray(f)?f:[f];b.each(f,function(h){this.add(h.id,h.range,h.min,h.max,h.metadata)},this)};if(c.prototype.Namespaces){throw new Error("ERROR: VIE.Namespaces is already defined. Please check your VIE installation!")}c.prototype.Namespaces=function(g,f){if(!g){throw new Error("Please provide a base namespace!")}this._base=g;this._namespaces=(f)?f:{};if(typeof this._namespaces!=="object"||b.isArray(this._namespaces)){throw new Error("If you want to initialise VIE namespace prefixes, please provide a proper object!")}};c.prototype.Namespaces.prototype.base=function(f){if(!f){return this._base}else{if(typeof f==="string"){this.removeNamespace(f);this._base=f;return this._base}else{throw new Error("Please provide a valid namespace!")}}};c.prototype.Namespaces.prototype.add=function(g,f){if(typeof g==="object"){for(var h in g){this.add(h,g[h])}return this}if(g===""){this.base(f);return this}else{if(this.contains(g)&&f!==this._namespaces[g]){throw new Error("ERROR: Trying to register namespace prefix mapping ("+g+","+f+")!There is already a mapping existing: '("+g+","+this.get(g)+")'!")}else{d.each(this._namespaces,function(j,i){if(i===f&&j!==g){throw new Error("ERROR: Trying to register namespace prefix mapping ("+g+","+f+")!There is already a mapping existing: '("+j+","+f+")'!")}})}}this._namespaces[g]=f;return this};c.prototype.Namespaces.prototype.addOrReplace=function(g,f){if(typeof g==="object"){for(var h in g){this.addOrReplace(h,g[h])}return this}this.remove(g);this.removeNamespace(f);return this.add(g,f)};c.prototype.Namespaces.prototype.get=function(f){if(f===""){return this.base()}return this._namespaces[f]};c.prototype.Namespaces.prototype.getPrefix=function(f){var g;if(f.indexOf("<")===0){f=f.substring(1,f.length-1)}d.each(this._namespaces,function(i,h){if(f.indexOf(h)===0){g=i}if(f.indexOf(i+":")===0){g=i}});return g};c.prototype.Namespaces.prototype.contains=function(f){return(f in this._namespaces)};c.prototype.Namespaces.prototype.containsNamespace=function(f){return this.getPrefix(f)!==undefined};c.prototype.Namespaces.prototype.update=function(g,f){this.remove(g);return this.add(g,f)};c.prototype.Namespaces.prototype.updateNamespace=function(g,f){this.removeNamespace(g);return this.add(g,f)};c.prototype.Namespaces.prototype.remove=function(f){if(f){delete this._namespaces[f]}return this};c.prototype.Namespaces.prototype.removeNamespace=function(f){var g=this.getPrefix(f);if(g){delete this._namespaces[g]}return this};c.prototype.Namespaces.prototype.toObj=function(f){if(f){return d.extend({},this._namespaces)}return d.extend({"":this._base},this._namespaces)};c.prototype.Namespaces.prototype.curie=function(f,g){return c.Util.toCurie(f,g,this)};c.prototype.Namespaces.prototype.isCurie=function(f){return c.Util.isCurie(f,this)};c.prototype.Namespaces.prototype.uri=function(f){return c.Util.toUri(f,this)};c.prototype.Namespaces.prototype.isUri=c.Util.isUri;c.prototype.ClassicRDFa=function(f){this.vie=f};c.prototype.ClassicRDFa.prototype={readEntities:function(f){var g=[];var h=this.vie.RDFaEntities.getInstances(f);b.each(h,function(i){g.push(i.toJSONLD())});return g},findPredicateElements:function(h,g,f){return this.vie.services.rdfa.findPredicateElements(h,g,f)},getPredicate:function(f){return this.vie.services.rdfa.getElementPredicate(f)},getSubject:function(f){return this.vie.services.rdfa.getElementSubject(f)}};c.prototype.ClassicRDFaEntities=function(f){this.vie=f};c.prototype.ClassicRDFaEntities.prototype={getInstances:function(f){if(!this.vie.services.rdfa){this.vie.use(new this.vie.RdfaService())}var g=null;var h=false;this.vie.load({element:f}).from("rdfa").execute().done(function(i){g=i;h=true});while(!h){}return g},getInstance:function(f){var g=this.getInstances(f);if(g&&g.length){return g.pop()}return null}};c.prototype.ClassicEntityManager=function(f){this.vie=f;this.entities=this.vie.entities};c.prototype.ClassicEntityManager.prototype={getBySubject:function(f){return this.vie.entities.get(f)},getByJSONLD:function(f){if(typeof f==="string"){try{f=d.parseJSON(f)}catch(g){return null}}return this.vie.entities.addOrUpdate(f)},initializeCollection:function(){return}};(function(){c.prototype.DBPediaService=function(f){var g={name:"dbpedia",namespaces:{owl:"http://www.w3.org/2002/07/owl#",yago:"http://dbpedia.org/class/yago/",foaf:"http://xmlns.com/foaf/0.1/",georss:"http://www.georss.org/georss/",geo:"http://www.w3.org/2003/01/geo/wgs84_pos#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",dbpedia:"http://dbpedia.org/ontology/",dbprop:"http://dbpedia.org/property/",dcelements:"http://purl.org/dc/elements/1.1/"},rules:[]};this.options=d.extend(true,g,f?f:{});this.vie=null;this.name=this.options.name;d.ajaxSetup({converters:{"text application/rdf+json":function(h){return JSON.parse(h)}},timeout:60000})};c.prototype.DBPediaService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.extend([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[]);this.connector=new this.vie.DBPediaConnector(this.options);return this},load:function(l){var h=this;var j=l instanceof this.vie.Loadable;if(!j){throw new Error("Invalid Loadable passed")}var m=function(o){o=(typeof o==="string")?JSON.parse(o):o;b.defer(function(){try{var q=c.Util.rdf2Entities(h,o);q=(b.isArray(q))?q:[q];b.each(q,function(r){r.set("DBPediaServiceLoad",c.Util.xsdDateTime(new Date()))});q=(q.length===1)?q[0]:q;l.resolve(q)}catch(p){l.reject(p)}})};var k=function(o){l.reject(o)};var g=(l.options.entity)?l.options.entity:l.options.entities;if(!g){l.reject([])}else{g=(b.isArray(g))?g:[g];var n=[];for(var i=0;i<g.length;i++){var f=(typeof g[i]==="string")?g[i]:g[i].id;n.push(f)}this.connector.load(n,m,k)}return this}};c.prototype.DBPediaConnector=function(f){this.options=f;this.baseUrl="http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&timeout=0"};c.prototype.DBPediaConnector.prototype={load:function(g,l,j,o){if(!o){o={}}var f=this.baseUrl+"&format="+encodeURIComponent("application/rdf+json")+"&query=";if(b.isArray(g)){var n="";var h="";for(var m=0;m<g.length;m++){var i=(/^<.+>$/.test(g[m]))?g[m]:"<"+g[m]+">";if(m>0){n+=" .";h+=" UNION "}n+=" "+i+" ?prop"+m+" ?val"+m;h+=" { "+i+" ?prop"+m+" ?val"+m+" }"}f+=encodeURIComponent("CONSTRUCT {"+n+" } WHERE {"+h+" }")}else{g=(/^<.+>$/.test(g))?g:"<"+g+">";f+=encodeURIComponent("CONSTRUCT { "+g+" ?prop ?val } WHERE { "+g+" ?prop ?val }")}var k=o.format||"application/rdf+json";if(typeof exports!=="undefined"&&typeof process!=="undefined"){return this._loadNode(f,l,j,o,k)}d.ajax({success:function(p){l(p)},error:j,type:"GET",url:f,accepts:{"application/rdf+json":"application/rdf+json"}});return this},_loadNode:function(j,l,g,f,k){var i=require("request");var h=i({method:"GET",uri:j,headers:{Accept:k}},function(o,n,m){if(n.statusCode!==200){return g(m)}l(JSON.parse(m))});h.end();return this}}})();(function(){c.prototype.OpenCalaisService=function(f){var g={name:"opencalais",url:["http://api.opencalais.com/enlighten/rest/"],timeout:60000,namespaces:{opencalaisc:"http://s.opencalais.com/1/pred/",opencalaiscr:"http://s.opencalais.com/1/type/er/",opencalaiscm:"http://s.opencalais.com/1/type/em/e/"},rules:[]};this.options=d.extend(true,g,f?f:{});this.vie=null;this.name=this.options.name;d.ajaxSetup({converters:{"text application/rdf+json":function(h){return JSON.parse(h)}},timeout:this.options.timeout})};c.prototype.OpenCalaisService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.extend([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[]);this.connector=new this.vie.OpenCalaisConnector(this.options)},analyze:function(l){var f=this;var h=l instanceof this.vie.Analyzable;if(!h){throw"Invalid Analyzable passed"}var i=l.options.element?l.options.element:d("body");var k=f._extractText(i);if(k.length>0){var j=function(m){b.defer(function(){var n=c.Util.rdf2Entities(f,m);l.resolve(n)})};var g=function(m){l.reject(m)};this.connector.analyze(k,j,g)}else{console.warn("No text found in element.");l.resolve([])}},_extractText:function(g){if(g.get(0)&&g.get(0).tagName&&(g.get(0).tagName=="TEXTAREA"||g.get(0).tagName=="INPUT"&&g.attr("type","text"))){return g.get(0).val()}else{var f=g.text().replace(/\s+/g," ").replace(/\0\b\n\r\f\t/g,"");return d.trim(f)}}};c.prototype.OpenCalaisConnector=function(f){this.options=f;this.baseUrl=(b.isArray(f.url))?f.url:[f.url];this.enhancerUrlPrefix="/"};c.prototype.OpenCalaisConnector.prototype={analyze:function(l,k,h,g){if(!g){g={urlIndex:0}}if(g.urlIndex>=this.baseUrl.length){h("Could not connect to the given OpenCalais endpoints! Please check for their setup!");return}var f=this.baseUrl[g.urlIndex].replace(/\/$/,"");f+=this.enhancerUrlPrefix;var j=g.format||"application/rdf+json";var m=function(u,n,p,q,r){return function(){console.error("OpenCalais connection error",arguments);u.analyze(n,p,q,b.extend(r,{urlIndex:r.urlIndex+1}))}}(this,l,k,h,g);var i=this._prepareData(l);if(typeof exports!=="undefined"&&typeof process!=="undefined"){return this._analyzeNode(f,i,k,m,g,j)}d.ajax({success:function(o,n,q){var p=q.responseText.replace(/<!--[\s\S]*?-->/g,"");k(p)},error:m,type:"POST",url:f,data:i,accept:"text/plain"})},_analyzeNode:function(g,m,l,h,f,k){var j=require("request");var i=j({method:"POST",uri:g,body:m,headers:{Accept:k}},function(p,o,n){try{l({results:JSON.parse(n)})}catch(q){h(q)}});i.end()},_prepareData:function(f){return{licenseID:this.options.api_key,calculareRelevanceScore:"true",enableMetadataType:"GenericRelations,SocialTags",contentType:"text/html",content:f}}}})();(function(){c.prototype.RdfaRdfQueryService=function(f){var g={name:"rdfardfquery",namespaces:{},rules:[]};this.options=d.extend(true,g,f?f:{});this.views=[];this.vie=null;this.name=this.options.name};c.prototype.RdfaRdfQueryService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.extend([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[])},analyze:function(f){return this.load(f)},load:function(l){var f=this;var g=l instanceof this.vie.Loadable||l instanceof this.vie.Analyzable;if(!g){throw new Error("Invalid Loadable/Analyzable passed")}var i=l.options.element?l.options.element:d(document);try{var h=d(i).find("[about],[typeof]").rdfa();d.each(d(i).xmlns(),function(n,m){f.vie.namespaces.addOrReplace(n,m.toString())});var k=c.Util.rdf2Entities(this,h);l.resolve(k)}catch(j){l.reject(j)}},save:function(i){var g=i instanceof this.vie.Savable;if(!g){i.reject("Invalid Savable passed")}if(!i.options.element){i.reject("Unable to write entity to RDFa, no element given")}if(!i.options.entity){i.reject("Unable to write to RDFa, no entity given")}if(!d.rdf){i.reject("No rdfQuery found.")}var f=i.options.entity;var j=[];var h=f.get("@type");h=(d.isArray(h))?h[0]:h;h=h.id;j.push(f.getSubject()+" a "+h);d(i.options.element).rdfa(j);i.resolve()}}})();(function(){c.prototype.RdfaService=function(f){var g={name:"rdfa",namespaces:{},subjectSelector:"[about],[typeof],[src],html",predicateSelector:"[property],[rel]",rules:[],bnodePrefix:"_a"};this.options=d.extend(true,g,f?f:{});this.bnodes=0;this.views=[];this.templates={};this.datatypeReaders={"<http://www.w3.org/2001/XMLSchema#boolean>":function(h){if(h==="true"||h===1||h===true){return true}return false},"<http://www.w3.org/2001/XMLSchema#dateTime>":function(h){return new Date(h)},"<http://www.w3.org/2001/XMLSchema#integer>":function(h){return parseInt(h,10)}};this.datatypeWriters={"<http://www.w3.org/2001/XMLSchema#dateTime>":function(h){if(!b.isDate(h)){return h}return h.toISOString()}};this.vie=null;this.name=this.options.name};c.prototype.RdfaService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.merge([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[])},analyze:function(f){return this.load(f)},load:function(j){var f=this;var g=j instanceof this.vie.Loadable||j instanceof this.vie.Analyzable;if(!g){throw new Error("Invalid Loadable/Analyzable passed")}var h;if(!j.options.element){if(typeof document==="undefined"){return j.resolve([])}h=d(document)}else{h=j.options.element}var i=this.readEntities(h);j.resolve(i)},save:function(g){var f=g instanceof this.vie.Savable;if(!f){throw"Invalid Savable passed"}if(!g.options.element){throw"Unable to write entity to RDFa, no element given"}if(!g.options.entity){throw"Unable to write to RDFa, no entity given"}this._writeEntity(g.options.entity,g.options.element);g.resolve()},readEntities:function(h){var g=this;var i=this.xmlns(h);for(var j in i){this.vie.namespaces.addOrReplace(j,i[j])}var k=[];var f=d(this.options.subjectSelector,h).add(d(h).filter(this.options.subjectSelector)).each(function(){var l=g._readEntity(d(this));if(l){k.push(l)}});return k},_readEntity:function(i){var h=this.getElementSubject(i);var j=this._getElementType(i);var f=this._readEntityPredicates(h,i,false);if(d.isEmptyObject(f)){return null}var k=this.vie;b.each(f,function(n,m){if(!b.isArray(n)){return}var l=new this.vie.Collection([],{vie:k,predicate:m});b.each(n,function(o){var p=k.entities.addOrUpdate({"@subject":o});l.addOrUpdate(p)});f[m]=l},this);f["@subject"]=h;if(j){f["@type"]=j}var g=new this.vie.Entity(f);g=this.vie.entities.addOrUpdate(g,{updateOptions:{silent:true,ignoreChanges:true}});this._registerEntityView(g,i);return g},_writeEntity:function(g,h){var f=this;this.findPredicateElements(this.getElementSubject(h),h,true).each(function(){var j=d(this);var i=f.getElementPredicate(j);if(!g.has(i)){return true}var k=g.get(i);if(k&&k.isCollection){return true}if(k===f.readElementValue(i,j)){return true}f.writeElementValue(i,j,k)});return true},_getViewForElement:function(h,f){var g;d.each(this.views,function(){if(d(this.el).get(0)===h.get(0)){if(f&&!this.template){return true}g=this;return false}});return g},_registerEntityView:function(i,j,g){if(!j.length){return}var f=this;var h=this._getViewForElement(j);if(h){if(i.hasRelations()&&!h.collectionsChecked){this._registerEntityCollectionViews(i,j,h)}return h}h=new this.vie.view.Entity({model:i,el:j,tagName:j.get(0).nodeName,vie:this.vie,service:this.name});this.views.push(h);if(g){d(j).find(this.options.predicateSelector).add(d(j).filter(this.options.predicateSelector)).each(function(){var k=d(this).attr("rel");if(!k){return}i.set(k,new f.vie.Collection([],{vie:f.vie,predicate:k}))})}this._registerEntityCollectionViews(i,j,h);return h},_registerEntityCollectionViews:function(h,i,g){var f=this;b.each(h.attributes,function(l,j){var k=h.fromReference(h.get(j));if(k&&k.isCollection){d.each(f.getElementByPredicate(j,i),function(){f._registerCollectionView(k,d(this),h)});g.collectionsChecked=true}})},setTemplate:function(i,f,h){var g;if(!h){h=f;f="default"}i=this.vie.namespaces.isUri(i)?i:this.vie.namespaces.uri(i);if(b.isFunction(h)){g=h}else{g=this.getElementTemplate(h)}if(!this.templates[i]){this.templates[i]={}}this.templates[i][f]=g;b.each(this.views,function(j){if(!(j instanceof this.vie.view.Collection)){return}if(j.collection.predicate!==f){return}j.templates[i]=g},this)},getTemplate:function(g,f){if(!f){f="default"}g=this.vie.namespaces.isUri(g)?g:this.vie.namespaces.uri(g);if(!this.templates[g]){return}return this.templates[g][f]},_getElementTemplates:function(j,h,f){var i={};var l=h.get("@type");if(l&&l.attributes&&l.attributes.get(f)){var m=l.attributes.get(f);b.each(m.range,function(n){var o=this.getTemplate(n,f);if(o){var p=this.vie.types.get(n);i[p.id]=o}},this);if(!b.isEmpty(i)){return i}}var g=this;d("[typeof]",j).each(function(){var p=d(this);var n=p.attr("typeof");n=g.vie.namespaces.isUri(n)?n:g.vie.namespaces.uri(n);if(i[n]){return}var o=g.getElementTemplate(p);i[n]=o;i["<http://www.w3.org/2002/07/owl#Thing>"]=o});if(b.isEmpty(i)){var k=j.children(":first-child");if(k.length){i["<http://www.w3.org/2002/07/owl#Thing>"]=g.getElementTemplate(k)}}return i},getElementTemplate:function(g){var f=this;return function(h,k){var j=d(g).clone(false);if(j.attr("about")!==undefined){j.attr("about","")}j.find("[about]").attr("about","");var i=f.findPredicateElements(i,j,false).each(function(){var m=d(this);var l=f.getElementPredicate(m);if(h.has(l)&&h.get(l).isCollection){return true}f.writeElementValue(null,m,"")});k(j)}},_registerCollectionView:function(i,h,g){var f=this._getViewForElement(h,true);if(f){return f}f=new this.vie.view.Collection({owner:g,collection:i,model:i.model,el:h,templates:this._getElementTemplates(h,g,i.predicate),service:this});this.views.push(f);return f},_getElementType:function(f){var g;if(d(f).attr("typeof")!==this.options.attributeExistenceComparator){g=d(f).attr("typeof");if(g.indexOf("://")!==-1){return"<"+g+">"}else{return g}}return null},_generatebnodeId:function(){var f=this.options.bnodePrefix+":"+this.bnodes;this.bnodes++;return f},getElementSubject:function(i,j){var g=this;if(typeof document!=="undefined"){if(i===document){return document.baseURI}}var h;var f=null;d(i).closest(this.options.subjectSelector).each(function(){f=this;if(d(this).attr("about")!==g.options.attributeExistenceComparator){h=d(this).attr("about");return true}if(d(this).attr("src")!==g.options.attributeExistenceComparator){h=d(this).attr("src");return true}if(d(this).attr("typeof")!==g.options.attributeExistenceComparator){var k=d(this);if(k.data("vie-bnode")){h=k.data("vie-bnode");return true}h=g._generatebnodeId();k.data("vie-bnode",h);return true}if(d(this).get(0).nodeName==="HTML"){d("base",this).each(function(){h=d(this).attr("href")})}});if(!h){if(f===i){return g.getElementSubject(d(i).parent())}return undefined}if(typeof h==="object"){return h}if(h.indexOf("_:")===0){return h}if(h.indexOf("<")===0){return h}return"<"+h+">"},setElementSubject:function(g,f){if(d(f).attr("src")){return d(f).attr("src",g)}return d(f).attr("about",g)},getElementPredicate:function(g){var f;g=d(g);f=g.attr("property");if(!f){f=g.attr("rel")}return f},getElementBySubject:function(h,g){var f=this;return d(g).find(this.options.subjectSelector).add(d(g).filter(this.options.subjectSelector)).filter(function(){if(f.getElementSubject(d(this))!==h){return false}return true})},getElementByPredicate:function(g,i){var f=this;var h=this.getElementSubject(i);return d(i).find(this.options.predicateSelector).add(d(i).filter(this.options.predicateSelector)).filter(function(){var j=f.getElementPredicate(d(this));if(f.vie.namespaces.curie(j)!==f.vie.namespaces.curie(g)){return false}if(f.getElementSubject(this)!==h){return false}return true})},_readEntityPredicates:function(h,g,j){var f=this;var i={};this.findPredicateElements(h,g,true).each(function(){var l=d(this);var k=f.getElementPredicate(l);if(k===""){return}var m=f.readElementValue(k,l);if(m===null&&!j){return}i[k]=m});if(d(g).get(0).tagName!=="HTML"){d(g).parent("[rev]").each(function(){var k=d(this).attr("rev");if(!k){return}i[d(this).attr("rev")]=f.getElementSubject(this)})}return i},findSubjectElements:function(f){return d("[about]",f)},findPredicateElements:function(i,h,g){var f=this;return d(h).find(this.options.predicateSelector).add(d(h).filter(this.options.predicateSelector)).filter(function(){if(f.getElementSubject(this)!==i){return false}if(!g){if(!d(this).parents("[property]").length){return true}return false}return true})},parseElementValue:function(h,f){if(!f.attr("datatype")){return h}var g=this.vie.namespaces.uri(f.attr("datatype"));if(!this.datatypeReaders[g]){return h}return this.datatypeReaders[g](h)},generateElementValue:function(h,f){if(!f.attr("datatype")){return h}var g=this.vie.namespaces.uri(f.attr("datatype"));if(!this.datatypeWriters[g]){return h}return this.datatypeWriters[g](h)},readElementValue:function(g,i){var j=i.attr("content");if(j){return this.parseElementValue(j,i)}var l=i.attr("resource");if(l){return["<"+l+">"]}var h=i.attr("href");if(h&&i.attr("rel")===g){return["<"+h+">"]}if(i.attr("rel")){var k=[];var f=this;d(i).children(this.options.subjectSelector).each(function(){k.push(f.getElementSubject(this,true))});return k}return this.parseElementValue(i.html(),i)},writeElementValue:function(f,g,j){j=this.generateElementValue(j,g);if(b.isArray(j)&&j.length>0){j=j[0]}var h=g.attr("content");if(h){g.attr("content",j);return}var i=g.attr("resource");if(i){g.attr("resource",j)}g.html(j)},xmlns:function(g){var f;if(!g){if(typeof document==="undefined"){return{}}f=d(document)}else{f=d(g)}f=f.add(f.parents());var h={};f.each(function(k,n){if(n.attributes){for(k=0;k<n.attributes.length;k+=1){var j=n.attributes[k];if(/^xmlns(:(.+))?$/.test(j.nodeName)){var m=/^xmlns(:(.+))?$/.exec(j.nodeName)[2]||"";var l=j.nodeValue;if(m===""||l!==""){h[m]=j.nodeValue}}}}});return h}}})();(function(){c.prototype.StanbolService=function(f){var g={name:"stanbol",url:["http://dev.iks-project.eu/stanbolfull"],timeout:20000,namespaces:{semdeski:"http://www.semanticdesktop.org/ontologies/2007/01/19/nie#",semdeskf:"http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#",skos:"http://www.w3.org/2004/02/skos/core#",foaf:"http://xmlns.com/foaf/0.1/",opengis:"http://www.opengis.net/gml/",dbpedia:"http://dbpedia.org/ontology/",dbprop:"http://dbpedia.org/property/",owl:"http://www.w3.org/2002/07/owl#",geonames:"http://www.geonames.org/ontology#",enhancer:"http://fise.iks-project.eu/ontology/",entityhub:"http://www.iks-project.eu/ontology/rick/model/",entityhub2:"http://www.iks-project.eu/ontology/rick/query/",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dcterms:"http://purl.org/dc/terms/",schema:"http://schema.org/",geo:"http://www.w3.org/2003/01/geo/wgs84_pos#"},rules:[{left:["?subject a <http://fise.iks-project.eu/ontology/EntityAnnotation>","?subject enhancer:entity-type ?type","?subject enhancer:confidence ?confidence","?subject enhancer:entity-reference ?entity","?subject dcterms:relation ?relation","?relation a <http://fise.iks-project.eu/ontology/TextAnnotation>","?relation enhancer:selected-text ?selected-text","?relation enhancer:selection-context ?selection-context","?relation enhancer:start ?start","?relation enhancer:end ?end"],right:["?entity a ?type","?entity enhancer:hasTextAnnotation ?relation","?entity enhancer:hasEntityAnnotation ?subject"]}],enhancer:{chain:"default"},entityhub:{site:undefined}};this.options=d.extend(true,g,f?f:{});this.vie=null;this.name=this.options.name};c.prototype.StanbolService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.extend([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[]);this.connector=new this.vie.StanbolConnector(this.options);this.vie.types.addOrOverwrite("enhancer:EntityAnnotation",[]).inherit("owl:Thing");this.vie.types.addOrOverwrite("enhancer:TextAnnotation",[]).inherit("owl:Thing");this.vie.types.addOrOverwrite("enhancer:Enhancement",[]).inherit("owl:Thing")},analyze:function(m){var f=this;var i=m instanceof this.vie.Analyzable;if(!i){throw"Invalid Analyzable passed"}var j=m.options.element?m.options.element:d("body");var l=f._extractText(j);if(l.length>0){var k=function(n){b.defer(function(){var o=c.Util.rdf2Entities(f,n);m.resolve(o)})};var h=function(n){m.reject(n)};var g={chain:(m.options.chain)?m.options.chain:f.options.enhancer.chain};this.connector.analyze(l,k,h,g)}else{console.warn("No text found in element.");m.resolve([])}},find:function(l){var j=l instanceof this.vie.Findable;if(!j){throw"Invalid Findable passed"}var i=this;if(!l.options.term){console.info("StanbolConnector: No term to look for!");l.reject([])}var f=escape(l.options.term);var g=(typeof l.options.limit==="undefined")?20:l.options.limit;var h=(typeof l.options.offset==="undefined")?0:l.options.offset;var p=function(q){b.defer(function(){var r=c.Util.rdf2Entities(i,q);l.resolve(r)})};var m=function(q){l.reject(q)};l.options.site=(l.options.site)?l.options.site:i.options.entityhub.site;var n=this.vie;if(l.options.properties){var k=l.options.properties;l.options.ldPath=b(k).map(function(q){if(n.namespaces.isCurie(q)){return n.namespaces.uri(q)+";"}else{return q}}).join("")}if(l.options.field&&n.namespaces.isCurie(o)){var o=l.options.field;l.options.field=n.namespaces.uri(o)}this.connector.find(f,g,h,p,m,l.options)},load:function(l){var j=l instanceof this.vie.Loadable;if(!j){throw"Invalid Loadable passed"}var f=this;var g=l.options.entity;if(!g){console.warn("StanbolConnector: No entity to look for!");l.resolve([])}var k=function(m){b.defer(function(){var n=c.Util.rdf2Entities(f,m);l.resolve(n)})};var i=function(m){l.reject(m)};var h={site:(l.options.site)?l.options.site:f.options.entityhub.site,local:l.options.local};this.connector.load(g,k,i,h)},save:function(k){var j=k instanceof this.vie.Savable;if(!j){throw"Invalid Savable passed"}var f=this;var g=k.options.entity;if(!g){console.warn("StanbolConnector: No entity to save!");k.reject("StanbolConnector: No entity to save!")}var l=function(m){b.defer(function(){var n=c.Util.rdf2Entities(f,m);k.resolve(n)})};var i=function(m){k.reject(m)};var h={site:(k.options.site)?k.options.site:f.options.entityhub.site,local:k.options.local};this.connector.save(g,l,i,h)},_extractText:function(g){if(g.get(0)&&g.get(0).tagName&&(g.get(0).tagName=="TEXTAREA"||g.get(0).tagName=="INPUT"&&g.attr("type","text"))){return g.get(0).val()}else{var f=g.text().replace(/\s+/g," ").replace(/\0\b\n\r\f\t/g,"");return d.trim(f)}}};c.prototype.StanbolConnector=function(f){var g={url:["http://dev.iks-project.eu/stanbolfull"],timeout:20000,enhancer:{urlPostfix:"/enhancer",chain:"default"},entityhub:{site:undefined,urlPostfix:"/entityhub",local:false},sparql:{urlPostfix:"/sparql"},contenthub:{urlPostfix:"/contenthub",index:"contenthub"},ontonet:{urlPostfix:"/ontonet"},factstore:{urlPostfix:"/factstore"},rules:{urlPostfix:"/rules"},cmsadapter:{urlPostfix:"/cmsadapter"}};this.options=d.extend(true,g,f?f:{});this.options.url=(b.isArray(this.options.url))?this.options.url:[this.options.url];this._init();this.baseUrl=(b.isArray(f.url))?f.url:[f.url]};c.prototype.StanbolConnector.prototype={_init:function(){var f=this;d.ajaxSetup({converters:{"text application/rdf+json":function(g){return JSON.parse(g)}},timeout:f.options.timeout});return this},_iterate:function(f){if(!f){return}if(f.urlIndex>=this.options.url.length){f.error.call(this,"Could not connect to the given Stanbol endpoints! Please check for their setup!");return}var g=function(i,h){return function(){console.log("Stanbol connection error",arguments);h.urlIndex=h.urlIndex+1;i._iterate(h)}}(this,f);if(typeof exports!=="undefined"&&typeof process!=="undefined"){return f.methodNode.call(this,f.url.call(this,f.urlIndex,f.args.options),f.args,f.success,g)}return f.method.call(this,f.url.call(this,f.urlIndex,f.args.options),f.args,f.success,g)},analyze:function(j,i,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._analyze,methodNode:f._analyzeNode,url:function(k,n){var m=(n.chain)?n.chain:this.options.enhancer.chain;var l=this.options.url[k].replace(/\/$/,"");l+=this.options.enhancer.urlPostfix+"/chain/"+m.replace(/\/$/,"");return l},args:{text:j,format:g.format||"application/rdf+json",options:g},success:i,error:h,urlIndex:0})},_analyze:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:g.text,dataType:g.format,contentType:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},_analyzeNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:g.text,headers:{Accept:g.format,"Content-Type":"text/plain"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},load:function(i,j,h,g){var f=this;g=(g)?g:{};g.uri=i.replace(/^</,"").replace(/>$/,"");f._iterate({method:f._load,methodNode:f._loadNode,success:j,error:h,url:function(k,o){var m=(o.site)?o.site:this.options.entityhub.site;m=(m)?"/"+m:"s";var n=o.local;var l=this.options.url[k].replace(/\/$/,"")+this.options.entityhub.urlPostfix;if(n){l+="/entity?id="+escape(o.uri)}else{l+="/site"+m+"/entity?id="+escape(o.uri)}return l},args:{format:g.format||"application/rdf+json",options:g},urlIndex:0})},_load:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"GET",dataType:g.format,contentType:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},_loadNode:function(h,g,k,f){var j=require("request");var i=j({method:"GET",uri:h,body:g.text,headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},find:function(j,g,l,k,i,h){h=(h)?h:{};var f=this;if(!j||j===""){i("No term given!");return}l=(l)?l:0;g=(g)?g:10;f._iterate({method:f._find,methodNode:f._findNode,success:k,error:i,url:function(m,q){var o=(q.site)?q.site:this.options.entityhub.site;o=(o)?"/"+o:"s";var p=q.local;var n=this.options.url[m].replace(/\/$/,"")+this.options.entityhub.urlPostfix;if(p){n+="/sites/find"}else{n+="/site"+o+"/find"}return n},args:{term:j,offset:l,limit:g,format:h.format||"application/rdf+json",options:h},urlIndex:0})},_find:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:"name="+g.term+"&limit="+g.limit+"&offset="+g.offset,dataType:g.format,contentType:"application/x-www-form-urlencoded",accepts:{"application/rdf+json":"application/rdf+json"}})},_findNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:"name="+g.term+"&limit="+g.limit+"&offset="+g.offset,headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},lookup:function(i,j,h,g){g=(g)?g:{};var f=this;i=i.replace(/^</,"").replace(/>$/,"");g.uri=i;g.create=(g.create)?g.create:false;f._iterate({method:f._lookup,methodNode:f._lookupNode,success:j,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"")+this.options.entityhub.urlPostfix;l+="/lookup?id="+escape(m.uri)+"&create="+m.create;return l},args:{format:g.format||"application/rdf+json",options:g},urlIndex:0})},_lookup:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"GET",dataType:g.format,contentType:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},_lookupNode:function(h,g,k,f){var j=require("request");var i=j({method:"GET",uri:h,body:g.text,headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},referenced:function(j,h,g){g=(g)?g:{};var f=this;var i=function(o){if(!b.isArray(o)){o=JSON.parse(o)}var m=[];for(var n=0,k=o.length;n<k;n++){m.push(o[n].replace(/.+\/(.+?)\/?$/,"$1"))}return j(m)};f._iterate({method:f._referenced,methodNode:f._referencedNode,success:i,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"");l+=this.options.entityhub.urlPostfix+"/sites/referenced";return l},args:{options:g},urlIndex:0})},_referenced:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"GET",accepts:{"application/rdf+json":"application/rdf+json"}})},_referencedNode:function(h,g,k,f){var j=require("request");var i=j({method:"GET",uri:h,headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},sparql:function(i,j,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._sparql,methodNode:f._sparqlNode,success:j,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"");l+=this.options.sparql.urlPostfix.replace(/\/$/,"");return l},args:{query:i,options:g},urlIndex:0})},_sparql:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:"query="+g.query,contentType:"application/x-www-form-urlencoded"})},_sparqlNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:JSON.stringify({query:g.query}),headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},ldpath:function(j,i,l,h,g){g=(g)?g:{};var f=this;i=(b.isArray(i))?i:[i];var k="";for(var m=0;m<i.length;m++){k+="&context="+i[m]}f._iterate({method:f._ldpath,methodNode:f._ldpathNode,success:l,error:h,url:function(n,r){var p=(r.site)?r.site:this.options.entityhub.site;p=(p)?"/"+p:"s";var q=r.local;var o=this.options.url[n].replace(/\/$/,"")+this.options.entityhub.urlPostfix;if(!q){o+="/site"+p}o+="/ldpath";return o},args:{ldpath:j,context:k,format:g.format||"application/rdf+json",options:g},urlIndex:0})},_ldpath:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:"ldpath="+g.ldpath+g.context,contentType:"application/x-www-form-urlencoded",dataType:g.format,accepts:{"application/rdf+json":"application/rdf+json"}})},_ldpathNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:"ldpath="+g.ldpath+g.context,headers:{Accept:g.format}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},uploadContent:function(i,j,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._uploadContent,methodNode:f._uploadContentNode,success:j,error:h,url:function(k,n){var m=this.options.url[k].replace(/\/$/,"");m+=this.options.contenthub.urlPostfix.replace(/\/$/,"");var l=(n.index)?n.index:this.options.contenthub.index;m+="/"+l.replace(/\/$/,"");m+="/store";return m},args:{content:i,options:g},urlIndex:0})},_uploadContent:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:g.content,contentType:"text/plain"})},_uploadContentNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:g.content,headers:{Accept:"application/rdf+xml","Content-Type":"text/plain"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},createFactSchema:function(i,j,k,h,g){g=(g)?g:{};var f=this;g.url=i;f._iterate({method:f._createFactSchema,methodNode:f._createFactSchemaNode,success:k,error:h,url:function(l,n){var m=this.options.url[l].replace(/\/$/,"");m+=this.options.factstore.urlPostfix.replace(/\/$/,"");m+="/facts/"+escape(n.url);return m},args:{url:i,schema:j,options:g},urlIndex:0})},_createFactSchema:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"PUT",data:g.schema,contentType:"application/json",dataType:"application/json"})},_createFactSchemaNode:function(h,g,k,f){var j=require("request");var i=j({method:"PUT",uri:h,body:g.schema,headers:{Accept:"application/json","Content-Type":"application/json"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},createFact:function(i,j,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._createFact,methodNode:f._createFactNode,success:j,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"");l+=this.options.factstore.urlPostfix.replace(/\/$/,"");l+="/facts";return l},args:{fact:i,options:g},urlIndex:0})},_createFact:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:g.fact,contentType:"application/json",dataType:"application/json"})},_createFactNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:g.fact,headers:{Accept:"application/json","Content-Type":"application/json"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()},queryFact:function(i,j,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._queryFact,methodNode:f._queryFactNode,success:j,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"");l+=this.options.factstore.urlPostfix.replace(/\/$/,"");l+="/query";return l},args:{query:i,options:g},urlIndex:0})},_queryFact:function(h,g,i,f){d.ajax({success:i,error:f,url:h,type:"POST",data:g.query,contentType:"application/json",dataType:"application/json"})},_queryFactNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:g.query,headers:{Accept:"application/json","Content-Type":"application/json"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()}}})();(function(){c.prototype.ZemantaService=function(f){var g={name:"zemanta",url:["http://api.zemanta.com/services/rest/0.0/"],timeout:20000,namespaces:{zemanta:"http://s.zemanta.com/ns#"},rules:[{left:["?subject a zemanta:Recognition","?subject zemanta:object ?object","?object owl:sameAs ?entity"],right:["?entity zemanta:hasEntityAnnotation ?subject"]}],api_key:undefined};this.options=d.extend(true,g,f?f:{});this.vie=null;this.name=this.options.name;d.ajaxSetup({converters:{"text application/rdf+json":function(h){return JSON.parse(h)}},timeout:this.options.timeout})};c.prototype.ZemantaService.prototype={init:function(){for(var f in this.options.namespaces){var g=this.options.namespaces[f];this.vie.namespaces.add(f,g)}this.rules=d.extend([],c.Util.transformationRules(this));this.rules=d.merge(this.rules,(this.options.rules)?this.options.rules:[]);this.connector=new this.vie.ZemantaConnector(this.options);this.vie.types.addOrOverwrite("zemanta:Recognition",[]).inherit("owl:Thing")},analyze:function(m){var f=this;var i=m instanceof this.vie.Analyzable;if(!i){throw"Invalid Analyzable passed"}var j=m.options.element?m.options.element:d("body");var l=f._extractText(j);if(l.length>0){var k=function(n){b.defer(function(){var o=c.Util.rdf2Entities(f,n);m.resolve(o)})};var h=function(n){m.reject(n)};var g={};this.connector.analyze(l,k,h,g)}else{console.warn("No text found in element.");m.resolve([])}},_extractText:function(f){return d(f).wrap("<div>").parent().html()}};c.prototype.ZemantaConnector=function(f){var g={url:["http://api.zemanta.com/services/rest/0.0/"],timeout:20000,api_key:undefined};this.options=d.extend(true,g,f?f:{});this.options.url=(b.isArray(this.options.url))?this.options.url:[this.options.url];this._init();this.baseUrl=(b.isArray(f.url))?f.url:[f.url]};c.prototype.ZemantaConnector.prototype={_init:function(){var f=this;d.ajaxSetup({converters:{"text application/rdf+json":function(g){return JSON.parse(g)}},timeout:f.options.timeout});return this},_iterate:function(f){if(!f){return}if(f.urlIndex>=this.options.url.length){f.error.call(this,"Could not connect to the given Zemanta endpoints! Please check for their setup!");return}var g=function(i,h){return function(){console.log("Zemanta connection error",arguments);h.urlIndex=h.urlIndex+1;i._iterate(h)}}(this,f);if(typeof exports!=="undefined"&&typeof process!=="undefined"){return f.methodNode.call(this,f.url.call(this,f.urlIndex,f.args.options),f.args,f.success,g)}return f.method.call(this,f.url.call(this,f.urlIndex,f.args.options),f.args,f.success,g)},analyze:function(j,i,h,g){g=(g)?g:{};var f=this;f._iterate({method:f._analyze,methodNode:f._analyzeNode,success:i,error:h,url:function(k,m){var l=this.options.url[k].replace(/\/$/,"");return l},args:{text:j,format:g.format||"rdfxml",options:g},urlIndex:0})},_analyze:function(h,g,i,f){d.ajax({success:function(k,j,m){var l=m.responseText.replace(/<z:signature>.*?<\/z:signature>/,"");i(l)},error:f,url:h,type:"POST",dataType:"xml",data:{method:"zemanta.suggest",text:g.text,format:g.format,api_key:this.options.api_key,return_rdf_links:g.options.return_rdf_links},contentType:"text/plain",accepts:{"application/rdf+json":"application/rdf+json"}})},_analyzeNode:function(h,g,k,f){var j=require("request");var i=j({method:"POST",uri:h,body:g.text,headers:{Accept:g.format,"Content-Type":"text/plain"}},function(n,m,l){try{k({results:JSON.parse(l)})}catch(o){f(o)}});i.end()}}})();if(!c.prototype.view){c.prototype.view={}}c.prototype.view.Collection=e.View.extend({initialize:function(){this.templates=this.options.templates;this.service=this.options.service;if(!this.service){throw"No RDFa service provided to the Collection View"}this.owner=this.options.owner;this.definition=this.options.definition;this.entityViews={};b.bindAll(this,"addItem","removeItem","refreshItems");this.collection.on("add",this.addItem);this.collection.on("remove",this.removeItem);this.collection.on("reset",this.refreshItems);this.collection.each(function(f){this.registerItem(f,this.collection)},this)},canAdd:function(f){if(b.isEmpty(this.templates)){return false}if(f&&!this.templates[f]){return false}return this.collection.canAdd(f)},addItem:function(g,j){if(j!==this.collection){return}var h=g.get("@type");var i;if(b.isArray(h)){b.each(h,function(k){if(this.canAdd(k.id)){i=k.id}},this)}else{if(this.canAdd(h.id)){i=h.id}}if(!i){return}var f=this;this.templates[i](g,function(l){var k=f.service._registerEntityView(g,l,true);var m=k.render().$el;if(g.id){f.service.setElementSubject(g.getSubjectUri(),m)}var o=j.indexOf(g);if(o===0){f.$el.prepend(m)}else{var p=j.at(o-1);var n=f.entityViews[p.cid];if(n){n.$el.after(m)}else{f.$el.append(m)}}f.findReverseRelations(g,m);f.trigger("add",k);f.entityViews[g.cid]=k;m.show()},this)},findReverseRelations:function(g,h){var f=this.service;h.parent("[rev]").each(function(){var i=d(this).attr("rev");var j={};j[i]=new f.vie.Collection([],{vie:f.vie,predicate:i});var k=f.vie.entities.get(f.getElementSubject(this));if(k){j[i].addOrUpdate(k)}g.set(j)})},registerItem:function(g,i){var h=this.service.getElementBySubject(g.id,this.el);if(!h){return}var f=this.service._registerEntityView(g,h);this.entityViews[g.cid]=f},removeItem:function(f){if(!this.entityViews[f.cid]){return}this.trigger("remove",this.entityViews[f.cid]);d(this.entityViews[f.cid].el).remove();delete (this.entityViews[f.cid])},refreshItems:function(f){b.each(this.entityViews,function(g,h){d(g.el).remove()});this.entityViews={};f.forEach(function(g){this.addItem(g,f)},this)}});if(!c.prototype.view){c.prototype.view={}}c.prototype.view.Entity=e.View.extend({initialize:function(f){this.service=f.service?f.service:"rdfa";this.vie=f.vie;b.bindAll(this,"render","renderAbout");this.model.on("change",this.render);this.model.on("change:@subject",this.renderAbout)},render:function(){this.vie.save({element:this.el,entity:this.model}).to(this.service).execute();return this},renderAbout:function(){this.vie.service(this.service).setElementSubject(this.model.getSubjectUri(),this.el)}});var a=this;(function(f){if(a.XDomainRequest){f.ajaxTransport(function(h){if(h.crossDomain&&h.async){if(h.timeout){h.xdrTimeout=h.timeout;delete h.timeout}var g;return{send:function(j,i){function l(m,p,o,n){g.onload=g.onerror=g.ontimeout=f.noop;g=undefined;i(m,p,o,n)}g=new XDomainRequest();if(h.dataType){var k="header_Accept="+encodeURIComponent(h.dataType);h.url=h.url+(h.url.indexOf("?")===-1?"?":"&")+k}g.open(h.type,h.url);g.onload=function(n,m){l(200,"OK",{text:g.responseText},"Content-Type: "+g.contentType)};g.onerror=function(m){console.error(JSON.stringify(m));l(404,"Not Found")};if(h.xdrTimeout){g.ontimeout=function(){l(0,"timeout")};g.timeout=h.xdrTimeout}g.send((h.hasContent&&h.data)||null)},abort:function(){if(g){g.onerror=f.noop();g.abort()}}}}})}})(d)})();
(function(c){var d={},a=/^(([a-z][\-a-z0-9+\.]*):)?(\/\/([^\/?#]+))?([^?#]*)?(\?([^#]*))?(#(.*))?$/i,g,b=function(j){var h=j.match(a);if(h===null){throw"Malformed URI: "+j}return{scheme:h[1]?h[2].toLowerCase():undefined,authority:h[3]?h[4]:undefined,path:h[5]||"",query:h[6]?h[7]:undefined,fragment:h[8]?h[9]:undefined}},f=function(j){var k="",h=[];if(/\./.test(j)){while(j!==undefined&&j!==""){if(j==="."||j===".."){j=""}else{if(/^\.\.\//.test(j)){j=j.substring(3)}else{if(/^\.\//.test(j)){j=j.substring(2)}else{if(/^\/\.(\/|$)/.test(j)){j="/"+j.substring(3)}else{if(/^\/\.\.(\/|$)/.test(j)){j="/"+j.substring(4);k=k.replace(/\/?[^\/]+$/,"")}else{h=j.match(/^(\/?[^\/]*)(\/.*)?$/);j=h[2];k=k+h[1]}}}}}}return k}else{return j}},e=function(h,j){if(h.authority!==""&&(h.path===undefined||h.path==="")){return"/"+j}else{return h.path.replace(/[^\/]+$/,"")+j}};c.uri=function(k,j){var h;k=k||"";if(d[k]){return d[k]}j=j||c.uri.base();if(typeof j==="string"){j=c.uri.absolute(j)}h=new c.uri.fn.init(k,j);if(d[h]){return d[h]}else{d[h]=h;return h}};c.uri.fn=c.uri.prototype={scheme:undefined,authority:undefined,path:undefined,query:undefined,fragment:undefined,init:function(k,j){var h={};j=j||{};c.extend(this,b(k));if(this.scheme===undefined){this.scheme=j.scheme;if(this.authority!==undefined){this.path=f(this.path)}else{this.authority=j.authority;if(this.path===""){this.path=j.path;if(this.query===undefined){this.query=j.query}}else{if(!/^\//.test(this.path)){this.path=e(j,this.path)}this.path=f(this.path)}}}if(this.scheme===undefined){throw"Malformed URI: URI is not an absolute URI and no base supplied: "+k}return this},resolve:function(h){return c.uri(h,this)},relative:function(q){var n,o,m=0,k,l=[],h="";if(typeof q==="string"){q=c.uri(q,{})}if(q.scheme!==this.scheme||q.authority!==this.authority){return q.toString()}if(q.path!==this.path){n=q.path.split("/");o=this.path.split("/");if(n[1]!==o[1]){h=q.path}else{while(n[m]===o[m]){m+=1}k=m;for(;m<o.length-1;m+=1){l.push("..")}for(;k<n.length;k+=1){l.push(n[k])}h=l.join("/")}h=q.query===undefined?h:h+"?"+q.query;h=q.fragment===undefined?h:h+"#"+q.fragment;return h}if(q.query!==undefined&&q.query!==this.query){return"?"+q.query+(q.fragment===undefined?"":"#"+q.fragment)}if(q.fragment!==undefined&&q.fragment!==this.fragment){return"#"+q.fragment}return""},toString:function(){var h="";if(this._string){return this._string}else{h=this.scheme===undefined?h:(h+this.scheme+":");h=this.authority===undefined?h:(h+"//"+this.authority);h=h+this.path;h=this.query===undefined?h:(h+"?"+this.query);h=this.fragment===undefined?h:(h+"#"+this.fragment);this._string=h;return h}}};c.uri.fn.init.prototype=c.uri.fn;c.uri.absolute=function(h){return c.uri(h,{})};c.uri.resolve=function(j,h){return c.uri(j,h)};c.uri.relative=function(j,h){return c.uri(h,{}).relative(j)};c.uri.base=function(){return c(document).base()};c.fn.base=function(){var h=c(this).parents().andSelf().find("base").attr("href"),j=c(this)[0].ownerDocument||document,k=c.uri.absolute(j.location===null?document.location.href:j.location.href);return h===undefined?k:c.uri(h,k)}})(jQuery);(function(e){var a="http://www.w3.org/XML/1998/namespace",g="http://www.w3.org/2000/xmlns/",c=/\sxmlns(?::([^ =]+))?\s*=\s*(?:"([^"]*)"|'([^']*)')/g,f="[-A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u10000-\uEFFFF.0-9\u00B7\u0300-\u036F\u203F-\u2040]",b="[\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u0131\u0134-\u013E\u0141-\u0148\u014A-\u017E\u0180-\u01C3\u01CD-\u01F0\u01F4-\u01F5\u01FA-\u0217\u0250-\u02A8\u02BB-\u02C1\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0490-\u04C4\u04C7-\u04C8\u04CB-\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8-\u04F9\u0531-\u0556\u0559\u0561-\u0586\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0641-\u064A\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5\u06E5-\u06E6\u0905-\u0939\u093D\u0958-\u0961\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AE0\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B36-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0-\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60-\u0D61\u0E01-\u0E2E\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EAE\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0F40-\u0F47\u0F49-\u0F69\u10A0-\u10C5\u10D0-\u10F6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110B-\u110C\u110E-\u1112\u113C\u113E\u1140\u114C\u114E\u1150\u1154-\u1155\u1159\u115F-\u1161\u1163\u1165\u1167\u1169\u116D-\u116E\u1172-\u1173\u1175\u119E\u11A8\u11AB\u11AE-\u11AF\u11B7-\u11B8\u11BA\u11BC-\u11C2\u11EB\u11F0\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u212E\u2180-\u2182\u3041-\u3094\u30A1-\u30FA\u3105-\u312C\uAC00-\uD7A3\u4E00-\u9FA5\u3007\u3021-\u3029_]",d=new RegExp("^"+b+f+"*$");e.fn.xmlns=function(m,j,n){var k=this.eq(0),r=k.data("xmlns"),o=k[0],s,h,l,q=m?"xmlns:"+m:"xmlns",t,w,u=false;if(j===undefined){if(m===undefined){if(!r){r={};if(o.attributes&&o.attributes.getNamedItemNS){for(l=0;l<o.attributes.length;l+=1){s=o.attributes[l];if(/^xmlns(:(.+))?$/.test(s.nodeName)){m=/^xmlns(:(.+))?$/.exec(s.nodeName)[2]||"";t=s.nodeValue;if(m===""||(t!==""&&t!==a&&t!==g&&d.test(m)&&m!=="xml"&&m!=="xmlns")){r[m]=e.uri(s.nodeValue);u=true}}}}else{w=/<[^>]+>/.exec(o.outerHTML);s=c.exec(w);while(s!==null){m=s[1]||"";t=s[2]||s[3];if(m===""||(t!==""&&t!==a&&t!==g&&d.test(m)&&m!=="xml"&&m!=="xmlns")){r[m]=e.uri(s[2]||s[3]);u=true}s=c.exec(w)}c.lastIndex=0}n=n||(o.parentNode.nodeType===1?k.parent().xmlns():{});r=u?e.extend({},n,r):n;k.data("xmlns",r)}return r}else{if(typeof m==="object"){for(h in m){if(typeof m[h]==="string"&&d.test(h)){this.xmlns(h,m[h])}}this.find("*").andSelf().removeData("xmlns");return this}else{if(!r){r=k.xmlns()}return r[m]}}}else{this.find("*").andSelf().removeData("xmlns");return this.attr(q,j)}};e.fn.removeXmlns=function(k){var h,l,j;if(typeof k==="object"){if(k.length===undefined){for(l in k){if(typeof k[l]==="string"){this.removeXmlns(l)}}}else{for(j=0;j<k.length;j+=1){this.removeXmlns(k[j])}}}else{h=k?"xmlns:"+k:"xmlns";this.removeAttr(h)}this.find("*").andSelf().removeData("xmlns");return this};e.fn.qname=function(j){var h,l,k;if(j===undefined){if(this[0].outerHTML===undefined){j=this[0].nodeName.toLowerCase()}else{j=/<([^ >]+)/.exec(this[0].outerHTML)[1].toLowerCase()}}if(j==="?xml:namespace"){throw"XMLinHTML: Unable to get the prefix to resolve the name of this element"}h=/^(([^:]+):)?([^:]+)$/.exec(j);l=h[2]||"";k=this.xmlns(l);if(k===undefined&&l!==""){throw"MalformedQName: The prefix "+l+" is not declared"}return{namespace:k,localPart:h[3],prefix:l,name:j}}})(jQuery);(function(b){var a=function(c){return c.replace(/[ \t\n\r]+/," ").replace(/^ +/,"").replace(/ +$/,"")};b.typedValue=function(d,c){return b.typedValue.fn.init(d,c)};b.typedValue.fn=b.typedValue.prototype={representation:undefined,value:undefined,datatype:undefined,init:function(e,c){var f=b.typedValue.types[c];if(b.typedValue.valid(e,c)){this.representation=e;this.datatype=c;this.value=f===undefined?a(e):f.value(f.strip?a(e):e);return this}else{throw {name:"InvalidValue",message:e+" is not a valid "+c+" value"}}}};b.typedValue.fn.init.prototype=b.typedValue.fn;b.typedValue.types={};b.typedValue.types["http://www.w3.org/2001/XMLSchema#string"]={regex:/^.*$/,strip:false,value:function(c){return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#token"]={regex:/^.*$/,strip:true,value:function(c){return a(c)}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#NCName"]={regex:/^[a-z_][-\.a-z0-9]+$/i,strip:true,value:function(c){return a(c)}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#boolean"]={regex:/^(?:true|false|1|0)$/,strip:true,value:function(c){return c==="true"||c==="1"}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#decimal"]={regex:/^[\-\+]?(?:[0-9]+\.[0-9]*|\.[0-9]+|[0-9]+)$/,strip:true,value:function(c){c=c.replace(/^0+/,"").replace(/0+$/,"");if(c===""){c="0.0"}if(c.substring(0,1)==="."){c="0"+c}if(/\.$/.test(c)){c=c+"0"}else{if(!/\./.test(c)){c=c+".0"}}return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#integer"]={regex:/^[\-\+]?[0-9]+$/,strip:true,value:function(c){return parseInt(c,10)}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#int"]={regex:/^[\-\+]?[0-9]+$/,strip:true,value:function(c){return parseInt(c,10)}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#float"]={regex:/^(?:[\-\+]?(?:[0-9]+\.[0-9]*|\.[0-9]+|[0-9]+)(?:[eE][\-\+]?[0-9]+)?|[\-\+]?INF|NaN)$/,strip:true,value:function(c){if(c==="-INF"){return -1/0}else{if(c==="INF"||c==="+INF"){return 1/0}else{return parseFloat(c)}}}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#double"]={regex:b.typedValue.types["http://www.w3.org/2001/XMLSchema#float"].regex,strip:true,value:b.typedValue.types["http://www.w3.org/2001/XMLSchema#float"].value};b.typedValue.types["http://www.w3.org/2001/XMLSchema#duration"]={regex:/^([\-\+])?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+(?:\.[0-9]+)?)?S)?)$/,validate:function(d){var c=this.regex.exec(d);return c[2]||c[3]||c[4]||c[5]||c[6]||c[7]},strip:true,value:function(c){return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#yearMonthDuration"]={regex:/^([\-\+])?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/,validate:function(d){var c=this.regex.exec(d);return c[2]||c[3]},strip:true,value:function(e){var d=this.regex.exec(e),f=d[2]||0,c=d[3]||0;c+=f*12;return d[1]==="-"?-1*c:c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#dateTime"]={regex:/^(-?[0-9]{4,})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):(([0-9]{2})(\.([0-9]+))?)((?:[\-\+]([0-9]{2}):([0-9]{2}))|Z)?$/,validate:function(d){var c=this.regex.exec(d),g=parseInt(c[1],10),j=c[10]===undefined||c[10]==="Z"?"+0000":c[10].replace(/:/,""),f;if(g===0||parseInt(j,10)<-1400||parseInt(j,10)>1400){return false}try{g=g<100?Math.abs(g)+1000:g;month=parseInt(c[2],10);day=parseInt(c[3],10);if(day>31){return false}else{if(day>30&&!(month===1||month===3||month===5||month===7||month===8||month===10||month===12)){return false}else{if(month===2){if(day>29){return false}else{if(day===29&&(g%4!==0||(g%100===0&&g%400!==0))){return false}}}}}f=""+g+"/"+c[2]+"/"+c[3]+" "+c[4]+":"+c[5]+":"+c[7]+" "+j;f=new Date(f);return true}catch(h){return false}},strip:true,value:function(c){return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#date"]={regex:/^(-?[0-9]{4,})-([0-9]{2})-([0-9]{2})((?:[\-\+]([0-9]{2}):([0-9]{2}))|Z)?$/,validate:function(e){var c=this.regex.exec(e),f=parseInt(c[1],10),g=parseInt(c[2],10),d=parseInt(c[3],10),h=c[10]===undefined||c[10]==="Z"?"+0000":c[10].replace(/:/,"");if(f===0||g>12||d>31||parseInt(h,10)<-1400||parseInt(h,10)>1400){return false}else{return true}},strip:true,value:function(c){return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#gYear"]={regex:/^-?([0-9]{4,})$/,validate:function(c){var d=parseInt(c,10);return d!==0},strip:true,value:function(c){return parseInt(c,10)}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#gMonthDay"]={regex:/^--([0-9]{2})-([0-9]{2})((?:[\-\+]([0-9]{2}):([0-9]{2}))|Z)?$/,validate:function(e){var c=this.regex.exec(e),f=parseInt(c[1],10),d=parseInt(c[2],10),g=c[3]===undefined||c[3]==="Z"?"+0000":c[3].replace(/:/,"");if(f>12||d>31||parseInt(g,10)<-1400||parseInt(g,10)>1400){return false}else{if(f===2&&d>29){return false}else{if((f===4||f===6||f===9||f===11)&&d>30){return false}else{return true}}}},strip:true,value:function(c){return c}};b.typedValue.types["http://www.w3.org/2001/XMLSchema#anyURI"]={regex:/^.*$/,strip:true,value:function(c,d){var e=b.extend({},b.typedValue.defaults,d);return b.uri.resolve(c,e.base)}};b.typedValue.defaults={base:b.uri.base(),namespaces:{}};b.typedValue.valid=function(e,c){var f=b.typedValue.types[c];if(f===undefined){return true}else{e=f.strip?a(e):e;if(f.regex.test(e)){return f.validate===undefined?true:f.validate(e)}else{return false}}}})(jQuery);(function(a){a.curie=function(f,c){var g=a.extend({},a.curie.defaults,c||{}),b=/^(([^:]*):)?(.+)$/.exec(f),h=b[2],d=b[3],e=g.namespaces[h];if(/^:.+/.test(f)){if(g.reservedNamespace===undefined||g.reservedNamespace===null){throw"Malformed CURIE: No prefix and no default namespace for unprefixed CURIE "+f}else{e=g.reservedNamespace}}else{if(h){if(e===undefined){throw"Malformed CURIE: No namespace binding for "+h+" in CURIE "+f}}else{if(g.charcase==="lower"){f=f.toLowerCase()}else{if(g.charcase==="upper"){f=f.toUpperCase()}}if(g.reserved.length&&a.inArray(f,g.reserved)>=0){e=g.reservedNamespace;d=f}else{if(g.defaultNamespace===undefined||g.defaultNamespace===null){throw"Malformed CURIE: No prefix and no default namespace for unprefixed CURIE "+f}else{e=g.defaultNamespace}}}}return a.uri(e+d)};a.curie.defaults={namespaces:{},reserved:[],reservedNamespace:undefined,defaultNamespace:undefined,charcase:"preserve"};a.safeCurie=function(d,c){var b=/^\[([^\]]+)\]$/.exec(d);return b?a.curie(b[1],c):a.uri(d)};a.createCurie=function(f,b){var e=a.extend({},a.curie.defaults,b||{}),d=e.namespaces,c;f=a.uri(f).toString();if(e.reservedNamespace!==undefined&&f.substring(0,e.reservedNamespace.toString().length)===e.reservedNamespace.toString()){c=f.substring(e.reservedNamespace.toString().length);if(a.inArray(c,e.reserved)===-1){c=":"+c}}else{a.each(d,function(h,g){if(f.substring(0,g.toString().length)===g.toString()){c=h+":"+f.substring(g.toString().length);return null}})}if(c===undefined){throw"No Namespace Binding: There's no appropriate namespace binding for generating a CURIE from "+f}else{return c}};a.fn.curie=function(c,b){var d=a.extend({},a.fn.curie.defaults,{namespaces:this.xmlns()},b||{});return a.curie(c,d)};a.fn.safeCurie=function(d,b){var c=a.extend({},a.fn.curie.defaults,{namespaces:this.xmlns()},b||{});return a.safeCurie(d,c)};a.fn.createCurie=function(d,b){var c=a.extend({},a.fn.curie.defaults,{namespaces:this.xmlns()},b||{});return a.createCurie(d,c)};a.fn.curie.defaults={reserved:["alternate","appendix","bookmark","cite","chapter","contents","copyright","first","glossary","help","icon","index","last","license","meta","next","p3pv1","prev","role","section","stylesheet","subsection","start","top","up"],reservedNamespace:"http://www.w3.org/1999/xhtml/vocab#",defaultNamespace:undefined,charcase:"lower"}})(jQuery);(function(E){var f={},c={},t={},D={},r={},h="http://www.w3.org/2001/XMLSchema#",w="http://www.w3.org/1999/02/22-rdf-syntax-ns#",u="http://www.w3.org/2000/01/rdf-schema#",z=/^<(([^>]|\\>)*)>$/,O=/^("""((\\"|[^"])*)"""|"((\\"|[^"])*)")(@([a-z]+(-[a-z0-9]+)*)|\^\^(.+))?$/,g=/(("""((\\"|[^"])*)""")|("(\\"|[^"]|)*")|(<(\\>|[^>])*>)|\S)+/g,x=databankSeed=new Date().getTime()%1000,j=function(){x+=1;return"b"+x.toString(16)},H=function(){databankSeed+=1;return"data"+databankSeed.toString(16)},I={},N={},k=function(R,S){if(typeof R==="string"){try{return E.rdf.resource(R,S)}catch(U){try{return E.rdf.blank(R,S)}catch(T){throw"Bad Triple: Subject "+R+" is not a resource: "+T}}}else{return R}},M=function(S,R){if(S==="a"){return E.rdf.type}else{if(typeof S==="string"){try{return E.rdf.resource(S,R)}catch(T){throw"Bad Triple: Property "+S+" is not a resource: "+T}}else{return S}}},J=function(R,T){if(typeof R==="string"){try{return E.rdf.resource(R,T)}catch(V){try{return E.rdf.blank(R,T)}catch(U){try{return E.rdf.literal(R,T)}catch(S){throw"Bad Triple: Object "+R+" is not a resource or a literal "+S}}}}else{return R}},a=function(U,S,T){var R;if(typeof S==="string"){R=S.substring(1);if(T[R]&&T[R]!==U){return null}else{T[R]=U;return T}}else{if(S===U){return T}else{return null}}},P=function(R,S){if(R.union===undefined){if(S.subject.type!==undefined){if(R.subjectIndex[S.subject]===undefined){return[]}return E.map(R.subjectIndex[S.subject],function(T){var U=S.exec(T);return U===null?null:{bindings:U,triples:[T]}})}else{if(S.object.type==="uri"||S.object.type==="bnode"){if(R.objectIndex[S.object]===undefined){return[]}return E.map(R.objectIndex[S.object],function(T){var U=S.exec(T);return U===null?null:{bindings:U,triples:[T]}})}else{if(S.property.type!==undefined){if(R.propertyIndex[S.property]===undefined){return[]}return E.map(R.propertyIndex[S.property],function(T){var U=S.exec(T);return U===null?null:{bindings:U,triples:[T]}})}}}}return E.map(R.triples(),function(T){var U=S.exec(T);return U===null?null:{bindings:U,triples:[T]}})},q=function(R,T,S){return E.map(R,function(W,U){var V=E.map(T,function(Z){var Y,X,aa=true;for(Y in Z.bindings){X=Z.bindings[Y];if(!(W.bindings[Y]===undefined||W.bindings[Y]===X)){aa=false;break}}return aa?Z:null});if(V.length>0){return E.map(V,function(X){return{bindings:E.extend({},W.bindings,X.bindings),triples:b(W.triples.concat(X.triples))}})}else{return S?W:null}})},Q=function(R,T){var S,U,V;if(T.filterExp!==undefined&&!E.isFunction(T.filterExp)){if(R.union===undefined){S=typeof T.filterExp.subject==="string"?"":T.filterExp.subject;U=typeof T.filterExp.property==="string"?"":T.filterExp.property;V=typeof T.filterExp.object==="string"?"":T.filterExp.object;if(R.queries[S]===undefined){R.queries[S]={}}if(R.queries[S][U]===undefined){R.queries[S][U]={}}if(R.queries[S][U][V]===undefined){R.queries[S][U][V]=[]}R.queries[S][U][V].push(T)}else{E.each(R.union,function(X,W){Q(W,T)})}}},A=function(R){R.length=0;R.matches=[];E.each(R.children,function(S,T){A(T)});E.each(R.partOf,function(S,T){A(T)})},F=function(S,R){if(R.length>0){E.each(S.children,function(T,U){G(U,R)});E.each(S.partOf,function(T,U){F(U,R)});E.each(R,function(U,T){S.matches.push(T);Array.prototype.push.call(S,T.bindings)})}},n=function(aa,ad){var Y,S,ae,X,W,V,ac,R=ad.length,U,Z={},T={},af={},ab=[];for(Y=0;Y<aa.length;Y+=1){S=aa[Y].bindings;ae=aa[Y].triples;T=af;for(X=0;X<R;X+=1){V=ad[X];ac=S[V];if(X===R-1){if(T[ac]===undefined){Z={bindings:{},triples:ae};for(W=0;W<R;W+=1){Z.bindings[ad[W]]=S[ad[W]]}T[ac]=Z;ab.push(Z)}else{Z=T[ac];Z.triples=Z.triples.concat(ae)}}else{if(T[ac]===undefined){T[ac]={}}T=T[ac]}}}return ab},K=function(X,R){var V,S,U,W={},T=[];for(V=0;V<X.length;V+=1){S=X[V];if(W[S.bindings[R]]===undefined){U={bindings:{node:S.bindings[R]},triples:S.triples};T.push(U);W[S.bindings[R]]=U}else{U=W[S.bindings[R]];U.triples=U.triples.concat(S.triples)}}return T},G=function(T,S){var R;if(T.union===undefined){if(T.top||T.parent.top){R=T.alphaMemory}else{S=S||T.parent.matches;if(E.isFunction(T.filterExp)){R=E.map(S,function(U,V){return T.filterExp.call(U.bindings,V,U.bindings,U.triples)?U:null})}else{if(T.filterExp!==undefined){R=q(S,T.alphaMemory,T.filterExp.optional)}else{R=S}}}}else{R=E.map(T.union,function(U){return U.matches})}if(T.selections!==undefined){R=n(R,T.selections)}else{if(T.navigate!==undefined){R=K(R,T.navigate)}}F(T,R)},o=function(T,S){var R;if(T.filterExp.optional){A(T);G(T)}else{if(T.top||T.parent.top){R=[S]}else{R=q(T.parent.matches,[S],false)}F(T,R)}},L=function(S,T){var R,U=S.filterExp.exec(T);if(U!==null){R={triples:[T],bindings:U};S.alphaMemory.push(R);o(S,R)}},d=function(R,S){R.alphaMemory.splice(E.inArray(S,R.alphaMemory),1);A(R);G(R)},C=function(R,S){E.each(R,function(T,U){L(U,S)})},m=function(R,S){E.each(R,function(T,U){d(U,S)})},e=function(R,V){var S=V.subject,T=V.property,U=V.object;if(R.union===undefined){if(R.queries[S]!==undefined){if(R.queries[S][T]!==undefined){if(R.queries[S][T][U]!==undefined){C(R.queries[S][T][U],V)}if(R.queries[S][T][""]!==undefined){C(R.queries[S][T][""],V)}}if(R.queries[S][""]!==undefined){if(R.queries[S][""][U]!==undefined){C(R.queries[S][""][U],V)}if(R.queries[S][""][""]!==undefined){C(R.queries[S][""][""],V)}}}if(R.queries[""]!==undefined){if(R.queries[""][T]!==undefined){if(R.queries[""][T][U]!==undefined){C(R.queries[""][T][U],V)}if(R.queries[""][T][""]!==undefined){C(R.queries[""][T][""],V)}}if(R.queries[""][""]!==undefined){if(R.queries[""][""][U]!==undefined){C(R.queries[""][""][U],V)}if(R.queries[""][""][""]!==undefined){C(R.queries[""][""][""],V)}}}}else{E.each(R.union,function(X,W){e(W,V)})}},s=function(R,V){var S=V.subject,T=V.property,U=V.object;if(R.union===undefined){if(R.queries[S]!==undefined){if(R.queries[S][T]!==undefined){if(R.queries[S][T][U]!==undefined){m(R.queries[S][T][U],V)}if(R.queries[S][T][""]!==undefined){m(R.queries[S][T][""],V)}}if(R.queries[S][""]!==undefined){if(R.queries[S][""][U]!==undefined){m(R.queries[S][""][U],V)}if(R.queries[S][""][""]!==undefined){m(R.queries[S][""][""],V)}}}if(R.queries[""]!==undefined){if(R.queries[""][T]!==undefined){if(R.queries[""][T][U]!==undefined){m(R.queries[""][T][U],V)}if(R.queries[""][T][""]!==undefined){m(R.queries[""][T][""],V)}}if(R.queries[""][""]!==undefined){if(R.queries[""][""][U]!==undefined){m(R.queries[""][""][U],V)}if(R.queries[""][""][""]!==undefined){m(R.queries[""][""][""],V)}}}}else{E.each(R.union,function(X,W){s(W,V)})}},y=function(Y,X,V){var R=X[0],U={},T=[],S,W;V=V||{};if(X.length===0){for(S=0;S<Y.length;S+=1){for(v in Y[S]){if(V[v]===undefined){V[v]=[]}if(E.isArray(V[v])){V[v].push(Y[S][v])}}}return[V]}for(S=0;S<Y.length;S+=1){key=Y[S][R];if(U[key]===undefined){U[key]=[]}U[key].push(Y[S])}X=X.splice(1,1);for(v in U){W=E.extend({},V);W[R]=U[v][0][R];T=T.concat(y(U[v],X,W))}return T},l=function(R,S,T){if(N[R.id]===undefined){N[R.id]={}}if(N[R.id][S]===undefined){N[R.id][S]=T;return false}return true},B=function(S,U,R,T){var V=N[S.id][U];if(E.isFunction(V[R])){V[R].call(S,T)}N[S.id][U]=undefined},b=function(R){var T=[];var S=R.length;for(var V=0;V<S;V++){for(var U=V+1;U<S;U++){if(R[V]===R[U]){U=++V}}T.push(R[V])}return T};E.typedValue.types["http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral"]={regex:/^.*$/m,strip:false,value:function(R){return R}};E.rdf=function(R){return new E.rdf.fn.init(R)};E.rdf.fn=E.rdf.prototype={rdfquery:"1.1",init:function(R){var T,S;R=R||{};this.parent=R.parent;this.union=R.union;this.top=this.parent===undefined&&this.union===undefined;if(this.union===undefined){if(R.databank===undefined){this.databank=this.parent===undefined?E.rdf.databank(R.triples,R):this.parent.databank}else{this.databank=R.databank}}else{T=E.map(this.union,function(U){return U.databank});T=b(T);if(T[1]!==undefined){this.databank=E.rdf.databank(undefined,{union:T})}else{this.databank=T[0]}}this.children=[];this.partOf=[];this.filterExp=R.filter;this.selections=R.distinct;this.navigate=R.navigate;this.alphaMemory=[];this.matches=[];this.length=0;if(this.filterExp!==undefined){if(!E.isFunction(this.filterExp)){Q(this.databank,this);this.alphaMemory=P(this.databank,this.filterExp)}}else{if(R.nodes!==undefined){this.alphaMemory=[];for(S=0;S<R.nodes.length;S+=1){this.alphaMemory.push({bindings:{node:R.nodes[S]},triples:[]})}}}G(this);return this},base:function(R){if(R===undefined){return this.databank.base()}else{this.databank.base(R);return this}},prefix:function(S,R){if(R===undefined){return this.databank.prefix(S)}else{this.databank.prefix(S,R);return this}},add:function(U,S){var T,R;if(U.rdfquery!==undefined){if(U.top){R=this.databank.add(U.databank);T=E.rdf({parent:this.parent,databank:R});return T}else{if(this.top){R=U.databank.add(this.databank);T=E.rdf({parent:U.parent,databank:R});return T}else{if(this.union===undefined){T=E.rdf({union:[this,U]});this.partOf.push(T);U.partOf.push(T);return T}else{this.union.push(U);U.partOf.push(this)}}}}else{if(typeof U==="string"){S=E.extend({},{base:this.base(),namespaces:this.prefix(),source:U},S);U=E.rdf.pattern(U,S)}if(U.isFixed()){this.databank.add(U.triple(),S)}else{T=this;this.each(function(W,X){var V=U.triple(X);if(V!==null){T.databank.add(V,S)}})}}return this},remove:function(S,R){if(typeof S==="string"){R=E.extend({},{base:this.base(),namespaces:this.prefix()},R);S=E.rdf.pattern(S,R)}if(S.isFixed()){this.databank.remove(S.triple(),R)}else{query=this;this.each(function(U,V){var T=S.triple(V);if(T!==null){query.databank.remove(T,R)}})}return this},load:function(T,R){var S=this,R=R||{},U=R.success;if(U!==undefined){R.success=function(){U.call(S)}}this.databank.load(T,R);return this},except:function(R){return E.rdf({databank:this.databank.except(R.databank)})},where:function(T,S){var W,V,U,R;S=S||{};if(typeof T==="string"){V=S.base||this.base();U=E.extend({},this.prefix(),S.namespaces||{});R=S.optional||false;T=E.rdf.pattern(T,{namespaces:U,base:V,optional:R})}W=E.rdf(E.extend({},S,{parent:this,filter:T}));this.children.push(W);return W},optional:function(S,R){return this.where(S,E.extend({},R||{},{optional:true}))},about:function(S,R){return this.where(S+" ?property ?value",R)},filter:function(T,U){var R,S;if(typeof T==="string"){if(U.constructor===RegExp){R=function(){return U.test(this[T].value)}}else{R=function(){return this[T].type==="literal"?this[T].value===U:this[T]===U}}}else{R=T}S=E.rdf({parent:this,filter:R});this.children.push(S);return S},node:function(T){var R,S;if(T.toString().substring(0,1)==="?"){R=T.toString().substring(1);S=E.rdf({parent:this,navigate:R})}else{if(typeof T==="string"){T=J(T,{namespaces:this.prefix(),base:this.base()})}S=E.rdf({parent:this,nodes:[T]})}this.children.push(S);return S},find:function(R){return this.where("?node "+R+" ?object",{navigate:"object"})},back:function(R){return this.where("?subject "+R+" ?node",{navigate:"subject"})},group:function(W){var V={},U=[],T,S,R;if(!E.isArray(W)){W=[W]}return E(y(this,W))},select:function(U){var T=[],S,R;for(S=0;S<this.length;S+=1){if(U===undefined){T[S]=this[S]}else{T[S]={};for(R=0;R<U.length;R+=1){T[S][U[R]]=this[S][U[R]]}}}return T},describe:function(V){var S,R,U,T=[];for(S=0;S<V.length;S+=1){U=V[S];if(U.substring(0,1)==="?"){U=U.substring(1);for(R=0;R<this.length;R+=1){T.push(this[R][U])}}else{T.push(U)}}return this.databank.describe(T)},eq:function(R){return this.filter(function(S){return S===R})},reset:function(){var R=this;while(R.parent!==undefined){R=R.parent}return R},end:function(){return this.parent},size:function(){return this.length},sources:function(){return E(E.map(this.matches,function(R){return[R.triples]}))},dump:function(R){var S=E.map(this.matches,function(T){return T.triples});R=E.extend({namespaces:this.databank.namespaces,base:this.databank.base},R||{});return E.rdf.dump(S,R)},get:function(R){return(R===undefined)?E.makeArray(this):this[R]},each:function(R){E.each(this.matches,function(T,S){R.call(S.bindings,T,S.bindings,S.triples)});return this},map:function(R){return E(E.map(this.matches,function(S,T){return R.call(S.bindings,T,S.bindings,S.triples)}))},jquery:function(){return E(this)}};E.rdf.fn.init.prototype=E.rdf.fn;E.rdf.gleaners=[];E.rdf.parsers={};E.rdf.dump=function(Y,R){var U=E.extend({},E.rdf.dump.defaults,R||{}),W=U.format,T=U.serialize,V,X,S;X=E.rdf.parsers[W];if(X===undefined){S=[];for(p in E.rdf.parsers){S.push(p)}throw"Unrecognised dump format: "+W+". Expected one of "+S.join(", ")}V=X.dump(Y,U);return T?X.serialize(V):V};E.rdf.dump.defaults={format:"application/json",serialize:false,indent:false,namespaces:{}};E.fn.rdf=function(S){var R=[],S=S||function(){return this};if(E(this)[0]&&E(this)[0].nodeType===9){return E(this).children("*").rdf(S)}else{if(E(this).length>0){R=E(this).map(function(T,U){return E.map(E.rdf.gleaners,function(V){return V.gleaner.call(E(U),{callback:S})})});return E.rdf({triples:R,namespaces:E(this).xmlns()})}else{return E.rdf()}}};E.extend(E.expr[":"],{about:function(S,U,R){var T=E(S),W=R[3]?T.safeCurie(R[3]):null,V=false;E.each(E.rdf.gleaners,function(X,Y){V|=Y.gleaner.call(T,{about:W})});return V},type:function(S,U,R){var T=E(S),V=R[3]?T.curie(R[3]):null,W=false;E.each(E.rdf.gleaners,function(X,Y){W|=Y.gleaner.call(T,{type:V})});return W},itemid:function(S,V,R){var T=E(S),W=R[3]?T.safeCurie(R[3]):null,U=false;E.each(E.rdf.gleaners,function(X,Y){U|=Y.gleaner.call(T,{itemid:W})});return U},itemtype:function(S,U,R){var T=E(S),V=R[3]?T.curie(R[3]):null,W=false;E.each(E.rdf.gleaners,function(X,Y){W|=Y.gleaner.call(T,{itemtype:V})});return W}});E.rdf.databank=function(S,R){return new E.rdf.databank.fn.init(S,R)};E.rdf.databank.fn=E.rdf.databank.prototype={init:function(T,R){var S;T=T||[];R=R||{};this.id=H();I[this.id]=this;if(R.union===undefined){this.queries={};this.tripleStore=[];this.subjectIndex={};this.propertyIndex={};this.objectIndex={};this.baseURI=R.base||E.uri.base();this.namespaces=E.extend({},R.namespaces||{});for(S=0;S<T.length;S+=1){this.add(T[S])}}else{this.union=R.union}return this},base:function(R){if(this.union===undefined){if(R===undefined){return this.baseURI}else{this.baseURI=R;return this}}else{if(R===undefined){return this.union[0].base()}else{E.each(this.union,function(T,S){S.base(R)});return this}}},prefix:function(T,R){var S={};if(this.union===undefined){if(T===undefined){return this.namespaces}else{if(R===undefined){return this.namespaces[T]}else{this.namespaces[T]=R;return this}}}else{if(R===undefined){E.each(this.union,function(V,U){E.extend(S,U.prefix())});if(T===undefined){return S}else{return S[T]}}else{E.each(this.union,function(V,U){U.prefix(T,R)});return this}}},add:function(X,S){var V=(S&&S.base)||this.base(),U=E.extend({},this.prefix(),(S&&S.namespaces)||{}),W=(S&&S.depth)||E.rdf.databank.defaults.depth,T=(S&&S.proxy)||E.rdf.databank.defaults.proxy,R;if(X===this){return this}else{if(X.subjectIndex!==undefined){if(this.union===undefined){R=E.rdf.databank(undefined,{union:[this,X]});return R}else{this.union.push(X);return this}}else{if(typeof X==="string"){X=E.rdf.triple(X,{namespaces:U,base:V,source:X})}if(this.union===undefined){if(this.subjectIndex[X.subject]===undefined){this.subjectIndex[X.subject]=[];if(W>0&&X.subject.type==="uri"){this.load(X.subject.value,{depth:W-1,proxy:T})}}if(this.propertyIndex[X.property]===undefined){this.propertyIndex[X.property]=[];if(W>0){this.load(X.property.value,{depth:W-1,proxy:T})}}if(E.inArray(X,this.subjectIndex[X.subject])===-1){this.tripleStore.push(X);this.subjectIndex[X.subject].push(X);this.propertyIndex[X.property].push(X);if(X.object.type==="uri"||X.object.type==="bnode"){if(this.objectIndex[X.object]===undefined){this.objectIndex[X.object]=[];if(W>0&&X.object.type==="uri"){this.load(X.object.value,{depth:W-1,proxy:T})}}this.objectIndex[X.object].push(X)}e(this,X)}}else{E.each(this.union,function(Z,Y){Y.add(X)})}return this}}},remove:function(X,U){var W=(U&&U.base)||this.base(),V=E.extend({},this.prefix(),(U&&U.namespaces)||{}),Y,S,R,T;if(typeof X==="string"){X=E.rdf.triple(X,{namespaces:V,base:W,source:X})}this.tripleStore.splice(E.inArray(X,this.tripleStore),1);Y=this.subjectIndex[X.subject];if(Y!==undefined){Y.splice(E.inArray(X,Y),1);if(E(Y).size()===0){delete this.subjectIndex[X.subject]}}S=this.propertyIndex[X.property];if(S!==undefined){S.splice(E.inArray(X,S),1);if(E(S).size()===0){delete this.propertyIndex[X.property]}}if(X.object.type==="uri"||X.object.type==="bnode"){R=this.objectIndex[X.object];if(R!==undefined){R.splice(E.inArray(X,R),1);if(E(R).size()===0){delete this.objectIndex[X.object]}}}s(this,X);return this},except:function(S){var R=S.subjectIndex,T=[];E.each(this.subjectIndex,function(V,W){var U=R[V];if(U===undefined){T=T.concat(W)}else{E.each(W,function(Y,X){if(E.inArray(X,U)===-1){T.push(X)}})}});return E.rdf.databank(T)},triples:function(){var R,S=[];if(this.union===undefined){S=this.tripleStore}else{E.each(this.union,function(U,T){S=S.concat(T.triples().get())});S=b(S)}return E(S)},size:function(){return this.triples().length},describe:function(U){var S,T,R,W={},V=[];while(U.length>0){T=U.pop();if(W[T]===undefined){if(T.value===undefined){T=E.rdf.resource(T)}if(this.subjectIndex[T]!==undefined){for(S=0;S<this.subjectIndex[T].length;S+=1){R=this.subjectIndex[T][S];V.push(R);if(R.object.type==="bnode"){U.push(R.object)}}}if(this.objectIndex[T]!==undefined){for(S=0;S<this.objectIndex[T].length;S+=1){R=this.objectIndex[T][S];V.push(R);if(R.subject.type==="bnode"){U.push(R.subject)}}}W[T]=true}}return b(V)},dump:function(R){R=E.extend({namespaces:this.namespaces,base:this.base},R||{});return E.rdf.dump(this.triples(),R)},load:function(X,R){var Y,ae,T,ab,S,U,ac=(R&&R.format),V=(R&&R.async)||E.rdf.databank.defaults.async,ad=(R&&R.success)||E.rdf.databank.defaults.success,aa=(R&&R.error)||E.rdf.databank.defaults.error,Z=(R&&R.proxy)||E.rdf.databank.defaults.proxy,W=(R&&R.depth)||E.rdf.databank.defaults.depth;T=(typeof X==="string"&&X.substring(1,7)==="http://")?E.uri(X):X;if(T.scheme){if(!l(this,T,{success:ad,error:aa})){ab='<script type="text/javascript" src="'+Z+"?id="+this.id+"&amp;depth="+W+"&amp;url="+encodeURIComponent(T.resolve("").toString())+'"><\/script>';if(V){setTimeout("$('head').append('"+ab+"')",0)}else{E("head").append(ab)}}return this}else{if(ac===undefined){if(typeof X==="string"){if(X.substring(0,1)==="{"){ac="application/json"}else{if(X.substring(0,14)==="<!DOCTYPE html"||X.substring(0,5)==="<html"){ac="application/xhtml+xml"}else{if(X.substring(0,5)==="<?xml"||X.substring(0,8)==="<rdf:RDF"){ac="application/rdf+xml"}else{ac="text/turtle"}}}}else{if(X.documentElement||X.ownerDocument){U=X.documentElement?X.documentElement:X.ownerDocument.documentElement;if(U.nodeName==="html"){ac="application/xhtml+xml"}else{ac="application/rdf+xml"}}else{ac="application/json"}}}S=E.rdf.parsers[ac];if(typeof X==="string"){X=S.parse(X)}ae=S.triples(X);for(Y=0;Y<ae.length;Y+=1){this.add(ae[Y],R)}return this}},toString:function(){return"[Databank with "+this.size()+" triples]"}};E.rdf.databank.fn.init.prototype=E.rdf.databank.fn;E.rdf.databank.defaults={parse:false,async:true,success:null,error:null,depth:0,proxy:"http://www.jenitennison.com/rdfquery/proxy.php"};E.rdf.databank.load=function(U,R,T,S){if(T!==undefined){I[U].load(T,S)}B(I[U],R,(T===undefined)?"error":"success",S)};E.rdf.pattern=function(V,X,U,T){var W,R,S;if(U===undefined){T=X||{};R=E.trim(V).match(g);if(R.length===3||(R.length===4&&R[3]===".")){V=R[0];X=R[1];U=R[2]}else{throw"Bad Pattern: Couldn't parse string "+V}S=(T.optional===undefined)?E.rdf.pattern.defaults.optional:T.optional}if(r[V]&&r[V][X]&&r[V][X][U]&&r[V][X][U][S]){return r[V][X][U][S]}W=new E.rdf.pattern.fn.init(V,X,U,T);if(r[W.subject]&&r[W.subject][W.property]&&r[W.subject][W.property][W.object]&&r[W.subject][W.property][W.object][W.optional]){return r[W.subject][W.property][W.object][W.optional]}else{if(r[W.subject]===undefined){r[W.subject]={}}if(r[W.subject][W.property]===undefined){r[W.subject][W.property]={}}if(r[W.subject][W.property][W.object]===undefined){r[W.subject][W.property][W.object]={}}r[W.subject][W.property][W.object][W.optional]=W;return W}};E.rdf.pattern.fn=E.rdf.pattern.prototype={init:function(S,U,V,R){var T=E.extend({},E.rdf.pattern.defaults,R);this.subject=S.toString().substring(0,1)==="?"?S:k(S,T);this.property=U.toString().substring(0,1)==="?"?U:M(U,T);this.object=V.toString().substring(0,1)==="?"?V:J(V,T);this.optional=T.optional;return this},fill:function(U){var R=this.subject,S=this.property,T=this.object;if(typeof R==="string"&&U[R.substring(1)]){R=U[R.substring(1)]}if(typeof S==="string"&&U[S.substring(1)]){S=U[S.substring(1)]}if(typeof T==="string"&&U[T.substring(1)]){T=U[T.substring(1)]}return E.rdf.pattern(R,S,T,{optional:this.optional})},exec:function(S){var R={};R=a(S.subject,this.subject,R);if(R===null){return null}R=a(S.property,this.property,R);if(R===null){return null}R=a(S.object,this.object,R);return R},isFixed:function(){return typeof this.subject!=="string"&&typeof this.property!=="string"&&typeof this.object!=="string"},triple:function(S){var R=this;if(!this.isFixed()){R=this.fill(S)}if(R.isFixed()){return E.rdf.triple(R.subject,R.property,R.object,{source:this.toString()})}else{return null}},toString:function(){return this.subject+" "+this.property+" "+this.object}};E.rdf.pattern.fn.init.prototype=E.rdf.pattern.fn;E.rdf.pattern.defaults={base:E.uri.base(),namespaces:{},optional:false};E.rdf.triple=function(U,W,T,S){var X,V,R;if(T===undefined){S=W;R=E.trim(U).match(g);if(R.length===3||(R.length===4&&R[3]===".")){U=R[0];W=R[1];T=R[2]}else{throw"Bad Triple: Couldn't parse string "+U}}V=(S&&S.graph)||"";if(D[V]&&D[V][U]&&D[V][U][W]&&D[V][U][W][T]){return D[V][U][W][T]}X=new E.rdf.triple.fn.init(U,W,T,S);V=X.graph||"";if(D[V]&&D[V][X.subject]&&D[V][X.subject][X.property]&&D[V][X.subject][X.property][X.object]){return D[V][X.subject][X.property][X.object]}else{if(D[V]===undefined){D[V]={}}if(D[V][X.subject]===undefined){D[V][X.subject]={}}if(D[V][X.subject][X.property]===undefined){D[V][X.subject][X.property]={}}D[V][X.subject][X.property][X.object]=X;return X}};E.rdf.triple.fn=E.rdf.triple.prototype={init:function(S,U,V,R){var T;T=E.extend({},E.rdf.triple.defaults,R);this.subject=k(S,T);this.property=M(U,T);this.object=J(V,T);this.graph=T.graph===undefined?undefined:k(T.graph,T);this.source=T.source;return this},isFixed:function(){return true},triple:function(R){return this},dump:function(){var T={},R=this.subject.value.toString(),S=this.property.value.toString();T[R]={};T[R][S]=this.object.dump();return T},toString:function(){return this.subject+" "+this.property+" "+this.object+" ."}};E.rdf.triple.fn.init.prototype=E.rdf.triple.fn;E.rdf.triple.defaults={base:E.uri.base(),source:[document],namespaces:{}};E.rdf.resource=function(T,R){var S;if(f[T]){return f[T]}S=new E.rdf.resource.fn.init(T,R);if(f[S]){return f[S]}else{f[S]=S;return S}};E.rdf.resource.fn=E.rdf.resource.prototype={type:"uri",value:undefined,init:function(W,S){var R,V,U,T;if(typeof W==="string"){R=z.exec(W);T=E.extend({},E.rdf.resource.defaults,S);if(R!==null){this.value=E.uri.resolve(R[1].replace(/\\>/g,">"),T.base)}else{if(W.substring(0,1)===":"){U=T.namespaces[""];if(U===undefined){throw"Malformed Resource: No namespace binding for default namespace in "+W}else{this.value=E.uri.resolve(U+W.substring(1))}}else{if(W.substring(W.length-1)===":"){V=W.substring(0,W.length-1);U=T.namespaces[V];if(U===undefined){throw"Malformed Resource: No namespace binding for prefix "+V+" in "+W}else{this.value=E.uri.resolve(U)}}else{try{this.value=E.curie(W,{namespaces:T.namespaces})}catch(X){throw"Malformed Resource: Bad format for resource "+X}}}}}else{this.value=W}return this},dump:function(){return{type:"uri",value:this.value.toString()}},toString:function(){return"<"+this.value+">"}};E.rdf.resource.fn.init.prototype=E.rdf.resource.fn;E.rdf.resource.defaults={base:E.uri.base(),namespaces:{}};E.rdf.type=E.rdf.resource("<"+w+"type>");E.rdf.label=E.rdf.resource("<"+u+"label>");E.rdf.first=E.rdf.resource("<"+w+"first>");E.rdf.rest=E.rdf.resource("<"+w+"rest>");E.rdf.nil=E.rdf.resource("<"+w+"nil>");E.rdf.subject=E.rdf.resource("<"+w+"subject>");E.rdf.property=E.rdf.resource("<"+w+"property>");E.rdf.object=E.rdf.resource("<"+w+"object>");E.rdf.blank=function(R){var S;if(c[R]){return c[R]}S=new E.rdf.blank.fn.init(R);if(c[S]){return c[S]}else{c[S]=S;return S}};E.rdf.blank.fn=E.rdf.blank.prototype={type:"bnode",value:undefined,id:undefined,init:function(R){if(R==="[]"){this.id=j();this.value="_:"+this.id}else{if(R.substring(0,2)==="_:"){this.id=R.substring(2);this.value=R}else{throw"Malformed Blank Node: "+R+" is not a legal format for a blank node"}}return this},dump:function(){return{type:"bnode",value:this.value}},toString:function(){return this.value}};E.rdf.blank.fn.init.prototype=E.rdf.blank.fn;E.rdf.literal=function(T,R){var S;if(t[T]){return t[T]}S=new E.rdf.literal.fn.init(T,R);if(t[S]){return t[S]}else{t[S]=S;return S}};E.rdf.literal.fn=E.rdf.literal.prototype={type:"literal",value:undefined,lang:undefined,datatype:undefined,init:function(V,S){var R,T,U=E.extend({},E.rdf.literal.defaults,S);T=E.safeCurie(U.datatype,{namespaces:U.namespaces});if(U.lang!==undefined&&U.datatype!==undefined&&T.toString()!==(w+"XMLLiteral")){throw"Malformed Literal: Cannot define both a language and a datatype for a literal ("+V+")"}if(U.datatype!==undefined){T=E.safeCurie(U.datatype,{namespaces:U.namespaces});E.extend(this,E.typedValue(V.toString(),T));if(T.toString()===w+"XMLLiteral"){this.lang=U.lang}}else{if(U.lang!==undefined){this.value=V.toString();this.lang=U.lang}else{if(typeof V==="boolean"){E.extend(this,E.typedValue(V.toString(),h+"boolean"))}else{if(typeof V==="number"){E.extend(this,E.typedValue(V.toString(),h+"double"))}else{if(V==="true"||V==="false"){E.extend(this,E.typedValue(V,h+"boolean"))}else{if(E.typedValue.valid(V,h+"integer")){E.extend(this,E.typedValue(V,h+"integer"))}else{if(E.typedValue.valid(V,h+"decimal")){E.extend(this,E.typedValue(V,h+"decimal"))}else{if(E.typedValue.valid(V,h+"double")&&!/^\s*([\-\+]?INF|NaN)\s*$/.test(V)){E.extend(this,E.typedValue(V,h+"double"))}else{R=O.exec(V);if(R!==null){this.value=(R[2]||R[4]).replace(/\\"/g,'"').replace(/\\n/g,"\n").replace(/\\t/g,"\t").replace(/\\r/g,"\r");if(R[9]){T=E.rdf.resource(R[9],U);E.extend(this,E.typedValue(this.value,T.value))}else{if(R[7]){this.lang=R[7]}}}else{throw"Malformed Literal: Couldn't recognise the value "+V}}}}}}}}}return this},dump:function(){var R={type:"literal",value:this.value.toString()};if(this.lang!==undefined){R.lang=this.lang}else{if(this.datatype!==undefined){R.datatype=this.datatype.toString()}}return R},toString:function(){var R='"'+this.value+'"';if(this.lang!==undefined){R+="@"+this.lang}else{if(this.datatype!==undefined){R+="^^<"+this.datatype+">"}}return R}};E.rdf.literal.fn.init.prototype=E.rdf.literal.fn;E.rdf.literal.defaults={base:E.uri.base(),namespaces:{},datatype:undefined,lang:undefined}})(jQuery);(function(a){a.rdf.parsers["application/json"]={parse:a.secureEvalJSON,serialize:a.toJSON,triples:function(f){var m,h,c,j,d,e,g,b,k=[];for(m in f){h=(m.substring(0,2)==="_:")?a.rdf.blank(m):a.rdf.resource("<"+m+">");for(c in f[m]){j=a.rdf.resource("<"+c+">");for(g=0;g<f[m][c].length;g+=1){d=f[m][c][g];if(d.type==="uri"){e=a.rdf.resource("<"+d.value+">")}else{if(d.type==="bnode"){e=a.rdf.blank(d.value)}else{if(d.datatype!==undefined){e=a.rdf.literal(d.value,{datatype:d.datatype})}else{b={};if(d.lang!==undefined){b.lang=d.lang}var l=typeof d.value==="string"?d.value.replace(/\"/g,'\\"'):d.value;e=a.rdf.literal('"'+l+'"',b)}}}k.push(a.rdf.triple(h,j,e))}}}return k},dump:function(h){var g={},c,b,d,f;for(c=0;c<h.length;c+=1){b=h[c];d=b.subject.value.toString();f=b.property.value.toString();if(g[d]===undefined){g[d]={}}if(g[d][f]===undefined){g[d][f]=[]}g[d][f].push(b.object.dump())}return g}}})(jQuery);(function(D){var y=/^(\u0009|\u000A|\u000D|\u0020|#([^\u000A\u000D])*)+/,k="A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",B="-"+k+"0-9\u00B7\u0300-\u036F\u203F-\u2040",I=new RegExp("^["+k+"]["+B+"]*"),x=/^(\\u[0-9A-F]{4}|\\U[0-9A-F]{8}|\\\\|\\>|[\u0020-\u003D\u003F-\u005B\u005D-\u10FFFF])*/,g=/^(true|false)[\s\.;,)\]]/,z=/^(-|\+)?([0-9]+\.[0-9]*[eE](-|\+)?[0-9]+|\.[0-9]+[eE](-|\+)?[0-9]+|[0-9]+[eE](-|\+)?[0-9]+)/,F=/^(-|\+)?(([0-9]+\.[0-9]*)|(\.[0-9]))+/,J=/^(-|\+)?[0-9]+/,t=/^(\\u[0-9A-F]{4}|\\U[0-9A-F]{8}|\\\\|[\u0020-\u0021\u0023-\u005B]|[\u005D-\u10FFFF]|\\t|\\n|\\r|\\")*/,b=/^(\\u[0-9A-F]{4}|\\U[0-9A-F]{8}|\\\\|[\u0020-\u0021\u0023-\u005B]|[\u005D-\u10FFFF]|\\t|\\n|\\r|\\"|\u0009|\u000A|\u000D|"[^"]|""[^"])*/,d=/^[a-z]+(-[a-z0-9]+)*/,l=function(O){},L=function(O){return O.replace(/(\\u([0-9A-F]{4}))|(\\U([0-9A-F]{4})([0-9A-F]{4}))/g,function(Q,U,T,S,R,P){if(U!==undefined){return String.fromCharCode(parseInt(T,16))}else{return String.fromCharCode(parseInt(R,16))+String.fromCharCode(parseInt(P,16))}})},f=function(O,P){if(O.substring(0,P.length)===P){return O.substring(P.length)}else{throw"Invalid Turtle: Expecting '"+P+"', found '"+O.substring(0,20)+"...'"}},M=function(P,O){var Q;O=O||{};Q=O.required||false;if(Q&&!y.test(P)){throw ("Invalid Turtle: Required whitespace is missing!")}return P.replace(y,"")},c=function(Q,P){var O;l("uriref: "+Q);Q=f(Q,"<");O=x.exec(Q)[0];Q=Q.substring(O.length);Q=f(Q,">");return{remainder:Q,uri:D.uri.resolve(O,P.base)}},q=function(Q,P){var O;l("name: "+Q);if(I.test(Q)){O=I.exec(Q);return{name:O[0],remainder:Q.substring(O[0].length)}}else{return{name:"",remainder:Q}}},u=function(P,O){var Q=q(P,O);l("prefixName: "+P);if(Q.name.substring(0,1)==="_"){throw"Invalid Turtle: Prefix must not start with an underscore: "+q}else{return{prefix:Q.name,remainder:Q.remainder}}},a=function(S,Q){var O,R,P;l("directive: "+S);if(S.substring(0,7)==="@prefix"){S=S.substring(7);S=M(S,{required:true});O=u(S,Q);R=O.prefix;S=O.remainder;S=M(S);S=f(S,":");S=M(S);O=c(S,Q);Q.namespaces[R]=O.uri;S=O.remainder}else{if(S.substring(0,5)==="@base"){S=f(S,"@base");S=M(S,{required:true});O=c(S,Q);Q.base=O.uri;S=O.remainder}else{throw ("Invalid Turtle: Unrecognised directive: "+S)}}S=M(S);S=f(S,".");return{remainder:S,opts:Q,triples:[]}},e=function(R,Q){var P,O=[],T=[],S=R.substring(0,1);l("itemList: "+R);while(S!==")"){P=K(R,Q);R=P.remainder;O.push(P.object);T=T.concat(P.triples);R=M(R);S=R.substring(0,1)}return{remainder:R,items:O,triples:T}},H=function(U,S){var P,Q,O,V,T,R=D.rdf.nil;l("collection: "+U);U=f(U,"(");U=M(U);P=e(U,S);U=P.remainder;O=P.items;V=P.triples;for(Q=O.length-1;Q>=0;Q-=1){T=D.rdf.blank("[]");V.push(D.rdf.triple(T,D.rdf.first,O[Q]));V.push(D.rdf.triple(T,D.rdf.rest,R));R=T}U=M(U);U=f(U,")");return{remainder:U,collection:R,triples:V}},o=function(R,Q){var P,O,S=R.substring(0,1);l("blank: "+R);if(S==="_"){R=f(R,"_:");P=q(R,Q);return{remainder:P.remainder,blank:D.rdf.blank("_:"+P.name),triples:[]}}else{if(S==="("){P=H(R,Q);return{remainder:P.remainder,blank:P.collection,triples:P.triples}}else{if(R.substring(0,2)==="[]"){return{remainder:R.substring(2),blank:D.rdf.blank("[]"),triples:[]}}else{O=D.rdf.blank("[]");Q.subject.unshift(O);R=f(R,"[");R=M(R);P=E(R,Q);R=P.remainder;R=M(R);R=f(R,"]");Q.subject.shift();return{remainder:R,blank:O,triples:P.triples}}}}},j=function(Q,P){var O,R=Q.substring(0,1);l("subject: "+Q);if(R==="["||R==="_"||R==="("){O=o(Q,P);return{remainder:O.remainder,subject:O.blank,triples:O.triples}}else{O=C(Q,P);return{remainder:O.remainder,subject:O.resource,triples:[]}}},C=function(S,Q){var O,R,P,U=S.substring(0,1);l("resource: "+S);if(U==="<"){O=c(S,Q);return{remainder:O.remainder,resource:D.rdf.resource(O.uri,Q.base)}}else{try{O=u(S,Q);R=O.prefix;S=O.remainder}catch(T){R=""}S=f(S,":");O=q(S,Q);P=O.name;return{remainder:O.remainder,resource:D.rdf.resource(R+":"+P,{namespaces:Q.namespaces,base:Q.base})}}},r=function(P,O){var Q;l("quotedString: "+P);if(P.substring(0,3)==='"""'){P=f(P,'"""');Q=b.exec(P)[0];P=P.substring(Q.length);Q=Q.replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/\\"/g,'"');Q=L(Q);P=f(P,'"""');return{remainder:P,string:Q}}else{P=f(P,'"');Q=t.exec(P)[0];P=P.substring(Q.length);Q=Q.replace(/\\"/g,'"');Q=L(Q);P=f(P,'"');return{remainder:P,string:Q}}},s=function(P,O){var Q;l("language: "+P);Q=d.exec(P)[0];return{remainder:P.substring(Q.length),language:Q}},m=function(P,O){var R,Q;l("literal: "+P);if(g.test(P)){Q=g.exec(P)[1];return{remainder:P.substring(Q.length),literal:D.rdf.literal(Q,{datatype:"http://www.w3.org/2001/XMLSchema#boolean"})}}else{if(z.test(P)){Q=z.exec(P)[0];return{remainder:P.substring(Q.length),literal:D.rdf.literal(Q,{datatype:"http://www.w3.org/2001/XMLSchema#double"})}}else{if(F.test(P)){Q=F.exec(P)[0];return{remainder:P.substring(Q.length),literal:D.rdf.literal(Q,{datatype:"http://www.w3.org/2001/XMLSchema#decimal"})}}else{if(J.test(P)){Q=J.exec(P)[0];return{remainder:P.substring(Q.length),literal:D.rdf.literal(Q,{datatype:"http://www.w3.org/2001/XMLSchema#integer"})}}else{parsed=r(P,O);P=parsed.remainder;Q=parsed.string;P=M(P);R=P.substring(0,1);if(R==="^"){P=f(P,"^^");P=M(P);parsed=C(P,O);return{remainder:parsed.remainder,literal:D.rdf.literal(Q,{datatype:parsed.resource.value})}}else{if(R==="@"){P=f(P,"@");P=M(P);parsed=s(P,O);return{remainder:parsed.remainder,literal:D.rdf.literal(Q,{lang:parsed.language})}}else{return{remainder:P,literal:D.rdf.literal('"'+Q.replace(/"/g,'\\"')+'"')}}}}}}}},A=function(Q,P){var O,S=Q.substring(0,1);l("verb: "+Q);try{O=C(Q,P);return{remainder:O.remainder,verb:O.resource}}catch(R){if(S==="a"){Q=M(Q.substring(1),{required:true});return{remainder:Q,verb:D.rdf.type}}else{throw R}}},K=function(Q,P){var O,T,S=Q.substring(0,1);l("object: "+Q);if(S==="["||S==="_"||S==="("){O=o(Q,P);return{remainder:O.remainder,object:O.blank,triples:O.triples}}else{try{O=m(Q,P);return{remainder:O.remainder,object:O.literal,triples:[]}}catch(R){O=C(Q,P);return{remainder:O.remainder,object:O.resource,triples:[]}}}},N=function(Q,P){var O,R,T,U=[],S=Q.substring(0,1);l("objectList: "+Q);do{O=K(Q,P);Q=O.remainder;U=U.concat(O.triples);T=D.rdf.triple(P.subject[0],P.verb[0],O.object);U.push(T);Q=M(Q);S=Q.substring(0,1);if(S===","){Q=f(Q,",");Q=M(Q);S=Q.substring(0,1)}else{break}}while(S!=="]"&&S!==";"&&S!==".");return{remainder:Q,triples:U}},E=function(S,P){var O,R,Q,U=[],T=S.substring(0,1);l("predicateObjectList: "+S);do{O=A(S,P);S=O.remainder;R=O.verb;S=M(S);P.verb.unshift(R);O=N(S,P);S=O.remainder;U=U.concat(O.triples);P.verb.shift();S=M(S);T=S.substring(0,1);if(T===";"){S=f(S,";");S=M(S);T=S.substring(0,1)}else{break}}while(T!=="]"&&T!==".");return{remainder:S,triples:U}},G=function(Q,P){var O,R=[];l("triples: "+Q);O=j(Q,P);Q=O.remainder;P.subject.unshift(O.subject);R=O.triples;Q=M(Q);O=E(Q,P);P.subject.shift();Q=M(O.remainder);Q=f(Q,".");return{remainder:Q,opts:P,triples:R.concat(O.triples)}},w=function(Q,P){var R,O;l("statement: "+Q);Q=M(Q);if(Q.length===0){return{remainder:"",opts:P,triples:[]}}else{R=Q.substring(0,1);if(R==="@"){return a(Q,P)}else{return G(Q,P)}}},n=function(S,Q){var R,P={},O={},T=[];Q=Q||{};Q.namespaces={};Q.base=Q.base||D.uri.base();Q.subject=[];Q.verb=[];while(S!==""){l("parseTurtle: "+S);O=w(S,Q);S=O.remainder;Q=O.opts;T=T.concat(O.triples)}return T},h=function(aa,ad){var W=D.rdf.parsers["application/json"].dump(aa),P=ad.namespaces||{},Q=ad.indent||false,Y,U,ac,O,Z,R,ab="";for(U in P){ab+="@prefix "+U+": <"+P[U]+"> . ";if(Q){ab+="\n"}}for(ac in W){if(Q){ab+="\n"}if(ac.substring(0,2)==="_:"){ab+=ac}else{try{ab+=D.createCurie(ac,{namespaces:P})}catch(X){ab+="<"+ac+">"}}ab+=" ";Y=true;for(O in W[ac]){if(Q){ab+="\n  "}Y=false;if(O===D.rdf.type.value.toString()){ab+="a"}else{try{ab+=D.createCurie(O,{namespaces:P})}catch(V){ab+="<"+O+">"}}ab+=" ";for(R=0;R<W[ac][O].length;R+=1){if(R>0&&Q){ab+="\n    "}Z=W[ac][O][R];if(Z.type==="uri"){try{ab+=D.createCurie(Z.value,{namespaces:P})}catch(T){ab+="<"+Z.value+">"}}else{if(Z.type==="bnode"){ab+=Z.value}else{ab+='"'+Z.value+'"';if(Z.lang){ab+="@"+Z.lang}if(Z.datatype){ab+="^^";try{ab+=D.createCurie(Z.datatype,{namespaces:P})}catch(S){ab+="<"+Z.datatype+">"}}}}ab+=" , "}ab=ab.substring(0,ab.length-3);ab+=" ; "}ab=ab.substring(0,ab.length-3);ab+=" . ";if(Q){ab+="\n"}}return ab};D.rdf.parsers["text/turtle"]={parse:function(O){return O},serialize:function(O){return O},triples:n,dump:h}})(jQuery);(function(e){var b="http://www.w3.org/1999/02/22-rdf-syntax-ns#",o=function(w,u,t,x){var y=w.ownerDocument,s;if(u!==undefined&&u!==null){if(y.createAttributeNS){s=y.createAttributeNS(u,t);s.nodeValue=x;w.attributes.setNamedItemNS(s)}else{s=y.createNode(2,t,u);s.nodeValue=x;w.attributes.setNamedItem(s)}}else{s=y.createAttribute(t);s.nodeValue=x;w.attributes.setNamedItem(s)}return w},q=function(t,s,u){if(s==="http://www.w3.org/XML/1998/namespace"||s==="http://www.w3.org/2000/xmlns/"){}else{if(u){o(t,"http://www.w3.org/2000/xmlns/","xmlns:"+u,s)}else{o(t,undefined,"xmlns",s)}}return t},h=function(u,s){var x,y="",w,t=false;if(u!==undefined&&u!==null){if(/:/.test(s)){w=/([^:]+):/.exec(s)[1]}t=true}if(document.implementation&&document.implementation.createDocument){x=document.implementation.createDocument(u,s,null);if(t){q(x.documentElement,u,w)}return x}else{x=new ActiveXObject("Microsoft.XMLDOM");x.async="false";if(w===undefined){y=' xmlns="'+u+'"'}else{y=" xmlns:"+w+'="'+u+'"'}x.loadXML("<"+s+y+"/>");return x}},r=function(w,u,t,s){var y=w.ownerDocument,x;if(u!==undefined&&u!==null){x=y.createElementNS?y.createElementNS(u,t):y.createNode(1,t,u)}else{x=y.createElement(t)}if(s!==-1){d(w,"\n");if(s===0){d(w,"\n")}else{d(w,"  ")}}w.appendChild(x);return x},d=function(u,x){var w=u.ownerDocument,s;s=w.createTextNode(x);u.appendChild(s);return u},n=function(u,s){var z,x,t,y;try{x=new ActiveXObject("Microsoft.XMLDOM");x.async="false";x.loadXML("<temp>"+s+"</temp>")}catch(w){z=new DOMParser();x=z.parseFromString("<temp>"+s+"</temp>","text/xml")}for(t=0;t<x.documentElement.childNodes.length;t+=1){u.appendChild(x.documentElement.childNodes[t].cloneNode(true))}return u},g=function(I,K){var G=h(b,"rdf:RDF"),B=e.rdf.parsers["application/json"].dump(I),u=K.namespaces||{},x=K.indent||false,w,J,C,t,D,z,H,y,F,E,A;for(w in u){q(G.documentElement,u[w],w)}for(J in B){if(B[J][e.rdf.type.value]!==undefined){y=/(.+[#\/])([^#\/]+)/.exec(B[J][e.rdf.type.value][0].value);E=y[1];F=y[2];for(w in u){if(u[w].toString()===E){A=w;break}}C=r(G.documentElement,E,A+":"+F,x?0:-1)}else{C=r(G.documentElement,b,"rdf:Description",x?0:-1)}if(/^_:/.test(J)){o(C,b,"rdf:nodeID",J.substring(2))}else{o(C,b,"rdf:about",J)}for(t in B[J]){if(t!==e.rdf.type.value.toString()||B[J][t].length>1){y=/(.+[#\/])([^#\/]+)/.exec(t);E=y[1];F=y[2];for(w in u){if(u[w].toString()===E){A=w;break}}for(z=(t===e.rdf.type.value.toString()?1:0);z<B[J][t].length;z+=1){H=B[J][t][z];D=r(C,E,A+":"+F,x?1:-1);if(H.type==="uri"){o(D,b,"rdf:resource",H.value)}else{if(H.type==="literal"){if(H.datatype!==undefined){if(H.datatype==="http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral"){o(D,b,"rdf:parseType","Literal");if(x){d(D,"\n    ")}n(D,H.value);if(x){d(D,"\n  ")}}else{o(D,b,"rdf:datatype",H.datatype);d(D,H.value)}}else{if(H.lang!==undefined){o(D,"http://www.w3.org/XML/1998/namespace","xml:lang",H.lang);d(D,H.value)}else{d(D,H.value)}}}else{o(D,b,"rdf:nodeID",H.value.substring(2))}}}if(x){d(C,"\n")}}}}if(x){d(G.documentElement,"\n\n")}return G},a=function(s){switch(s){case"http://www.w3.org/1999/02/22-rdf-syntax-ns":return"rdf";case"http://www.w3.org/XML/1998/namespace":return"xml";case"http://www.w3.org/2000/xmlns/":return"xmlns";default:throw ("No default prefix mapped for namespace "+s)}},l=function(u,t,s){var x;if(u.hasAttributeNS){return u.hasAttributeNS(t,s)}else{try{x=/:/.test(s)?/:(.+)$/.exec(s)[1]:s;return u.attributes.getQualifiedItem(x,t)!==null}catch(w){return u.getAttribute(a(t)+":"+s)!==null}}},k=function(u,t,s){var x;if(u.getAttributeNS){return u.getAttributeNS(t,s)}else{try{x=/:/.test(s)?/:(.+)$/.exec(s)[1]:s;return u.attributes.getQualifiedItem(x,t).nodeValue}catch(w){return u.getAttribute(a(t)+":"+s)}}},m=function(s){return s.localName||s.baseName},j=function(w,x){var u,t;if(l(w,b,"about")){u=k(w,b,"about");t=e.rdf.resource("<"+u+">",{base:x})}else{if(l(w,b,"ID")){u=k(w,b,"ID");t=e.rdf.resource("<#"+u+">",{base:x})}else{if(l(w,b,"nodeID")){u=k(w,b,"nodeID");t=e.rdf.blank("_:"+u)}else{t=e.rdf.blank("[]")}}}return t},f=function(M,u,w,Q){var y,B,z,C,N,H,Q,G,F,A=1,P,O,J,s=[],x,L,I={},t,D=[];Q=k(M,"http://www.w3.org/XML/1998/namespace","lang")||Q;w=k(M,"http://www.w3.org/XML/1998/namespace","base")||w;if(Q!==null&&Q!==undefined&&Q!==""){I={lang:Q}}y=j(M,w);if(u&&(M.namespaceURI!==b||m(M)!=="Description")){z=e.rdf.type;N=e.rdf.resource("<"+M.namespaceURI+m(M)+">");D.push(e.rdf.triple(y,z,N))}for(G=0;G<M.attributes.length;G+=1){B=M.attributes.item(G);if(B.namespaceURI!==undefined&&B.namespaceURI!=="http://www.w3.org/2000/xmlns/"&&B.namespaceURI!=="http://www.w3.org/XML/1998/namespace"&&B.prefix!=="xmlns"&&B.prefix!=="xml"){if(B.namespaceURI!==b){z=e.rdf.resource("<"+B.namespaceURI+m(B)+">");N=e.rdf.literal(I.lang?B.nodeValue:'"'+B.nodeValue.replace(/"/g,'\\"')+'"',I);D.push(e.rdf.triple(y,z,N))}else{if(m(B)==="type"){z=e.rdf.type;N=e.rdf.resource("<"+B.nodeValue+">",{base:w});D.push(e.rdf.triple(y,z,N))}}}}var E=Q;for(G=0;G<M.childNodes.length;G+=1){B=M.childNodes[G];if(B.nodeType===1){if(B.namespaceURI===b&&m(B)==="li"){z=e.rdf.resource("<"+b+"_"+A+">");A+=1}else{z=e.rdf.resource("<"+B.namespaceURI+m(B)+">")}Q=k(B,"http://www.w3.org/XML/1998/namespace","lang")||E;if(Q!==null&&Q!==undefined&&Q!==""){I={lang:Q}}else{I={}}if(l(B,b,"resource")){C=k(B,b,"resource");N=e.rdf.resource("<"+C+">",{base:w})}else{if(l(B,b,"nodeID")){C=k(B,b,"nodeID");N=e.rdf.blank("_:"+C)}else{if(l(B,b,"parseType")){x=k(B,b,"parseType");if(x==="Literal"){try{L=new XMLSerializer();C=L.serializeToString(B.getElementsByTagName("*")[0])}catch(K){C="";for(F=0;F<B.childNodes.length;F+=1){C+=B.childNodes[F].xml}}N=e.rdf.literal(C,{datatype:b+"XMLLiteral"})}else{if(x==="Resource"){t=f(B,false,w,Q);if(t.length>0){N=t[t.length-1].subject;D=D.concat(t)}else{N=e.rdf.blank("[]")}}else{if(x==="Collection"){if(B.getElementsByTagName("*").length>0){for(F=0;F<B.childNodes.length;F+=1){C=B.childNodes[F];if(C.nodeType===1){s.push(C)}}P=e.rdf.blank("[]");N=P;for(F=0;F<s.length;F+=1){C=s[F];t=f(C,true,w,Q);if(t.length>0){J=t[t.length-1].subject;D=D.concat(t)}else{J=j(C)}D.push(e.rdf.triple(P,e.rdf.first,J));if(F===s.length-1){D.push(e.rdf.triple(P,e.rdf.rest,e.rdf.nil))}else{O=e.rdf.blank("[]");D.push(e.rdf.triple(P,e.rdf.rest,O));P=O}}}else{N=e.rdf.nil}}}}}else{if(l(B,b,"datatype")){C=B.childNodes[0].nodeValue?B.childNodes[0].nodeValue:"";N=e.rdf.literal(C,{datatype:k(B,b,"datatype")})}else{if(B.getElementsByTagName("*").length>0){for(F=0;F<B.childNodes.length;F+=1){C=B.childNodes[F];if(C.nodeType===1){t=f(C,true,w,Q);if(t.length>0){N=t[t.length-1].subject;D=D.concat(t)}else{N=j(C)}}}}else{if(B.childNodes.length>0){C=B.childNodes[0].nodeValue;N=e.rdf.literal(I.lang?C:'"'+C.replace(/"/g,'\\"')+'"',I)}else{t=f(B,false,w,Q);if(t.length>0){N=t[t.length-1].subject;D=D.concat(t)}else{N=e.rdf.blank("[]")}}}}}}}D.push(e.rdf.triple(y,z,N));if(l(B,b,"ID")){H=e.rdf.resource("<#"+k(B,b,"ID")+">",{base:w});D.push(e.rdf.triple(H,e.rdf.subject,y));D.push(e.rdf.triple(H,e.rdf.property,z));D.push(e.rdf.triple(H,e.rdf.object,N))}}}return D},c=function(t){var s,w,u,x=[];if(t.documentElement.namespaceURI===b&&m(t.documentElement)==="RDF"){w=k(t.documentElement,"http://www.w3.org/XML/1998/namespace","lang");base=k(t.documentElement,"http://www.w3.org/XML/1998/namespace","base")||e.uri.base();x=e.map(t.documentElement.childNodes,function(y){if(y.nodeType===1){return f(y,true,base,w)}else{return null}})}else{x=f(t.documentElement,true)}return x};e.rdf.parsers["application/rdf+xml"]={parse:function(s){var u;try{u=new ActiveXObject("Microsoft.XMLDOM");u.async="false";u.loadXML(s)}catch(t){var w=new DOMParser();u=w.parseFromString(s,"text/xml")}return u},serialize:function(s){if(s.xml){return s.xml.replace(/\s+$/,"")}else{serializer=new XMLSerializer();return serializer.serializeToString(s)}},triples:c,dump:g}})(jQuery);(function(j){var J={rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",xsd:"http://www.w3.org/2001/XMLSchema#",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},G=J.rdf+"XMLLiteral",m=j.fn.curie.defaults,I=["alternate","appendix","bookmark","cite","chapter","contents","copyright","first","glossary","help","icon","index","last","license","meta","next","p3pv1","prev","role","section","stylesheet","subsection","start","top","up"],A=/\s([^ =]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^ >]+))/g,x="[-A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u10000-\uEFFFF.0-9\u00B7\u0300-\u036F\u203F-\u2040]",f="[\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u0131\u0134-\u013E\u0141-\u0148\u014A-\u017E\u0180-\u01C3\u01CD-\u01F0\u01F4-\u01F5\u01FA-\u0217\u0250-\u02A8\u02BB-\u02C1\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0490-\u04C4\u04C7-\u04C8\u04CB-\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8-\u04F9\u0531-\u0556\u0559\u0561-\u0586\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0641-\u064A\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5\u06E5-\u06E6\u0905-\u0939\u093D\u0958-\u0961\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AE0\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B36-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0-\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60-\u0D61\u0E01-\u0E2E\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EAE\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0F40-\u0F47\u0F49-\u0F69\u10A0-\u10C5\u10D0-\u10F6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110B-\u110C\u110E-\u1112\u113C\u113E\u1140\u114C\u114E\u1150\u1154-\u1155\u1159\u115F-\u1161\u1163\u1165\u1167\u1169\u116D-\u116E\u1172-\u1173\u1175\u119E\u11A8\u11AB\u11AE-\u11AF\u11B7-\u11B8\u11BA\u11BC-\u11C2\u11EB\u11F0\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u212E\u2180-\u2182\u3041-\u3094\u30A1-\u30FA\u3105-\u312C\uAC00-\uD7A3\u4E00-\u9FA5\u3007\u3021-\u3029_]",l=new RegExp("^"+f+x+"*$"),q=j.rdf.resource("<>"),E=function(N){var L="",K,M;if(!/&/.test(N)){return N}while(N.length>0){K=/([^&]*)(&([^;]+);)(.*)/g.exec(N);if(K===null){L+=N;break}L+=K[1];M=K[3];N=K[4];if(M.charAt(0)==="#"){if(M.charAt(1)==="x"){L+=String.fromCharCode(parseInt(M.substring(2),16))}else{L+=String.fromCharCode(parseInt(M.substring(1),10))}}else{switch(M){case"amp":L+="&";break;case"nbsp":L+=String.fromCharCode(160);break;case"quot":L+='"';break;case"apos":L+="'";break;default:L+="&"+M+";"}}}return L},z=function(L){var M,R,S,U,K,T,Q,N,P={},O={};R=L[0];O[":length"]=0;if(R.attributes&&R.attributes.getNamedItemNS){Q=R.attributes;for(M=0;M<Q.length;M+=1){S=Q[M];if(/^xmlns(:(.+))?$/.test(S.nodeName)&&S.nodeValue!==""){N=/^xmlns(:(.+))?$/.exec(S.nodeName)[2]||"";if(l.test(N)&&(N!=="xml"||S.nodeValue===J.xml)&&(S.nodeValue!==J.xml||N==="xml")&&N!=="xmlns"&&S.nodeValue!==J.xmlns){O[N]=j.uri(S.nodeValue);O[":length"]+=1}}else{if(/rel|rev|lang|xml:lang|about|href|src|resource|property|typeof|content|datatype/.test(S.nodeName)){P[S.nodeName]=S.nodeValue===null?undefined:S.nodeValue}}}}else{U=/<[^>]+>/.exec(R.outerHTML);S=A.exec(U);while(S!==null){K=S[1];T=S[2]||S[3]||S[4];if(/^xmlns/.test(K)&&K!=="xmlns:"&&T!==""){N=/^xmlns(:(.+))?$/.exec(K)[2]||"";if(l.test(N)&&(N!=="xml"||S.nodeValue===J.xml)&&(S.nodeValue!==J.xml||N==="xml")&&N!=="xmlns"&&S.nodeValue!==J.xmlns){O[N]=j.uri(T);O[":length"]+=1}}else{if(/about|href|src|resource|property|typeof|content|datatype|rel|rev|lang|xml:lang/.test(K)){P[K]=E(T)}}S=A.exec(U)}A.lastIndex=0}return{atts:P,namespaces:O}},D=function(L,K){var M=L[0].getAttribute(K);return M===null?undefined:M},e=function(K){return j.rdf.resource(K)},d=function(M,N,L,K){if(M.substring(0,2)==="_:"){if(L){return undefined}return j.rdf.blank(M)}else{try{return e(j.curie(M,K))}catch(O){return undefined}}},h=function(O,M,L){var K=/^\[(.*)\]$/.exec(O),N=L.base||M.base();return K?d(K[1],M,false,L):e(j.uri(O,N))},r=function(O,N,M,K){var L,P,Q=[];O=O&&O.split?O.split(/[ \t\n\r\x0C]+/g):[];for(L=0;L<O.length;L+=1){if(O[L]!==""){P=d(O[L],N,M,K);if(P!==undefined){Q.push(P)}}}return Q},g=function(N,P,K){var L,M,O=[];P=P.type==="uri"?P:j.rdf.resource(P,K);N=N&&N.split?N.split(/\s+/):[];for(L=0;L<N.length;L+=1){if(N[L]!==""){M=d(N[L],null,false,K);if(M!==P){O.push(N[L])}}}return O.reverse().join(" ")},C=function(O,L,N){var M,P,Q,K;L=L||{};Q=L.atts||z(O).atts;M=N===undefined?Q.rel!==undefined||Q.rev!==undefined:N;P=Q.resource;P=P===undefined?Q.href:P;if(P===undefined){P=M?j.rdf.blank("[]"):P}else{K=L.curieOptions||j.extend({},m,{namespaces:O.xmlns()});P=h(P,O,K)}return P},w=function(Q,M,P){var O,R,K,L,N=false;M=M||{};R=M.atts||z(Q).atts;K=M.curieOptions||j.extend({},m,{namespaces:Q.xmlns(),base:Q.base()});O=P===undefined?R.rel!==undefined||R.rev!==undefined:P;if(R.about!==undefined){L=h(R.about,Q,K)}if(L===undefined&&R.src!==undefined){L=h(R.src,Q,K)}if(!O&&L===undefined&&R.resource!==undefined){L=h(R.resource,Q,K)}if(!O&&L===undefined&&R.href!==undefined){L=h(R.href,Q,K)}if(L===undefined){if(/^(head|body)$/i.test(Q[0].nodeName)){L=q}else{if(R["typeof"]!==undefined){L=j.rdf.blank("[]")}else{if(Q[0].parentNode.nodeType===1){L=M.object||C(Q.parent())||w(Q.parent()).subject;N=!O&&R.property===undefined}else{L=q}}}}return{subject:L,skip:N}},u=function(L,K){var N;K=K||{};if(K.atts){N=K.atts.lang;N=N||K.atts["xml:lang"]}else{N=L[0].getAttribute("lang");try{N=(N===null||N==="")?L[0].getAttribute("xml:lang"):N}catch(M){}N=(N===null||N==="")?undefined:N}if(N===undefined){if(K.lang){N=K.lang}else{if(L[0].parentNode.nodeType===1){N=u(L.parent())}}}return N},s=function(K){switch(K){case"<":return"&lt;";case'"':return"&quot;";case"&":return"&amp;"}},B=function(L,M){var N,O="",P,R,K,Q,S;L.contents().each(function(){var T=j(this),U=T[0];if(U.nodeType===1){K=U.nodeName.toLowerCase();O+="<"+K;if(U.outerHTML){S=/<[^>]+>/.exec(U.outerHTML);R=A.exec(S);while(R!==null){if(!/^jQuery/.test(R[1])){O+=" "+R[1]+"=";O+=R[2]?R[3]:'"'+R[1]+'"'}R=A.exec(S)}A.lastIndex=0}else{P=U.attributes;for(N=0;N<P.length;N+=1){R=P.item(N);O+=" "+R.nodeName+'="';O+=R.nodeValue.replace(/[<"&]/g,s);O+='"'}}if(!M){Q=T.xmlns("");if(Q!==undefined&&T.attr("xmlns")===undefined){O+=' xmlns="'+Q+'"'}}O+=">";O+=B(T,true);O+="</"+K+">"}else{if(U.nodeType===8){O+="<!--";O+=U.nodeValue;O+="-->"}else{O+=U.nodeValue}}});return O},H=function(M){var ad,Q,K,ai,X,ac,Y,W,ag,ae,U,R,N,Z,V,S,ab=[],P,af,L,aa,T,ah,O=this.children();M=M||{};V=M.forward||[];S=M.backward||[];P=M.callback||function(){return this};L=z(this);aa=L.atts;M.atts=aa;T=M.namespaces||this.xmlns();if(L.namespaces[":length"]>0){T=j.extend({},T);for(ah in L.namespaces){if(ah!==":length"){T[ah]=L.namespaces[ah]}}}M.curieOptions=j.extend({},m,{reserved:[],namespaces:T,base:this.base()});af=j.extend({},M.curieOptions,{reserved:I});Q=w(this,M);ai=u(this,M);if(Q.skip){N=M.forward;Z=M.backward;Q=M.subject;K=M.object}else{Q=Q.subject;if(V.length>0||S.length>0){U=M.subject||w(this.parent()).subject;for(ad=0;ad<V.length;ad+=1){ae=j.rdf.triple(U,V[ad],Q,{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}for(ad=0;ad<S.length;ad+=1){ae=j.rdf.triple(Q,S[ad],U,{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}}K=C(this,M);W=r(aa["typeof"],this,false,M.curieOptions);for(ad=0;ad<W.length;ad+=1){ae=j.rdf.triple(Q,j.rdf.type,W[ad],{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}R=r(aa.property,this,true,M.curieOptions);if(R.length>0){X=aa.datatype;ac=aa.content;Y=this.text().replace(/"/g,'\\"');if(X!==undefined&&X!==""){X=j.curie(X,M.curieOptions);if(X.toString()===G){ag=j.rdf.literal(B(this),{datatype:G})}else{if(ac!==undefined){ag=j.rdf.literal(ac,{datatype:X})}else{ag=j.rdf.literal(Y,{datatype:X})}}}else{if(ac!==undefined){if(ai===undefined){ag=j.rdf.literal('"'+ac+'"')}else{ag=j.rdf.literal(ac,{lang:ai})}}else{if(O.length===0||X===""){ai=u(this,M);if(ai===undefined){ag=j.rdf.literal('"'+Y+'"')}else{ag=j.rdf.literal(Y,{lang:ai})}}else{ag=j.rdf.literal(B(this),{datatype:G})}}}for(ad=0;ad<R.length;ad+=1){ae=j.rdf.triple(Q,R[ad],ag,{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}}N=r(aa.rel,this,true,af);Z=r(aa.rev,this,true,af);if(aa.resource!==undefined||aa.href!==undefined){if(N!==undefined){for(ad=0;ad<N.length;ad+=1){ae=j.rdf.triple(Q,N[ad],K,{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}}N=[];if(Z!==undefined){for(ad=0;ad<Z.length;ad+=1){ae=j.rdf.triple(K,Z[ad],Q,{source:this[0]});ae=P.call(ae,this.get(0),ae);if(ae!==undefined&&ae!==null){ab=ab.concat(ae)}}}Z=[]}}O.each(function(){ab=ab.concat(H.call(j(this),{forward:N,backward:Z,subject:Q,object:K||Q,lang:ai,namespaces:T,callback:P}))});return ab},y=function(K){var L,M;if(K&&K.about!==undefined){M=z(this).atts;if(K.about===null){return M.property!==undefined||M.rel!==undefined||M.rev!==undefined||M["typeof"]!==undefined}else{return w(this,{atts:M}).subject.value===K.about}}else{if(K&&K.type!==undefined){L=D(this,"typeof");if(L!==undefined){return K.type===null?true:this.curie(L)===K.type}return false}else{return H.call(this,K)}}},F=1,t=function(O,L,N){var K,M,P;try{M=O.createCurie(N)}catch(Q){if(N.toString()===G){O.attr("xmlns:rdf",J.rdf);M="rdf:XMLLiteral"}else{K=/^(.+[\/#])([^#]+)$/.exec(N);O.attr("xmlns:ns"+F,K[1]);M="ns"+F+":"+K[2];F+=1}}P=D(O,L);if(P!==undefined){if(j.inArray(M,P.split(/\s+/))===-1){O.attr(L,P+" "+M)}}else{O.attr(L,M)}},o=function(M,K,N){var L;if(N.type==="bnode"){L="[_:"+N.id+"]"}else{L=j(M).base().relative(N.value)}M.attr(K,L)},b=function(M,K){var L=w(M).subject;if(K!==L){o(M,"about",K)}M.removeData("rdfa.subject")},c=function(L,K){var M=C(L);if(K!==M){o(L,"resource",K)}L.removeData("rdfa.objectResource")},a=function(K,L){K.wrapInner("<span></span>").children("span").attr("lang",L);return K},k=function(V){var P,S,L,O,Y,W,M,Q,K,N,U,R,T,X=this.xmlns();Y=this;T=z(this).atts;if(typeof V==="string"){V=j.rdf.triple(V,{namespaces:X,base:this.base()})}else{if(V.rdfquery){k.call(this,V.sources().get(0));return this}else{if(V.length){for(R=0;R<V.length;R+=1){k.call(this,V[R])}return this}}}S=T.rel!==undefined||T.rev!==undefined;L=S||T.property!==undefined||T["typeof"]!==undefined;if(V.object.type!=="literal"){W=w(this,{atts:T},true).subject;Q=C(this,{atts:T},true);O=!L&&T.resource===undefined;M=W===V.subject;K=Q===V.object;if(V.property===j.rdf.type){if(M){t(this,"typeof",V.object.value)}else{if(L){Y=this.wrapInner("<span />").children("span");t(Y,"typeof",V.object.value);if(Q!==V.subject){b(Y,V.subject)}}else{t(this,"typeof",V.object.value);b(this,V.subject)}}}else{if(M){if(K){t(this,"rel",V.property.value)}else{if(O||!L){t(this,"rel",V.property.value);c(this,V.object)}else{Y=this.wrap("<span />").parent();t(Y,"rev",V.property.value);b(Y,V.object)}}}else{if(W===V.object){if(Q===V.subject){t(this,"rev",V.property.value)}else{if(O||!L){t(this,"rev",V.property.value);c(this,V.subject)}else{Y=this.wrap("<span />").parent();t(Y,"rel",V.property.value);b(Y,V.subject)}}}else{if(K){if(L){Y=this.wrapInner("<span />").children("span");t(Y,"rev",V.property.value);c(Y,V.subject);Y=Y.wrapInner("<span />").children("span");b(Y,V.object);Y=this}else{b(this,V.subject);t(this,"rel",V.property.value)}}else{if(Q===V.subject){if(L){Y=this.wrapInner("<span />").children("span");t(Y,"rel",this.property.value);c(Y,V.object);Y=Y.wrapInner("<span />").children("span");b(Y,Q);Y=this}else{b(this,V.object);t(this,"rev",V.property.value)}}else{if(L){Y=this.wrapInner("<span />").children("span");t(Y,"rel",V.property.value);b(Y,V.subject);c(Y,V.object);if(Y.children("*").length>0){Y=this.wrapInner("<span />").children("span");b(Y,W)}Y=this}else{t(Y,"rel",V.property.value);b(this,V.subject);c(this,V.object);if(this.children("*").length>0){Y=this.wrapInner("<span />").children("span");b(Y,W);Y=this}}}}}}}}else{W=w(this,{atts:T}).subject;Q=C(this,{atts:T});M=W===V.subject;P=this.text()!==V.object.value;if(T.property!==undefined){U=T.content;K=U!==undefined?U===V.object.value:!P;if(M&&K){t(this,"property",V.property.value)}else{Y=this.wrapInner("<span />").children("span");return k.call(Y,V)}}else{if(Q===V.subject){Y=this.wrapInner("<span />").children("span");return k.call(Y,V)}t(this,"property",V.property.value);b(this,V.subject);if(P){if(V.object.datatype&&V.object.datatype.toString()===G){this.html(V.object.value)}else{this.attr("content",V.object.value)}}N=u(this);if(V.object.lang){if(N!==V.object.lang){this.attr("lang",V.object.lang);if(P){a(this,N)}}}else{if(V.object.datatype){t(this,"datatype",V.object.datatype)}else{if(!P){this.attr("datatype","")}if(N!==undefined){this.attr("lang","");if(P){a(this,N)}}}}}}this.parents().andSelf().trigger("rdfChange");return Y},n=function(Q){var O,R,P,K,L,N,M=this.xmlns();R=z(this).atts;if(Q.length){for(i=0;i<Q.length;i+=1){n.call(this,Q[i])}return this}hasRelation=R.rel!==undefined||R.rev!==undefined;hasRDFa=hasRelation||R.property!==undefined||R["typeof"]!==undefined;if(hasRDFa){if(Q.property!==undefined){if(R.property!==undefined){P=g(R.property,Q.property,{namespaces:M});if(P===""){this.removeAttr("property")}else{this.attr("property",P)}}if(R.rel!==undefined){K=g(R.rel,Q.property,{namespaces:M});if(K===""){this.removeAttr("rel")}else{this.attr("rel",K)}}if(R.rev!==undefined){L=g(R.rev,Q.property,{namespaces:M});if(L===""){this.removeAttr("rev")}else{this.attr("rev",L)}}}if(Q.type!==undefined){if(R["typeof"]!==undefined){N=g(R["typeof"],Q.type,{namespaces:M});if(N===""){this.removeAttr("typeof")}else{this.attr("typeof",N)}}}if(R.property===this.attr("property")&&R.rel===this.attr("rel")&&R.rev===this.attr("rev")&&R["typeof"]===this.attr("typeof")){return n.call(this.parent(),Q)}}this.parents().andSelf().trigger("rdfChange");return this};j.fn.rdfa=function(K){if(K===undefined){var L=j.map(j(this),function(M){return H.call(j(M))});return j.rdf({triples:L})}else{j(this).each(function(){k.call(j(this),K)});return this}};j.fn.removeRdfa=function(K){j(this).each(function(){n.call(j(this),K)});return this};j.rdf.gleaners.push({name:"rdfa",gleaner:y})})(jQuery);(function(d){var m={schema:"http://schema.org/"},g=function(){if(this.attr("itemid")){return d.rdf.resource("<"+this.attr("itemid")+">")}else{return d.rdf.blank("[]")}},e=function(){var o=this.attr("itemtype");if(o){return d.rdf.resource("<"+o+">")}else{return d.rdf.resource("<"+m.schema+"Thing>")}},l=function(){var o=this.attr("itemprop");if(o){return d.rdf.resource("<"+m.schema+o+">")}return undefined},b=function(o){return"<"+o+">"},a=function(){var o=this.get(0).nodeName.toLowerCase();var q;if(o==="meta"){return d.rdf.literal(this.attr("content")===undefined?'""':this.attr("content"))}else{if(o==="audio"||o==="embed"||o==="iframe"||o==="img"||o==="source"||o==="track"||o==="video"){if(this.attr("src")){return d.rdf.resource(b(this.attr("src")))}else{return d.rdf.resource("<>")}}else{if(o==="a"||o==="area"||o==="link"){if(this.attr("href")){return d.rdf.resource(b(this.attr("href")))}else{return d.rdf.resource("<>")}}else{if(o==="object"){if(this.attr("data")){return d.rdf.resource(b(this.attr("data")))}else{return d.rdf.resource("<>")}}else{if(o==="time"&&this.attr("datetime")!==undefined){if(this.attr("datetime")){return d.rdf.literal('"'+this.attr("datetime")+'"')}else{return d.rdf.literal('""')}}else{return d.rdf.literal('"'+this.text()+'"')}}}}}},k=function(q){var w=[];var s=l.call(this);if(s!==undefined){if(this.attr("itemscope")===undefined){var r=a.call(this);var u=d.rdf.triple(q.subject,s,r,{namespaces:m});w.push(u)}else{var o=c.call(this,{subject:q.subject,property:s});w=w.concat(o.triples);return w}}var t=d.map(this.children(),function(x){return k.call(d(x),q)});w=w.concat(t);return w},c=function(s){var w=[];if(!s){s={}}var r=g.call(this);if(s.subject&&s.property){w.push(d.rdf.triple(s.subject,s.property,r,{namespaces:m}))}var t=e.call(this);w.push(d.rdf.triple(r,d.rdf.type,t,{namespaces:m}));if(this.attr("itemref")!==undefined){var o=d.map(this.attr("itemref").split(" "),function(y,x){return"#"+y}).join(", ");var q=k.call(d(o),{subject:r});w=w.concat(q)}var u=d.map(this.children(),function(x){return k.call(d(x),{subject:r})});w=w.concat(u);return{triples:w}},j=function(o){if(this.attr("itemscope")===undefined){console.log("[DEBUG]","No itemscope attribute found!");return[]}else{var q=c.call(d(this)).triples;console.log("[DEBUG]","Extracted ",q.length," triple(s)!",q);return q}},n=function(o){if(o&&o.about!==undefined){if(o.about===null){return this.attr("itemprop")!==undefined||this.attr("itemref")!==undefined||this.attr("itemtype")!==undefined}else{return g.call(this)===o.about}}else{if(o&&o.type!==undefined){var q=e.call(this);if(q!==undefined){return o.type===null?true:(q===o.type)}return false}else{return j.call(this,o)}}},h=function(o){return this},f=function(o){return this};d.fn.microdata=function(q,o){if(q===undefined){var r=d.map(d(this),function(s){return j.call(d(s))});return d.rdf({triples:r})}else{d(this).each(function(){h.call(d(this),q,o)});return this}};d.fn.removeMicrodata=function(o){d(this).each(function(){f.call(d(this),o)});return this};d.rdf.gleaners.push({name:"microdata",gleaner:n})})(jQuery);(function(b){var a=1;b.rdf.ruleset=function(d,c){return new b.rdf.ruleset.fn.init(d,c)};b.rdf.ruleset.fn=b.rdf.ruleset.prototype={init:function(f,c){var d,e=b.extend({},b.rdf.ruleset.defaults,c);f=f||[];this.baseURI=e.base;this.namespaces=b.extend({},e.namespaces);this.rules=[];for(d=0;d<f.length;d+=1){this.add.apply(this,f[d])}return this},base:function(c){if(c===undefined){return this.baseURI}else{this.baseURI=c;return this}},prefix:function(d,c){if(d===undefined){return this.namespaces}else{if(c===undefined){return this.namespaces[d]}else{this.namespaces[d]=c;return this}}},size:function(){return this.rules.length},add:function(c,e){var d;if(e===undefined&&c.rules){this.rules=this.rules.concat(c.rules)}else{if(e===undefined&&c.lhs){d=c}else{d=b.rdf.rule(c,e,{namespaces:this.prefix(),base:this.base()})}if(b.inArray(d,this.rules)===-1){this.rules.push(d)}}return this},run:function(j,e){var f,h,d,g=b.extend({limit:50},e),c=g.limit;do{d=j.size();for(f=0;f<this.rules.length;f+=1){h=this.rules[f];h.run(j)}c-=1}while(j.size()>d&&c>0);return this}};b.rdf.ruleset.fn.init.prototype=b.rdf.ruleset.fn;b.rdf.ruleset.defaults={base:b.uri.base(),namespaces:{}};b.rdf.rule=function(c,e,d){return new b.rdf.rule.fn.init(c,e,d)};b.rdf.rule.fn=b.rdf.rule.prototype={init:function(c,h,e){var f=b.extend({},b.rdf.rule.defaults,e),g=[],d=false;if(typeof c==="string"){c=[c]}if(typeof h==="string"){h=[h]}this.lhs=b.map(c,function(j){if(b.isArray(j)){return[j]}else{if(b.isFunction(j)){return j}else{j=b.rdf.pattern(j,f);if(typeof j.subject==="string"){g.push(j.subject)}if(typeof j.property==="string"){g.push(j.property)}if(typeof j.object==="string"){g.push(j.object)}return j}}});g=b.unique(g);if(b.isFunction(h)){this.rhs=h}else{this.rhs=b.map(h,function(j){j=b.rdf.pattern(j,f);if((typeof j.subject==="string"&&b.inArray(j.subject,g)===-1)||(typeof j.property==="string"&&b.inArray(j.property,g)===-1)||(typeof j.object==="string"&&b.inArray(j.object,g)===-1)){throw"Bad Rule: Right-hand side of the rule contains a reference to an unbound wildcard"}else{if(j.subject.type==="bnode"||j.property.type==="bnode"||j.object.type==="bnode"){d=true}}return j})}this.rhsBlanks=d;this.cache={};return this},run:function(E,e){var f=b.rdf({databank:E}),A,h=b.extend({limit:50},e),C=h.limit,d,z,y,B,k,r,u,n,D=this.rhsBlanks,l,c,x,m;if(this.cache[E.id]===undefined){this.cache[E.id]={}}for(z=0;z<this.lhs.length;z+=1){A=this.lhs[z];if(b.isArray(A)){f=f.filter.apply(f,A)}else{if(b.isFunction(A)){f=f.filter.call(f,A)}else{f=f.where(this.lhs[z])}}}do{d=f.length;c=f.sources();for(z=0;z<d;z+=1){x=c[z];m=true;l=this.cache[E.id];for(y=0;y<x.length;y+=1){if(l[x[y]]===undefined){l[x[y]]={}}else{if(y===x.length-1){m=false}}l=l[x[y]]}if(m){n=f.eq(z);if(D){for(y=0;y<this.rhs.length;y+=1){B=this.rhs[y];k=B.subject;r=B.property;u=B.object;if(k.type==="bnode"){k=b.rdf.blank(""+k+a)}if(r.type==="bnode"){r=b.rdf.blank(""+r+a)}if(u.type==="bnode"){u=b.rdf.blank(""+u+a)}B=b.rdf.pattern(k,r,u);n.add(B)}a+=1}else{if(b.isFunction(this.rhs)){var w=n.map(this.rhs);for(var g=0;g<w.length;g++){if((w[g]) instanceof b.rdf.triple){f.add(w[g])}}}else{for(y=0;y<this.rhs.length;y+=1){n.add(this.rhs[y])}}}}}C-=1}while(f.length>d&&C>0);return this}};b.rdf.rule.fn.init.prototype=b.rdf.rule.fn;b.rdf.rule.defaults={base:b.uri.base(),namespaces:{}};b.extend(b.rdf.databank.fn,{reason:function(d,c){d.run(this,c);return this}});b.extend(b.rdf.fn,{reason:function(d,c){d.run(this.databank,c);return this}})})(jQuery);
/*

	jQuery Tags Input Plugin 1.3.3
	
	Copyright (c) 2011 XOXCO, Inc
	
	Documentation for this plugin lives here:
	http://xoxco.com/clickable/jquery-tags-input
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	ben@xoxco.com

*/(function(a){var b=new Array,c=new Array;a.fn.doAutosize=function(b){var c=a(this).data("minwidth"),d=a(this).data("maxwidth"),e="",f=a(this),g=a("#"+a(this).data("tester_id"));if(e===(e=f.val()))return;var h=e.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");g.html(h);var i=g.width(),j=i+b.comfortZone>=c?i+b.comfortZone:c,k=f.width(),l=j<k&&j>=c||j>c&&j<d;l&&f.width(j)},a.fn.resetAutosize=function(b){var c=a(this).data("minwidth")||b.minInputWidth||a(this).width(),d=a(this).data("maxwidth")||b.maxInputWidth||a(this).closest(".tagsinput").width()-b.inputPadding,e="",f=a(this),g=a("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:f.css("fontSize"),fontFamily:f.css("fontFamily"),fontWeight:f.css("fontWeight"),letterSpacing:f.css("letterSpacing"),whiteSpace:"nowrap"}),h=a(this).attr("id")+"_autosize_tester";!a("#"+h).length>0&&(g.attr("id",h),g.appendTo("body")),f.data("minwidth",c),f.data("maxwidth",d),f.data("tester_id",h),f.css("width",c)},a.fn.addTag=function(d,e){return e=jQuery.extend({focus:!1,callback:!0},e),this.each(function(){var f=a(this).attr("id"),g=a(this).val().split(b[f]);g[0]==""&&(g=new Array),d=jQuery.trim(d);if(e.unique){var h=a(this).tagExist(d);h==1&&a("#"+f+"_tag").addClass("not_valid")}else var h=!1;if(d!=""&&h!=1){a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"),a("<a>",{href:"#",title:"Removing tag",text:"x"}).click(function(){return a("#"+f).removeTag(escape(d))})).insertBefore("#"+f+"_addTag"),g.push(d),a("#"+f+"_tag").val(""),e.focus?a("#"+f+"_tag").focus():a("#"+f+"_tag").blur(),a.fn.tagsInput.updateTagsField(this,g);if(e.callback&&c[f]&&c[f].onAddTag){var i=c[f].onAddTag;i.call(this,d)}if(c[f]&&c[f].onChange){var j=g.length,i=c[f].onChange;i.call(this,a(this),g[j-1])}}}),!1},a.fn.removeTag=function(d){return d=unescape(d),this.each(function(){var e=a(this).attr("id"),f=a(this).val().split(b[e]);a("#"+e+"_tagsinput .tag").remove(),str="";for(i=0;i<f.length;i++)f[i]!=d&&(str=str+b[e]+f[i]);a.fn.tagsInput.importTags(this,str);if(c[e]&&c[e].onRemoveTag){var g=c[e].onRemoveTag;g.call(this,d)}}),!1},a.fn.tagExist=function(c){var d=a(this).attr("id"),e=a(this).val().split(b[d]);return jQuery.inArray(c,e)>=0},a.fn.importTags=function(b){id=a(this).attr("id"),a("#"+id+"_tagsinput .tag").remove(),a.fn.tagsInput.importTags(this,b)},a.fn.tagsInput=function(d){var e=jQuery.extend({interactive:!0,defaultText:"add a tag",minChars:0,width:"300px",height:"100px",autocomplete:{selectFirst:!1},hide:!0,delimiter:",",unique:!0,removeWithBackspace:!0,placeholderColor:"#666666",autosize:!0,comfortZone:20,inputPadding:12},d);return this.each(function(){e.hide&&a(this).hide();var d=a(this).attr("id");if(!d||b[a(this).attr("id")])d=a(this).attr("id","tags"+(new Date).getTime()).attr("id");var f=jQuery.extend({pid:d,real_input:"#"+d,holder:"#"+d+"_tagsinput",input_wrapper:"#"+d+"_addTag",fake_input:"#"+d+"_tag"},e);b[d]=f.delimiter;if(e.onAddTag||e.onRemoveTag||e.onChange)c[d]=new Array,c[d].onAddTag=e.onAddTag,c[d].onRemoveTag=e.onRemoveTag,c[d].onChange=e.onChange;var g='<div id="'+d+'_tagsinput" class="tagsinput"><div id="'+d+'_addTag">';e.interactive&&(g=g+'<input id="'+d+'_tag" value="" data-default="'+e.defaultText+'" />'),g+='</div><div class="tags_clear"></div></div>',a(g).insertAfter(this),a(f.holder).css("width",e.width),a(f.holder).css("min-height",e.height),a(f.holder).css("height","100%"),a(f.real_input).val()!=""&&a.fn.tagsInput.importTags(a(f.real_input),a(f.real_input).val());if(e.interactive){a(f.fake_input).val(a(f.fake_input).attr("data-default")),a(f.fake_input).css("color",e.placeholderColor),a(f.fake_input).resetAutosize(e),a(f.holder).bind("click",f,function(b){a(b.data.fake_input).focus()}),a(f.fake_input).bind("focus",f,function(b){a(b.data.fake_input).val()==a(b.data.fake_input).attr("data-default")&&a(b.data.fake_input).val(""),a(b.data.fake_input).css("color","#000000")});if(e.autocomplete_url!=undefined){autocomplete_options={source:e.autocomplete_url};for(attrname in e.autocomplete)autocomplete_options[attrname]=e.autocomplete[attrname];jQuery.Autocompleter!==undefined?(a(f.fake_input).autocomplete(e.autocomplete_url,e.autocomplete),a(f.fake_input).bind("result",f,function(b,c,f){c&&a("#"+d).addTag(c[0]+"",{focus:!0,unique:e.unique})})):jQuery.ui.autocomplete!==undefined&&(a(f.fake_input).autocomplete(autocomplete_options),a(f.fake_input).bind("autocompleteselect",f,function(b,c){return a(b.data.real_input).addTag(c.item.value,{focus:!0,unique:e.unique}),!1}))}else a(f.fake_input).bind("blur",f,function(b){var c=a(this).attr("data-default");return a(b.data.fake_input).val()!=""&&a(b.data.fake_input).val()!=c?b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:e.unique}):(a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")),a(b.data.fake_input).css("color",e.placeholderColor)),!1});a(f.fake_input).bind("keypress",f,function(b){if(b.which==b.data.delimiter.charCodeAt(0)||b.which==13)return b.preventDefault(),b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:e.unique}),a(b.data.fake_input).resetAutosize(e),!1;b.data.autosize&&a(b.data.fake_input).doAutosize(e)}),f.removeWithBackspace&&a(f.fake_input).bind("keydown",function(b){if(b.keyCode==8&&a(this).val()==""){b.preventDefault();var c=a(this).closest(".tagsinput").find(".tag:last").text(),d=a(this).attr("id").replace(/_tag$/,"");c=c.replace(/[\s]+x$/,""),a("#"+d).removeTag(escape(c)),a(this).trigger("focus")}}),a(f.fake_input).blur(),f.unique&&a(f.fake_input).keydown(function(b){(b.keyCode==8||String.fromCharCode(b.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/))&&a(this).removeClass("not_valid")})}}),this},a.fn.tagsInput.updateTagsField=function(c,d){var e=a(c).attr("id");a(c).val(d.join(b[e]))},a.fn.tagsInput.importTags=function(d,e){a(d).val("");var f=a(d).attr("id"),g=e.split(b[f]);for(i=0;i<g.length;i++)a(d).addTag(g[i],{focus:!1,callback:!1});if(c[f]&&c[f].onChange){var h=c[f].onChange;h.call(d,d,g[i])}}})(jQuery);
/*   Annotate - a text enhancement interaction jQuery UI widget
#     (c) 2011 Szaby Gruenwald, IKS Consortium
#     Annotate may be freely distributed under the MIT license
*/((function(){var a,b,c,d,e,f,g,h,i,j,k=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};e={rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",enhancer:"http://fise.iks-project.eu/ontology/",dcterms:"http://purl.org/dc/terms/",rdfs:"http://www.w3.org/2000/01/rdf-schema#",skos:"http://www.w3.org/2004/02/skos/core#"},f=this,d=f.jQuery,a=f.Backbone,i=f._,c=f.VIE,h=new c,h.use(new h.StanbolService({url:"http://dev.iks-project.eu:8080",proxyDisabled:!0})),h.namespaces.add("skos",e.skos),(j=String.prototype).trim==null&&(j.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),b=function(){function a(a){this.vie=a.vie,this.logger=a.logger}return a.prototype._entities=function(){var a;return(a=window.entityCache)!=null?a:window.entityCache={}},a.prototype.get=function(a,b,c,d){var e,f=this;a=a.replace(/^<|>$/g,""),this._entities()[a]&&this._entities()[a].status==="done"?typeof c=="function"&&c.apply(b,[this._entities()[a].entity]):this._entities()[a]&&this._entities()[a].status==="error"?typeof d=="function"&&d.apply(b,["error"]):this._entities()[a]||(this._entities()[a]={status:"pending",uri:a},e=this,this.vie.load({entity:a}).using("stanbol").execute().success(function(b){return i.defer(function(){var c,d;return c=f._entities()[a],d=i.detect(b,function(b){if(b.getSubject()==="<"+a+">")return!0}),d?(c.entity=d,c.status="done",$(c).trigger("done",d)):(f.logger.warn("couldn''t load "+a,b),c.status="not found")})}).fail(function(b){return i.defer(function(){var c;return f.logger.error("couldn't load "+a),c=f._entities()[a],c.status="error",$(c).trigger("fail",b)})}));if(this._entities()[a]&&this._entities()[a].status==="pending")return $(this._entities()[a]).bind("done",function(a,d){if(typeof c=="function")return c.apply(b,[d])}).bind("fail",function(a,c){if(typeof c=="function")return c.apply(b,[c])})},a}(),g=function(a){var b;return b=a.substring(a.lastIndexOf("#")+1),b.substring(b.lastIndexOf("/")+1)},d.widget("IKS.annotate",{__widgetName:"IKS.annotate",options:{vie:h,vieServices:["stanbol"],autoAnalyze:!1,showTooltip:!0,debug:!1,depictionProperties:["foaf:depiction","schema:thumbnail"],labelProperties:["rdfs:label","skos:prefLabel","schema:name","foaf:name"],descriptionProperties:["rdfs:comment","skos:note","schema:description","skos:definition",{property:"skos:broader",makeLabel:function(a){var b;return b=i(a).map(function(a){return a.replace(/<.*[\/#](.*)>/,"$1").replace(/_/g,"&nbsp;")}),"Subcategory of "+b.join(", ")+"."}},{property:"dcterms:subject",makeLabel:function(a){var b;return b=i(a).map(function(a){return a.replace(/<.*[\/#](.*)>/,"$1").replace(/_/g,"&nbsp;")}),"Subject(s): "+b.join(", ")+"."}}],fallbackLanguage:"en",ns:{dbpedia:"http://dbpedia.org/ontology/",skos:"http://www.w3.org/2004/02/skos/core#"},typeFilter:null,annotationInteractionWidget:"annotationInteraction",getTypes:function(){return[{uri:""+this.ns.dbpedia+"Place",label:"Place"},{uri:""+this.ns.dbpedia+"Person",label:"Person"},{uri:""+this.ns.dbpedia+"Organisation",label:"Organisation"},{uri:""+this.ns.skos+"Concept",label:"Concept"}]},getSources:function(){return[{uri:"http://dbpedia.org/resource/",label:"dbpedia"},{uri:"http://sws.geonames.org/",label:"geonames"}]}},_create:function(){var a;return a=this,this._logger=this.options.debug?console:{info:function(){},warn:function(){},error:function(){},log:function(){}},this.entityCache=new b({vie:this.options.vie,logger:this._logger}),this.options.autoAnalyze&&this.enable(),d().tooltip||(this.options.showTooltip=!1,this._logger.warn("the used jQuery UI doesn't support tooltips, disabling.")),this._initExistingAnnotations()},_destroy:function(){return this.disable(),$(":IKS-annotationSelector",this.element).each(function(){if($(this).data().annotationSelector)return $(this).annotationSelector("destroy")}),this._destroyExistingAnnotationInteractionWidgets()},enable:function(b){var c,d=this;return c=this.element,this.options.vie.analyze({element:this.element}).using(this.options.vieServices).execute().success(function(e){return i.defer(function(){var f,g,h,j,k,l,m,n,o,p;g=Stanbol.getEntityAnnotations(e);for(l=0,n=g.length;l<n;l++){f=g[l],k=f.get("dcterms:relation");if(!k){d._logger.error("For "+f.getSubject()+" dcterms:relation is not set! This makes this EntityAnnotation unusable!",f);continue}p=i.flatten([k]);for(m=0,o=p.length;m<o;m++){h=p[m],h instanceof a.Model||(h=f.vie.entities.get(h));if(!h)continue;i(i.flatten([h])).each(function(a){return a.setOrAdd({entityAnnotation:f.getSubject()})})}}j=Stanbol.getTextAnnotations(e),j=d._filterByType(j),j=i(j).filter(function(a){return a.getSelectedText&&a.getSelectedText()?!0:!1}),i(j).each(function(a){return d._logger.info(a._enhancement,"confidence",a.getConfidence(),"selectedText",a.getSelectedText(),"type",a.getType(),"EntityEnhancements",a.getEntityEnhancements()),d._processTextEnhancement(a,c)}),d._trigger("success",!0);if(typeof b=="function")return b(!0)})}).fail(function(a){return typeof b=="function"&&b(!1,a),d._trigger("error",a),d._logger.error("analyze failed",a.responseText,a)})},disable:function(){return $(":IKS-annotationSelector",this.element).each(function(){if($(this).data().annotationSelector)return $(this).annotationSelector("disable")})},_initExistingAnnotations:function(){return this.existingAnnotations=d("a[about][typeof]",this.element),this._logger.info(this.existingAnnotations),this.existingAnnotations[this.options.annotationInteractionWidget](this.options)},_destroyExistingAnnotationInteractionWidgets:function(){return this.existingAnnotations[this.options.annotationInteractionWidget]("destroy")},acceptAll:function(a){var b;return b={updated:[],accepted:0},$(":IKS-annotationSelector",this.element).each(function(){var a;if($(this).data().annotationSelector){a=$(this).annotationSelector("acceptBestCandidate");if(a)return b.updated.push(this),b.accepted++}}),a(b)},_processTextEnhancement:function(a,b){var c,d,e,f,h,i,j,k,l,m,n,o,p=this;if(!a.getSelectedText()){this._logger.warn("textEnh",a,"doesn't have selected-text!");return}e=$(this._getOrCreateDomElement(b[0],a.getSelectedText(),{createElement:"span",createMode:"existing",context:a.getContext(),start:a.getStart(),end:a.getEnd()})),h=a.getType()||"Other",j=this,e.addClass("entity");for(k=0,m=h.length;k<m;k++)i=h[k],e.addClass(g(i).toLowerCase());a.getEntityEnhancements().length&&e.addClass("withSuggestions"),o=a.getEntityEnhancements();for(l=0,n=o.length;l<n;l++)c=o[l],d=c.getUri(),this.entityCache.get(d,c,function(a){return"<"+d+">"===a.getSubject()?p._logger.info("entity "+d+" is loaded:",a.as("JSON")):j._logger.info("forwarded entity for "+d+" loaded:",a.getSubject())});return f=this.options,f.cache=this.entityCache,f.annotateElement=this.element,e.annotationSelector(f).annotationSelector("addTextEnhancement",a)},_filterByType:function(a){var b=this;return this.options.typeFilter?i.filter(a,function(a){var c,d,e,f,g;if(f=b.options.typeFilter,k.call(a.getType(),f)>=0)return!0;g=b.options.typeFilter;for(d=0,e=g.length;d<e;d++){c=g[d];if(k.call(a.getType(),c)>=0)return!0}}):a},_getOrCreateDomElement:function(a,b,c){var d,e,f,g,h,j,k,l,m,n;c==null&&(c={}),j=function(a,b){var c,d,e,f;e=[],c=0,f=[];while(a.indexOf(b,c+1)!==-1)d=a.indexOf(b,c+1),e.push(d),f.push(c=d);return f},f=function(a,b){return i(a).sortedIndex(b)},g=function(a,b,c){var d,e,g,h,i;return d=j(a,b),i=f(d,c),d.length===1?d[0]:i===d.length?d[i-1]:(h=i-1,e=c-d[h],g=d[i]-c,g>e?d[h]:d[i])},d=a,m=function(a){return $(a).text().replace(/\n/g," ")};if(m(a).indexOf(b)===-1)return this._logger.error("'"+b+"' doesn't appear in the text block."),$();l=c.start+m(a).indexOf(m(a).trim()),l=g(m(a),b,l),k=0;while(m(d).indexOf(b)!==-1&&d.nodeName!=="#text")d=i(d.childNodes).detect(function(a){var c;return c=m(a).lastIndexOf(b),c>=l-k?!0:(k+=m(a).length,!1)});return c.createMode==="existing"&&m($(d).parent())===b?$(d).parent()[0]:(k=l-k,e=b.length,n=m(d).substring(k,k+e),n===b?(d.splitText(k+e),h=document.createElement(c.createElement||"span"),h.innerHTML=b,$(d).parent()[0].replaceChild(h,d.splitText(k)),$(h)):this._logger.warn("dom element creation problem: "+n+" isnt "+b))}}),d.widget("IKS.annotationInteraction",{__widgetName:"IKS.annotationInteraction",options:{ns:{dbpedia:"http://dbpedia.org/ontology/",skos:"http://www.w3.org/2004/02/skos/core#"},getTypes:function(){return[{uri:""+this.ns.dbpedia+"Place",label:"Place"},{uri:""+this.ns.dbpedia+"Person",label:"Person"},{uri:""+this.ns.dbpedia+"Organisation",label:"Organisation"},{uri:""+this.ns.skos+"Concept",label:"Concept"}]},getSources:function(){return[{uri:"http://dbpedia.org/resource/",label:"dbpedia"},{uri:"http://sws.geonames.org/",label:"geonames"}]}},_create:function(){var a=this;return this._logger=this.options.debug?console:{info:function(){},warn:function(){},error:function(){},log:function(){}},this.vie=this.options.vie,this._loadEntity(function(b){return a.entity=b,a._initTooltip()})},_destroy:function(){return this.element.tooltip("destroy")},_initTooltip:function(){var a,b=this;a=this,this._logger.info("init tooltip for",this.element);if(this.options.showTooltip)return d(this.element).tooltip({items:"[about]",hide:{effect:"hide",delay:50},show:{effect:"show",delay:50},content:function(c){var d;return d=b.element.attr("about"),b._logger.info("tooltip uri:",d),a._createPreview(d)}})},_createPreview:function(a){var b,c,d,e;return d="",e=100,b=this._getDepiction(this.entity,e),b&&(d+="<img style='float:left;padding: 5px;width: "+e+"px' src='"+b.substring(1,b.length-1)+"'/>"),c=this._getDescription(this.entity),c||(this._logger.warn("No description found for",this.entity),c="No description found."),d+="<div style='padding 5px;width:250px;float:left;'><small>"+c+"</small></div>",this._logger.info("tooltip for "+a+": cacheEntry loaded",this.entity),d},_loadEntity:function(a){var b=this;return this.vie.use(new this.vie.RdfaService),this.vie.load({element:this.element}).using("rdfa").execute().success(function(c){return b._logger.info("found",c,b.element,b.vie),i(c).each(function(c){return b.vie.load({entity:c.getSubject()}).using("stanbol").execute().success(function(b){var d;return d=i(b).detect(function(a){return c.getSubject()===a.getSubject()}),a(d)}).fail(function(a){return b._logger.error("error getting entity from stanbol",a,c.getSubject())})})}).fail(function(a){return b._logger.error("error reading RDFa",a,b.element)})},_getUserLang:function(){var a;return a=window.navigator.language||window.navigator.userLanguage,a.split("-")[0]},_getDepiction:function(a,b){var c,d,e,f;f=this.options.depictionProperties,d=i(f).detect(function(b){if(a.get(b))return!0});if(d&&(e=i([a.get(d)]).flatten()))return c=i(e).detect(function(a){a=(typeof a.getSubject=="function"?a.getSubject():void 0)||a;if(a.indexOf("thumb")!==-1)return!0}).replace(/[0-9]{2..3}px/,""+b+"px"),c},_getLabel:function(a){var b,c;return b=this.options.labelProperties,c=[this._getUserLang(),this.options.fallbackLanguage],this._getPreferredLangForPreferredProperty(a,b,c)},_getDescription:function(a){var b,c;return b=this.options.descriptionProperties,c=[this._getUserLang(),this.options.fallbackLanguage],this._getPreferredLangForPreferredProperty(a,b,c)},_getPreferredLangForPreferredProperty:function(a,b,c){var d,e,f,g,h,j,k,l,m,n=this;for(j=0,l=c.length;j<l;j++){f=c[j];for(k=0,m=b.length;k<m;k++){g=b[k];if(typeof g=="string"&&a.get(g)){e=i.flatten([a.get(g)]),d=i(e).detect(function(a){typeof a=="string"&&a.toString().indexOf("@"+f)>-1&&!0;if(typeof a=="object"&&a["@language"]===f)return!0});if(d)return d.toString().replace(/(^\"*|\"*@..$)/g,"")}else if(typeof g=="object"&&a.get(g.property))return h=i.flatten([a.get(g.property)]),h=i(h).map(function(a){return a.isEntity?a.getSubject():a}),g.makeLabel(h)}}return""}}),d.widget("IKS.annotationSelector",{__widgetName:"IKS.annotationSelector",options:{ns:{dbpedia:"http://dbpedia.org/ontology/",skos:"http://www.w3.org/2004/02/skos/core#"},getTypes:function(){return[{uri:""+this.ns.dbpedia+"Place",label:"Place"},{uri:""+this.ns.dbpedia+"Person",label:"Person"},{uri:""+this.ns.dbpedia+"Organisation",label:"Organisation"},{uri:""+this.ns.skos+"Concept",label:"Concept"}]},getSources:function(){return[{uri:"http://dbpedia.org/resource/",label:"dbpedia"},{uri:"http://sws.geonames.org/",label:"geonames"}]}},_create:function(){var a=this;this.enableEditing(),this._logger=this.options.debug?console:{info:function(){},warn:function(){},error:function(){},log:function(){}};if(this.isAnnotated())return this._initTooltip(),this.linkedEntity={uri:this.element.attr("about"),type:this.element.attr("typeof")},this.options.cache.get(this.linkedEntity.uri,this,function(b){var d,e;return d=window.navigator.language||window.navigator.userLanguage,e=d.split("-")[0],a.linkedEntity.label=c.Util.getPreferredLangForPreferredProperty(b,["skos:prefLabel","rdfs:label"],[e,"en"])})},enableEditing:function(){var a=this;return this.element.click(function(b){a._logger.log("click",b,b.isDefaultPrevented());if(!a.dialog&&!!a.dialog)return a.searchEntryField.find(".search").focus(100);a._createDialog(),setTimeout(function(){return a.dialog.open()},220),a.entityEnhancements=a._getEntityEnhancements(),a._createSearchbox();if(a.entityEnhancements.length>0)return a._createMenu()})},disableEditing:function(){return d(this.element).unbind("click")},_destroy:function(){this.disableEditing(),this.menu&&(this.menu.destroy(),this.menu.element.remove(),delete this.menu),this.dialog&&(this.dialog.destroy(),this.dialog.element.remove(),this.dialog.uiDialogTitlebar.remove(),delete this.dialog),this._logger.info("destroy tooltip");if(this.element.data().tooltip)return this.element.tooltip("destroy")},remove:function(a){var b;b=this.element.parent(),this._logger.info("destroy tooltip"),this.element.data().tooltip&&this.element.tooltip("destroy"),!this.isAnnotated()&&this.textEnhancements?this._trigger("decline",a,{textEnhancements:this.textEnhancements}):this._trigger("remove",a,{textEnhancement:this._acceptedTextEnhancement,entityEnhancement:this._acceptedEntityEnhancement,linkedEntity:this.linkedEntity}),this.destroy();if(this.element.qname().name!=="#text")return this.element.replaceWith(document.createTextNode(this.element.text()))},disable:function(){return!this.isAnnotated()&&this.element.qname().name!=="#text"?this.element.replaceWith(document.createTextNode(this.element.text())):this.disableEditing()},isAnnotated:function(){return this.element.attr("about")?!0:!1},annotate:function(a,b){var c,f,h,i,j,k,l,m,n;return i=a.getUri(),h=a.getTextEnhancement().getType()||"",f=this.element.html(),l=a.getTextEnhancement().getType(),l.length||(l=["Other"]),this.element.attr("xmlns:skos",e.skos),k=b.rel||"skos:related",c="entity "+g(l[0]).toLowerCase(),j=$("<a href='"+i+"'            about='"+i+"'            typeof='"+h+"'            rel='"+k+"'            class='"+c+"'>"+f+"</a>"),this._cloneCopyEvent(this.element[0],j[0]),this.linkedEntity={uri:i,type:h,label:a.getLabel()},this.element.replaceWith(j),this.element=j.addClass(b.styleClass),this._logger.info("created annotation in",this.element),this._updateTitle(),this._insertLink(),this._acceptedTextEnhancement=a.getTextEnhancement(),this._acceptedEntityEnhancement=a,m={linkedEntity:this.linkedEntity,textEnhancement:a.getTextEnhancement(),entityEnhancement:a},this.select(m),this._initTooltip(),d(j).annotationSelector(this.options),(n=this.dialog)!=null?n.close():void 0},select:function(a){var b;return b=new d.Event("select"),b.ui=a,this._trigger("select",b,a),d(this.options.annotateElement).trigger("annotateselect",a)},acceptBestCandidate:function(){var a;a=this._getEntityEnhancements();if(!a.length)return;if(this.isAnnotated())return;return this.annotate(a[0],{styleClass:"acknowledged"}),a[0]},addTextEnhancement:function(a){return this.options.textEnhancements=this.options.textEnhancements||[],this.options.textEnhancements.push(a),this.textEnhancements=this.options.textEnhancements},close:function(){var a;return(a=this.dialog)!=null&&typeof a.close=="function"&&a.close(),d(".ui-tooltip").remove()},_initTooltip:function(){var a,b=this;a=this;if(this.options.showTooltip)return this._logger.info("init tooltip for",this.element),d(this.element).tooltip({items:"[about]",hide:{effect:"hide",delay:50},show:{effect:"show",delay:50},content:function(c){var d;return d=b.element.attr("about"),b._logger.info("tooltip uri:",d),a._createPreview(d,c),"loading..."}})},_getEntityEnhancements:function(){var a,b,c,d,e,f,g,h,j,k;a=[],h=this.textEnhancements;for(d=0,f=h.length;d<f;d++){c=h[d],j=c.getEntityEnhancements();for(e=0,g=j.length;e<g;e++)b=j[e],a.push(b)}return k=[],a=i(a).filter(function(a){var b;return b=a.getUri(),i.indexOf(k,b)===-1?(k.push(b),!0):!1}),i(a).sortBy(function(a){return-1*a.getConfidence()})},_typeLabels:function(a){var b,c,d,e=this;return c=this.options.getTypes(),b=i(c).map(function(a){return a.uri}),d=i.intersect(b,a),i(d).map(function(a){var b;return b=i(c).detect(function(b){return b.uri===a}),b.label})},_sourceLabel:function(a){var b,c;return a||this._logger.warn("No source"),a?(c=this.options.getSources(),b=i(c).detect(function(b){return a.indexOf(b.uri)!==-1}),b?b.label:a.split("/")[2]):""},_createDialog:function(){var a,b,c,e=this;return b=this.element.text(),d(".annotateselector-dialog-content").dialog("destroy").remove(),a=$("<div class='annotateselector-dialog-content'><span class='entity-link'></span></div>").attr("tabIndex",-1).addClass().keydown(function(a){if(!a.isDefaultPrevented()&&a.keyCode&&a.keyCode===$.ui.keyCode.ESCAPE)return e.close(a),a.preventDefault()}).bind("dialogblur",function(a){return e._logger.info("dialog dialogblur"),e.close(a)}).bind("blur",function(a){return e._logger.info("dialog blur"),e.close(a)}).appendTo($("body")[0]),c=this,a.dialog({width:400,dialogClass:"annotation-selector-dialog",title:b,autoOpen:!1,open:function(a,b){return $.data(this,"dialog").uiDialog.position({of:c.element,my:"left top",at:"left bottom",collision:"none"})}}),this.dialog=a.data("dialog"),this.dialog.uiDialogTitlebar.hide(),this._logger.info("dialog widget:",this.dialog),this.dialog.element.focus(100),window.d=this.dialog,this._insertLink(),this._updateTitle(),this._setButtons()},_insertLink:function(){if(this.isAnnotated()&&this.dialog)return $("Annotated: <a href='"+this.linkedEntity.uri+"' target='_blank'>            "+this.linkedEntity.label+" @ "+this._sourceLabel(this.linkedEntity.uri)+"</a><br/>").appendTo($(".entity-link",this.dialog.element))},_setButtons:function(){var a=this;return this.dialog.element.dialog("option","buttons",{rem:{text:this.isAnnotated()?"Remove":"Decline",click:function(b){return a.remove(b),a.close()}},Cancel:function(){return a.close()}})},_updateTitle:function(){var a;if(this.dialog)return this.isAnnotated()?a=""+this.linkedEntity.label+" <small>@ "+this._sourceLabel(this.linkedEntity.uri)+"</small>":a=this.element.text(),this.dialog._setOption("title",a)},_createMenu:function(){var a,b,c,e=this;return c=this,b=$('<ul class="suggestion-menu"></ul>').appendTo(this.dialog.element),this._renderMenu(b,this.entityEnhancements),a=function(a,b){return e._logger.info("selected menu item",b.item),e.annotate(b.item.data("enhancement"),{styleClass:"acknowledged"}),e.close(a)},this.menu=b.menu({selected:a,select:a,blur:function(a,b){return e._logger.info("menu.blur()",b.item)},styleClass:"suggestion-menu"}).focus(150),this.options.showTooltip&&this.menu.tooltip({items:".ui-menu-item",hide:{effect:"hide",delay:50},show:{effect:"show",delay:50},content:function(a){var b;return b=d(this).attr("entityuri"),c._createPreview(b,a),"loading..."}}),this.menu=this.menu.data("menu")},_createPreview:function(a,b){var c,e,f=this;return e=function(c){var d,e,g,h;return g="",h=100,d=f._getDepiction(c,h),d&&(g+="<img style='float:left;padding: 5px;width: "+h+"px' src='"+d.substring(1,d.length-1)+"'/>"),e=f._getDescription(c),e||(f._logger.warn("No description found for",c),e="No description found."),g+="<div style='padding 5px;width:250px;float:left;'><small>"+e+"</small></div>",f._logger.info("tooltip for "+a+": cacheEntry loaded",c),setTimeout(function(){return b(g)},200)},c=function(c){return f._logger.error("error loading "+a,c),b("error loading entity for "+a)},d(".ui-tooltip").remove(),this.options.cache.get(a,this,e,c)},_getUserLang:function(){var a;return a=window.navigator.language||window.navigator.userLanguage,a.split("-")[0]},_getDepiction:function(a,b){var c,d,e,f;f=this.options.depictionProperties,d=i(f).detect(function(b){if(a.get(b))return!0});if(d&&(e=i([a.get(d)]).flatten()))return c=i(e).detect(function(a){a=(typeof a.getSubject=="function"?a.getSubject():void 0)||a;if(a.indexOf("thumb")!==-1)return!0}).replace(/[0-9]{2..3}px/,""+b+"px"),c},_getLabel:function(a){var b,d;return b=this.options.labelProperties,d=[this._getUserLang(),this.options.fallbackLanguage],c.Util.getPreferredLangForPreferredProperty(a,b,d)},_getDescription:function(a){var b,d;return b=this.options.descriptionProperties,d=[this._getUserLang(),this.options.fallbackLanguage],c.Util.getPreferredLangForPreferredProperty(a,b,d)},_renderMenu:function(a,b){var c,d,e;b=i(b).sortBy(function(a){return-1*a.getConfidence()});for(d=0,e=b.length;d<e;d++)c=b[d],this._renderItem(a,c);return this._logger.info("rendered menu for the elements",b)},_renderItem:function(a,b){var c,d,e,f,g;return e=b.getLabel().replace(/^\"|\"$/g,""),g=this._typeLabels(b.getTypes()).toString()||"Other",f=this._sourceLabel(b.getUri()),c=this.linkedEntity&&b.getUri()===this.linkedEntity.uri?" class='ui-state-active'":"",d=$("<li"+c+" entityuri='"+b.getUri()+"' about='"+b.getUri()+"'><a>"+e+" <small>("+g+" from "+f+")</small></a></li>").data("enhancement",b).appendTo(a)},_createSearchbox:function(){var a,b,c=this;return this.searchEntryField=$('<span style="background: fff;"><label for="search">Search:</label> <input id="search" class="search"></span>').appendTo(this.dialog.element),a=this.textEnhancements[0],b=this,this.searchbox=$(".search",this.searchEntryField).vieAutocomplete({vie:h,urifield:d("#urifield"),select:function(b,d){var e;return e=d.item,e.getUri=function(){return this.key},e._tEnh=a,e.getTextEnhancement=function(){return this._tEnh},e.getLabel=function(){return this.label},c.annotate(d.item,{styleClass:"acknowledged"}),c._logger.info("autocomplete.select",b.target,d)}}),this.searchEntryField.focus(200).blur(function(a,b){return c._dialogCloseTimeout=setTimeout(function(){return c.close()},200)}),!this.entityEnhancements.length&&!this.isAnnotated()&&setTimeout(function(){var a;return a=c.element.html(),c.searchbox.val(a),c.searchbox.autocomplete("search",a)},300),this._logger.info("show searchbox")},_cloneCopyEvent:function(a,b){return d().jquery.indexOf("1.6")===0?this._cloneCopyEvent1_6(a,b):this._cloneCopyEvent1_7(a,b)},_cloneCopyEvent1_6:function(a,b){var c,e,f,g,h,i,j;if(b.nodeType!==1||!d.hasData(a))return;g=$.expando,i=$.data(a),c=$.data(b,i);if(i=i[g]){e=i.events,c=c[g]=d.extend({},i);if(e){delete c.handle,c.events={};for(j in e){f=0,h=e[j].length;while(f<h)d.event.add(b,j+(e[j][f].namespace?".":"")+e[j][f].namespace,e[j][f],e[j][f].data),f++}}return null}},_cloneCopyEvent1_7:function(a,b){var c,e,f,g,h,i;if(b.nodeType!==1||!d.hasData(a))return;i=void 0,f=void 0,g=void 0,h=d._data(a),c=d._data(b,h),e=h.events;if(e){delete c.handle,c.events={};for(i in e){f=0,g=e[i].length;while(f<g)d.event.add(b,i+(e[i][f].namespace?".":"")+e[i][f].namespace,e[i][f],e[i][f].data),f++}}if(c.data)return c.data=d.extend({},c.data)}});if(typeof Stanbol=="undefined"||Stanbol===null)Stanbol={};Stanbol.getTextAnnotations=function(a){var b;return b=i(a).filter(function(a){return a.isof("<"+e.enhancer+"TextAnnotation>")}),b=i(b).sortBy(function(a){var b;return a.get("enhancer:confidence")&&(b=Number(a.get("enhancer:confidence"))),-1*b}),i(b).map(function(b){return new Stanbol.TextEnhancement(b,a)})},Stanbol.getEntityAnnotations=function(a){return i(a).filter(function(a){return a.isof("<"+e.enhancer+"EntityAnnotation>")})},Stanbol.TextEnhancement=function(){function b(a,b){this._enhancement=a,this._enhList=b,this.id=this._enhancement.getSubject()}return b.prototype.getSelectedText=function(){var a;a=this._vals("enhancer:selected-text");if(typeof a=="string")return a;if(typeof a=="object")return a.toString()},b.prototype.getConfidence=function(){return this._vals("enhancer:confidence")},b.prototype.getEntityEnhancements=function(){var a,b=this;return a=this._enhancement.get("entityAnnotation"),a?(a=i.flatten([a]),i(a).map(function(a){return new Stanbol.EntityEnhancement(a,b)})):[]},b.prototype.getType=function(){return this._uriTrim(this._vals("dcterms:type"))},b.prototype.getContext=function(){return this._vals("enhancer:selection-context")},b.prototype.getStart=function(){return Number(this._vals("enhancer:start"))},b.prototype.getEnd=function(){return Number(this._vals("enhancer:end"))},b.prototype.getOrigText=function(){var a;return a=this._vals("enhancer:extracted-from"),this._enhList[a]["http://www.semanticdesktop.org/ontologies/2007/01/19/nie#plainTextContent"][0].value},b.prototype._vals=function(a){return this._enhancement.get(a)},b.prototype._uriTrim=function(b){var c,d;return b?b instanceof a.Model||b instanceof a.Collection?(c=b,function(){var a,b,e,f;e=c.models,f=[];for(a=0,b=e.length;a<b;a++)d=e[a],f.push(d.get("@subject").replace(/^<|>$/g,""));return f}()):i(i.flatten([b])).map(function(a){return a.replace(/^<|>$/g,"")}):[]},b}(),Stanbol.EntityEnhancement=function(){function b(a,b){this._enhancement=a,this._textEnhancement=b,this}return b.prototype.getLabel=function(){return this._vals("enhancer:entity-label").toString().replace(/(^\"*|\"*@..$)/g,"")},b.prototype.getUri=function(){return this._uriTrim(this._vals("enhancer:entity-reference"))[0]},b.prototype.getTextEnhancement=function(){return this._textEnhancement},b.prototype.getTypes=function(){return this._uriTrim(this._vals("enhancer:entity-type"))},b.prototype.getConfidence=function(){return Number(this._vals("enhancer:confidence"))},b.prototype._vals=function(a){var b;return b=this._enhancement.get(a),b?b.pluck?b.pluck("@subject"):b:[]},b.prototype._uriTrim=function(b){var c,d;return b?b instanceof a.Collection?(c=b,function(){var a,b,e,f;e=c.models,f=[];for(a=0,b=e.length;a<b;a++)d=e[a],f.push(d.getSubject().replace(/^<|>$/g,""));return f}()):(b instanceof a.Model&&(b=b.getSubject()),i(i.flatten([b])).map(function(a){return a.replace(/^<|>$/g,"")})):[]},b}(),h=new c,h.use(new h.StanbolService({url:"http://dev.iks-project.eu:8080",proxyDisabled:!0})),d.widget("IKS.vieAutocomplete",{options:{vie:h,select:function(a,b){},urifield:null,field:"rdfs:label",services:"stanbol",debug:!1,depictionProperties:["foaf:depiction","schema:thumbnail"],labelProperties:["rdfs:label","skos:prefLabel","schema:name","foaf:name"],descriptionProperties:["rdfs:comment","skos:note","schema:description","skos:definition",{property:"skos:broader",makeLabel:function(a){var b;return b=i(a).map(function(a){return a.replace(/<.*[\/#](.*)>/,"$1").replace(/_/g,"&nbsp;")}),"Subcategory of "+b.join(", ")+"."}},{property:"dcterms:subject",makeLabel:function(a){var b;return b=i(a).map(function(a){return a.replace(/<.*[\/#](.*)>/,"$1").replace(/_/g,"&nbsp;")}),"Subject(s): "+b.join(", ")+"."}}],fallbackLanguage:"en",styleClass:"vie-autocomplete",getTypes:function(){return[{uri:""+this.ns.dbpedia+"Place",label:"Place"},{uri:""+this.ns.dbpedia+"Person",label:"Person"},{uri:""+this.ns.dbpedia+"Organisation",label:"Organisation"},{uri:""+this.ns.skos+"Concept",label:"Concept"}]},getSources:function(){return[{uri:"http://dbpedia.org/resource/",label:"dbpedia"},{uri:"http://sws.geonames.org/",label:"geonames"}]}},_create:function(){return this._logger=this.options.debug?console:{info:function(){},warn:function(){},error:function(){},log:function(){}},this.menuContainer=d("<span class='"+this.options.styleClass+"'/>"),this.menuContainer.appendTo("body"),this._instantiateAutocomplete()},_destroy:function(){return this.menuContainer.remove()},_instantiateAutocomplete:function(){var a,b=this;return a=this,this.element.autocomplete({source:function(b,c){var d;return a._logger.info("req:",b),d=i.flatten([a.options.labelProperties,a.options.descriptionProperties,a.options.depictionProperties]),d=i(d).map(function(a){return typeof a=="object"?a.property:a}),a.options.vie.find({term:""+b.term+(b.term.length>3?"*":""),field:a.options.field,properties:d}).using(a.options.services).execute().fail(function(b){return a._logger.error("Something wrong happened at stanbol find:",b)}).success(function(b){var d=this;return i.defer(function(){var d,e;return a._logger.info("resp:",i(b).map(function(a){return a.id})),d=10,b=i(b).filter(function(a){return a.getSubject().replace(/^<|>$/g,"")==="http://www.iks-project.eu/ontology/rick/query/QueryResultSet"?!1:!0}),e=i(b.slice(0,d)).map(function(b){return{key:b.getSubject().replace(/^<|>$/g,""),label:""+a._getLabel(b)+" @ "+a._sourceLabel(b.id),value:a._getLabel(b)}}),c(e)})})},open:function(b,c){a._logger.info("autocomplete.open",b,c);if(a.options.showTooltip)return $(this).data().autocomplete.menu.activeMenu.tooltip({items:".ui-menu-item",hide:{effect:"hide",delay:50},show:{effect:"show",delay:50},content:function(b){var c;return c=$(this).data()["item.autocomplete"].getUri(),a._createPreview(c,b),"loading..."}})},select:function(c,d){b.options.select(c,d),b._logger.info("autocomplete.select",c.target,d);if(a.options.urifield)return a.options.urifield.val(d.item.key)},appendTo:this.menuContainer})},_getUserLang:function(){return window.navigator.language.split("-")[0]},_getDepiction:function(a,b){var c,d,e,f;f=this.options.depictionProperties,d=i(f).detect(function(b){if(a.get(b))return!0});if(d&&(e=i([a.get(d)]).flatten()))return c=i(e).detect(function(a){if(a.indexOf("thumb")!==-1)return!0}).replace(/[0-9]{2..3}px/,""+b+"px"),c},_getLabel:function(a){var b,d;return b=this.options.labelProperties,d=[this._getUserLang(),this.options.fallbackLanguage],c.Util.getPreferredLangForPreferredProperty(a,b,d)},_getDescription:function(a){var b,d;return b=this.options.descriptionProperties,d=[this._getUserLang(),this.options.fallbackLanguage],c.Util.getPreferredLangForPreferredProperty(a,b,d)},_sourceLabel:function(a){var b,c;return a||this._logger.warn("No source"),a?(c=this.options.getSources(),b=i(c).detect(function(b){return a.indexOf(b.uri)!==-1}),b?b.label:a.split("/")[2]):""}})})).call(this);
/* Create.js 1.0.0alpha4 - Inline editing toolkit
by Henri Bergius and contributors. Available under the MIT license.
See http://createjs.org for more information
*/(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false VIE:false */
  'use strict';

  // # Create main widget
  //
  // The `midgardCreate` widget is the main entry point into using
  // Create for editing content.
  //
  // While most individual Create widgets can also be used separately,
  // the most common use case is to instantiate `midgardCreate` for
  // your pages and let it handle editables, toolbars, and storate.
  //
  //     jQuery('body').midgardCreate();
  jQuery.widget('Midgard.midgardCreate', {
    // ## Configuration
    //
    // Like most jQuery UI widgets, Create accepts various options
    // when being instantiated.
    options: {
      // Initial toolbar rendering style: `full` or `minimized`.
      toolbar: 'full',
      // The *Save* jQuery UI button instance.
      saveButton: null,
      // Initial usage state: `browse` or `edit`
      state: 'browse',
      // Whether to highlight editable elements when entering `edit`
      // state.
      highlight: true,
      // Color for the highlights.
      highlightColor: '#67cc08',
      // Widgets to use for editing various content types.
      editorWidgets: {
        'default': 'hallo'
      },
      // Additional editor options.
      editorOptions: {
        hallo: {
          widget: 'halloWidget'
        }
      },
      // Widgets to use for managing collections.
      collectionWidgets: {
        'default': 'midgardCollectionAdd'
      },
      // URL callback used with Backbone.sync. Will be passed to the
      // Storage widget.
      url: function () {},
      // Prefix used for localStorage.
      storagePrefix: 'node',
      // Workflow configuration. URL callback is used for retrieving
      // list of workflow actions that can be initiated for an item.
      workflows: {
        url: null
      },
      // Notifications configuration.
      notifications: {},
      // VIE instance used with Create.js. If no VIE instance is passed,
      // Create.js will create its own instance.
      vie: null,
      // The VIE service used for DOM handling. By default 'rdfa'
      domService: 'rdfa',
      // URL for the Apache Stanbol service used for annotations, and tag
      // and image suggestions.
      stanbolUrl: null,
      // URL for the DBpedia instance used for finding more information
      // about annotations and tags.
      dbPediaUrl: null,
      // Configuration for the metadata editor. If no widgets are enabled,
      // then the metadata editor will not be loaded.
      metadata: {},
      // Selector for element where Create.js will place its buttons, like
      // Save and Edit/Cancel.
      buttonContainer: '.create-ui-toolbar-statustoolarea .create-ui-statustools',
      // Templates used for UI elements of the Create widget
      templates: {
        buttonContent: '<%= label %> <i class="icon-<%= icon %>"></i>',
        button: '<li id="<%= id %>"><a class="create-ui-btn"><%= buttonContent %></a></li>'
      },
      // Localization callback function. Will be run in the widget context.
      // Override to connect Create.js with your own localization system
      localize: function (id, language) {
        return window.midgardCreate.localize(id, language);
      },
      // Language used for Create.js. Will be retrieved from page lang attrib
      // if left blank
      language: null
    },

    _create: function () {
      this.vie = this._setupVIE(this.options);
      this.domService = this.vie.service(this.options.domService);

      var widget = this;
      window.setTimeout(function () {
        widget._checkSession();
      }, 10);

      if (!this.options.language) {
        this.options.language = jQuery('html').attr('lang');
      }

      this._enableToolbar();
      this._enableMetadata();
      this._saveButton();
      this._editButton();
      this._prepareStorage();

      if (this.element.midgardWorkflows) {
        this.element.midgardWorkflows(this.options.workflows);
      }

      if (this.element.midgardNotifications) {
        this.element.midgardNotifications(this.options.notifications);
      }

      this._bindShortcuts();
    },

    destroy: function () {
      // Clean up on widget destruction
      this.element.midgardStorage('destroy');
      this.element.midgardToolbar('destroy');

      this.domService.findSubjectElements(this.element).each(function () {
        jQuery(this).midgardEditable('destroy');
      });

      // Conditional widgets
      if (this.element.midgardWorkflows) {
        this.element.midgardWorkflows('destroy');
      }
      if (this.element.midgardNotifications) {
        this.element.midgardNotifications('destroy');
      }
      if (!_.isEmpty(this.options.metadata)) {
        this.element.midgardMetadata('destroy');
      }
      // TODO: use _destroy in jQuery UI 1.9 and above
      jQuery.Widget.prototype.destroy.call(this);
    },

    _setupVIE: function (options) {
      var vie;
      if (options.vie) {
        vie = options.vie;
      } else {
        // Set up our own VIE instance
        vie = new VIE();
      }

      if (!vie.hasService(this.options.domService) && this.options.domService === 'rdfa') {
        vie.use(new vie.RdfaService());
      }

      if (!vie.hasService('stanbol') && options.stanbolUrl) {
        vie.use(new vie.StanbolService({
          proxyDisabled: true,
          url: options.stanbolUrl
        }));
      }

      if (!vie.hasService('dbpedia') && options.dbPediaUrl) {
        vie.use(new vie.DBPediaService({
          proxyDisabled: true,
          url: options.dbPediaUrl
        }));
      }

      return vie;
    },

    _prepareStorage: function () {
      this.element.midgardStorage({
        vie: this.vie,
        url: this.options.url,
        localize: this.options.localize,
        language: this.options.language,
        storagePrefix: this.options.storagePrefix
      });

      var widget = this;
      this.element.on('midgardstoragesave', function () {
        jQuery('#midgardcreate-save a').html(_.template(widget.options.templates.buttonContent, {
          label: widget.options.localize('Saving', widget.options.language),
          icon: 'upload'
        }));
      });

      this.element.on('midgardstoragesaved midgardstorageerror', function () {
        jQuery('#midgardcreate-save a').html(_.template(widget.options.templates.buttonContent, {
          label: widget.options.localize('Save', widget.options.language),
          icon: 'ok'
        }));
      });
    },

    _init: function () {
      this.setState(this.options.state);
    },

    setState: function (state) {
      this._setOption('state', state);
      if (state === 'edit') {
        this._enableEdit();
      } else {
        this._disableEdit();
      }
      this._setEditButtonState(state);
    },

    setToolbar: function (state) {
      this.options.toolbar = state;
      if (!this.element.data('Midgard-midgardToolbar') && !this.element.data('midgardToolbar')) {
        // Toolbar not yet instantiated
        return;
      }
      this.element.midgardToolbar('setDisplay', state);
    },

    showNotification: function (options) {
      if (this.element.midgardNotifications) {
        return this.element.midgardNotifications('create', options);
      }
    },

    configureEditor: function (name, widget, options) {
      this.options.editorOptions[name] = {
        widget: widget,
        options: options
      };
    },

    setEditorForContentType: function (type, editor) {
      if (this.options.editorOptions[editor] === undefined && editor !== null) {
        throw new Error("No editor " + editor + " configured");
      }
      this.options.editorWidgets[type] = editor;
    },

    setEditorForProperty: function (property, editor) {
      if (this.options.editorOptions[editor] === undefined && editor !== null) {
        throw new Error("No editor " + editor + " configured");
      }
      this.options.editorWidgets[property] = editor;
    },

    _checkSession: function () {
      if (!window.sessionStorage) {
        return;
      }

      var toolbarID = this.options.storagePrefix + 'Midgard.create.toolbar';
      if (window.sessionStorage.getItem(toolbarID)) {
        this.setToolbar(window.sessionStorage.getItem(toolbarID));
      }

      var stateID = this.options.storagePrefix + 'Midgard.create.state';
      if (window.sessionStorage.getItem(stateID)) {
        this.setState(window.sessionStorage.getItem(stateID));
      }

      this.element.on('midgardcreatestatechange', function (event, options) {
        window.sessionStorage.setItem(stateID, options.state);
      });
    },

    _bindShortcuts: function () {
      if (!window.Mousetrap) {
        // Keyboard shortcuts are optional and only activated if Mousetrap
        // library is available
        return;
      }

      var widget = this;
      // Ctrl-e enters edit state
      window.Mousetrap.bind(['command+e', 'ctrl+e'], function () {
        if (widget.options.state === 'edit') {
          return;
        }
        widget.setState('edit');
      });

      // Esc leaves edit state
      window.Mousetrap.bind('esc', function (event) {
        if (widget.options.state === 'browse') {
          return;
        }
        // Stop event from propagating so that possible active editable
        // doesn't get falsely triggered
        event.stopPropagation();
        widget.setState('browse');
      });

      // Ctrl-s saves
      window.Mousetrap.bind(['command+s', 'ctrl+s'], function (event) {
        event.preventDefault();
        if (!widget.options.saveButton) {
          return;
        }
        if (widget.options.saveButton.hasClass('ui-state-disabled')) {
          return;
        }
        widget.options.saveButton.click();
      });
    },

    _saveButton: function () {
      if (this.options.saveButton) {
        return this.options.saveButton;
      }
      var widget = this;
      jQuery(this.options.buttonContainer, this.element).append(jQuery(_.template(this.options.templates.button, {
        id: 'midgardcreate-save',
        buttonContent: _.template(this.options.templates.buttonContent, {
          label: widget.options.localize('Save', widget.options.language),
          icon: 'ok'
        })
      })));
      this.options.saveButton = jQuery('#midgardcreate-save', this.element);
      this.options.saveButton.hide();

      this.options.saveButton.click(function () {
        widget.element.midgardStorage('saveRemoteAll');
      });

      this.element.on('midgardeditablechanged midgardstorageloaded', function () {
        widget.options.saveButton.button({
          disabled: false
        });
      });

      this.element.on('midgardstoragesaved', function () {
        widget.options.saveButton.button({
          disabled: true
        });
      });

      this.element.on('midgardeditableenable', function () {
        widget.options.saveButton.button({
          disabled: true
        });
        widget.options.saveButton.show();
      });

      this.element.on('midgardeditabledisable', function () {
        widget.options.saveButton.hide();
      });
    },

    _editButton: function () {
      var widget = this;
      jQuery(this.options.buttonContainer, this.element).append(jQuery(_.template(this.options.templates.button, {
        id: 'midgardcreate-edit',
        buttonContent: ''
      })));
      jQuery('#midgardcreate-edit', this.element).on('click', function () {
        if (widget.options.state === 'edit') {
          widget.setState('browse');
          return;
        }
        widget.setState('edit');
      });
    },

    _setEditButtonState: function (state) {
      var widget = this;
      var buttonContents = {
        edit: _.template(this.options.templates.buttonContent, {
          label: widget.options.localize('Cancel', widget.options.language),
          icon: 'remove'
        }),
        browse: _.template(this.options.templates.buttonContent, {
          label: widget.options.localize('Edit', widget.options.language),
          icon: 'edit'
        })
      };
      var editButton = jQuery('#midgardcreate-edit a', this.element);
      if (!editButton) {
        return;
      }
      if (state === 'edit') {
        editButton.addClass('selected');
      }
      editButton.html(buttonContents[state]);
    },

    _enableToolbar: function () {
      var widget = this;
      this.element.on('midgardtoolbarstatechange', function (event, options) {
        widget.setToolbar(options.display);
        if (window.sessionStorage) {
          window.sessionStorage.setItem(widget.options.storagePrefix + 'Midgard.create.toolbar', options.display);
        }
      });

      this.element.midgardToolbar({
        display: this.options.toolbar,
        vie: this.vie
      });
    },

    _enableMetadata: function () {
      if (_.isEmpty(this.options.metadata)) {
        return;
      }

      jQuery('.create-ui-tool-metadataarea', this.element).midgardMetadata({
        vie: this.vie,
        localize: this.options.localize,
        language: this.options.language,
        editors: this.options.metadata,
        createElement: this.element,
        editableNs: 'midgardeditable'
      });
    },

    _enableEdit: function () {
      this._setOption('state', 'edit');
      var widget = this;
      var editableOptions = {
        toolbarState: widget.options.toolbar,
        disabled: false,
        vie: widget.vie,
        domService: widget.options.domService,
        widgets: widget.options.editorWidgets,
        editors: widget.options.editorOptions,
        collectionWidgets: widget.options.collectionWidgets,
        localize: widget.options.localize,
        language: widget.options.language
      };
      if (widget.options.enableEditor) {
        editableOptions.enableEditor = widget.options.enableEditor;
      }
      if (widget.options.disableEditor) {
        editableOptions.disableEditor = widget.options.disableEditor;
      }
      this.domService.findSubjectElements(this.element).each(function () {
        var element = this;
        if (widget.options.highlight) {
          var highlightEditable = function (event, options) {
              if (!jQuery(options.element).is(':visible')) {
                // Hidden element, don't highlight
                return;
              }
              if (options.entityElement.get(0) !== element) {
                // Propagated event from another entity, ignore
                return;
              }

              if (window.Mousetrap) {
                // contentEditable and form fields require special handling
                // to allow keyboard shortcuts to work
                options.element.addClass('mousetrap');
              }

              // Ensure other animations are stopped before proceeding
              options.element.stop(true, true);

              // Highlight the editable
              options.element.effect('highlight', {
                color: widget.options.highlightColor
              }, 3000);
            };

          jQuery(this).on('midgardeditableenableproperty', highlightEditable);
        }
        jQuery(this).on('midgardeditabledisable', function () {
          jQuery(this).off('midgardeditableenableproperty', highlightEditable);
        });

        jQuery(this).midgardEditable(editableOptions);
      });

      this._trigger('statechange', null, {
        state: 'edit'
      });
    },

    _disableEdit: function () {
      var widget = this;
      var editableOptions = {
        disabled: true,
        vie: widget.vie,
        domService: widget.options.domService,
        editorOptions: widget.options.editorOptions,
        localize: widget.options.localize,
        language: widget.options.language
      };
      this.domService.findSubjectElements(this.element).each(function () {
        jQuery(this).midgardEditable(editableOptions);
        jQuery(this).removeClass('ui-state-disabled');
      });
      this._setOption('state', 'browse');
      this._trigger('statechange', null, {
        state: 'browse'
      });
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false VIE:false */
  'use strict';

  // Define Create's EditableEntity widget.
  jQuery.widget('Midgard.midgardEditable', {
    options: {
      propertyEditors: {},
      collections: [],
      model: null,
      // the configuration (mapping and options) of property editor widgets
      propertyEditorWidgetsConfiguration: {
        hallo: {
          widget: 'halloWidget',
          options: {}
        }
      },
      // the available property editor widgets by data type
      propertyEditorWidgets: {
        'default': 'hallo'
      },
      collectionWidgets: {
        'default': 'midgardCollectionAdd'
      },
      toolbarState: 'full',
      vie: null,
      domService: 'rdfa',
      predicateSelector: '[property]',
      disabled: false,
      localize: function (id, language) {
        return window.midgardCreate.localize(id, language);
      },
      language: null,
      // Current state of the Editable
      state: null,
      // Callback function for validating changes between states. Receives the previous state, new state, possibly property, and a callback
      acceptStateChange: true,
      // Callback function for listening (and reacting) to state changes.
      stateChange: null,
      // Callback function for decorating the full editable. Will be called on instantiation
      decorateEditableEntity: null,
      // Callback function for decorating a single property editor widget. Will
      // be called on editing widget instantiation.
      decoratePropertyEditor: null,

      // Deprecated.
      editables: [], // Now `propertyEditors`.
      editors: {}, // Now `propertyEditorWidgetsConfiguration`.
      widgets: {} // Now `propertyEditorW
    },

    // Aids in consistently passing parameters to events and callbacks.
    _params: function(predicate, extended) {
      var entityParams = {
        entity: this.options.model,
        editableEntity: this,
        entityElement: this.element,

        // Deprecated.
        editable: this,
        element: this.element,
        instance: this.options.model
      };
      var propertyParams = (predicate) ? {
        predicate: predicate,
        propertyEditor: this.options.propertyEditors[predicate],
        propertyElement: this.options.propertyEditors[predicate].element,

        // Deprecated.
        property: predicate,
        element: this.options.propertyEditors[predicate].element
      } : {};

      return _.extend(entityParams, propertyParams, extended);
    },

    _create: function () {
      // Backwards compatibility:
      // - this.options.propertyEditorWidgets used to be this.options.widgets
      // - this.options.propertyEditorWidgetsConfiguration used to be
      //   this.options.editors
      if (this.options.widgets) {
        this.options.propertyEditorWidgets = _.extend(this.options.propertyEditorWidgets, this.options.widgets);
      }
      if (this.options.editors) {
        this.options.propertyEditorWidgetsConfiguration = _.extend(this.options.propertyEditorWidgetsConfiguration, this.options.editors);
      }

      this.vie = this.options.vie;
      this.domService = this.vie.service(this.options.domService);
      if (!this.options.model) {
        var widget = this;
        this.vie.load({
          element: this.element
        }).from(this.options.domService).execute().done(function (entities) {
          widget.options.model = entities[0];
        });
      }
      if (_.isFunction(this.options.decorateEditableEntity)) {
        this.options.decorateEditableEntity(this._params());
      }
    },

    _init: function () {
      // Backwards compatibility:
      // - this.options.propertyEditorWidgets used to be this.options.widgets
      // - this.options.propertyEditorWidgetsConfiguration used to be
      //   this.options.editors
      if (this.options.widgets) {
        this.options.propertyEditorWidgets = _.extend(this.options.propertyEditorWidgets, this.options.widgets);
      }
      if (this.options.editors) {
        this.options.propertyEditorWidgetsConfiguration = _.extend(this.options.propertyEditorWidgetsConfiguration, this.options.editors);
      }

      // Old way of setting the widget inactive
      if (this.options.disabled === true) {
        this.setState('inactive');
        return;
      }

      if (this.options.disabled === false && this.options.state === 'inactive') {
        this.setState('candidate');
        return;
      }
      this.options.disabled = false;

      if (this.options.state) {
        this.setState(this.options.state);
        return;
      }
      this.setState('candidate');
    },

    // Method used for cycling between the different states of the Editable widget:
    //
    // * Inactive: editable is loaded but disabled
    // * Candidate: editable is enabled but not activated
    // * Highlight: user is hovering over the editable (not set by Editable widget directly)
    // * Activating: an editor widget is being activated for user to edit with it (skipped for editors that activate instantly)
    // * Active: user is actually editing something inside the editable
    // * Changed: user has made changes to the editable
    // * Invalid: the contents of the editable have validation errors
    //
    // In situations where state changes are triggered for a particular property editor, the `predicate`
    // argument will provide the name of that property.
    //
    // State changes may carry optional context information in a JavaScript object. The payload of these context objects is not
    // standardized, and is meant to be set and used by the application controller
    //
    // The callback parameter is optional and will be invoked after a state change has been accepted (after the 'statechange'
    // event) or rejected.
    setState: function (state, predicate, context, callback) {
      var previous = this.options.state;
      var current = state;
      if (current === previous) {
        return;
      }

      if (this.options.acceptStateChange === undefined || !_.isFunction(this.options.acceptStateChange)) {
        // Skip state transition validation
        this._doSetState(previous, current, predicate, context);
        if (_.isFunction(callback)) {
          callback(true);
        }
        return;
      }

      var widget = this;
      this.options.acceptStateChange(previous, current, predicate, context, function (accepted) {
        if (accepted) {
          widget._doSetState(previous, current, predicate, context);
        }
        if (_.isFunction(callback)) {
          callback(accepted);
        }
        return;
      });
    },

    getState: function () {
      return this.options.state;
    },

    _doSetState: function (previous, current, predicate, context) {
      this.options.state = current;
      if (current === 'inactive') {
        this.disable();
      } else if ((previous === null || previous === 'inactive') && current !== 'inactive') {
        this.enable();
      }

      this._trigger('statechange', null, this._params(predicate, {
        previous: previous,
        current: current,
        context: context
      }));
    },

    findEditablePredicateElements: function (callback) {
      this.domService.findPredicateElements(this.options.model.id, jQuery(this.options.predicateSelector, this.element), false).each(callback);
    },

    getElementPredicate: function (element) {
      return this.domService.getElementPredicate(element);
    },

    enable: function () {
      var editableEntity = this;
      if (!this.options.model) {
        return;
      }

      this.findEditablePredicateElements(function () {
        editableEntity._enablePropertyEditor(jQuery(this));
      });

      this._trigger('enable', null, this._params());

      if (!this.vie.view || !this.vie.view.Collection) {
        return;
      }

      _.each(this.domService.views, function (view) {
        if (view instanceof this.vie.view.Collection && this.options.model === view.owner) {
          var predicate = view.collection.predicate;
          var editableOptions = _.clone(this.options);
          editableOptions.state = null;
          var collection = this.enableCollection({
            model: this.options.model,
            collection: view.collection,
            property: predicate,
            definition: this.getAttributeDefinition(predicate),
            view: view,
            element: view.el,
            vie: editableEntity.vie,
            editableOptions: editableOptions
          });
          editableEntity.options.collections.push(collection);
        }
      }, this);
    },

    disable: function () {
      _.each(this.options.propertyEditors, function (editable) {
        this.disablePropertyEditor({
          widget: this,
          editable: editable,
          entity: this.options.model,
          element: editable.element
        });
      }, this);
      this.options.propertyEditors = {};

      // Deprecated.
      this.options.editables = [];

      _.each(this.options.collections, function (collectionWidget) {
        var editableOptions = _.clone(this.options);
        editableOptions.state = 'inactive';
        this.disableCollection({
          widget: this,
          model: this.options.model,
          element: collectionWidget,
          vie: this.vie,
          editableOptions: editableOptions
        });
      }, this);
      this.options.collections = [];

      this._trigger('disable', null, this._params());
    },

    _enablePropertyEditor: function (element) {
      var widget = this;
      var predicate = this.getElementPredicate(element);
      if (!predicate) {
        return true;
      }
      if (this.options.model.get(predicate) instanceof Array) {
        // For now we don't deal with multivalued properties in the editable
        return true;
      }

      var propertyElement = this.enablePropertyEditor({
        widget: this,
        element: element,
        entity: this.options.model,
        property: predicate,
        vie: this.vie,
        decorate: this.options.decoratePropertyEditor,
        decorateParams: _.bind(this._params, this),
        changed: function (content) {
          widget.setState('changed', predicate);

          var changedProperties = {};
          changedProperties[predicate] = content;
          widget.options.model.set(changedProperties, {
            silent: true
          });

          widget._trigger('changed', null, widget._params(predicate));
        },
        activating: function () {
          widget.setState('activating', predicate);
        },
        activated: function () {
          widget.setState('active', predicate);
          widget._trigger('activated', null, widget._params(predicate));
        },
        deactivated: function () {
          widget.setState('candidate', predicate);
          widget._trigger('deactivated', null, widget._params(predicate));
        }
      });

      if (!propertyElement) {
        return;
      }
      var widgetType = propertyElement.data('createWidgetName');
      this.options.propertyEditors[predicate] = propertyElement.data('Midgard-' + widgetType);
      if (!this.options.propertyEditors[predicate]) {
        // pre-1.10 jQuery UI
        this.options.propertyEditors[predicate] = propertyElement.data(widgetType);
      }

      // Deprecated.
      this.options.editables.push(propertyElement);

      this._trigger('enableproperty', null, this._params(predicate));
    },

    // returns the name of the property editor widget to use for the given property
    _propertyEditorName: function (data) {
      if (this.options.propertyEditorWidgets[data.property] !== undefined) {
        // Property editor widget configuration set for specific RDF predicate
        return this.options.propertyEditorWidgets[data.property];
      }

      // Load the property editor widget configuration for the data type
      var propertyType = 'default';
      var attributeDefinition = this.getAttributeDefinition(data.property);
      if (attributeDefinition) {
        propertyType = attributeDefinition.range[0];
      }
      if (this.options.propertyEditorWidgets[propertyType] !== undefined) {
        return this.options.propertyEditorWidgets[propertyType];
      }
      return this.options.propertyEditorWidgets['default'];
    },

    _propertyEditorWidget: function (editor) {
      return this.options.propertyEditorWidgetsConfiguration[editor].widget;
    },

    _propertyEditorOptions: function (editor) {
      return this.options.propertyEditorWidgetsConfiguration[editor].options;
    },

    getAttributeDefinition: function (property) {
      var type = this.options.model.get('@type');
      if (!type) {
        return;
      }
      if (!type.attributes) {
        return;
      }
      return type.attributes.get(property);
    },

    // Deprecated.
    enableEditor: function (data) {
      return this.enablePropertyEditor(data);
    },

    enablePropertyEditor: function (data) {
      var editorName = this._propertyEditorName(data);
      if (editorName === null) {
        return;
      }

      var editorWidget = this._propertyEditorWidget(editorName);

      data.editorOptions = this._propertyEditorOptions(editorName);
      data.toolbarState = this.options.toolbarState;
      data.disabled = false;
      // Pass metadata that could be useful for some implementations.
      data.editorName = editorName;
      data.editorWidget = editorWidget;

      if (typeof jQuery(data.element)[editorWidget] !== 'function') {
        throw new Error(editorWidget + ' widget is not available');
      }

      jQuery(data.element)[editorWidget](data);
      jQuery(data.element).data('createWidgetName', editorWidget);
      return jQuery(data.element);
    },

    // Deprecated.
    disableEditor: function (data) {
      return this.disablePropertyEditor(data);
    },

    disablePropertyEditor: function (data) {
      data.element[data.editable.widgetName]({
        disabled: true
      });
      jQuery(data.element).removeClass('ui-state-disabled');

      if (data.element.is(':focus')) {
        data.element.blur();
      }
    },

    collectionWidgetName: function (data) {
      if (this.options.collectionWidgets[data.property] !== undefined) {
        // Widget configuration set for specific RDF predicate
        return this.options.collectionWidgets[data.property];
      }

      var propertyType = 'default';
      var attributeDefinition = this.getAttributeDefinition(data.property);
      if (attributeDefinition) {
        propertyType = attributeDefinition.range[0];
      }
      if (this.options.collectionWidgets[propertyType] !== undefined) {
        return this.options.collectionWidgets[propertyType];
      }
      return this.options.collectionWidgets['default'];
    },

    enableCollection: function (data) {
      var widgetName = this.collectionWidgetName(data);
      if (widgetName === null) {
        return;
      }
      data.disabled = false;
      if (typeof jQuery(data.element)[widgetName] !== 'function') {
        throw new Error(widgetName + ' widget is not available');
      }
      jQuery(data.element)[widgetName](data);
      jQuery(data.element).data('createCollectionWidgetName', widgetName);
      return jQuery(data.element);
    },

    disableCollection: function (data) {
      var widgetName = jQuery(data.element).data('createCollectionWidgetName');
      if (widgetName === null) {
        return;
      }
      data.disabled = true;
      if (widgetName) {
        // only if there has been an editing widget registered
        jQuery(data.element)[widgetName](data);
        jQuery(data.element).removeClass('ui-state-disabled');
      }
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false */
  'use strict';

  jQuery.widget('Midgard.midgardMetadata', {
    contentArea: null,
    editorElements: {},
    options: {
      vie: null,
      templates: {
        button: '<button class="create-ui-btn"><i class="icon-<%= icon %>"></i> <%= label %></button>',
        contentArea: '<div class="dropdown-menu"></div>'
      },
      localize: function (id, language) {
        return window.midgardCreate.localize(id, language);
      },
      language: null,
      createElement: 'body',
      editableNs: 'midgardeditable'
    },

    _create: function () {
      this._render();
    },

    _init: function () {
      this._prepareEditors();
      this._bindEditables();
    },

    _prepareEditors: function () {
      _.each(this.options.editors, function (configuration, editor) {
        // We need to create containers for each editor and instantiate them
        var editorArea = jQuery('<div></div>').addClass(editor);
        this.contentArea.append(editorArea);
        if (!_.isFunction(editorArea[editor])) {
          throw new Error('Metadata editor widget ' + editor + ' is not available');
        }

        _.extend(configuration, {
          vie: this.options.vie,
          language: this.options.language,
          localize: this.options.localize,
          createElement: this.options.createElement,
          editableNs: this.options.editableNs
        });

        editorArea[editor](configuration);
        this.editorElements[editor] = editorArea;
      }, this);
    },

    activateEditors: function (data) {
      this.element.show();
      _.each(this.options.editors, function (configuration, editor) {
        if (!this.editorElements[editor]) {
          return;
        }
        // An editable has been activated, pass the info on to the
        // editor widgets
        this.editorElements[editor][editor]('activate', data);
      }, this);
    },

    _bindEditables: function () {
      var widget = this;
      var createElement = jQuery(this.options.createElement);
      createElement.on(this.options.editableNs + 'activated', function (event, data) {
        // An editable has been activated. Tell our metadata editors
        // about it
        widget.activateEditors({
          entity: data.entity,
          entityElement: data.entityElement,
          predicate: data.predicate
        });
      });
    },

    _prepareEditorArea: function (button) {
      var contentArea = jQuery(_.template(this.options.templates.contentArea, {}));
      contentArea.hide();
      return contentArea;
    },

    _render: function () {
      var widget = this;

      var button = jQuery(_.template(this.options.templates.button, {
        icon: 'info-sign',
        label: this.options.localize('Metadata', this.options.language)
      }));

      this.element.empty();
      this.element.append(button);
      this.element.hide();

      this.contentArea = this._prepareEditorArea(button);
      button.after(this.contentArea);

      button.on('click', function(event) {
        event.preventDefault();

        var offset = button.position();
        widget.contentArea.css({
          position: 'absolute',
          left: offset.left
        });

        widget.contentArea.toggle();
      });
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false Backbone:false document:false */
  'use strict';

  var _midgardnotifications_active = [];
  var MidgardNotification = function (parent, options) {
      var _defaults = {
        class_prefix: 'midgardNotifications',
        timeout: 3000,
        // Set to 0 for sticky
        auto_show: true,
        body: '',
        bindTo: null,
        gravity: 'T',
        effects: {
          onShow: function (item, cb) {
            item.animate({
              opacity: 'show'
            }, 600, cb);
          },
          onHide: function (item, cb) {
            item.animate({
              opacity: 'hide'
            }, 600, cb);
          }
        },
        actions: [],
        callbacks: {}
      };
      var _config = {};
      var _classes = {};
      var _item = null;
      var _id = null;
      var _bind_target = null;

      var _parent = parent;

      var _story = null;

      var base = {
        constructor: function (options) {
          _config = _.extend(_defaults, options || {});

          _classes = {
            container: _config.class_prefix + '-container',
            item: {
              wrapper: _config.class_prefix + '-item',
              arrow: _config.class_prefix + '-arrow',
              disregard: _config.class_prefix + '-disregard',
              content: _config.class_prefix + '-content',
              actions: _config.class_prefix + '-actions',
              action: _config.class_prefix + '-action'
            }
          };

          this._generate();
        },
        getId: function () {
          return _id;
        },
        getElement: function () {
          return _item;
        },
        _generate: function () {
          var _self = this;
          var outer, inner, content = null;

          _item = outer = jQuery('<div class="' + _classes.item.wrapper + '-outer"/>');
          outer.css({
            display: 'none'
          });
          inner = jQuery('<div class="' + _classes.item.wrapper + '-inner"/>');
          inner.appendTo(outer);

          if (_config.bindTo) {
            outer.addClass(_classes.item.wrapper + '-binded');

            var arrow = jQuery('<div class="' + _classes.item.arrow + '"/>');
            arrow.appendTo(outer);
          } else {
            outer.addClass(_classes.item.wrapper + '-normal');
          }

          content = jQuery('<div class="' + _classes.item.content + '"/>');
          content.html(_config.body);
          content.appendTo(inner);

          if (_config.actions.length) {
            var actions_holder = jQuery('<div class="' + _classes.item.actions + '"/>');
            actions_holder.appendTo(inner);
            jQuery.each(_config.actions, function (i, opts) {
              var action = jQuery('<button name="' + opts.name + '" class="button-' + opts.name + '">' + opts.label + '</button>').button();
              action.on('click', function (e) {
                if (_story) {
                  opts.cb(e, _story, _self);
                } else {
                  opts.cb(e, _self);
                }

              });
              if (opts.className) {
                action.addClass(opts.className);
              }
              actions_holder.append(action);
            });
          }

          _item.on('click', function (e) {
            if (_config.callbacks.onClick) {
              _config.callbacks.onClick(e, _self);
            } else {
              if (!_story) {
                _self.close();
              }
            }
          });

          if (_config.auto_show) {
            this.show();
          }

          this._setPosition();

          _id = _midgardnotifications_active.push(this);

          _parent.append(_item);
        },
        
       _calculatePositionForGravity: function (item, gravity, target, itemDimensions) {
          item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_' + gravity);
          switch (gravity) {
          case 'TL':
            return {
              left: target.left,
              top: target.top + target.height + 'px'
            };
          case 'TR':
            return {
              left: target.left + target.width - itemDimensions.width + 'px',
              top: target.top + target.height + 'px'
            };
          case 'BL':
            return {
              left: target.left + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'BR':
            return {
              left: target.left + target.width - itemDimensions.width + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'LT':
            return {
              left: target.left + target.width + 'px',
              top: target.top + 'px'
            };
          case 'LB':
            return {
              left: target.left + target.width + 'px',
              top: target.top + target.height - itemDimensions.height + 'px'
            };
          case 'RT':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + 'px'
            };
          case 'RB':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + target.height - itemDimensions.height + 'px'
            };
          case 'T':
            return {
              left: target.left + target.width / 2 - itemDimensions.width / 2 + 'px',
              top: target.top + target.height + 'px'
            };
          case 'R':
            return {
              left: target.left - itemDimensions.width + 'px',
              top: target.top + target.height / 2 - itemDimensions.height / 2 + 'px'
            };
          case 'B':
            return {
              left: target.left + target.width / 2 - itemDimensions.width / 2 + 'px',
              top: target.top - itemDimensions.height + 'px'
            };
          case 'L':
            return {
              left: target.left + target.width + 'px',
              top: target.top + target.height / 2 - itemDimensions.height / 2 + 'px'
            };
          }
        },
        
        _isFixed: function (element) {
          if (element === document) {
            return false;
          }
          if (element.css('position') === 'fixed') {
            return true;
          }
          var parentElement = element.offsetParent();
          if (parentElement.get(0) === element.get(0)) {
            return false;
          }
          return this._isFixed(parentElement);
        },

        _setPosition: function () {
          var pos;
          if (_config.bindTo) {
            var itemDimensions = {
              width: _item.width() ? _item.width() : 280,
              height: _item.height() ? _item.height() : 109
            };
            
            _bind_target = jQuery(_config.bindTo);
            var properties = {};
            
            var targetDimensions = {
              width: _bind_target.outerWidth(),
              height: _bind_target.outerHeight()
            };
            
            if (this._isFixed(_bind_target)) {
              properties.position = 'fixed';
              targetDimensions.left = _bind_target.offset().left;
              targetDimensions.top = _bind_target.position().top;
            } else {
              properties.position = 'absolute';
              targetDimensions.left = _bind_target.offset().left;
              targetDimensions.top = _bind_target.offset().top;
            }
            
            pos = this._calculatePositionForGravity(_item, _config.gravity, targetDimensions, itemDimensions);
            properties.top = pos.top;
            properties.left = pos.left;

            _item.css(properties);

            return;
          }

          if (!_config.position) {
            _config.position = 'top right';
          }

          var marginTop = jQuery('.create-ui-toolbar-wrapper').outerHeight(true) + 6;
          pos = {
            position: 'fixed'
          };

          var item;
          var activeHeight = function (items) {
            var total_height = 0;
            jQuery.each(items, function (i, item) {
              if (!item) {
                return;
              }
              total_height += item.getElement().height();
            });
            return total_height;
          };

          if (_config.position.match(/top/)) {
            pos.top = marginTop + activeHeight(_midgardnotifications_active) + 'px';
          }
          if (_config.position.match(/bottom/)) {
            pos.bottom = (_midgardnotifications_active.length - 1 * item.height()) + item.height() + 10 + 'px';
          }
          if (_config.position.match(/right/)) {
            pos.right = 20 + 'px';
          }
          if (_config.position.match(/left/)) {
            pos.left = 20 + 'px';
          }

          _item.css(pos);
        },
        show: function () {
          var self = this;
          var w_t, w_b, b_b, b_t, e_t, e_h;

          if (_config.callbacks.beforeShow) {
            _config.callbacks.beforeShow(self);
          }

          if (_config.bindTo) {
            var _bind_target = jQuery(_config.bindTo);
            w_t = jQuery(window).scrollTop();
            w_b = jQuery(window).scrollTop() + jQuery(window).height();
            b_t = parseFloat(_item.offset().top, 10);
            e_t = _bind_target.offset().top;
            e_h = _bind_target.outerHeight();

            if (e_t < b_t) {
              b_t = e_t;
            }

            b_b = parseFloat(_item.offset().top, 10) + _item.height();
            if ((e_t + e_h) > b_b) {
              b_b = e_t + e_h;
            }
          }

          if (_config.timeout > 0 && !_config.actions.length) {
            window.setTimeout(function () {
              self.close();
            }, _config.timeout);
          }

          if (_config.bindTo && (b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)) {
            jQuery('html, body').stop().animate({
              scrollTop: b_t
            }, 500, 'easeInOutExpo', function () {
              _config.effects.onShow(_item, function () {
                if (_config.callbacks.afterShow) {
                  _config.callbacks.afterShow(self);
                }
              });
            });
          } else {
            _config.effects.onShow(_item, function () {
              if (_config.callbacks.afterShow) {
                _config.callbacks.afterShow(self);
              }
            });
          }
        },
        close: function () {
          var self = this;
          if (_config.callbacks.beforeClose) {
            _config.callbacks.beforeClose(self);
          }
          _config.effects.onHide(_item, function () {
            if (_config.callbacks.afterClose) {
              _config.callbacks.afterClose(self);
            }
            self.destroy();
          });
        },
        destroy: function () {
          var self = this;
          jQuery.each(_midgardnotifications_active, function (i, item) {
            if (item) {
              if (item.getId() == self.getId()) {
                delete _midgardnotifications_active[i];
              }
            }
          });
          jQuery(_item).remove();
        },
        setStory: function (story) {
          _story = story;
        },
        setName: function (name) {
          _item.addClass(_classes.item.wrapper + '-custom-' + name);
          this.name = name;
        }
      };
      base.constructor(options);
      delete base.constructor;

      return base;
    };

  var MidgardNotificationStoryline = function (options, items) {
      var _defaults = {};
      var _config = {};
      var _storyline = {};
      var _current_notification = {};
      var _previous_item_name = null;
      var _first_item_name = null;
      var _last_item_name = null;
      var _current_item = null;

      var base = {
        constructor: function (options) {
          _config = _.extend(_defaults, options || {});
        },
        setStoryline: function (items) {
          var default_structure = {
            content: '',
            actions: [],
            show_actions: true,
            notification: {},
            // Notification options to override
            back: null,
            back_label: null,
            forward: null,
            forward_label: null,
            beforeShow: null,
            afterShow: null,
            beforeClose: null,
            afterClose: null
          };

          _storyline = {};
          _current_item = null;
          _previous_item_name = null;
          _first_item_name = null;
          _last_item_name = null;

          var self = this;

          jQuery.each(items, function (name, it) {
            var item = jQuery.extend({}, default_structure, it);
            item.name = name;
            var notification = jQuery.extend({}, default_structure.notification, it.notification || {});
            notification.body = item.content;

            notification.auto_show = false;
            if (item.actions.length) {
              notification.delay = 0;
            }
            notification.callbacks = {
              beforeShow: function (notif) {
                if (item.beforeShow) {
                  item.beforeShow(notif, self);
                }
              },
              afterShow: function (notif) {
                if (item.afterShow) {
                  item.afterShow(notif, self);
                }
              },
              beforeClose: function (notif) {
                if (item.beforeClose) {
                  item.beforeClose(notif, self);
                }
              },
              afterClose: function (notif) {
                if (item.afterClose) {
                  item.afterClose(notif, self);
                }
                _previous_item_name = notif.name;
              }
            };

            notification.actions = [];

            if (item.show_actions) {
              if (item.back) {
                var back_label = item.back_label;
                if (!back_label) {
                  back_label = 'Back';
                }
                notification.actions.push({
                  name: 'back',
                  label: back_label,
                  cb: function (e, story, notif) {
                    story.previous();
                  }
                });
              }

              if (item.forward) {
                var forward_label = item.forward_label;
                if (!forward_label) {
                  forward_label = 'Back';
                }
                notification.actions.push({
                  name: 'forward',
                  label: forward_label,
                  cb: function (e, story, notif) {
                    story.next();
                  }
                });
              }

              if (item.actions.length) {
                jQuery.each(item.actions, function (i, act) {
                  notification.actions.push(item.actions[i]);
                });
              }
            }

            if (!_first_item_name) {
              _first_item_name = name;
            }
            _last_item_name = name;

            item.notification = notification;

            _storyline[name] = item;
          });
          return _storyline;
        },
        start: function () {
          this._showNotification(_storyline[_first_item_name]);
        },
        stop: function () {
          _current_item.close();
          _current_item = null;
          _previous_item_name = null;
        },
        next: function () {
          _current_item.close();
          if (_storyline[_current_item.name].forward) {
            var next_item = _storyline[_current_item.name].forward;
            this._showNotification(_storyline[next_item]);
          } else {
            this._showNotification(_storyline[_last_item_name]);
          }
        },
        previous: function () {
          if (_previous_item_name) {
            _current_item.close();
            if (_storyline[_current_item.name].back) {
              var prev_item = _storyline[_current_item.name].back;
              this._showNotification(_storyline[prev_item]);
            } else {
              this._showNotification(_storyline[_previous_item_name]);
            }
          } else {
            this.stop();
          }
        },
        _showNotification: function (item) {
          _current_item = new MidgardNotification(jQuery('body'), item.notification);
          _current_item.setStory(this);
          _current_item.setName(item.name);
          _current_item.show();

          return _current_item;
        }
      };
      base.constructor(options);
      delete base.constructor;
      if (items) {
        base.setStoryline(items);
      }

      return base;
    };

  var _createTutorialStoryline = {
    'start': {
      content: 'Welcome to CreateJS tutorial!',
      forward: 'toolbar_toggle',
      forward_label: 'Start tutorial',
      actions: [{
        name: 'quit',
        label: 'Quit',
        cb: function (a, story, notif) {
          story.stop();
        }
      }]
    },
    'toolbar_toggle': {
      content: 'This is the CreateJS toolbars toggle button.<br />You can hide and show the full toolbar by clicking here.<br />Try it now.',
      forward: 'edit_button',
      show_actions: false,
      afterShow: function (notification, story) {
        jQuery('body').on('midgardtoolbarstatechange', function (event, options) {
          if (options.display == 'full') {
            story.next();
            jQuery('body').off('midgardtoolbarstatechange');
          }
        });
      },
      notification: {
        bindTo: '#midgard-bar-hidebutton',
        timeout: 0,
        gravity: 'TL'
      }
    },
    'edit_button': {
      content: 'This is the edit button.<br />Try it now.',
      show_actions: false,
      afterShow: function (notification, story) {
        jQuery('body').on('midgardcreatestatechange', function (event, options) {
          if (options.state == 'edit') {
            story.next();
            jQuery('body').off('midgardcreatestatechange');
          }
        });
      },
      notification: {
        bindTo: '.ui-button[for=midgardcreate-edit]',
        timeout: 0,
        gravity: 'TL'
      }
    },
    'end': {
      content: 'Thank you for watching!<br />Happy content editing times await you!'
    }
  };

  jQuery.widget('Midgard.midgardNotifications', {
    options: {
      notification_defaults: {
        class_prefix: 'midgardNotifications',
        position: 'top right'
      }
    },

    _create: function () {
      this.classes = {
        container: this.options.notification_defaults.class_prefix + '-container'
      };

      if (jQuery('.' + this.classes.container, this.element).length) {
        this.container = jQuery('.' + this.classes.container, this.element);
        this._parseFromDOM();
      } else {
        this.container = jQuery('<div class="' + this.classes.container + '" />');
        this.element.append(this.container);
      }
    },

    destroy: function () {
      this.container.remove();
      jQuery.Widget.prototype.destroy.call(this);
    },

    _init: function () {},

    _parseFromDOM: function (path) {

    },

    showStory: function (options, items) {
      var story = new MidgardNotificationStoryline(options, items);
      story.start();

      return story;
    },

    create: function (options) {
      options = jQuery.extend({}, this.options.notification_defaults, options || {});

      var item = new MidgardNotification(this.container, options);
      item.show();

      return item;
    },

    showTutorial: function () {
      this.showStory({}, _createTutorialStoryline);
    }
  });

})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false */
  'use strict';

  jQuery.widget('Midgard.midgardStorage', {
    saveEnabled: true,
    options: {
      // Whether to use localstorage
      localStorage: false,
      // String prefix for localStorage identifiers
      storagePrefix: '',
      removeLocalstorageOnIgnore: true,
      // VIE instance to use for storage handling
      vie: null,
      // URL callback for Backbone.sync
      url: '',
      // Whether to enable automatic saving
      autoSave: false,
      // How often to autosave in milliseconds
      autoSaveInterval: 5000,
      // Whether to save entities that are referenced by entities
      // we're saving to the server.
      saveReferencedNew: false,
      saveReferencedChanged: false,
      // Namespace used for events from midgardEditable-derived widget
      editableNs: 'midgardeditable',
      // CSS selector for the Edit button, leave to null to not bind
      // notifications to any element
      editSelector: '#midgardcreate-edit a',
      localize: function (id, language) {
        return window.midgardCreate.localize(id, language);
      },
      language: null
    },

    _create: function () {
      var widget = this;
      this.changedModels = [];

      if (window.localStorage) {
        this.options.localStorage = true;
      }

      this.vie = this.options.vie;

      this.vie.entities.on('add', function (model) {
        // Add the back-end URL used by Backbone.sync
        model.url = widget.options.url;
        model.toJSON = model.toJSONLD;
      });

      widget._bindEditables();
      if (widget.options.autoSave) {
        widget._autoSave();
      }
    },

    _autoSave: function () {
      var widget = this;
      widget.saveEnabled = true;

      var doAutoSave = function () {
        if (!widget.saveEnabled) {
          return;
        }

        if (widget.changedModels.length === 0) {
          return;
        }

        widget.saveRemoteAll({
          // We make autosaves silent so that potential changes from server
          // don't disrupt user while writing.
          silent: true
        });
      };

      var timeout = window.setInterval(doAutoSave, widget.options.autoSaveInterval);

      this.element.on('startPreventSave', function () {
        if (timeout) {
          window.clearInterval(timeout);
          timeout = null;
        }
        widget.disableAutoSave();
      });
      this.element.on('stopPreventSave', function () {
        if (!timeout) {
          timeout = window.setInterval(doAutoSave, widget.options.autoSaveInterval);
        }
        widget.enableAutoSave();
      });

    },

    enableAutoSave: function () {
      this.saveEnabled = true;
    },

    disableAutoSave: function () {
      this.saveEnabled = false;
    },

    _bindEditables: function () {
      var widget = this;
      this.restorables = [];
      var restorer;

      widget.element.on(widget.options.editableNs + 'changed', function (event, options) {
        if (_.indexOf(widget.changedModels, options.instance) === -1) {
          widget.changedModels.push(options.instance);
        }
        widget._saveLocal(options.instance);
      });

      widget.element.on(widget.options.editableNs + 'disable', function (event, options) {
        widget.revertChanges(options.instance);
      });

      widget.element.on(widget.options.editableNs + 'enable', function (event, options) {
        if (!options.instance._originalAttributes) {
          options.instance._originalAttributes = _.clone(options.instance.attributes);
        }

        if (!options.instance.isNew() && widget._checkLocal(options.instance)) {
          // We have locally-stored modifications, user needs to be asked
          widget.restorables.push(options.instance);
        }

        /*_.each(options.instance.attributes, function (attributeValue, property) {
          if (attributeValue instanceof widget.vie.Collection) {
            widget._readLocalReferences(options.instance, property, attributeValue);
          }
        });*/
      });

      widget.element.on('midgardcreatestatechange', function (event, options) {
        if (options.state === 'browse' || widget.restorables.length === 0) {
          widget.restorables = [];
          if (restorer) {
            restorer.close();
          }
          return;
        }
        restorer = widget.checkRestore();
      });

      widget.element.on('midgardstorageloaded', function (event, options) {
        if (_.indexOf(widget.changedModels, options.instance) === -1) {
          widget.changedModels.push(options.instance);
        }
      });
    },

    checkRestore: function () {
      var widget = this;
      if (widget.restorables.length === 0) {
        return;
      }

      var message;
      var restorer;
      if (widget.restorables.length === 1) {
        message = _.template(widget.options.localize('localModification', widget.options.language), {
          label: widget.restorables[0].getSubjectUri()
        });
      } else {
        message = _.template(widget.options.localize('localModifications', widget.options.language), {
          number: widget.restorables.length
        });
      }

      var doRestore = function (event, notification) {
        widget.restoreLocalAll();
        restorer.close();
      };

      var doIgnore = function (event, notification) {
        widget.ignoreLocal();
        restorer.close();
      };

      restorer = jQuery('body').midgardNotifications('create', {
        bindTo: widget.options.editSelector,
        gravity: 'TR',
        body: message,
        timeout: 0,
        actions: [
          {
            name: 'restore',
            label: widget.options.localize('Restore', widget.options.language),
            cb: doRestore,
            className: 'create-ui-btn'
          },
          {
            name: 'ignore',
            label: widget.options.localize('Ignore', widget.options.language),
            cb: doIgnore,
            className: 'create-ui-btn'
          }
        ],
        callbacks: {
          beforeShow: function () {
            if (!window.Mousetrap) {
              return;
            }
            window.Mousetrap.bind(['command+shift+r', 'ctrl+shift+r'], function (event) {
              event.preventDefault();
              doRestore();
            });
            window.Mousetrap.bind(['command+shift+i', 'ctrl+shift+i'], function (event) {
              event.preventDefault();
              doIgnore();
            });
          },
          afterClose: function () {
            if (!window.Mousetrap) {
              return;
            }
            window.Mousetrap.unbind(['command+shift+r', 'ctrl+shift+r']);
            window.Mousetrap.unbind(['command+shift+i', 'ctrl+shift+i']);
          }
        }
      });
      return restorer;
    },

    restoreLocalAll: function () {
      _.each(this.restorables, function (instance) {
        this.readLocal(instance);
      }, this);
      this.restorables = [];
    },

    ignoreLocal: function () {
      if (this.options.removeLocalstorageOnIgnore) {
        _.each(this.restorables, function (instance) {
          this._removeLocal(instance);
        }, this);
      }
      this.restorables = [];
    },

    saveReferences: function (model) {
      _.each(model.attributes, function (value, property) {
        if (!value || !value.isCollection) {
          return;
        }

        value.each(function (referencedModel) {
          if (this.changedModels.indexOf(referencedModel) !== -1) {
            // The referenced model is already in the save queue
            return;
          }

          if (referencedModel.isNew() && this.options.saveReferencedNew) {
            return referencedModel.save();
          }

          if (referencedModel.hasChanged() && this.options.saveReferencedChanged) {
            return referencedModel.save();
          }
        }, this);
      }, this);
    },

    saveRemote: function (model, options) {
      // Optionally handle entities referenced in this model first
      this.saveReferences(model);

      this._trigger('saveentity', null, {
        entity: model,
        options: options
      });

      var widget = this;
      model.save(null, _.extend({}, options, {
        success: function (m, response) {
          // From now on we're going with the values we have on server
          model._originalAttributes = _.clone(model.attributes);
          widget._removeLocal(model);
          window.setTimeout(function () {
            // Remove the model from the list of changed models after saving
            widget.changedModels.splice(widget.changedModels.indexOf(model), 1);
          }, 0);
          if (_.isFunction(options.success)) {
            options.success(m, response);
          }
          widget._trigger('savedentity', null, {
            entity: model,
            options: options
          });
        },
        error: function (m, response) {
          if (_.isFunction(options.error)) {
            options.error(m, response);
          }
        }
      }));
    },

    saveRemoteAll: function (options) {
      var widget = this;
      if (widget.changedModels.length === 0) {
        return;
      }

      widget._trigger('save', null, {
        entities: widget.changedModels,
        options: options,
        // Deprecated
        models: widget.changedModels
      });

      var notification_msg;
      var needed = widget.changedModels.length;
      if (needed > 1) {
        notification_msg = _.template(widget.options.localize('saveSuccessMultiple', widget.options.language), {
          number: needed
        });
      } else {
        notification_msg = _.template(widget.options.localize('saveSuccess', widget.options.language), {
          label: widget.changedModels[0].getSubjectUri()
        });
      }

      widget.disableAutoSave();
      _.each(widget.changedModels, function (model) {
        this.saveRemote(model, {
          success: function (m, response) {
            needed--;
            if (needed <= 0) {
              // All models were happily saved
              widget._trigger('saved', null, {
                options: options
              });
              if (options && _.isFunction(options.success)) {
                options.success(m, response);
              }
              jQuery('body').midgardNotifications('create', {
                body: notification_msg
              });
              widget.enableAutoSave();
            }
          },
          error: function (m, err) {
            if (options && _.isFunction(options.error)) {
              options.error(m, err);
            }
            jQuery('body').midgardNotifications('create', {
              body: _.template(widget.options.localize('saveError', widget.options.language), {
                error: err.responseText || ''
              }),
              timeout: 0
            });

            widget._trigger('error', null, {
              instance: model
            });
          }
        });
      }, this);
    },

    _saveLocal: function (model) {
      if (!this.options.localStorage) {
        return;
      }

      if (model.isNew()) {
        // Anonymous object, save as refs instead
        if (!model.primaryCollection) {
          return;
        }
        return this._saveLocalReferences(model.primaryCollection.subject, model.primaryCollection.predicate, model);
      }
      var key = this.options.storagePrefix + model.getSubjectUri();
      window.localStorage.setItem(key, JSON.stringify(model.toJSONLD()));
    },

    _getReferenceId: function (model, property) {
      return model.id + ':' + property;
    },

    _saveLocalReferences: function (subject, predicate, model) {
      if (!this.options.localStorage) {
        return;
      }

      if (!subject || !predicate) {
        return;
      }

      var widget = this;
      var identifier = this.options.storagePrefix + subject + ':' + predicate;
      var json = model.toJSONLD();
      if (window.localStorage.getItem(identifier)) {
        var referenceList = JSON.parse(window.localStorage.getItem(identifier));
        var index = _.pluck(referenceList, '@').indexOf(json['@']);
        if (index !== -1) {
          referenceList[index] = json;
        } else {
          referenceList.push(json);
        }
        window.localStorage.setItem(identifier, JSON.stringify(referenceList));
        return;
      }
      window.localStorage.setItem(identifier, JSON.stringify([json]));
    },

    _checkLocal: function (model) {
      if (!this.options.localStorage) {
        return false;
      }

      var key = this.options.storagePrefix + model.getSubjectUri();
      var local = window.localStorage.getItem(key);
      if (!local) {
        return false;
      }

      return true;
    },

    hasLocal: function (model) {
      if (!this.options.localStorage) {
        return false;
      }
      var key = this.options.storagePrefix + model.getSubjectUri();
      if (!window.localStorage.getItem(key)) {
        return false;
      }
      return true;
    },

    readLocal: function (model) {
      if (!this.options.localStorage) {
        return;
      }

      var key = this.options.storagePrefix + model.getSubjectUri();
      var local = window.localStorage.getItem(key);
      if (!local) {
        return;
      }
      if (!model._originalAttributes) {
        model._originalAttributes = _.clone(model.attributes);
      }
      var parsed = JSON.parse(local);
      var entity = this.vie.entities.addOrUpdate(parsed, {
        overrideAttributes: true
      });

      this._trigger('loaded', null, {
        instance: entity
      });
    },

    _readLocalReferences: function (model, property, collection) {
      if (!this.options.localStorage) {
        return;
      }

      var identifier = this.options.storagePrefix + this._getReferenceId(model, property);
      var local = window.localStorage.getItem(identifier);
      if (!local) {
        return;
      }
      collection.add(JSON.parse(local));
    },

    revertChanges: function (model) {
      var widget = this;

      // Remove unsaved collection members
      if (!model) { return; }
      _.each(model.attributes, function (attributeValue, property) {
        if (attributeValue instanceof widget.vie.Collection) {
          var removables = [];
          attributeValue.forEach(function (model) {
            if (model.isNew()) {
              removables.push(model);
            }
          });
          attributeValue.remove(removables);
        }
      });

      // Restore original object properties
      if (!model.changedAttributes()) {
        if (model._originalAttributes) {
          model.set(model._originalAttributes);
        }
        return;
      }

      model.set(model.previousAttributes());
    },

    _removeLocal: function (model) {
      if (!this.options.localStorage) {
        return;
      }
      var key = this.options.storagePrefix + model.getSubjectUri();
      window.localStorage.removeItem(key);
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false */
  'use strict';

  jQuery.widget('Midgard.midgardToolbar', {
    options: {
      display: 'full',
      templates: {
        minimized: '<div class="create-ui-logo"><a class="create-ui-toggle" id="create-ui-toggle-toolbar"></a></div>',
        full: '<div class="create-ui-toolbar-wrapper"><div class="create-ui-toolbar-toolarea"><%= dynamic %><%= status %></div></div>',
        toolcontainer: '<div class="create-ui-toolbar-<%= name %>toolarea"><ul class="create-ui-<%= name %>tools"><%= content %></ul></div>',
        toolarea: '<li class="create-ui-tool-<%= name %>area"></li>'
      }
    },

    _create: function () {
      this.element.append(this._getMinimized());
      this.element.append(this._getFull());

      var widget = this;
      jQuery('.create-ui-toggle', this.element).click(function () {
        if (widget.options.display === 'full') {
          widget.setDisplay('minimized');
        } else {
          widget.setDisplay('full');
        }
      });

      jQuery(this.element).on('midgardcreatestatechange', function (event, options) {
        if (options.state == 'browse') {
          widget._clearWorkflows();
        }
      });

      jQuery(this.element).on('midgardworkflowschanged', function (event, options) {
        widget._clearWorkflows();
        if (options.workflows.length) {
          options.workflows.each(function (workflow) {
            var workflowsInstance = jQuery('body').data('Midgard-midgardWorkflows');
            if (!workflowsInstance) {
              // pre-1.10 jQuery UI
              workflowsInstance = jQuery('body').data('midgardWorkflows');
            }
            var html = workflowsInstance.prepareItem(options.instance, workflow, function (err, model) {
              widget._clearWorkflows();
              if (err) {
                return;
              }
            });
            jQuery('.create-ui-tool-workflowarea', widget.element).append(html);
          });
        }
      });
    },

    _init: function () {
      this.setDisplay(this.options.display);
    },

    setDisplay: function (value) {
      if (value === this.options.display) {
        return;
      }
      if (value === 'minimized') {
        this.hide();
        this.options.display = 'minimized';
      } else {
        this.show();
        this.options.display = 'full';
      }
      this._trigger('statechange', null, this.options);
    },

    hide: function () {
      jQuery('div.create-ui-toolbar-wrapper').fadeToggle('fast', 'linear');
    },

    show: function () {
      jQuery('div.create-ui-toolbar-wrapper').fadeToggle('fast', 'linear');
    },

    _getMinimized: function () {
      return jQuery(_.template(this.options.templates.minimized, {}));
    },

    _getFull: function () {
      return jQuery(_.template(this.options.templates.full, {
        dynamic: _.template(this.options.templates.toolcontainer, {
          name: 'dynamic',
          content:
            _.template(this.options.templates.toolarea, {
              name: 'metadata'
            }) +
            _.template(this.options.templates.toolarea, {
              name: 'workflow'
            }) +
            _.template(this.options.templates.toolarea, {
              name: 'free'
            })
        }),
        status: _.template(this.options.templates.toolcontainer, {
          name: 'status',
          content: ''
        })
      }));
    },

    _clearWorkflows: function () {
      jQuery('.create-ui-tool-workflowarea', this.element).empty();
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false Backbone:false */
  'use strict';

  jQuery.widget('Midgard.midgardWorkflows', {
    options: {
      url: function (model) {},
      templates: {
        button: '<button class="create-ui-btn" id="<%= id %>"><%= label %></button>'
      },
      renderers: {
        button: function (model, workflow, action_cb, final_cb) {
          var button_id = 'midgardcreate-workflow_' + workflow.get('name');
          var html = jQuery(_.template(this.options.templates.button, {
            id: button_id,
            label: workflow.get('label')
          })).button();

          html.on('click', function (evt) {
            action_cb(model, workflow, final_cb);
          });
          return html;
        }
      },
      action_types: {
        backbone_save: function (model, workflow, callback) {
          var copy_of_url = model.url;
          var original_model = model.clone();
          original_model.url = copy_of_url;

          var action = workflow.get('action');
          if (action.url) {
            model.url = action.url;
          }
          original_model.save(null, {
            success: function (m) {
              model.url = copy_of_url;
              model.change();
              callback(null, model);
            },
            error: function (m, err) {
              model.url = copy_of_url;
              model.change();
              callback(err, model);
            }
          });
        },
        backbone_destroy: function (model, workflow, callback) {
          var copy_of_url = model.url;
          var original_model = model.clone();
          original_model.url = copy_of_url;

          var action = workflow.get('action');
          if (action.url) {
            model.url = action.url;
          }

          model.destroy({
            success: function (m) {
              model.url = copy_of_url;
              model.change();
              callback(null, m);
            },
            error: function (m, err) {
              model.url = copy_of_url;
              model.change();
              callback(err, model);
            }
          });
        },
        http: function (model, workflow, callback) {
          var action = workflow.get('action');
          if (!action.url) {
            return callback('No action url defined!');
          }

          var wf_opts = {};
          if (action.http) {
            wf_opts = action.http;
          }

          var ajax_options = jQuery.extend({
            url: action.url,
            type: 'POST',
            data: model.toJSON(),
            success: function () {
              model.fetch({
                success: function (model) {
                  callback(null, model);
                },
                error: function (model, err) {
                  callback(err, model);
                }
              });
            }
          }, wf_opts);

          jQuery.ajax(ajax_options);
        }
      }
    },

    _init: function () {
      this._renderers = {};
      this._action_types = {};

      this._parseRenderersAndTypes();

      this._last_instance = null;

      this.ModelWorkflowModel = Backbone.Model.extend({
        defaults: {
          name: '',
          label: '',
          type: 'button',
          action: {
            type: 'backbone_save'
          }
        }
      });

      this.workflows = {};

      var widget = this;
      jQuery(this.element).on('midgardeditableactivated', function (event, options) {
        widget._fetchWorkflows(options.instance);
      });
    },

    _fetchWorkflows: function (model) {
      var widget = this;
      if (model.isNew()) {
        widget._trigger('changed', null, {
          instance: model,
          workflows: []
        });
        return;
      }

      if (widget._last_instance == model) {
        if (widget.workflows[model.cid]) {
          widget._trigger('changed', null, {
            instance: model,
            workflows: widget.workflows[model.cid]
          });
        }
        return;
      }
      widget._last_instance = model;

      if (widget.workflows[model.cid]) {
        widget._trigger('changed', null, {
          instance: model,
          workflows: widget.workflows[model.cid]
        });
        return;
      }

      if (widget.options.url) {
        widget._fetchModelWorkflows(model);
      } else {
        var flows = new(widget._generateCollectionFor(model))([], {});
        widget._trigger('changed', null, {
          instance: model,
          workflows: flows
        });
      }
    },

    _parseRenderersAndTypes: function () {
      var widget = this;
      jQuery.each(this.options.renderers, function (k, v) {
        widget.setRenderer(k, v);
      });
      jQuery.each(this.options.action_types, function (k, v) {
        widget.setActionType(k, v);
      });
    },

    setRenderer: function (name, callbacks) {
      this._renderers[name] = callbacks;
    },
    getRenderer: function (name) {
      if (!this._renderers[name]) {
        return false;
      }

      return this._renderers[name];
    },
    setActionType: function (name, callback) {
      this._action_types[name] = callback;
    },
    getActionType: function (name) {
      return this._action_types[name];
    },

    prepareItem: function (model, workflow, final_cb) {
      var widget = this;

      var renderer = this.getRenderer(workflow.get("type"));
      var action_type_cb = this.getActionType(workflow.get("action").type);

      return renderer.call(this, model, workflow, action_type_cb, function (err, m) {
        delete widget.workflows[model.cid];
        widget._last_instance = null;
        if (workflow.get('action').type !== 'backbone_destroy') {
          // Get an updated list of workflows
          widget._fetchModelWorkflows(model);
        }
        final_cb(err, m);
      });
    },

    _generateCollectionFor: function (model) {
      var collectionSettings = {
        model: this.ModelWorkflowModel
      };
      if (this.options.url) {
        collectionSettings.url = this.options.url(model);
      }
      return Backbone.Collection.extend(collectionSettings);
    },

    _fetchModelWorkflows: function (model) {
      if (model.isNew()) {
        return;
      }
      var widget = this;

      widget.workflows[model.cid] = new(this._generateCollectionFor(model))([], {});
      widget.workflows[model.cid].fetch({
        success: function (collection) {
          widget.workflows[model.cid].reset(collection.models);

          widget._trigger('changed', null, {
            instance: model,
            workflows: widget.workflows[model.cid]
          });
        },
        error: function (model, err) {
          //console.log('error fetching flows', err);
        }
      });
    }
  });
})(jQuery);

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}

window.midgardCreate.localize = function (id, language) {
  if (!window.midgardCreate.locale) {
    // No localization files loaded, return as-is
    return id;
  }
  if (window.midgardCreate.locale[language] && window.midgardCreate.locale[language][id]) {
    return window.midgardCreate.locale[language][id];
  }
  if (window.midgardCreate.locale.en[id]) {
    return window.midgardCreate.locale.en[id];
  }
  return id;
};

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false console:false */
  'use strict';

  // # Widget for adding items to a collection
  jQuery.widget('Midgard.midgardCollectionAdd', {
    options: {
      editingWidgets: null,
      collection: null,
      model: null,
      definition: null,
      view: null,
      disabled: false,
      vie: null,
      editableOptions: null,
      templates: {
        button: '<button class="btn"><i class="icon-<%= icon %>"></i> <%= label %></button>'
      }
    },

    _create: function () {
      this.addButtons = [];
      var widget = this;
      if (!widget.options.collection.localStorage) {
        try {
          widget.options.collection.url = widget.options.model.url();
        } catch (e) {
          if (window.console) {
            console.log(e);
          }
        }
      }

      widget.options.collection.on('add', function (model) {
        model.primaryCollection = widget.options.collection;
        widget.options.vie.entities.add(model);
        model.collection = widget.options.collection;
      });

      // Re-check collection constraints
      widget.options.collection.on('add remove reset', widget.checkCollectionConstraints, widget);

      widget._bindCollectionView(widget.options.view);
    },

    _bindCollectionView: function (view) {
      var widget = this;
      view.on('add', function (itemView) {
        itemView.$el.effect('slide', function () {
          widget._makeEditable(itemView);
        });
      });
    },

    _makeEditable: function (itemView) {
      this.options.editableOptions.disabled = this.options.disabled;
      this.options.editableOptions.model = itemView.model;
      itemView.$el.midgardEditable(this.options.editableOptions);
    },

    _init: function () {
      if (this.options.disabled) {
        this.disable();
        return;
      }
      this.enable();
    },

    hideButtons: function () {
      _.each(this.addButtons, function (button) {
        button.hide();
      });
    },

    showButtons: function () {
      _.each(this.addButtons, function (button) {
        button.show();
      });
    },

    checkCollectionConstraints: function () {
      if (this.options.disabled) {
        return;
      }

      if (!this.options.view.canAdd()) {
        this.hideButtons();
        return;
      }

      if (!this.options.definition) {
        // We have now information on the constraints applying to this collection
        this.showButtons();
        return;
      }

      if (!this.options.definition.max || this.options.definition.max === -1) {
        // No maximum constraint
        this.showButtons();
        return;
      }

      if (this.options.collection.length < this.options.definition.max) {
        this.showButtons();
        return;
      }
      // Collection is already full by its definition
      this.hideButtons();
    },

    enable: function () {
      var widget = this;

      var addButton = jQuery(_.template(this.options.templates.button, {
        icon: 'plus',
        label: this.options.editableOptions.localize('Add', this.options.editableOptions.language)
      })).button();
      addButton.addClass('midgard-create-add');
      addButton.click(function () {
        widget.addItem(addButton);
      });
      jQuery(widget.options.view.el).after(addButton);

      widget.addButtons.push(addButton);
      widget.checkCollectionConstraints();
    },

    disable: function () {
      _.each(this.addButtons, function (button) {
        button.remove();
      });
      this.addButtons = [];
    },

    _getTypeActions: function (options) {
      var widget = this;
      var actions = [];
      _.each(this.options.definition.range, function (type) {
        var nsType = widget.options.collection.vie.namespaces.uri(type);
        if (!widget.options.view.canAdd(nsType)) {
          return;
        }
        actions.push({
          name: type,
          label: type,
          cb: function () {
            widget.options.collection.add({
              '@type': type
            }, options);
          },
          className: 'create-ui-btn'
        });
      });
      return actions;
    },

    addItem: function (button, options) {
      if (options === undefined) {
          options = {};
      }
      var addOptions = _.extend({}, options, { validate: false });

      var itemData = {};
      if (this.options.definition && this.options.definition.range) {
        if (this.options.definition.range.length === 1) {
          // Items can be of single type, add that
          itemData['@type'] = this.options.definition.range[0];
        } else {
          // Ask user which type to add
          jQuery('body').midgardNotifications('create', {
            bindTo: button,
            gravity: 'L',
            body: this.options.editableOptions.localize('Choose type to add', this.options.editableOptions.language),
            timeout: 0,
            actions: this._getTypeActions(addOptions)
          });
          return;
        }
      } else {
        // Check the view templates for possible non-Thing type to use
        var keys = _.keys(this.options.view.templates);
        if (keys.length == 2) {
          itemData['@type'] = keys[0];
        }
      }
      this.options.collection.add(itemData, addOptions);
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false console:false */
  'use strict';

  // # Widget for adding items anywhere inside a collection
  jQuery.widget('Midgard.midgardCollectionAddBetween', jQuery.Midgard.midgardCollectionAdd, {
    _bindCollectionView: function (view) {
      var widget = this;
      view.on('add', function (itemView) {
        //itemView.el.effect('slide');
        widget._makeEditable(itemView);
        widget._refreshButtons();
      });
      view.on('remove', function () {
        widget._refreshButtons();
      });
    },

    _refreshButtons: function () {
      var widget = this;
      window.setTimeout(function () {
        widget.disable();
        widget.enable();
      }, 1);
    },

    prepareButton: function (index) {
      var widget = this;
      var addButton = jQuery(_.template(this.options.templates.button, {
        icon: 'plus',
        label: ''
      })).button();
      addButton.addClass('midgard-create-add');
      addButton.click(function () {
        widget.addItem(addButton, {
          at: index
        });
      });
      return addButton;
    },

    enable: function () {
      var widget = this;

      var firstAddButton = widget.prepareButton(0);
      jQuery(widget.options.view.el).prepend(firstAddButton);
      widget.addButtons.push(firstAddButton);
      jQuery.each(widget.options.view.entityViews, function (cid, view) {
        var index = widget.options.collection.indexOf(view.model);
        var addButton = widget.prepareButton(index + 1);
        jQuery(view.el).append(addButton);
        widget.addButtons.push(addButton);
      });

      this.checkCollectionConstraints();
    },

    disable: function () {
      var widget = this;
      jQuery.each(widget.addButtons, function (idx, button) {
        button.remove();
      });
      widget.addButtons = [];
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false */
  'use strict';

  // # Base property editor widget
  //
  // This property editor widget provides a very simplistic `contentEditable`
  // property editor that can be used as standalone, but should more usually be
  // used as the base class for other property editor widgets.
  // This property editor widget is only useful for textual properties!
  //
  // Subclassing this base property editor widget is easy:
  //
  //     jQuery.widget('Namespace.MyWidget', jQuery.Create.editWidget, {
  //       // override any properties
  //     });
  jQuery.widget('Midgard.editWidget', {
    options: {
      disabled: false,
      vie: null
    },
    // override to enable the widget
    enable: function () {
      this.element.attr('contenteditable', 'true');
    },
    // override to disable the widget
    disable: function (disable) {
      this.element.attr('contenteditable', 'false');
    },
    // called by the jQuery UI plugin factory when creating the property editor
    // widget instance
    _create: function () {
      this._registerWidget();
      this._initialize();

      if (_.isFunction(this.options.decorate) && _.isFunction(this.options.decorateParams)) {
        // TRICKY: we can't use this.options.decorateParams()'s 'propertyName'
        // parameter just yet, because it will only be available after this
        // object has been created, but we're currently in the constructor!
        // Hence we have to duplicate part of its logic here.
        this.options.decorate(this.options.decorateParams(null, {
          propertyName: this.options.property,
          propertyEditor: this,
          propertyElement: this.element,
          // Deprecated.
          editor: this,
          predicate: this.options.property,
          element: this.element
        }));
      }
    },
    // called every time the property editor widget is called
    _init: function () {
      if (this.options.disabled) {
        this.disable();
        return;
      }
      this.enable();
    },
    // override this function to initialize the property editor widget functions
    _initialize: function () {
      var self = this;
      this.element.on('focus', function () {
        if (self.options.disabled) {
          return;
        }
        self.options.activated();
      });
      this.element.on('blur', function () {
        if (self.options.disabled) {
          return;
        }
        self.options.deactivated();
      });
      var before = this.element.html();
      this.element.on('keyup paste', function (event) {
        if (self.options.disabled) {
          return;
        }
        var current = jQuery(this).html();
        if (before !== current) {
          before = current;
          self.options.changed(current);
        }
      });
    },
    // used to register the property editor widget name with the DOM element
    _registerWidget: function () {
      this.element.data("createWidgetName", this.widgetName);
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false Aloha:false */
  'use strict';

  // # Aloha editing widget
  //
  // This widget allows editing textual contents using the
  // [Aloha](http://aloha-editor.org) rich text editor.
  //
  // Due to licensing incompatibilities, Aloha Editor needs to be installed
  // and configured separately.
  jQuery.widget('Midgard.alohaWidget', jQuery.Midgard.editWidget, {
    _initialize: function () {},
    enable: function () {
      var options = this.options;
      var editable;
      var currentElement = Aloha.jQuery(options.element.get(0)).aloha();
      _.each(Aloha.editables, function (aloha) {
        // Find the actual editable instance so we can hook to the events
        // correctly
        if (aloha.obj.get(0) === currentElement.get(0)) {
          editable = aloha;
        }
      });
      if (!editable) {
        return;
      }
      editable.vieEntity = options.entity;

      // Subscribe to activation and deactivation events
      Aloha.bind('aloha-editable-activated', function (event, data) {
        if (data.editable !== editable) {
          return;
        }
        options.activated();
      });
      Aloha.bind('aloha-editable-deactivated', function (event, data) {
        if (data.editable !== editable) {
          return;
        }
        options.deactivated();
      });

      Aloha.bind('aloha-smart-content-changed', function (event, data) {
        if (data.editable !== editable) {
          return;
        }
        if (!data.editable.isModified()) {
          return true;
        }
        options.changed(data.editable.getContents());
        data.editable.setUnmodified();
      });
      this.options.disabled = false;
    },
    disable: function () {
      Aloha.jQuery(this.options.element.get(0)).mahalo();
      this.options.disabled = true;
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false CKEDITOR:false */
  'use strict';

  // # CKEditor editing widget
  //
  // This widget allows editing textual content areas with the
  // [CKEditor](http://ckeditor.com/) rich text editor.
  jQuery.widget('Midgard.ckeditorWidget', jQuery.Midgard.editWidget, {
    enable: function () {
      this.element.attr('contentEditable', 'true');
      this.editor = CKEDITOR.inline(this.element.get(0));
      this.options.disabled = false;

      var widget = this;
      this.editor.on('focus', function () {
        widget.options.activated();
      });
      this.editor.on('blur', function () {
        widget.options.activated();
        widget.options.changed(widget.editor.getData());
      });
      this.editor.on('change', function () {
        widget.options.changed(widget.editor.getData());
      });
      this.editor.on('configLoaded', function() {
        jQuery.each(widget.options.editorOptions, function(optionName, option) {
          widget.editor.config[optionName] = option;
        });
      });
    },

    disable: function () {
      if (!this.editor) {
        return;
      }
      this.element.attr('contentEditable', 'false');
      this.editor.destroy();
      this.editor = null;
    },

    _initialize: function () {
      CKEDITOR.disableAutoInline = true;
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false */
  'use strict';

  // # Hallo editing widget
  //
  // This widget allows editing textual content areas with the
  // [Hallo](http://hallojs.org) rich text editor.
  jQuery.widget('Midgard.halloWidget', jQuery.Midgard.editWidget, {
    options: {
      editorOptions: {},
      disabled: true,
      toolbarState: 'full',
      vie: null,
      entity: null
    },
    enable: function () {
      jQuery(this.element).hallo({
        editable: true
      });
      this.options.disabled = false;
    },

    disable: function () {
      jQuery(this.element).hallo({
        editable: false
      });
      this.options.disabled = true;
    },

    _initialize: function () {
      jQuery(this.element).hallo(this.getHalloOptions());
      var self = this;
      jQuery(this.element).on('halloactivated', function (event, data) {
        self.options.activated();
      });
      jQuery(this.element).on('hallodeactivated', function (event, data) {
        self.options.deactivated();
      });
      jQuery(this.element).on('hallomodified', function (event, data) {
        self.options.changed(data.content);
        data.editable.setUnmodified();
      });

      jQuery(document).on('midgardtoolbarstatechange', function(event, data) {
        // Switch between Hallo configurations when toolbar state changes
        if (data.display === self.options.toolbarState) {
          return;
        }
        self.options.toolbarState = data.display;
        if (!self.element.data('IKS-hallo') && !self.element.data('hallo')) {
          // Hallo not yet instantiated
          return;
        }
        var newOptions = self.getHalloOptions();
        self.element.hallo('changeToolbar', newOptions.parentElement, newOptions.toolbar, true);
      });
    },

    getHalloOptions: function() {
      var defaults = {
        plugins: {
          halloformat: {},
          halloblock: {},
          hallolists: {},
          hallolink: {},
          halloimage: {
            entity: this.options.entity
          }
        },
        buttonCssClass: 'create-ui-btn-small',
        placeholder: '[' + this.options.property + ']'
      };

      if (typeof this.element.annotate === 'function' && this.options.vie.services.stanbol) {
        // Enable Hallo Annotate plugin by default if user has annotate.js
        // loaded and VIE has Stanbol enabled
        defaults.plugins.halloannotate = {
            vie: this.options.vie
        };
      }

      if (this.options.toolbarState === 'full') {
        // Use fixed toolbar in the Create tools area
        defaults.parentElement = jQuery('.create-ui-toolbar-dynamictoolarea .create-ui-tool-freearea');
        defaults.toolbar = 'halloToolbarFixed';
      } else {
        // Tools area minimized, use floating toolbar
        defaults.parentElement = 'body';
        defaults.toolbar = 'halloToolbarContextual';
      }
      return _.extend(defaults, this.options.editorOptions);
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false */
  'use strict';

  // # Redactor editing widget
  //
  // This widget allows editing textual content areas with the
  // [Redactor](http://redactorjs.com/) rich text editor.
  jQuery.widget('Midgard.redactorWidget', jQuery.Midgard.editWidget, {
    editor: null,

    options: {
      editorOptions: {},
      disabled: true
    },

    enable: function () {
      jQuery(this.element).redactor(this.getRedactorOptions());
      this.options.disabled = false;
    },

    disable: function () {
      jQuery(this.element).destroyEditor();
      this.options.disabled = true;
    },

    _initialize: function () {
      var self = this;
      jQuery(this.element).on('focus', function (event) {
        self.options.activated(); 
      });
      /*
      jQuery(this.element).on('blur', function (event) {
        self.options.deactivated(); 
      });
      */
    },

    getRedactorOptions: function () {
      var self = this;
      var overrides = {
        keyupCallback: function (obj, event) {
          self.options.changed(jQuery(self.element).getCode());
        },
        execCommandCallback: function (obj, command) {
          self.options.changed(jQuery(self.element).getCode());
        }
      };

      return _.extend(self.options.editorOptions, overrides);
    }
  });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false document:false tinymce:false */
  'use strict';

  // # TinyMCE editing widget
  //
  // This widget allows editing textual content areas with the
  // [TinyMCE](http://www.tinymce.com/) rich text editor.
  jQuery.widget('Midgard.tinymceWidget', jQuery.Midgard.editWidget, {
    enable: function () {
      this.element.attr('contentEditable', 'true');
      var id = this.element.attr('id');

      if (!id || tinymce.get(id)) {
        id = tinymce.DOM.uniqueId();
      }

      this.element.attr('id', id);
      this.editor = new tinymce.Editor(id, {inline: true}, tinymce.EditorManager);
      this.editor.render(true);
      this.options.disabled = false;

      var widget = this;
      this.editor.on('focus', function () {
        widget.options.activated();
      });
      this.editor.on('blur', function () {
        widget.options.activated();
        widget.options.changed(widget.editor.getContent());
      });
      this.editor.on('change', function () {
        widget.options.changed(widget.editor.getContent());
      });
    },

    disable: function () {
      if (!this.editor) {
        return;
      }
      this.element.attr('contentEditable', 'false');
      this.editor.remove();
      this.editor = null;
    }
  });
})(jQuery);

(function (jQuery, undefined) {
    /*global OpenLayers:false */
    // Run JavaScript in strict mode
    'use strict';

    // This widget allows editing geocoordinates with the help of openlayers
    // and per default layer OSM
    jQuery.widget('Midgard.midgardGeo', {
        options:{
            layer:null,
            map:null,
            coordSystem:'EPSG:4326',
            defaultCenter: null,
            defaultZoomLevel: 3,
            geoProperty: 'http://schema.org/geo',
            geoCoordinateType: 'http://schema.org/GeoCoordinates',
            geoLonProperty: 'http://schema.org/longitude',
            geoLatProperty: 'http://schema.org/latitude',
            marker: {
                url: 'http://www.openlayers.org/dev/img/marker.png',
                size: {w:21, h:25},
                offset: {w:-10, h:-25} //-(size.w / 2), -size.h
            }
        },
        data : {},
        coordsObj : null,

        /**
         * activate mapwidget
         *
         * @param data
         */
        activate: function (data) {
            this.data = data;
            this.coordsObj = null;

            var geo = this.data.entity.get(this.options.geoProperty);

            if(_.isUndefined(geo)) {
                var types = this.data.entity.attributes['@type'];
                if(!_.isArray(types)) {
                    types = [types];
                }

                if(_.indexOf(types, '<' + this.options.geoCoordinateType + '>') > 0) {
                    this.coordsObj = this.data.entity;
                }
            } else {
                this.coordsObj = geo.models[0];
            }

            if(_.isNull(this.coordsObj)){
                this.element.hide();
                return;
            } else {
                this.element.show();
            }


            var lat = parseFloat(this.coordsObj.get(this.options.geoLatProperty)),
                lon = parseFloat(this.coordsObj.get(this.options.geoLonProperty));

            this.centerMap(lon, lat);
        },

        /**
         * create the map object
         *
         * @private
         */
        _createMap: function() {
            if (!_.isNull(this.options.map)) {
                return;
            }
            var that = this,
                mapDiv = jQuery('<div>', {
                id:'midgardGeoMap',
                style:"height:200px; width:300px"
            });
            this.element.append(mapDiv);
            this.options.map = new OpenLayers.Map('midgardGeoMap');


            if (_.isNull(this.options.layer)) {
                this.options.layer = new OpenLayers.Layer.OSM("OSM");
            }

            this.options.map.addLayer(this.options.layer);

            this.options.markers = new OpenLayers.Layer.Markers("Markers");
            this.options.map.addLayer(this.options.markers);


            OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
                defaultHandlerOptions:{
                    'single':true,
                    'double':false,
                    'pixelTolerance':0,
                    'stopSingle':false,
                    'stopDouble':false
                },

                initialize:function (options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    );
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click':function (e) {
                                that.mapClick(e);
                            }
                        }, this.handlerOptions
                    );
                }
            });


            var click = new OpenLayers.Control.Click();
            this.options.map.addControl(click);
            click.activate();

            var center  = this.options.defaultCenter.clone();
            center.transform(
                new OpenLayers.Projection(this.options.coordSystem),
                this.options.map.getProjectionObject()
            );

            this.options.map.setCenter(
                center, this.options.defaultZoomLevel
            );
        },

        mapClick:function (e) {
            var lonlat = this.options.map.getLonLatFromPixel(e.xy);
            lonlat.transform(this.options.map.getProjectionObject(), new OpenLayers.Projection(this.options.coordSystem));

            var panTo = lonlat.clone();
            this.centerMap(panTo.lon, panTo.lat);
            this.setCoordinates(lonlat.lat, lonlat.lon);
        },

        disable:function () {

        },

        /**
         * set coordinates to the model
         *
         * @param lat
         * @param lon
         */
        setCoordinates:function (lat, lon) {
            var geo = this.data.entity.get(this.options.geoProperty),
                coordsModel = geo.models[0];

            coordsModel.set(this.options.geoLatProperty, lat);
            coordsModel.set(this.options.geoLonProperty, lon);
        },

        /**
         * widget init
         *
         * @private
         */
        _init:function () {
            this.element.hide();
            this.element.append( jQuery('<h3>GEO</h3>') );
            if(_.isNull(this.options.defaultCenter)){
                this.options.defaultCenter = new OpenLayers.LonLat(0, 0);
            }
            this._createMap();
        },

        /**
         * coordinates should be given in the default coordiante system from config
         *
         * @param lon
         * @param lat
         */
        centerMap:function (lon, lat) {
            var center = new OpenLayers.LonLat(lon, lat).transform(
                    new OpenLayers.Projection(this.options.coordSystem),
                    this.options.map.getProjectionObject()
                );

            if (this.options.centermark) {
                this.options.centermark.destroy();
            }

            var size = new OpenLayers.Size(
                this.options.marker.size.w ,
                this.options.marker.size.h
            );
            var offset = new OpenLayers.Pixel(
                this.options.marker.offset.w ,
                this.options.marker.offset.h
            );
            var icon = new OpenLayers.Icon(this.options.marker.url, size, offset);
            this.options.centermark = new OpenLayers.Marker(center, icon);
            this.options.markers.addMarker(this.options.centermark);

            this.options.map.panTo(center);
        }
    });
})(jQuery);

(function (jQuery, undefined) {
  // Run JavaScript in strict mode
  /*global jQuery:false _:false window:false */
  'use strict';

  jQuery.widget('Midgard.midgardTags', {
    enhanced: false,

    options: {
      predicate: 'skos:related',
      vie: null,
      templates: {
        tags: '<div class="create-ui-tags <%= type %>Tags"><h3><%= label %></h3><input type="text" class="tags" value="" /></div>'
      },
      localize: function (id, language) {
        return window.midgardCreate.localize(id, language);
      },
      language: null
    },

    _init: function () {
      this.vie = this.options.vie;
    },

    activate: function (data) {
      // An editable has been activated. Prepare the tag editor for the
      // entity
      var inputs = this._render(data.entity);
      this.loadTags(data.entity, data.predicate, inputs);
    },

    // Convert to reference URI as needed
    _normalizeSubject: function(subject) {
      if (this.vie.entities.isReference(subject)) {
        return subject;
      }
        
      if (subject.substr(0, 7) !== 'http://') {
        subject = 'urn:tag:' + subject;
      }

      subject = this.vie.entities.toReference(subject);
      return subject;
    },

    _tagLabel: function (subject) {
      subject = this.vie.entities.fromReference(subject);

      if (subject.substr(0, 8) === 'urn:tag:') {
        subject = subject.substr(8, subject.length - 1);
      }

      if (subject.substring(0, 7) == 'http://') {
        subject = subject.substr(subject.lastIndexOf('/') + 1, subject.length - 1);
        subject = subject.replace(/_/g, ' ');
      }
      return subject;
    },

    // Centralized method for adding new tags to an entity
    // regardless of whether they come from this widget
    // or Annotate.js
    addTag: function (entity, subject, label, type) {
      if (label === undefined) {
        label = this._tagLabel(subject);
      }

      subject = this._normalizeSubject(subject);
      var tags = entity.get(this.options.predicate);
      if (tags && tags.isCollection && tags.get(subject)) {
        return;
      }

      if (type && !entity.isReference(type)) {
        type = entity.toReference(type);
      }

      var tagEntity = this.vie.entities.addOrUpdate({
        '@subject': subject,
        'rdfs:label': label,
        '@type': type
      });

      if (!tags) {
        entity.set(this.options.predicate, tagEntity);
        return;
      }
      tags.addOrUpdate(tagEntity);
    },

    removeTag: function (entity, subject) {
      var tags = entity.get(this.options.predicate);
      if (!tags) {
        return;
      }

      subject = this._normalizeSubject(subject);
      var tag = tags.get(subject);
      if (!tag) {
        return;
      }

      tags.remove(subject);
    },

    // Listen for accepted annotations from Annotate.js if that 
    // is in use and register them as tags
    _listenAnnotate: function (entity, entityElement) {
      var widget = this;
      entityElement.on('annotateselect', function (event, data) {
        widget.addTag(entity, data.linkedEntity.uri, data.linkedEntity.label, data.linkedEntity.type[0]);
      });

      entityElement.on('annotateremove', function (event, data) {
        widget.removeTag(entity, data.linkedEntity.uri);
      });
    },

    _render: function (entity) {
      this.element.empty();
      var articleTags = jQuery(_.template(this.options.templates.tags, {
        type: 'article',
        label: this.options.localize('Item tags', this.options.language)
      }));
      var suggestedTags = jQuery(_.template(this.options.templates.tags, {
        type: 'suggested',
        label: this.options.localize('Suggested tags', this.options.language)
      }));

      // Tags plugin requires IDs to exist
      jQuery('input', articleTags).attr('id', 'articleTags-' + entity.cid);
      jQuery('input', suggestedTags).attr('id', 'suggestedTags-' + entity.cid);

      this.element.append(articleTags);
      this.element.append(suggestedTags);

      this._renderInputs(entity, articleTags, suggestedTags);
      return {
        tags: articleTags,
        suggested: suggestedTags
      };
    },

    _renderInputs: function (entity, articleTags, suggestedTags) {
      var widget = this;
      var subject = entity.getSubject();

      articleTags.tagsInput({
        width: 'auto',
        height: 'auto',
        onAddTag: function (tag) {
          widget.addTag(entity, tag);
        },
        onRemoveTag: function (tag) {
          widget.removeTag(entity, tag);
        },
        defaultText: this.options.localize('add a tag', this.options.language)
      });

      var selectSuggested = function () {
        var tag = jQuery.trim(jQuery(this).text());
        widget.addTag(entity, tag);
        suggestedTags.removeTag(tag);
      };

      suggestedTags.tagsInput({
        width: 'auto',
        height: 'auto',
        interactive: false,
        onAddTag: function (tag) {
          jQuery('.tag span', suggestedTags).off('click', selectSuggested);
          jQuery('.tag span', suggestedTags).on('click', selectSuggested);
        },
        onRemoveTag: function (tag) {
          jQuery('.tag span', suggestedTags).off('click', selectSuggested);
          jQuery('.tag span', suggestedTags).on('click', selectSuggested);
        },
        remove: false
      });
    },

    _getTagStrings: function (tags) {
      var tagArray = [];

      if (_.isString(tags)) {
        tagArray.push(tags);
        return tagArray;
      }

      if (tags.isCollection) {
        tags.each(function (tag) {
          tagArray.push(tag.get('rdfs:label'));
        });
        return tagArray;
      }

      _.each(tags, function (tag) {
        tagArray.push(this._tagLabel(tag));
      }, this);
      return tagArray;
    },

    loadTags: function (entity, predicate, inputs) {
      var widget = this;

      // Populate existing tags from entity
      var tags = entity.get(this.options.predicate);
      if (tags) {
        var tagArray = this._getTagStrings(tags);
        _.each(tagArray, inputs.tags.addTag, inputs.tags);
      }

      if (this.vie.services.stanbol) {
        //widget.enhance();
      } else {
        jQuery('.suggestedTags', widget.element).hide();
      }
    },

    _getLabelLang: function (labels) {
      if (!_.isArray(labels)) {
        return null;
      }

      var langLabel;

      _.each(labels, function (label) {
        if (label['@language'] === 'en') {
          langLabel = label['@value'];
        }
      });

      return langLabel;
    },

    _addEnhancement: function (entity, enhancement) {
      if (!enhancement.isEntity) {
        return;
      }

      var label = this._getLabelLang(enhancement.get('rdfs:label'));
      if (!label) {
        return;
      }

      var tags = entity.get(this.options.predicate);
      if (tags && tags.isCollection && tags.indexOf(enhancement) !== -1) {
        return;
      }

      this.suggestedTags.addTag(label);
    },

    enhance: function (entity, entityElement) {
      if (this.enhanced) {
        return;
      }
      this.enhanced = true;

      var widget = this;

      // load suggested tags
      this.vie.analyze({
        element: jQuery('[property]', entityElement)
      }).using(['stanbol']).execute().success(function (enhancements) {
        _.each(enhancements, function (enhancement) {
          widget._addEnhancement(entity, enhancement);
        });
      }).fail(function (xhr) {
        // console.log(xhr);
      });
    }
  });
})(jQuery);

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.bg = {
  // Session-state buttons for the main toolbar
  'Save': 'Запази',
  'Saving': 'Запазване',
  'Cancel': 'Откажи',
  'Edit': 'Редактирай',
  // Storage status messages
  'localModification': 'Елементът "<%= label %>" има локални модификации',
  'localModifications': '<%= number %> елемента на тази страница имат локални модификации',
  'Restore': 'Възстанови',
  'Ignore': 'Игнорирай',
  'saveSuccess': 'Елементът "<%= label %>" беше успешно запазен',
  'saveSuccessMultiple': '<%= number %> елемента бяха успешно запазени',
  'saveError': 'Възника грешка при запазване<br /><%= error %>',
  // Tagging
  'Item tags': 'Етикети на елемента',
  'Suggested tags': 'Препоръчани етикети',
  'Tags': 'Етикети',
  'add a tag': 'добави етикет',
  // Collection widgets
  'Add': 'Добави',
  'Choose type to add': 'Избери тип за добавяне'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.cs = {
  // Session-state buttons for the main toolbar
  'Save': 'Uložit',
  'Saving': 'Probíhá ukládání',
  'Cancel': 'Zrušit',
  'Edit': 'Upravit',
  // Storage status messages
  'localModification': 'Blok "<%= label %>" obsahuje lokální změny',
  'localModifications': '<%= number %> bloků na této stránce má lokální změny',
  'Restore': 'Aplikovat lokální změny',
  'Ignore': 'Zahodit lokální změny',
  'saveSuccess': 'Blok "<%= label %>" byl úspěšně uložen',
  'saveSuccessMultiple': '<%= number %> bloků bylo úspěšně uloženo',
  'saveError': 'Při ukládání došlo k chybě<br /><%= error %>',
  // Tagging
  'Item tags': 'Štítky bloku',
  'Suggested tags': 'Navrhované štítky',
  'Tags': 'Štítky',
  'add a tag': 'Přidat štítek',
  // Collection widgets
  'Add': 'Přidat',
  'Choose type to add': 'Vyberte typ k přidání'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.da = {
  // Session-state buttons for the main toolbar
  'Save': 'Gem',
  'Saving': 'Gemmer',
  'Cancel': 'Annullér',
  'Edit': 'Rediger',
  // Storage status messages
  'localModification': 'Element "<%= label %>" har lokale ændringer',
  'localModifications': '<%= number %> elementer på denne side har lokale ændringer',
  'Restore': 'Gendan',
  'Ignore': 'Ignorer',
  'saveSuccess': 'Element "<%= label %>" er gemt',
  'saveSuccessMultiple': '<%= number %> elementer er gemt',
  'saveError': 'Der opstod en fejl under lagring<br /><%= error %>',
  // Tagging
  'Item tags': 'Element tags',
  'Suggested tags': 'Foreslåede tags',
  'Tags': 'Tags',
  'add a tag': 'tilføj et tag',
  // Collection widgets
  'Add': 'Tilføj',
  'Choose type to add': 'Vælg type der skal tilføjes'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.de = {
  // Session-state buttons for the main toolbar
  'Save': 'Speichern',
  'Saving': 'Speichert',
  'Cancel': 'Abbrechen',
  'Edit': 'Bearbeiten',
  // Storage status messages
  'localModification': 'Das Dokument "<%= label %>" auf dieser Seite hat lokale Änderungen',
  'localModifications': '<%= number %> Dokumente auf dieser Seite haben lokale Änderungen',
  'Restore': 'Wiederherstellen',
  'Ignore': 'Ignorieren',
  'saveSuccess': 'Dokument "<%= label %>" erfolgreich gespeichert',
  'saveSuccessMultiple': '<%= number %> Dokumente erfolgreich gespeichert',
  'saveError': 'Fehler beim Speichern<br /><%= error %>',
  // Tagging
  'Item tags': 'Schlagwörter des Dokuments',
  'Suggested tags': 'Schlagwortvorschläge',
  'Tags': 'Schlagwörter',
  'add a tag': 'Neues Schlagwort',
  // Collection widgets
  'Add': 'Hinzufügen',
  'Choose type to add': 'Typ zum Hinzufügen wählen'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.en = {
  // Session-state buttons for the main toolbar
  'Save': 'Save',
  'Saving': 'Saving',
  'Cancel': 'Cancel',
  'Edit': 'Edit',
  // Storage status messages
  'localModification': 'Item "<%= label %>" has local modifications',
  'localModifications': '<%= number %> items on this page have local modifications',
  'Restore': 'Restore',
  'Ignore': 'Ignore',
  'saveSuccess': 'Item "<%= label %>" saved successfully',
  'saveSuccessMultiple': '<%= number %> items saved successfully',
  'saveError': 'Error occurred while saving<br /><%= error %>',
  // Tagging
  'Item tags': 'Item tags',
  'Suggested tags': 'Suggested tags',
  'Tags': 'Tags',
  'add a tag': 'add a tag',
  // Collection widgets
  'Add': 'Add',
  'Choose type to add': 'Choose type to add'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.es = {
  // Session-state buttons for the main toolbar
  'Save': 'Guardar',
  'Saving': 'Guardando',
  'Cancel': 'Cancelar',
  'Edit': 'Editar',
  // Storage status messages
  'localModification': 'El elemento "<%= label %>" tiene modificaciones locales',
  'localModifications': '<%= number %> elementos en la página tienen modificaciones locales',
  'Restore': 'Restaurar',
  'Ignore': 'Ignorar',
  'saveSuccess': 'El elemento "<%= label %>" se guardó exitosamente',
  'saveSuccessMultiple': '<%= number %> elementos se guardaron exitosamente',
  'saveError': 'Ha ocurrido un error cuando se guardaban los datos<br /><%= error %>',
  // Tagging
  'Item tags': 'Etiquetas de los elementos',
  'Suggested tags': 'Etiquetas sugeridas',
  'Tags': 'Etiquetas',
  'add a tag': 'añadir una etiqueta',
  // Collection widgets
  'Add': 'Añadir',
  'Choose type to add': 'Escoge el tipo a añadir'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.fi = {
  // Session-state buttons for the main toolbar
  'Save': 'Tallenna',
  'Saving': 'Tallennetaan',
  'Cancel': 'Peruuta',
  'Edit': 'Muokkaa',
  // Storage status messages
  'localModification': 'Dokumentilla "<%= label %>" on paikallisia muutoksia',
  'localModifications': '<%= number %> dokumenttia sivulla omaa paikallisia muutoksia',
  'Restore': 'Palauta',
  'Ignore': 'Poista',
  'saveSuccess': 'Dokumentti "<%= label %>" tallennettu',
  'saveSuccessMultiple': '<%= number %> dokumenttia tallennettu',
  'saveError': 'Virhe tallennettaessa<br /><%= error %>',
  // Tagging
  'Item tags': 'Avainsanat',
  'Suggested tags': 'Ehdotukset',
  'Tags': 'Avainsanat',
  'add a tag': 'lisää avainsana',
  // Collection widgets
  'Add': 'Lisää',
  'Choose type to add': 'Mitä haluat lisätä?'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.fr = {
  // Session-state buttons for the main toolbar
  'Save': 'Enregistrer',
  'Saving': 'Enregistrement en cours',
  'Cancel': 'Annuler',
  'Edit': 'Éditer',
  // Storage status messages
  'localModification': 'L\'élément "<%= label %>" comporte des modifications locales',
  'localModifications': '<%= number %> éléments sur cette page comportent des modifications locales',
  'Restore': 'Restaurer',
  'Ignore': 'Ignorer',
  'saveSuccess': 'L\'élément "<%= label %>" a été enregistré avec succès',
  'saveSuccessMultiple': '<%= number %> éléments ont été enregistrés avec succès',
  'saveError': 'Une erreur est survenue durant l\'enregistrement<br /><%= error %>',
  // Tagging
  'Item tags': 'Tags des éléments',
  'Suggested tags': 'Tags suggérés',
  'Tags': 'Tags',
  'add a tag': 'ajouter un tag',
  // Collection widgets
  'Add': 'Ajouter',
  'Choose type to add': 'Choisir le type à ajouter'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.he = {
  // Session-state buttons for the main toolbar
  'Save': 'שמור',
  'Saving': 'שומר',
  'Cancel': 'בטל',
  'Edit': 'ערוך',
  // Storage status messages
  'localModification': 'לפריט "<%= label %>" שינויים מקומיים',
  'localModifications': 'ל<%= number %> פריטים בדף זה שינויים מקומיים',
  'Restore': 'שחזר',
  'Ignore': 'התעלם',
  'saveSuccess': 'פריט "<%= label %>" נשמר בהצלחה',
  'saveSuccessMultiple': '<%= number %> פריטים נשמרו בהצלחה',
  'saveError': 'שגיאה בשמירה<br /><%= error %>',
  // Tagging
  'Item tags': 'סיווגי פריט',
  'Suggested tags': 'סיווגים מומלצים',
  'Tags': 'סיווגים',
  'add a tag': 'הוסף סיווג',
  // Collection widgets
  'Add': 'הוסף',
  'Choose type to add': 'בחר סוג להוספה'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.it = {
  // Session-state buttons for the main toolbar
  'Save': 'Salva',
  'Saving': 'Salvataggio',
  'Cancel': 'Cancella',
  'Edit': 'Modifica',
  // Storage status messages
  'localModification': 'Articolo "<%= label %>" in questa pagina hanno modifiche locali',
  'localModifications': '<%= number %> articoli in questa pagina hanno modifiche locali',
  'Restore': 'Ripristina',
  'Ignore': 'Ignora',
  'saveSuccess': 'Articolo "<%= label %>" salvato con successo',
  'saveSuccessMultiple': '<%= number %> articoli salvati con successo',
  'saveError': 'Errore durante il salvataggio<br /><%= error %>',
  // Tagging
  'Item tags': 'Tags articolo',
  'Suggested tags': 'Tags suggerite',
  'Tags': 'Tags',
  'add a tag': 'Aggiungi una parola chiave',
  // Collection widgets
  'Add': 'Aggiungi',
  'Choose type to add': 'Scegli il tipo da aggiungere'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.nl = {
  // Session-state buttons for the main toolbar
  'Save': 'Opslaan',
  'Saving': 'Bezig met opslaan',
  'Cancel': 'Annuleren',
  'Edit': 'Bewerken',
  // Storage status messages
  'localModification': 'Items "<%= label %>" op de pagina heeft lokale wijzigingen',
  'localModifications': '<%= number %> items op de pagina hebben lokale wijzigingen',
  'Restore': 'Herstellen',
  'Ignore': 'Negeren',
  'saveSuccess': 'Item "<%= label %>" succesvol opgeslagen',
  'saveSuccessMultiple': '<%= number %> items succesvol opgeslagen',
  'saveError': 'Fout opgetreden bij het opslaan<br /><%= error %>',
  // Tagging
  'Item tags': 'Item tags',
  'Suggested tags': 'Tag suggesties',
  'Tags': 'Tags',
  'add a tag': 'tag toevoegen',
  // Collection widgets
  'Add': 'Toevoegen',
  'Choose type to add': 'Kies type om toe te voegen'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.no = {
  // Session-state buttons for the main toolbar
  'Save': 'Lagre',
  'Saving': 'Lagrer',
  'Cancel': 'Avbryt',
  'Edit': 'Rediger',
  // Storage status messages
  'localModification': 'Element "<%= label %>" på denne siden er modifisert lokalt',
  'localModifications': '<%= number %> elementer på denne siden er modifisert lokalt',
  'Restore': 'Gjenopprett',
  'Ignore': 'Ignorer',
  'saveSuccess': 'Element "<%= label %>" ble lagret',
  'saveSuccessMultiple': '<%= number %> elementer ble lagret',
  'saveError': 'En feil oppstod under lagring<br /><%= error %>',
  // Tagging
  'Item tags': 'Element-tagger',
  'Suggested tags': 'Anbefalte tagger',
  'Tags': 'Tagger',
  'add a tag': 'legg til tagg',
  // Collection widgets
  'Add': 'Legg til',
  'Choose type to add': 'Velg type å legge til'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.pl = {
  // Session-state buttons for the main toolbar
  'Save': 'Zapisz',
  'Saving': 'Zapisuję',
  'Cancel': 'Anuluj',
  'Edit': 'Edytuj',
  // Storage status messages
  'localModification': 'Artykuł "<%= label %>" posiada lokalne modyfikacje',
  'localModifications': '<%= number %> artykułów na tej stronie posiada lokalne modyfikacje',
  'Restore': 'Przywróć',
  'Ignore': 'Ignoruj',
  'saveSuccess': 'Artykuł "<%= label %>" został poprawnie zapisany',
  'saveSuccessMultiple': '<%= number %> artykułów zostało poprawnie zapisanych',
  'saveError': 'Wystąpił błąd podczas zapisywania<br /><%= error %>',
  // Tagging
  'Item tags': 'Tagi artykułów',
  'Suggested tags': 'Sugerowane tagi',
  'Tags': 'Tagi',
  'add a tag': 'dodaj tag',
  // Collection widgets
  'Add': 'Dodaj',
  'Choose type to add': 'Wybierz typ do dodania'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.pt_BR = {
  // Session-state buttons for the main toolbar
  'Save': 'Salvar',
  'Saving': 'Salvando',
  'Cancel': 'Cancelar',
  'Edit': 'Editar',
  // Storage status messages
  'localModification': 'Item "<%= label %>" nesta página possuem modificações locais',
  'localModifications': '<%= number %> itens nesta página possuem modificações locais',
  'Restore': 'Restaurar',
  'Ignore': 'Ignorar',
  'saveSuccess': 'Item "<%= label %>" salvo com sucesso',
  'saveSuccessMultiple': '<%= number %> itens salvos com sucesso',
  'saveError': 'Erro ocorrido ao salvar<br /><%= error %>',
  // Tagging
  'Item tags': 'Tags de item',
  'Suggested tags': 'Tags sugeridas',
  'Tags': 'Tags',
  'add a tag': 'adicionar uma tag',
  // Collection widgets
  'Add': 'Adicionar',
  'Choose type to add': 'Selecione o tipo para adicionar'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.ro = {
  // Session-state buttons for the main toolbar
  'Save': 'Salvează',
  'Saving': 'Se salvează',
  'Cancel': 'Anulează',
  'Edit': 'Editare',
  // Storage status messages
  'localModification': 'Zona "<%= label %>" a fost modificată',
  'localModifications': '<%= number %> zone din această pagină au fost modificate',
  'Restore': 'Revenire',
  'Ignore': 'Ignoră',
  'saveSuccess': 'Zona "<%= label %>" a fost salvată',
  'saveSuccessMultiple': '<%= number %> zone au fost salvate',
  'saveError': 'S-a produs o eroare în timpul salvării<br /><%= error %>',
  // Tagging
  'Item tags': 'Etichetele zonei',
  'Suggested tags': 'Etichete sugerate',
  'Tags': 'Etichete',
  'add a tag': 'adaugă o etichetă',
  // Collection widgets
  'Add': 'Adăugare',
  'Choose type to add': 'Alegeți un tip pentru adăugare'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.ru = {
  // Session-state buttons for the main toolbar
  'Save': 'Сохранить',
  'Saving': 'Сохраняю',
  'Cancel': 'Отмена',
  'Edit': 'Редактировать',
  // Storage status messages
  'localModification': 'В запись "<%= label %>" внесены несохранённые изменения',
  'localModifications': 'В записи на этой странице (<%= number %> шт.) внесены несохранённые изменения',
  'Restore': 'Восстановить',
  'Ignore': 'Игнорировать',
  'saveSuccess': 'Запись "<%= label %>" была успешно сохранена',
  'saveSuccessMultiple': ' Записи (<%= number %> шт.) были успешно сохранены',
  'saveError': 'Во время сохранения произошла ошибка<br /><%= error %>',
  // Tagging
  'Item tags': 'Теги записей',
  'Suggested tags': 'Предлагаемые теги',
  'Tags': 'Теги',
  'add a tag': 'добавить тег',
  // Collection widgets
  'Add': 'Добавить',
  'Choose type to add': 'Выбрать тип для добавления'
};

if (window.midgardCreate === undefined) {
  window.midgardCreate = {};
}
if (window.midgardCreate.locale === undefined) {
  window.midgardCreate.locale = {};
}

window.midgardCreate.locale.sv = {
  // Session-state buttons for the main toolbar
  'Save': 'Spara',
  'Saving': 'Sparar',
  'Cancel': 'Avbryt',
  'Edit': 'Redigera',
  // Storage status messages
  'localModification': 'Elementet "<%= label %>" har lokala förändringar',
  'localModifications': '<%= number %> element på den här sidan har lokala förändringar',
  'Restore': 'Återställ',
  'Ignore': 'Ignorera',
  'saveSuccess': 'Elementet "<%= label %>" sparades',
  'saveSuccessMultiple': '<%= number %> element sparades',
  'saveError': 'Ett fel uppstod under sparande<br /><%= error %>',
  // Tagging
  'Item tags': 'Element-taggar',
  'Suggested tags': 'Föreslagna taggar',
  'Tags': 'Taggar',
  'add a tag': 'lägg till en tagg',
  // Collection widgets
  'Add': 'Lägg till',
  'Choose type to add': 'Välj typ att lägga till'
};
