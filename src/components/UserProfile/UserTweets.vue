<template>
  <div>
    <section
      v-for="tweet in user_tweets"
      :key="tweet.tweetId"
      class="tweet_card"
    >
      <p>{{ tweet.username }}</p>
      <p>{{ tweet.content }}</p>
      <p>{{ tweet.createdAt }}</p>
      <button @click="delete_tweet">Delete Tweet</button>
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
    delete_tweet() {
      var login_token = this.$store.state.user.loginToken;
      var user_id = this.$store.state.user.user_id;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "DELETE",
          data: {
            loginToken: login_token,
            tweetId: this.tweet.tweetId,
          },
        })
        .then((response) => {
          response;
          this.$axios
            .request({
              url: "https://tweeterest.ga/api/tweets",
              params: {
                userId: user_id,
              },
            })
            .then((response2) => {
              response2;
              this.$store.commit("update_user_tweets", response2.data);
            })
            .catch((error) => {
              this.error_message = error;
            });
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