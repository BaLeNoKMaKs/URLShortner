import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { authContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

export default function CreateLink() {
  const history = useHistory();
  const auth = useContext(authContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setLink(e.target.value);
  };

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/details/${data.link._id}`);
      } catch {}
    }
  };

  return (
    <div className="row">
      <div className="col m8 offset-m2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            value={link}
            id="link"
            type="text"
            className="validate"
            name="link"
            onChange={changeHandler}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
}
