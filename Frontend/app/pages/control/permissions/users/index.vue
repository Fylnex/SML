<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { User } from '~/types'

useHead({
  title: 'Пользователи'
})

definePageMeta({
  layout: 'control'
})

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'login',
  value: ''
}])
const columnVisibility = ref()

// Фильтры
const statusFilter = ref('all')

// Отслеживание выбранных пользователей
const selectedUsers = ref<User[]>([])

// Моковые данные пользователей (без студентов)
const users: User[] = [
  {
    id: 1,
    name: 'Администратор',
    email: 'admin@sml.ru',
    login: 'admin',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=admin'
    },
    status: 'subscribed',
    role: 'admin',
    group: 'admin',
    enabled: true,
    startDate: null,
    endDate: null
  },
  {
    id: 2,
    name: 'Иван Петров',
    email: 'ivan.petrov@sml.ru',
    login: 'ivan.petrov',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=ivan'
    },
    status: 'subscribed',
    role: 'teacher',
    group: 'teachers',
    enabled: true,
    startDate: '2024-01-01',
    endDate: '2025-12-31'
  },
  {
    id: 3,
    name: 'Мария Сидорова',
    email: 'maria.sidorova@sml.ru',
    login: 'maria.sidorova',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=maria'
    },
    status: 'subscribed',
    role: 'teacher',
    group: 'teachers',
    enabled: true,
    startDate: null,
    endDate: null
  },
  {
    id: 4,
    name: 'Алексей Козлов',
    email: 'alexey.kozlov@sml.ru',
    login: 'alexey.kozlov',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=alexey'
    },
    status: 'unsubscribed',
    role: 'teacher',
    group: 'teachers',
    enabled: false,
    startDate: '2023-09-01',
    endDate: '2024-01-15'
  },
  {
    id: 5,
    name: 'Елена Волкова',
    email: 'elena.volkova@sml.ru',
    login: 'elena.volkova',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=elena'
    },
    status: 'subscribed',
    role: 'teacher',
    group: 'teachers',
    enabled: true,
    startDate: '2024-03-01',
    endDate: '2025-06-30'
  },
  {
    id: 6,
    name: 'Дмитрий Соколов',
    email: 'dmitry.sokolov@sml.ru',
    login: 'dmitry.sokolov',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=dmitry'
    },
    status: 'bounced',
    role: 'teacher',
    group: 'teachers',
    enabled: false,
    startDate: '2023-01-01',
    endDate: '2023-12-31'
  },
  {
    id: 7,
    name: 'Анна Морозова',
    email: 'anna.morozova@sml.ru',
    login: 'anna.morozova',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=anna'
    },
    status: 'subscribed',
    role: 'admin',
    group: 'admin',
    enabled: true,
    startDate: null,
    endDate: null
  },
  {
    id: 8,
    name: 'Сергей Новиков',
    email: 'sergey.novikov@sml.ru',
    login: 'sergey.novikov',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=sergey'
    },
    status: 'subscribed',
    role: 'teacher',
    group: 'teachers',
    enabled: true,
    startDate: '2024-02-01',
    endDate: '2025-03-15'
  },
  {
    id: 9,
    name: 'Ольга Модератор',
    email: 'olga.moderator@sml.ru',
    login: 'olga.moderator',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=olga'
    },
    status: 'subscribed',
    role: 'admin',
    group: 'moderators',
    enabled: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
]

// Временно используем только моковые данные
const data = ref(users)
const status = ref('success')

