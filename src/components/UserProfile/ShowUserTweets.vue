<template>
  <div>
    <button @click="show_user_tweets = !show_user_tweets">
      Show {{ selected_user.username }} Tweets
    </button>
    <other-user-tweets
      v-show="show_user_tweets"
      :this_user_tweets="this_user_tweets"
    ></other-user-tweets>
  </div>
</template>

<script>
import OtherUserTweets from "./OtherUserTweets.vue";
export default {
  name: "show-user-tweets",
  components: {
    OtherUserTweets,
  },
  data() {
    return {
      this_user_tweets: [],
      show_user_tweets: false,
    };
  },
  mounted() {
    this.get_user_tweets();
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