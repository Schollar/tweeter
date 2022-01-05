<template>
  <div>
    <h3>Users that are followed</h3>
    <p v-for="user in users_that_are_followed" :key="user.userId">
      {{ user.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: "user-followers",
  created() {
    this.get_users_that_are_followed();
  },
  methods: {
    get_users_that_are_followed() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          params: {
            userId: this.userId,
          },
        })
        .then((response) => {
          this.users_that_are_followed = response.data;
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
      users_that_are_followed: [],
    };
  },
};
</script>

<style scoped>
</style>