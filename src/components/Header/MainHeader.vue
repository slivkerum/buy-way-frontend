<template>
  <div class="main-header">
    <TopBar @open-login="$emit('open-login')" />
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import TopBar from './TopBar.vue'
import BottomBar from './BottomBar.vue'
</script>

<style scoped>
.main-header {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
}
</style>
