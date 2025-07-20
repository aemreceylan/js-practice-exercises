import { useContext } from "react";
import ShoppingCardItem from "./ShoppingCardItem.jsx";

import "./shoppingCard.css";
import { AppContext } from "../../contexts/AppContext.jsx";

export default function ShoppingCard() {
  const { shoppingList } = useContext(AppContext);

  return (
    <>
      <div id="shoppingCard-container">
        <div id="shoppingCard-container-list">
          {shoppingList.map((element, index) => (
            <ShoppingCardItem
              key={index}
              data={element}
            />
          ))}
        </div>
        <div id="shoppingCard-container-sum">
          <div id="shoppingCard-container-sum-button">Satın Al</div>
          <div id="shoppingCard-container-sum-price">
            <span>
              {shoppingList.reduce(
                (s, i) => s + i.shoppingCard_data.sizeAndPrice[1]*i.fetch_data.count,
                0
              )}{" "}
              ₺
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
