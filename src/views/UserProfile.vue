<template>
  <div>
    <user-information></user-information>
    <delete-user></delete-user>
    <button @click="get_user_tweets">Show Your Tweets</button>
    <user-tweets></user-tweets>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
import DeleteUser from "../components/UserProfile/DeleteUser.vue";
import UserInformation from "../components/UserProfile/UserInformation.vue";
import UserTweets from "../components/UserProfile/UserTweets.vue";
export default {
  components: { UserInformation, UserTweets, DeleteUser },
  computed: {
    user_tweets() {
      return this.$store.state.user_tweets;
    },
  },
  data() {
    return {
      error_message: "",
    };
  },
  name: "user-profile",
  methods: {
    get_user_tweets() {
      var user_id = this.$store.state.user.userId;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          params: {
            userId: user_id,
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