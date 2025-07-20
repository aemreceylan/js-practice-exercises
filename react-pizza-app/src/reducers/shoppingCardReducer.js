export default function shoppingCardReducer(state, action) {
  function findPizza(state) {
    return state?.find((i) =>
      Object.keys(i.fetch_data).every((j) => {
        if (j == "count") return true;
        if (Array.isArray(i.fetch_data[j])) {
          return (
            i.fetch_data[j].sort().toString() ==
            action.payload.fetch_data[j].sort().toString()
          );
        }
        return i.fetch_data[j] == action.payload.fetch_data[j];
      })
    );
  }

  switch (action.type) {
    case "ADD": {
      const element = findPizza(state);
      if (element) {
        element.fetch_data.count += 1;
        return [...state];
      } else {
        action.payload.fetch_data.count = 1;
        return [...state, action.payload];
      }
    }
    case "REMOVE": {
      const element = findPizza(state);
      if (element.fetch_data.count > 1) {
        element.fetch_data.count -=1;
        return [...state];
      }
      return state.filter(item=>item!=element);
    }
  }
}
