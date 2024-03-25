'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const ShowProducts = () => {

  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/prod/showprod')
      setProducts(response.data.products)
    }
    fetchProducts();
  }, [])
 
  return (
    <div className="bg-white text-red-900">
      <h1> Products </h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2 className="text-3xl">{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Prize: {product.price}</p>
            <p>Quantiy: {product.quantity}</p>
            <Image
              src={`http://localhost:3000/${product.image}`}
              alt="Description of Image"
              width={500}
              height={300}
            />
          </div>
        ))}

      </div>
    </div>
  );
}