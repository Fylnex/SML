import type { AvatarProps } from '@nuxt/ui'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type UserRole = 'root' | 'admin' | 'admin_edu' | 'admin_lab' | 'admin_users_groups' | 'admin_moduls' | 'admin_audit' | 'teacher' | 'student'

export type Permission = 
  // Системные операции
  | 'system.manage' | 'system.backup' | 'system.logs.view' | 'system.config'
  // Управление пользователями
  | 'users.create' | 'users.edit' | 'users.delete' | 'users.view' | 'users.roles.assign'
  // Управление группами
  | 'groups.create' | 'groups.edit' | 'groups.delete' | 'groups.view'
  | 'students.create' | 'students.edit' | 'students.delete' | 'students.assign_to_group'
  // Образовательные модули и курсы
  | 'course.create' | 'course.edit' | 'course.delete' | 'course.view' | 'course.assign_to_groups'
  | 'modules.create' | 'modules.edit' | 'modules.delete' | 'modules.view'
  // Лабораторные работы
  | 'lab.create' | 'lab.edit' | 'lab.delete' | 'lab.view' | 'lab.execute' | 'lab.reset'
  | 'lab.assign_to_groups' | 'lab.template'
  // Docker контейнеры
  | 'container.create' | 'container.start' | 'container.stop' | 'container.delete'
  | 'container.console' | 'container.logs' | 'container.resources.manage'
  // Оценки и результаты
  | 'grades.create' | 'grades.edit' | 'grades.view' | 'grades.view_group' | 'grades.export'
  | 'results.download'
  // Мониторинг и аудит
  | 'audit.view' | 'audit.view_groups' | 'audit.export'
  | 'monitoring.view' | 'monitoring.resources'
  | 'reports.generate' | 'reports.groups'
  // Файлы и ресурсы
  | 'files.upload' | 'files.download' | 'files.delete' | 'files.share'

export type PermissionLevel = 'full' | 'limited' | 'none'

export interface Role {
  id: string
  name: string
  description: string
  permissions: Record<Permission, PermissionLevel>
}

export interface RolePermission {
  permission: Permission
  level: PermissionLevel
}
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  login: string
  avatar?: AvatarProps
  status: UserStatus
  role: UserRole
  group: string
  enabled: boolean
  startDate: string | null
  endDate: string | null
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
