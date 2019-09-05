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
              <el-select v-model="status" placeholder="全部状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
            <div class="title-img">
              <div class="font-zone">
                <h4 class="nowrap-2">{{props.row.title}}</h4>
                <span class="nowrap">创建时间：{{props.row.createdAt | format}}</span>
              </div>
            </div>
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
      status: '',
      options: [
        {
          label: '全部状态',
          value: -1
        }, {
          label: '上架',
          value: 2
        }, {
          label: '下架',
          value: 1
        }, {
          label: '定时上架',
          value: 3
        }
      ],
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
  },
  methods: {
    getList(data) {
      data = data || {}
      serviceContent.articles(data).then(response => {
        this.list = [].concat(response.datas)
        this.total = response.total
      }).catch(faultHandler)
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
