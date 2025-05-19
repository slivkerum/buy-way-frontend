<template>
  <transition name="slide-down">
    <div v-if="visible" class="news-bar">
      <div class="news-slider">
        <button class="arrow left" @click="prevSlide">‹</button>

        <div class="news-item">
          <img :src="currentNews.image" alt="News Image" />
          <div class="news-text">
            <h3>{{ currentNews.title }}</h3>
            <p>{{ currentNews.description }}</p>
          </div>
        </div>

        <button class="arrow right" @click="nextSlide">›</button>
      </div>

      <div class="dots">
        <span
          v-for="(n, i) in newsList"
          :key="i"
          class="dot"
          :class="{ active: i === index }"
          @click="index = i"
        ></span>
      </div>
    </div>
  </transition>
</template>



<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const visible = ref(true)

const newsList = ref([
  { title: 'Новость 1', description: 'Описание новости 1', image: '/news1.jpg' },
  { title: 'Новость 2', description: 'Описание новости 2', image: '/news2.jpg' },
  { title: 'Новость 3', description: 'Описание новости 3', image: '/news3.jpg' }
])

const index = ref(0)
const currentNews = computed(() => newsList.value[index.value])

let interval: ReturnType<typeof setInterval>

const nextSlide = () => {
  index.value = (index.value + 1) % newsList.value.length
}
const prevSlide = () => {
  index.value = (index.value - 1 + newsList.value.length) % newsList.value.length
}

onMounted(() => {
  interval = setInterval(nextSlide, 8000)
})
onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.slide-down-enter-active {
  animation: slideDown 0.4s ease-out forwards;
}
.slide-down-leave-active {
  animation: slideUp 0.3s ease-in forwards;
}
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.news-bar {
  background: #fff;
  padding: 50px 0;
  position: relative;
  z-index: 5;
}

.news-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.news-item {
  position: relative;
  width: 600px;
  height: 300px;
}

.news-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.news-text {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.342);
  width: 100%;
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 0 0 12px 12px;
}

.arrow {
  font-size: 2.5rem;
  background: none;
  width: 6%;
  height: 18%;

  border: none;
  cursor: pointer;
  color: #3333339a;
  user-select: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.arrow:hover {
  background-color: #0099ff63;
  color: black;
  border-radius: 50%;
}

.arrow.left {
  left: -30px;
}

.arrow.right {
  right: -30px;
}

.dots {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #0099ff;
}

</style>
