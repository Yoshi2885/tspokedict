import { useState } from 'react';
// import './App.css'

function Dict() {
  return (
    <>
      <div className="card">
        <img src="API" alt="pokefig" />
        <div className="name">pokename</div>
        <div className="size">pokesize</div>
        <div className="weight">weight</div>
        <div className="type">type</div>
      </div>
      <div>
        <button className="prev">戻る</button>
        <button className="next">次へ</button>
      </div>
    </>
  );
}

export default Dict;
