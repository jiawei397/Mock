/*
    ## Mock.Random

    工具类，用于生成各种随机数据。
*/

import Util from "../util.ts";
import basic from "./basic.ts";
import date from "./date.ts";
import image from "./image.ts";
import color from "./color.ts";
import text from "./text.ts";
import name from "./name.ts";
import web from "./web.ts";
import address from "./address.ts";
import helper from "./helper.ts";
import misc from "./misc.ts";

var Random: any = {
  extend: Util.extend,
};

Random.extend(basic);
Random.extend(date);
Random.extend(image);
Random.extend(color);
Random.extend(text);
Random.extend(name);
Random.extend(web);
Random.extend(address);
Random.extend(helper);
Random.extend(misc);

export default Random;
