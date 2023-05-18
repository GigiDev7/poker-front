import { useEffect, useState } from "react";
import GameTable from "../components/game/GameTable";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { ITableData } from "../interface";

const Table = () => {
  const [cookies] = useCookies();
  const params = useParams();

  const [tableData, setTableData] = useState<null | ITableData>(null);

  useEffect(() => {
    const socket = io("http://localhost:8888");
    socket.on("connect", () => {
      socket.emit("join", cookies.user, params.tableId);
    });
    socket.on("table-data", (table) => {
      console.log(table);
      setTableData(table);
    });
  }, []);

  return (
    <div className="bg-black h-full flex justify-center items-center">
      {tableData && <GameTable tableData={tableData} />}
    </div>
  );
};

export default Table;
