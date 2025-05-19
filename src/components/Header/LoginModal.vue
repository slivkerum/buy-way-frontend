<!-- LoginModal.vue -->
<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">✕</button>
      <h2>Вход в аккаунт</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <button type="submit" :disabled="!formValid">Войти</button>
        <p v-if="loginError" class="error-text">{{ loginError }}</p>
      </form>

      <p class="switch-form">
        Нет аккаунта?
        <span @click="emit('switch-to-register')">Зарегистрироваться</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import api from '@/api/axios'

const emit = defineEmits(['close', 'switch-to-register'])

const email = ref('')
const password = ref('')
const loginError = ref('')

const formValid = computed(() => email.value && password.value)

const handleLogin = async () => {
  loginError.value = ''
  try {
    const response = await api.post('/auth/login/', {
      email: email.value,
      password: password.value,
    })
    const { access, refresh } = response.data
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    emit('close')
    window.location.reload()
  } catch (error: any) {
    const detail = error.response?.data?.detail || 'Неверный email или пароль'
    loginError.value = `Ошибка: ${detail}`
  }
}
</script>

<style scoped>
@import './css/modal_style.css';
</style>
