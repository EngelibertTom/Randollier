<script setup lang="ts">
import { useCartStore } from '../stores/cart';


const cart = useCartStore();


</script>

<template>
    <h1>Votre panier</h1>
    <li v-for="item in cart.items">
        {{ item.product.name }} {{ item.qty }}
    </li>

</template>