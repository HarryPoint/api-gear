# api-gear

[![NPM][npm-version-image]][npm-version-url]

api-gear 是一个高效的工程化工具，它可以将 Swagger（v2版本） 文档转换为 TypeScript 文件。这个工具的主要目标是自动化后端接口的类型定义，将其转换为前端代码，从而消除了手动编写类型定义的需求。

通过使用 api-gear，你可以大大提高开发效率，减少错误，并确保前后端接口的类型一致性。这个工具特别适合在大型项目中使用，其中可能包含大量的接口和类型定义。

[English](./README.md) | 简体中文

### 主要特性

1. 自动化：只需一次设置，就可以自动将后端的 Swagger 文档转换为 TypeScript 文件。
2. 准确性：通过直接从 Swagger 文档生成类型定义，可以确保前后端接口的类型一致性。
3. 高效率：消除了手动编写和更新类型定义的需求，从而大大提高了开发效率。
4. 便捷性：可以作为命令行工具直接转换swagger数据为 TypeScript 文件，同时支持转换后清除swagger JSON 数据文件。

### 如何开始

1. 安装

```shell
npm install api-gear -D
```

2. 添加配置文件 `api-gear.config.js`（如果仅做命令行工具转换swagger为TypeScript可以省略）

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

3. 配置命令

```json
{
  "scripts": {
    "api-gear": "api-gear",
  }
}
```

4. 运行命令， 自动生成接口类型定义

> 仅更新定义文件

```shell
npm run api-gear
```

5. 帮助信息查看
```shell
npx api-gear --help
```


### 配置项

| 选项名称            |                                        描述                                        |                                               类型                                                |                                 默认值 |
| :------------------ | :--------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | -------------------------------------: |
| output              |                               文件生成目录(完整路径)                               |                                              string                                               | path.join(process.cwd(), "./api-gear") |
| serviceMap          |                                   需要转换的服务                                   |                                      Record<string, string>                                       |                                   null |
| serviceNameToPath   |                            是否根据服务名称添加子级目录                            |                                              boolean                                              |                                  false |
| createTsFile        |                                   是否生成ts文件                                   |                                              boolean                                              |                true ( --ts=false 修改) |
| createJsonFile      |                                  是否生成json文件                                  |                                              boolean                                              |              false ( --json=true 修改) |
| clearJsonFile       |                                  是否清理json文件                                  |                                              boolean                                              |             false ( --type=clear 修改) |
| newLineKind         |                                      行尾序列                                      |                                           'CRLF'\|'LF'                                            |                 'LF'( --nlk=CRLF 修改) |
| sort                | 生成interface时，对成员名称排序(数据内容key顺序不稳定，开启可以防止无效的文件变更) |                                              boolean                                              |               false (--sort=true 修改) |
| pathFilter          |                           过滤目标项（用于更新单个接口）                           |                                     (path: string) => boolean                                     |                             () => true |
| auth                |                                     Bear Auth                                      |                      (path: string) => {username: string, password: string}                       |                              undefined |

结果示例
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

### 写在最后

欢迎大家提 issue, 但希望您能提供你的配置，或者给出类型转换有异常的swagger json 数据，描述清楚如何复现问题。我将不定期清理issue。最后希望大家都能愉快coding, 不用再写api相关的ts代码☺

[npm-version-image]: https://img.shields.io/npm/v/api-gear.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/api-gear