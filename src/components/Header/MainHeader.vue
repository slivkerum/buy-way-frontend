<template>
  <div class="main-header">
    <TopBar @open-login="showLoginModal = true" />
    <BottomBar @toggle-news="toggleNews" />

    <Transition name="slide-down">
      <NewsBar v-if="isHomePage || showNewsBar" class="news-bar" />
    </Transition>

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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import TopBar from './TopBar.vue'
import BottomBar from './BottomBar.vue'
import NewsBar from '../News/NewsBar.vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const route = useRoute()

const isHomePage = computed(() => route.path === '/')
const showNewsBar = ref(false)

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

const toggleNews = () => {
  showNewsBar.value = !showNewsBar.value
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

<style scoped>

/* NewsBar теперь занимает место в потоке и сдвигает всё вниз */
.news-bar {
  width: 100%;
  z-index: 9;
}

/* Слайд сверху вниз */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.4s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
