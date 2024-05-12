import { useEffect, useRef } from "react";

export const EditAddBookInfo = ({ onBookCreated, selectedBook }) => {
  const formRef = useRef();

  useEffect(() => {
    if (selectedBook) {
      formRef.current?.reset();
      const fields = formRef.current?.elements;
      fields.title.value = selectedBook.title;
      fields.author.value = selectedBook.author;
      fields.isbn.value = selectedBook.isbn;
      fields.price.value = selectedBook.price;
      fields.publicationDate.value = selectedBook.publicationDate
        .toISOString()
        .split("T")[0];
    } else {
      formRef.current?.reset();
    }
  }, [selectedBook]);

  return (
    <form
      className="content-details"
      style={{ display: "flex", flexDirection: "column", gap: 5 }}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        onBookCreated?.({
          ...data,
          publicationDate: new Date(data.publicationDate),
        });
        formRef.current?.reset();
      }}
    >
      <div className="cDetailsTitle">
        <h2><strong>Content details</strong></h2>
      </div>
      <label>Title</label>
      <input id="field1" name="title" required />

      <label>Author</label>
      <input id="field2" name="author" required />

      <label>Isbn</label>
      <input id="field3" name="isbn" required />

      <label>Price</label>
      <input id="field4" name="price" type="decimal" required />

      <label>Publication Date</label>
      <input id="field5" name="publicationDate" type="date" required />

      <div>
        <button
          id="saveButton"
          class="button is-success"
          type="submit">
          Save
        </button>
        <button
          id="clearButton"
          class="button is-warning"
          type="reset"
          onClick={() => formRef.current?.reset()}
        >
          Clear
        </button>
      </div>
    </form>
  );
};