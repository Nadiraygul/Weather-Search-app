import React from "react";
import "./Search.scss";

export default function Search({ query, setQuery, onSearch }) {
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch && onSearch();
      }}
    >
      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Şehir adı yaz (ör. Baku, London)"
      />
      <button type="submit" className="search-button">
        Ara
      </button>
    </form>
  );
}
