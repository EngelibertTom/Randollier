<template>
  <div :class="styles.container">
    <div :class="styles.cart">
      <h1 :class="styles.title">Votre panier</h1>

      <CartItem
        v-for="item in cart.items"
        :key="item.product.id"
        :product="item.product"
        :quantity="item.qty"
      />

      <div :class="styles.cartFooter">
        <span :class="styles.footerLabel">Sous total</span>
        <span :class="styles.footerAmount">{{ formatPrice(cart.total) }}</span>
      </div>
    </div>

    <div :class="styles.summary">
      <h1 :class="styles.title">Total</h1>

      <div :class="styles.summaryRow">
        <span :class="styles.summaryLabel">Sous total</span>
        <span :class="styles.summaryAmount">{{ formatPrice(cart.total) }}</span>
      </div>
      <div :class="styles.summaryRow">
        <span :class="styles.summaryLabel">Livraison</span>
        <span :class="styles.summaryAmount">{{ livraison === 0 ? '—' : formatPrice(livraison) }}</span>
      </div>

      <Button :class="styles.checkoutBtn" @click="router.push('/checkout')">Paiement</Button>

      <div :class="styles.acceptedPayments">
        <span :class="styles.acceptedLabel">Nous acceptons :</span>
        <div :class="styles.paymentIcons">
          <PaypalIcon :class="styles.payIcon" aria-label="PayPal"/>
          <MastercardIcon :class="styles.payIcon" aria-label="Mastercard"/>
          <VisaIcon :class="styles.payIcon" aria-label="Visa"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import styles from './MainSection.module.css'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/cartItem/CartItem.vue'
import Button from '@/components/ui/button/Button.vue'
import VisaIcon from '@/assets/icons/visa.svg?component'
import PaypalIcon from '@/assets/icons/paypal.svg?component'
import MastercardIcon from '@/assets/icons/mastercard.svg?component'

const cart = useCartStore()
const router = useRouter()
cart.loadFromStorage()

const livraison = ref(0)

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' $'
}
</script>