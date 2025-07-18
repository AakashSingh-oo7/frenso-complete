import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../store/Post/Action";
import PostCard from "../homesection/PostCard";

const Explore = () => {
  const dispatch = useDispatch();

  const { post } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  // Optional: create a shuffled copy of posts
  const shuffledPosts = post.posts
    ? [...post.posts].sort(() => Math.random() - 0.5)
    : [];

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 py-3 border-b">
        <h1 className="text-xl font-bold">Explore</h1>
      </div>

      {/* Posts */}
      <div className="mt-4 space-y-6">
        {shuffledPosts.length > 0 ? (
          shuffledPosts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onPostUpdated={() => dispatch(getAllPost())}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
