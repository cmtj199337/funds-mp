<template>
  <div class="containner">
    <div class="list-wrapper" ref="page">
      <div class="list-title">
        <el-row :gutter="20">
          <el-col style="float: right">
            <el-button type="success" @click="toCreate">新建目录</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table :data='list' stripe width='100%' ref="table">
        <el-table-column label='名称' prop='name' min-width="300px"></el-table-column>
        <el-table-column label='创建日期' align="center" min-width="180px">
          <template slot-scope='props'>
            <span class="nowrap">{{props.row.createdAt | format}}</span>
          </template>
        </el-table-column>
        <el-table-column label='操作' width='200px' min-width="200px" align="center">
          <template slot-scope='props'>
            <span class="ml10">
              <el-button size='small' type="text" @click.native="edit(props.row)">编辑</el-button>
              <el-button size='small' type="text" @click.native="remove(props.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-content"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        title="新建目录"
        :visible.sync="dialogCatalog">
        <el-form
          ref="ruleForm"
          :model='catalogForm'
          :rules="rules"
          label-width='100px'>
          <el-form-item label="名称" prop="name">
            <el-col>
              <el-input v-model="catalogForm.name" :maxlength="10" placeholder="不超过10个字"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCatalog = false">取消</el-button>
          <el-button type="primary" v-if="editId !== ''" @click="update('ruleForm')">确定</el-button>
          <el-button type="primary" v-else @click="save('ruleForm')">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as serviceSetting from '@/api/setting'
import { faultHandler } from '@/utils'

export default {
  name: 'list',
  data() {
    return {
      rules: {
        name: [{
          required: true,
          message: '标题不能为空',
          trigger: 'blur'
        }, {
          min: 1,
          max: 10,
          message: '标题字数为1-10个字',
          trigger: 'blur'
        }]
      },
      limit: 10,
      total: 0,
      currentPage: 1,
      input: '',
      list: [],
      dialogCatalog: false,
      catalogForm: {
        name: ''
      },
      editId: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          serviceSetting.createCatalog(this.catalogForm).then(response => {
            this.$message.success('创建成功')
            this.getList()
            this.dialogCatalog = false
          }).catch(faultHandler)
        }
      })
    },
    getList(data) {
      data = data || {}
      serviceSetting.catalogs(data).then(response => {
        this.list = [].concat(response.datas)
        this.total = response.total
      }).catch(faultHandler)
    },
    handleSizeChange (val) {
      this.limit = val
      this.screenObj.limit = val
      this.getList(this.screenObj)
    },
    handleCurrentChange (val) {
      let pageSize = val
      let obj = this.screenObj
      obj.pageSize = pageSize
      this.getList(obj)
    },
    toCreate() {
      this.dialogCatalog = true
    },
    edit(data) {
      this.dialogCatalog = true
      this.catalogForm.name = data.name
      this.editId = data._id
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          serviceSetting.catalogUpdate(this.editId, this.catalogForm).then(response => {
            this.$message.success('修改成功')
            this.getList()
            this.dialogCatalog = false
          }).catch(faultHandler)
        }
      })
    },
    remove(data) {
      this.$confirm('是否删除内容', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.forEach((item, index, arr) => {
          if (item._id === data._id) {
            serviceSetting.delCatalog(data._id).then(response => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(faultHandler)
          }
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .list-title {
    height: 56px;
    line-height: 56px;
    margin-bottom: 20px;
    .el-col-24 {
      width: auto;
    }
    a {
      line-height: 36px;
      font-size: 14px;
      color: #f56555;
      text-decoration: underline;
    }
  }
  .title-img {
    cursor: pointer;
    div {
      float: left;
    }
    .img-zone {
      width: 80px;
      height: 60px;
      display: inline-block;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .font-zone {
      display: inline-block;
      width: 65%;
      margin-left: 10px;
      h4 {
        font-size: 13px;
        color: #353535;
        margin: 0;
        height: 36px;
        line-height: 1.5;
      }
      span {
        font-size: 12px;
        color: #888888;
      }
    }
  }
  .popover-title {
    height: 50px;
    line-height: 40px;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    text-indent: 1em;
  }
  .qrcode {
    text-align: center;
    margin: 25px 0 0 0;
  }
  .popover-tip {
    margin: 10px 0 25px 0;
    display: block;
    text-align: center;
  }
</style>
