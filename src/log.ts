
type LogFn = typeof console.log

export const log: Record<"success" | "info" | "warning" | "error", LogFn> = {
    success: (...arg) => console.log(...arg),
    info: (...arg) => console.log(...arg),
    warning: (...arg) => console.log(...arg),
    error: (...arg) => console.log(...arg),
}
