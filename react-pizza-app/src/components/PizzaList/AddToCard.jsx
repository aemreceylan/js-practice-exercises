import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./addToCard.css";
import Modal from "../UI/Modal";

export default function AddToCard() {
  const { selectedPizza, setSelectedPizza, setShoppingList } =
    useContext(AppContext);
  const textarea = useRef();
  useEffect(() => {
    setSelectedPizza({ ...selectedPizza, removedIngredients: [] });
  }, []);
  return (
    <>
      <Modal
        closeFn={() => {
          setSelectedPizza();
        }}
        style={{ width: "30vw", height: "90vh" }}
      >
        <div id="addToCard-container">
          <div id="addToCard-container-img">
            <img draggable="false" src={selectedPizza.img_path} alt="" />
          </div>
          <div id="addToCard-container-contents">
            <div id="addToCard-container-contents-title">
              <span>{selectedPizza.name.toLocaleUpperCase()}</span>
            </div>
            <div id="addToCard-container-contents-sizes">
              {selectedPizza.sizes_and_prices.map((element, index) => (
                <div
                  key={index}
                  className={`addToCard-container-contents-sizes_element ${
                    selectedPizza.selectedSizeAndPriceIndex == index &&
                    "selected-size-element"
                  }`}
                  onClick={() => {
                    setSelectedPizza({
                      ...selectedPizza,
                      selectedSizeAndPriceIndex: index,
                    });
                  }}
                >
                  <div className="addToCard-container-contents-sizes_element-size">
                    {element[0].toLocaleUpperCase()}
                  </div>
                  <div className="addToCard-container-contents-sizes_element-price">
                    {element[1]} ₺
                  </div>
                </div>
              ))}
            </div>
            <div id="addToCard-container-contents-dough">
              {selectedPizza.dough.map((element, index) => (
                <div
                  key={index}
                  className={`${
                    selectedPizza.selectedDoughIndex == index &&
                    "selected-size-element"
                  }`}
                  onClick={() => {
                    setSelectedPizza({
                      ...selectedPizza,
                      selectedDoughIndex: index,
                    });
                  }}
                >
                  {element.toLocaleUpperCase()}
                </div>
              ))}
            </div>
            <div id="addToCard-container-contents-ingredients">
              {selectedPizza.ingredients.map((element, index) => (
                <span
                  className={`${
                    selectedPizza.removedIngredients?.includes(index) &&
                    "removed-ingredient"
                  }`}
                  key={index}
                  onClick={() => {
                    if (element[1])
                      setSelectedPizza({
                        ...selectedPizza,
                        removedIngredients:
                          selectedPizza.removedIngredients.includes(index)
                            ? selectedPizza.removedIngredients.filter(
                                (element) => element !== index
                              )
                            : [...selectedPizza.removedIngredients, index],
                      });
                  }}
                >
                  {element[0].toLocaleUpperCase()}
                </span>
              ))}
            </div>
            <div id="addToCard-container-contents-note">
              <textarea
                ref={textarea}
                placeholder="Ürün notu girebilirsiniz..."
              ></textarea>
            </div>
            <div
              onClick={() => {
                setSelectedPizza();
                setShoppingList({
                  type: "ADD",
                  payload: {
                    fetch_data: {
                      id: selectedPizza.id,
                      dough: selectedPizza.selectedDoughIndex,
                      size: selectedPizza.selectedSizeAndPriceIndex,
                      removes: selectedPizza.removedIngredients,
                      note: textarea.current.value,
                    },
                    shoppingCard_data: {
                      name: selectedPizza.name,
                      sizeAndPrice:
                        selectedPizza.sizes_and_prices[
                          selectedPizza.selectedSizeAndPriceIndex
                        ],
                    },
                  },
                });
              }}
              id="addToCard-container-contents-button"
            >
              <div id="addToCard-container-contents-button-buy">
                Sepete Ekle
              </div>
              <div id="addToCard-container-contents-button-price">
                {selectedPizza.selectedSizeAndPriceIndex
                  ? selectedPizza.sizes_and_prices[
                      selectedPizza.selectedSizeAndPriceIndex
                    ][1]
                  : "-"}
                ₺
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
