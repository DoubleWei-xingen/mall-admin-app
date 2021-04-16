<template>
  <a-table
  :columns="columns"
  :data-source="tableData"
  :pagination="page"
  @change="changePage"
 :scroll="{ y: 490 }">
    <div slot="operation" slot-scope="text, record" >
        <a-button type="primary" @click="editProduct(record)">编辑</a-button>
        <a-button type="danger" @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '商品类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',

  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    align: 'center',

  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '编辑',
    align: 'center',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    page: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(pageinfo) {
      this.$emit('change', pageinfo);
    },
    editProduct(record) {
      this.$emit('editEvent', record);
    },
    removeProduct(record) {
      this.$emit('deleteEvent', record);
    },
  },
};
</script>
<style lang="less" scoped>
.ant-btn{
  margin-right: 10px;
}
</style>
