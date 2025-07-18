import {
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  GET_USER_POSTS_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  RE_POST_FAILURE,
  RE_POST_SUCCESS,
  REPLY_POST_FAILURE,
  REPLY_POST_SUCCESS,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_SUCCESS,
} from "./ActionType";
import { api } from "../../config/api.js"; 

export const getAllPost = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/posts/");
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
  }
};

export const getUsersPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    dispatch({ type: GET_USER_POSTS_FAILURE, payload: error.message });
  }
};

export const findPostsByLikeContaineUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching user liked posts:", error);
    dispatch({ type: USER_LIKE_POST_FAILURE, payload: error.message });
  }
};

export const findPostsByID = (postId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message });
  }
};

export const createPost = (PostData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/create`, PostData);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating post:", error);
    dispatch({ type: POST_CREATE_FAILURE, payload: error.message });
  }
};

export const createPostReply = (PostData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/reply`, PostData);
    dispatch({ type: REPLY_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating post reply:", error);
    dispatch({ type: REPLY_POST_FAILURE, payload: error.message });
  }
};


export const createRePost = (postid) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/posts/${postid}/repost`);
    dispatch({ type: RE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error reposting post:", error);
    dispatch({ type: RE_POST_FAILURE, payload: error.message });
  }
};



export const likePost = (postid) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${postid}/likes`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error liking post:", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
  }
};

export const getUserLikedPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching user liked posts:", error);
    dispatch({
      type: USER_LIKE_POST_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};




export const getUserReplies = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/replies`);
    dispatch({ type: REPLY_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching user replies:", error);
    dispatch({
      type: REPLY_POST_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};



export const deletePost = (postid) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/posts/${postid}`);

    // if server response includes Cloudinary public_id, delete it from Cloudinary
    if (data.public_id) {
      await api.post(`/api/cloudinary/delete`, { public_id: data.public_id });
      console.log("Cloudinary media deleted");
    }

    dispatch({ type: POST_DELETE_SUCCESS, payload: postid });
  } catch (error) {
    console.error("Error deleting post:", error);
    dispatch({ type: POST_DELETE_FAILURE, payload: error.message });
  }
};

export const editPost = (postid, updatedData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/posts/${postid}`, updatedData);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error editing post:", error);
    dispatch({ type: POST_CREATE_FAILURE, payload: error.message });
  }
};

