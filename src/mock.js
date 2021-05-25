/* global require, module, window */
import Handler from './mock/handler.js'
import Util from './mock/util.js';
import Random from './mock/random/index.js'
import RE from './mock/regexp/index.js'
import toJSONSchema from './mock/schema/index.js'
import valid from './mock/valid/index.js'
import XHR from './mock/xhr/index.js';

/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    XHR: XHR,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    _mocked: {}
}

Mock.version = '1.0.1-beta3'

// 避免循环依赖
if (XHR) XHR.Mock = Mock

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/
Mock.mock = function(rurl, rtype, template) {
    // Mock.mock(template)
    if (arguments.length === 1) {
        return Handler.gen(rurl)
    }
    // Mock.mock(rurl, template)
    if (arguments.length === 2) {
        template = rtype
        rtype = undefined
    }
    // 拦截 XHR
    if (XHR) window.XMLHttpRequest = XHR
    Mock._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    }
    return Mock
}

export default Mock
