import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as { product: Product; qty: number} []
    }),
    getters: {
        total: (state) => state.items.reduce((s, i) => s + i.product.price * i.qty, 0)
    },
    actions: {
        add(product: Product, qty = 1) {
            const found = this.items.find(i => i.product.id === product.id)
            if (found) found.qty += qty
            else this.items.push({ product, qty})
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        loadFromStorage() {
            const s = localStorage.getItem('cart')
            if (s) this.items = JSON.parse(s)
        }
    }
})