import { SourceFile } from "ts-morph";

export const headerTemplate = `import { apiFetch } from "@/common/utils/axios";`;

export const contentTemplate = `
/**
* @author <% author %> 
* @desc <% desc %>
* @link https://sit-open-api.fms-sit.lylo.tech/swagger#/<% docUrl %>
*/
export function <% method %>(options: <% argumentsDefine %> , extraOptions?: any) {
    return apiFetch<<% responseDefine %>>(
        {
            url: "<% path %>",
            method: "<% method %>",
            ...options,
        },
        extraOptions,
    );
}
`;
interface ITypeInfo {
  // 接口地址
  docUrl: string;
  // 接口作者
  author: string;
  // 接口说明
  desc: string;
  // 参数定义
  argumentsDefine: string;
  // 返回值定义
  responseDefine: string;
  // 请求地址
  path: string;
  // 请求方式定义
  method: string;
}

// plk 特有文件头内容
export const customContent = async (
  data: any,
  definitionsFile: SourceFile,
  headerTemplate: string,
  contentTemplate: string,
  transFormType: (arg: any) => string
) => {
  const typeInfoArr: ITypeInfo[] = [];
  for (let url in data.paths) {
    const fetchDefines = data.paths[url];
    for (let methodStr in fetchDefines) {
      const methodDefine = fetchDefines[methodStr];
      const docUrl = `${methodDefine.tags?.join("/")}/${
        methodDefine.operationId
      }`;
      const author = methodDefine?.["x-author"] || "";
      const desc = methodDefine?.["summary"] || "";
      const path = url;
      const method = methodStr.toUpperCase();
      const responseDefineSchema = methodDefine.responses?.[200]?.schema;
      const responseDefine = responseDefineSchema
        ? `${transFormType(responseDefineSchema)}`
        : "any";
      let bodyDefine: any;
      let queryDefine: any;
      let arrayQueryDefineMap: Record<string, any> = {};
      let pathDefine: any;
      methodDefine.parameters?.forEach((paramsDefine: any) => {
        if (paramsDefine.in === "body") {
          bodyDefine = paramsDefine;
        }
        if (paramsDefine.in === "query") {
          if (!queryDefine) {
            queryDefine = {
              in: "query",
              schema: {
                type: "object",
                properties: {},
              },
            };
          }
          if (paramsDefine.name.includes("[0]")) {
            const keyArr = paramsDefine.name.split("[0].");
            const name = keyArr[0];
            const key = keyArr[1];
            let targetDefine = arrayQueryDefineMap[name];
            if (!targetDefine) {
              targetDefine = {
                type: "array",
                items: {
                  type: "object",
                  properties: {},
                },
              };
            }
            targetDefine.items.properties[key] = paramsDefine;
            arrayQueryDefineMap[name] = targetDefine;
          } else if (paramsDefine.name.match(/^\w+\[\w+\]$/)) {
            const [name, keyType] = paramsDefine.name.split(/\[|\]/);
            const keyName = `[${keyType}]`;
            queryDefine.schema.properties[name] = {
              type: "object",
              properties: {
                [keyName]: paramsDefine,
              },
              required: [keyName],
            };
          } else {
            queryDefine.schema.properties[paramsDefine.name] = paramsDefine;
          }
        }
        if (paramsDefine.in === "path") {
          if (!pathDefine) {
            pathDefine = {
              in: "path",
              schema: {
                type: "object",
                required: [],
                properties: {},
              },
            };
          }
          if (paramsDefine.required) {
            pathDefine.schema.required.push(paramsDefine.name);
          }
          pathDefine.schema.properties[paramsDefine.name] = paramsDefine;
        }
      });
      if (queryDefine) {
        queryDefine.schema.properties = {
          ...queryDefine.schema.properties,
          ...arrayQueryDefineMap,
        };
      }
      const defineArr = [pathDefine, bodyDefine, queryDefine].filter(Boolean);
      const argumentsDefine = (() => {
        let str = "{";
        defineArr.forEach((defineItem, index) => {
          const name =
            defineItem.in === "body"
              ? "data"
              : defineItem.in === "query"
              ? "params"
              : defineItem.in === "path"
              ? "path"
              : "unknown";
          if (index) {
            str += ",";
          }
          str += `${name}: ${transFormType(defineItem.schema)}`;
        });
        str += "}";
        return str;
      })();

      typeInfoArr.push({
        docUrl,
        author,
        desc,
        argumentsDefine,
        responseDefine,
        path,
        method,
      });
    }
  }
  definitionsFile.addStatements(headerTemplate);
  typeInfoArr.forEach((typeInfo) => {
    let str = contentTemplate;
    Object.keys(typeInfo).forEach((key) => {
      const target = new RegExp(`<% ${key} %>`, "g");
      str = str.replace(target, typeInfo[key as keyof ITypeInfo]);
    });
    definitionsFile.addStatements(str);
  });
};

// 特有转换逻辑
export const transformOriginType = (define: any): string => {
  const defaultTypeMap = {
    string: "string",
    integer: "number",
    number: "number",
    boolean: "boolean",
    array: "[]",
    object: "{}",
  };
  return defaultTypeMap[define.type as keyof typeof defaultTypeMap] as string;
};
