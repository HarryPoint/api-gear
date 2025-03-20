import axios from "axios";
import _ from "lodash";
import path from "path";
import { Project } from "ts-morph";
import { getRunTimeConfig, IConfig, setRunTimeConfig } from "./config";
import { createJsonFile, main as createProject, createTsFile } from "./project";
import { transform } from "./transform";
import {typeFileGenerator} from "./typeFileGenerator";
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
  project: Project,
  apiUri: string,
  prefix: string = "./"
) => {
  log.info("apiUri: ", apiUri);
  if (!apiUri) {
    throw new Error("apiUri not found");
  }
  const { data: originData } = await axios.get(`${apiUri}`, {
    auth: config.auth,
  });
  const basePath = path.join(config.output, prefix);

  const data = config.sort ? sortData(originData) : originData;

  const baseData = _.pick(data, ["basePath", "host", "info", "swagger"]);
  console.log(baseData);

  const interfacePath = path.join(basePath, 'types.ts');

  await typeFileGenerator({project, filePath: interfacePath, data})

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
  processBar.start(openJsonArr.length, 1);
  for (let [pathStr, jsonData] of openJsonArr) {
    const filePath = path.join(basePath, pathStr);
    const apiPath = filePath.replace(basePath, path.sep);
    const jsonFilePath = `${filePath}/index.json`;
    const tsFilePath = `${filePath}/index.ts`;
    if (config.pathFilter && !config.pathFilter(apiPath)) {
      continue;
    }
    if (config.createTsFile) {
      await createTsFile(config, project, tsFilePath, jsonData);
    }
    if (config.createJsonFile) {
      await createJsonFile(config, project, jsonFilePath, jsonData);
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    processBar.increment();
    log.success(`${apiPath} update success`);
  }
  processBar.stop();
};

export const main = async (org_config: IConfig) => {
  setRunTimeConfig(org_config);
  let config = getRunTimeConfig();
  const project = await createProject(config);
  if (config.transform || config.clearJsonFile) {
    return transform(config, project, config.output);
  }
  for (const key in config.serviceMap) {
    const apiUri = config.serviceMap[key as keyof typeof config.serviceMap];
    await fetchData(
      config,
      project,
      apiUri,
      config.serviceNameToPath ? key : "./"
    );
  }
};
