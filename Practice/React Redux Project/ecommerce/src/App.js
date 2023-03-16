import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
