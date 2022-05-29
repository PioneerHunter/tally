<template>
  <div class="main">
    <sider-bar />
    <div class="lamp">
      <div class="line"></div>
      <div class="circle" @click="changeLight">灯</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import siderBar from './siderBar.vue'
export default {
  name: 'Main',
  components: {
    siderBar
  },
  data () {
    return {
      light: true,
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    changeLight() {
      this.light = !this.light
      let html = document.querySelector('body')
      if (this.light) {
        html.style.filter = 'invert(1) hue-rotate(180deg)'
        html.style.background = 'grey'
        html.style.transition = 'color 300ms, background-color 300ms'
      } else {
        html.style.filter = ''
        html.style.background = ''
      }
    },
  }
}
</script>

<style lang="less">
.lamp {
  position: absolute;
  top: 0;
  right: 40px;
  cursor: pointer;
  transform: translateY(-20px);
  &:hover {
    transform: translateY(0px);
    transition: 0.5s;
  }
  .line {
    width: 1px;
    height: 60px;
    border: 1px solid rgb(64, 62, 62);
    background-color: rgb(64, 62, 62);
  }
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transform: translateX(-13px);
    // text-align: center;
    font-family: Kaiti;
    font-size: 18px;
    color: white;
    opacity: 0.9;
    &:active {
      opacity: 1;
    }
  }
}
</style>
