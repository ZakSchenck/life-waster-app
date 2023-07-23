<script setup>
import { RouterLink } from 'vue-router';
import { handleDelete } from "../api/api.js";
import { computed } from "vue"

const props = defineProps({
  commentId: Number,
  userComments: Object
})

// Deletes comment
const deleteComment = async () => {
    await handleDelete(props.commentId);
    window.location.reload();
}
</script>
<template>
  <div>
    <button @click="deleteComment">Delete</button>
  </div>
</template>
<style lang="scss" scoped>
button {
  color: white;
  text-decoration: none;
  font-weight: 600;
  background-color: rgb(255, 56, 56);
  border-radius: 8px;
  padding: 8px 12px;
  transition: 0.4s;
  position: absolute;
  right: 8px;
  top: 8px;
  border: none;
  &:hover {
    background-color: rgb(255, 82, 82);
    transition: 0.4s;
    cursor: pointer;
  }
}
</style>