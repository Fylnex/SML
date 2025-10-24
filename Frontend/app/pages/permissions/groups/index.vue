<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'


const UBadge = resolveComponent('UBadge')

// Типы для групп с ролями
interface Role {
  id: number
  name: string
  description: string
}

interface Group {
  id: number
  name: string
  comment: string
  users: string[]
  roles: Role[]
}

// Моковые данные групп с ролями
const groups: Group[] = [
  {
    id: 1,
    name: 'admin',
    comment: 'Администраторы системы',
    users: ['admin', 'root', 'superuser'],
    roles: [
      { id: 1, name: 'Администратор', description: 'Полный доступ к системе' },
      { id: 2, name: 'Модератор', description: 'Управление пользователями' }
    ]
  },
  {
    id: 2,
    name: 'Преподаватели',
    comment: 'Группа преподавателей',
    users: ['teacher1', 'teacher2', 'teacher3'],
    roles: [
      { id: 3, name: 'Преподаватель', description: 'Доступ к курсам и студентам' },
      { id: 4, name: 'Методист', description: 'Создание учебных материалов' }
    ]
  },
  {
    id: 3,
    name: 'Студенты',
    comment: 'Группа студентов',
    users: ['student1', 'student2', 'student3', 'student4'],
    roles: [
      { id: 5, name: 'Студент', description: 'Доступ к учебным материалам' }
    ]
  },
  {
    id: 4,
    name: 'Модераторы',
    comment: 'Группа модераторов контента',
    users: ['moderator1', 'moderator2'],
    roles: [
      { id: 6, name: 'Модератор', description: 'Модерация контента' },
      { id: 7, name: 'Редактор', description: 'Редактирование материалов' }
    ]
  },
  {
    id: 5,
    name: 'Гости',
    comment: 'Группа гостей системы',
    users: ['guest1', 'guest2'],
    roles: [
      { id: 8, name: 'Гость', description: 'Ограниченный доступ' }
    ]
  }
]

const toast = useToast()

// Фильтры
const searchQuery = ref('')

// Фильтрованные группы
const filteredGroups = computed(() => {
  let result = groups

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(group => 
      group.name.toLowerCase().includes(query) ||
      group.comment.toLowerCase().includes(query) ||
      group.users.some(user => user.toLowerCase().includes(query)) ||
      group.roles.some(role => role.name.toLowerCase().includes(query))
    )
  }

  return result
})


// Выбранная группа
const selectedGroup = ref<Group | null>(null)

// Отслеживание выбранных групп
const selectedGroups = ref<Group[]>([])

// Функции для работы с группами
const createGroup = () => {
  toast.add({
    title: 'Создание группы',
    description: 'Функция создания группы будет реализована',
    color: 'primary'
  })
}

const editGroup = () => {
  if (selectedGroups.value.length === 0) {
    toast.add({
      title: 'Выберите группу',
      description: 'Пожалуйста, выберите группу для редактирования'
    })
    return
  }
  
  toast.add({
    title: 'Редактирование группы',
    description: `Редактирование группы "${selectedGroups.value[0]?.name || 'Неизвестная'}"`,
    color: 'primary'
  })
}

const deleteGroup = () => {
  if (selectedGroups.value.length === 0) {
    toast.add({
      title: 'Выберите группу',
      description: 'Пожалуйста, выберите группу для удаления'
    })
    return
  }
  
  toast.add({
    title: 'Удаление группы',
    description: `Удаление группы "${selectedGroups.value[0]?.name || 'Неизвестная'}"`,
    color: 'error'
  })
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
  const clickedGroup = filteredGroups.value[rowIndex]
  if (!clickedGroup) return
  
  // Обновляем список выбранных групп (только один)
  selectedGroups.value = [clickedGroup]
  selectedGroup.value = clickedGroup
}
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Группы с ролями">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">

        <!-- Фильтры и кнопки действий -->
        <div class="flex flex-wrap items-center justify-between gap-4">
          <!-- Кнопки действий слева -->
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              @click="createGroup"
            >
              Создать
            </UButton>
            
            <span class="text-muted mx-1">|</span>
            
            <UButton
              :color="selectedGroups.length > 0 ? 'neutral' : 'neutral'"
              :variant="selectedGroups.length > 0 ? 'outline' : 'ghost'"
              :disabled="selectedGroups.length === 0"
              @click="editGroup"
            >
              Редактировать
            </UButton>
            
            <UButton
              :color="selectedGroups.length > 0 ? 'error' : 'neutral'"
              :variant="selectedGroups.length > 0 ? 'outline' : 'ghost'"
              :disabled="selectedGroups.length === 0"
              @click="deleteGroup"
            >
              Удалить
            </UButton>
          </div>

          <!-- Поиск справа -->
          <UInput
            v-model="searchQuery"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Поиск по группам, пользователям, ролям..."
          />
        </div>

        <!-- Таблица групп с ролями -->
        <div class="overflow-x-auto">
          <UTable
            :data="filteredGroups"
            :columns="[
              { 
                accessorKey: 'name', 
                header: 'Имя',
                cell: ({ row }) => h('div', { class: 'font-medium' }, row.original.name)
              },
              { 
                accessorKey: 'comment', 
                header: 'Комментарий',
                cell: ({ row }) => h('div', { class: 'text-muted' }, row.original.comment || '-')
              },
              { 
                accessorKey: 'users', 
                header: 'Пользователи',
                cell: ({ row }) => h('div', { class: 'text-sm' }, row.original.users.join(', ') || '-')
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
            @click="handleTableClick"
          />
        </div>

        <!-- Пустое состояние -->
        <UCard v-if="filteredGroups.length === 0" class="border-dashed border-2 border-gray-300 dark:border-gray-600">
          <div class="text-center py-8">
            <UIcon name="i-lucide-search-x" class="size-12 text-muted mx-auto mb-4" />
            <h3 class="text-lg font-medium mb-2">Группы не найдены</h3>
            <p class="text-muted mb-4">Попробуйте изменить фильтры или поисковый запрос</p>
            <UButton
              @click="searchQuery = ''"
              color="primary"
              variant="outline"
            >
              Сбросить фильтры
            </UButton>
          </div>
        </UCard>

      </div>
    </template>
  </UDashboardPanel>
</template>
