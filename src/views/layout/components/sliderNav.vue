<template>
  <div class="slider-nav">
    <a-button
      class="btn"
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to="{ name: currentRoute[1].name }">
            {{ currentRoute[1] ? currentRoute[1].meta.title : "" }}</router-link
          ></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <a-select
      class="select"
      label-in-value
      :default-value="{ key: this.$store.state.user.username + ' 你好！' }"
      style="width: 100px"
    >
      <a-select-option value="logout" @click="logOut">
        退出登录
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentRoute: this.$router.currentRoute.matched
    }
  },
  watch: {
    $route () {
      this.currentRoute = this.$router.currentRoute.matched
    }
  },
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('changeCollapsed')
    },
    logOut () {
      this.$router.push({ name: 'Login' })
      this.$store.dispatch('logout')
    },
  }
}
</script>