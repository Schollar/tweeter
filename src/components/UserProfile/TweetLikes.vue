<template>
  <div>
    <p ref="like_or_likes"></p>
    <button v-if="!has_liked" @click="like_tweet()">Like Tweet</button>
    <button v-else @click="unlike_tweet()">Unlike Tweet</button>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  data() {
    return {
      user: this.$cookies.get("user"),
      tweet_likes: [],
      has_liked: false,
    };
  },
  mounted() {
    this.get_tweet_likes();
  },
  methods: {
    inject_like_count() {
      if (this.tweet_likes.length === 1) {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.tweet_likes.length} Like`;
      } else {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.tweet_likes.length} Likes`;
      }
    },
    check_user_liked(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].userId === this.user.userId) {
          this.has_liked = true;
        }
      }
    },
    remove_user_like() {
      for (var i = 0; i < this.tweet_likes.length; i++) {
        if (this.tweet_likes[i].userId === this.user.userId) {
          this.has_liked = false;
          this.tweet_likes.splice(i, 1);
        }
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
          this.remove_user_like();
          this.inject_like_count();
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
          this.tweet_likes.push({
            tweetId: this.tweetId,
            userId: this.user.userId,
            username: this.user.username,
          });
          this.has_liked = true;
          this.inject_like_count();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong. Please try again later"
          );
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
          this.check_user_liked(this.tweet_likes);
          this.inject_like_count();
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
  props: {
    tweetId: Number,
  },
};
</script>

<style scoped>
</style>