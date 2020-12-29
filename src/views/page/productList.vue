<template>
  <div class="product-list">
    <serch-box @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <product-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import productTable from '@/components/productTable.vue'
import categoryApi from '@/api/category.js'
import SerchBox from '../../components/serchBox.vue'
import productApi from '@/api/product.js'
export default {
  data () {
    return {
      tableData: [],
      categoryList: [],
      serchFrom: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {}
    }
  },
  components: {
    productTable,
    SerchBox
  },
  async created () {
    await categoryApi.list().then(res => {
      this.categoryList = res.data;
      res.data.forEach(item => {         // 拿到每个商品对应的类目
        this.categoryObj[item.id] = item;
      })
    })
    this.getTableData();
  },
  methods: {
    searchSubmit (form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData () {
      productApi
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({  // 给每个商品添加类目
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage (page) {
      this.page = page;
      this.getTableData();
    },
    editProduct (record) { // 跳转到编辑商品页面
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      })
    },
    removeProduct (record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          productApi.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel () {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    }
  },
}
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>