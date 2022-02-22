import AllRoutes from "./AllRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AllRoutes />
      </div>
    </ChakraProvider>
  );
}

export default App;
