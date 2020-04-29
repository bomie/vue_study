/*
  자식 컴포넌트를 추가해보자!
*/

<template>
  <div>
    <div>{{turn}} 님의 차례입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{winner}} 님의 승리입니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';

  export default {
    components: {
      TableComponent
    },
    data() {
      return {
      }
    },
    methods: {
      onChangeData() {
        this.$set(this.tableData[1], 0, 'X');
      }
    },
    computed: {
      
    },
    mounted() {
    },
    beforeDestroy() {
    }
  };
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
}
</style>


