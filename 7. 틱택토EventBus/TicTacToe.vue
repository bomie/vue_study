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
  import EventBus from './EventBus';
 
  export default {
    components: {
      TableComponent
    },
    data() {
      return {
        tableData: [
          ['','',''],
          ['','',''],
          ['','','']
        ],
        turn: 'O',
        winner:''
      }
    },
    methods: {
      onChangeData() {
        this.$set(this.tableData[1], 0, 'X');
      },
      onClickTd(rowIndex, cellIndex) {
        this.$set(this.tableData[rowIndex], cellIndex, this.turn);

        let win = false;
        let tbData = this.tableData;
        if(tbData[rowIndex][0] === this.turn && tbData[rowIndex][1] === this.turn && tbData[rowIndex][2] === this.turn) {
          win = true;
        }
        if(tbData[0][cellIndex] === this.turn && tbData[1][cellIndex] === this.turn && tbData[2][cellIndex] === this.turn) {
          win = true;
        }
        if(tbData[0][0] === this.turn && tbData[1][1] === this.turn && tbData[2][2] === this.turn) {
          win = true;
        }
        if(tbData[0][2] === this.turn && tbData[1][1] === this.turn && tbData[2][0] === this.turn) {
          win = true;
        }

        if(win) {
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [['','',''],['','',''],['','','']];
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
            this.winner = '';
            this.turn = 'O';
            this.tableData = [['','',''],['','',''],['','','']];
          } else {
            this.turn = (this.turn === 'O') ? 'X' : 'O';
          }
        }
      }
    },
    created() {
      EventBus.$on('clickTd', this.onClickTd);
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


