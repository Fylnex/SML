<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Условия использования - SML',
  description: 'Условия использования System Management Laboratory'
})
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Условия использования
      </h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Последнее обновление: {{ new Date().toLocaleDateString('ru-RU') }}
      </p>
    </div>

    <div class="prose prose-sm dark:prose-invert max-w-none space-y-4">
      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Общие положения
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Настоящие Условия использования регулируют порядок использования системы управления лабораторией 
          (System Management Laboratory, далее - "Система"). Используя Систему, вы соглашаетесь с настоящими 
          условиями в полном объеме.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Учетная запись пользователя
        </h2>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Вы несете ответственность за сохранность данных своей учетной записи</li>
          <li>Не передавайте свои учетные данные третьим лицам</li>
          <li>Немедленно уведомите администратора о любом несанкционированном доступе</li>
          <li>Вы несете ответственность за все действия, совершенные под вашей учетной записью</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Правила использования
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          При использовании Системы запрещается:
        </p>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Нарушать работу Системы или пытаться получить несанкционированный доступ</li>
          <li>Использовать Систему для незаконных целей</li>
          <li>Загружать вредоносное программное обеспечение</li>
          <li>Нарушать права интеллектуальной собственности</li>
          <li>Распространять конфиденциальную информацию без разрешения</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Интеллектуальная собственность
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Все материалы, содержащиеся в Системе, включая текст, графику, логотипы, программное обеспечение, 
          являются собственностью правообладателей и защищены законодательством об интеллектуальной собственности.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          5. Ограничение ответственности
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Система предоставляется "как есть". Мы не гарантируем бесперебойную и безошибочную работу Системы. 
          Мы не несем ответственности за любой прямой или косвенный ущерб, возникший в результате использования 
          или невозможности использования Системы.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          6. Изменение условий
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Мы оставляем за собой право изменять настоящие Условия использования в любое время. 
          Продолжение использования Системы после внесения изменений означает ваше согласие с новыми условиями.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          7. Контактная информация
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          По всем вопросам, связанным с Условиями использования, обращайтесь к администратору системы.
        </p>
      </section>
    </div>

    <div class="pt-4">
      <UButton
        to="/login"
        variant="outline"
        block
        size="lg"
      >
        <template #leading>
          <UIcon name="i-lucide-chevron-left" class="size-4" />
        </template>
        Вернуться к входу
      </UButton>
    </div>
  </div>
</template>

