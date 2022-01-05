<template>
  <div>
    <button @click="show_form = !show_form">Edit Tweet</button>
    <section v-show="show_form" class="update_tweet_form">
      <form action="javascript:void(0)">
        <div>
          <label for="update_tweet">Tweet: </label>
          <textarea
            maxlength="200"
            name="update_tweet"
            ref="update_tweet"
            placeholder="Update Tweet"
            type="textarea"
          />
        </div>
        <!-- When clicked we call the new tweet function -->
        <input @click="update_tweet" type="submit" value="Edit Tweet" />
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "update-tweet",
  data() {
    return {
      user: this.$cookies.get("user"),
      show_form: false,
    };
  },
  props: {
    tweetId: Number,
  },
  methods: {
    update_tweet() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "PATCH",
          data: {
            tweetId: this.tweetId,
            loginToken: this.user.loginToken,
            content: this.$refs["update_tweet"].value,
          },
        })
        .then((response) => {
          response;
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