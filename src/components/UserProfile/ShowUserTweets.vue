<template>
  <div>
    <!-- button that toggles variable to true or false when clicked -->
    <button class="show_user_tweets_button" @click="show = !show">
      Show {{ selected_user.username }} Tweets
    </button>
    <!-- If variable is true, this component gets shown on the page. It loops through the user tweets array and shows each tweet on the page -->
    <section class="tweet_card_container">
      <user-tweet
        v-show="show"
        v-for="tweet in this_user_tweets"
        :key="tweet.tweetId"
        :tweet="tweet"
      ></user-tweet>
    </section>
  </div>
</template>

<script>
import UserTweet from "../GlobalComponents/UserTweet.vue";
export default {
  name: "show-user-tweets",
  // Check to see on mounted if the userId comes back to true. If it is we call a function
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
  // Watching to see if selected user variable changes, if it does and the new value is undefined we call a function
  watch: {
    selected_user(newValue, oldValue) {
      if (newValue != undefined) {
        this.get_user_tweets();
      }
      oldValue;
    },
  },
  methods: {
    // Axios get request that we send a userId to get all the tweets from that ID
    // On success we set an array equal to the data sent back to us
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
          this.this_user_tweets = response.data.reverse();
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
div {
  display: grid;
  place-items: center;
}
.show_user_tweets_button {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid black;
  height: 25px;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
.tweet_card_container {
  display: grid;
  place-items: center;
  gap: 40px;
}
</style>