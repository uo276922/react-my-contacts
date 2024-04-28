import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Searcher from "./components/Searcher";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then((data) => setContacts(data.results));
  }, []);

  const [searchField, setSearchField] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };
  const onGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };
  const searchedContacts = contacts.filter((contact) => {
    return (
      (contact.name["first"] + " " + contact.name["last"])
        .toLowerCase()
        .includes(searchField.toLowerCase()) &&
      (genderFilter === "" || contact.gender === genderFilter)
    );
  });

  const onAZ = () => {
    let az = contacts.sort((a, b) => {
      return (a.name["first"] + " " + a.name["last"]).localeCompare(
        b.name["first"] + " " + b.name["last"]
      );
    });
    setContacts([...az]); //clone the list
  };
  const onZA = () => {
    let za = contacts.sort((a, b) => {
      return (b.name["first"] + " " + b.name["last"]).localeCompare(
        a.name["first"] + " " + a.name["last"]
      );
    });
    setContacts([...za]); //clone the list
  };
  const exportContacts = () => {
    const jsonContacts = JSON.stringify(contacts);
    const blob = new Blob([jsonContacts], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="tc ">
      <header>
        <h1 className="f1">My contacts</h1>
      </header>
      {contacts.length === 0 ? (
        <h2 className="f2">Loading...</h2>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Searcher
            searchChange={onSearchChange}
            az={onAZ}
            za={onZA}
            onGenderChange={onGenderChange}
          />
          <button
            onClick={exportContacts}
            className="pa3 bg-light-blue white br3 mb3"
          >
            Export Contacts as JSON
          </button>
          <Scroll>
            <CardList contacts={searchedContacts} />
          </Scroll>
        </ErrorBoundary>
      )}
      <footer>
        <hr />
        <p>
          Desarrollo de Software para Dispositivos Moviles.
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
export default App;
