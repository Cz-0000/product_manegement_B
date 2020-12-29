<template>
  <div class="registor">
    <a-form-model
      class="registorForm"
      ref="registorForm"
      :model="registorForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="用户名" prop="userName">
        <a-input v-model="registorForm.userName" /> </a-form-model-item
      ><a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="registorForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input
          v-model="registorForm.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="checkPass">
        <a-input
          v-model="registorForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model.number="registorForm.code" />
      </a-form-model-item>
      <a-button :class="{ styl: true, allow: Cclick }" @click="gainCode"
        >获取验证码{{ num }}</a-button
      >
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('registorForm')">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user'
export default {
  data () {
    const checkUserName = (rule, value, callback) => {
      if (!value || value.length < 2) {
        return callback(new Error('用户名长度要大于2'));
      } else {
        callback();
      }
    }
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };

    let validatePass = (rule, value, callback) => {
      if (value === '' || value.length < 7) {
        callback(new Error('密码长度要大于6位'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registorForm.pass) {
        callback(new Error("两次输入的密码不正确"));
      } else {
        callback();
      }
    };
    let checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.registorForm.pass) {
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    return {
      num: 60,
      Cclick: false,
      checkPass: '',
      registorForm: {
        userName: '',
        email: '',
        password: '',
        code: '',
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        age: [{ validator: checkCode, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  mounted () {
    console.log(this.registorForm.email)
  },
  methods: {
    gainCode () {
      api.getCode(this.registorForm.email).then(res => {
        console.log(res)
      })
      clearInterval(timer);
      var timer = setInterval((num) => {
        if (this.num > 0) {
          this.num--;
        }
        else {
          clearInterval(timer)
          this.num = 60

        }
        if (this.num < 60) {
          this.Cclick = true;
        }
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.registor(this.registorForm).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/forget");
</style>