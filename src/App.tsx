import "./App.css";
import CardProvider from "./components/CardProvider/CardProvider";
import Table from "./components/Table/Table";

function App() {
  return (
    <CardProvider>
      <h1>Helt Texas</h1>
      <Table />
    </CardProvider>
  );
}

export default App;
