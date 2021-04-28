import React from "react";

export default function LinkCard({ link }) {
  return (
    <div>
      <h2>Ссылка</h2>
      <p>
        Ваша ссылка:{" "}
        <a href={link.to} target="_blank" rel="noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Откуда:{" "}
        <a href={link.from} target="_blank" rel="noreferrer">
          {link.from}
        </a>
      </p>
      <p>Кликов по ссылке: {link.clicks}</p>
      <p>Дата создания: {new Date(link.date).toLocaleDateString()}</p>
    </div>
  );
}
