<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="title" label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select
        v-model="form.category"
        placeholder="请输入商品类别"
        @change="changeCategory"
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请添加子类目">
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="请输入或选择商品标签"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option
        >
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
      <a-button type="primary" @click="next">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import categoryApi from '@/api/category.js'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // form: {
      //   title: '',
      //   desc: '',
      //   category: '',
      //   c_item: [],
      //   tags: []
      // },
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created () {
    categoryApi.list().then(res => {
      this.categoryList = res.data;
    })
  },
  methods: {
    changeCategory (category) {
      for (var i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id == category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('next', this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  },
};
</script>
