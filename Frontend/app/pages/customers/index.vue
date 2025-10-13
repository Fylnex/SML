<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { User } from '~/types'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'email',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({ 1: true })

// Моковые данные студентов и гостей
const studentsAndGuests: User[] = [
  {
    id: 1,
    name: 'Алексей Студентов',
    email: 'alexey.student@university.ru',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=student1'
    },
    status: 'subscribed',
    location: 'Москва, Россия'
  },
  {
    id: 2,
    name: 'Мария Гостьева',
    email: 'maria.guest@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=guest1'
    },
    status: 'subscribed',
    location: 'Санкт-Петербург, Россия'
  },
  {
    id: 3,
    name: 'Дмитрий Учеников',
    email: 'dmitry.student@university.ru',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=student2'
    },
    status: 'subscribed',
    location: 'Новосибирск, Россия'
  },
  {
    id: 4,
    name: 'Анна Посетитель',
    email: 'anna.visitor@company.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=guest2'
    },
    status: 'unsubscribed',
    location: 'Екатеринбург, Россия'
  },
  {
    id: 5,
    name: 'Сергей Студент',
    email: 'sergey.student@university.ru',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=student3'
    },
    status: 'subscribed',
    location: 'Казань, Россия'
  },
  {
    id: 6,
    name: 'Елена Гость',
    email: 'elena.guest@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=guest3'
    },
    status: 'bounced',
    location: 'Нижний Новгород, Россия'
  },
  {
    id: 7,
    name: 'Иван Ученик',
    email: 'ivan.student@university.ru',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=student4'
    },
    status: 'subscribed',
    location: 'Самара, Россия'
  },
  {
    id: 8,
    name: 'Ольга Посетитель',
    email: 'olga.visitor@company.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=guest4'
    },
    status: 'subscribed',
    location: 'Омск, Россия'
  }
]

const { data, status } = await useFetch<User[]>('/api/customers', {
  lazy: true,
  default: () => studentsAndGuests
})

function getRowItems(row: Row<User>) {
  return [
    {
      type: 'label',
      label: 'Действия'
    },
    {
      label: 'Копировать ID',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'Скопировано в буфер обмена',
          description: 'ID скопирован в буфер обмена'
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
      label: 'История посещений',
      icon: 'i-lucide-calendar'
    },
    {
      label: 'Отправить приглашение',
      icon: 'i-lucide-mail'
    },
    {
      type: 'separator'
    },
    {
      label: 'Удалить запись',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        toast.add({
          title: 'Запись удалена',
          description: 'Запись была удалена из системы.'
        })
      }
    }
  ]
}

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Выбрать все'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'ariaLabel': 'Выбрать строку'
      })
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.avatar,
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
          h('p', { class: 'text-sm text-muted' }, row.original.email)
        ])
      ])
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Email',
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
    accessorKey: 'location',
    header: 'Местоположение',
    cell: ({ row }) => row.original.location
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    filterFn: 'equals',
    cell: ({ row }) => {
      const statusMap = {
        subscribed: { color: 'success' as const, label: 'Активен' },
        unsubscribed: { color: 'error' as const, label: 'Неактивен' },
        bounced: { color: 'warning' as const, label: 'Заблокирован' }
      }
      const status = statusMap[row.original.status]

      return h(UBadge, { 
        class: 'capitalize', 
        variant: 'subtle', 
        color: status.color 
      }, () => status.label)
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
    }
  }
]

const statusFilter = ref('all')

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const statusColumn = table.value.tableApi.getColumn('status')
  if (!statusColumn) return

  if (newVal === 'all') {
    statusColumn.setFilterValue(undefined)
  } else {
    statusColumn.setFilterValue(newVal)
  }
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Группы">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            icon="i-lucide-user-plus"
            size="md"
            class="rounded-full"
          >
            Добавить в группу
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="Поиск по email..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <UButton
            v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
            label="Удалить выбранных"
            color="error"
            variant="subtle"
            icon="i-lucide-trash"
          >
            <template #trailing>
              <UKbd>
                {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }}
              </UKbd>
            </template>
          </UButton>

          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Все', value: 'all' },
              { label: 'Активные', value: 'subscribed' },
              { label: 'Неактивные', value: 'unsubscribed' },
              { label: 'Заблокированные', value: 'bounced' }
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="Фильтр по статусу"
            class="min-w-28"
          />
          <UDropdownMenu
            :items="
              table?.tableApi
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                  },
                  onSelect(e?: Event) {
                    e?.preventDefault()
                  }
                }))
            "
            :content="{ align: 'end' }"
          >
            <UButton
              label="Отображение"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-settings-2"
            />
          </UDropdownMenu>
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection"
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
          td: 'border-b border-default'
        }"
      />

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
        <div class="text-sm text-muted">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} из
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} строк выбрано.
        </div>

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
