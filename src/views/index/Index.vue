<template>
  <div>
    vue页
    <h3>{{tit}}</h3>
    <a href="user.html">user</a>
    <a href="home.html">home</a>
    <test></test>
  </div>
</template>

<script>
import test from './test'
export default {
  data() {
    return {
      tit: '这是标题'
    }
  },
  components: {
    test
  }
}
</script>

<style scoped>
body {
  background: #ccc;
  color: #999;
  font-size: 20px;
}
</style>
