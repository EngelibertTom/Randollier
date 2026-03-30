import { defineStore } from 'pinia'
import type { UserProfile, Address, Order } from '@/types'

// Simulation d'appel API — à remplacer par les vrais appels fetch vers le backend Symfony
// Base URL : import.meta.env.VITE_API_URL (ex: http://localhost:8000/api)
async function apiCall<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
  console.debug(`[API Simulation] ${method} ${endpoint}`, body)
  // TODO: décommenter pour connecter le backend Symfony
  // const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
  //   method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token') ?? ''}`,
  //   },
  //   body: body !== undefined ? JSON.stringify(body) : undefined,
  // })
  // if (!res.ok) throw new Error(await res.text())
  // return res.json() as Promise<T>
  await new Promise<void>(resolve => setTimeout(resolve, 700))
  return body as T
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      firstName: 'Tom',
      lastName: 'Engelibert',
      email: 'tom@randollier.fr',
      phone: '06 12 34 56 78',
      birthdate: '1995-06-15',
    } as UserProfile,

    addresses: [
      {
        id: 1,
        label: 'Domicile',
        firstName: 'Tom',
        lastName: 'Engelibert',
        street: '12 rue des Alpes',
        city: 'Grenoble',
        postalCode: '38000',
        country: 'France',
        isDefault: true,
      },
    ] as Address[],

    orders: [
      {
        id: 1042,
        date: '2026-02-20',
        status: 'delivered',
        total: 155,
        items: [
          { productId: 4, name: 'Veste imperméable homme', price: 120, qty: 1, image: 'https://picsum.photos/300?random=4' },
          { productId: 2, name: 'Gourde en inox', price: 35, qty: 1, image: 'https://picsum.photos/300?random=2' },
        ],
      },
      {
        id: 987,
        date: '2025-11-05',
        status: 'delivered',
        total: 60,
        items: [
          { productId: 3, name: 'Sac à dos minimaliste', price: 60, qty: 1, image: 'https://picsum.photos/300?random=3' },
        ],
      },
    ] as Order[],

    saving: false,
    saveSuccess: null as string | null,
    saveError: null as string | null,
  }),

  actions: {
    // PUT /api/user/profile — { firstName, lastName, email, phone, birthdate }
    async updateProfile(data: UserProfile) {
      this.saving = true
      this.saveSuccess = null
      this.saveError = null
      try {
        await apiCall<UserProfile>('/user/profile', 'PUT', data)
        this.profile = { ...data }
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
          await apiCall<Address>('/addresses', 'POST', address)
          this.addresses.push({ ...address, id: Date.now() })
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
