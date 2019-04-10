<template>
  <div>
    我还能说点啥
    <h3>{{tit}}</h3>
    <a href="user.html">user</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tit: '这是标题'
    }
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
