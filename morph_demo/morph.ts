import {NewLineKind, Project, StructureKind, WriterFunction} from "ts-morph";
import data from "./data.json"

const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
    manipulationSettings: {
        newLineKind:  NewLineKind.CarriageReturnLineFeed,
    },
});
let basePath = `${process.cwd()}/morph_demo/case`;
console.log("basePath",basePath);
project.addSourceFilesAtPaths(`${basePath}/**/*.ts`);

const caseFileName = (str: string) => `${basePath}/${str}.ts`

const definitionsFile = project.createSourceFile(caseFileName('demo1'), "", {
    overwrite: true,
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

definitionsFile.addImportDeclaration({
    namedImports: ['apiFetch'],
    moduleSpecifier: '@/utils/index'
})



function formatName (name: string){
    return name.replace(".", "_")
}

function formatRef  (ref: string) {
    return formatName(ref.replace('#/definitions/', ''))
}

function typeWriterFnCreator (propertiesValue: any ): WriterFunction {
    return (writer) => {
        if(propertiesValue.allOf) {
            propertiesValue.allOf.forEach((item: {$ref: string}, index: number) => {
                const refName = formatRef(item.$ref)
                writer.write(`${index !== 0 ? '&' : ''}${refName}`)
            })
            return
        }
        if(propertiesValue.$ref) {
            writer.write(formatRef(propertiesValue.$ref))
            return;
        }
        switch (propertiesValue.type) {
            case "boolean":
                return writer.write("boolean")
            case "integer":
                return writer.write("number")
            case "string":
                return writer.write("string")
            case "array":
                typeWriterFnCreator(propertiesValue.items)(writer)
                return writer.write("[]");
            case "object":
                if(propertiesValue.properties) {
                    writer.write("{");
                    for (const propertiesKey  in propertiesValue.properties) {
                        const propertiesMeta = propertiesValue.properties[propertiesKey]
                        writer.write(propertiesKey)
                        if(!propertiesValue.required?.includes(propertiesKey)) {
                            writer.write('?')
                        }
                        writer.write(":")
                        typeWriterFnCreator(propertiesMeta)(writer)
                        writer.write(",")
                    }
                    writer.write("}");
                    return;
                }
                return writer.write("any");
            default:
                console.log('miss propertiesValue.type', propertiesValue.type, propertiesValue)
        }
    }
}

function createFetchFunction (apiPath: string, methodType: string, methodMetaData: any) {
    const functionDefine = definitionsFile.addFunction({
        name: methodType,
        isExported: true
    })
    functionDefine.addParameter({
        name: 'options',
        type: "Record<string, any>"
    })
    functionDefine.addParameter({
        name: 'extraOptions',
        type: 'any'
    })
    functionDefine.setBodyText((writer) => {
        writer.write(`return apiFetch<`)
        // any
        const responseMetaData = methodMetaData.responses?.['200']?.schema;
        if(responseMetaData) {
            typeWriterFnCreator(responseMetaData)(writer)
        } else {
            writer.write('any')
        }
        writer.write(`>({
            url: "${apiPath}",
            method: "${methodType}",
            ...options,
        }, extraOptions)`)
    })

}


function metaDataToDefine(metaData: any, name: string, isExported = false) {
    switch (metaData.type) {
        case "object":
            const interfaceDefine = definitionsFile.addInterface({
                name,
                isExported
            })
            if(metaData.properties) {
                for (const propertiesKey in metaData.properties) {
                    const propertiesValue = metaData.properties[propertiesKey];
                    interfaceDefine.addProperty({
                        name: propertiesKey,
                        type: typeWriterFnCreator(propertiesValue),
                        // trailingTrivia: propertiesValue.description,
                        leadingTrivia: `/** ${propertiesValue.description} */\n`,
                        hasQuestionToken: !propertiesValue.required?.includes(propertiesKey),
                    })
                }
            }
            return
        case "string":
            if(metaData.enum) {
                const enumDefine = definitionsFile.addEnum({
                    isExported,
                    name,
                });
                for (let i = 0; i < metaData.enum.length; i++) {
                    const value =  metaData.enum[i];
                    enumDefine.addMember({
                        name: metaData["x-enum-varnames"][i] ?? value,
                        value,
                    })
                }
                return
            }
            console.log("metaData", metaData)
            return
        default:
            console.log('miss metaData.type', metaData.type)
    }

}

for (const apiPath in data.paths) {
    // @ts-ignore
    let methodMetaDataMap = data.paths[apiPath]
    for (const methodType in methodMetaDataMap) {
        const fullApiPath = data.basePath + apiPath
        createFetchFunction(fullApiPath, methodType, methodMetaDataMap[methodType])
    }
}

for (const definitionsKey in data.definitions) {
    const interfaceName = formatName(definitionsKey);
    // @ts-ignore
    const metaData = data.definitions[definitionsKey] as any
    metaDataToDefine(metaData, interfaceName, true)
}



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

definitionsFile.formatText()
definitionsFile.saveSync();

