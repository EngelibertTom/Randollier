<template>
  <nav :class="styles.breadcrumb" aria-label="Fil d'ariane">
    <template v-for="(item, index) in items" :key="index">
      <router-link v-if="item.to" :to="item.to" :class="styles.link">{{ item.label }}</router-link>
      <span v-else :class="styles.current">{{ item.label }}</span>
      <span v-if="index < items.length - 1" :class="styles.separator">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import styles from './Breadcrumb.module.css'

defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>
