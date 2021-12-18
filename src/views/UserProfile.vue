<template>
  <div>
    <user-information></user-information>
  </div>
</template>

<script>
import UserInformation from "../components/UserProfile/UserInformation.vue";
export default {
  components: { UserInformation },
  name: "user-profile",
};
</script>

<style scoped>
</style>