<template>
  <div :class="styles.layout">
    <div :class="styles.main">
      <h2 :class="styles.title">Adresse de livraison</h2>

      <!-- Utilisateur connecté : sélection d'adresse sauvegardée -->
      <template v-if="auth.isLoggedIn && savedAddresses.length > 0 && !useNewAddress">
        <div :class="styles.savedAddresses">
          <div
            v-for="addr in savedAddresses"
            :key="addr.id"
            :class="[styles.addressCard, selectedId === addr.id && styles.selected]"
            @click="selectedId = addr.id"
          >
            <div :class="styles.cardTop">
              <span :class="styles.cardLabel">{{ addr.label }}</span>
              <span v-if="addr.isDefault" :class="styles.badge">Par défaut</span>
              <span v-if="selectedId === addr.id" :class="styles.checkMark">✓</span>
            </div>
            <p>{{ addr.firstName }} {{ addr.lastName }}</p>
            <p>{{ addr.street }}</p>
            <p>{{ addr.postalCode }} {{ addr.city }}, {{ addr.country }}</p>
          </div>
        </div>

        <Button :class="styles.newAddressBtn" @click="useNewAddress = true">
          + Utiliser une autre adresse
        </Button>
      </template>

      <!-- Formulaire nouvelle adresse (invité ou nouvelle adresse) -->
      <template v-else>
        <Button
          v-if="auth.isLoggedIn && savedAddresses.length > 0"
          :class="styles.backBtn"
          @click="useNewAddress = false"
        >
          ← Mes adresses enregistrées
        </Button>

        <form @submit.prevent="handleContinue" :class="styles.form">
          <div :class="styles.row">
            <FormField label="Prénom" v-model="form.firstName" required />
            <FormField label="Nom" v-model="form.lastName" required />
          </div>
          <FormField label="Rue" v-model="form.street" required />
          <div :class="styles.row">
            <FormField label="Code postal" v-model="form.postalCode" required />
            <FormField label="Ville" v-model="form.city" required />
          </div>
          <FormField
            label="Pays"
            type="select"
            v-model="form.country"
            :options="[
              { value: 'France', label: 'France' },
              { value: 'Belgique', label: 'Belgique' },
              { value: 'Suisse', label: 'Suisse' },
              { value: 'Luxembourg', label: 'Luxembourg' },
            ]"
          />
        </form>
      </template>

      <Button
        :class="styles.continueBtn"
        :disabled="!canContinue"
        @click="handleContinue"
      >
        Continuer vers le paiement
      </Button>
    </div>

    <div :class="styles.summary">
      <CartSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import CartSummary from '../cartSummary/CartSummary.vue'
import type { DeliveryAddress } from '@/types'
import styles from './DeliveryStep.module.css'

const emit = defineEmits<{
  continue: [address: DeliveryAddress]
}>()

const auth = useAuthStore()
const userStore = useUserStore()

const savedAddresses = computed(() => userStore.addresses)
const selectedId = ref(savedAddresses.value.find(a => a.isDefault)?.id ?? savedAddresses.value[0]?.id)
const useNewAddress = ref(false)

const form = reactive<DeliveryAddress>({
  firstName: auth.currentUser?.firstName ?? '',
  lastName: auth.currentUser?.lastName ?? '',
  street: '',
  city: '',
  postalCode: '',
  country: 'France',
})

const showForm = computed(() => !auth.isLoggedIn || savedAddresses.value.length === 0 || useNewAddress.value)

const canContinue = computed(() => {
  if (!showForm.value) return !!selectedId.value
  return !!(form.firstName && form.lastName && form.street && form.city && form.postalCode)
})

function handleContinue() {
  if (!canContinue.value) return

  if (!showForm.value && selectedId.value) {
    const addr = savedAddresses.value.find(a => a.id === selectedId.value)!
    emit('continue', {
      firstName: addr.firstName,
      lastName: addr.lastName,
      street: addr.street,
      city: addr.city,
      postalCode: addr.postalCode,
      country: addr.country,
    })
  } else {
    emit('continue', { ...form })
  }
}
</script>
