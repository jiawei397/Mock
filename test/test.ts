import Mock from '../mod.ts';

var tpl = {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
}
var data = Mock.mock(tpl)

console.log(data);
