import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPost } from "../../store/Post/Action";
import PostCard from "./PostCard";
import { uploadToCloud } from "../../utils/uploadToCloud";
import Picker from "@emoji-mart/react";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});

const HomeSection = ({ onPostUpdated }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((store) => store.post);

  const [uploadImage, setUploadImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formik = useFormik({
    initialValues: { content: "", image: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        await dispatch(createPost(values));
        actions.resetForm();
        setSelectImage("");
        setShowEmojiPicker(false);
        onPostUpdated?.();
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const handleSelectImage = async (event) => {
    setUploadImage(true);
    const file = event.target.files?.[0];
    if (!file) {
      setUploadImage(false);
      return;
    }

    try {
      setSelectImage(URL.createObjectURL(file));
      const uploadedUrl = await uploadToCloud(file);
      if (uploadedUrl) {
        formik.setFieldValue("image", uploadedUrl);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }

    setUploadImage(false);
  };

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue("content", formik.values.content + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90 !text-left">Home</h1>
      </section>

      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening?"
                  className="border-none outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>

              {selectImage && (
                <div className="mt-3">
                  <img
                    src={selectImage}
                    alt="preview"
                    className="w-48 rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center relative">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                      disabled={uploadImage}
                    />
                  </label>

                  <FmdGoodIcon className="text-[#1d9bf0]" />

                  <div className="relative">
                    <TagFacesIcon
                      className="text-[#1d9bf0] cursor-pointer"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                    {showEmojiPicker && (
                      <div
                        className="absolute z-10 bg-white shadow-lg rounded"
                        style={{ top: "30px", left: 0 }}
                      >
                        <Picker onEmojiSelect={handleEmojiSelect} theme="light" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      bgcolor: "#1e88e5",
                    }}
                    variant="contained"
                    type="submit"
                    disabled={
                      formik.isSubmitting ||
                      loading ||
                      !formik.values.content.trim()
                    }
                  >
                    {formik.isSubmitting || loading ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section>
        {loading && <p>Loading posts…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {posts &&
          [...posts]
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <PostCard
                key={item.id}
                post={item}
                onPostUpdated={() => dispatch(getAllPost())}
              />
            ))}
      </section>
    </div>
  );
};

export default HomeSection;
