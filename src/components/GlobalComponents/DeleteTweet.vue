<template>
  <div>
    <button @click="delete_tweet()">Delete Tweet</button>
  </div>
</template>

<script>
export default {
  name: "delete-tweet",
  props: {
    tweetId: Number,
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    delete_tweet() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          this.$store.commit("add_new_tweet", response.data);
          this.$emit("update_tweets");
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