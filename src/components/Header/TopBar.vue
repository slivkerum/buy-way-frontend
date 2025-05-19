<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <div class="logo">BuyWay</div>
    </div>

    <div class="top-bar__center">
      <router-link to="/" class="home-button">Главная</router-link>
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          class="search-input"
          type="text"
          placeholder="Поиск товаров..."
        />
        <button class="search-button" @click="search">
          <img :src="searchIcon" alt="Поиск" class="search-icon" />
        </button>
      </div>
    </div>

    <div class="top-bar__right">
      <div>
        <span>Ваш город:</span>
        <button class="city-button" @click="showCityModal = true">
          {{ selectedCity || 'Город' }}
        </button>
      </div>

      <template v-if="isLoggedIn">
        <router-link to="/account" class="icon-button" title="Аккаунт">
          <img :src="accountIcon" alt="Аккаунт" class="icon" />
        </router-link>
        <router-link to="/cart" class="icon-button" title="Корзина">
          <img :src="cartIcon" alt="Корзина" class="icon" />
        </router-link>
        <button class="logout-button" @click="logout">Выйти</button>
      </template>
      <template v-else>
        <button class="login-button" @click="$emit('open-login')">Войти</button>
      </template>
    </div>
  </div>

  <!-- Модалка города -->
  <div v-if="showCityModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h2 class="modal-title">Выберите город</h2>
      <ul class="city-list">
        <li
          v-for="city in cities"
          :key="city.id"
          class="city-item"
          @click="selectCity(city.name)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cities } from '@/constants/cities'
import { useUserStore } from '@/store/user'
import searchIcon from '@/assets/Header/751463.png'
import accountIcon from '@/assets/Header/account.png'
import cartIcon from '@/assets/Header/cart.png'

const router = useRouter()
const selectedCity = ref('')
const searchQuery = ref('')
const showCityModal = ref(false)

const userStore = useUserStore()
const isLoggedIn = computed(() => !!userStore.accessToken)

function search() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

function closeModal() {
  showCityModal.value = false
}

function logout() {
  const userStore = useUserStore()
  userStore.logout()
  location.reload()
}

onMounted(() => {
  selectedCity.value = localStorage.getItem('selected_city') || cities[0].name
})

function selectCity(name: string) {
  selectedCity.value = name
  localStorage.setItem('selected_city', name)
  closeModal()
}

</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  max-width: 1000px;
  margin: auto;
  border-radius: 0 0 12px 12px;
}

.top-bar__left,
.top-bar__center,
.top-bar__right {
  display: flex;
  align-items: center;
}

.top-bar__left {
  flex: 0.6;
}

.top-bar__center {
  flex: 2;
  gap: 10px;
}

.top-bar__right {
  flex: 1;
  justify-content: flex-end;
  gap: 12px;
}

.logo {
  font-weight: 700;
  font-size: 1.75rem;
  color: #007bff;
}

.home-button {
  padding: 6px 14px;
  background-color: #f4f4f4;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.home-button:hover {
  background-color: #06a0fa7e;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.search-wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-input {
  padding: 8px 14px;
  font-size: 1rem;
  border: none;
  outline: none;
  width: 350px;
  background-color: transparent;
}

.search-button {
  padding: 8px 14px;
  background-color: #0099ff63;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #007bffd5;
}

.city-button {
  padding: auto;
  border-radius: 6px;
  background-color: #f4f4f4;
  color: #007bffd5;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.city-button:hover {
  color: #007bff8f;
  transition: background-color 0.3s ease;
}

.login-button {
  padding: 6px 12px;
  background-color: #007bffd5;
  border: none;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-button:hover {
  background-color: #005ecb;
}

.search-icon {
  width: 16px;
  height: 16px;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 0 24px 24px 24px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-title {
  margin-bottom: 16px;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #0000004d;
}

.close-button:hover {
  color: red;
}

.city-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  list-style: none;

}

/* Убираем рамки, делаем элементы "чистыми" */
.city-item {
  padding: 8px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.city-item:hover {
  color: #0088ff9a;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin-left: 8px;
}

.icon {
  width: 24px;
  height: 24px;
}

.logout-button {
  padding: 6px 12px;
  background-color: #ff4d4f;
  border: none;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #d9363e;
}
</style>
