import React from "react";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";

const Card: React.FC<{ card: string; back?: boolean }> = ({ card, back }) => {
  const suits = {
    C: (
      <p className="">
        <BsFillSuitClubFill />
      </p>
    ),
    D: (
      <p className="text-red-600">
        <BsFillSuitDiamondFill />
      </p>
    ),
    S: (
      <p>
        <BsFillSuitSpadeFill />
      </p>
    ),
    H: (
      <p className="text-red-600">
        <BsFillSuitHeartFill />
      </p>
    ),
  };

  const cardNumer = card.length === 2 ? card[0] : card.slice(0, 2);

  const cardSuit = (
    card.length === 2 ? card[1] : card[2]
  ) as keyof typeof suits;

  return (
    <div className="relative bg-white w-14 h-20 rounded-md flex flex-col px-1 font-medium  justify-between">
      {!back && (
        <>
          <div className="text-sm text-center w-fit">
            <p
              className={`${
                cardSuit === "H" || cardSuit === "D" ? "text-red-600" : ""
              }`}
            >
              {cardNumer}
            </p>
            {suits[cardSuit]}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
            {suits[cardSuit]}
          </div>
          <div className="text-sm self-end text-center rotate-180">
            <p
              className={`${
                cardSuit === "H" || cardSuit === "D" ? "text-red-600" : ""
              }`}
            >
              {cardNumer}
            </p>
            {suits[cardSuit]}
          </div>
        </>
      )}
      {back && (
        <div className="flex flex-col items-center justify-center h-full gap-6 text-[12px]">
          <p className="text-center font-semibold">WSOP</p>
          <div className="flex">
            {suits["D"]}
            {suits["S"]}
            {suits["H"]}
            {suits["C"]}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
