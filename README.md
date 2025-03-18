# api-gear

[![NPM][npm-version-image]][npm-version-url]

api-gear is an efficient engineering tool that can convert Swagger (version 2) documents into TypeScript files. The main goal of this tool is to automate the type definitions of backend interfaces, convert them into frontend code, thereby eliminating the need for manual type definition writing.

By using api-gear, you can greatly improve development efficiency, reduce errors, and ensure the type consistency of front-end and back-end interfaces. This tool is particularly suitable for use in large projects, which may contain a large number of interfaces and type definitions.

English | [简体中文](./README.zh-CN.md)

### Application scenario
1. swagger generates request code.
2. swagger generates interfaces and enums

### Main Features

1. Automation: With just one-time setup, you can automatically convert backend Swagger documents into TypeScript files.
2. Accuracy: By generating type definitions directly from Swagger documents, you can ensure the type consistency of front-end and back-end interfaces.
3. High Efficiency: The need for manual writing and updating of type definitions is eliminated, greatly improving development efficiency.
4. Convenience: It can be used as a command-line tool to directly convert Swagger data into TypeScript files, and it also supports clearing Swagger JSON data files after conversion.
5. Lightweight: The generated code content has no built-in request method and can be easily integrated into existing projects, just as if you were writing code by hand.
6. Customization: extraOptions can meet your custom needs, and this parameter will not be used in the tool.

> Subsequent versions may provide more customized solutions, but currently the tool only performs one task, converting Swagger to TS.

### How to Get Started

1. Installation

```shell
npm install api-gear -D
```

1. Add a configuration file `api-gear.config.js`(this can be omitted if only using the command-line tool to convert Swagger to TypeScript)

```javascript
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

3. Configure Commands

```json
{
  "scripts": {
    "api-gear": "api-gear",
  }
}
```

4. Run the command to automatically generate interface type definitions.

> Only update the definition files.

```shell
npm run api-gear
```

5. View Help Information
```shell
npx api-gear --help
```


### Configuration

| options             |                                                                    desc                                                                    |                                               type                                                |                                default |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | -------------------------------------: |
| output              |                                                   File Generation Directory (Full Path)                                                    |                                              string                                               | path.join(process.cwd(), "./api-gear") |
| serviceMap          |                                                          Services to be Converted                                                          |                                      Record<string, string>                                       |                                   null |
| serviceNameToPath   |                                            Whether to Add Subdirectories Based on Service Name                                             |                                              boolean                                              |                                  false |
| contentTemplate     |                                                          Custom Content Template                                                           |                                    See the explanation below.                                     |             See the explanation below. |
| createTsFile        |                                                             Generate ts Files                                                              |                                              boolean                                              |                    true ( --ts=false ) |
| createJsonFile      |                                                            Generate json Files                                                             |                                              boolean                                              |                  false ( --json=true ) |
| clearJsonFile       |                                                            Clean Up json Files                                                             |                                              boolean                                              |                 false ( --type=clear ) |
| newLineKind         |                                                            End of Line Sequence                                                            |                                           'CRLF'\|'LF'                                            |                     'LF'( --nlk=CRLF ) |
| sort                | When generating interfaces, sort member names (the order of data content keys is unstable, enabling this can prevent invalid file changes) |                                              boolean                                              |                   false (--sort=true ) |
| pathFilter          |                                         Filter Target Items (Used for Updating a Single Interface)                                         |                                     (path: string) => boolean                                     |                             () => true |
| auth                |                                                                 Bear Auth                                                                  |                      (path: string) => {username: string, password: string}                       |                              undefined |

Result Example
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
```

### :copyright: License

[MIT](http://opensource.org/licenses/MIT)

### In Conclusion

Everyone is welcome to raise issues, but I hope you can provide your configuration, or provide the swagger json data where the type conversion is abnormal, and clearly describe how to reproduce the problem. I will clean up issues irregularly. Finally, I hope everyone can enjoy coding, and no longer need to write ts code related to api ☺

[npm-version-image]: https://img.shields.io/npm/v/api-gear.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/api-gear