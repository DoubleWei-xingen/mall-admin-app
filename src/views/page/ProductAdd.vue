<template>
  <div class="productadd">
    <div class="edit-steps">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <basic-products
          v-if="current === 0"
          @nextStep="next"
          :form="form"
          :rules="rules"
        ></basic-products>
        <sale-products v-else
         @prevSteps="prev"
          @nextStep="next"
         :form="form"
         :rules="rules"></sale-products>
      </div>
    </div>
  </div>
</template>
<script>
import BasicProducts from '@/components/BasicProducts.vue';
import SaleProducts from '@/components/SaleProducts.vue';
import Products from '@/api/products';

export default {
  components: {
    BasicProducts,
    SaleProducts,
  },

  data() {
    return {
      form: {
        title: '',
        desc: '',
        tags: '包邮，最晚次日到达',
        category: [],
        c_item: [],
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        images: [],
        status: true,
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入商品副标题',
            trigger: 'blur',
          },
        ],
        desc: [{
          required: true,
          message: '请输入商品描述',
          trigger: 'blur',
        }],
        tags: [{
          required: true,
          message: '请输入商品标签',
          trigger: 'blur',
        }],
        category: [
          {
            required: true,
            message: '请输入商品类目',
            trigger: 'change',
          },
        ],
        price: [
          {
            required: true,
            message: '请输入商品售价',
            trigger: 'blur',
          },
        ],
        price_off: [
          {
            required: true,
            message: '请输入商品折扣价',
            trigger: 'blur',
          },
        ],
        inventory: [
          {
            required: true,
            message: '请输入商品库存',
            trigger: 'blur',
          },
        ],
        unit: [{
          required: true,
          message: '请输入计量单位',
          trigger: 'blur',
        }],
      },
      current: 0,
      steps: [
        {
          title: '请填写商品信息',
        },
        {
          title: '请填写商品销售信息',
        },
      ],
    };
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      Products.pollingProduct(id).then((res) => {
        let status;
        if (res.data.status === 1) {
          status = true;
        } else {
          status = false;
        }
        this.form = {
          ...res.data,
          status,
        };
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current === 1) {
        if (this.$route.params.id) {
          Products.editProduct(this.form).then((res) => {
            this.$message.success(`${res.msg}修改了商品`);
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          Products.addProduct(this.form).then((res) => {
            this.$message.success(`${res.msg}添加了商品`);
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.productadd {
  .ant-steps {
    width: 50%;
    margin: 20px auto;
  }
}
.steps-content {
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #dfd9d9;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
