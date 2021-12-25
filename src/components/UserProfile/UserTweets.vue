<template>
  <div>
    <!-- Looping through our tweets and displaying them on the page in their own card. -->
    <section
      v-for="tweet in user_tweets"
      :key="tweet.tweetId"
      class="tweet_card"
      :ref="tweet.tweetId"
    >
      <p>{{ tweet.username }}</p>
      <p>{{ tweet.content }}</p>
      <p>{{ tweet.createdAt }}</p>
      <button @click="delete_tweet(tweet.tweetId)">Delete Tweet</button>
    </section>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
export default {
  name: "user-tweets",
  data() {
    return {
      error_message: "",
    };
  },
  methods: {
    update_tweets_after_delete() {
      // Getting our userId from the store and passing it to the api to get and updated list of tweets and then
      // updating the store with that information
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

    delete_tweet(arg) {
      // Getting a valid login token and the tweetId, passing it to the api to delete a tweet, upon success we call our update tweets function to update the list
      var login_token = this.$store.state.user.loginToken;
      var tweetId = arg;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "DELETE",
          data: {
            loginToken: login_token,
            tweetId: tweetId,
          },
        })
        .then(() => {
          this.update_tweets_after_delete();
        })
        .catch((error) => {
          this.error_message = error;
        });
    },
  },
  computed: {
    user_tweets() {
      return this.$store.state.user_tweets;
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
  gap: 25px;
}
.tweet_card {
  border: 1px solid black;
}
</style>