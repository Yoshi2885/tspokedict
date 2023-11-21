import { useEffect, useState } from "react";
// import './App.css'

function Retry() {
  // test用
  const fetchFunc = async () => {
    const initURL = "https://pokeapi.co/api/v2/pokemon/";
    try {
      const res = await fetch(`http://localhost:3000/pokedict?url=${initURL}`);
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.error("error");
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);
  return (
    <>
      <div>⌛復習の時間だ⌛</div>
      <div className="card">
        <img src="API" alt="pokefig" />
      </div>
      <div>だ～れだ？</div>
      <input type="text" />
      <button>回答する</button>
      <div>{null}</div>
      {/* 正解かハズレかを表示 */}
    </>
  );
}

export default Retry;
