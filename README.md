[npm-version-image]: https://img.shields.io/npm/v/api-gear.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/api-gear

# api-gear

快速将 `Swagger` 数据转换为 请求代码 和 类型定义。

‼️重要：如果这个项目对你有帮助，请给项目点个[Star](https://github.com/HarryPoint/api-gear)支持一下吧😊！


[![NPM][npm-version-image]][npm-version-url]

## 内容列表
- [api-gear](#api-gear)
  - [内容列表](#内容列表)
  - [适用场景](#适用场景)
  - [主要特性](#主要特性)
  - [快速开始](#快速开始)
    - [安装](#安装)
    - [在项目根目录添加配置文件 `api-gear.config.js`](#在项目根目录添加配置文件-api-gearconfigjs)
    - [编写`apiFetch`方法](#编写apifetch方法)
    - [在项目内的`package.json`中配置命令](#在项目内的packagejson中配置命令)
    - [运行命令， 生成接口类型定义](#运行命令-生成接口类型定义)
  - [生成示例](#生成示例)
  - [配置说明](#配置说明)
  - [类型](#类型)
  - [Star History](#star-history)
  - [License](#license)
  - [写在最后](#写在最后)

## 适用场景

主要包含两部分功能：
1. 自动生成类型完备的请求代码；
2. 自动生成并导出生成的 `interface` `enum`；

⚠️ 功能非常简单，没有魔法🪄，只做转换功能，没有内置的请求实现，所以需要自行在项目中实现 `apiFetch` 方法。

## 主要特性

1. 自动化：只需一次设置，就可以自动将后端的 `Swagger` 文档转换为 `TypeScript` 文件。
2. 准确性：通过直接从 `Swagger` 文档生成类型定义，极大减少前后端程序员的沟通成本。
3. 高效率：自动生成请求代码和类型定义，极大提高了开发效率。
4. 可维护：自动生成的`interface` `enum` 默认导出，可以在业务代码直接使用，极大的提高了代码的可维护性。
5. 无侵入：无预设请求框架，仅生成请求方法调用，与手写代码保持完全一致。
6. 自定义：`extraOptions` 可以满足你的自定义需求，这个参数工具内不会使用，仅透传至调用的请求方法。
7. 多服务：可以同时配置多个代码转换服务且相互独立，对有多个后端服务需要进行API转换的情况也能简单适配。

## 快速开始

### 安装

```shell
npm install api-gear -D
```

### 在项目根目录添加配置文件 `api-gear.config.js`

```javascript
// file: api-gear.config.js
const path = require("path");

module.exports = () => {
    // 可以配置多个
    return [
        {
            output: path.resolve(__dirname, "./autoApi"),
            // 直接放链接地址（注意是http或https协议的资源地址）
            source: "your api path", // http://XXX/swagger/doc.json (json)
            // // 对象配置方法
            // source: {
            //     url: "your api path",
            // // if you need auth
            //     auth: {
            //         username: "xxx",
            //         password: "xx",
            //     },
            // },
            // // 直接放swagger数据
            // source: {
            //     data: {
            //         "paths": {
            //             "/v1/attachment": {
            //                 "post": {
            //                     "summary": "创建 Attachment",
            //                     "deprecated": false,
            //                     "description": "创建 Attachment",
            //                 }
            //             }
            //         }
            //         // ...
            //     }
            // },
            // // 直接放函数
            // source: {
            //     data: async () => {
            //         return {
            //             "paths": {
            //                 "/v1/attachment": {
            //                     "post": {
            //                         "summary": "创建 Attachment",
            //                         "deprecated": false,
            //                         "description": "创建 Attachment",
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }           
            // if you want add somme custom the tag
            tagsCreator: () => {
                return [
                    {
                        tagName: 'demo',
                        text: 'your text',
                    }
                ]
            }
        }
    ];
};
```

### 编写`apiFetch`方法

```typescript
import axios from "axios";

export const apiFetch = <T = any>(options: {url: string, method: "GET" | "POST" | "PUT" | "DELETE", path?: Record<string, string>, params?: Record<string, any>, data?: Record<string, any>}, extraOptions?: any ) => {
    let { path = {}, url = "", method, params, data} = options;
    Object.keys(path).forEach((key) => {
        url = url?.replace(new RegExp(`{${key}}`, 'g'), path[key] ?? '');
    });
    return axios<T>({
        url,
        method,
        params,
        data
    })
}
```

### 在项目内的`package.json`中配置命令

```json
{
  "scripts": {
    "api": "api-gear"
  }
}
```

### 运行命令， 生成接口类型定义

```shell
npm run api
```

## 生成示例

```javascript
// file:  src/autoApi/api/v1/product/index.ts
import { apiFetch } from "@/common/utils/axios";
import { Rest_Response_Dto_PaginationResponse_Ent_Products, Ent_Products, Rest_Response_Ent_Products } from "../../types";

/**
 * 获取 Product 列表
 * @author
 * @desc 获取 Product 列表
 * @link https://xxxx/swagger/index.html#/product/get_api_v1_product
 * @host https://xxx
 */
export function GET(options: { params: { page_num?: number, page_size?: number, field?: string, op?: string, value?: string } }, extraOptions?: any) {
    return apiFetch<Rest_Response_Dto_PaginationResponse_Ent_Products>({
        url: "/api/v1/product",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 创建 Product
 * @author
 * @desc 创建 Product
 * @link https://xxx/swagger/index.html#/product/post_api_v1_product
 * @host https://xxx
 */
export function POST(options: { data: { product: Ent_Products } }, extraOptions?: any) {
    return apiFetch<Rest_Response_Ent_Products>({
        url: "/api/v1/product",
        method: "POST",
        ...options,
    }, extraOptions)
}



```

```typescript jsx
// file: src/autoApi/types.ts
export interface Rest_Response_Dto_PaginationResponse_Ent_Products {
    /** xx */
    code?: number;
    /** xx */
    data?: Dto_PaginationResponse_Ent_Products;
    /** xx */
    message?: string;
    /** xx */
    trace_id?: string;
}

export enum Users_Source {
    SourceTEAM = "TEAM",
    SourceSINGPASS = "SINGPASS",
    SourceINTERNAL = "INTERNAL"
}

// ...more
```

## 配置说明

| 选项名称          |                                        描述                                        |                                                                 类型                                                                  |                                 默认值 |
| :---------------- | :--------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------: |
| output            |                               文件生成目录(完整路径)                               |                                                                string                                                                 | path.join(process.cwd(), "./api-gear") |
| interfaceFileName |                                  类型定义文件名称                                  |                                                                string                                                                 |                               types.ts |
| fetchMethodPath   |                                  请求方法路径地址                                  |                                                                string                                                                 |                   @/common/utils/axios |
| fetchMethodName   |                                    请求方法名称                                    |                                                                string                                                                 |                               apiFetch |
| source            |                                       数据源                                       |                                                            ServiceMapItem                                                             |                                   null |
| newLineKind       |                                      行尾序列                                      |                                                             'CRLF'\|'LF'                                                              |                 'LF'( --nlk=CRLF 修改) |
| sort              | 生成interface时，对成员名称排序(数据内容key顺序不稳定，开启可以防止无效的文件变更) |                                                                boolean                                                                |               false (--sort=true 修改) |
| pathFilter        |                           过滤目标项（用于更新单个接口）                           |                                                       (path: string) => boolean                                                       |                             () => true |
| source.auth       |                                     Bear Auth                                      |                                                                 Auth                                                                  |                              undefined |
| tagsCreator       |                                     自定义tags                                     | (arg: { data: any; route: string; apiPath: string; methodType: string; methodMetaData: any }) => { tagName: string; text: string }[]; |                               () => [] |
| urlCreator        |                    自定义url路径（当你需要proxy配置时特别有用）                    |         urlCreator: (arg: { data: any; route: string; apiPath: string; methodType: string; methodMetaData: any }) => string;          |                 ({apiPath}) => apiPath |
| transformDataHook |             在获取的swagger数据用于代码生成前调用，可以用于元数据调整              |                                            transformDataHook: (data: any) => Promise<any>;                                            |                        (data) => data, |
| beforeSaveHook    |                    在生成的文件保存前调用，可以用于调整文件内容                    |                      (arg: { sourceFile: SourceFile; route: string; data: any; mode: string }) => Promise<void>                       |                         async () => {} |

## 类型
```typescript jsx

export type Auth = {
    username: string;
    password: string;
}

export type ServiceMapItem = string | {
    url?: string,
    // 如果提供数据，则会优先使用提供的swagger数据进行转换, 如果是函数，则会在运行时调用，将返回的数据用于接口转换
    data?:() => Promise<any> | any,
    // 当前service发起数据请求时auth的优先顺序为 局部 auth => 全局 auth,
    auth?: Auth;
}
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=HarryPoint/api-gear&type=Date)](https://www.star-history.com/#HarryPoint/api-gear&Date)

## License

[MIT](http://opensource.org/licenses/MIT)

## 写在最后

欢迎大家提 issue, 但希望你能提供你的配置，或者给出类型转换有异常的swagger json 数据，描述清楚如何复现问题。我将不定期清理issue。希望你使用愉快。

