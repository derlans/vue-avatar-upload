var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { watch, ref, computed, defineComponent, useSlots, reactive, nextTick, openBlock, createElementBlock, normalizeClass, createElementVNode, unref, toDisplayString, createCommentVNode, renderSlot, normalizeStyle, withModifiers, Fragment, withDirectives, vShow, pushScopeId, popScopeId } from "vue";
function getRange(select, target) {
  const zoom = target.zoom || 1;
  const sx = select.left - target.left > 0 ? select.left - target.left : 0;
  const sy = select.top - target.top > 0 ? select.top - target.top : 0;
  const sw = select.width;
  const sh = select.height;
  return {
    sx: sx / zoom,
    sy: sy / zoom,
    sw: sw / zoom,
    sh: sh / zoom
  };
}
function createCutImg() {
  const canvas = document.createElement("canvas");
  const contex = canvas.getContext("2d");
  return function cutImg(url, range, format = "png") {
    const { sx, sy, sw, sh } = range;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "";
      img.src = url;
      img.onload = () => {
        canvas.height = sh;
        canvas.width = sw;
        contex.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        canvas.toBlob((blob) => {
          if (blob)
            resolve(blob);
          reject(new Error("canvas to blob error"));
          contex.restore();
        }, format);
      };
      img.onerror = (e) => {
        reject(e);
      };
    });
  };
}
function getVectorLength(vector) {
  return Math.sqrt(vector.reduce((pre, cur) => pre + cur ** 2, 0));
}
function getProjectionLength(vector, targetVector) {
  const targetVectorLength = getVectorLength(targetVector);
  let dotProduct = 0;
  vector.forEach((v, i) => {
    dotProduct += v * targetVector[i];
  });
  return dotProduct / targetVectorLength;
}
function uploadFile(formData, url, method = "POST", options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const headers = options.headers || {};
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.withCredentials = !!options.withCredentials;
    xhr.open(method, url);
    xhr.onload = () => {
      if (xhr.status === 200)
        resolve(xhr.response);
      else
        reject(new Error(xhr.statusText));
    };
    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };
    xhr.send(formData);
  });
}
function isMobile() {
  return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}
