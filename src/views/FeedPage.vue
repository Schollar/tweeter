<template>
  <div>
    <new-tweet></new-tweet>
    <show-tweets></show-tweets>
  </div>
</template>

<script>
import NewTweet from "../components/FeedPage/NewTweet.vue";
import ShowTweets from "../components/FeedPage/ShowTweets.vue";
export default {
  components: { NewTweet, ShowTweets },
  name: "feed-page",
};
</script>

<style scoped>
</style>