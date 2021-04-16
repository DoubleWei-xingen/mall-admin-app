<template>
  <div class="logon">
    <a-form-model
      ref="logonFrom"
      :model="logonFrom"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="logonFrom.username" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="logonFrom.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="用户角色" prop="role">
        <a-input v-model="logonFrom.role" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="logonFrom.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="请确认密码" prop="checkPass">
        <a-input
          v-model="logonFrom.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="logonFrom.code" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
        <a-button @click="VerificationCode" :disabled="getcodeBtn">
          获取验证码
        </a-button>
        <a-button
          type="primary"
          style="margin-left: 10px"
          @click="submitForm('logonFrom')"
        >
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('logonFrom')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-modal v-model="visible" :title="information" @ok="handleOk">
        <div class="loginbtn" v-if="showLogin">
          <a-button type="primary" @click="getLogin"> 立即登录 </a-button>
        </div>
        <div v-else class="codebox">
          <p>请填写好验证码，进行注册</p>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import user from '../../api/logon';
import postGetcode from '../../api/getCode';

export default {
  data() {
    const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the Email'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const passReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      }
      if (this.logonFrom.password !== '') {
        if (passReg.test(value)) {
          this.$refs.logonFrom.validateField('checkPass');
        } else {
          callback(
            new Error(
              '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
            ),
          );
        }
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.logonFrom.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    const userReg = /^[a-zA-Z0-9_-]{4,16}$/;
    const validtextUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username'));
      }
      if (userReg.test(value)) {
        callback();
      } else {
        callback(new Error('4到16位（字母，数字，下划线，减号）'));
      }
    };
    const validtextRole = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the role'));
      }
      if (value === 'customer' || value === 'admin') {
        callback();
      } else {
        callback(
          new Error(
            '用户角色 (可选值 customer： 代表普通用户， admin:代表管理员用户)',
          ),
        );
      }
    };
    return {
      logonFrom: {
        password: '',
        checkPass: '',
        username: '',
        email: '',
        code: '',
        role: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
        username: [{ validator: validtextUsername, trigger: 'change' }],
        role: [{ validator: validtextRole, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      visible: false,
      information: '',
      showLogin: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user
            .logon(this.logonFrom)
            .then((res) => {
              this.information = res.msg;
              this.showLogin = true;
              setTimeout(() => {
                this.showModal();
              }, 1000);
            })
            .catch((err) => {
              this.information = err;
              this.$message.error(err);
              if (err === '该用户已经注册，请直接登陆') {
                this.showLogin = true;
                setTimeout(() => {
                  this.showModal();
                }, 1000);
              }
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    VerificationCode() {
      postGetcode
        .getCode(this.logonFrom.email)
        .then((res) => {
          this.information = res.msg;
          setTimeout(() => {
            this.showModal();
          }, 1000);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    getLogin() {
      this.$router.push('/login');
    },
  },
  computed: {
    getcodeBtn() {
      if (this.logonFrom.email && this.logonFrom.checkPass) {
        return false;
      }
      if (this.logonFrom.code) {
        return true;
      }
      return true;
    },
  },
};
</script>

<style lang='less' scoped>
.logon {
  margin: 0px auto;
  max-width: 800px;
  border: 1px solid #666;
  padding-left: 100px;
  padding-top: 20px;
}
.loginbtn {
  margin-left: 200px;
}
.codebox {
  margin-left: 150px;
  color: rgb(16, 238, 238);
  font-weight: bolder;
}
</style>
