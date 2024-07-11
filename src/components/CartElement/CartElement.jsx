import "./CartElement.scss";
import { Button } from "@mui/material";

const CartElement = (props) => {
  const { itemName, photoURL, price } = props.props;

  return (
    <div className="cart-element">
      <img src={photoURL} alt="img" />
      <p className="item-seg">{itemName}</p>
      <p className="item-seg">₹ {price}</p>
      <Button variant="contained" color="error">
        REMOVE
      </Button>
    </div>
  );
};

export default CartElement;
