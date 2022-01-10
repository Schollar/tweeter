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
  // Checking to see if user exists. If not we push them to the login/signup page
  beforeCreate() {
    var user = this.$cookies.get("user");
    if (!user) {
      this.$router.push({ path: "/" });
    }
  },
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