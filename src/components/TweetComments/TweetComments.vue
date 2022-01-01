<template>
  <div>
    <button @click="show_tweet_comments">Show Comments</button>
    <section v-for="comment in tweet_comments" :key="comment.commentId">
      {{ comment.username }}
      {{ comment.content }}
      {{ comment.createdAt }}
    </section>
  </div>
</template>

<script>
export default {
  name: "tweet-comments",
  computed: {
    tweet_comments() {
      return this.$store.state["tweet_comments"];
    },
  },
  props: {
    tweetId: Number,
  },
  methods: {
    show_tweet_comments() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          methods: "GET",
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$store.commit("update_tweet_comments", response.data);
        })
        .catch((error) => {
          error;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>