import { useReducer, createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import shoppingCardReducer from "../reducers/shoppingCardReducer.js";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [showShoppingCard, setShowShoppingCard] = useState(true);
  const [selectedPizza, setSelectedPizza] = useState();
  const [filter, setFilter] = useState();
  const [pizzaList, setPizzaList] = useState();
  const [shoppingList, setShoppingList] = useReducer(shoppingCardReducer, []);
  const data = useFetch("/pizzas.json");

  useEffect(() => {
    if (!filter) setPizzaList(data);
    else
      setPizzaList(
        pizzaList.filter((element) =>
          element.name.includes(filter.toLocaleLowerCase())
        )
      );
  }, [data, filter]);

  const value = {
    showShoppingCard,
    setShowShoppingCard,
    pizzaList,
    selectedPizza,
    setSelectedPizza,
    setShoppingList,
    shoppingList,
    setFilter,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
