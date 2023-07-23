<template>
  <div>
    <h2>@{{ store.getUsername }}</h2>
    <input type="text" @input="handleCharacterCount" maxlength="250" v-model="state.body" placeholder="Write your next chatter..." />
    <button @click="postComment">Send</button>
    <p>{{ state.characterCount }}/250</p>
  </div>
</template>

<script setup>
import { handlePost } from '../api/api.js';
import { reactive } from 'vue';
import { useStore } from '../stores/store.js';

const store = useStore();

const state = reactive({
  body: '',
  characterCount: 0,
});

const handleCharacterCount = () => {
    state.characterCount = state.body.length;
};

const postComment = async () => {
  await handlePost(state.body);
  state.body = '';
  window.location.reload();
};
</script>

<style lang="scss" scoped>
div {
  height: 200px;
  width: 600px;
  border: 1px solid gray;
  margin: 40px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  p {
      position: absolute;
      right: 10px;
      bottom: 10px;
  }
  input {
    background-color: transparent;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid gray;
    font-size: 28px;
    width: 80%;
    color: white;
    padding-bottom: 20px;
    height: 100px;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: #3838ff;
    border: none;
    outline: none;
    color: white;
    font-size: 20px;
    padding: 8px 12px;
    margin-top: 12px;
    transition: 0.4s;

    &:hover {
      background-color: rgb(33, 33, 255);
      cursor: pointer;
      transition: 0.4s;
    }
  }
}
</style>
