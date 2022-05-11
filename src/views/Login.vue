<template>
  <div class="page-login">
    <div class="login">
      <div class="login-txt">{{ isRegister ? "登录" : "注册" }}</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="isRegister"
            type="primary"
            @click="login('ruleForm')"
            >登录</el-button>
          <el-button v-else type="primary" @click="register">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重写</el-button>
        </el-form-item>
      </el-form>
      <div v-show="isRegister" class="register" @click="isRegister = !isRegister">注册</div>
    </div>
  </div>
</template>

<script>
import io from '@/api/io'
import { login } from '@/api/api'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      isRegister: true,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  create () {
    console.log(window.location.href);
  },
  mounted () {},
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
          }
          io.get(login.get_access, params).then((res) => {
            if (res.data.verifySuccess === true) {
              let storage = sessionStorage
              storage.setItem("loginState", 2)
              this.$router.push('manage')
            }
            // console.log(res)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.isRegister = !this.isRegister
    }
  }
}
</script>

<style lang="less" scoped>
.page-login {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  .login-txt {
    padding: 15px 0;
  }
  .login {
    transform: translate(-50%, -50%);
    width: 400px;
    height: 280px;
    background-image: linear-gradient(#e66465, #9198e5);
    border-radius: 10px;
    .demo-ruleForm {
      padding-right: 80px;
    }
    .register {
      cursor: pointer;
    }
  }
}
</style>
