<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  link: String,
  buttonText: String
})
</script>
<template>
  <div>
    <router-link :to="props.link">{{ props.buttonText }}</router-link>
  </div>
</template>
<style lang="scss" scoped>
a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  background-color: rgb(88, 88, 255);
  border-radius: 8px;
  padding: 8px 12px;
  transition: 0.4s;
  &:hover {
    background-color: rgb(33, 33, 255);
    transition: 0.4s;
  }
}
</style>