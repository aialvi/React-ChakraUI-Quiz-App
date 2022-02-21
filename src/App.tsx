import AllRoutes from "./AllRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="Container">
          <AllRoutes />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
