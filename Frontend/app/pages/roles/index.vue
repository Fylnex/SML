<script setup lang="ts">
import type { Permission, PermissionLevel } from '~/types'

const { data: roles, pending } = await useFetch('/api/roles')

// Используем данные из API
const rolesData = computed(() => roles.value || [])

// Функция для получения всех привилегий роли в виде строки
const getRolePermissions = (role: any) => {
  const permissions = []
  for (const [permission, level] of Object.entries(role.permissions)) {
    if (level === 'full') {
      permissions.push(permission)
    } else if (level === 'limited') {
      permissions.push(`${permission} (ограниченно)`)
    }
  }
  return permissions.length > 0 ? permissions.join(', ') : '-'
}

// Функция для проверки, является ли роль встроенной
const isBuiltIn = (roleId: string) => {
  const builtInRoles = ['root', 'admin', 'admin_edu', 'admin_lab', 'admin_users_groups', 'admin_moduls', 'admin_audit', 'teacher', 'student']
  return builtInRoles.includes(roleId)
}
</script>

<template>
  <UDashboardPanel id="roles">
    <template #header>
      <UDashboardNavbar title="Роли">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton icon="i-lucide-plus" size="sm">
            Создать роль
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Загрузка -->
        <div v-if="pending" class="flex justify-center py-8">
          <UIcon name="i-lucide-loader-2" class="animate-spin text-2xl" />
        </div>

        <!-- Таблица ролей -->
        <UCard v-if="!pending">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left p-3 font-medium text-gray-900 dark:text-white w-32">
                    <div class="flex items-center gap-2">
                      Встроенная
                      <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
                    </div>
                  </th>
                  <th class="text-left p-3 font-medium text-gray-900 dark:text-white w-48">
                    Имя
                  </th>
                  <th class="text-left p-3 font-medium text-gray-900 dark:text-white">
                    Привилегии
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="role in rolesData" 
                  :key="role.id" 
                  class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td class="p-3 text-gray-600 dark:text-gray-400 w-32">
                    {{ isBuiltIn(role.id) ? 'Да' : 'Нет' }}
                  </td>
                  <td class="p-3 w-48">
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ role.name }}
                    </div>
                  </td>
                  <td class="p-3 text-gray-600 dark:text-gray-400">
                    <div class="w-full">
                      {{ getRolePermissions(role) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>