<script setup lang="ts">
import type { Permission, PermissionLevel } from '~/types'

const { data: roles, pending } = await useFetch('/api/roles')

// Используем данные из API, исключая роль root
const rolesData = computed(() => {
  const allRoles = roles.value || []
  return allRoles.filter(role => role.id !== 'root')
})

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
  return permissions.length > 0 ? permissions.join(' ') : '-'
}

// Функция для проверки, является ли роль встроенной
const isBuiltIn = (roleId: string) => {
  const builtInRoles = ['admin', 'admin_edu', 'admin_lab', 'admin_users_groups', 'admin_moduls', 'admin_audit', 'teacher', 'student']
  return builtInRoles.includes(roleId)
}

// Выбранная роль
const selectedRole = ref<any>(null)

// Отслеживание выбранных ролей
const selectedRoles = ref<any[]>([])

// Функции для работы с ролями
const createRole = () => {
  console.log('Создание роли')
}

const editRole = (role: any) => {
  if (selectedRoles.value.length === 0) {
    console.log('Выберите роль для редактирования')
    return
  }
  
  console.log('Редактирование роли:', selectedRoles.value[0]?.name || 'Неизвестная')
}

const deleteRole = (role: any) => {
  if (selectedRoles.value.length === 0) {
    console.log('Выберите роль для удаления')
    return
  }
  
  console.log('Удаление роли:', selectedRoles.value[0]?.name || 'Неизвестная')
}

// Обработчик клика по строке таблицы
function handleTableClick(event: any) {
  // Находим строку таблицы (tr) из кликнутого элемента
  const rowElement = event.target.closest('tr')
  if (!rowElement) return
  
  // Проверяем, что это не заголовок таблицы
  if (rowElement.parentNode.tagName === 'THEAD') return
  
  // Снимаем выделение со всех строк
  const allRows = rowElement.parentNode.querySelectorAll('tr')
  allRows.forEach((row: any) => {
    row.classList.remove('bg-primary/10', 'border-primary/20')
    row.removeAttribute('data-selected')
  })
  
  // Выделяем текущую строку
  rowElement.classList.add('bg-primary/10', 'border-primary/20')
  rowElement.setAttribute('data-selected', 'true')
  
  // Получаем индекс строки в tbody
  const tbody = rowElement.parentNode
  const rowIndex = Array.from(tbody.children).indexOf(rowElement)
  
  // Получаем данные строки из таблицы
  const clickedRole = rolesData.value[rowIndex]
  if (!clickedRole) return
  
  // Обновляем список выбранных ролей (только один)
  selectedRoles.value = [clickedRole]
  selectedRole.value = clickedRole
}
</script>

<template>
  <UDashboardPanel id="roles">
    <template #header>
      <UDashboardNavbar title="Роли">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Загрузка -->
        <div v-if="pending" class="flex justify-center py-8">
          <UIcon name="i-lucide-loader-2" class="animate-spin text-2xl" />
        </div>

        <!-- Кнопки действий -->
        <div class="flex items-center gap-2">
          <UButton
            color="primary"
            @click="createRole"
          >
            Создать
          </UButton>
          
          <span class="text-muted mx-1">|</span>
          
          <UButton
            :color="selectedRoles.length > 0 ? 'neutral' : 'neutral'"
            :variant="selectedRoles.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedRoles.length === 0"
            @click="editRole"
          >
            Редактировать
          </UButton>
          
          <UButton
            :color="selectedRoles.length > 0 ? 'error' : 'neutral'"
            :variant="selectedRoles.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedRoles.length === 0"
            @click="deleteRole"
          >
            Удалить
          </UButton>
        </div>

        <!-- Таблица ролей -->
        <div v-if="!pending" class="overflow-x-auto">
          <UTable
            :data="rolesData"
            :columns="[
              { 
                accessorKey: 'isBuiltIn', 
                header: 'Встроенная',
                cell: ({ row }) => h('div', { class: 'text-sm' }, isBuiltIn(row.original.id) ? 'Да' : 'Нет')
              },
              { 
                accessorKey: 'name', 
                header: 'Имя',
                cell: ({ row }) => h('div', { class: 'font-medium' }, row.original.name)
              },
              { 
                accessorKey: 'permissions', 
                header: 'Привилегии',
                cell: ({ row }) => h('div', { 
                  class: 'text-xs font-mono w-full break-words whitespace-normal leading-tight' 
                }, getRolePermissions(row.original))
              }
            ]"
            :ui="{
              base: 'table-fixed border-separate border-spacing-0',
              thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
              tbody: '[&>tr]:last:[&>td]:border-b-0',
              th: 'py-3 px-4 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-left font-medium',
              td: 'border-b border-default py-3 px-4 cursor-pointer',
              tr: 'hover:bg-muted/50 data-[selected=true]:bg-primary/10 data-[selected=true]:border-primary/20'
            }"
            :column-defs="{
              isBuiltIn: { size: 100 },
              name: { size: 150 },
              permissions: { size: 600 }
            }"
            @click="handleTableClick"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>