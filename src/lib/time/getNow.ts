import dayjs from 'dayjs'

export function getNowTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export function getTimestamp() {
  return dayjs().valueOf()
}

export function getUnixTimestamp() {
  return dayjs().unix()
}
