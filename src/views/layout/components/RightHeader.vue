<template>
  <div class="main-home" :class="{ collapsed: $store.state.collapsed }">
    <div class="main-home-left">
      <div class="menu-button">
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>

      <div class="crumbs">
        <a-breadcrumb v-if="currentRoute.length > 1">
          <a-breadcrumb-item>
            {{currentRoute[0].meta.title}}
            </a-breadcrumb-item>
          <a-breadcrumb-item><router-link :to="{name:currentRoute[1].name}">
            {{currentRoute[1].meta.title}}
            </router-link></a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="user-info">
      <div class="login-info">欢迎{{$store.state.user.username}}<a-icon type="down" /></div>
      <div class="login-out" @click="loginout">退出</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  created() {
    // console.log(this.$router);
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('toggleCollapsed');
    },
    loginout() {
      this.$store.dispatch('loginout');
      this.$router.push('/system');
    },
  },
};
</script>

<style scoped lang="less" >
.main-home {
  height: 50px;
  margin-left: 180px;
  padding: 10px 10px 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .main-home-left {
    display: flex;
    align-items: center;
    .crumbs {
      margin-left: 20px;
      .ant-breadcrumb{
        color: rgb(9, 196, 243);
        font-weight: bold;
      }
    }
    .menu-button {
      line-height: 50px;
    }
  }
  .user-info {
    color: #666;
    margin-right: 20px;
    position: relative;

    .login-info {
      cursor: pointer;
      font-size: 16px;
      color: rgb(124, 243, 203);
      font-weight: bold;
    }
    &:hover {
      div {
        display: block;
      }
    }
    .login-out {
      width: 100px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      top: 22px;
      right: 12px;
      text-align: center;
      background-color: aquamarine;
      font-size: 14px;
      font-weight: bolder;
      border-radius: 6px;
      display: none;
      cursor: pointer;
    }
  }
  &.collapsed {
    transition: all 0.3s;
    margin-left: 80px;
  }
}
</style>
