<template>
  <div>
    <section class="user_info_card">
      <p>{{ selected_user.username }}</p>
      <p>{{ selected_user.bio }}</p>
    </section>
    <follow-user :selected_user="this.selected_user"></follow-user>
    <user-followers :userId="Number($route.params.userId)"></user-followers>
  </div>
</template>

<script>
import FollowUser from "../components/GlobalComponents/FollowUser.vue";
import UserFollowers from "../components/GlobalComponents/UserFollowers.vue";
export default {
  name: "other-users-profile",
  data() {
    return {
      selected_user: {},
    };
  },
  components: {
    FollowUser,
    UserFollowers,
  },
  created() {
    this.$axios
      .request({
        url: "https://tweeterest.ga/api/users",
        method: "GET",
        params: {
          userId: this.$route.params.userId,
        },
      })
      .then((response) => {
        this.selected_user = response.data[0];
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style scoped>
div {
  display: grid;
  place-items: center;
}
</style>