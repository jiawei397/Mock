/*
    ## Utilities
*/
const Util: any = {};

Util.extend = function extend() {
  var target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    options,
    name,
    src,
    copy,
    clone;

  if (length === 1) {
    target = this;
    i = 0;
  }

  for (; i < length; i++) {
    options = arguments[i];
    if (!options) continue;

    for (name in options) {
      src = target[name];
      copy = options[name];

      if (target === copy) continue;
      if (copy === undefined) continue;

      if (Util.isArray(copy) || Util.isObject(copy)) {
        if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
        if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};

        target[name] = Util.extend(clone, copy);
      } else {
        target[name] = copy;
      }
    }
  }

  return target;
};

Util.each = function each(obj: any, iterator: Function, context: any) {
  var i, key;
  if (this.type(obj) === "number") {
    for (i = 0; i < obj; i++) {
      iterator(i, i);
    }
  } else if (obj.length === +obj.length) {
    for (i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) break;
    }
  } else {
    for (key in obj) {
      if (iterator.call(context, obj[key], key, obj) === false) break;
    }
  }
};

Util.type = function type(obj: any) {
  return (obj === null || obj === undefined)
    ? String(obj) // @ts-ignore
    : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1]
      .toLowerCase();
};

Util.each(
  "String Object Array RegExp Function".split(" "),
  function (value: any) {
    Util["is" + value] = function (obj: any) {
      return Util.type(obj) === value.toLowerCase();
    };
  },
);

Util.isObjectOrArray = function (value: any) {
  return Util.isObject(value) || Util.isArray(value);
};

Util.isNumeric = function (value: any) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

Util.keys = function (obj: any) {
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      keys.push(key);
    }
  }
  return keys;
};
Util.values = function (obj: any) {
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { // @ts-ignore
      values.push(obj[key]);
    }
  }
  return values;
};

/*
    ### Mock.heredoc(fn)

    * Mock.heredoc(fn)

    以直观、安全的方式书写（多行）HTML 模板。

    **使用示例**如下所示：

        var tpl = Mock.heredoc(function() {
            /*!
        {{email}}{{age}}
        <!-- Mock {
            email: '@EMAIL',
            age: '@INT(1,100)'
        } -->
            *\/
        })

    **相关阅读**
    * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
*/
Util.heredoc = function heredoc(fn: Function) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn.toString()
    .replace(/^[^\/]+\/\*!?/, "")
    .replace(/\*\/[^\/]+$/, "")
    .replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); // .trim()
};

Util.noop = function () {};

export default Util;
