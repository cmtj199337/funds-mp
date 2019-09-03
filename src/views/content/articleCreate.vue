<template>
  <div class="containner">
    <div class="list-wrapper">
      <el-form ref='ruleForm' :model='form' :rules="rules" label-width='120px' class="article-form">
        <!-- 内容标题 -->
        <el-form-item label="标题" prop="title">
          <el-col :span='20'>
            <el-input v-model="form.title" :maxlength="40" placeholder="请输入2-40个汉字"></el-input>
          </el-col>
        </el-form-item>
        <!-- 内容介绍 -->
        <el-form-item label='内容' prop="intro">
          <el-col :span='20'>
            <tinymce :height="300" v-model="form.intro"></tinymce>
          </el-col>
        </el-form-item>
        <!-- 提交 -->
        <div class="sub-btn">
          <el-button type="primary" @click.native="saveBasicInfo">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  import { createArticle } from '@/api/content'
  import { faultHandler } from '@/utils'
  export default {
    name: 'articleCreate',
    components: { Tinymce },
    data() {
      return {
        rules: {
          title: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }, {
            min: 2,
            max: 40,
            message: '标题字数为2-40个字',
            trigger: 'blur'
          }],
          intro: [{
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }]
        },
        form: {
          title: '',
          intro: ''
        },
        canPush: false
      }
    },
    mounted() {
    },
    beforeRouteLeave(to, from, next) {
      if (this.form.intro !== '' || this.form.title !== '') {
        this.$confirm('您还未保存内容，确定需要离开吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next()
        })
      } else {
        next()
      } 
    },
    methods: {
      saveBasicInfo() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            createArticle(this.form).then(response => {
              this.$message.success('保存成功')
              // 
              this.$router.push('/content')
            }).catch(faultHandler)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .list-wrapper {
    .article-form {
      margin-top: 20px;
      .el-form-item__label {
        font-weight: normal;
        color: #353535;
        padding-right: 45px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .sub-btn {
    text-align: center;
    margin-top: 40px;
  }
</style>

