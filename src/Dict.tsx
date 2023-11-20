import { useEffect, useState } from "react";
import "./Dict.css";
// import './App.css'

function Dict() {
  const initURL = "https://pokeapi.co/api/v2/pokemon/";
  interface FetchPoke {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  }
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
  const [pokemonsData, setPokemonsData] = useState<PokemonType[]>([]);
  const [ENGNames, setENGNames] = useState<string[]>([]);
  const [JPNames, setJPNames] = useState<string[]>([]);
  const [imgURL, setImgURL] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [height, setHeight] = useState<string[]>([]);
  const [weight, setWeight] = useState<number[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  // 最初に簡易的な２０匹分のjsonデータを取得する関数
  const getAllPoke = (url: string): Promise<FetchPoke> => {
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };
  // 簡易的なurlから詳細データを改めて取得する関数
  const getAllDatas = async (url: string) => {
    const _pokeData: FetchPoke = await getAllPoke(url);
    setNextUrl(_pokeData.next);
    setPrevUrl(_pokeData.previous);
    const urlArr = _pokeData.results.map((poke) => poke.url);
    const promises = urlArr.map((url) => fetch(url).then((res) => res.json()));
    const _pokeDataArr: PokemonType[] = await Promise.all(promises);
    setPokemonsData(_pokeDataArr);
  };

  const getJPName = async () => {
    const speciesURL = pokemonsData.map((poke) => poke.species.url);
    const promises = speciesURL.map((url) =>
      fetch(url).then((res) => res.json())
    );
    const JPNameJSON: JPPokeName[] = await Promise.all(promises);
    return JPNameJSON.map(
      (jpName) => jpName.names.find((name) => name.language.name === "ja")?.name
    ).filter((name): name is string => name !== undefined);
  };

  const handlePrevClick = async () => {
    if (prevUrl) {
      await getAllDatas(prevUrl);
    }
  };
  const handleNextClick = async () => {
    if (nextUrl) {
      await getAllDatas(nextUrl);
    }
  };

  // ページを開いたら２０匹分の詳細データを取得する
  useEffect(() => {
    getAllDatas(initURL);
  }, []);

  // ポケモンの詳細データを取得し、それに基づいて関連するステートを更新
  useEffect(() => {
    const figURLArr = pokemonsData.map(
      (poke) => poke.sprites.other["official-artwork"].front_default
    );
    const EngNameArr = pokemonsData.map((poke) => poke.species.name);
    const typeArr = pokemonsData.map((poke) =>
      poke.types.map((t) => t.type.name).join(", ")
    );
    const heightArr = pokemonsData.map((poke) => poke.height);
    const weightArr = pokemonsData.map((poke) => poke.weight);

    setImgURL(figURLArr);
    setENGNames(EngNameArr);
    setType(typeArr);
    setHeight(heightArr);
    setWeight(weightArr);
    getJPName().then((jaNames) => {
      setJPNames(jaNames);
    });
  }, [pokemonsData]); // JPNamesを依存配列から削除

  useEffect(() => {
    // JPNames が変更された際にのみ実行
    if (JPNames.length > 0) {
      const JapaneseNameArr = JPNames.map((name) => name);
      // 既存の状態と異なる場合のみ更新
      if (JapaneseNameArr.join(",") !== JPNames.join(",")) {
        setJPNames(JapaneseNameArr);
      }
    }
  }, [JPNames]);

  return (
    <>
      <div className="cards-container">
        {pokemonsData.map((elem, i) => (
          <div key={i} className="card">
            <img src={imgURL[i]} alt="pokefig" />
            <div className="name">
              {ENGNames[i]} / {JPNames[i]}
            </div>
            <div className="size">大きさ: {height[i]}</div>
            <div className="weight">重さ: {weight[i]}</div>
            <div className="type">タイプ: {type[i]}</div>
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
