export interface IPlayer {
  cards: string[];
  chipCount: number;
  email: string;
  id: string;
  firstname: string;
  lastname: string;
  action: {
    actionChips: number;
    action: string;
  };
  combination: {
    cards: string[];
    combination: string;
  };
}

export interface ITableData {
  pot: number;
  lastAction: string;
  smallBlind: number;
  bigBlind: number;
  gameIsFinished: boolean;
  winner: string;
  playerTurn: string;
  cards: string[];
  tableId: string;
  _id: string;
  player1: IPlayer;
  player2: IPlayer;
}
