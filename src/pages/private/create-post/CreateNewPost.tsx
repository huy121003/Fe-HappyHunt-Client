import CreatePostForm from "@/features/create-post/components/form/CreatePostForm";
import { Card, Flex } from "antd";
import React from "react";

function CreateNewPost() {
  return (
    <Flex justify="center" align="center">
      <Card>
        <CreatePostForm />
      </Card>
    </Flex>
  );
}

export default CreateNewPost;
