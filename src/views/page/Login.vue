<template>
 <div class="login">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="ruleForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="请再次输入密码"
        prop="checkPassword"
      >
        <a-input
          v-model="ruleForm.checkPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-modal v-model="visible" :title="information" @ok="handleOk">
        <div class="loginerro">
          <p>请输入正确的邮箱和密码，无账号请先注册</p>
        </div>
        <div class="logonbtn">
          <a-button type="primary" @click="getLogon"> 去注册 </a-button>
        </div>
      </a-modal>
    </div>
  </div>

</template>
<script>
import user from '../../api/login';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the Email'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPassword: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPassword: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      visible: false,
      information: '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user
            .login(this.ruleForm)
            .then((res) => {
              this.$store.dispatch('setUserInfo', res.data);
              this.$router.push({
                name: 'Home',
                params: {
                  type: 1,
                },
              }, () => {}, () => {});
            })
            .catch((error) => {
              this.information = error;
              this.$message.error(error);
              setTimeout(() => {
                this.showModal();
              }, 1000);
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    getLogon() {
      this.$router.push('/logon');
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  max-width: 800px;
  border: 1px solid #666;
  margin: 40px auto;
  padding-left: 100px;
  padding-top: 20px;
}
.logonbtn {
  margin-top: 40px;
  margin-left: 200px;
}
.loginerro {
  margin-left: 100px;
  color: rgb(16, 238, 238);
  font-weight: bolder;
}
</style>
