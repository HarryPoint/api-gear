import axios from "axios";
import _ from "lodash";
import path from "path";
import { Project } from "ts-morph";
import { getRunTimeConfig, IConfig, setRunTimeConfig } from "./config";
import { createProject, createJsonFile, createTsFile, createInterfaceFile } from "./project";
import {processBar} from "./processBar";
import {log} from "./log"

const sortData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(sortData);
  }
  if (_.isObject(data)) {
    let keys = Object.keys(data).sort();
    return keys.reduce((pre, next) => {
      pre[next] = sortData((data as any)[next]);
      return pre;
    }, {} as Record<string, any>);
  }
  return data;
};

const findOriginalRef = (pathItem: any): string[] => {
  let result: string[] = [];
  for (let key in pathItem) {
    if (key === "$ref") {
      return [pathItem[key].replace("#/definitions/", "")];
    }
    if (_.isObject(pathItem[key])) {
      result = [...result, ...findOriginalRef(pathItem[key])];
    }
  }
  return result;
};


const fetchData = async (
  config: IConfig,
  options: {
    project: Project,
    apiUri: string,
    prefix: string
  }
) => {
  let {apiUri, prefix, project} = options;
  if (!apiUri) {
    throw new Error("apiUri not found");
  }
  log.info("step1: fetch data")
  const { data: originData } = await axios.get(`${apiUri}`, {
    auth: config.auth,
  });
  log.info("step2: Data analysis")
  const basePath = path.join(config.output, prefix);

  const data = config.sort ? sortData(originData) : originData;

  const baseData = _.pick(data, ["basePath", "host", "info", "swagger"]);

  const interfaceFilePath = path.join(basePath, config.interfaceFileName);

  await createInterfaceFile(config, {project, filePath: interfaceFilePath, data})

  const createDefinitions = (
      target: any,
      prevDefines: Record<string, any> = {}
  ): Record<string, any> => {
    return findOriginalRef(target).reduce((pre, next) => {
      if (pre.hasOwnProperty(next)) {
        return pre;
      }
      const nextDefine = _.cloneDeep(data.definitions[next]);
      pre = {
        ...pre,
        [next]: _.cloneDeep(data.definitions[next]),
      };
      return createDefinitions(nextDefine, pre);
    }, prevDefines);
  };

  const openJsonArr = _.toPairs(data.paths).map(([path, pathItem]) => {
    return [
      path,
      {
        ..._.cloneDeep(baseData),
        paths: {
          [path]: pathItem,
        },
        definitions: createDefinitions(pathItem),
      },
    ] as [string, any];
  });
  log.info("step3: Generating code")
  processBar.start(openJsonArr.length, 0);
  for (let [pathStr, jsonData] of openJsonArr) {
    const filePath = path.join(basePath, pathStr);
    const apiPath = filePath.replace(basePath, path.sep);
    const jsonFilePath = `${filePath}/index.json`;
    const tsFilePath = `${filePath}/index.ts`;
    if (config.pathFilter && !config.pathFilter(apiPath)) {
      continue;
    }
    if (config.createTsFile) {
      const interfacePathWithExt = path.relative(filePath, interfaceFilePath)
      const ext = path.extname(interfacePathWithExt);
      const interfacePath = interfacePathWithExt.replace(ext, '')
      await createTsFile(config, {
        project,
        filePath: tsFilePath,
        data: jsonData,
        interfacePath
      });
    }
    if (config.createJsonFile) {
      await createJsonFile(config, project, jsonFilePath, jsonData);
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    processBar.increment({filename: apiPath})
    // log.success(`   ${apiPath} update success`);
  }
  processBar.stop();
  log.info("step4: success")
};

export const main = async (org_config: IConfig) => {
  setRunTimeConfig(org_config);
  let config = getRunTimeConfig();
  const project = await createProject(config);
  // if (config.transform || config.clearJsonFile) {
  //   return transform(config, project, config.output);
  // }
  for (const key in config.serviceMap) {
    const apiUri = config.serviceMap[key as keyof typeof config.serviceMap];
    await fetchData(
      config,
        {
          project,
          apiUri,
          prefix: config.serviceNameToPath ? key : "./"
        }
    );
  }
};
