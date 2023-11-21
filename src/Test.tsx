import { useEffect, useState } from "react";
import "./Test.css";

const rootURL = "http://localhost:3000/";

interface PokeArr {
  id: number;
  imgURL: string;
  engName: string;
  jpName: string;
  height: number;
  weight: number;
  type: string;
}
[];

function Test() {
  const [pokemonData, setPokemonData] = useState<PokeArr[]>([]);
  const [inputVal, setInputVal] = useState<string | null>(null);
  const [correctFlag, setCorrectFlag] = useState<boolean | null>(null);

  const getTestPokeData = async () => {
    try {
      const res = await fetch(`${rootURL}randomtest`);
      const data = await res.json();
      await setPokemonData(data);
    } catch (error) {
      console.error("error");
    }
  };

  const getInputVal = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputVal(e.target.value);
  };

  const resetInput = () => {
    setInputVal(null);
    const answerInput = document.getElementsByClassName("answer")[0];
    if (answerInput instanceof HTMLInputElement) {
      answerInput.value = "";
    }
  };

  const sendAns = () => {
    if (inputVal === null) return;
    if (
      inputVal === pokemonData[0].engName ||
      inputVal === pokemonData[0].jpName
    ) {
      resetInput();
      setCorrectFlag(true);
    } else {
      resetInput();
      setCorrectFlag(false);
    }
  };

  const reTry = () => {
    setCorrectFlag(null);
    resetInput();
    getTestPokeData();
  };

  useEffect(() => {
    getTestPokeData();
  }, []);

  return (
    <>
      <div className="top-q">だ～れだ？</div>
      {pokemonData.length > 0 && (
        <div className="test-card">
          <img src={pokemonData[0].imgURL} alt="pokefig" />
        </div>
      )}
      <input className="answer" type="text" onChange={getInputVal} />
      <button onClick={sendAns}>回答する</button>
      <div>{null}</div>
      {/* 正解かハズレかを表示 */}
      {correctFlag === null ? null : correctFlag ? (
        <>
          <img className="satoshi" src="/get.jpeg" alt="vite" />
          <div>getだぜ！</div>
        </>
      ) : (
        <>
          <img className="rocket" src="/yanakanji.jpeg" alt="vite" />
          <div>やな感じぃ〜！</div>
          <div>
            正解は：{pokemonData[0].engName} / {pokemonData[0].jpName} でした
          </div>
        </>
      )}
      <div>
        {correctFlag === null ? null : (
          <button onClick={reTry}>もう一回？</button>
        )}
      </div>
    </>
  );
}

export default Test;
