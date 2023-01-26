import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Action = ({ action, deleteAction }) => (
  <tr>
    <td>{action.username}</td>
    <td>{action.client}</td>
    <td>{action.title}</td>
    <td>{action.status}</td>
    <td>{action.startdate.substring(0, 10)}</td>
    <td>{action.enddate.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + action._id}>Edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          deleteAction(action._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

const ActionsList = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios
      .get("https://progress-tracker-api.onrender.com/actions/")
      .then((response) => {
        setActions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteAction = (id) => {
    axios
      .delete("https://progress-tracker-api.onrender.com/actions/" + id)
      .then((response) => {
        console.log(response.data);
      });

    setActions(actions.filter((action) => action._id !== id));
  };

  const actionsList = () => {
    return actions.map((currentaction) => {
      return (
        <Action
          action={currentaction}
          deleteAction={deleteAction}
          key={currentaction._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Actions List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Owner</th>
            <th>Client</th>
            <th>Action</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{actionsList()}</tbody>
      </table>
    </div>
  );
};

export default ActionsList;
