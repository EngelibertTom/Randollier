<template>
  <div :class="styles.wrapper">
  <div :class="styles.layout">
    <aside :class="styles.sidebar">
      <div :class="styles.avatarBlock">
        <div :class="styles.avatar">{{ initials }}</div>
        <div :class="styles.userInfo">
          <span :class="styles.userName">{{ user.profile.firstName }} {{ user.profile.lastName }}</span>
          <span :class="styles.userEmail">{{ user.profile.email }}</span>
        </div>
      </div>

      <nav :class="styles.nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          :class="[styles.navItem, activeSection === item.id && styles.navItemActive]"
          @click="activeSection = item.id"
        >
          {{ item.label }}
        </button>
      </nav>

      <button :class="styles.logoutBtn" @click="logout">Se déconnecter</button>
    </aside>

    <div :class="styles.content">
      <InfoSection     v-if="activeSection === 'info'" />
      <AddressSection  v-else-if="activeSection === 'addresses'" />
      <OrdersSection   v-else-if="activeSection === 'orders'" />
      <SecuritySection v-else-if="activeSection === 'security'" />
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import InfoSection     from '@/components/sections/profile/infoSection/InfoSection.vue'
import AddressSection  from '@/components/sections/profile/addressSection/AddressSection.vue'
import OrdersSection   from '@/components/sections/profile/ordersSection/OrdersSection.vue'
import SecuritySection from '@/components/sections/profile/securitySection/SecuritySection.vue'
import styles from './MainSection.module.css'

type Section = 'info' | 'addresses' | 'orders' | 'security'

const user = useUserStore()
const auth = useAuthStore()
const router = useRouter()
const activeSection = ref<Section>('info')

function logout() {
  auth.logout()
  router.push('/')
}

const navItems: { id: Section; label: string }[] = [
  { id: 'info',      label: 'Informations personnelles' },
  { id: 'addresses', label: 'Mes adresses' },
  { id: 'orders',    label: 'Mes commandes' },
  { id: 'security',  label: 'Sécurité' },
]

const initials = computed(() =>
  [user.profile.firstName, user.profile.lastName]
    .map(s => s.charAt(0))
    .join('')
    .toUpperCase()
)
</script>
