import { defineStore } from 'pinia'

// POST /api/auth/check-email  → { exists: boolean }
// POST /api/auth/register     → { token: string; user: AuthUser }
// POST /api/auth/register-from-guest → { token: string }
async function apiCall<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    credentials: 'include', // envoie et reçoit les cookies httpOnly
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

export interface AuthUser {
  email: string
  firstName: string
  lastName: string
  phone?: string
  birthdate?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isGuest: false,
    guestEmail: null as string | null,
    currentUser: null as AuthUser | null,
    loading: false,
    error: null as string | null,
    // Résultat du check email : 'exists' si compte trouvé, 'new' sinon
    emailCheckResult: null as 'exists' | 'new' | null,
  }),

  actions: {
    async fetchMe() {
      if (!localStorage.getItem('auth_session')) return
      if (this.currentUser) return
      try {
        const user = await apiCall<AuthUser>('/me', 'GET')
        this.currentUser = user
        this.isLoggedIn = true
      } catch {
        // cookie expiré → on nettoie le flag
        localStorage.removeItem('auth_session')
      }
    },

    // GET /api/auth/check-email?email=...
    async checkEmail(email: string) {
      this.loading = true
      this.error = null
      try {
        const { exists } = await apiCall<{ exists: boolean }>(`/auth/check-email?email=${encodeURIComponent(email)}`, 'GET')
        this.emailCheckResult = exists ? 'exists' : 'new'
      } finally {
        this.loading = false
      }
    },

    // POST /api/auth/login — { email, password }
    // Simulation : mot de passe "123456" fonctionne toujours
    async login(email: string, password: string) {

      this.loading = true
      this.error = null
      try {
        await apiCall<unknown>('/login_check', 'POST', { email, password })
        localStorage.setItem('auth_session', '1')
        await this.fetchMe()
        this.isGuest = false
        this.guestEmail = null
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : 'Mot de passe incorrect.'
      } finally {
        this.loading = false
      }
    },

    // POST /api/register — { email, password, firstName, lastName }
    async register(data: { email: string; password: string; firstName: string; lastName: string }) {
      this.loading = true
      this.error = null
      try {
        await apiCall('/register', 'POST', data)
        await this.login(data.email, data.password)
      } catch {
        this.error = 'Une erreur est survenue lors de la création du compte.'
      } finally {
        this.loading = false
      }
    },

    continueAsGuest(email: string) {
      this.isGuest = true
      this.isLoggedIn = false
      this.guestEmail = email
      this.currentUser = null
    },

    // POST /api/auth/register-from-guest — utilise l'email de la commande invité
    async createAccountFromCheckout(password: string) {
      if (!this.guestEmail) return
      this.loading = true
      this.error = null
      try {
        await apiCall('/auth/register-from-guest', 'POST', { email: this.guestEmail, password })
        this.isLoggedIn = true
        this.isGuest = false
      } catch {
        this.error = 'Une erreur est survenue lors de la création du compte.'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.isLoggedIn = false
      this.isGuest = false
      this.guestEmail = null
      this.currentUser = null
      this.emailCheckResult = null
      this.error = null
      localStorage.removeItem('auth_session')
    },
  },
})
