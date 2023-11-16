import React, { useState } from 'react';
// import './App.css'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <button id="Home" onClick={onClick}>
        🏠Home
      </button>
      <button id="Dict" onClick={onClick}>
        📕ポケモン図鑑
      </button>
      <button id="Test" onClick={onClick}>
        ポケモン言えるかな
      </button>
      <button id="List" onClick={onClick}>
        🔎苦手リスト
      </button>
      <button id="Retry" onClick={onClick}>
        🖊再テスト
      </button>
      <button id="lang" onClick={onClick}>
        💬言語切替
      </button>
    </>
  );
};

export default Navbar;
