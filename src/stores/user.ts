import { defineStore } from 'pinia'
import type { UserProfile, Address, Order } from '@/types'
import { useAuthStore } from '@/stores/auth'


async function apiCall<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message ?? `Erreur ${res.status}`)
  }
  const text = await res.text()
  return (text ? JSON.parse(text) : {}) as T
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthdate: '',
    } as UserProfile,

    addresses: [] as Address[],
    orders: [] as Order[],

    saving: false,
    saveSuccess: null as string | null,
    saveError: null as string | null,
  }),

  actions: {
    async fetchProfile() {
      const authStore = useAuthStore()
      await authStore.fetchMe()
      const user = authStore.currentUser
      if (!user) return
      this.profile = {
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        phone:     user.phone ?? '',
        birthdate: user.birthdate ?? '',
      }
    },

    async fetchAddresses() {
      try {
        this.addresses = await apiCall<Address[]>('/addresses', 'GET')
      } catch {
        // session expirée, géré par le auth store
      }
    },

    async fetchOrders() {
      try {
        this.orders = await apiCall<Order[]>('/orders', 'GET')
      } catch {
        // session expirée, géré par le auth store
      }
    },

    // PUT /api/user/profile — { firstName, lastName, email, phone, birthdate }
    async updateProfile(data: UserProfile) {
      this.saving = true
      this.saveSuccess = null
      this.saveError = null
      try {
        const updated = await apiCall<UserProfile>('/profile', 'PUT', data)
        this.profile = { ...updated }
        this.saveSuccess = 'Informations mises à jour avec succès.'
      } catch {
        this.saveError = 'Une erreur est survenue. Veuillez réessayer.'
      } finally {
        this.saving = false
      }
    },

    // POST /api/user/password — { currentPassword, newPassword }
    async updatePassword(payload: { currentPassword: string; newPassword: string }) {
      this.saving = true
      this.saveSuccess = null
      this.saveError = null
      try {
        await apiCall<void>('/user/password', 'POST', payload)
        this.saveSuccess = 'Mot de passe mis à jour avec succès.'
      } catch {
        this.saveError = 'Mot de passe actuel incorrect.'
      } finally {
        this.saving = false
      }
    },

    // POST /api/addresses ou PUT /api/addresses/:id
    async saveAddress(address: Omit<Address, 'id'> & { id?: number }) {
      this.saving = true
      this.saveSuccess = null
      this.saveError = null
      try {
        if (address.id) {
          await apiCall<Address>(`/addresses/${address.id}`, 'PUT', address)
          const idx = this.addresses.findIndex(a => a.id === address.id)
          if (idx >= 0) this.addresses[idx] = address as Address
        } else {
          const created = await apiCall<Address>('/addresses', 'POST', address)
          this.addresses.push(created)
        }
        if (address.isDefault) {
          this.addresses.forEach(a => { if (a.id !== address.id) a.isDefault = false })
        }
        this.saveSuccess = 'Adresse enregistrée.'
      } catch {
        this.saveError = 'Une erreur est survenue.'
      } finally {
        this.saving = false
      }
    },

    // DELETE /api/addresses/:id
    async deleteAddress(id: number) {
      await apiCall<void>(`/addresses/${id}`, 'DELETE')
      this.addresses = this.addresses.filter(a => a.id !== id)
    },

    clearFeedback() {
      this.saveSuccess = null
      this.saveError = null
    },
  },
})
