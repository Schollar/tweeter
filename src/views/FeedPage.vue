<template>
  <div>
    <new-tweet></new-tweet>
  </div>
</template>

<script>
import NewTweet from "../components/FeedPage/NewTweet.vue";
export default {
  components: { NewTweet },
  name: "feed-page",
};
</script>

<style scoped>
</style>