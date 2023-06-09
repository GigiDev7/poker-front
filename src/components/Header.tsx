import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { useModal } from "../hooks/useModal";
import AuthForm from "./AuthForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { capitalize } from "../utils/capitalize";
import { useCookies } from "react-cookie";
import { authAction, loginUser, registerUser } from "../store/auth";
import authAPI from "../api/auth";

const Header = () => {
  const { hideModal, isOpen, showModal } = useModal();
  const [auth, setAuth] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const [_, _2, removeCookie] = useCookies();
  const dispatch = useAppDispatch();

  const profileWindow = useModal();

  const onBtnClick = (type: "login" | "register") => {
    setAuth(type);
    showModal();
  };

  const onCancel = () => {
    setAuth("");
    hideModal();
  };

  const changeAuth = (type: string) => {
    setAuth(type);
  };

  const onLogout = async () => {
    await authAPI.logout();
    removeCookie("user");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    profileWindow.hideModal();
    dispatch(authAction.setUser(null));
  };

  const onGuestLogin = async () => {
    const randNum = Math.floor(Math.random() * 10000);
    await dispatch(
      registerUser({
        email: `Guest${randNum}@gmail.com`,
        firstname: `Guest ${randNum}`,
        lastname: ".",
        password: "123456",
      })
    ).unwrap();
    dispatch(
      loginUser({ email: `Guest${randNum}@gmail.com`, password: "123456" })
    );
  };

  return (
    <div className="flex justify-between  font-medium w-[80%] mx-auto">
      <div className="flex gap-6 text-white">
        <Link to="/">Home</Link>
      </div>
      {!user && (
        <div className="flex gap-6 text-white">
          <button onClick={onGuestLogin}>
            {loading ? "Logging in..." : "Continue as guest"}
          </button>
          <button onClick={() => onBtnClick("login")}>Login</button>
          <button onClick={() => onBtnClick("register")}>Register</button>
        </div>
      )}
      {user && (
        <div className="relative">
          <button onClick={profileWindow.toggle}>
            <p className="text-white">
              {capitalize(user.firstname)} {capitalize(user.lastname)}
            </p>
          </button>
          {profileWindow.isOpen && (
            <div className="absolute right-0 top-10 bg-white w-36  shadow-md flex flex-col gap-2 items-start">
              <button className="hover:bg-gray-200 w-full text-start pl-2 py-2">
                Profile
              </button>
              <button
                onClick={onLogout}
                className="hover:bg-gray-200 w-full text-start pl-2 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      <Modal footer={null} onCancel={onCancel} open={isOpen}>
        <AuthForm closeModal={hideModal} auth={auth} changeAuth={changeAuth} />
      </Modal>
    </div>
  );
};

export default Header;
