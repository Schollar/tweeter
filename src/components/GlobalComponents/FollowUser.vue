<template>
  <div>
    <button @click="follow_user()">Follow user</button>
    <p>{{ api_message }}</p>
  </div>
</template>

<script>
export default {
  name: "follow-user",
  data() {
    return {
      api_message: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  props: {
    selected_user: Object,
  },
  methods: {
    follow_user() {
      var logintoken = this.user.loginToken;
      var followid = this.selected_user.userId;
      console.log(logintoken);
      console.log(followid);
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