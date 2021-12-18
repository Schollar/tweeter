<template>
  <div>
    <section class="user_info_container">
      <section ref="username_container" class="username_container">
        <p ref="username" class="username">
          {{ user.username }}
        </p>
        <img
          @click="edit_content('username')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="username_input_container" class="username_input_container">
        <input ref="username_input" class="username_input" type="text" />
        <button
          ref="username_button"
          class="input_button"
          @click="update_info('username')"
        >
          Edit
        </button>
      </section>
      <section ref="email_container" class="username_container">
        <p ref="email" class="email">
          {{ user.email }}
        </p>
        <img
          @click="edit_content('email')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="email_input_container" class="email_input_container">
        <input ref="email_input" class="email_input" type="text" />
        <button
          ref="email_button"
          class="input_button"
          @click="update_info('email')"
        >
          Edit
        </button>
      </section>
      <section ref="bio_container" class="bio_container">
        <p ref="bio" class="bio">
          {{ user.bio }}
        </p>
        <img
          @click="edit_content('bio')"
          class="edit_icon"
          src="@/assets/penciledit.png"
          alt="A Pencil"
        />
      </section>
      <section ref="bio_input_container" class="bio_input_container">
        <input ref="bio_input" class="bio_input" type="text" />
        <button
          ref="bio_button"
          class="input_button"
          @click="update_info('bio')"
        >
          Edit
        </button>
      </section>
    </section>
    <p>{{ success_message }}</p>
    <p>{{ error_message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error_message: "",
      success_message: "",
    };
  },
  mounted() {
    this.$store.commit("update_user", this.$cookies.get("user"));
  },
  computed: {
    user() {
      return this.$store.state["user"];
    },
  },
  methods: {
    update_info(arg) {
      var value = this.$refs[`${arg}_input`].value;
      var login_token = this.$store.state.user.loginToken;

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "PATCH",
          data: {
            loginToken: login_token,
            [arg]: value,
          },
        })
        .then((response) => {
          response;
          this.success_message = "It worked!";
          this.$store.commit("update_info", { field: arg, val: value });
          this.$refs[`${arg}_input_container`].style.display = "none";
          this.$refs[`${arg}_container`].style.display = "grid";
          this.$cookies.set("user", this.$store.state.user);
        })
        .catch((error) => {
          this.error_message = error;
        });
    },
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
.email_input_container {
  display: none;
}
.username_input_container {
  display: none;
}
.user_info_container {
  display: grid;
  place-items: center;
}
.username_container {
  display: grid;
  place-items: center;
  gap: 10px;
  grid-template-columns: 1fr 15px;
}
.edit_icon {
  width: 15px;
}
</style>