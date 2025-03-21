import path from "path";
import { SourceFile } from "ts-morph";
import {
  contentTemplate,
  customContent,
  headerTemplate,
  transformOriginType,
} from "./template";

export type IConfig = {
  interfaceFileName: string;
  fetchMethodPath: string;
  fetchMethodName: string;
  // -----------
  interfacePrefix: string;
  enumPrefix: string;
  translate: boolean;
  translateCacheFileName: string;
  translateApiUri: string;
  translateAppKey: string;
  translateAppSecret: string;
  translateChunkSize: number;
  transform: boolean;
  serviceMap: Record<string, string>;
  serviceNameToPath: boolean;
  output: string;
  createTsFile: boolean;
  createJsonFile: boolean;
  clearJsonFile: boolean;
  newLineKind: "CRLF" | "LF";
  sort: boolean;
  transformOriginType: (define: any) => string;
  customContent: (
    data: any,
    definitionsFile: SourceFile,
    headerTemplate: string,
    contentTemplate: string,
    transFormType: (arg: any) => string
  ) => Promise<void>;
  contentTemplate: string;
  headerTemplate: string;
  pathFilter?: (ar: string) => boolean;
  auth?: {
    username: string;
    password: string;
  };
};

const output = path.join(process.cwd(), "./api-gear");

export const defaultConfig: IConfig = {
  interfaceFileName: 'types.ts',
  fetchMethodPath: '@/common/utils/axios',
  fetchMethodName: "apiFetch",
  // ----------
  translate: false,
  translateCacheFileName: "translateCache.json",
  translateApiUri: "https://openapi.youdao.com/v2/api",
  translateAppKey: "4a8802ec639e5e84",
  translateAppSecret: "mRl99kIGJSPI1TgdCn53v8J8HX0HgN19",
  translateChunkSize: 100,
  transform: false,
  interfacePrefix: "I",
  enumPrefix: "E",
  serviceMap: {},
  serviceNameToPath: false,
  createTsFile: true,
  createJsonFile: false,
  clearJsonFile: false,
  newLineKind: "LF",
  sort: false,
  output,
  transformOriginType,
  customContent,
  contentTemplate,
  headerTemplate,
  pathFilter: (ar: string) => !!ar,
};

let runTimeConfig = defaultConfig;

export const setRunTimeConfig = (config: Partial<IConfig>) => {
  runTimeConfig = { ...runTimeConfig, ...config };
};

export const getRunTimeConfig = () => {
  return runTimeConfig;
};
