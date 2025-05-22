const path = require('path');
const argv = require('yargs').argv;
const data = require('./demo.json');

const platformMap = {
    sit: 'https://sit-phv-admin-service.fms-sit.lylo.tech',
    // sit: "https://sit-open-api.fms-sit.lylo.tech",
};

const serviceMap = {
    'admin-portal': '/swagger/doc.json',
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

module.exports = () => {
    console.log('argv.platform: ', argv.platform, apiMap.dev);
    return [
        {
            output: path.resolve(__dirname, './openapi'),
            // serviceMap: apiMap.sit,
            source: {
                data,
            },
            createJsonFile: true,
            interfaceFileName: 'typesssss.ts',
            fetchMethodPath: '@/fetchMethodPath',
            fetchMethodName: 'fetchMethodName',
            translate: true,
            sort: true,
            auth: {
                username: 'lumens',
                password: 'fmsservice',
            },
            tagsCreator: () => [
                {
                    tagName: 'authorlalal',
                    text: 'lumesdfsdfns',
                },
            ],
            beforeSaveHook: async ({ sourceFile, mode, data }) => {
                if (mode === 'method') {
                    const getFunction = sourceFile.getFunction('GET');
                    if (getFunction) {
                        const optionsParam = getFunction.getParameter('options');
                        if (optionsParam) {
                            const type = optionsParam.getType();
                            const headersProp = type.getProperty('headers');
                            if (headersProp) {
                                const newType = type
                                    .getProperties()
                                    .map((prop) => {
                                        if (prop.getName() === 'headers') {
                                            return `${prop.getName()}?: ${prop.getTypeAtLocation(optionsParam).getText()}`;
                                        }
                                        return `${prop.getName()}${prop.isOptional() ? '?' : ''}: ${prop.getTypeAtLocation(optionsParam).getText()}`;
                                    })
                                    .join(', ');
                                optionsParam.setType(`{ ${newType} }`);
                            }
                        }
                    }
                }
            },
        },
    ];
};
