import { OptionalKind, PropertySignatureStructure, SourceFile } from "ts-morph";
import { translate as translateFn } from "./translate";

const typeMap = {
  string: "string",
  integer: "number",
  number: "number",
  boolean: "boolean",
  array: "[]",
  object: "{}",
};

// 去除所有的特殊字符
const formatName = (name: string) =>
  name.replace(/[、,，'/《》«»()（）-\s]/gi, "");

type IDefinitionsMapItem = {
  name: string;
  originName: string;
  ins: any;
  define: any;
};

export const createDefinitions = async (
  definitionsFile: SourceFile,
  data: any,
  option?: { translate?: boolean; prefix?: string }
) => {
  const { translate = true, prefix = "I" } = option || {};
  const definitionsMap: Record<string, IDefinitionsMapItem> = {};

  const transFormType = (define: any): string => {
    if (define.originalRef) {
      if (!definitionsMap[define.originalRef]) {
        return define.originalRef;
      }
      return definitionsMap[define.originalRef].name;
    }
    const typeOrigin = typeMap[define.type as keyof typeof typeMap];
    if (typeOrigin === typeMap.array) {
      return transFormType(define.items) + "[]";
    }
    if (typeOrigin === typeMap.object) {
      if (define.properties) {
        return `{ ${Object.keys(define.properties || {})
          .map((key) => `${key}: ${transFormType(define.properties[key])}`)
          .join("; ")} }`;
      }
      return `Record<string, ${
        define?.additionalProperties
          ? transFormType(define?.additionalProperties)
          : "any"
      }>`;
    }
    return typeOrigin;
  };

  // 记录所有的定义
  // console.log("data.definitions: ", data.definitions);
  for (let name in data.definitions) {
    const define = data.definitions[name];
    if (define.type === "object") {
      definitionsMap[name] = {
        name: formatName(name),
        originName: name,
        ins: null,
        define,
      };
    }
  }
  const translateItemArr = Object.values(definitionsMap);
  // 对所有中文名称处理
  const names = translateItemArr.map((item) => item.name);
  // 翻译所有的中文名称
  const result = translate ? await translateFn(names) : names;
  // 所有的定义名称修正
  translateItemArr.forEach((item, index) => {
    item.name = `${prefix}${formatName(result[index])}`;
    // console.log("item.name: ", item.name);
  });

  // TODO: 转换到外层实现
  // 生成接口文档链接 和 方法定义
  for (let url in data.paths) {
    const fetchDefines = data.paths[url];
    for (let method in fetchDefines) {
      const methodDefine = fetchDefines[method];
      definitionsFile.addStatements((writer) => {
        writer.writeLine(`import { ${method} } from '@/api/http';`);
        writer.writeLine(" ");
        const docUrl = `// http://${
          data.host
        }/doc.html#/default/${methodDefine.tags?.join("/")}/${
          methodDefine.operationId
        }`;
        console.log("docUrl: ", docUrl);
        writer.writeLine(docUrl);
      });
      const functionDeclaration = definitionsFile.addFunction({
        name: "fetchMethod",
        isExported: true,
      });
      let bodyDefine: any;
      let queryDefine: any;
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
          queryDefine.schema.properties[paramsDefine.name] = paramsDefine;
        }
      });
      const defineArr = [bodyDefine, queryDefine].filter(Boolean);
      defineArr.forEach((defineItem) => {
        const name = defineItem.in === "body" ? "data" : "params";
        functionDeclaration.addParameter({
          name,
          type: transFormType(defineItem.schema),
        });
      });
      functionDeclaration.setBodyText((writer) => {
        writer.writeLine(`return ${method}({`);
        writer.writeLine(`  url: "${url}",`);
        defineArr?.forEach((paramsDefine: any) => {
          if (paramsDefine.in === "body") {
            writer.writeLine(`  data,`);
          }
          if (paramsDefine.in === "query") {
            writer.writeLine(`  params,`);
          }
        });
        writer.writeLine(`});`);
      });
    }
  }

  // 生成所有的定义
  for (let name in definitionsMap) {
    const item = definitionsMap[name];
    const define = item.define;
    if (define.type === "object") {
      definitionsFile.addStatements("// " + item.originName);
      const ins = definitionsFile.addInterface({
        name: item.name,
        isExported: true,
        properties: Object.keys(define.properties || {}).map<
          OptionalKind<PropertySignatureStructure>
        >((key) => ({
          name: key,
          type: transFormType(define.properties[key]),
          leadingTrivia: `// ${define.properties[key].description}`,
          // trailingTrivia: `// ${define.properties[key].description}`,
        })),
      });
      definitionsMap[name].ins = ins;
    }
  }
};
