import React, { useEffect, useState } from "react";
import Item from "./Item";
import product_11 from '../assets/product_11.png'
import product_1 from '../assets/product_1.png'

const staticProducts = [
  {
    id: "static-1",
    name: "Jacket",
    image: product_11,
    new_price: 499,
    old_price: 799,
  },
  {
    id: "static-2",
    name: "Demo Hoodie",
    image: product_1,
    new_price: 999,
    old_price: 1299,
  },
];

const NewArrivals = () => {
  const [new_collection, setNew_collection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => {
        setNew_collection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch new collections:", error);
        setLoading(false);
      });
  }, []);

  const productsToShow = new_collection.length ? new_collection : staticProducts;

  if (loading) {
    return (
      <section className="max-padd-container bg-primary p-12 xl:py-28 text-center">
        <p>Loading new arrivals...</p>
      </section>
    );
  }

  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="h3">New Arrivals</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quam
          odit ipsum, unde officia tempora vitae perferendis?
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-32">
        {productsToShow.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
