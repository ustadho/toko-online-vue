<template>
  <div id="app">
    <div id="nav">
      <Header></Header>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/container/Header.vue'
export default {
  name: 'header',
  components: {
    Header
  }
}
</script>

