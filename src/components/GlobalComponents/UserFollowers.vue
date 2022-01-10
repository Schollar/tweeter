<template>
  <div>
    <h6>Users that follow {{ user_name }}</h6>
    <!-- If array is empty we show this p tag -->
    <p v-if="users_that_follow.length === 0">Nothing to show</p>
    <!-- Else we loop through the array and show the users that follow the userId sent as a prop -->
    <p v-else v-for="user in users_that_follow" :key="user.userId">
      {{ user.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: "user-followers",
  // When component is created run a function
  created() {
    this.get_users_that_follow();
  },
  methods: {
    // Axios get request with a userId sent as a param to get the followers of the userId sent.
    // On success we set an array equal to the response.data sent back from api
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
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong getting users that follow. Please try again later"
          );
        });
    },
  },
  props: {
    user_name: String,
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
h6 {
  font-size: 10px;
}
</style>