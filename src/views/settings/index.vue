<template>
  <div class="setting">
    <div class="manage-header">
      <b>设置</b>
      <button class="btn" @click="outLogin">退出登录</button>
    </div>
    <div class="setting-items">
      <section class="theme">
        <h3>主题切换</h3>
        <el-radio-group v-model="radio">
          <el-radio label="theme-purple">高贵紫</el-radio>
          <el-radio label="theme-blue">天空蓝</el-radio>
          <el-radio label="theme-color">炫彩</el-radio>
        </el-radio-group>
      </section>
      <section class="background">
        <h3>背景切换</h3>
        <div class="image" @click="changeBackground">
          <img src="../../img/飞雪.png" alt="冰天雪地">
          <img src="../../img/宇航员.png" alt="宇航员">
          <img src="../../img/Geralt.jpg" alt="巫师三">
          <div></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  components: {},
  data () {
    return {
      radio: 1,
    }
  },
  watch: {
    radio() {
      let body = document.querySelector('body')
      body.className = this.radio
      let storage = sessionStorage
      storage.setItem('theme', this.radio)
    },
  },
  created () {
    
  },
  mounted () {
    this.initRadio()
  },
  methods: {
    initRadio() {
      this.radio = sessionStorage.getItem('theme')
    },
    outLogin() {
      this.$alert('', '确认退出登录吗？', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.$router.push('/')
            sessionStorage.clear()
          }
        }
      });
    },
    changeBackground(e) {
      let name = e.target.alt
      let body = document.querySelector('body')
      if (name === '冰天雪地') {
        body.style.backgroundImage = 'url(' + require('../../img/飞雪.png') + ')'
      } else if (name === '宇航员') {
        body.style.backgroundImage = 'url(' + require('../../img/宇航员.png') + ')'
      } else if (name === '巫师三') {
        body.style.backgroundImage = 'url(' + require('../../img/Geralt.jpg') + ')'
      } else {
        body.style.backgroundImage = 'url()'
      }
    },
  }
}
</script> 

<style lang='less' scoped>
.setting {
  max-width: 960px;
  margin: 0 auto;
  .setting-items {
    min-height: 500px;
    padding: 100px 0;
    background-color: rgb(252, 246, 246);
    text-align: center;
    opacity: 0.8;
    box-shadow: 0 0 10px #888888;
    border-radius: 5px;
    section {
      margin-top: 50px;
    }
  }
  .background {
    text-align: center;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        height: 60px;
        width: 100px;
        margin-right: 20px;
        transition: 0.5s;
        box-shadow: 0 0 10px #888888;
      }
      img:hover {
        transform: scale(130%);
      }
      div {
        vertical-align: middle;
        height: 60px;
        width: 100px;
        box-shadow: 0 0 10px #888888;
        transition: 0.5s;
      }
      div:hover {
        transform: scale(130%);
      }
    }
  }
}
</style>
