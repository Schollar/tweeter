<template>
  <div>
    <page-header></page-header>
    <new-tweet></new-tweet>
    <show-tweets></show-tweets>
  </div>
</template>

<script>
import NewTweet from "../components/FeedPage/NewTweet.vue";
import ShowTweets from "../components/FeedPage/ShowTweets.vue";
import PageHeader from "../components/GlobalComponents/PageHeader.vue";
export default {
  components: { NewTweet, ShowTweets, PageHeader },
  name: "feed-page",
};
</script>

<style scoped>
</style>