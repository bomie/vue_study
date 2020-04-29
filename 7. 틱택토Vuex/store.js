import Vue from 'vue';
import Vuex from 'vuex';

// object dynamic property 동적 속성
// mutation의 이름을 다 변수로 빼둔다
// 다른 파일에서 쓸 수 있도록 export 
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
  state: {
    tableData: [
      ['','',''],
      ['','',''],
      ['','','']
    ],
    turn: 'O',
    winner:''
  },  // vue의 data 속성과 비슷
  getters: {

  },  // vue의 computed 속성과 비슷
  mutations: {  
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, data) {
      // Vuex는 $set이 없으므로 Vue.set을 써서 변경
      Vue.set(state.tableData[data.row], data.cell, state.turn);
    },
    [CHANGE_TURN](state) {
      state.turn = (state.turn === 'O') ? 'O' : 'X';
    },
    [RESET_GAME](state) {
      state.turn = 'O';
      state.tableData = [['','',''],['','',''],['','','']];
    },
    [NO_WINNER](state) {
      state.winner = '';
    }
  },  // state를 수정할 때 사용. 동기적으로. 이름은 대문자로
  actions: {

  } // 비동기를 사용할때(mutations는 동기적으로만 되므로), 또는 여러 mutation을 연달아 실행할 때
});