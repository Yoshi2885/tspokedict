import { useEffect, useState } from "react";
import "./Dict.css";

function Dict() {
  const rootURL =
    import.meta.env.VITE_API_URL || "https://pokedict.onrender.com/";
  const initURL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokeDataArr, setPokeDataArr] = useState<PokeArr[]>([]);
  const [nextURL, setNextURL] = useState<null | string>(null);
  const [prevURL, setPrevURL] = useState<null | string>(null);

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

  const getAllPokemonData = async (url: string | null) => {
    try {
      const res = await fetch(`${rootURL}pokedict?url=${url}`);
      const data = await res.json();
      await setPokeDataArr(data);
      await setNextURL(data[0].next);
      await setPrevURL(data[0].prev);
    } catch (error) {
      console.error("error");
    }
  };
  const handlePrevClick = async () => {
    if (prevURL) {
      await getAllPokemonData(prevURL);
    }
  };

  const handleNextClick = async () => {
    if (nextURL) {
      await getAllPokemonData(nextURL);
    }
  };

  useEffect(() => {
    getAllPokemonData(initURL);
  }, []);

  return (
    <>
      <div className="top-button">
        <button className="prev" onClick={handlePrevClick}>
          戻る
        </button>
        <button className="next" onClick={handleNextClick}>
          次へ
        </button>
      </div>
      <div className="cards-container">
        {pokeDataArr.map((poke, i) => (
          <div key={i} className="card">
            <div className="id">図鑑番号: {poke.id}</div>
            <img src={poke.imgURL} alt="pokefig" />
            <div className="name">
              {poke.engName} / {poke.jpName}
            </div>
            <div className="size">大きさ: {poke.height}</div>
            <div className="weight">重さ: {poke.weight}</div>
            <div className="type">タイプ: {poke.type}</div>
          </div>
        ))}
      </div>
      <div>
        <button className="prev" onClick={handlePrevClick}>
          戻る
        </button>
        <button className="next" onClick={handleNextClick}>
          次へ
        </button>
      </div>
    </>
  );
}

export default Dict;
