<template>
  <div>
    <section v-for="tweet in this_user_tweets" :key="tweet.tweetId">
      <p>{{ tweet.username }}</p>
      <p>{{ tweet.content }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "other-user-tweets",
  props: {
    this_user_tweets: Array,
  },
};
</script>

<style scoped>
div {
  background: grey;
}
</style>