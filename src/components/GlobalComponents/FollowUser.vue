<template>
  <div v-if="user.userId === selected_user.userId">
    <p @click="move_to_user_profile()">Edit Your Profile</p>
  </div>
  <div v-else-if="has_followed">
    <un-follow-user
      :selected_user="this.selected_user"
      :has_followed="this.has_followed"
      @update_has_followed="update_has_followed"
    ></un-follow-user>
    <p>{{ api_message }}</p>
  </div>
  <div v-else>
    <button @click="follow_user()">Follow user</button>
    <p>{{ api_message }}</p>
  </div>
</template>

<script>
import UnFollowUser from "./UnFollowUser.vue";
export default {
  components: { UnFollowUser },
  name: "follow-user",
  props: {
    selected_user: Object,
  },
  computed: {
    followed_users() {
      return this.$store.state["followed_users"];
    },
  },
  mounted() {
    this.get_loggedin_user_follows();
  },
  data() {
    return {
      api_message: "",
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
        if (this.followed_users[i].userId === this.selected_user.userId) {
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
          this.api_message = `Sorry something went wrong, please try again later`;
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
            followId: this.selected_user.userId,
          },
        })
        .then((response) => {
          response;
          this.api_message = `You are now following ${this.selected_user.username}`;
          this.has_followed = true;
        })
        .catch((error) => {
          error;
          this.api_message = `Sorry something went wrong, please try again later`;
        });
    },
  },
};
</script>

<style scoped>
</style>