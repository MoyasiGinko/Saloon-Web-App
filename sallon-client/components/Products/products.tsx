import React from "react";

const products = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    image: "https://example.com/product1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    image: "https://example.com/product2.jpg",
  },
  {
    id: 3,
    title: "Product 3",
    price: 30,
    image: "https://example.com/product3.jpg",
  },
  {
    id: 4,
    title: "Product 4",
    price: 40,
    image: "https://example.com/product4.jpg",
  },
  {
    id: 5,
    title: "Product 5",
    price: 50,
    image: "https://example.com/product5.jpg",
  },
];

const Products: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
