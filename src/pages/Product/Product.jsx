import "./Product.scss";
import { useParams } from "react-router-dom";

const Product = () => {
  const id = useParams();
  return (
    <div className="product-main">
      <h1>PRODUCT PAGE</h1>
      <h2>{id.id}</h2>
    </div>
  );
};

export default Product;
