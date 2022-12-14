import React, { useEffect } from "react";
import { useState } from "react";
import { List } from "@mui/material";
import { Box } from "@mui/system";

import CategorySelectButton from "../molecule/CategorySelectButton";
import ProfileReviewItem from "../molecule/ProfileReviewItem";
import ProfileCommentItem from "../molecule/ProfileCommentItem";

import { getUserReviewList } from "../../apis/review";
import { getUserCommentList } from "../../apis/comment";
import { useSelector } from "react-redux";
import UserActivityPagination from "../molecule/UserActivityPagination";
import ProfileCommentPagination from "../molecule/ProfileCommentPagination";

const activityCategory = ["후기", "댓글"];

export default function MyActivity() {
  const user = useSelector(state => state.user.info);
  const [selectedCategory, setSelectedCategory] = useState(activityCategory[0]);
  const [reviewList, setReviewList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getUserCommentList(user?.idTag, 100, 0, getUserCommentListSuccess, getUserCommentListFail);
    getUserReviewList(100, 0, user?.idTag, getUserReviewListSuccess, getUserReviewListFail);
  }, [user]);

  function getUserCommentListSuccess(res) {
    setCommentList(res.data);
  }

  function getUserCommentListFail(err) {}

  function getUserReviewListSuccess(res) {
    setReviewList(res.data);
  }

  function getUserReviewListFail(err) {}

  function selectActivityCategory(e) {
    e.preventDefault();
    setSelectedCategory(e.target.innerText);
  }

  return (
    <Box sx={{ width: "90%", marginY: 2, margin: "auto" }}>
      <Box sx={{ display: "flex" }}>
        {activityCategory.map((item, i) => (
          <CategorySelectButton
            key={i}
            category={item}
            selected={selectedCategory === item}
            onClick={selectActivityCategory}
          ></CategorySelectButton>
        ))}
      </Box>
      {selectedCategory === activityCategory[0] ? (
        <UserActivityPagination reviewList={reviewList} />
      ) : (
        <ProfileCommentPagination commentList={commentList} />
      )}
    </Box>
  );
}
