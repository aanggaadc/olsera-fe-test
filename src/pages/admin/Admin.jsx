import React, { useState, useEffect } from "react";
import NavbarMain from "../../components/NavbarMain";
import Card from '../../components/Card'
import ModalDelete from '../../components/ModalDelete'
import { IconButton } from "@mui/material";
import Axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";

export default function Admin({ getComment }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("authData"));
  const [posts, setPosts] = useState([]);
  const adminPosts = posts.filter((item) => item.userId === userData.id);
  const [pages, setPages] = useState(1);
  const { setPostData } = bindActionCreators(actionCreators, dispatch);

  // MODAL DELETE
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getPosts = async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await Axios.get(`posts?_page=${page}&_limit=10)`).then((response) => {
      setPosts([...posts, ...response.data]);
    });
  };

  useEffect(() => {
    getPosts(pages);
    setPages((pages) => pages + 1);
  }, []);

  return (
    <>
      <NavbarMain title="Admin" />
      <div className="home-container">
        {adminPosts.map((item, index) => (
          <Card key={index}>
            <div className="content">
              <Link style={{ textDecoration: "none" }}
                to={`/posts/${item.id}`}
                state={{ background: location }}>
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setPostData(item)
                    getComment(item.id)
                  }}
                >
                  {item.title}
                </h4>
              </Link>
              <p>{item.body}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/admin/posts/${item.id}/edit`}
                state={{ background: location }}
              >
                <IconButton
                  onClick={() => {
                    setPostData(item)
                  }}
                >
                  <EditIcon sx={{ fontSize: 35, color: "blue" }} />
                </IconButton>
              </Link>
              <IconButton
                onClick={handleOpenDeleteModal}
              >
                <DeleteIcon sx={{ fontSize: 35, color: "red" }} />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>

      <Link to="/admin/create" state={{ background: location }}>
        <IconButton
          sx={{ zIndex: 1, position: "fixed", bottom: 0, right: "10px" }}
        >
          <AddCircleIcon color="primary" sx={{ fontSize: 50 }} />
        </IconButton>
      </Link>

      <ModalDelete openDeleteModal={openDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} />
    </>
  );
}
