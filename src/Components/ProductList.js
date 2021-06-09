import { useContext } from "react";
import { AppContext } from "../ContextProviderHOC/AppContext";

import ProductCard from "./ProductCard";

export default function ProductList() {
  const { state, setState } = useContext(AppContext);
  const { productList } = state;
  return (
    <div className="product-list">
      {productList.map((product) => (
        <ProductCard product={product} key={product.id + product.name} />
      ))}
    </div>
  );
}
