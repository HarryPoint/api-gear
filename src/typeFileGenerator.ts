import {generator} from "./generator";
import {Project} from "ts-morph";

export function typeFileGenerator(options: {project: Project, filePath: string, data: any}) {
    let {filePath, project, data} = options;
    const definitionsFile = project.createSourceFile(filePath, "", {
        overwrite: true,
    });
    return generator({definitionsFile, data, mode: 'interface'})
}