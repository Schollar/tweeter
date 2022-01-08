<template>
  <div>
    <page-header></page-header>
    <user-information></user-information>
    <user-followers :userId="user.userId"></user-followers>
    <people-followed :userId="user.userId"></people-followed>
    <show-user-tweets :selected_user="user"></show-user-tweets>
  </div>
</template>

<script>
import PageHeader from "../components/GlobalComponents/PageHeader.vue";
import PeopleFollowed from "../components/GlobalComponents/PeopleFollowed.vue";
import UserFollowers from "../components/GlobalComponents/UserFollowers.vue";
import ShowUserTweets from "../components/UserProfile/ShowUserTweets.vue";
import UserInformation from "../components/UserProfile/UserInformation.vue";
export default {
  components: {
    UserInformation,
    UserFollowers,
    PeopleFollowed,
    ShowUserTweets,
    PageHeader,
  },
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
  beforeCreate() {
    var user = this.$cookies.get("user");
    if (!user) {
      this.$router.push({ path: "/" });
    }
  },
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
div {
  background: grey;
}
</style>