<template>
  <div>
    <button @click="show_tweet_comments">Show Comments</button>
    <section v-for="comment in tweet_comments" :key="comment.commentId">
      <new-comment :tweetId="comment.tweetId"></new-comment>
    </section>
  </div>
</template>

<script>
import NewComment from "./NewComment.vue";

export default {
  components: { NewComment },
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
      console.log(this.tweetId);
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          methods: "GET",
          data: {
            tweet: { tweetId: 2 },
          },
        })
        .then((response) => {
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