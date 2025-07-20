import { useEffect, useState } from "react";

export default function useFetch(url,config) {
  const [pizzas, setPizzas] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(url,config);
      const data = await response.json();
      setPizzas(data);
    })();
  }, []);
  return pizzas;
}
