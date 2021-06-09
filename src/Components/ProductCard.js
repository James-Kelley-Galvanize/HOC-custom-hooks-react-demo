import { useContext } from "react";
import { AppContext } from "../ContextProviderHOC/AppContext";

// Mini Functional Components

function ActiveProductCard({ product, details, photoUrl }) {
  return (
    <div className="inactive-product-card">
      <img src={photoUrl} />
      <h5>${details?.default_price}</h5>
      {details?.features.map(({ feature, value }) => (
        <div>
          {feature} : {value}
        </div>
      ))}
    </div>
  );
}

function InactiveProductCard({ product }) {
  return <div className="active-product-card" id="active-product-card"></div>;
}

export default function ProductCard({ product }) {
  const { state, setState } = useContext(AppContext);
  const { activeProductDetails, activeProductPhoto } = state;

  const isActiveProduct = state.activeProduct?.id === product.id;

  const stateIfClicked = isActiveProduct // if the active product is clicked, we  would want to DE-activate the product, and vice versa
    ? {
        activeProduct: null,
        activeProductPhoto: null,
        activeProductDetails: null,
      }
    : {
        activeProduct: product,
      };

  return (
    <div
      className="product-card"
      onClick={() => {
        setState(stateIfClicked);
      }}
    >
      <h3>{product.name}</h3>
      <h4>{product.slogan}</h4>
      {isActiveProduct ? (
        <ActiveProductCard
          product={product}
          photoUrl={activeProductPhoto}
          details={activeProductDetails}
        />
      ) : (
        <InactiveProductCard product={product} />
      )}
    </div>
  );
}
