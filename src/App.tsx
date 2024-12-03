import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import Button from "./components/Button";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPreviousPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);

  useEffect(() => {
    // setting this to true to know if the axios is still running, so it will display loading to the users
    setLoading(true);

    // honestly dunno what this does
    let cancel: axios.Canceler;

    // using axios to get data from the api
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p: { name: any }) => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setPage((page) => page + 1);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setPage((page) => page - 1);
  }

  if (loading) return "Loading...";

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          {" "}
          Hello <span>World!</span>
        </Alert>
      )}
      <Button onClick={() => setAlertVisibility(true)}>
        {" "}
        {alertVisible ? "Alert Visible!" : "Show Alert"}{" "}
      </Button>
      <PokemonList pokemon={pokemon} heading="Pokemons" />
      <span>Page {page}</span>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
}

export default App;
