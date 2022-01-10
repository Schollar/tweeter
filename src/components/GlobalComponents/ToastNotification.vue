<template>
  <div>
    <!-- If show_toast comes back as truthy this section gets shown -->
    <section v-if="show_toast" class="toast_card">
      <p>
        {{ api_message }}
      </p>
      <!-- Our button toggles show toast variable to false to remove the section from the page -->
      <button @click="show_toast = false">Ok</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "toast-notification",
  data() {
    return {
      api_message: "",
      show_toast: false,
    };
  },
  // Listening for the global event api message which is sent on every axios request error, and one or two successful requests, and we call the show message function
  mounted() {
    this.$root.$on("api_message", this.show_message);
  },
  methods: {
    // This function takes the string it receives and sets the api message variable to it
    // Then sets the show_toast variable to true to show the notifaction card on the page
    show_message(string) {
      this.api_message = string;
      this.show_toast = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast_card {
  display: grid;
  place-items: center;
  width: 250px;
  border: 1px solid white;
  background-color: black;
  color: white;
  border-radius: 10px;
  height: 150px;
  position: fixed;
  top: calc(50% - 125px); // half of width
  left: calc(50% - 125px);

  > p {
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: 600;
  }

  > button {
    width: 80%;
    border-radius: 20px;
    border: 1px solid black;
    height: 25px;
    background-color: #1d9bf0;
    color: white;
    font-family: sans-serif;
    font-weight: 775;
    margin-bottom: 10px;
  }
}
</style>