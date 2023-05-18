import { useEffect, useState } from "react";
import GameTable from "../components/game/GameTable";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { ITableData } from "../interface";

const socket = io("http://localhost:8888", { autoConnect: false });

console.log("hey");

const Table = () => {
  const [cookies] = useCookies();
  const params = useParams();

  const [tableData, setTableData] = useState<null | ITableData>(null);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("join", cookies.user, params.tableId);
    });
    socket.on("table-data", (table) => {
      setTableData(table);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("table-data");
    };
  }, []);

  return (
    <div className="bg-black h-full flex justify-center items-center">
      {tableData && <GameTable tableData={tableData} />}
    </div>
  );
};

export default Table;
