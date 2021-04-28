import React, { useState, useContext, useCallback, useEffect } from "react";
import { authContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hook";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

export default function LinkDetails() {
  const token = useContext(authContext);
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();
  const linkId = useParams().id;
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch {}
  }, [token, request, linkId]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>;
}
