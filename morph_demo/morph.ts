import {CodeBlockWriter, NewLineKind, Project, StructureKind, WriterFunction} from "ts-morph";
import {generator} from '../src/generator'
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
generator({
    definitionsFile,
    data
})

