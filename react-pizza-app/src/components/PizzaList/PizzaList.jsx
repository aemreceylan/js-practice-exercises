import { useContext } from "react";
import PizzaCard from "./PizzaCard.jsx";
import "./pizzaList.css";
import { AppContext } from "../../contexts/AppContext.jsx";

export default function PizzaList() {
  const { pizzaList } = useContext(AppContext);
  return (
    <>
      <div id="pizzaList-container">
        {pizzaList?.map((element)=><PizzaCard key={element.id} data={element}/>)}
      </div>
    </>
  );
}
