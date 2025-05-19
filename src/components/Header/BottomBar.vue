<template>
  <nav class="bottom-bar">
    <ul>
      <li><a href="#">Главная</a></li>
      <li><a href="#">Категории</a></li>
      <li><a href="#">Акции</a></li>
      <li><a href="#">Контакты</a></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bottom-bar {
  background-color: #f9f9f9;
  padding: 8px 24px;
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
  color: #333;
}

.bottom-bar a:hover {
  text-decoration: underline;
}
</style>