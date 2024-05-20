import React from "react";
import {  Dropdown, Space } from "antd";
import { UserState } from "../context/UserContext";
import axios from "axios";
import { CartState } from "../context/Context";

const CustomDropdown = () => {
  const {
    state: { user },
    logout,
  } = UserState();
  const { dispatch } = CartState();

  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await axios.post(
                "http://localhost:5000/api/users/logout",
                null,
                {
                  withCredentials: true,
                }
              );
              dispatch({
                type: "CLEAR_CART",
              });
              logout();
            } catch (error) {
              console.error(error);
            }
          }}
          className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Log Out
        </button>
      ),
    },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <img
            onClick={() => {}}
            alt="user avatar"
            className="w-[50px] h-[50px] rounded-3xl"
            src={user.profileImage}
          />
        </Dropdown>
      </Space>
    </Space>
  );
};
export default CustomDropdown;
