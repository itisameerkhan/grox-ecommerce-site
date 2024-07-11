import { useEffect, useState } from "react";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import CartElement from "../../components/CartElement/CartElement";
import Spinner from "../../components/Spinner/Spinner";
import { TextField, Button } from "@mui/material";

const Cart = () => {
  const userInfo = useSelector((store) => store.user);
  const [cartItems, setCartItems] = useState([]);

  const getItemsData = async () => {
    try {
      const itemDocRef = doc(db, "addToCart", userInfo.uid);
      const response = await getDoc(itemDocRef);
      setCartItems(response.data());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItemsData();
  }, []);

  if (cartItems.length === 0) return <Spinner />;

  return (
    <div className="cart-main">
      <h1>CART</h1>
      <div className="cart">
        <div className="cart-left">
          {cartItems.cartItems.map((data) => (
            <CartElement props={data} key={data.id} />
          ))}
        </div>
        <div className="cart-right">
          <TextField id="outlined-basic" label="Address" variant="outlined" />
          <TextField id="outlined-basic" label="Coupon" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Order Summary"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Details" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Payment Method"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
          />
          <Button variant="contained">PLACE YOUR ORDER</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
