<template>
  <div>
    <p v-for="user in users_that_follow" :key="user.userId">
      {{ user.username }}
    </p>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
export default {
  name: "other-users-followers",
  created() {
    this.get_users_that_follow();
  },
  methods: {
    get_users_that_follow() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/followers",
          params: {
            userId: this.$route.params.userId,
          },
        })
        .then((response) => {
          this.users_that_follow = response.data;
        })
        .catch((error) => {
          error;
          this.error_message = "Sorry something went wrong";
        });
    },
  },
  props: {
    selected_user: Object,
  },
  data() {
    return {
      users_that_follow: [],
      error_message: "",
    };
  },
};
</script>

<style scoped>
</style>