import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/main/footer";
import Header from "../../components/main/header";

import Posts from "../../data";

const Report = () => {
  const { post_no } = useParams(); // URL에서 no 추출
  const [posts, setPosts] = useState(Posts); // 샘플 데이터로 초기화

  useEffect(() => {
    // Convert the URL parameter to an integer and find the post
    const postNo = parseInt(post_no, 10); // Ensure id is treated as a number
    const foundPost = Posts.find((p) => p.post_no === postNo);

    setPosts(foundPost); // Set the found post to state
  }, [post_no]); // Dependency array includes id to refetch if it changes

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <Header post={posts} />
      <h1>신고 페이지입니다.</h1>
      <p>Reporting post with ID: {posts.post_no}</p>
      <p>Reporting post with TITLE: {posts.post_title}</p>
      <Footer post={posts} />
    </div>
  );
};

export default Report;
