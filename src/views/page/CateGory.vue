<template>
    <div class="category">
    <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
  >
  <div slot="operation" slot-scope>
        <a-button type="primary">编辑</a-button>
        <a-button type="danger" style="margin-left:20px">删除</a-button>
</div>
    </a-table>
    </div>
</template>
<script>
import Category from '@/api/queryCategory';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 200,
  },
  {
    title: '商品类目',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '商品子类目',
    dataIndex: 'c_items',
    key: 'c_items',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
    };
  },
  created() {
    Category.getCategory().then((res) => {
      this.data = res.data.data;
    });
  },

};
</script>
