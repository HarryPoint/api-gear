import path from 'path';
import { defineConfig } from './src/index';

export default defineConfig(async () => {
    return [
        {
            output: path.resolve(__dirname, './autoApi/auth-server-api'),
            source: 'http://127.0.0.1:4523/export/openapi/5?version=2.0',
            fetchMethodPath: '@/base/utils/request',
        },
    ];
});
