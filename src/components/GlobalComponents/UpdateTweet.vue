<template>
  <div>
    <!-- Button toggles the show_form variable which the next section is shown based on if show_form is true or false -->
    <p class="edit_tweet_button" @click="show_form = !show_form">Edit Tweet</p>
    <section v-show="show_form">
      <form action="javascript:void(0)" class="update_tweet_form">
        <div class="form_input">
          <label for="update_tweet">Tweet: </label>
          <textarea
            maxlength="200"
            name="update_tweet"
            ref="update_tweet"
            placeholder="Update Tweet"
            type="textarea"
          />
        </div>
        <!-- When clicked we call the update tweet function -->
        <input
          class="form_submit_button"
          @click="update_tweet"
          type="submit"
          value="Edit Tweet"
        />
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
      // Sending a patch axios request to update a tweet. Send the tweetId login token and conent to update.
      // Upon success we emit a global events to update our tweets list array on the feed page
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
          this.$root.$emit("update_tweets");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong updating the tweet. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.form_input {
  display: grid;
}
.edit_tweet_button {
  font-size: 11px;
}
.update_tweet_form {
  color: white;
  background: black;
  display: grid;
  position: absolute;
  gap: 10px;
  border: 1px solid black;
  top: 50%;
  left: 40%;
  z-index: 3;
  padding: 10px;
}
.edit_tweet_button:hover {
  text-decoration: underline;
}

.form_submit_button {
  border-radius: 20px;
  border: 1px solid black;
  height: 25px;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
</style>