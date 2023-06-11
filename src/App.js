import { useCallback, useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import Gallery from "./components/Gallery";

const App = () => {

  document.body.style.backgroundImage = `url('stars.png')`

  const [searchWord, setSearchWord] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const getData = useCallback(async () => {
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${searchWord}&media_type=${mediaType}&page=${page}`
    );
    const data = await res.json();
    setPages(Math.trunc(data.collection.metadata.total_hits / 100)+1);
    setItems(data.collection.items);

    console.log('Page: ' + page);
  },
    [searchWord, mediaType, page, pages]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePagination = (i) => {
    console.log('i: ' + i);
    console.log('handle: ' + (page + i));
    if((page + i) >= 1 && (page + i) <= pages)
      setPage(page + i);
  }

  return (
    <div className="container justify-content-center">
      <SearchForm searchWordCallBack={setSearchWord} searchTypeCallBack={setMediaType} />
      <Gallery items={items} />
      <div className="d-flex justify-content-center fixed-bottom">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => handlePagination(-1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;Previous</span>
            </button>
          </li>
          <p></p>
          <li className="page-item">
            <button className="page-link" onClick={() => handlePagination(1)} aria-label="Next">
              <span aria-hidden="true">Next&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;

