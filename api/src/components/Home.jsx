// import React from "react";
import '../App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react';


function RenderBooks(props) {
  const { data } = props;

  const listBooks = data.map((e, index) => {
    return (
      <div key={index} className="book-card">
        <div className="card-img" style={{ backgroundImage: `url(${e.imageLinks ? e.imageLinks.thumbnail : ''})`}}></div>
        <div className="card-content">
          <h2 className="card-title">{e.title ? e.title : 'No Title Available'}</h2>
          <h4 className="card-author">
            {e.authors ? e.authors.join(", ") : 'No Author Available'}
          </h4>
          <p className="description">{e.description ? e.description : 'No Description Available'}</p>
        </div>
        <a href={e.previewLink}><button className="card-btn">See More</button></a>
      </div>
    );
  });

  return <div className="container">{listBooks}</div>;
}

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: "whatever-you-want" },
    };
    const url = "https://reactnd-books-api.udacity.com/books";
    axios
      .get(url, config)
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <div className="container">
        <RenderBooks data={books} />
      </div>
    </main>
  );
}
