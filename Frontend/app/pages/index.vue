<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

useHead({
  title: 'Добро пожаловать'
})

definePageMeta({
  layout: 'default'
})

interface Card {
  id: number
  icon: string
  title: string
  description: string
  linkUrl: string
  linkText: string
  glowClass: string
}

const cards = ref<Card[]>([
  {
    id: 1,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Задания',
    description: 'Просматривайте и выполняйте лабораторные задания, отслеживайте прогресс.',
    linkUrl: '/tasks',
    linkText: 'Перейти к заданиям',
    glowClass: 'from-blue-500'
  },
  {
    id: 2,
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.586V5L7 4z',
    title: 'Лаборатории',
    description: 'Управляйте лабораторными работами, создавайте новые модули и материалы.',
    linkUrl: '/laboratories',
    linkText: 'Открыть лаборатории',
    glowClass: 'from-emerald-500'
  },
  {
    id: 3,
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2',
    title: 'Панель управления',
    description: 'Доступ к полному функционалу системы: группы, курсы, модули и настройки.',
    linkUrl: '/control',
    linkText: 'Перейти к панели',
    glowClass: 'from-purple-500'
  }
])

const visibleCards = ref<boolean[]>([])

onMounted(() => {
  visibleCards.value = new Array(cards.value.length).fill(false)
  cards.value.forEach((_, index) => {
    setTimeout(() => { visibleCards.value[index] = true }, index * 180)
  })
})
</script>

<template>
  <section class="relative -mt-32 pt-48 pb-40 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
    <!-- Фоновая сетка -->
    <div class="absolute inset-0 bg-[radial-gradient(at_center,#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(at_center,#374151_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] -z-0" />

    <div class="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
      <!-- Заголовок -->
      <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Система управления лабораторией
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Единая платформа для организации лабораторных работ, управления учебным процессом и контроля знаний студентов.
      </p>

      <!-- Карточки -->
      <div class="mt-16 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <NuxtLink
          v-for="(card, index) in cards"
          :key="card.id"
          :to="card.linkUrl"
          :class="[
            'group relative w-full h-[380px] cursor-pointer',
            'transition-all duration-700 ease-out',
            visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          ]"
        >
          <!-- Свечение при наведении (размытое) -->
          <div :class="[
            'absolute -inset-px bg-gradient-to-r to-transparent rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg pointer-events-none',
            card.glowClass
          ]" />
          
          <!-- Свечение при наведении (четкое) -->
          <div :class="[
            'absolute -inset-px bg-gradient-to-r to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
            card.glowClass
          ]" />

          <!-- Карточка -->
          <div class="relative w-full h-full bg-white/60 dark:bg-gray-950/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 flex flex-col text-left overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <!-- Иконка -->
            <div class="mb-5 text-gray-800 dark:text-white">
              <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" :d="card.icon" />
              </svg>
            </div>
            
            <!-- Заголовок -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ card.title }}
            </h3>
            
            <!-- Описание -->
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-4">
              {{ card.description }}
            </p>
            
            <!-- Ссылка -->
            <div class="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200 self-start">
              {{ card.linkText }} <span aria-hidden="true">→</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Кнопка действия -->
      <NuxtLink 
        to="/control" 
        class="group relative inline-flex items-center justify-center px-8 py-4 mt-8 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105"
      >
        <span class="relative z-10">Перейти к системе</span>
      </NuxtLink>
    </div>
  </section>
</template>
