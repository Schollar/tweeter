<template>
  <div class="feed_page_body">
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
.feed_page_body {
  display: grid;
  place-items: center;
  background-color: grey;
  width: 100vw;
}
</style>