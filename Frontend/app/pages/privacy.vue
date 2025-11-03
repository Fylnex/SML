<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Политика конфиденциальности - SML',
  description: 'Политика конфиденциальности System Management Laboratory'
})
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Политика конфиденциальности
      </h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Последнее обновление: {{ new Date().toLocaleDateString('ru-RU') }}
      </p>
    </div>

    <div class="prose prose-sm dark:prose-invert max-w-none space-y-4">
      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Введение
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Настоящая Политика конфиденциальности описывает, как мы собираем, используем, храним и защищаем 
          вашу персональную информацию при использовании системы управления лабораторией 
          (System Management Laboratory).
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Собираемая информация
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Мы можем собирать следующие типы информации:
        </p>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>Учетные данные:</strong> логин, пароль, email</li>
          <li><strong>Профильная информация:</strong> имя, должность, контактные данные</li>
          <li><strong>Данные использования:</strong> журналы активности, время входа в систему</li>
          <li><strong>Рабочие данные:</strong> результаты исследований, отчеты, документы</li>
          <li><strong>Технические данные:</strong> IP-адрес, тип браузера, операционная система</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Использование информации
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Мы используем собранную информацию для:
        </p>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Предоставления доступа к Системе и её функциональности</li>
          <li>Управления учетными записями пользователей</li>
          <li>Обеспечения безопасности и предотвращения мошенничества</li>
          <li>Улучшения качества работы Системы</li>
          <li>Ведения статистики и аналитики</li>
          <li>Соблюдения правовых требований</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Хранение данных
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Ваши данные хранятся на защищенных серверах с ограниченным доступом. Мы применяем современные 
          технологии шифрования и меры безопасности для защиты ваших данных от несанкционированного доступа, 
          изменения, раскрытия или уничтожения.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          5. Передача данных третьим лицам
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением следующих случаев:
        </p>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>С вашего явного согласия</li>
          <li>По требованию уполномоченных государственных органов</li>
          <li>Для защиты наших законных прав и интересов</li>
          <li>Поставщикам услуг, помогающим в работе Системы (при условии соблюдения конфиденциальности)</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          6. Ваши права
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Вы имеете право:
        </p>
        <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Получать доступ к своим персональным данным</li>
          <li>Требовать исправления неточных данных</li>
          <li>Запрашивать удаление ваших данных (при соблюдении законодательства)</li>
          <li>Ограничивать обработку ваших данных</li>
          <li>Возражать против обработки данных</li>
          <li>Получать копию ваших данных в структурированном формате</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          7. Файлы cookie
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Система использует файлы cookie для обеспечения функциональности и улучшения пользовательского опыта. 
          Вы можете управлять настройками cookie в своем браузере, однако отключение некоторых файлов может 
          ограничить функциональность Системы.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          8. Безопасность данных
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Мы применяем технические и организационные меры безопасности для защиты ваших данных, включая 
          шифрование, контроль доступа, регулярные проверки безопасности и обучение персонала.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          9. Изменения в политике
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Мы можем обновлять настоящую Политику конфиденциальности. О существенных изменениях мы будем 
          уведомлять пользователей через Систему или по электронной почте.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          10. Контактная информация
        </h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          По вопросам, связанным с обработкой персональных данных и настоящей Политикой конфиденциальности, 
          обращайтесь к администратору системы или ответственному за защиту персональных данных.
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

