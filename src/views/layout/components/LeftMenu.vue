<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[deafaultselectkey]"
      :default-open-keys="[deafaultopenkey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
    <template v-for="route in $store.state.menuRouters">
       <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
        <span slot="title"
          ><a-icon :type="route.meta.icon" />
          <router-link :to="{ name: route.name }" tag="span">{{
            route.meta.title
          }}</router-link></span
        >
        <template v-for="childrenRouter in route.children">
              <a-menu-item  :key="childrenRouter.name" v-if="!childrenRouter.meta.hidden" >
          <a-icon :type="childrenRouter.meta.icon"/>
          <router-link :to="{ name: childrenRouter.name }" tag="span">
            {{ childrenRouter.meta.title }}</router-link
          >
        </a-menu-item>
        </template>
      </a-sub-menu>
    </template>

    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    deafaultselectkey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    deafaultopenkey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.menu-list {
  width: 180px;
  height: 100%;
  position: fixed;
  .ant-menu {
    height: 100%;
  }
}
</style>
