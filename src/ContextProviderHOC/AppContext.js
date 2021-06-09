import { createContext, useEffect } from "react";

import useBetterState from "../CustomHooks";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [state, setState] = useBetterState({
    productList: [],
    activeProduct: null,
    activeProductDetails: null,
    activeProductPhoto: null,
  });

  // this is just a convenience so that we can call a function
  function getJSON(res) {
    return res.json();
  }

  // get a product list on load
  useEffect(() => {
    async function fetchProductList() {
      const res = await fetch(`http://18.224.200.47/products/list`);
      const data = await getJSON(res);
      setState({ productList: data });
    }
    fetchProductList();
  }, []);

  // get a product photo when active product changes
  useEffect(() => {
    const { activeProduct } = state;
    async function fetchActiveProductInfo() {
      const styleData = await fetch(
        `http://18.224.200.47/products/${activeProduct.id}/styles`
      );
      const styleJson = await getJSON(styleData);
      const photoUrl = await styleJson.results[0].photos[0].thumbnail_url;

      const detailData = await fetch(
        `http://18.224.200.47/products/${activeProduct.id}`
      );
      const detailJson = await getJSON(detailData);

      setState({
        activeProductPhoto: photoUrl,
        activeProductDetails: detailJson,
      });
    }

    if (activeProduct) {
      setState(
        // reset the details, since the active product changed
        {
          activeProductPhoto: null,
          activeProductDetails: null,
        },
        fetchActiveProductInfo // use the callback functionality of our cool custom setState
      );
    }
  }, [state.activeProduct]);

  const valueObj = {
    state,
    setState,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
}

export default AppProvider;
