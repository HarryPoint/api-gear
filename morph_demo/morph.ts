import {NewLineKind, Project, WriterFunction} from "ts-morph";
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

const defineNameMap: Record<string, any> = {};

const formatName = (name: string) => name.replace(".", "_")

const formatRef = (ref: string) => ref.replace('#/definitions/', '');

const interfaceNames: string[] = []

for (const definitionsKey in data.definitions) {
    const interfaceName = formatName(definitionsKey);
    // @ts-ignore
    const metaData = data.definitions[definitionsKey] as any
    interfaceNames.push(interfaceName)
    defineNameMap[interfaceName] = metaData;
    metaDataToDefine(metaData, interfaceName, true)
}

function typeWriterFnCreator (propertiesValue: any ): WriterFunction {
   return (writer) => {
       if(propertiesValue.allOf) {
           propertiesValue.allOf.forEach((item: {$ref: string}, index: number) => {
               const refName = formatName(formatRef(item.$ref))
               writer.write(`${index !== 0 ? '&' : ''}${refName}`)
           })
           return
       }
       if(propertiesValue.$ref) {
           writer.write(formatName(formatRef(propertiesValue.$ref)))
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
               typeWriterFnCreator(propertiesValue.items)(writer);
               return
       }
   }
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
                        type: typeWriterFnCreator(propertiesValue)
                    })
                }
            }
            return
        case "string":
            if(metaData.enum) {
                definitionsFile.addEnum({
                    name,
                    members: metaData.enum?.map((value: string, index: number) => ({name: metaData["x-enum-varnames"][index] ?? value, value})),
                });
                return
            }
            console.log("metaData", metaData)
            return
        default:
            console.log('miss', metaData.type)
    }

}




definitionsFile.saveSync();

