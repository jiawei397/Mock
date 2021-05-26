/*
    ## toJSONSchema

    把 Mock.ts 风格的数据模板转换成 JSON Schema。

    > [JSON Schema](http://json-schema.org/)
 */
import Constant from "../constant.ts";
import Util from "../util.ts";
import { parse } from "../parser.ts";

function toJSONSchema(
  template: string,
  name?: any,
  path?: string[], /* Internal Use Only */
) {
  // type rule properties items
  path = path || [];
  var result = {
    name: typeof name === "string" ? name.replace(Constant.RE_KEY, "$1") : name,
    template: template,
    type: Util.type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
    rule: parse(name),
    path: path.slice(0),
  };
  result.path.push(name === undefined ? "ROOT" : result.name);

  switch (result.type) {
    case "array":
      // @ts-ignore
      result.items = [];
      Util.each(template, function (value: any, index: number) {
        // @ts-ignore
        result.items.push(
          toJSONSchema(value, index, result.path),
        );
      });
      break;
    case "object":
      // @ts-ignore
      result.properties = [];
      Util.each(template, function (value: any, name: string) {
        // @ts-ignore
        result.properties.push(
          toJSONSchema(value, name, result.path),
        );
      });
      break;
  }

  return result;
}

export default toJSONSchema;
