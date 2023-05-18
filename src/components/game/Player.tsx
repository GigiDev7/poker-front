import React from "react";
import { BiCoinStack } from "react-icons/bi";
import { IPlayer } from "../../interface";

const Player: React.FC<{ playerData: IPlayer }> = ({ playerData }) => {
  return (
    <div className="">
      <div className="bg-white w-24 h-24 rounded-full flex flex-col gap-1 font-medium items-center justify-center">
        <p className="uppercase">gv</p>
        <div className="flex items-center gap-1">
          <p>{playerData.chipCount}</p>
          <BiCoinStack />
        </div>
      </div>
    </div>
  );
};

export default Player;
