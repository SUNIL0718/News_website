import React, { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Link } from "react-router-dom";
import axios from "axios";

const FetchData = ({ cat }) => {
  const [data, setData] = useState("");

  const fetchData = async () => {
    await axios
      .get(
        cat
          ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=52a054c2727a45aeb42520b9921f21d5`
          : "https://newsapi.org/v2/top-headlines?country=in&apiKey=52a054c2727a45aeb42520b9921f21d5"
      )
      .then((res) => {
        // console.log(res.data.articles);
        setData(res.data.articles);
      });
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  return (
    <div className="container my-4 ">
      <h5>
        <u>TOP HEADLINES</u>
      </h5>
      <div
        className="container d-flex justify-content-center align-items-center flex-column my-3 "
        style={{ minHeight: "100vh" }}
      >
        {data
          ? data.map((items, index) => (
              <>
                <div
                  className="conatiner my-3 p-3 position-relative"
                  style={{
                    maxWidth: "600px",
                    boxShadow: "1px 1px 10px silver",
                    borderRadius: "10px",
                  }}
                >
                  <h5 className="my-2">{items.title}</h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={items.urlToImage}
                      alt="Photos not found"
                      className="img-fluid "
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <p className="my-1">{items.content}</p>
                  <div>
                    <Link to={items.url} target="blank">
                      View More
                    </Link>
                    <BookmarkAddIcon
                      className="position-absolute"
                      style={{
                        right: "20px",
                        bottom: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </>
            ))
          : "Loadaing..."}
      </div>
    </div>
  );
};

export default FetchData;
