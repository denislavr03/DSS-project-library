import { useMemo } from "react";

export const BooksList = ({ books = [], onDelete, onSelect }) => {
  const sortedBooks = useMemo(() => books.sort((a, b) => a.id - b.id), [books]);

  return (
    <div className="content-list" >
      <div className="cListTitle">
        <h2><strong>Content list</strong></h2>
      </div>
      <center> <ul>
        {sortedBooks.map((book) => (
          <li key={book.id}>
            <div onClick={() => onSelect?.(book)}>
              <p className="id">ID: {book.id}</p>
              <p className="field1">Title: {book.title}</p>
              <p className="field2">Author: {book.author}</p>
              <p className="field3">ISBN: {book.isbn}</p>
              <p className="field4">Price: ${book.price}</p>
              <p className="field5">Release Date: {book.publicationDate.toDateString()}</p>
            </div>
            <div className="deleteButton">
              <button
                id="deleteButton"
                class="button is-danger"
                onClick={() => onDelete?.(book.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      </center>
    </div>
  );
};
