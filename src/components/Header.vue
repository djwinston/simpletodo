<template>
  <header class="header">
    <div class="nav">
      <router-link to="/about" v-if="this.$route.path === '/'">About</router-link>
      <router-link to="/" v-else>Home</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.header {
  background-color: white;
  border-bottom: $border-bottom;
  margin-bottom: 60px;
  .nav {
    padding: 20px;
    background-color: $white;
  }
}
</style>
