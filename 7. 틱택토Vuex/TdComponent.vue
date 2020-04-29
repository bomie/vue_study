<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER } from './store';
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      if(this.cellData) return;

      const rootData = this.$root.$data;
      console.log(this.$parent.$data);
      
      // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      this.$store.commit(CLICK_CELL, {row:this.rowIndex, cell:this.cellIndex}); // 파라미터 : 뮤테이션 이름, 데이터

      let win = false;
      let tbData = rootData.tableData;
      if(tbData[this.rowIndex][0] === rootData.turn && tbData[this.rowIndex][1] === rootData.turn && tbData[this.rowIndex][2] === rootData.turn) {
        win = true;
      }
      if(tbData[0][this.cellIndex] === rootData.turn && tbData[1][this.cellIndex] === rootData.turn && tbData[2][this.cellIndex] === rootData.turn) {
        win = true;
      }
      if(tbData[0][0] === rootData.turn && tbData[1][1] === rootData.turn && tbData[2][2] === rootData.turn) {
        win = true;
      }
      if(tbData[0][2] === rootData.turn && tbData[1][1] === rootData.turn && tbData[2][0] === rootData.turn) {
        win = true;
      }

      if(win) {
        // rootData.winner = rootData.turn;
        this.$store.commit(SET_WINNER, rootData.turn);
        this.$store.commit(RESET_GAME);
      } else {
        let all = true; // true 무승부
        tbData.forEach((row) => {
          row.forEach((ceil) => {
            if(!ceil) {
              all = false;
            }
          });
        });

        if(all) {
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GAME);
        } else {
          this.$store.commit(CHANGE_TURN);
        }
      }

    }
  }
}
</script>