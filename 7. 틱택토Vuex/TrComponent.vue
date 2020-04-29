<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :key="index" :row-data="rowData" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
import TdComponent from './tdComponent';
export default {
  props: {
    rowData: Array,
    rowIndex: Number
  },
  components: {
    TdComponent
  },
  data() {
    return {
      parent: '부모입니다'
    }
  },
  props: {
    rowData: Array,
    rowIndex: Number
  },

}
</script>