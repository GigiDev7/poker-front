import { useMemo, useState, useRef } from "react";
import Player from "./Player";
import Card from "./Card";
import { BiCoinStack } from "react-icons/bi";
import { ITableData } from "../../interface";
import { useCookies } from "react-cookie";
import { Modal, InputNumber } from "antd";
import { GiConfirmed, GiCancel } from "react-icons/gi";

const GameTable: React.FC<{
  tableData: ITableData;
  handleAction: (action: string, chips?: number) => void;
  finishedHand: boolean;
}> = ({ tableData, handleAction, finishedHand }) => {
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

  const [activeRaise, setActiveRaise] = useState(false);
  const [raiseChips, setRaiseChips] = useState<number | null>(null);
  const [chipsValid, setChipsValid] = useState(true);

  const onFold = () => {
    handleAction("fold");
  };

  const onAllin = () => {
    handleAction("all-in");
  };

  const onCall = () => {
    handleAction("call");
  };

  const onCheck = () => {
    handleAction("check");
  };

  const onRaise = () => {
    if (raiseChips && chipsValid) {
      setActiveRaise(false);
      handleAction("raise", raiseChips);
      setRaiseChips(null);
      setChipsValid(true);
    }
  };

  const onChipsChange = (val: number | null) => {
    setRaiseChips(val);
    if (
      val &&
      (val < oponent.action.actionChips + player.action.actionChips ||
        val > player.chipCount)
    ) {
      setChipsValid(false);
    } else if (val) {
      setChipsValid(true);
    }
  };

  const onRaiseBtnClick = () => {
    setActiveRaise(true);
  };

  const hideActiveRaise = () => {
    setActiveRaise(false);
    setRaiseChips(null);
    setChipsValid(true);
  };

  const closeGame = () => {
    window.close();
  };

  return (
    <div className="flex flex-col">
      <div className="relative bg-green-800 w-[650px] h-[500px] rounded-[50%] flex items-center justify-center">
        <p className="tracking-[30px] pl-[25px] font-bold">WSOP</p>
        <div className="absolute -bottom-10 flex flex-col items-center gap-4">
          <div className="flex gap-2 relative">
            <Card card={player.cards[0]} />
            <Card card={player.cards[1]} />
            {player.action.actionChips > 0 && (
              <div className="absolute -bottom-10 -left-8 text-white gap-1 flex items-center">
                <p>{player.action.actionChips}</p>
                <p>
                  <BiCoinStack />
                </p>
              </div>
            )}
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
            <Card card={oponent.cards[0]} back={!finishedHand} />
            <Card card={oponent.cards[1]} back={!finishedHand} />
            {oponent.action.actionChips > 0 && (
              <div className="absolute -top-10 -left-8 text-white gap-1 flex items-center">
                <p>{oponent.action.actionChips}</p>
                <p>
                  <BiCoinStack />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {tableData.playerTurn === player.id && !finishedHand && (
        <div className="mt-16 bg-white h-20 rounded-md flex justify-between items-center px-5">
          <button
            disabled={tableData.lastAction === "check"}
            onClick={onCall}
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Call
          </button>
          <button
            onClick={onCheck}
            disabled={
              tableData.player1.action.actionChips !==
              tableData.player2.action.actionChips
            }
            className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Check
          </button>
          {!activeRaise ? (
            <button
              onClick={onRaiseBtnClick}
              disabled={tableData.lastAction === "all-in"}
              className="bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Raise
            </button>
          ) : (
            <div className="relative">
              <InputNumber
                value={raiseChips}
                size="large"
                className="w-32"
                onChange={(val) => onChipsChange(val)}
                status={!chipsValid ? "error" : ""}
                controls={false}
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 mr-1 text-xl">
                <button onClick={onRaise} className="text-green-500">
                  <GiConfirmed />
                </button>
                <button onClick={hideActiveRaise} className="text-red-500">
                  <GiCancel />
                </button>
              </div>
            </div>
          )}
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

      <Modal onCancel={closeGame} footer={null} open={!!tableData.winner}>
        <div className="flex justify-center m-4">
          <p className="capitalize font-semibold">
            {tableData.winner === player.id
              ? `${player.firstname} ${player.lastname} won!`
              : `${oponent.firstname} ${oponent.lastname} won!`}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default GameTable;
