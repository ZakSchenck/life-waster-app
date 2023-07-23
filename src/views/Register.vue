<script setup>
import { handleRegister } from "../api/api.js"
import { reactive } from 'vue'
import { RouterLink } from 'vue-router';
import { useStore } from "../stores/store.js";
import { handleLogin } from '../api/api.js'
import router from '../router'

const store = useStore();

const state = reactive({
  email: '',
  username: '',
  password: ''
})

const handleSubmit = (event) => {
  event.preventDefault()
  handleRegister(state.email, state.username, state.password)
}
</script>

<template>
<div>
    <h1>Sign up</h1>
    <form @submit.prevent="handleSubmit">
        <label>Email</label>
        <input type="text" v-model="state.email" />
        <label>Username</label>
        <input type="text" v-model="state.username" />
        <label>Password</label>
        <input type="password" v-model="state.password" />
        <button type="submit">Register</button>
    </form>
</div>
</template>