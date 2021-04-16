<template>
  <div class="basic-info">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="副标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          style="width: 100%"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select
          v-model="form.c_item"
          style="width: 100%"
          placeholder="请选择子类目"
        >
          <a-select-option v-for="citem in categoryItems" :key="citem">
            {{ citem }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          style="width: 100%"
          placeholder="请填写标签"
          v-model="form.tags"
          :default-value="['包邮，最晚次日到达']"
        >
         <a-select-option
           value="包邮，最晚次日到达"
          >
          包邮，最晚次日到达
          </a-select-option>
      </a-select>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
        <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
        <a-button style="margin-left: 20px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Category from '@/api/queryCategory';

export default {
  props: ['form', 'rules'],
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      categoryList: [],
      categoryItems: [],

    };
  },
  created() {
    Category.getCategory().then((res) => {
      this.categoryList = res.data.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('nextStep', this.form);
          return false;
        }
        return false;
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChange(e) {
      this.categoryList.filter((item) => {
        if (item.id === e) {
          this.categoryItems = item.c_items;
        }
        return true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.basic-info {
  .ant-form {
    margin-top: 40px;
  }
}
</style>
