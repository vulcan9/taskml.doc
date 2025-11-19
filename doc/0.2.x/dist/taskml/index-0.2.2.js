var pl = Object.defineProperty;
var ml = (i, t, e) => t in i ? pl(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var x = (i, t, e) => (ml(i, typeof t != "symbol" ? t + "" : t, e), e), $i = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
};
var E = (i, t, e) => ($i(i, t, "read from private field"), e ? e.call(i) : t.get(i)), P = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, O = (i, t, e, r) => ($i(i, t, "write to private field"), r ? r.call(i, e) : t.set(i, e), e);
var Ai = (i, t, e, r) => ({
  set _(n) {
    O(i, t, n, e);
  },
  get _() {
    return E(i, t, r);
  }
}), Xt = (i, t, e) => ($i(i, t, "access private method"), e);
const gl = (i, t) => i === t, Wt = Symbol("solid-proxy"), co = Symbol("solid-track"), Ln = {
  equals: gl
};
let pa = ya;
const Ee = 1, Rn = 2, ma = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var G = null;
let xi = null, _l = null, H = null, ot = null, ee = null, ci = 0;
function yl(i, t) {
  const e = H, r = G, n = i.length === 0, s = t === void 0 ? r : t, o = n ? ma : {
    owned: null,
    cleanups: null,
    context: s ? s.context : null,
    owner: s
  }, a = n ? i : () => i(() => mn(() => fi(o)));
  G = o, H = null;
  try {
    return sr(a, !0);
  } finally {
    H = e, G = r;
  }
}
function vl(i, t) {
  t = t ? Object.assign({}, Ln, t) : Ln;
  const e = {
    value: i,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (n) => (typeof n == "function" && (n = n(e.value)), _a(e, n));
  return [ga.bind(e), r];
}
function pr(i, t, e) {
  const r = $s(i, t, !1, Ee);
  gn(r);
}
function wl(i, t, e) {
  pa = Ol;
  const r = $s(i, t, !1, Ee);
  (!e || !e.render) && (r.user = !0), ee ? ee.push(r) : gn(r);
}
function Tl(i, t, e) {
  e = e ? Object.assign({}, Ln, e) : Ln;
  const r = $s(i, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = e.equals || void 0, gn(r), ga.bind(r);
}
function bl(i) {
  return sr(i, !1);
}
function mn(i) {
  if (H === null)
    return i();
  const t = H;
  H = null;
  try {
    return i();
  } finally {
    H = t;
  }
}
function El(i) {
  wl(() => mn(i));
}
function Qe(i) {
  return G === null || (G.cleanups === null ? G.cleanups = [i] : G.cleanups.push(i)), i;
}
function Hi() {
  return H;
}
function $l() {
  return G;
}
function Al(i, t) {
  const e = G, r = H;
  G = i, H = null;
  try {
    return sr(t, !0);
  } catch (n) {
    As(n);
  } finally {
    G = e, H = r;
  }
}
function ga() {
  if (this.sources && this.state)
    if (this.state === Ee)
      gn(this);
    else {
      const i = ot;
      ot = null, sr(() => In(this), !1), ot = i;
    }
  if (H) {
    const i = this.observers ? this.observers.length : 0;
    H.sources ? (H.sources.push(this), H.sourceSlots.push(i)) : (H.sources = [this], H.sourceSlots = [i]), this.observers ? (this.observers.push(H), this.observerSlots.push(H.sources.length - 1)) : (this.observers = [H], this.observerSlots = [H.sources.length - 1]);
  }
  return this.value;
}
function _a(i, t, e) {
  let r = i.value;
  return (!i.comparator || !i.comparator(r, t)) && (i.value = t, i.observers && i.observers.length && sr(() => {
    for (let n = 0; n < i.observers.length; n += 1) {
      const s = i.observers[n], o = xi && xi.running;
      o && xi.disposed.has(s), (o ? !s.tState : !s.state) && (s.pure ? ot.push(s) : ee.push(s), s.observers && va(s)), o || (s.state = Ee);
    }
    if (ot.length > 1e6)
      throw ot = [], new Error();
  }, !1)), t;
}
function gn(i) {
  if (!i.fn)
    return;
  fi(i);
  const t = ci;
  xl(i, i.value, t);
}
function xl(i, t, e) {
  let r;
  const n = G, s = H;
  H = G = i;
  try {
    r = i.fn(t);
  } catch (o) {
    return i.pure && (i.state = Ee, i.owned && i.owned.forEach(fi), i.owned = null), i.updatedAt = e + 1, As(o);
  } finally {
    H = s, G = n;
  }
  (!i.updatedAt || i.updatedAt <= e) && (i.updatedAt != null && "observers" in i ? _a(i, r) : i.value = r, i.updatedAt = e);
}
function $s(i, t, e, r = Ee, n) {
  const s = {
    fn: i,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: G,
    context: G ? G.context : null,
    pure: e
  };
  return G === null || G !== ma && (G.owned ? G.owned.push(s) : G.owned = [s]), s;
}
function Nn(i) {
  if (i.state === 0)
    return;
  if (i.state === Rn)
    return In(i);
  if (i.suspense && mn(i.suspense.inFallback))
    return i.suspense.effects.push(i);
  const t = [i];
  for (; (i = i.owner) && (!i.updatedAt || i.updatedAt < ci); )
    i.state && t.push(i);
  for (let e = t.length - 1; e >= 0; e--)
    if (i = t[e], i.state === Ee)
      gn(i);
    else if (i.state === Rn) {
      const r = ot;
      ot = null, sr(() => In(i, t[0]), !1), ot = r;
    }
}
function sr(i, t) {
  if (ot)
    return i();
  let e = !1;
  t || (ot = []), ee ? e = !0 : ee = [], ci++;
  try {
    const r = i();
    return Sl(e), r;
  } catch (r) {
    e || (ee = null), ot = null, As(r);
  }
}
function Sl(i) {
  if (ot && (ya(ot), ot = null), i)
    return;
  const t = ee;
  ee = null, t.length && sr(() => pa(t), !1);
}
function ya(i) {
  for (let t = 0; t < i.length; t++)
    Nn(i[t]);
}
function Ol(i) {
  let t, e = 0;
  for (t = 0; t < i.length; t++) {
    const r = i[t];
    r.user ? i[e++] = r : Nn(r);
  }
  for (t = 0; t < e; t++)
    Nn(i[t]);
}
function In(i, t) {
  i.state = 0;
  for (let e = 0; e < i.sources.length; e += 1) {
    const r = i.sources[e];
    if (r.sources) {
      const n = r.state;
      n === Ee ? r !== t && (!r.updatedAt || r.updatedAt < ci) && Nn(r) : n === Rn && In(r, t);
    }
  }
}
function va(i) {
  for (let t = 0; t < i.observers.length; t += 1) {
    const e = i.observers[t];
    e.state || (e.state = Rn, e.pure ? ot.push(e) : ee.push(e), e.observers && va(e));
  }
}
function fi(i) {
  let t;
  if (i.sources)
    for (; i.sources.length; ) {
      const e = i.sources.pop(), r = i.sourceSlots.pop(), n = e.observers;
      if (n && n.length) {
        const s = n.pop(), o = e.observerSlots.pop();
        r < n.length && (s.sourceSlots[o] = r, n[r] = s, e.observerSlots[r] = o);
      }
    }
  if (i.owned) {
    for (t = i.owned.length - 1; t >= 0; t--)
      fi(i.owned[t]);
    i.owned = null;
  }
  if (i.cleanups) {
    for (t = i.cleanups.length - 1; t >= 0; t--)
      i.cleanups[t]();
    i.cleanups = null;
  }
  i.state = 0;
}
function kl(i) {
  return i instanceof Error ? i : new Error(typeof i == "string" ? i : "Unknown error", {
    cause: i
  });
}
function As(i, t = G) {
  throw kl(i);
}
function xn() {
  return !0;
}
const Pl = {
  get(i, t, e) {
    return t === Wt ? e : i.get(t);
  },
  has(i, t) {
    return t === Wt ? !0 : i.has(t);
  },
  set: xn,
  deleteProperty: xn,
  getOwnPropertyDescriptor(i, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return i.get(t);
      },
      set: xn,
      deleteProperty: xn
    };
  },
  ownKeys(i) {
    return i.keys();
  }
};
function Si(i) {
  return (i = typeof i == "function" ? i() : i) ? i : {};
}
function Cl() {
  for (let i = 0, t = this.length; i < t; ++i) {
    const e = this[i]();
    if (e !== void 0)
      return e;
  }
}
function or(...i) {
  let t = !1;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    t = t || !!a && Wt in a, i[o] = typeof a == "function" ? (t = !0, Tl(a)) : a;
  }
  if (t)
    return new Proxy({
      get(o) {
        for (let a = i.length - 1; a >= 0; a--) {
          const u = Si(i[a])[o];
          if (u !== void 0)
            return u;
        }
      },
      has(o) {
        for (let a = i.length - 1; a >= 0; a--)
          if (o in Si(i[a]))
            return !0;
        return !1;
      },
      keys() {
        const o = [];
        for (let a = 0; a < i.length; a++)
          o.push(...Object.keys(Si(i[a])));
        return [...new Set(o)];
      }
    }, Pl);
  const e = {}, r = /* @__PURE__ */ Object.create(null);
  for (let o = i.length - 1; o >= 0; o--) {
    const a = i[o];
    if (!a)
      continue;
    const u = Object.getOwnPropertyNames(a);
    for (let l = u.length - 1; l >= 0; l--) {
      const c = u[l];
      if (c === "__proto__" || c === "constructor")
        continue;
      const f = Object.getOwnPropertyDescriptor(a, c);
      if (!r[c])
        r[c] = f.get ? {
          enumerable: !0,
          configurable: !0,
          get: Cl.bind(e[c] = [f.get.bind(a)])
        } : f.value !== void 0 ? f : void 0;
      else {
        const h = e[c];
        h && (f.get ? h.push(f.get.bind(a)) : f.value !== void 0 && h.push(() => f.value));
      }
    }
  }
  const n = {}, s = Object.keys(r);
  for (let o = s.length - 1; o >= 0; o--) {
    const a = s[o], u = r[a];
    u && u.get ? Object.defineProperty(n, a, u) : n[a] = u ? u.value : void 0;
  }
  return n;
}
const Dl = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], Ml = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Dl]), Ll = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), Rl = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Nl = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function Il(i, t) {
  const e = Nl[i];
  return typeof e == "object" ? e[t] ? e.$ : void 0 : e;
}
const Fl = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), jl = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Bl(i, t, e) {
  let r = e.length, n = t.length, s = r, o = 0, a = 0, u = t[n - 1].nextSibling, l = null;
  for (; o < n || a < s; ) {
    if (t[o] === e[a]) {
      o++, a++;
      continue;
    }
    for (; t[n - 1] === e[s - 1]; )
      n--, s--;
    if (n === o) {
      const c = s < r ? a ? e[a - 1].nextSibling : e[s - a] : u;
      for (; a < s; )
        i.insertBefore(e[a++], c);
    } else if (s === a)
      for (; o < n; )
        (!l || !l.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === e[s - 1] && e[a] === t[n - 1]) {
      const c = t[--n].nextSibling;
      i.insertBefore(e[a++], t[o++].nextSibling), i.insertBefore(e[--s], c), t[n] = e[s];
    } else {
      if (!l) {
        l = /* @__PURE__ */ new Map();
        let f = a;
        for (; f < s; )
          l.set(e[f], f++);
      }
      const c = l.get(t[o]);
      if (c != null)
        if (a < c && c < s) {
          let f = o, h = 1, p;
          for (; ++f < n && f < s && !((p = l.get(t[f])) == null || p !== c + h); )
            h++;
          if (h > c - a) {
            const _ = t[o];
            for (; a < c; )
              i.insertBefore(e[a++], _);
          } else
            i.replaceChild(e[a++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const fo = "_$DX_DELEGATE";
function wa(i, t, e, r = {}) {
  let n;
  return yl((s) => {
    n = s, t === document ? i() : bt(t, i(), t.firstChild ? null : void 0, e);
  }, r.owner), () => {
    n(), t.textContent = "";
  };
}
function Ct(i, t, e) {
  let r;
  const n = () => {
    const o = document.createElement("template");
    return o.innerHTML = i, e ? o.content.firstChild.firstChild : o.content.firstChild;
  }, s = t ? () => mn(() => document.importNode(r || (r = n()), !0)) : () => (r || (r = n())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function Vl(i, t = window.document) {
  const e = t[fo] || (t[fo] = /* @__PURE__ */ new Set());
  for (let r = 0, n = i.length; r < n; r++) {
    const s = i[r];
    e.has(s) || (e.add(s), t.addEventListener(s, Xl));
  }
}
function Wi(i, t, e) {
  e == null ? i.removeAttribute(t) : i.setAttribute(t, e);
}
function zl(i, t, e, r) {
  r == null ? i.removeAttributeNS(t, e) : i.setAttributeNS(t, e, r);
}
function ql(i, t) {
  t == null ? i.removeAttribute("class") : i.className = t;
}
function Ul(i, t, e, r) {
  if (r)
    Array.isArray(e) ? (i[`$$${t}`] = e[0], i[`$$${t}Data`] = e[1]) : i[`$$${t}`] = e;
  else if (Array.isArray(e)) {
    const n = e[0];
    i.addEventListener(t, e[0] = (s) => n.call(i, e[1], s));
  } else
    i.addEventListener(t, e);
}
function Hl(i, t, e = {}) {
  const r = Object.keys(t || {}), n = Object.keys(e);
  let s, o;
  for (s = 0, o = n.length; s < o; s++) {
    const a = n[s];
    !a || a === "undefined" || t[a] || (ho(i, a, !1), delete e[a]);
  }
  for (s = 0, o = r.length; s < o; s++) {
    const a = r[s], u = !!t[a];
    !a || a === "undefined" || e[a] === u || !u || (ho(i, a, !0), e[a] = u);
  }
  return e;
}
function Wl(i, t, e) {
  if (!t)
    return e ? Wi(i, "style") : t;
  const r = i.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof e == "string" && (r.cssText = e = void 0), e || (e = {}), t || (t = {});
  let n, s;
  for (s in e)
    t[s] == null && r.removeProperty(s), delete e[s];
  for (s in t)
    n = t[s], n !== e[s] && (r.setProperty(s, n), e[s] = n);
  return e;
}
function Dt(i, t = {}, e, r) {
  const n = {};
  return r || pr(() => n.children = xr(i, t.children, n.children)), pr(() => t.ref && t.ref(i)), pr(() => Gl(i, t, e, !0, n, !0)), n;
}
function hi(i, t, e) {
  return mn(() => i(t, e));
}
function bt(i, t, e, r) {
  if (e !== void 0 && !r && (r = []), typeof t != "function")
    return xr(i, t, r, e);
  pr((n) => xr(i, t(), n, e), r);
}
function Gl(i, t, e, r, n = {}, s = !1) {
  t || (t = {});
  for (const o in n)
    if (!(o in t)) {
      if (o === "children")
        continue;
      n[o] = po(i, o, null, n[o], e, s);
    }
  for (const o in t) {
    if (o === "children") {
      r || xr(i, t.children);
      continue;
    }
    const a = t[o];
    n[o] = po(i, o, a, n[o], e, s);
  }
}
function Yl(i) {
  return i.toLowerCase().replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function ho(i, t, e) {
  const r = t.trim().split(/\s+/);
  for (let n = 0, s = r.length; n < s; n++)
    i.classList.toggle(r[n], e);
}
function po(i, t, e, r, n, s) {
  let o, a, u, l, c;
  if (t === "style")
    return Wl(i, e, r);
  if (t === "classList")
    return Hl(i, e, r);
  if (e === r)
    return r;
  if (t === "ref")
    s || e(i);
  else if (t.slice(0, 3) === "on:") {
    const f = t.slice(3);
    r && i.removeEventListener(f, r), e && i.addEventListener(f, e);
  } else if (t.slice(0, 10) === "oncapture:") {
    const f = t.slice(10);
    r && i.removeEventListener(f, r, !0), e && i.addEventListener(f, e, !0);
  } else if (t.slice(0, 2) === "on") {
    const f = t.slice(2).toLowerCase(), h = Fl.has(f);
    if (!h && r) {
      const p = Array.isArray(r) ? r[0] : r;
      i.removeEventListener(f, p);
    }
    (h || e) && (Ul(i, f, e, h), h && Vl([f]));
  } else if (t.slice(0, 5) === "attr:")
    Wi(i, t.slice(5), e);
  else if ((c = t.slice(0, 5) === "prop:") || (u = Ll.has(t)) || !n && ((l = Il(t, i.tagName)) || (a = Ml.has(t))) || (o = i.nodeName.includes("-")))
    c && (t = t.slice(5), a = !0), t === "class" || t === "className" ? ql(i, e) : o && !a && !u ? i[Yl(t)] = e : i[l || t] = e;
  else {
    const f = n && t.indexOf(":") > -1 && jl[t.split(":")[0]];
    f ? zl(i, f, t, e) : Wi(i, Rl[t] || t, e);
  }
  return e;
}
function Xl(i) {
  const t = `$$${i.type}`;
  let e = i.composedPath && i.composedPath()[0] || i.target;
  for (i.target !== e && Object.defineProperty(i, "target", {
    configurable: !0,
    value: e
  }), Object.defineProperty(i, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }); e; ) {
    const r = e[t];
    if (r && !e.disabled) {
      const n = e[`${t}Data`];
      if (n !== void 0 ? r.call(e, n, i) : r.call(e, i), i.cancelBubble)
        return;
    }
    e = e._$host || e.parentNode || e.host;
  }
}
function xr(i, t, e, r, n) {
  for (; typeof e == "function"; )
    e = e();
  if (t === e)
    return e;
  const s = typeof t, o = r !== void 0;
  if (i = o && e[0] && e[0].parentNode || i, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), o) {
      let a = e[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), e = cr(i, e, r, a);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  else if (t == null || s === "boolean")
    e = cr(i, e, r);
  else {
    if (s === "function")
      return pr(() => {
        let a = t();
        for (; typeof a == "function"; )
          a = a();
        e = xr(i, a, e, r);
      }), () => e;
    if (Array.isArray(t)) {
      const a = [], u = e && Array.isArray(e);
      if (Gi(a, t, e, n))
        return pr(() => e = xr(i, a, e, r, !0)), () => e;
      if (a.length === 0) {
        if (e = cr(i, e, r), o)
          return e;
      } else
        u ? e.length === 0 ? mo(i, a, r) : Bl(i, e, a) : (e && cr(i), mo(i, a));
      e = a;
    } else if (t.nodeType) {
      if (Array.isArray(e)) {
        if (o)
          return e = cr(i, e, r, t);
        cr(i, e, null, t);
      } else
        e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    }
  }
  return e;
}
function Gi(i, t, e, r) {
  let n = !1;
  for (let s = 0, o = t.length; s < o; s++) {
    let a = t[s], u = e && e[s], l;
    if (!(a == null || a === !0 || a === !1))
      if ((l = typeof a) == "object" && a.nodeType)
        i.push(a);
      else if (Array.isArray(a))
        n = Gi(i, a, u) || n;
      else if (l === "function")
        if (r) {
          for (; typeof a == "function"; )
            a = a();
          n = Gi(i, Array.isArray(a) ? a : [a], Array.isArray(u) ? u : [u]) || n;
        } else
          i.push(a), n = !0;
      else {
        const c = String(a);
        u && u.nodeType === 3 && u.data === c ? i.push(u) : i.push(document.createTextNode(c));
      }
  }
  return n;
}
function mo(i, t, e = null) {
  for (let r = 0, n = t.length; r < n; r++)
    i.insertBefore(t[r], e);
}
function cr(i, t, e, r) {
  if (e === void 0)
    return i.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const a = t[o];
      if (n !== a) {
        const u = a.parentNode === i;
        !s && !o ? u ? i.replaceChild(n, a) : i.insertBefore(n, e) : u && a.remove();
      } else
        s = !0;
    }
  } else
    i.insertBefore(n, e);
  return [n];
}
const Kl = "is", Ql = "-", Ne = ["task", "as-task"], Sr = "task:", Ta = "component-type";
function ba(i, t = Kl) {
  return t = t ? t + Ql : "", t + i;
}
const Yi = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new Map(), _n = {
  getAll: () => Fn,
  // 컴포넌트 이름으로 생성자 찾기
  component: (i) => Yi.get(i.toLowerCase()),
  // Task 아이템 이름으로 생성자 찾기
  taskItem: (i) => Fn.get(i.toLowerCase())
};
function Mt(i, t, e) {
  const r = ba(i, e), n = (s) => (s = or(s, {
    // [attrName]: '',
    [Ta]: r.toLowerCase()
  }), new t().create(s));
  return Yi.has(r) || Yi.set(r.toLowerCase(), n), n;
}
function j(i, t) {
  const e = i, r = (...n) => new t().create(...n);
  return Fn.has(e) || Fn.set(e.toLowerCase(), r), r;
}
const Xi = Symbol("store-raw"), mr = Symbol("store-node"), Qt = Symbol("store-has"), Ea = Symbol("store-self");
function $a(i) {
  let t = i[Wt];
  if (!t && (Object.defineProperty(i, Wt, {
    value: t = new Proxy(i, tc)
  }), !Array.isArray(i))) {
    const e = Object.keys(i), r = Object.getOwnPropertyDescriptors(i);
    for (let n = 0, s = e.length; n < s; n++) {
      const o = e[n];
      r[o].get && Object.defineProperty(i, o, {
        enumerable: r[o].enumerable,
        get: r[o].get.bind(t)
      });
    }
  }
  return t;
}
function jn(i) {
  let t;
  return i != null && typeof i == "object" && (i[Wt] || !(t = Object.getPrototypeOf(i)) || t === Object.prototype || Array.isArray(i));
}
function Qr(i, t = /* @__PURE__ */ new Set()) {
  let e, r, n, s;
  if (e = i != null && i[Xi])
    return e;
  if (!jn(i) || t.has(i))
    return i;
  if (Array.isArray(i)) {
    Object.isFrozen(i) ? i = i.slice(0) : t.add(i);
    for (let o = 0, a = i.length; o < a; o++)
      n = i[o], (r = Qr(n, t)) !== n && (i[o] = r);
  } else {
    Object.isFrozen(i) ? i = Object.assign({}, i) : t.add(i);
    const o = Object.keys(i), a = Object.getOwnPropertyDescriptors(i);
    for (let u = 0, l = o.length; u < l; u++)
      s = o[u], !a[s].get && (n = i[s], (r = Qr(n, t)) !== n && (i[s] = r));
  }
  return i;
}
function Bn(i, t) {
  let e = i[t];
  return e || Object.defineProperty(i, t, {
    value: e = /* @__PURE__ */ Object.create(null)
  }), e;
}
function Jr(i, t, e) {
  if (i[t])
    return i[t];
  const [r, n] = vl(e, {
    equals: !1,
    internal: !0
  });
  return r.$ = n, i[t] = r;
}
function Jl(i, t) {
  const e = Reflect.getOwnPropertyDescriptor(i, t);
  return !e || e.get || !e.configurable || t === Wt || t === mr || (delete e.value, delete e.writable, e.get = () => i[Wt][t]), e;
}
function Aa(i) {
  Hi() && Jr(Bn(i, mr), Ea)();
}
function Zl(i) {
  return Aa(i), Reflect.ownKeys(i);
}
const tc = {
  get(i, t, e) {
    if (t === Xi)
      return i;
    if (t === Wt)
      return e;
    if (t === co)
      return Aa(i), e;
    const r = Bn(i, mr), n = r[t];
    let s = n ? n() : i[t];
    if (t === mr || t === Qt || t === "__proto__")
      return s;
    if (!n) {
      const o = Object.getOwnPropertyDescriptor(i, t);
      Hi() && (typeof s != "function" || i.hasOwnProperty(t)) && !(o && o.get) && (s = Jr(r, t, s)());
    }
    return jn(s) ? $a(s) : s;
  },
  has(i, t) {
    return t === Xi || t === Wt || t === co || t === mr || t === Qt || t === "__proto__" ? !0 : (Hi() && Jr(Bn(i, Qt), t)(), t in i);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Zl,
  getOwnPropertyDescriptor: Jl
};
function Vn(i, t, e, r = !1) {
  if (!r && i[t] === e)
    return;
  const n = i[t], s = i.length;
  e === void 0 ? (delete i[t], i[Qt] && i[Qt][t] && n !== void 0 && i[Qt][t].$()) : (i[t] = e, i[Qt] && i[Qt][t] && n === void 0 && i[Qt][t].$());
  let o = Bn(i, mr), a;
  if ((a = Jr(o, t, n)) && a.$(() => e), Array.isArray(i) && i.length !== s) {
    for (let u = i.length; u < s; u++)
      (a = o[u]) && a.$();
    (a = Jr(o, "length", s)) && a.$(i.length);
  }
  (a = o[Ea]) && a.$();
}
function xa(i, t) {
  const e = Object.keys(t);
  for (let r = 0; r < e.length; r += 1) {
    const n = e[r];
    Vn(i, n, t[n]);
  }
}
function ec(i, t) {
  if (typeof t == "function" && (t = t(i)), t = Qr(t), Array.isArray(t)) {
    if (i === t)
      return;
    let e = 0, r = t.length;
    for (; e < r; e++) {
      const n = t[e];
      i[e] !== n && Vn(i, e, n);
    }
    Vn(i, "length", r);
  } else
    xa(i, t);
}
function zr(i, t, e = []) {
  let r, n = i;
  if (t.length > 1) {
    r = t.shift();
    const o = typeof r, a = Array.isArray(i);
    if (Array.isArray(r)) {
      for (let u = 0; u < r.length; u++)
        zr(i, [r[u]].concat(t), e);
      return;
    } else if (a && o === "function") {
      for (let u = 0; u < i.length; u++)
        r(i[u], u) && zr(i, [u].concat(t), e);
      return;
    } else if (a && o === "object") {
      const {
        from: u = 0,
        to: l = i.length - 1,
        by: c = 1
      } = r;
      for (let f = u; f <= l; f += c)
        zr(i, [f].concat(t), e);
      return;
    } else if (t.length > 1) {
      zr(i[r], t, [r].concat(e));
      return;
    }
    n = i[r], e = [r].concat(e);
  }
  let s = t[0];
  typeof s == "function" && (s = s(n, e), s === n) || r === void 0 && s == null || (s = Qr(s), r === void 0 || jn(n) && jn(s) && !Array.isArray(s) ? xa(n, s) : Vn(i, r, s));
}
function rc(...[i, t]) {
  const e = Qr(i || {}), r = Array.isArray(e), n = $a(e);
  function s(...o) {
    bl(() => {
      r && o.length === 1 ? ec(e, o[0]) : zr(e, o);
    });
  }
  return [n, s];
}
const nc = () => {
  const [i, t] = rc({
    // debug: false
  });
  return {
    state: i,
    setState: t
    // task, setTask,
    // template, setTemplate,
    // increment: () => setState(({ count }) => ({ count: count + 1})),
    // decrement: () => setState(({ count }) => ({ count: count - 1}))
  };
};
let Sa = !1;
const k = () => Sa;
let Oa = !1;
const I = () => Oa;
let ka = !1;
const ic = () => ka, sc = (i) => {
  Sa = i.includes("dev"), Oa = i.includes("media"), ka = i.includes("component");
};
nc();
class oc {
  constructor() {
    // (디버깅용)
    x(this, "debug");
    this.debug = k();
  }
}
function Pa(i, t) {
  let e = "[" + t + "]";
  const r = Wr(e);
  return ar(r)(i);
}
function go(i, t) {
  return yn(i, t, "string");
}
function Ca(i, t, e = null) {
  const r = di(t), n = ar(r);
  return e ? n.bind(e)(i) : n(i);
}
function yn(i, t, e = "string") {
  if (typeof t != "string")
    return t;
  let r;
  if (e === "string") {
    if (r = uc(t), !r)
      return t;
  } else
    e === "code" ? r = di(t) : (r = ac(t), r || (r = Wr(t)));
  const s = ar(r)(i);
  return e === "number" ? Number(s) : e === "boolean" ? !!s : s;
}
function ar(i) {
  if (!(i === "undefined" || i === void 0))
    return Function(`"use strict";
 return ` + i)();
}
function zn(i, t = "$args") {
  return "(function(" + t + "){ return (`" + i + "`) })";
}
function Wr(i, t = "$args") {
  return "(function(" + t + "){ return (" + i + ") })";
}
function di(i, t = "$args") {
  const e = i.match(/([\s\S]+[^;\s]+)[;\s]*;?/g);
  return e != null && e.length && (i = e[0]), /\(*return\s[\s\S]+\)*/gms.test(i) ? "(function(" + t + "){ " + i + " })" : /\(*function(\s|\()[\s\S]+\)*/gms.test(i) || /\(+[\s\S]+\)\s*=>[\s\S]+\)*/.test(i) ? "(function(" + t + "){ return (" + i + ") })" : i.includes(";") ? (i = "(() => {" + i + "})()", "(function(" + t + "){ return " + i + " })") : "(function(" + t + "){ return (" + i + ") })";
}
const _o = /\$\{\s*(\$args(\s*\[\s*(\d+)\s*\])?)\s*\}/mg, Ki = /\$\{[\s\S]+\}/mg, Qi = /\$args(\s*\[\s*(\d+)\s*\])?/mg;
function ac(i) {
  const t = i.match(_o);
  if ((t == null ? void 0 : t.length) > 0)
    return i = i.replace(_o, (a, u) => u), Wr(i);
  const r = i.match(Ki);
  if ((r == null ? void 0 : r.length) > 0)
    return i = i.replace(Ki, (a, u) => "`" + a + "`"), Wr(i);
  const s = i.match(Qi);
  if ((s == null ? void 0 : s.length) > 0)
    return Wr(i);
}
function uc(i) {
  const t = i.match(Ki);
  if ((t == null ? void 0 : t.length) > 0)
    return zn(i);
  const r = i.match(Qi);
  if ((r == null ? void 0 : r.length) > 0)
    return i = i.replace(Qi, (s) => "${" + s + "}"), zn(i);
}
let $t = null;
class lc {
  constructor(t) {
    x(this, "dndID");
    //---------------------------
    // drag
    //---------------------------
    x(this, "dragValue");
    // 위치 찾기
    // https://javascript.info/mouse-drag-and-drop
    // onDragMove(event) {
    //
    // }
    //---------------------------
    // drop
    //---------------------------
    x(this, "dropValue");
    this.dndID = t;
  }
  getAttribute(t, e) {
    return t.getAttribute(e);
  }
  setDrag(t, e, r) {
    t.setAttribute("draggable", !0), this.dragValue = r;
    const n = this.onDragStart.bind(this), s = this.onDragend.bind(this);
    return t.addEventListener("dragstart", n), t.addEventListener("dragend", s), () => {
      t.removeEventListener("dragstart", n), t.removeEventListener("dragend", s);
    };
  }
  onDragStart(t) {
    $t = t.target, $t.nodeType !== Node.ELEMENT_NODE && ($t = $t.parentElement), k() && console.log("drag 조건: ", this.dragValue), t.dataTransfer.effectAllowed = "move";
  }
  onDragend(t) {
    $t = null;
  }
  setDrop(t, e, r) {
    t.setAttribute("droppable", !0), this.dropValue = r;
    const n = this.onDragOver.bind(this), s = this.onDrop.bind(this);
    return t.addEventListener("dragover", n), t.addEventListener("drop", s), () => {
      t.removeEventListener("dragover", n), t.removeEventListener("drop", s);
    };
  }
  onDragOver(t) {
    this.dndID === this.getAttribute($t, Or) && t.preventDefault();
  }
  onDrop(t) {
    const e = this.getAttribute($t, Or);
    if (this.dndID !== e)
      return;
    t.preventDefault();
    const r = $t.getAttribute(qn);
    k() && console.log("drop 조건: ", r, this.dropValue, $t);
    const n = {
      dragValue: r,
      dropValue: this.dropValue,
      dragGroup: e,
      drag: $t,
      drop: t.target,
      dropGroup: this.dndID
    };
    r === this.dropValue ? ($t.dispatchEvent(new CustomEvent("success", {
      detail: n,
      cancelable: !0
    })), t.target.dispatchEvent(new CustomEvent("success", {
      detail: n,
      cancelable: !0
    }))) : ($t.dispatchEvent(new CustomEvent("fail", {
      detail: n,
      cancelable: !0
    })), t.target.dispatchEvent(new CustomEvent("fail", {
      detail: n,
      cancelable: !0
    })));
  }
}
const Nt = {
  getZoomRate: (i) => {
    var t = i.offsetWidth !== 0 ? i : i.parentElement, e = t.offsetWidth, r = t.getBoundingClientRect().width;
    return r / e;
  },
  // node attr --> dom으로 카피
  copyAttrs: (i, t) => {
    for (let e of i.attributes)
      t.setAttribute(e.name, e.value || "");
  },
  getAttributes: (i) => {
    const t = {};
    for (let e of i.attributes)
      t[e.name.toLowerCase()] = e.value;
    return t;
  },
  // parent Element가 node의 부모 tree에 속하는지 판별
  isParent: (i, t, e = !0) => {
    let r = e ? i : i.parentElement;
    for (; r; ) {
      if (r === t)
        return !0;
      r = r.parentElement;
    }
    return !1;
  },
  toElement: (i, t) => {
    if (t = t || document, typeof i == "string")
      return t.querySelector(i);
    if (typeof i == "function") {
      let e = i;
      for (; typeof e == "function"; )
        e = e();
      if (e)
        return e();
    }
    return i;
  },
  toElementAsync: async (i, t) => {
    if (t = t || document, typeof i == "string")
      return t.querySelector(i);
    for (; i; ) {
      if (typeof i == "function") {
        i = i();
        continue;
      } else if (i instanceof Promise) {
        i = await i;
        continue;
      }
      break;
    }
    return i;
  }
}, kt = {
  temporaryID: (i = 16) => {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let e = "";
    for (let r = 0; r < i; r++)
      e += t.charAt(Math.floor(Math.random() * t.length));
    return e;
  },
  // abc-def --> abcDef
  toCamelCase: function(i) {
    return i.replace(/-(\w)/g, function(t, e) {
      return e.toUpperCase();
    });
  }
  /*
  // abcDef --> abc-def
  toSnakeCase: function (string) {
      return string.replace(/(\w)?([A-Z])/g, function (matches, $1, $2) {
          var prefix = $1 ? ($1 + '-') : '';
          return prefix + $2.toLowerCase();
      })
  },
  toCaption: function (string) {
      return string.replace(/^(\w)/g, function (matches, letter) {
          return letter.toUpperCase();
      })
  },
  */
};
let lt = null, U = null;
class cc {
  constructor(t) {
    x(this, "dndID");
    // 참고
    // https://javascript.info/mouse-drag-and-drop
    // https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5
    x(this, "handlers", /* @__PURE__ */ new Map());
    x(this, "dragValue");
    x(this, "dragHandlers");
    // 마우스 아래 좌표에 있는 드랍 가능한 element
    x(this, "dropArea");
    // 드래그 전, 후 위치 (글로벌 좌표임)
    x(this, "position");
    x(this, "scale");
    x(this, "shiftX");
    x(this, "shiftY");
    x(this, "isMoved", !1);
    this.dndID = t;
  }
  addEventListener(t, e, r) {
    e.split(",").forEach((n) => {
      n = n.trim(), this.handlers.set(n, { element: t, handler: r }), t.addEventListener(n, r, { passive: !1 });
    });
  }
  removeEventListener(t) {
    t.split(",").forEach((e) => {
      e = e.trim();
      const { element: r, handler: n } = this.handlers.get(e);
      r.removeEventListener(e, n), this.handlers.delete(e);
    });
  }
  removeAllEventListener() {
    for (let [t, { element: e, handler: r }] of this.handlers)
      e.removeEventListener(t, r);
  }
  dispatchEvent(t, e, r) {
    this.getPositionInfo(r);
    const n = {
      // 시작, 끝 위치
      position: this.position,
      event: r,
      // 드래그 정보
      dragValue: this.dragValue,
      dragGroup: this.dndID,
      drag: lt,
      // 드랍 정보
      dropValue: null,
      drop: null,
      dropGroup: null
    };
    if (this.dropArea && (n.dropValue = this.dropArea.getAttribute(Un), n.dropGroup = this.dropArea.getAttribute(Or), n.drop = this.dropArea), n.success = this.dragValue === n.dropValue, e.dispatchEvent(new CustomEvent(t, {
      detail: n,
      // shadowroot 밖으로 custom 이벤트 전파하기 위해 true 설정
      composed: !0,
      // bubbles: true,
      cancelable: !0
    })), t === "dragend" || t === "drop") {
      const s = n.success ? "success" : "fail", o = new CustomEvent(s, {
        detail: n,
        composed: !0,
        // bubbles: true,
        cancelable: !0
      });
      e.dispatchEvent(o);
    }
  }
  //---------------------------
  // drag
  //---------------------------
  get dndSelector() {
    return `[${Or}=${this.dndID}]`;
  }
  setDrag(t, e, r) {
    return this.dragValue = r, this.dragHandlers = {
      onDragStart: this.onDragStart.bind(this),
      onDrag: this.onDrag.bind(this),
      onDragend: this.onDragend.bind(this)
    }, this.addEventListener(t, "mousedown, touchstart", this.dragHandlers.onDragStart), () => {
      this.removeAllEventListener(), this.handlers = /* @__PURE__ */ new Map();
    };
  }
  getTouchObj(t) {
    return "changedTouches" in t ? t.changedTouches[0] : t;
  }
  // 안전하게 구하는 절대좌표와 상대좌표
  // https://velog.io/@wiostz98kr/TIL26-l-JavaScript-Coordinates
  /*
      // 위치 적용시 parent의 상태 (position, display)에 따라 값 적용이 불안정 해지니
      // 최초 drag Element 좌표 기준으로 translate 하여 사용하는 것이 제일 안정적임
  
        const drag = $args.event.detail.drag;
        const from = {
          x: $args.event.detail.position.end.dist.x,
          y: $args.event.detail.position.end.dist.y
        }
        const to = {
          x: $args.event.detail.position.dropOrigin.dist.x,
          y: $args.event.detail.position.dropOrigin.dist.y,
          onComplete: () => $next()
        }
  
        // drag end 위치에서 drop 위치로 이동
        this.tween = gsap.fromTo(drag, from, to);
  
        // <tween selector="$args.event.detail.drag" selector-is-dom from="from" to="to"></tween>
      * */
  getPositionInfo(t) {
    const e = !this.position || !this.position.start, n = (e ? lt : U || lt).getBoundingClientRect(), s = n.left, o = n.top, a = n.width, u = n.height, l = getComputedStyle(lt), c = new DOMMatrixReadOnly(l.transform);
    let f = {
      x: c.m41,
      y: c.m42
    };
    if (e) {
      let y = this.getTouchObj(t);
      this.shiftX = y.clientX - s, this.shiftY = y.clientY - o, this.position = {
        scale: this.scale,
        shift: {
          x: this.shiftX,
          y: this.shiftY
        },
        start: {
          // 글로벌 좌표
          global: { x: s, y: o, w: a, h: u },
          // 부모로부터 좌표로 변환
          // offset: { x: offsetX, y: offsetY },
          // 자신의 원래 위치로부터 이동 좌표
          dist: {
            x: f.x,
            y: f.y
          }
        }
      };
      return;
    }
    const h = this.position.start.global.x, p = this.position.start.global.y;
    let _ = s - h, d = o - p;
    _ = Math.round(_ / this.scale), d = Math.round(d / this.scale), this.position.end = {
      // 이동된 글로벌 좌표
      global: { x: s, y: o, w: a, h: u },
      // 이동된 글로벌 좌표를 부모 좌표로 변환
      // (left, top 이동시킬때 사용 : 부모 position에 따라 불안정해짐)
      // offset: { x: offsetX, y: offsetY },
      // 처음 위치에서 이동한 거리 (transform으로 이동시킬때 사용)
      dist: {
        x: _ + f.x,
        y: d + f.y
      }
    }, this.dropArea && (this.position.dropOrigin = (() => {
      if (!this.dropArea)
        return;
      const y = this.dropArea.getBoundingClientRect(), w = y.left, m = y.top, g = y.width, v = y.height, T = new DOMMatrixReadOnly(getComputedStyle(this.dropArea).transform);
      let b = {
        x: T.m41,
        y: T.m42
      };
      const $ = Math.round((y.left - h) / this.scale), S = Math.round((y.top - p) / this.scale);
      return {
        global: { x: w, y: m, w: g, h: v },
        // offset: { x: offsetX, y: offsetY },
        dist: {
          x: $ + b.x,
          y: S + b.y
        }
      };
    })());
  }
  // ghost 이미지 표시
  setGhost() {
    U = lt.cloneNode(!0), U.style.transition = "none", U.style.position = "absolute", U.style.zIndex = 1e3, U.style.pointerEvents = "none", U.style.margin = 0, U.id = "ghost";
    const t = getComputedStyle(lt);
    U.style.background = t.background, U.style.width = t.width, U.style.height = t.height, U.style.left = "", U.style.top = "", U.style.transform = `scale(${this.scale})`, U.style.transformOrigin = "0% 0%", document.body.append(U), document.body.classList.add("dnd-dragging"), this.changeVisible(!1);
  }
  deleteGhost() {
    document.body.classList.remove("dnd-dragging"), U && (U.remove(), U = null), this.changeVisible(!0);
  }
  // 클릭 이벤트 발생하도록 하기 위해 move 한 경우에 바꿔줌
  changeVisible(t) {
    (lt.getAttribute(fc) || "move") === "move" && (t ? lt.style.visibility = "" : lt.style.visibility = "hidden");
  }
  // ghost 이미지 드래그 이동
  moveAt(t, e) {
    U && (U.style.left = t - this.shiftX + "px", U.style.top = e - this.shiftY + "px");
  }
  //---------------------------
  // 핸들러
  //---------------------------
  onDragStart(t) {
    t.preventDefault(), lt = t.target.closest(this.dndSelector), this.scale = Nt.getZoomRate(lt), this.addEventListener(document, "mousemove, touchmove", this.dragHandlers.onDrag), this.addEventListener(document, "mouseup, touchend", this.dragHandlers.onDragend);
  }
  _onDragStart(t) {
    this.setGhost(), this.getPositionInfo(t);
    let e = this.getTouchObj(t);
    this.moveAt(e.pageX, e.pageY), this.dispatchEvent("dragstart", lt, t);
  }
  onDragend(t) {
    this.removeEventListener("mousemove, touchmove"), this.removeEventListener("mouseup, touchend"), this.isMoved && (this.isMoved = !1, this.dispatchEvent("dragend", lt, t), this.dropArea && this.dispatchEvent("drop", this.dropArea, t), this.leaveDroppable(this.dropArea), this.deleteGhost()), this.dropArea = null, this.position = null, this.shiftX = null, this.shiftY = null;
  }
  onDrag(t) {
    if (t.preventDefault(), !this.isMoved) {
      this.isMoved = !0, this._onDragStart(t);
      return;
    }
    let e = this.getTouchObj(t);
    this.moveAt(e.pageX, e.pageY), U.hidden = !0;
    let r = document.elementFromPoint(e.clientX, e.clientY);
    if (U.hidden = !1, !r)
      return;
    let n = r.closest(this.dndSelector);
    U !== n && lt !== n && (this.dropArea !== n && (this.dropArea && this.leaveDroppable(this.dropArea, t), this.dropArea = n, this.dropArea && this.enterDroppable(this.dropArea, t)), this.dispatchEvent("drag", lt, t));
  }
  // 드랍 가능영역에서 나갈때
  leaveDroppable(t, e) {
    t && e && this.dispatchEvent("dragleave", t, e);
  }
  // 드랍 가능영역에 들어올때
  enterDroppable(t, e) {
    t && e && this.dispatchEvent("dragenter", t, e);
  }
  //---------------------------
  // drop
  //---------------------------
  // 드랍되는 쪽의 구현되는 코드는 없음
  setDrop(t, e, r) {
  }
}
class Da {
  constructor(t, e) {
    x(this, "element");
    x(this, "attrs");
    this.element = t, this.attrs = e;
  }
  create() {
  }
}
const Or = "data-dnd-group", qn = "data-drag-value", Un = "data-drop-value", fc = "data-dnd-type", hc = "as-dnd-mode";
class dc extends Da {
  constructor() {
    super(...arguments);
    x(this, "dndID");
    x(this, "dragValue");
    x(this, "dropValue");
  }
  create() {
    this.setDragNDrop(this.element, this.attrs);
  }
  setDragNDrop(e, r) {
    Or in r && (this.dndID = r[Or]);
    const s = r[hc];
    let o;
    s === "dnd" ? o = new lc(this.dndID) : o = new cc(this.dndID), qn in r && (this.dragValue = r[qn], o.setDrag(e, r, this.dragValue)), Un in r && (this.dropValue = r[Un], o.setDrop(e, r, this.dropValue));
  }
}
class Ma {
  constructor(t = null) {
    this.target = t || new EventTarget();
  }
  on(t, e) {
    return this.target.addEventListener(t, e);
  }
  once(t, e) {
    return this.target.addEventListener(t, e, { once: !0 });
  }
  off(t, e) {
    return this.target.removeEventListener(t, e);
  }
  emit(t, e) {
    return this.target.dispatchEvent(new CustomEvent(t, { detail: e, cancelable: !0 }));
  }
}
const Pe = (i, t, e, r) => {
  var n = t.readyState, s = t.networkState;
  I() && console.log("[MEDIA][", i, "] : state(", n, "), network(", s, ")"), i === "Error" && console.error(r);
}, pc = {
  0: "HAVE_NOTHING",
  1: "HAVE_METADATA",
  2: "HAVE_CURRENT_DATA",
  3: "HAVE_FUTURE_DATA",
  4: "HAVE_ENOUGH_DATA"
}, mc = {
  0: "NETWORK_EMPTY",
  1: "NETWORK_IDLE",
  2: "NETWORK_LOADING",
  3: "NETWORK_NO_SOURCE"
}, yo = "loadstart, progress,suspend, abort,error, emptied,play, pause,loadedmetadata, loadeddata,waiting, playing,canplay, canplaythrough,seeking, seeked, timeupdate, ended,ratechange,durationchange, volumechange";
var xt, Fe, ln;
class gc extends Ma {
  constructor() {
    super(...arguments);
    // 'audio' | 'video'
    x(this, "mediaType");
    // media Element
    x(this, "player");
    //---------------------------------------
    // track 이벤트 프록시
    //---------------------------------------
    P(this, xt, void 0);
    //---------------------------------------
    // 이벤트 프록시
    //---------------------------------------
    P(this, Fe, void 0);
    //////////////////////////////////////////////////////////////////////////////////
    // 풀스크린 이벤트 (풀스크린 기능 보정)
    //////////////////////////////////////////////////////////////////////////////////
    // 풀스크린 상태가 변경될때 마지막 controls 값을 기록함
    P(this, ln, void 0);
    //---------------------------------------
    // 풀스크린 이벤트
    //---------------------------------------
    x(this, "_fullscreenProxyHandler");
  }
  // 코드 진입 지점
  create(e, r) {
    r && (this.mediaType = e, this.player = r, this.initialize());
  }
  initialize() {
    this.createEventProxy(), this.addFullscreenEvent(), this.addTrackEvent();
  }
  // 이벤트 제거
  clearEvent() {
    this.removeEventProxy(), this.removeFullscreenEvent(), this.removeTrackEvent();
  }
  dispose() {
    this.clearEvent(), this.player = null;
  }
  // event: addtrack, removetrack, change
  addTrackEvent() {
    O(this, xt, this.trackEventListener.bind(this));
    const e = this.player.textTracks;
    e.addEventListener("addtrack", E(this, xt)), e.addEventListener("removetrack", E(this, xt)), e.addEventListener("change", E(this, xt));
  }
  removeTrackEvent() {
    if (!E(this, xt))
      return;
    const e = this.player.textTracks;
    e.removeEventListener("addtrack", E(this, xt)), e.removeEventListener("removetrack", E(this, xt)), e.removeEventListener("change", E(this, xt)), O(this, xt, null);
  }
  trackEventListener(e) {
    var s;
    let r = e.type;
    r === "change" && (r = "trackChange");
    var n = this.getHandlerName(r);
    (s = this[n]) == null || s.call(this), this.emit(r, this);
  }
  onTrackChange(e) {
    I() && console.log("onTrackChange");
  }
  onAddtrack(e) {
    I() && console.log("onAddtrack");
  }
  onRemovetrack(e) {
    I() && console.log("onRemovetrack");
  }
  // player 이벤트를 모두 customEvent로 재발송 되도록 함
  createEventProxy() {
    O(this, Fe, this.eventListener.bind(this));
    var e = yo.split(",");
    for (const r of e)
      this.player.addEventListener(r.trim(), E(this, Fe));
  }
  // 이벤트 제거
  removeEventProxy() {
    var e = yo.split(",");
    for (const r of e)
      this.player.removeEventListener(r.trim(), E(this, Fe));
    O(this, Fe, null);
  }
  eventListener(e) {
    var n;
    var r = this.getHandlerName(e.type);
    (n = this[r]) == null || n.call(this), this.emit(e.type, this);
  }
  // on + 이벤트 이름 capitalize
  getHandlerName(e) {
    return "on" + e.charAt(0).toUpperCase() + e.slice(1);
  }
  get readyState() {
    var e = this.player.readyState;
    return e !== void 0 ? pc[e] : "not ready";
  }
  get networkState() {
    var e = this.player.networkState;
    return e !== void 0 ? mc[e] : "not ready";
  }
  //////////////////////////////////////////////////////////////////////////////////
  // 이벤트 핸들러
  //////////////////////////////////////////////////////////////////////////////////
  // 브라우져가 미디어를 찾기 시작할 때 발생
  onLoadstart(e) {
    I() && console.log("onLoadstart autoplay:", this.autoplay());
  }
  // 브라우져가 미디어 데이터를 가져오는 중에 발생
  onProgress(e) {
    Pe("Progress", this);
  }
  // 브라우져가 현재 데이터를 전부다 다운하지 않았는데 미디어 데이터를 가져오는 것이 멈췄을 때 발생
  onSuspend(e) {
    Pe("Suspend", this);
  }
  // 브라우져가 에러가 아닌 상황에서 미디어 데이터를 가져오는 것을 멈췄을 때 발생
  onAbort(e) {
    Pe("Abort", this);
  }
  // 미디어의 networkState가 NETWORK_EMPTY상태로 들어가게 되었을 때 발생 (치명적인 오류로 멈추거나, 이미 리소스 선택 알고리즘이 실행중이었는데 load() 함수가 호출되었을 때)
  onEmptied(e) {
    Pe("Emptied", this);
  }
  // 미디어 데이터를 가져오다가 에러가 발생했을 때 발생
  onError(e) {
    I() && console.log("onError : ", e);
    var r = this.player, n, s;
    switch (r.error.code) {
      case r.error.MEDIA_ERR_ABORTED:
        s = "MEDIA_ERR_ABORTED", n = "You aborted the media playback.";
        break;
      case r.error.MEDIA_ERR_NETWORK:
        s = "MEDIA_ERR_NETWORK", n = "A network error caused the media download to fail part-way.";
        break;
      case r.error.MEDIA_ERR_DECODE:
        s = "MEDIA_ERR_DECODE", n = "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.";
        break;
      case r.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        var o = this.get("src");
        o && o !== "" && (s = "MEDIA_ERR_SRC_NOT_SUPPORTED", n = "The media could not be loaded, either because the server or network failed or because the format is not supported.");
        break;
      default:
        n = "An unknown error occurred.";
        break;
    }
    n && Pe("Error", this, n, s);
  }
  // 재생되었을 때, play() 함수가 리턴하고나서, autoplay로 인해 재생이 시작되었을 때 호출
  onPlay(e) {
    I() && console.log("onPlay");
  }
  // 미디어가 일시정지 되었을 때 발생 (pause()함수가 리턴 되고나서 발생)
  onPause(e) {
    I() && console.log("onPause");
  }
  // 브라우져가 미디어의 길이와 넓이, 높이의 메타정보를 가져왔을 때 발생
  onLoadedmetadata(e) {
    I() && console.log("onLoadedmetadata");
  }
  // 브라우져가 현재 재생위치에서 미디어 정보를 뿌릴 수 있는 상태로 준비되면 발생
  onLoadeddata(e) {
    I() && console.log("onLoadeddata");
  }
  // 다음 프레임이 로드되지 않아서 재생이 멈추었을 때 발생, 브라우져는 곧 프레임이 가능해질 것이라고 예상하고 있음
  onWaiting(e) {
    Pe("Waiting", this);
  }
  // 재생이 시작되었을 때 발생
  onPlaying(e) {
    I() && console.log("onPlaying");
  }
  // 브라우져가 미디어 데이터의 재생이 가능해질 때 발생, 하지만 지금 재생을 시작하면 이후 버퍼링 속도가 느려서 다시 멈추지 않고 재생이 불가할것이라고 측정 함
  onCanplay(e) {
    I() && console.log("onCanplay");
  }
  // 브라우저가 현재 재생을 시작하면, 버퍼링 속도와 재생 속도를 고려했을 때 끝까지 멈추지 않고 재생 가능할 것이라고 측정 함
  onCanplaythrough(e) {
    I() && console.log("onCanplaythrough");
  }
  // seek 동작이 길게 유지되어서 브라우져에서 이벤트 발생이 될정도가 되었을 때 발생
  onSeeking(e) {
    I() && console.log("onSeeking");
  }
  // seeking이 끝나면 발생
  onSeeked(e) {
    I() && console.log("onSeeked");
  }
  // 현재 재생위치가 바뀌었을 때 발생
  onTimeupdate(e) {
  }
  // 미디어의 끝에 도달해서 재생이 멈추었을 때 발생
  onEnded(e) {
    Pe("Ended", this);
  }
  // defaultPlaybackRate나 playbackRate의 속성이 변경되었을 때 발생
  onRatechange(e) {
  }
  // duration 속성이 바뀌었을 때 발생
  onDurationchange(e) {
    I() && console.log("onDurationchange");
  }
  // volume 속성이 변하거나 muted 속성이 변했을 때 발생
  onVolumechange(e) {
    I() && console.log("onVolumechange");
  }
  isFullscreen() {
    return !!(document.fullscreen || document.webkitIsFullScreen || this.getFullscreenElement());
  }
  getFullscreenElement() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  }
  addFullscreenEvent() {
    if (this.mediaType !== "video")
      return;
    const e = this.fullscreenHandler.bind(this);
    document.addEventListener("fullscreenchange", e, !1), document.addEventListener("webkitfullscreenchange", e, !1), document.addEventListener("mozfullscreenchange", e, !1), document.addEventListener("MSFullscreenChange", e, !1), this._fullscreenProxyHandler = e;
  }
  removeFullscreenEvent() {
    if (this.mediaType !== "video")
      return;
    const e = this._fullscreenProxyHandler;
    document.removeEventListener("fullscreenchange", e, !1), document.removeEventListener("webkitfullscreenchange", e, !1), document.removeEventListener("mozfullscreenchange", e, !1), document.removeEventListener("MSFullscreenChange", e, !1), this._fullscreenProxyHandler = null;
  }
  fullscreenHandler(e) {
    const r = this.player;
    !r || e.target !== r || (this.isFullscreen() ? this.requestedFullScreen() : this.canceledFullScreen(), r && r.focus());
  }
  requestedFullScreen() {
    this.player && this.emit("fullscreen", !0);
  }
  canceledFullScreen() {
    this.player && this.emit("fullscreen", !1);
  }
  //---------------------------------------
  // Fullscreen 기능 추가
  //---------------------------------------
  // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
  // http://sublimevideo.net/
  // targetSelector을 지정하면 해당 DOM으로 fullscreen 됨 (CSS : DOM::fullscreen 사용)
  // Chrome>=20, Firefox (Gecko)>=10, IE>=11,	Opera>=12.10, Safari>=5.1
  toggleFullScreen(e) {
    let r;
    if (e ? typeof e == "string" ? r = document.querySelector(e) : r = e : r = this.player, !!r) {
      if (this.isFullscreen()) {
        document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
        return;
      }
      if (r === this.player && E(this, ln) === void 0 && (O(this, ln, r.controls), r.controls = !0), r.requestFullscreen)
        r.requestFullscreen();
      else if (r.msRequestFullscreen)
        r.msRequestFullscreen();
      else if (r.mozRequestFullScreen)
        r.mozRequestFullScreen();
      else if (r.webkitRequestFullscreen)
        r.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      else if (r.webkitEnterFullScreen)
        r.webkitEnterFullScreen();
      else
        return alert("Fullscreen disabled");
    }
  }
}
xt = new WeakMap(), Fe = new WeakMap(), ln = new WeakMap();
var Zt;
class _c {
  constructor(t) {
    x(this, "player");
    //---------------------------------------
    // 실행 delay
    //---------------------------------------
    P(this, Zt, void 0);
    this.player = t;
  }
  // SRC 가 바뀌면 playerReady 상태를 초기화 시켜준다.
  checkSRC(t) {
    var e = this.player.src;
    if (e.length > 0 && t && t.length > 0) {
      var r = e.lastIndexOf(t);
      if (r >= 0) {
        var n = e.substr(r);
        if (n === t)
          return;
      }
    }
    return !0;
  }
  checkNull(t, e) {
    return e == null ? (this.player.removeAttribute(t), !0) : t === "src" && e === "" ? (this.player.removeAttribute(t), !0) : !1;
  }
  addQueue(t) {
    E(this, Zt) || O(this, Zt, []), E(this, Zt).push(t);
  }
  executeQueue(t) {
    if (E(this, Zt)) {
      var e = E(this, Zt).shift();
      if (!e) {
        O(this, Zt, null);
        return;
      }
      t(e), this.executeQueue();
    }
  }
  //---------------------------------------
  // Time
  //---------------------------------------
  // seconds : currentTime
  // durationGuide : duration
  // 123456 --> 0:12
  // 총 길이(durationGuide)에 맞추어 포맷 정해짐
  // formatTime(time, duration) + ' / ' + formatTime(duration)
  formatTime(t, e, r) {
    r = r || ":", e = e || t;
    let n = Math.floor(t % 60), s = Math.floor(t / 60 % 60), o = Math.floor(t / 3600), a = Math.floor(e / 60 % 60), u = Math.floor(e / 3600);
    return (isNaN(t) || t === 1 / 0) && (o = s = n = "-"), o = o > 0 || u > 0 ? o + r : "", s = ((o || a >= 10) && s < 10 ? "0" + s : s) + r, n = n < 10 ? "0" + n : n, o + s + n;
  }
  // 0:12 --> 123456
  parseTime(t, e) {
    e = e || ":";
    let r = t.split(e), n = 0, s, o, a, u, l;
    return r.length === 3 ? (s = r[0], o = r[1], a = r[2]) : (s = 0, o = r[0], a = r[1]), a = a.split(/\s+/), u = a.splice(0, 1)[0], u = u.split(/\.|,/), l = parseFloat(u[1]), u = u[0], n += parseFloat(s) * 3600, n += parseFloat(o) * 60, n += parseFloat(u), l && (n += l / 1e3), n;
  }
}
Zt = new WeakMap();
var je, ue;
class yc extends gc {
  constructor() {
    super(...arguments);
    x(this, "util");
    // media Player 데이터 로드가 완료되었을때
    // media 재생 속성에 접근 가능한 시점
    P(this, je, !1);
    // (사용안함) 코드에 의해 변경되었음을 기록
    // #currentTimeChangedByCode = false;
    // player 준비 완료 콜백 함수
    x(this, "onReadyCallback");
    //////////////////////////////////////////////////////////
    // HTML5 Media 속성
    //////////////////////////////////////////////////////////
    //---------------------------------------
    // Option Get, Set 메서드로 접근 가능하도록 지원
    //---------------------------------------
    P(this, ue, -1);
  }
  isReady() {
    return E(this, je);
  }
  // 코드 진입 지점
  create(e, r, n, s) {
    this.onReadyCallback = n, this.util = new _c(r), this.setInit(s), super.create(e, r);
  }
  // this 속성 초기값 설정 (player 속성은 제외)
  setInit(e) {
    if (e)
      for (var r in e)
        r in this && (this[r] = e[r]);
  }
  dispose() {
    super.dispose(), O(this, ue, -1), O(this, je, !1), this.onReadyCallback = null;
  }
  //////////////////////////////////////////////////////////
  // 이벤트 핸들러
  //////////////////////////////////////////////////////////
  // 브라우져가 현재 재생위치에서 미디어 정보를 뿌릴 수 있는 상태로 준비되면 발생
  onLoadeddata(e) {
    super.onLoadeddata(e), this.onReady();
  }
  /*
  // 현재 재생위치가 바뀌었을 때 발생
  onTimeupdate(e) {
      super.onTimeupdate(e);
      // 코드에 의해 변경되었음을 기록 해지
      // this.#currentTimeChangedByCode = false;
  }
  */
  //---------------------------------------
  // player 데이터가 로드되어 재생 컨트롤이 가능할때
  //---------------------------------------
  onReady() {
    this.util.executeQueue((e) => {
      const { name: r, value: n } = e;
      this.set(r, n);
    }), O(this, je, !0), this.onReadyCallback && (this.onReadyCallback(), this.onReadyCallback = null), this.emit("ready"), E(this, ue) > 0 && (this.set("currentTime", E(this, ue)), O(this, ue, -1));
  }
  /*
  // 사용예
  src = player.get('src')
  player.set('src', 'sample.mp4')
  */
  // Get
  get(e) {
    if (!(e in this.player))
      throw new Error("요청한 [" + e + "]속성이 존재하지 않습니다.");
    if (e === "duration" || e === "currentTime") {
      let r = this.player.duration;
      if (isNaN(r) && (r = 0), e === "duration")
        return r;
      let n = this.player.currentTime;
      return isNaN(n) && (n = 0), Math.min(r, n);
    }
    return this.player[e];
  }
  // Set
  set(e, r) {
    if (!this.player)
      throw new Error("player가 존재하지 않습니다.");
    if (!(e in this.player))
      throw new Error("요청한 속성이 존재하지 않습니다. (" + e + " : " + r + ")");
    if (e === "src") {
      Array.isArray(r) && (r = r[0]), this.util.checkSRC(r) && (O(this, je, !1), this.player.src = r, I() && console.log("media 소스가 바뀜: ", r)), this.util.checkNull(e, r);
      return;
    }
    if (e === "currentTime") {
      if (this.isReady() === !1) {
        O(this, ue, r), this.util.checkNull(e, r);
        return;
      }
    } else
      e === "width" ? (isNaN(r) && (r = this.minWidth), r = Math.max(r, this.minWidth)) : e === "height" && (isNaN(r) && (r = this.minHeight), r = Math.max(r, this.minHeight));
    if (I() && console.log("	 * player set : ", e, "(", r, ")"), !this.util.checkNull(e, r))
      try {
        if (this.player[e] === r)
          return;
        this.player[e] = r;
      } catch (n) {
        console.trace("[ERROR] ", n), this.util.addQueue({ name: e, value: r });
      }
  }
  //---------------------------------------
  // Option 인스턴스 메서드로 접근 가능하도록 지원
  //---------------------------------------
  /*
  // 사용예
  src = this.src();
  this.src('sample.mp4');
  */
  _propertyProxy(e, r) {
    if (r === void 0)
      return this.get(e);
    this.set(e, r);
  }
  _propertyNotSupport(e) {
    console.error('The "' + e + '" method is not available API');
  }
  //---------------------------
  // Get, Set 메서드 정의
  //---------------------------
  src(e) {
    return this._propertyProxy("src", e);
  }
  height(e) {
    return this._propertyProxy("height", e);
  }
  width(e) {
    return this._propertyProxy("width", e);
  }
  controls(e) {
    return this._propertyProxy("controls", e);
  }
  muted(e) {
    return this._propertyProxy("muted", e);
  }
  poster(e) {
    return this._propertyProxy("poster", e);
  }
  loop(e) {
    return this._propertyProxy("loop", e);
  }
  autoplay(e) {
    return this._propertyProxy("autoplay", e);
  }
  preload(e) {
    return this._propertyProxy("preload", e);
  }
  mediagroup(e) {
    return this._propertyProxy("mediagroup", e);
  }
  // 제어 관련 속성값
  /*
      // get/set
      defaultPlaybackRate 	: 기본 재생 속도
      playbackRate 			: 현재 재생 속도
      volume 					: 비디오의 볼륨
      currentTime 			: 현재 재생중인 시간
  
      // get Only
      duration, buffered, videoWidth, videoHeight, paused
      */
  // Not Support 메서드 정의
  //defaultPlaybackRate() { return this._propertyNotSupport('defaultPlaybackRate');};
  //playbackRate() { return this._propertyNotSupport('playbackRate');};
  defaultPlaybackRate(e) {
    return this._propertyProxy("defaultPlaybackRate", e);
  }
  playbackRate(e) {
    return this._propertyProxy("playbackRate", e);
  }
  //---------------------------
  // Get / Set 메서드 정의
  //---------------------------
  currentTime(e) {
    return this._propertyProxy("currentTime", e);
  }
  volume(e) {
    return this._propertyProxy("volume", e);
  }
  //---------------------------
  // Read Only 메서드 정의
  //---------------------------
  videoWidth() {
    return this._propertyProxy("videoWidth");
  }
  videoHeight() {
    return this._propertyProxy("videoHeight");
  }
  duration() {
    return this._propertyProxy("duration");
  }
  buffered() {
    return this._propertyProxy("buffered");
  }
  paused() {
    return this._propertyProxy("paused");
  }
  /*
      readonly attribute TimeRanges played;
      readonly attribute TimeRanges seekable;
      readonly attribute boolean seeking;
  
      readonly attribute boolean ended;
      attribute boolean defaultMuted;
      */
  //---------------------------
  // Track
  //---------------------------
  // 이벤트 발생 후에야 track.mode를 파악할 수 있음
  // https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/mode
  // 안그러면 직접 track 태그의 default attr을 조사해야함
  // https://developer.mozilla.org/en-US/docs/Web/API/TextTrack
  textTracks() {
    return this._propertyProxy("textTracks");
  }
  hasTrack() {
    return this.player.textTracks.length > 0;
  }
  currentTrack() {
    if (!this.hasTrack())
      return;
    const e = this.player.textTracks;
    return Array.from(e).find((r) => r.mode !== "disabled");
  }
  // track 보이기/감추기
  // https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/mode
  showTrack() {
    const e = this.currentTrack();
    e && (e.mode = "showing");
  }
  hideTrack() {
    const e = this.currentTrack();
    e && (e.mode = "hidden");
  }
  toggleTrack() {
    const e = this.currentTrack();
    e && (e.mode = e.mode === "showing" ? "hidden" : "showing");
  }
}
je = new WeakMap(), ue = new WeakMap();
const Oi = `인스턴스를 생성하지 않습니다.
 Media.create 함수를 이용하세요.`;
let ki;
const La = () => ({
  // controls: true,
  // autoplay: true,
  // none, metadata, auto
  // "metadata"로 설정 하면 poster 설정하지 않아도 첫화면 보여짐
  preload: "metadata",
  //src:"videoJS/sample.mp4",
  // IE 미지원
  //defaultMuted: false,
  muted: !1,
  // 재생 속도 조절 (Video)
  // IE에서 배속을 설정하면 로컬에서도 원활하게 재생되지 않고 끊김현상이 발생하는 것으로 확인됨.
  //예) -x1 배속(only IE)
  //    x0.25 배속(not IE)
  //    x0.5 배속(not IE)
  //    x1 x4 x8 배속
  defaultPlaybackRate: 1,
  //poster:"testAssets/poster.png",
  //width:640,
  //height:300,
  loop: !1
});
var Be;
const ni = class ni extends yc {
  //////////////////////////////////////////////////////////
  // 클래스 인스턴스
  //////////////////////////////////////////////////////////
  constructor(e) {
    if (e !== Oi)
      throw new Error(Oi);
    super();
    // 사용자 설정값
    x(this, "config");
    // 최소 크기
    x(this, "minWidth", 50);
    x(this, "minHeight", 50);
    // 2023.11.11
    // #108 issue 패치
    P(this, Be, !1);
  }
  /*
  static {
      // static 초기화 연산
  }
  */
  /************************************************
       // BUG : 20140509 인스턴스 생성
  
       생성과 동시에 option을 함께 설정할 경우  document.readyState 에 의해 비동기로 진행되므로
       이벤트등이 예상과 같이 동작되지 않을 수 있다.
       이런 경우 create 후 이벤트를 등록 하고 다음에 option을 별도로 적용한다.
  
       //************************************************/
  static create(e, r, n, s, o) {
    if (e = e.toLowerCase(), e !== "video" && e !== "audio")
      throw new TypeError("mediaType은 video 또는 audio를 설정합니다.");
    if (!r || r.nodeName.toLowerCase() !== e)
      throw new TypeError(e + " element를 찾을 수 없습니다.");
    if (e === "video" && (ki === void 0 && (ki = vc()), !ki))
      return null;
    const a = new ni(Oi), u = () => {
      a.create(e, r, n, s, o);
    };
    return I() && console.log("document.readyState : ", document.readyState), document.readyState === "interactive" || document.readyState === "complete" ? (u(), a) : (I() && console.log("주의) Media 인스턴스는 콜백함수에서 반환됩니다."), document.addEventListener("DOMContentLoaded", (l) => {
      u();
    }, { once: !0 }), a);
  }
  //---------------------------------------
  // Plugin 등록하여 사용
  //---------------------------------------
  /*
      // Plugin 설정 예 : player의 기능을 확장할때 사용
      // 따라서 player의 API와 같은 이름을 사용하면 오버라이딩 될 수 있음(주의)
  
      Plugin 등록 : Media.plugin('addPlayerEvent', addPlayerEvent);
      Plugin 호출 : player.addPlayerEvent();
  
      function addPlayerEvent(){
          // this == Media
          if(debugMedia()) console.log("#addPlayerEvent : ", this);
      }
      */
  static plugin(e, r) {
    ni.prototype[e] = r;
  }
  // 코드 진입 지점
  create(e, r, n, s, o) {
    return I() && console.log("Media 인스턴스 생성 : ", e, n, o), super.create(e, r, s, o), this.config = n, this.initializeConfig(), this;
  }
  // 미디어 기능 제거
  dispose() {
    this.stop(), this.src(null), this.src(""), this.clearConfig(), this.config = null, super.dispose();
  }
  //---------------------------------------
  // Video/Audio 준비 완료 (실행 준비가 됨)
  //---------------------------------------
  // player 데이터가 로드되어 재생 컨트롤이 가능할때
  onReady() {
    super.onReady(), this.autoplay() && this.play();
  }
  //////////////////////////////////////////////////////////
  // 이벤트 핸들러
  //////////////////////////////////////////////////////////
  // 미디어 데이터를 가져오다가 에러가 발생했을 때 발생
  onError(e) {
    super.onError(e), this.pause();
  }
  // 재생되었을 때, play() 함수가 리턴하고나서, autoplay로 인해 재생이 시작되었을 때 호출
  onPlay(e) {
    super.onPlay(e), this.get("src") || this.stop();
  }
  /*
  // 재생이 시작되었을 때 발생
  onPlaying(e) {
      super.onPlaying(e)
      // 화면 clear
  }
  */
  // seek 동작이 길게 유지되어서 브라우져에서 이벤트 발생이 될정도가 되었을 때 발생
  onSeeking(e) {
    I() && console.log("onSeeking : ", this.currentTime());
  }
  // seeking이 끝나면 발생
  onSeeked(e) {
    I() && console.log("onSeeked : ", this.currentTime());
  }
  // 현재 재생위치가 바뀌었을 때 발생
  /*
  onTimeupdate(e) {
      super.onTimeupdate(e);
      if (debugMedia()) {
          console.log('onTimeupdate : ', this.currentTime());
          var timeString = this.util.formatTime(this.currentTime(), this.duration());
          //var time = Media.parseTime(timeString);
          console.log('onTimeupdate : ', this.currentTime(), '(', timeString, ')');
      }
  }
  */
  // 미디어의 끝에 도달해서 재생이 멈추었을 때 발생
  onEnded(e) {
    super.onEnded(e), this.pause();
  }
  // duration 속성이 바뀌었을 때 발생
  onDurationchange(e) {
    I() && console.log("onDurationchange : ", this.duration());
  }
  // volume 속성이 변하거나 muted 속성이 변했을 때 발생
  onVolumechange(e) {
    I() && console.log("onVolumechange : ", this.volume(), this.muted());
  }
  //////////////////////////////////////////////////////////
  // HTML5 Media 속성
  //////////////////////////////////////////////////////////
  /*
      // Video와 Audio 태그 기본
      // http://unikys.tistory.com/278
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-video-element
  
      config = {
          src			: (URL) 미디어 소스의 URL
          height		: (숫자) 비디오의 높이 픽셀 값
          width		: (숫자) 비디오의 넓이 픽셀 값
          controls	: ("controls", "", - ) 미디어의 재생, 볼륨 등 제어기들을 표시
                        "controls"나 공백이나 태그 안에 값 없이 controls만 적어줘도 적용된다.
          muted		: ("muted", "", - ) 음소거
          poster		: (URL) 로드되지 않고 있을 때 처음에 표시될 이미지의 URL
          loop		: ("loop", "", - ) 반복 재생
          autoplay	: ("autoplay", "", - ) 자동 재생
  
          preload	: ("none", "metadta", "auto")
                  "none": 사용자가 미디어를 필요로하지 않을 것이라고 명시, 미리 다운로드 하지 않음
                  "metadata"	: 사용자가 미디어를 필요로 하지 않을 것이지만, 기본 정보(크기, 첫 프레임, 미디어 길이, 등)는 가져온다.
                  "auto"		: 사용자가 미디어를 필요로 하고 미리 다운로드를 한다. (기본값)
  
          mediagroup	: (문자열) 같은 아이디로 묶어준 비디오와 오디오 스트림들 끼리 동기화 시켜주는 그룹으로 취급한다.
          crossOrigin : ?
      };
      */
  // 사용자 설정값을 player에 적용
  initializeConfig() {
    I() && console.log("Media 설정");
    for (let e in this.config)
      this.set(e, this.config[e]);
  }
  clearConfig() {
    I() && console.log("Media 설정 리셋");
    for (let e in this.config)
      this.set(e, null);
  }
  //////////////////////////////////////////////////////////
  // Media 함수
  //////////////////////////////////////////////////////////
  /*
      load() 					: 로드를 시작한다.
      canPlayType(type) 		: 재생 가능한지 type 형식인지 여부
      play() 					: 미디어를 재생한다.
      stop()					:
      togglePlay()			:
      pause()					: 미디어를 일시 정지한다.
      isPaused				: 일시 정지 상태인지 여부
  
      dispose()				: 미디어 기능 모두 제거
      */
  get isPaused() {
    return this.player ? this.player.paused : !0;
  }
  load() {
    this.player && this.player.load();
  }
  canPlayType(e) {
    if (this.player)
      return this.player.canPlayType(e);
  }
  play() {
    this.player && this.isPaused && (() => {
      var r = this.player.play();
      r !== void 0 && r.then(() => {
        I() && console.log("# 미디어 재생");
      }).catch((n) => {
        console.warn("#108 issue 미디어 재생 중지됨 : ", n), O(this, Be, !0), setTimeout(() => {
          if (!E(this, Be) || !this.player.src) {
            this.emit("error", this);
            return;
          }
          console.warn("#108 issue 패치 (다시 재생)"), this.player.play().catch((s) => {
            console.warn("# (다시 재생) 에러", s);
          }), O(this, Be, !1);
        }, 100);
      });
    })();
  }
  stop() {
    this.player && (this.pause(), this.currentTime(0));
  }
  // value : 'stop', 'pause' or undefined (default)
  togglePlay(e) {
    this.player && (this.isPaused ? this.player.play() : (this.player.pause(), e === "stop" && this.currentTime(0)));
  }
  pause() {
    this.player && (this.isPaused || this.player.pause(), O(this, Be, !1));
  }
  /*
  player.ready(function(){
    if (this.tag && this.options_['autoplay'] && this.paused()) {
      delete this.tag['poster']; // Chrome Fix. Fixed in Chrome v16.
      this.play();
    }
  });
  */
  //////////////////////////////////////////////////////////
  // 기타 유틸 함수
  //////////////////////////////////////////////////////////
  // 남은 재생 시간
  get remainTime() {
    return Math.floor(this.duration()) - Math.floor(this.currentTime());
  }
  // seconds : currentTime, guide : duration
  // 123456 (number) --> 0:12 (string)
  formatTime(e, r) {
    return this.util.formatTime(e, r);
  }
  // 0:12 (string) --> 123456 (number)
  parseTime(e) {
    return this.util.parseTime(e);
  }
  getPercent(e) {
    const r = this.duration(), n = e === void 0 ? this.currentTime() : e;
    if (r === 0)
      return 0;
    let s = Math.round(n / r * 1e4) / 100;
    return s = Math.max(0, s), s = Math.min(s, 100), s;
  }
};
Be = new WeakMap();
let Hn = ni;
function vc(i) {
  return wc() ? !0 : (i.setAttribute("title", "HTML5 VIDEO가 지원되지 않습니다."), !1);
}
function wc() {
  let i;
  function t(e) {
    switch (i) {
      case "none":
        return !1;
      case "all":
        return !0;
      case "notOgg":
        return e !== "ogg";
      case "notMP4":
        return e !== "mp4";
      default:
        return !1;
    }
  }
  if (i !== void 0)
    return t(i);
  try {
    if (!!!document.createElement("video").canPlayType)
      return i = "none", t(i);
    const n = document.createElement("video"), s = n.canPlayType('video/ogg; codecs="theora, vorbis"');
    if (s)
      i = s === "probably" ? "all" : "notOgg";
    else {
      const o = n.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      o ? i = o === "probably" ? "all" : "notMP4" : i = "none";
    }
  } catch {
    i = "none";
  }
  return t(i);
}
class vn {
  constructor(t, e) {
    x(this, "media");
    x(this, "containerDOM");
    this.containerDOM = t, this.media = e;
  }
  // Override
  create() {
  }
}
const Pi = "video-controller-button", Tc = "video-controller-big-button", bc = "video-controller-playback";
var Bt;
class Ec extends vn {
  constructor() {
    super(...arguments);
    /////////////////////////////////////////
    // playback Menu 기능
    /////////////////////////////////////////
    x(this, "playbackDOM");
    P(this, Bt, void 0);
  }
  // media;
  // containerDOM;
  // Override
  create() {
    this.createButton(), this.createBigButton(), this.createPlaybackButton(), this.createTrackButton();
  }
  createButton() {
    const e = this.containerDOM.querySelectorAll(`[${Pi}]`);
    if (!(e != null && e.length))
      return;
    const r = ((n) => {
      const o = n.currentTarget.getAttribute("video-controller-button");
      if (o === "fullscreen")
        return this.media.toggleFullScreen(this.containerDOM);
      if (o === "play")
        return this.media.play();
      if (o === "pause")
        return this.media.pause();
      if (o === "stop")
        return this.media.stop();
      if (o === "mute")
        return this.media.muted(!this.media.muted());
      if (o === "playback")
        return this.playbackMenu();
      if (o === "track")
        return this.toggleTrack();
    }).bind(this);
    e.forEach((n) => {
      n.addEventListener("click", r);
    }), Qe(() => {
      e.forEach((n) => {
        n.removeEventListener("click", r);
      });
    });
  }
  // [video-controller-big-button]
  // 중앙의 큰 버튼: loading, play, pause
  // [video-container] 하위 Element에서 찾기
  createBigButton() {
    const e = this.containerDOM.querySelector(`[${Tc}]`);
    if (!e)
      return;
    const r = ((n) => {
      if (this.isWaiting)
        return;
      this.media.paused() ? this.media.play() : this.media.pause();
    }).bind(this);
    e.addEventListener("click", r), Qe(() => {
      e.removeEventListener("click", r);
    });
  }
  //---------------------------------------
  // 비디오 업데이트 이벤트
  //---------------------------------------
  update(e) {
    switch (e.type) {
      case "ratechange":
        this.onPplaybackChanged();
        break;
      case "addtrack":
      case "removetrack":
      case "trackChange":
        this.onTrackChanged();
        break;
    }
  }
  createPlaybackButton() {
    const e = this.containerDOM.querySelector(`[${bc}]`);
    if (!e)
      return;
    this.playbackDOM = e, this.onPplaybackChanged();
    const r = e.querySelectorAll("[popup-menu] [data-value]");
    if (!(r != null && r.length))
      return;
    const n = ((s) => {
      const a = s.currentTarget.dataset.value;
      this.media.playbackRate(a), this.playbackMenu();
    }).bind(this);
    r.forEach((s) => {
      s.addEventListener("click", n);
    }), Qe(() => {
      r.forEach((s) => {
        s.removeEventListener("click", n);
      }), E(this, Bt) && (document.removeEventListener("mousedown", E(this, Bt)), O(this, Bt, null));
    });
  }
  playbackMenu() {
    const e = this.playbackDOM.querySelector("[popup-menu]");
    if (!e)
      return;
    if (e.classList.toggle("open"), !e.classList.contains("open")) {
      document.removeEventListener("mousedown", E(this, Bt)), O(this, Bt, null);
      return;
    }
    O(this, Bt, ((s) => {
      Nt.isParent(s.target, this.playbackDOM) || this.playbackMenu();
    }).bind(this)), document.addEventListener("mousedown", E(this, Bt));
    const r = this.media.playbackRate();
    let n = e.querySelector("[selected]");
    n && n.removeAttribute("selected"), n = e.querySelector(`[data-value="${r}"]`), n.setAttribute("selected", "");
  }
  // 스타일링을 위해 attr에 값 기록해줌
  onPplaybackChanged() {
    const e = this.containerDOM.querySelector(`[${Pi}="playback"]`);
    if (!e)
      return;
    const r = this.media.playbackRate();
    e.setAttribute("data-value", r);
  }
  /////////////////////////////////////////
  // 자막 보이기 / 감추기
  /////////////////////////////////////////
  createTrackButton() {
    this.onTrackChanged();
  }
  toggleTrack() {
    this.media.toggleTrack(), this.onTrackChanged();
  }
  // track 보이기/감추기 상태 표시
  onTrackChanged() {
    const e = this.containerDOM.querySelector(`[${Pi}="track"]`);
    if (!e)
      return;
    const r = this.media.currentTrack(), n = r ? r.mode : "disabled";
    e.setAttribute("data-value", n);
  }
}
Bt = new WeakMap();
const $c = "video-controller-progress", Ac = "progress-bar", xc = "progress-bar-thumb";
class Sc extends vn {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    x(this, "progressDOM");
  }
  //---------------------------------------
  // ProgressBar 드래그 기능 : ProgressBar 앵커 대신 트랙 드래그 기능임
  //---------------------------------------
  // Override
  create() {
    const e = this.containerDOM.querySelector(`[${$c}="time"]`);
    if (!e)
      return;
    this.progressDOM = e;
    const r = this.timeUpdateByMouse.bind(this), n = (a) => {
      const u = e.getBoundingClientRect(), l = a.clientX - u.left;
      r(l, u.width);
    }, s = (a) => {
      document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s);
    }, o = (a) => {
      n(a), document.addEventListener("mousemove", n), document.addEventListener("mouseup", s);
    };
    e.addEventListener("mousedown", o), Qe(() => {
      e.removeEventListener("mousedown", o);
    });
  }
  timeUpdateByMouse(e, r) {
    let n = e / parseFloat(r);
    n = Math.max(0, n), n = Math.min(n, 1);
    const o = this.media.duration() * n;
    this.media.currentTime(o);
  }
  //---------------------------------------
  // 비디오 업데이트 이벤트
  //---------------------------------------
  update(e) {
    switch (e.type) {
      case "durationchange":
      case "timeupdate":
      case "seeking":
      case "seeked":
        this.onUpdateProgressBar();
        break;
    }
  }
  onUpdateProgressBar() {
    var s, o;
    const e = this.media.getPercent(), r = (s = this.progressDOM) == null ? void 0 : s.querySelector(`[${Ac}]`);
    r && (r.setAttribute("data-value", e), r.style.width = e + "%");
    const n = (o = this.progressDOM) == null ? void 0 : o.querySelector(`[${xc}]`);
    n && (n.setAttribute("data-value", e), n.style.left = e + "%");
  }
}
const vo = "video-controller-volume", Oc = "video-controller-progress", kc = "progress-bar", Pc = "progress-bar-thumb";
class Cc extends vn {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    x(this, "volumeDOM");
  }
  //---------------------------------------
  // volume 드래그 기능 : volume 앵커 대신 트랙 드래그 기능임
  //---------------------------------------
  // Override
  create() {
    const e = this.containerDOM.querySelector(`[${vo}]`);
    if (!e)
      return;
    this.volumeDOM = e, this.onUpdateVolumeBar();
    const r = e.querySelector(`[${Oc}]`);
    if (!r)
      return;
    const n = this.volumeUpdateByMouse.bind(this), o = e.getAttribute(vo) === "vertical", a = (c) => {
      const f = r.getBoundingClientRect();
      let h, p;
      o ? (p = f.height - (c.clientY - f.top), h = f.height) : (p = c.clientX - f.left, h = f.width), n(p, h);
    }, u = (c) => {
      e.classList.remove("open"), document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", u);
    }, l = (c) => {
      e.classList.add("open"), a(c), document.addEventListener("mousemove", a), document.addEventListener("mouseup", u);
    };
    r.addEventListener("mousedown", l), Qe(() => {
      r.removeEventListener("mousedown", l);
    });
  }
  volumeUpdateByMouse(e, r) {
    const n = e / parseFloat(r);
    let s = Math.round(n * 100) / 100;
    s = Math.max(0, s), s = Math.min(s, 1), this.media.volume(s);
  }
  //---------------------------------------
  // 비디오 업데이트 이벤트
  //---------------------------------------
  update(e) {
    switch (e.type) {
      case "volumechange":
        this.onUpdateVolumeBar();
        break;
    }
  }
  // volume: 0 ~ 1
  onUpdateVolumeBar() {
    const e = this.media.volume();
    this.media.muted() || e === 0 ? this.containerDOM.classList.add("muted") : this.containerDOM.classList.remove("muted");
    const n = (e * 100).toString(), s = this.volumeDOM.querySelector(`[${kc}]`);
    s && (s.setAttribute("data-value", n), s.style.width = n + "%");
    const o = this.volumeDOM.querySelector(`[${Pc}]`);
    o && (o.setAttribute("data-value", n), o.style.left = n + "%");
  }
}
const wo = "video-controller-time";
class Dc extends vn {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    x(this, "timeDOM");
  }
  create() {
    const e = this.containerDOM.querySelectorAll(`[${wo}]`);
    e != null && e.length && (this.timeDOM = e, this.onTimeChanged());
  }
  //---------------------------------------
  // 비디오 업데이트 이벤트
  //---------------------------------------
  update(e) {
    switch (e.type) {
      case "durationchange":
      case "timeupdate":
      case "seeking":
      case "seeked":
        this.onTimeChanged();
        break;
    }
  }
  onTimeChanged() {
    var s;
    if (!((s = this.timeDOM) != null && s.length))
      return;
    const e = this.media.duration(), r = this.media.currentTime(), n = this.media.remainTime;
    this.timeDOM.forEach((o) => {
      const a = o.getAttribute(wo);
      if (a === "currentTime")
        return o.innerText = this.media.formatTime(r, e);
      if (a === "duration")
        return o.innerText = this.media.formatTime(e);
      if (a === "remainTime")
        return o.innerText = this.media.formatTime(n, e);
    });
  }
}
class Mc {
  constructor() {
    x(this, "_context", {});
  }
  get context() {
    return this._context;
  }
  //----------------------------------
  // js task 아이템 this context
  //----------------------------------
  newContext() {
    for (let t in this._context)
      delete this._context[t];
  }
  getContext() {
    return this.context || this.newContext(), this.context;
  }
}
class Rr {
  constructor({ id: t, attrs: e, list: r, parseOption: n }) {
    x(this, "id");
    x(this, "attrs");
    x(this, "list");
    x(this, "parseOption");
    this.id = t, this.attrs = e, this.list = r, this.parseOption = n;
  }
  // DeepCopy
  copy() {
    let t = {
      id: this.id,
      attrs: this.attrs
      // list: this.list,
      // parseOption: this.parseOption
    };
    return structuredClone ? t = structuredClone(t) : t = JSON.parse(JSON.stringify(t)), t.parseOption = this.parseOption, t.list = this.list.map((e) => e.copy()), new Rr(t);
  }
}
class Zr {
  constructor({ nodeName: t, attrs: e, parseOption: r }) {
    x(this, "nodeName");
    x(this, "attrs");
    x(this, "_args");
    x(this, "parseOption");
    // (디버깅용) 실행 노드의 depth
    x(this, "_depth", 0);
    this.nodeName = t, this.attrs = e, this.parseOption = r;
  }
  copy() {
    let t = {
      nodeName: this.nodeName,
      attrs: this.attrs
      // _args: this._args,
      // parseOption: this.parseOption
    };
    return structuredClone ? t = structuredClone(t) : t = JSON.parse(JSON.stringify(t)), t._args = this._args, t.parseOption = this.parseOption, new Zr(t);
  }
}
function Lc(i, ...t) {
  return (...e) => i(...t, ...e);
}
function wn(i) {
  return function(...t) {
    var e = t.pop();
    return i.call(this, t, e);
  };
}
var Rc = typeof queueMicrotask == "function" && queueMicrotask, Ra = typeof setImmediate == "function" && setImmediate, Na = typeof process == "object" && typeof process.nextTick == "function";
function Ia(i) {
  setTimeout(i, 0);
}
function Fa(i) {
  return (t, ...e) => i(() => t(...e));
}
var qr;
Rc ? qr = queueMicrotask : Ra ? qr = setImmediate : Na ? qr = process.nextTick : qr = Ia;
const Je = Fa(qr);
function Ji(i) {
  return Tn(i) ? function(...t) {
    const e = t.pop(), r = i.apply(this, t);
    return To(r, e);
  } : wn(function(t, e) {
    var r;
    try {
      r = i.apply(this, t);
    } catch (n) {
      return e(n);
    }
    if (r && typeof r.then == "function")
      return To(r, e);
    e(null, r);
  });
}
function To(i, t) {
  return i.then((e) => {
    bo(t, null, e);
  }, (e) => {
    bo(t, e && (e instanceof Error || e.message) ? e : new Error(e));
  });
}
function bo(i, t, e) {
  try {
    i(t, e);
  } catch (r) {
    Je((n) => {
      throw n;
    }, r);
  }
}
function Tn(i) {
  return i[Symbol.toStringTag] === "AsyncFunction";
}
function Nc(i) {
  return i[Symbol.toStringTag] === "AsyncGenerator";
}
function Ic(i) {
  return typeof i[Symbol.asyncIterator] == "function";
}
function R(i) {
  if (typeof i != "function")
    throw new Error("expected a function");
  return Tn(i) ? Ji(i) : i;
}
function L(i, t) {
  if (t || (t = i.length), !t)
    throw new Error("arity is undefined");
  function e(...r) {
    return typeof r[t - 1] == "function" ? i.apply(this, r) : new Promise((n, s) => {
      r[t - 1] = (o, ...a) => {
        if (o)
          return s(o);
        n(a.length > 1 ? a : a[0]);
      }, i.apply(this, r);
    });
  }
  return e;
}
function ja(i) {
  return function(e, ...r) {
    return L(function(s) {
      var o = this;
      return i(e, (a, u) => {
        R(a).apply(o, r.concat(u));
      }, s);
    });
  };
}
function xs(i, t, e, r) {
  t = t || [];
  var n = [], s = 0, o = R(e);
  return i(t, (a, u, l) => {
    var c = s++;
    o(a, (f, h) => {
      n[c] = h, l(f);
    });
  }, (a) => {
    r(a, n);
  });
}
function pi(i) {
  return i && typeof i.length == "number" && i.length >= 0 && i.length % 1 === 0;
}
const Fc = {}, mi = Fc;
function $e(i) {
  function t(...e) {
    if (i !== null) {
      var r = i;
      i = null, r.apply(this, e);
    }
  }
  return Object.assign(t, i), t;
}
function jc(i) {
  return i[Symbol.iterator] && i[Symbol.iterator]();
}
function Bc(i) {
  var t = -1, e = i.length;
  return function() {
    return ++t < e ? { value: i[t], key: t } : null;
  };
}
function Vc(i) {
  var t = -1;
  return function() {
    var r = i.next();
    return r.done ? null : (t++, { value: r.value, key: t });
  };
}
function zc(i) {
  var t = i ? Object.keys(i) : [], e = -1, r = t.length;
  return function n() {
    var s = t[++e];
    return s === "__proto__" ? n() : e < r ? { value: i[s], key: s } : null;
  };
}
function qc(i) {
  if (pi(i))
    return Bc(i);
  var t = jc(i);
  return t ? Vc(t) : zc(i);
}
function Ae(i) {
  return function(...t) {
    if (i === null)
      throw new Error("Callback was already called.");
    var e = i;
    i = null, e.apply(this, t);
  };
}
function Eo(i, t, e, r) {
  let n = !1, s = !1, o = !1, a = 0, u = 0;
  function l() {
    a >= t || o || n || (o = !0, i.next().then(({ value: h, done: p }) => {
      if (!(s || n)) {
        if (o = !1, p) {
          n = !0, a <= 0 && r(null);
          return;
        }
        a++, e(h, u, c), u++, l();
      }
    }).catch(f));
  }
  function c(h, p) {
    if (a -= 1, !s) {
      if (h)
        return f(h);
      if (h === !1) {
        n = !0, s = !0;
        return;
      }
      if (p === mi || n && a <= 0)
        return n = !0, r(null);
      l();
    }
  }
  function f(h) {
    s || (o = !1, n = !0, r(h));
  }
  l();
}
const Ft = (i) => (t, e, r) => {
  if (r = $e(r), i <= 0)
    throw new RangeError("concurrency limit cannot be less than 1");
  if (!t)
    return r(null);
  if (Nc(t))
    return Eo(t, i, e, r);
  if (Ic(t))
    return Eo(t[Symbol.asyncIterator](), i, e, r);
  var n = qc(t), s = !1, o = !1, a = 0, u = !1;
  function l(f, h) {
    if (!o)
      if (a -= 1, f)
        s = !0, r(f);
      else if (f === !1)
        s = !0, o = !0;
      else {
        if (h === mi || s && a <= 0)
          return s = !0, r(null);
        u || c();
      }
  }
  function c() {
    for (u = !0; a < i && !s; ) {
      var f = n();
      if (f === null) {
        s = !0, a <= 0 && r(null);
        return;
      }
      a += 1, e(f.value, f.key, Ae(l));
    }
    u = !1;
  }
  c();
};
function Uc(i, t, e, r) {
  return Ft(t)(i, R(e), r);
}
const Wn = L(Uc, 4);
function Hc(i, t, e) {
  e = $e(e);
  var r = 0, n = 0, { length: s } = i, o = !1;
  s === 0 && e(null);
  function a(u, l) {
    u === !1 && (o = !0), o !== !0 && (u ? e(u) : (++n === s || l === mi) && e(null));
  }
  for (; r < s; r++)
    t(i[r], r, Ae(a));
}
function Wc(i, t, e) {
  return Wn(i, 1 / 0, t, e);
}
function Gc(i, t, e) {
  var r = pi(i) ? Hc : Wc;
  return r(i, R(t), e);
}
const It = L(Gc, 3);
function Yc(i, t, e) {
  return xs(It, i, t, e);
}
const Ss = L(Yc, 3), Xc = ja(Ss);
function Kc(i, t, e) {
  return Wn(i, 1, t, e);
}
const ne = L(Kc, 3);
function Qc(i, t, e) {
  return xs(ne, i, t, e);
}
const Ba = L(Qc, 3), Jc = ja(Ba), Nr = Symbol("promiseCallback");
function kr() {
  let i, t;
  function e(r, ...n) {
    if (r)
      return t(r);
    i(n.length > 1 ? n : n[0]);
  }
  return e[Nr] = new Promise((r, n) => {
    i = r, t = n;
  }), e;
}
function Va(i, t, e) {
  typeof t != "number" && (e = t, t = null), e = $e(e || kr());
  var r = Object.keys(i).length;
  if (!r)
    return e(null);
  t || (t = r);
  var n = {}, s = 0, o = !1, a = !1, u = /* @__PURE__ */ Object.create(null), l = [], c = [], f = {};
  Object.keys(i).forEach((g) => {
    var v = i[g];
    if (!Array.isArray(v)) {
      h(g, [v]), c.push(g);
      return;
    }
    var T = v.slice(0, v.length - 1), b = T.length;
    if (b === 0) {
      h(g, v), c.push(g);
      return;
    }
    f[g] = b, T.forEach(($) => {
      if (!i[$])
        throw new Error("async.auto task `" + g + "` has a non-existent dependency `" + $ + "` in " + T.join(", "));
      _($, () => {
        b--, b === 0 && h(g, v);
      });
    });
  }), w(), p();
  function h(g, v) {
    l.push(() => y(g, v));
  }
  function p() {
    if (!o) {
      if (l.length === 0 && s === 0)
        return e(null, n);
      for (; l.length && s < t; ) {
        var g = l.shift();
        g();
      }
    }
  }
  function _(g, v) {
    var T = u[g];
    T || (T = u[g] = []), T.push(v);
  }
  function d(g) {
    var v = u[g] || [];
    v.forEach((T) => T()), p();
  }
  function y(g, v) {
    if (!a) {
      var T = Ae(($, ...S) => {
        if (s--, $ === !1) {
          o = !0;
          return;
        }
        if (S.length < 2 && ([S] = S), $) {
          var A = {};
          if (Object.keys(n).forEach((M) => {
            A[M] = n[M];
          }), A[g] = S, a = !0, u = /* @__PURE__ */ Object.create(null), o)
            return;
          e($, A);
        } else
          n[g] = S, d(g);
      });
      s++;
      var b = R(v[v.length - 1]);
      v.length > 1 ? b(n, T) : b(T);
    }
  }
  function w() {
    for (var g, v = 0; c.length; )
      g = c.pop(), v++, m(g).forEach((T) => {
        --f[T] === 0 && c.push(T);
      });
    if (v !== r)
      throw new Error(
        "async.auto cannot execute tasks due to a recursive dependency"
      );
  }
  function m(g) {
    var v = [];
    return Object.keys(i).forEach((T) => {
      const b = i[T];
      Array.isArray(b) && b.indexOf(g) >= 0 && v.push(T);
    }), v;
  }
  return e[Nr];
}
var Zc = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/, tf = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/, ef = /,/, rf = /(=.+)?(\s*)$/;
function nf(i) {
  let t = "", e = 0, r = i.indexOf("*/");
  for (; e < i.length; )
    if (i[e] === "/" && i[e + 1] === "/") {
      let n = i.indexOf(`
`, e);
      e = n === -1 ? i.length : n;
    } else if (r !== -1 && i[e] === "/" && i[e + 1] === "*") {
      let n = i.indexOf("*/", e);
      n !== -1 ? (e = n + 2, r = i.indexOf("*/", e)) : (t += i[e], e++);
    } else
      t += i[e], e++;
  return t;
}
function sf(i) {
  const t = nf(i.toString());
  let e = t.match(Zc);
  if (e || (e = t.match(tf)), !e)
    throw new Error(`could not parse args in autoInject
Source:
` + t);
  let [, r] = e;
  return r.replace(/\s/g, "").split(ef).map((n) => n.replace(rf, "").trim());
}
function of(i, t) {
  var e = {};
  return Object.keys(i).forEach((r) => {
    var n = i[r], s, o = Tn(n), a = !o && n.length === 1 || o && n.length === 0;
    if (Array.isArray(n))
      s = [...n], n = s.pop(), e[r] = s.concat(s.length > 0 ? u : n);
    else if (a)
      e[r] = n;
    else {
      if (s = sf(n), n.length === 0 && !o && s.length === 0)
        throw new Error("autoInject task functions require explicit parameters.");
      o || s.pop(), e[r] = s.concat(u);
    }
    function u(l, c) {
      var f = s.map((h) => l[h]);
      f.push(c), R(n)(...f);
    }
  }), Va(e, t);
}
class af {
  constructor() {
    this.head = this.tail = null, this.length = 0;
  }
  removeLink(t) {
    return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, t.prev = t.next = null, this.length -= 1, t;
  }
  empty() {
    for (; this.head; )
      this.shift();
    return this;
  }
  insertAfter(t, e) {
    e.prev = t, e.next = t.next, t.next ? t.next.prev = e : this.tail = e, t.next = e, this.length += 1;
  }
  insertBefore(t, e) {
    e.prev = t.prev, e.next = t, t.prev ? t.prev.next = e : this.head = e, t.prev = e, this.length += 1;
  }
  unshift(t) {
    this.head ? this.insertBefore(this.head, t) : $o(this, t);
  }
  push(t) {
    this.tail ? this.insertAfter(this.tail, t) : $o(this, t);
  }
  shift() {
    return this.head && this.removeLink(this.head);
  }
  pop() {
    return this.tail && this.removeLink(this.tail);
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    for (var t = this.head; t; )
      yield t.data, t = t.next;
  }
  remove(t) {
    for (var e = this.head; e; ) {
      var { next: r } = e;
      t(e) && this.removeLink(e), e = r;
    }
    return this;
  }
}
function $o(i, t) {
  i.length = 1, i.head = i.tail = t;
}
function Os(i, t, e) {
  if (t == null)
    t = 1;
  else if (t === 0)
    throw new RangeError("Concurrency must not be zero");
  var r = R(i), n = 0, s = [];
  const o = {
    error: [],
    drain: [],
    saturated: [],
    unsaturated: [],
    empty: []
  };
  function a(m, g) {
    o[m].push(g);
  }
  function u(m, g) {
    const v = (...T) => {
      l(m, v), g(...T);
    };
    o[m].push(v);
  }
  function l(m, g) {
    if (!m)
      return Object.keys(o).forEach((v) => o[v] = []);
    if (!g)
      return o[m] = [];
    o[m] = o[m].filter((v) => v !== g);
  }
  function c(m, ...g) {
    o[m].forEach((v) => v(...g));
  }
  var f = !1;
  function h(m, g, v, T) {
    if (T != null && typeof T != "function")
      throw new Error("task callback must be a function");
    w.started = !0;
    var b, $;
    function S(M, ...F) {
      if (M)
        return v ? $(M) : b();
      if (F.length <= 1)
        return b(F[0]);
      b(F);
    }
    var A = w._createTaskItem(
      m,
      v ? S : T || S
    );
    if (g ? w._tasks.unshift(A) : w._tasks.push(A), f || (f = !0, Je(() => {
      f = !1, w.process();
    })), v || !T)
      return new Promise((M, F) => {
        b = M, $ = F;
      });
  }
  function p(m) {
    return function(g, ...v) {
      n -= 1;
      for (var T = 0, b = m.length; T < b; T++) {
        var $ = m[T], S = s.indexOf($);
        S === 0 ? s.shift() : S > 0 && s.splice(S, 1), $.callback(g, ...v), g != null && c("error", g, $.data);
      }
      n <= w.concurrency - w.buffer && c("unsaturated"), w.idle() && c("drain"), w.process();
    };
  }
  function _(m) {
    return m.length === 0 && w.idle() ? (Je(() => c("drain")), !0) : !1;
  }
  const d = (m) => (g) => {
    if (!g)
      return new Promise((v, T) => {
        u(m, (b, $) => {
          if (b)
            return T(b);
          v($);
        });
      });
    l(m), a(m, g);
  };
  var y = !1, w = {
    _tasks: new af(),
    _createTaskItem(m, g) {
      return {
        data: m,
        callback: g
      };
    },
    *[Symbol.iterator]() {
      yield* w._tasks[Symbol.iterator]();
    },
    concurrency: t,
    payload: e,
    buffer: t / 4,
    started: !1,
    paused: !1,
    push(m, g) {
      return Array.isArray(m) ? _(m) ? void 0 : m.map((v) => h(v, !1, !1, g)) : h(m, !1, !1, g);
    },
    pushAsync(m, g) {
      return Array.isArray(m) ? _(m) ? void 0 : m.map((v) => h(v, !1, !0, g)) : h(m, !1, !0, g);
    },
    kill() {
      l(), w._tasks.empty();
    },
    unshift(m, g) {
      return Array.isArray(m) ? _(m) ? void 0 : m.map((v) => h(v, !0, !1, g)) : h(m, !0, !1, g);
    },
    unshiftAsync(m, g) {
      return Array.isArray(m) ? _(m) ? void 0 : m.map((v) => h(v, !0, !0, g)) : h(m, !0, !0, g);
    },
    remove(m) {
      w._tasks.remove(m);
    },
    process() {
      if (!y) {
        for (y = !0; !w.paused && n < w.concurrency && w._tasks.length; ) {
          var m = [], g = [], v = w._tasks.length;
          w.payload && (v = Math.min(v, w.payload));
          for (var T = 0; T < v; T++) {
            var b = w._tasks.shift();
            m.push(b), s.push(b), g.push(b.data);
          }
          n += 1, w._tasks.length === 0 && c("empty"), n === w.concurrency && c("saturated");
          var $ = Ae(p(m));
          r(g, $);
        }
        y = !1;
      }
    },
    length() {
      return w._tasks.length;
    },
    running() {
      return n;
    },
    workersList() {
      return s;
    },
    idle() {
      return w._tasks.length + n === 0;
    },
    pause() {
      w.paused = !0;
    },
    resume() {
      w.paused !== !1 && (w.paused = !1, Je(w.process));
    }
  };
  return Object.defineProperties(w, {
    saturated: {
      writable: !1,
      value: d("saturated")
    },
    unsaturated: {
      writable: !1,
      value: d("unsaturated")
    },
    empty: {
      writable: !1,
      value: d("empty")
    },
    drain: {
      writable: !1,
      value: d("drain")
    },
    error: {
      writable: !1,
      value: d("error")
    }
  }), w;
}
function uf(i, t) {
  return Os(i, 1, t);
}
function lf(i, t, e) {
  return Os(i, t, e);
}
function cf(i, t, e, r) {
  r = $e(r);
  var n = R(e);
  return ne(i, (s, o, a) => {
    n(t, s, (u, l) => {
      t = l, a(u);
    });
  }, (s) => r(s, t));
}
const Gr = L(cf, 4);
function za(...i) {
  var t = i.map(R);
  return function(...e) {
    var r = this, n = e[e.length - 1];
    return typeof n == "function" ? e.pop() : n = kr(), Gr(
      t,
      e,
      (s, o, a) => {
        o.apply(r, s.concat((u, ...l) => {
          a(u, l);
        }));
      },
      (s, o) => n(s, ...o)
    ), n[Nr];
  };
}
function ff(...i) {
  return za(...i.reverse());
}
function hf(i, t, e, r) {
  return xs(Ft(t), i, e, r);
}
const gi = L(hf, 4);
function df(i, t, e, r) {
  var n = R(e);
  return gi(i, t, (s, o) => {
    n(s, (a, ...u) => a ? o(a) : o(a, u));
  }, (s, o) => {
    for (var a = [], u = 0; u < o.length; u++)
      o[u] && (a = a.concat(...o[u]));
    return r(s, a);
  });
}
const Gn = L(df, 4);
function pf(i, t, e) {
  return Gn(i, 1 / 0, t, e);
}
const Ao = L(pf, 3);
function mf(i, t, e) {
  return Gn(i, 1, t, e);
}
const xo = L(mf, 3);
function gf(...i) {
  return function(...t) {
    var e = t.pop();
    return e(null, ...i);
  };
}
function oe(i, t) {
  return (e, r, n, s) => {
    var o = !1, a;
    const u = R(n);
    e(r, (l, c, f) => {
      u(l, (h, p) => {
        if (h || h === !1)
          return f(h);
        if (i(p) && !a)
          return o = !0, a = t(!0, l), f(null, mi);
        f();
      });
    }, (l) => {
      if (l)
        return s(l);
      s(null, o ? a : t(!1));
    });
  };
}
function _f(i, t, e) {
  return oe((r) => r, (r, n) => n)(It, i, t, e);
}
const So = L(_f, 3);
function yf(i, t, e, r) {
  return oe((n) => n, (n, s) => s)(Ft(t), i, e, r);
}
const Oo = L(yf, 4);
function vf(i, t, e) {
  return oe((r) => r, (r, n) => n)(Ft(1), i, t, e);
}
const ko = L(vf, 3);
function qa(i) {
  return (t, ...e) => R(t)(...e, (r, ...n) => {
    typeof console == "object" && (r ? console.error && console.error(r) : console[i] && n.forEach((s) => console[i](s)));
  });
}
const wf = qa("dir");
function Tf(i, t, e) {
  e = Ae(e);
  var r = R(i), n = R(t), s;
  function o(u, ...l) {
    if (u)
      return e(u);
    u !== !1 && (s = l, n(...l, a));
  }
  function a(u, l) {
    if (u)
      return e(u);
    if (u !== !1) {
      if (!l)
        return e(null, ...s);
      r(o);
    }
  }
  return a(null, !0);
}
const Zi = L(Tf, 3);
function bf(i, t, e) {
  const r = R(t);
  return Zi(i, (...n) => {
    const s = n.pop();
    r(...n, (o, a) => s(o, !a));
  }, e);
}
function Ua(i) {
  return (t, e, r) => i(t, r);
}
function Ef(i, t, e) {
  return It(i, Ua(R(t)), e);
}
const Po = L(Ef, 3);
function $f(i, t, e, r) {
  return Ft(t)(i, Ua(R(e)), r);
}
const ts = L($f, 4);
function Af(i, t, e) {
  return ts(i, 1, t, e);
}
const es = L(Af, 3);
function Ha(i) {
  return Tn(i) ? i : function(...t) {
    var e = t.pop(), r = !0;
    t.push((...n) => {
      r ? Je(() => e(...n)) : e(...n);
    }), i.apply(this, t), r = !1;
  };
}
function xf(i, t, e) {
  return oe((r) => !r, (r) => !r)(It, i, t, e);
}
const Co = L(xf, 3);
function Sf(i, t, e, r) {
  return oe((n) => !n, (n) => !n)(Ft(t), i, e, r);
}
const Do = L(Sf, 4);
function Of(i, t, e) {
  return oe((r) => !r, (r) => !r)(ne, i, t, e);
}
const Mo = L(Of, 3);
function kf(i, t, e, r) {
  var n = new Array(t.length);
  i(t, (s, o, a) => {
    e(s, (u, l) => {
      n[o] = !!l, a(u);
    });
  }, (s) => {
    if (s)
      return r(s);
    for (var o = [], a = 0; a < t.length; a++)
      n[a] && o.push(t[a]);
    r(null, o);
  });
}
function Pf(i, t, e, r) {
  var n = [];
  i(t, (s, o, a) => {
    e(s, (u, l) => {
      if (u)
        return a(u);
      l && n.push({ index: o, value: s }), a(u);
    });
  }, (s) => {
    if (s)
      return r(s);
    r(null, n.sort((o, a) => o.index - a.index).map((o) => o.value));
  });
}
function _i(i, t, e, r) {
  var n = pi(t) ? kf : Pf;
  return n(i, t, R(e), r);
}
function Cf(i, t, e) {
  return _i(It, i, t, e);
}
const Lo = L(Cf, 3);
function Df(i, t, e, r) {
  return _i(Ft(t), i, e, r);
}
const Ro = L(Df, 4);
function Mf(i, t, e) {
  return _i(ne, i, t, e);
}
const No = L(Mf, 3);
function Lf(i, t) {
  var e = Ae(t), r = R(Ha(i));
  function n(s) {
    if (s)
      return e(s);
    s !== !1 && r(n);
  }
  return n();
}
const Rf = L(Lf, 2);
function Nf(i, t, e, r) {
  var n = R(e);
  return gi(i, t, (s, o) => {
    n(s, (a, u) => a ? o(a) : o(a, { key: u, val: s }));
  }, (s, o) => {
    for (var a = {}, { hasOwnProperty: u } = Object.prototype, l = 0; l < o.length; l++)
      if (o[l]) {
        var { key: c } = o[l], { val: f } = o[l];
        u.call(a, c) ? a[c].push(f) : a[c] = [f];
      }
    return r(s, a);
  });
}
const ks = L(Nf, 4);
function If(i, t, e) {
  return ks(i, 1 / 0, t, e);
}
function Ff(i, t, e) {
  return ks(i, 1, t, e);
}
const jf = qa("log");
function Bf(i, t, e, r) {
  r = $e(r);
  var n = {}, s = R(e);
  return Ft(t)(i, (o, a, u) => {
    s(o, a, (l, c) => {
      if (l)
        return u(l);
      n[a] = c, u(l);
    });
  }, (o) => r(o, n));
}
const Ps = L(Bf, 4);
function Vf(i, t, e) {
  return Ps(i, 1 / 0, t, e);
}
function zf(i, t, e) {
  return Ps(i, 1, t, e);
}
function qf(i, t = (e) => e) {
  var e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null), n = R(i), s = wn((o, a) => {
    var u = t(...o);
    u in e ? Je(() => a(null, ...e[u])) : u in r ? r[u].push(a) : (r[u] = [a], n(...o, (l, ...c) => {
      l || (e[u] = c);
      var f = r[u];
      delete r[u];
      for (var h = 0, p = f.length; h < p; h++)
        f[h](l, ...c);
    }));
  });
  return s.memo = e, s.unmemoized = i, s;
}
var kn;
Na ? kn = process.nextTick : Ra ? kn = setImmediate : kn = Ia;
const Uf = Fa(kn), Cs = L((i, t, e) => {
  var r = pi(t) ? [] : {};
  i(t, (n, s, o) => {
    R(n)((a, ...u) => {
      u.length < 2 && ([u] = u), r[s] = u, o(a);
    });
  }, (n) => e(n, r));
}, 3);
function Hf(i, t) {
  return Cs(It, i, t);
}
function Wf(i, t, e) {
  return Cs(Ft(t), i, e);
}
function Wa(i, t) {
  var e = R(i);
  return Os((r, n) => {
    e(r[0], n);
  }, t, 1);
}
class Gf {
  constructor() {
    this.heap = [], this.pushCount = Number.MIN_SAFE_INTEGER;
  }
  get length() {
    return this.heap.length;
  }
  empty() {
    return this.heap = [], this;
  }
  percUp(t) {
    let e;
    for (; t > 0 && Ci(this.heap[t], this.heap[e = Io(t)]); ) {
      let r = this.heap[t];
      this.heap[t] = this.heap[e], this.heap[e] = r, t = e;
    }
  }
  percDown(t) {
    let e;
    for (; (e = Yf(t)) < this.heap.length && (e + 1 < this.heap.length && Ci(this.heap[e + 1], this.heap[e]) && (e = e + 1), !Ci(this.heap[t], this.heap[e])); ) {
      let r = this.heap[t];
      this.heap[t] = this.heap[e], this.heap[e] = r, t = e;
    }
  }
  push(t) {
    t.pushCount = ++this.pushCount, this.heap.push(t), this.percUp(this.heap.length - 1);
  }
  unshift(t) {
    return this.heap.push(t);
  }
  shift() {
    let [t] = this.heap;
    return this.heap[0] = this.heap[this.heap.length - 1], this.heap.pop(), this.percDown(0), t;
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    for (let t = 0; t < this.heap.length; t++)
      yield this.heap[t].data;
  }
  remove(t) {
    let e = 0;
    for (let r = 0; r < this.heap.length; r++)
      t(this.heap[r]) || (this.heap[e] = this.heap[r], e++);
    this.heap.splice(e);
    for (let r = Io(this.heap.length - 1); r >= 0; r--)
      this.percDown(r);
    return this;
  }
}
function Yf(i) {
  return (i << 1) + 1;
}
function Io(i) {
  return (i + 1 >> 1) - 1;
}
function Ci(i, t) {
  return i.priority !== t.priority ? i.priority < t.priority : i.pushCount < t.pushCount;
}
function Xf(i, t) {
  var e = Wa(i, t), {
    push: r,
    pushAsync: n
  } = e;
  e._tasks = new Gf(), e._createTaskItem = ({ data: o, priority: a }, u) => ({
    data: o,
    priority: a,
    callback: u
  });
  function s(o, a) {
    return Array.isArray(o) ? o.map((u) => ({ data: u, priority: a })) : { data: o, priority: a };
  }
  return e.push = function(o, a = 0, u) {
    return r(s(o, a), u);
  }, e.pushAsync = function(o, a = 0, u) {
    return n(s(o, a), u);
  }, delete e.unshift, delete e.unshiftAsync, e;
}
function Kf(i, t) {
  if (t = $e(t), !Array.isArray(i))
    return t(new TypeError("First argument to race must be an array of functions"));
  if (!i.length)
    return t();
  for (var e = 0, r = i.length; e < r; e++)
    R(i[e])(t);
}
const Qf = L(Kf, 2);
function Fo(i, t, e, r) {
  var n = [...i].reverse();
  return Gr(n, t, e, r);
}
function rs(i) {
  var t = R(i);
  return wn(function(r, n) {
    return r.push((s, ...o) => {
      let a = {};
      if (s && (a.error = s), o.length > 0) {
        var u = o;
        o.length <= 1 && ([u] = o), a.value = u;
      }
      n(null, a);
    }), t.apply(this, r);
  });
}
function Jf(i) {
  var t;
  return Array.isArray(i) ? t = i.map(rs) : (t = {}, Object.keys(i).forEach((e) => {
    t[e] = rs.call(this, i[e]);
  })), t;
}
function Ds(i, t, e, r) {
  const n = R(e);
  return _i(i, t, (s, o) => {
    n(s, (a, u) => {
      o(a, !u);
    });
  }, r);
}
function Zf(i, t, e) {
  return Ds(It, i, t, e);
}
const th = L(Zf, 3);
function eh(i, t, e, r) {
  return Ds(Ft(t), i, e, r);
}
const rh = L(eh, 4);
function nh(i, t, e) {
  return Ds(ne, i, t, e);
}
const ih = L(nh, 3);
function Ga(i) {
  return function() {
    return i;
  };
}
const ns = 5, Ya = 0;
function is(i, t, e) {
  var r = {
    times: ns,
    intervalFunc: Ga(Ya)
  };
  if (arguments.length < 3 && typeof i == "function" ? (e = t || kr(), t = i) : (sh(r, i), e = e || kr()), typeof t != "function")
    throw new Error("Invalid arguments for async.retry");
  var n = R(t), s = 1;
  function o() {
    n((a, ...u) => {
      a !== !1 && (a && s++ < r.times && (typeof r.errorFilter != "function" || r.errorFilter(a)) ? setTimeout(o, r.intervalFunc(s - 1)) : e(a, ...u));
    });
  }
  return o(), e[Nr];
}
function sh(i, t) {
  if (typeof t == "object")
    i.times = +t.times || ns, i.intervalFunc = typeof t.interval == "function" ? t.interval : Ga(+t.interval || Ya), i.errorFilter = t.errorFilter;
  else if (typeof t == "number" || typeof t == "string")
    i.times = +t || ns;
  else
    throw new Error("Invalid arguments for async.retry");
}
function oh(i, t) {
  t || (t = i, i = null);
  let e = i && i.arity || t.length;
  Tn(t) && (e += 1);
  var r = R(t);
  return wn((n, s) => {
    (n.length < e - 1 || s == null) && (n.push(s), s = kr());
    function o(a) {
      r(...n, a);
    }
    return i ? is(i, o, s) : is(o, s), s[Nr];
  });
}
function ah(i, t) {
  return Cs(ne, i, t);
}
function uh(i, t, e) {
  return oe(Boolean, (r) => r)(It, i, t, e);
}
const jo = L(uh, 3);
function lh(i, t, e, r) {
  return oe(Boolean, (n) => n)(Ft(t), i, e, r);
}
const Bo = L(lh, 4);
function ch(i, t, e) {
  return oe(Boolean, (r) => r)(ne, i, t, e);
}
const Vo = L(ch, 3);
function fh(i, t, e) {
  var r = R(t);
  return Ss(i, (s, o) => {
    r(s, (a, u) => {
      if (a)
        return o(a);
      o(a, { value: s, criteria: u });
    });
  }, (s, o) => {
    if (s)
      return e(s);
    e(null, o.sort(n).map((a) => a.value));
  });
  function n(s, o) {
    var a = s.criteria, u = o.criteria;
    return a < u ? -1 : a > u ? 1 : 0;
  }
}
const hh = L(fh, 3);
function dh(i, t, e) {
  var r = R(i);
  return wn((n, s) => {
    var o = !1, a;
    function u() {
      var l = i.name || "anonymous", c = new Error('Callback function "' + l + '" timed out.');
      c.code = "ETIMEDOUT", e && (c.info = e), o = !0, s(c);
    }
    n.push((...l) => {
      o || (s(...l), clearTimeout(a));
    }), a = setTimeout(u, t), r(...n);
  });
}
function ph(i) {
  for (var t = Array(i); i--; )
    t[i] = i;
  return t;
}
function Ms(i, t, e, r) {
  var n = R(e);
  return gi(ph(i), t, n, r);
}
function mh(i, t, e) {
  return Ms(i, 1 / 0, t, e);
}
function gh(i, t, e) {
  return Ms(i, 1, t, e);
}
function _h(i, t, e, r) {
  arguments.length <= 3 && typeof t == "function" && (r = e, e = t, t = Array.isArray(i) ? [] : {}), r = $e(r || kr());
  var n = R(e);
  return It(i, (s, o, a) => {
    n(t, s, o, a);
  }, (s) => r(s, t)), r[Nr];
}
function yh(i, t) {
  var e = null, r;
  return es(i, (n, s) => {
    R(n)((o, ...a) => {
      if (o === !1)
        return s(o);
      a.length < 2 ? [r] = a : r = a, e = o, s(o ? null : {});
    });
  }, () => t(e, r));
}
const vh = L(yh);
function wh(i) {
  return (...t) => (i.unmemoized || i)(...t);
}
function Th(i, t, e) {
  e = Ae(e);
  var r = R(t), n = R(i), s = [];
  function o(u, ...l) {
    if (u)
      return e(u);
    s = l, u !== !1 && n(a);
  }
  function a(u, l) {
    if (u)
      return e(u);
    if (u !== !1) {
      if (!l)
        return e(null, ...s);
      r(o);
    }
  }
  return n(a);
}
const ss = L(Th, 3);
function bh(i, t, e) {
  const r = R(i);
  return ss((n) => r((s, o) => n(s, !o)), t, e);
}
function Eh(i, t) {
  if (t = $e(t), !Array.isArray(i))
    return t(new Error("First argument to waterfall must be an array of functions"));
  if (!i.length)
    return t();
  var e = 0;
  function r(s) {
    var o = R(i[e++]);
    o(...s, Ae(n));
  }
  function n(s, ...o) {
    if (s !== !1) {
      if (s || e === i.length)
        return t(s, ...o);
      r(o);
    }
  }
  r([]);
}
const $h = L(Eh), Di = {
  apply: Lc,
  applyEach: Xc,
  applyEachSeries: Jc,
  asyncify: Ji,
  auto: Va,
  autoInject: of,
  cargo: uf,
  cargoQueue: lf,
  compose: ff,
  concat: Ao,
  concatLimit: Gn,
  concatSeries: xo,
  constant: gf,
  detect: So,
  detectLimit: Oo,
  detectSeries: ko,
  dir: wf,
  doUntil: bf,
  doWhilst: Zi,
  each: Po,
  eachLimit: ts,
  eachOf: It,
  eachOfLimit: Wn,
  eachOfSeries: ne,
  eachSeries: es,
  ensureAsync: Ha,
  every: Co,
  everyLimit: Do,
  everySeries: Mo,
  filter: Lo,
  filterLimit: Ro,
  filterSeries: No,
  forever: Rf,
  groupBy: If,
  groupByLimit: ks,
  groupBySeries: Ff,
  log: jf,
  map: Ss,
  mapLimit: gi,
  mapSeries: Ba,
  mapValues: Vf,
  mapValuesLimit: Ps,
  mapValuesSeries: zf,
  memoize: qf,
  nextTick: Uf,
  parallel: Hf,
  parallelLimit: Wf,
  priorityQueue: Xf,
  queue: Wa,
  race: Qf,
  reduce: Gr,
  reduceRight: Fo,
  reflect: rs,
  reflectAll: Jf,
  reject: th,
  rejectLimit: rh,
  rejectSeries: ih,
  retry: is,
  retryable: oh,
  seq: za,
  series: ah,
  setImmediate: Je,
  some: jo,
  someLimit: Bo,
  someSeries: Vo,
  sortBy: hh,
  timeout: dh,
  times: mh,
  timesLimit: Ms,
  timesSeries: gh,
  transform: _h,
  tryEach: vh,
  unmemoize: wh,
  until: bh,
  waterfall: $h,
  whilst: ss,
  // aliases
  all: Co,
  allLimit: Do,
  allSeries: Mo,
  any: jo,
  anyLimit: Bo,
  anySeries: Vo,
  find: So,
  findLimit: Oo,
  findSeries: ko,
  flatMap: Ao,
  flatMapLimit: Gn,
  flatMapSeries: xo,
  forEach: Po,
  forEachSeries: es,
  forEachLimit: ts,
  forEachOf: It,
  forEachOfSeries: ne,
  forEachOfLimit: Wn,
  inject: Gr,
  foldl: Gr,
  foldr: Fo,
  select: Lo,
  selectLimit: Ro,
  selectSeries: No,
  wrapSync: Ji,
  during: ss,
  doDuring: Zi
}, Ah = "series";
function Xa(i) {
  return i in Di ? Di[i] : Di[Ah];
}
const Mi = "color:black;", Sn = "color:white;", xh = "font-weight: normal;", ae = "font-weight: bold;", Ce = "background-color", De = "padding:0 5px;", C = {
  info: `color:magenta; ${ae}`,
  event: `${De} ${Mi} ${ae} ${Ce}: #F6FA70;`,
  include: `color:blue; ${ae}`,
  taskin: `${De} ${Sn} ${ae} ${Ce}: #33658a;`,
  taskout: `${De} ${Sn} ${ae} ${Ce}: #33658a;`,
  taskstart: `${De} ${Mi} ${ae} ${Ce}: #CAEDFF;`,
  taskend: `${De} ${Mi} ${ae} ${Ce}: #CAEDFF;`,
  // taskitem    : `${pd} ${cb} ${fn} ${bgc}: #BFFFF0;`,
  taskitem: "",
  // 구현안됨
  err: `${De} ${Sn} ${ae} ${Ce}: #d90429; padding:3px 5px;`,
  // 등록안됨
  warn: `${De} ${Sn} ${xh} ${Ce}: #ff4d80; padding:3px 5px;`
  // log: 'color:#39d300',
  // node: 'color:blue',
  // node:'color:darkred',
  // server: 'color:dodgerblue',
  // warn: 'color:darkorange'
};
function Sh(i) {
  let t = "";
  for (; --i >= 0; )
    t += "	";
  return t;
}
const Yn = "data-owner", Ls = "data-tid", Oh = "data-scope";
function Rs(i, t) {
  let e;
  if (i && (e = Nt.toElement(i, t), !e))
    throw new Error(`parent를 찾을 수 없습니다. (${i})`);
  return e || (e = document.getElementById("app")), e || (e = t === document ? document.body : t), e;
}
function Ns(i) {
  return () => {
    let t = i.parent;
    (typeof t == "string" ? t : !1) && (t = Rs(t, i.parentRoot()));
    let r;
    const n = i.shadowrootMode;
    return n ? r = t.shadowRoot || t.attachShadow({ mode: n }) : r = t.ownerDocument, r;
  };
}
var Ve, cn, le, ce, fe, vr, wr, Vt, ze, qe, Tr, ii, Ka;
const uo = class uo {
  constructor(t) {
    /*
    substitution(template) {
        if (typeof template === 'string') return this.#substitution__(template);
        let templateString;
        if (template instanceof HTMLTemplateElement) {
            // let content = template.content.cloneNode(true);
            // templateString = template.cloneNode(true).innerHTML;
            templateString = template.innerHTML;
            template.innerHTML = this.#substitution__(templateString);
        } else if (template instanceof HTMLElement) {
            // templateString = template.cloneNode(true).innerHTML;
            templateString = template.innerHTML;
            template.innerHTML = this.#substitution__(templateString);
        } else {
            //
        }
        return template;
    }
    */
    // (${ $inject.dirname } or ${ __dirname } 경로 문자열 치환)
    P(this, ii);
    /*
    static get application(){
        return _application;
    }
    static setApplication(dom){
        _application = dom;
    }
    */
    // 사용 안함 (NS 사용함)
    P(this, Ve, void 0);
    P(this, cn, void 0);
    // parent가 속한 document (parent.ownerDocument)
    P(this, le, void 0);
    //------------------
    // attrs
    //------------------
    // append 할 parent DOM 참조값 또는 selector
    P(this, ce, void 0);
    // setParent(parent) { this.#parent = parent; }
    // open, closed
    P(this, fe, "open");
    // parent document  위치 (include 할때 호출하는 문서의 위치)
    P(this, vr, void 0);
    // 자신의 문서 위치
    P(this, wr, void 0);
    //------------------
    // Node에 Marker 표시
    //------------------
    P(this, Vt, void 0);
    P(this, ze, void 0);
    P(this, qe, void 0);
    //------------------
    // etc
    //------------------
    // root로부터 추정한 자신의 (src) 문서 위치
    P(this, Tr, void 0);
    if (!1 in t)
      throw new Error("문서 (owner)의 경로가 지정되지 않았습니다.");
    this.setOptions(t);
  }
  get includeChain() {
    return E(this, Ve);
  }
  get provider() {
    return E(this, cn);
  }
  get parentRoot() {
    return E(this, le);
  }
  setOptions(t) {
    if (O(this, cn, t.provider), O(this, fe, t.shadowrootMode), E(this, fe) === "" && O(this, fe, "open"), O(this, ce, t.parent), E(this, fe) && !E(this, ce))
      throw new Error("parent 속성이 지정되지 않았습니다. (shadowroot host)");
    if (typeof E(this, ce) == "string") {
      if (!t.parentRoot)
        throw new Error("parent 값이 문자열인 경우 parentRoot Function을 지정해야 합니다.");
      typeof t.parentRoot == "function" ? O(this, le, t.parentRoot) : O(this, le, () => t.parentRoot);
    } else
      O(this, le, () => E(this, ce).ownerDocument);
    if (!E(this, le))
      throw new Error("root parentRoot 속성이 지정되지 않았습니다.");
    if (O(this, ze, t.scope), O(this, qe, t.define), t.scope && t.define)
      throw new Error("<scope>과 <define> 태그를 함께 사용할 수 없습니다.");
    O(this, wr, t.src || ""), O(this, vr, t.owner);
    const e = this.getSrcUrl(E(this, wr), E(this, vr));
    O(this, Tr, e.href);
    const r = e.pathname + e.search;
    this.updateNS(r, t.includeChain);
  }
  getSrcUrl(t, e) {
    return new URL(t, e);
  }
  copy(t) {
    const e = {
      src: this.src,
      owner: this.owner,
      // shadowrootMode: this.shadowrootMode,
      scope: this.scope,
      define: this.define,
      // includeChain: this.includeChain.slice(1)
      includeChain: [...this.includeChain]
      // 참조 복사
      // parent: this.parent,
      // provider: this.provider,
    };
    return e.provider = (t == null ? void 0 : t.provider) || this.provider, e.parent = (t == null ? void 0 : t.parent) || this.parent, e.parentRoot = (t == null ? void 0 : t.parentRoot) || this.parentRoot, t == null || delete t.provider, t == null || delete t.parent, t == null || delete t.parentRoot, Object.assign(e, t || {}), new uo(e);
  }
  updateNS(t, e) {
    if (O(this, Vt, E(this, qe) ? t + "#" + E(this, qe) : t), !e) {
      O(this, Ve, [E(this, Vt)]);
      return;
    }
    e[0] === E(this, Vt) ? O(this, Ve, [...e]) : O(this, Ve, [E(this, Vt), ...e]);
  }
  addElement(t) {
    Object.defineProperty(t, "getParseOption", {
      configurable: !0,
      writable: !1,
      value: () => this
    });
  }
  get parent() {
    return E(this, ce);
  }
  get shadowrootMode() {
    return E(this, fe);
  }
  get owner() {
    return E(this, vr);
  }
  get src() {
    return E(this, wr);
  }
  get ns() {
    return E(this, Vt);
  }
  get alias() {
    return D.$ns.getAlias(E(this, Vt));
  }
  get scope() {
    return E(this, ze);
  }
  setScope(t) {
    O(this, ze, t);
  }
  get define() {
    return E(this, qe);
  }
  // ns가 달라지므로 setter 제공하지 않음
  // setDefine(defineID) { this.#define = defineID; }
  getMarker(t) {
    switch (t) {
      case Yn:
        return E(this, Vt);
      case Ls:
        return kt.temporaryID();
      case Oh:
        return E(this, ze);
    }
    return "";
  }
  // node에 마킹
  // node에 식별자 붙여줌 (include 문서에서 resource search 범위 지정하기 위함)
  addMarker(t, e, r) {
    return r = r ?? this.getMarker(e), r && t.setAttribute(e, r), r;
  }
  removeMarker(t, e) {
    t.removeAttribute(e);
  }
  get uri() {
    return E(this, Tr);
  }
  // include 되지 않은 HTML 본문인지 여부
  isRootHTML(t) {
    return (t ?? this.uri) === window.location.href;
  }
  resolve(t = ".") {
    let e = new URL(t, E(this, Tr)).href;
    return e = e.replace(/\/$/, ""), e;
  }
  //--------------------
  // 치환
  //--------------------
  // ${ $inject.dirname } or ${ __dirname } 치환
  // 템플릿 사용할때 치환함 (현재 폴더를 알아야 하므로)
  // 또는 templateData 적용할때 리터랄 템플릿에 적용해서 치환해줌
  getTemplateString(t) {
    let e;
    return t instanceof HTMLTemplateElement || t instanceof HTMLElement ? e = t.innerHTML : typeof t == "string" && (e = t), e = Xt(this, ii, Ka).call(this, e), e;
  }
};
Ve = new WeakMap(), cn = new WeakMap(), le = new WeakMap(), ce = new WeakMap(), fe = new WeakMap(), vr = new WeakMap(), wr = new WeakMap(), Vt = new WeakMap(), ze = new WeakMap(), qe = new WeakMap(), Tr = new WeakMap(), ii = new WeakSet(), Ka = function(t) {
  const e = this.resolve();
  return t = t.replace(/\${\s*(\$inject\.dirname|__dirname)\s*}/img, e), t;
};
let tn = uo;
const kh = "include-html-resource", Ph = "html-resource";
let jr;
function yi(i) {
  jr || (jr = document.createElement("template"), jr.setAttribute(kh, ""), document.body.append(jr));
  const t = jr, e = `[${Yn}="${i.ns}"]`;
  let r = t == null ? void 0 : t.querySelector(e);
  return r || (r = document.createElement(Ph), i.addMarker(r, Yn), t.append(r)), r;
}
var Ue, He, zt;
class Is {
  constructor(t, e) {
    // script 값은 <script> 태그 뿐만이 아니라
    // inline script를 호출하는 일반 Element 일수도 있음
    P(this, Ue, void 0);
    P(this, He, void 0);
    P(this, zt, void 0);
    O(this, Ue, t), O(this, He, e);
    const r = t.getParseOption();
    O(this, zt, r.copy());
  }
  // get option() { return this.#option; }
  get tid_scope() {
    return E(this, zt).scope;
  }
  get ns() {
    return E(this, zt).ns;
  }
  get dirname() {
    return E(this, zt).resolve();
  }
  get isRootHTML() {
    return E(this, zt).isRootHTML();
  }
  // 스크립트가 실행 되었음를 알림
  load() {
    typeof E(this, He) == "function" && E(this, He).call(this), O(this, He, !0);
  }
  /*
  // 사용법 : this.getInject().$task['클릭']();
    - $task['클릭'](); // Global task 호출됨
    - this.getInject().$task['클릭'](); // NS (<define>) 내부에 있는 task 호출됨
  */
  get $task() {
    var e;
    const t = E(this, zt).alias;
    return (e = D.$ns.$id[t]) == null ? void 0 : e.$task;
  }
  // rootElememnt (element.getRootNode)
  // document 또는 host.shadowRoot
  // console.error('- shadowRoot: ', script.shadowRoot);
  get getRootNode() {
    return () => E(this, Ue).getRootNode();
  }
  // 대신 document.currentScript 사용 가능 함
  get scriptElement() {
    return E(this, Ue);
  }
  get parentElement() {
    return E(this, Ue).parentElement;
  }
  get scopeElement() {
    const t = `scope[${Ls}="${this.tid_scope}"]`;
    return this.getRootNode().querySelector(t);
  }
  // HTML 문서(owner) 범위 내 탐색만 지원함
  // - include 할때 shadowRoot를 사용한 경우 template은 검색이 안될 수 있음
  // - template 검색은 document에서 탐색하거나 template() 메서드를 사용할것
  get querySelectorAll() {
    return (t, e) => {
      const r = this.getRootNode().querySelectorAll(t);
      if (!(r != null && r.length))
        return [];
      let n = "owner", s = this.ns;
      return [...r].filter((o) => {
        var u, l;
        for (; o && !((u = o.dataset) != null && u[n]); )
          o = o.parentElement;
        const a = (l = o == null ? void 0 : o.dataset) == null ? void 0 : l[n];
        return Ch(a, s, this.isRootHTML);
      });
    };
  }
  get querySelector() {
    return (t) => {
      var e;
      return ((e = this.querySelectorAll(t)) == null ? void 0 : e[0]) || null;
    };
  }
  // 탐색 범위지정 옵션 필요없음
  // - document 범위 검색: document.querySelector 사용
  template(t, e = !1) {
    return e ? [...document.querySelectorAll(t)] : [...yi(E(this, zt)).querySelectorAll(t)];
  }
  // 템플릿만 골라냄
  // const templateExp = /(.?)\btemplate(?=([\s.#:[,>+~]?))\b/img;
  // const list = selector.split(',').match(templateExp)?.filter((str)=>{
  //     return !(str.startsWith('[') || str.startsWith(':'))
  // });
}
Ue = new WeakMap(), He = new WeakMap(), zt = new WeakMap();
function Ch(i, t, e) {
  return e ? !i || i === t : i && i === t;
}
async function Dh(i, t) {
  const { provider: e } = i.getParseOption(), { tid: r, src: n } = t;
  let s;
  return n ? s = Mh(i, t) : s = Lh(i, t), e.$moduleload.add(r, s), k() && console.log(`# 모듈 로드 지연 (${r})`), i;
}
function Mh(i, t) {
  const {
    // tid,
    src: e
  } = t, r = (n) => {
    i.setAttribute("src", e), i.onload = () => {
      k() && console.log("[loaded module]", e), queueMicrotask(() => n());
    }, i.onerror = (s) => {
      console.error("[module 로드 에러]", s), queueMicrotask(() => n());
    };
  };
  return async () => await new Promise(r);
}
function Lh(i, t) {
  const {
    tid: e,
    content: r
  } = t, n = (s) => {
    const o = () => {
      i.innerHTML = r, queueMicrotask(() => s());
    };
    D.$inject.add(e, new Is(i, o));
    let a = Rh(e, r);
    const u = document.createTextNode(a);
    i.appendChild(u);
  };
  return async () => await new Promise(n);
}
function Rh(i, t) {
  const e = `window.$taskml.$inject.get('${i}')`;
  let r = `
    ${e}.load();
    const $inject = ${e};
    // __dirname
    // const __dirname = ${e}.dirname;
    `;
  return r += `
        ${t}
        delete window.$inject;
        `, r;
}
function Nh(i, t) {
  return t.src ? Fh(i, t) : jh(i, t), i;
}
function Ih(i, t) {
  const e = kt.temporaryID();
  return D.$inject.add(e, new Is(i)), Qa(e, t, !0);
}
function Fh(i, t) {
  const { provider: e } = i.getParseOption(), {
    // tid,
    src: r
  } = t;
  return e.$dom.addScriptCounter(), i.setAttribute("src", r), i.onload = () => {
    k() && console.log("[loaded script]", r), e.$dom.removeScriptCounter();
  }, i.onerror = (n) => {
    console.error("[script 로드 에러]", n), e.$dom.removeScriptCounter();
  }, i;
}
function jh(i, t) {
  const {
    tid: e,
    content: r
  } = t, n = () => {
    i.innerHTML = r;
  };
  D.$inject.add(e, new Is(i, n));
  let s = Qa(e, r);
  const o = document.createTextNode(s);
  return i.appendChild(o), i;
}
function Qa(i, t, e) {
  const r = `window.$taskml.$inject.get('${i}')`, n = `window.$taskml.$inject.remove('${i}');`;
  let s = `
        ${r}?.load();
        
        Object.defineProperty(window, '$inject', {
            configurable: true, writable: false,
            get value() { return ${r}; }
        });
    `;
  return s += `
        ${t}
        delete window.$inject;
    `, e && (s += `${n}`), s;
}
async function Bh(i) {
  var s;
  const t = i.getParseOption();
  if ((s = i.src) != null && s.includes("@vite"))
    return;
  const r = {
    tid: kt.temporaryID(),
    // node.src: full url을 알려줌
    // attribute: 작성된 문자열 그대로 알려줌
    src: t.isRootHTML() ? i.getAttribute("src") : i.src,
    content: i.innerHTML
  };
  i.removeAttribute("src"), i.innerHTML = "";
  const n = document.createElement("script");
  return Nt.copyAttrs(i, n), t.addElement(n), i.type === "module" ? await Dh(n, r) : Nh(n, r);
}
async function Vh(i) {
  const t = i.getParseOption();
  t.addMarker(i, Yn);
  const e = t.addMarker(i, Ls);
  t.setScope(e);
  const r = await Za(i);
  return t.setScope(), r;
}
function zh(i, t) {
  if (typeof i == "string")
    throw new Error("(v0.2.1~) getTask : taskID가 아닌 task 참조 객체를 전달해야함");
  const e = i instanceof Rr ? i.copy() : i;
  if (!e)
    return;
  const { src: r } = e.attrs;
  if (!r)
    return e;
  const {
    id: n,
    args: s
  } = Fs(r), o = go(t, n);
  if (!o)
    return e;
  const a = s === void 0 ? void 0 : Pa(t, s), u = l(o, e);
  return u !== e && delete e.list, e.attrs.srcRef = o, delete e.attrs.src, u.attrs = { ...u.attrs, ...e.attrs }, u._args = a, u;
  function l(f, h) {
    var w;
    f = c(f);
    const p = h.parseOption;
    let { alias: _, taskID: d, task: y } = D.$ns.findAlias(f, p);
    return y ? (w = y.attrs) != null && w.src ? l(y.attrs.src, y) : y.copy() : h === e ? e : (h.attrs.srcRef = c(h.attrs.src), delete h.attrs.src, h.copy());
  }
  function c(f) {
    return go(a, f);
  }
}
function Ja(i) {
  const t = i.getParseOption();
  t || console.error("[taskParser 에러]: parseOption 전달되지 않음: ", i);
  const e = Nt.getAttributes(i);
  let { id: r } = e, {
    alias: n,
    taskID: s,
    provider: o,
    parseOption: a
  } = D.$ns.parseTaskID(r, t);
  const u = new Rr({
    id: s,
    attrs: e,
    list: qh(i),
    parseOption: a
  });
  k() && (console.log(`# Task 등록 ($task: ${o.$task.$$id}): `, `${n}:${s}`), console.log("	* taskNode:", i)), s ? o.$task.add(s, u) : (u.attrs.id = "자동 실행", o.$firstrun.add(u));
}
function qh(i) {
  let t = [];
  const e = i.getParseOption();
  for (let r of i.children) {
    const n = r.nodeName.toLowerCase(), s = Ne.includes(n);
    e.addElement(r);
    const o = s ? Hh(r) : Uh(r);
    o && t.push(o);
  }
  return t;
}
function Uh(i) {
  const t = Nt.getAttributes(i), e = i.nodeName.toLowerCase();
  return (e === "js" || e === "script") && (t.$script = i.innerHTML), k() && console.log("		- item: ", e, t), new Zr({
    nodeName: e,
    attrs: t,
    parseOption: i.getParseOption()
  });
}
function Hh(i) {
  const t = i.nodeName.toLowerCase(), e = Nt.getAttributes(i);
  let r = e.id;
  const n = e.src, s = i.getParseOption();
  return n ? (r && (s.provider.$task.add(r, n), delete e.id), k() && console.log("		- item (src): ", t, e), new Zr({
    nodeName: t,
    attrs: e,
    parseOption: s
  })) : (r || (r = Wh(), i.setAttribute("id", r)), Ja(i), e.src = r, delete e.id, k() && console.log("		- item (ref): ", t, e), new Zr({
    nodeName: t,
    attrs: e,
    parseOption: s
  }));
}
function Wh() {
  return "task_" + kt.temporaryID();
}
async function Gh(i) {
  const t = i.getParseOption();
  if (i.hasAttribute(lu)) {
    const e = Nt.getAttributes(i);
    await Od(e, t);
    return;
  }
  Ja(i);
}
function Yh(i) {
  const t = i.getParseOption();
  yi(t).appendChild(i);
}
const Xh = ["template", "script", "style", "link", "task"];
async function Kh(i) {
  const t = i.getParseOption();
  [...i.childNodes].forEach((l) => {
    if (l.nodeType !== Node.ELEMENT_NODE)
      return l.remove();
    const c = l.nodeName.toLowerCase();
    Xh.includes(c) || l.remove(), c === "link" && l.rel !== "stylesheet" && l.remove();
  });
  const e = [...i.childNodes];
  i.innerHTML = "";
  let r = i.getAttribute("ns");
  r || (r = kt.temporaryID(), i.setAttribute("ns", r)), k() && console.log(`%c# Define 파싱 (${r}): `, C.include, e);
  const n = D.createProvider({
    $firstrun: t.provider.$firstrun
  }), s = t.copy({
    // src,
    // owner: parseOption.owner,
    parent: i,
    define: r,
    provider: n
  });
  D.$ns.add(s.ns, { alias: r, parseOption: s }), t.provider.$include.addRun(s), yi(s).append(i);
  const a = { parseOption: s };
  n.$dom.add(a), a.nodes = await vi(e, s), a.done = u;
  function u() {
    Qh(s), k() && console.log(`%c# Define 파싱 종료 (${r}): `, C.include);
  }
}
function Qh(i) {
  const t = yi(i), e = [...t.querySelectorAll('style, link[rel="stylesheet"]')];
  [...t.querySelectorAll("template")].forEach((n) => {
    const s = e.map((o) => o.cloneNode(!0));
    n.content.prepend(...s);
  }), e.forEach((n) => n.remove());
}
class xe {
  constructor() {
    // 디버깅용 인스턴스 구별자
    x(this, "$$id");
    x(this, "_map");
    this.$$id = kt.temporaryID(), this._map = /* @__PURE__ */ new Map();
  }
  get length() {
    var t;
    return ((t = this._map) == null ? void 0 : t.size) || 0;
  }
  // 등록된 전체 목록
  getAll() {
    return this._map;
  }
  clear() {
    this._map.clear();
  }
  has(t) {
    return this._map.has(t);
  }
  get(t) {
    return this._map.get(t);
  }
  // 중복 메세지
  msg_duplication(t) {
    return `중복된 ${this.constructor.name} 아이디가 있습니다. (id: ${t})`;
  }
  // 데이터 추가
  add(t, e) {
    if (t !== void 0 && this._map.has(t)) {
      console.error(this.msg_duplication(t));
      return;
    }
    return this._map.set(t, e), e;
  }
  remove(t) {
    if (this._map.has(t))
      return this._map.delete(t), t;
  }
}
function me(i) {
  return i == null ? void 0 : i.replace(/\s/mg, "");
}
class Jh extends xe {
  // task 등록
  // _map;
  constructor() {
    super();
    x(this, "_$id");
    this._$id = {};
  }
  get $id() {
    return this._$id;
  }
  //----------------------------------
  // <as-task> task 접근 객체 (task id 관리)
  //----------------------------------
  // key: taskID, value: task
  has(e) {
    return e = me(e), super.has.has(e);
  }
  get(e) {
    return e = me(e), super.get(e);
  }
  // 데이터 추가
  add(e, r) {
    if (e = me(e), e !== void 0 && this._map.has(e))
      if ("override" in r.attrs)
        k() && console.warn(`# Task (id: ${e}) 정의가 오버라이딩 됩니다.`);
      else {
        const n = r.attrs.id || e;
        console.error(`오버라이딩 중지 (id: ${n}): "override" attribute이 누락되었습니다.`);
        return;
      }
    return this._map.set(e, r), Object.defineProperty(this._$id, e, {
      // configurable: false,
      writable: !1,
      configurable: !0,
      // writable: true,
      value: (...n) => (js(r, n, () => {
      }), r)
    }), r;
  }
  remove(e) {
    if (e = me(e), !!super.remove(e))
      return delete this._$id[e], e;
  }
  //----------------------------------
  // Task Override
  //----------------------------------
  /*
      * task 위치상 나중에 정의된 task가 남아야함
        - 같은 문서상에서는 아래쪽 task 정의가 위쪽 task를 덮어쓰기함
  
      * <task include>, <include> 및 템플릿 생성에 의한 task 오버라이딩
        - <task include> 문은 task 실행 전 미리 프리로딩 되므로 함수 호출 안함
        - <include> 및 템플릿 생성에 의해 추가된 task는 firstrun 진행 중일때만 함수 호출함
  
      * firstrun 진행 중일때만 함수 호출함
        - <include> 문은 tassk에 의해 실행됨
        - 이때는 root 문서의 task가 이미 파싱된 상태임
        - <include> 문이 task 정의보다 더 위쪽에 있더라도 include 되는 문서의 task가 더 나중에 기록되게 됨
        - 따라서 시간상으로는 include 문서의 task가 root 문서를 오버라이딩 하게됨
        - 그래서 override 함수를 호출하여 이를 반대로 적용시켜줌
  
      ```
      // include task의 경우 (not preload)
      root task 파싱 > root DOM attach > root firstrun
                     > (로드) include task 파싱 > [root task로 다시 덮어쓰기]
                     > include DOM attach
                     > include firstrun
       > root firstrun 계속 진행
      ```
  
      * (주의)
      * firstrun 진행중인 경우 task include 위치 및 시점은 상관하지 않고 root, include 문서 관계만을 파악하여 Override 함
      * firstrun이 끝난 후 직접 include를 호출하면 include 하는 문서의 task를 덮어쓰기 함
      * 같은 문서에서는 아래쪽 task가 위쪽 task를 덮어쓰기 함
      * */
  // include 생성된 목록(taskProvider)을 $task 목록으로 덮어쓰기 한다.
  // task 오버라이딩 (firstrun 실행중인 경우에만 호출됨)
  override(e) {
    const r = e == null ? void 0 : e.getAll();
    k() && console.log("* task override: ", r), this._map = new Map([...r, ...this._map]);
  }
}
const Zh = new MutationObserver(ed);
function td(i) {
  Zh.observe(i, {
    subtree: !0,
    childList: !0,
    attributes: !0
  });
}
function ed(i) {
  i.forEach((t) => {
    if (t.type === "childList") {
      [...t.addedNodes].forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE && k() && console.log("Observer (ELEMENT 추가됨): ", o);
      }), [...t.removedNodes].forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE && k() && console.log("Observer (ELEMENT 제거됨): ", o);
      });
      return;
    }
    if (t.type !== "attributes")
      return;
    const e = t.target, r = t.attributeName, n = r.startsWith(Sr);
    if (r.startsWith("on") || n) {
      if (n && r === e.getAttribute(r))
        return;
      console.error(`Attribute changed! New value for '${r}'`), rd(e, r);
    }
  });
}
function rd(i, t) {
  nd(i, t);
  const e = i.getAttribute(t);
  if (!e)
    return;
  tu(i, { name: t, value: e });
}
function nd(i, t) {
  const e = i.$$inlineEvent;
  if (!(e != null && e[t]))
    return;
  let r;
  t.startsWith("on") ? r = t.substring(2) : r = t.substring(Sr.length);
  const { handler: n } = e[t];
  i.removeEventListener(r, n), delete e[t];
}
function zo(i, t, e, r) {
  t in i && (i[t] = null), i.addEventListener(t.substring(2), e), i.setAttribute(r, r), i.$$inlineEvent || (i.$$inlineEvent = {});
  const n = i.$$inlineEvent;
  if (n[r])
    throw new Error("이전 인라인 이벤트 데이터가 지워지지 않음");
  n[r] = { handler: e };
}
const id = (() => {
  let i = [
    Node.ELEMENT_NODE,
    // Node.ATTRIBUTE_NODE,
    Node.TEXT_NODE
    // Node.CDATA_SECTION_NODE,
    // Node.PROCESSING_INSTRUCTION_NODE,
    // Node.COMMENT_NODE,
    // Node.DOCUMENT_NODE,
    // Node.DOCUMENT_TYPE_NODE,
    // Node.DOCUMENT_FRAGMENT_NODE
  ];
  return k() && i.push(Node.COMMENT_NODE), i;
})();
function sd(i) {
  return id.includes(i.nodeType);
}
async function vi(i, t) {
  let e = [];
  for (let r of i) {
    const n = await od(r, t);
    n && e.push(n);
  }
  return e;
}
async function od(i, t) {
  if (!sd(i))
    return;
  if (i.nodeType !== Node.ELEMENT_NODE)
    return () => i;
  const e = i.nodeName.toLowerCase();
  return t.addElement(i), Ne.includes(e) ? (e === Ne[1] && console.warn(`<${Ne[1]}> 대신 <${Ne[0]}> 태그를 사용하세요`), await Gh(i)) : e === "define" ? await Kh(i) : e === "template" ? Yh(i) : e === "scope" ? await Vh(i) : e === "script" ? await Bh(i) : await Za(i);
}
async function Za(i) {
  const t = Nt.getAttributes(i), e = {};
  for (let o in t) {
    const a = {
      name: o,
      value: t[o]
    }, {
      name: u,
      value: l
    } = tu(i, a);
    u && (e[u] = l ?? "");
  }
  const r = await vi(i.childNodes, i.getParseOption());
  i.innerHTML = "";
  const n = i.nodeName.toLowerCase();
  let s = _n.component(n);
  return s ? (console.warn("* SolidJS 정의 컴포넌트 사용 중단 예정 (대신 CustomElement 사용): ", n, e.id), () => {
    const o = or(e, {
      children: r
    }), a = s(o);
    return Ko(a, e), a;
  }) : async () => (await new Promise(async (o) => {
    const a = [];
    for (let u of r)
      a.push(await Nt.toElementAsync(u));
    setTimeout(async () => {
      i.append(...a);
    }), Ko(i, e), o(i);
  }), i);
}
function tu(i, t) {
  let {
    name: e,
    value: r
  } = t, n = r.trim();
  if (!n)
    return t;
  let s, o;
  return e = e.toLowerCase(), e.startsWith("on") ? (o = qo(i, n, !1), zo(i, e, o, e), {
    name: e,
    value: o
  }) : e.startsWith(Sr) ? (s = e.substring(Sr.length), s ? (o = qo(i, n, !0), zo(i, `on${s}`, o, e), {
    name: e,
    value: e
  }) : t) : t;
}
function qo(i, t, e) {
  return (r) => {
    let n;
    try {
      k() && console.log("%c[실행 (%s)]: ", C.event, r.type, r);
      for (const s in r.currentTarget.dataset) {
        let o = r.currentTarget.dataset[s] || "";
        o.includes(",") ? o = o.split(",").map((a) => a.trim()) : o = [o], Array.isArray(o) || (o = [o]), r[s] = o;
      }
      return e ? (n = ad(t, i), k() && console.error("%c호출 구문: %s", C.event, n)) : (n = Ih(i, t), window.event || (window.event = r, n += "window.event = null;")), n = di(n, "event"), ar(n).apply(r.target, [r]);
    } catch (s) {
      return console.error("[핸들러 처리]", s), n || t;
    }
  };
}
function ad(i, t) {
  let {
    id: e,
    args: r
  } = Fs(i);
  r = r === "" || r === void 0 ? "{$_tempAddedEvent: event}" : r + ", {$_tempAddedEvent: event}", e = yn(r, e);
  let {
    alias: n,
    taskID: s,
    task: o
  } = D.$ns.findAlias(e, t.getParseOption());
  return o ? `$task["${n}:${s}"](${r})` : `${e}(${r})`;
}
function eu(i) {
  if (!i || i.length < 1)
    return;
  let t = i[i.length - 1];
  !t || typeof t != "object" || "$_tempAddedEvent" in t && (i.event = t.$_tempAddedEvent, i.splice(i.length - 1, 1));
}
function Fs(i) {
  var o;
  if (!i)
    return;
  if (i = i.trim(), i = Uo(i, "\\(", "\\)"), i = Uo(i, "\\[", "\\]"), /^('|")(.*)\1$/.test(i))
    return i = Br(i, "'", "'"), i = Br(i, '"', '"'), {
      id: i.replace(/\s/mg, ""),
      args: void 0
    };
  const t = /^([^\n]+)\((.*)\)\s*;*$/gms;
  if (!(((o = i.match(t)) == null ? void 0 : o[0]) === i))
    return {
      id: me(i),
      args: void 0
    };
  let n, s;
  return i.replace(t, (a, u, l, c, f) => {
    n = me(u), s = l == null ? void 0 : l.trim();
  }), n = Br(n, "\\[", "\\]"), n = Br(n, "'", "'"), n = Br(n, '"', '"'), {
    id: n,
    args: s
  };
}
function Uo(i, t, e) {
  return r(i);
  function r(s) {
    var l;
    const o = new RegExp("^" + t + "([\\s\\S]*)" + e + "$", "gms"), a = (l = s.match(o)) == null ? void 0 : l[0];
    let u = s;
    if (a) {
      if (u.replace(o, (c, f) => {
        u = f.trim();
      }), !n(u))
        return s;
      u = r(u);
    }
    return u;
  }
  function n(s) {
    let o = 0;
    for (const a of s)
      if (a === "(" ? o++ : a === ")" && o--, o < 0)
        return !1;
    return !o;
  }
}
function Br(i, t, e) {
  var s;
  let r = i;
  const n = new RegExp("^" + t + "([\\s\\S]*)" + e + "$", "gms");
  for (; r && ((s = r.match(n)) == null ? void 0 : s[0]); )
    r.replace(n, (a, u) => {
      r = u.trim();
    }), r && (i = r);
  return i;
}
var fn, hn, br, Er, $r;
class ru extends Ma {
  constructor() {
    super(...arguments);
    /*
    *
    * (o) task:[event] 구문을 사용할 수 있음
    * (o) 시작과 끝 이벤트를 가져야함 :
    * - task:start : (start) 이벤트 이후에 실행됨
    * - task:end : end 이벤트 이후에 실행됨
    * - task:complete : end 이벤트 이후에 실행됨 (task:start, task:end 작업까지 완료된 후 발생함)
    *
    * (o) JS에서 $task 객체로 접근 가능함
    * (o) task 호출할때 전달된 인자를 `$args` 변수로 받음
    * (o) DOM `selector`는 콤마 구분 복수 설정 가능함
    * */
    P(this, fn, void 0);
    P(this, hn, void 0);
    // task 실행시 전달된 매개변수를 참조할 수 있도록 제공해줌
    P(this, br, void 0);
    // (디버깅용) 실행 노드의 depth
    x(this, "depth");
    x(this, "tab");
    x(this, "debug");
    // 정의되지 않은 TaskItem 호출일때 (true)
    x(this, "undefinedItem", !1);
    // 에러 발생시, 취소시 메세지 보관
    x(this, "error");
    //--------------------------------------
    // task 실행이 모두 완료됬는지 확인
    //--------------------------------------
    // 이벤트로 연결된 모든 task 실행이 모두 완료됬는지 확인
    P(this, Er, !1);
    P(this, $r, !1);
    //--------------------------------------
    // Task 이벤트 Proxy
    //--------------------------------------
    // 이벤트를 캐치하여 task 이벤트로 재발송 해줌 (customEvent)
    // 예) audio 이벤트 --> sound task 이벤트
    x(this, "proxyEvents");
  }
  get nodeName() {
    return E(this, fn);
  }
  get info() {
    return E(this, hn);
  }
  // toObject: $args 파싱된 문자열을 다시 객체로 전환
  attr(e, r = "string") {
    const n = this.info.attrs[e];
    return n && function(s) {
      try {
        return yn(s, n, r);
      } catch (o) {
        return console.error(`[Attribute 파싱 에러] ${r}:`, n, o), n;
      }
    }(this.args);
  }
  hasAttr(e) {
    return e in this.info.attrs;
  }
  get args() {
    return E(this, br);
  }
  // Task 아이템 생성 (factory) 함수에서 호출됨
  create({
    nodeName: e,
    info: r,
    args: n,
    depth: s
  }) {
    this.debug = k(), this.depth = !s || isNaN(s) ? 0 : s, this.tab = this.debug ? Sh(s + 1) : "", O(this, fn, e), O(this, hn, r), O(this, br, n || []);
    const o = r == null ? void 0 : r.parseOption;
    return Object.defineProperty(E(this, br), "getParseOption", {
      configurable: !0,
      writable: !1,
      value: () => o
    }), this;
  }
  //--------------------------------------
  // Task 진행 Flow
  //--------------------------------------
  // await new Promise(resolve => setTimeout(resolve, 1000));
  /*
      // task 인터페이스가 적용 안된 작업 동적으로 정의해서 처리하는 방법
      const {nodeName, attrs, _depth: depth = 0} = taskItem;
      const handler = {
          // start: (cb) => cb(),
          // end: (cb) => {done(); cb();}
          run: (cb) => {
              runTask((attrs.src || attrs.id), [], cb);
          }
      }
  
      // 핸들러 실행
      // const dynamicFactory = reflection.taskItem('TaskInterface');
      // const instance = dynamicFactory({nodeName, info: taskItem, depth});
      // instance.undefinedItem = true;
      // instance.dynamic(handler);
  
      // 핸들러 실행
      runner.dynamicFlow(taskItem, handler);
      * */
  bindHandler(e) {
    let {
      start: r,
      run: n,
      end: s
    } = e || {};
    return r = r || this.start.bind(this), n = n || this.run.bind(this), s = s || this.end.bind(this), {
      start: r,
      run: n,
      end: s
    };
  }
  dynamic(e) {
    let {
      start: r,
      run: n,
      end: s
    } = this.bindHandler(e);
    (async () => {
      try {
        this.startEvent(), await new Promise(this.startTask.bind(this)), await new Promise(r), this.startAfterEvent(), this.runEvent(), await new Promise(n), this.endBeforeEvent(), await new Promise(s), this.endEvent(), await new Promise(this.endTask.bind(this));
      } catch (a) {
        this.dispatchError(a);
      }
    })();
  }
  // 에러 또는 reject 호출된 경우 처리
  dispatchError(e) {
    this.error = e, e === bn ? (k() && (this.nodeName === "cancel" ? console.log(`${this.tab}%c# (cancel) ${this.nodeName} 실행됨`, C.info) : console.log(`${this.tab}%c# (cancel) 실행중인 ${this.nodeName} 취소됨`, C.info)), this.emit("cancel", this), this.attributeEvent("cancel")) : e === En ? (console.log(`${this.tab}%c# (exit) 실행중인 ${this.nodeName} exit`, C.info), this.skipEvent()) : (console.error("[Task 실행 중지]", e), this.emit("error", this), this.attributeEvent("error"));
  }
  skipEvent() {
    this.emit("skip", this), this.attributeEvent("skip");
  }
  // Task 실행중 발생한 모든 이벤트는 start ~ end 이벤트 사이에 발생해야함
  checkComplete() {
    E(this, Er) && E(this, $r) && (this.completeEvent(), this.destroy(), this.completeTask());
  }
  //--------------------------------------
  // Task 진행 이벤트 - start
  //--------------------------------------
  startEvent() {
    O(this, Er, !1), O(this, $r, !1), this.emit("start", this);
  }
  startTask(e) {
    const r = () => {
      O(this, Er, !0), e(), this.checkComplete();
    };
    this.attributeEvent("start", r);
  }
  start(e, r) {
    e();
  }
  startAfterEvent() {
    this.emit("startAfter", this), this.attributeEvent("startAfter");
  }
  //--------------------------------------
  // Task 진행 이벤트 - run
  //--------------------------------------
  runEvent() {
    this.emit("run", this), this.attributeEvent("run");
  }
  // TaskItem 기능 구현
  run(e, r) {
    this.undefinedItem ? console.log(`${this.tab}%c[${this.nodeName} 등록 안됨]`, C.warn, this.info) : console.log(`${this.tab}%c[${this.nodeName} 구현 안됨]`, C.err, this.info), e();
  }
  //--------------------------------------
  // Task 진행 이벤트 - end
  //--------------------------------------
  endBeforeEvent() {
    this.emit("endBefore", this), this.attributeEvent("endBefore");
  }
  end(e, r) {
    e();
  }
  endEvent() {
    this.emit("end", this);
  }
  endTask(e) {
    const r = () => {
      O(this, $r, !0), e(), this.checkComplete();
    };
    this.attributeEvent("end", r);
  }
  //--------------------------------------
  // Task Complete 이벤트
  //--------------------------------------
  completeEvent() {
    this.debug && console.log(`${this.tab}%c[${this.nodeName} 완료]`, C.taskitem, this.info), this.emit("complete", this);
  }
  completeTask() {
    this.attributeEvent("complete", null, !0);
  }
  // 노드에 이벤트가 있는지 확인
  attributeEvent(e, r = null, n = !1) {
    let s = e.toLowerCase();
    try {
      const o = this.info.attrs["on" + s];
      o && Ca(this.args, o);
      const a = Sr + s, u = this.info.attrs[a];
      if (!u)
        return r == null ? void 0 : r();
      const l = () => {
        this.debug && console.log(`${this.tab}%c(${a}) %s <${this.nodeName}>`, C.event, u, this.info.attrs);
        const c = s === "complete" ? this.depth : this.depth + 1;
        os(u, this.args, r, c);
      };
      n ? setTimeout(l, 0) : l();
    } catch (o) {
      console.error("[Attribute 이벤트 에러]", o);
    }
  }
  // 필요한 task 이벤트 목록 찾기
  getInlineEvents() {
    const e = ["start", "end", "complete"], r = (s, o) => {
      if (!s.startsWith(o) || s === o)
        return;
      const a = s.substring(o.length);
      return e.includes(a) ? "" : a;
    };
    let n;
    for (const s in this.info.attrs) {
      let o = r(s, "on");
      o = o || r(s, Sr), o && (n || (n = []), n.push(o));
    }
    return n;
  }
  // 필요한 task 이벤트 발송
  // - target (이벤트 emitter)
  // - events (이벤트 type 목록)
  addProxyEventDispatcher(e) {
    const r = this.getInlineEvents();
    if (!(r != null && r.length))
      return;
    const n = this.eventProxyHandler.bind(this);
    r.forEach((s) => e.on(s, n)), this.proxyEvents || (this.proxyEvents = /* @__PURE__ */ new Map()), this.proxyEvents.set(e, () => {
      r.forEach((s) => e.off(s, n));
    });
  }
  // 이벤트 실행 (code 실행)
  eventProxyHandler(e) {
    this.attributeEvent(e.type);
  }
  //--------------------------------------
  // 작업이 종료되어 리소스를 모두 해지
  //--------------------------------------
  destroy() {
    if (this.proxyEvents) {
      for (const e of this.proxyEvents.values())
        e == null || e();
      this.proxyEvents = null;
    }
  }
}
fn = new WeakMap(), hn = new WeakMap(), br = new WeakMap(), Er = new WeakMap(), $r = new WeakMap();
j("TaskInterface", ru);
class ud extends ru {
  dynamic(t) {
    let e = this.getCondition();
    if (e === void 0) {
      super.dynamic(t);
      return;
    }
    if (e) {
      const s = this.attr("then");
      if (!s) {
        super.dynamic(t);
        return;
      }
      os(s, this.args, (o) => {
        o ? this.dispatchError(o) : super.dynamic(t);
      }, this.depth + 1);
      return;
    }
    const r = this.attr("else");
    if (r && os(r, this.args, (s) => {
      s ? this.dispatchError(s) : super.dynamic(t);
    }, this.depth), "if-break" in this.info.attrs) {
      const s = this.attr("id") || kt.temporaryID();
      k() && console.log(`${this.tab}%c# (if-break) ${s}: 실행중인 task를 멈춤`, C.info), D.$break.add(s, () => {
        this.dynamic(t);
      });
      return;
    }
    return this.info.skipedByCondition = !0, k() && console.log(`${this.tab}%c# (skip)`, C.info, this.info), !0;
  }
  getCondition() {
    const t = "if-break" in this.info.attrs;
    if (!("if" in this.info.attrs) && !t)
      return;
    let r;
    return t ? (r = this.attr("if-break", "code"), k() && console.log(`${this.tab}%c# (if-break) 결과 : ${r}`, C.info)) : (r = this.attr("if", "code"), k() && console.log(`${this.tab}%c# (if) 결과 : ${r}`, C.info)), !!r;
  }
}
var si, nu, We;
class ur extends ud {
  constructor() {
    super();
    // setTimer 기능 추가
    P(this, si);
    // resolve 함수가 실행되었는지 확인
    x(this, "_run_is_closed", !1);
    // timer attribute
    // 종료 시점을 직접 지정할때
    P(this, We, void 0);
  }
  async dynamic(e) {
    if (!("delay" in this.info.attrs))
      return super.dynamic(e);
    const n = this.attr("delay", "code");
    return await new Promise((o, a) => {
      setTimeout(async () => {
        const u = super.dynamic(e);
        o(u);
      }, n);
    });
  }
  bindHandler(e) {
    let {
      start: r,
      end: n
    } = super.bindHandler(e);
    const s = Xt(this, si, nu).bind(this);
    return {
      start: r,
      run: s,
      end: n
    };
  }
  get resolved() {
    return this._run_is_closed;
  }
  /*
  // timer 없어도 resolve 호출하지 않음
  timeout(false);
  // resolved 체크 후 resolve 즉시 호출
  timeout(true);
  // timer 없으면 resolve 즉시 호출
  timeout();
  */
  run(e, r, n) {
    super.run(n, r);
  }
  //-------------------------------------
  // Attribute: timer="시간 (ms)"
  // 일장 시간 후 강제 resolve 호출함
  //-------------------------------------
  exitRunFunction(e, r) {
    e();
  }
  setTimer(e, r) {
    const n = this.attr("timer", "number");
    if (!n || isNaN(n)) {
      r === void 0 && this.timerNullity(e);
      return;
    }
    O(this, We, setTimeout(() => {
      this.timerReached(e);
    }, n));
  }
  timerNullity(e) {
    e == null || e();
  }
  timerReached(e) {
    e == null || e();
  }
  clearTimer() {
    E(this, We) && clearTimeout(E(this, We)), O(this, We, null);
  }
}
si = new WeakSet(), nu = function(e, r) {
  const n = () => {
    this._run_is_closed || (this._run_is_closed = !0, this.clearTimer(), this.exitRunFunction(e, r));
  };
  this.run(
    () => {
      n();
    },
    (s) => {
      this._run_is_closed || (this._run_is_closed = !0, this.clearTimer(), r(s));
    },
    // end: false - timer 없어도 resolve 호출하지 않음
    // end: undefined - timer 없으면 resolve 즉시 호출
    // end: true - resolved 체크 후 resolve 즉시 호출
    (s) => {
      if (s) {
        this.resolved || e();
        return;
      }
      this.setTimer(n, s);
    }
  );
}, We = new WeakMap();
class ld extends ur {
  constructor() {
    super(...arguments);
    x(this, "key");
  }
  run(e, r, n) {
    const s = this.attr("id");
    k() && console.log(`%c# (break) ${s}: 실행중인 task를 멈춤`, C.info), D.$break.add(s, e), this.key = s, n(!1);
  }
  timerReached(e) {
    this.key && (D.$break.release(this.key), this.key = null), e == null || e();
  }
}
j("Break", ld);
class cd extends ur {
  run(t, e, r) {
    const n = this.attr("id");
    if (n) {
      if (!D.$break.has(n))
        return t();
      k() && console.log(`%c# (break-release) ${n}: break 상태 해제 후 계속 진행`, C.info), D.$break.release(n);
    }
    r();
  }
}
j("Break-release", cd);
const bn = "취소됨", En = "건너뜀";
class fd extends ur {
  exitRunFunction(t, e) {
    e(bn);
  }
  run(t, e, r) {
    r();
  }
}
j("Cancel", fd);
class hd extends ur {
  exitRunFunction(t, e) {
    e(En);
  }
  run(t, e, r) {
    r();
  }
}
j("Exit", hd);
function os(i, t, e, r) {
  var h, p, _, d;
  const {
    id: n,
    args: s
  } = Fs(i);
  t.event || (t.event = window.event), eu(t);
  let o;
  s ? o = Pa(t, s) : o = t;
  const a = yn(t, n), u = ((_ = (p = (h = t == null ? void 0 : t.event) == null ? void 0 : h.target) == null ? void 0 : p.getParseOption) == null ? void 0 : _.call(p)) || ((d = t == null ? void 0 : t.getParseOption) == null ? void 0 : d.call(t));
  if (!u)
    return;
  let { alias: l, taskID: c } = D.$ns.findAlias(a, u);
  const f = u.provider.$task.get(c);
  js(f, o, e, r);
}
function js(i, t, e, r = 0) {
  if (typeof i == "string")
    throw new Error("(v0.2.1~) runAsTask : taskID가 아닌 task 참조 객체를 전달해야함");
  eu(t), t.event || (t.event = window.event);
  const n = Ne[0], o = _n.taskItem(n)({
    nodeName: n,
    info: i,
    args: t,
    depth: r
  });
  if (!o)
    return e == null ? void 0 : e();
  as(o, e, "TASK");
}
function dd(i, t, e, r) {
  const {
    list: n = [],
    attrs: { sync: s }
  } = i, o = n.map((u) => (l) => {
    u._depth = r, u._args = t, pd(u, l);
  });
  Xa(s)(o).then(() => {
    e == null || e();
  }).catch((u) => {
    u === bn || u === En || console.error("[runTask 에러]", u), e == null || e(u);
  });
}
function pd(i, t) {
  const {
    nodeName: e,
    _args: r,
    _depth: n = 0
  } = i;
  let s;
  const o = _n.taskItem(e);
  if (!o) {
    s = md(i), as(s, t, "unknown");
    return;
  }
  if (s = o({
    nodeName: e,
    info: i,
    args: r,
    depth: n
  }), !s)
    return t == null ? void 0 : t();
  as(s, t, "ITEM");
}
function md(i) {
  const {
    nodeName: t,
    _args: e,
    _depth: r = 0
  } = i, s = _n.taskItem("TaskInterface")({
    nodeName: t,
    info: i,
    args: e,
    depth: r
  });
  return s.undefinedItem = !0, s;
}
function Ho(i) {
  let t = "";
  for (; --i >= 0; )
    t += "	";
  return t;
}
async function as(i, t, e = "") {
  if ((() => {
    if (!k() || e !== "TASK")
      return;
    const { info: s } = i, o = Ho(i.depth);
    if (s) {
      const a = (s == null ? void 0 : s.attrs.id) || "";
      console.log(`${o}%c<${a} (호출)>`, C.taskin, s);
    } else
      console.log(`${o}%c<TASK 호출: 알수없는 TASK>`, C.err, s);
  })(), await i.dynamic()) {
    t();
    return;
  }
  D.$running.add(i, t);
  const n = (s) => {
    i.off("cancel", n), i.off("error", n), i.off("complete", n), i.off("skip", n);
    const o = s.type === "skip", a = s.type === "cancel" || s.type === "error";
    (() => {
      if (!k())
        return;
      const u = s.detail.info, l = (u == null ? void 0 : u.attrs.id) || "";
      if (e === "TASK") {
        const c = Ho(i.depth), f = a ? s.detail.error : u;
        let h = "완료";
        s.type === "cancel" && (h = "취소"), s.type === "error" && (h = "에러"), console.log(`${c}%c<${l} (${h})>`, C.taskout, f);
      }
    })(), D.$running.remove(i), a || o ? t == null || t(s.detail.error) : t == null || t();
  };
  i.once("cancel", n), i.once("error", n), i.once("complete", n), i.once("skip", n);
}
const gd = "$$firstrun";
var te, he, oi, iu, ai, su, ui, ou;
class _d {
  constructor() {
    P(this, oi);
    P(this, ai);
    P(this, ui);
    // App 로드 후 처음으로 실행될 task 목록
    P(this, te, void 0);
    // 사용안함
    P(this, he, void 0);
  }
  // FirstRunTask은 처음 한번만 사용하므로 원본 그냥 사용
  get() {
    return E(this, te);
  }
  get length() {
    var t, e;
    return (e = (t = E(this, te)) == null ? void 0 : t.list) == null ? void 0 : e.length;
  }
  get state() {
    const t = !E(this, he), e = E(this, he) === "started", r = E(this, he) === "finished";
    return {
      isReady: t,
      running: e,
      finished: r
    };
  }
  //--------------------------------------
  // 처음 실행될 task 데이터
  //--------------------------------------
  // #firstrun 등록
  // id가 없는 경우 : 등록 안하고 처음에 바로 실행 (node depth 1인 경우에만)
  // task 노드 depth 1의 no-id task는 자동 실행
  // task 노드 depth 2 이하의 no-id task는 자동 실행 하지 않음
  // (task 노드 depth 1의 조건으로 실행 여부가 이미 결정됨)
  add(t) {
    E(this, te) || Xt(this, ui, ou).call(this), E(this, te).list.push(t);
  }
  //--------------------------------------
  // 실행
  //--------------------------------------
  async run() {
    if (!this.length)
      return;
    const {
      list: t = [],
      attrs: { sync: e }
    } = this.get(), r = t.map((n) => (s) => {
      js(n, [], s);
    });
    return Xt(this, oi, iu).call(this), await new Promise((n) => {
      Xa(e)(r).then(() => {
        Xt(this, ai, su).call(this), n(), O(this, te, null);
      }).catch((o) => {
        console.error("[firstRun]", o), n();
      });
    });
  }
}
te = new WeakMap(), he = new WeakMap(), oi = new WeakSet(), iu = function() {
  O(this, he, "started");
}, ai = new WeakSet(), su = function() {
  O(this, he, "finished");
}, ui = new WeakSet(), ou = function() {
  O(this, te, new Rr({
    id: gd,
    // sync: 'series' (default: series)
    attrs: {},
    // task interface 구현 객체 정보
    list: []
    // parseOption: taskItem 마다 parseOption 있음
  }));
};
class yd extends xe {
  // key: id, value: resolve
  //--------------------------------------
  // 현재 break 상태에 있는 task 해지
  //--------------------------------------
  // <break>로 멈춘 task를 다시 진행시켜줌
  // $break.release(key);
  release(t) {
    if (!this._map.has(t))
      return;
    const e = this._map.get(t);
    this.remove(t), k() && console.log(`%c# (release) ${t}: 멈춘 작업 다시 시작`, C.info), e == null || e();
  }
}
class vd extends xe {
  // key: id, value: resolve (complete)
  //--------------------------------------
  // 현재 실행중인 task instance 등록
  //--------------------------------------
  /*
       // TODO: 실행중인 모든 task를 종료함
       isStop: false
       break() {
  
       }
       release(){
  
       }
       */
}
class Li extends xe {
  constructor() {
    super();
    x(this, "_$id");
    this._$id = {};
  }
  get $id() {
    return this._$id;
  }
  // $provider.$sound.destroy('미디어 ID', 'all');
  // destroyOption: 'all' | ''
  destroy(e, r) {
    I() && console.log(`%c# media (destroy) ${e}: ${r || ""}`, C.info);
    const n = this.get(e);
    if (n) {
      if (n.destroy.forEach((s) => s()), n.destroy = [], r !== "all") {
        n.media.stop(), n.media.set("src", null), n.media.set("src", ""), n.media.clearConfig();
        const s = La();
        for (const o in s)
          n.media.set(o, s[o]);
        return;
      }
      this.remove(e), n.media.dispose(), n.dom.remove();
    }
  }
  //----------------------------------
  // <media> task 접근 객체 (media id 관리)
  //----------------------------------
  add(e, r) {
    if (e === "destroy") {
      let n = this.msg_duplication(e);
      n += `
"destroy" 이름은 사용중입니다. 아이디로 사용할 수 없습니다.`, console.error(n);
      return;
    }
    if (super.add(e, r))
      return Object.defineProperty(this._$id, e, {
        configurable: !0,
        writable: !1,
        // media 객체를 리턴함
        value: r.media
      }), r;
  }
  remove(e) {
    if (super.remove(e))
      return delete this._$id[e], e;
  }
}
var de;
const ct = class ct {
  constructor() {
    // 디버깅용 인스턴스 구별자
    x(this, "$$id");
    //-----------------------------------
    // 실행 지연된 (preload) provider 목록
    //-----------------------------------
    P(this, de, void 0);
    this.$$id = kt.temporaryID();
  }
  get $id() {
    return ct._$id;
  }
  get length() {
    var t;
    return ((t = ct._map) == null ? void 0 : t.size) || 0;
  }
  // 등록된 전체 목록
  getAll() {
    return ct._map;
  }
  clear() {
    ct._map.clear();
  }
  has(t) {
    return ct._map.has(t);
  }
  get(t) {
    return ct._map.get(t);
  }
  // 중복 메세지
  msg_duplication(t) {
    return `중복된 ${this.constructor.name} 아이디가 있습니다. (id: ${t})`;
  }
  // 데이터 추가
  /*
  item: {
      content: 로드된 문서의 innerHTML
  }
  */
  add(t, e) {
    if (t !== void 0 && ct._map.has(t)) {
      console.error(this.msg_duplication(t));
      return;
    }
    return ct._map.set(t, e), Object.defineProperty(ct._$id, t, {
      configurable: !0,
      writable: !1,
      value: e
    }), e;
  }
  remove(t) {
    if (ct._map.has(t))
      return ct._map.delete(t), t;
  }
  //-----------------------------------
  // 로드된 문서 원본 (content)
  //-----------------------------------
  // data: { content }
  hasContent(t) {
    var e;
    return !!((e = this.get(t)) != null && e.content);
  }
  getContent(t) {
    var e;
    return (e = this.get(t)) == null ? void 0 : e.content;
  }
  addContent(t, e) {
    const r = this.get(t);
    r ? r.content = e : this.add(t, { content: e });
  }
  // 본문 (paarent DOM) attach 후 실행되도록 뒤로 미룸
  // ns 값을 id로 사용하면 안됨 (같은 문서를 로드하는 경우 중복될 수 있음)
  addRun(t) {
    E(this, de) || O(this, de, /* @__PURE__ */ new Map()), E(this, de).set(kt.temporaryID(), t), k() && console.log(`# 로드된 문서 실행 스케쥴 등록 : ${t.ns}`);
  }
  // (중요) 등록된 순서대로 실행됨
  // root --> include .... 순으로 등록됨
  async each(t) {
    const e = E(this, de);
    if (e) {
      for (let [r, n] of e)
        if (await t(n))
          break;
    }
  }
  runClose() {
    O(this, de, null);
  }
};
de = new WeakMap(), x(ct, "_map", /* @__PURE__ */ new Map()), x(ct, "_$id", {});
let Xn = ct;
class wd extends xe {
  async run() {
    const t = this.getAll(), e = [];
    for (let [r, n] of t)
      e.push(n());
    await Promise.all(e), this.clear();
  }
}
var Ge, Ye, dn, us;
class Td extends xe {
  constructor() {
    super(...arguments);
    P(this, dn);
    //------------------------------
    // 스크립트 로드 (실행) 완료 체크
    //------------------------------
    P(this, Ge, void 0);
    P(this, Ye, 0);
  }
  // 데이터 추가
  add(e) {
    return super.add(kt.temporaryID(), e);
  }
  // DOM Attach
  async run() {
    let e = this.getAll();
    e = Array.from(e.entries());
    const r = [];
    for (let [n, { nodes: s, parseOption: o, done: a }] of e) {
      a && r.push(a);
      let u = o.parent;
      if (!u)
        continue;
      typeof u == "string" && (u = Rs(u, o.parentRoot()));
      let l;
      const c = o.shadowrootMode;
      c ? l = u.shadowRoot || u.attachShadow({ mode: c }) : l = u, await new Promise(async (f) => {
        for (let h of s)
          l.append(await Nt.toElementAsync(h));
        f();
      });
    }
    this.clear(), await new Promise((n) => {
      O(this, Ge, n), Xt(this, dn, us).call(this);
    }), r.forEach((n) => n());
  }
  get script() {
    return E(this, Ye);
  }
  addScriptCounter() {
    ++Ai(this, Ye)._;
  }
  removeScriptCounter() {
    --Ai(this, Ye)._, Xt(this, dn, us).call(this);
  }
}
Ge = new WeakMap(), Ye = new WeakMap(), dn = new WeakSet(), us = function() {
  E(this, Ye) === 0 && E(this, Ge) && setTimeout(() => {
    E(this, Ge).call(this), O(this, Ge, null);
  });
};
var pe, li, au;
class bd extends xe {
  constructor() {
    super();
    P(this, li);
    //-----------------------------------
    // NS 관리 (define, scope...)
    //-----------------------------------
    P(this, pe, void 0);
    this._$id = {};
  }
  // _$id;
  get $id() {
    return this._$id;
  }
  // (참고) NS를 따로 관리하지 않고 task 파싱할때 task 이름에 prefix로 미리 붙여놓으면
  // 호출할때 하나의 이름처럼 호출할 수 있음 (모두 전역으로 등록됨)
  // 예) "first-component:클릭" : 원래 이름처럼 등록
  // task["클릭"] ==> "first-component:클릭" 바꿔서 호출해줌
  // 데이터 추가
  // item : {alias, parseOption}
  add(e, r) {
    return e !== void 0 && this.has(e) && console.warn(`중복된 문서 NS가 등록됩니다. (${e})`), this._map.set(e, r), r.alias && (Xt(this, li, au).call(this, r.alias, e), Object.defineProperty(this.$id, r.alias, {
      configurable: !0,
      writable: !1,
      value: {
        ns: e,
        // provider: item.parseOption.provider
        parseOption: r.parseOption,
        $task: r.parseOption.provider.$task.$id
      }
    })), r;
  }
  getProvider(e) {
    var r;
    return (r = this.get(e)) == null ? void 0 : r.parseOption.provider;
  }
  getAlias(e) {
    var r;
    return (r = this.get(e)) == null ? void 0 : r.alias;
  }
  getNS(e) {
    return E(this, pe).get(e);
  }
  getProviderByAlias(e) {
    const r = this.getNS(e);
    return this.getProvider(r);
  }
  //-----------------------------------
  // $task 호출 구문 분석
  //-----------------------------------
  // taskID : NS 호출 형식이면 구문 분석해줌
  // 예) "first-component:클 릭"
  parseTaskID(e, r) {
    let n = "", s = "";
    if (e) {
      const u = e.split(":");
      s = me(u.pop()), n = u.pop();
    }
    n || (n = r ? this.getAlias(r.ns) : "global");
    let o = this.getNS(n), a = this.get(o);
    return {
      alias: n,
      taskID: s,
      parseOption: a.parseOption,
      provider: a.parseOption.provider
      // provider: this.getProviderByAlias(alias)
    };
  }
  // task 실행 context 찾기
  // 이벤트 핸들러에서 전달된 구문을 실행 가능하도록 지원함
  // 우선 순위 : taskID prefix > (parseOption ? NS) > global
  findAlias(e, r) {
    const n = e.split(":");
    e = me(n.pop());
    let s = n.pop(), o;
    return s ? (o = this.getProviderByAlias(s), {
      alias: s,
      taskID: e,
      task: o.$task.get(e)
    }) : (s = "global", r ? (s = this.getAlias(r.ns), o = this.getProviderByAlias(s), e in o.$task.$id || (s = "global", o = this.getProviderByAlias(s))) : o = this.getProviderByAlias(s), {
      alias: s,
      taskID: e,
      task: o.$task.get(e)
    });
  }
}
pe = new WeakMap(), li = new WeakSet(), au = function(e, r) {
  if (E(this, pe) || O(this, pe, /* @__PURE__ */ new Map()), E(this, pe).has(e)) {
    console.error(`이미 "${e}" 이름으로 등록된 데이터가 있습니다. (${r})`);
    return;
  }
  k() && console.log(`%c# NS 등록 (${e}) : ${r}`, C.include), E(this, pe).set(e, r);
};
const Ri = "$taskml";
class Ed {
  constructor() {
    // include 파일 정보 저장 (중복 로드안함)
    // include src와 로드된 데이터 등을 저장함
    x(this, "$include");
    // ns 관리
    x(this, "$ns");
    // <script> 코드에 inject되는 코드 임시 저장소
    x(this, "$inject");
    //-------------
    // 파싱 단계
    //-------------
    x(this, "$task");
    x(this, "$dom");
    x(this, "$moduleload");
    x(this, "$firstrun");
    //-------------
    // 런타임 단계
    //-------------
    x(this, "$js");
    x(this, "$break");
    x(this, "$running");
    x(this, "$sound");
    x(this, "$video");
    x(this, "$audio");
  }
  //----------------------------
  // 데이터 초기화
  //----------------------------
  // 새로운 NS 구성에 필요한 Provider 생성
  createProvider(t) {
    return {
      $include: (t == null ? void 0 : t.$include) ?? new Xn(),
      $task: (t == null ? void 0 : t.$task) ?? new Jh(),
      $dom: (t == null ? void 0 : t.$dom) ?? new Td(),
      $moduleload: (t == null ? void 0 : t.$moduleload) ?? new wd(),
      $firstrun: (t == null ? void 0 : t.$firstrun) ?? new _d()
    };
  }
  create(t) {
    this.$include = new Xn(), this.$ns = new bd(), this.$inject = new xe(), this.$dom = t.$dom, this.$moduleload = t.$moduleload, this.$firstrun = t.$firstrun, this.$task = t.$task, this.$js = new Mc(), this.$sound = new Li(), this.$video = new Li(), this.$audio = new Li(), this.$break = new yd(), this.$running = new vd();
    const e = this, r = {
      // <include> 문서 정보
      get $include() {
        return e.$include;
      },
      get $ns() {
        return e.$ns;
      },
      // injection 코드 임시 저장소
      get $inject() {
        return e.$inject;
      },
      // 사용 가능한 task item 태그 목록
      get tags() {
        return _n.getAll();
      },
      // task 실행 함수
      // get $task() { return $self.$task; },
      // js task 아이템 (this) context
      get $js() {
        return e.$js;
      },
      // <sound> task 접근 객체 (sound id 관리)
      get $sound() {
        return e.$sound;
      },
      // <video> task 접근 객체 (video id 관리)
      get $video() {
        return e.$video;
      },
      // <audio> task 접근 객체 (audio id 관리)
      get $audio() {
        return e.$audio;
      },
      // <break>로 멈춘 task를 다시 진행시켜줌
      get $break() {
        return e.$break;
      }
      // <break>로 멈춘 task를 다시 진행시켜줌
      // get $break() { return $self.$break; },
    };
    this.binding(window, Ri, () => r);
  }
  //--------------------------------
  // shorthand 글로벌 객체 생성
  //--------------------------------
  // 속성 바인딩
  binding(t, e, r) {
    Object.defineProperty(t, e, {
      configurable: !0,
      writable: !1,
      get value() {
        return r();
      }
    });
  }
  shorthand() {
    const t = window[Ri];
    this.create$taskProperty(), this.binding(window, "$sound", () => t.$sound.$id), this.binding(t.$sound.$id, "destroy", () => t.$sound.destroy.bind(t.$sound)), this.binding(window, "$video", () => t.$video.$id), this.binding(t.$video.$id, "destroy", () => t.$video.destroy.bind(t.$video)), this.binding(window, "$audio", () => t.$audio.$id), this.binding(t.$audio.$id, "destroy", () => t.$audio.destroy.bind(t.$audio)), this.binding(window, "$break", () => t.$break), this.binding(window, "$js", () => t.$js.getContext()), this.binding(window, "$include", () => t.$include.$id), this.binding(window, "$ns", () => t.$ns.$id);
  }
  create$taskProperty() {
    const t = window[Ri];
    Object.defineProperty(t, "$task", {
      configurable: !0,
      writable: !1,
      value: D.$ns.$id
    }), window.$task = new Proxy(t.$task, {
      get(e, r, n) {
        var l;
        let s;
        window.hasOwnProperty("$inject") && (s = $inject == null ? void 0 : $inject.scriptElement);
        const { alias: o, taskID: a, task: u } = D.$ns.findAlias(r, s == null ? void 0 : s.getParseOption());
        return (l = D.$ns.$id[o]) == null ? void 0 : l.$task[a];
      }
    });
  }
  /*
      // 이벤트 핸들러에서 전달된 구문을 실행 가능하도록 지원함
      toRunableLiteral(id, args) {
  
          const globalName = GLOBAL_TASK_NAME;
  
          // ["아이디"] 속성 접근자로 호출
          // (dot 구문으로 호출할 수 없는 아이디인 경우도 있으므로)
          if (id in this.$task.$id) {
              return `$task["${id}"](${args})`;
              // return `${globalName}.$task.$id["${id}"](${args})`;
          }
  
          // if (id in this.$sound.$id) {
          //     // return `window.$sound["${id}"](${args})`;
          //     return `${globalName}.$sound.$id["${id}"](${args})`;
          // }
  
          //------------------
          // id --> 메서드 호출로 취급 : 이런 경우는 허용안함
  
           if (id in this.$break) {
           // return `window.$break["${id}"](${args})`;
           return `${globalName}.$break["${id}"](${args})`;
           }
  
           const context = this.$js.getContext();
           if (id in context) {
           // return `window.$js["${id}"](${args})`;
           return `${globalName}.$js.context?.["${id}"](${args})`;
           }
  
          //------------------
          // id가 아닌 일반 코드 실행으로 취급함
  
          // return `${globalName}?.${id}(${args})`;
          return `${id}(${args})`;
      }
      */
}
const D = new Ed(), Wo = "appCreated", Go = "domCreated";
let Pn;
function $d() {
  document.addEventListener("DOMContentLoaded", (i) => {
    i.stopPropagation(), i.stopImmediatePropagation(), i.preventDefault(), console.warn("DOMContentLoaded 이벤트 지연 시킴"), Pn = i;
  }, {
    capture: !0,
    once: !0
  });
}
async function uu(i, t) {
  const e = (t == null ? void 0 : t.type) === "app";
  k() && (console.time("# DOM 생성에 걸린 시간은?"), console.log("%c# DOM (& script) Attach 실행", C.include, i.$dom.length), console.log("* 로드된 Script 개수 : ", i.$dom.script)), await i.$include.each(async (r) => {
    await r.provider.$dom.run();
  }), k() && (console.warn("외부 script에는 주입되는 코드가 없습니다."), console.log("%c# DOM (& script) Attach 실행 완료!", C.include), console.timeEnd("# DOM 생성에 걸린 시간은?")), e && (k() && console.log(`%c# Event ('${Go}') 실행`, C.include), document.dispatchEvent(new CustomEvent(Go))), k() && console.log("%c# 모듈 로드 (실행)", C.include, i.$moduleload.length), await i.$include.each(async (r) => {
    await r.provider.$moduleload.run();
  }), k() && (console.warn("외부 모듈에는 주입되는 코드가 없습니다."), console.log("%c# 모듈 로드 (실행) 완료!", C.include)), e && Pn && (console.warn("DOMContentLoaded 이벤트 Dispatch!"), window.document.dispatchEvent(Pn), Pn = null), e && (k() && console.log(`%c# Event ('${Wo}') 실행`, C.include), document.dispatchEvent(new CustomEvent(Wo))), await i.$include.each(async (r) => {
    var n;
    if ((n = i.$firstrun) != null && n.length && (await Ad(r), e && r.isRootHTML()))
      return !0;
  }), i.$include.runClose();
}
async function Ad(i) {
  return new Promise(async (t) => {
    k() && console.log("%c# Task 자동 실행", C.info, i.ns), await i.provider.$firstrun.run(), k() && console.log("%c# Task 자동 실행 완료!", C.info, i.ns), t();
  });
}
async function xd(i, t) {
  const e = i.provider;
  await e.$dom.run(), await e.$moduleload.run(), e.$firstrun.length && (k() && console.log(`%c# Include Task 실행 (${i.ns})`, C.info), await e.$firstrun.run(), k() && console.log(`%c# Include Task 실행 완료! (${i.ns})`, C.info)), t == null || t();
}
const Sd = "src", lu = "preload", cu = "selector", fu = "shadowroot";
async function Od(i, t) {
  var o;
  const e = (o = i[lu]) == null ? void 0 : o.trim();
  k() && console.log(`%c# 프리 로드 (${e}): `, C.include, i);
  const r = D.createProvider({
    $include: t.provider.$include,
    // DOM 파싱은 본문 > 로드 문서 순으로 파싱함
    // $dom: option.provider.$dom,
    // preload 중에는 $task (파싱)위치에 따라 자동으로 오버라이딩됨
    // 로드된 문서의 task를 global로 취급하지 않으려면 별도로 괸리해야 함
    // $task: new TaskProvider(),
    // 같은 객체를 참조 (NS로 구분하지만 결국 같은 global task를 실행시키도록 함)
    // $task: option.provider.$task,
    $task: D.$ns.getProviderByAlias("global").$task,
    // 프리로드 되는 데이터도 파싱(실행) 순서를 본문과 함께 관리
    $moduleload: t.provider.$moduleload,
    $firstrun: t.provider.$firstrun
  }), n = new tn({
    provider: r,
    // include문 작성할때 root 기준 경로로 작성하는 것으로 함 (dirname 또는 $inject 사용)
    src: e,
    owner: t.owner,
    // owner: window.location.href,
    shadowrootMode: i[fu],
    parent: i[cu],
    parentRoot: Ns(t)
  });
  D.$ns.add(n.ns, {
    // ns에 콜론 있을수 있으므로 id 사용함
    alias: kt.temporaryID(),
    // alias: newOption.ns,
    parseOption: n
  });
  const s = await du(n.uri);
  await Vs(s, n), k() && console.log(`%c# 프리 로드 (${e}) 완료: `, C.include, "익명 task는 본문 실행 목록에 포함됨");
}
async function kd(i, t) {
  var o;
  const e = (o = i[Sd]) == null ? void 0 : o.trim();
  k() && console.log(`%c# Include (${e}) 문서 로드: `, C.include, i);
  const r = D.createProvider({
    // 같은 객체를 참조 (NS로 구분하지만 결국 같은 global task를 실행시키도록 함)
    // $task: option.provider.$task,
    $task: D.$ns.getProviderByAlias("global").$task
  }), n = new tn({
    provider: r,
    // include문 작성할때 root 기준 경로로 작성하는 것으로 함 (dirname 또는 $inject 사용)
    src: e,
    owner: t.owner,
    // owner: window.location.href,
    shadowrootMode: i[fu],
    parent: i[cu],
    parentRoot: Ns(t)
  });
  D.$ns.add(n.ns, {
    // ns에 콜론 있을수 있으므로 id 사용함
    alias: kt.temporaryID(),
    // alias: newOption.ns,
    parseOption: n
  });
  const s = await du(n.uri);
  await Vs(s, n), await uu(r), k() && console.log(`%c# Include (${e}) 문서 로드 완료`, C.include);
}
async function Bs(i, t, e = !1) {
  var a;
  const r = i.getAttribute("template"), n = await Pd(r, t);
  if (!n)
    return;
  const s = ((a = n == null ? void 0 : n.dataset) == null ? void 0 : a.name) || "data", o = async (u) => {
    const l = (c) => {
      if (u) {
        const f = zn(c, s);
        c = ar(f)(u);
      }
      return c;
    };
    await Vs(n.innerHTML, t, l);
  };
  return e && n.remove(), o;
}
async function Pd(i, t) {
  if (!i)
    return;
  let e = Ns(t)();
  return k() && console.log("# template: 탐색 범위 적용: ", i, e), e.querySelector(i);
}
function hu(i, t = "template-data") {
  if (!i.hasAttribute(t))
    return;
  const e = i.getAttribute(t), r = di(e);
  return ar(r)();
}
async function Vs(i, t, e) {
  i = t.getTemplateString(i);
  const { defines: r, templates: n, content: s } = Dd(i);
  let o = s.innerHTML;
  e && (o = e(o));
  let a = [
    ...r,
    ...n,
    ...Cd(o)
  ];
  if (!(a != null && a.length))
    return;
  const { provider: u } = t;
  u.$include.addRun(t);
  const l = { parseOption: t };
  u.$dom.add(l), l.nodes = await vi(a, t);
}
async function du(i) {
  if (k() && console.log("* 로드 경로: ", i), D.$include.hasContent(i))
    return D.$include.getContent(i);
  const t = await (await fetch(i)).text();
  return D.$include.addContent(i, t), t;
}
function Cd(i) {
  if (!i)
    return;
  const t = new DOMParser().parseFromString(i, "text/html"), e = t == null ? void 0 : t.head, r = t == null ? void 0 : t.body;
  return Array.from(e.childNodes).concat(Array.from(r.childNodes));
}
function Dd(i) {
  let t;
  if (typeof i == "string")
    t = i;
  else if (i instanceof HTMLElement)
    t = i.innerHTML;
  else
    return i;
  let e = document.createElement("template");
  e.innerHTML = t;
  const r = e.content.querySelectorAll("define");
  r.forEach((s) => s.remove());
  const n = e.content.querySelectorAll("template");
  return n.forEach((s) => s.remove()), {
    defines: r,
    templates: n,
    content: e
  };
}
const Md = "video-controller-progress", Yo = "progress-anchor";
class Ld extends vn {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    x(this, "anchorDOM");
    /*
    // time: second
    const anchorList = [
        // { idx: 0, time: 5.000, thumbnail: './test/video/interaction/thumbnail_1005.png' },
        // { idx: 1, time: 9, thumbnail: './test/video/interaction/thumbnail_1009.png' }
        { idx: 0, time: 12.000, text: '본문 1' },
        { idx: 1, time: 24.000, text: '본문 2' }
    ]
    */
    x(this, "anchorList");
  }
  // Override
  async create() {
    const e = this.containerDOM.querySelector(`[${Md}="time"]`);
    if (!e)
      return;
    const r = e.querySelector(`[${Yo}]`);
    if (!r)
      return;
    this.anchorDOM = r;
    const n = hu(r);
    console.error("TODO: buildTemplate 리팩토링 적용안됨"), await Bs(r, async (s) => {
      const o = (u) => {
        for (; typeof u == "function"; )
          u = u();
        return u;
      }, a = async (u) => {
        let l = await (s == null ? void 0 : s(u, r));
        l && Array.from(l).forEach((c) => {
          wa(() => {
            const h = o(c);
            return u.dom = h, this.configAnchor(h, u), h;
          }, r);
        });
      };
      for (const u of n)
        await a(u);
      this.anchorList = n;
    }), this.resetPosition();
  }
  //---------------------------------------
  // 비디오 업데이트 이벤트
  //---------------------------------------
  update(e) {
    switch (e.type) {
      case "durationchange":
        this.resetPosition();
        break;
    }
  }
  //---------------------------------------
  // Anchor 설정
  //---------------------------------------
  configAnchor(e, r) {
    e.setAttribute(`${Yo}-item`, "");
    const n = (s) => s.stopPropagation();
    e.addEventListener("mousedown", n), Qe(() => {
      e.removeEventListener("mousedown", n);
    });
  }
  // duration이 바뀌어 새로 위치 설정함
  resetPosition() {
    var e;
    (e = this.anchorList) == null || e.forEach((r) => {
      const n = r.dom;
      if (!n)
        return;
      const s = this.media.getPercent(r.time);
      s < 0 || s > 100 ? n.style.visibility = "hidden" : n.style.visibility = "", n.setAttribute("data-value", s), n.style.left = s + "%";
    });
  }
}
const Xo = "video-container", Rd = "video-controller";
class Nd extends Da {
  constructor() {
    super(...arguments);
    x(this, "media");
    // skin DOM
    x(this, "containerDOM");
    // template controller
    x(this, "controller");
    // 생성된 control 객체
    x(this, "buttonsControl");
    x(this, "progressControl");
    x(this, "volumeControl");
    x(this, "timeControl");
    x(this, "anchorControl");
    x(this, "isWaiting", !1);
  }
  async create(e) {
    const r = hu(this.element);
    console.error("TODO: buildTemplate 리팩토링 적용안됨"), await Bs(this.element, async (n) => {
      const s = this.element.parentElement, o = await (n == null ? void 0 : n(r, s));
      o && Array.from(o).forEach((a) => {
        wa(a, s);
      });
    }), Al(e, () => {
      this.createTemplate();
    });
  }
  createTemplate() {
    this.media = Hn.create("video", this.element, {}), this.findDOM(), this.containerDOM && (this.buttonsControl = new Ec(this.containerDOM, this.media), this.buttonsControl.create(), this.progressControl = new Sc(this.containerDOM, this.media), this.progressControl.create(), this.volumeControl = new Cc(this.containerDOM, this.media), this.volumeControl.create(), this.timeControl = new Dc(this.containerDOM, this.media), this.timeControl.create()), this.createUpdateEvent();
  }
  findDOM() {
    var r;
    let e = this.element.parentElement;
    for (; e !== document.body; ) {
      if (e.hasAttribute(Xo)) {
        this.containerDOM = e;
        break;
      }
      e = e.parentElement;
    }
    if (!this.containerDOM) {
      k() && ("controls" in this.attrs || console.warn(`[${Xo}] Attribute을 찾을 수 없습니다.`));
      return;
    }
    this.controller = this.containerDOM.querySelector(`[${Rd}]`), (r = this.controller) == null || r.classList.add("disable");
  }
  // 기본 controller 업데이트
  updateDefaultController(e) {
    var r, n, s, o, a;
    (r = this.buttonsControl) == null || r.update(e), (n = this.progressControl) == null || n.update(e), (s = this.volumeControl) == null || s.update(e), (o = this.timeControl) == null || o.update(e), (a = this.anchorControl) == null || a.update(e);
  }
  checkAnchorCreated() {
    this.containerDOM && (this.anchorControl || (this.anchorControl = new Ld(this.containerDOM, this.media), this.anchorControl.create()));
  }
  //---------------------------------------
  // 업데이트 이벤트
  //---------------------------------------
  createCustomEvent() {
    const e = this.media.duration(), r = this.media.currentTime(), n = this.media.remainTime, s = this.media.getPercent();
    return new CustomEvent("update", {
      detail: {
        media: this.media,
        originalEvent: event,
        time: {
          percent: s,
          currentTime: r,
          duration: e,
          remainTime: n
        }
      },
      cancelable: !0
    });
  }
  createUpdateEvent() {
    const e = (r) => {
      var s;
      this.update(r);
      const n = this.createCustomEvent(r);
      this.element.dispatchEvent(n), (s = this.controller) == null || s.dispatchEvent(n), !n.defaultPrevented && this.updateDefaultController(r);
    };
    this.media.on("loadeddata", e), this.media.on("error", e), this.media.on("waiting", e), this.media.on("ended", e), this.media.on("canplay", e), this.media.on("canplaythrough", e), this.media.on("playing", e), this.media.on("play", e), this.media.on("pause", e), this.media.on("durationchange", e), this.media.on("timeupdate", e), this.media.on("seeking", e), this.media.on("seeked", e), this.media.on("ratechange", e), this.media.on("volumechange", e), this.media.on("fullscreen", e), this.media.on("addtrack", e), this.media.on("removetrack", e), this.media.on("trackChange", e), Qe(() => {
      this.media.off("loadeddata", e), this.media.off("error", e), this.media.off("durationchange", e), this.media.off("timeupdate", e), this.media.off("seeking", e), this.media.off("seeked", e), this.media.off("playing", e), this.media.off("play", e), this.media.off("pause", e), this.media.off("canplay", e), this.media.off("canplaythrough", e), this.media.off("waiting", e), this.media.off("ended", e), this.media.off("ratechange", e), this.media.off("volumechange", e), this.media.off("fullscreen", e), this.media.off("addtrack", e), this.media.off("removetrack", e), this.media.off("trackChange", e);
    });
  }
  // controller에 상태 표시 (class 추가/제거)
  update(e) {
    const r = this.containerDOM, n = this.media.currentTime(), s = this.media.paused();
    this.isWaiting = !1;
    const o = e.type;
    switch (o) {
      case "error":
        this.isWaiting = !1, r == null || r.classList.remove("waiting", "canplay", "canplaythrough"), r == null || r.classList.add("disable"), r == null || r.classList.add(o);
        break;
      case "waiting":
        this.isWaiting = !0, r == null || r.classList.remove("disable"), r == null || r.classList.add(o);
        break;
      case "ended":
        r == null || r.classList.add(o);
        break;
      case "canplay":
        this.isWaiting = !1, r == null || r.classList.remove("waiting", "disable", "canplaythrough"), r == null || r.classList.add(o);
        break;
      case "canplaythrough":
        this.isWaiting = !1, r == null || r.classList.remove("waiting", "disable", "canplay"), r == null || r.classList.add(o);
        break;
      case "play":
      case "playing":
      case "pause":
        this.isWaiting = !1, r == null || r.classList.remove("waiting", "pause", "stop", "play"), s ? n ? r == null || r.classList.add("pause") : r == null || r.classList.add("stop") : r == null || r.classList.add("play");
        break;
      case "durationchange":
        this.checkAnchorCreated();
    }
  }
  /////////////////////////////////////////
  // 슬라이드바 공통
  /////////////////////////////////////////
  /*
      createSlideBar(progressDOM, change){
          const changeFunction = change.bind(this);
          const onMousemove = (e)=>{
              const rect = progressDOM.getBoundingClientRect();
              const offsetX = e.clientX - rect.left;
              changeFunction(offsetX, rect.width);
          };
  
          const onMouseup = ((e)=>{
              progressDOM.classList.remove('open');
              document.removeEventListener('mousemove', onMousemove);
              document.removeEventListener('mouseup', onMouseup);
          });
  
          const onMousedown = ((e)=>{
              // total = window.getComputedStyle(progressDOM).getPropertyValue('width');
              // const offsetX = e.offsetX;
              progressDOM.classList.add('open');
              onMousemove(e);
              document.addEventListener('mousemove', onMousemove);
              document.addEventListener('mouseup', onMouseup);
          });
  
          progressDOM.addEventListener('mousedown', onMousedown);
          onCleanup(() => {
              progressDOM.removeEventListener('mousedown', onMousedown);
          });
      }
      */
}
function Ko(i, t) {
  (qn in t || Un in t) && e(dc), i.nodeName.toLowerCase() === "video" && (alert("리팩토링 적용안됨"), e(Nd));
  function e(r) {
    new r(i, t).create();
  }
}
var Id = /* @__PURE__ */ Ct("<div>");
const Qo = ["x", "y", "w", "h", "r", "b"], Fd = ["left", "top", "width", "height", "right", "bottom"];
class Lt extends oc {
  hasAttr(t, e) {
    return e in t;
  }
  attr(t, e = "string") {
    return t && function() {
      try {
        return yn(null, t, e);
      } catch (r) {
        return console.error("[Attribute 파싱 에러]:", r), t;
      }
    }();
  }
  checkUnit_px(t) {
    if (t)
      return Qo.includes(t) ? 0 : isNaN(Number(t)) || t.endsWith("px") ? t : t + "px";
  }
  // factory 함수에서 호출함
  create(t) {
    ic() && console.log(`* ${t["component-type"]}`, t);
    let e = "";
    Qo.forEach((n, s) => {
      const o = this.checkUnit_px(t[n]);
      o !== void 0 && (e += `${Fd[s]}: ${o};`);
    }), e && (e = e + t.style, t = or(t, {
      style: e
    }));
    const r = (n) => {
      this.specialAttribute(n, t);
    };
    return this.render(t, r);
  }
  // 특정 attribute 이름에 기능을 부여한다
  specialAttribute(t, e) {
  }
  // 전달된 노드를 자신의 하위 노드로 붙여줌
  transclude(t) {
    return t.children;
  }
  render(t, e) {
    const r = this;
    return (() => {
      var n = Id(), s = e;
      return typeof s == "function" ? hi(s, n) : e = n, Dt(n, t, !1, !0), bt(n, () => r.transclude(t)), n;
    })();
  }
}
Mt("Component", Lt);
var jd = /* @__PURE__ */ Ct("<div>");
const Bd = "app";
class Vd extends Lt {
  // create(props) {
  //     console.error('* App create:', props);
  //     return super.create(props);
  // }
  render(t) {
    const e = this;
    let r;
    return (() => {
      var n = jd(), s = r;
      return typeof s == "function" ? hi(s, n) : r = n, Dt(n, or(t, {
        "container-type": Bd
      }), !1, !0), bt(n, () => e.transclude(t)), n;
    })();
  }
}
Mt("App", Vd);
var zd = /* @__PURE__ */ Ct("<div>Sample: ");
class qd extends Lt {
  render(t) {
    const e = this;
    return (() => {
      var r = zd();
      return r.firstChild, Dt(r, t, !1, !0), bt(r, () => t.name, null), bt(r, () => e.transclude(t), null), r;
    })();
  }
}
Mt("Sample", qd);
var Ud = /* @__PURE__ */ Ct("<audio>");
class Hd extends Lt {
  render(t) {
    const e = this;
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var n = Ud();
      return Dt(n, t, !1, !0), bt(n, () => e.transclude(t)), n;
    })();
  }
}
Mt("Audio", Hd);
var Wd = /* @__PURE__ */ Ct("<div>");
class Gd extends Lt {
  render(t, e) {
    const r = this;
    return (() => {
      var n = Wd(), s = e;
      return typeof s == "function" ? hi(s, n) : e = n, Dt(n, t, !1, !0), bt(n, () => r.transclude(t)), n;
    })();
  }
}
Mt("Div", Gd);
var Yd = /* @__PURE__ */ Ct("<img>");
class Xd extends Lt {
  render(t) {
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var r = Yd();
      return Dt(r, t, !1, !0), r;
    })();
  }
}
Mt("Image", Xd);
var Kd = /* @__PURE__ */ Ct("<lottie-player>", !0, !1);
class Qd extends Lt {
  render(t) {
    const e = this;
    "src" in t && (t.src = this.attr(t.src));
    let n;
    return El(() => {
      n.setAttribute("component-type", t["component-type"]);
    }), (() => {
      var s = Kd(), o = n;
      return typeof o == "function" ? hi(o, s) : n = s, Dt(s, t, !1, !0), s._$owner = $l(), bt(s, () => e.transclude(t)), s;
    })();
  }
}
Mt("Lottie", Qd);
var Jd = /* @__PURE__ */ Ct("<div>");
class Zd extends Lt {
  render(t) {
    const e = this;
    return (() => {
      var r = Jd();
      return Dt(r, t, !1, !0), bt(r, () => e.transclude(t)), r;
    })();
  }
}
Mt("Text", Zd);
var tp = /* @__PURE__ */ Ct("<video>");
class ep extends Lt {
  render(t) {
    const e = this;
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var n = tp();
      return Dt(n, t, !1, !0), bt(n, () => e.transclude(t)), n;
    })();
  }
}
Mt("Video", ep);
var rp = /* @__PURE__ */ Ct("<div>");
class np extends Lt {
  render(t) {
    const e = this;
    return (() => {
      var r = rp();
      return Dt(r, or(t, {
        "container-type": "group"
      }), !1, !0), bt(r, () => e.transclude(t)), r;
    })();
  }
}
Mt("Group", np);
var ip = /* @__PURE__ */ Ct("<div>");
class sp extends Lt {
  render(t) {
    const e = this;
    return (() => {
      var r = ip();
      return Dt(r, or(t, {
        "container-type": "layout"
      }), !1, !0), bt(r, () => e.transclude(t)), r;
    })();
  }
}
Mt("Layout", sp);
var op = /* @__PURE__ */ Ct("<div>");
class ap extends Lt {
  render(t) {
    const e = this;
    return (() => {
      var r = op();
      return Dt(r, or(t, {
        "container-type": "page"
      }), !1, !0), bt(r, () => e.transclude(t)), r;
    })();
  }
}
Mt("Page", ap);
class ht extends ur {
  constructor() {
    super();
    //-------------------------------------
    // Attribute: selector="CSS 셀렉터"
    //-------------------------------------
    // selector attribute 있다면 dom 목록을 리턴
    x(this, "_doms");
  }
  get doms() {
    return this._doms;
  }
  setDoms(e = "selector") {
    let r = this.info.attrs[e];
    if (!r)
      return;
    if (this.hasAttr("selector-is-dom"))
      return this._doms = this.objectSelector(e, r), this._doms.length > 0;
    let s, o = this.attr(e);
    return o === r ? s = this.normalSelector(r) : s = this.literalSelector(e, o), s && (this._doms = Array.from(s), this._doms) ? this._doms.length > 0 : (this._doms = this.objectSelector(e, r), this._doms.length > 0);
  }
  // 일반 selector 구문
  normalSelector(e) {
    try {
      return Array.from(document.querySelectorAll(e));
    } catch (r) {
      k() && console.error("[selector 구문 에러]", e, r.message);
    }
  }
  // 리터럴 구문 변한 seleector
  literalSelector(e, r) {
    try {
      return k() && console.log("[Literal 구문 검사]", "-->", r), Array.from(document.querySelectorAll(r));
    } catch (n) {
      k() && console.error("[Literal selector 파싱 에러]", n.message);
    }
  }
  // 코드 구문 변환 select (DOM)
  objectSelector(e, r) {
    try {
      const n = this.attr(e, "object");
      return k() && console.log("[Object 구문 검사]", r, "-->", n), n && typeof n == "object" ? Array.isArray(n) ? n : [n] : Array.from(document.querySelectorAll(n));
    } catch (n) {
      k() && console.error("[Object selector 파싱 에러]", n.message);
    }
  }
}
class up extends ht {
  create({
    nodeName: t,
    info: e,
    args: r,
    depth: n
  }) {
    const s = zh(e, r);
    if (s)
      return super.create({
        nodeName: t,
        info: s,
        args: r,
        depth: n
      });
  }
  /*
      runEvent() {
          const task = this.info;
          const id = (task?.attrs.id) || '';
          console.log(`${this.tab}%c(task:run) <${id} (${task.list?.length})>`, logColor.event, task);
  
          super.runEvent();
      }
      */
  run(t, e, r) {
    const n = this.info;
    if (n.skipedByCondition) {
      t();
      return;
    }
    const { list: s } = n;
    (() => {
      if (n instanceof Rr) {
        if (!this.debug)
          return;
        const u = (n == null ? void 0 : n.attrs.id) || "";
        console.log(`${this.tab}%c<시작:${u} (${s == null ? void 0 : s.length}개)>%c ($args)`, C.taskstart, C.info, this.args);
      } else {
        const u = (n == null ? void 0 : n.attrs.id) || (n == null ? void 0 : n.attrs.srcRef) || "";
        console.log(`${this.tab}%c<id="${u}"> 알수없는 TASK 실행:`, C.err, n);
      }
    })();
    const o = (a) => {
      const u = (n == null ? void 0 : n.attrs.id) || (n == null ? void 0 : n.attrs.srcRef) || "", l = (h) => {
        var p;
        this.debug && console.log(`${this.tab}%c<${h}: ${u} (${(p = n.list) == null ? void 0 : p.length}개)>`, C.taskend, n);
      };
      if (a === bn) {
        l("취소"), e(a);
        return;
      }
      a && !(a === En) && console.error("(에러)", this.info.attrs.id, a), l("종료"), r(!0);
    };
    n._args && !n._args.event && this.args && this.args.event && (n._args.event = this.args.event), dd(n, n._args || this.args, o, this.depth + 1), r(!1);
  }
  completeEvent() {
    this.emit("complete", this);
  }
}
Ne.forEach((i) => {
  j(i, up);
});
var Xe, Ar;
class zs extends ht {
  constructor() {
    super(...arguments);
    P(this, Xe, void 0);
    // Media controller 인스턴스
    P(this, Ar, void 0);
  }
  get dom() {
    return E(this, Xe);
  }
  get media() {
    return E(this, Ar);
  }
  // Override
  // 'audio', 'video'
  get mediaType() {
    return "MediaType이 지정하지 않았습니다.";
  }
  // Override
  createElement(e) {
    return null;
  }
  // Override
  // $provider.$sound, $provider.$video
  get provider() {
    return "provider를 지정하지 않았습니다.";
  }
  // id, target 값에 따라 dom id 찾기
  findDomID(e, r) {
    let n;
    return r ? this.provider.has(r) ? n = r : e ? n = e : k() && console.warn(`<${this.mediaType}> 해당 target (${r})의 ${this.mediaType} 객체를 찾을 수 없습니다.`) : e ? n = e : console.error(`<${this.mediaType}> id 또는 target 값을 지정해야 합니다.`), n;
  }
  run(e, r, n) {
    var c;
    let s = this.attr("id"), o = this.attr("target");
    const a = this.findDomID(s, o);
    if (!a)
      return e();
    let u = this.attr("destroy");
    if (u !== void 0 && u !== "no") {
      this.destroyAll(a, u), n();
      return;
    }
    let l = this.provider.get(a);
    if (l) {
      O(this, Xe, l.dom), O(this, Ar, l.media), l.destroy.push(super.destroy.bind(this)), this.execuate(e, r, n), n(!1);
      return;
    }
    if (this.setDoms(), (c = this.doms) != null && c[0] ? O(this, Xe, this.doms[0]) : O(this, Xe, this.createDOM(this.mediaType)), O(this, Ar, this.createMedia(this.mediaType)), !this.media)
      return this.dom.remove(), e();
    this.provider.add(a, {
      dom: this.dom,
      media: this.media,
      destroy: [super.destroy.bind(this)]
    }), this.execuate(e, r, n), n(!1);
  }
  // mediaType: 'audio' or 'video'
  createDOM(e) {
    const r = this.createElement(e), n = "[" + Ta + "=" + ba("App") + "]", s = document.querySelector(n) || document.body;
    return s.insertBefore(r, s.children[0]), r;
  }
  createMedia(e, r = null) {
    const n = La();
    return Hn.create(e, this.dom, n, r);
  }
  //--------------------------------------
  // 기능 구현
  //--------------------------------------
  async execuate(e, r, n) {
    const s = this.attr("wait");
    if (s) {
      const o = s.split(",").map((u) => u.trim()), a = ((u) => {
        o.forEach((l) => {
          this.media.off(l, a);
        }), n(!0);
      }).bind(this);
      o.forEach((u) => {
        this.media.once(u, a);
      });
    }
    this.addProxyEventDispatcher(this.media), await new Promise(this.checkProperty.bind(this)), await new Promise(this.checkMethod.bind(this)), s || n(!0);
  }
  /*
      // src 설정 상태 확인
      checkSrc(resolve, reject) {
          const src = this.attr('src');
  
          // src 설정이 없는 경우 기존 상태를 확인함
          if (src === undefined) {
              // src가 설정되어 있지 않은 경우
              // if(!this.media.src()) return resolve();
  
              // src가 설정되어 있는 경우
              // ready 상태 확인
              // if(this.media.isReady()) return resolve();
              return resolve();
          }
  
          // ('' 포함) src 설정이 있는 경우
          this.media.src(src);
          if (src === '') return resolve();
  
          // 먼저 src 적용 후 ready 상태 확인
          this.media.on('ready', () => {
              console.error(`# PLAYER 세팅 종료 (${this.id}) : `, this.media.src());
              // this.onReady(resolve, reject, timeout);
              return resolve();
          });
      }
      */
  // 속성 설정
  checkProperty(e, r) {
    const n = this.attr("set", "object");
    if (n) {
      I() && console.log(`%c# ${this.mediaType} (set) 속성 설정: `, C.info, n);
      for (const s in n)
        this.media.set(s, n[s]);
    }
    e();
  }
  // 메서드 실행
  checkMethod(e, r) {
    const n = this.attr("run");
    if (!n) {
      e();
      return;
    }
    I() && console.log(`%c# ${this.mediaType} (run) 메서드 호출: ${n}`, C.info);
    try {
      const s = "this." + n;
      Ca(this.args, s, this.media);
    } catch (s) {
      console.error("[미디어 실행 에러]", s);
    }
    e();
  }
  //--------------------------------------
  // destroy 시점을 바꿈
  //--------------------------------------
  // (issue #1) 2024.02.26 task 노드의 이벤트 누적 문제
  // - destroy를 빈 함수로 오버라이딩 하던것을 해지함 (destroy 원래대로 작동하도록 되돌림)
  // - 기본값이 desroy 실행
  // - desroy 실행하지 않으려면 destroy="no" 설정
  //   <sound id="na" set="{src: './test/asset/sound1.mp3'}"
  //          onplay="alert('성우음성')"
  //          destroy="no">
  //   destroy="no" 설정이 없으면 alert는 처음 한번만 실행됨 (task 실행 후 이벤트가 destroy 됨)
  //   destroy="no" 설정이 있으면 play 이벤트 계속 실행됨
  destroy() {
    var r;
    ((r = this.attr("destroy")) == null ? void 0 : r.toLowerCase()) !== "no" && super.destroy();
  }
  destroyAll(...e) {
    super.destroy(), this.provider.destroy(...e);
  }
}
Xe = new WeakMap(), Ar = new WeakMap();
class lp extends zs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "audio";
  }
  get provider() {
    return D.$audio;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("audio-player", ""), e;
  }
}
j("Audio", lp);
class cp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.add(o));
    }), r();
  }
}
class fp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.remove(o));
    }), r();
  }
}
class hp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.toggle(o));
    }), r();
  }
}
class dp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    const n = this.attr("name"), s = this.attr("value");
    n && this.doms.forEach((o) => {
      o.setAttribute(n, s == null ? void 0 : s.trim());
    }), r();
  }
}
class pp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    const n = this.attr("name");
    n && this.doms.forEach((s) => {
      s.removeAttribute(n);
    }), r();
  }
}
class mp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    const n = this.attr("styles", "object");
    n && this.doms.forEach((s) => {
      for (const o in n)
        s.style[o] = n[o];
    }), r();
  }
}
class gp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("styles");
    n = n.split(",").map((s) => s.trim()), n && this.doms.forEach((s) => {
      n.forEach((o) => {
        s.style[o] = "";
      });
    }), r();
  }
}
j("AddClass", cp);
j("RemoveClass", fp);
j("ToggleClass", hp);
j("AddAttr", dp);
j("RemoveAttr", pp);
j("AddStyle", mp);
j("RemoveStyle", gp);
class _p extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    this.doms.forEach((n) => {
      n.setAttribute("taskml-disable", "");
    }), r();
  }
}
class yp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    this.doms.forEach((n) => {
      n.removeAttribute("taskml-disable");
    }), r();
  }
}
j("Enable", yp);
j("Disable", _p);
class vp extends ht {
  /*
  run(resolve, reject, timeout) {
      (async () => {
          const result = await this.include(this.info.attrs.include);
          console.error('result : ', result);
          timeout(true);
      })();
  }
  */
  // include : <include src="./test/include/video.task.html" selector="#page"></task>
  // selector는 DOM 요소가 없으면 필요 없음. DOM 요소의 parent selector 임
  async include() {
    var r;
    (r = this.info.attrs.src) != null && r.trim() && await kd(this.info.attrs, this.info.parseOption);
  }
}
class wp extends vp {
  // timer 없어도 resolve 호출하지 않음
  // timeout(false);
  // resolved 체크 후 resolve 즉시 호출
  // timeout(true);
  // timer 없으면 resolve 즉시 호출
  // timeout();
  run(t, e, r) {
    (async () => (await this.include(), r(!0)))();
  }
}
j("Include", wp);
class Tp extends ur {
  run(t, e, r) {
    r();
  }
}
j("Blank", Tp);
class pu extends ur {
  run(t, e, r) {
    const n = this.info.attrs, s = "run" in this.info.attrs, o = s ? n.run.trim() : this.getScript(n == null ? void 0 : n.$script);
    if (!o)
      return t();
    const a = s ? window : D.$js.getContext();
    (function(u) {
      var l;
      try {
        const c = () => {
          e(bn);
        }, f = () => {
          e(En);
        }, h = () => {
          r(!0);
        }, p = () => {
          D.$js.newContext();
        };
        if (!s) {
          const w = /(\/\/.*)*?\$(next|cancel)\s*\(\s*\)\B/img, m = (l = o.match(w)) == null ? void 0 : l.filter((g) => g.indexOf("/") < 0);
          m != null && m.length || k() && console.warn("<js> 노드에서 $next() 또는 $cancel() 문을 사용하여 실행을 종료하세요");
        }
        let d = `function($args, $next, $clear, $cancel){
 return ` + (`(() => {
 ` + o + ` 
})()`) + `
}`;
        Function("return " + d)().apply(this, [u, h, p, c]);
      } catch (c) {
        console.error("[as-task 스크립트 에러]", c);
      }
    }).bind(a)(this.args), r(!1);
  }
  // 문자열에서 유효한 스크립트 문자열을 얻음
  // <!--<![ CDATA [ code... // ]] >-->
  getScript(t) {
    if (!t)
      return;
    t = t.trim();
    const e = /.*<!\[\s*CDATA\s*\[[\s\t\n\r]*(.*?)[\s\t\n\r\/]*]].*>/gms;
    return t.replace(e, (r, n) => n);
  }
}
j("Js", pu);
j("Script", pu);
class bp extends zs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "audio";
  }
  get provider() {
    return D.$sound;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("sound-player", ""), e;
  }
  //--------------------------------------
  // 기능 구현
  //--------------------------------------
}
j("Sound", bp);
let qs = class extends ht {
  // 애니메이션 코드를 효율적으로 작성하기 위한 팁
  // https://agal.tistory.com/214
  // https://gsap.com/resources/frameworks
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    this.warningTransition();
    const n = this.getSetting();
    n.set && gsap.set(this.doms, n.set);
    const s = () => {
      this.onTweenComplete(), r(!0);
    };
    if (n.from && n.to) {
      n.to.onComplete = () => s(), gsap.fromTo(this.doms, n.from, n.to), r(!1);
      return;
    }
    if (n.from) {
      n.from.onComplete = () => s(), gsap.from(this.doms, n.from), r(!1);
      return;
    }
    if (n.to) {
      n.to.onComplete = () => s(), gsap.to(this.doms, n.to), r(!1);
      return;
    }
    r();
  }
  warningTransition() {
    this.doms.forEach((t) => {
      window.getComputedStyle(t)["transition-duration"] !== "0s" && k() && console.warn(`<tween>이 적용되는 속성에 transition style이 설정되어 있으면성능이 저하될 수 있습니다.
* 다음 element에서 transition 속성을 제거하세요.`, t);
    });
  }
  getSetting() {
    return {
      set: this.attr("set", "object"),
      // from attribute
      from: this.attr("from", "object"),
      // to attribute
      to: this.attr("to", "object")
    };
  }
  mergeWithSet(t, e) {
    return t = t || {}, e && (t = { ...t, ...e }), t;
  }
  onTweenComplete() {
  }
};
j("Tween", qs);
class Ep extends qs {
  getSetting() {
    let t = super.getSetting();
    return t.to = this.mergeWithSet({
      opacity: 0
    }, t.to || {}), t;
  }
  onTweenComplete() {
    gsap.set(this.doms, { display: "none" });
  }
}
class $p extends qs {
  getSetting() {
    let t = super.getSetting();
    return t.set = this.mergeWithSet({
      display: ""
    }, t.set || {}), t.from = this.mergeWithSet({
      opacity: 0
    }, t.from || {}), t.to = this.mergeWithSet({
      opacity: 1
    }, t.to || {}), t;
  }
}
j("Hide", Ep);
j("Show", $p);
class Ap extends zs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "video";
  }
  get provider() {
    return D.$video;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("video-player", ""), e;
  }
}
j("Video", Ap);
const re = {
  get $containerAPI() {
    return window.$containerAPI;
  },
  get $contentAPI() {
    return window.$contentAPI;
  }
};
class xp extends ht {
  run(t, e, r) {
    var n;
    try {
      const s = this.setDoms("video") ? this.doms[0] : null;
      (n = re.$containerAPI) == null || n.watchStudyTime(s);
    } catch (s) {
      console.error("[$containerAPI.watchStudyTime]", s);
    }
    t();
  }
}
j("WatchStudyTime", xp);
class wi extends ht {
}
class Sp extends wi {
  run(t, e, r) {
    var s;
    let n = this.attr("index");
    if (!this.$containerAPI) {
      alert("페이지 이동 index: " + n), r();
      return;
    }
    try {
      (s = re.$containerAPI) == null || s.goSubject(n);
    } catch (o) {
      console.error("[$containerAPI.subject.go]", o);
    }
    r();
  }
}
class Op extends wi {
  run(t, e, r) {
    var n;
    if (!re.$containerAPI) {
      alert("이전 페이지 이동"), r();
      return;
    }
    try {
      (n = re.$containerAPI) == null || n.goPrevSubject();
    } catch (s) {
      console.error("[$containerAPI.subject.goPrev]", s);
    }
    r();
  }
}
class kp extends wi {
  run(t, e, r) {
    var n;
    if (!re.$containerAPI) {
      alert("다음 페이지 이동"), r();
      return;
    }
    try {
      (n = re.$containerAPI) == null || n.goNextSubject();
    } catch (s) {
      console.error("[$containerAPI.subject.goNext]", s);
    }
    r();
  }
}
j("PageGo", Sp);
j("PagePrev", Op);
j("PageNext", kp);
class Pp extends wi {
  run(t, e, r) {
    var n, s;
    try {
      let o = this.attr("value");
      if (!re.$containerAPI) {
        alert("페이지 버튼 보이기: " + o), r();
        return;
      }
      o === "next" ? (n = re.$containerAPI) == null || n.showNext() : (s = re.$containerAPI) == null || s.showPrev();
    } catch (o) {
      console.error("[$containerAPI]", o);
    }
    r();
  }
}
j("PageButton", Pp);
function Kt(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function mu(i, t) {
  i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.__proto__ = t;
}
/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Tt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Pr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Us, at, W, St = 1e8, q = 1 / St, ls = Math.PI * 2, Cp = ls / 4, Dp = 0, gu = Math.sqrt, Mp = Math.cos, Lp = Math.sin, nt = function(t) {
  return typeof t == "string";
}, K = function(t) {
  return typeof t == "function";
}, ie = function(t) {
  return typeof t == "number";
}, Hs = function(t) {
  return typeof t > "u";
}, Gt = function(t) {
  return typeof t == "object";
}, dt = function(t) {
  return t !== !1;
}, Ws = function() {
  return typeof window < "u";
}, On = function(t) {
  return K(t) || nt(t);
}, _u = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, ut = Array.isArray, cs = /(?:-?\.?\d|\.)+/gi, yu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, hr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ni = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, vu = /[+-]=-?[.\d]+/, wu = /[^,'"\[\]\s]+/gi, Rp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Y, jt, fs, Gs, Et = {}, Kn = {}, Tu, bu = function(t) {
  return (Kn = nr(t, Et)) && _t;
}, Ys = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, en = function(t, e) {
  return !e && console.warn(t);
}, Eu = function(t, e) {
  return t && (Et[t] = e) && Kn && (Kn[t] = e) || Et;
}, rn = function() {
  return 0;
}, Np = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Cn = {
  suppressEvents: !0,
  kill: !1
}, Ip = {
  suppressEvents: !0
}, Xs = {}, ve = [], hs = {}, $u, yt = {}, Ii = {}, Jo = 30, Dn = [], Ks = "", Qs = function(t) {
  var e = t[0], r, n;
  if (Gt(e) || K(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (n = Dn.length; n-- && !Dn[n].targetTest(e); )
      ;
    r = Dn[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new Yu(t[n], r))) || t.splice(n, 1);
  return t;
}, Ze = function(t) {
  return t._gsap || Qs(Ot(t))[0]._gsap;
}, Au = function(t, e, r) {
  return (r = t[e]) && K(r) ? t[e]() : Hs(r) && t.getAttribute && t.getAttribute(e) || r;
}, pt = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, Q = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, rt = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, gr = function(t, e) {
  var r = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + n : r === "-" ? t - n : r === "*" ? t * n : t / n;
}, Fp = function(t, e) {
  for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; )
    ;
  return n < r;
}, Qn = function() {
  var t = ve.length, e = ve.slice(0), r, n;
  for (hs = {}, ve.length = 0, r = 0; r < t; r++)
    n = e[r], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, xu = function(t, e, r, n) {
  ve.length && !at && Qn(), t.render(e, r, n || at && e < 0 && (t._initted || t._startAt)), ve.length && !at && Qn();
}, Su = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(wu).length < 2 ? e : nt(t) ? t.trim() : t;
}, Ou = function(t) {
  return t;
}, Pt = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, jp = function(t) {
  return function(e, r) {
    for (var n in r)
      n in e || n === "duration" && t || n === "ease" || (e[n] = r[n]);
  };
}, nr = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, Zo = function i(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = Gt(e[r]) ? i(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, Jn = function(t, e) {
  var r = {}, n;
  for (n in t)
    n in e || (r[n] = t[n]);
  return r;
}, Yr = function(t) {
  var e = t.parent || Y, r = t.keyframes ? jp(ut(t.keyframes)) : Pt;
  if (dt(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, Bp = function(t, e) {
  for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, ku = function(t, e, r, n, s) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var o = t[n], a;
  if (s)
    for (a = e[s]; o && o[s] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e;
}, Ti = function(t, e, r, n) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var s = e._prev, o = e._next;
  s ? s._next = o : t[r] === e && (t[r] = o), o ? o._prev = s : t[n] === e && (t[n] = s), e._next = e._prev = e.parent = null;
}, Te = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, tr = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, Vp = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, ds = function(t, e, r, n) {
  return t._startAt && (at ? t._startAt.revert(Cn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, zp = function i(t) {
  return !t || t._ts && i(t.parent);
}, ta = function(t) {
  return t._repeat ? Cr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Cr = function(t, e) {
  var r = Math.floor(t /= e);
  return t && r === t ? r - 1 : r;
}, Zn = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, bi = function(t) {
  return t._end = rt(t._start + (t._tDur / Math.abs(t._ts || t._rts || q) || 0));
}, Ei = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = rt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), bi(t), r._dirty || tr(r, t)), t;
}, Pu = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = Zn(t.rawTime(), e), (!e._dur || $n(0, e.totalDuration(), r) - e._tTime > q) && e.render(r, !0)), tr(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -q;
  }
}, qt = function(t, e, r, n) {
  return e.parent && Te(e), e._start = rt((ie(r) ? r : r || t !== Y ? At(t, r, e) : t._time) + e._delay), e._end = rt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ku(t, e, "_first", "_last", t._sort ? "_start" : 0), ps(e) || (t._recent = e), n || Pu(t, e), t._ts < 0 && Ei(t, t._tTime), t;
}, Cu = function(t, e) {
  return (Et.ScrollTrigger || Ys("scrollTrigger", e)) && Et.ScrollTrigger.create(e, t);
}, Du = function(t, e, r, n, s) {
  if (Zs(t, e, s), !t._initted)
    return 1;
  if (!r && t._pt && !at && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && $u !== vt.frame)
    return ve.push(t), t._lazy = [s, n], 1;
}, qp = function i(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || i(e));
}, ps = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Up = function(t, e, r, n) {
  var s = t.ratio, o = e < 0 || !e && (!t._start && qp(t) && !(!t._initted && ps(t)) || (t._ts < 0 || t._dp._ts < 0) && !ps(t)) ? 0 : 1, a = t._rDelay, u = 0, l, c, f;
  if (a && t._repeat && (u = $n(0, t._tDur, e), c = Cr(u, a), t._yoyo && c & 1 && (o = 1 - o), c !== Cr(t._tTime, a) && (s = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== s || at || n || t._zTime === q || !e && t._zTime) {
    if (!t._initted && Du(t, e, n, r, u))
      return;
    for (f = t._zTime, t._zTime = e || (r ? q : 0), r || (r = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = u, l = t._pt; l; )
      l.r(o, l.d), l = l._next;
    e < 0 && ds(t, e, r, !0), t._onUpdate && !r && wt(t, "onUpdate"), u && t._repeat && !r && t.parent && wt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && Te(t, 1), !r && !at && (wt(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else
    t._zTime || (t._zTime = e);
}, Hp = function(t, e, r) {
  var n;
  if (r > e)
    for (n = t._first; n && n._start <= r; ) {
      if (n.data === "isPause" && n._start > e)
        return n;
      n = n._next;
    }
  else
    for (n = t._last; n && n._start >= r; ) {
      if (n.data === "isPause" && n._start < e)
        return n;
      n = n._prev;
    }
}, Dr = function(t, e, r, n) {
  var s = t._repeat, o = rt(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = s ? s < 0 ? 1e10 : rt(o * (s + 1) + t._rDelay * s) : o, a > 0 && !n && Ei(t, t._tTime = t._tDur * a), t.parent && bi(t), r || tr(t.parent, t), t;
}, ea = function(t) {
  return t instanceof ft ? tr(t) : Dr(t, t._dur);
}, Wp = {
  _start: 0,
  endTime: rn,
  totalDuration: rn
}, At = function i(t, e, r) {
  var n = t.labels, s = t._recent || Wp, o = t.duration() >= St ? s.endTime(!1) : t._dur, a, u, l;
  return nt(e) && (isNaN(e) || e in n) ? (u = e.charAt(0), l = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (a < 0 ? s : r).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), l && r && (u = u / 100 * (ut(r) ? r[0] : r).totalDuration()), a > 1 ? i(t, e.substr(0, a - 1), r) + u : o + u)) : e == null ? o : +e;
}, Xr = function(t, e, r) {
  var n = ie(e[1]), s = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[s], a, u;
  if (n && (o.duration = e[1]), o.parent = r, t) {
    for (a = o, u = r; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = dt(u.vars.inherit) && u.parent;
    o.immediateRender = dt(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[s - 1];
  }
  return new Z(e[0], o, e[s + 1]);
}, Se = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, $n = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, st = function(t, e) {
  return !nt(t) || !(e = Rp.exec(t)) ? "" : e[1];
}, Gp = function(t, e, r) {
  return Se(r, function(n) {
    return $n(t, e, n);
  });
}, ms = [].slice, Mu = function(t, e) {
  return t && Gt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && Gt(t[0])) && !t.nodeType && t !== jt;
}, Yp = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(n) {
    var s;
    return nt(n) && !e || Mu(n, 1) ? (s = r).push.apply(s, Ot(n)) : r.push(n);
  }) || r;
}, Ot = function(t, e, r) {
  return W && !e && W.selector ? W.selector(t) : nt(t) && !r && (fs || !Mr()) ? ms.call((e || Gs).querySelectorAll(t), 0) : ut(t) ? Yp(t, r) : Mu(t) ? ms.call(t, 0) : t ? [t] : [];
}, gs = function(t) {
  return t = Ot(t)[0] || en("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return Ot(e, r.querySelectorAll ? r : r === t ? en("Invalid scope") || Gs.createElement("div") : t);
  };
}, Lu = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Ru = function(t) {
  if (K(t))
    return t;
  var e = Gt(t) ? t : {
    each: t
  }, r = er(e.ease), n = e.from || 0, s = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, u = isNaN(n) || a, l = e.axis, c = n, f = n;
  return nt(n) ? c = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && u && (c = n[0], f = n[1]), function(h, p, _) {
    var d = (_ || e).length, y = o[d], w, m, g, v, T, b, $, S, A;
    if (!y) {
      if (A = e.grid === "auto" ? 0 : (e.grid || [1, St])[1], !A) {
        for ($ = -St; $ < ($ = _[A++].getBoundingClientRect().left) && A < d; )
          ;
        A < d && A--;
      }
      for (y = o[d] = [], w = u ? Math.min(A, d) * c - 0.5 : n % A, m = A === St ? 0 : u ? d * f / A - 0.5 : n / A | 0, $ = 0, S = St, b = 0; b < d; b++)
        g = b % A - w, v = m - (b / A | 0), y[b] = T = l ? Math.abs(l === "y" ? v : g) : gu(g * g + v * v), T > $ && ($ = T), T < S && (S = T);
      n === "random" && Lu(y), y.max = $ - S, y.min = S, y.v = d = (parseFloat(e.amount) || parseFloat(e.each) * (A > d ? d - 1 : l ? l === "y" ? d / A : A : Math.max(A, d / A)) || 0) * (n === "edges" ? -1 : 1), y.b = d < 0 ? s - d : s, y.u = st(e.amount || e.each) || 0, r = r && d < 0 ? Hu(r) : r;
    }
    return d = (y[h] - y.min) / y.max || 0, rt(y.b + (r ? r(d) : d) * y.v) + y.u;
  };
}, _s = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var n = rt(Math.round(parseFloat(r) / t) * t * e);
    return (n - n % 1) / e + (ie(r) ? 0 : st(r));
  };
}, Nu = function(t, e) {
  var r = ut(t), n, s;
  return !r && Gt(t) && (n = r = t.radius || St, t.values ? (t = Ot(t.values), (s = !ie(t[0])) && (n *= n)) : t = _s(t.increment)), Se(e, r ? K(t) ? function(o) {
    return s = t(o), Math.abs(s - o) <= n ? s : o;
  } : function(o) {
    for (var a = parseFloat(s ? o.x : o), u = parseFloat(s ? o.y : 0), l = St, c = 0, f = t.length, h, p; f--; )
      s ? (h = t[f].x - a, p = t[f].y - u, h = h * h + p * p) : h = Math.abs(t[f] - a), h < l && (l = h, c = f);
    return c = !n || l <= n ? t[c] : o, s || c === o || ie(o) ? c : c + st(o);
  } : _s(t));
}, Iu = function(t, e, r, n) {
  return Se(ut(t) ? !e : r === !0 ? !!(r = 0) : !n, function() {
    return ut(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * n) / n;
  });
}, Xp = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(n) {
    return e.reduce(function(s, o) {
      return o(s);
    }, n);
  };
}, Kp = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || st(r));
  };
}, Qp = function(t, e, r) {
  return ju(t, e, 0, 1, r);
}, Fu = function(t, e, r) {
  return Se(r, function(n) {
    return t[~~e(n)];
  });
}, Jp = function i(t, e, r) {
  var n = e - t;
  return ut(t) ? Fu(t, i(0, t.length), e) : Se(r, function(s) {
    return (n + (s - t) % n) % n + t;
  });
}, Zp = function i(t, e, r) {
  var n = e - t, s = n * 2;
  return ut(t) ? Fu(t, i(0, t.length - 1), e) : Se(r, function(o) {
    return o = (s + (o - t) % s) % s || 0, t + (o > n ? s - o : o);
  });
}, nn = function(t) {
  for (var e = 0, r = "", n, s, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", s = t.substr(n + 7, o - n - 7).match(a ? wu : cs), r += t.substr(e, n - e) + Iu(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5), e = o + 1;
  return r + t.substr(e, t.length - e);
}, ju = function(t, e, r, n, s) {
  var o = e - t, a = n - r;
  return Se(s, function(u) {
    return r + ((u - t) / o * a || 0);
  });
}, tm = function i(t, e, r, n) {
  var s = isNaN(t + e) ? 0 : function(p) {
    return (1 - p) * t + p * e;
  };
  if (!s) {
    var o = nt(t), a = {}, u, l, c, f, h;
    if (r === !0 && (n = 1) && (r = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (ut(t) && !ut(e)) {
      for (c = [], f = t.length, h = f - 2, l = 1; l < f; l++)
        c.push(i(t[l - 1], t[l]));
      f--, s = function(_) {
        _ *= f;
        var d = Math.min(h, ~~_);
        return c[d](_ - d);
      }, r = e;
    } else
      n || (t = nr(ut(t) ? [] : {}, t));
    if (!c) {
      for (u in e)
        Js.call(a, t, u, "get", e[u]);
      s = function(_) {
        return ro(_, a) || (o ? t.p : t);
      };
    }
  }
  return Se(r, s);
}, ra = function(t, e, r) {
  var n = t.labels, s = St, o, a, u;
  for (o in n)
    a = n[o] - e, a < 0 == !!r && a && s > (a = Math.abs(a)) && (u = o, s = a);
  return u;
}, wt = function(t, e, r) {
  var n = t.vars, s = n[e], o = W, a = t._ctx, u, l, c;
  if (s)
    return u = n[e + "Params"], l = n.callbackScope || t, r && ve.length && Qn(), a && (W = a), c = u ? s.apply(l, u) : s.call(l), W = o, c;
}, Ur = function(t) {
  return Te(t), t.scrollTrigger && t.scrollTrigger.kill(!!at), t.progress() < 1 && wt(t, "onInterrupt"), t;
}, dr, Bu = [], Vu = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Ws() || t.headless) {
      var e = t.name, r = K(t), n = e && !r && t.init ? function() {
        this._props = [];
      } : t, s = {
        init: rn,
        render: ro,
        add: Js,
        kill: gm,
        modifier: mm,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: eo,
        aliases: {},
        register: 0
      };
      if (Mr(), t !== n) {
        if (yt[e])
          return;
        Pt(n, Pt(Jn(t, s), o)), nr(n.prototype, nr(s, Jn(t, o))), yt[n.prop = e] = n, t.targetTest && (Dn.push(n), Xs[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Eu(e, n), t.register && t.register(_t, n, mt);
    } else
      Bu.push(t);
}, B = 255, Hr = {
  aqua: [0, B, B],
  lime: [0, B, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, B],
  navy: [0, 0, 128],
  white: [B, B, B],
  olive: [128, 128, 0],
  yellow: [B, B, 0],
  orange: [B, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [B, 0, 0],
  pink: [B, 192, 203],
  cyan: [0, B, B],
  transparent: [B, B, B, 0]
}, Fi = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * B + 0.5 | 0;
}, zu = function(t, e, r) {
  var n = t ? ie(t) ? [t >> 16, t >> 8 & B, t & B] : 0 : Hr.black, s, o, a, u, l, c, f, h, p, _;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Hr[t])
      n = Hr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (s = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + s + s + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & B, n & B, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & B, t & B];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = _ = t.match(cs), !e)
        u = +n[0] % 360 / 360, l = +n[1] / 100, c = +n[2] / 100, o = c <= 0.5 ? c * (l + 1) : c + l - c * l, s = c * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = Fi(u + 1 / 3, s, o), n[1] = Fi(u, s, o), n[2] = Fi(u - 1 / 3, s, o);
      else if (~t.indexOf("="))
        return n = t.match(yu), r && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(cs) || Hr.transparent;
    n = n.map(Number);
  }
  return e && !_ && (s = n[0] / B, o = n[1] / B, a = n[2] / B, f = Math.max(s, o, a), h = Math.min(s, o, a), c = (f + h) / 2, f === h ? u = l = 0 : (p = f - h, l = c > 0.5 ? p / (2 - f - h) : p / (f + h), u = f === s ? (o - a) / p + (o < a ? 6 : 0) : f === o ? (a - s) / p + 2 : (s - o) / p + 4, u *= 60), n[0] = ~~(u + 0.5), n[1] = ~~(l * 100 + 0.5), n[2] = ~~(c * 100 + 0.5)), r && n.length < 4 && (n[3] = 1), n;
}, qu = function(t) {
  var e = [], r = [], n = -1;
  return t.split(we).forEach(function(s) {
    var o = s.match(hr) || [];
    e.push.apply(e, o), r.push(n += o.length + 1);
  }), e.c = r, e;
}, na = function(t, e, r) {
  var n = "", s = (t + n).match(we), o = e ? "hsla(" : "rgba(", a = 0, u, l, c, f;
  if (!s)
    return t;
  if (s = s.map(function(h) {
    return (h = zu(h, e, 1)) && o + (e ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")";
  }), r && (c = qu(t), u = r.c, u.join(n) !== c.c.join(n)))
    for (l = t.replace(we, "1").split(hr), f = l.length - 1; a < f; a++)
      n += l[a] + (~u.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (c.length ? c : s.length ? s : r).shift());
  if (!l)
    for (l = t.split(we), f = l.length - 1; a < f; a++)
      n += l[a] + s[a];
  return n + l[f];
}, we = function() {
  var i = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Hr)
    i += "|" + t + "\\b";
  return new RegExp(i + ")", "gi");
}(), em = /hsl[a]?\(/, Uu = function(t) {
  var e = t.join(" "), r;
  if (we.lastIndex = 0, we.test(e))
    return r = em.test(e), t[1] = na(t[1], r), t[0] = na(t[0], r, qu(t[1])), !0;
}, sn, vt = function() {
  var i = Date.now, t = 500, e = 33, r = i(), n = r, s = 1e3 / 240, o = s, a = [], u, l, c, f, h, p, _ = function d(y) {
    var w = i() - n, m = y === !0, g, v, T, b;
    if ((w > t || w < 0) && (r += w - e), n += w, T = n - r, g = T - o, (g > 0 || m) && (b = ++f.frame, h = T - f.time * 1e3, f.time = T = T / 1e3, o += g + (g >= s ? 4 : s - g), v = 1), m || (u = l(d)), v)
      for (p = 0; p < a.length; p++)
        a[p](T, h, b, y);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      _(!0);
    },
    deltaRatio: function(y) {
      return h / (1e3 / (y || 60));
    },
    wake: function() {
      Tu && (!fs && Ws() && (jt = fs = window, Gs = jt.document || {}, Et.gsap = _t, (jt.gsapVersions || (jt.gsapVersions = [])).push(_t.version), bu(Kn || jt.GreenSockGlobals || !jt.gsap && jt || {}), Bu.forEach(Vu)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && f.sleep(), l = c || function(y) {
        return setTimeout(y, o - f.time * 1e3 + 1 | 0);
      }, sn = 1, _(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(u), sn = 0, l = rn;
    },
    lagSmoothing: function(y, w) {
      t = y || 1 / 0, e = Math.min(w || 33, t);
    },
    fps: function(y) {
      s = 1e3 / (y || 240), o = f.time * 1e3 + s;
    },
    add: function(y, w, m) {
      var g = w ? function(v, T, b, $) {
        y(v, T, b, $), f.remove(g);
      } : y;
      return f.remove(y), a[m ? "unshift" : "push"](g), Mr(), g;
    },
    remove: function(y, w) {
      ~(w = a.indexOf(y)) && a.splice(w, 1) && p >= w && p--;
    },
    _listeners: a
  }, f;
}(), Mr = function() {
  return !sn && vt.wake();
}, N = {}, rm = /^[\d.\-M][\d.\-,\s]/, nm = /["']/g, im = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), n = r[0], s = 1, o = r.length, a, u, l; s < o; s++)
    u = r[s], a = s !== o - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, a), e[n] = isNaN(l) ? l.replace(nm, "").trim() : +l, n = u.substr(a + 1).trim();
  return e;
}, sm = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < r ? t.indexOf(")", r + 1) : r);
}, om = function(t) {
  var e = (t + "").split("("), r = N[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [im(e[1])] : sm(t).split(",").map(Su)) : N._CE && rm.test(t) ? N._CE("", t) : r;
}, Hu = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Wu = function i(t, e) {
  for (var r = t._first, n; r; )
    r instanceof ft ? i(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? i(r.timeline, e) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = e)), r = r._next;
}, er = function(t, e) {
  return t && (K(t) ? t : N[t] || om(t)) || e;
}, lr = function(t, e, r, n) {
  r === void 0 && (r = function(u) {
    return 1 - e(1 - u);
  }), n === void 0 && (n = function(u) {
    return u < 0.5 ? e(u * 2) / 2 : 1 - e((1 - u) * 2) / 2;
  });
  var s = {
    easeIn: e,
    easeOut: r,
    easeInOut: n
  }, o;
  return pt(t, function(a) {
    N[a] = Et[a] = s, N[o = a.toLowerCase()] = r;
    for (var u in s)
      N[o + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = N[a + "." + u] = s[u];
  }), s;
}, Gu = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ji = function i(t, e, r) {
  var n = e >= 1 ? e : 1, s = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = s / ls * (Math.asin(1 / n) || 0), a = function(c) {
    return c === 1 ? 1 : n * Math.pow(2, -10 * c) * Lp((c - o) * s) + 1;
  }, u = t === "out" ? a : t === "in" ? function(l) {
    return 1 - a(1 - l);
  } : Gu(a);
  return s = ls / s, u.config = function(l, c) {
    return i(t, l, c);
  }, u;
}, Bi = function i(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, n = t === "out" ? r : t === "in" ? function(s) {
    return 1 - r(1 - s);
  } : Gu(r);
  return n.config = function(s) {
    return i(t, s);
  }, n;
};
pt("Linear,Quad,Cubic,Quart,Quint,Strong", function(i, t) {
  var e = t < 5 ? t + 1 : t;
  lr(i + ",Power" + (e - 1), t ? function(r) {
    return Math.pow(r, e);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, e);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2;
  });
});
N.Linear.easeNone = N.none = N.Linear.easeIn;
lr("Elastic", ji("in"), ji("out"), ji());
(function(i, t) {
  var e = 1 / t, r = 2 * e, n = 2.5 * e, s = function(a) {
    return a < e ? i * a * a : a < r ? i * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? i * (a -= 2.25 / t) * a + 0.9375 : i * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  lr("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
lr("Expo", function(i) {
  return i ? Math.pow(2, 10 * (i - 1)) : 0;
});
lr("Circ", function(i) {
  return -(gu(1 - i * i) - 1);
});
lr("Sine", function(i) {
  return i === 1 ? 1 : -Mp(i * Cp) + 1;
});
lr("Back", Bi("in"), Bi("out"), Bi());
N.SteppedEase = N.steps = Et.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, n = t + (e ? 0 : 1), s = e ? 1 : 0, o = 1 - q;
    return function(a) {
      return ((n * $n(0, o, a) | 0) + s) * r;
    };
  }
};
Pr.ease = N["quad.out"];
pt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(i) {
  return Ks += i + "," + i + "Params,";
});
var Yu = function(t, e) {
  this.id = Dp++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Au, this.set = e ? e.getSetter : eo;
}, on = /* @__PURE__ */ function() {
  function i(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Dr(this, +e.duration, 1, 1), this.data = e.data, W && (this._ctx = W, W.data.push(this)), sn || vt.wake();
  }
  var t = i.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Dr(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, n) {
    if (Mr(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Ei(this, r), !s._dp || s.parent || Pu(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && qt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !n || this._initted && Math.abs(this._zTime) === q || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), xu(this, r, n)), this;
  }, t.time = function(r, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + ta(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(r, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, t.progress = function(r, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + ta(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, n) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, n) : this._repeat ? Cr(this._tTime, s) + 1 : 1;
  }, t.timeScale = function(r, n) {
    if (!arguments.length)
      return this._rts === -q ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? Zn(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -q ? 0 : this._rts, this.totalTime($n(-Math.abs(this._delay), this._tDur, s), n !== !1), bi(this), Vp(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Mr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== q && (this._tTime -= q)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && qt(n, this, r - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (dt(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var n = this.parent || this._dp;
    return n ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Zn(n.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = Ip);
    var n = at;
    return at = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), at = n, this;
  }, t.globalTime = function(r) {
    for (var n = this, s = arguments.length ? r : n.rawTime(); n; )
      s = n._start + s / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, ea(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = r, ea(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, t.seek = function(r, n) {
    return this.totalTime(At(this, r), dt(n));
  }, t.restart = function(r, n) {
    return this.play().totalTime(r ? -this._delay : 0, dt(n));
  }, t.play = function(r, n) {
    return r != null && this.seek(r, n), this.reversed(!1).paused(!1);
  }, t.reverse = function(r, n) {
    return r != null && this.seek(r || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, t.pause = function(r, n) {
    return r != null && this.seek(r, n), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -q : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -q, this;
  }, t.isActive = function() {
    var r = this.parent || this._dp, n = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= n && s < this.endTime(!0) - q);
  }, t.eventCallback = function(r, n, s) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[r] = n, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = n)) : delete o[r], this) : o[r];
  }, t.then = function(r) {
    var n = this;
    return new Promise(function(s) {
      var o = K(r) ? r : Ou, a = function() {
        var l = n.then;
        n.then = null, K(o) && (o = o(n)) && (o.then || o === n) && (n.then = l), s(o), n.then = l;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    Ur(this);
  }, i;
}();
Pt(on.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -q,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ft = /* @__PURE__ */ function(i) {
  mu(t, i);
  function t(r, n) {
    var s;
    return r === void 0 && (r = {}), s = i.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = dt(r.sortChildren), Y && qt(r.parent || Y, Kt(s), n), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Cu(Kt(s), r.scrollTrigger), s;
  }
  var e = t.prototype;
  return e.to = function(n, s, o) {
    return Xr(0, arguments, this), this;
  }, e.from = function(n, s, o) {
    return Xr(1, arguments, this), this;
  }, e.fromTo = function(n, s, o, a) {
    return Xr(2, arguments, this), this;
  }, e.set = function(n, s, o) {
    return s.duration = 0, s.parent = this, Yr(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new Z(n, s, At(this, o), 1), this;
  }, e.call = function(n, s, o) {
    return qt(this, Z.delayedCall(0, n, s), o);
  }, e.staggerTo = function(n, s, o, a, u, l, c) {
    return o.duration = s, o.stagger = o.stagger || a, o.onComplete = l, o.onCompleteParams = c, o.parent = this, new Z(n, o, At(this, u)), this;
  }, e.staggerFrom = function(n, s, o, a, u, l, c) {
    return o.runBackwards = 1, Yr(o).immediateRender = dt(o.immediateRender), this.staggerTo(n, s, o, a, u, l, c);
  }, e.staggerFromTo = function(n, s, o, a, u, l, c, f) {
    return a.startAt = o, Yr(a).immediateRender = dt(a.immediateRender), this.staggerTo(n, s, a, u, l, c, f);
  }, e.render = function(n, s, o) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, c = n <= 0 ? 0 : rt(n), f = this._zTime < 0 != n < 0 && (this._initted || !l), h, p, _, d, y, w, m, g, v, T, b, $;
    if (this !== Y && c > u && n >= 0 && (c = u), c !== this._tTime || o || f) {
      if (a !== this._time && l && (c += this._time - a, n += this._time - a), h = c, v = this._start, g = this._ts, w = !g, f && (l || (a = this._zTime), (n || !s) && (this._zTime = n)), this._repeat) {
        if (b = this._yoyo, y = l + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(y * 100 + n, s, o);
        if (h = rt(c % y), c === u ? (d = this._repeat, h = l) : (d = ~~(c / y), d && d === c / y && (h = l, d--), h > l && (h = l)), T = Cr(this._tTime, y), !a && this._tTime && T !== d && this._tTime - T * y - this._dur <= 0 && (T = d), b && d & 1 && (h = l - h, $ = 1), d !== T && !this._lock) {
          var S = b && T & 1, A = S === (b && d & 1);
          if (d < T && (S = !S), a = S ? 0 : c % l ? l : c, this._lock = 1, this.render(a || ($ ? 0 : rt(d * y)), s, !l)._lock = 0, this._tTime = c, !s && this.parent && wt(this, "onRepeat"), this.vars.repeatRefresh && !$ && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, u = this._tDur, A && (this._lock = 2, a = S ? l : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !$ && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          Wu(this, $);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (m = Hp(this, rt(a), rt(h)), m && (c -= h - (h = m._start))), this._tTime = c, this._time = h, this._act = !g, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !s && !d && (wt(this, "onStart"), this._tTime !== c))
        return this;
      if (h >= a && n >= 0)
        for (p = this._first; p; ) {
          if (_ = p._next, (p._act || h >= p._start) && p._ts && m !== p) {
            if (p.parent !== this)
              return this.render(n, s, o);
            if (p.render(p._ts > 0 ? (h - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (h - p._start) * p._ts, s, o), h !== this._time || !this._ts && !w) {
              m = 0, _ && (c += this._zTime = -q);
              break;
            }
          }
          p = _;
        }
      else {
        p = this._last;
        for (var M = n < 0 ? n : h; p; ) {
          if (_ = p._prev, (p._act || M <= p._end) && p._ts && m !== p) {
            if (p.parent !== this)
              return this.render(n, s, o);
            if (p.render(p._ts > 0 ? (M - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (M - p._start) * p._ts, s, o || at && (p._initted || p._startAt)), h !== this._time || !this._ts && !w) {
              m = 0, _ && (c += this._zTime = M ? -q : q);
              break;
            }
          }
          p = _;
        }
      }
      if (m && !s && (this.pause(), m.render(h >= a ? 0 : -q)._zTime = h >= a ? 1 : -1, this._ts))
        return this._start = v, bi(this), this.render(n, s, o);
      this._onUpdate && !s && wt(this, "onUpdate", !0), (c === u && this._tTime >= this.totalDuration() || !c && a) && (v === this._start || Math.abs(g) !== Math.abs(this._ts)) && (this._lock || ((n || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && Te(this, 1), !s && !(n < 0 && !a) && (c || a || !u) && (wt(this, c === u && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, s) {
    var o = this;
    if (ie(s) || (s = At(this, s, n)), !(n instanceof on)) {
      if (ut(n))
        return n.forEach(function(a) {
          return o.add(a, s);
        }), this;
      if (nt(n))
        return this.addLabel(n, s);
      if (K(n))
        n = Z.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? qt(this, n, s) : this;
  }, e.getChildren = function(n, s, o, a) {
    n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), a === void 0 && (a = -St);
    for (var u = [], l = this._first; l; )
      l._start >= a && (l instanceof Z ? s && u.push(l) : (o && u.push(l), n && u.push.apply(u, l.getChildren(!0, s, o)))), l = l._next;
    return u;
  }, e.getById = function(n) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === n)
        return s[o];
  }, e.remove = function(n) {
    return nt(n) ? this.removeLabel(n) : K(n) ? this.killTweensOf(n) : (Ti(this, n), n === this._recent && (this._recent = this._last), tr(this));
  }, e.totalTime = function(n, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = rt(vt.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), i.prototype.totalTime.call(this, n, s), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, s) {
    return this.labels[n] = At(this, s), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, s, o) {
    var a = Z.delayedCall(0, s || rn, o);
    return a.data = "isPause", this._hasPause = 1, qt(this, a, At(this, n));
  }, e.removePause = function(n) {
    var s = this._first;
    for (n = At(this, n); s; )
      s._start === n && s.data === "isPause" && Te(s), s = s._next;
  }, e.killTweensOf = function(n, s, o) {
    for (var a = this.getTweensOf(n, o), u = a.length; u--; )
      ge !== a[u] && a[u].kill(n, s);
    return this;
  }, e.getTweensOf = function(n, s) {
    for (var o = [], a = Ot(n), u = this._first, l = ie(s), c; u; )
      u instanceof Z ? Fp(u._targets, a) && (l ? (!ge || u._initted && u._ts) && u.globalTime(0) <= s && u.globalTime(u.totalDuration()) > s : !s || u.isActive()) && o.push(u) : (c = u.getTweensOf(a, s)).length && o.push.apply(o, c), u = u._next;
    return o;
  }, e.tweenTo = function(n, s) {
    s = s || {};
    var o = this, a = At(o, n), u = s, l = u.startAt, c = u.onStart, f = u.onStartParams, h = u.immediateRender, p, _ = Z.to(o, Pt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: s.duration || Math.abs((a - (l && "time" in l ? l.time : o._time)) / o.timeScale()) || q,
      onStart: function() {
        if (o.pause(), !p) {
          var y = s.duration || Math.abs((a - (l && "time" in l ? l.time : o._time)) / o.timeScale());
          _._dur !== y && Dr(_, y, 0, 1).render(_._time, !0, !0), p = 1;
        }
        c && c.apply(_, f || []);
      }
    }, s));
    return h ? _.render(0) : _;
  }, e.tweenFromTo = function(n, s, o) {
    return this.tweenTo(s, Pt({
      startAt: {
        time: At(this, n)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(n) {
    return n === void 0 && (n = this._time), ra(this, At(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), ra(this, At(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + q);
  }, e.shiftChildren = function(n, s, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, u = this.labels, l; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (s)
      for (l in u)
        u[l] >= o && (u[l] += n);
    return tr(this);
  }, e.invalidate = function(n) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(n), s = s._next;
    return i.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), tr(this);
  }, e.totalDuration = function(n) {
    var s = 0, o = this, a = o._last, u = St, l, c, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        l = a._prev, a._dirty && a.totalDuration(), c = a._start, c > u && o._sort && a._ts && !o._lock ? (o._lock = 1, qt(o, a, c - a._delay, 1)._lock = 0) : u = c, c < 0 && a._ts && (s -= c, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += c / o._ts, o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), u = 0), a._end > s && a._ts && (s = a._end), a = l;
      Dr(o, o === Y && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (Y._ts && (xu(Y, Zn(n, Y)), $u = vt.frame), vt.frame >= Jo) {
      Jo += Tt.autoSleep || 120;
      var s = Y._first;
      if ((!s || !s._ts) && Tt.autoSleep && vt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || vt.sleep();
      }
    }
  }, t;
}(on);
Pt(ft.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var am = function(t, e, r, n, s, o, a) {
  var u = new mt(this._pt, t, e, 0, 1, tl, null, s), l = 0, c = 0, f, h, p, _, d, y, w, m;
  for (u.b = r, u.e = n, r += "", n += "", (w = ~n.indexOf("random(")) && (n = nn(n)), o && (m = [r, n], o(m, t, e), r = m[0], n = m[1]), h = r.match(Ni) || []; f = Ni.exec(n); )
    _ = f[0], d = n.substring(l, f.index), p ? p = (p + 1) % 5 : d.substr(-5) === "rgba(" && (p = 1), _ !== h[c++] && (y = parseFloat(h[c - 1]) || 0, u._pt = {
      _next: u._pt,
      p: d || c === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: y,
      c: _.charAt(1) === "=" ? gr(y, _) - y : parseFloat(_) - y,
      m: p && p < 4 ? Math.round : 0
    }, l = Ni.lastIndex);
  return u.c = l < n.length ? n.substring(l, n.length) : "", u.fp = a, (vu.test(n) || w) && (u.e = 0), this._pt = u, u;
}, Js = function(t, e, r, n, s, o, a, u, l, c) {
  K(n) && (n = n(s || 0, t, o));
  var f = t[e], h = r !== "get" ? r : K(f) ? l ? t[e.indexOf("set") || !K(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : f, p = K(f) ? l ? hm : Ju : to, _;
  if (nt(n) && (~n.indexOf("random(") && (n = nn(n)), n.charAt(1) === "=" && (_ = gr(h, n) + (st(h) || 0), (_ || _ === 0) && (n = _))), !c || h !== n || ys)
    return !isNaN(h * n) && n !== "" ? (_ = new mt(this._pt, t, e, +h || 0, n - (h || 0), typeof f == "boolean" ? pm : Zu, 0, p), l && (_.fp = l), a && _.modifier(a, this, t), this._pt = _) : (!f && !(e in t) && Ys(e, n), am.call(this, t, e, h, n, p, u || Tt.stringFilter, l));
}, um = function(t, e, r, n, s) {
  if (K(t) && (t = Kr(t, s, e, r, n)), !Gt(t) || t.style && t.nodeType || ut(t) || _u(t))
    return nt(t) ? Kr(t, s, e, r, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Kr(t[a], s, e, r, n);
  return o;
}, Xu = function(t, e, r, n, s, o) {
  var a, u, l, c;
  if (yt[t] && (a = new yt[t]()).init(s, a.rawVars ? e[t] : um(e[t], n, s, o, r), r, n, o) !== !1 && (r._pt = u = new mt(r._pt, s, t, 0, 1, a.render, a, 0, a.priority), r !== dr))
    for (l = r._ptLookup[r._targets.indexOf(s)], c = a._props.length; c--; )
      l[a._props[c]] = u;
  return a;
}, ge, ys, Zs = function i(t, e, r) {
  var n = t.vars, s = n.ease, o = n.startAt, a = n.immediateRender, u = n.lazy, l = n.onUpdate, c = n.runBackwards, f = n.yoyoEase, h = n.keyframes, p = n.autoRevert, _ = t._dur, d = t._startAt, y = t._targets, w = t.parent, m = w && w.data === "nested" ? w.vars.targets : y, g = t._overwrite === "auto" && !Us, v = t.timeline, T, b, $, S, A, M, F, V, z, it, tt, J, et;
  if (v && (!h || !s) && (s = "none"), t._ease = er(s, Pr.ease), t._yEase = f ? Hu(er(f === !0 ? s : f, Pr.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !v && !!n.runBackwards, !v || h && !n.stagger) {
    if (V = y[0] ? Ze(y[0]).harness : 0, J = V && n[V.prop], T = Jn(n, Xs), d && (d._zTime < 0 && d.progress(1), e < 0 && c && a && !p ? d.render(-1, !0) : d.revert(c && _ ? Cn : Np), d._lazy = 0), o) {
      if (Te(t._startAt = Z.set(y, Pt({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !d && dt(u),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return wt(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (at || !a && !p) && t._startAt.revert(Cn), a && _ && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (c && _ && !d) {
      if (e && (a = !1), $ = Pt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !d && dt(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, T), J && ($[V.prop] = J), Te(t._startAt = Z.set(y, $)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (at ? t._startAt.revert(Cn) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        i(t._startAt, q, q);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = _ && dt(u) || u && !_, b = 0; b < y.length; b++) {
      if (A = y[b], F = A._gsap || Qs(y)[b]._gsap, t._ptLookup[b] = it = {}, hs[F.id] && ve.length && Qn(), tt = m === y ? b : m.indexOf(A), V && (z = new V()).init(A, J || T, t, tt, m) !== !1 && (t._pt = S = new mt(t._pt, A, z.name, 0, 1, z.render, z, 0, z.priority), z._props.forEach(function(Rt) {
        it[Rt] = S;
      }), z.priority && (M = 1)), !V || J)
        for ($ in T)
          yt[$] && (z = Xu($, T, t, tt, A, m)) ? z.priority && (M = 1) : it[$] = S = Js.call(t, A, $, "get", T[$], tt, m, 0, n.stringFilter);
      t._op && t._op[b] && t.kill(A, t._op[b]), g && t._pt && (ge = t, Y.killTweensOf(A, it, t.globalTime(e)), et = !t.parent, ge = 0), t._pt && u && (hs[F.id] = 1);
    }
    M && el(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !et, h && e <= 0 && v.render(St, !0, !0);
}, lm = function(t, e, r, n, s, o, a, u) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], c, f, h, p;
  if (!l)
    for (l = t._ptCache[e] = [], h = t._ptLookup, p = t._targets.length; p--; ) {
      if (c = h[p][e], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== e && c.fp !== e; )
          c = c._next;
      if (!c)
        return ys = 1, t.vars[e] = "+=0", Zs(t, a), ys = 0, u ? en(e + " not eligible for reset") : 1;
      l.push(c);
    }
  for (p = l.length; p--; )
    f = l[p], c = f._pt || f, c.s = (n || n === 0) && !s ? n : c.s + (n || 0) + o * c.c, c.c = r - c.s, f.e && (f.e = Q(r) + st(f.e)), f.b && (f.b = c.s + st(f.b));
}, cm = function(t, e) {
  var r = t[0] ? Ze(t[0]).harness : 0, n = r && r.aliases, s, o, a, u;
  if (!n)
    return e;
  s = nr({}, e);
  for (o in n)
    if (o in s)
      for (u = n[o].split(","), a = u.length; a--; )
        s[u[a]] = s[o];
  return s;
}, fm = function(t, e, r, n) {
  var s = e.ease || n || "power1.inOut", o, a;
  if (ut(e))
    a = r[t] || (r[t] = []), e.forEach(function(u, l) {
      return a.push({
        t: l / (e.length - 1) * 100,
        v: u,
        e: s
      });
    });
  else
    for (o in e)
      a = r[o] || (r[o] = []), o === "ease" || a.push({
        t: parseFloat(t),
        v: e[o],
        e: s
      });
}, Kr = function(t, e, r, n, s) {
  return K(t) ? t.call(e, r, n, s) : nt(t) && ~t.indexOf("random(") ? nn(t) : t;
}, Ku = Ks + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Qu = {};
pt(Ku + ",id,stagger,delay,duration,paused,scrollTrigger", function(i) {
  return Qu[i] = 1;
});
var Z = /* @__PURE__ */ function(i) {
  mu(t, i);
  function t(r, n, s, o) {
    var a;
    typeof n == "number" && (s.duration = n, n = s, s = null), a = i.call(this, o ? n : Yr(n)) || this;
    var u = a.vars, l = u.duration, c = u.delay, f = u.immediateRender, h = u.stagger, p = u.overwrite, _ = u.keyframes, d = u.defaults, y = u.scrollTrigger, w = u.yoyoEase, m = n.parent || Y, g = (ut(r) || _u(r) ? ie(r[0]) : "length" in n) ? [r] : Ot(r), v, T, b, $, S, A, M, F;
    if (a._targets = g.length ? Qs(g) : en("GSAP target " + r + " not found. https://gsap.com", !Tt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = p, _ || h || On(l) || On(c)) {
      if (n = a.vars, v = a.timeline = new ft({
        data: "nested",
        defaults: d || {},
        targets: m && m.data === "nested" ? m.vars.targets : g
      }), v.kill(), v.parent = v._dp = Kt(a), v._start = 0, h || On(l) || On(c)) {
        if ($ = g.length, M = h && Ru(h), Gt(h))
          for (S in h)
            ~Ku.indexOf(S) && (F || (F = {}), F[S] = h[S]);
        for (T = 0; T < $; T++)
          b = Jn(n, Qu), b.stagger = 0, w && (b.yoyoEase = w), F && nr(b, F), A = g[T], b.duration = +Kr(l, Kt(a), T, A, g), b.delay = (+Kr(c, Kt(a), T, A, g) || 0) - a._delay, !h && $ === 1 && b.delay && (a._delay = c = b.delay, a._start += c, b.delay = 0), v.to(A, b, M ? M(T, A, g) : 0), v._ease = N.none;
        v.duration() ? l = c = 0 : a.timeline = 0;
      } else if (_) {
        Yr(Pt(v.vars.defaults, {
          ease: "none"
        })), v._ease = er(_.ease || n.ease || "none");
        var V = 0, z, it, tt;
        if (ut(_))
          _.forEach(function(J) {
            return v.to(g, J, ">");
          }), v.duration();
        else {
          b = {};
          for (S in _)
            S === "ease" || S === "easeEach" || fm(S, _[S], b, _.easeEach);
          for (S in b)
            for (z = b[S].sort(function(J, et) {
              return J.t - et.t;
            }), V = 0, T = 0; T < z.length; T++)
              it = z[T], tt = {
                ease: it.e,
                duration: (it.t - (T ? z[T - 1].t : 0)) / 100 * l
              }, tt[S] = it.v, v.to(g, tt, V), V += tt.duration;
          v.duration() < l && v.to({}, {
            duration: l - v.duration()
          });
        }
      }
      l || a.duration(l = v.duration());
    } else
      a.timeline = 0;
    return p === !0 && !Us && (ge = Kt(a), Y.killTweensOf(g), ge = 0), qt(m, Kt(a), s), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !l && !_ && a._start === rt(m._time) && dt(f) && zp(Kt(a)) && m.data !== "nested") && (a._tTime = -q, a.render(Math.max(0, -c) || 0)), y && Cu(Kt(a), y), a;
  }
  var e = t.prototype;
  return e.render = function(n, s, o) {
    var a = this._time, u = this._tDur, l = this._dur, c = n < 0, f = n > u - q && !c ? u : n < q ? 0 : n, h, p, _, d, y, w, m, g, v;
    if (!l)
      Up(this, n, s, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
      if (h = f, g = this.timeline, this._repeat) {
        if (d = l + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(d * 100 + n, s, o);
        if (h = rt(f % d), f === u ? (_ = this._repeat, h = l) : (_ = ~~(f / d), _ && _ === rt(f / d) && (h = l, _--), h > l && (h = l)), w = this._yoyo && _ & 1, w && (v = this._yEase, h = l - h), y = Cr(this._tTime, d), h === a && !o && this._initted && _ === y)
          return this._tTime = f, this;
        _ !== y && (g && this._yEase && Wu(g, w), this.vars.repeatRefresh && !w && !this._lock && this._time !== d && this._initted && (this._lock = o = 1, this.render(rt(d * _), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Du(this, c ? n : h, o, s, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && _ !== y))
          return this;
        if (l !== this._dur)
          return this.render(n, s, o);
      }
      if (this._tTime = f, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = m = (v || this._ease)(h / l), this._from && (this.ratio = m = 1 - m), h && !a && !s && !_ && (wt(this, "onStart"), this._tTime !== f))
        return this;
      for (p = this._pt; p; )
        p.r(m, p.d), p = p._next;
      g && g.render(n < 0 ? n : g._dur * g._ease(h / this._dur), s, o) || this._startAt && (this._zTime = n), this._onUpdate && !s && (c && ds(this, n, s, o), wt(this, "onUpdate")), this._repeat && _ !== y && this.vars.onRepeat && !s && this.parent && wt(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && ds(this, n, !0, !0), (n || !l) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Te(this, 1), !s && !(c && !a) && (f || a || w) && (wt(this, f === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), i.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, s, o, a, u) {
    sn || vt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || Zs(this, l), c = this._ease(l / this._dur), lm(this, n, s, o, a, c, l, u) ? this.resetTo(n, s, o, a, 1) : (Ei(this, 0), this.parent || ku(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, s) {
    if (s === void 0 && (s = "all"), !n && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? Ur(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, s, ge && ge.vars.overwrite !== !0)._first || Ur(this), this.parent && o !== this.timeline.totalDuration() && Dr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, u = n ? Ot(n) : a, l = this._ptLookup, c = this._pt, f, h, p, _, d, y, w;
    if ((!s || s === "all") && Bp(a, u))
      return s === "all" && (this._pt = 0), Ur(this);
    for (f = this._op = this._op || [], s !== "all" && (nt(s) && (d = {}, pt(s, function(m) {
      return d[m] = 1;
    }), s = d), s = cm(a, s)), w = a.length; w--; )
      if (~u.indexOf(a[w])) {
        h = l[w], s === "all" ? (f[w] = s, _ = h, p = {}) : (p = f[w] = f[w] || {}, _ = s);
        for (d in _)
          y = h && h[d], y && ((!("kill" in y.d) || y.d.kill(d) === !0) && Ti(this, y, "_pt"), delete h[d]), p !== "all" && (p[d] = 1);
      }
    return this._initted && !this._pt && c && Ur(this), this;
  }, t.to = function(n, s) {
    return new t(n, s, arguments[2]);
  }, t.from = function(n, s) {
    return Xr(1, arguments);
  }, t.delayedCall = function(n, s, o, a) {
    return new t(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, t.fromTo = function(n, s, o) {
    return Xr(2, arguments);
  }, t.set = function(n, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new t(n, s);
  }, t.killTweensOf = function(n, s, o) {
    return Y.killTweensOf(n, s, o);
  }, t;
}(on);
Pt(Z.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
pt("staggerTo,staggerFrom,staggerFromTo", function(i) {
  Z[i] = function() {
    var t = new ft(), e = ms.call(arguments, 0);
    return e.splice(i === "staggerFromTo" ? 5 : 4, 0, 0), t[i].apply(t, e);
  };
});
var to = function(t, e, r) {
  return t[e] = r;
}, Ju = function(t, e, r) {
  return t[e](r);
}, hm = function(t, e, r, n) {
  return t[e](n.fp, r);
}, dm = function(t, e, r) {
  return t.setAttribute(e, r);
}, eo = function(t, e) {
  return K(t[e]) ? Ju : Hs(t[e]) && t.setAttribute ? dm : to;
}, Zu = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, pm = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, tl = function(t, e) {
  var r = e._pt, n = "";
  if (!t && e.b)
    n = e.b;
  else if (t === 1 && e.e)
    n = e.e;
  else {
    for (; r; )
      n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + n, r = r._next;
    n += e.c;
  }
  e.set(e.t, e.p, n, e);
}, ro = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, mm = function(t, e, r, n) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === n && s.modifier(t, e, r), s = o;
}, gm = function(t) {
  for (var e = this._pt, r, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? Ti(this, e, "_pt") : e.dep || (r = 1), e = n;
  return !r;
}, _m = function(t, e, r, n) {
  n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
}, el = function(t) {
  for (var e = t._pt, r, n, s, o; e; ) {
    for (r = e._next, n = s; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : s = e, (e._next = n) ? n._prev = e : o = e, e = r;
  }
  t._pt = s;
}, mt = /* @__PURE__ */ function() {
  function i(e, r, n, s, o, a, u, l, c) {
    this.t = r, this.s = s, this.c = o, this.p = n, this.r = a || Zu, this.d = u || this, this.set = l || to, this.pr = c || 0, this._next = e, e && (e._prev = this);
  }
  var t = i.prototype;
  return t.modifier = function(r, n, s) {
    this.mSet = this.mSet || this.set, this.set = _m, this.m = r, this.mt = s, this.tween = n;
  }, i;
}();
pt(Ks + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(i) {
  return Xs[i] = 1;
});
Et.TweenMax = Et.TweenLite = Z;
Et.TimelineLite = Et.TimelineMax = ft;
Y = new ft({
  sortChildren: !1,
  defaults: Pr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Tt.stringFilter = Uu;
var rr = [], Mn = {}, ym = [], ia = 0, vm = 0, Vi = function(t) {
  return (Mn[t] || ym).map(function(e) {
    return e();
  });
}, vs = function() {
  var t = Date.now(), e = [];
  t - ia > 2 && (Vi("matchMediaInit"), rr.forEach(function(r) {
    var n = r.queries, s = r.conditions, o, a, u, l;
    for (a in n)
      o = jt.matchMedia(n[a]).matches, o && (u = 1), o !== s[a] && (s[a] = o, l = 1);
    l && (r.revert(), u && e.push(r));
  }), Vi("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(n) {
      return r.add(null, n);
    });
  }), ia = t, Vi("matchMedia"));
}, rl = /* @__PURE__ */ function() {
  function i(e, r) {
    this.selector = r && gs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = vm++, e && this.add(e);
  }
  var t = i.prototype;
  return t.add = function(r, n, s) {
    K(r) && (s = n, n = r, r = K);
    var o = this, a = function() {
      var l = W, c = o.selector, f;
      return l && l !== o && l.data.push(o), s && (o.selector = gs(s)), W = o, f = n.apply(o, arguments), K(f) && o._r.push(f), W = l, o.selector = c, o.isReverted = !1, f;
    };
    return o.last = a, r === K ? a(o, function(u) {
      return o.add(null, u);
    }) : r ? o[r] = a : a;
  }, t.ignore = function(r) {
    var n = W;
    W = null, r(this), W = n;
  }, t.getTweens = function() {
    var r = [];
    return this.data.forEach(function(n) {
      return n instanceof i ? r.push.apply(r, n.getTweens()) : n instanceof Z && !(n.parent && n.parent.data === "nested") && r.push(n);
    }), r;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(r, n) {
    var s = this;
    if (r ? function() {
      for (var a = s.getTweens(), u = s.data.length, l; u--; )
        l = s.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(c) {
          return a.splice(a.indexOf(c), 1);
        }));
      for (a.map(function(c) {
        return {
          g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
          t: c
        };
      }).sort(function(c, f) {
        return f.g - c.g || -1 / 0;
      }).forEach(function(c) {
        return c.t.revert(r);
      }), u = s.data.length; u--; )
        l = s.data[u], l instanceof ft ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof Z) && l.revert && l.revert(r);
      s._r.forEach(function(c) {
        return c(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = rr.length; o--; )
        rr[o].id === this.id && rr.splice(o, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, i;
}(), wm = /* @__PURE__ */ function() {
  function i(e) {
    this.contexts = [], this.scope = e, W && W.data.push(this);
  }
  var t = i.prototype;
  return t.add = function(r, n, s) {
    Gt(r) || (r = {
      matches: r
    });
    var o = new rl(0, s || this.scope), a = o.conditions = {}, u, l, c;
    W && !o.selector && (o.selector = W.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = r;
    for (l in r)
      l === "all" ? c = 1 : (u = jt.matchMedia(r[l]), u && (rr.indexOf(o) < 0 && rr.push(o), (a[l] = u.matches) && (c = 1), u.addListener ? u.addListener(vs) : u.addEventListener("change", vs)));
    return c && n(o, function(f) {
      return o.add(null, f);
    }), this;
  }, t.revert = function(r) {
    this.kill(r || {});
  }, t.kill = function(r) {
    this.contexts.forEach(function(n) {
      return n.kill(r, !0);
    });
  }, i;
}(), ti = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(n) {
      return Vu(n);
    });
  },
  timeline: function(t) {
    return new ft(t);
  },
  getTweensOf: function(t, e) {
    return Y.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, n) {
    nt(t) && (t = Ot(t)[0]);
    var s = Ze(t || {}).get, o = r ? Ou : Su;
    return r === "native" && (r = ""), t && (e ? o((yt[e] && yt[e].get || s)(t, e, r, n)) : function(a, u, l) {
      return o((yt[a] && yt[a].get || s)(t, a, u, l));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = Ot(t), t.length > 1) {
      var n = t.map(function(c) {
        return _t.quickSetter(c, e, r);
      }), s = n.length;
      return function(c) {
        for (var f = s; f--; )
          n[f](c);
      };
    }
    t = t[0] || {};
    var o = yt[e], a = Ze(t), u = a.harness && (a.harness.aliases || {})[e] || e, l = o ? function(c) {
      var f = new o();
      dr._pt = 0, f.init(t, r ? c + r : c, dr, 0, [t]), f.render(1, f), dr._pt && ro(1, dr);
    } : a.set(t, u);
    return o ? l : function(c) {
      return l(t, u, r ? c + r : c, a, 1);
    };
  },
  quickTo: function(t, e, r) {
    var n, s = _t.to(t, nr((n = {}, n[e] = "+=0.1", n.paused = !0, n), r || {})), o = function(u, l, c) {
      return s.resetTo(e, u, l, c);
    };
    return o.tween = s, o;
  },
  isTweening: function(t) {
    return Y.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = er(t.ease, Pr.ease)), Zo(Pr, t || {});
  },
  config: function(t) {
    return Zo(Tt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, n = t.plugins, s = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !yt[a] && !Et[a] && en(e + " effect requires " + a + " plugin.");
    }), Ii[e] = function(a, u, l) {
      return r(Ot(a), Pt(u || {}, s), l);
    }, o && (ft.prototype[e] = function(a, u, l) {
      return this.add(Ii[e](a, Gt(u) ? u : (l = u) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    N[t] = er(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? er(t, e) : N;
  },
  getById: function(t) {
    return Y.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new ft(t), n, s;
    for (r.smoothChildTiming = dt(t.smoothChildTiming), Y.remove(r), r._dp = 0, r._time = r._tTime = Y._time, n = Y._first; n; )
      s = n._next, (e || !(!n._dur && n instanceof Z && n.vars.onComplete === n._targets[0])) && qt(r, n, n._start - n._delay), n = s;
    return qt(Y, r, 0), r;
  },
  context: function(t, e) {
    return t ? new rl(t, e) : W;
  },
  matchMedia: function(t) {
    return new wm(t);
  },
  matchMediaRefresh: function() {
    return rr.forEach(function(t) {
      var e = t.conditions, r, n;
      for (n in e)
        e[n] && (e[n] = !1, r = 1);
      r && t.revert();
    }) || vs();
  },
  addEventListener: function(t, e) {
    var r = Mn[t] || (Mn[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = Mn[t], n = r && r.indexOf(e);
    n >= 0 && r.splice(n, 1);
  },
  utils: {
    wrap: Jp,
    wrapYoyo: Zp,
    distribute: Ru,
    random: Iu,
    snap: Nu,
    normalize: Qp,
    getUnit: st,
    clamp: Gp,
    splitColor: zu,
    toArray: Ot,
    selector: gs,
    mapRange: ju,
    pipe: Xp,
    unitize: Kp,
    interpolate: tm,
    shuffle: Lu
  },
  install: bu,
  effects: Ii,
  ticker: vt,
  updateRoot: ft.updateRoot,
  plugins: yt,
  globalTimeline: Y,
  core: {
    PropTween: mt,
    globals: Eu,
    Tween: Z,
    Timeline: ft,
    Animation: on,
    getCache: Ze,
    _removeLinkedListItem: Ti,
    reverting: function() {
      return at;
    },
    context: function(t) {
      return t && W && (W.data.push(t), t._ctx = W), W;
    },
    suppressOverwrites: function(t) {
      return Us = t;
    }
  }
};
pt("to,from,fromTo,delayedCall,set,killTweensOf", function(i) {
  return ti[i] = Z[i];
});
vt.add(ft.updateRoot);
dr = ti.to({}, {
  duration: 0
});
var Tm = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, bm = function(t, e) {
  var r = t._targets, n, s, o;
  for (n in e)
    for (s = r.length; s--; )
      o = t._ptLookup[s][n], o && (o = o.d) && (o._pt && (o = Tm(o, n)), o && o.modifier && o.modifier(e[n], t, r[s], n));
}, zi = function(t, e) {
  return {
    name: t,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, s, o) {
      o._onInit = function(a) {
        var u, l;
        if (nt(s) && (u = {}, pt(s, function(c) {
          return u[c] = 1;
        }), s = u), e) {
          u = {};
          for (l in s)
            u[l] = e(s[l]);
          s = u;
        }
        bm(a, s);
      };
    }
  };
}, _t = ti.registerPlugin({
  name: "attr",
  init: function(t, e, r, n, s) {
    var o, a, u;
    this.tween = r;
    for (o in e)
      u = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (u || 0) + "", e[o], n, s, 0, 0, o), a.op = o, a.b = u, this._props.push(o);
  },
  render: function(t, e) {
    for (var r = e._pt; r; )
      at ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(t, e) {
    for (var r = e.length; r--; )
      this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
  }
}, zi("roundProps", _s), zi("modifiers"), zi("snap", Nu)) || ti;
Z.version = ft.version = _t.version = "3.12.5";
Tu = 1;
Ws() && Mr();
N.Power0;
N.Power1;
N.Power2;
N.Power3;
N.Power4;
N.Linear;
N.Quad;
N.Cubic;
N.Quart;
N.Quint;
N.Strong;
N.Elastic;
N.Back;
N.SteppedEase;
N.Bounce;
N.Sine;
N.Expo;
N.Circ;
/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var sa, _e, _r, no, Ie, oa, io, Em = function() {
  return typeof window < "u";
}, se = {}, Re = 180 / Math.PI, yr = Math.PI / 180, fr = Math.atan2, aa = 1e8, so = /([A-Z])/g, $m = /(left|right|width|margin|padding|x)/i, Am = /[\s,\(]\S/, Ut = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ws = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, xm = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Sm = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Om = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, nl = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, il = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, km = function(t, e, r) {
  return t.style[e] = r;
}, Pm = function(t, e, r) {
  return t.style.setProperty(e, r);
}, Cm = function(t, e, r) {
  return t._gsap[e] = r;
}, Dm = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, Mm = function(t, e, r, n, s) {
  var o = t._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, Lm = function(t, e, r, n, s) {
  var o = t._gsap;
  o[e] = r, o.renderTransform(s, o);
}, X = "transform", gt = X + "Origin", Rm = function i(t, e) {
  var r = this, n = this.target, s = n.style, o = n._gsap;
  if (t in se && s) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ut[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return r.tfm[a] = Jt(n, a);
      }) : this.tfm[t] = o.x ? o[t] : Jt(n, t), t === gt && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ut.transform.split(",").forEach(function(a) {
        return i.call(r, a, e);
      });
    if (this.props.indexOf(X) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(gt, e, "")), t = X;
  }
  (s || e) && this.props.push(t, e, s[t]);
}, sl = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Nm = function() {
  var t = this.props, e = this.target, r = e.style, n = e._gsap, s, o;
  for (s = 0; s < t.length; s += 3)
    t[s + 1] ? e[t[s]] = t[s + 2] : t[s + 2] ? r[t[s]] = t[s + 2] : r.removeProperty(t[s].substr(0, 2) === "--" ? t[s] : t[s].replace(so, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), s = io(), (!s || !s.isStart) && !r[X] && (sl(r), n.zOrigin && r[gt] && (r[gt] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, ol = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: Nm,
    save: Rm
  };
  return t._gsap || _t.core.getCache(t), e && e.split(",").forEach(function(n) {
    return r.save(n);
  }), r;
}, al, Ts = function(t, e) {
  var r = _e.createElementNS ? _e.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : _e.createElement(t);
  return r && r.style ? r : _e.createElement(t);
}, Ht = function i(t, e, r) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(so, "-$1").toLowerCase()) || n.getPropertyValue(e) || !r && i(t, Lr(e) || e, 1) || "";
}, ua = "O,Moz,ms,Ms,Webkit".split(","), Lr = function(t, e, r) {
  var n = e || Ie, s = n.style, o = 5;
  if (t in s && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(ua[o] + t in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? ua[o] : "") + t;
}, bs = function() {
  Em() && window.document && (sa = window, _e = sa.document, _r = _e.documentElement, Ie = Ts("div") || {
    style: {}
  }, Ts("div"), X = Lr(X), gt = X + "Origin", Ie.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", al = !!Lr("perspective"), io = _t.core.reverting, no = 1);
}, qi = function i(t) {
  var e = Ts("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, n = this.nextSibling, s = this.style.cssText, o;
  if (_r.appendChild(e), e.appendChild(this), this.style.display = "block", t)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = i;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return r && (n ? r.insertBefore(this, n) : r.appendChild(this)), _r.removeChild(e), this.style.cssText = s, o;
}, la = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, ul = function(t) {
  var e;
  try {
    e = t.getBBox();
  } catch {
    e = qi.call(t, !0);
  }
  return e && (e.width || e.height) || t.getBBox === qi || (e = qi.call(t, !0)), e && !e.width && !e.x && !e.y ? {
    x: +la(t, ["x", "cx", "x1"]) || 0,
    y: +la(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, ll = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && ul(t));
}, ir = function(t, e) {
  if (e) {
    var r = t.style, n;
    e in se && e !== gt && (e = X), r.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(n === "--" ? e : e.replace(so, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, ye = function(t, e, r, n, s, o) {
  var a = new mt(t._pt, e, r, 0, 1, o ? il : nl);
  return t._pt = a, a.b = n, a.e = s, t._props.push(r), a;
}, ca = {
  deg: 1,
  rad: 1,
  turn: 1
}, Im = {
  grid: 1,
  flex: 1
}, be = function i(t, e, r, n) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", a = Ie.style, u = $m.test(e), l = t.tagName.toLowerCase() === "svg", c = (l ? "client" : "offset") + (u ? "Width" : "Height"), f = 100, h = n === "px", p = n === "%", _, d, y, w;
  if (n === o || !s || ca[n] || ca[o])
    return s;
  if (o !== "px" && !h && (s = i(t, e, r, "px")), w = t.getCTM && ll(t), (p || o === "%") && (se[e] || ~e.indexOf("adius")))
    return _ = w ? t.getBBox()[u ? "width" : "height"] : t[c], Q(p ? s / _ * f : s / 100 * _);
  if (a[u ? "width" : "height"] = f + (h ? o : n), d = ~e.indexOf("adius") || n === "em" && t.appendChild && !l ? t : t.parentNode, w && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === _e || !d.appendChild) && (d = _e.body), y = d._gsap, y && p && y.width && u && y.time === vt.time && !y.uncache)
    return Q(s / y.width * f);
  if (p && (e === "height" || e === "width")) {
    var m = t.style[e];
    t.style[e] = f + n, _ = t[c], m ? t.style[e] = m : ir(t, e);
  } else
    (p || o === "%") && !Im[Ht(d, "display")] && (a.position = Ht(t, "position")), d === t && (a.position = "static"), d.appendChild(Ie), _ = Ie[c], d.removeChild(Ie), a.position = "absolute";
  return u && p && (y = Ze(d), y.time = vt.time, y.width = d[c]), Q(h ? _ * s / f : _ && s ? f / _ * s : 0);
}, Jt = function(t, e, r, n) {
  var s;
  return no || bs(), e in Ut && e !== "transform" && (e = Ut[e], ~e.indexOf(",") && (e = e.split(",")[0])), se[e] && e !== "transform" ? (s = un(t, n), s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : ri(Ht(t, gt)) + " " + s.zOrigin + "px") : (s = t.style[e], (!s || s === "auto" || n || ~(s + "").indexOf("calc(")) && (s = ei[e] && ei[e](t, e, r) || Ht(t, e) || Au(t, e) || (e === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? be(t, e, s, r) + r : s;
}, Fm = function(t, e, r, n) {
  if (!r || r === "none") {
    var s = Lr(e, t, 1), o = s && Ht(t, s, 1);
    o && o !== r ? (e = s, r = o) : e === "borderColor" && (r = Ht(t, "borderTopColor"));
  }
  var a = new mt(this._pt, t.style, e, 0, 1, tl), u = 0, l = 0, c, f, h, p, _, d, y, w, m, g, v, T;
  if (a.b = r, a.e = n, r += "", n += "", n === "auto" && (d = t.style[e], t.style[e] = n, n = Ht(t, e) || n, d ? t.style[e] = d : ir(t, e)), c = [r, n], Uu(c), r = c[0], n = c[1], h = r.match(hr) || [], T = n.match(hr) || [], T.length) {
    for (; f = hr.exec(n); )
      y = f[0], m = n.substring(u, f.index), _ ? _ = (_ + 1) % 5 : (m.substr(-5) === "rgba(" || m.substr(-5) === "hsla(") && (_ = 1), y !== (d = h[l++] || "") && (p = parseFloat(d) || 0, v = d.substr((p + "").length), y.charAt(1) === "=" && (y = gr(p, y) + v), w = parseFloat(y), g = y.substr((w + "").length), u = hr.lastIndex - g.length, g || (g = g || Tt.units[e] || v, u === n.length && (n += g, a.e += g)), v !== g && (p = be(t, e, d, g) || 0), a._pt = {
        _next: a._pt,
        p: m || l === 1 ? m : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: p,
        c: w - p,
        m: _ && _ < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < n.length ? n.substring(u, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? il : nl;
  return vu.test(n) && (a.e = 0), this._pt = a, a;
}, fa = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, jm = function(t) {
  var e = t.split(" "), r = e[0], n = e[1] || "50%";
  return (r === "top" || r === "bottom" || n === "left" || n === "right") && (t = r, r = n, n = t), e[0] = fa[r] || r, e[1] = fa[n] || n, e.join(" ");
}, Bm = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, n = r.style, s = e.u, o = r._gsap, a, u, l;
    if (s === "all" || s === !0)
      n.cssText = "", u = 1;
    else
      for (s = s.split(","), l = s.length; --l > -1; )
        a = s[l], se[a] && (u = 1, a = a === "transformOrigin" ? gt : X), ir(r, a);
    u && (ir(r, X), o && (o.svg && r.removeAttribute("transform"), un(r, 1), o.uncache = 1, sl(n)));
  }
}, ei = {
  clearProps: function(t, e, r, n, s) {
    if (s.data !== "isFromStart") {
      var o = t._pt = new mt(t._pt, e, r, 0, 0, Bm);
      return o.u = n, o.pr = -10, o.tween = s, t._props.push(r), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, an = [1, 0, 0, 1, 0, 0], cl = {}, fl = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, ha = function(t) {
  var e = Ht(t, X);
  return fl(e) ? an : e.substr(7).match(yu).map(Q);
}, oo = function(t, e) {
  var r = t._gsap || Ze(t), n = t.style, s = ha(t), o, a, u, l;
  return r.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, s = [u.a, u.b, u.c, u.d, u.e, u.f], s.join(",") === "1,0,0,1,0,0" ? an : s) : (s === an && !t.offsetParent && t !== _r && !r.svg && (u = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent) && (l = 1, a = t.nextElementSibling, _r.appendChild(t)), s = ha(t), u ? n.display = u : ir(t, "display"), l && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : _r.removeChild(t))), e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Es = function(t, e, r, n, s, o) {
  var a = t._gsap, u = s || oo(t, !0), l = a.xOrigin || 0, c = a.yOrigin || 0, f = a.xOffset || 0, h = a.yOffset || 0, p = u[0], _ = u[1], d = u[2], y = u[3], w = u[4], m = u[5], g = e.split(" "), v = parseFloat(g[0]) || 0, T = parseFloat(g[1]) || 0, b, $, S, A;
  r ? u !== an && ($ = p * y - _ * d) && (S = v * (y / $) + T * (-d / $) + (d * m - y * w) / $, A = v * (-_ / $) + T * (p / $) - (p * m - _ * w) / $, v = S, T = A) : (b = ul(t), v = b.x + (~g[0].indexOf("%") ? v / 100 * b.width : v), T = b.y + (~(g[1] || g[0]).indexOf("%") ? T / 100 * b.height : T)), n || n !== !1 && a.smooth ? (w = v - l, m = T - c, a.xOffset = f + (w * p + m * d) - w, a.yOffset = h + (w * _ + m * y) - m) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = T, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!r, t.style[gt] = "0px 0px", o && (ye(o, a, "xOrigin", l, v), ye(o, a, "yOrigin", c, T), ye(o, a, "xOffset", f, a.xOffset), ye(o, a, "yOffset", h, a.yOffset)), t.setAttribute("data-svg-origin", v + " " + T);
}, un = function(t, e) {
  var r = t._gsap || new Yu(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var n = t.style, s = r.scaleX < 0, o = "px", a = "deg", u = getComputedStyle(t), l = Ht(t, gt) || "0", c, f, h, p, _, d, y, w, m, g, v, T, b, $, S, A, M, F, V, z, it, tt, J, et, Rt, An, Ir, Fr, Oe, lo, Yt, ke;
  return c = f = h = d = y = w = m = g = v = 0, p = _ = 1, r.svg = !!(t.getCTM && ll(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (n[X] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[X] !== "none" ? u[X] : "")), n.scale = n.rotate = n.translate = "none"), $ = oo(t, r.svg), r.svg && (r.uncache ? (Rt = t.getBBox(), l = r.xOrigin - Rt.x + "px " + (r.yOrigin - Rt.y) + "px", et = "") : et = !e && t.getAttribute("data-svg-origin"), Es(t, et || l, !!et || r.originIsAbsolute, r.smooth !== !1, $)), T = r.xOrigin || 0, b = r.yOrigin || 0, $ !== an && (F = $[0], V = $[1], z = $[2], it = $[3], c = tt = $[4], f = J = $[5], $.length === 6 ? (p = Math.sqrt(F * F + V * V), _ = Math.sqrt(it * it + z * z), d = F || V ? fr(V, F) * Re : 0, m = z || it ? fr(z, it) * Re + d : 0, m && (_ *= Math.abs(Math.cos(m * yr))), r.svg && (c -= T - (T * F + b * z), f -= b - (T * V + b * it))) : (ke = $[6], lo = $[7], Ir = $[8], Fr = $[9], Oe = $[10], Yt = $[11], c = $[12], f = $[13], h = $[14], S = fr(ke, Oe), y = S * Re, S && (A = Math.cos(-S), M = Math.sin(-S), et = tt * A + Ir * M, Rt = J * A + Fr * M, An = ke * A + Oe * M, Ir = tt * -M + Ir * A, Fr = J * -M + Fr * A, Oe = ke * -M + Oe * A, Yt = lo * -M + Yt * A, tt = et, J = Rt, ke = An), S = fr(-z, Oe), w = S * Re, S && (A = Math.cos(-S), M = Math.sin(-S), et = F * A - Ir * M, Rt = V * A - Fr * M, An = z * A - Oe * M, Yt = it * M + Yt * A, F = et, V = Rt, z = An), S = fr(V, F), d = S * Re, S && (A = Math.cos(S), M = Math.sin(S), et = F * A + V * M, Rt = tt * A + J * M, V = V * A - F * M, J = J * A - tt * M, F = et, tt = Rt), y && Math.abs(y) + Math.abs(d) > 359.9 && (y = d = 0, w = 180 - w), p = Q(Math.sqrt(F * F + V * V + z * z)), _ = Q(Math.sqrt(J * J + ke * ke)), S = fr(tt, J), m = Math.abs(S) > 2e-4 ? S * Re : 0, v = Yt ? 1 / (Yt < 0 ? -Yt : Yt) : 0), r.svg && (et = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !fl(Ht(t, X)), et && t.setAttribute("transform", et))), Math.abs(m) > 90 && Math.abs(m) < 270 && (s ? (p *= -1, m += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (_ *= -1, m += m <= 0 ? 180 : -180)), e = e || r.uncache, r.x = c - ((r.xPercent = c && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + o, r.z = h + o, r.scaleX = Q(p), r.scaleY = Q(_), r.rotation = Q(d) + a, r.rotationX = Q(y) + a, r.rotationY = Q(w) + a, r.skewX = m + a, r.skewY = g + a, r.transformPerspective = v + o, (r.zOrigin = parseFloat(l.split(" ")[2]) || !e && r.zOrigin || 0) && (n[gt] = ri(l)), r.xOffset = r.yOffset = 0, r.force3D = Tt.force3D, r.renderTransform = r.svg ? zm : al ? hl : Vm, r.uncache = 0, r;
}, ri = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Ui = function(t, e, r) {
  var n = st(e);
  return Q(parseFloat(e) + parseFloat(be(t, "x", r + "px", n))) + n;
}, Vm = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, hl(t, e);
}, Me = "0deg", Vr = "0px", Le = ") ", hl = function(t, e) {
  var r = e || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, u = r.z, l = r.rotation, c = r.rotationY, f = r.rotationX, h = r.skewX, p = r.skewY, _ = r.scaleX, d = r.scaleY, y = r.transformPerspective, w = r.force3D, m = r.target, g = r.zOrigin, v = "", T = w === "auto" && t && t !== 1 || w === !0;
  if (g && (f !== Me || c !== Me)) {
    var b = parseFloat(c) * yr, $ = Math.sin(b), S = Math.cos(b), A;
    b = parseFloat(f) * yr, A = Math.cos(b), o = Ui(m, o, $ * A * -g), a = Ui(m, a, -Math.sin(b) * -g), u = Ui(m, u, S * A * -g + g);
  }
  y !== Vr && (v += "perspective(" + y + Le), (n || s) && (v += "translate(" + n + "%, " + s + "%) "), (T || o !== Vr || a !== Vr || u !== Vr) && (v += u !== Vr || T ? "translate3d(" + o + ", " + a + ", " + u + ") " : "translate(" + o + ", " + a + Le), l !== Me && (v += "rotate(" + l + Le), c !== Me && (v += "rotateY(" + c + Le), f !== Me && (v += "rotateX(" + f + Le), (h !== Me || p !== Me) && (v += "skew(" + h + ", " + p + Le), (_ !== 1 || d !== 1) && (v += "scale(" + _ + ", " + d + Le), m.style[X] = v || "translate(0, 0)";
}, zm = function(t, e) {
  var r = e || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, u = r.rotation, l = r.skewX, c = r.skewY, f = r.scaleX, h = r.scaleY, p = r.target, _ = r.xOrigin, d = r.yOrigin, y = r.xOffset, w = r.yOffset, m = r.forceCSS, g = parseFloat(o), v = parseFloat(a), T, b, $, S, A;
  u = parseFloat(u), l = parseFloat(l), c = parseFloat(c), c && (c = parseFloat(c), l += c, u += c), u || l ? (u *= yr, l *= yr, T = Math.cos(u) * f, b = Math.sin(u) * f, $ = Math.sin(u - l) * -h, S = Math.cos(u - l) * h, l && (c *= yr, A = Math.tan(l - c), A = Math.sqrt(1 + A * A), $ *= A, S *= A, c && (A = Math.tan(c), A = Math.sqrt(1 + A * A), T *= A, b *= A)), T = Q(T), b = Q(b), $ = Q($), S = Q(S)) : (T = f, S = h, b = $ = 0), (g && !~(o + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (g = be(p, "x", o, "px"), v = be(p, "y", a, "px")), (_ || d || y || w) && (g = Q(g + _ - (_ * T + d * $) + y), v = Q(v + d - (_ * b + d * S) + w)), (n || s) && (A = p.getBBox(), g = Q(g + n / 100 * A.width), v = Q(v + s / 100 * A.height)), A = "matrix(" + T + "," + b + "," + $ + "," + S + "," + g + "," + v + ")", p.setAttribute("transform", A), m && (p.style[X] = A);
}, qm = function(t, e, r, n, s) {
  var o = 360, a = nt(s), u = parseFloat(s) * (a && ~s.indexOf("rad") ? Re : 1), l = u - n, c = n + l + "deg", f, h;
  return a && (f = s.split("_")[1], f === "short" && (l %= o, l !== l % (o / 2) && (l += l < 0 ? o : -o)), f === "cw" && l < 0 ? l = (l + o * aa) % o - ~~(l / o) * o : f === "ccw" && l > 0 && (l = (l - o * aa) % o - ~~(l / o) * o)), t._pt = h = new mt(t._pt, e, r, n, l, xm), h.e = c, h.u = "deg", t._props.push(r), h;
}, da = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, Um = function(t, e, r) {
  var n = da({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, a, u, l, c, f, h, p, _;
  n.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), o[X] = e, a = un(r, 1), ir(r, X), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[X], o[X] = e, a = un(r, 1), o[X] = l);
  for (u in se)
    l = n[u], c = a[u], l !== c && s.indexOf(u) < 0 && (p = st(l), _ = st(c), f = p !== _ ? be(r, u, l, _) : parseFloat(l), h = parseFloat(c), t._pt = new mt(t._pt, a, u, f, h - f, ws), t._pt.u = _ || 0, t._props.push(u));
  da(a, n);
};
pt("padding,margin,Width,Radius", function(i, t) {
  var e = "Top", r = "Right", n = "Bottom", s = "Left", o = (t < 3 ? [e, r, n, s] : [e + s, e + r, n + r, n + s]).map(function(a) {
    return t < 2 ? i + a : "border" + a + i;
  });
  ei[t > 1 ? "border" + i : i] = function(a, u, l, c, f) {
    var h, p;
    if (arguments.length < 4)
      return h = o.map(function(_) {
        return Jt(a, _, l);
      }), p = h.join(" "), p.split(h[0]).length === 5 ? h[0] : p;
    h = (c + "").split(" "), p = {}, o.forEach(function(_, d) {
      return p[_] = h[d] = h[d] || h[(d - 1) / 2 | 0];
    }), a.init(u, p, f);
  };
});
var dl = {
  name: "css",
  register: bs,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, n, s) {
    var o = this._props, a = t.style, u = r.vars.startAt, l, c, f, h, p, _, d, y, w, m, g, v, T, b, $, S;
    no || bs(), this.styles = this.styles || ol(t), S = this.styles.props, this.tween = r;
    for (d in e)
      if (d !== "autoRound" && (c = e[d], !(yt[d] && Xu(d, e, r, n, t, s)))) {
        if (p = typeof c, _ = ei[d], p === "function" && (c = c.call(r, n, t, s), p = typeof c), p === "string" && ~c.indexOf("random(") && (c = nn(c)), _)
          _(this, t, d, c, r) && ($ = 1);
        else if (d.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(d) + "").trim(), c += "", we.lastIndex = 0, we.test(l) || (y = st(l), w = st(c)), w ? y !== w && (l = be(t, d, l, w) + w) : y && (c += y), this.add(a, "setProperty", l, c, n, s, 0, 0, d), o.push(d), S.push(d, 0, a[d]);
        else if (p !== "undefined") {
          if (u && d in u ? (l = typeof u[d] == "function" ? u[d].call(r, n, t, s) : u[d], nt(l) && ~l.indexOf("random(") && (l = nn(l)), st(l + "") || l === "auto" || (l += Tt.units[d] || st(Jt(t, d)) || ""), (l + "").charAt(1) === "=" && (l = Jt(t, d))) : l = Jt(t, d), h = parseFloat(l), m = p === "string" && c.charAt(1) === "=" && c.substr(0, 2), m && (c = c.substr(2)), f = parseFloat(c), d in Ut && (d === "autoAlpha" && (h === 1 && Jt(t, "visibility") === "hidden" && f && (h = 0), S.push("visibility", 0, a.visibility), ye(this, a, "visibility", h ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), d !== "scale" && d !== "transform" && (d = Ut[d], ~d.indexOf(",") && (d = d.split(",")[0]))), g = d in se, g) {
            if (this.styles.save(d), v || (T = t._gsap, T.renderTransform && !e.parseTransform || un(t, e.parseTransform), b = e.smoothOrigin !== !1 && T.smooth, v = this._pt = new mt(this._pt, a, X, 0, 1, T.renderTransform, T, 0, -1), v.dep = 1), d === "scale")
              this._pt = new mt(this._pt, T, "scaleY", T.scaleY, (m ? gr(T.scaleY, m + f) : f) - T.scaleY || 0, ws), this._pt.u = 0, o.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              S.push(gt, 0, a[gt]), c = jm(c), T.svg ? Es(t, c, 0, b, 0, this) : (w = parseFloat(c.split(" ")[2]) || 0, w !== T.zOrigin && ye(this, T, "zOrigin", T.zOrigin, w), ye(this, a, d, ri(l), ri(c)));
              continue;
            } else if (d === "svgOrigin") {
              Es(t, c, 1, b, 0, this);
              continue;
            } else if (d in cl) {
              qm(this, T, d, h, m ? gr(h, m + c) : c);
              continue;
            } else if (d === "smoothOrigin") {
              ye(this, T, "smooth", T.smooth, c);
              continue;
            } else if (d === "force3D") {
              T[d] = c;
              continue;
            } else if (d === "transform") {
              Um(this, c, t);
              continue;
            }
          } else
            d in a || (d = Lr(d) || d);
          if (g || (f || f === 0) && (h || h === 0) && !Am.test(c) && d in a)
            y = (l + "").substr((h + "").length), f || (f = 0), w = st(c) || (d in Tt.units ? Tt.units[d] : y), y !== w && (h = be(t, d, l, w)), this._pt = new mt(this._pt, g ? T : a, d, h, (m ? gr(h, m + f) : f) - h, !g && (w === "px" || d === "zIndex") && e.autoRound !== !1 ? Om : ws), this._pt.u = w || 0, y !== w && w !== "%" && (this._pt.b = l, this._pt.r = Sm);
          else if (d in a)
            Fm.call(this, t, d, l, m ? m + c : c);
          else if (d in t)
            this.add(t, d, l || t[d], m ? m + c : c, n, s);
          else if (d !== "parseTransform") {
            Ys(d, c);
            continue;
          }
          g || (d in a ? S.push(d, 0, a[d]) : S.push(d, 1, l || t[d])), o.push(d);
        }
      }
    $ && el(this);
  },
  render: function(t, e) {
    if (e.tween._time || !io())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Jt,
  aliases: Ut,
  getSetter: function(t, e, r) {
    var n = Ut[e];
    return n && n.indexOf(",") < 0 && (e = n), e in se && e !== gt && (t._gsap.x || Jt(t, "x")) ? r && oa === r ? e === "scale" ? Dm : Cm : (oa = r || {}) && (e === "scale" ? Mm : Lm) : t.style && !Hs(t.style[e]) ? km : ~e.indexOf("-") ? Pm : eo(t, e);
  },
  core: {
    _removeProperty: ir,
    _getMatrix: oo
  }
};
_t.utils.checkPrefix = Lr;
_t.core.getStyleSaver = ol;
(function(i, t, e, r) {
  var n = pt(i + "," + t + "," + e, function(s) {
    se[s] = 1;
  });
  pt(t, function(s) {
    Tt.units[s] = "deg", cl[s] = 1;
  }), Ut[n[13]] = i + "," + t, pt(r, function(s) {
    var o = s.split(":");
    Ut[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
pt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(i) {
  Tt.units[i] = "px";
});
_t.registerPlugin(dl);
var ao = _t.registerPlugin(dl) || _t;
ao.core.Tween;
const Hm = () => {
  console.log("# import taskml Modules! (production)");
};
window.gsap = ao;
ao.defaults({ overwrite: "auto" });
window.Taskml$$ || (Hm(), $d(), window.Taskml$$ = !0);
function Wm(i) {
  const t = i.getAttribute("template"), e = document.querySelector(t);
  if (!e)
    return;
  const r = e.getAttribute("mode") || "";
  sc(r), k() && document.body.setAttribute("debug", "");
}
async function Xm(i = "#app", t = !1) {
  return await (async (r) => {
    const n = Rs(r, document);
    Wm(n);
    let s = n;
    t && s.setAttribute("component-type", "is-app"), n.getAttribute("template") || (n.setAttribute("template", "#taskml"), k() && console.warn("# App template attribute 기본값 사용: #taskml"));
    const o = D.createProvider(), a = new tn({
      owner: window.location.href,
      parent: s,
      provider: o
    });
    D.create(o), D.shorthand(), D.$ns.add(a.ns, {
      alias: "global",
      parseOption: a
    }), await (await Bs(n, a, !0))(), await uu(o, {
      type: "app"
    }), td(s);
  })(i);
}
var Ke, pn;
class Km extends HTMLElement {
  // Custom Elements의 constructor의 실행 시점은 아직 DOM에 추가지되지 않은 상태임
  // 자체 DOM 접근하면 에러 발생함
  constructor() {
    super();
    // debounce render
    P(this, Ke, void 0);
    /////////////////////////////////////////////////////
    // Custom
    /////////////////////////////////////////////////////
    // useShadowRoot Attribute 값으로 설정
    // shadowrootMode : 'false', 'open (default)', 'closed'
    P(this, pn, void 0);
    this.setShadowRootMode(), this.setTemplate(), this.setTemplateData();
  }
  // connectedCallback & disconnectedCallback
  // HTMLElement를 상속받은 경우, 이 Custom Element가 DOM에 추가되거나/제거될 때마다 실행
  // DOM에서 제거됨
  disconnectedCallback() {
  }
  // DOM에 추가됨 (렌더링 등의 처리)
  // 속성/부모/자식의 값을 수정할 수 있음
  connectedCallback() {
    (async () => await this.callRender())();
  }
  // 다른 Document에서 옮겨져 왔음
  // document.adoptNode()가 이 엘리먼트를 대상으로 실행되었을 때 호출됨
  adoptedCallback(e, r) {
  }
  // 모니터링 할 속성 이름
  static get observedAttributes() {
    return [
      "template",
      "template-data",
      "useshadowroot"
    ];
  }
  // 모니터링 할 속성 이름 배열에 있는 속성이 추가/제거/변경될때
  attributeChangedCallback(e, r, n) {
    switch (n === e && (n = ""), e) {
      case "template":
        this.setTemplate(n);
        break;
      case "template-data":
        this.setTemplateData(n);
        break;
      case "useshadowroot":
        this.setShadowRootMode(n);
        break;
    }
    console.log(`* ${e} changed: `, n), this.callRender();
  }
  async callRender() {
    E(this, Ke) && clearTimeout(E(this, Ke)), O(this, Ke, setTimeout(() => {
      this.render(), O(this, Ke, null);
    }));
  }
  //-------------------------------------
  // 오버라이딩
  //-------------------------------------
  // 오버라이딩 : inject 정보 전달
  getInject() {
    console.error(`getInject() 메서드를 오버라이딩하여 $inject 객체를 전달하세요: 
getInject(){
  return $inject;
});`);
  }
  // 오버라이딩 : 기본 템플릿 지정
  defaultTemplate() {
  }
  // 오버라이딩 : 기본 템플릿 데이터 지정
  defaultTemplateData() {
  }
  setShadowRootMode(e) {
    if ((e == null ? void 0 : e.toLowerCase()) === "false")
      return this.shadowrootMode = !1;
    if (e === "closed")
      return this.shadowrootMode = "closed";
    O(this, pn, "open");
  }
  // 문서 영역에서 찾기
  setTemplate(e) {
    this.template = this.getTemplate(e || this.defaultTemplate());
  }
  setTemplateData(e) {
    this.templateData = this.getTemplateData(e || this.defaultTemplateData());
  }
  // searchGlobal true 이면 현재 문서에 정의된 template 만 검색함
  getTemplate(e) {
    if (!e)
      return;
    const r = typeof e;
    return r === "function" ? e() : r !== "string" ? e : document.querySelector(e);
  }
  getTemplateData(e) {
    if (e)
      return Function(`return ${e}`)();
  }
  /////////////////////////////////////////////////////
  // 랜더링
  /////////////////////////////////////////////////////
  // allowTaskml = true;
  async render() {
    var h;
    if (!this.template)
      return;
    let e = E(this, pn);
    const r = e ? this.shadowRoot || this.attachShadow({ mode: e }) : this;
    r.innerHTML = "";
    const n = this.template.getParseOption(), s = this.template.cloneNode(!0), o = this.templateData;
    if (console.log("# 사용자 Element 정의"), console.log("	- template: ", s), console.log("	- templateData: ", o), o) {
      const p = ((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.name) || "data";
      let _ = n.getTemplateString(s);
      const d = zn(_, `${p}, $inject`), y = ar(d);
      s.innerHTML = y(o, this.getInject());
    }
    const a = D.createProvider(), u = n.copy({
      parent: r,
      provider: a
    }), l = { parseOption: u };
    a.$dom.add(l);
    const c = s.content.childNodes;
    let f = await vi(c, u);
    l.nodes = f, xd(u, () => {
      this.create();
    });
  }
  // 쉐도우 돔 자세한 내용들
  // https://ui.toast.com/posts/ko_20170721
  // 오버라이딩
  create() {
    console.error("// 사용자 Element 생성 완료됨: ");
  }
  /////////////////////////////////////////////////////
  // UI 구성
  /////////////////////////////////////////////////////
}
Ke = new WeakMap(), pn = new WeakMap();
export {
  Km as CustomElement,
  Xm as createApp
};
