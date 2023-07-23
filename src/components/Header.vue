<script setup>
import { RouterLink } from 'vue-router'
import ButtonAction from './ButtonAction.vue'
import { useStore } from '../stores/store.js'
import { deleteCookie } from '../api/api.js'

const store = useStore()

// Handles signing out when sign out button is clicked
const handleSignOut = () => {
  deleteCookie('access_token')
  deleteCookie('username')
  store.setIsLoggedIn(false)
  window.location.reload()
}
</script>
<template>
  <header class="header__container">
    <h1>LifeWaster3000</h1>
    <nav>
      <router-link to="/" class="header__nav-link" exact>Home</router-link>
      <router-link to="/community" class="header__nav-link" exact>Community</router-link>
      <ButtonAction buttonText="Login" link="/login" v-if="!store.getIsLoggedIn" />
      <ButtonAction buttonText="Register" link="/register" v-if="!store.getIsLoggedIn" />
      <ButtonAction
        buttonText="Sign Out"
        link="/"
        v-if="store.getIsLoggedIn"
        @click="handleSignOut"
      />
    </nav>
  </header>
</template>
<style lang="scss" scoped>
.header__container {
  width: 100%;
  height: 60px;
  background-color: rgb(95, 95, 95);
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 11% 0 11%;
  h1 {
    font-size: 28px;
    position: relative;
    &::after {
      content: 'by Zak Schenck ;)';
      position: absolute;
      font-size: 11px;
      font-weight: 400;
      bottom: -12px;
      right: 0px;
    }
    span {
      border: 2px solid white;
      padding: 0 6px 0 6px;
    }
  }
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  .header__nav-link {
    color: white;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    &::before {
      content: '';
      width: 0;
      height: 3px;
      background-color: white;
      bottom: -6px;
      left: 0;
      position: absolute;
      transition: 0.4s;
    }
    &:hover::before {
      width: 100%;
      transition: 0.4s;
    }
  }
}

    .header__nav-link.router-link-active::before {
      width: 100%;
      transition: 0.4s;
    }
</style>