<template>
  <div class="system">
    <div class="title">
      <h1>欢迎来到每日优鲜B端管理系统</h1>
    </div>
    <div class="model">
      <div>
        <a-button type="primary" @click="showModal"> 选择操作 </a-button>
        <a-modal v-model="visible" :title="title" @ok="handleOk">
            <div class="btnwrop">
                 <div class="loginbtn">
            <a-button type="primary" @click="getLogin"> 立即登录 </a-button>
          </div>
          <div class="logonbtn">
            <a-button type="primary" @click="getLogon"> 去注册 </a-button>
          </div>
            </div>

        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: '1.已有账号可立即登录 2.无账号请注册',
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    getLogin() {
      this.$router.push('/login');
    },
    getLogon() {
      this.$router.push('/logon');
    },
  },
};
</script>

<style lang="less" scoped>
.system {
  width: 600px;
  height: 400px;
  margin-left: 420px;
  background-color: rgb(94, 78, 78);
  .title {
    color: aqua;
    font-weight: bolder;
    font-size: 24px;
    text-align: center;
  }
}
.model {
  width: 200px;
  height: 100px;
  margin-top: 30px;
  margin-left: 200px;
  padding: 30px 30px 30px 50px;
  background-color: rgb(161, 236, 236);
}
.btnwrop{
    width: 500px;
    height: 100px;
    display: flex;
    justify-content: space-around;
}
.loginbtn {
  margin-right: 10px;
}
</style>
