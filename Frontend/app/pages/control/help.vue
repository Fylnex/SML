<script setup lang="ts">
useHead({
  title: 'Помощь и поддержка'
})

definePageMeta({
  layout: 'control'
})

const faqItems = [
  {
    label: 'Как войти в систему?',
    content: 'Используйте логин "admin" и пароль "admin123" для демо-доступа к системе.',
    defaultOpen: true
  },
  {
    label: 'Как добавить нового клиента?',
    content: 'Перейдите в раздел "Клиенты" и нажмите кнопку "Добавить клиента" в правом верхнем углу.'
  },
  {
    label: 'Как настроить уведомления?',
    content: 'Откройте "Настройки" → "Уведомления" для настройки предпочтений уведомлений.'
  },
  {
    label: 'Как изменить пароль?',
    content: 'Перейдите в "Настройки" → "Безопасность" для изменения пароля и других настроек безопасности.'
  },
  {
    label: 'Как экспортировать данные?',
    content: 'В большинстве разделов доступна функция экспорта данных в различных форматах (CSV, Excel).'
  }
]
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-4xl mx-auto space-y-8">
        <!-- Заголовок -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Помощь и поддержка
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Добро пожаловать в систему управления лабораторией SML
          </p>
        </div>

        <!-- Основные разделы -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Быстрый старт -->
          <UCard class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-rocket" class="size-6 text-primary" />
                <h3 class="text-lg font-semibold">Быстрый старт</h3>
              </div>
            </template>
            
            <div class="space-y-4">
              <p class="text-gray-600 dark:text-gray-400">
                Начните работу с системой управления лабораторией
              </p>
              <UButton variant="outline" color="primary" size="sm" class="w-full">
                Начать работу
              </UButton>
            </div>
          </UCard>

          <!-- Документация -->
          <UCard class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-book-open" class="size-6 text-blue-500" />
                <h3 class="text-lg font-semibold">Документация</h3>
              </div>
            </template>
            
            <div class="space-y-4">
              <p class="text-gray-600 dark:text-gray-400">
                Подробные руководства и инструкции
              </p>
              <UButton variant="outline" color="info" size="sm" class="w-full">
                Открыть документацию
              </UButton>
            </div>
          </UCard>

          <!-- Техническая поддержка -->
          <UCard class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-headphones" class="size-6 text-green-500" />
                <h3 class="text-lg font-semibold">Техподдержка</h3>
              </div>
            </template>
            
            <div class="space-y-4">
              <p class="text-gray-600 dark:text-gray-400">
                Получите помощь от наших специалистов
              </p>
              <UButton variant="outline" color="success" size="sm" class="w-full">
                Связаться с поддержкой
              </UButton>
            </div>
          </UCard>
        </div>

        <!-- Часто задаваемые вопросы -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
              <UIcon name="i-lucide-help-circle" class="size-5 text-primary" />
              Часто задаваемые вопросы
            </h2>
            
            <div class="space-y-4">
              <UAccordion :items="faqItems" />
            </div>
          </div>
        </div>

        <!-- Контактная информация -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-mail" class="size-5 text-primary" />
                Электронная почта
              </h3>
            </template>
            
            <div class="space-y-2">
              <p class="text-gray-600 dark:text-gray-400">Техническая поддержка:</p>
              <p class="font-mono text-sm">support@sml.ru</p>
              
              <p class="text-gray-600 dark:text-gray-400 mt-4">Общие вопросы:</p>
              <p class="font-mono text-sm">info@sml.ru</p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-phone" class="size-5 text-primary" />
                Телефон
              </h3>
            </template>
            
            <div class="space-y-2">
              <p class="text-gray-600 dark:text-gray-400">Горячая линия:</p>
              <p class="font-mono text-sm">+7 (800) 123-45-67</p>
              
              <p class="text-gray-600 dark:text-gray-400 mt-4">Время работы:</p>
              <p class="text-sm">Пн-Пт: 9:00 - 18:00 (МСК)</p>
            </div>
          </UCard>
        </div>

        <!-- Системная информация -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <UIcon name="i-lucide-info" class="size-5 text-primary" />
              Информация о системе
            </h3>
          </template>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p class="text-gray-600 dark:text-gray-400">Версия системы:</p>
              <p class="font-mono">v1.0.0</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Последнее обновление:</p>
              <p class="font-mono">{{ new Date().toLocaleDateString('ru-RU') }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Статус системы:</p>
              <UBadge color="success" variant="subtle">Работает</UBadge>
            </div>
          </div>
        </UCard>
    </div>
  </div>
</template>

