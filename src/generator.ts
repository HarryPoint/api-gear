import { CodeBlockWriter, SourceFile, WriterFunction } from 'ts-morph';
import _ from 'lodash';

type IParametersItem = {
    in: 'body' | 'query' | 'path';
    name: string;
    required: boolean;
    description: string;
    type?: string;
};

function formatName(name: string) {
    return name.split(/\W/).map(_.upperFirst).join('_');
}

function formatPropertyName(name: string) {
    return /\W/.test(name) ? `"${name}"` : name;
}

function formatRef(ref: string) {
    return formatName(ref?.replace('#/definitions/', '') ?? '');
}

function objectWriter<T = any>(metaArr: T[] | Record<string, T>, callback: (writer: CodeBlockWriter, item: T, index: number, key?: string) => void): WriterFunction {
    return (writer) => {
        writer.write('{');
        if (Array.isArray(metaArr)) {
            for (let i = 0; i < metaArr.length; i++) {
                const metaItem = metaArr[i];
                if (i > 0) {
                    writer.write(',');
                }
                callback(writer, metaItem, i);
            }
        } else {
            let i = 0;
            for (const key in metaArr) {
                const metaItem = metaArr[key];
                if (i > 0) {
                    writer.write(',');
                }
                callback(writer, metaItem, i, key);
                i++;
            }
        }
        writer.write('}');
    };
}

