/* global require, module, window */
import Handler from './mock/handler.ts'
import Util from './mock/util.ts';
import Random from './mock/random/index.ts'
import RE from './mock/regexp/index.ts'
import toJSONSchema from './mock/schema/index.ts'
import valid from './mock/valid/index.ts'


/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
const Mock: any = {
  Handler: Handler,
  Random: Random,
  Util,
  RE: RE,
  toJSONSchema,
  valid,
  mock: mock,
  heredoc: Util.heredoc,
  version: '2.0.0',
  _mocked: {} as any
}

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/
function mock(template: any): void;
function mock(rurl: any, template: string): void;
function mock(rurl: any, rtype: string, template: string): void;
function mock() {
  // Mock.mock(template)
  if (arguments.length === 1) {
    const template = arguments[0];
    return Handler.gen(template)
  }
  // Mock.mock(rurl, template)
  var rurl = arguments[0];
  var rtype: string = '';
  var template;
  if (arguments.length === 2) {
    template = arguments[1];
  } else {
    template = arguments[2];
  }
  Mock._mocked[rurl + (rtype || '')] = {
    rurl: rurl,
    rtype: rtype,
    template: template
  }
  return Mock
}


export default Mock
