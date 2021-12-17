<template>
  <div>
    <form>
      <div>
        <label for="username">Username</label>
        <input name="username" v-model="username" placeholder="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          name="password"
          v-model="password"
          placeholder="password"
          type="password"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input name="email" v-model="email" placeholder="Email" />
      </div>
      <div>
        <label for="bio">Bio</label>
        <input name="bio" v-model="bio" placeholder="bio" />
      </div>
      <div>
        <label for="birthday">Birthday</label>
        <input name="birthday" v-model="birthday" placeholder="birthday" />
      </div>
      <div>
        <label for="img_url">Profile Image URL</label>
        <input
          name="img_url"
          v-model="img_url"
          placeholder="Url for Profile Image"
        />
      </div>
      <div>
        <label for="banner_url">Banner Image URL</label>
        <input
          name="banner_url"
          v-model="banner_url"
          placeholder="Url for banner Image"
        />
      </div>
      <input type="submit" value="register" />
    </form>
  </div>
</template>

<script>
export default {
  name: "register-form",
  methods: {
    register_new_user() {},
  },
};
</script>

<style lang="scss" scoped>
</style>