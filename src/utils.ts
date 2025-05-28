import strip from 'strip-json-comments';

export type MaybePromise<T> = T | Promise<T>;

export function jsoncParse(data: string) {
    try {
        return new Function(`return ${strip(data).trim()}`)();
    } catch {
        // Silently ignore any error
        // That's what tsc/jsonc-parser did after all
        return {};
    }
}
