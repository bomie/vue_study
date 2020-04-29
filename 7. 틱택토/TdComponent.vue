<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      const rootData = this.$root.$data;
      if(rootData.tableData[this.rowIndex][this.cellIndex]) return;

      console.log(this.$parent.$data);
      // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
      this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

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
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [['','',''],['','',''],['','','']];
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
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [['','',''],['','',''],['','','']];
        } else {
          rootData.turn = (rootData.turn === 'O') ? 'X' : 'O';
        }
      }

    }
  }
}
</script>