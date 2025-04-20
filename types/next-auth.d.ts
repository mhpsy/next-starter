import 'next-auth'

declare module 'next-auth' {
  interface User {
    /** 用户ID */
    id: string
    /** 用户头像 */
    avatar?: string
    /** 用户电话 */
    phone?: string
    /** 用户名 */
    username: string
    /** 用户邮箱 */
    email: string
    /** 用户时区 */
    timezone?: string
    /** 用户类型 0: 管理员 1: 普通用户 2: 访客 */
    user_type?: number
    /** 部门ID */
    department_id?: number
    /** 最后登录IP */
    login_ip?: string
    /** 最后登录时间 */
    login_at?: Date
    /** 排序 */
    sort?: number
    /** 状态 0: 正常 1: 禁用 */
    status?: number
    /** 删除标志 0: 正常 1: 已删除 */
    delete_flag?: number
    /** 创建者ID */
    created_by_id?: number
    /** 创建者名称 */
    created_by_name?: string
    /** 更新者ID */
    updated_by_id?: number
    /** 更新者名称 */
    updated_by_name?: string
    /** 创建时间 */
    created_at?: Date
    /** 更新时间 */
    updated_at?: Date
    /** 备注 */
    remark?: string
  }

  interface Session {
    user: User
  }
}
