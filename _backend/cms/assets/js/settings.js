!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=0;o<n.length;o++)t[n[o].split(".").pop()]=r(n[o],e);return t}function t(r){if(-1===a.indexOf(r)){try{var n=e[r]}catch(e){a.push(r)}this(r,n)}}var o,i=$__System,a=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.registry.set("@@global-helpers",i.newModule({prepareGlobal:function(r,i,a){var f=e.define;e.define=void 0;var s;if(a){s={};for(var l in a)s[l]=e[l],e[l]=a[l]}return i||(o={},Object.keys(e).forEach(t,function(e,r){o[e]=r})),function(){var r,a=i?n(i):{},l=!!i;if(i||Object.keys(e).forEach(t,function(e,n){o[e]!==n&&void 0!==n&&(i||(a[e]=n,void 0!==r?l||r===n||(l=!0):r=n))}),a=l?a:r,s)for(var c in s)e[c]=s[c];return e.define=f,a}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('a', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = $__System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        'use strict';
        /*!
         * @version: 1.1.2
         * @name: settings
         *
         * @author: https://themeforest.net/user/flexlayers
         */
        // Here the theme settings are loaded from the cache

        (function () {
            // calculate the sidebar position depending on the window initial size
            var app = document.querySelector('#app');
            var classes = app.getAttribute('class');
            var defaultData = {
                headerBg: 'header-bg-default',
                sidebarType: 'sidebar-type-push',
                sidebarState: 'sidebar-state-open',
                sidebarTrState: 'sidebar-tr-state-open',
                sidebarBg: 'sidebar-bg-default',
                sidebarOption: 'sidebar-option-default'
            };
            var oldData = getTheme(classes, defaultData);
            removeClass.apply('', getArgs(oldData));
            var responsiveData = {};
            if (window.innerWidth >= 768 && window.innerWidth < 1100) {
                responsiveData.sidebarState = 'sidebar-state-compact';
            } else if (window.innerWidth < 768) {
                responsiveData.sidebarState = 'sidebar-state-close';
                responsiveData.sidebarType = 'sidebar-type-slide';
                responsiveData.sidebarTrState = 'sidebar-tr-state-open';
            }
            var newData;
            if (hasClass(app, 'no-saved-theme')) {
                newData = assign({}, defaultData, oldData, responsiveData);
            } else {
                var storage = window.localStorage;
                var themeStore = parse(storage.getItem('theme-settings'));
                newData = assign({}, defaultData, oldData, themeStore, responsiveData);
                storage.setItem('theme-settings', JSON.stringify(newData, null, '   '));
            }
            addClass.apply('', getArgs(newData));
            function assign(target) {
                if (target === void 0) {
                    target = {};
                }
                var varArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    varArgs[_i - 1] = arguments[_i];
                }
                if (target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource != null) {
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            }
            function getTheme(classes, data) {
                if (!classes) return {};
                var classArray = classes.split(' ');
                var theme = {};
                var keys = Object.keys(data);
                var _loop_1 = function (i) {
                    var setting = keys[i].replace(/([A-Z])/g, function ($1) {
                        return "-" + $1.toLowerCase();
                    });
                    var singleClass = classArray.filter(function (el, pos) {
                        return el.indexOf(setting) >= 0 && classArray.indexOf(el) === pos;
                    }).join(' ');
                    if (singleClass) theme[keys[i]] = singleClass;
                };
                for (var i = 0; i < keys.length; i++) {
                    _loop_1(i);
                }
                return theme;
            }
            function getArgs(data) {
                var values = Object.keys(data).map(function (e) {
                    return data[e];
                });
                return [app].concat(values);
            }
            function parse(row) {
                var stack = {};
                if (typeof row === 'string') {
                    try {
                        stack = JSON.parse(row);
                    } catch (error) {
                        console.error('JSON parse error: ' + error);
                    }
                }
                return stack;
            }
            // add class to the element
            function addClass() {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var args = params.length === 1 ? [params[0]] : Array.apply(null, params);
                var el = params[0];
                var classes = args.slice(1);
                if (el.classList) {
                    el.classList.add.apply(el.classList, classes);
                } else {
                    for (var i = 0; i < classes.length; i++) {
                        el.className += ' ' + classes[i];
                    }
                }
            }
            // remove class from the element
            function removeClass() {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var args = params.length === 1 ? [params[0]] : Array.apply(null, params);
                var el = params[0];
                var classes = args.slice(1);
                if (el.classList) {
                    el.classList.remove.apply(el.classList, classes);
                } else {
                    for (var i = 0; i < classes.length; i++) {
                        el.className = el.className.replace(new RegExp('(^|\\b)' + classes[i].split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            }
            function hasClass(el, className) {
                if (el.classList) return el.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }
        })();
    })(this);

    return _retrieveGlobal();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});