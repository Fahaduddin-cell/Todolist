import React, { useEffect, useState } from "react";

const Todo = () => {
  const [list, setlist] = useState("");

  const [info, setInfo] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const [endex, setEndex] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (list) {
      setIsDisabled(false);
    }
  }, [list]);

  const changeHandler = (e) => {
    setlist(e.target.value);
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    setInfo([...info, list]);
    setlist("");
    setIsDisabled(true);
  };

  const removeHandler = (id) => {
    setInfo(info.filter((item, index) => index !== id));
  };

  const editHandeler = (index) => {
    setIsUpdate(true);
    setEndex(index);
    setlist(info[index]);
  };

  const UpdateHandeler = (e) => {
    e.preventDefault();
    if (isUpdate) {
      let newArr = [...info];
      newArr.splice(endex, 1, list);
      setInfo(newArr);
      setlist("");
      setIsUpdate(false);
      setIsDisabled(true);
    }
  };

  //   <div className="col-md-2">
  //   <i className="fa-solid fa-trash"></i>
  // </div>
  // <div className="col-md-2">
  //   <i className="fa-solid fa-pen-to-square"></i>
  // </div>

  return (
    <>
      <div className="container ">
        <form className="form mb-4">
          <div className="row mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-4 mt-2">
              <input
                className="form-control"
                value={list}
                type="text"
                placeholder="type here"
                onChange={changeHandler}
              />
            </div>
            <div className="col-md-2 mt-2">
              {isUpdate ? (
                <button className="btn btn-warning " onClick={UpdateHandeler}>
                  Update Data
                </button>
              ) : (
                <button
                  className="btn btn-info form-control"
                  onClick={submitHandeler}
                  disabled={isDisabled}
                >
                  Add Data
                </button>
              )}
            </div>
            <div className="col-md-3"></div>
          </div>
        </form>
      </div>

      <div className="container mb-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card shadow-lg bgcolor">
              {info.length === 0 ? (
                <h1 className="p-4 text-center">No data available</h1>
              ) : (
                info.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="row mt-1 ml-2">
                        <div className="col-6">
                          <p className="text-white">
                            <span className="text-danger">{index + 1} </span>
                            {item}
                          </p>
                        </div>
                        <div className="col-3">
                          <i
                            onClick={() => removeHandler(index)}
                            className="fa-solid fa-trash text-danger cursor-pointer"
                          ></i>
                        </div>
                        <div className="col-3">
                          <i
                            onClick={() => editHandeler(index)}
                            className="fa-solid fa-pen-to-square text-warning"
                          ></i>
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};

export default Todo;
