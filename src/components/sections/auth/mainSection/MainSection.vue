<template>
  <div :class="styles.page">
    <BrandPanel />

    <div :class="styles.formPanel">
      <div :class="styles.card">
        <Tabs v-model="activeTab" :tabs="AUTH_TABS" @update:model-value="auth.error = null" />

        <LoginForm v-if="activeTab === 'login'" @success="onSuccess" />
        <RegisterForm v-else @success="onSuccess" />

        <div :class="styles.divider"><span>ou</span></div>

        <p :class="styles.switchText">
          <template v-if="activeTab === 'login'">
            Pas encore de compte ?
            <button type="button" :class="styles.switchLink" @click="switchTab('register')">
              Créer un compte
            </button>
          </template>
          <template v-else>
            Déjà un compte ?
            <button type="button" :class="styles.switchLink" @click="switchTab('login')">
              Se connecter
            </button>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BrandPanel    from '@/components/sections/auth/brandPanel/BrandPanel.vue'
import LoginForm     from '@/components/sections/auth/loginForm/LoginForm.vue'
import RegisterForm  from '@/components/sections/auth/registerForm/RegisterForm.vue'
import Tabs          from '@/components/ui/tabs/Tabs.vue'
import styles from './MainSection.module.css'

const AUTH_TABS = [
  { value: 'login',    label: 'Se connecter' },
  { value: 'register', label: 'Créer un compte' },
]

const auth   = useAuthStore()
const router = useRouter()

const activeTab = ref<'login' | 'register'>('login')

function switchTab(tab: 'login' | 'register') {
  activeTab.value = tab
  auth.error = null
}

function onSuccess() {
  router.push('/')
}
</script>
