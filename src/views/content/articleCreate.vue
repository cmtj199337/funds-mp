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
        <!-- 内容目录 -->
        <el-form-item label="目录" prop="catalogId">
          <el-col :span='20'>
            <el-select v-model="form.catalogId" placeholder="请选择">
              <el-option :value='item._id' :label="item.name" v-for="item in catList" :key="item._id"></el-option>
            </el-select>
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
          <el-button v-if="editId !== ''" type="primary" @click.native="editBasicInfo">保存（修改）</el-button>
          <el-button v-else type="primary" @click.native="saveBasicInfo">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  import * as serviceContent from '@/api/content'
  import * as serviceSetting from '@/api/setting'
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
          }],
          catalogId: [{
            required: true,
            message: '请选择目录',
            trigger: 'blur'
          }]
        },
        form: {
          title: '',
          intro: '',
          catalogId: ''
        },
        editForm: {},
        catList: [],
        canPush: false,
        editId: ''
      }
    },
    mounted() {
      this.editId = this.$route.query.id
      this.getCatalog()
      this.getDtail(this.$route.query.id)
    },
    beforeRouteLeave(to, from, next) {
      // 创建
      if (this.editId == '') {
        if (this.canPush == false) {
          if (this.form.intro !== '' || this.form.title !== '') {
            this.$confirm('您还未保存内容，确定需要离开吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => { next() })
          } else next()
        } else next()
      } else {
        if (this.canPush == false) {
          if (this.form.intro !== this.editForm.intro || this.form.title !== this.editForm.title) {
            this.$confirm('您还未保存内容，确定需要离开吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => { next() })
          } else next()
        } else next()
      }
    },
    methods: {
      getCatalog() {
        serviceSetting.catalogs().then(response => {
          this.catList = [].concat(response.datas)
        }).catch(faultHandler)
      },
      saveBasicInfo() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            serviceContent.createArticle(this.form).then(response => {
              this.canPush = true
              this.$message.success('保存成功')
              this.$router.push('/content')
            }).catch(faultHandler)
          }
        })
      },
      editBasicInfo() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            serviceContent.articleUpdate(this.editId, this.form).then(response => {
              this.canPush = true
              this.$message.success('保存成功')
              this.$router.push('/content')
            }).catch(faultHandler)
          }
        })
      },
      getDtail(id) {
        serviceContent.articleDetail(id).then(response => {
          this.form.title = response.datas.title
          this.form.intro = response.datas.intro
          this.form.catalogId = response.datas.catalog
          this.editForm = Object.assign({}, response.datas)
        }).catch(faultHandler)
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

