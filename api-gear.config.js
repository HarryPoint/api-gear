const path = require("path");
const argv = require("yargs").argv;

const platformMap = {
  dev: "https://sit-open-api.fms-sit.lylo.tech",
};

const serviceMap = {
  // "masterdata-service": 16700,
  // "plk-uaa-service": 18100,
  // "flow-service": 16500,
  // "todo-service": 16600,
  "app-enterprise-web": "/swagger/fms-service.swagger.json",
  // "message-notification-service": 17600,
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

module.exports = () => {
  console.log("argv.platform: ", argv.platform, apiMap.dev);
  return {
    output: path.resolve(__dirname, "./openapi"),
    serviceMap: apiMap.dev,
    translate: true,
    sort: true,
    auth: {
      username: "lumens",
      password: "fmsservice",
    },
  };
};
