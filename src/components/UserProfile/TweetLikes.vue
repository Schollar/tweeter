<template>
  <div>
    <div>
      <div v-if="tweet_likes.length === 0">
        <p>{{ tweet_likes.length }} <span @click="like_tweet()">Likes</span></p>
        <p v-for="tweet in tweet_likes" :key="tweet.userId">
          Ola?
          {{ tweet.username }}
        </p>
      </div>
      <div v-else-if="tweet_likes.length < 2">
        <p>{{ tweet_likes.length }} <span @click="like_tweet()">Like</span></p>
        <p v-for="tweet in tweet_likes" :key="tweet.userId">
          {{ tweet.username }}
        </p>
      </div>

      <p>{{ error_message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  data() {
    return {
      user: this.$cookies.get("user"),
      tweet_likes: [],
      error_message: "",
    };
  },
  mounted() {
    this.get_tweet_likes();
  },
  methods: {
    unlike_tweet() {
      var login_token = this.user.loginToken;

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
      var login_token = this.user.loginToken;
      if (this.tweet_likes.length > 0) {
        for (var i = 0; i < this.tweet_likes.length; i++) {
          if (this.user.userId === this.tweet_likes[i].userId) {
            this.unlike_tweet();
          }
        }
      } else {
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
      }
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