function useEventListener(target, event, func, options) {
  watch(target, () => {
    if (target.value) {
      const el = target.value;
      el.addEventListener(event, func, options);
    }
  }, {
    immediate: true
  });
}
function useDraggable(target, options = { stop: false, preventDefault: false }) {
  var _a;
  const draggingBox = (_a = options.draggingBox) != null ? _a : ref(document);
  const { stop, preventDefault, range = {} } = options;
  const _isMobile = isMobile();
  const x = ref(0);
  const y = ref(0);
  const isDraging = ref(false);
  const startPostion = {
    x: 0,
    y: 0
  };
  function handelEvent(e) {
    if (stop)
      e.stopPropagation();
    if (preventDefault)
      e.preventDefault();
  }
  const prevenMtobileTouch = (e) => {
    e.preventDefault();
  };
  function updateStartPostion(e) {
    if (_isMobile) {
      const _e = e;
      startPostion.x = _e.touches[0].clientX;
      startPostion.y = _e.touches[0].clientY;
    } else {
      const _e = e;
      startPostion.x = _e.x;
      startPostion.y = _e.y;
    }
  }
  const start = (e) => {
    handelEvent(e);
    isDraging.value = true;
    updateStartPostion(e);
    if (_isMobile)
      document.addEventListener("touchmove", prevenMtobileTouch, { passive: false });
  };
  const move = (e) => {
    var _a2, _b, _c, _d;
    handelEvent(e);
    if (!isDraging.value)
      return;
    if (_isMobile) {
      const _e = e;
      x.value += _e.touches[0].clientX - startPostion.x;
      y.value += _e.touches[0].clientY - startPostion.y;
    } else {
      const _e = e;
      x.value += _e.x - startPostion.x;
      y.value += _e.y - startPostion.y;
    }
    if (range) {
      if (((_a2 = range.x) == null ? void 0 : _a2.min) !== void 0 && x.value < range.x.min)
        x.value = range.x.min;
      if (((_b = range.x) == null ? void 0 : _b.max) !== void 0 && x.value > range.x.max)
        x.value = range.x.max;
      if (((_c = range.y) == null ? void 0 : _c.min) !== void 0 && y.value < range.y.min)
        y.value = range.y.min;
      if (((_d = range.y) == null ? void 0 : _d.max) !== void 0 && y.value > range.y.max)
        y.value = range.y.max;
    }
    updateStartPostion(e);
  };
  const end = (e) => {
    handelEvent(e);
    if (_isMobile)
      document.removeEventListener("touchmove", prevenMtobileTouch);
    isDraging.value = false;
  };
  const style = computed(() => {
    return {
      top: `${y.value}px`,
      left: `${x.value}px`
    };
  });
  if (_isMobile) {
    useEventListener(target, "touchstart", start);
    useEventListener(draggingBox, "touchmove", move);
    useEventListener(draggingBox, "touchend", end);
  } else {
    useEventListener(target, "mousedown", start);
    useEventListener(draggingBox, "mousemove", move);
    useEventListener(draggingBox, "mouseup", end);
  }
  return {
    x,
    y,
    isDraging,
    style
  };
}
function useWheel(target, func) {
  const wheel = ref(0);
  function handle(e) {
    wheel.value += e.deltaY > 0 ? 1 : -1;
    func(e.deltaY > 0 ? 1 : -1);
    e.preventDefault();
  }
  useEventListener(target, "wheel", handle);
  return {
    wheel
  };
}
const WHEEL_ZOOM = 0.02;
function useBackImgOperate(editBox, imgSize) {
  useWheel(editBox, updateBgImgZoom);
  const bgImgZoom = ref(1);
  function updateBgImgZoom(delta) {
    bgImgZoom.value += delta > 0 ? WHEEL_ZOOM : -WHEEL_ZOOM;
  }
  const imgRotate = ref(0);
  function updateRotate() {
    imgRotate.value = (imgRotate.value + 90) % 360;
  }
  const { style: editPositionStyle, x: baImgX, y: baImgY } = useDraggable(editBox, {
    stop: true,
    preventDefault: false
  });
  const bgImgStyle = computed(() => {
    return __spreadProps(__spreadValues({}, editPositionStyle.value), {
      width: `${imgSize.width * bgImgZoom.value}px`,
      height: `${imgSize.height * bgImgZoom.value}px`,
      transform: `rotate(${imgRotate.value}deg)`
    });
  });
  return {
    bgImgZoom,
    editPositionStyle,
    baImgX,
    baImgY,
    bgImgStyle,
    imgRotate,
    updateRotate
  };
}
function useSelectOperate(initSize, select, resize, limitSize) {
  const selectBoxSize = ref(initSize);
  const { x: resizeX, y: resizeY } = useDraggable(resize, {
    stop: true,
    preventDefault: false
  });
  const selectRange = {
    x: {
      min: 0,
      max: limitSize.width - selectBoxSize.value
    },
    y: {
      min: 0,
      max: limitSize.height - selectBoxSize.value
    }
  };
  function updateSelectRange() {
    selectRange.x.max = limitSize.width - selectBoxSize.value;
    selectRange.y.max = limitSize.height - selectBoxSize.value;
  }
  const { style: selectPositionStyle, x: selectX, y: selectY } = useDraggable(select, {
    stop: true,
    preventDefault: false,
    range: selectRange
  });
  const selectBoxStyle = computed(() => {
    return __spreadValues({
      width: `${selectBoxSize.value}px`,
      height: `${selectBoxSize.value}px`
    }, selectPositionStyle.value);
  });
  function updateSelectSize() {
    if (selectBoxSize.value + selectX.value > limitSize.width)
      selectBoxSize.value = limitSize.width - selectX.value;
    if (selectBoxSize.value + selectY.value > limitSize.height)
      selectBoxSize.value = limitSize.height - selectY.value;
  }
  watch([resizeX, resizeY], (newV, oldV) => {
    const sizeChangeX = newV[0] - oldV[0];
    const sizeChangeY = newV[1] - oldV[1];
    const sizeChange = getProjectionLength([sizeChangeX, sizeChangeY], [1, 1]);
    selectBoxSize.value = selectBoxSize.value + sizeChange;
    selectBoxSize.value = selectBoxSize.value <= 0 ? 0 : selectBoxSize.value;
    updateSelectSize();
    updateSelectRange();
  });
  return {
    resizeX,
    resizeY,
    selectBoxSize,
    selectBoxStyle,
    selectPositionStyle,
    selectX,
    selectY
  };
}
const en = {
  title: "Edit Avatar",
  changeAvatar: "Change Avatar",
  rotate: "Rotate 90\xB0",
  preview: "Preview",
  cancel: "Cancel",
  confirm: "Confirm"
};
var i18 = {
  "zh-CN": {
    title: "\u7F16\u8F91\u5934\u50CF",
    changeAvatar: "\u66F4\u6362\u5934\u50CF",
    rotate: "\u65CB\u8F6C90\u5EA6",
    preview: "\u9884\u89C8",
    cancel: "\u53D6\u6D88",
    confirm: "\u786E\u5B9A"
  },
  "zh-TW": {
    title: "\u7DE8\u8F2F\u982D\u50CF",
    changeAvatar: "\u66F4\u63DB\u982D\u50CF",
    rotate: "\u65CB\u8F4990\u5EA6",
    preview: "\u9810\u89BD",
    cancel: "\u53D6\u6D88",
    confirm: "\u78BA\u5B9A"
  },
  en
};
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId = (n) => (pushScopeId("data-v-4e6f040d"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "avatar-upload-header" };
const _hoisted_2 = {
  key: 0,
  class: "avatar-upload-title"
};
const _hoisted_3 = {
  key: 0,
  t: "1649489376154",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "2215",
  width: "16",
  height: "16"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  d: "M184.64768 836.34176c3.9936 3.9936 9.23648 5.98016 14.47936 5.98016 5.24288 0 10.48576-2.00704 14.49984-6.00064l292.70016-293.04832 292.70016 293.04832c3.9936 4.01408 9.23648 6.00064 14.49984 6.00064 5.24288 0 10.48576-2.00704 14.47936-5.98016 8.00768-7.9872 8.00768-20.95104 0.02048-28.95872L535.61344 514.64192 828.0064 221.92128c7.9872-8.00768 7.9872-20.97152-0.02048-28.95872-8.02816-8.00768-20.97152-8.00768-28.95872 0.02048L506.30656 486.03136 213.6064 192.98304c-8.00768-8.00768-20.97152-8.00768-28.95872-0.02048-8.00768 7.9872-8.00768 20.95104-0.02048 28.95872l292.37248 292.72064L184.6272 807.38304C176.64 815.37024 176.64 828.35456 184.64768 836.34176z",
  fill: "",
  "p-id": "2216"
}, null, -1));
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { class: "avatar-upload-main" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "edit-fade" }, null, -1));
const _hoisted_8 = { class: "edit-selcet-img-box" };
const _hoisted_9 = ["src"];
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", { class: "edit-selcet-border border-3-white" }, null, -1));
const _hoisted_11 = ["src"];
const _hoisted_12 = { class: "avatar-upload-operation" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  t: "1649489582570",
  class: "icon-rotate",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3047",
  width: "16",
  height: "16"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M503.466667 285.866667L405.333333 226.133333c-8.533333-8.533333-12.8-21.333333-8.533333-29.866666 8.533333-8.533333 21.333333-12.8 29.866667-8.533334l145.066666 89.6c8.533333 4.266667 12.8 17.066667 8.533334 29.866667l-89.6 145.066667c-4.266667 8.533333-17.066667 12.8-29.866667 8.533333-8.533333-4.266667-12.8-17.066667-8.533333-29.866667l64-102.4c-123.733333 4.266667-226.133333 106.666667-226.133334 234.666667s106.666667 234.666667 234.666667 234.666667c85.333333 0 162.133333-46.933333 204.8-119.466667 4.266667-8.533333 17.066667-12.8 29.866667-8.533333 8.533333 4.266667 12.8 17.066667 8.533333 29.866666-51.2 85.333333-140.8 140.8-238.933333 140.8-153.6 0-277.333333-123.733333-277.333334-277.333333 0-145.066667 110.933333-264.533333 251.733334-277.333333z",
    "p-id": "3048"
  })
], -1));
const _hoisted_14 = {
  key: 0,
  class: "avatar-upload-preview"
};
const _hoisted_15 = ["src"];
const _hoisted_16 = ["src"];
const _hoisted_17 = { class: "avatar-upload-actions" };
const _hoisted_18 = {
  key: 0,
  class: "avatar-button -regular"
};
const _hoisted_19 = {
  key: 0,
  class: "avatar-button -salmon"
};
const _hoisted_20 = ["name", "accept"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    avatar: null,
    url: null,
    field: { default: "avatar" },
    format: { default: "png" },
    headers: null,
    data: null,
    width: { default: 300 },
    height: { default: 300 },
    selectSize: { default: 300 },
    withCredentials: { type: Boolean, default: false },
    method: { default: "POST" },
    accept: { default: "image/*" },
    rotate: { type: Boolean, default: true },
    fixed: { type: Boolean, default: true },
    showPreview: { type: Boolean, default: true },
    previewSize: { default: 100 },
    i18: null,
    lang: { default: "zh-CN" },
    onCustomRequest: null,
    onBefoureUpload: null,
    onSuccess: null,
    onError: null,
    onClose: null
  },
  setup(__props) {
    const Props = __props;
    const defaultI18 = Props.i18 || i18[Props.lang] || i18["zh-CN"];
    const slots = useSlots();
    const avatar = ref(Props.avatar || "");
    const { width: editBoxWidth, height: editBoxHeight, selectSize, previewSize } = Props;
    const initSelectSize = selectSize < Math.min(Props.width, Props.height) ? selectSize : Math.min(Props.width, Props.height);
    const editBoxSizeStyle = {
      width: `${editBoxWidth}px`,
      height: `${editBoxHeight}px`
    };
    const imgSize = reactive({
      width: editBoxWidth,
      height: editBoxHeight
    });
    const bgAvatar = ref(null);
    watch(bgAvatar, () => {
      var _a;
      if ((_a = bgAvatar.value) == null ? void 0 : _a.width)
        initImgSize();
    }, {
      immediate: true
    });
    const editBox = ref(null);
    const {
      bgImgZoom,
      baImgX,
      baImgY,
      bgImgStyle,
      imgRotate,
      updateRotate
    } = useBackImgOperate(editBox, imgSize);
    function initImgSize() {
      nextTick(() => {
        const el = bgAvatar.value;
        el.onload = () => {
          const width = el.naturalWidth;
          const height = el.naturalHeight;
          if (width / height > editBoxWidth / editBoxHeight) {
            bgImgZoom.value = editBoxHeight / height;
            imgSize.height = height;
            imgSize.width = width;
          } else {
            bgImgZoom.value = editBoxWidth / width;
            imgSize.height = height;
            imgSize.width = width;
          }
          baImgX.value = 0;
          baImgY.value = 0;
        };
      });
    }
    const select = ref(null);
    const resize = ref(null);
    const {
      selectBoxSize,
      selectBoxStyle,
      selectX,
      selectY
    } = useSelectOperate(initSelectSize, select, resize, { width: editBoxWidth, height: editBoxHeight });
    const selsctImgStyle = computed(() => {
      return {
        width: `${imgSize.width * bgImgZoom.value}px`,
        height: `${imgSize.height * bgImgZoom.value}px`,
        left: `${baImgX.value - selectX.value}px`,
        top: `${baImgY.value - selectY.value}px`,
        transform: `rotate(${imgRotate.value}deg)`
      };
    });
    const previewBoxSizeStyle = computed(() => {
      return {
        width: `${previewSize}px`,
        height: `${previewSize}px`
      };
    });
    const previewImgStyle = computed(() => {
      const zoom = previewSize / selectBoxSize.value;
      return {
        width: `${imgSize.width * zoom * bgImgZoom.value}px`,
        height: `${imgSize.height * zoom * bgImgZoom.value}px`,
        left: `${(baImgX.value - selectX.value) * zoom}px`,
        top: `${(baImgY.value - selectY.value) * zoom}px`,
        transform: `rotate(${imgRotate.value}deg)`
      };
    });
    const file = ref(null);
    function changeFile(e) {
      const file2 = e.target;
      const reader = new FileReader();
      reader.onload = (e2) => {
        const url = e2.target.result;
        if (url) {
          avatar.value = url;
          initImgSize();
        }
      };
      reader.readAsDataURL(file2.files[0]);
    }
    async function upload() {
      const formData = new FormData();
      const blob = await getImgData();
      const format = Props.format;
      formData.append(Props.field, blob);
      const file2 = new File([blob], `avatar.${format}`, { type: `image/${format}` });
      if (Props.onCustomRequest) {
        await Props.onCustomRequest(file2);
        return;
      }
      if (Props.onBefoureUpload) {
        const result = await Props.onBefoureUpload(file2);
        if (!result)
          return;
      }
      uploadFile(formData, Props.url, Props.method, { headers: Props.headers, data: Props.data, withCredentials: Props.withCredentials }).then((res) => {
        var _a;
        (_a = Props.onSuccess) == null ? void 0 : _a.call(Props, file2, res);
      }).catch((err) => {
        var _a;
        (_a = Props == null ? void 0 : Props.onError) == null ? void 0 : _a.call(Props, file2, err);
      });
    }
    const cutImg = createCutImg();
    function getImgData() {
      const range = getRange({
        left: selectX.value,
        top: selectY.value,
        width: selectBoxSize.value,
        height: selectBoxSize.value
      }, {
        left: baImgX.value,
        top: baImgY.value,
        width: imgSize.width,
        height: imgSize.height,
        zoom: bgImgZoom.value
      });
      return cutImg(avatar.value, range, Props.format);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "avatar-upload-root": true, "avatar-upload-root-fixed": Props.fixed })
      }, [
        createElementVNode("div", {
          class: normalizeClass({ "avatar-upload-fade": Props.fixed })
        }, null, 2),
        createElementVNode("div", {
          class: normalizeClass({ "avatar-upload": true, "avatar-upload-fixed": Props.fixed })
        }, [
          createElementVNode("div", _hoisted_1, [
            !unref(slots).title ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(unref(defaultI18).title), 1)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "title", {}, void 0, true),
            createElementVNode("div", {
              class: "avatar-upload-close",
              onClick: _cache[0] || (_cache[0] = (...args) => Props.onClose && Props.onClose(...args))
            }, [
              renderSlot(_ctx.$slots, "closeIcon", {}, void 0, true),
              !unref(slots).closeIcon ? (openBlock(), createElementBlock("svg", _hoisted_3, _hoisted_5)) : createCommentVNode("", true)
            ])
          ]),
          createElementVNode("div", _hoisted_6, [
            createElementVNode("div", null, [
              createElementVNode("div", {
                ref_key: "editBox",
                ref: editBox,
                class: "avatar-upload-edit",
                style: editBoxSizeStyle
              }, [
                _hoisted_7,
                createElementVNode("div", {
                  ref_key: "select",
                  ref: select,
                  class: "edit-select",
                  style: normalizeStyle(unref(selectBoxStyle))
                }, [
                  createElementVNode("span", _hoisted_8, [
                    createElementVNode("img", {
                      src: avatar.value,
                      alt: "",
                      style: normalizeStyle(unref(selsctImgStyle)),
                      class: "edit-select-img",
                      onDragstart: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["prevent"])),
                      onSelect: _cache[2] || (_cache[2] = withModifiers(() => {
                      }, ["prevent"]))
                    }, null, 44, _hoisted_9)
                  ]),
                  _hoisted_10,
                  createElementVNode("span", {
                    ref_key: "resize",
                    ref: resize,
                    class: "select-zoom-point"
                  }, null, 512)
                ], 4),
                createElementVNode("img", {
                  ref_key: "bgAvatar",
                  ref: bgAvatar,
                  src: avatar.value,
                  alt: "",
                  style: normalizeStyle(unref(bgImgStyle)),
                  class: "edit-bg",
                  onDragstart: _cache[3] || (_cache[3] = withModifiers(() => {
                  }, ["prevent"])),
                  onSelect: _cache[4] || (_cache[4] = withModifiers(() => {
                  }, ["prevent"]))
                }, null, 44, _hoisted_11)
              ], 512),
              createElementVNode("div", _hoisted_12, [
                createElementVNode("span", {
                  style: { "cursor": "pointer" },
                  onClick: _cache[5] || (_cache[5] = ($event) => file.value.click())
                }, toDisplayString(unref(defaultI18).changeAvatar), 1),
                createElementVNode("span", {
                  style: { "cursor": "pointer" },
                  class: "upload-operation-close",
                  onClick: _cache[6] || (_cache[6] = (...args) => unref(updateRotate) && unref(updateRotate)(...args))
                }, [
                  Props.rotate ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    _hoisted_13,
                    createElementVNode("span", null, toDisplayString(unref(defaultI18).rotate), 1)
                  ], 64)) : createCommentVNode("", true)
                ])
              ])
            ]),
            Props.showPreview ? (openBlock(), createElementBlock("div", _hoisted_14, [
              createElementVNode("span", null, toDisplayString(unref(defaultI18).preview), 1),
              createElementVNode("div", {
                class: "preview-radius border-3-white",
                style: normalizeStyle(unref(previewBoxSizeStyle))
              }, [
                createElementVNode("img", {
                  src: avatar.value,
                  alt: "",
                  style: normalizeStyle(unref(previewImgStyle)),
                  onDragstart: _cache[7] || (_cache[7] = withModifiers(() => {
                  }, ["prevent"])),
                  onSelect: _cache[8] || (_cache[8] = withModifiers(() => {
                  }, ["prevent"]))
                }, null, 44, _hoisted_15)
              ], 4),
              createElementVNode("div", {
                class: "preview-square border-3-white",
                style: normalizeStyle(unref(previewBoxSizeStyle))
              }, [
                createElementVNode("img", {
                  src: avatar.value,
                  alt: "",
                  style: normalizeStyle(unref(previewImgStyle)),
                  onDragstart: _cache[9] || (_cache[9] = withModifiers(() => {
                  }, ["prevent"])),
                  onSelect: _cache[10] || (_cache[10] = withModifiers(() => {
                  }, ["prevent"]))
                }, null, 44, _hoisted_16)
              ], 4)
            ])) : createCommentVNode("", true)
          ]),
          createElementVNode("div", _hoisted_17, [
            createElementVNode("div", {
              onClick: _cache[11] || (_cache[11] = (...args) => Props.onClose && Props.onClose(...args))
            }, [
              !unref(slots).cancel ? (openBlock(), createElementBlock("div", _hoisted_18, toDisplayString(unref(defaultI18).cancel), 1)) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "cancel", {}, void 0, true)
            ]),
            createElementVNode("div", { onClick: upload }, [
              !unref(slots).confirm ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(unref(defaultI18).confirm), 1)) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "confirm", {}, void 0, true)
            ])
          ]),
          withDirectives(createElementVNode("div", null, [
            createElementVNode("input", {
              ref_key: "file",
              ref: file,
              type: "file",
              name: Props.field,
              accept: Props.accept,
              onInput: changeFile
            }, null, 40, _hoisted_20)
          ], 512), [
            [vShow, false]
          ])
        ], 2)
      ], 2);
    };
  }
});
var VueAvatarUpload = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e6f040d"]]);
const name = "VueAvatarUpload";
VueAvatarUpload.install = function(Vue) {
  Vue.component(name, VueAvatarUpload);
};
export { VueAvatarUpload as default };
