<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink 
        v-if="item.href"
        :to="item.href" 
        class="text-green-600 hover:underline"
      >
        {{ item.label }}
      </NuxtLink>
      
      <span
        v-else
        class="text-gray-500"
      >
        {{ item.label }}
      </span>

      <UIcon
        v-if="index < items.length - 1"
        name="i-lucide-chevron-right"
        class="size-4 text-gray-400"
      />
    </template>
  </nav>
</template>
