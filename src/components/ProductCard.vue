<template>
  <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover rounded" />
    <h3 class="mt-2 font-semibold"> {{product.name}}</h3>
    <p class="text-sm text-gray-600">{{product.price}}</p>

    <router-link
        :to="`/product/${product.id}`"
        class="text-blue-600 underline mt-2 inline-block"
    >
      Voir le produit
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>