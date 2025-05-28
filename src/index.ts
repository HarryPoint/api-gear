// import { version } from '../package.json';

// import { loadConfig } from './load';
import { type MaybePromise } from './utils';
import type { IConfig } from './config';
// import { log } from './log';

type Options = Partial<IConfig>;

export type { Options };

export const defineConfig = (fn: ((arg: Options, options: any) => Promise<Options[]>) | Options[]) => {
    if (typeof fn === 'function') {
        return fn;
    }
    return async (_arg: Options, _options: any) => {
        return fn;
    };
};

// export async function build(_options: Options) {
//     const config = _options.config === false ? {} : await loadConfig(process.cwd(), _options.config === true ? undefined : _options.config);

//     const configData = typeof config.data === 'function' ? await config.data(_options) : config.data;

//     await Promise.all(
//         [...(Array.isArray(configData) ? configData : [configData])].map(async (item) => {
//             log.info('CLI', `api-gear v${version}`);

//             if (config.path) {
//                 log.info('CLI', `Using tsup config: ${config.path}`);
//             }
//         })
//     );
// }
