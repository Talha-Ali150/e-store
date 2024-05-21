import React, { useState } from "react";
import { Avatar, Button, List } from "antd";
import axios from "axios";

const MyProductsList = ({ data }) => {
  const deleteProduct = async (item) => {
    console.log(item);

    try {
      await axios.delete("https://e-store-taupe.vercel.app/api/products/delete-product", {
        params: {
          del_id: item._id,
          owner_id: item.owner,
        },
        withCredentials: true,
      });
      console.log("success in eletion");
    } catch (error) {
      console.log(error);
    }
  };

  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  return (
    <>
      <List
        pagination={{
          position,
          align,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                onClick={() => {
                  deleteProduct(item);
                }}
              >
                delete
              </Button>,
              <Button>edit</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.productMainImage} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default MyProductsList;
