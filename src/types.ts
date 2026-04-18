



export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  qty: number
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthdate: string
}

export interface Address {
  id: number
  label: string
  firstName: string
  lastName: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface OrderItem {
  productId: number
  name: string
  price: number
  qty: number
  image: string
}

export interface Order {
  id: number
  date: string
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  total: number
  items: OrderItem[]
}

export interface DeliveryAddress {
  firstName: string
  lastName: string
  street: string
  city: string
  postalCode: string
  country: string
}