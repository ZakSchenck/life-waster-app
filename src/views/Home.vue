<script setup>
import { useStore } from '../stores/store.js'
import { onMounted, reactive, onBeforeMount, onActivated, onUnmounted } from 'vue'
import { fetchUser, getCookie, deleteCookie, handleLike } from '../api/api.js'
import NewComment from '../components/NewComment.vue'
import NotLoggedIn from '../components/NotLoggedIn.vue'
import DeleteComment from '../components/DeleteComment.vue'

const store = useStore()
const state = reactive({
  username: '',
  userComments: [],
  page: 1,
  isLoading: false,
  clickedCommentId: null
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

// Fetches user comments for a specific page
const fetchComments = async (page) => {
  const access = getCookie('access_token')
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/?page=${page}/`, {
      headers: {
        Authorization: `Bearer ${access}`
      },
      mode: 'cors'
    })

    if (response.ok) {
      const data = await response.json()
      return data.data || []
    } else {
      throw new Error('Failed to fetch user data')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch user data')
  }
}

onBeforeMount(async () => {
  // If cookies exist for your access token, find your comments!
  if (getCookie('access_token')) {
    state.username = await fetchUser()
    const initialComments = await fetchComments(state.page)
    state.userComments = initialComments
    store.setIsLoggedIn(true)
    store.setUsername(state.username)
  }
  state.isLoading = false
})
</script>

<template>
  <div>
    <div v-if="state.isLoading" class="loading-indicator">
      <h2>Loading Data...</h2>
      <div class="home__loading-circle"></div>
    </div>
    <div v-if="store.getIsLoggedIn">
      <h3>Hello, {{ state.username }}. Here is your profile.</h3>
      <h3 style="color: gray">{{ state.userComments.length }} total comment(s)</h3>
      <NewComment />
      <div class="home__comments">
        <div
          class="home__comments-container"
          v-for="comment in state.userComments"
          :key="comment.id"
        >
          <div class="home__info-container">
            <div class="home__profile-container">
              <h4>@{{ state.username }}</h4>
              <img
                v-if="state.username === 'zakschenck'"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/512px-Twitter_Verified_Badge.svg.png"
                alt="verified"
              />
            </div>
            <p>{{ formatDate(comment.created_at) }}</p>
          </div>
          <p class="home__comment-body">{{ comment.body }}</p>
          <DeleteComment :commentId="comment.id" />
        </div>
      </div>
    </div>
    <div v-if="!state.isLoading && !store.getIsLoggedIn">
      <NotLoggedIn />
    </div>
  </div>
</template>

<style lang="scss">
h3 {
  margin-top: 16px;
  margin-left: 11%;
}

.home__comments-container {
  margin: 0 auto;
  width: 600px;
  border: 1px solid gray;
  padding: 12px;
  min-height: 100px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  position: relative;
  div {
    display: flex;
    flex-direction: row;
    gap: 18px;
    p {
      color: lightgray;
      font-size: 14px;
      align-items: center;
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
  h4 {
    color: rgb(179, 179, 179);
  }
}

.home__profile-container {
  display: flex;
  flex-direction: row;
  gap: 6px !important;
  align-items: center;
}

.home__comments {
  display: flex;
  flex-direction: column-reverse;
}

.comment-body {
  white-space: pre-wrap;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  top: -20px;
  left: 0;
  z-index: 2;
  .home__loading-circle {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 0.5rem solid white;
    border-top-color: gray;
    animation: spin 1s infinite linear;
  }
}

.home__comment-body {
  margin-top: 12px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
