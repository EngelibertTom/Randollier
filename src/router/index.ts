import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Catalogue from '../views/Catalogue.vue'
import Profile from '../views/Profile.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/catalogue', name: 'Catalogue', component: Catalogue },
    { path: '/product/:id', name: 'Product', component: Product, props: true },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/checkout', name: 'Checkout', component: Checkout },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
