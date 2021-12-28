<template>
  <div>
    <div v-if="tweet_likes.length < 1">
      <p v-for="like in tweet_likes" :key="like.tweetId">
        {{ tweet_likes.length }} People Like this
      </p>
    </div>
    <div v-else>
      <p v-for="like in tweet_likes" :key="like.tweetId">
        {{ tweet_likes.length }} Person Likes this
      </p>
    </div>
    <button @click="unlike_tweet()">Unlike This</button>
    <button @click="like_tweet()">Like This</button>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  data() {
    return {
      tweet_likes: [],
      error_message: "",
    };
  },
  mounted() {
    this.get_tweet_likes();
  },
  methods: {
    unlike_tweet() {
      var user = this.$cookies.get("user");
      var login_token = user.loginToken;

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          method: "DELETE",
          data: {
            loginToken: login_token,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
          this.get_tweet_likes();
        })
        .catch((error) => {
          error;
          this.error_message =
            "Sorry something went wrong! Maybe you already unliked this?";
        });
    },
    like_tweet() {
      var user = this.$cookies.get("user");
      var login_token = user.loginToken;

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          method: "POST",
          data: {
            loginToken: login_token,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
          this.get_tweet_likes();
        })
        .catch((error) => {
          error;
          this.error_message =
            "Sorry something went wrong! Maybe you already like this?";
        });
    },

    get_tweet_likes() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          this.tweet_likes = response.data;
        })
        .catch((error) => {
          this.error_message = error;
        });
    },
  },
  props: {
    tweetId: Number,
  },
};
</script>

<style scoped>
</style>