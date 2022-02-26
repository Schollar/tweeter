<template>
  <div>
    <page-header></page-header>
    <user-information></user-information>
    <!-- Sending some props to components -->
    <section class="follow_and_followers_container">
      <user-followers :userId="user.userId"></user-followers>
      <people-followed :userId="user.userId"></people-followed>
    </section>
    <show-user-tweets :selected_user="user"></show-user-tweets>
  </div>
</template>

<script>
import PageHeader from "@/components/GlobalComponents/PageHeader.vue";
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
  // If user does not exist send them to login/signup page
  beforeCreate() {
    var user = this.$cookies.get("user");
    if (!user) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    // Axios get request to get the user tweets of the userId we send to the api
    // On success we call a store mutation to set an array of the users tweets
    get_user_tweets() {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/tweets`,
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
.follow_and_followers_container {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
}
div {
  background: grey;
}
</style>