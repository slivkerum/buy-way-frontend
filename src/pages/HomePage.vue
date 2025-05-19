<template>
  <div>
    <MainHeader @open-login="onOpenLogin" />
    <LoginModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @switch-to-register="switchToRegister"
    />
    <RegisterModal
      v-if="showRegisterModal"
      @close="showRegisterModal = false"
      @switch-to-login="switchToLogin"
    />
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/Header/MainHeader.vue'
import LoginModal from '@/components/Header/LoginModal.vue'
import RegisterModal from '@/components/Header/RegisterModal.vue'
import { ref } from 'vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

function onOpenLogin() {
  showLoginModal.value = true
}

function switchToRegister() {
  showLoginModal.value = false
  showRegisterModal.value = true
}

function switchToLogin() {
  showRegisterModal.value = false
  showLoginModal.value = true
}
</script>
