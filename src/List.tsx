import { useEffect, useState } from "react";
import "./List.css";

interface DBTable {
  id: number;
  user_id: number;
  pokemon_id: number;
  correct_or_incorrect: boolean;
}
[];
function List() {
  const [data, setData] = useState<DBTable[]>([]);

  useEffect(() => {
    const dbData = async () => {
      const result = [
        { id: 1, user_id: 1, pokemon_id: 729, correct_or_incorrect: false },
        { id: 2, user_id: 1, pokemon_id: 595, correct_or_incorrect: false },
        { id: 3, user_id: 1, pokemon_id: 415, correct_or_incorrect: false },
        { id: 4, user_id: 1, pokemon_id: 594, correct_or_incorrect: false },
        { id: 5, user_id: 1, pokemon_id: 632, correct_or_incorrect: false },
        { id: 6, user_id: 1, pokemon_id: 229, correct_or_incorrect: true },
        { id: 7, user_id: 1, pokemon_id: 703, correct_or_incorrect: false },
      ];
      setData(result);
    };
    dbData();
  }, []);

  return (
    <>
      <div>正答率75%以上のポケモンは</div>
      <div>◯/1000匹です</div>
      <div>あなたが間違えたポケモンはこちらです</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER_ID</th>
              <th>図鑑番号</th>
              <th>正誤結果</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.pokemon_id}</td>
                <td>{item.correct_or_incorrect ? "正解" : "不正解"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;
