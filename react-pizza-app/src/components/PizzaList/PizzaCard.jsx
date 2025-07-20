import { useContext } from "react";
import PropTypes from "prop-types";
import "./pizzaCard.css";
import { AppContext } from "../../contexts/AppContext";

PizzaCard.propTypes = {
  data: PropTypes.object,
};

export default function PizzaCard({ data }) {
  const { setSelectedPizza } = useContext(AppContext);
  return (
    <>
      <div className="pizzaCard-container">
        <div className="pizzaCard-container-img">
          <img draggable="false" src={data.img_path} alt="" />
        </div>
        <div className="pizzaCard-container-content">
          <div className="pizzaCard-container-info">
            <div className="pizzaCard-container-info-title">
              <span>{data.name.toUpperCase()}</span>
            </div>
            <div className="pizzaCard-container-info-ingredient">
              {data.ingredients.map((element, index) => (
                <span key={index}>{element[0].toLocaleUpperCase()}</span>
              ))}
            </div>
          </div>
          <div className="pizzaCard-container-buying">
            <div className="pizzaCard-container-buying-price">
              <span>
                {Math.min(
                  ...data.sizes_and_prices.map((element) => element[1])
                )}
                ₺
              </span>
            </div>
            <div
              className="pizzaCard-container-buying-buy"
              onClick={() => setSelectedPizza(data)}
            >
              Sepete Ekle
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
