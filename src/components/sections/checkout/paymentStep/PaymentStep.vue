<template>
  <div :class="styles.layout">
    <div :class="styles.main">
      <Button :class="styles.backBtn" @click="emit('back')">← Modifier la livraison</Button>
      <h2 :class="styles.title">Paiement</h2>

      <div :class="styles.deliveryRecap">
        <span :class="styles.recapLabel">Livraison à :</span>
        <span>{{ address.firstName }} {{ address.lastName }}, {{ address.street }}, {{ address.postalCode }} {{ address.city }}</span>
      </div>

      <form @submit.prevent="handlePay" :class="styles.form">
        <FormField label="Nom sur la carte" v-model="form.holder" required placeholder="Jean Dupont" />

        <div :class="styles.fieldGroup">
          <label :class="styles.label">Numéro de carte</label>
          <input
            :class="styles.cardInput"
            v-model="cardDisplay"
            @input="onCardInput"
            placeholder="1234 5678 9012 3456"
            inputmode="numeric"
            maxlength="19"
            required
          />
        </div>

        <div :class="styles.row">
          <FormField label="Date d'expiration" v-model="form.expiry" placeholder="MM/AA" required />
          <FormField label="CVV" v-model="form.cvv" placeholder="123" required />
        </div>

        <p :class="styles.simNote">Simulation — aucun paiement réel. Utilisez n'importe quelle carte.</p>

        <p v-if="error" :class="styles.error">{{ error }}</p>

        <Button type="submit" :class="styles.payBtn" :disabled="loading || !canPay">
          {{ loading ? 'Traitement…' : `Payer ${fmt(cart.total)}` }}
        </Button>
      </form>
    </div>

    <div :class="styles.summary">
      <CartSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import CartSummary from '../cartSummary/CartSummary.vue'
import type { DeliveryAddress } from '@/types'
import styles from './PaymentStep.module.css'

const props = defineProps<{ address: DeliveryAddress }>()
const emit = defineEmits<{
  pay: [orderId: string]
  back: []
}>()

const cart = useCartStore()

const form = reactive({ holder: '', cardNumber: '', expiry: '', cvv: '' })
const cardDisplay = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

function onCardInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16)
  form.cardNumber = raw
  cardDisplay.value = raw.replace(/(.{4})/g, '$1 ').trim()
}

const canPay = computed(() =>
  form.holder && form.cardNumber.length === 16 && form.expiry && form.cvv
)

function fmt(amount: number) {
  return amount.toFixed(2).replace('.', ',') + ' $'
}

async function handlePay() {
  if (!canPay.value) return
  loading.value = true
  error.value = null

  // Simulation paiement — délai 1.5s puis succès
  // TODO: POST /api/orders { cartItems, deliveryAddress, paymentToken }
  await new Promise<void>(resolve => setTimeout(resolve, 1500))

  loading.value = false
  const orderId = `RA-${Date.now().toString().slice(-6)}`
  emit('pay', orderId)
}
</script>
