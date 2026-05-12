import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as { product: Product; qty: number }[]
    }),
    getters: {
        total: (state) => state.items.reduce((s, i) => s + i.product.price * i.qty, 0)
    },
    actions: {
        add(product: Product, qty = 1) {
            const found = this.items.find(i => i.product.id === product.id)
            if (found) found.qty += qty
            else this.items.push({ product, qty })
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        remove(product: Product, qty = 1) {
            const foundIndex = this.items.findIndex(i => i.product.id === product.id)
            if (foundIndex === -1) return

            const newQty = this.items[foundIndex].qty - qty

            if (newQty <= 0) {
                // Supprime complètement l'article si qty tombe à 0 ou moins
                this.items.splice(foundIndex, 1)
            } else {
                this.items[foundIndex] = { product, qty: newQty }
            }

            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        loadFromStorage() {
            const s = localStorage.getItem('cart')
            if (s) {
                const parsed = JSON.parse(s) as { product: Product; qty: number }[]
                this.items = parsed.map(i => ({ ...i, product: { ...i.product, price: parseFloat(i.product.price as unknown as string) } }))
            }
        },
    }
})