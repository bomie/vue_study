/*
  vue 컴포넌트 생성
  .vue 는 특수한 문법을 쓰는 자바스크립트 파일
*/

<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div> 현재 {{score}}점</div>
  </div>
</template>

<script>
  let interval = null;
  const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
  };

  const scores = {
    바위: 0,
    가위: 1,
    보: -1
  }

  const computerChoice = (imgCode) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCode;
    })[0];
  }

  export default {
    data() {
      return {
        imgCode: rspCoords.바위,
        result: '',
        score: '0'
      }
    },
    methods: {
      changeHand() {
        interval = setInterval(() => {
          if(this.imgCode === rspCoords.바위) {
            this.imgCode = rspCoords.가위;
          } else if(this.imgCode === rspCoords.가위) {
            this.imgCode = rspCoords.보;
          } else if(this.imgCode === rspCoords.보) {
            this.imgCode = rspCoords.바위;
          } 
        }, 100);
      },

      onClickButton(choice) {
        clearInterval(interval);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCode)];
        const diff = myScore - cpuScore;
        if(diff === 0) {
          this.result = '비겼습니다';
        } else if([-1,2].includes(diff)) {
          this.result = '이겼습니다';
          this.score += 1;
        } else {
          this.result = '졌습니다';
          this.score -= 1;
        }

        setTimeout(() => {
          this.changeHand();
        },1000);
      }
    },
    computed: {
      computedStyleObject() {
        return {
          background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCode} 0`
        }
      }
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      console.log('created');
    },
    beforeMount() {
      console.log('beforeMount');
    },
    mounted() {
      console.log('mounted');
      this.changeHand();
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
      clearInterval(interval);  // 메모리 누수를 방지하기 위해 챙기자
    },
    detroyed() {
      console.log('detroyed');
    },
  };
</script>

<style scoped>
#computer {
  width: 150px;
  height: 200px;
}
</style>


