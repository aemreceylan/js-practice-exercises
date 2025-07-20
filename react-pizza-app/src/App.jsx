import Header from "./components/Header/Header.jsx";
import PizzaList from "./components/PizzaList/PizzaList.jsx";
import ShoppingCard from "./components/shoppingCard/ShoppingCard.jsx";
import "./App.css";
import { AppContext } from "./contexts/AppContext.jsx";
import { useContext } from "react";
import AddToCard from "./components/PizzaList/addToCard.jsx";

export default function App() {
  const { showShoppingCard, selectedPizza } = useContext(AppContext);
  return (
    <>
      <Header />
      <div id="body-content">
        <main>
          <PizzaList />
        </main>
        <aside>{showShoppingCard && <ShoppingCard />}</aside>
      </div>
      {selectedPizza && <AddToCard />}
    </>
  );
}
