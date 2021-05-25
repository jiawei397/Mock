/*
    ## Mock.Random

    工具类，用于生成各种随机数据。
*/

import Util from '../util.js';
import basic from './basic.js';
import date from './date.js';
import image from './image.js';
import color from './color.js';
import text from './text.js';
import name from './name.js';
import web from './web.js';
import address from './address.js';
import helper from './helper.js';
import misc from './misc.js';

var Random = {
    extend: Util.extend
}

Random.extend(basic)
Random.extend(date)
Random.extend(image)
Random.extend(color)
Random.extend(text)
Random.extend(name)
Random.extend(web)
Random.extend(address)
Random.extend(helper)
Random.extend(misc)

export default Random
