<template>
  <!-- If our userId equals our prop userId we can show en edit your profile button along with another prop being passed
we can decide when and where we need it. -->
  <div v-if="user.userId == userId">
    <p v-show="hide_link" @click="move_to_user_profile()">Edit Your Profile</p>
  </div>
  <!-- If has_followed is true then we show the unfollow user component -->
  <div v-else-if="has_followed">
    <un-follow-user :userId="userId"></un-follow-user>
  </div>
  <!-- If has_followed is false we show the follow user button -->
  <div
    v-else
    v-bind:class="{ follow_user_section: is_normal, comment_follow: is_small }"
  >
    <p class="follow_button" @click="follow_user()">Follow</p>
  </div>
</template>

<script>
import UnFollowUser from "./UnFollowUser.vue";
export default {
  components: { UnFollowUser },
  name: "follow-user",
  props: {
    userId: Number,
    hide_link: Boolean,
    is_small: Boolean,
    is_normal: Boolean,
  },
  computed: {
    followed_users() {
      return this.$store.state["followed_users"];
    },
  },
  mounted() {
    // On mounted we run a function and we listen for the global event update_user_follow which is emitted from this component
    this.get_loggedin_user_follows();
    this.$root.$on("update_user_follow", (data) => {
      if (data === this.userId) {
        this.has_followed = !this.has_followed;
      }
    });
  },
  // User variable and has_followed in our data section
  data() {
    return {
      user: this.$cookies.get("user"),
      has_followed: false,
    };
  },
  methods: {
    // Function to toggle our has_followed variable based on info sent up from unfollow component
    update_has_followed(boo) {
      this.has_followed = boo;
    },
    // Loop through our followed users array and check to see if we are following user
    check_user_followed() {
      for (var i = 0; i < this.followed_users.length; i++) {
        if (this.followed_users[i].userId === this.userId) {
          this.has_followed = true;
        }
      }
    },
    // Axios request that gets user follows, we send our users Id as a param and then send the response.data to the vuex store
    // then we run our check_user followed method
    get_loggedin_user_follows() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "GET",
          params: {
            userId: this.user.userId,
          },
        })
        .then((response) => {
          this.$store.commit("update_followed_users", response.data);
          this.check_user_followed();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong getting user follows. Please try again later"
          );
        });
    },
    // Simple function to switch views by pushing the view path to the router
    move_to_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
    // Follow user axios post request, we send the user login token and the followId(userId of the person we are following)
    // Upon success we emit 2 global events, one to notify the user, the other updates our follow list in the vuex store
    follow_user() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "POST",
          data: {
            loginToken: this.user.loginToken,
            followId: this.userId,
          },
        })
        .then((response) => {
          response;
          this.$root.$emit("api_message", `You are now following this user!`);
          this.$root.$emit("update_user_follow", this.userId);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong following the user. Please try again later"
          );
        });
    },
  },
};
</script>

<style lang=scss>
.comment_follow {
  display: grid;
  place-items: center;

  > .follow_button {
    font-size: 10px;
    font-weight: 600;
    width: 35px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 2px;
    padding-left: 5px;
    color: white;
    background-color: purple;
  }
}
.follow_user_section {
  display: grid;
  place-items: center;
}
.follow_button {
  font-size: 10px;
  font-weight: 600;
  width: 35px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 2px;
  padding-left: 5px;
  color: white;
  background-color: #1d9bf0;
}
.follow_button:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>