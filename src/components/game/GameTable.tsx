import { useMemo } from "react";
import Player from "./Player";
import Card from "./Card";
import { ITableData } from "../../interface";
import { useCookies } from "react-cookie";

const GameTable: React.FC<{ tableData: ITableData }> = ({ tableData }) => {
  const [cookies] = useCookies();
  const user = cookies.user;

  const player = useMemo(
    () =>
      tableData.player1.email === user.email
        ? tableData.player1
        : tableData.player2,
    [tableData]
  );
  const oponent = useMemo(
    () =>
      tableData.player1.email !== user.email
        ? tableData.player1
        : tableData.player2,
    [tableData]
  );

  return (
    <div className="flex flex-col">
      <div className="relative bg-green-800 w-[650px] h-[500px] rounded-[50%] flex items-center justify-center">
        <p className="tracking-[30px] pl-[25px] font-bold">WSOP</p>
        <div className="absolute -bottom-10 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Card card={player.cards[0]} />
            <Card card={player.cards[1]} />
          </div>
          <Player playerData={player} />
        </div>
        <div className="flex gap-1 absolute">
          {tableData.cards.map((c) => (
            <Card card={c} />
          ))}
        </div>
        <div className="absolute -top-10 flex flex-col items-center gap-4">
          <Player playerData={oponent} />
          <div className="flex gap-2">
            <Card card={oponent.cards[0]} back />
            <Card card={oponent.cards[1]} back />
          </div>
        </div>
      </div>
      <div className="mt-16 bg-white h-20 rounded-md flex justify-between items-center px-5">
        <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Call
        </button>
        <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Check
        </button>
        <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Raise
        </button>
        <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          All in
        </button>
        <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Fold
        </button>
      </div>
    </div>
  );
};

export default GameTable;
