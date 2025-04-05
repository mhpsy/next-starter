/**
 * 基础模型字段
 * 这个接口定义了所有模型共用的基础字段
 */
export interface BaseModel {
  /** 排序 eg:1 */
  sort: number
  /** 状态 0: 正常 1: 禁用 */
  status: number
  /** 删除标志 0: 正常 1: 已删除 */
  delete_flag: number
  /** 创建者ID */
  created_by_id: number | null
  /** 创建者名称 */
  created_by_name: string | null
  /** 更新者ID */
  updated_by_id: number | null
  /** 更新者名称 */
  updated_by_name: string | null
  /** 创建时间 */
  created_at: Date
  /** 更新时间 */
  updated_at: Date
}

/**
 * 创建基础模型参数
 * 用于新建记录时提供的基础字段默认值
 */
export function createBaseModelParams(userId?: number, userName?: string) {
  return {
    sort: 0,
    status: 0,
    delete_flag: 0,
    created_by_id: userId || null,
    created_by_name: userName || null,
    updated_by_id: userId || null,
    updated_by_name: userName || null,
  }
}

/**
 * 更新基础模型参数
 * 用于更新记录时提供的基础字段值
 */
export function updateBaseModelParams(userId?: number, userName?: string) {
  return {
    updated_by_id: userId || null,
    updated_by_name: userName || null,
  }
}