export async function generator(options: {
    definitionsFile: SourceFile;
    route?: string;
    data: any;
    mode?: 'all' | 'method' | 'interface';
    interfacePath?: string;
    fetchMethodPath?: string;
    fetchMethodName?: string;
    tagsCreator?: (arg: { data: any; route: string; apiPath: string; methodType: string; methodMetaData: any }) => { tagName: string; text: string }[];
}) {
    const interfaceCollector: string[] = [];

    const {
        definitionsFile,
        data,
        mode = 'all',
        route = 'swagger/index.html#',
        interfacePath = '@/autoApi/types',
        fetchMethodPath = '@/common/utils/axios',
        fetchMethodName = 'apiFetch',
        tagsCreator = () => [],
    } = options;

    function typeWriterFnCreator(propertiesValue: any): WriterFunction {
        return (writer) => {
            if (propertiesValue.allOf) {
                propertiesValue.allOf.forEach((item: any, index: number) => {
                    writer.write(`${index !== 0 ? '&' : ''}`);
                    typeWriterFnCreator(item)(writer);
                });
                return;
            }
            if (propertiesValue.$ref) {
                const refName = formatRef(propertiesValue.$ref);
                interfaceCollector.push(refName);
                writer.write(formatRef(propertiesValue.$ref));
                return;
            }
            if (propertiesValue.schema) {
                typeWriterFnCreator(propertiesValue.schema)(writer);
                return;
            }
            switch (propertiesValue.type) {
                case 'boolean':
                    return writer.write('boolean');
                case 'integer':
                case 'number':
                    return writer.write('number');
                case 'string':
                    return writer.write('string');
                case 'array':
                    typeWriterFnCreator(propertiesValue.items)(writer);
                    return writer.write('[]');
                case 'object':
                    if (propertiesValue.properties) {
                        objectWriter(propertiesValue.properties, (writer, item, _index, key) => {
                            writer.write(formatPropertyName(key as string));
                            if (!propertiesValue.required?.includes(key)) {
                                writer.write('?');
                            }
                            writer.write(':');
                            typeWriterFnCreator(item)(writer);
                        })(writer);
                        return;
                    }
                    return writer.write('any');
                case 'null':
                    return writer.write('any');
                default:
                    if (propertiesValue.type !== undefined) {
                        console.log('miss propertiesValue.type', propertiesValue.type, propertiesValue);
                    }
                    return writer.write('any');
            }
        };
    }

    function createFetchFunction(apiPath: string, methodType: string, methodMetaData: any) {
        const methodNameUpperCase = methodType.toUpperCase();
        const functionDefine = definitionsFile.addFunction({
            name: methodNameUpperCase,
            isExported: true,
        });

        functionDefine.addJsDoc({
            description: methodMetaData.summary,
            tags: [
                {
                    tagName: 'desc',
                    text: `${methodMetaData['description'] ?? ''}`,
                },
                ...tagsCreator({ data, route, apiPath, methodType, methodMetaData }),
            ],
        });
        functionDefine.addParameter({
            name: 'options',
            type: (writer) => {
                let keyCount = 0;
                writer.write('{');
                // path
                {
                    const pathArr = methodMetaData.parameters?.filter((item: IParametersItem) => item.in === 'path') ?? [];
                    if (pathArr.length) {
                        if (keyCount) {
                            writer.write(',');
                        }
                        writer.write('path:');
                        objectWriter<IParametersItem>(pathArr, (writer, item) => {
                            writer.write(`${formatPropertyName(item.name)}${item.required ? '' : '?'}: `);
                            typeWriterFnCreator(item)(writer);
                        })(writer);
                        keyCount++;
                    }
                }
                // query
                {
                    const queryArr = methodMetaData.parameters?.filter((item: IParametersItem) => item.in === 'query') ?? [];
                    if (queryArr.length) {
                        if (keyCount) {
                            writer.write(',');
                        }
                        writer.write('params:');
                        objectWriter<IParametersItem>(queryArr, (writer, item) => {
                            writer.write(`${formatPropertyName(item.name)}${item.required ? '' : '?'}: `);
                            typeWriterFnCreator(item)(writer);
                        })(writer);
                        keyCount++;
                    }
                }
                // body data
                {
                    const bodyArr = methodMetaData.parameters?.filter((item: IParametersItem) => item.in === 'body') ?? [];
                    if (bodyArr.length) {
                        if (keyCount) {
                            writer.write(',');
                        }
                        writer.write('data:');
                        typeWriterFnCreator(bodyArr[0])(writer);
                        keyCount++;
                    }
                }
                writer.write('}');
            },
        });
        functionDefine.addParameter({
            name: 'extraOptions',
            type: 'any',
            hasQuestionToken: true,
        });
        functionDefine.setBodyText((writer) => {
            writer.write(`return ${fetchMethodName}<`);
            // any
            const responseMetaData = methodMetaData.responses?.['200']?.schema;
            if (responseMetaData) {
                typeWriterFnCreator(responseMetaData)(writer);
            } else {
                writer.write('any');
            }
            writer.write(`>({
                url: "${apiPath}",
                method: "${methodNameUpperCase}",
                ...options,
            }, extraOptions)`);
        });
    }

    function metaDataToDefine(metaData: any, name: string, isExported = false) {
        switch (metaData.type) {
            case 'object':
                const interfaceDefine = definitionsFile.addInterface({
                    name,
                    isExported,
                });
                if (metaData.properties) {
                    for (const propertiesKey in metaData.properties) {
                        const propertiesValue = metaData.properties[propertiesKey];
                        interfaceDefine.addProperty({
                            name: formatPropertyName(propertiesKey),
                            type: typeWriterFnCreator(propertiesValue),
                            // trailingTrivia: propertiesValue.description,
                            leadingTrivia: `/** ${propertiesValue.description} */\n`,
                            hasQuestionToken: !propertiesValue.required?.includes(propertiesKey),
                        });
                    }
                }
                return;
            case 'string':
                if (metaData.enum) {
                    const enumDefine = definitionsFile.addEnum({
                        isExported,
                        name,
                    });
                    for (let i = 0; i < metaData.enum.length; i++) {
                        const value = metaData.enum[i];
                        enumDefine.addMember({
                            name: metaData['x-enum-varnames']?.[i] ?? value,
                            value,
                        });
                    }
                    return;
                }
                console.log('metaData', metaData);
                return;
            default:
                console.log('miss metaData.type', metaData.type);
        }
    }

    if (mode === 'all' || mode === 'method') {
        for (const apiPath in data.paths) {
            // @ts-ignore
            let methodMetaDataMap = data.paths[apiPath];
            for (const methodType in methodMetaDataMap) {
                const fullApiPathOrigin = `${data.basePath ?? ''}` + apiPath;
                const fullApiPath = fullApiPathOrigin.replace(/\/\//g, '/');
                createFetchFunction(fullApiPath, methodType, methodMetaDataMap[methodType]);
            }
        }
        definitionsFile.addImportDeclaration({
            namedImports: [fetchMethodName],
            // defaultImport: fetchMethodName,
            moduleSpecifier: fetchMethodPath,
        });
    }

    if (mode === 'all' || mode === 'interface') {
        for (const definitionsKey in data.definitions) {
            const interfaceName = formatName(definitionsKey);
            // @ts-ignore
            const metaData = data.definitions[definitionsKey] as any;
            metaDataToDefine(metaData, interfaceName, true);
        }
    }

    if (mode === 'method' && interfacePath) {
        const namedImports = Array.from(new Set(interfaceCollector));
        if (namedImports.length) {
            definitionsFile.addImportDeclaration({
                namedImports,
                moduleSpecifier: interfacePath,
            });
        }
    }

    definitionsFile.formatText();
    definitionsFile.saveSync();
}
