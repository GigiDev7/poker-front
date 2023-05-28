import React from "react";
import { BiCoinStack } from "react-icons/bi";
import { IPlayer } from "../../interface";

const Player: React.FC<{
  playerData: IPlayer;
  isTurn: boolean;
  progressBarStatus: number;
}> = ({ playerData, isTurn, progressBarStatus }) => {
  return (
    <div className="">
      <div
        style={{
          background: isTurn
            ? `radial-gradient(closest-side, white 79%, transparent 80% 100%),
      conic-gradient(orange ${progressBarStatus}%, rgb(253, 253, 252) 0)`
            : "",
        }}
        className={`bg-white w-24 h-24 rounded-full flex flex-col gap-1 font-medium items-center justify-center`}
      >
        <progress className="hidden w-0 h-0" max="100"></progress>
        <p className="uppercase">
          {playerData.firstname[0].toUpperCase()}
          {playerData.lastname[0].toUpperCase()}
        </p>
        <div className="flex items-center gap-1">
          <p>{playerData.chipCount}</p>
          <BiCoinStack />
        </div>
      </div>
    </div>
  );
};

export default Player;
