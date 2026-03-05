import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/product/:id', name: 'Product', component: Product, props: true },
    { path: '/cart', name: 'Cart', component: Cart }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router