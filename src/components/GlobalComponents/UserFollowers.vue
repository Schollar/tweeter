<template>
  <div>
    <h3>Users that follow</h3>
    <p v-for="user in users_that_follow" :key="user.userId">
      {{ user.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: "user-followers",
  created() {
    this.get_users_that_follow();
  },
  methods: {
    get_users_that_follow() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/followers",
          params: {
            userId: this.userId,
          },
        })
        .then((response) => {
          this.users_that_follow = response.data;
        })
        .catch((error) => {
          error;
        });
    },
  },
  props: {
    userId: Number,
  },
  data() {
    return {
      users_that_follow: [],
    };
  },
};
</script>

<style scoped>
</style>