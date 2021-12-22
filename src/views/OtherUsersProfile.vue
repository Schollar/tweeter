<template>
  <div>
    <p>{{ selected_user.username }} Username</p>
    <p>{{ selected_user.bio }}</p>
  </div>
</template>

<script>
export default {
  name: "other-users-profile",
  data() {
    return {
      selected_user: {},
    };
  },
  computed: {
    other_users() {
      return this.$store.state["other_users"];
    },
  },
  mounted() {
    this.fetch_user_info(this.$route.params.userId);
  },
  methods: {
    fetch_user_info(arg) {
      for (var i = 0; i < this.other_users.length; i++) {
        if (arg === this.other_users[i].username) {
          var userid = this.other_users[i].userId;
        }
      }
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "GET",
          params: {
            userId: userid,
          },
        })
        .then((response) => {
          console.log(response);
          this.selected_user = response.data[0];
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style scoped>
</style>