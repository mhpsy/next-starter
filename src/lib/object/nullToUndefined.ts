/**
 * 将对象中的 null 值转换为 undefined
 * @param obj 需要处理的对象
 * @returns 处理后的对象
 */

type NullToUndefined<T> = {
  [K in keyof T]: T[K] extends null ? undefined : T[K] extends object ? NullToUndefined<T[K]> : T[K]
}

type ReplaceNullWithUndefined<T extends object> = {
  [k in keyof T]: Extract<T[k], null> extends null ? Exclude<T[k], null> | undefined : T[k]
}

export function nullToUndefined<T extends Record<string, any>>(obj: T): ReplaceNullWithUndefined<T> {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const result = { ...obj } as { [K in keyof T]: any }

  Object.keys(result).forEach((key) => {
    const k = key as keyof typeof result
    if (result[k] === null) {
      result[k] = undefined
    }
    else if (typeof result[k] === 'object' && result[k] !== null) {
      // 递归处理嵌套对象
      result[k] = nullToUndefined(result[k])
    }
  })

  return result as T
}
