# api-gear

[![NPM][npm-version-image]][npm-version-url]

api-gear is an efficient engineering tool that can convert Swagger (version 2) documents into TypeScript files. The main goal of this tool is to automate the type definitions of backend interfaces, convert them into frontend code, thereby eliminating the need for manual type definition writing.

By using api-gear, you can greatly improve development efficiency, reduce errors, and ensure the type consistency of front-end and back-end interfaces. This tool is particularly suitable for use in large projects, which may contain a large number of interfaces and type definitions.

English | [简体中文](./README.zh-CN.md)

### Main Features

1. Automation: With just one-time setup, you can automatically convert backend Swagger documents into TypeScript files.
2. Accuracy: By generating type definitions directly from Swagger documents, you can ensure the type consistency of front-end and back-end interfaces.
3. High Efficiency: The need for manual writing and updating of type definitions is eliminated, greatly improving development efficiency.
4. Convenience: It can be used as a command-line tool to directly convert Swagger data into TypeScript files, and it also supports clearing Swagger JSON data files after conversion.

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
      yourServiceName: "your api path",
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
import { apiFetch } from "@/utils/index";
import { dto_ListDriversResponse, dto_DriverDetail, dto_DriverDetail } from "../../types";

/**
 * 获取 RentalApplication Driver 列表
 * @link /api/v1/rental-application/driver
 */
export function GET(options: { query: { search?: string, page_num?: number, page_size?: number, filter?: string } }, extraOptions: any) {
    return apiFetch<dto_ListDriversResponse>({
        url: "/api/v1/rental-application/driver",
        method: "GET",
        ...options,
    }, extraOptions)
}

/**
 * 创建 RentalApplication Driver
 * @link /api/v1/rental-application/driver
 */
export function POST(options: { data: { req: dto_DriverDetail } }, extraOptions: any) {
    return apiFetch<dto_DriverDetail>({
        url: "/api/v1/rental-application/driver",
        method: "POST",
        ...options,
    }, extraOptions)
}

```

### :copyright: License

[MIT](http://opensource.org/licenses/MIT)

### In Conclusion

Everyone is welcome to raise issues, but I hope you can provide your configuration, or provide the swagger json data where the type conversion is abnormal, and clearly describe how to reproduce the problem. I will clean up issues irregularly. Finally, I hope everyone can enjoy coding, and no longer need to write ts code related to api ☺

[npm-version-image]: https://img.shields.io/npm/v/api-gear.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/api-gear