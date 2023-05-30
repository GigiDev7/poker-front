import { useEffect, useState } from "react";
import GameTable from "../components/game/GameTable";
import { io } from "socket.io-client";
//import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { ITableData } from "../interface";
import { BASE_URL_PROD } from "../config";

const socket = io(`${BASE_URL_PROD}`, {
  autoConnect: false,
  transports: ["websocket"],
});

const Table = () => {
  //const [cookies] = useCookies();
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user")!);

  const [tableData, setTableData] = useState<null | ITableData>(null);
  const [finishedHand, setFinishedHand] = useState(false);

  const handleAction = (action: string, chips?: number) => {
    const actionData: { action: string; chips?: number } = { action };
    if (chips) actionData.chips = chips;
    socket.emit("action", params.tableId, actionData);
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("join", user, params.tableId);
    });
    socket.on("table-data", (table) => {
      setFinishedHand(false);
      setTableData(table);
    });
    socket.on("finished-hand", () => {
      setFinishedHand(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-black h-full flex justify-center items-center">
      {tableData && (
        <GameTable
          handleAction={handleAction}
          tableData={tableData}
          finishedHand={finishedHand}
        />
      )}
      {tableData && !tableData.player2 && (
        <p className="text-white">Waiting for another player</p>
      )}
    </div>
  );
};

export default Table;
