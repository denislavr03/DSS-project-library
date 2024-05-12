import "./App.css";
import {Navbar} from "./components/navbar.jsx";
import {BooksList} from "./components/booksList.jsx";
import {EditAddBookInfo} from "./components/editAddBookInfo.jsx";
import { useMemo, useState } from "react";
import {Footer} from "./components/footer.jsx";

function App() {
	const [books, setBooks] = useState([
		{
			id: 1,
			title: "Fahrenheit 451",
			author: "Ray Bradbury",
			isbn: "9783060311354",
			price: 9.99,
			publicationDate: new Date("1953-10-19"),
		},
		{
			id: 2,
			title: "The Silence of the lambs",
			author: "Thomas Harris",
			isbn: "9780312195267",
			price: 5.99,
			publicationDate: new Date("1988-8-29"),
		},
	]);

	const [selectedBookId, setSelectedBookId] = useState(null);
	const selectedBook = useMemo(
		() => books.find((x) => x.id === selectedBookId),
		[books, selectedBookId],
	);

	return (
		<main>
			<Navbar />

			<BooksList
				books={books}
				onDelete={(id) => {
					setSelectedBookId((state) => {
						if (state === id) {
							return null;
						}
						if (state > id) {
							return state - 1;
						}
						return state;
					});

					setBooks((state) =>
						state
							.filter((x) => x.id !== id)
							.map((b) => ({ ...b, id: b.id > id ? b.id - 1 : b.id })),
					);
				}}
				onSelect={(book) => {
					console.log("on select", book.id);
					setSelectedBookId(book.id);
				}}
			/>

			<EditAddBookInfo
				selectedBook={selectedBook}
				onBookCreated={(book) => {
					if (selectedBook) {
						setBooks((state) =>
							state.map((x) =>
								x.id === selectedBook.id ? { ...x, ...book } : x,
							),
						);
						setSelectedBookId(null);
						return;
					}

					setBooks((state) => [...state, { id: state.length + 1, ...book }]);
				}}
			/>

			<Footer />
		</main>
	);
}

export default App;
