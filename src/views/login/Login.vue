<template>
  <div class="page-login">
    <!-- <div class="login">
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
    </div> -->
    <div class="back-photo"></div>
    <div class="container">
      <div class="box login">
        <div class="form-content">
          <div class="avtar">
            <div class="pic"><img src="../../img/1.jpg" alt=""></div>
          </div>
          <h1>欢迎回家！</h1>
          <form action="#" class="form">
            <div>
              <i class="fa fa-user-o"></i>
              <input v-model="loginForm.name" type="text" placeholder="账号">
            </div>
            <div>
              <i class="fa fa-key"></i>
              <input v-model="loginForm.password" type="password" placeholder="密码">
            </div>
            <div class="btn">
              <button type="button" @click="login">我进来啦</button>
            </div>
          </form>
          <p class="btn-something">
            还没有账号 ? <span class="signupbtn" @click="changeCard(true)">注册</span>
          </p>
        </div>
      </div>
      <div class="box signup">
        <div class="form-content">
          <div class="avtar">
            <div class="pic"><img src="../../img/2.jpg" alt=""></div>
          </div>
          <h1>认识一下！</h1>
          <form action="#" class="form">
            <div>
              <i class="fa fa-user-o"></i>
              <input v-model="registerForm.name" type="text" placeholder="账号">
            </div>
            <div>
              <i class="fa fa-envelope-o"></i>
              <input v-model="registerForm.password1" type="password" placeholder="密码">
            </div>
            <div>
              <i class="fa fa-key"></i>
              <input v-model="registerForm.password2" type="password" placeholder="再次输入密码">
            </div>
            <div class="btn">
              <button type="button" @click="register">这是钥匙</button>
            </div>
            <div class="admin">
              <el-switch v-model="registerForm.isAdmin" active-text="成为管理员" :width="30"></el-switch>
            </div>
          </form>
          
          <p class="btn-something">
            已经有账号了 ? <span class="loginbtn" @click="changeCard()">登录</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from '@/api/io'
import { login } from '@/api/api'
import { db } from '@/data/db'
import { search, addData, getData, deleteData } from '@/utils/dbMethod'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      registerForm: {
        name: '',
        password1: '',
        password2: '',
        isAdmin: false,
      },
    }
  },
  created () {
    getData('user', 'id').then(val => {
      console.log(val, 1);
    })
  },
  mounted () {},
  methods: {
    async login() {
      if (!await this.validateLogin()) return
      let storage = sessionStorage
      storage.setItem("loginState", 2)
      this.$router.push('settings')
      this.$message.success('登录成功！')
      // let params = {
      //   username: this.loginForm.name,
      //   password: this.loginForm.password,
      // }
      // io.get(login.get_access, params).then((res) => {
      //   if (res.data.verifySuccess === true) {
      //     let storage = sessionStorage
      //     storage.setItem("loginState", 2)
      //     this.$router.push('manage')
      //   }
      // })
    },
    async validateLogin() {
      let err = false
      const [ account ] = await search('user', { name: this.loginForm.name })
      if (this.loginForm.password !== account.password) err = true
      if (!this.loginForm.name || !this.loginForm.password) err = true
      if (err) {
        this.$message.warning('请输入正确的账号密码！')
        return false
      }
      return true
    },
    async register() {
      const exist = await this.validateRegister()
      if (!exist) return
      addData('user', {
        name: this.registerForm.name,
        password: this.registerForm.password1,
        isAdmin: this.registerForm.isAdmin
      })
      this.$message.success('注册成功！')
      this.changeCard()
    },
    async validateRegister() {
      const [ exist ] = await search('user', { name: this.registerForm.name })
      if (exist) {
        this.$message.warning('账号已存在，请换一个！')
        return false
      }
      if (!this.registerForm.name || !this.registerForm.password1 || !this.registerForm.password2) {
        this.$message.warning('账号密码未完整输入！')
        return false
      }
      if (this.registerForm.password1 !== this.registerForm.password2) {
        this.$message.warning('两次输入密码不一致！')
        return false
      }
      return true
    },
    changeCard(hasAccount) {
      let signup = document.querySelector(".signup")
      let login = document.querySelector(".login")
      if (hasAccount) {
        login.style.transform = "rotateY(180deg)"
        signup.style.transform = "rotateY(0deg)"
      } else {
        login.style.transform = "rotateY(0deg)"
        signup.style.transform = "rotateY(-180deg)"
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import './login.css';

.page-lo {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // text-align: center;
  .login-txt {
    padding: 15px 0;
  }
  .login {
    transform: translate(-50%, -50%);
    width: 400px;
    height: 280px;
    background-image: linear-gradient(#e66465, #9198e5);
    border-radius: 10px;
    box-shadow: 0 0 15px 15px #888888;
    .demo-ruleForm {
      padding-right: 80px;
    }
    .register {
      cursor: pointer;
    }
  }
}
</style>
