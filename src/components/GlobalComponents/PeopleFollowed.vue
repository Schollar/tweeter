<template>
  <div>
    <h6>Users that are followed by {{ user_name }}</h6>
    <!-- If array is empty show this p tag -->
    <p v-if="users_that_are_followed.length === 0">Nothing to show</p>
    <!-- Else we show each user that are followed by the userId sent as a prop -->
    <p v-else v-for="user in users_that_are_followed" :key="user.userId">
      {{ user.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: "people-followed",
  // When component is created we call our function
  created() {
    this.get_users_that_are_followed();
  },
  methods: {
    // Axios request that gets the users that follow the userId sent to it.
    // Upon success we set our users that are followed array to the response data
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
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong getting followed users. Please try again later"
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
      users_that_are_followed: [],
    };
  },
};
</script>

<style scoped>
h6 {
  width: 115px;
  font-size: 10px;
}
</style>