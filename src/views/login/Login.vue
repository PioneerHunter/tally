<template>
  <div class="page-login">
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
    let body = document.querySelector('body')
    body.style.backgroundImage = 'url(' + require('../../img/飞雪.png') + ')'
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
      storage.setItem("theme", 'theme-color')
      this.$router.push('/inManage')
      this.$message.success('登录成功！')
      let body = document.querySelector('body')
      body.className = 'theme-color'
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
      let storage = sessionStorage
      storage.setItem("isAdmin", account.isAdmin)
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
</style>
