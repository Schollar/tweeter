<template>
  <div>
    <user-information></user-information>
    <button @click="get_user_tweets">Show Your Tweets</button>
    <user-tweets></user-tweets>
    <user-followers :userId="user.userId"></user-followers>
    <people-followed :userId="user.userId"></people-followed>
  </div>
</template>

<script>
import PeopleFollowed from "../components/GlobalComponents/PeopleFollowed.vue";
import UserFollowers from "../components/GlobalComponents/UserFollowers.vue";
import UserInformation from "../components/UserProfile/UserInformation.vue";
import UserTweets from "../components/UserProfile/UserTweets.vue";
export default {
  components: { UserInformation, UserTweets, UserFollowers, PeopleFollowed },
  computed: {
    user_tweets() {
      return this.$store.state.user_tweets;
    },
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  name: "user-profile",
  methods: {
    get_user_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          params: {
            userId: this.user.userId,
          },
        })
        .then((response) => {
          response;
          this.$store.commit("update_user_tweets", response.data);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
</style>