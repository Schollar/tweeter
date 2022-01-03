<template>
  <div>
    <section v-if="check_user_liked(tweet_likes) === user.userId">
      <div v-if="tweet_likes.length === 0 || tweet_likes.length >= 2">
        <p>
          {{ tweet_likes.length }}
          Likes
          <span @click="unlike_tweet()">UnLike</span>
        </p>
      </div>
      <div v-else-if="tweet_likes.length < 2">
        <p>
          {{ tweet_likes.length }}
          <span @click="like_tweet()">Like</span>
        </p>
      </div>
    </section>
    <section v-else>
      <div v-if="tweet_likes.length === 0 || tweet_likes.length >= 2">
        <p>
          {{ tweet_likes.length }}
          <span @click="like_tweet()">Likes</span>
        </p>
      </div>
      <div v-else-if="tweet_likes.length < 2">
        <p>
          {{ tweet_likes.length }}
          <span @click="like_tweet()">Like</span>
        </p>
      </div>
    </section>

    <p>{{ error_message }}</p>
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
    check_user_liked(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].userId === this.user.userId) return arr[i].userId;
      }
    },
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