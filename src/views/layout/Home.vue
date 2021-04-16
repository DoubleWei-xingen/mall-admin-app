<template>
  <div class="home">
    <left-menu :key='key'></left-menu>
    <right-header></right-header>
    <div class="right-content" :class="{ collapsed: $store.state.collapsed }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import RightHeader from './components/RightHeader.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    RightHeader,
  },
};
</script>

<style lang="less" scoped>
.home {
  .right-content {
    margin-left: 180px;
    padding: 10px 10px 0px 10px;
    &.collapsed{
      margin-left: 80px;
      transition: all .3s;
    }
  }
}
</style>
