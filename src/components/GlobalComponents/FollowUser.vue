<template>
  <div v-if="user.userId === userId">
    <p @click="move_to_user_profile()">Edit Your Profile</p>
  </div>
  <div v-else-if="has_followed">
    <un-follow-user :userId="userId"></un-follow-user>
  </div>
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
    is_small: Boolean,
    is_normal: Boolean,
  },
  computed: {
    followed_users() {
      return this.$store.state["followed_users"];
    },
  },
  mounted() {
    this.get_loggedin_user_follows();
    this.$root.$on("update_user_follow", (data) => {
      if (data === this.userId) {
        this.has_followed = !this.has_followed;
      }
    });
  },
  data() {
    return {
      user: this.$cookies.get("user"),
      has_followed: false,
    };
  },
  methods: {
    update_has_followed(boo) {
      this.has_followed = boo;
    },
    check_user_followed() {
      for (var i = 0; i < this.followed_users.length; i++) {
        if (this.followed_users[i].userId === this.userId) {
          this.has_followed = true;
        }
      }
    },
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
    move_to_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
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