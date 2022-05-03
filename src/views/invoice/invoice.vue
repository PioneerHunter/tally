<template>
  <div class="invocie-main">
    <button @click="preview">预览</button>

    <preview-dialog ref="PreviewDialog"></preview-dialog>
    
    <div>
      <el-cascader
        :options="options"
        :show-all-levels="false"
        placeholder="请选择地区"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import PreviewDialog from '@/components/preview-dialog.vue'

export default {
  name: 'Invoice',
  components: {
    PreviewDialog,
  },
  data () {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }],
      }],
      title: '增值税普通发票',
    }
  },
  computed: {
    date() {
      return timeFormat(new Date(), 1)
    },
  },
  create () {},
  mounted () {},
  methods: {
    preview() {
      this.$refs.PreviewDialog.openDialog()
    },
  }
}
</script>

<style lang="less" scoped>
</style>
