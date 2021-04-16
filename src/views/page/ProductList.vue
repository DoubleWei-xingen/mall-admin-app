<template>
    <div class="productlist">
        <!-- 搜索区域 -->
        <search-form @submit="searchSubmit" :categoryList="categoryList"></search-form>
        <!-- 添加按钮 -->
        <div class="product-add-btn">
          <a-button type="primary" size="large">
            <router-link :to="{name: 'ProductAdd'}">添加商品 </router-link> </a-button>
        </div>
        <!-- 列表区域 -->
        <shopping-list
        :data="tableData"
        :page="page"
         @change="changePage"
         @editEvent="Productedit"
         @deleteEvent="Productremove"></shopping-list>
    </div>
</template>
<script>
import SearchForm from '@/components/SearchForm.vue';
import ShoppingList from '@/components/ShoppingList.vue';
import Products from '@/api/products';
import Category from '@/api/queryCategory';

export default {
  components: {
    SearchForm,
    ShoppingList,
  },
  data() {
    return {
      tableData: [],
      from: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: [],
    };
  },
  async created() {
    await Category.getCategory().then((res) => {
      this.categoryList = res.data.data;
      // 获取商品类目
      res.data.data.forEach((item) => {
        this.categoryObj[item.id - 1] = item;
      });
    }).catch((error) => {
      this.$message.error(error);
    });
    this.gettableData();
  },
  methods: {
    searchSubmit(from) {
      this.from = from;
      this.gettableData();
    },
    gettableData() {
      Products.queryproduct({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.from,
      }).then((res) => {
        // 添加商品类目的名字
        this.page.total = res.data.total;
        this.tableData = res.data.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category - 1].name,
        }));
      });
    },
    changePage(pageinfo) {
      this.page = pageinfo;
      this.gettableData();
    },
    Productedit(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    Productremove(record) {
      this.$confirm({
        title: `确定删除该${record.categoryName}中的${record.c_item}吗？`,
        content: `${record.title}：单价为${record.price}元/千克`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          await Products.deleteProduct({
            id: record.id,
          }).then(() => {
            this.gettableData();
          }).catch((error) => {
            this.$message.error(error.msg);
          });
        },
        onCancel() {

        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.productlist{
    padding: 10px 15px 10px 0px;
    position: relative;
    .product-add-btn{
      position:absolute;
      right: 10px;
      top: 15px;
    }
}
</style>
