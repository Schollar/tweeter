<template>
  <div>
    <button @click="show = !show">
      Show {{ selected_user.username }} Tweets
    </button>
    <user-tweet
      v-show="show"
      v-for="tweet in this_user_tweets"
      :key="tweet.tweetId"
      :tweet="tweet"
    ></user-tweet>
  </div>
</template>

<script>
import UserTweet from "../GlobalComponents/UserTweet.vue";
export default {
  name: "show-user-tweets",
  mounted() {
    if (this.selected_user.userId) {
      this.get_user_tweets();
    }
  },
  components: {
    UserTweet,
  },
  data() {
    return {
      this_user_tweets: [],
      show: false,
    };
  },
  watch: {
    selected_user(newValue, oldValue) {
      if (newValue != undefined) {
        this.get_user_tweets();
      }
      oldValue;
    },
  },
  methods: {
    get_user_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "GET",
          params: {
            userId: this.selected_user.userId,
          },
        })
        .then((response) => {
          this.this_user_tweets = response.data;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong getting this users tweets. Please try again later"
          );
        });
    },
  },
  props: {
    selected_user: Object,
  },
};
</script>

<style scoped>
</style>