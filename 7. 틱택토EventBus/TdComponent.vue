<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import EventBus from './EventBus';

export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      if(this.cellData) return;

      // $emit은 $on과 대응되어, EventBus.$on('clickTd', ~); 가 실행됨
      EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
    }
  }
}
</script>