import logger from './log'

/**
 * 日志级别类型
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

/**
 * 格式化参数为字符串
 * @param args 需要格式化的参数
 * @returns 格式化后的字符串
 */
function formatArgs(args: any[]): string {
  return args.length > 0
    ? ` ${args.map((arg) => {
      try {
        return typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      }
      catch (err) {
        return '[无法序列化的对象]'
      }
    }).join(' ')}`
    : ''
}

/**
 * 创建日志函数
 * @param level 日志级别
 * @returns 对应级别的日志函数
 */
function createLogFunction(level: LogLevel) {
  return (message: string, ...args: any[]) => {
    const formattedMessage = `${message} ${formatArgs(args)}\n`
    logger[level](formattedMessage)
  }
}

/**
 * 主日志函数
 * 默认使用 info 级别记录日志
 */
export function log(message: string, ...args: any[]) {
  const formattedMessage = `${message} ${formatArgs(args)}\n`
  logger.info(formattedMessage)
}

// 为主日志函数添加各个日志级别的方法
log.debug = createLogFunction('debug')
log.info = createLogFunction('info')
log.warn = createLogFunction('warn')
log.error = createLogFunction('error')

// 导出单独的日志函数，便于直接使用
export const debug = createLogFunction('debug')
export const info = createLogFunction('info')
export const warn = createLogFunction('warn')
export const error = createLogFunction('error')

// 默认导出日志对象
export default {
  log,
  debug,
  info,
  warn,
  error,
}
