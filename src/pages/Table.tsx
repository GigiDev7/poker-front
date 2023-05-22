import { useEffect, useState } from "react";
import GameTable from "../components/game/GameTable";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { ITableData } from "../interface";

const socket = io("http://localhost:8888", { autoConnect: false });

const Table = () => {
  const [cookies] = useCookies();
  const params = useParams();

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
      socket.emit("join", cookies.user, params.tableId);
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
    </div>
  );
};

export default Table;
