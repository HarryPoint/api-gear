const path = require("path");
const argv = require("yargs").argv;

const platformMap = {
  sit: "https://sit-phv-admin-service.fms-sit.lylo.tech",
};

const serviceMap = {
  "admin-portal": "/swagger/doc.json",
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
    serviceMap: apiMap.sit,
    translate: true,
    sort: true,
    // auth: {
    //   username: "lumens",
    //   password: "fmsservice",
    // },
  };
};
