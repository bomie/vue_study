/*
  vue 컴포넌트 생성
  .vue 는 특수한 문법을 쓰는 자바스크립트 파일
*/

<template>
  <div>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div>tries : {{tries.length}}</div>
    <ul>
      <li v-for="t in tries" :key="t.try">
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li>
    </ul>

  </div>
</template>

<script>
  const getNumbers = () => {
    const candidates = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }

  export default {
    data() {
      return {
        answer: getNumbers(),
        tries: [],
        value: '',
        result: ''
      }
    },
    methods: {
      onSubmitForm(e) {
        if(this.value === this.answer.join('')) {
          this.result = 'homerun';
        } else {
          console.log(this.tries.length, this.tries.length > 2);
          if(this.tries.length > 2) {
            this.result = `You lose. ${this.answer.join('')}`;
            this.answer = getNumbers();
            alert('New Game!');
          } else {
            let strike = 0;
            let ball = 0;
            const answerArray = this.value.split('').map(v => parseInt(v));
            for(let i=0; i<4; i++) {
              if(answerArray[i] === this.answer[i]) {
                strike++;
              } else if (this.answer.includes(answerArray[i])) {
                ball++;
              }
            }
            this.result = `${strike} strike, ${ball} ball`;
          }
        } 

        this.tries.push({
          try: this.value,
          result: this.result
        });
        this.value = '';
        this.$refs.answer.focus();
      }
    }
  };
</script>

<style>
</style>