function getRowItems(row: Row<User>) {
  return [
    {
      type: 'label',
      label: 'Действия'
    },
    {
      label: 'Копировать ID пользователя',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'Скопировано в буфер обмена',
          description: 'ID пользователя скопирован в буфер обмена'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Просмотр профиля',
      icon: 'i-lucide-user'
    },
    {
      label: 'Редактировать пользователя',
      icon: 'i-lucide-edit'
    },
    {
      label: 'Сбросить пароль',
      icon: 'i-lucide-key'
    },
    {
      type: 'separator'
    },
    {
      label: 'Удалить пользователя',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        toast.add({
          title: 'Пользователь удален',
          description: 'Пользователь был удален из системы.'
        })
      }
    }
  ]
}

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'login',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Имя пользователя',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    }
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => {
      return h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.name)
      ])
    }
  },
  {
    accessorKey: 'enabled',
    header: 'Включено',
    cell: ({ row }) => {
      const isEnabled = row.original.enabled !== false
      return h(UBadge, { 
        class: 'capitalize', 
        variant: 'subtle', 
        color: isEnabled ? 'success' : 'error'
      }, () => isEnabled ? 'Да' : 'Нет')
    }
  },
  {
    accessorKey: 'validityPeriod',
    header: 'Срок действия',
    cell: ({ row }) => {
      const startDate = row.original.startDate
      const endDate = row.original.endDate
      
      if (!startDate && !endDate) {
        return h('span', { class: 'text-muted' }, 'никогда')
      }
      
      const start = startDate ? new Date(startDate).toLocaleDateString('ru-RU') : '—'
      const end = endDate ? new Date(endDate).toLocaleDateString('ru-RU') : '—'
      
      return h('span', { 
        class: 'text-sm' 
      }, `${start} - ${end}`)
    }
  },
  {
    accessorKey: 'tfa',
    header: 'TFA',
    cell: ({ row }) => {
      // Фиксированные данные для TFA на основе ID пользователя для консистентности
      const hasTFA = row.original.id % 2 === 0
      return h(UBadge, { 
        class: 'capitalize', 
        variant: 'subtle', 
        color: hasTFA ? 'success' : 'error'
      }, () => hasTFA ? 'Да' : 'Нет')
    }
  },
  {
    accessorKey: 'group',
    header: 'Группы',
    cell: ({ row }) => {
      const groupMap = {
        admin: { color: 'error' as const, label: 'Администраторы' },
        teachers: { color: 'primary' as const, label: 'Преподаватели' },
        students: { color: 'success' as const, label: 'Студенты' },
        moderators: { color: 'warning' as const, label: 'Модераторы' },
        guests: { color: 'neutral' as const, label: 'Гости' }
      }
      const group = groupMap[row.original.group as keyof typeof groupMap] || { color: 'neutral' as const, label: 'Не указана' }

      return h(UBadge, { 
        class: 'capitalize', 
        variant: 'subtle', 
        color: group.color 
      }, () => group.label)
    }
  },
]

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const enabledColumn = table.value.tableApi.getColumn('enabled')
  if (!enabledColumn) return

  if (newVal === 'all') {
    enabledColumn.setFilterValue(undefined)
  } else if (newVal === 'enabled') {
    enabledColumn.setFilterValue(true)
  } else if (newVal === 'disabled') {
    enabledColumn.setFilterValue(false)
  }
})

// Отслеживаем изменения в выборе строк
watch(() => table?.value?.tableApi?.getFilteredSelectedRowModel().rows, (selectedRows) => {
  if (selectedRows) {
    selectedUsers.value = selectedRows.map((r: any) => r.original)
  }
}, { deep: true })


const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

function handleTableClick(event: any) {
  // Находим строку таблицы (tr) из кликнутого элемента
  const rowElement = event.target.closest('tr')
  if (!rowElement) return
  
  // Проверяем, что это не заголовок таблицы
  if (rowElement.parentNode.tagName === 'THEAD') return
  
  // Получаем индекс строки в tbody
  const tbody = rowElement.parentNode
  const rowIndex = Array.from(tbody.children).indexOf(rowElement)
  
  // Получаем данные строки из таблицы
  const allRows = table?.value?.tableApi?.getRowModel().rows || []
  const clickedRow = allRows[rowIndex]
  if (!clickedRow) return
  
  // Сначала снимаем выделение со всех строк
  allRows.forEach((r: any) => {
    if (r.getIsSelected()) {
      r.toggleSelected(false)
    }
  })
  
  // Выделяем только текущую строку
  clickedRow.toggleSelected(true)
  
  // Принудительно обновляем список выбранных пользователей
  selectedUsers.value = [clickedRow.original]
}

