<template>
  <div>
    <button>Like This</button>
    <p v-for="like in tweet_likes" :key="like.userId"></p>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  data() {
    return {
      tweet_likes: [],
    };
  },
  methods: {
    get_tweet_likes() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
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