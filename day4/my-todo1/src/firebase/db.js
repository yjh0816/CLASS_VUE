import firebase from "firebase/app"; // 파이어베이스 기능 불러오기
import "firebase/firestore"; // 파이어베이스의 파이어스토어 기능 불러오기

const firebaseConfig = {
  apiKey: "AIzaSyCjhGer44uYf7wIX7fYQ4vlZuLcE7AJEAg",
  authDomain: "my-todo1-3226d.firebaseapp.com",
  projectId: "my-todo1-3226d",
  storageBucket: "my-todo1-3226d.appspot.com",
  messagingSenderId: "149526309790",
  appId: "1:149526309790:web:0510886f04d96bae1cc48f",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
