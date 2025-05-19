<!-- RegisterModal.vue -->
<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">✕</button>
      <h2>Регистрация</h2>

      <form v-if="step === 'register'" @submit.prevent="handleRegister">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required />
        <input v-model="phone" v-mask="'+7(###)-###-##-##'" placeholder="+7(000)-000-00-00" required />
        <button type="submit" :disabled="!formValid">Зарегистрироваться</button>
      </form>

      <form v-else @submit.prevent="handleConfirmCode">
        <input v-model="confirmationCode" placeholder="Код из письма" required />
        <button type="submit">Подтвердить email</button>
      </form>

      <p class="switch-form">
        Уже есть аккаунт?
        <span @click="emit('switch-to-login')">Войти</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import api from '@/api/axios'

const emit = defineEmits(['close', 'switch-to-login'])

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const registerError = ref('')
const step = ref<'register' | 'confirm'>('register')
const confirmationCode = ref('')

const formValid = computed(() => {
  const cleanPhone = phone.value.replace(/\D/g, '')
  return email.value && password.value && password.value === confirmPassword.value && cleanPhone.length === 11
})

const handleRegister = async () => {
  registerError.value = ''

  try {
    await api.post('/auth/register/', {
      email: email.value,
      password: password.value,
      phone: phone.value,
      role: 'CUSTOMER',
    })

    step.value = 'confirm'
  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Ошибка при регистрации'
    registerError.value = `Ошибка: ${detail}`
  }
}

const handleConfirmCode = async () => {
  registerError.value = ''

  try {
    await api.post('/auth/confirm_email/', {
      email: email.value,
      code: confirmationCode.value,
    })

    emit('close')
    alert('Email подтверждён! Теперь вы можете войти.')
  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Ошибка при подтверждении'
    registerError.value = `Ошибка: ${detail}`
  }
}

</script>

<style scoped>
@import './css/modal_style.css';
</style>