function handleEdit() {
  if (selectedUsers.value.length === 0) {
    toast.add({
      title: 'Выберите пользователя',
      description: 'Пожалуйста, выберите пользователя для редактирования'
    })
    return
  }
  
  toast.add({
    title: 'Редактирование пользователя',
    description: `Редактирование пользователя: ${selectedUsers.value[0]?.name || 'Неизвестный'}`
  })
}

function handleDelete() {
  if (selectedUsers.value.length === 0) {
    toast.add({
      title: 'Выберите пользователя',
      description: 'Пожалуйста, выберите пользователя для удаления'
    })
    return
  }
  
  toast.add({
    title: 'Удаление пользователя',
    description: `Удаление пользователя: ${selectedUsers.value[0]?.name || 'Неизвестный'}`
  })
}

function handlePassword() {
  if (selectedUsers.value.length === 0) {
    toast.add({
      title: 'Выберите пользователя',
      description: 'Пожалуйста, выберите пользователя для смены пароля'
    })
    return
  }
  
  toast.add({
    title: 'Смена пароля',
    description: `Смена пароля для пользователя: ${selectedUsers.value[0]?.name || 'Неизвестный'}`
  })
}

function handlePermissions() {
  if (selectedUsers.value.length === 0) {
    toast.add({
      title: 'Выберите пользователя',
      description: 'Пожалуйста, выберите пользователя для управления разрешениями'
    })
    return
  }
  
  toast.add({
    title: 'Управление разрешениями',
    description: `Управление разрешениями для пользователя: ${selectedUsers.value[0]?.name || 'Неизвестный'}`
  })
}
</script>

<template>
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar title="Пользователи">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <!-- Кнопки действий слева -->
        <div class="flex flex-wrap items-center gap-1.5">
          <UButton
            color="primary"
            @click="navigateTo('/users/create')"
          >
            Добавить
          </UButton>
          
          <span class="text-muted mx-1">|</span>
          
          <UButton
            :color="selectedUsers.length > 0 ? 'neutral' : 'gray'"
            :variant="selectedUsers.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedUsers.length === 0"
            @click="handleEdit"
          >
            Редактировать
          </UButton>
          
          <UButton
            :color="selectedUsers.length > 0 ? 'error' : 'gray'"
            :variant="selectedUsers.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedUsers.length === 0"
            @click="handleDelete"
          >
            Удалить
          </UButton>
          
          <span class="text-muted mx-1">|</span>
          
          <UButton
            :color="selectedUsers.length > 0 ? 'neutral' : 'gray'"
            :variant="selectedUsers.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedUsers.length === 0"
            @click="handlePassword"
          >
            Пароль
          </UButton>
          
          <span class="text-muted mx-1">|</span>
          
          <UButton
            :color="selectedUsers.length > 0 ? 'neutral' : 'gray'"
            :variant="selectedUsers.length > 0 ? 'outline' : 'ghost'"
            :disabled="selectedUsers.length === 0"
            @click="handlePermissions"
          >
            Разрешения
          </UButton>
        </div>

        <!-- Поиск и фильтры справа -->
        <div class="flex flex-wrap items-center gap-1.5">
          <UInput
            :model-value="(table?.tableApi?.getColumn('login')?.getFilterValue() as string)"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Поиск по логину..."
            @update:model-value="table?.tableApi?.getColumn('login')?.setFilterValue($event)"
          />

          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Все', value: 'all' },
              { label: 'Включенные', value: 'enabled' },
              { label: 'Отключенные', value: 'disabled' }
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="Фильтр по статусу"
            class="min-w-28"
          />
          
          
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="shrink-0"
        :data="data"
        :columns="columns"
        :loading="status === 'pending'"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default cursor-pointer',
          tr: 'hover:bg-muted/50 data-[selected=true]:bg-primary/10 data-[selected=true]:border-primary/20'
        }"
        @click="handleTableClick"
      />

      <div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto">
        <div class="flex items-center gap-1.5">
          <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

