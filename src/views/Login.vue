<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from '../stores/store.js'
import { handleLogin } from '../api/api.js'
import WelcomeBackCard from '../components/WelcomeBackCard.vue'
import router from '../router'

const store = useStore()

const state = reactive({
  email: '',
  password: '',
  invalidCredentials: false
})

// Handles submit login logic
const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    const success = await handleLogin(state.email, state.password, store.setUsername)
    // actions for a failed login
    if (!success) {
      state.invalidCredentials = true
      return
    }
    // actions for a successful login
    state.invalidCredentials = false
    store.setIsLoggedIn(true)
    router.push('/')
  } catch (error) {
    console.error('An error occurred while trying to login:', error)
  }
}
</script>

<template>
  <div class="login__container">
    <WelcomeBackCard />
    <form @submit.prevent="handleSubmit">
      <h1>User Login</h1>
      <div class="login__input-label-container">
        <label>Email</label>
        <input v-model="state.email" type="text" />
      </div>
      <div class="login__input-label-container">
        <label>Password</label>
        <input v-model="state.password" type="password" />
        <p v-if="state.invalidCredentials">Login credentials do not match my records :(</p>
      </div>
      <button type="submit">Login</button>
      <a href="/register">Don't have an account? Sign up!</a>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 30px 0;
  height: 430px;
  justify-content: center;
  padding: 24px 3%;
  gap: 26px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(70, 69, 69);
  label {
    color: rgb(167, 68, 224);
  }
  h1 {
    color: rgb(167, 68, 224);
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      color: rgb(255, 111, 111);
    }
    input {
      height: 40px;
      font-size: 22px;
      padding-left: 12px;
      background-color: #e6e6e6;
      border-left: 8px solid rgb(167, 68, 224);
      border-right: none;
      border-top: none;
      border-bottom: none;
    }
  }
  button {
    background: linear-gradient(to right, rgb(82, 0, 177), rgb(119, 0, 255), rgb(171, 97, 255));
    border-radius: 50px;
    color: white;
    font-size: 22px;
    padding: 4px 30px;
    width: min-content;
    border: none;
    outline: none;
    transition: 0.4s;
    border: 1px solid lightgray;
    &:hover {
      transition: 0.4s;
      cursor: pointer;
    }
  }
  a {
    color: rgb(153, 153, 255);
    text-decoration: underline;
    margin-top: 24px;
  }
}
</style>