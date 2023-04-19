import "./chunk-OL3AADLO.js";

// node_modules/vue3-clipboard/dist/vue3-clipboard-es.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var clipboard_min = createCommonjsModule(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return o = {}, r.m = n = [function(t, e) {
      t.exports = function(t2) {
        var e2;
        if ("SELECT" === t2.nodeName)
          t2.focus(), e2 = t2.value;
        else if ("INPUT" === t2.nodeName || "TEXTAREA" === t2.nodeName) {
          var n2 = t2.hasAttribute("readonly");
          n2 || t2.setAttribute("readonly", ""), t2.select(), t2.setSelectionRange(0, t2.value.length), n2 || t2.removeAttribute("readonly"), e2 = t2.value;
        } else {
          t2.hasAttribute("contenteditable") && t2.focus();
          var o2 = window.getSelection(), r2 = document.createRange();
          r2.selectNodeContents(t2), o2.removeAllRanges(), o2.addRange(r2), e2 = o2.toString();
        }
        return e2;
      };
    }, function(t, e) {
      function n2() {
      }
      n2.prototype = {
        on: function(t2, e2, n3) {
          var o2 = this.e || (this.e = {});
          return (o2[t2] || (o2[t2] = [])).push({
            fn: e2,
            ctx: n3
          }), this;
        },
        once: function(t2, e2, n3) {
          var o2 = this;
          function r2() {
            o2.off(t2, r2), e2.apply(n3, arguments);
          }
          return r2._ = e2, this.on(t2, r2, n3);
        },
        emit: function(t2) {
          for (var e2 = [].slice.call(arguments, 1), n3 = ((this.e || (this.e = {}))[t2] || []).slice(), o2 = 0, r2 = n3.length; o2 < r2; o2++)
            n3[o2].fn.apply(n3[o2].ctx, e2);
          return this;
        },
        off: function(t2, e2) {
          var n3 = this.e || (this.e = {}), o2 = n3[t2], r2 = [];
          if (o2 && e2)
            for (var i = 0, a = o2.length; i < a; i++)
              o2[i].fn !== e2 && o2[i].fn._ !== e2 && r2.push(o2[i]);
          return r2.length ? n3[t2] = r2 : delete n3[t2], this;
        }
      }, t.exports = n2, t.exports.TinyEmitter = n2;
    }, function(t, e, n2) {
      var d = n2(3), h = n2(4);
      t.exports = function(t2, e2, n3) {
        if (!t2 && !e2 && !n3)
          throw new Error("Missing required arguments");
        if (!d.string(e2))
          throw new TypeError("Second argument must be a String");
        if (!d.fn(n3))
          throw new TypeError("Third argument must be a Function");
        if (d.node(t2))
          return s = e2, f = n3, (u = t2).addEventListener(s, f), {
            destroy: function() {
              u.removeEventListener(s, f);
            }
          };
        if (d.nodeList(t2))
          return a = t2, c = e2, l = n3, Array.prototype.forEach.call(a, function(t3) {
            t3.addEventListener(c, l);
          }), {
            destroy: function() {
              Array.prototype.forEach.call(a, function(t3) {
                t3.removeEventListener(c, l);
              });
            }
          };
        if (d.string(t2))
          return o2 = t2, r2 = e2, i = n3, h(document.body, o2, r2, i);
        throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
        var o2, r2, i, a, c, l, u, s, f;
      };
    }, function(t, n2) {
      n2.node = function(t2) {
        return void 0 !== t2 && t2 instanceof HTMLElement && 1 === t2.nodeType;
      }, n2.nodeList = function(t2) {
        var e = Object.prototype.toString.call(t2);
        return void 0 !== t2 && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t2 && (0 === t2.length || n2.node(t2[0]));
      }, n2.string = function(t2) {
        return "string" == typeof t2 || t2 instanceof String;
      }, n2.fn = function(t2) {
        return "[object Function]" === Object.prototype.toString.call(t2);
      };
    }, function(t, e, n2) {
      var a = n2(5);
      function i(t2, e2, n3, o2, r2) {
        var i2 = function(e3, n4, t3, o3) {
          return function(t4) {
            t4.delegateTarget = a(t4.target, n4), t4.delegateTarget && o3.call(e3, t4);
          };
        }.apply(this, arguments);
        return t2.addEventListener(n3, i2, r2), {
          destroy: function() {
            t2.removeEventListener(n3, i2, r2);
          }
        };
      }
      t.exports = function(t2, e2, n3, o2, r2) {
        return "function" == typeof t2.addEventListener ? i.apply(null, arguments) : "function" == typeof n3 ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t2 && (t2 = document.querySelectorAll(t2)), Array.prototype.map.call(t2, function(t3) {
          return i(t3, e2, n3, o2, r2);
        }));
      };
    }, function(t, e) {
      if ("undefined" != typeof Element && !Element.prototype.matches) {
        var n2 = Element.prototype;
        n2.matches = n2.matchesSelector || n2.mozMatchesSelector || n2.msMatchesSelector || n2.oMatchesSelector || n2.webkitMatchesSelector;
      }
      t.exports = function(t2, e2) {
        for (; t2 && 9 !== t2.nodeType; ) {
          if ("function" == typeof t2.matches && t2.matches(e2))
            return t2;
          t2 = t2.parentNode;
        }
      };
    }, function(t, e, n2) {
      n2.r(e);
      var o2 = n2(0), r2 = n2.n(o2), i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
        return typeof t2;
      } : function(t2) {
        return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
      };
      function a(t2, e2) {
        for (var n3 = 0; n3 < e2.length; n3++) {
          var o3 = e2[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
        }
      }
      function c(t2) {
        !function(t3, e2) {
          if (!(t3 instanceof e2))
            throw new TypeError("Cannot call a class as a function");
        }(this, c), this.resolveOptions(t2), this.initSelection();
      }
      var l = (function(t2, e2, n3) {
        return e2 && a(t2.prototype, e2), n3 && a(t2, n3), t2;
      }(c, [{
        key: "resolveOptions",
        value: function(t2) {
          var e2 = 0 < arguments.length && void 0 !== t2 ? t2 : {};
          this.action = e2.action, this.container = e2.container, this.emitter = e2.emitter, this.target = e2.target, this.text = e2.text, this.trigger = e2.trigger, this.selectedText = "";
        }
      }, {
        key: "initSelection",
        value: function() {
          this.text ? this.selectFake() : this.target && this.selectTarget();
        }
      }, {
        key: "selectFake",
        value: function() {
          var t2 = this, e2 = "rtl" == document.documentElement.getAttribute("dir");
          this.removeFake(), this.fakeHandlerCallback = function() {
            return t2.removeFake();
          }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e2 ? "right" : "left"] = "-9999px";
          var n3 = window.pageYOffset || document.documentElement.scrollTop;
          this.fakeElem.style.top = n3 + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = r2()(this.fakeElem), this.copyText();
        }
      }, {
        key: "removeFake",
        value: function() {
          this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);
        }
      }, {
        key: "selectTarget",
        value: function() {
          this.selectedText = r2()(this.target), this.copyText();
        }
      }, {
        key: "copyText",
        value: function() {
          var e2 = void 0;
          try {
            e2 = document.execCommand(this.action);
          } catch (t2) {
            e2 = false;
          }
          this.handleResult(e2);
        }
      }, {
        key: "handleResult",
        value: function(t2) {
          this.emitter.emit(t2 ? "success" : "error", {
            action: this.action,
            text: this.selectedText,
            trigger: this.trigger,
            clearSelection: this.clearSelection.bind(this)
          });
        }
      }, {
        key: "clearSelection",
        value: function() {
          this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges();
        }
      }, {
        key: "destroy",
        value: function() {
          this.removeFake();
        }
      }, {
        key: "action",
        set: function(t2) {
          var e2 = 0 < arguments.length && void 0 !== t2 ? t2 : "copy";
          if (this._action = e2, "copy" !== this._action && "cut" !== this._action)
            throw new Error('Invalid "action" value, use either "copy" or "cut"');
        },
        get: function() {
          return this._action;
        }
      }, {
        key: "target",
        set: function(t2) {
          if (void 0 !== t2) {
            if (!t2 || "object" !== (void 0 === t2 ? "undefined" : i(t2)) || 1 !== t2.nodeType)
              throw new Error('Invalid "target" value, use a valid Element');
            if ("copy" === this.action && t2.hasAttribute("disabled"))
              throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            if ("cut" === this.action && (t2.hasAttribute("readonly") || t2.hasAttribute("disabled")))
              throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
            this._target = t2;
          }
        },
        get: function() {
          return this._target;
        }
      }]), c), u = n2(1), s = n2.n(u), f = n2(2), d = n2.n(f), h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
        return typeof t2;
      } : function(t2) {
        return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
      }, p = function(t2, e2, n3) {
        return e2 && y(t2.prototype, e2), n3 && y(t2, n3), t2;
      };
      function y(t2, e2) {
        for (var n3 = 0; n3 < e2.length; n3++) {
          var o3 = e2[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
        }
      }
      var m = (function(t2, e2) {
        if ("function" != typeof e2 && null !== e2)
          throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
        t2.prototype = Object.create(e2 && e2.prototype, {
          constructor: {
            value: t2,
            enumerable: false,
            writable: true,
            configurable: true
          }
        }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
      }(v, s.a), p(v, [{
        key: "resolveOptions",
        value: function(t2) {
          var e2 = 0 < arguments.length && void 0 !== t2 ? t2 : {};
          this.action = "function" == typeof e2.action ? e2.action : this.defaultAction, this.target = "function" == typeof e2.target ? e2.target : this.defaultTarget, this.text = "function" == typeof e2.text ? e2.text : this.defaultText, this.container = "object" === h(e2.container) ? e2.container : document.body;
        }
      }, {
        key: "listenClick",
        value: function(t2) {
          var e2 = this;
          this.listener = d()(t2, "click", function(t3) {
            return e2.onClick(t3);
          });
        }
      }, {
        key: "onClick",
        value: function(t2) {
          var e2 = t2.delegateTarget || t2.currentTarget;
          this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l({
            action: this.action(e2),
            target: this.target(e2),
            text: this.text(e2),
            container: this.container,
            trigger: e2,
            emitter: this
          });
        }
      }, {
        key: "defaultAction",
        value: function(t2) {
          return b("action", t2);
        }
      }, {
        key: "defaultTarget",
        value: function(t2) {
          var e2 = b("target", t2);
          if (e2)
            return document.querySelector(e2);
        }
      }, {
        key: "defaultText",
        value: function(t2) {
          return b("text", t2);
        }
      }, {
        key: "destroy",
        value: function() {
          this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);
        }
      }], [{
        key: "isSupported",
        value: function(t2) {
          var e2 = 0 < arguments.length && void 0 !== t2 ? t2 : ["copy", "cut"], n3 = "string" == typeof e2 ? [e2] : e2, o3 = !!document.queryCommandSupported;
          return n3.forEach(function(t3) {
            o3 = o3 && !!document.queryCommandSupported(t3);
          }), o3;
        }
      }]), v);
      function v(t2, e2) {
        !function(t3, e3) {
          if (!(t3 instanceof e3))
            throw new TypeError("Cannot call a class as a function");
        }(this, v);
        var n3 = function(t3, e3) {
          if (!t3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !e3 || "object" != typeof e3 && "function" != typeof e3 ? t3 : e3;
        }(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this));
        return n3.resolveOptions(e2), n3.listenClick(t2), n3;
      }
      function b(t2, e2) {
        var n3 = "data-clipboard-" + t2;
        if (e2.hasAttribute(n3))
          return e2.getAttribute(n3);
      }
      e.default = m;
    }], r.c = o, r.d = function(t, e, n2) {
      r.o(t, e) || Object.defineProperty(t, e, {
        enumerable: true,
        get: n2
      });
    }, r.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: true
      });
    }, r.t = function(e, t) {
      if (1 & t && (e = r(e)), 8 & t)
        return e;
      if (4 & t && "object" == typeof e && e && e.__esModule)
        return e;
      var n2 = /* @__PURE__ */ Object.create(null);
      if (r.r(n2), Object.defineProperty(n2, "default", {
        enumerable: true,
        value: e
      }), 2 & t && "string" != typeof e)
        for (var o2 in e)
          r.d(n2, o2, function(t2) {
            return e[t2];
          }.bind(null, o2));
      return n2;
    }, r.n = function(t) {
      var e = t && t.__esModule ? function() {
        return t.default;
      } : function() {
        return t;
      };
      return r.d(e, "a", e), e;
    }, r.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 6).default;
    function r(t) {
      if (o[t])
        return o[t].exports;
      var e = o[t] = {
        i: t,
        l: false,
        exports: {}
      };
      return n[t].call(e.exports, e, e.exports, r), e.l = true, e.exports;
    }
    var n, o;
  });
});
var Clipboard = unwrapExports(clipboard_min);
var clipboard_min_1 = clipboard_min.ClipboardJS;
var VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true
};
function copyText(_text, container, callback) {
  var fakeElement = document.createElement("button");
  var clipboard = new Clipboard(fakeElement, {
    text: function text() {
      return _text;
    },
    action: function action() {
      return "copy";
    },
    container: _typeof(container) === "object" ? container : document.body
  });
  clipboard.on("success", function(e) {
    clipboard.destroy();
    callback(void 0, e);
  });
  clipboard.on("error", function(e) {
    clipboard.destroy();
    callback(e, void 0);
  });
  if (VueClipboardConfig.appendToBody)
    document.body.appendChild(fakeElement);
  fakeElement.click();
  if (VueClipboardConfig.appendToBody)
    document.body.removeChild(fakeElement);
}
function index(app, vueClipboardConfig) {
  VueClipboardConfig = vueClipboardConfig;
  app.config.globalProperties.$copyText = copyText;
  app.directive("clipboard", {
    mounted: function mounted(el, binding) {
      if (binding.arg === "success") {
        el._vClipboard_success = binding.value;
      } else if (binding.arg === "error") {
        el._vClipboard_error = binding.value;
      } else {
        var clipboard = new Clipboard(el, {
          text: function text() {
            return binding.value;
          },
          action: function action() {
            return binding.arg === "cut" ? "cut" : "copy";
          },
          container: vueClipboardConfig.autoSetContainer ? el : void 0
        });
        clipboard.on("success", function(e) {
          var callback = el._vClipboard_success;
          callback && callback(e);
        });
        clipboard.on("error", function(e) {
          var callback = el._vClipboard_error;
          callback && callback(e);
        });
        el._vClipboard = clipboard;
      }
    },
    updated: function updated(el, binding) {
      if (binding.arg === "success") {
        el._vClipboard_success = binding.value;
      } else if (binding.arg === "error") {
        el._vClipboard_error = binding.value;
      } else {
        el._vClipboard.text = function() {
          return binding.value;
        };
        el._vClipboard.action = function() {
          return binding.arg === "cut" ? "cut" : "copy";
        };
      }
    },
    unmounted: function unmounted(el, binding) {
      if (binding.arg === "success") {
        delete el._vClipboard_success;
      } else if (binding.arg === "error") {
        delete el._vClipboard_error;
      } else {
        el._vClipboard.destroy();
        delete el._vClipboard;
      }
    }
  });
}
var vue3_clipboard_es_default = index;
export {
  copyText,
  vue3_clipboard_es_default as default
};
/*! Bundled license information:

vue3-clipboard/dist/vue3-clipboard-es.js:
  (*!
   * clipboard.js v2.0.6
   * https://clipboardjs.com/
   * 
   * Licensed MIT © Zeno Rocha
   *)
*/
//# sourceMappingURL=vue3-clipboard.js.map
