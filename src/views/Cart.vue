<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import type { Product } from '../types';


const cart = useCartStore();

const deleteFromCart = (item:Product) => { 
    cart.remove(item)
}

</script>

<template>
    <h1>Votre panier</h1>
    <li v-for="item in cart.items">
        {{ item.product.name }} {{ item.qty }}
        <button v-on:click="deleteFromCart(item.product)">Supprimer</button>
    </li>

</template>