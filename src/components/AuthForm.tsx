import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { loginUser, registerUser } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const AuthForm: React.FC<{
  auth: string;
  changeAuth: (type: string) => void;
  closeModal: () => void;
}> = ({ auth, changeAuth, closeModal }) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const [wasRegistered, setWasRegistered] = useState(false);

  const onSubmit = async (values: any) => {
    if (auth === "login") {
      try {
        await dispatch(
          loginUser({ email: values.email, password: values.password })
        ).unwrap();
        closeModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(
          registerUser({
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
          })
        ).unwrap();
        setWasRegistered(true);
        changeAuth("login");
        setTimeout(() => {
          setWasRegistered(false);
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      {wasRegistered && (
        <p className="text-center my-4 font-medium">Successfully registered!</p>
      )}
      <Form onFinish={onSubmit} className="m-4" layout="vertical">
        {auth === "register" && (
          <>
            <Form.Item
              rules={[{ required: true, message: "Firstname is required" }]}
              label="Firstname"
              name="firstname"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Lastname is required" }]}
              label="Lastname"
              name="lastname"
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters long" },
          ]}
          label="Password"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        {auth === "register" && (
          <Form.Item
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, val) {
                  if (!val || val === getFieldValue("password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
            label="Confrim Password"
            name="confirmPassword"
          >
            <Input.Password />
          </Form.Item>
        )}
        {error && (
          <p className="text-center text-red-500 mb-4 font-medium">{error}</p>
        )}

        <div className="flex justify-center">
          <Button className="bg-[#1677ff]" type="primary" htmlType="submit">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
