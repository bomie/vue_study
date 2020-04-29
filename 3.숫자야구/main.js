/*
  vue 인스턴스 생성
*/

import Vue from 'vue';

// 1. 웹팩은 자바스크립트만 합쳐주는데 하단 파일은 vue 파일
//    따라서 vue파일은 vue-loader가 처리하도록, module - rules 설정
// 2. resolve - extension에서 확장자 처리하므로 기입하지 않아도 된다.
import NumberBaseball from './NumberBaseball' 

new Vue(NumberBaseball).$mount('#root');

