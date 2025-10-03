import "./App.css";
import CardProvider from "./components/CardProvider/CardProvider";
import Table from "./components/Table/Table";

function App() {
  return (
    <CardProvider>
      <Table />
    </CardProvider>
  );
}

export default App;
