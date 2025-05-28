import fs from 'node:fs';
import path from 'node:path';
import JoyCon from 'joycon';
import { bundleRequire } from 'bundle-require';
import { jsoncParse } from './utils';
import type { defineConfig } from './';

const joycon = new JoyCon();

const loadJson = async (filepath: string) => {
    try {
        return jsoncParse(await fs.promises.readFile(filepath, 'utf8'));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to parse ${path.relative(process.cwd(), filepath)}: ${error.message}`);
        } else {
            throw error;
        }
    }
};

const jsonLoader = {
    test: /\.json$/,
    load(filepath: string) {
        return loadJson(filepath);
    },
};

joycon.addLoader(jsonLoader);

export async function loadConfig(cwd: string, configFile?: string): Promise<ReturnType<typeof defineConfig>> {
    const configJoycon = new JoyCon();
    const configPath = await configJoycon.resolve({
        files: configFile
            ? [configFile]
            : ['api-gear.config.ts', 'api-gear.config.cts', 'api-gear.config.mts', 'api-gear.config.js', 'api-gear.config.cjs', 'api-gear.config.mjs', 'api-gear.config.json', 'package.json'],
        cwd,
        stopDir: path.parse(cwd).root,
        packageKey: 'api-gear',
    });

    if (configPath) {
        if (configPath.endsWith('.json')) {
            let data = await loadJson(configPath);

            data = data['api-gear'];

            return async () => data;
        }

        const config = await bundleRequire({
            filepath: configPath,
        });
        return config.mod.default || config.mod;
    }

    return async () => [];
}
