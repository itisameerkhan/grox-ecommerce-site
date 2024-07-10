import { Link } from "react-router-dom";
import "./Card.scss";
import { Button } from "@mui/material";

const Card = (props) => {
  const { itemName, photoURL, description, price, id } = props.props;
  return (
    <Link to={`/product/${id}`}>
      <div className="card-main">
        <img src={photoURL} alt="" />
        <div className="card-main-content">
          <p>{itemName}</p>
          <p>{description}</p>
          <p>₹ {price}</p>
        </div>
        <Button variant="contained">ADD TO CART</Button>
      </div>
    </Link>
  );
};

export default Card;
