<template>
  <nav class="bottom-bar">
    <ul>
      <li><a href="#">Магазин</a></li>
      <li><a href="#" @click.prevent="$emit('toggle-news')">Новости</a></li>
      <li><a href="#">Контакты</a></li>
      <li><a href="#">О нас</a></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bottom-bar {
  background-color: #f9f9f9;
  padding: 8px 24px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
}

.bottom-bar ul {
  display: flex;
  gap: 24px;
  list-style: none;
  justify-content: center;
  margin: auto;
  padding: 0;
}

.bottom-bar a {
  text-decoration: none;
  color: #333333c7;
}

.bottom-bar a:hover {
  color: #333333;
  text-decoration: underline;
}
</style>