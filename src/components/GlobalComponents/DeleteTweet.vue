<template>
  <div>
    <!-- When button is clicked run the delete_tweet function -->
    <p class="delete_tweet_button" @click="delete_tweet">Delete Tweet</p>
  </div>
</template>

<script>
export default {
  name: "delete-tweet",
  props: {
    tweetId: Number,
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    // Sending the login token and tweetId to the api so it knows which tweet to delete.
    // Upon success we send out a global event to update the tweet list which removes the deleted tweet from the page
    delete_tweet() {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/tweets`,
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
          this.$root.$emit("update_tweets");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong deleting the tweet. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.delete_tweet_button {
  font-size: 11px;
}
.delete_tweet_button:hover {
  text-decoration: underline;
}
</style>