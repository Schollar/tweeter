<template>
  <section>
    <section class="user_info_container">
      <section ref="username_container" class="info_container">
        <p ref="username" class="username">Username: {{ user.username }}</p>
        <img
          @click="edit_content('username')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="username_input_container" class="username_input_container">
        <input ref="username_input" class="username_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('username')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('username')"
          alt=""
        />
      </section>
      <section ref="email_container" class="info_container">
        <p ref="email" class="email">Email: {{ user.email }}</p>
        <img
          @click="edit_content('email')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="email_input_container" class="email_input_container">
        <input ref="email_input" class="email_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('email')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('email')"
          alt=""
        />
      </section>
      <section ref="bio_container" class="info_container">
        <p ref="bio" class="bio">Your Bio: {{ user.bio }}</p>
        <img
          @click="edit_content('bio')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="bio_input_container" class="bio_input_container">
        <input ref="bio_input" class="bio_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('bio')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('bio')"
          alt=""
        />
      </section>
      <section ref="birthdate_container" class="info_container">
        <p ref="birthdate" class="birthdate">Birthday: {{ user.birthdate }}</p>
        <img
          @click="edit_content('birthdate')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section
        ref="birthdate_input_container"
        class="birthdate_input_container"
      >
        <input ref="birthdate_input" class="birthdate_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('birthdate')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('birthdate')"
          alt=""
        />
      </section>
      <section ref="imageUrl_container" class="info_container">
        <section>
          <p>Profile Picture:</p>
          <!-- If user doesnt have a profile picture we set it to a palceholder -->
          <img
            class="profile_picture"
            v-if="this.$store.state.user.imageUrl === null"
            src="@/assets/placeholderpfp.jpg"
            alt=""
          />
          <img
            class="profile_picture"
            v-else
            v-bind:src="this.user.imageUrl"
            alt="User displayed profile picture"
          />
        </section>
        <img
          @click="edit_content('imageUrl')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="imageUrl_input_container" class="imageurl_input_container">
        <input ref="imageUrl_input" class="imageurl_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('imageUrl')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('imageUrl')"
          alt=""
        />
      </section>
      <section ref="bannerUrl_container" class="info_container">
        <section>
          <p>Banner Picture:</p>
          <!-- If user does not have banner set it to a placeholder -->
          <img
            class="banner_picture"
            v-if="this.$store.state.user.bannerUrl === null"
            src="https://www.fillmurray.com/350/200"
            alt=""
          />
          <img
            class="banner_picture"
            v-else
            v-bind:src="this.user.bannerUrl"
            alt="User displayed profile picture"
          />
        </section>
        <img
          @click="edit_content('bannerUrl')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section
        ref="bannerUrl_input_container"
        class="bannerurl_input_container"
      >
        <input ref="bannerUrl_input" class="bannerurl_input" type="text" />
        <img
          class="edit_icon"
          src="@/assets/checkmark.svg"
          @click="update_info('bannerUrl')"
          alt=""
        />
        <img
          class="edit_icon"
          src="@/assets/cancel.svg"
          @click="cancel_edit('bannerUrl')"
          alt=""
        />
      </section>
      <delete-user></delete-user>
    </section>
  </section>
</template>

<script>
import DeleteUser from "./DeleteUser.vue";
export default {
  components: { DeleteUser },
  // When mounted call a store mutation
  mounted() {
    this.$store.commit("update_user", this.$cookies.get("user"));
  },
  computed: {
    user() {
      return this.$store.state["user"];
    },
  },
  methods: {
    // Cancel function to cancel out the editing of an input on the page
    cancel_edit(arg) {
      this.$refs[`${arg}_input_container`].style.display = "none";
      this.$refs[`${arg}_container`].style.display = "grid";
    },
    // Update function that takes in a value and login token and send an axios patch request
    // On success we call a store mutation, set some page styling, update our cookies information and emit a global event to the toast notification
    update_info(arg) {
      var value = this.$refs[`${arg}_input`].value;
      var login_token = this.$store.state.user.loginToken;

      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/users`,
          method: "PATCH",
          data: {
            loginToken: login_token,
            [arg]: value,
          },
        })
        .then((response) => {
          response;

          this.$store.commit("update_info", { field: arg, val: value });
          this.$refs[`${arg}_input_container`].style.display = "none";
          this.$refs[`${arg}_container`].style.display = "grid";
          this.$cookies.set("user", this.$store.state.user);
          this.$root.$emit("api_message", "Your information has been updated!");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong Getting info. Please try again later"
          );
        });
    },
    // Function that displays an edit input on the page for the user to edit information
    edit_content(arg) {
      this.$refs[`${arg}_input_container`].style.display = "grid";
      this.$refs[`${arg}_input`].value = `${this.user[arg]}`;
      this.$refs[`${arg}_container`].style.display = "none";
    },
  },
  name: "user-information",
};
</script>

<style scoped>
.bannerurl_input_container {
  display: none;
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
}
.banner_picture {
  width: 100%;
}
.birthdate_input_container {
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
  display: none;
}
.imageurl_input_container {
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
  display: none;
}
.profile_picture {
  width: 150px;
}
.bio_input_container {
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
  display: none;
}
.email_input_container {
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
  display: none;
}
.username_input_container {
  grid-auto-flow: column;
  place-items: center;
  gap: 5px;
  display: none;
}
.user_info_container {
  display: grid;
  place-items: center;
}
.info_container {
  display: grid;
  place-items: center;
  width: 90%;
  gap: 10px;
  grid-template-columns: 1fr 15px;
}
.edit_icon {
  width: 15px;
}
</style>