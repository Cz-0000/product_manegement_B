<template>
  <div class="serchBox">
    <a-form-model
      layout="inline"
      :model="serchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="serchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          v-model="serchForm.category"
          placeholder="请选择商品类目"
          style="width: 200px"
          allowClear
        >
          <a-select-option v-for="c in data" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data () {
    return {
      serchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    handleSubmit (e) {
      this.$emit('submit', this.serchForm)
    },
  },
};
</script>

<style lang="less">
.serchBox {
  padding: 10px 30px;
}
</style>