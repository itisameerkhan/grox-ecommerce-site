import "./Product.scss";
import { useParams } from "react-router-dom";
import { db, auth } from "../../../config/firebase.js";
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner.jsx";
import { Button } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import { onAuthStateChanged } from "firebase/auth";

const Product = () => {
  const getParams = useParams();
  const [item, setItem] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const getData = async () => {
    try {
      const docReference = doc(db, "items", getParams.id);
      const response = await getDoc(docReference);
      setItem(response.data());
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = async () => {
    if (isClicked) return;
    try {
      const docReference = doc(db, "addToCart", userInfo.uid);
      console.log(docReference);
      const docSnap = await getDoc(docReference);
      if (docSnap.exists()) {
        updateDoc(docReference, {
          cartItems: arrayUnion(getParams.id),
        });
      } else {
        await setDoc(docReference, {
          cartItems: arrayUnion(getParams.id),
        });
      }
      setIsClicked(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!item) return <Spinner />;

  return (
    <>
      <div className="product-main">
        <h1>PRODUCT PAGE</h1>
        <div className="product-desc">
          <div className="product-desc-1">
            <img src={item.photoURL} alt="" />
          </div>
          <div className="product-desc-2">
            <p>{item.itemName}</p>
            <p>{item.description}</p>
            <p>₹ {item.price}</p>

            <div className="btn-container">
              <Button
                variant="contained"
                onClick={handleAddToCart}
                color={isClicked ? "success" : "primary"}
                disabled={isClicked}
              >
                <span className="material-symbols-outlined span-icon">
                  shopping_bag
                </span>
                {isClicked ? "ADDED" : " ADD TO CART"}
              </Button>
              <Button variant="contained">
                <span class="material-symbols-outlined span-icon">
                  credit_card
                </span>
                BUY NOW
              </Button>
            </div>
            <div className="product-desc-3">
              <li>
                Built to Last: Crafted with high-quality materials and expert
                engineering for long-lasting durability and performance.
                Performance You Can Trust: Delivers exceptional results,
                ensuring you get the most out of the product.
              </li>
              <li>
                Peace of Mind Warranty: Backed by a reliable warranty for
                worry-free use, with a clear explanation of coverage (you can
                adjust this based on the specific warranty).
              </li>
              <li>
                User-Friendly Design: Easy to set up, use, and maintain, making
                it accessible for everyone.
              </li>
              <li>
                Customer Satisfaction Guaranteed: We stand behind our product
                and offer exceptional customer support to ensure your
                satisfaction (you can swap this for a unique selling point, like
                "Innovative Technology" or "Eco-Friendly Choice").
              </li>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
