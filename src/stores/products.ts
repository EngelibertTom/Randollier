import { defineStore } from 'pinia'
import type { Product } from '@/types'

async function apiCall<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    credentials: 'include',
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`Erreur ${res.status}`)
  return res.json() as Promise<T>
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    current: null as Product | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAll() {
      if (this.products.length > 0) return  // déjà en cache
      this.loading = true
      this.error = null
      try {
        this.products = await apiCall<Product[]>('/products')
      } catch {
        this.error = 'Impossible de charger les produits.'
      } finally {
        this.loading = false
      }
    },

    async fetchOne(id: number) {
      const cached = this.products.find(p => p.id === id)
      if (cached) {
        this.current = cached
        return
      }
      this.loading = true
      this.error = null
      try {
        this.current = await apiCall<Product>(`/products/${id}`)
      } catch {
        this.error = 'Produit introuvable.'
      } finally {
        this.loading = false
      }
    },

    clearCurrent() {
      this.current = null
    },
  },
})
