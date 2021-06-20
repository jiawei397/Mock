# Mock.js

<!-- 模拟请求 & 模拟数据 -->

Mock.js is a simulation data generator to help the front-end to develop and
prototype separate from the back-end progress and reduce some monotony
particularly while writing automated tests.

The official site: <http://mockjs.com>

修改为支持Deno。

## use

``` ts
import Mock from 'https://deno.land/x/deno_mock@v2.0.0/mod.ts';

var tpl = {
  "list|1-10": [{
    "id|+1": 1,
    "email": "@EMAIL",
  }],
};
var data = Mock.mock(tpl);

console.log(data);
```

## TODO

- 为方便ts校验，去掉了xhr的mock拦截
- canvas画图也需要修复

## License

Mock.js is available under the terms of the [MIT License](./LICENSE).
