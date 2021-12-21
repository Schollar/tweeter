<template>
  <div>
    <form action="javascript:void(0)">
      <div>
        <label for="new_tweet">Tweet: </label>
        <textarea
          maxlength="200"
          name="new_tweet"
          ref="new_tweet"
          placeholder="New Tweet"
          type="textarea"
        />
      </div>
      <input @click="new_tweet" type="submit" value="Post Tweet" />
    </form>
  </div>
</template>

<script>
export default {
  name: "new-tweet",
  methods: {
    new_tweet() {
      var login_token = this.$cookies.get("user");
      var content = this.$refs["new_tweet"].value;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "POST",
          data: {
            loginToken: login_token.loginToken,
            content: content,
          },
        })
        .then((response) => {
          this.$store.commit("add_new_tweet", response.data);
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>