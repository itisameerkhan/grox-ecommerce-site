import { useState } from "react";
import "./CardContainer.scss";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner.jsx";
import { db } from "../../../config/firebase.js";
import Banner from "../Banner/Banner.jsx";
import Card from "../Card/Card.jsx";

const CardContainer = () => {
  const [items, setItems] = useState([]);

  const getData = async () => {
    try {
      const collectionRef = collection(db, "items");
      const response = await getDocs(collectionRef);
      const filteredData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(filteredData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (items.length === 0) return <Spinner />;
  return (
    <div className="card-container">
      <Banner />
      <div className="card-container-main">
        {items.map((data) => (
          <Card props={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
