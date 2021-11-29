import Task from "./Tasks/Tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./HomePage/HomePage";
import GlobalStyle from "./styles/GlobalStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <QueryClientProvider client={queryClient}>
                <Home />
              </QueryClientProvider>
            }
          ></Route>
          <Route
            path="/todos"
            element={
              <QueryClientProvider client={queryClient}>
                <Task />
              </QueryClientProvider>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
