import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Algo = (props) => (
  <tr>
    <td>{props.algo.username}</td>
    <td>{props.algo.title}</td>
    <td>{props.algo.description}</td>
    <td>{props.algo.duration}</td>
    <td>{props.algo.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.algo._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteAlgo(props.algo._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const AlgosList = () => {
  const [algos, setAlgos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/algos/")
      .then((response) => {
        setAlgos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteAlgo = (id) => {
    axios.delete("http://localhost:5000/algos/" + id).then((response) => {
      console.log(response.data);
    });

    setAlgos(algos.filter((el) => el._id !== id));
  };

  const algoList = () => {
    return algos.map((currentalgo) => {
      return (
        <Algo
          algo={currentalgo}
          deleteAlgo={deleteAlgo}
          key={currentalgo._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Algorithms</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{algoList()}</tbody>
      </table>
    </div>
  );
};

export default AlgosList;
