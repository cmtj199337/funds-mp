<template>
  <div class="containner">
    <div class="list-wrapper" ref="page">
      <div class="list-title">
        <el-row :gutter="20">
          <div>
            <el-col>
              <el-input 
                placeholder="输入内容名称"
                v-model="input"
                @keyup.enter.native="handleIconClick">
              </el-input>
            </el-col>
            <el-col>
              <el-button @click.native="handleIconClick">搜索</el-button>
            </el-col>
            <el-col>
              <el-select v-model="category" @change="searthByCatalog()" placeholder="全部目录">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-col>
          </div>
          <el-col style="float: right">
            <el-button type="success" @click="toCreate">新建图文</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table :data='list' stripe width='100%' ref="table">
        <el-table-column label='内容名称' prop='title' min-width="300px">
          <template slot-scope='props'>
            <h4 class="nowrap-2">{{props.row.title}}</h4>
          </template>
        </el-table-column>
        <el-table-column label='创建时间' align="center" width="200px" min-width="200px">
          <template slot-scope='props'>
            <span class="nowrap">{{props.row.createdAt | format}}</span>
          </template>
        </el-table-column>
        <el-table-column label='所属分类' prop='catalogName' align="center" width="100px" min-width="100px">
          <template slot-scope='props'>
            <span class="nowrap">{{props.row.catalog.name || '/'}}</span>
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
    </div>
  </div>
</template>
<script>
import * as serviceContent from '@/api/content'
import * as serviceSetting from '@/api/setting'
import { faultHandler } from '@/utils'

export default {
  name: 'articleList',
  data() {
    return {
      limit: 10,
      total: 0,
      currentPage: 1,
      reference: 'reference',
      input: '',
      category: '',
      options: [],
      list: [],
      selection: [],
      screenObj: {},
      times: '',
      dialogTableVisible: false,
      carouseForm: {},
      storeId: '',
      pickfuture: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  mounted() {
    this.getList()
    this.getCatalog()
  },
  methods: {
    getList(data) {
      data = data || {}
      serviceContent.articles(data).then(response => {
        this.list = [].concat(response.datas)
        this.total = response.total
      }).catch(faultHandler)
    },
    getCatalog() {
      serviceSetting.catalogs().then(response => {
        this.options = response.datas
      }).catch(faultHandler)
    },
    searthByCatalog() {
      let obj = {}
      obj.category = this.category
      this.getList(obj)
      this.screenObj = obj
    },
    handleIconClick() {
      let obj = this.screenObj
      obj.keyword = this.input
      this.getList(obj)
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
      this.$router.push('/content/articlecreate')
    },
    edit(data) {
      this.$router.push({path: '/content/articlecreate',query:{id: data._id}})
    },
    remove(data) {
      this.$confirm('是否删除内容', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.forEach((item, index, arr) => {
          if (item._id === data._id) {
            serviceContent.delArticle(data._id).then(response => {
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
</style>
