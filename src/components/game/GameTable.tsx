import { useMemo } from "react";
import Player from "./Player";
import Card from "./Card";
import { BiCoinStack } from "react-icons/bi";
import { ITableData } from "../../interface";
import { useCookies } from "react-cookie";

const GameTable: React.FC<{
  tableData: ITableData;
  handleAction: (action: string, chips?: number) => void;
}> = ({ tableData, handleAction }) => {
  const [cookies] = useCookies();
  const user = cookies.user;

  const onFold = () => {
    handleAction("fold");
  };

  const onAllin = () => {
    handleAction("all-in");
  };

  const onCall = () => {
    handleAction("call");
  };

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
          <div className="flex gap-2 relative">
            <Card card={player.cards[0]} />
            <Card card={player.cards[1]} />
            <div className="absolute -bottom-10 -left-8 text-white gap-1 flex items-center">
              <p>{player.action.actionChips}</p>
              <p>
                <BiCoinStack />
              </p>
            </div>
          </div>
          <Player
            playerData={player}
            isTurn={tableData.playerTurn === player.id}
          />
        </div>
        <div className="flex flex-col items-center mr-8 absolute left-20 text-xl text-white gap-2">
          <p>{tableData.pot}</p>
          <BiCoinStack />
        </div>
        <div className="flex gap-2 absolute">
          {tableData.cards.map((c) => (
            <Card key={c} card={c} />
          ))}
        </div>
        <div className="absolute -top-10 flex flex-col items-center gap-4">
          <Player
            isTurn={tableData.playerTurn === oponent.id}
            playerData={oponent}
          />
          <div className="flex gap-2 relative">
            <Card card={oponent.cards[0]} back />
            <Card card={oponent.cards[1]} back />
            <div className="absolute -top-10 -left-8 text-white gap-1 flex items-center">
              <p>{oponent.action.actionChips}</p>
              <p>
                <BiCoinStack />
              </p>
            </div>
          </div>
        </div>
      </div>
      {tableData.playerTurn === player.id && (
        <div className="mt-16 bg-white h-20 rounded-md flex justify-between items-center px-5">
          <button
            onClick={onCall}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Call
          </button>
          <button
            disabled={tableData.lastAction === "all-in"}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Check
          </button>
          <button
            disabled={tableData.lastAction === "all-in"}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Raise
          </button>
          <button
            disabled={tableData.lastAction === "all-in"}
            onClick={onAllin}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            All in
          </button>
          <button
            onClick={onFold}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Fold
          </button>
        </div>
      )}
    </div>
  );
};

export default GameTable;
