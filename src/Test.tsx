import { useEffect, useState } from "react";
import "./Test.css";

const maxNo = 1017;
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

interface PokemonType {
  height: string;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
interface JPPokeName {
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
}

function Test() {
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);
  const [englishName, setEnglishName] = useState<string | null>(null);
  const [japaneseName, setJapaneseName] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState<string | null>(null);
  const [correctFlag, setCorrectFlag] = useState<boolean | null>(null);

  const getPokeData = async () => {
    const randomSelect = Math.floor(Math.random() * (maxNo + 1));
    const pokeData: PokemonType = await fetch(
      `${baseURL}${randomSelect}/`
    ).then((res) => res.json());
    await setPokemonData(pokeData);

    // 英語名を取得
    await setEnglishName(pokeData.species.name);

    // 日本語名を取得する
    const speciesURL = pokeData.species.url;
    const JPNameJSON: JPPokeName = await fetch(speciesURL).then((res) =>
      res.json()
    );
    const JPName =
      JPNameJSON.names.find((name) => name.language.name === "ja")?.name ??
      null;
    await setJapaneseName(JPName);
  };

  const getInputVal = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
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
    if (inputVal === englishName || inputVal === japaneseName) {
      console.log("正解です");
      resetInput();
      setCorrectFlag(true);
    } else {
      console.log("不正解です");
      resetInput();
      setCorrectFlag(false);
    }
  };
  const reTry = () => {
    setCorrectFlag(null);
    resetInput();
    getPokeData();
  };

  useEffect(() => {
    getPokeData();
  }, []);

  return (
    <>
      <div className="top-q">だ～れだ？</div>
      {pokemonData && (
        <div className="test-card">
          <img
            src={pokemonData.sprites.other["official-artwork"].front_default}
            alt="pokefig"
          />
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
            正解は：{englishName} / {japaneseName} でした
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
