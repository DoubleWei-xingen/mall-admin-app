<template>
  <div class="index_card">
  <div style="background-color: rgb(108, 155, 155); padding: 20px;">
    <a-row :gutter="16" >
      <a-col :span="8" v-for="item in Card" :key="item.title">
        <a-card :title="item.title"
        :bordered="false"
        :hoverable="true"
        :bodyStyle="bstyle"
        :headStyle="tstyle">

        </a-card>
      </a-col>
    </a-row>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tstyle: { color: '#08777a', 'font-weight': 'bold', 'text-align': 'center' },
      bstyle: { width: '0px', height: '0px' },
      Card: [
        {
          title: '商品总览',
          desc: '',
        },
        {
          title: '用户总览',
          desc: '',
        },
        {
          title: '销售总览',
          desc: '',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>

</style>
