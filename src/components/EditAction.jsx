import { React, useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const EditAction = () => {
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://progress-tracker-api.onrender.com/actions/" + id)
      .then((response) => {
        setUsername(response.data.username);
        setClient(response.data.client);
        setTitle(response.data.title);
        setStatus(response.data.status);
        setStartDate(new Date(response.data.startdate));
        setEndDate(new Date(response.data.enddate));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://progress-tracker-api.onrender.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeClient = (e) => {
    setClient(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };

  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const action = {
      username,
      client,
      title,
      status,
      startdate,
      enddate,
    };

    console.log(action);

    axios
      .post(
        "https://progress-tracker-api.onrender.com/actions/update/" + id,
        action
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Action</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Client: </label>
          <input
            type="text"
            required
            className="form-control"
            value={client}
            onChange={onChangeClient}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Status: </label>
          <select
            required
            className="form-control"
            value={status}
            onChange={onChangeStatus}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Complete</option>
            <option>Superseded</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Start Date: </label>
          <div>
            <DatePicker
              selected={startdate}
              onChange={onChangeStartDate}
              dateFormat="yyyy/MM/dd"
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <label>End Date: </label>
          <div>
            <DatePicker
              selected={enddate}
              onChange={onChangeEndDate}
              dateFormat="yyyy/MM/dd"
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Edit Action"
            className="btn btn-primary"
          />
        </div>
        <br />
      </form>
    </div>
  );
};

export default EditAction;
