<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      图片上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        class="editor-slide-upload" 
        action="http://up-z0.qiniu.com" 
        extensions="png,gif,jpeg,jpg"
        list-type="picture-card"
        :multiple="true" 
        :file-list="fileList"
        :show-file-list="true"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :data="upData">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    uptoken: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      upData: {
        token: this.uptoken
      },
      tmp_resource: 'http://t.hellozh.cn/',
      cnd_resource: 'http://s.hellozh.cn/',
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    async getToken() {
      let that = this
      let res = await ajax.token4qn4static()
      if (res.rc == 100) {
        that.upData.token = res.token
      }else{
        common.alert(res.err);
      }
    },
    handleSubmit() {
      const arr = this.fileList
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      this.fileList.push({
        fileName: file.name,
        url: this.cnd_resource + response.key,
        success: true
      })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const that = this
      that.upData.key = common.mkStaticQiniuKey()
    }
  }
}
</script>

<style scoped>
.editor-slide-upload {
  margin-bottom: 20px;
}
.editor-slide-upload /deep/.el-upload--picture-card {
    width: 100%;
}
</style>