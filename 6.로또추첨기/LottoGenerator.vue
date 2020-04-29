/*
  자식 컴포넌트를 추가해보자!
*/

<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한번 더!</button>
  </div>
</template>

<script>
  import LottoBall from './LottoBall';   /** 자식 컴포넌트 **/

  const getWinNumbers = () => {
    const candidate = Array(45).fill().map((v,i) => i + 1); 
    const shuffle = [];
    while(candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
  }

  const timeouts = [];

  export default {
    components: { /** 자식 컴포넌트 **/
      LottoBall
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
      }
    },
    methods: {
      onClickRedo(){
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        // this.showBalls(); --> watch로
      },
      showBalls() {
        for(let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, i * 1000);
        }
        
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000);
        }
    },
    computed: {
      
    },
    mounted() {
      this.showBalls();
    },
    beforeDestroy() {
      timeouts.forEach((t) => {
        clearTimout(t);
      });
    },
    watch: {
      // 감시하고자 하는 데이터 이름을 입력
      bonus(val, oldVal) {
        console.log(val, oldVal);

        if(val === null) {
          this.showBalls();
        }
      }
    }
  };
</script>

<style scoped>
</style>


