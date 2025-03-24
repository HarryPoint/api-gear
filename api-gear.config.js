const path = require("path");
const argv = require("yargs").argv;

const platformMap = {
  sit: "https://sit-phv-admin-service.fms-sit.lylo.tech",
  // sit: "https://sit-open-api.fms-sit.lylo.tech",
};

const serviceMap = {
  "admin-portal": "/swagger/doc.json",
  // "fms": "/swagger/fms-service.swagger.json",
};

const apiMap = Object.keys(platformMap)
  .map((platform) => ({
    [platform]: Object.keys(serviceMap)
      .map((service) => ({
        [service]: `${platformMap[platform]}${serviceMap[service]}`,
      }))
      .reduce((prev, next) => ({ ...prev, ...next }), {}),
  }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});

console.log(apiMap);

module.exports = () => {
  console.log("argv.platform: ", argv.platform, apiMap.dev);
  return {
    output: path.resolve(__dirname, "./openapi"),
    // serviceMap: apiMap.sit,
    serviceMap: {
      "admin-portal": "http://127.0.0.1:8080/app.swagger.json"
    },
    createJsonFile: true,
    interfaceFileName: 'typesssss.ts',
    fetchMethodPath: '@/fetchMethodPath',
    fetchMethodName: 'fetchMethodName',
    translate: true,
    sort: true,
    auth: {
      username: "lumens",
      password: "fmsservice",
    },
  };
};
