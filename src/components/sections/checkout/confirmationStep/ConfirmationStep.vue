<template>
  <div :class="styles.card">
    <div :class="styles.icon">✓</div>
    <h1 :class="styles.title">Commande confirmée !</h1>
    <p :class="styles.orderId">Commande #{{ orderId }}</p>
    <p :class="styles.message">
      Un email de confirmation a été envoyé à <strong>{{ email }}</strong>.
    </p>

    <!-- Invitation à créer un compte (invités uniquement) -->
    <div v-if="auth.isGuest && !accountCreated" :class="styles.createAccountBox">
      <h3 :class="styles.boxTitle">Envie de suivre vos commandes ?</h3>
      <p :class="styles.boxText">
        Créez un compte en quelques secondes — vos infos sont déjà prêtes.
      </p>

      <template v-if="!showPasswordForm">
        <Button :class="styles.createBtn" @click="showPasswordForm = true">
          Créer mon compte
        </Button>
        <Button :class="styles.skipBtn" @click="accountCreated = true">
          Non merci
        </Button>
      </template>

      <template v-else>
        <form @submit.prevent="handleCreateAccount" :class="styles.form">
          <FormField label="Choisir un mot de passe" type="password" v-model="password" required />
          <p v-if="auth.error" :class="styles.error">{{ auth.error }}</p>
          <Button type="submit" :class="styles.createBtn" :disabled="auth.loading || !password">
            {{ auth.loading ? 'Création…' : 'Créer mon compte' }}
          </Button>
          <Button :class="styles.skipBtn" @click="accountCreated = true">Annuler</Button>
        </form>
      </template>
    </div>

    <div v-if="accountCreated || auth.isLoggedIn" :class="styles.successBox">
      <p v-if="accountCreated && !auth.isLoggedIn">Compte créé avec succès !</p>
    </div>

    <div :class="styles.actions">
      <RouterLink to="/" :class="styles.homeBtn">Continuer mes achats</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/profile" :class="styles.ordersLink">
        Voir mes commandes
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import styles from './ConfirmationStep.module.css'

defineProps<{ orderId: string; email: string }>()

const auth = useAuthStore()
const showPasswordForm = ref(false)
const password = ref('')
const accountCreated = ref(false)

async function handleCreateAccount() {
  await auth.createAccountFromCheckout(password.value)
  if (!auth.error) accountCreated.value = true
}
</script>
