<template>
  <div>
    <p>{{ selected_user.username }}</p>
    <p>{{ selected_user.bio }}</p>
    <follow-user :selected_user="this.selected_user"></follow-user>
  </div>
</template>

<script>
import FollowUser from "../components/GlobalComponents/FollowUser.vue";
export default {
  name: "other-users-profile",
  components: {
    FollowUser,
  },
  mounted() {
    this.fetch_user_info(this.selected_user["userId"]);
  },
  computed: {
    other_users() {
      return this.$store.state["other_users"];
    },
    selected_user() {
      return this.$store.state["selected_user"];
    },
  },
  created() {
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
          for (i = 0; i < response.data.length; i++) {
            if (userid === response.data[i].userId) {
              this.$store.commit("update_selected_user", response.data[i]);
            }
          }
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