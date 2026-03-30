<template>
  <div :class="styles.section">
    <h2 :class="styles.title">Mes commandes</h2>

    <p v-if="user.orders.length === 0" :class="styles.empty">Vous n'avez pas encore de commande.</p>

    <div v-else :class="styles.list">
      <div v-for="order in user.orders" :key="order.id" :class="styles.orderCard">
        <div :class="styles.orderHeader" @click="toggle(order.id)">
          <div :class="styles.orderMeta">
            <span :class="styles.orderId">#{{ order.id }}</span>
            <span :class="styles.orderDate">{{ formatDate(order.date) }}</span>
            <span :class="[styles.statusBadge, styles[`status-${order.status}`]]">
              {{ statusLabels[order.status] }}
            </span>
          </div>
          <div :class="styles.orderRight">
            <span :class="styles.orderTotal">{{ order.total.toFixed(2).replace('.', ',') }} €</span>
            <span :class="styles.chevron">{{ expanded === order.id ? '▲' : '▼' }}</span>
          </div>
        </div>

        <div v-if="expanded === order.id" :class="styles.orderItems">
          <div v-for="item in order.items" :key="item.productId" :class="styles.orderItem">
            <img :src="item.image" :alt="item.name" :class="styles.itemImage" />
            <span :class="styles.itemName">{{ item.name }}</span>
            <span :class="styles.itemQtyPrice">× {{ item.qty }} — {{ item.price.toFixed(2).replace('.', ',') }} €</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { Order } from '@/types'
import styles from './OrdersSection.module.css'

const user = useUserStore()
const expanded = ref<number | null>(null)

function toggle(id: number) {
  expanded.value = expanded.value === id ? null : id
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const statusLabels: Record<Order['status'], string> = {
  pending:    'En attente',
  processing: 'En cours',
  shipped:    'Expédié',
  delivered:  'Livré',
  cancelled:  'Annulé',
}
</script>
