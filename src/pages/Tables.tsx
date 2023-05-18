import Layout from "../components/Layout";
import { Modal } from "antd";
import { useModal } from "../hooks/useModal";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiTwotoneCopy } from "react-icons/ai";

const Tables = () => {
  const { hideModal, isOpen, showModal } = useModal();
  const [modalType, setModalType] = useState("");
  const [tableId, setTableId] = useState<null | string>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = (type: string) => {
    if (type === "create") {
      const newId = uuidv4();
      setTableId(newId);
    }
    setModalType(type);
    showModal();
  };

  const copyId = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(tableId!);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const onTableBtnClick = () => {
    setTableId(null);
    window.open(`/tables/${tableId}`, "", "width=800,height=1200");
    hideModal();
  };

  return (
    <Layout homePage>
      <div className="flex flex-col items-center gap-5">
        <button
          onClick={() => handleClick("create")}
          className="bg-blue-500 py-2 w-40 hover:bg-blue-600 rounded-md text-white"
        >
          Create table
        </button>
        <button
          onClick={() => handleClick("join")}
          className="bg-blue-500 py-2 w-40 hover:bg-blue-600 rounded-md text-white"
        >
          Join table
        </button>

        <Modal open={isOpen} footer={null} onCancel={hideModal}>
          <div className="flex flex-col items-center my-6 px-8">
            {isCopied && <p className="mb-3">Id copied!</p>}
            {modalType === "create" && (
              <div className="relative border-[1px] border-black py-4 px-12">
                <p>{tableId}</p>
                <div
                  onClick={copyId}
                  className="absolute right-1 top-1 text-lg cursor-pointer"
                >
                  <AiTwotoneCopy />
                </div>
              </div>
            )}
            {modalType === "join" && (
              <div className="w-full">
                <input
                  onChange={(e) => setTableId(e.target.value)}
                  placeholder="Table id"
                  className="border-[1px] border-black p-2 w-full"
                />
              </div>
            )}
            <button
              disabled={modalType === "join" && !tableId}
              onClick={onTableBtnClick}
              className="mt-8 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-8 rounded-md"
            >
              {modalType === "create" ? "Create" : "Join"} table
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Tables;
