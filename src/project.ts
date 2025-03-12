import { NewLineKind, Project } from "ts-morph";
import { IConfig } from "./config";
import { createDefinitions } from "./createDefinitions";
import {generator} from "./generator";

export const main = async (config: IConfig) => {
  const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
    manipulationSettings: {
      newLineKind:
        config.newLineKind === "LF"
          ? NewLineKind.LineFeed
          : NewLineKind.CarriageReturnLineFeed,
    },
  });
  project.addSourceFilesAtPaths(`${config.output}/**/*.ts`);
  return project;
};

export const createTsFile = async (
  config: IConfig,
  project: Project,
  filePath: string,
  data: any
) => {
  const definitionsFile = project.createSourceFile(filePath, "", {
    overwrite: true,
  });
  await generator({definitionsFile, data, mode: 'method', interfacePath: config.interfacePath, fetchMethodPath: config.fetchMethodPath})
  definitionsFile.saveSync();
};

export const createJsonFile = async (
  config: IConfig,
  project: Project,
  filePath: string,
  data: any
) => {
  const definitionsFile = project.createSourceFile(
    filePath,
    JSON.stringify(data, null, 2),
    {
      overwrite: true,
    }
  );
  definitionsFile.saveSync();
};
