import { useState } from 'react';
// import './App.css'

function Test() {
  return (
    <>
      <div>さぁ、ポケモンの名前を答えよう</div>
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

export default Test;
