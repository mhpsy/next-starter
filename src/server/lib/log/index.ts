import logger from './log'

function info(message: string) {
  logger.info(message)
}

function debug(message: string) {
  logger.debug(message)
}

function warn(message: string) {
  logger.warn(message)
}

function error(message: string) {
  logger.error(message)
}

function log(message: string, ...args: any[]) {
  logger.log({
    level: 'info',
    message: `${message} ${args.map(arg => JSON.stringify(arg)).join(' ')}`,
  })
}

export {
  debug,
  error,
  info,
  log,
  warn,
}
