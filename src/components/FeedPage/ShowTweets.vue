<template>
  <section class="tweet_section">
    <!-- Loop through our tweets array, and send each tweet to the user tweet component -->
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
  // Getting variables from store
  computed: {
    tweets() {
      return this.$store.state["tweets"];
    },
    other_users() {
      return this.$store.state["other_users"];
    },
  },
  // When component is created run the show tweets function, also listening for global event update_tweets it then runs show_tweets function.
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
        // Axios request to get all tweets, we then sort the data by the createdAt key to show the most recent tweets on the page first
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
          // Once finished sorting we send the array to the store
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
  margin-top: 40px;
}
</style>