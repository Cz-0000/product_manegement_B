<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-info v-if="current === 0" @next="next" :form="form" />
      <sale-info
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import basicInfo from '@/components/basicDetail'
import saleInfo from '@/components/saleDetail'
import api from '@/api/product';
export default {
  data () {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    basicInfo,
    saleInfo
  },
  created () {
    const { id } = this.$route.params;
    if (id) {
      api.detail(id).then(res => {  // 通过拿到动态路由的id值来判断是否是点击编辑商品进来的，
        this.form = res             // 若是，则请求当前商品所有的值，渲染form表单
      })
    }
  },
  methods: {
    next (form) {
      this.form = {
        ...this.form,
        form,
      }
      if (this.current === 1) {
        if (this.$route.params.id) {
          api.edit(this.form).then(res => {
            this.$message.success('编辑成功');
            this.$router.push({
              name: 'ProductList',
            });
          })
        } else {
          api.add(this.form).then(res => {
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          })
        }
      } else {
        this.current++;
      }
    },
    prev () {
      this.current--;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>