import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, Badge } from "antd";
import { Spin } from "antd";

const UploadImage = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;

    if (files) {
      setLoading(true);
      // console.log(files)
      let allImageUpload = values.images;
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri)
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allImageUpload.push(res.data);
                setValues({ ...values, images: allImageUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    // console.log(public_id);
    setLoading(true)
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        let filterImg = images.filter((item)=>{
            return item.public_id !== public_id;
        });
        setValues({...values, images:filterImg});
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <>
      <div className="px-4 py-2 pt-5 m-5 overflow-hidden md:px-10 bg-slate-100 rounded-2xl">
        <label className="cursor-pointer">
          <span className="px-4 py-1 text-xs text-white bg-green-400 rounded-full focus:outline-none hover:bg-green-500 hover:shadow-lg">
            เลือกไฟล์รูป...
          </span>
          <input
            required="required"
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            multiple
            hidden
            accept="images/*"
            name="file"
          />
        </label>

        {loading ? (
          <h1>
            Loading...
            <Spin />
          </h1>
        ) : (
          <p className="m-2"></p>
        )}

        {values.images &&
          values.images.map((p) => (
            <span className="avatar-item">
              <Badge
                onClick={() => handleRemove(p.public_id)}
                style={{ cursor: "pointer" }}
                count="x"
              >
                <Avatar className="m-3" src={p.url} shape="square" size={80} />
              </Badge>
            </span>
          ))}
      </div>
    </>
  );
};

export default UploadImage;
