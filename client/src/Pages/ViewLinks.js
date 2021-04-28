import React, { useEffect, useContext, useState, useCallback } from "react";
import LinksList from "../components/LinksList";
import Loader from "../components/Loader";
import { authContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hook";

export default function ViewLinks() {
  const [links, setLinks] = useState([]);
  const { token } = useContext(authContext);
  const { loading, request } = useHttp();

  const getLinks = useCallback(async () => {
    try {
      const data = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(data);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && links && <LinksList links={links} />}</div>;
}
