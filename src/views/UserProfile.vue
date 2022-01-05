<template>
  <div>
    <user-information></user-information>
    <button @click="get_user_tweets">Show Your Tweets</button>
    <user-tweets></user-tweets>
    <user-followers :userId="user.userId"></user-followers>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
import UserFollowers from "../components/GlobalComponents/UserFollowers.vue";
import UserInformation from "../components/UserProfile/UserInformation.vue";
import UserTweets from "../components/UserProfile/UserTweets.vue";
export default {
  components: { UserInformation, UserTweets, UserFollowers },
  computed: {
    user_tweets() {
      return this.$store.state.user_tweets;
    },
  },
  data() {
    return {
      user: this.$cookies.get("user"),
      error_message: "",
    };
  },
  name: "user-profile",
  methods: {
    get_user_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          params: {
            userId: this.user.userId,
          },
        })
        .then((response) => {
          response;
          this.$store.commit("update_user_tweets", response.data);
        })
        .catch((error) => {
          this.error_message = error;
        });
    },
  },
};
</script>

<style scoped>
</style>