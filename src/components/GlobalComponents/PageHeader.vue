<template>
  <div>
    <h1>Tweeter</h1>
    <!-- Check to see if the user does not have a valid token -->
    <nav v-if="user.loginToken === null"></nav>
    <!-- If user does have a login token, we show our navigation menu -->
    <nav v-else>
      <!-- On clicks call a function -->
      <p
        class="nav_link"
        v-if="$route.name !== 'UserProfile'"
        @click="goto_user_profile"
      >
        Your Profile
      </p>
      <p
        class="nav_link"
        v-if="$route.name !== 'FeedPage'"
        @click="goto_tweet_feed"
      >
        Tweet Feed
      </p>
      <logout-button></logout-button>
    </nav>
  </div>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";
export default {
  components: { LogoutButton },
  name: "page-header",
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    // Using a router to change page to user profile
    goto_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
    // Using router to change to feed page
    goto_tweet_feed() {
      this.$router.push({ path: "/feed-page" });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  color: white;
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  grid-template-rows: 1fr 25px;
  place-items: center;
}

nav {
  display: grid;
  gap: 20px;
  grid-template-columns: 100px 1fr;
  grid-auto-flow: column;
  font-size: 12px;
  place-items: center;
  justify-items: start;
}

.nav_link:hover {
  text-decoration: underline;
}
</style>