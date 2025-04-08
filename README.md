[npm-version-image]: https://img.shields.io/npm/v/api-gear.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/api-gear

# api-gear

快速将 `Swagger` 数据转换为 请求代码 和 类型定义

[![NPM][npm-version-image]][npm-version-url]

## 内容列表
- [适用场景](#适用场景)
- [主要特性](#主要特性)
- [快速开始](#快速开始)
- [变量支持](#变量支持)
- [配置说明](#配置说明)
- [生成示例](#生成示例)
- [License](#License)
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
    return {
        output: path.resolve(__dirname, "./autoApi"),
        serviceMap: {
            yourServiceName: "your api path", // XXX/swagger/doc.json (json)
        },
        // if you need auth
        auth: {
            username: "xxx",
            password: "xx",
        },
    };
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

## 变量支持

当接口文档的url地址存在变量时，在使用方使用生成的请求函数支持`path`参数传输变量值
例如：
接口地址为： /api/accident/{id}
请求方式为： GET
使用方式：
```typescript jsx
import {GET} from "@/autoApi/api/accident/{id}"
GET({path: {id: '数据id'}})
```

## 生成示例

```javascript
// file:  src/autoApi/api/v1/product/index.ts
import { apiFetch } from "@/common/utils/axios";
import { Rest_Response_Dto_PaginationResponse_Ent_Products, Ent_Products, Rest_Response_Ent_Products } from "@/autoApi/types";

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

| 选项名称              |                        描述                        |                           类型                           |                                    默认值 |
|:------------------|:------------------------------------------------:|:------------------------------------------------------:|---------------------------------------:|
| output            |                   文件生成目录(完整路径)                   |                         string                         | path.join(process.cwd(), "./api-gear") |
| interfaceFileName            |                     类型定义文件名称                     |                         string                         |                               types.ts |
| fetchMethodPath            |                     请求方法路径地址                     |                         string                         |                   @/common/utils/axios |
| fetchMethodName            |                      请求方法名称                      |                         string                         |                   apiFetch |
| serviceMap        |                     需要转换的服务                      |                 Record<string, ServiceMapItem>                 |                                   null |
| serviceNameToPath |                  是否根据服务名称添加子级目录                  |                        boolean                         |                                  false |
| newLineKind       |                       行尾序列                       |                      'CRLF'\|'LF'                      |                   'LF'( --nlk=CRLF 修改) |
| sort              | 生成interface时，对成员名称排序(数据内容key顺序不稳定，开启可以防止无效的文件变更) |                        boolean                         |                 false (--sort=true 修改) |
| pathFilter        |                 过滤目标项（用于更新单个接口）                  |               (path: string) => boolean                |                             () => true |
| auth              |                    Bear Auth                     | (path: string) => {username: string, password: string} |                              undefined |

## 类型
```typescript jsx

export type Auth = {
    username: string;
    password: string;
}

export type ServiceMapItem = string | {
    url?: string,
    // 如果提供数据，则会优先使用提供的swagger数据进行转换
    data?: any,
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

