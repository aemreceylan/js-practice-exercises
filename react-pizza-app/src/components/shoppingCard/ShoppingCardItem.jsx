import { useContext } from "react";
import "./shoppingCardItem.css";
import { AppContext } from "../../contexts/AppContext";

export default function ShoppingCardItem({ data }) {
  const { setShoppingList } = useContext(AppContext);
  return (
    <>
      <div className="shoppingCardItem-container">
        <div className="shoppingCardItem-container-title">
          <div className="shoppingCardItem-container-title-titles">
            <span>
              {data.shoppingCard_data.name.toLocaleUpperCase()} (
              {data.shoppingCard_data.sizeAndPrice[0].toLocaleUpperCase()})
            </span>
            <span>{data.shoppingCard_data.sizeAndPrice[1]} ₺</span>
          </div>
          <div className="shoppingCardItem-container-title-buttons">
            <div
              onClick={() => setShoppingList({ type: "REMOVE", payload: data })}
              className="shoppingCardItem-container-title-buttons-dec"
            >
              {data.fetch_data.count == 1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              ) : (
                "-"
              )}
            </div>
            <div className="shoppingCardItem-container-title-buttons-amount">
              {data.fetch_data.count}
            </div>
            <div
              onClick={() => setShoppingList({ type: "ADD", payload: data })}
              className="shoppingCardItem-container-title-buttons-inc"
            >
              +
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
