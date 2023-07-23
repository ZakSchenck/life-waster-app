<script setup>

</script>

<template lang="">
    <div class="welcome-back-card__container">
        <h2>Welcome Back!</h2>
        <p>We are glad you're back. Log in again to see your account details! My website stores your information with cookies. Ready to waste your life again?</p>
    </div>
</template>

<style lang="scss" scoped>
.welcome-back-card__container {
    width: 600px;
    height: 430px;
    background-color: green;
    background-image: url("../assets/purpledesign.jpeg");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 4%;
    gap: 12px;
    h2 {
        color: white;
        font-size: 2.6rem;
    }
}
</style>