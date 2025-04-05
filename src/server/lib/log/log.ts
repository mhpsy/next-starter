import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const rootDir = process.cwd()
const logsDir = path.join(rootDir, 'logs')

// 确保日志目录存在
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true })
}

// 自定义格式
const customFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => {
    return `[${info.timestamp}]-[${info.level.padEnd(7)}] ${info.message}`
  }),
)

// 控制台格式
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.align(),
  winston.format.printf((info) => {
    return `[${info.timestamp}]-[${info.level}] ${info.message}`
  }),
)

// 错误日志轮换配置
const errorFileTransport = new DailyRotateFile({
  filename: path.join(logsDir, '%DATE%_error.log'),
  datePattern: 'YYYY-MM-DD_HH-mm',
  frequency: '10m', // 每10分钟
  maxFiles: '300d', // 保留300天
  level: 'error',
  format: customFormat,
  createSymlink: true,
  symlinkName: 'error-current.log',
})

// 组合日志轮换配置
const combinedFileTransport = new DailyRotateFile({
  filename: path.join(logsDir, '%DATE%_combined.log'),
  datePattern: 'YYYY-MM-DD_HH-mm',
  frequency: '10m', // 每10分钟
  maxFiles: '30d', // 保留30天
  format: customFormat,
  createSymlink: true,
  symlinkName: 'combined-current.log',
})

const logger = winston.createLogger({
  level: 'debug',
  format: customFormat,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    errorFileTransport,
    combinedFileTransport,
  ],
})

export default logger
