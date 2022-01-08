<template>
  <section class="tweet_section">
    <user-tweet
      :tweet="tweet"
      v-for="tweet in tweets"
      :key="tweet.tweetId"
    ></user-tweet>
  </section>
</template>

<script>
import UserTweet from "../GlobalComponents/UserTweet.vue";
export default {
  name: "show-tweets",
  components: {
    UserTweet,
  },
  computed: {
    tweets() {
      return this.$store.state["tweets"];
    },
    other_users() {
      return this.$store.state["other_users"];
    },
  },
  created: function () {
    this.show_tweets();
    this.$root.$on("update_tweets", this.show_tweets());
  },
  methods: {
    show_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "GET",
        })
        .then((response) => {
          var user_tweets = response.data.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
              return 1;
            } else if (a.createdAt > b.createdAt) {
              return -1;
            } else {
              return 0;
            }
          });
          this.$store.commit("get_tweets", user_tweets);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong showing the tweets. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.tweet_section {
  display: grid;
  gap: 25px;
}
</style>