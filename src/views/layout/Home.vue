<template>
  <div class="home">
    <menu-list :key="key" />
    <div :class="{ 'main-app': true, 'extend-app': $store.state.collapsed }">
      <slider-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuList from './components/menuList'
import sliderNav from './components/sliderNav'
export default {
  data () {
    return {
      key: new Date().getTime()
    }
  },
  watch: {
    $route () {
      this.key = new Date().getTime()
    }
  },
  components: {
    menuList,
    sliderNav
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>