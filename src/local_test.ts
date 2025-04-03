import {createProject, createInterfaceFile, createTsFile} from "./project"
import {defaultConfig} from './config'
import path from "path";
import data from '../demo.json'

const config = {
    ...defaultConfig,
}


const init = async () => {
    const project = await createProject(defaultConfig)
    // await createInterfaceFile(config, {project, filePath: path.join(config.output, '/sdfsdf/types.ts'), data })
    await createTsFile(config, {project, filePath: path.join(config.output, '/sdfsdf/types.ts'), data, interfacePath: 'sdfsf' })

}

init().then(res => {

})
