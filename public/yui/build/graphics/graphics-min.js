/*
YUI 3.5.0 (build 5089)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("graphics",function(b){var f="setter",g=b.Plugin.Host,j="value",a="valueFn",k="readOnly",c=b.Lang,e="string",h="writeOnce",i,d;d=function(){var l=this;l._ATTR_E_FACADE={};b.EventTarget.call(this,{emitFacade:true});l._state={};l.prototype=b.mix(d.prototype,l.prototype);};d.prototype={addAttrs:function(m){var q=this,o=this.constructor.ATTRS,l,n,p,r=q._state;for(n in o){if(o.hasOwnProperty(n)){l=o[n];if(l.hasOwnProperty(j)){r[n]=l.value;}else{if(l.hasOwnProperty(a)){p=l.valueFn;if(c.isString(p)){r[n]=q[p].apply(q);}else{r[n]=p.apply(q);}}}}}q._state=r;for(n in o){if(o.hasOwnProperty(n)){l=o[n];if(l.hasOwnProperty(k)&&l.readOnly){continue;}if(l.hasOwnProperty(h)&&l.writeOnce){l.readOnly=true;}if(m&&m.hasOwnProperty(n)){if(l.hasOwnProperty(f)){q._state[n]=l.setter.apply(q,[m[n]]);}else{q._state[n]=m[n];}}}}},get:function(m){var o=this,l,n=o.constructor.ATTRS;if(n&&n[m]){l=n[m].getter;if(l){if(typeof l==e){return o[l].apply(o);}return n[m].getter.apply(o);}return o._state[m];}return null;},set:function(l,n){var m;if(c.isObject(l)){for(m in l){if(l.hasOwnProperty(m)){this._set(m,l[m]);}}}else{this._set.apply(this,arguments);}},_set:function(l,p){var o=this,q,m,n=o.constructor.ATTRS;if(n&&n.hasOwnProperty(l)){q=n[l].setter;if(q){m=[p];if(typeof q==e){p=o[q].apply(o,m);}else{p=n[l].setter.apply(o,m);}}o._state[l]=p;}}};b.mix(d,b.EventTarget,false,null,1);b.AttributeLite=d;i=function(l){var n=this,m=b.Plugin&&b.Plugin.Host;if(n._initPlugins&&m){m.call(n);}n.name=n.constructor.NAME;n._eventPrefix=n.constructor.EVENT_PREFIX||n.constructor.NAME;d.call(n);n.addAttrs(l);n.init.apply(this,arguments);if(n._initPlugins){n._initPlugins(l);}n.initialized=true;};i.NAME="baseGraphic";i.prototype={init:function(){this.publish("init",{fireOnce:true});this.initializer.apply(this,arguments);this.fire("init",{cfg:arguments[0]});}};b.mix(i,b.AttributeLite,false,null,1);b.mix(i,g,false,null,1);i.prototype.constructor=i;i.plug=g.plug;i.unplug=g.unplug;b.GraphicBase=i;},"3.5.0",{requires:["event-custom","node","pluginhost"]});