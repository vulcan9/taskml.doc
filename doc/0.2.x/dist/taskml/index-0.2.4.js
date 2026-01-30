var bu = Object.defineProperty;
var Au = (i, t, e) => t in i ? bu(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var $ = (i, t, e) => (Au(i, typeof t != "symbol" ? t + "" : t, e), e), Pi = (i, t, e) => {
  if (!t.has(i))
    throw TypeError("Cannot " + e);
};
var E = (i, t, e) => (Pi(i, t, "read from private field"), e ? e.call(i) : t.get(i)), k = (i, t, e) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, e);
}, O = (i, t, e, r) => (Pi(i, t, "write to private field"), r ? r.call(i, e) : t.set(i, e), e);
var ki = (i, t, e, r) => ({
  set _(n) {
    O(i, t, n, e);
  },
  get _() {
    return E(i, t, r);
  }
}), Yt = (i, t, e) => (Pi(i, t, "access private method"), e);
const xu = (i, t) => i === t, qt = Symbol("solid-proxy"), wo = Symbol("solid-track"), Fn = {
  equals: xu
};
let Ta = xa;
const xe = 1, jn = 2, Ea = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var W = null;
let Di = null, $u = null, z = null, at = null, ee = null, mi = 0;
function Su(i, t) {
  const e = z, r = W, n = i.length === 0, s = t === void 0 ? r : t, o = n ? Ea : {
    owned: null,
    cleanups: null,
    context: s ? s.context : null,
    owner: s
  }, a = n ? i : () => i(() => wn(() => gi(o)));
  W = o, z = null;
  try {
    return or(a, !0);
  } finally {
    z = e, W = r;
  }
}
function Ou(i, t) {
  t = t ? Object.assign({}, Fn, t) : Fn;
  const e = {
    value: i,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (n) => (typeof n == "function" && (n = n(e.value)), Aa(e, n));
  return [ba.bind(e), r];
}
function _r(i, t, e) {
  const r = Ms(i, t, !1, xe);
  Tn(r);
}
function Pu(i, t, e) {
  Ta = Iu;
  const r = Ms(i, t, !1, xe);
  (!e || !e.render) && (r.user = !0), ee ? ee.push(r) : Tn(r);
}
function ku(i, t, e) {
  e = e ? Object.assign({}, Fn, e) : Fn;
  const r = Ms(i, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = e.equals || void 0, Tn(r), ba.bind(r);
}
function Du(i) {
  return or(i, !1);
}
function wn(i) {
  if (z === null)
    return i();
  const t = z;
  z = null;
  try {
    return i();
  } finally {
    z = t;
  }
}
function Cu(i) {
  Pu(() => wn(i));
}
function Je(i) {
  return W === null || (W.cleanups === null ? W.cleanups = [i] : W.cleanups.push(i)), i;
}
function Qi() {
  return z;
}
function Mu() {
  return W;
}
function Lu(i, t) {
  const e = W, r = z;
  W = i, z = null;
  try {
    return or(t, !0);
  } catch (n) {
    Ls(n);
  } finally {
    W = e, z = r;
  }
}
function ba() {
  if (this.sources && this.state)
    if (this.state === xe)
      Tn(this);
    else {
      const i = at;
      at = null, or(() => Vn(this), !1), at = i;
    }
  if (z) {
    const i = this.observers ? this.observers.length : 0;
    z.sources ? (z.sources.push(this), z.sourceSlots.push(i)) : (z.sources = [this], z.sourceSlots = [i]), this.observers ? (this.observers.push(z), this.observerSlots.push(z.sources.length - 1)) : (this.observers = [z], this.observerSlots = [z.sources.length - 1]);
  }
  return this.value;
}
function Aa(i, t, e) {
  let r = i.value;
  return (!i.comparator || !i.comparator(r, t)) && (i.value = t, i.observers && i.observers.length && or(() => {
    for (let n = 0; n < i.observers.length; n += 1) {
      const s = i.observers[n], o = Di && Di.running;
      o && Di.disposed.has(s), (o ? !s.tState : !s.state) && (s.pure ? at.push(s) : ee.push(s), s.observers && $a(s)), o || (s.state = xe);
    }
    if (at.length > 1e6)
      throw at = [], new Error();
  }, !1)), t;
}
function Tn(i) {
  if (!i.fn)
    return;
  gi(i);
  const t = mi;
  Ru(i, i.value, t);
}
function Ru(i, t, e) {
  let r;
  const n = W, s = z;
  z = W = i;
  try {
    r = i.fn(t);
  } catch (o) {
    return i.pure && (i.state = xe, i.owned && i.owned.forEach(gi), i.owned = null), i.updatedAt = e + 1, Ls(o);
  } finally {
    z = s, W = n;
  }
  (!i.updatedAt || i.updatedAt <= e) && (i.updatedAt != null && "observers" in i ? Aa(i, r) : i.value = r, i.updatedAt = e);
}
function Ms(i, t, e, r = xe, n) {
  const s = {
    fn: i,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: W,
    context: W ? W.context : null,
    pure: e
  };
  return W === null || W !== Ea && (W.owned ? W.owned.push(s) : W.owned = [s]), s;
}
function Bn(i) {
  if (i.state === 0)
    return;
  if (i.state === jn)
    return Vn(i);
  if (i.suspense && wn(i.suspense.inFallback))
    return i.suspense.effects.push(i);
  const t = [i];
  for (; (i = i.owner) && (!i.updatedAt || i.updatedAt < mi); )
    i.state && t.push(i);
  for (let e = t.length - 1; e >= 0; e--)
    if (i = t[e], i.state === xe)
      Tn(i);
    else if (i.state === jn) {
      const r = at;
      at = null, or(() => Vn(i, t[0]), !1), at = r;
    }
}
function or(i, t) {
  if (at)
    return i();
  let e = !1;
  t || (at = []), ee ? e = !0 : ee = [], mi++;
  try {
    const r = i();
    return Nu(e), r;
  } catch (r) {
    e || (ee = null), at = null, Ls(r);
  }
}
function Nu(i) {
  if (at && (xa(at), at = null), i)
    return;
  const t = ee;
  ee = null, t.length && or(() => Ta(t), !1);
}
function xa(i) {
  for (let t = 0; t < i.length; t++)
    Bn(i[t]);
}
function Iu(i) {
  let t, e = 0;
  for (t = 0; t < i.length; t++) {
    const r = i[t];
    r.user ? i[e++] = r : Bn(r);
  }
  for (t = 0; t < e; t++)
    Bn(i[t]);
}
function Vn(i, t) {
  i.state = 0;
  for (let e = 0; e < i.sources.length; e += 1) {
    const r = i.sources[e];
    if (r.sources) {
      const n = r.state;
      n === xe ? r !== t && (!r.updatedAt || r.updatedAt < mi) && Bn(r) : n === jn && Vn(r, t);
    }
  }
}
function $a(i) {
  for (let t = 0; t < i.observers.length; t += 1) {
    const e = i.observers[t];
    e.state || (e.state = jn, e.pure ? at.push(e) : ee.push(e), e.observers && $a(e));
  }
}
function gi(i) {
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
      gi(i.owned[t]);
    i.owned = null;
  }
  if (i.cleanups) {
    for (t = i.cleanups.length - 1; t >= 0; t--)
      i.cleanups[t]();
    i.cleanups = null;
  }
  i.state = 0;
}
function Fu(i) {
  return i instanceof Error ? i : new Error(typeof i == "string" ? i : "Unknown error", {
    cause: i
  });
}
function Ls(i, t = W) {
  throw Fu(i);
}
function Dn() {
  return !0;
}
const ju = {
  get(i, t, e) {
    return t === qt ? e : i.get(t);
  },
  has(i, t) {
    return t === qt ? !0 : i.has(t);
  },
  set: Dn,
  deleteProperty: Dn,
  getOwnPropertyDescriptor(i, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return i.get(t);
      },
      set: Dn,
      deleteProperty: Dn
    };
  },
  ownKeys(i) {
    return i.keys();
  }
};
function Ci(i) {
  return (i = typeof i == "function" ? i() : i) ? i : {};
}
function Bu() {
  for (let i = 0, t = this.length; i < t; ++i) {
    const e = this[i]();
    if (e !== void 0)
      return e;
  }
}
function ar(...i) {
  let t = !1;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    t = t || !!a && qt in a, i[o] = typeof a == "function" ? (t = !0, ku(a)) : a;
  }
  if (t)
    return new Proxy({
      get(o) {
        for (let a = i.length - 1; a >= 0; a--) {
          const l = Ci(i[a])[o];
          if (l !== void 0)
            return l;
        }
      },
      has(o) {
        for (let a = i.length - 1; a >= 0; a--)
          if (o in Ci(i[a]))
            return !0;
        return !1;
      },
      keys() {
        const o = [];
        for (let a = 0; a < i.length; a++)
          o.push(...Object.keys(Ci(i[a])));
        return [...new Set(o)];
      }
    }, ju);
  const e = {}, r = /* @__PURE__ */ Object.create(null);
  for (let o = i.length - 1; o >= 0; o--) {
    const a = i[o];
    if (!a)
      continue;
    const l = Object.getOwnPropertyNames(a);
    for (let u = l.length - 1; u >= 0; u--) {
      const c = l[u];
      if (c === "__proto__" || c === "constructor")
        continue;
      const f = Object.getOwnPropertyDescriptor(a, c);
      if (!r[c])
        r[c] = f.get ? {
          enumerable: !0,
          configurable: !0,
          get: Bu.bind(e[c] = [f.get.bind(a)])
        } : f.value !== void 0 ? f : void 0;
      else {
        const h = e[c];
        h && (f.get ? h.push(f.get.bind(a)) : f.value !== void 0 && h.push(() => f.value));
      }
    }
  }
  const n = {}, s = Object.keys(r);
  for (let o = s.length - 1; o >= 0; o--) {
    const a = s[o], l = r[a];
    l && l.get ? Object.defineProperty(n, a, l) : n[a] = l ? l.value : void 0;
  }
  return n;
}
const Vu = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], Uu = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Vu]), Hu = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), zu = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), qu = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function Wu(i, t) {
  const e = qu[i];
  return typeof e == "object" ? e[t] ? e.$ : void 0 : e;
}
const Gu = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), Yu = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Xu(i, t, e) {
  let r = e.length, n = t.length, s = r, o = 0, a = 0, l = t[n - 1].nextSibling, u = null;
  for (; o < n || a < s; ) {
    if (t[o] === e[a]) {
      o++, a++;
      continue;
    }
    for (; t[n - 1] === e[s - 1]; )
      n--, s--;
    if (n === o) {
      const c = s < r ? a ? e[a - 1].nextSibling : e[s - a] : l;
      for (; a < s; )
        i.insertBefore(e[a++], c);
    } else if (s === a)
      for (; o < n; )
        (!u || !u.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === e[s - 1] && e[a] === t[n - 1]) {
      const c = t[--n].nextSibling;
      i.insertBefore(e[a++], t[o++].nextSibling), i.insertBefore(e[--s], c), t[n] = e[s];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let f = a;
        for (; f < s; )
          u.set(e[f], f++);
      }
      const c = u.get(t[o]);
      if (c != null)
        if (a < c && c < s) {
          let f = o, h = 1, p;
          for (; ++f < n && f < s && !((p = u.get(t[f])) == null || p !== c + h); )
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
const To = "_$DX_DELEGATE";
function Sa(i, t, e, r = {}) {
  let n;
  return Su((s) => {
    n = s, t === document ? i() : Et(t, i(), t.firstChild ? null : void 0, e);
  }, r.owner), () => {
    n(), t.textContent = "";
  };
}
function kt(i, t, e) {
  let r;
  const n = () => {
    const o = document.createElement("template");
    return o.innerHTML = i, e ? o.content.firstChild.firstChild : o.content.firstChild;
  }, s = t ? () => wn(() => document.importNode(r || (r = n()), !0)) : () => (r || (r = n())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function Ku(i, t = window.document) {
  const e = t[To] || (t[To] = /* @__PURE__ */ new Set());
  for (let r = 0, n = i.length; r < n; r++) {
    const s = i[r];
    e.has(s) || (e.add(s), t.addEventListener(s, ic));
  }
}
function Ji(i, t, e) {
  e == null ? i.removeAttribute(t) : i.setAttribute(t, e);
}
function Qu(i, t, e, r) {
  r == null ? i.removeAttributeNS(t, e) : i.setAttributeNS(t, e, r);
}
function Ju(i, t) {
  t == null ? i.removeAttribute("class") : i.className = t;
}
function Zu(i, t, e, r) {
  if (r)
    Array.isArray(e) ? (i[`$$${t}`] = e[0], i[`$$${t}Data`] = e[1]) : i[`$$${t}`] = e;
  else if (Array.isArray(e)) {
    const n = e[0];
    i.addEventListener(t, e[0] = (s) => n.call(i, e[1], s));
  } else
    i.addEventListener(t, e);
}
function tc(i, t, e = {}) {
  const r = Object.keys(t || {}), n = Object.keys(e);
  let s, o;
  for (s = 0, o = n.length; s < o; s++) {
    const a = n[s];
    !a || a === "undefined" || t[a] || (Eo(i, a, !1), delete e[a]);
  }
  for (s = 0, o = r.length; s < o; s++) {
    const a = r[s], l = !!t[a];
    !a || a === "undefined" || e[a] === l || !l || (Eo(i, a, !0), e[a] = l);
  }
  return e;
}
function ec(i, t, e) {
  if (!t)
    return e ? Ji(i, "style") : t;
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
  return r || _r(() => n.children = kr(i, t.children, n.children)), _r(() => t.ref && t.ref(i)), _r(() => rc(i, t, e, !0, n, !0)), n;
}
function _i(i, t, e) {
  return wn(() => i(t, e));
}
function Et(i, t, e, r) {
  if (e !== void 0 && !r && (r = []), typeof t != "function")
    return kr(i, t, r, e);
  _r((n) => kr(i, t(), n, e), r);
}
function rc(i, t, e, r, n = {}, s = !1) {
  t || (t = {});
  for (const o in n)
    if (!(o in t)) {
      if (o === "children")
        continue;
      n[o] = bo(i, o, null, n[o], e, s);
    }
  for (const o in t) {
    if (o === "children") {
      r || kr(i, t.children);
      continue;
    }
    const a = t[o];
    n[o] = bo(i, o, a, n[o], e, s);
  }
}
function nc(i) {
  return i.toLowerCase().replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function Eo(i, t, e) {
  const r = t.trim().split(/\s+/);
  for (let n = 0, s = r.length; n < s; n++)
    i.classList.toggle(r[n], e);
}
function bo(i, t, e, r, n, s) {
  let o, a, l, u, c;
  if (t === "style")
    return ec(i, e, r);
  if (t === "classList")
    return tc(i, e, r);
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
    const f = t.slice(2).toLowerCase(), h = Gu.has(f);
    if (!h && r) {
      const p = Array.isArray(r) ? r[0] : r;
      i.removeEventListener(f, p);
    }
    (h || e) && (Zu(i, f, e, h), h && Ku([f]));
  } else if (t.slice(0, 5) === "attr:")
    Ji(i, t.slice(5), e);
  else if ((c = t.slice(0, 5) === "prop:") || (l = Hu.has(t)) || !n && ((u = Wu(t, i.tagName)) || (a = Uu.has(t))) || (o = i.nodeName.includes("-")))
    c && (t = t.slice(5), a = !0), t === "class" || t === "className" ? Ju(i, e) : o && !a && !l ? i[nc(t)] = e : i[u || t] = e;
  else {
    const f = n && t.indexOf(":") > -1 && Yu[t.split(":")[0]];
    f ? Qu(i, f, t, e) : Ji(i, zu[t] || t, e);
  }
  return e;
}
function ic(i) {
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
function kr(i, t, e, r, n) {
  for (; typeof e == "function"; )
    e = e();
  if (t === e)
    return e;
  const s = typeof t, o = r !== void 0;
  if (i = o && e[0] && e[0].parentNode || i, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), o) {
      let a = e[0];
      a && a.nodeType === 3 ? a.data !== t && (a.data = t) : a = document.createTextNode(t), e = fr(i, e, r, a);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  else if (t == null || s === "boolean")
    e = fr(i, e, r);
  else {
    if (s === "function")
      return _r(() => {
        let a = t();
        for (; typeof a == "function"; )
          a = a();
        e = kr(i, a, e, r);
      }), () => e;
    if (Array.isArray(t)) {
      const a = [], l = e && Array.isArray(e);
      if (Zi(a, t, e, n))
        return _r(() => e = kr(i, a, e, r, !0)), () => e;
      if (a.length === 0) {
        if (e = fr(i, e, r), o)
          return e;
      } else
        l ? e.length === 0 ? Ao(i, a, r) : Xu(i, e, a) : (e && fr(i), Ao(i, a));
      e = a;
    } else if (t.nodeType) {
      if (Array.isArray(e)) {
        if (o)
          return e = fr(i, e, r, t);
        fr(i, e, null, t);
      } else
        e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    }
  }
  return e;
}
function Zi(i, t, e, r) {
  let n = !1;
  for (let s = 0, o = t.length; s < o; s++) {
    let a = t[s], l = e && e[s], u;
    if (!(a == null || a === !0 || a === !1))
      if ((u = typeof a) == "object" && a.nodeType)
        i.push(a);
      else if (Array.isArray(a))
        n = Zi(i, a, l) || n;
      else if (u === "function")
        if (r) {
          for (; typeof a == "function"; )
            a = a();
          n = Zi(i, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || n;
        } else
          i.push(a), n = !0;
      else {
        const c = String(a);
        l && l.nodeType === 3 && l.data === c ? i.push(l) : i.push(document.createTextNode(c));
      }
  }
  return n;
}
function Ao(i, t, e = null) {
  for (let r = 0, n = t.length; r < n; r++)
    i.insertBefore(t[r], e);
}
function fr(i, t, e, r) {
  if (e === void 0)
    return i.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const a = t[o];
      if (n !== a) {
        const l = a.parentNode === i;
        !s && !o ? l ? i.replaceChild(n, a) : i.insertBefore(n, e) : l && a.remove();
      } else
        s = !0;
    }
  } else
    i.insertBefore(n, e);
  return [n];
}
const sc = "is", oc = "-", Ne = ["task", "as-task"], Dr = "task:", Oa = "component-type";
function Pa(i, t = sc) {
  return t = t ? t + oc : "", t + i;
}
const ts = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), En = {
  getAll: () => Un,
  // 컴포넌트 이름으로 생성자 찾기
  component: (i) => ts.get(i.toLowerCase()),
  // Task 아이템 이름으로 생성자 찾기
  taskItem: (i) => Un.get(i.toLowerCase())
};
function Ct(i, t, e) {
  const r = Pa(i, e), n = (s) => (s = ar(s, {
    // [attrName]: '',
    [Oa]: r.toLowerCase()
  }), new t().create(s));
  return ts.has(r) || ts.set(r.toLowerCase(), n), n;
}
function j(i, t) {
  const e = i, r = (...n) => new t().create(...n);
  return Un.has(e) || Un.set(e.toLowerCase(), r), r;
}
const es = Symbol("store-raw"), yr = Symbol("store-node"), Qt = Symbol("store-has"), ka = Symbol("store-self");
function Da(i) {
  let t = i[qt];
  if (!t && (Object.defineProperty(i, qt, {
    value: t = new Proxy(i, uc)
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
function Hn(i) {
  let t;
  return i != null && typeof i == "object" && (i[qt] || !(t = Object.getPrototypeOf(i)) || t === Object.prototype || Array.isArray(i));
}
function rn(i, t = /* @__PURE__ */ new Set()) {
  let e, r, n, s;
  if (e = i != null && i[es])
    return e;
  if (!Hn(i) || t.has(i))
    return i;
  if (Array.isArray(i)) {
    Object.isFrozen(i) ? i = i.slice(0) : t.add(i);
    for (let o = 0, a = i.length; o < a; o++)
      n = i[o], (r = rn(n, t)) !== n && (i[o] = r);
  } else {
    Object.isFrozen(i) ? i = Object.assign({}, i) : t.add(i);
    const o = Object.keys(i), a = Object.getOwnPropertyDescriptors(i);
    for (let l = 0, u = o.length; l < u; l++)
      s = o[l], !a[s].get && (n = i[s], (r = rn(n, t)) !== n && (i[s] = r));
  }
  return i;
}
function zn(i, t) {
  let e = i[t];
  return e || Object.defineProperty(i, t, {
    value: e = /* @__PURE__ */ Object.create(null)
  }), e;
}
function nn(i, t, e) {
  if (i[t])
    return i[t];
  const [r, n] = Ou(e, {
    equals: !1,
    internal: !0
  });
  return r.$ = n, i[t] = r;
}
function ac(i, t) {
  const e = Reflect.getOwnPropertyDescriptor(i, t);
  return !e || e.get || !e.configurable || t === qt || t === yr || (delete e.value, delete e.writable, e.get = () => i[qt][t]), e;
}
function Ca(i) {
  Qi() && nn(zn(i, yr), ka)();
}
function lc(i) {
  return Ca(i), Reflect.ownKeys(i);
}
const uc = {
  get(i, t, e) {
    if (t === es)
      return i;
    if (t === qt)
      return e;
    if (t === wo)
      return Ca(i), e;
    const r = zn(i, yr), n = r[t];
    let s = n ? n() : i[t];
    if (t === yr || t === Qt || t === "__proto__")
      return s;
    if (!n) {
      const o = Object.getOwnPropertyDescriptor(i, t);
      Qi() && (typeof s != "function" || i.hasOwnProperty(t)) && !(o && o.get) && (s = nn(r, t, s)());
    }
    return Hn(s) ? Da(s) : s;
  },
  has(i, t) {
    return t === es || t === qt || t === wo || t === yr || t === Qt || t === "__proto__" ? !0 : (Qi() && nn(zn(i, Qt), t)(), t in i);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: lc,
  getOwnPropertyDescriptor: ac
};
function qn(i, t, e, r = !1) {
  if (!r && i[t] === e)
    return;
  const n = i[t], s = i.length;
  e === void 0 ? (delete i[t], i[Qt] && i[Qt][t] && n !== void 0 && i[Qt][t].$()) : (i[t] = e, i[Qt] && i[Qt][t] && n === void 0 && i[Qt][t].$());
  let o = zn(i, yr), a;
  if ((a = nn(o, t, n)) && a.$(() => e), Array.isArray(i) && i.length !== s) {
    for (let l = i.length; l < s; l++)
      (a = o[l]) && a.$();
    (a = nn(o, "length", s)) && a.$(i.length);
  }
  (a = o[ka]) && a.$();
}
function Ma(i, t) {
  const e = Object.keys(t);
  for (let r = 0; r < e.length; r += 1) {
    const n = e[r];
    qn(i, n, t[n]);
  }
}
function cc(i, t) {
  if (typeof t == "function" && (t = t(i)), t = rn(t), Array.isArray(t)) {
    if (i === t)
      return;
    let e = 0, r = t.length;
    for (; e < r; e++) {
      const n = t[e];
      i[e] !== n && qn(i, e, n);
    }
    qn(i, "length", r);
  } else
    Ma(i, t);
}
function Wr(i, t, e = []) {
  let r, n = i;
  if (t.length > 1) {
    r = t.shift();
    const o = typeof r, a = Array.isArray(i);
    if (Array.isArray(r)) {
      for (let l = 0; l < r.length; l++)
        Wr(i, [r[l]].concat(t), e);
      return;
    } else if (a && o === "function") {
      for (let l = 0; l < i.length; l++)
        r(i[l], l) && Wr(i, [l].concat(t), e);
      return;
    } else if (a && o === "object") {
      const {
        from: l = 0,
        to: u = i.length - 1,
        by: c = 1
      } = r;
      for (let f = l; f <= u; f += c)
        Wr(i, [f].concat(t), e);
      return;
    } else if (t.length > 1) {
      Wr(i[r], t, [r].concat(e));
      return;
    }
    n = i[r], e = [r].concat(e);
  }
  let s = t[0];
  typeof s == "function" && (s = s(n, e), s === n) || r === void 0 && s == null || (s = rn(s), r === void 0 || Hn(n) && Hn(s) && !Array.isArray(s) ? Ma(n, s) : qn(i, r, s));
}
function fc(...[i, t]) {
  const e = rn(i || {}), r = Array.isArray(e), n = Da(e);
  function s(...o) {
    Du(() => {
      r && o.length === 1 ? cc(e, o[0]) : Wr(e, o);
    });
  }
  return [n, s];
}
const hc = () => {
  const [i, t] = fc({
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
let La = !1;
const P = () => La;
let Ra = !1;
const I = () => Ra;
let Na = !1;
const dc = () => Na, pc = (i) => {
  La = i.includes("dev"), Ra = i.includes("media"), Na = i.includes("component");
};
hc();
class mc {
  constructor() {
    // (디버깅용)
    $(this, "debug");
    this.debug = P();
  }
}
function Ia(i, t) {
  let e = "[" + t + "]";
  const r = Kr(e);
  return lr(r)(i);
}
function xo(i, t) {
  return bn(i, t, "string");
}
function Fa(i, t, e = null) {
  const r = yi(t), n = lr(r);
  return e ? n.bind(e)(i) : n(i);
}
function bn(i, t, e = "string") {
  if (typeof t != "string")
    return t;
  let r;
  if (e === "string") {
    if (r = _c(t), !r)
      return t;
  } else
    e === "code" ? r = yi(t) : (r = gc(t), r || (r = Kr(t)));
  const s = lr(r)(i);
  return e === "number" ? Number(s) : e === "boolean" ? !!s : s;
}
function lr(i) {
  if (!(i === "undefined" || i === void 0))
    return Function(`"use strict";
 return ` + i)();
}
function Wn(i, t = "$args") {
  return "(function(" + t + "){ return (`" + i + "`) })";
}
function Kr(i, t = "$args") {
  return "(function(" + t + "){ return (" + i + ") })";
}
function yi(i, t = "$args") {
  const e = i.match(/([\s\S]+[^;\s]+)[;\s]*;?/g);
  return e != null && e.length && (i = e[0]), /\(*return\s[\s\S]+\)*/gms.test(i) ? "(function(" + t + "){ " + i + " })" : /\(*function(\s|\()[\s\S]+\)*/gms.test(i) || /\(+[\s\S]+\)\s*=>[\s\S]+\)*/.test(i) ? "(function(" + t + "){ return (" + i + ") })" : i.includes(";") ? (i = "(() => {" + i + "})()", "(function(" + t + "){ return " + i + " })") : "(function(" + t + "){ return (" + i + ") })";
}
const $o = /\$\{\s*(\$args(\s*\[\s*(\d+)\s*\])?)\s*\}/mg, rs = /\$\{[\s\S]+\}/mg, ns = /\$args(\s*\[\s*(\d+)\s*\])?/mg;
function gc(i) {
  const t = i.match($o);
  if ((t == null ? void 0 : t.length) > 0)
    return i = i.replace($o, (a, l) => l), Kr(i);
  const r = i.match(rs);
  if ((r == null ? void 0 : r.length) > 0)
    return i = i.replace(rs, (a, l) => "`" + a + "`"), Kr(i);
  const s = i.match(ns);
  if ((s == null ? void 0 : s.length) > 0)
    return Kr(i);
}
function _c(i) {
  const t = i.match(rs);
  if ((t == null ? void 0 : t.length) > 0)
    return Wn(i);
  const r = i.match(ns);
  if ((r == null ? void 0 : r.length) > 0)
    return i = i.replace(ns, (s) => "${" + s + "}"), Wn(i);
}
const Rt = {
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
}, Ot = {
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
class hr {
  // 현재 엘리먼트의 실제 translate(m41, m42) 값을 가져옴
  // https://stackoverflow.com/questions/42267189/how-to-get-value-translatex-by-javascript
  static getTranslate(t) {
    const e = getComputedStyle(t), r = new DOMMatrixReadOnly(e.transform);
    return { x: r.m41, y: r.m42 };
  }
  // 부모의 모든 transform을 합산한 matrix
  static getCombinedMatrix(t) {
    let e = t;
    const r = [];
    for (; e && e !== document.body; ) {
      const o = window.getComputedStyle(e).transform;
      o && o !== "none" && r.push(new DOMMatrix(o)), e = e.parentElement;
    }
    let n = new DOMMatrix();
    for (; r.length > 0; )
      n = n.multiply(r.pop());
    return n;
  }
  // 글로벌 좌표의 차이를 element 부모의 로컬 좌표계 거리로 환산
  static getLocalDelta(t, e, r) {
    const n = r.parentElement;
    if (!n)
      return { x: e.x - t.x, y: e.y - t.y };
    const o = this.getCombinedMatrix(n).inverse();
    let a = new DOMPoint(t.x, t.y), l = new DOMPoint(e.x, e.y);
    return a = a.matrixTransform(o), l = l.matrixTransform(o), {
      x: l.x - a.x,
      y: l.y - a.y
    };
  }
  // element 좌표계의 지점을 Global 좌표로 바꿔줌
  static getGlobalPoint(t, e = 0, r = 0) {
    let n = new DOMMatrix(), s = t;
    for (; s && s !== document.documentElement; ) {
      const a = window.getComputedStyle(s), l = new DOMMatrix(a.transform === "none" ? "" : a.transform), u = s.offsetLeft || 0, c = s.offsetTop || 0, f = a.transformOrigin.split(" ").map(parseFloat), h = f[0] || 0, p = f[1] || 0;
      n = new DOMMatrix().translate(u + h, c + p).multiply(l).translate(-h, -p).multiply(n), s = s.offsetParent || s.parentElement;
    }
    return new DOMPoint(e, r).matrixTransform(n);
  }
}
const yc = "is-virtual-drag-root", vc = "is-virtual-drag-target";
class wc {
  constructor() {
  }
  create(t, e) {
    const r = this.createGhost(t);
    let n;
    try {
      n = this.cloneRootCase(t);
    } catch {
    }
    return this.setStyle(n, e), r.appendChild(n), r;
  }
  // -------------------------------------
  // Ghost
  // -------------------------------------
  createGhost(t) {
    const e = window.document.createElement("div");
    e.id = "ghost";
    const r = t.getBoundingClientRect();
    return Object.assign(e.style, {
      width: `${r.width}px`,
      height: `${r.height}px`
    }), this.setGhostStyle(e), e;
  }
  setGhostStyle(t) {
    Object.assign(t.style, {
      position: "absolute",
      top: "0px",
      left: "0px",
      zIndex: 1e4,
      pointerEvents: "none",
      transition: "none",
      willChange: "transform",
      overflow: "hidden"
    });
  }
  setStyle(t, e) {
    if (e)
      for (let r in e)
        t.style[r] = e[r];
  }
  // -------------------------------------
  // 구조 복사
  // -------------------------------------
  /*
      cloneNode를 사용할 때 발생하는 스타일 유실 문제
        - 특히 자식 선택자(parent > child)나 컨텍스트 기반 스타일이 적용된 경우
        - .targetText:nth-child(6) 같은 selector의 CSS 는 복제 안됨
  
      (fixed) 스타일을 복제하여 inline으로 적용 시켜줌
        - 재귀 순환하며 모든 자식요소의 스타일을 1:1로 복제
        - 복잡한 구조인 경우 성능 이슈가 발생함
      */
  /*
  1. root parent 까지 모든 노드를 clone(false) 복제한다. (구조 유지)
  2. target node는 clone(true)로 복제한다.
  3. ancestor와 관련 없는 중간 단계의 부모 및 nth-child는 모두 display: none 으로 설정한다.
  4. 의사 요소(Pseudo-elements)의 스타일을 제거하기 위해 특정 classname을 부여한다
  5. transform 문제를 해결한다. (scale, rotate)
  */
  cloneRootCase(t) {
    const { root: e, virtualTarget: r } = this.createVirtualTree(t);
    return r.style.transform = this.getTransform(t), r.style.transformOrigin = "0 0", e;
  }
  createVirtualTree(t) {
    const e = [];
    let r = t;
    for (; r && r !== document.body; )
      e.push(r), r = r.parentElement;
    e.reverse();
    let n = null, s = null;
    return e.forEach((o, a) => {
      const l = o === t, u = o.cloneNode(l);
      l ? this.setTargetStyle(u) : a === 0 ? (n = u, this.setRootStyle(u)) : this.setParentStyle(u), s && Array.from(o.parentElement.children).forEach((f) => {
        if (f === o) {
          s.appendChild(u);
          return;
        }
        const h = document.createElement(f.tagName);
        h.style.display = "none", s.appendChild(h);
      }), s = u;
    }), n.classList.add(yc), s.classList.add(vc), { root: n, virtualTarget: s };
  }
  // -------------------------------------
  // 스타일 적용
  // -------------------------------------
  setTargetStyle(t) {
    Object.assign(t.style, {
      position: "absolute",
      top: "0",
      left: "0",
      // width: 'max-content', height: 'auto',
      margin: "0",
      transform: "none"
    });
  }
  setRootStyle(t) {
    Object.assign(t.style, {
      display: "block",
      width: "100vw",
      height: "100vh",
      position: "relative",
      top: "0",
      left: "0",
      margin: "0",
      padding: "0",
      border: "none",
      background: "none",
      // pointerEvents: 'none', zIndex: '9999',
      transform: "none"
      // 부모 스케일 무시
    });
  }
  setParentStyle(t) {
    Object.assign(t.style, {
      display: "block",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      margin: "0",
      padding: "0",
      border: "none",
      background: "none",
      transform: "none"
    });
  }
  // -------------------------------------
  // transform 적용
  // -------------------------------------
  /*
  // 가상 타겟에 누적 transform을 먼저 적용합니다. (그래야 크기와 회전이 결정됨)
  virtualTarget.style.transformOrigin = '0 0';
  virtualTarget.style.transform = combinedTransform;
  // 부모가 모두 top:0, left:0 이므로 이 rect 값은 순수하게 transform에 의한 치우침입니다.
  rect = virtualTarget.getBoundingClientRect();
  */
  getTransform(t) {
    const e = t.offsetWidth, r = t.offsetHeight, n = this.getCombinedTransform(t), { minX: s, minY: o } = this.getTransformOffset(n, e, r);
    return `translate(${-s}px, ${-o}px) ${n}`;
  }
  getTransformOffset(t, e, r) {
    const n = new DOMMatrix(t), s = [
      n.transformPoint({ x: 0, y: 0 }),
      // 원점
      n.transformPoint({ x: e, y: 0 }),
      // 우상단
      n.transformPoint({ x: 0, y: r }),
      // 좌하단
      n.transformPoint({ x: e, y: r })
      // 우하단
    ], o = Math.min(...s.map((l) => l.x)), a = Math.min(...s.map((l) => l.y));
    return { minX: o, minY: a };
  }
  getCombinedTransform(t) {
    let e = t, r = [];
    for (; e && e !== document.body; ) {
      const s = window.getComputedStyle(e).transform;
      s && s !== "none" && r.push(s), e = e.parentElement;
    }
    return r.join(" ");
  }
  // (사용안함)
  // 아래 target clone 방식은 구조적으로 정의된 CSS의 스타일이 누락되는 단점이 있음
  /*
      cloneNode를 사용할 때 발생하는 스타일 유실 문제
        - 특히 자식 선택자(parent > child)나 컨텍스트 기반 스타일이 적용된 경우
        - .targetText:nth-child(6) 같은 selector의 CSS 는 복제 안됨
  
      (fixed) 스타일을 복제하여 inline으로 적용 시켜줌
        - 재귀 순환하며 모든 자식요소의 스타일을 1:1로 복제
        - 복잡한 구조인 경우 성능 이슈가 발생함
  
      ghost = (new GhostImage()).create(dragElement, {
          transform: `scale(${this.scale})`,
          transformOrigin: '0% 0%'
      });
      */
  /*
      cloneCase(element, clone){
          // 부모 컨텍스트 유실로 인한 스타일 깨짐 방지를 위해 계산된 스타일 복제 수행
          // 무거운 스타일 복제는 다음 프레임으로 미룸 (세션 끊김 방지)
          // requestAnimationFrame(() => {
          this.setCloneNodeStyles(element, clone);
          // });
          return clone;
      }
  
      setCloneNodeStyles (element, clone){
          this.copyStyles(element, clone);
  
          // 위치에 Margin 보정
          clone.style.margin = 0;
          clone.style.transition = "none";
          clone.style.position = 'absolute';
          clone.style.left = 0;
          clone.style.top = 0;
          // clone.style.transform = `scale(${this.scale})`;
          // clone.style.transformOrigin = '0% 0%';
      }
  
      copyStyles (source, target){
          const computedStyle = window.getComputedStyle(source);
  
          for (const key of computedStyle) {
              target.style[key] = computedStyle.getPropertyValue(key);
          }
  
          // 자식 요소들에 대해서도 재귀적으로 수행
          for (let i = 0; i < source.children.length; i++) {
              this.copyStyles(source.children[i], target.children[i]);
          }
      }
      */
}
let tt = null, J = null;
const Mi = function(i, t) {
  if (!P())
    return;
  const e = `taskml_test_point_${i}`;
  var r = document.getElementById(e);
  r || (r = document.createElement("div"), r.id = e, r.textContent = i, r.style.cssText = `
                background-color: #00b7ff;
                color: white;
                text-align: center;
                border-radius: 100%;
                font-size: 6px;
                
                position: fixed;
                width: 10px; height: 10px;
                z-index: 10000;
                left: 0; top: 0;
            `, document.body.appendChild(r)), r.style.left = `${t.x}px` || 0, r.style.top = `${t.y}px` || 0;
};
var Er;
class ja {
  constructor(t) {
    $(this, "dndID");
    $(this, "dragValue");
    // 마우스 아래 좌표에 있는 드랍 가능한 element
    $(this, "dropArea");
    // 드래그 전, 후 위치 (글로벌 좌표임)
    $(this, "position");
    $(this, "scale");
    $(this, "shiftX");
    $(this, "shiftY");
    $(this, "isMoved", !1);
    //---------------------------
    // ghost 이미지 표시
    //---------------------------
    k(this, Er, void 0);
    this.dndID = t;
  }
  get ghost() {
    return tt;
  }
  get dragElement() {
    return J;
  }
  //---------------------------
  // drag
  //---------------------------
  get dndSelector() {
    return `[${sn}=${this.dndID}]`;
  }
  setDrag(t, e, r) {
    return this.dragValue = r, () => {
    };
  }
  getTouchObj(t) {
    return "changedTouches" in t ? t.changedTouches[0] : t;
  }
  _onDragInit(t) {
    this.setGhost(), this.getPositionInfo(t);
    let e = this.getTouchObj(t);
    this.moveAt(e.pageX, e.pageY), this.dispatchEvent("dragstart", J, t);
  }
  onDragStart(t) {
    J = t.target.closest(this.dndSelector), this.scale = Rt.getZoomRate(J);
  }
  onDragEnd(t) {
    let e = !1;
    if (this.isMoved) {
      if (this.isMoved = !1, this.dropArea) {
        const r = this.dispatchDropEvent(t);
        this.dispatchResultEvent(this.dropArea, r.detail).defaultPrevented && (e = !0);
      }
      if (J) {
        const r = this.dispatchEvent("dragend", J, t);
        this.dispatchResultEvent(J, r.detail).defaultPrevented && (e = !0);
      }
      this.leaveDroppable(), this.deleteGhost(e);
    }
    this.dropArea = null, this.position = null, this.shiftX = null, this.shiftY = null;
  }
  // 위치 찾기
  // https://javascript.info/mouse-drag-and-drop
  onDrag(t) {
    if (!this.isMoved) {
      this.isMoved = !0, this._onDragInit(t);
      return;
    }
    let e = this.getTouchObj(t);
    if (e.clientX === 0 && e.clientX === 0)
      return;
    this.moveAt(e.pageX, e.pageY), tt.hidden = !0;
    let r = document.elementFromPoint(e.clientX, e.clientY);
    if (tt.hidden = !1, !r)
      return;
    let n = r.closest(this.dndSelector);
    tt !== n && J !== n && (this.setDropArea(n, t), this.dispatchDragEvent(t));
  }
  setDropArea(t, e) {
    this.dropArea === t || (this.leaveDroppable(e), this.dropArea = t, this.enterDroppable(e));
  }
  // 드랍 가능영역에서 나갈때
  leaveDroppable(t, e) {
    this.dropArea && e && this.dispatchEvent("dragleave", this.dropArea, e);
  }
  // 드랍 가능영역에 들어올때
  enterDroppable(t, e) {
    this.dropArea && e && this.dispatchEvent("dragenter", this.dropArea, e);
  }
  dispatchDragEvent(t) {
    this.dispatchEvent("drag", J, t), this.dropArea && this.dispatchEvent("dragover", this.dropArea, t);
  }
  //---------------------------
  // drop
  //---------------------------
  setDrop(t, e, r) {
  }
  dispatchDropEvent(t) {
    if (this.dropArea)
      return this.dispatchEvent("drop", this.dropArea, t);
  }
  onDragEnter(t) {
  }
  onDragOver(t) {
  }
  onDragLeave(t) {
  }
  onDrop(t) {
  }
  //---------------------------
  // 이벤트 dispatch
  //---------------------------
  getAttribute(t, e) {
    return t.getAttribute(e);
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
      drag: J,
      ghost: tt,
      // 드랍 정보
      dropValue: null,
      drop: null,
      dropGroup: null
    };
    this.dropArea && (n.dropValue = this.getAttribute(this.dropArea, Gn), n.dropGroup = this.getAttribute(this.dropArea, sn), n.drop = this.dropArea), n.success = this.dragValue === n.dropValue, P() && console.log("이벤트 Dispatch: ", t);
    const s = new CustomEvent(t, {
      detail: n,
      // shadowroot 밖으로 custom 이벤트 전파하기 위해 true 설정
      composed: !0,
      bubbles: !0,
      cancelable: !0
    });
    return e.dispatchEvent(s), s;
  }
  // success, fail 이벤트 발송
  // - dragend : 드래그 element에서 발송함
  // - drop : 드랍 element에서 발송함
  dispatchResultEvent(t, e) {
    if (!t)
      return;
    const r = e.success ? "success" : "fail", n = new CustomEvent(r, {
      detail: e,
      composed: !0,
      // bubbles: true,
      cancelable: !0
    });
    return t.dispatchEvent(n), n;
  }
  //---------------------------
  // Detail Info
  //---------------------------
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
    const e = !this.position || !this.position.start, r = e ? J : tt || J, n = r.getBoundingClientRect(), { left: s, top: o, width: a, height: l } = n;
    if (e) {
      let f = this.getTouchObj(t);
      this.shiftX = f.clientX - s, this.shiftY = f.clientY - o;
      const { x: h, y: p } = hr.getGlobalPoint(r);
      this.position = {
        scale: this.scale,
        shift: {
          x: this.shiftX,
          y: this.shiftY
        },
        start: {
          // 글로벌 좌표
          global: { x: s, y: o, w: a, h: l },
          // (글로벌 좌표)
          globalVisual: { x: h, y: p },
          globalOffset: { x: h - s, y: p - o },
          // 시작 시점의 translate 값을 저장 (나중에 복귀할 기준점)
          // 현재 엘리먼트의 실제 translate(m41, m42) 값을 가져옴
          dist: hr.getTranslate(J)
        }
      }, Mi(1, this.position.start.globalVisual);
      return;
    }
    const u = this.position.start, c = hr.getLocalDelta(u.global, { x: s, y: o }, J);
    this.position.end = {
      // 이동된 글로벌 좌표
      global: { x: s, y: o, w: a, h: l },
      // transform이 적용된 상태의 시각적 좌상단 꼭지점 위치 차이
      globalVisual: {
        x: s + u.globalOffset.x,
        y: o + u.globalOffset.y
      },
      globalOffset: u.globalOffset,
      // 처음 위치에서 이동한 거리 (transform으로 이동시킬때 사용)
      // (시작 시 translate) + (로컬로 환산된 이동량)
      dist: {
        x: c.x + u.dist.x,
        y: c.y + u.dist.y
      }
    }, Mi(2, this.position.end.globalVisual), this.dropArea && (this.position.dropOrigin = this.getDropOrigin());
  }
  /*
  1. dragElement에서 누적된 transform이 적용된 결과 좌상단 모서리 부분의 global 좌표를 찾는다.
  2. dropArea에서 누적된 transform이 적용된 결과 좌상단 모서리 부분의 global 좌표를 찾는다.
  3. 1번 좌표를 dragElement의 부모좌표로 변환
  4. 2번 좌표를 dragElement의 부모좌표로 변환
  5. 3,4번 결과 좌표의 차이만큼 최종 dragElement의 위치에 보정
  */
  // transform이 적용된 경우 원점 오차만큼 보정
  getDropOrigin() {
    const t = hr.getGlobalPoint(this.dropArea, 0, 0), e = hr.getGlobalPoint(J, 0, 0);
    Mi(3, t);
    const r = {
      x: t.x - e.x,
      y: t.y - e.y
    }, n = hr.getLocalDelta({ x: 0, y: 0 }, r, J), {
      left: s,
      top: o,
      width: a,
      height: l
    } = this.dropArea.getBoundingClientRect();
    return {
      global: { x: s, y: o, w: a, h: l },
      // (글로벌 좌표)
      globalVisual: t,
      globalOffset: this.position.start.globalOffset,
      dist: {
        // x: this.position.start.dist.x + localMove.x,
        // y: this.position.start.dist.y + localMove.y
        x: n.x,
        y: n.y
      }
    };
  }
  /*
      getPositionInfo(event) {
  
          const isStart = (!this.position || !this.position.start);
          const target = isStart ? dragElement : (ghost || dragElement);
  
          const globalPos = target.getBoundingClientRect();
          const x = globalPos.left;
          const y = globalPos.top;
          const w = globalPos.width;
          const h = globalPos.height;
  
          // 부모로부터 좌표로 변환
          // const parentPos = dragElement.parentElement.getBoundingClientRect();
          // const offsetX = Math.round((x - parentPos.left) / this.scale);
          // const offsetY = Math.round((y - parentPos.top) / this.scale);
  
          // https://stackoverflow.com/questions/42267189/how-to-get-value-translatex-by-javascript
          const computedStyle = getComputedStyle(dragElement);
          const matrix = new DOMMatrixReadOnly(computedStyle.transform);
          let translate = {
              x: matrix.m41,
              y: matrix.m42
          };
          // const transform = dragElement.computedStyleMap().get('transform')[0];
          // let translate = {
          //     x: transform.x.value,
          //     y: transform.y.value
          // };
  
          if (isStart) {
              let touchObj = this.getTouchObj(event);
              this.shiftX = touchObj.clientX - x;
              this.shiftY = touchObj.clientY - y;
  
              // 드래그 Element의 좌표임
              this.position = {
                  scale: this.scale,
                  shift: {
                      x: this.shiftX, y: this.shiftY
                  },
                  start: {
                      // 글로벌 좌표
                      global: {x, y, w, h},
                      // 부모로부터 좌표로 변환
                      // offset: { x: offsetX, y: offsetY },
                      // 자신의 원래 위치로부터 이동 좌표
                      dist: {
                          x: translate.x,
                          y: translate.y
                      }
                  }
              };
              return;
          }
  
          // 처음 위치에서 이동한 거리
          // const startX = this.position.start.global.x;
          // const startY = this.position.start.global.y;
          // const distX = Math.round((x - startX) / this.scale);
          // const distY = Math.round((y - startY) / this.scale);
  
          // 처음 위치에서 이동한 거리
          const startX = this.position.start.global.x;
          const startY = this.position.start.global.y;
          let distX = (x - startX);
          let distY = (y - startY);
          distX = Math.round(distX / this.scale);
          distY = Math.round(distY / this.scale);
  
          // 현재 좌표 : 드래그 Element의 좌표임
          this.position.end = {
              // 이동된 글로벌 좌표
              global: {x, y, w, h},
              // 이동된 글로벌 좌표를 부모 좌표로 변환
              // (left, top 이동시킬때 사용 : 부모 position에 따라 불안정해짐)
              // offset: { x: offsetX, y: offsetY },
              // 처음 위치에서 이동한 거리 (transform으로 이동시킬때 사용)
              dist: {
                  x: distX + translate.x,
                  y: distY + translate.y
              }
          };
  
          // dropArea Element의 좌표를 드래그 Element 좌표로 환산
          if (this.dropArea) {
              this.position.dropOrigin = (() => {
                  if (!this.dropArea) return;
                  const dropAreaPos = this.dropArea.getBoundingClientRect();
                  const x = dropAreaPos.left;
                  const y = dropAreaPos.top;
                  const w = dropAreaPos.width;
                  const h = dropAreaPos.height;
  
                  const matrix = new DOMMatrixReadOnly(getComputedStyle(this.dropArea).transform);
                  let translate = {
                      x: matrix.m41,
                      y: matrix.m42
                  };
                  // const transform = this.dropArea.computedStyleMap().get('transform')[0];
                  // let translate = {
                  //     x: transform.x.value,
                  //     y: transform.y.value
                  // };
  
                  // const offsetX = Math.round((dropAreaPos.left - parentPos.left) / this.scale);
                  // const offsetY = Math.round((dropAreaPos.top - parentPos.top) / this.scale);
                  // return { x: offsetX, y: offsetY };
                  // 최초 Drag Element 위치로부터 거리
                  const distX = Math.round((dropAreaPos.left - startX) / this.scale);
                  const distY = Math.round((dropAreaPos.top - startY) / this.scale);
                  // 마지막 Drag Element 위치로부터 거리
                  // const distX = Math.round((dropAreaPos.left - globalPos.left) / this.scale);
                  // const distY = Math.round((dropAreaPos.top - globalPos.top) / this.scale);
                  return {
                      global: {x, y, w, h},
                      // offset: { x: offsetX, y: offsetY },
                      dist: {
                          x: distX + translate.x,
                          y: distY + translate.y
                      }
                  };
              })();
          }
      }
      */
  // ghost 이미지 드래그 이동
  moveAt(t, e) {
    tt && (tt.style.left = t - this.shiftX + "px", tt.style.top = e - this.shiftY + "px");
  }
  setGhost() {
    E(this, Er) || O(this, Er, new wc()), tt = E(this, Er).create(J), document.body.append(tt), document.body.classList.add("dnd-dragging"), this.changeVisible(!1);
  }
  deleteGhost(t) {
    if (t) {
      const e = tt ? tt.remove.bind(tt) : null;
      tt.remove = () => {
        e && e(), tt = null;
      };
      return;
    }
    document.body.classList.remove("dnd-dragging"), tt && (tt.remove(), tt = null), this.changeVisible(!0);
  }
  // 클릭 이벤트 발생하도록 하기 위해 move 한 경우에 바꿔줌
  changeVisible(t) {
    (this.getAttribute(J, bc) || "move") === "move" && (t ? J.style.visibility = "" : J.style.visibility = "hidden");
  }
}
Er = new WeakMap();
const Ba = new Image();
Ba.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var oi, ai;
class Tc extends ja {
  constructor(e) {
    super(e);
    // 추적할 이벤트 목록
    // 캡처링 단계(true)에서 이벤트를 가로챔
    // 1. 드래그되는 요소(Source Element)에서 발생하는 이벤트
    k(this, oi, [
      "dragstart",
      "dragend",
      "drag"
    ]);
    // 2. 드롭 영역 요소(Target Element)에서 발생하는 이벤트
    // 적합한 드롭 대상일때 발생
    k(this, ai, [
      "dragenter",
      "dragleave",
      // 브라우저의 기본 드롭 방지 동작을 막기 위해 event.preventDefault()를 반드시 호출
      "dragover",
      // (dragover: 수백 밀리초마다 발생)
      "drop"
    ]);
    //---------------------------
    // drag
    //---------------------------
    // changeVisible(on) {
    //     // 원본 계속 보여줌
    // }
    $(this, "dragHandlers", /* @__PURE__ */ new Map());
    $(this, "dragCaptureHandlers", /* @__PURE__ */ new Map());
    //---------------------------
    // 핸들러
    //---------------------------
    // https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API
    $(this, "windowType", ["drag", "dragenter", "dragleave", "dragover", "drop"]);
    $(this, "winHandlers", /* @__PURE__ */ new Map());
    /*
        // 드랍 가능영역에서 나갈때
        leaveDroppable(dropArea, event) {
            // if (!this.dropArea) return;
            // if (event) this.dispatchEvent('dragleave', this.dropArea, event);
        }
    
        // 드랍 가능영역에 들어올때
        enterDroppable(dropArea, event) {
            // if (!this.dropArea) return;
            // if (event) this.dispatchEvent('dragenter', this.dropArea, event);
        }
    
        dispatchDragEvent(event){
            // this.dispatchEvent('drag', dragElement, event);
            // if (this.dropArea) this.dispatchEvent('dragover', this.dropArea, event);
        }
    
        // dispatchResultEvent(type, element, info) {
        //
        // }
    
        dispatchDropEvent(event) {
            // if (!this.dropArea) return;
            // this.dispatchEvent('drop', this.dropArea, event);
        }
        */
    //---------------------------
    // drop
    //---------------------------
    // dropValue;
    $(this, "dropHandlers", /* @__PURE__ */ new Map());
    $(this, "dropCaptureHandlers", /* @__PURE__ */ new Map());
  }
  // checkProxyEvent(){
  //     if(_eventMonitoring) return;
  //     _eventMonitoring = true;
  //     document.addEventListener('dragstart', this.handleDragStart.bind(this));
  // }
  addEventListener(e, r, n, s, o = !1) {
    r.split(",").forEach((a) => {
      a = a.trim(), s.set(a, { element: e, handler: n }), e.addEventListener(a, n, { passive: !1, capture: o });
    });
  }
  removeEventListener(e, r, n = !1) {
    e.split(",").forEach((s) => {
      s = s.trim();
      const { element: o, handler: a } = r.get(s);
      o.removeEventListener(s, a, { capture: n }), r.delete(s);
    });
  }
  removeAllEventListener(e, r = !1) {
    for (let [n, { element: s, handler: o }] of e)
      s.removeEventListener(n, o, { capture: r });
  }
  // 이벤트 발생 순서
  // 1. dragstart >
  // 2. drag > dragenter > dragover > dragleave
  // 3. drop (사용자가 유효한 드롭 영역 위에서) >
  // 4. dragend (드롭 성공 여부와 상관없이 무조건 마지막에 호출)
  // 같은 이름의 CustomEvent 중복 실행 방지
  isNativeEvent(e) {
    const r = e instanceof DragEvent;
    return r && e.stopImmediatePropagation(), r;
  }
  setDrag(e, r, n) {
    super.setDrag(e, r, n), e.setAttribute("draggable", !0);
    const s = {
      dragstart: this.onDragStart.bind(this),
      drag: this.onDrag.bind(this),
      dragend: this.onDragEnd.bind(this)
      // dragenter: this.onDragEnter.bind(this),
      // dragleave: this.onDragLeave.bind(this),
      // dragover: this.onDragOver.bind(this),
      // drop: this.onDrop.bind(this),
    };
    return E(this, oi).forEach((o) => {
      if (!s[o])
        return;
      const a = (l) => {
        s[o](l);
      };
      this.addEventListener(e, o, a, this.dragHandlers);
    }), () => {
      this.removeAllEventListener(this.dragHandlers), this.dragHandlers = /* @__PURE__ */ new Map(), this.removeAllEventListener(this.dragCaptureHandlers, !0), this.dragCaptureHandlers = /* @__PURE__ */ new Map();
    };
  }
  onDragStart(e) {
    this.isNativeEvent(e) && (super.onDragStart(e), e.dataTransfer.effectAllowed = "all", e.dataTransfer.setDragImage(Ba, 0, 0), e.dataTransfer.dropEffect = "none", e.dataTransfer.setData("text/plain", this.dragValue), P() && console.log("onDragStart: ", e), this.addEventListener(
      window,
      this.windowType.join(","),
      (r) => r.preventDefault(),
      this.winHandlers,
      !0
    ));
  }
  onDrag(e) {
    this.isNativeEvent(e) && super.onDrag(e);
  }
  onDragEnd(e) {
    this.isNativeEvent(e) && (super.onDragEnd(e), P() && console.log("onDragEnd: ", e), this.removeAllEventListener(this.winHandlers, !0), this.winHandlers = /* @__PURE__ */ new Map());
  }
  setDrop(e, r, n) {
    e.setAttribute("droppable", !0);
    const s = {
      dragenter: this.onDragEnter.bind(this),
      dragleave: this.onDragLeave.bind(this),
      dragover: this.onDragOver.bind(this),
      drop: this.onDrop.bind(this)
    };
    return E(this, ai).forEach((o) => {
      if (!s[o])
        return;
      const a = (u) => {
        s[o](u);
      };
      this.addEventListener(e, o, a, this.dropHandlers);
      const l = (u) => {
        this.isNativeEvent(u);
      };
      this.addEventListener(e, o, l, this.dropCaptureHandlers, !0);
    }), () => {
      this.removeAllEventListener(this.dropHandlers), this.dropHandlers = /* @__PURE__ */ new Map(), this.removeAllEventListener(this.dropCaptureHandlers), this.dropCaptureHandlers = /* @__PURE__ */ new Map();
    };
  }
  isDropAllowed(e) {
    return this.dndID === this.getAttribute(this.dragElement, sn);
  }
  onDragEnter(e) {
    this.isNativeEvent(e) && this.isDropAllowed(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "move", P() && console.log("onDragEnter: ", e));
  }
  onDragOver(e) {
    this.isNativeEvent(e) && this.isDropAllowed(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "move");
  }
  onDragLeave(e) {
    this.isNativeEvent(e) && this.isDropAllowed(e) && P() && console.log("onDragLeave: ", e);
  }
  onDrop(e) {
    if (!this.isNativeEvent(e) || !this.isDropAllowed(e))
      return;
    const r = e.dataTransfer.getData("text/plain");
    P() && console.log("onDrop: ", r, e);
  }
  /*
      onDrop(event) {
          const dragElement = this.dragElement;
          const dragDndID = this.getAttribute(dragElement, ATTR_DND_GROUP);
          if (this.dndID !== dragDndID) return;
  
          // prevent default action (open as link for some elements)
          event.preventDefault();
          const dragValue = this.getAttribute(dragElement, ATTR_DRAG_VALUE);
          if (debug()) console.log('drop 조건: ', dragValue, this.dropValue, dragElement);
  
          // drop 조건 판별식
          const info = {
              dragValue: dragValue,
              dropValue: this.dropValue,
              dragGroup: dragDndID,
  
              drag: dragElement,
              drop: event.target,
              dropGroup: this.dndID
          };
  
          if (dragValue === this.dropValue) {
              dragElement.dispatchEvent(new CustomEvent('success', {
                  detail: info,
                  cancelable: true
              }));
              event.target.dispatchEvent(new CustomEvent('success', {
                  detail: info,
                  cancelable: true
              }));
          } else {
              dragElement.dispatchEvent(new CustomEvent('fail', {
                  detail: info,
                  cancelable: true
              }));
              event.target.dispatchEvent(new CustomEvent('fail', {
                  detail: info,
                  cancelable: true
              }));
          }
      }
      */
}
oi = new WeakMap(), ai = new WeakMap();
class Ec extends ja {
  constructor(e) {
    super(e);
    // 참고
    // https://javascript.info/mouse-drag-and-drop
    // https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5
    $(this, "handlers", /* @__PURE__ */ new Map());
  }
  addEventListener(e, r, n) {
    r.split(",").forEach((s) => {
      s = s.trim(), this.handlers.set(s, { element: e, handler: n }), e.addEventListener(s, n, { passive: !1 });
    });
  }
  removeEventListener(e) {
    e.split(",").forEach((r) => {
      r = r.trim();
      const { element: n, handler: s } = this.handlers.get(r);
      n.removeEventListener(r, s), this.handlers.delete(r);
    });
  }
  removeAllEventListener() {
    for (let [e, { element: r, handler: n }] of this.handlers)
      r.removeEventListener(e, n);
  }
  //---------------------------
  // drag
  //---------------------------
  setDrag(e, r, n) {
    return super.setDrag(e, r, n), this.addEventListener(e, "mousedown, touchstart", this.onDragStart.bind(this)), () => {
      this.removeAllEventListener(), this.handlers = /* @__PURE__ */ new Map();
    };
  }
  //---------------------------
  // 핸들러
  //---------------------------
  onDragStart(e) {
    e.preventDefault(), super.onDragStart(e), this.addEventListener(document, "mousemove, touchmove", this.onDrag.bind(this)), this.addEventListener(document, "mouseup, touchend", this.onDragEnd.bind(this));
  }
  onDragEnd(e) {
    super.onDragEnd(e), this.removeEventListener("mousemove, touchmove"), this.removeEventListener("mouseup, touchend");
  }
  onDrag(e) {
    e.preventDefault(), super.onDrag(e);
  }
  //---------------------------
  // drop
  //---------------------------
  // onDragEnter, onDragLeave 이벤트는 dragElement에서 dropArea를 파악해서
  // dropArea에서도 대신 CustomEvent 이벤트를 발생시켜줌
  // 드랍되는 쪽의 구현되는 코드는 없음
  setDrop(e, r, n) {
  }
  // TODO: dragover 이벤트 발생 안함
}
class Va {
  constructor(t, e) {
    $(this, "element");
    $(this, "attrs");
    this.element = t, this.attrs = e;
  }
  create() {
  }
}
const sn = "data-dnd-group", is = "data-drag-value", Gn = "data-drop-value", bc = "data-dnd-type", Ac = "data-dnd-mode";
class xc extends Va {
  constructor() {
    super(...arguments);
    $(this, "dndID");
    $(this, "dragValue");
    $(this, "dropValue");
  }
  create() {
    this.setDragNDrop(this.element, this.attrs);
  }
  setDragNDrop(e, r) {
    sn in r && (this.dndID = r[sn]);
    const s = r[Ac] || r["as-dnd-mode"];
    let o;
    s === "dnd" ? o = new Tc(this.dndID) : o = new Ec(this.dndID), is in r && (this.dragValue = r[is], o.setDrag(e, r, this.dragValue)), Gn in r && (this.dropValue = r[Gn], o.setDrop(e, r, this.dropValue));
  }
}
class Ua {
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
const Ce = (i, t, e, r) => {
  var n = t.readyState, s = t.networkState;
  I() && console.log("[MEDIA][", i, "] : state(", n, "), network(", s, ")"), i === "Error" && console.error(r);
}, $c = {
  0: "HAVE_NOTHING",
  1: "HAVE_METADATA",
  2: "HAVE_CURRENT_DATA",
  3: "HAVE_FUTURE_DATA",
  4: "HAVE_ENOUGH_DATA"
}, Sc = {
  0: "NETWORK_EMPTY",
  1: "NETWORK_IDLE",
  2: "NETWORK_LOADING",
  3: "NETWORK_NO_SOURCE"
}, So = "loadstart, progress,suspend, abort,error, emptied,play, pause,loadedmetadata, loadeddata,waiting, playing,canplay, canplaythrough,seeking, seeked, timeupdate, ended,ratechange,durationchange, volumechange";
var xt, Fe, mn;
class Oc extends Ua {
  constructor() {
    super(...arguments);
    // 'audio' | 'video'
    $(this, "mediaType");
    // media Element
    $(this, "player");
    //---------------------------------------
    // track 이벤트 프록시
    //---------------------------------------
    k(this, xt, void 0);
    //---------------------------------------
    // 이벤트 프록시
    //---------------------------------------
    k(this, Fe, void 0);
    //////////////////////////////////////////////////////////////////////////////////
    // 풀스크린 이벤트 (풀스크린 기능 보정)
    //////////////////////////////////////////////////////////////////////////////////
    // 풀스크린 상태가 변경될때 마지막 controls 값을 기록함
    k(this, mn, void 0);
    //---------------------------------------
    // 풀스크린 이벤트
    //---------------------------------------
    $(this, "_fullscreenProxyHandler");
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
    var e = So.split(",");
    for (const r of e)
      this.player.addEventListener(r.trim(), E(this, Fe));
  }
  // 이벤트 제거
  removeEventProxy() {
    var e = So.split(",");
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
    return e !== void 0 ? $c[e] : "not ready";
  }
  get networkState() {
    var e = this.player.networkState;
    return e !== void 0 ? Sc[e] : "not ready";
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
    Ce("Progress", this);
  }
  // 브라우져가 현재 데이터를 전부다 다운하지 않았는데 미디어 데이터를 가져오는 것이 멈췄을 때 발생
  onSuspend(e) {
    Ce("Suspend", this);
  }
  // 브라우져가 에러가 아닌 상황에서 미디어 데이터를 가져오는 것을 멈췄을 때 발생
  onAbort(e) {
    Ce("Abort", this);
  }
  // 미디어의 networkState가 NETWORK_EMPTY상태로 들어가게 되었을 때 발생 (치명적인 오류로 멈추거나, 이미 리소스 선택 알고리즘이 실행중이었는데 load() 함수가 호출되었을 때)
  onEmptied(e) {
    Ce("Emptied", this);
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
    n && Ce("Error", this, n, s);
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
    Ce("Waiting", this);
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
    Ce("Ended", this);
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
      if (r === this.player && E(this, mn) === void 0 && (O(this, mn, r.controls), r.controls = !0), r.requestFullscreen)
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
xt = new WeakMap(), Fe = new WeakMap(), mn = new WeakMap();
var Zt;
class Pc {
  constructor(t) {
    $(this, "player");
    //---------------------------------------
    // 실행 delay
    //---------------------------------------
    k(this, Zt, void 0);
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
    let n = Math.floor(t % 60), s = Math.floor(t / 60 % 60), o = Math.floor(t / 3600), a = Math.floor(e / 60 % 60), l = Math.floor(e / 3600);
    return (isNaN(t) || t === 1 / 0) && (o = s = n = "-"), o = o > 0 || l > 0 ? o + r : "", s = ((o || a >= 10) && s < 10 ? "0" + s : s) + r, n = n < 10 ? "0" + n : n, o + s + n;
  }
  // 0:12 --> 123456
  parseTime(t, e) {
    e = e || ":";
    let r = t.split(e), n = 0, s, o, a, l, u;
    return r.length === 3 ? (s = r[0], o = r[1], a = r[2]) : (s = 0, o = r[0], a = r[1]), a = a.split(/\s+/), l = a.splice(0, 1)[0], l = l.split(/\.|,/), u = parseFloat(l[1]), l = l[0], n += parseFloat(s) * 3600, n += parseFloat(o) * 60, n += parseFloat(l), u && (n += u / 1e3), n;
  }
}
Zt = new WeakMap();
var je, ue;
class kc extends Oc {
  constructor() {
    super(...arguments);
    $(this, "util");
    // media Player 데이터 로드가 완료되었을때
    // media 재생 속성에 접근 가능한 시점
    k(this, je, !1);
    // (사용안함) 코드에 의해 변경되었음을 기록
    // #currentTimeChangedByCode = false;
    // player 준비 완료 콜백 함수
    $(this, "onReadyCallback");
    //////////////////////////////////////////////////////////
    // HTML5 Media 속성
    //////////////////////////////////////////////////////////
    //---------------------------------------
    // Option Get, Set 메서드로 접근 가능하도록 지원
    //---------------------------------------
    k(this, ue, -1);
  }
  isReady() {
    return E(this, je);
  }
  // 코드 진입 지점
  create(e, r, n, s) {
    this.onReadyCallback = n, this.util = new Pc(r), this.setInit(s), super.create(e, r);
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
const Li = `인스턴스를 생성하지 않습니다.
 Media.create 함수를 이용하세요.`;
let Ri;
const Ha = () => ({
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
const li = class li extends kc {
  //////////////////////////////////////////////////////////
  // 클래스 인스턴스
  //////////////////////////////////////////////////////////
  constructor(e) {
    if (e !== Li)
      throw new Error(Li);
    super();
    // 사용자 설정값
    $(this, "config");
    // 최소 크기
    $(this, "minWidth", 50);
    $(this, "minHeight", 50);
    // 2023.11.11
    // #108 issue 패치
    k(this, Be, !1);
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
    if (e === "video" && (Ri === void 0 && (Ri = Dc()), !Ri))
      return null;
    const a = new li(Li), l = () => {
      a.create(e, r, n, s, o);
    };
    return I() && console.log("document.readyState : ", document.readyState), document.readyState === "interactive" || document.readyState === "complete" ? (l(), a) : (I() && console.log("주의) Media 인스턴스는 콜백함수에서 반환됩니다."), document.addEventListener("DOMContentLoaded", (u) => {
      l();
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
    li.prototype[e] = r;
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
let Yn = li;
function Dc(i) {
  return Cc() ? !0 : (i.setAttribute("title", "HTML5 VIDEO가 지원되지 않습니다."), !1);
}
function Cc() {
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
class An {
  constructor(t, e) {
    $(this, "media");
    $(this, "containerDOM");
    this.containerDOM = t, this.media = e;
  }
  // Override
  create() {
  }
}
const Ni = "video-controller-button", Mc = "video-controller-big-button", Lc = "video-controller-playback";
var jt;
class Rc extends An {
  constructor() {
    super(...arguments);
    /////////////////////////////////////////
    // playback Menu 기능
    /////////////////////////////////////////
    $(this, "playbackDOM");
    k(this, jt, void 0);
  }
  // media;
  // containerDOM;
  // Override
  create() {
    this.createButton(), this.createBigButton(), this.createPlaybackButton(), this.createTrackButton();
  }
  createButton() {
    const e = this.containerDOM.querySelectorAll(`[${Ni}]`);
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
    }), Je(() => {
      e.forEach((n) => {
        n.removeEventListener("click", r);
      });
    });
  }
  // [video-controller-big-button]
  // 중앙의 큰 버튼: loading, play, pause
  // [video-container] 하위 Element에서 찾기
  createBigButton() {
    const e = this.containerDOM.querySelector(`[${Mc}]`);
    if (!e)
      return;
    const r = ((n) => {
      if (this.isWaiting)
        return;
      this.media.paused() ? this.media.play() : this.media.pause();
    }).bind(this);
    e.addEventListener("click", r), Je(() => {
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
    const e = this.containerDOM.querySelector(`[${Lc}]`);
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
    }), Je(() => {
      r.forEach((s) => {
        s.removeEventListener("click", n);
      }), E(this, jt) && (document.removeEventListener("mousedown", E(this, jt)), O(this, jt, null));
    });
  }
  playbackMenu() {
    const e = this.playbackDOM.querySelector("[popup-menu]");
    if (!e)
      return;
    if (e.classList.toggle("open"), !e.classList.contains("open")) {
      document.removeEventListener("mousedown", E(this, jt)), O(this, jt, null);
      return;
    }
    O(this, jt, ((s) => {
      Rt.isParent(s.target, this.playbackDOM) || this.playbackMenu();
    }).bind(this)), document.addEventListener("mousedown", E(this, jt));
    const r = this.media.playbackRate();
    let n = e.querySelector("[selected]");
    n && n.removeAttribute("selected"), n = e.querySelector(`[data-value="${r}"]`), n.setAttribute("selected", "");
  }
  // 스타일링을 위해 attr에 값 기록해줌
  onPplaybackChanged() {
    const e = this.containerDOM.querySelector(`[${Ni}="playback"]`);
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
    const e = this.containerDOM.querySelector(`[${Ni}="track"]`);
    if (!e)
      return;
    const r = this.media.currentTrack(), n = r ? r.mode : "disabled";
    e.setAttribute("data-value", n);
  }
}
jt = new WeakMap();
const Nc = "video-controller-progress", Ic = "progress-bar", Fc = "progress-bar-thumb";
class jc extends An {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    $(this, "progressDOM");
  }
  //---------------------------------------
  // ProgressBar 드래그 기능 : ProgressBar 앵커 대신 트랙 드래그 기능임
  //---------------------------------------
  // Override
  create() {
    const e = this.containerDOM.querySelector(`[${Nc}="time"]`);
    if (!e)
      return;
    this.progressDOM = e;
    const r = this.timeUpdateByMouse.bind(this), n = (a) => {
      const l = e.getBoundingClientRect(), u = a.clientX - l.left;
      r(u, l.width);
    }, s = (a) => {
      document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", s);
    }, o = (a) => {
      n(a), document.addEventListener("mousemove", n), document.addEventListener("mouseup", s);
    };
    e.addEventListener("mousedown", o), Je(() => {
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
    const e = this.media.getPercent(), r = (s = this.progressDOM) == null ? void 0 : s.querySelector(`[${Ic}]`);
    r && (r.setAttribute("data-value", e), r.style.width = e + "%");
    const n = (o = this.progressDOM) == null ? void 0 : o.querySelector(`[${Fc}]`);
    n && (n.setAttribute("data-value", e), n.style.left = e + "%");
  }
}
const Oo = "video-controller-volume", Bc = "video-controller-progress", Vc = "progress-bar", Uc = "progress-bar-thumb";
class Hc extends An {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    $(this, "volumeDOM");
  }
  //---------------------------------------
  // volume 드래그 기능 : volume 앵커 대신 트랙 드래그 기능임
  //---------------------------------------
  // Override
  create() {
    const e = this.containerDOM.querySelector(`[${Oo}]`);
    if (!e)
      return;
    this.volumeDOM = e, this.onUpdateVolumeBar();
    const r = e.querySelector(`[${Bc}]`);
    if (!r)
      return;
    const n = this.volumeUpdateByMouse.bind(this), o = e.getAttribute(Oo) === "vertical", a = (c) => {
      const f = r.getBoundingClientRect();
      let h, p;
      o ? (p = f.height - (c.clientY - f.top), h = f.height) : (p = c.clientX - f.left, h = f.width), n(p, h);
    }, l = (c) => {
      e.classList.remove("open"), document.removeEventListener("mousemove", a), document.removeEventListener("mouseup", l);
    }, u = (c) => {
      e.classList.add("open"), a(c), document.addEventListener("mousemove", a), document.addEventListener("mouseup", l);
    };
    r.addEventListener("mousedown", u), Je(() => {
      r.removeEventListener("mousedown", u);
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
    const n = (e * 100).toString(), s = this.volumeDOM.querySelector(`[${Vc}]`);
    s && (s.setAttribute("data-value", n), s.style.width = n + "%");
    const o = this.volumeDOM.querySelector(`[${Uc}]`);
    o && (o.setAttribute("data-value", n), o.style.left = n + "%");
  }
}
const Po = "video-controller-time";
class zc extends An {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    $(this, "timeDOM");
  }
  create() {
    const e = this.containerDOM.querySelectorAll(`[${Po}]`);
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
      const a = o.getAttribute(Po);
      if (a === "currentTime")
        return o.innerText = this.media.formatTime(r, e);
      if (a === "duration")
        return o.innerText = this.media.formatTime(e);
      if (a === "remainTime")
        return o.innerText = this.media.formatTime(n, e);
    });
  }
}
class qc {
  constructor() {
    $(this, "_context", {});
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
class Fr {
  constructor({ id: t, attrs: e, list: r, parseOption: n }) {
    $(this, "id");
    $(this, "attrs");
    $(this, "list");
    $(this, "parseOption");
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
    return structuredClone ? t = structuredClone(t) : t = JSON.parse(JSON.stringify(t)), t.parseOption = this.parseOption, t.list = this.list.map((e) => e.copy()), new Fr(t);
  }
}
class on {
  constructor({ nodeName: t, attrs: e, parseOption: r }) {
    $(this, "nodeName");
    $(this, "attrs");
    $(this, "_args");
    $(this, "parseOption");
    // (디버깅용) 실행 노드의 depth
    $(this, "_depth", 0);
    this.nodeName = t, this.attrs = e, this.parseOption = r;
  }
  copy() {
    let t = {
      nodeName: this.nodeName,
      attrs: this.attrs
      // _args: this._args,
      // parseOption: this.parseOption
    };
    return structuredClone ? t = structuredClone(t) : t = JSON.parse(JSON.stringify(t)), t._args = this._args, t.parseOption = this.parseOption, new on(t);
  }
}
function Wc(i, ...t) {
  return (...e) => i(...t, ...e);
}
function xn(i) {
  return function(...t) {
    var e = t.pop();
    return i.call(this, t, e);
  };
}
var Gc = typeof queueMicrotask == "function" && queueMicrotask, za = typeof setImmediate == "function" && setImmediate, qa = typeof process == "object" && typeof process.nextTick == "function";
function Wa(i) {
  setTimeout(i, 0);
}
function Ga(i) {
  return (t, ...e) => i(() => t(...e));
}
var Gr;
Gc ? Gr = queueMicrotask : za ? Gr = setImmediate : qa ? Gr = process.nextTick : Gr = Wa;
const Ze = Ga(Gr);
function ss(i) {
  return $n(i) ? function(...t) {
    const e = t.pop(), r = i.apply(this, t);
    return ko(r, e);
  } : xn(function(t, e) {
    var r;
    try {
      r = i.apply(this, t);
    } catch (n) {
      return e(n);
    }
    if (r && typeof r.then == "function")
      return ko(r, e);
    e(null, r);
  });
}
function ko(i, t) {
  return i.then((e) => {
    Do(t, null, e);
  }, (e) => {
    Do(t, e && (e instanceof Error || e.message) ? e : new Error(e));
  });
}
function Do(i, t, e) {
  try {
    i(t, e);
  } catch (r) {
    Ze((n) => {
      throw n;
    }, r);
  }
}
function $n(i) {
  return i[Symbol.toStringTag] === "AsyncFunction";
}
function Yc(i) {
  return i[Symbol.toStringTag] === "AsyncGenerator";
}
function Xc(i) {
  return typeof i[Symbol.asyncIterator] == "function";
}
function R(i) {
  if (typeof i != "function")
    throw new Error("expected a function");
  return $n(i) ? ss(i) : i;
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
function Ya(i) {
  return function(e, ...r) {
    return L(function(s) {
      var o = this;
      return i(e, (a, l) => {
        R(a).apply(o, r.concat(l));
      }, s);
    });
  };
}
function Rs(i, t, e, r) {
  t = t || [];
  var n = [], s = 0, o = R(e);
  return i(t, (a, l, u) => {
    var c = s++;
    o(a, (f, h) => {
      n[c] = h, u(f);
    });
  }, (a) => {
    r(a, n);
  });
}
function vi(i) {
  return i && typeof i.length == "number" && i.length >= 0 && i.length % 1 === 0;
}
const Kc = {}, wi = Kc;
function $e(i) {
  function t(...e) {
    if (i !== null) {
      var r = i;
      i = null, r.apply(this, e);
    }
  }
  return Object.assign(t, i), t;
}
function Qc(i) {
  return i[Symbol.iterator] && i[Symbol.iterator]();
}
function Jc(i) {
  var t = -1, e = i.length;
  return function() {
    return ++t < e ? { value: i[t], key: t } : null;
  };
}
function Zc(i) {
  var t = -1;
  return function() {
    var r = i.next();
    return r.done ? null : (t++, { value: r.value, key: t });
  };
}
function tf(i) {
  var t = i ? Object.keys(i) : [], e = -1, r = t.length;
  return function n() {
    var s = t[++e];
    return s === "__proto__" ? n() : e < r ? { value: i[s], key: s } : null;
  };
}
function ef(i) {
  if (vi(i))
    return Jc(i);
  var t = Qc(i);
  return t ? Zc(t) : tf(i);
}
function Se(i) {
  return function(...t) {
    if (i === null)
      throw new Error("Callback was already called.");
    var e = i;
    i = null, e.apply(this, t);
  };
}
function Co(i, t, e, r) {
  let n = !1, s = !1, o = !1, a = 0, l = 0;
  function u() {
    a >= t || o || n || (o = !0, i.next().then(({ value: h, done: p }) => {
      if (!(s || n)) {
        if (o = !1, p) {
          n = !0, a <= 0 && r(null);
          return;
        }
        a++, e(h, l, c), l++, u();
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
      if (p === wi || n && a <= 0)
        return n = !0, r(null);
      u();
    }
  }
  function f(h) {
    s || (o = !1, n = !0, r(h));
  }
  u();
}
const It = (i) => (t, e, r) => {
  if (r = $e(r), i <= 0)
    throw new RangeError("concurrency limit cannot be less than 1");
  if (!t)
    return r(null);
  if (Yc(t))
    return Co(t, i, e, r);
  if (Xc(t))
    return Co(t[Symbol.asyncIterator](), i, e, r);
  var n = ef(t), s = !1, o = !1, a = 0, l = !1;
  function u(f, h) {
    if (!o)
      if (a -= 1, f)
        s = !0, r(f);
      else if (f === !1)
        s = !0, o = !0;
      else {
        if (h === wi || s && a <= 0)
          return s = !0, r(null);
        l || c();
      }
  }
  function c() {
    for (l = !0; a < i && !s; ) {
      var f = n();
      if (f === null) {
        s = !0, a <= 0 && r(null);
        return;
      }
      a += 1, e(f.value, f.key, Se(u));
    }
    l = !1;
  }
  c();
};
function rf(i, t, e, r) {
  return It(t)(i, R(e), r);
}
const Xn = L(rf, 4);
function nf(i, t, e) {
  e = $e(e);
  var r = 0, n = 0, { length: s } = i, o = !1;
  s === 0 && e(null);
  function a(l, u) {
    l === !1 && (o = !0), o !== !0 && (l ? e(l) : (++n === s || u === wi) && e(null));
  }
  for (; r < s; r++)
    t(i[r], r, Se(a));
}
function sf(i, t, e) {
  return Xn(i, 1 / 0, t, e);
}
function of(i, t, e) {
  var r = vi(i) ? nf : sf;
  return r(i, R(t), e);
}
const Nt = L(of, 3);
function af(i, t, e) {
  return Rs(Nt, i, t, e);
}
const Ns = L(af, 3), lf = Ya(Ns);
function uf(i, t, e) {
  return Xn(i, 1, t, e);
}
const ne = L(uf, 3);
function cf(i, t, e) {
  return Rs(ne, i, t, e);
}
const Xa = L(cf, 3), ff = Ya(Xa), jr = Symbol("promiseCallback");
function Cr() {
  let i, t;
  function e(r, ...n) {
    if (r)
      return t(r);
    i(n.length > 1 ? n : n[0]);
  }
  return e[jr] = new Promise((r, n) => {
    i = r, t = n;
  }), e;
}
function Ka(i, t, e) {
  typeof t != "number" && (e = t, t = null), e = $e(e || Cr());
  var r = Object.keys(i).length;
  if (!r)
    return e(null);
  t || (t = r);
  var n = {}, s = 0, o = !1, a = !1, l = /* @__PURE__ */ Object.create(null), u = [], c = [], f = {};
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
    f[g] = b, T.forEach((A) => {
      if (!i[A])
        throw new Error("async.auto task `" + g + "` has a non-existent dependency `" + A + "` in " + T.join(", "));
      _(A, () => {
        b--, b === 0 && h(g, v);
      });
    });
  }), w(), p();
  function h(g, v) {
    u.push(() => y(g, v));
  }
  function p() {
    if (!o) {
      if (u.length === 0 && s === 0)
        return e(null, n);
      for (; u.length && s < t; ) {
        var g = u.shift();
        g();
      }
    }
  }
  function _(g, v) {
    var T = l[g];
    T || (T = l[g] = []), T.push(v);
  }
  function d(g) {
    var v = l[g] || [];
    v.forEach((T) => T()), p();
  }
  function y(g, v) {
    if (!a) {
      var T = Se((A, ...S) => {
        if (s--, A === !1) {
          o = !0;
          return;
        }
        if (S.length < 2 && ([S] = S), A) {
          var x = {};
          if (Object.keys(n).forEach((M) => {
            x[M] = n[M];
          }), x[g] = S, a = !0, l = /* @__PURE__ */ Object.create(null), o)
            return;
          e(A, x);
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
  return e[jr];
}
var hf = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/, df = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/, pf = /,/, mf = /(=.+)?(\s*)$/;
function gf(i) {
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
function _f(i) {
  const t = gf(i.toString());
  let e = t.match(hf);
  if (e || (e = t.match(df)), !e)
    throw new Error(`could not parse args in autoInject
Source:
` + t);
  let [, r] = e;
  return r.replace(/\s/g, "").split(pf).map((n) => n.replace(mf, "").trim());
}
function yf(i, t) {
  var e = {};
  return Object.keys(i).forEach((r) => {
    var n = i[r], s, o = $n(n), a = !o && n.length === 1 || o && n.length === 0;
    if (Array.isArray(n))
      s = [...n], n = s.pop(), e[r] = s.concat(s.length > 0 ? l : n);
    else if (a)
      e[r] = n;
    else {
      if (s = _f(n), n.length === 0 && !o && s.length === 0)
        throw new Error("autoInject task functions require explicit parameters.");
      o || s.pop(), e[r] = s.concat(l);
    }
    function l(u, c) {
      var f = s.map((h) => u[h]);
      f.push(c), R(n)(...f);
    }
  }), Ka(e, t);
}
class vf {
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
    this.head ? this.insertBefore(this.head, t) : Mo(this, t);
  }
  push(t) {
    this.tail ? this.insertAfter(this.tail, t) : Mo(this, t);
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
function Mo(i, t) {
  i.length = 1, i.head = i.tail = t;
}
function Is(i, t, e) {
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
  function l(m, g) {
    const v = (...T) => {
      u(m, v), g(...T);
    };
    o[m].push(v);
  }
  function u(m, g) {
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
    var b, A;
    function S(M, ...F) {
      if (M)
        return v ? A(M) : b();
      if (F.length <= 1)
        return b(F[0]);
      b(F);
    }
    var x = w._createTaskItem(
      m,
      v ? S : T || S
    );
    if (g ? w._tasks.unshift(x) : w._tasks.push(x), f || (f = !0, Ze(() => {
      f = !1, w.process();
    })), v || !T)
      return new Promise((M, F) => {
        b = M, A = F;
      });
  }
  function p(m) {
    return function(g, ...v) {
      n -= 1;
      for (var T = 0, b = m.length; T < b; T++) {
        var A = m[T], S = s.indexOf(A);
        S === 0 ? s.shift() : S > 0 && s.splice(S, 1), A.callback(g, ...v), g != null && c("error", g, A.data);
      }
      n <= w.concurrency - w.buffer && c("unsaturated"), w.idle() && c("drain"), w.process();
    };
  }
  function _(m) {
    return m.length === 0 && w.idle() ? (Ze(() => c("drain")), !0) : !1;
  }
  const d = (m) => (g) => {
    if (!g)
      return new Promise((v, T) => {
        l(m, (b, A) => {
          if (b)
            return T(b);
          v(A);
        });
      });
    u(m), a(m, g);
  };
  var y = !1, w = {
    _tasks: new vf(),
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
      u(), w._tasks.empty();
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
          var A = Se(p(m));
          r(g, A);
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
      w.paused !== !1 && (w.paused = !1, Ze(w.process));
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
function wf(i, t) {
  return Is(i, 1, t);
}
function Tf(i, t, e) {
  return Is(i, t, e);
}
function Ef(i, t, e, r) {
  r = $e(r);
  var n = R(e);
  return ne(i, (s, o, a) => {
    n(t, s, (l, u) => {
      t = u, a(l);
    });
  }, (s) => r(s, t));
}
const Qr = L(Ef, 4);
function Qa(...i) {
  var t = i.map(R);
  return function(...e) {
    var r = this, n = e[e.length - 1];
    return typeof n == "function" ? e.pop() : n = Cr(), Qr(
      t,
      e,
      (s, o, a) => {
        o.apply(r, s.concat((l, ...u) => {
          a(l, u);
        }));
      },
      (s, o) => n(s, ...o)
    ), n[jr];
  };
}
function bf(...i) {
  return Qa(...i.reverse());
}
function Af(i, t, e, r) {
  return Rs(It(t), i, e, r);
}
const Ti = L(Af, 4);
function xf(i, t, e, r) {
  var n = R(e);
  return Ti(i, t, (s, o) => {
    n(s, (a, ...l) => a ? o(a) : o(a, l));
  }, (s, o) => {
    for (var a = [], l = 0; l < o.length; l++)
      o[l] && (a = a.concat(...o[l]));
    return r(s, a);
  });
}
const Kn = L(xf, 4);
function $f(i, t, e) {
  return Kn(i, 1 / 0, t, e);
}
const Lo = L($f, 3);
function Sf(i, t, e) {
  return Kn(i, 1, t, e);
}
const Ro = L(Sf, 3);
function Of(...i) {
  return function(...t) {
    var e = t.pop();
    return e(null, ...i);
  };
}
function oe(i, t) {
  return (e, r, n, s) => {
    var o = !1, a;
    const l = R(n);
    e(r, (u, c, f) => {
      l(u, (h, p) => {
        if (h || h === !1)
          return f(h);
        if (i(p) && !a)
          return o = !0, a = t(!0, u), f(null, wi);
        f();
      });
    }, (u) => {
      if (u)
        return s(u);
      s(null, o ? a : t(!1));
    });
  };
}
function Pf(i, t, e) {
  return oe((r) => r, (r, n) => n)(Nt, i, t, e);
}
const No = L(Pf, 3);
function kf(i, t, e, r) {
  return oe((n) => n, (n, s) => s)(It(t), i, e, r);
}
const Io = L(kf, 4);
function Df(i, t, e) {
  return oe((r) => r, (r, n) => n)(It(1), i, t, e);
}
const Fo = L(Df, 3);
function Ja(i) {
  return (t, ...e) => R(t)(...e, (r, ...n) => {
    typeof console == "object" && (r ? console.error && console.error(r) : console[i] && n.forEach((s) => console[i](s)));
  });
}
const Cf = Ja("dir");
function Mf(i, t, e) {
  e = Se(e);
  var r = R(i), n = R(t), s;
  function o(l, ...u) {
    if (l)
      return e(l);
    l !== !1 && (s = u, n(...u, a));
  }
  function a(l, u) {
    if (l)
      return e(l);
    if (l !== !1) {
      if (!u)
        return e(null, ...s);
      r(o);
    }
  }
  return a(null, !0);
}
const os = L(Mf, 3);
function Lf(i, t, e) {
  const r = R(t);
  return os(i, (...n) => {
    const s = n.pop();
    r(...n, (o, a) => s(o, !a));
  }, e);
}
function Za(i) {
  return (t, e, r) => i(t, r);
}
function Rf(i, t, e) {
  return Nt(i, Za(R(t)), e);
}
const jo = L(Rf, 3);
function Nf(i, t, e, r) {
  return It(t)(i, Za(R(e)), r);
}
const as = L(Nf, 4);
function If(i, t, e) {
  return as(i, 1, t, e);
}
const ls = L(If, 3);
function tl(i) {
  return $n(i) ? i : function(...t) {
    var e = t.pop(), r = !0;
    t.push((...n) => {
      r ? Ze(() => e(...n)) : e(...n);
    }), i.apply(this, t), r = !1;
  };
}
function Ff(i, t, e) {
  return oe((r) => !r, (r) => !r)(Nt, i, t, e);
}
const Bo = L(Ff, 3);
function jf(i, t, e, r) {
  return oe((n) => !n, (n) => !n)(It(t), i, e, r);
}
const Vo = L(jf, 4);
function Bf(i, t, e) {
  return oe((r) => !r, (r) => !r)(ne, i, t, e);
}
const Uo = L(Bf, 3);
function Vf(i, t, e, r) {
  var n = new Array(t.length);
  i(t, (s, o, a) => {
    e(s, (l, u) => {
      n[o] = !!u, a(l);
    });
  }, (s) => {
    if (s)
      return r(s);
    for (var o = [], a = 0; a < t.length; a++)
      n[a] && o.push(t[a]);
    r(null, o);
  });
}
function Uf(i, t, e, r) {
  var n = [];
  i(t, (s, o, a) => {
    e(s, (l, u) => {
      if (l)
        return a(l);
      u && n.push({ index: o, value: s }), a(l);
    });
  }, (s) => {
    if (s)
      return r(s);
    r(null, n.sort((o, a) => o.index - a.index).map((o) => o.value));
  });
}
function Ei(i, t, e, r) {
  var n = vi(t) ? Vf : Uf;
  return n(i, t, R(e), r);
}
function Hf(i, t, e) {
  return Ei(Nt, i, t, e);
}
const Ho = L(Hf, 3);
function zf(i, t, e, r) {
  return Ei(It(t), i, e, r);
}
const zo = L(zf, 4);
function qf(i, t, e) {
  return Ei(ne, i, t, e);
}
const qo = L(qf, 3);
function Wf(i, t) {
  var e = Se(t), r = R(tl(i));
  function n(s) {
    if (s)
      return e(s);
    s !== !1 && r(n);
  }
  return n();
}
const Gf = L(Wf, 2);
function Yf(i, t, e, r) {
  var n = R(e);
  return Ti(i, t, (s, o) => {
    n(s, (a, l) => a ? o(a) : o(a, { key: l, val: s }));
  }, (s, o) => {
    for (var a = {}, { hasOwnProperty: l } = Object.prototype, u = 0; u < o.length; u++)
      if (o[u]) {
        var { key: c } = o[u], { val: f } = o[u];
        l.call(a, c) ? a[c].push(f) : a[c] = [f];
      }
    return r(s, a);
  });
}
const Fs = L(Yf, 4);
function Xf(i, t, e) {
  return Fs(i, 1 / 0, t, e);
}
function Kf(i, t, e) {
  return Fs(i, 1, t, e);
}
const Qf = Ja("log");
function Jf(i, t, e, r) {
  r = $e(r);
  var n = {}, s = R(e);
  return It(t)(i, (o, a, l) => {
    s(o, a, (u, c) => {
      if (u)
        return l(u);
      n[a] = c, l(u);
    });
  }, (o) => r(o, n));
}
const js = L(Jf, 4);
function Zf(i, t, e) {
  return js(i, 1 / 0, t, e);
}
function th(i, t, e) {
  return js(i, 1, t, e);
}
function eh(i, t = (e) => e) {
  var e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null), n = R(i), s = xn((o, a) => {
    var l = t(...o);
    l in e ? Ze(() => a(null, ...e[l])) : l in r ? r[l].push(a) : (r[l] = [a], n(...o, (u, ...c) => {
      u || (e[l] = c);
      var f = r[l];
      delete r[l];
      for (var h = 0, p = f.length; h < p; h++)
        f[h](u, ...c);
    }));
  });
  return s.memo = e, s.unmemoized = i, s;
}
var Mn;
qa ? Mn = process.nextTick : za ? Mn = setImmediate : Mn = Wa;
const rh = Ga(Mn), Bs = L((i, t, e) => {
  var r = vi(t) ? [] : {};
  i(t, (n, s, o) => {
    R(n)((a, ...l) => {
      l.length < 2 && ([l] = l), r[s] = l, o(a);
    });
  }, (n) => e(n, r));
}, 3);
function nh(i, t) {
  return Bs(Nt, i, t);
}
function ih(i, t, e) {
  return Bs(It(t), i, e);
}
function el(i, t) {
  var e = R(i);
  return Is((r, n) => {
    e(r[0], n);
  }, t, 1);
}
class sh {
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
    for (; t > 0 && Ii(this.heap[t], this.heap[e = Wo(t)]); ) {
      let r = this.heap[t];
      this.heap[t] = this.heap[e], this.heap[e] = r, t = e;
    }
  }
  percDown(t) {
    let e;
    for (; (e = oh(t)) < this.heap.length && (e + 1 < this.heap.length && Ii(this.heap[e + 1], this.heap[e]) && (e = e + 1), !Ii(this.heap[t], this.heap[e])); ) {
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
    for (let r = Wo(this.heap.length - 1); r >= 0; r--)
      this.percDown(r);
    return this;
  }
}
function oh(i) {
  return (i << 1) + 1;
}
function Wo(i) {
  return (i + 1 >> 1) - 1;
}
function Ii(i, t) {
  return i.priority !== t.priority ? i.priority < t.priority : i.pushCount < t.pushCount;
}
function ah(i, t) {
  var e = el(i, t), {
    push: r,
    pushAsync: n
  } = e;
  e._tasks = new sh(), e._createTaskItem = ({ data: o, priority: a }, l) => ({
    data: o,
    priority: a,
    callback: l
  });
  function s(o, a) {
    return Array.isArray(o) ? o.map((l) => ({ data: l, priority: a })) : { data: o, priority: a };
  }
  return e.push = function(o, a = 0, l) {
    return r(s(o, a), l);
  }, e.pushAsync = function(o, a = 0, l) {
    return n(s(o, a), l);
  }, delete e.unshift, delete e.unshiftAsync, e;
}
function lh(i, t) {
  if (t = $e(t), !Array.isArray(i))
    return t(new TypeError("First argument to race must be an array of functions"));
  if (!i.length)
    return t();
  for (var e = 0, r = i.length; e < r; e++)
    R(i[e])(t);
}
const uh = L(lh, 2);
function Go(i, t, e, r) {
  var n = [...i].reverse();
  return Qr(n, t, e, r);
}
function us(i) {
  var t = R(i);
  return xn(function(r, n) {
    return r.push((s, ...o) => {
      let a = {};
      if (s && (a.error = s), o.length > 0) {
        var l = o;
        o.length <= 1 && ([l] = o), a.value = l;
      }
      n(null, a);
    }), t.apply(this, r);
  });
}
function ch(i) {
  var t;
  return Array.isArray(i) ? t = i.map(us) : (t = {}, Object.keys(i).forEach((e) => {
    t[e] = us.call(this, i[e]);
  })), t;
}
function Vs(i, t, e, r) {
  const n = R(e);
  return Ei(i, t, (s, o) => {
    n(s, (a, l) => {
      o(a, !l);
    });
  }, r);
}
function fh(i, t, e) {
  return Vs(Nt, i, t, e);
}
const hh = L(fh, 3);
function dh(i, t, e, r) {
  return Vs(It(t), i, e, r);
}
const ph = L(dh, 4);
function mh(i, t, e) {
  return Vs(ne, i, t, e);
}
const gh = L(mh, 3);
function rl(i) {
  return function() {
    return i;
  };
}
const cs = 5, nl = 0;
function fs(i, t, e) {
  var r = {
    times: cs,
    intervalFunc: rl(nl)
  };
  if (arguments.length < 3 && typeof i == "function" ? (e = t || Cr(), t = i) : (_h(r, i), e = e || Cr()), typeof t != "function")
    throw new Error("Invalid arguments for async.retry");
  var n = R(t), s = 1;
  function o() {
    n((a, ...l) => {
      a !== !1 && (a && s++ < r.times && (typeof r.errorFilter != "function" || r.errorFilter(a)) ? setTimeout(o, r.intervalFunc(s - 1)) : e(a, ...l));
    });
  }
  return o(), e[jr];
}
function _h(i, t) {
  if (typeof t == "object")
    i.times = +t.times || cs, i.intervalFunc = typeof t.interval == "function" ? t.interval : rl(+t.interval || nl), i.errorFilter = t.errorFilter;
  else if (typeof t == "number" || typeof t == "string")
    i.times = +t || cs;
  else
    throw new Error("Invalid arguments for async.retry");
}
function yh(i, t) {
  t || (t = i, i = null);
  let e = i && i.arity || t.length;
  $n(t) && (e += 1);
  var r = R(t);
  return xn((n, s) => {
    (n.length < e - 1 || s == null) && (n.push(s), s = Cr());
    function o(a) {
      r(...n, a);
    }
    return i ? fs(i, o, s) : fs(o, s), s[jr];
  });
}
function vh(i, t) {
  return Bs(ne, i, t);
}
function wh(i, t, e) {
  return oe(Boolean, (r) => r)(Nt, i, t, e);
}
const Yo = L(wh, 3);
function Th(i, t, e, r) {
  return oe(Boolean, (n) => n)(It(t), i, e, r);
}
const Xo = L(Th, 4);
function Eh(i, t, e) {
  return oe(Boolean, (r) => r)(ne, i, t, e);
}
const Ko = L(Eh, 3);
function bh(i, t, e) {
  var r = R(t);
  return Ns(i, (s, o) => {
    r(s, (a, l) => {
      if (a)
        return o(a);
      o(a, { value: s, criteria: l });
    });
  }, (s, o) => {
    if (s)
      return e(s);
    e(null, o.sort(n).map((a) => a.value));
  });
  function n(s, o) {
    var a = s.criteria, l = o.criteria;
    return a < l ? -1 : a > l ? 1 : 0;
  }
}
const Ah = L(bh, 3);
function xh(i, t, e) {
  var r = R(i);
  return xn((n, s) => {
    var o = !1, a;
    function l() {
      var u = i.name || "anonymous", c = new Error('Callback function "' + u + '" timed out.');
      c.code = "ETIMEDOUT", e && (c.info = e), o = !0, s(c);
    }
    n.push((...u) => {
      o || (s(...u), clearTimeout(a));
    }), a = setTimeout(l, t), r(...n);
  });
}
function $h(i) {
  for (var t = Array(i); i--; )
    t[i] = i;
  return t;
}
function Us(i, t, e, r) {
  var n = R(e);
  return Ti($h(i), t, n, r);
}
function Sh(i, t, e) {
  return Us(i, 1 / 0, t, e);
}
function Oh(i, t, e) {
  return Us(i, 1, t, e);
}
function Ph(i, t, e, r) {
  arguments.length <= 3 && typeof t == "function" && (r = e, e = t, t = Array.isArray(i) ? [] : {}), r = $e(r || Cr());
  var n = R(e);
  return Nt(i, (s, o, a) => {
    n(t, s, o, a);
  }, (s) => r(s, t)), r[jr];
}
function kh(i, t) {
  var e = null, r;
  return ls(i, (n, s) => {
    R(n)((o, ...a) => {
      if (o === !1)
        return s(o);
      a.length < 2 ? [r] = a : r = a, e = o, s(o ? null : {});
    });
  }, () => t(e, r));
}
const Dh = L(kh);
function Ch(i) {
  return (...t) => (i.unmemoized || i)(...t);
}
function Mh(i, t, e) {
  e = Se(e);
  var r = R(t), n = R(i), s = [];
  function o(l, ...u) {
    if (l)
      return e(l);
    s = u, l !== !1 && n(a);
  }
  function a(l, u) {
    if (l)
      return e(l);
    if (l !== !1) {
      if (!u)
        return e(null, ...s);
      r(o);
    }
  }
  return n(a);
}
const hs = L(Mh, 3);
function Lh(i, t, e) {
  const r = R(i);
  return hs((n) => r((s, o) => n(s, !o)), t, e);
}
function Rh(i, t) {
  if (t = $e(t), !Array.isArray(i))
    return t(new Error("First argument to waterfall must be an array of functions"));
  if (!i.length)
    return t();
  var e = 0;
  function r(s) {
    var o = R(i[e++]);
    o(...s, Se(n));
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
const Nh = L(Rh), Fi = {
  apply: Wc,
  applyEach: lf,
  applyEachSeries: ff,
  asyncify: ss,
  auto: Ka,
  autoInject: yf,
  cargo: wf,
  cargoQueue: Tf,
  compose: bf,
  concat: Lo,
  concatLimit: Kn,
  concatSeries: Ro,
  constant: Of,
  detect: No,
  detectLimit: Io,
  detectSeries: Fo,
  dir: Cf,
  doUntil: Lf,
  doWhilst: os,
  each: jo,
  eachLimit: as,
  eachOf: Nt,
  eachOfLimit: Xn,
  eachOfSeries: ne,
  eachSeries: ls,
  ensureAsync: tl,
  every: Bo,
  everyLimit: Vo,
  everySeries: Uo,
  filter: Ho,
  filterLimit: zo,
  filterSeries: qo,
  forever: Gf,
  groupBy: Xf,
  groupByLimit: Fs,
  groupBySeries: Kf,
  log: Qf,
  map: Ns,
  mapLimit: Ti,
  mapSeries: Xa,
  mapValues: Zf,
  mapValuesLimit: js,
  mapValuesSeries: th,
  memoize: eh,
  nextTick: rh,
  parallel: nh,
  parallelLimit: ih,
  priorityQueue: ah,
  queue: el,
  race: uh,
  reduce: Qr,
  reduceRight: Go,
  reflect: us,
  reflectAll: ch,
  reject: hh,
  rejectLimit: ph,
  rejectSeries: gh,
  retry: fs,
  retryable: yh,
  seq: Qa,
  series: vh,
  setImmediate: Ze,
  some: Yo,
  someLimit: Xo,
  someSeries: Ko,
  sortBy: Ah,
  timeout: xh,
  times: Sh,
  timesLimit: Us,
  timesSeries: Oh,
  transform: Ph,
  tryEach: Dh,
  unmemoize: Ch,
  until: Lh,
  waterfall: Nh,
  whilst: hs,
  // aliases
  all: Bo,
  allLimit: Vo,
  allSeries: Uo,
  any: Yo,
  anyLimit: Xo,
  anySeries: Ko,
  find: No,
  findLimit: Io,
  findSeries: Fo,
  flatMap: Lo,
  flatMapLimit: Kn,
  flatMapSeries: Ro,
  forEach: jo,
  forEachSeries: ls,
  forEachLimit: as,
  forEachOf: Nt,
  forEachOfSeries: ne,
  forEachOfLimit: Xn,
  inject: Qr,
  foldl: Qr,
  foldr: Go,
  select: Ho,
  selectLimit: zo,
  selectSeries: qo,
  wrapSync: ss,
  during: hs,
  doDuring: os
}, Ih = "series";
function il(i) {
  return i in Fi ? Fi[i] : Fi[Ih];
}
const ji = "color:black;", Ur = "color:white;", Fh = "font-weight: normal;", Xt = "font-weight: bold;", ae = "background-color", le = "padding:0 5px;", D = {
  info: `color:magenta; ${Xt}`,
  event: `${le} ${ji} ${Xt} ${ae}: #F6FA70;`,
  include: `color:blue; ${Xt}`,
  taskin: `${le} ${Ur} ${Xt} ${ae}: #33658a;`,
  taskout: `${le} ${Ur} ${Xt} ${ae}: #33658a;`,
  taskstart: `${le} ${ji} ${Xt} ${ae}: #CAEDFF;`,
  taskend: `${le} ${ji} ${Xt} ${ae}: #CAEDFF;`,
  // taskitem    : `${pd} ${cb} ${fn} ${bgc}: #BFFFF0;`,
  taskitem: "",
  // 구현안됨
  err: `${le} ${Ur} ${Xt} ${ae}: #d90429; padding:3px 5px;`,
  // 등록안됨
  warn: `${le} ${Ur} ${Fh} ${ae}: #ff4d80; padding:3px 5px;`,
  // 중요 이벤트
  sysevent: `${le} ${Ur} ${Xt} ${ae}: #4db0ff; padding:3px 5px;`
  // log: 'color:#39d300',
  // node: 'color:blue',
  // node:'color:darkred',
  // server: 'color:dodgerblue',
  // warn: 'color:darkorange'
};
function jh(i) {
  let t = "";
  for (; --i >= 0; )
    t += "	";
  return t;
}
const Qn = "data-owner", Hs = "data-tid", Bh = "data-scope";
function zs(i, t) {
  let e;
  if (i && (e = Rt.toElement(i, t), !e))
    throw new Error(`parent를 찾을 수 없습니다. (${i})`);
  return e || (e = document.getElementById("app")), e || (e = t === document ? document.body : t), e;
}
function qs(i) {
  return () => {
    let t = i.parent;
    (typeof t == "string" ? t : !1) && (t = zs(t, i.parentRoot()));
    let r;
    const n = i.shadowrootMode;
    return n ? r = t.shadowRoot || t.attachShadow({ mode: n }) : r = t.ownerDocument, r;
  };
}
var Ve, gn, ce, fe, he, br, Ar, Bt, Ue, He, xr, ui, sl;
const yo = class yo {
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
    k(this, ui);
    /*
    static get application(){
        return _application;
    }
    static setApplication(dom){
        _application = dom;
    }
    */
    // 사용 안함 (NS 사용함)
    k(this, Ve, void 0);
    k(this, gn, void 0);
    // parent가 속한 document (parent.ownerDocument)
    k(this, ce, void 0);
    //------------------
    // attrs
    //------------------
    // append 할 parent DOM 참조값 또는 selector
    k(this, fe, void 0);
    // setParent(parent) { this.#parent = parent; }
    // open, closed
    k(this, he, "open");
    // parent document  위치 (include 할때 호출하는 문서의 위치)
    k(this, br, void 0);
    // 자신의 문서 위치
    k(this, Ar, void 0);
    //------------------
    // Node에 Marker 표시
    //------------------
    k(this, Bt, void 0);
    k(this, Ue, void 0);
    k(this, He, void 0);
    //------------------
    // etc
    //------------------
    // root로부터 추정한 자신의 (src) 문서 위치
    k(this, xr, void 0);
    if (!1 in t)
      throw new Error("문서 (owner)의 경로가 지정되지 않았습니다.");
    this.setOptions(t);
  }
  get includeChain() {
    return E(this, Ve);
  }
  get provider() {
    return E(this, gn);
  }
  get parentRoot() {
    return E(this, ce);
  }
  setOptions(t) {
    if (O(this, gn, t.provider), O(this, he, t.shadowrootMode), E(this, he) === "" && O(this, he, "open"), O(this, fe, t.parent), E(this, he) && !E(this, fe))
      throw new Error("parent 속성이 지정되지 않았습니다. (shadowroot host)");
    if (typeof E(this, fe) == "string") {
      if (!t.parentRoot)
        throw new Error("parent 값이 문자열인 경우 parentRoot Function을 지정해야 합니다.");
      typeof t.parentRoot == "function" ? O(this, ce, t.parentRoot) : O(this, ce, () => t.parentRoot);
    } else
      O(this, ce, () => E(this, fe).ownerDocument);
    if (!E(this, ce))
      throw new Error("root parentRoot 속성이 지정되지 않았습니다.");
    if (O(this, Ue, t.scope), O(this, He, t.define), t.scope && t.define)
      throw new Error("<scope>과 <define> 태그를 함께 사용할 수 없습니다.");
    O(this, Ar, t.src || ""), O(this, br, t.owner);
    const e = this.getSrcUrl(E(this, Ar), E(this, br));
    O(this, xr, e.href);
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
    return e.provider = (t == null ? void 0 : t.provider) || this.provider, e.parent = (t == null ? void 0 : t.parent) || this.parent, e.parentRoot = (t == null ? void 0 : t.parentRoot) || this.parentRoot, t == null || delete t.provider, t == null || delete t.parent, t == null || delete t.parentRoot, Object.assign(e, t || {}), new yo(e);
  }
  updateNS(t, e) {
    if (O(this, Bt, E(this, He) ? t + "#" + E(this, He) : t), !e) {
      O(this, Ve, [E(this, Bt)]);
      return;
    }
    e[0] === E(this, Bt) ? O(this, Ve, [...e]) : O(this, Ve, [E(this, Bt), ...e]);
  }
  addElement(t) {
    Object.defineProperty(t, "getParseOption", {
      configurable: !0,
      writable: !1,
      value: () => this
    });
  }
  get parent() {
    return E(this, fe);
  }
  get shadowrootMode() {
    return E(this, he);
  }
  get owner() {
    return E(this, br);
  }
  get src() {
    return E(this, Ar);
  }
  get ns() {
    return E(this, Bt);
  }
  get alias() {
    return C.$ns.getAlias(E(this, Bt));
  }
  get scope() {
    return E(this, Ue);
  }
  setScope(t) {
    O(this, Ue, t);
  }
  get define() {
    return E(this, He);
  }
  // ns가 달라지므로 setter 제공하지 않음
  // setDefine(defineID) { this.#define = defineID; }
  getMarker(t) {
    switch (t) {
      case Qn:
        return E(this, Bt);
      case Hs:
        return Ot.temporaryID();
      case Bh:
        return E(this, Ue);
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
    return E(this, xr);
  }
  // include 되지 않은 HTML 본문인지 여부
  isRootHTML(t) {
    return (t ?? this.uri) === window.location.href;
  }
  resolve(t = ".") {
    let e = new URL(t, E(this, xr)).href;
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
    return t instanceof HTMLTemplateElement || t instanceof HTMLElement ? e = t.innerHTML : typeof t == "string" && (e = t), e = Yt(this, ui, sl).call(this, e), e;
  }
};
Ve = new WeakMap(), gn = new WeakMap(), ce = new WeakMap(), fe = new WeakMap(), he = new WeakMap(), br = new WeakMap(), Ar = new WeakMap(), Bt = new WeakMap(), Ue = new WeakMap(), He = new WeakMap(), xr = new WeakMap(), ui = new WeakSet(), sl = function(t) {
  const e = this.resolve();
  return t = t.replace(/\${\s*(\$inject\.dirname|__dirname)\s*}/img, e), t;
};
let an = yo;
const Vh = "include-html-resource", Uh = "html-resource";
let Hr;
function bi(i) {
  Hr || (Hr = document.createElement("template"), Hr.setAttribute(Vh, ""), document.body.append(Hr));
  const t = Hr, e = `[${Qn}="${i.ns}"]`;
  let r = t == null ? void 0 : t.querySelector(e);
  return r || (r = document.createElement(Uh), i.addMarker(r, Qn), t.append(r)), r;
}
var ze, qe, Vt;
class Ws {
  constructor(t, e) {
    // script 값은 <script> 태그 뿐만이 아니라
    // inline script를 호출하는 일반 Element 일수도 있음
    k(this, ze, void 0);
    k(this, qe, void 0);
    k(this, Vt, void 0);
    O(this, ze, t), O(this, qe, e);
    const r = t.getParseOption();
    O(this, Vt, r.copy());
  }
  // get option() { return this.#option; }
  get tid_scope() {
    return E(this, Vt).scope;
  }
  get ns() {
    return E(this, Vt).ns;
  }
  get dirname() {
    return E(this, Vt).resolve();
  }
  get isRootHTML() {
    return E(this, Vt).isRootHTML();
  }
  // 스크립트가 실행 되었음를 알림
  load() {
    typeof E(this, qe) == "function" && E(this, qe).call(this), O(this, qe, !0);
  }
  /*
  // 사용법 : this.getInject().$task['클릭']();
    - $task['클릭'](); // Global task 호출됨
    - this.getInject().$task['클릭'](); // NS (<define>) 내부에 있는 task 호출됨
  */
  get $task() {
    var e;
    const t = E(this, Vt).alias;
    return (e = C.$ns.$id[t]) == null ? void 0 : e.$task;
  }
  // rootElememnt (element.getRootNode)
  // document 또는 host.shadowRoot
  // console.error('- shadowRoot: ', script.shadowRoot);
  get getRootNode() {
    return () => E(this, ze).getRootNode();
  }
  // 대신 document.currentScript 사용 가능 함
  get scriptElement() {
    return E(this, ze);
  }
  get parentElement() {
    return E(this, ze).parentElement;
  }
  get scopeElement() {
    const t = `scope[${Hs}="${this.tid_scope}"]`;
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
        var l, u;
        for (; o && !((l = o.dataset) != null && l[n]); )
          o = o.parentElement;
        const a = (u = o == null ? void 0 : o.dataset) == null ? void 0 : u[n];
        return Hh(a, s, this.isRootHTML);
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
    return e ? [...document.querySelectorAll(t)] : [...bi(E(this, Vt)).querySelectorAll(t)];
  }
  // 템플릿만 골라냄
  // const templateExp = /(.?)\btemplate(?=([\s.#:[,>+~]?))\b/img;
  // const list = selector.split(',').match(templateExp)?.filter((str)=>{
  //     return !(str.startsWith('[') || str.startsWith(':'))
  // });
}
ze = new WeakMap(), qe = new WeakMap(), Vt = new WeakMap();
function Hh(i, t, e) {
  return e ? !i || i === t : i && i === t;
}
async function zh(i, t) {
  const { provider: e } = i.getParseOption(), { tid: r, src: n } = t;
  let s;
  return n ? s = qh(i, t) : s = Wh(i, t), e.$moduleload.add(r, s), P() && console.log(`# 모듈 로드 지연 (${r})`), i;
}
function qh(i, t) {
  const {
    // tid,
    src: e
  } = t, r = (n) => {
    i.setAttribute("src", e), i.onload = () => {
      P() && console.log("[loaded module]", e), queueMicrotask(() => n());
    }, i.onerror = (s) => {
      console.error("[module 로드 에러]", s), queueMicrotask(() => n());
    };
  };
  return async () => await new Promise(r);
}
function Wh(i, t) {
  const {
    tid: e,
    content: r
  } = t, n = (s) => {
    const o = () => {
      i.innerHTML = r, queueMicrotask(() => s());
    };
    C.$inject.add(e, new Ws(i, o));
    let a = Gh(e, r);
    const l = document.createTextNode(a);
    i.appendChild(l);
  };
  return async () => await new Promise(n);
}
function Gh(i, t) {
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
function Yh(i, t) {
  return t.src ? Kh(i, t) : Qh(i, t), i;
}
function Xh(i, t) {
  const e = Ot.temporaryID();
  return C.$inject.add(e, new Ws(i)), ol(e, t, !0);
}
function Kh(i, t) {
  const { provider: e } = i.getParseOption(), {
    // tid,
    src: r
  } = t;
  return e.$dom.addScriptCounter(), i.setAttribute("src", r), i.onload = () => {
    P() && console.log("[loaded script]", r), e.$dom.removeScriptCounter();
  }, i.onerror = (n) => {
    console.error("[script 로드 에러]", n), e.$dom.removeScriptCounter();
  }, i;
}
function Qh(i, t) {
  const {
    tid: e,
    content: r
  } = t, n = () => {
    i.innerHTML = r;
  };
  C.$inject.add(e, new Ws(i, n));
  let s = ol(e, r);
  const o = document.createTextNode(s);
  return i.appendChild(o), i;
}
function ol(i, t, e) {
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
async function Jh(i) {
  var s;
  const t = i.getParseOption();
  if ((s = i.src) != null && s.includes("@vite"))
    return;
  const r = {
    tid: Ot.temporaryID(),
    // node.src: full url을 알려줌
    // attribute: 작성된 문자열 그대로 알려줌
    src: t.isRootHTML() ? i.getAttribute("src") : i.src,
    content: i.innerHTML
  };
  i.removeAttribute("src"), i.innerHTML = "";
  const n = document.createElement("script");
  return Rt.copyAttrs(i, n), t.addElement(n), i.type === "module" ? await zh(n, r) : Yh(n, r);
}
async function Zh(i) {
  const t = i.getParseOption();
  t.addMarker(i, Qn);
  const e = t.addMarker(i, Hs);
  t.setScope(e);
  const r = await ll(i);
  return t.setScope(), r;
}
function td(i, t) {
  if (typeof i == "string")
    throw new Error("(v0.2.1~) getTask : taskID가 아닌 task 참조 객체를 전달해야함");
  const e = i instanceof Fr ? i.copy() : i;
  if (!e)
    return;
  const { src: r } = e.attrs;
  if (!r)
    return e;
  const {
    id: n,
    args: s
  } = Gs(r), o = xo(t, n);
  if (!o)
    return e;
  const a = s === void 0 ? void 0 : Ia(t, s), l = u(o, e);
  return l !== e && delete e.list, e.attrs.srcRef = o, delete e.attrs.src, l.attrs = { ...l.attrs, ...e.attrs }, l._args = a, l;
  function u(f, h) {
    var w;
    f = c(f);
    const p = h.parseOption;
    let { alias: _, taskID: d, task: y } = C.$ns.findAlias(f, p);
    return y ? (w = y.attrs) != null && w.src ? u(y.attrs.src, y) : y.copy() : h === e ? e : (h.attrs.srcRef = c(h.attrs.src), delete h.attrs.src, h.copy());
  }
  function c(f) {
    return xo(a, f);
  }
}
function al(i) {
  const t = i.getParseOption();
  t || console.error("[taskParser 에러]: parseOption 전달되지 않음: ", i);
  const e = Rt.getAttributes(i);
  let { id: r } = e, {
    alias: n,
    taskID: s,
    provider: o,
    parseOption: a
  } = C.$ns.parseTaskID(r, t);
  const l = new Fr({
    id: s,
    attrs: e,
    list: ed(i),
    parseOption: a
  });
  P() && (console.log(`# Task 등록 ($task: ${o.$task.$$id}): `, `${n}:${s}`), console.log("	* taskNode:", i)), s ? o.$task.add(s, l) : (l.attrs.id = "자동 실행", o.$firstrun.add(l));
}
function ed(i) {
  let t = [];
  const e = i.getParseOption();
  for (let r of i.children) {
    const n = r.nodeName.toLowerCase(), s = Ne.includes(n);
    e.addElement(r);
    const o = s ? nd(r) : rd(r);
    o && t.push(o);
  }
  return t;
}
function rd(i) {
  const t = Rt.getAttributes(i), e = i.nodeName.toLowerCase();
  return (e === "js" || e === "script") && (t.$script = i.innerHTML), P() && console.log("		- item: ", e, t), new on({
    nodeName: e,
    attrs: t,
    parseOption: i.getParseOption()
  });
}
function nd(i) {
  const t = i.nodeName.toLowerCase(), e = Rt.getAttributes(i);
  let r = e.id;
  const n = e.src, s = i.getParseOption();
  return n ? (r && (s.provider.$task.add(r, n), delete e.id), P() && console.log("		- item (src): ", t, e), new on({
    nodeName: t,
    attrs: e,
    parseOption: s
  })) : (r || (r = id(), i.setAttribute("id", r)), al(i), e.src = r, delete e.id, P() && console.log("		- item (ref): ", t, e), new on({
    nodeName: t,
    attrs: e,
    parseOption: s
  }));
}
function id() {
  return "task_" + Ot.temporaryID();
}
async function sd(i) {
  const t = i.getParseOption();
  if (i.hasAttribute(yl)) {
    const e = Rt.getAttributes(i);
    await Yd(e, t);
    return;
  }
  al(i);
}
function od(i) {
  const t = i.getParseOption();
  bi(t).appendChild(i);
}
const ad = ["template", "script", "style", "link", "task"];
async function ld(i) {
  const t = i.getParseOption();
  [...i.childNodes].forEach((u) => {
    if (u.nodeType !== Node.ELEMENT_NODE)
      return u.remove();
    const c = u.nodeName.toLowerCase();
    ad.includes(c) || u.remove(), c === "link" && u.rel !== "stylesheet" && u.remove();
  });
  const e = [...i.childNodes];
  i.innerHTML = "";
  let r = i.getAttribute("ns");
  r || (r = Ot.temporaryID(), i.setAttribute("ns", r)), P() && console.log(`%c# Define 파싱 (${r}): `, D.include, e);
  const n = C.createProvider({
    $firstrun: t.provider.$firstrun
  }), s = t.copy({
    // src,
    // owner: parseOption.owner,
    parent: i,
    define: r,
    provider: n
  });
  C.$ns.add(s.ns, { alias: r, parseOption: s }), t.provider.$include.addRun(s), bi(s).append(i);
  const a = { parseOption: s };
  n.$dom.add(a), a.nodes = await Ai(e, s), a.done = l;
  function l() {
    ud(s), P() && console.log(`%c# Define 파싱 종료 (${r}): `, D.include);
  }
}
function ud(i) {
  const t = bi(i), e = [...t.querySelectorAll('style, link[rel="stylesheet"]')];
  [...t.querySelectorAll("template")].forEach((n) => {
    const s = e.map((o) => o.cloneNode(!0));
    n.content.prepend(...s);
  }), e.forEach((n) => n.remove());
}
class Oe {
  constructor() {
    // 디버깅용 인스턴스 구별자
    $(this, "$$id");
    $(this, "_map");
    this.$$id = Ot.temporaryID(), this._map = /* @__PURE__ */ new Map();
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
function ge(i) {
  return i == null ? void 0 : i.replace(/\s/mg, "");
}
class cd extends Oe {
  // task 등록
  // _map;
  constructor() {
    super();
    $(this, "_$id");
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
    return e = ge(e), super.has.has(e);
  }
  get(e) {
    return e = ge(e), super.get(e);
  }
  // 데이터 추가
  add(e, r) {
    if (e = ge(e), e !== void 0 && this._map.has(e))
      if ("override" in r.attrs)
        P() && console.warn(`# Task (id: ${e}) 정의가 오버라이딩 됩니다.`);
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
      value: (...n) => (Ys(r, n, () => {
      }), r)
    }), r;
  }
  remove(e) {
    if (e = ge(e), !!super.remove(e))
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
    P() && console.log("* task override: ", r), this._map = new Map([...r, ...this._map]);
  }
}
const fd = new MutationObserver(dd);
function hd(i) {
  fd.observe(i, {
    subtree: !0,
    childList: !0,
    attributes: !0
  });
}
function dd(i) {
  i.forEach((t) => {
    if (t.type === "childList") {
      [...t.addedNodes].forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE && P() && console.log("Observer (ELEMENT 추가됨): ", o);
      }), [...t.removedNodes].forEach((o) => {
        o.nodeType === Node.ELEMENT_NODE && P() && console.log("Observer (ELEMENT 제거됨): ", o);
      });
      return;
    }
    if (t.type !== "attributes")
      return;
    const e = t.target, r = t.attributeName, n = r.startsWith(Dr);
    if (r.startsWith("on") || n) {
      if (n && r === e.getAttribute(r))
        return;
      console.error(`Attribute changed! New value for '${r}'`), pd(e, r);
    }
  });
}
function pd(i, t) {
  md(i, t);
  const e = i.getAttribute(t);
  if (!e)
    return;
  ul(i, { name: t, value: e });
}
function md(i, t) {
  const e = i.$$inlineEvent;
  if (!(e != null && e[t]))
    return;
  let r;
  t.startsWith("on") ? r = t.substring(2) : r = t.substring(Dr.length);
  const { handler: n } = e[t];
  i.removeEventListener(r, n), delete e[t];
}
function Qo(i, t, e, r) {
  t in i && (i[t] = null), i.addEventListener(t.substring(2), e), i.setAttribute(r, r), i.$$inlineEvent || (i.$$inlineEvent = {});
  const n = i.$$inlineEvent;
  if (n[r])
    throw new Error("이전 인라인 이벤트 데이터가 지워지지 않음");
  n[r] = { handler: e };
}
const gd = (() => {
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
  return P() && i.push(Node.COMMENT_NODE), i;
})();
function _d(i) {
  return gd.includes(i.nodeType);
}
async function Ai(i, t) {
  let e = [];
  for (let r of i) {
    const n = await yd(r, t);
    n && e.push(n);
  }
  return e;
}
async function yd(i, t) {
  if (!_d(i))
    return;
  if (i.nodeType !== Node.ELEMENT_NODE)
    return () => i;
  const e = i.nodeName.toLowerCase();
  return t.addElement(i), Ne.includes(e) ? (e === Ne[1] && console.warn(`<${Ne[1]}> 대신 <${Ne[0]}> 태그를 사용하세요`), await sd(i)) : e === "define" ? await ld(i) : e === "template" ? od(i) : e === "scope" ? await Zh(i) : e === "script" ? await Jh(i) : await ll(i);
}
async function ll(i) {
  const t = Rt.getAttributes(i), e = {};
  for (let o in t) {
    const a = {
      name: o,
      value: t[o]
    }, {
      name: l,
      value: u
    } = ul(i, a);
    l && (e[l] = u ?? "");
  }
  const r = await Ai(i.childNodes, i.getParseOption());
  i.innerHTML = "";
  const n = i.nodeName.toLowerCase();
  let s = En.component(n);
  return s ? (console.warn("* SolidJS 정의 컴포넌트 사용 중단 예정 (대신 CustomElement 사용): ", n, e.id), () => {
    const o = ar(e, {
      children: r
    }), a = s(o);
    return na(a, e), a;
  }) : async () => (await new Promise(async (o) => {
    const a = [];
    for (let l of r)
      a.push(await Rt.toElementAsync(l));
    setTimeout(async () => {
      i.append(...a);
    }), na(i, e), o(i);
  }), i);
}
function ul(i, t) {
  let {
    name: e,
    value: r
  } = t, n = r.trim();
  if (!n)
    return t;
  let s, o;
  return e = e.toLowerCase(), e.startsWith("on") ? (o = Jo(i, n, !1), Qo(i, e, o, e), {
    name: e,
    value: o
  }) : e.startsWith(Dr) ? (s = e.substring(Dr.length), s ? (o = Jo(i, n, !0), Qo(i, `on${s}`, o, e), {
    name: e,
    value: e
  }) : t) : t;
}
function Jo(i, t, e) {
  return (r) => {
    let n;
    try {
      P() && console.log("%c[실행 (%s)]: ", D.event, r.type, r);
      for (const s in r.currentTarget.dataset) {
        let o = r.currentTarget.dataset[s] || "";
        o.includes(",") ? o = o.split(",").map((a) => a.trim()) : o = [o], Array.isArray(o) || (o = [o]), r[s] = o;
      }
      return e ? (n = vd(t, i), P() && console.log("%c호출 구문: %s", D.event, n)) : (n = Xh(i, t), window.event || (window.event = r, n += "window.event = null;")), n = yi(n, "event"), lr(n).apply(r.target, [r]);
    } catch (s) {
      return console.error("[핸들러 처리]", s), n || t;
    }
  };
}
function vd(i, t) {
  let {
    id: e,
    args: r
  } = Gs(i);
  r = r === "" || r === void 0 ? "{$_tempAddedEvent: event}" : r + ", {$_tempAddedEvent: event}", e = bn(r, e);
  let {
    alias: n,
    taskID: s,
    task: o
  } = C.$ns.findAlias(e, t.getParseOption());
  return o ? `$task["${n}:${s}"](${r})` : `${e}(${r})`;
}
function cl(i) {
  if (!i || i.length < 1)
    return;
  let t = i[i.length - 1];
  !t || typeof t != "object" || "$_tempAddedEvent" in t && (i.event = t.$_tempAddedEvent, i.splice(i.length - 1, 1));
}
function Gs(i) {
  var o;
  if (!i)
    return;
  if (i = i.trim(), i = Zo(i, "\\(", "\\)"), i = Zo(i, "\\[", "\\]"), /^('|")(.*)\1$/.test(i))
    return i = zr(i, "'", "'"), i = zr(i, '"', '"'), {
      id: i.replace(/\s/mg, ""),
      args: void 0
    };
  const t = /^([^\n]+)\((.*)\)\s*;*$/gms;
  if (!(((o = i.match(t)) == null ? void 0 : o[0]) === i))
    return {
      id: ge(i),
      args: void 0
    };
  let n, s;
  return i.replace(t, (a, l, u, c, f) => {
    n = ge(l), s = u == null ? void 0 : u.trim();
  }), n = zr(n, "\\[", "\\]"), n = zr(n, "'", "'"), n = zr(n, '"', '"'), {
    id: n,
    args: s
  };
}
function Zo(i, t, e) {
  return r(i);
  function r(s) {
    var u;
    const o = new RegExp("^" + t + "([\\s\\S]*)" + e + "$", "gms"), a = (u = s.match(o)) == null ? void 0 : u[0];
    let l = s;
    if (a) {
      if (l.replace(o, (c, f) => {
        l = f.trim();
      }), !n(l))
        return s;
      l = r(l);
    }
    return l;
  }
  function n(s) {
    let o = 0;
    for (const a of s)
      if (a === "(" ? o++ : a === ")" && o--, o < 0)
        return !1;
    return !o;
  }
}
function zr(i, t, e) {
  var s;
  let r = i;
  const n = new RegExp("^" + t + "([\\s\\S]*)" + e + "$", "gms");
  for (; r && ((s = r.match(n)) == null ? void 0 : s[0]); )
    r.replace(n, (a, l) => {
      r = l.trim();
    }), r && (i = r);
  return i;
}
var _n, yn, $r, Sr, Or;
class fl extends Ua {
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
    k(this, _n, void 0);
    k(this, yn, void 0);
    // task 실행시 전달된 매개변수를 참조할 수 있도록 제공해줌
    k(this, $r, void 0);
    // (디버깅용) 실행 노드의 depth
    $(this, "depth");
    $(this, "tab");
    $(this, "debug");
    // 정의되지 않은 TaskItem 호출일때 (true)
    $(this, "undefinedItem", !1);
    // 에러 발생시, 취소시 메세지 보관
    $(this, "error");
    //--------------------------------------
    // task 실행이 모두 완료됬는지 확인
    //--------------------------------------
    // 이벤트로 연결된 모든 task 실행이 모두 완료됬는지 확인
    k(this, Sr, !1);
    k(this, Or, !1);
    //--------------------------------------
    // Task 이벤트 Proxy
    //--------------------------------------
    // 이벤트를 캐치하여 task 이벤트로 재발송 해줌 (customEvent)
    // 예) audio 이벤트 --> sound task 이벤트
    $(this, "proxyEvents");
  }
  get nodeName() {
    return E(this, _n);
  }
  get info() {
    return E(this, yn);
  }
  // toObject: $args 파싱된 문자열을 다시 객체로 전환
  attr(e, r = "string") {
    const n = this.info.attrs[e];
    return n && function(s) {
      try {
        return bn(s, n, r);
      } catch (o) {
        return console.error(`[Attribute 파싱 에러] ${r}:`, n, o), n;
      }
    }(this.args);
  }
  hasAttr(e) {
    return e in this.info.attrs;
  }
  get args() {
    return E(this, $r);
  }
  // Task 아이템 생성 (factory) 함수에서 호출됨
  create({
    nodeName: e,
    info: r,
    args: n,
    depth: s
  }) {
    this.debug = P(), this.depth = !s || isNaN(s) ? 0 : s, this.tab = this.debug ? jh(s + 1) : "", O(this, _n, e), O(this, yn, r), O(this, $r, n || []);
    const o = r == null ? void 0 : r.parseOption;
    return Object.defineProperty(E(this, $r), "getParseOption", {
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
    this.error = e, e === Sn ? (P() && (this.nodeName === "cancel" ? console.log(`${this.tab}%c# (cancel) ${this.nodeName} 실행됨`, D.info) : console.log(`${this.tab}%c# (cancel) 실행중인 ${this.nodeName} 취소됨`, D.info)), this.emit("cancel", this), this.attributeEvent("cancel")) : e === On ? (console.log(`${this.tab}%c# (exit) 실행중인 ${this.nodeName} exit`, D.info), this.skipEvent()) : (console.error("[Task 실행 중지]", e), this.emit("error", this), this.attributeEvent("error"));
  }
  skipEvent() {
    this.emit("skip", this), this.attributeEvent("skip");
  }
  // Task 실행중 발생한 모든 이벤트는 start ~ end 이벤트 사이에 발생해야함
  checkComplete() {
    E(this, Sr) && E(this, Or) && (this.completeEvent(), this.destroy(), this.completeTask());
  }
  //--------------------------------------
  // Task 진행 이벤트 - start
  //--------------------------------------
  startEvent() {
    O(this, Sr, !1), O(this, Or, !1), this.emit("start", this);
  }
  startTask(e) {
    const r = () => {
      O(this, Sr, !0), e(), this.checkComplete();
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
    this.undefinedItem ? console.log(`${this.tab}%c[${this.nodeName} 등록 안됨]`, D.warn, this.info) : console.log(`${this.tab}%c[${this.nodeName} 구현 안됨]`, D.err, this.info), e();
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
      O(this, Or, !0), e(), this.checkComplete();
    };
    this.attributeEvent("end", r);
  }
  //--------------------------------------
  // Task Complete 이벤트
  //--------------------------------------
  completeEvent() {
    this.debug && console.log(`${this.tab}%c[${this.nodeName} 완료]`, D.taskitem, this.info), this.emit("complete", this);
  }
  completeTask() {
    this.attributeEvent("complete", null, !0);
  }
  // 노드에 이벤트가 있는지 확인
  attributeEvent(e, r = null, n = !1) {
    let s = e.toLowerCase();
    try {
      const o = this.info.attrs["on" + s];
      o && Fa(this.args, o);
      const a = Dr + s, l = this.info.attrs[a];
      if (!l)
        return r == null ? void 0 : r();
      const u = () => {
        this.debug && console.log(`${this.tab}%c(${a}) %s <${this.nodeName}>`, D.event, l, this.info.attrs);
        const c = s === "complete" ? this.depth : this.depth + 1;
        ds(l, this.args, r, c);
      };
      n ? setTimeout(u, 0) : u();
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
      o = o || r(s, Dr), o && (n || (n = []), n.push(o));
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
_n = new WeakMap(), yn = new WeakMap(), $r = new WeakMap(), Sr = new WeakMap(), Or = new WeakMap();
j("TaskInterface", fl);
class wd extends fl {
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
      ds(s, this.args, (o) => {
        o ? this.dispatchError(o) : super.dynamic(t);
      }, this.depth + 1);
      return;
    }
    const r = this.attr("else");
    if (r && ds(r, this.args, (s) => {
      s ? this.dispatchError(s) : super.dynamic(t);
    }, this.depth), "if-break" in this.info.attrs) {
      const s = this.attr("id") || Ot.temporaryID();
      P() && console.log(`${this.tab}%c# (if-break) ${s}: 실행중인 task를 멈춤`, D.info), C.$break.add(s, () => {
        this.dynamic(t);
      });
      return;
    }
    return this.info.skipedByCondition = !0, P() && console.log(`${this.tab}%c# (skip)`, D.info, this.info), !0;
  }
  getCondition() {
    const t = "if-break" in this.info.attrs;
    if (!("if" in this.info.attrs) && !t)
      return;
    let r;
    return t ? (r = this.attr("if-break", "code"), P() && console.log(`${this.tab}%c# (if-break) 결과 : ${r}`, D.info)) : (r = this.attr("if", "code"), P() && console.log(`${this.tab}%c# (if) 결과 : ${r}`, D.info)), !!r;
  }
}
var ci, hl, We;
class ur extends wd {
  constructor() {
    super();
    // setTimer 기능 추가
    k(this, ci);
    // resolve 함수가 실행되었는지 확인
    $(this, "_run_is_closed", !1);
    // timer attribute
    // 종료 시점을 직접 지정할때
    k(this, We, void 0);
  }
  async dynamic(e) {
    if (!("delay" in this.info.attrs))
      return super.dynamic(e);
    const n = this.attr("delay", "code");
    return await new Promise((o, a) => {
      setTimeout(async () => {
        const l = super.dynamic(e);
        o(l);
      }, n);
    });
  }
  bindHandler(e) {
    let {
      start: r,
      end: n
    } = super.bindHandler(e);
    const s = Yt(this, ci, hl).bind(this);
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
ci = new WeakSet(), hl = function(e, r) {
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
class Td extends ur {
  constructor() {
    super(...arguments);
    $(this, "key");
  }
  run(e, r, n) {
    const s = this.attr("id");
    P() && console.log(`%c# (break) ${s}: 실행중인 task를 멈춤`, D.info), C.$break.add(s, e), this.key = s, n(!1);
  }
  timerReached(e) {
    this.key && (C.$break.release(this.key), this.key = null), e == null || e();
  }
}
j("Break", Td);
class Ed extends ur {
  run(t, e, r) {
    const n = this.attr("id");
    if (n) {
      if (!C.$break.has(n))
        return t();
      P() && console.log(`%c# (break-release) ${n}: break 상태 해제 후 계속 진행`, D.info), C.$break.release(n);
    }
    r();
  }
}
j("Break-release", Ed);
const Sn = "취소됨", On = "건너뜀";
class bd extends ur {
  exitRunFunction(t, e) {
    e(Sn);
  }
  run(t, e, r) {
    r();
  }
}
j("Cancel", bd);
class Ad extends ur {
  exitRunFunction(t, e) {
    e(On);
  }
  run(t, e, r) {
    r();
  }
}
j("Exit", Ad);
function ds(i, t, e, r) {
  var h, p, _, d;
  const {
    id: n,
    args: s
  } = Gs(i);
  t.event || (t.event = window.event), cl(t);
  let o;
  s ? o = Ia(t, s) : o = t;
  const a = bn(t, n), l = ((_ = (p = (h = t == null ? void 0 : t.event) == null ? void 0 : h.target) == null ? void 0 : p.getParseOption) == null ? void 0 : _.call(p)) || ((d = t == null ? void 0 : t.getParseOption) == null ? void 0 : d.call(t));
  if (!l)
    return;
  let { alias: u, taskID: c } = C.$ns.findAlias(a, l);
  const f = l.provider.$task.get(c);
  Ys(f, o, e, r);
}
function Ys(i, t, e, r = 0) {
  if (typeof i == "string")
    throw new Error("(v0.2.1~) runAsTask : taskID가 아닌 task 참조 객체를 전달해야함");
  cl(t), t.event || (t.event = window.event);
  const n = Ne[0], o = En.taskItem(n)({
    nodeName: n,
    info: i,
    args: t,
    depth: r
  });
  if (!o)
    return e == null ? void 0 : e();
  ps(o, e, "TASK");
}
function xd(i, t, e, r) {
  const {
    list: n = [],
    attrs: { sync: s }
  } = i, o = n.map((l) => (u) => {
    l._depth = r, l._args = t, $d(l, u);
  });
  il(s)(o).then(() => {
    e == null || e();
  }).catch((l) => {
    l === Sn || l === On || console.error("[runTask 에러]", l), e == null || e(l);
  });
}
function $d(i, t) {
  const {
    nodeName: e,
    _args: r,
    _depth: n = 0
  } = i;
  let s;
  const o = En.taskItem(e);
  if (!o) {
    s = Sd(i), ps(s, t, "unknown");
    return;
  }
  if (s = o({
    nodeName: e,
    info: i,
    args: r,
    depth: n
  }), !s)
    return t == null ? void 0 : t();
  ps(s, t, "ITEM");
}
function Sd(i) {
  const {
    nodeName: t,
    _args: e,
    _depth: r = 0
  } = i, s = En.taskItem("TaskInterface")({
    nodeName: t,
    info: i,
    args: e,
    depth: r
  });
  return s.undefinedItem = !0, s;
}
function ta(i) {
  let t = "";
  for (; --i >= 0; )
    t += "	";
  return t;
}
async function ps(i, t, e = "") {
  if ((() => {
    if (!P() || e !== "TASK")
      return;
    const { info: s } = i, o = ta(i.depth);
    if (s) {
      const a = (s == null ? void 0 : s.attrs.id) || "";
      console.log(`${o}%c<${a} (호출)>`, D.taskin, s);
    } else
      console.log(`${o}%c<TASK 호출: 알수없는 TASK>`, D.err, s);
  })(), await i.dynamic()) {
    t();
    return;
  }
  C.$running.add(i, t);
  const n = (s) => {
    i.off("cancel", n), i.off("error", n), i.off("complete", n), i.off("skip", n);
    const o = s.type === "skip", a = s.type === "cancel" || s.type === "error";
    (() => {
      if (!P())
        return;
      const l = s.detail.info, u = (l == null ? void 0 : l.attrs.id) || "";
      if (e === "TASK") {
        const c = ta(i.depth), f = a ? s.detail.error : l;
        let h = "완료";
        s.type === "cancel" && (h = "취소"), s.type === "error" && (h = "에러"), console.log(`${c}%c<${u} (${h})>`, D.taskout, f);
      }
    })(), C.$running.remove(i), a || o ? t == null || t(s.detail.error) : t == null || t();
  };
  i.once("cancel", n), i.once("error", n), i.once("complete", n), i.once("skip", n);
}
const Od = "$$firstrun";
var te, de, fi, dl, hi, pl, di, ml;
class Pd {
  constructor() {
    k(this, fi);
    k(this, hi);
    k(this, di);
    // App 로드 후 처음으로 실행될 task 목록
    k(this, te, void 0);
    // 사용안함
    k(this, de, void 0);
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
    const t = !E(this, de), e = E(this, de) === "started", r = E(this, de) === "finished";
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
    E(this, te) || Yt(this, di, ml).call(this), E(this, te).list.push(t);
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
      Ys(n, [], s);
    });
    return Yt(this, fi, dl).call(this), await new Promise((n) => {
      il(e)(r).then(() => {
        Yt(this, hi, pl).call(this), n(), O(this, te, null);
      }).catch((o) => {
        console.error("[firstRun]", o), n();
      });
    });
  }
}
te = new WeakMap(), de = new WeakMap(), fi = new WeakSet(), dl = function() {
  O(this, de, "started");
}, hi = new WeakSet(), pl = function() {
  O(this, de, "finished");
}, di = new WeakSet(), ml = function() {
  O(this, te, new Fr({
    id: Od,
    // sync: 'series' (default: series)
    attrs: {},
    // task interface 구현 객체 정보
    list: []
    // parseOption: taskItem 마다 parseOption 있음
  }));
};
class kd extends Oe {
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
    this.remove(t), P() && console.log(`%c# (release) ${t}: 멈춘 작업 다시 시작`, D.info), e == null || e();
  }
}
class Dd extends Oe {
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
class Bi extends Oe {
  constructor() {
    super();
    $(this, "_$id");
    this._$id = {};
  }
  get $id() {
    return this._$id;
  }
  // $provider.$sound.destroy('미디어 ID', 'all');
  // destroyOption: 'all' | ''
  destroy(e, r) {
    I() && console.log(`%c# media (destroy) ${e}: ${r || ""}`, D.info);
    const n = this.get(e);
    if (n) {
      if (n.destroy.forEach((s) => s()), n.destroy = [], r !== "all") {
        n.media.stop(), n.media.set("src", null), n.media.set("src", ""), n.media.clearConfig();
        const s = Ha();
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
var pe;
const ct = class ct {
  constructor() {
    // 디버깅용 인스턴스 구별자
    $(this, "$$id");
    //-----------------------------------
    // 실행 지연된 (preload) provider 목록
    //-----------------------------------
    k(this, pe, void 0);
    this.$$id = Ot.temporaryID();
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
    E(this, pe) || O(this, pe, /* @__PURE__ */ new Map()), E(this, pe).set(Ot.temporaryID(), t), P() && console.log(`# 로드된 문서 실행 스케쥴 등록 : ${t.ns}`);
  }
  // (중요) 등록된 순서대로 실행됨
  // root --> include .... 순으로 등록됨
  async each(t) {
    const e = E(this, pe);
    if (e) {
      for (let [r, n] of e)
        if (await t(n))
          break;
    }
  }
  runClose() {
    O(this, pe, null);
  }
};
pe = new WeakMap(), $(ct, "_map", /* @__PURE__ */ new Map()), $(ct, "_$id", {});
let Jn = ct;
class Cd extends Oe {
  async run() {
    const t = this.getAll(), e = [];
    for (let [r, n] of t)
      e.push(n());
    await Promise.all(e), this.clear();
  }
}
var Ge, Ye, vn, ms;
class Md extends Oe {
  constructor() {
    super(...arguments);
    k(this, vn);
    //------------------------------
    // 스크립트 로드 (실행) 완료 체크
    //------------------------------
    k(this, Ge, void 0);
    k(this, Ye, 0);
  }
  // 데이터 추가
  add(e) {
    return super.add(Ot.temporaryID(), e);
  }
  // DOM Attach
  async run() {
    let e = this.getAll();
    e = Array.from(e.entries());
    const r = [];
    for (let [n, { nodes: s, parseOption: o, done: a }] of e) {
      a && r.push(a);
      let l = o.parent;
      if (!l)
        continue;
      typeof l == "string" && (l = zs(l, o.parentRoot()));
      let u;
      const c = o.shadowrootMode;
      c ? u = l.shadowRoot || l.attachShadow({ mode: c }) : u = l, await new Promise(async (f) => {
        for (let h of s)
          u.append(await Rt.toElementAsync(h));
        f();
      });
    }
    this.clear(), await new Promise((n) => {
      O(this, Ge, n), Yt(this, vn, ms).call(this);
    }), r.forEach((n) => n());
  }
  get script() {
    return E(this, Ye);
  }
  addScriptCounter() {
    ++ki(this, Ye)._;
  }
  removeScriptCounter() {
    --ki(this, Ye)._, Yt(this, vn, ms).call(this);
  }
}
Ge = new WeakMap(), Ye = new WeakMap(), vn = new WeakSet(), ms = function() {
  E(this, Ye) === 0 && E(this, Ge) && setTimeout(() => {
    E(this, Ge).call(this), O(this, Ge, null);
  });
};
var me, pi, gl;
class Ld extends Oe {
  constructor() {
    super();
    k(this, pi);
    //-----------------------------------
    // NS 관리 (define, scope...)
    //-----------------------------------
    k(this, me, void 0);
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
    return e !== void 0 && this.has(e) && console.warn(`중복된 문서 NS가 등록됩니다. (${e})`), this._map.set(e, r), r.alias && (Yt(this, pi, gl).call(this, r.alias, e), Object.defineProperty(this.$id, r.alias, {
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
    return E(this, me).get(e);
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
      const l = e.split(":");
      s = ge(l.pop()), n = l.pop();
    }
    n || (n = r ? this.getAlias(r.ns) : "global");
    let o = this.getNS(n), a = this.get(o);
    return a ? {
      alias: n,
      taskID: s,
      parseOption: a.parseOption,
      provider: a.parseOption.provider
      // provider: this.getProviderByAlias(alias)
    } : (console.error(`(경고) 등록되지 않은 네임스페이스 입니다. ${n} (ns: ${o})`), {
      alias: n,
      taskID: s,
      parseOption: r,
      provider: r == null ? void 0 : r.provider
    });
  }
  // task 실행 context 찾기
  // 이벤트 핸들러에서 전달된 구문을 실행 가능하도록 지원함
  // 우선 순위 : taskID prefix > (parseOption ? NS) > global
  findAlias(e, r) {
    const n = e.split(":");
    e = ge(n.pop());
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
me = new WeakMap(), pi = new WeakSet(), gl = function(e, r) {
  if (E(this, me) || O(this, me, /* @__PURE__ */ new Map()), E(this, me).has(e)) {
    console.error(`이미 "${e}" 이름으로 등록된 데이터가 있습니다. (${r})`);
    return;
  }
  P() && console.log(`%c# NS 등록 (${e}) : ${r}`, D.include), E(this, me).set(e, r);
};
const Vi = "$taskml";
class Rd {
  constructor() {
    // include 파일 정보 저장 (중복 로드안함)
    // include src와 로드된 데이터 등을 저장함
    $(this, "$include");
    // ns 관리
    $(this, "$ns");
    // <script> 코드에 inject되는 코드 임시 저장소
    $(this, "$inject");
    //-------------
    // 파싱 단계
    //-------------
    $(this, "$task");
    $(this, "$dom");
    $(this, "$moduleload");
    $(this, "$firstrun");
    //-------------
    // 런타임 단계
    //-------------
    $(this, "$js");
    $(this, "$break");
    $(this, "$running");
    $(this, "$sound");
    $(this, "$video");
    $(this, "$audio");
  }
  //----------------------------
  // 데이터 초기화
  //----------------------------
  // 새로운 NS 구성에 필요한 Provider 생성
  createProvider(t) {
    return {
      $include: (t == null ? void 0 : t.$include) ?? new Jn(),
      $task: (t == null ? void 0 : t.$task) ?? new cd(),
      $dom: (t == null ? void 0 : t.$dom) ?? new Md(),
      $moduleload: (t == null ? void 0 : t.$moduleload) ?? new Cd(),
      $firstrun: (t == null ? void 0 : t.$firstrun) ?? new Pd()
    };
  }
  create(t) {
    this.$include = new Jn(), this.$ns = new Ld(), this.$inject = new Oe(), this.$dom = t.$dom, this.$moduleload = t.$moduleload, this.$firstrun = t.$firstrun, this.$task = t.$task, this.$js = new qc(), this.$sound = new Bi(), this.$video = new Bi(), this.$audio = new Bi(), this.$break = new kd(), this.$running = new Dd();
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
        return En.getAll();
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
    this.binding(window, Vi, () => r);
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
    const t = window[Vi];
    this.create$taskProperty(), this.binding(window, "$sound", () => t.$sound.$id), this.binding(t.$sound.$id, "destroy", () => t.$sound.destroy.bind(t.$sound)), this.binding(window, "$video", () => t.$video.$id), this.binding(t.$video.$id, "destroy", () => t.$video.destroy.bind(t.$video)), this.binding(window, "$audio", () => t.$audio.$id), this.binding(t.$audio.$id, "destroy", () => t.$audio.destroy.bind(t.$audio)), this.binding(window, "$break", () => t.$break), this.binding(window, "$js", () => t.$js.getContext()), this.binding(window, "$include", () => t.$include.$id), this.binding(window, "$ns", () => t.$ns.$id);
  }
  create$taskProperty() {
    const t = window[Vi];
    Object.defineProperty(t, "$task", {
      configurable: !0,
      writable: !1,
      value: C.$ns.$id
    }), window.$task = new Proxy(t.$task, {
      get(e, r, n) {
        var u;
        let s;
        window.hasOwnProperty("$inject") && (s = $inject == null ? void 0 : $inject.scriptElement);
        const { alias: o, taskID: a, task: l } = C.$ns.findAlias(r, s == null ? void 0 : s.getParseOption());
        return (u = C.$ns.$id[o]) == null ? void 0 : u.$task[a];
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
const C = new Rd();
let gs;
function Nd() {
  jd(), gs = Hd(), gs.start();
}
const _e = {
  TASK_DOM_CREATED: "TASK_DOM_CREATED",
  TASK_APP_CREATED: "TASK_APP_CREATED",
  TASK_FIRST_RUN_START: "TASK_FIRST_RUN_START",
  TASK_FIRST_RUN_COMPLETE: "TASK_FIRST_RUN_COMPLETE"
};
async function dr(i) {
  switch (i) {
    case "DOMContentLoaded":
      await Bd();
      break;
    case "load":
      await gs.release(), await zd();
      break;
    case _e.TASK_DOM_CREATED:
    case _e.TASK_APP_CREATED:
    case _e.TASK_FIRST_RUN_START:
    case _e.TASK_FIRST_RUN_COMPLETE:
      Fd(i);
      break;
  }
}
function Id(i) {
  i.stopPropagation(), i.stopImmediatePropagation(), i.preventDefault();
}
function Fd(i) {
  P() && console.log(`%c# Task Event ('${i}') Dispatch!`, D.sysevent), document.dispatchEvent(new CustomEvent(i)), window.dispatchEvent(new CustomEvent(i));
}
let Ln, Jr;
function jd() {
  const i = { capture: !0, once: !0 };
  document.addEventListener("DOMContentLoaded", (t) => {
    Jr ? Jr() : (P() && console.warn(`(DOMContentLoaded 이벤트 지연 시킴: ${document.readyState})`), Id(t), Ln = t);
  }, i), Vd();
}
async function Bd() {
  Ln || (P() && console.warn(`(DOMContentLoaded 이벤트 기다림: ${document.readyState})`), await new Promise((i) => {
    Jr = i;
  })), P() && console.log("%c# Event ('DOMContentLoaded') Dispatch!", D.sysevent), Jr || document.dispatchEvent(Ln), Jr = null, Ln = null, Ud();
}
let _s;
function Vd() {
  _s = document.readyState, Object.defineProperty(document, "readyState", {
    configurable: !0,
    enumerable: !0,
    get() {
      return _s;
    }
  });
}
function Ud() {
  _s = "complete";
  const i = requestAnimationFrame(() => {
    cancelAnimationFrame(i), P() && console.warn(`(readyState 변경됨: ${document.readyState})`), delete document.readyState;
  });
}
function Hd() {
  let i, t, e = 0;
  try {
    t = document.createElement("img"), t.style.display = "none", t.setAttribute("desc", "이벤트 지연"), document.body.appendChild(t), t.onerror = () => {
      i || r();
    }, t.onload = async () => {
      t.remove(), i && i();
    };
  } catch {
  }
  return {
    start: r,
    release: n
  };
  function r() {
    t.src = `http://10.255.255.1:9876/fake?hang=${++e}`;
  }
  async function n() {
    i || (t.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=", await new Promise((s) => {
      i = s;
    }));
  }
}
async function zd() {
  const i = window.onload;
  window.onload = (s) => {
    P() && console.log("%c# Event ('load') Dispatch!", D.sysevent), window.onload = i, i && i(s);
  };
  let t;
  const e = (() => {
    let s = window;
    try {
      for (; s.parent !== s; )
        s = s.parent;
    } catch {
    }
    return s;
  })();
  function r() {
    clearTimeout(n), setTimeout(t, 0);
  }
  const n = setTimeout(() => {
    r();
  }, 1e4);
  e.addEventListener("load", r, { once: !0 }), await new Promise((s) => t = s);
}
async function _l(i, t) {
  const e = (t == null ? void 0 : t.type) === "app";
  P() && (console.time("# DOM 생성에 걸린 시간은?"), console.log("%c# DOM (& script) Attach 실행", D.include, i.$dom.length), console.log("* 로드된 Script 개수 : ", i.$dom.script)), await i.$include.each(async (r) => {
    await r.provider.$dom.run();
  }), P() && (console.warn("외부 <script>에는 주입되는 코드가 없습니다."), console.log("%c# DOM (& script) Attach 실행 완료!", D.include), console.timeEnd("# DOM 생성에 걸린 시간은?")), e && await dr(_e.TASK_DOM_CREATED), P() && console.warn('(모듈 실행 <script type="module">)'), P() && console.log("%c# 모듈 로드 (실행)", D.include, i.$moduleload.length), await i.$include.each(async (r) => {
    await r.provider.$moduleload.run();
  }), P() && (console.warn("외부 모듈 <script>에는 주입되는 코드가 없습니다."), console.log("%c# 모듈 로드 (실행) 완료!", D.include)), e && (await dr("DOMContentLoaded"), await dr(_e.TASK_APP_CREATED), await dr("load")), await dr(_e.TASK_FIRST_RUN_START), await i.$include.each(async (r) => {
    var n;
    if ((n = i.$firstrun) != null && n.length && (await qd(r), e && r.isRootHTML()))
      return !0;
  }), i.$include.runClose(), await dr(_e.TASK_FIRST_RUN_COMPLETE);
}
async function qd(i) {
  return new Promise(async (t) => {
    P() && console.log("%c# Task 자동 실행", D.info, i.ns), await i.provider.$firstrun.run(), P() && console.log("%c# Task 자동 실행 완료!", D.info, i.ns), t();
  });
}
async function Wd(i, t) {
  const e = i.provider;
  await e.$dom.run(), await e.$moduleload.run(), e.$firstrun.length && (P() && console.log(`%c# Include Task 실행 (${i.ns})`, D.info), await e.$firstrun.run(), P() && console.log(`%c# Include Task 실행 완료! (${i.ns})`, D.info)), t == null || t();
}
const Gd = "src", yl = "preload", vl = "selector", wl = "shadowroot";
async function Yd(i, t) {
  var o;
  const e = (o = i[yl]) == null ? void 0 : o.trim();
  P() && console.log(`%c# 프리 로드 (${e}): `, D.include, i);
  const r = C.createProvider({
    $include: t.provider.$include,
    // DOM 파싱은 본문 > 로드 문서 순으로 파싱함
    // $dom: option.provider.$dom,
    // preload 중에는 $task (파싱)위치에 따라 자동으로 오버라이딩됨
    // 로드된 문서의 task를 global로 취급하지 않으려면 별도로 괸리해야 함
    // $task: new TaskProvider(),
    // 같은 객체를 참조 (NS로 구분하지만 결국 같은 global task를 실행시키도록 함)
    // $task: option.provider.$task,
    $task: C.$ns.getProviderByAlias("global").$task,
    // 프리로드 되는 데이터도 파싱(실행) 순서를 본문과 함께 관리
    $moduleload: t.provider.$moduleload,
    $firstrun: t.provider.$firstrun
  }), n = new an({
    provider: r,
    // include문 작성할때 root 기준 경로로 작성하는 것으로 함 (dirname 또는 $inject 사용)
    src: e,
    owner: t.owner,
    // owner: window.location.href,
    shadowrootMode: i[wl],
    parent: i[vl],
    parentRoot: qs(t)
  });
  C.$ns.add(n.ns, {
    // ns에 콜론 있을수 있으므로 id 사용함
    alias: Ot.temporaryID(),
    // alias: newOption.ns,
    parseOption: n
  });
  const s = await El(n.uri);
  await Ks(s, n), P() && console.log(`%c# 프리 로드 (${e}) 완료: `, D.include, "익명 task는 본문 실행 목록에 포함됨");
}
async function Xd(i, t) {
  var o;
  const e = (o = i[Gd]) == null ? void 0 : o.trim();
  P() && console.log(`%c# Include (${e}) 문서 로드: `, D.include, i);
  const r = C.createProvider({
    // 같은 객체를 참조 (NS로 구분하지만 결국 같은 global task를 실행시키도록 함)
    // $task: option.provider.$task,
    $task: C.$ns.getProviderByAlias("global").$task
  }), n = new an({
    provider: r,
    // include문 작성할때 root 기준 경로로 작성하는 것으로 함 (dirname 또는 $inject 사용)
    src: e,
    owner: t.owner,
    // owner: window.location.href,
    shadowrootMode: i[wl],
    parent: i[vl],
    parentRoot: qs(t)
  });
  C.$ns.add(n.ns, {
    // ns에 콜론 있을수 있으므로 id 사용함
    alias: Ot.temporaryID(),
    // alias: newOption.ns,
    parseOption: n
  });
  const s = await El(n.uri);
  await Ks(s, n), await _l(r), P() && console.log(`%c# Include (${e}) 문서 로드 완료`, D.include);
}
async function Xs(i, t, e = !1) {
  var a;
  const r = i.getAttribute("template"), n = await Kd(r, t);
  if (!n)
    return;
  const s = ((a = n == null ? void 0 : n.dataset) == null ? void 0 : a.name) || "data", o = async (l) => {
    const u = (c) => {
      if (l) {
        const f = Wn(c, s);
        c = lr(f)(l);
      }
      return c;
    };
    await Ks(n.innerHTML, t, u);
  };
  return e && n.remove(), o;
}
async function Kd(i, t) {
  if (!i)
    return;
  let e = qs(t)();
  return P() && console.log("# template: 탐색 범위 적용: ", i, e), e.querySelector(i);
}
function Tl(i, t = "template-data") {
  if (!i.hasAttribute(t))
    return;
  const e = i.getAttribute(t), r = yi(e);
  return lr(r)();
}
async function Ks(i, t, e) {
  i = t.getTemplateString(i);
  const { defines: r, templates: n, content: s } = Jd(i);
  let o = s.innerHTML;
  e && (o = e(o));
  let a = [
    ...r,
    ...n,
    ...Qd(o)
  ];
  if (!(a != null && a.length))
    return;
  const { provider: l } = t;
  l.$include.addRun(t);
  const u = { parseOption: t };
  l.$dom.add(u), u.nodes = await Ai(a, t);
}
async function El(i) {
  if (P() && console.log("* 로드 경로: ", i), C.$include.hasContent(i))
    return C.$include.getContent(i);
  const t = await (await fetch(i)).text();
  return C.$include.addContent(i, t), t;
}
function Qd(i) {
  if (!i)
    return;
  const t = new DOMParser().parseFromString(i, "text/html"), e = t == null ? void 0 : t.head, r = t == null ? void 0 : t.body;
  return Array.from(e.childNodes).concat(Array.from(r.childNodes));
}
function Jd(i) {
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
const Zd = "video-controller-progress", ea = "progress-anchor";
class tp extends An {
  constructor() {
    super(...arguments);
    // media;
    // containerDOM;
    $(this, "anchorDOM");
    /*
    // time: second
    const anchorList = [
        // { idx: 0, time: 5.000, thumbnail: './test/video/interaction/thumbnail_1005.png' },
        // { idx: 1, time: 9, thumbnail: './test/video/interaction/thumbnail_1009.png' }
        { idx: 0, time: 12.000, text: '본문 1' },
        { idx: 1, time: 24.000, text: '본문 2' }
    ]
    */
    $(this, "anchorList");
  }
  // Override
  async create() {
    const e = this.containerDOM.querySelector(`[${Zd}="time"]`);
    if (!e)
      return;
    const r = e.querySelector(`[${ea}]`);
    if (!r)
      return;
    this.anchorDOM = r;
    const n = Tl(r);
    console.error("TODO: buildTemplate 리팩토링 적용안됨"), await Xs(r, async (s) => {
      const o = (l) => {
        for (; typeof l == "function"; )
          l = l();
        return l;
      }, a = async (l) => {
        let u = await (s == null ? void 0 : s(l, r));
        u && Array.from(u).forEach((c) => {
          Sa(() => {
            const h = o(c);
            return l.dom = h, this.configAnchor(h, l), h;
          }, r);
        });
      };
      for (const l of n)
        await a(l);
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
    e.setAttribute(`${ea}-item`, "");
    const n = (s) => s.stopPropagation();
    e.addEventListener("mousedown", n), Je(() => {
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
const ra = "video-container", ep = "video-controller";
class rp extends Va {
  constructor() {
    super(...arguments);
    $(this, "media");
    // skin DOM
    $(this, "containerDOM");
    // template controller
    $(this, "controller");
    // 생성된 control 객체
    $(this, "buttonsControl");
    $(this, "progressControl");
    $(this, "volumeControl");
    $(this, "timeControl");
    $(this, "anchorControl");
    $(this, "isWaiting", !1);
  }
  async create(e) {
    const r = Tl(this.element);
    console.error("TODO: buildTemplate 리팩토링 적용안됨"), await Xs(this.element, async (n) => {
      const s = this.element.parentElement, o = await (n == null ? void 0 : n(r, s));
      o && Array.from(o).forEach((a) => {
        Sa(a, s);
      });
    }), Lu(e, () => {
      this.createTemplate();
    });
  }
  createTemplate() {
    this.media = Yn.create("video", this.element, {}), this.findDOM(), this.containerDOM && (this.buttonsControl = new Rc(this.containerDOM, this.media), this.buttonsControl.create(), this.progressControl = new jc(this.containerDOM, this.media), this.progressControl.create(), this.volumeControl = new Hc(this.containerDOM, this.media), this.volumeControl.create(), this.timeControl = new zc(this.containerDOM, this.media), this.timeControl.create()), this.createUpdateEvent();
  }
  findDOM() {
    var r;
    let e = this.element.parentElement;
    for (; e !== document.body; ) {
      if (e.hasAttribute(ra)) {
        this.containerDOM = e;
        break;
      }
      e = e.parentElement;
    }
    if (!this.containerDOM) {
      P() && ("controls" in this.attrs || console.warn(`[${ra}] Attribute을 찾을 수 없습니다.`));
      return;
    }
    this.controller = this.containerDOM.querySelector(`[${ep}]`), (r = this.controller) == null || r.classList.add("disable");
  }
  // 기본 controller 업데이트
  updateDefaultController(e) {
    var r, n, s, o, a;
    (r = this.buttonsControl) == null || r.update(e), (n = this.progressControl) == null || n.update(e), (s = this.volumeControl) == null || s.update(e), (o = this.timeControl) == null || o.update(e), (a = this.anchorControl) == null || a.update(e);
  }
  checkAnchorCreated() {
    this.containerDOM && (this.anchorControl || (this.anchorControl = new tp(this.containerDOM, this.media), this.anchorControl.create()));
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
    this.media.on("loadeddata", e), this.media.on("error", e), this.media.on("waiting", e), this.media.on("ended", e), this.media.on("canplay", e), this.media.on("canplaythrough", e), this.media.on("playing", e), this.media.on("play", e), this.media.on("pause", e), this.media.on("durationchange", e), this.media.on("timeupdate", e), this.media.on("seeking", e), this.media.on("seeked", e), this.media.on("ratechange", e), this.media.on("volumechange", e), this.media.on("fullscreen", e), this.media.on("addtrack", e), this.media.on("removetrack", e), this.media.on("trackChange", e), Je(() => {
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
function na(i, t) {
  (is in t || Gn in t) && e(xc), i.nodeName.toLowerCase() === "video" && (alert("리팩토링 적용안됨"), e(rp));
  function e(r) {
    new r(i, t).create();
  }
}
var np = /* @__PURE__ */ kt("<div>");
const ia = ["x", "y", "w", "h", "r", "b"], ip = ["left", "top", "width", "height", "right", "bottom"];
class Mt extends mc {
  hasAttr(t, e) {
    return e in t;
  }
  attr(t, e = "string") {
    return t && function() {
      try {
        return bn(null, t, e);
      } catch (r) {
        return console.error("[Attribute 파싱 에러]:", r), t;
      }
    }();
  }
  checkUnit_px(t) {
    if (t)
      return ia.includes(t) ? 0 : isNaN(Number(t)) || t.endsWith("px") ? t : t + "px";
  }
  // factory 함수에서 호출함
  create(t) {
    dc() && console.log(`* ${t["component-type"]}`, t);
    let e = "";
    ia.forEach((n, s) => {
      const o = this.checkUnit_px(t[n]);
      o !== void 0 && (e += `${ip[s]}: ${o};`);
    }), e && (e = e + t.style, t = ar(t, {
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
      var n = np(), s = e;
      return typeof s == "function" ? _i(s, n) : e = n, Dt(n, t, !1, !0), Et(n, () => r.transclude(t)), n;
    })();
  }
}
Ct("Component", Mt);
var sp = /* @__PURE__ */ kt("<div>");
const op = "app";
class ap extends Mt {
  // create(props) {
  //     console.error('* App create:', props);
  //     return super.create(props);
  // }
  render(t) {
    const e = this;
    let r;
    return (() => {
      var n = sp(), s = r;
      return typeof s == "function" ? _i(s, n) : r = n, Dt(n, ar(t, {
        "container-type": op
      }), !1, !0), Et(n, () => e.transclude(t)), n;
    })();
  }
}
Ct("App", ap);
var lp = /* @__PURE__ */ kt("<div>Sample: ");
class up extends Mt {
  render(t) {
    const e = this;
    return (() => {
      var r = lp();
      return r.firstChild, Dt(r, t, !1, !0), Et(r, () => t.name, null), Et(r, () => e.transclude(t), null), r;
    })();
  }
}
Ct("Sample", up);
var cp = /* @__PURE__ */ kt("<audio>");
class fp extends Mt {
  render(t) {
    const e = this;
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var n = cp();
      return Dt(n, t, !1, !0), Et(n, () => e.transclude(t)), n;
    })();
  }
}
Ct("Audio", fp);
var hp = /* @__PURE__ */ kt("<div>");
class dp extends Mt {
  render(t, e) {
    const r = this;
    return (() => {
      var n = hp(), s = e;
      return typeof s == "function" ? _i(s, n) : e = n, Dt(n, t, !1, !0), Et(n, () => r.transclude(t)), n;
    })();
  }
}
Ct("Div", dp);
var pp = /* @__PURE__ */ kt("<img>");
class mp extends Mt {
  render(t) {
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var r = pp();
      return Dt(r, t, !1, !0), r;
    })();
  }
}
Ct("Image", mp);
var gp = /* @__PURE__ */ kt("<lottie-player>", !0, !1);
class _p extends Mt {
  render(t) {
    const e = this;
    "src" in t && (t.src = this.attr(t.src));
    let n;
    return Cu(() => {
      n.setAttribute("component-type", t["component-type"]);
    }), (() => {
      var s = gp(), o = n;
      return typeof o == "function" ? _i(o, s) : n = s, Dt(s, t, !1, !0), s._$owner = Mu(), Et(s, () => e.transclude(t)), s;
    })();
  }
}
Ct("Lottie", _p);
var yp = /* @__PURE__ */ kt("<div>");
class vp extends Mt {
  render(t) {
    const e = this;
    return (() => {
      var r = yp();
      return Dt(r, t, !1, !0), Et(r, () => e.transclude(t)), r;
    })();
  }
}
Ct("Text", vp);
var wp = /* @__PURE__ */ kt("<video>");
class Tp extends Mt {
  render(t) {
    const e = this;
    return "src" in t && (t.src = this.attr(t.src)), (() => {
      var n = wp();
      return Dt(n, t, !1, !0), Et(n, () => e.transclude(t)), n;
    })();
  }
}
Ct("Video", Tp);
var Ep = /* @__PURE__ */ kt("<div>");
class bp extends Mt {
  render(t) {
    const e = this;
    return (() => {
      var r = Ep();
      return Dt(r, ar(t, {
        "container-type": "group"
      }), !1, !0), Et(r, () => e.transclude(t)), r;
    })();
  }
}
Ct("Group", bp);
var Ap = /* @__PURE__ */ kt("<div>");
class xp extends Mt {
  render(t) {
    const e = this;
    return (() => {
      var r = Ap();
      return Dt(r, ar(t, {
        "container-type": "layout"
      }), !1, !0), Et(r, () => e.transclude(t)), r;
    })();
  }
}
Ct("Layout", xp);
var $p = /* @__PURE__ */ kt("<div>");
class Sp extends Mt {
  render(t) {
    const e = this;
    return (() => {
      var r = $p();
      return Dt(r, ar(t, {
        "container-type": "page"
      }), !1, !0), Et(r, () => e.transclude(t)), r;
    })();
  }
}
Ct("Page", Sp);
class ht extends ur {
  constructor() {
    super();
    //-------------------------------------
    // Attribute: selector="CSS 셀렉터"
    //-------------------------------------
    // selector attribute 있다면 dom 목록을 리턴
    $(this, "_doms");
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
      P() && console.error("[selector 구문 에러]", e, r.message);
    }
  }
  // 리터럴 구문 변한 seleector
  literalSelector(e, r) {
    try {
      return P() && console.log("[Literal 구문 검사]", "-->", r), Array.from(document.querySelectorAll(r));
    } catch (n) {
      P() && console.error("[Literal selector 파싱 에러]", n.message);
    }
  }
  // 코드 구문 변환 select (DOM)
  objectSelector(e, r) {
    try {
      const n = this.attr(e, "object");
      return P() && console.log("[Object 구문 검사]", r, "-->", n), n && typeof n == "object" ? Array.isArray(n) ? n : [n] : Array.from(document.querySelectorAll(n));
    } catch (n) {
      P() && console.error("[Object selector 파싱 에러]", n.message);
    }
  }
}
class Op extends ht {
  create({
    nodeName: t,
    info: e,
    args: r,
    depth: n
  }) {
    const s = td(e, r);
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
      if (n instanceof Fr) {
        if (!this.debug)
          return;
        const l = (n == null ? void 0 : n.attrs.id) || "";
        console.log(`${this.tab}%c<시작:${l} (${s == null ? void 0 : s.length}개)>%c ($args)`, D.taskstart, D.info, this.args);
      } else {
        const l = (n == null ? void 0 : n.attrs.id) || (n == null ? void 0 : n.attrs.srcRef) || "";
        console.log(`${this.tab}%c<id="${l}"> 알수없는 TASK 실행:`, D.err, n);
      }
    })();
    const o = (a) => {
      const l = (n == null ? void 0 : n.attrs.id) || (n == null ? void 0 : n.attrs.srcRef) || "", u = (h) => {
        var p;
        this.debug && console.log(`${this.tab}%c<${h}: ${l} (${(p = n.list) == null ? void 0 : p.length}개)>`, D.taskend, n);
      };
      if (a === Sn) {
        u("취소"), e(a);
        return;
      }
      a && !(a === On) && console.error("(에러)", this.info.attrs.id, a), u("종료"), r(!0);
    };
    n._args && !n._args.event && this.args && this.args.event && (n._args.event = this.args.event), xd(n, n._args || this.args, o, this.depth + 1), r(!1);
  }
  completeEvent() {
    this.emit("complete", this);
  }
}
Ne.forEach((i) => {
  j(i, Op);
});
var Xe, Pr;
class Qs extends ht {
  constructor() {
    super(...arguments);
    k(this, Xe, void 0);
    // Media controller 인스턴스
    k(this, Pr, void 0);
  }
  get dom() {
    return E(this, Xe);
  }
  get media() {
    return E(this, Pr);
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
    return r ? this.provider.has(r) ? n = r : e ? n = e : P() && console.warn(`<${this.mediaType}> 해당 target (${r})의 ${this.mediaType} 객체를 찾을 수 없습니다.`) : e ? n = e : console.error(`<${this.mediaType}> id 또는 target 값을 지정해야 합니다.`), n;
  }
  run(e, r, n) {
    var c;
    let s = this.attr("id"), o = this.attr("target");
    const a = this.findDomID(s, o);
    if (!a)
      return e();
    let l = this.attr("destroy");
    if (l !== void 0 && l !== "no") {
      this.destroyAll(a, l), n();
      return;
    }
    let u = this.provider.get(a);
    if (u) {
      O(this, Xe, u.dom), O(this, Pr, u.media), u.destroy.push(super.destroy.bind(this)), this.execuate(e, r, n), n(!1);
      return;
    }
    if (this.setDoms(), (c = this.doms) != null && c[0] ? O(this, Xe, this.doms[0]) : O(this, Xe, this.createDOM(this.mediaType)), O(this, Pr, this.createMedia(this.mediaType)), !this.media)
      return this.dom.remove(), e();
    this.provider.add(a, {
      dom: this.dom,
      media: this.media,
      destroy: [super.destroy.bind(this)]
    }), this.execuate(e, r, n), n(!1);
  }
  // mediaType: 'audio' or 'video'
  createDOM(e) {
    const r = this.createElement(e), n = "[" + Oa + "=" + Pa("App") + "]", s = document.querySelector(n) || document.body;
    return s.insertBefore(r, s.children[0]), r;
  }
  createMedia(e, r = null) {
    const n = Ha();
    return Yn.create(e, this.dom, n, r);
  }
  //--------------------------------------
  // 기능 구현
  //--------------------------------------
  async execuate(e, r, n) {
    const s = this.attr("wait");
    if (s) {
      const o = s.split(",").map((l) => l.trim()), a = ((l) => {
        o.forEach((u) => {
          this.media.off(u, a);
        }), n(!0);
      }).bind(this);
      o.forEach((l) => {
        this.media.once(l, a);
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
      I() && console.log(`%c# ${this.mediaType} (set) 속성 설정: `, D.info, n);
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
    I() && console.log(`%c# ${this.mediaType} (run) 메서드 호출: ${n}`, D.info);
    try {
      const s = "this." + n;
      Fa(this.args, s, this.media);
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
Xe = new WeakMap(), Pr = new WeakMap();
class Pp extends Qs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "audio";
  }
  get provider() {
    return C.$audio;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("audio-player", ""), e;
  }
}
j("Audio", Pp);
class kp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.add(o));
    }), r();
  }
}
class Dp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.remove(o));
    }), r();
  }
}
class Cp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    let n = this.attr("classes");
    n = n.split(",").map((s) => s.trim()), this.doms.forEach((s) => {
      n.forEach((o) => s.classList.toggle(o));
    }), r();
  }
}
class Mp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    const n = this.attr("name"), s = this.attr("value");
    n && this.doms.forEach((o) => {
      o.setAttribute(n, s == null ? void 0 : s.trim());
    }), r();
  }
}
class Lp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    const n = this.attr("name");
    n && this.doms.forEach((s) => {
      s.removeAttribute(n);
    }), r();
  }
}
class Rp extends ht {
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
class Np extends ht {
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
j("AddClass", kp);
j("RemoveClass", Dp);
j("ToggleClass", Cp);
j("AddAttr", Mp);
j("RemoveAttr", Lp);
j("AddStyle", Rp);
j("RemoveStyle", Np);
class Ip extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    this.doms.forEach((n) => {
      n.setAttribute("taskml-disable", "");
    }), r();
  }
}
class Fp extends ht {
  run(t, e, r) {
    if (!this.setDoms())
      return t();
    this.doms.forEach((n) => {
      n.removeAttribute("taskml-disable");
    }), r();
  }
}
j("Enable", Fp);
j("Disable", Ip);
class jp extends ht {
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
    (r = this.info.attrs.src) != null && r.trim() && await Xd(this.info.attrs, this.info.parseOption);
  }
}
class Bp extends jp {
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
j("Include", Bp);
class Vp extends ur {
  run(t, e, r) {
    r();
  }
}
j("Blank", Vp);
class bl extends ur {
  run(t, e, r) {
    const n = this.info.attrs, s = "run" in this.info.attrs, o = s ? n.run.trim() : this.getScript(n == null ? void 0 : n.$script);
    if (!o)
      return t();
    const a = s ? window : C.$js.getContext();
    (function(l) {
      var u;
      try {
        const c = () => {
          e(Sn);
        }, f = () => {
          e(On);
        }, h = () => {
          r(!0);
        }, p = () => {
          C.$js.newContext();
        };
        if (!s) {
          const w = /(\/\/.*)*?\$(next|cancel)\s*\(\s*\)\B/img, m = (u = o.match(w)) == null ? void 0 : u.filter((g) => g.indexOf("/") < 0);
          m != null && m.length || P() && console.warn("<js> 노드에서 $next() 또는 $cancel() 문을 사용하여 실행을 종료하세요");
        }
        let d = `function($args, $next, $clear, $cancel){
 return ` + (`(() => {
 ` + o + ` 
})()`) + `
}`;
        Function("return " + d)().apply(this, [l, h, p, c]);
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
j("Js", bl);
j("Script", bl);
class Up extends Qs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "audio";
  }
  get provider() {
    return C.$sound;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("sound-player", ""), e;
  }
  //--------------------------------------
  // 기능 구현
  //--------------------------------------
}
j("Sound", Up);
let Js = class extends ht {
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
      window.getComputedStyle(t)["transition-duration"] !== "0s" && P() && console.warn(`<tween>이 적용되는 속성에 transition style이 설정되어 있으면성능이 저하될 수 있습니다.
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
j("Tween", Js);
class Hp extends Js {
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
class zp extends Js {
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
j("Hide", Hp);
j("Show", zp);
class qp extends Qs {
  // mediaType: 'audio' or 'video'
  get mediaType() {
    return "video";
  }
  get provider() {
    return C.$video;
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.setAttribute("video-player", ""), e;
  }
}
j("Video", qp);
const re = {
  get $containerAPI() {
    return window.$containerAPI;
  },
  get $contentAPI() {
    return window.$contentAPI;
  }
};
class Wp extends ht {
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
j("WatchStudyTime", Wp);
class xi extends ht {
}
class Gp extends xi {
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
class Yp extends xi {
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
class Xp extends xi {
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
j("PageGo", Gp);
j("PagePrev", Yp);
j("PageNext", Xp);
class Kp extends xi {
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
j("PageButton", Kp);
function Kt(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function Al(i, t) {
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
}, Mr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Zs, lt, q, $t = 1e8, H = 1 / $t, ys = Math.PI * 2, Qp = ys / 4, Jp = 0, xl = Math.sqrt, Zp = Math.cos, tm = Math.sin, it = function(t) {
  return typeof t == "string";
}, X = function(t) {
  return typeof t == "function";
}, ie = function(t) {
  return typeof t == "number";
}, to = function(t) {
  return typeof t > "u";
}, Wt = function(t) {
  return typeof t == "object";
}, dt = function(t) {
  return t !== !1;
}, eo = function() {
  return typeof window < "u";
}, Cn = function(t) {
  return X(t) || it(t);
}, $l = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, ut = Array.isArray, vs = /(?:-?\.?\d|\.)+/gi, Sl = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, mr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ui = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ol = /[+-]=-?[.\d]+/, Pl = /[^,'"\[\]\s]+/gi, em = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, G, Ft, ws, ro, bt = {}, Zn = {}, kl, Dl = function(t) {
  return (Zn = ir(t, bt)) && _t;
}, no = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, ln = function(t, e) {
  return !e && console.warn(t);
}, Cl = function(t, e) {
  return t && (bt[t] = e) && Zn && (Zn[t] = e) || bt;
}, un = function() {
  return 0;
}, rm = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Rn = {
  suppressEvents: !0,
  kill: !1
}, nm = {
  suppressEvents: !0
}, io = {}, Te = [], Ts = {}, Ml, yt = {}, Hi = {}, sa = 30, Nn = [], so = "", oo = function(t) {
  var e = t[0], r, n;
  if (Wt(e) || X(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (n = Nn.length; n-- && !Nn[n].targetTest(e); )
      ;
    r = Nn[n];
  }
  for (n = t.length; n--; )
    t[n] && (t[n]._gsap || (t[n]._gsap = new nu(t[n], r))) || t.splice(n, 1);
  return t;
}, tr = function(t) {
  return t._gsap || oo(St(t))[0]._gsap;
}, Ll = function(t, e, r) {
  return (r = t[e]) && X(r) ? t[e]() : to(r) && t.getAttribute && t.getAttribute(e) || r;
}, pt = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, K = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, nt = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, vr = function(t, e) {
  var r = e.charAt(0), n = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + n : r === "-" ? t - n : r === "*" ? t * n : t / n;
}, im = function(t, e) {
  for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; )
    ;
  return n < r;
}, ti = function() {
  var t = Te.length, e = Te.slice(0), r, n;
  for (Ts = {}, Te.length = 0, r = 0; r < t; r++)
    n = e[r], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Rl = function(t, e, r, n) {
  Te.length && !lt && ti(), t.render(e, r, n || lt && e < 0 && (t._initted || t._startAt)), Te.length && !lt && ti();
}, Nl = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(Pl).length < 2 ? e : it(t) ? t.trim() : t;
}, Il = function(t) {
  return t;
}, Pt = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, sm = function(t) {
  return function(e, r) {
    for (var n in r)
      n in e || n === "duration" && t || n === "ease" || (e[n] = r[n]);
  };
}, ir = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, oa = function i(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = Wt(e[r]) ? i(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, ei = function(t, e) {
  var r = {}, n;
  for (n in t)
    n in e || (r[n] = t[n]);
  return r;
}, Zr = function(t) {
  var e = t.parent || G, r = t.keyframes ? sm(ut(t.keyframes)) : Pt;
  if (dt(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, om = function(t, e) {
  for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, Fl = function(t, e, r, n, s) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var o = t[n], a;
  if (s)
    for (a = e[s]; o && o[s] > a; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = o, e.parent = e._dp = t, e;
}, $i = function(t, e, r, n) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var s = e._prev, o = e._next;
  s ? s._next = o : t[r] === e && (t[r] = o), o ? o._prev = s : t[n] === e && (t[n] = s), e._next = e._prev = e.parent = null;
}, be = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, er = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, am = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Es = function(t, e, r, n) {
  return t._startAt && (lt ? t._startAt.revert(Rn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n));
}, lm = function i(t) {
  return !t || t._ts && i(t.parent);
}, aa = function(t) {
  return t._repeat ? Lr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Lr = function(t, e) {
  var r = Math.floor(t /= e);
  return t && r === t ? r - 1 : r;
}, ri = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Si = function(t) {
  return t._end = nt(t._start + (t._tDur / Math.abs(t._ts || t._rts || H) || 0));
}, Oi = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = nt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Si(t), r._dirty || er(r, t)), t;
}, jl = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = ri(t.rawTime(), e), (!e._dur || Pn(0, e.totalDuration(), r) - e._tTime > H) && e.render(r, !0)), er(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -H;
  }
}, Ut = function(t, e, r, n) {
  return e.parent && be(e), e._start = nt((ie(r) ? r : r || t !== G ? At(t, r, e) : t._time) + e._delay), e._end = nt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Fl(t, e, "_first", "_last", t._sort ? "_start" : 0), bs(e) || (t._recent = e), n || jl(t, e), t._ts < 0 && Oi(t, t._tTime), t;
}, Bl = function(t, e) {
  return (bt.ScrollTrigger || no("scrollTrigger", e)) && bt.ScrollTrigger.create(e, t);
}, Vl = function(t, e, r, n, s) {
  if (lo(t, e, s), !t._initted)
    return 1;
  if (!r && t._pt && !lt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Ml !== vt.frame)
    return Te.push(t), t._lazy = [s, n], 1;
}, um = function i(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || i(e));
}, bs = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, cm = function(t, e, r, n) {
  var s = t.ratio, o = e < 0 || !e && (!t._start && um(t) && !(!t._initted && bs(t)) || (t._ts < 0 || t._dp._ts < 0) && !bs(t)) ? 0 : 1, a = t._rDelay, l = 0, u, c, f;
  if (a && t._repeat && (l = Pn(0, t._tDur, e), c = Lr(l, a), t._yoyo && c & 1 && (o = 1 - o), c !== Lr(t._tTime, a) && (s = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== s || lt || n || t._zTime === H || !e && t._zTime) {
    if (!t._initted && Vl(t, e, n, r, l))
      return;
    for (f = t._zTime, t._zTime = e || (r ? H : 0), r || (r = e && !f), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(o, u.d), u = u._next;
    e < 0 && Es(t, e, r, !0), t._onUpdate && !r && wt(t, "onUpdate"), l && t._repeat && !r && t.parent && wt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && be(t, 1), !r && !lt && (wt(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else
    t._zTime || (t._zTime = e);
}, fm = function(t, e, r) {
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
}, Rr = function(t, e, r, n) {
  var s = t._repeat, o = nt(e) || 0, a = t._tTime / t._tDur;
  return a && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = s ? s < 0 ? 1e10 : nt(o * (s + 1) + t._rDelay * s) : o, a > 0 && !n && Oi(t, t._tTime = t._tDur * a), t.parent && Si(t), r || er(t.parent, t), t;
}, la = function(t) {
  return t instanceof ft ? er(t) : Rr(t, t._dur);
}, hm = {
  _start: 0,
  endTime: un,
  totalDuration: un
}, At = function i(t, e, r) {
  var n = t.labels, s = t._recent || hm, o = t.duration() >= $t ? s.endTime(!1) : t._dur, a, l, u;
  return it(e) && (isNaN(e) || e in n) ? (l = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (l === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? s : r).totalDuration() / 100 : 1)) : a < 0 ? (e in n || (n[e] = o), n[e]) : (l = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && r && (l = l / 100 * (ut(r) ? r[0] : r).totalDuration()), a > 1 ? i(t, e.substr(0, a - 1), r) + l : o + l)) : e == null ? o : +e;
}, tn = function(t, e, r) {
  var n = ie(e[1]), s = (n ? 2 : 1) + (t < 2 ? 0 : 1), o = e[s], a, l;
  if (n && (o.duration = e[1]), o.parent = r, t) {
    for (a = o, l = r; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = dt(l.vars.inherit) && l.parent;
    o.immediateRender = dt(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[s - 1];
  }
  return new Z(e[0], o, e[s + 1]);
}, Pe = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Pn = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, ot = function(t, e) {
  return !it(t) || !(e = em.exec(t)) ? "" : e[1];
}, dm = function(t, e, r) {
  return Pe(r, function(n) {
    return Pn(t, e, n);
  });
}, As = [].slice, Ul = function(t, e) {
  return t && Wt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && Wt(t[0])) && !t.nodeType && t !== Ft;
}, pm = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(n) {
    var s;
    return it(n) && !e || Ul(n, 1) ? (s = r).push.apply(s, St(n)) : r.push(n);
  }) || r;
}, St = function(t, e, r) {
  return q && !e && q.selector ? q.selector(t) : it(t) && !r && (ws || !Nr()) ? As.call((e || ro).querySelectorAll(t), 0) : ut(t) ? pm(t, r) : Ul(t) ? As.call(t, 0) : t ? [t] : [];
}, xs = function(t) {
  return t = St(t)[0] || ln("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return St(e, r.querySelectorAll ? r : r === t ? ln("Invalid scope") || ro.createElement("div") : t);
  };
}, Hl = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, zl = function(t) {
  if (X(t))
    return t;
  var e = Wt(t) ? t : {
    each: t
  }, r = rr(e.ease), n = e.from || 0, s = parseFloat(e.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, u = e.axis, c = n, f = n;
  return it(n) ? c = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (c = n[0], f = n[1]), function(h, p, _) {
    var d = (_ || e).length, y = o[d], w, m, g, v, T, b, A, S, x;
    if (!y) {
      if (x = e.grid === "auto" ? 0 : (e.grid || [1, $t])[1], !x) {
        for (A = -$t; A < (A = _[x++].getBoundingClientRect().left) && x < d; )
          ;
        x < d && x--;
      }
      for (y = o[d] = [], w = l ? Math.min(x, d) * c - 0.5 : n % x, m = x === $t ? 0 : l ? d * f / x - 0.5 : n / x | 0, A = 0, S = $t, b = 0; b < d; b++)
        g = b % x - w, v = m - (b / x | 0), y[b] = T = u ? Math.abs(u === "y" ? v : g) : xl(g * g + v * v), T > A && (A = T), T < S && (S = T);
      n === "random" && Hl(y), y.max = A - S, y.min = S, y.v = d = (parseFloat(e.amount) || parseFloat(e.each) * (x > d ? d - 1 : u ? u === "y" ? d / x : x : Math.max(x, d / x)) || 0) * (n === "edges" ? -1 : 1), y.b = d < 0 ? s - d : s, y.u = ot(e.amount || e.each) || 0, r = r && d < 0 ? tu(r) : r;
    }
    return d = (y[h] - y.min) / y.max || 0, nt(y.b + (r ? r(d) : d) * y.v) + y.u;
  };
}, $s = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var n = nt(Math.round(parseFloat(r) / t) * t * e);
    return (n - n % 1) / e + (ie(r) ? 0 : ot(r));
  };
}, ql = function(t, e) {
  var r = ut(t), n, s;
  return !r && Wt(t) && (n = r = t.radius || $t, t.values ? (t = St(t.values), (s = !ie(t[0])) && (n *= n)) : t = $s(t.increment)), Pe(e, r ? X(t) ? function(o) {
    return s = t(o), Math.abs(s - o) <= n ? s : o;
  } : function(o) {
    for (var a = parseFloat(s ? o.x : o), l = parseFloat(s ? o.y : 0), u = $t, c = 0, f = t.length, h, p; f--; )
      s ? (h = t[f].x - a, p = t[f].y - l, h = h * h + p * p) : h = Math.abs(t[f] - a), h < u && (u = h, c = f);
    return c = !n || u <= n ? t[c] : o, s || c === o || ie(o) ? c : c + ot(o);
  } : $s(t));
}, Wl = function(t, e, r, n) {
  return Pe(ut(t) ? !e : r === !0 ? !!(r = 0) : !n, function() {
    return ut(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * n) / n;
  });
}, mm = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(n) {
    return e.reduce(function(s, o) {
      return o(s);
    }, n);
  };
}, gm = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || ot(r));
  };
}, _m = function(t, e, r) {
  return Yl(t, e, 0, 1, r);
}, Gl = function(t, e, r) {
  return Pe(r, function(n) {
    return t[~~e(n)];
  });
}, ym = function i(t, e, r) {
  var n = e - t;
  return ut(t) ? Gl(t, i(0, t.length), e) : Pe(r, function(s) {
    return (n + (s - t) % n) % n + t;
  });
}, vm = function i(t, e, r) {
  var n = e - t, s = n * 2;
  return ut(t) ? Gl(t, i(0, t.length - 1), e) : Pe(r, function(o) {
    return o = (s + (o - t) % s) % s || 0, t + (o > n ? s - o : o);
  });
}, cn = function(t) {
  for (var e = 0, r = "", n, s, o, a; ~(n = t.indexOf("random(", e)); )
    o = t.indexOf(")", n), a = t.charAt(n + 7) === "[", s = t.substr(n + 7, o - n - 7).match(a ? Pl : vs), r += t.substr(e, n - e) + Wl(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5), e = o + 1;
  return r + t.substr(e, t.length - e);
}, Yl = function(t, e, r, n, s) {
  var o = e - t, a = n - r;
  return Pe(s, function(l) {
    return r + ((l - t) / o * a || 0);
  });
}, wm = function i(t, e, r, n) {
  var s = isNaN(t + e) ? 0 : function(p) {
    return (1 - p) * t + p * e;
  };
  if (!s) {
    var o = it(t), a = {}, l, u, c, f, h;
    if (r === !0 && (n = 1) && (r = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (ut(t) && !ut(e)) {
      for (c = [], f = t.length, h = f - 2, u = 1; u < f; u++)
        c.push(i(t[u - 1], t[u]));
      f--, s = function(_) {
        _ *= f;
        var d = Math.min(h, ~~_);
        return c[d](_ - d);
      }, r = e;
    } else
      n || (t = ir(ut(t) ? [] : {}, t));
    if (!c) {
      for (l in e)
        ao.call(a, t, l, "get", e[l]);
      s = function(_) {
        return fo(_, a) || (o ? t.p : t);
      };
    }
  }
  return Pe(r, s);
}, ua = function(t, e, r) {
  var n = t.labels, s = $t, o, a, l;
  for (o in n)
    a = n[o] - e, a < 0 == !!r && a && s > (a = Math.abs(a)) && (l = o, s = a);
  return l;
}, wt = function(t, e, r) {
  var n = t.vars, s = n[e], o = q, a = t._ctx, l, u, c;
  if (s)
    return l = n[e + "Params"], u = n.callbackScope || t, r && Te.length && ti(), a && (q = a), c = l ? s.apply(u, l) : s.call(u), q = o, c;
}, Yr = function(t) {
  return be(t), t.scrollTrigger && t.scrollTrigger.kill(!!lt), t.progress() < 1 && wt(t, "onInterrupt"), t;
}, gr, Xl = [], Kl = function(t) {
  if (t)
    if (t = !t.name && t.default || t, eo() || t.headless) {
      var e = t.name, r = X(t), n = e && !r && t.init ? function() {
        this._props = [];
      } : t, s = {
        init: un,
        render: fo,
        add: ao,
        kill: Nm,
        modifier: Rm,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: co,
        aliases: {},
        register: 0
      };
      if (Nr(), t !== n) {
        if (yt[e])
          return;
        Pt(n, Pt(ei(t, s), o)), ir(n.prototype, ir(s, ei(t, o))), yt[n.prop = e] = n, t.targetTest && (Nn.push(n), io[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Cl(e, n), t.register && t.register(_t, n, mt);
    } else
      Xl.push(t);
}, B = 255, Xr = {
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
}, zi = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * B + 0.5 | 0;
}, Ql = function(t, e, r) {
  var n = t ? ie(t) ? [t >> 16, t >> 8 & B, t & B] : 0 : Xr.black, s, o, a, l, u, c, f, h, p, _;
  if (!n) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Xr[t])
      n = Xr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (s = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + s + s + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return n = parseInt(t.substr(1, 6), 16), [n >> 16, n >> 8 & B, n & B, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), n = [t >> 16, t >> 8 & B, t & B];
    } else if (t.substr(0, 3) === "hsl") {
      if (n = _ = t.match(vs), !e)
        l = +n[0] % 360 / 360, u = +n[1] / 100, c = +n[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, s = c * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = zi(l + 1 / 3, s, o), n[1] = zi(l, s, o), n[2] = zi(l - 1 / 3, s, o);
      else if (~t.indexOf("="))
        return n = t.match(Sl), r && n.length < 4 && (n[3] = 1), n;
    } else
      n = t.match(vs) || Xr.transparent;
    n = n.map(Number);
  }
  return e && !_ && (s = n[0] / B, o = n[1] / B, a = n[2] / B, f = Math.max(s, o, a), h = Math.min(s, o, a), c = (f + h) / 2, f === h ? l = u = 0 : (p = f - h, u = c > 0.5 ? p / (2 - f - h) : p / (f + h), l = f === s ? (o - a) / p + (o < a ? 6 : 0) : f === o ? (a - s) / p + 2 : (s - o) / p + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(u * 100 + 0.5), n[2] = ~~(c * 100 + 0.5)), r && n.length < 4 && (n[3] = 1), n;
}, Jl = function(t) {
  var e = [], r = [], n = -1;
  return t.split(Ee).forEach(function(s) {
    var o = s.match(mr) || [];
    e.push.apply(e, o), r.push(n += o.length + 1);
  }), e.c = r, e;
}, ca = function(t, e, r) {
  var n = "", s = (t + n).match(Ee), o = e ? "hsla(" : "rgba(", a = 0, l, u, c, f;
  if (!s)
    return t;
  if (s = s.map(function(h) {
    return (h = Ql(h, e, 1)) && o + (e ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")";
  }), r && (c = Jl(t), l = r.c, l.join(n) !== c.c.join(n)))
    for (u = t.replace(Ee, "1").split(mr), f = u.length - 1; a < f; a++)
      n += u[a] + (~l.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (c.length ? c : s.length ? s : r).shift());
  if (!u)
    for (u = t.split(Ee), f = u.length - 1; a < f; a++)
      n += u[a] + s[a];
  return n + u[f];
}, Ee = function() {
  var i = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Xr)
    i += "|" + t + "\\b";
  return new RegExp(i + ")", "gi");
}(), Tm = /hsl[a]?\(/, Zl = function(t) {
  var e = t.join(" "), r;
  if (Ee.lastIndex = 0, Ee.test(e))
    return r = Tm.test(e), t[1] = ca(t[1], r), t[0] = ca(t[0], r, Jl(t[1])), !0;
}, fn, vt = function() {
  var i = Date.now, t = 500, e = 33, r = i(), n = r, s = 1e3 / 240, o = s, a = [], l, u, c, f, h, p, _ = function d(y) {
    var w = i() - n, m = y === !0, g, v, T, b;
    if ((w > t || w < 0) && (r += w - e), n += w, T = n - r, g = T - o, (g > 0 || m) && (b = ++f.frame, h = T - f.time * 1e3, f.time = T = T / 1e3, o += g + (g >= s ? 4 : s - g), v = 1), m || (l = u(d)), v)
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
      kl && (!ws && eo() && (Ft = ws = window, ro = Ft.document || {}, bt.gsap = _t, (Ft.gsapVersions || (Ft.gsapVersions = [])).push(_t.version), Dl(Zn || Ft.GreenSockGlobals || !Ft.gsap && Ft || {}), Xl.forEach(Kl)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), u = c || function(y) {
        return setTimeout(y, o - f.time * 1e3 + 1 | 0);
      }, fn = 1, _(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(l), fn = 0, u = un;
    },
    lagSmoothing: function(y, w) {
      t = y || 1 / 0, e = Math.min(w || 33, t);
    },
    fps: function(y) {
      s = 1e3 / (y || 240), o = f.time * 1e3 + s;
    },
    add: function(y, w, m) {
      var g = w ? function(v, T, b, A) {
        y(v, T, b, A), f.remove(g);
      } : y;
      return f.remove(y), a[m ? "unshift" : "push"](g), Nr(), g;
    },
    remove: function(y, w) {
      ~(w = a.indexOf(y)) && a.splice(w, 1) && p >= w && p--;
    },
    _listeners: a
  }, f;
}(), Nr = function() {
  return !fn && vt.wake();
}, N = {}, Em = /^[\d.\-M][\d.\-,\s]/, bm = /["']/g, Am = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), n = r[0], s = 1, o = r.length, a, l, u; s < o; s++)
    l = r[s], a = s !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), e[n] = isNaN(u) ? u.replace(bm, "").trim() : +u, n = l.substr(a + 1).trim();
  return e;
}, xm = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), n = t.indexOf("(", e);
  return t.substring(e, ~n && n < r ? t.indexOf(")", r + 1) : r);
}, $m = function(t) {
  var e = (t + "").split("("), r = N[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [Am(e[1])] : xm(t).split(",").map(Nl)) : N._CE && Em.test(t) ? N._CE("", t) : r;
}, tu = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, eu = function i(t, e) {
  for (var r = t._first, n; r; )
    r instanceof ft ? i(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? i(r.timeline, e) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = e)), r = r._next;
}, rr = function(t, e) {
  return t && (X(t) ? t : N[t] || $m(t)) || e;
}, cr = function(t, e, r, n) {
  r === void 0 && (r = function(l) {
    return 1 - e(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2;
  });
  var s = {
    easeIn: e,
    easeOut: r,
    easeInOut: n
  }, o;
  return pt(t, function(a) {
    N[a] = bt[a] = s, N[o = a.toLowerCase()] = r;
    for (var l in s)
      N[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = N[a + "." + l] = s[l];
  }), s;
}, ru = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, qi = function i(t, e, r) {
  var n = e >= 1 ? e : 1, s = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = s / ys * (Math.asin(1 / n) || 0), a = function(c) {
    return c === 1 ? 1 : n * Math.pow(2, -10 * c) * tm((c - o) * s) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : ru(a);
  return s = ys / s, l.config = function(u, c) {
    return i(t, u, c);
  }, l;
}, Wi = function i(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, n = t === "out" ? r : t === "in" ? function(s) {
    return 1 - r(1 - s);
  } : ru(r);
  return n.config = function(s) {
    return i(t, s);
  }, n;
};
pt("Linear,Quad,Cubic,Quart,Quint,Strong", function(i, t) {
  var e = t < 5 ? t + 1 : t;
  cr(i + ",Power" + (e - 1), t ? function(r) {
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
cr("Elastic", qi("in"), qi("out"), qi());
(function(i, t) {
  var e = 1 / t, r = 2 * e, n = 2.5 * e, s = function(a) {
    return a < e ? i * a * a : a < r ? i * Math.pow(a - 1.5 / t, 2) + 0.75 : a < n ? i * (a -= 2.25 / t) * a + 0.9375 : i * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  cr("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
cr("Expo", function(i) {
  return i ? Math.pow(2, 10 * (i - 1)) : 0;
});
cr("Circ", function(i) {
  return -(xl(1 - i * i) - 1);
});
cr("Sine", function(i) {
  return i === 1 ? 1 : -Zp(i * Qp) + 1;
});
cr("Back", Wi("in"), Wi("out"), Wi());
N.SteppedEase = N.steps = bt.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, n = t + (e ? 0 : 1), s = e ? 1 : 0, o = 1 - H;
    return function(a) {
      return ((n * Pn(0, o, a) | 0) + s) * r;
    };
  }
};
Mr.ease = N["quad.out"];
pt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(i) {
  return so += i + "," + i + "Params,";
});
var nu = function(t, e) {
  this.id = Jp++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Ll, this.set = e ? e.getSetter : co;
}, hn = /* @__PURE__ */ function() {
  function i(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Rr(this, +e.duration, 1, 1), this.data = e.data, q && (this._ctx = q, q.data.push(this)), fn || vt.wake();
  }
  var t = i.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Rr(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, n) {
    if (Nr(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Oi(this, r), !s._dp || s.parent || jl(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ut(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !n || this._initted && Math.abs(this._zTime) === H || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), Rl(this, r, n)), this;
  }, t.time = function(r, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + aa(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), n) : this._time;
  }, t.totalProgress = function(r, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, t.progress = function(r, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + aa(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, n) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, n) : this._repeat ? Lr(this._tTime, s) + 1 : 1;
  }, t.timeScale = function(r, n) {
    if (!arguments.length)
      return this._rts === -H ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? ri(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -H ? 0 : this._rts, this.totalTime(Pn(-Math.abs(this._delay), this._tDur, s), n !== !1), Si(this), am(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Nr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== H && (this._tTime -= H)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Ut(n, this, r - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (dt(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var n = this.parent || this._dp;
    return n ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ri(n.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = nm);
    var n = lt;
    return lt = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), lt = n, this;
  }, t.globalTime = function(r) {
    for (var n = this, s = arguments.length ? r : n.rawTime(); n; )
      s = n._start + s / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, la(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = r, la(this), n ? this.time(n) : this;
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
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -H : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -H, this;
  }, t.isActive = function() {
    var r = this.parent || this._dp, n = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= n && s < this.endTime(!0) - H);
  }, t.eventCallback = function(r, n, s) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[r] = n, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = n)) : delete o[r], this) : o[r];
  }, t.then = function(r) {
    var n = this;
    return new Promise(function(s) {
      var o = X(r) ? r : Il, a = function() {
        var u = n.then;
        n.then = null, X(o) && (o = o(n)) && (o.then || o === n) && (n.then = u), s(o), n.then = u;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, t.kill = function() {
    Yr(this);
  }, i;
}();
Pt(hn.prototype, {
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
  _zTime: -H,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ft = /* @__PURE__ */ function(i) {
  Al(t, i);
  function t(r, n) {
    var s;
    return r === void 0 && (r = {}), s = i.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = dt(r.sortChildren), G && Ut(r.parent || G, Kt(s), n), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Bl(Kt(s), r.scrollTrigger), s;
  }
  var e = t.prototype;
  return e.to = function(n, s, o) {
    return tn(0, arguments, this), this;
  }, e.from = function(n, s, o) {
    return tn(1, arguments, this), this;
  }, e.fromTo = function(n, s, o, a) {
    return tn(2, arguments, this), this;
  }, e.set = function(n, s, o) {
    return s.duration = 0, s.parent = this, Zr(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new Z(n, s, At(this, o), 1), this;
  }, e.call = function(n, s, o) {
    return Ut(this, Z.delayedCall(0, n, s), o);
  }, e.staggerTo = function(n, s, o, a, l, u, c) {
    return o.duration = s, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new Z(n, o, At(this, l)), this;
  }, e.staggerFrom = function(n, s, o, a, l, u, c) {
    return o.runBackwards = 1, Zr(o).immediateRender = dt(o.immediateRender), this.staggerTo(n, s, o, a, l, u, c);
  }, e.staggerFromTo = function(n, s, o, a, l, u, c, f) {
    return a.startAt = o, Zr(a).immediateRender = dt(a.immediateRender), this.staggerTo(n, s, a, l, u, c, f);
  }, e.render = function(n, s, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = n <= 0 ? 0 : nt(n), f = this._zTime < 0 != n < 0 && (this._initted || !u), h, p, _, d, y, w, m, g, v, T, b, A;
    if (this !== G && c > l && n >= 0 && (c = l), c !== this._tTime || o || f) {
      if (a !== this._time && u && (c += this._time - a, n += this._time - a), h = c, v = this._start, g = this._ts, w = !g, f && (u || (a = this._zTime), (n || !s) && (this._zTime = n)), this._repeat) {
        if (b = this._yoyo, y = u + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(y * 100 + n, s, o);
        if (h = nt(c % y), c === l ? (d = this._repeat, h = u) : (d = ~~(c / y), d && d === c / y && (h = u, d--), h > u && (h = u)), T = Lr(this._tTime, y), !a && this._tTime && T !== d && this._tTime - T * y - this._dur <= 0 && (T = d), b && d & 1 && (h = u - h, A = 1), d !== T && !this._lock) {
          var S = b && T & 1, x = S === (b && d & 1);
          if (d < T && (S = !S), a = S ? 0 : c % u ? u : c, this._lock = 1, this.render(a || (A ? 0 : nt(d * y)), s, !u)._lock = 0, this._tTime = c, !s && this.parent && wt(this, "onRepeat"), this.vars.repeatRefresh && !A && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, x && (this._lock = 2, a = S ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !A && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          eu(this, A);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (m = fm(this, nt(a), nt(h)), m && (c -= h - (h = m._start))), this._tTime = c, this._time = h, this._act = !g, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && h && !s && !d && (wt(this, "onStart"), this._tTime !== c))
        return this;
      if (h >= a && n >= 0)
        for (p = this._first; p; ) {
          if (_ = p._next, (p._act || h >= p._start) && p._ts && m !== p) {
            if (p.parent !== this)
              return this.render(n, s, o);
            if (p.render(p._ts > 0 ? (h - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (h - p._start) * p._ts, s, o), h !== this._time || !this._ts && !w) {
              m = 0, _ && (c += this._zTime = -H);
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
            if (p.render(p._ts > 0 ? (M - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (M - p._start) * p._ts, s, o || lt && (p._initted || p._startAt)), h !== this._time || !this._ts && !w) {
              m = 0, _ && (c += this._zTime = M ? -H : H);
              break;
            }
          }
          p = _;
        }
      }
      if (m && !s && (this.pause(), m.render(h >= a ? 0 : -H)._zTime = h >= a ? 1 : -1, this._ts))
        return this._start = v, Si(this), this.render(n, s, o);
      this._onUpdate && !s && wt(this, "onUpdate", !0), (c === l && this._tTime >= this.totalDuration() || !c && a) && (v === this._start || Math.abs(g) !== Math.abs(this._ts)) && (this._lock || ((n || !u) && (c === l && this._ts > 0 || !c && this._ts < 0) && be(this, 1), !s && !(n < 0 && !a) && (c || a || !l) && (wt(this, c === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(n, s) {
    var o = this;
    if (ie(s) || (s = At(this, s, n)), !(n instanceof hn)) {
      if (ut(n))
        return n.forEach(function(a) {
          return o.add(a, s);
        }), this;
      if (it(n))
        return this.addLabel(n, s);
      if (X(n))
        n = Z.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? Ut(this, n, s) : this;
  }, e.getChildren = function(n, s, o, a) {
    n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), a === void 0 && (a = -$t);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof Z ? s && l.push(u) : (o && l.push(u), n && l.push.apply(l, u.getChildren(!0, s, o)))), u = u._next;
    return l;
  }, e.getById = function(n) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === n)
        return s[o];
  }, e.remove = function(n) {
    return it(n) ? this.removeLabel(n) : X(n) ? this.killTweensOf(n) : ($i(this, n), n === this._recent && (this._recent = this._last), er(this));
  }, e.totalTime = function(n, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = nt(vt.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), i.prototype.totalTime.call(this, n, s), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(n, s) {
    return this.labels[n] = At(this, s), this;
  }, e.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, e.addPause = function(n, s, o) {
    var a = Z.delayedCall(0, s || un, o);
    return a.data = "isPause", this._hasPause = 1, Ut(this, a, At(this, n));
  }, e.removePause = function(n) {
    var s = this._first;
    for (n = At(this, n); s; )
      s._start === n && s.data === "isPause" && be(s), s = s._next;
  }, e.killTweensOf = function(n, s, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      ye !== a[l] && a[l].kill(n, s);
    return this;
  }, e.getTweensOf = function(n, s) {
    for (var o = [], a = St(n), l = this._first, u = ie(s), c; l; )
      l instanceof Z ? im(l._targets, a) && (u ? (!ye || l._initted && l._ts) && l.globalTime(0) <= s && l.globalTime(l.totalDuration()) > s : !s || l.isActive()) && o.push(l) : (c = l.getTweensOf(a, s)).length && o.push.apply(o, c), l = l._next;
    return o;
  }, e.tweenTo = function(n, s) {
    s = s || {};
    var o = this, a = At(o, n), l = s, u = l.startAt, c = l.onStart, f = l.onStartParams, h = l.immediateRender, p, _ = Z.to(o, Pt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || H,
      onStart: function() {
        if (o.pause(), !p) {
          var y = s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          _._dur !== y && Rr(_, y, 0, 1).render(_._time, !0, !0), p = 1;
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
    return n === void 0 && (n = this._time), ua(this, At(this, n));
  }, e.previousLabel = function(n) {
    return n === void 0 && (n = this._time), ua(this, At(this, n), 1);
  }, e.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + H);
  }, e.shiftChildren = function(n, s, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, u; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (s)
      for (u in l)
        l[u] >= o && (l[u] += n);
    return er(this);
  }, e.invalidate = function(n) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(n), s = s._next;
    return i.prototype.invalidate.call(this, n);
  }, e.clear = function(n) {
    n === void 0 && (n = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), er(this);
  }, e.totalDuration = function(n) {
    var s = 0, o = this, a = o._last, l = $t, u, c, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), c = a._start, c > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Ut(o, a, c - a._delay, 1)._lock = 0) : l = c, c < 0 && a._ts && (s -= c, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += c / o._ts, o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), l = 0), a._end > s && a._ts && (s = a._end), a = u;
      Rr(o, o === G && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(n) {
    if (G._ts && (Rl(G, ri(n, G)), Ml = vt.frame), vt.frame >= sa) {
      sa += Tt.autoSleep || 120;
      var s = G._first;
      if ((!s || !s._ts) && Tt.autoSleep && vt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || vt.sleep();
      }
    }
  }, t;
}(hn);
Pt(ft.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Sm = function(t, e, r, n, s, o, a) {
  var l = new mt(this._pt, t, e, 0, 1, uu, null, s), u = 0, c = 0, f, h, p, _, d, y, w, m;
  for (l.b = r, l.e = n, r += "", n += "", (w = ~n.indexOf("random(")) && (n = cn(n)), o && (m = [r, n], o(m, t, e), r = m[0], n = m[1]), h = r.match(Ui) || []; f = Ui.exec(n); )
    _ = f[0], d = n.substring(u, f.index), p ? p = (p + 1) % 5 : d.substr(-5) === "rgba(" && (p = 1), _ !== h[c++] && (y = parseFloat(h[c - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || c === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: y,
      c: _.charAt(1) === "=" ? vr(y, _) - y : parseFloat(_) - y,
      m: p && p < 4 ? Math.round : 0
    }, u = Ui.lastIndex);
  return l.c = u < n.length ? n.substring(u, n.length) : "", l.fp = a, (Ol.test(n) || w) && (l.e = 0), this._pt = l, l;
}, ao = function(t, e, r, n, s, o, a, l, u, c) {
  X(n) && (n = n(s || 0, t, o));
  var f = t[e], h = r !== "get" ? r : X(f) ? u ? t[e.indexOf("set") || !X(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : f, p = X(f) ? u ? Cm : au : uo, _;
  if (it(n) && (~n.indexOf("random(") && (n = cn(n)), n.charAt(1) === "=" && (_ = vr(h, n) + (ot(h) || 0), (_ || _ === 0) && (n = _))), !c || h !== n || Ss)
    return !isNaN(h * n) && n !== "" ? (_ = new mt(this._pt, t, e, +h || 0, n - (h || 0), typeof f == "boolean" ? Lm : lu, 0, p), u && (_.fp = u), a && _.modifier(a, this, t), this._pt = _) : (!f && !(e in t) && no(e, n), Sm.call(this, t, e, h, n, p, l || Tt.stringFilter, u));
}, Om = function(t, e, r, n, s) {
  if (X(t) && (t = en(t, s, e, r, n)), !Wt(t) || t.style && t.nodeType || ut(t) || $l(t))
    return it(t) ? en(t, s, e, r, n) : t;
  var o = {}, a;
  for (a in t)
    o[a] = en(t[a], s, e, r, n);
  return o;
}, iu = function(t, e, r, n, s, o) {
  var a, l, u, c;
  if (yt[t] && (a = new yt[t]()).init(s, a.rawVars ? e[t] : Om(e[t], n, s, o, r), r, n, o) !== !1 && (r._pt = l = new mt(r._pt, s, t, 0, 1, a.render, a, 0, a.priority), r !== gr))
    for (u = r._ptLookup[r._targets.indexOf(s)], c = a._props.length; c--; )
      u[a._props[c]] = l;
  return a;
}, ye, Ss, lo = function i(t, e, r) {
  var n = t.vars, s = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, u = n.onUpdate, c = n.runBackwards, f = n.yoyoEase, h = n.keyframes, p = n.autoRevert, _ = t._dur, d = t._startAt, y = t._targets, w = t.parent, m = w && w.data === "nested" ? w.vars.targets : y, g = t._overwrite === "auto" && !Zs, v = t.timeline, T, b, A, S, x, M, F, V, U, st, et, Q, rt;
  if (v && (!h || !s) && (s = "none"), t._ease = rr(s, Mr.ease), t._yEase = f ? tu(rr(f === !0 ? s : f, Mr.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !v && !!n.runBackwards, !v || h && !n.stagger) {
    if (V = y[0] ? tr(y[0]).harness : 0, Q = V && n[V.prop], T = ei(n, io), d && (d._zTime < 0 && d.progress(1), e < 0 && c && a && !p ? d.render(-1, !0) : d.revert(c && _ ? Rn : rm), d._lazy = 0), o) {
      if (be(t._startAt = Z.set(y, Pt({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !d && dt(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return wt(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (lt || !a && !p) && t._startAt.revert(Rn), a && _ && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (c && _ && !d) {
      if (e && (a = !1), A = Pt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !d && dt(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, T), Q && (A[V.prop] = Q), be(t._startAt = Z.set(y, A)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (lt ? t._startAt.revert(Rn) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        i(t._startAt, H, H);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = _ && dt(l) || l && !_, b = 0; b < y.length; b++) {
      if (x = y[b], F = x._gsap || oo(y)[b]._gsap, t._ptLookup[b] = st = {}, Ts[F.id] && Te.length && ti(), et = m === y ? b : m.indexOf(x), V && (U = new V()).init(x, Q || T, t, et, m) !== !1 && (t._pt = S = new mt(t._pt, x, U.name, 0, 1, U.render, U, 0, U.priority), U._props.forEach(function(Lt) {
        st[Lt] = S;
      }), U.priority && (M = 1)), !V || Q)
        for (A in T)
          yt[A] && (U = iu(A, T, t, et, x, m)) ? U.priority && (M = 1) : st[A] = S = ao.call(t, x, A, "get", T[A], et, m, 0, n.stringFilter);
      t._op && t._op[b] && t.kill(x, t._op[b]), g && t._pt && (ye = t, G.killTweensOf(x, st, t.globalTime(e)), rt = !t.parent, ye = 0), t._pt && l && (Ts[F.id] = 1);
    }
    M && cu(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !rt, h && e <= 0 && v.render($t, !0, !0);
}, Pm = function(t, e, r, n, s, o, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], c, f, h, p;
  if (!u)
    for (u = t._ptCache[e] = [], h = t._ptLookup, p = t._targets.length; p--; ) {
      if (c = h[p][e], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== e && c.fp !== e; )
          c = c._next;
      if (!c)
        return Ss = 1, t.vars[e] = "+=0", lo(t, a), Ss = 0, l ? ln(e + " not eligible for reset") : 1;
      u.push(c);
    }
  for (p = u.length; p--; )
    f = u[p], c = f._pt || f, c.s = (n || n === 0) && !s ? n : c.s + (n || 0) + o * c.c, c.c = r - c.s, f.e && (f.e = K(r) + ot(f.e)), f.b && (f.b = c.s + ot(f.b));
}, km = function(t, e) {
  var r = t[0] ? tr(t[0]).harness : 0, n = r && r.aliases, s, o, a, l;
  if (!n)
    return e;
  s = ir({}, e);
  for (o in n)
    if (o in s)
      for (l = n[o].split(","), a = l.length; a--; )
        s[l[a]] = s[o];
  return s;
}, Dm = function(t, e, r, n) {
  var s = e.ease || n || "power1.inOut", o, a;
  if (ut(e))
    a = r[t] || (r[t] = []), e.forEach(function(l, u) {
      return a.push({
        t: u / (e.length - 1) * 100,
        v: l,
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
}, en = function(t, e, r, n, s) {
  return X(t) ? t.call(e, r, n, s) : it(t) && ~t.indexOf("random(") ? cn(t) : t;
}, su = so + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ou = {};
pt(su + ",id,stagger,delay,duration,paused,scrollTrigger", function(i) {
  return ou[i] = 1;
});
var Z = /* @__PURE__ */ function(i) {
  Al(t, i);
  function t(r, n, s, o) {
    var a;
    typeof n == "number" && (s.duration = n, n = s, s = null), a = i.call(this, o ? n : Zr(n)) || this;
    var l = a.vars, u = l.duration, c = l.delay, f = l.immediateRender, h = l.stagger, p = l.overwrite, _ = l.keyframes, d = l.defaults, y = l.scrollTrigger, w = l.yoyoEase, m = n.parent || G, g = (ut(r) || $l(r) ? ie(r[0]) : "length" in n) ? [r] : St(r), v, T, b, A, S, x, M, F;
    if (a._targets = g.length ? oo(g) : ln("GSAP target " + r + " not found. https://gsap.com", !Tt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = p, _ || h || Cn(u) || Cn(c)) {
      if (n = a.vars, v = a.timeline = new ft({
        data: "nested",
        defaults: d || {},
        targets: m && m.data === "nested" ? m.vars.targets : g
      }), v.kill(), v.parent = v._dp = Kt(a), v._start = 0, h || Cn(u) || Cn(c)) {
        if (A = g.length, M = h && zl(h), Wt(h))
          for (S in h)
            ~su.indexOf(S) && (F || (F = {}), F[S] = h[S]);
        for (T = 0; T < A; T++)
          b = ei(n, ou), b.stagger = 0, w && (b.yoyoEase = w), F && ir(b, F), x = g[T], b.duration = +en(u, Kt(a), T, x, g), b.delay = (+en(c, Kt(a), T, x, g) || 0) - a._delay, !h && A === 1 && b.delay && (a._delay = c = b.delay, a._start += c, b.delay = 0), v.to(x, b, M ? M(T, x, g) : 0), v._ease = N.none;
        v.duration() ? u = c = 0 : a.timeline = 0;
      } else if (_) {
        Zr(Pt(v.vars.defaults, {
          ease: "none"
        })), v._ease = rr(_.ease || n.ease || "none");
        var V = 0, U, st, et;
        if (ut(_))
          _.forEach(function(Q) {
            return v.to(g, Q, ">");
          }), v.duration();
        else {
          b = {};
          for (S in _)
            S === "ease" || S === "easeEach" || Dm(S, _[S], b, _.easeEach);
          for (S in b)
            for (U = b[S].sort(function(Q, rt) {
              return Q.t - rt.t;
            }), V = 0, T = 0; T < U.length; T++)
              st = U[T], et = {
                ease: st.e,
                duration: (st.t - (T ? U[T - 1].t : 0)) / 100 * u
              }, et[S] = st.v, v.to(g, et, V), V += et.duration;
          v.duration() < u && v.to({}, {
            duration: u - v.duration()
          });
        }
      }
      u || a.duration(u = v.duration());
    } else
      a.timeline = 0;
    return p === !0 && !Zs && (ye = Kt(a), G.killTweensOf(g), ye = 0), Ut(m, Kt(a), s), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !u && !_ && a._start === nt(m._time) && dt(f) && lm(Kt(a)) && m.data !== "nested") && (a._tTime = -H, a.render(Math.max(0, -c) || 0)), y && Bl(Kt(a), y), a;
  }
  var e = t.prototype;
  return e.render = function(n, s, o) {
    var a = this._time, l = this._tDur, u = this._dur, c = n < 0, f = n > l - H && !c ? l : n < H ? 0 : n, h, p, _, d, y, w, m, g, v;
    if (!u)
      cm(this, n, s, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
      if (h = f, g = this.timeline, this._repeat) {
        if (d = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(d * 100 + n, s, o);
        if (h = nt(f % d), f === l ? (_ = this._repeat, h = u) : (_ = ~~(f / d), _ && _ === nt(f / d) && (h = u, _--), h > u && (h = u)), w = this._yoyo && _ & 1, w && (v = this._yEase, h = u - h), y = Lr(this._tTime, d), h === a && !o && this._initted && _ === y)
          return this._tTime = f, this;
        _ !== y && (g && this._yEase && eu(g, w), this.vars.repeatRefresh && !w && !this._lock && this._time !== d && this._initted && (this._lock = o = 1, this.render(nt(d * _), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Vl(this, c ? n : h, o, s, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && _ !== y))
          return this;
        if (u !== this._dur)
          return this.render(n, s, o);
      }
      if (this._tTime = f, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = m = (v || this._ease)(h / u), this._from && (this.ratio = m = 1 - m), h && !a && !s && !_ && (wt(this, "onStart"), this._tTime !== f))
        return this;
      for (p = this._pt; p; )
        p.r(m, p.d), p = p._next;
      g && g.render(n < 0 ? n : g._dur * g._ease(h / this._dur), s, o) || this._startAt && (this._zTime = n), this._onUpdate && !s && (c && Es(this, n, s, o), wt(this, "onUpdate")), this._repeat && _ !== y && this.vars.onRepeat && !s && this.parent && wt(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && Es(this, n, !0, !0), (n || !u) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && be(this, 1), !s && !(c && !a) && (f || a || w) && (wt(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), i.prototype.invalidate.call(this, n);
  }, e.resetTo = function(n, s, o, a, l) {
    fn || vt.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || lo(this, u), c = this._ease(u / this._dur), Pm(this, n, s, o, a, c, u, l) ? this.resetTo(n, s, o, a, 1) : (Oi(this, 0), this.parent || Fl(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(n, s) {
    if (s === void 0 && (s = "all"), !n && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? Yr(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, s, ye && ye.vars.overwrite !== !0)._first || Yr(this), this.parent && o !== this.timeline.totalDuration() && Rr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? St(n) : a, u = this._ptLookup, c = this._pt, f, h, p, _, d, y, w;
    if ((!s || s === "all") && om(a, l))
      return s === "all" && (this._pt = 0), Yr(this);
    for (f = this._op = this._op || [], s !== "all" && (it(s) && (d = {}, pt(s, function(m) {
      return d[m] = 1;
    }), s = d), s = km(a, s)), w = a.length; w--; )
      if (~l.indexOf(a[w])) {
        h = u[w], s === "all" ? (f[w] = s, _ = h, p = {}) : (p = f[w] = f[w] || {}, _ = s);
        for (d in _)
          y = h && h[d], y && ((!("kill" in y.d) || y.d.kill(d) === !0) && $i(this, y, "_pt"), delete h[d]), p !== "all" && (p[d] = 1);
      }
    return this._initted && !this._pt && c && Yr(this), this;
  }, t.to = function(n, s) {
    return new t(n, s, arguments[2]);
  }, t.from = function(n, s) {
    return tn(1, arguments);
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
    return tn(2, arguments);
  }, t.set = function(n, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new t(n, s);
  }, t.killTweensOf = function(n, s, o) {
    return G.killTweensOf(n, s, o);
  }, t;
}(hn);
Pt(Z.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
pt("staggerTo,staggerFrom,staggerFromTo", function(i) {
  Z[i] = function() {
    var t = new ft(), e = As.call(arguments, 0);
    return e.splice(i === "staggerFromTo" ? 5 : 4, 0, 0), t[i].apply(t, e);
  };
});
var uo = function(t, e, r) {
  return t[e] = r;
}, au = function(t, e, r) {
  return t[e](r);
}, Cm = function(t, e, r, n) {
  return t[e](n.fp, r);
}, Mm = function(t, e, r) {
  return t.setAttribute(e, r);
}, co = function(t, e) {
  return X(t[e]) ? au : to(t[e]) && t.setAttribute ? Mm : uo;
}, lu = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Lm = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, uu = function(t, e) {
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
}, fo = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, Rm = function(t, e, r, n) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === n && s.modifier(t, e, r), s = o;
}, Nm = function(t) {
  for (var e = this._pt, r, n; e; )
    n = e._next, e.p === t && !e.op || e.op === t ? $i(this, e, "_pt") : e.dep || (r = 1), e = n;
  return !r;
}, Im = function(t, e, r, n) {
  n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
}, cu = function(t) {
  for (var e = t._pt, r, n, s, o; e; ) {
    for (r = e._next, n = s; n && n.pr > e.pr; )
      n = n._next;
    (e._prev = n ? n._prev : o) ? e._prev._next = e : s = e, (e._next = n) ? n._prev = e : o = e, e = r;
  }
  t._pt = s;
}, mt = /* @__PURE__ */ function() {
  function i(e, r, n, s, o, a, l, u, c) {
    this.t = r, this.s = s, this.c = o, this.p = n, this.r = a || lu, this.d = l || this, this.set = u || uo, this.pr = c || 0, this._next = e, e && (e._prev = this);
  }
  var t = i.prototype;
  return t.modifier = function(r, n, s) {
    this.mSet = this.mSet || this.set, this.set = Im, this.m = r, this.mt = s, this.tween = n;
  }, i;
}();
pt(so + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(i) {
  return io[i] = 1;
});
bt.TweenMax = bt.TweenLite = Z;
bt.TimelineLite = bt.TimelineMax = ft;
G = new ft({
  sortChildren: !1,
  defaults: Mr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Tt.stringFilter = Zl;
var nr = [], In = {}, Fm = [], fa = 0, jm = 0, Gi = function(t) {
  return (In[t] || Fm).map(function(e) {
    return e();
  });
}, Os = function() {
  var t = Date.now(), e = [];
  t - fa > 2 && (Gi("matchMediaInit"), nr.forEach(function(r) {
    var n = r.queries, s = r.conditions, o, a, l, u;
    for (a in n)
      o = Ft.matchMedia(n[a]).matches, o && (l = 1), o !== s[a] && (s[a] = o, u = 1);
    u && (r.revert(), l && e.push(r));
  }), Gi("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(n) {
      return r.add(null, n);
    });
  }), fa = t, Gi("matchMedia"));
}, fu = /* @__PURE__ */ function() {
  function i(e, r) {
    this.selector = r && xs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = jm++, e && this.add(e);
  }
  var t = i.prototype;
  return t.add = function(r, n, s) {
    X(r) && (s = n, n = r, r = X);
    var o = this, a = function() {
      var u = q, c = o.selector, f;
      return u && u !== o && u.data.push(o), s && (o.selector = xs(s)), q = o, f = n.apply(o, arguments), X(f) && o._r.push(f), q = u, o.selector = c, o.isReverted = !1, f;
    };
    return o.last = a, r === X ? a(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = a : a;
  }, t.ignore = function(r) {
    var n = q;
    q = null, r(this), q = n;
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
      for (var a = s.getTweens(), l = s.data.length, u; l--; )
        u = s.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(c) {
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
      }), l = s.data.length; l--; )
        u = s.data[l], u instanceof ft ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof Z) && u.revert && u.revert(r);
      s._r.forEach(function(c) {
        return c(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = nr.length; o--; )
        nr[o].id === this.id && nr.splice(o, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, i;
}(), Bm = /* @__PURE__ */ function() {
  function i(e) {
    this.contexts = [], this.scope = e, q && q.data.push(this);
  }
  var t = i.prototype;
  return t.add = function(r, n, s) {
    Wt(r) || (r = {
      matches: r
    });
    var o = new fu(0, s || this.scope), a = o.conditions = {}, l, u, c;
    q && !o.selector && (o.selector = q.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = r;
    for (u in r)
      u === "all" ? c = 1 : (l = Ft.matchMedia(r[u]), l && (nr.indexOf(o) < 0 && nr.push(o), (a[u] = l.matches) && (c = 1), l.addListener ? l.addListener(Os) : l.addEventListener("change", Os)));
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
}(), ni = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(n) {
      return Kl(n);
    });
  },
  timeline: function(t) {
    return new ft(t);
  },
  getTweensOf: function(t, e) {
    return G.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, n) {
    it(t) && (t = St(t)[0]);
    var s = tr(t || {}).get, o = r ? Il : Nl;
    return r === "native" && (r = ""), t && (e ? o((yt[e] && yt[e].get || s)(t, e, r, n)) : function(a, l, u) {
      return o((yt[a] && yt[a].get || s)(t, a, l, u));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = St(t), t.length > 1) {
      var n = t.map(function(c) {
        return _t.quickSetter(c, e, r);
      }), s = n.length;
      return function(c) {
        for (var f = s; f--; )
          n[f](c);
      };
    }
    t = t[0] || {};
    var o = yt[e], a = tr(t), l = a.harness && (a.harness.aliases || {})[e] || e, u = o ? function(c) {
      var f = new o();
      gr._pt = 0, f.init(t, r ? c + r : c, gr, 0, [t]), f.render(1, f), gr._pt && fo(1, gr);
    } : a.set(t, l);
    return o ? u : function(c) {
      return u(t, l, r ? c + r : c, a, 1);
    };
  },
  quickTo: function(t, e, r) {
    var n, s = _t.to(t, ir((n = {}, n[e] = "+=0.1", n.paused = !0, n), r || {})), o = function(l, u, c) {
      return s.resetTo(e, l, u, c);
    };
    return o.tween = s, o;
  },
  isTweening: function(t) {
    return G.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = rr(t.ease, Mr.ease)), oa(Mr, t || {});
  },
  config: function(t) {
    return oa(Tt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, n = t.plugins, s = t.defaults, o = t.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !yt[a] && !bt[a] && ln(e + " effect requires " + a + " plugin.");
    }), Hi[e] = function(a, l, u) {
      return r(St(a), Pt(l || {}, s), u);
    }, o && (ft.prototype[e] = function(a, l, u) {
      return this.add(Hi[e](a, Wt(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    N[t] = rr(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? rr(t, e) : N;
  },
  getById: function(t) {
    return G.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new ft(t), n, s;
    for (r.smoothChildTiming = dt(t.smoothChildTiming), G.remove(r), r._dp = 0, r._time = r._tTime = G._time, n = G._first; n; )
      s = n._next, (e || !(!n._dur && n instanceof Z && n.vars.onComplete === n._targets[0])) && Ut(r, n, n._start - n._delay), n = s;
    return Ut(G, r, 0), r;
  },
  context: function(t, e) {
    return t ? new fu(t, e) : q;
  },
  matchMedia: function(t) {
    return new Bm(t);
  },
  matchMediaRefresh: function() {
    return nr.forEach(function(t) {
      var e = t.conditions, r, n;
      for (n in e)
        e[n] && (e[n] = !1, r = 1);
      r && t.revert();
    }) || Os();
  },
  addEventListener: function(t, e) {
    var r = In[t] || (In[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = In[t], n = r && r.indexOf(e);
    n >= 0 && r.splice(n, 1);
  },
  utils: {
    wrap: ym,
    wrapYoyo: vm,
    distribute: zl,
    random: Wl,
    snap: ql,
    normalize: _m,
    getUnit: ot,
    clamp: dm,
    splitColor: Ql,
    toArray: St,
    selector: xs,
    mapRange: Yl,
    pipe: mm,
    unitize: gm,
    interpolate: wm,
    shuffle: Hl
  },
  install: Dl,
  effects: Hi,
  ticker: vt,
  updateRoot: ft.updateRoot,
  plugins: yt,
  globalTimeline: G,
  core: {
    PropTween: mt,
    globals: Cl,
    Tween: Z,
    Timeline: ft,
    Animation: hn,
    getCache: tr,
    _removeLinkedListItem: $i,
    reverting: function() {
      return lt;
    },
    context: function(t) {
      return t && q && (q.data.push(t), t._ctx = q), q;
    },
    suppressOverwrites: function(t) {
      return Zs = t;
    }
  }
};
pt("to,from,fromTo,delayedCall,set,killTweensOf", function(i) {
  return ni[i] = Z[i];
});
vt.add(ft.updateRoot);
gr = ni.to({}, {
  duration: 0
});
var Vm = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, Um = function(t, e) {
  var r = t._targets, n, s, o;
  for (n in e)
    for (s = r.length; s--; )
      o = t._ptLookup[s][n], o && (o = o.d) && (o._pt && (o = Vm(o, n)), o && o.modifier && o.modifier(e[n], t, r[s], n));
}, Yi = function(t, e) {
  return {
    name: t,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, s, o) {
      o._onInit = function(a) {
        var l, u;
        if (it(s) && (l = {}, pt(s, function(c) {
          return l[c] = 1;
        }), s = l), e) {
          l = {};
          for (u in s)
            l[u] = e(s[u]);
          s = l;
        }
        Um(a, s);
      };
    }
  };
}, _t = ni.registerPlugin({
  name: "attr",
  init: function(t, e, r, n, s) {
    var o, a, l;
    this.tween = r;
    for (o in e)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", e[o], n, s, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, e) {
    for (var r = e._pt; r; )
      lt ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(t, e) {
    for (var r = e.length; r--; )
      this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
  }
}, Yi("roundProps", $s), Yi("modifiers"), Yi("snap", ql)) || ni;
Z.version = ft.version = _t.version = "3.12.5";
kl = 1;
eo() && Nr();
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
var ha, ve, wr, ho, Ie, da, po, Hm = function() {
  return typeof window < "u";
}, se = {}, Re = 180 / Math.PI, Tr = Math.PI / 180, pr = Math.atan2, pa = 1e8, mo = /([A-Z])/g, zm = /(left|right|width|margin|padding|x)/i, qm = /[\s,\(]\S/, Ht = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ps = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Wm = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Gm = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Ym = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, hu = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, du = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Xm = function(t, e, r) {
  return t.style[e] = r;
}, Km = function(t, e, r) {
  return t.style.setProperty(e, r);
}, Qm = function(t, e, r) {
  return t._gsap[e] = r;
}, Jm = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, Zm = function(t, e, r, n, s) {
  var o = t._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, tg = function(t, e, r, n, s) {
  var o = t._gsap;
  o[e] = r, o.renderTransform(s, o);
}, Y = "transform", gt = Y + "Origin", eg = function i(t, e) {
  var r = this, n = this.target, s = n.style, o = n._gsap;
  if (t in se && s) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Ht[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return r.tfm[a] = Jt(n, a);
      }) : this.tfm[t] = o.x ? o[t] : Jt(n, t), t === gt && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ht.transform.split(",").forEach(function(a) {
        return i.call(r, a, e);
      });
    if (this.props.indexOf(Y) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(gt, e, "")), t = Y;
  }
  (s || e) && this.props.push(t, e, s[t]);
}, pu = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, rg = function() {
  var t = this.props, e = this.target, r = e.style, n = e._gsap, s, o;
  for (s = 0; s < t.length; s += 3)
    t[s + 1] ? e[t[s]] = t[s + 2] : t[s + 2] ? r[t[s]] = t[s + 2] : r.removeProperty(t[s].substr(0, 2) === "--" ? t[s] : t[s].replace(mo, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), s = po(), (!s || !s.isStart) && !r[Y] && (pu(r), n.zOrigin && r[gt] && (r[gt] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, mu = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: rg,
    save: eg
  };
  return t._gsap || _t.core.getCache(t), e && e.split(",").forEach(function(n) {
    return r.save(n);
  }), r;
}, gu, ks = function(t, e) {
  var r = ve.createElementNS ? ve.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ve.createElement(t);
  return r && r.style ? r : ve.createElement(t);
}, zt = function i(t, e, r) {
  var n = getComputedStyle(t);
  return n[e] || n.getPropertyValue(e.replace(mo, "-$1").toLowerCase()) || n.getPropertyValue(e) || !r && i(t, Ir(e) || e, 1) || "";
}, ma = "O,Moz,ms,Ms,Webkit".split(","), Ir = function(t, e, r) {
  var n = e || Ie, s = n.style, o = 5;
  if (t in s && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(ma[o] + t in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? ma[o] : "") + t;
}, Ds = function() {
  Hm() && window.document && (ha = window, ve = ha.document, wr = ve.documentElement, Ie = ks("div") || {
    style: {}
  }, ks("div"), Y = Ir(Y), gt = Y + "Origin", Ie.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", gu = !!Ir("perspective"), po = _t.core.reverting, ho = 1);
}, Xi = function i(t) {
  var e = ks("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, n = this.nextSibling, s = this.style.cssText, o;
  if (wr.appendChild(e), e.appendChild(this), this.style.display = "block", t)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = i;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return r && (n ? r.insertBefore(this, n) : r.appendChild(this)), wr.removeChild(e), this.style.cssText = s, o;
}, ga = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, _u = function(t) {
  var e;
  try {
    e = t.getBBox();
  } catch {
    e = Xi.call(t, !0);
  }
  return e && (e.width || e.height) || t.getBBox === Xi || (e = Xi.call(t, !0)), e && !e.width && !e.x && !e.y ? {
    x: +ga(t, ["x", "cx", "x1"]) || 0,
    y: +ga(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, yu = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && _u(t));
}, sr = function(t, e) {
  if (e) {
    var r = t.style, n;
    e in se && e !== gt && (e = Y), r.removeProperty ? (n = e.substr(0, 2), (n === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(n === "--" ? e : e.replace(mo, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, we = function(t, e, r, n, s, o) {
  var a = new mt(t._pt, e, r, 0, 1, o ? du : hu);
  return t._pt = a, a.b = n, a.e = s, t._props.push(r), a;
}, _a = {
  deg: 1,
  rad: 1,
  turn: 1
}, ng = {
  grid: 1,
  flex: 1
}, Ae = function i(t, e, r, n) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", a = Ie.style, l = zm.test(e), u = t.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, h = n === "px", p = n === "%", _, d, y, w;
  if (n === o || !s || _a[n] || _a[o])
    return s;
  if (o !== "px" && !h && (s = i(t, e, r, "px")), w = t.getCTM && yu(t), (p || o === "%") && (se[e] || ~e.indexOf("adius")))
    return _ = w ? t.getBBox()[l ? "width" : "height"] : t[c], K(p ? s / _ * f : s / 100 * _);
  if (a[l ? "width" : "height"] = f + (h ? o : n), d = ~e.indexOf("adius") || n === "em" && t.appendChild && !u ? t : t.parentNode, w && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === ve || !d.appendChild) && (d = ve.body), y = d._gsap, y && p && y.width && l && y.time === vt.time && !y.uncache)
    return K(s / y.width * f);
  if (p && (e === "height" || e === "width")) {
    var m = t.style[e];
    t.style[e] = f + n, _ = t[c], m ? t.style[e] = m : sr(t, e);
  } else
    (p || o === "%") && !ng[zt(d, "display")] && (a.position = zt(t, "position")), d === t && (a.position = "static"), d.appendChild(Ie), _ = Ie[c], d.removeChild(Ie), a.position = "absolute";
  return l && p && (y = tr(d), y.time = vt.time, y.width = d[c]), K(h ? _ * s / f : _ && s ? f / _ * s : 0);
}, Jt = function(t, e, r, n) {
  var s;
  return ho || Ds(), e in Ht && e !== "transform" && (e = Ht[e], ~e.indexOf(",") && (e = e.split(",")[0])), se[e] && e !== "transform" ? (s = pn(t, n), s = e !== "transformOrigin" ? s[e] : s.svg ? s.origin : si(zt(t, gt)) + " " + s.zOrigin + "px") : (s = t.style[e], (!s || s === "auto" || n || ~(s + "").indexOf("calc(")) && (s = ii[e] && ii[e](t, e, r) || zt(t, e) || Ll(t, e) || (e === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? Ae(t, e, s, r) + r : s;
}, ig = function(t, e, r, n) {
  if (!r || r === "none") {
    var s = Ir(e, t, 1), o = s && zt(t, s, 1);
    o && o !== r ? (e = s, r = o) : e === "borderColor" && (r = zt(t, "borderTopColor"));
  }
  var a = new mt(this._pt, t.style, e, 0, 1, uu), l = 0, u = 0, c, f, h, p, _, d, y, w, m, g, v, T;
  if (a.b = r, a.e = n, r += "", n += "", n === "auto" && (d = t.style[e], t.style[e] = n, n = zt(t, e) || n, d ? t.style[e] = d : sr(t, e)), c = [r, n], Zl(c), r = c[0], n = c[1], h = r.match(mr) || [], T = n.match(mr) || [], T.length) {
    for (; f = mr.exec(n); )
      y = f[0], m = n.substring(l, f.index), _ ? _ = (_ + 1) % 5 : (m.substr(-5) === "rgba(" || m.substr(-5) === "hsla(") && (_ = 1), y !== (d = h[u++] || "") && (p = parseFloat(d) || 0, v = d.substr((p + "").length), y.charAt(1) === "=" && (y = vr(p, y) + v), w = parseFloat(y), g = y.substr((w + "").length), l = mr.lastIndex - g.length, g || (g = g || Tt.units[e] || v, l === n.length && (n += g, a.e += g)), v !== g && (p = Ae(t, e, d, g) || 0), a._pt = {
        _next: a._pt,
        p: m || u === 1 ? m : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: p,
        c: w - p,
        m: _ && _ < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = e === "display" && n === "none" ? du : hu;
  return Ol.test(n) && (a.e = 0), this._pt = a, a;
}, ya = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, sg = function(t) {
  var e = t.split(" "), r = e[0], n = e[1] || "50%";
  return (r === "top" || r === "bottom" || n === "left" || n === "right") && (t = r, r = n, n = t), e[0] = ya[r] || r, e[1] = ya[n] || n, e.join(" ");
}, og = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, n = r.style, s = e.u, o = r._gsap, a, l, u;
    if (s === "all" || s === !0)
      n.cssText = "", l = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        a = s[u], se[a] && (l = 1, a = a === "transformOrigin" ? gt : Y), sr(r, a);
    l && (sr(r, Y), o && (o.svg && r.removeAttribute("transform"), pn(r, 1), o.uncache = 1, pu(n)));
  }
}, ii = {
  clearProps: function(t, e, r, n, s) {
    if (s.data !== "isFromStart") {
      var o = t._pt = new mt(t._pt, e, r, 0, 0, og);
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
}, dn = [1, 0, 0, 1, 0, 0], vu = {}, wu = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, va = function(t) {
  var e = zt(t, Y);
  return wu(e) ? dn : e.substr(7).match(Sl).map(K);
}, go = function(t, e) {
  var r = t._gsap || tr(t), n = t.style, s = va(t), o, a, l, u;
  return r.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, s = [l.a, l.b, l.c, l.d, l.e, l.f], s.join(",") === "1,0,0,1,0,0" ? dn : s) : (s === dn && !t.offsetParent && t !== wr && !r.svg && (l = n.display, n.display = "block", o = t.parentNode, (!o || !t.offsetParent) && (u = 1, a = t.nextElementSibling, wr.appendChild(t)), s = va(t), l ? n.display = l : sr(t, "display"), u && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : wr.removeChild(t))), e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, Cs = function(t, e, r, n, s, o) {
  var a = t._gsap, l = s || go(t, !0), u = a.xOrigin || 0, c = a.yOrigin || 0, f = a.xOffset || 0, h = a.yOffset || 0, p = l[0], _ = l[1], d = l[2], y = l[3], w = l[4], m = l[5], g = e.split(" "), v = parseFloat(g[0]) || 0, T = parseFloat(g[1]) || 0, b, A, S, x;
  r ? l !== dn && (A = p * y - _ * d) && (S = v * (y / A) + T * (-d / A) + (d * m - y * w) / A, x = v * (-_ / A) + T * (p / A) - (p * m - _ * w) / A, v = S, T = x) : (b = _u(t), v = b.x + (~g[0].indexOf("%") ? v / 100 * b.width : v), T = b.y + (~(g[1] || g[0]).indexOf("%") ? T / 100 * b.height : T)), n || n !== !1 && a.smooth ? (w = v - u, m = T - c, a.xOffset = f + (w * p + m * d) - w, a.yOffset = h + (w * _ + m * y) - m) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = T, a.smooth = !!n, a.origin = e, a.originIsAbsolute = !!r, t.style[gt] = "0px 0px", o && (we(o, a, "xOrigin", u, v), we(o, a, "yOrigin", c, T), we(o, a, "xOffset", f, a.xOffset), we(o, a, "yOffset", h, a.yOffset)), t.setAttribute("data-svg-origin", v + " " + T);
}, pn = function(t, e) {
  var r = t._gsap || new nu(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var n = t.style, s = r.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), u = zt(t, gt) || "0", c, f, h, p, _, d, y, w, m, g, v, T, b, A, S, x, M, F, V, U, st, et, Q, rt, Lt, kn, Br, Vr, ke, vo, Gt, De;
  return c = f = h = d = y = w = m = g = v = 0, p = _ = 1, r.svg = !!(t.getCTM && yu(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[Y] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[Y] !== "none" ? l[Y] : "")), n.scale = n.rotate = n.translate = "none"), A = go(t, r.svg), r.svg && (r.uncache ? (Lt = t.getBBox(), u = r.xOrigin - Lt.x + "px " + (r.yOrigin - Lt.y) + "px", rt = "") : rt = !e && t.getAttribute("data-svg-origin"), Cs(t, rt || u, !!rt || r.originIsAbsolute, r.smooth !== !1, A)), T = r.xOrigin || 0, b = r.yOrigin || 0, A !== dn && (F = A[0], V = A[1], U = A[2], st = A[3], c = et = A[4], f = Q = A[5], A.length === 6 ? (p = Math.sqrt(F * F + V * V), _ = Math.sqrt(st * st + U * U), d = F || V ? pr(V, F) * Re : 0, m = U || st ? pr(U, st) * Re + d : 0, m && (_ *= Math.abs(Math.cos(m * Tr))), r.svg && (c -= T - (T * F + b * U), f -= b - (T * V + b * st))) : (De = A[6], vo = A[7], Br = A[8], Vr = A[9], ke = A[10], Gt = A[11], c = A[12], f = A[13], h = A[14], S = pr(De, ke), y = S * Re, S && (x = Math.cos(-S), M = Math.sin(-S), rt = et * x + Br * M, Lt = Q * x + Vr * M, kn = De * x + ke * M, Br = et * -M + Br * x, Vr = Q * -M + Vr * x, ke = De * -M + ke * x, Gt = vo * -M + Gt * x, et = rt, Q = Lt, De = kn), S = pr(-U, ke), w = S * Re, S && (x = Math.cos(-S), M = Math.sin(-S), rt = F * x - Br * M, Lt = V * x - Vr * M, kn = U * x - ke * M, Gt = st * M + Gt * x, F = rt, V = Lt, U = kn), S = pr(V, F), d = S * Re, S && (x = Math.cos(S), M = Math.sin(S), rt = F * x + V * M, Lt = et * x + Q * M, V = V * x - F * M, Q = Q * x - et * M, F = rt, et = Lt), y && Math.abs(y) + Math.abs(d) > 359.9 && (y = d = 0, w = 180 - w), p = K(Math.sqrt(F * F + V * V + U * U)), _ = K(Math.sqrt(Q * Q + De * De)), S = pr(et, Q), m = Math.abs(S) > 2e-4 ? S * Re : 0, v = Gt ? 1 / (Gt < 0 ? -Gt : Gt) : 0), r.svg && (rt = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !wu(zt(t, Y)), rt && t.setAttribute("transform", rt))), Math.abs(m) > 90 && Math.abs(m) < 270 && (s ? (p *= -1, m += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (_ *= -1, m += m <= 0 ? 180 : -180)), e = e || r.uncache, r.x = c - ((r.xPercent = c && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + o, r.z = h + o, r.scaleX = K(p), r.scaleY = K(_), r.rotation = K(d) + a, r.rotationX = K(y) + a, r.rotationY = K(w) + a, r.skewX = m + a, r.skewY = g + a, r.transformPerspective = v + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || !e && r.zOrigin || 0) && (n[gt] = si(u)), r.xOffset = r.yOffset = 0, r.force3D = Tt.force3D, r.renderTransform = r.svg ? lg : gu ? Tu : ag, r.uncache = 0, r;
}, si = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Ki = function(t, e, r) {
  var n = ot(e);
  return K(parseFloat(e) + parseFloat(Ae(t, "x", r + "px", n))) + n;
}, ag = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Tu(t, e);
}, Me = "0deg", qr = "0px", Le = ") ", Tu = function(t, e) {
  var r = e || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.z, u = r.rotation, c = r.rotationY, f = r.rotationX, h = r.skewX, p = r.skewY, _ = r.scaleX, d = r.scaleY, y = r.transformPerspective, w = r.force3D, m = r.target, g = r.zOrigin, v = "", T = w === "auto" && t && t !== 1 || w === !0;
  if (g && (f !== Me || c !== Me)) {
    var b = parseFloat(c) * Tr, A = Math.sin(b), S = Math.cos(b), x;
    b = parseFloat(f) * Tr, x = Math.cos(b), o = Ki(m, o, A * x * -g), a = Ki(m, a, -Math.sin(b) * -g), l = Ki(m, l, S * x * -g + g);
  }
  y !== qr && (v += "perspective(" + y + Le), (n || s) && (v += "translate(" + n + "%, " + s + "%) "), (T || o !== qr || a !== qr || l !== qr) && (v += l !== qr || T ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Le), u !== Me && (v += "rotate(" + u + Le), c !== Me && (v += "rotateY(" + c + Le), f !== Me && (v += "rotateX(" + f + Le), (h !== Me || p !== Me) && (v += "skew(" + h + ", " + p + Le), (_ !== 1 || d !== 1) && (v += "scale(" + _ + ", " + d + Le), m.style[Y] = v || "translate(0, 0)";
}, lg = function(t, e) {
  var r = e || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.rotation, u = r.skewX, c = r.skewY, f = r.scaleX, h = r.scaleY, p = r.target, _ = r.xOrigin, d = r.yOrigin, y = r.xOffset, w = r.yOffset, m = r.forceCSS, g = parseFloat(o), v = parseFloat(a), T, b, A, S, x;
  l = parseFloat(l), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, l += c), l || u ? (l *= Tr, u *= Tr, T = Math.cos(l) * f, b = Math.sin(l) * f, A = Math.sin(l - u) * -h, S = Math.cos(l - u) * h, u && (c *= Tr, x = Math.tan(u - c), x = Math.sqrt(1 + x * x), A *= x, S *= x, c && (x = Math.tan(c), x = Math.sqrt(1 + x * x), T *= x, b *= x)), T = K(T), b = K(b), A = K(A), S = K(S)) : (T = f, S = h, b = A = 0), (g && !~(o + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (g = Ae(p, "x", o, "px"), v = Ae(p, "y", a, "px")), (_ || d || y || w) && (g = K(g + _ - (_ * T + d * A) + y), v = K(v + d - (_ * b + d * S) + w)), (n || s) && (x = p.getBBox(), g = K(g + n / 100 * x.width), v = K(v + s / 100 * x.height)), x = "matrix(" + T + "," + b + "," + A + "," + S + "," + g + "," + v + ")", p.setAttribute("transform", x), m && (p.style[Y] = x);
}, ug = function(t, e, r, n, s) {
  var o = 360, a = it(s), l = parseFloat(s) * (a && ~s.indexOf("rad") ? Re : 1), u = l - n, c = n + u + "deg", f, h;
  return a && (f = s.split("_")[1], f === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), f === "cw" && u < 0 ? u = (u + o * pa) % o - ~~(u / o) * o : f === "ccw" && u > 0 && (u = (u - o * pa) % o - ~~(u / o) * o)), t._pt = h = new mt(t._pt, e, r, n, u, Wm), h.e = c, h.u = "deg", t._props.push(r), h;
}, wa = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, cg = function(t, e, r) {
  var n = wa({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, a, l, u, c, f, h, p, _;
  n.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[Y] = e, a = pn(r, 1), sr(r, Y), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[Y], o[Y] = e, a = pn(r, 1), o[Y] = u);
  for (l in se)
    u = n[l], c = a[l], u !== c && s.indexOf(l) < 0 && (p = ot(u), _ = ot(c), f = p !== _ ? Ae(r, l, u, _) : parseFloat(u), h = parseFloat(c), t._pt = new mt(t._pt, a, l, f, h - f, Ps), t._pt.u = _ || 0, t._props.push(l));
  wa(a, n);
};
pt("padding,margin,Width,Radius", function(i, t) {
  var e = "Top", r = "Right", n = "Bottom", s = "Left", o = (t < 3 ? [e, r, n, s] : [e + s, e + r, n + r, n + s]).map(function(a) {
    return t < 2 ? i + a : "border" + a + i;
  });
  ii[t > 1 ? "border" + i : i] = function(a, l, u, c, f) {
    var h, p;
    if (arguments.length < 4)
      return h = o.map(function(_) {
        return Jt(a, _, u);
      }), p = h.join(" "), p.split(h[0]).length === 5 ? h[0] : p;
    h = (c + "").split(" "), p = {}, o.forEach(function(_, d) {
      return p[_] = h[d] = h[d] || h[(d - 1) / 2 | 0];
    }), a.init(l, p, f);
  };
});
var Eu = {
  name: "css",
  register: Ds,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, n, s) {
    var o = this._props, a = t.style, l = r.vars.startAt, u, c, f, h, p, _, d, y, w, m, g, v, T, b, A, S;
    ho || Ds(), this.styles = this.styles || mu(t), S = this.styles.props, this.tween = r;
    for (d in e)
      if (d !== "autoRound" && (c = e[d], !(yt[d] && iu(d, e, r, n, t, s)))) {
        if (p = typeof c, _ = ii[d], p === "function" && (c = c.call(r, n, t, s), p = typeof c), p === "string" && ~c.indexOf("random(") && (c = cn(c)), _)
          _(this, t, d, c, r) && (A = 1);
        else if (d.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(d) + "").trim(), c += "", Ee.lastIndex = 0, Ee.test(u) || (y = ot(u), w = ot(c)), w ? y !== w && (u = Ae(t, d, u, w) + w) : y && (c += y), this.add(a, "setProperty", u, c, n, s, 0, 0, d), o.push(d), S.push(d, 0, a[d]);
        else if (p !== "undefined") {
          if (l && d in l ? (u = typeof l[d] == "function" ? l[d].call(r, n, t, s) : l[d], it(u) && ~u.indexOf("random(") && (u = cn(u)), ot(u + "") || u === "auto" || (u += Tt.units[d] || ot(Jt(t, d)) || ""), (u + "").charAt(1) === "=" && (u = Jt(t, d))) : u = Jt(t, d), h = parseFloat(u), m = p === "string" && c.charAt(1) === "=" && c.substr(0, 2), m && (c = c.substr(2)), f = parseFloat(c), d in Ht && (d === "autoAlpha" && (h === 1 && Jt(t, "visibility") === "hidden" && f && (h = 0), S.push("visibility", 0, a.visibility), we(this, a, "visibility", h ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), d !== "scale" && d !== "transform" && (d = Ht[d], ~d.indexOf(",") && (d = d.split(",")[0]))), g = d in se, g) {
            if (this.styles.save(d), v || (T = t._gsap, T.renderTransform && !e.parseTransform || pn(t, e.parseTransform), b = e.smoothOrigin !== !1 && T.smooth, v = this._pt = new mt(this._pt, a, Y, 0, 1, T.renderTransform, T, 0, -1), v.dep = 1), d === "scale")
              this._pt = new mt(this._pt, T, "scaleY", T.scaleY, (m ? vr(T.scaleY, m + f) : f) - T.scaleY || 0, Ps), this._pt.u = 0, o.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              S.push(gt, 0, a[gt]), c = sg(c), T.svg ? Cs(t, c, 0, b, 0, this) : (w = parseFloat(c.split(" ")[2]) || 0, w !== T.zOrigin && we(this, T, "zOrigin", T.zOrigin, w), we(this, a, d, si(u), si(c)));
              continue;
            } else if (d === "svgOrigin") {
              Cs(t, c, 1, b, 0, this);
              continue;
            } else if (d in vu) {
              ug(this, T, d, h, m ? vr(h, m + c) : c);
              continue;
            } else if (d === "smoothOrigin") {
              we(this, T, "smooth", T.smooth, c);
              continue;
            } else if (d === "force3D") {
              T[d] = c;
              continue;
            } else if (d === "transform") {
              cg(this, c, t);
              continue;
            }
          } else
            d in a || (d = Ir(d) || d);
          if (g || (f || f === 0) && (h || h === 0) && !qm.test(c) && d in a)
            y = (u + "").substr((h + "").length), f || (f = 0), w = ot(c) || (d in Tt.units ? Tt.units[d] : y), y !== w && (h = Ae(t, d, u, w)), this._pt = new mt(this._pt, g ? T : a, d, h, (m ? vr(h, m + f) : f) - h, !g && (w === "px" || d === "zIndex") && e.autoRound !== !1 ? Ym : Ps), this._pt.u = w || 0, y !== w && w !== "%" && (this._pt.b = u, this._pt.r = Gm);
          else if (d in a)
            ig.call(this, t, d, u, m ? m + c : c);
          else if (d in t)
            this.add(t, d, u || t[d], m ? m + c : c, n, s);
          else if (d !== "parseTransform") {
            no(d, c);
            continue;
          }
          g || (d in a ? S.push(d, 0, a[d]) : S.push(d, 1, u || t[d])), o.push(d);
        }
      }
    A && cu(this);
  },
  render: function(t, e) {
    if (e.tween._time || !po())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Jt,
  aliases: Ht,
  getSetter: function(t, e, r) {
    var n = Ht[e];
    return n && n.indexOf(",") < 0 && (e = n), e in se && e !== gt && (t._gsap.x || Jt(t, "x")) ? r && da === r ? e === "scale" ? Jm : Qm : (da = r || {}) && (e === "scale" ? Zm : tg) : t.style && !to(t.style[e]) ? Xm : ~e.indexOf("-") ? Km : co(t, e);
  },
  core: {
    _removeProperty: sr,
    _getMatrix: go
  }
};
_t.utils.checkPrefix = Ir;
_t.core.getStyleSaver = mu;
(function(i, t, e, r) {
  var n = pt(i + "," + t + "," + e, function(s) {
    se[s] = 1;
  });
  pt(t, function(s) {
    Tt.units[s] = "deg", vu[s] = 1;
  }), Ht[n[13]] = i + "," + t, pt(r, function(s) {
    var o = s.split(":");
    Ht[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
pt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(i) {
  Tt.units[i] = "px";
});
_t.registerPlugin(Eu);
var _o = _t.registerPlugin(Eu) || _t;
_o.core.Tween;
const fg = () => {
  console.log("# import taskml Modules! (production)");
};
window.gsap = _o;
_o.defaults({ overwrite: "auto" });
window.Taskml$$ || (fg(), Nd(), window.Taskml$$ = !0);
function hg(i) {
  const t = i.getAttribute("template"), e = document.querySelector(t);
  if (!e)
    return;
  const r = e.getAttribute("mode") || "";
  pc(r), P() && document.body.setAttribute("debug", "");
}
async function mg(i = "#app", t = !1) {
  return await (async (r) => {
    const n = zs(r, document);
    hg(n);
    let s = n;
    t && s.setAttribute("component-type", "is-app"), n.getAttribute("template") || (n.setAttribute("template", "#taskml"), P() && console.warn("# App template attribute 기본값 사용: #taskml"));
    const o = C.createProvider(), a = new an({
      owner: window.location.href,
      parent: s,
      provider: o
    });
    C.create(o), C.shorthand(), C.$ns.add(a.ns, {
      alias: "global",
      parseOption: a
    }), await (await Xs(n, a, !0))(), await _l(o, {
      type: "app"
    }), hd(s);
  })(i);
}
var Ke, Qe;
class gg extends HTMLElement {
  // Custom Elements의 constructor의 실행 시점은 아직 DOM에 추가지되지 않은 상태임
  // 자체 DOM 접근하면 에러 발생함
  constructor() {
    super();
    // debounce render
    k(this, Ke, void 0);
    /////////////////////////////////////////////////////
    // Custom
    /////////////////////////////////////////////////////
    // useShadowRoot Attribute 값으로 설정
    // shadowrootMode : 'false', 'open (default)', 'closed'
    k(this, Qe, void 0);
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
      return O(this, Qe, !1);
    if (e === "closed")
      return O(this, Qe, "closed");
    O(this, Qe, "open");
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
      try {
        return typeof e == "object" ? e : Function(`return ${e}`)() || e;
      } catch {
        return this.defaultTemplateData();
      }
  }
  /////////////////////////////////////////////////////
  // 랜더링
  /////////////////////////////////////////////////////
  // allowTaskml = true;
  async render() {
    var h;
    if (!this.template)
      return;
    let e = E(this, Qe);
    const r = e ? this.shadowRoot || this.attachShadow({ mode: e }) : this;
    r.innerHTML = "";
    const n = this.template.getParseOption(), s = this.template.cloneNode(!0), o = this.templateData;
    if (console.error("# 사용자 Element 정의: ", this.shadowRoot), console.log("	- template: ", s), console.log("	- templateData: ", o), o) {
      const p = ((h = s == null ? void 0 : s.dataset) == null ? void 0 : h.name) || "data";
      let _ = n.getTemplateString(s);
      const d = Wn(_, `${p}, $inject`), y = lr(d);
      s.innerHTML = y(o, this.getInject());
    }
    const a = C.createProvider(), l = n.copy({
      parent: r,
      provider: a
    }), u = { parseOption: l };
    a.$dom.add(u);
    const c = s.content.childNodes;
    let f = await Ai(c, l);
    u.nodes = f, Wd(l, () => {
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
Ke = new WeakMap(), Qe = new WeakMap();
export {
  gg as CustomElement,
  mg as createApp
};
