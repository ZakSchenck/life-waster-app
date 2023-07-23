<script setup>
import { handleGetAllComments, getCookie } from '../api/api.js'
import DeleteComment from '../components/DeleteComment.vue'
import { onBeforeMount, reactive } from 'vue'

const state = reactive({
  userComments: []
})

// Formats date to mm/dd/yyyy format
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
  return formattedDate
}

onBeforeMount(async () => {
  state.userComments = await handleGetAllComments()
  console.log(state.userComments)
})
</script>

<template>
  <div>
    <h2>All community comments. Join the fun!</h2>
    <div class="home__comments">
      <div
        class="home__comments-container"
        v-for="comment in state.userComments.data"
        :key="comment.id"
      >
        <div class="home__info-container">
          <div class="home__profile-container">
            <h4>@{{ comment.username }}</h4>
            <img
              v-if="comment.username === 'zakschenck'"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/512px-Twitter_Verified_Badge.svg.png"
              alt="verified"
            />
          </div>
          <p>{{ formatDate(comment.created_at) }}</p>
        </div>
        <p class="community__comment-body">{{ comment.body }}</p>
        <DeleteComment v-if="comment.username === getCookie('username')" :userComments="state.userComments" :commentId="comment.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 20px auto;
}

.community__comment-body {
  margin-top: 12px;
}
</style>