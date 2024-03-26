'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditProduct } from "./editProduct";
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: File;
}

export const ShowProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProd, setEditingProd] = useState<Product | null>(null);

  const fetch = async () => {
    const response = await axios.get('http://localhost:3000/api/prod/showprod')
    setProducts(response.data.products)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      fetch();
    }
    fetchProducts();
  }, [])

  const handleEdit = (prod: Product) => {
    setEditingProd(prod)
  }

  const handleSave = () => {
    fetch();
    setEditingProd(null);
  }
  const handleCancel = () => {
    setEditingProd(null);
  }
  const handleDelete = async (id: string) => {
    console.log('I am in handleDelete');
    try {
      await axios.delete(`http://localhost:3000/api/prod/del/${id}`)
      fetch();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  }
  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h1 className="text-center"> Products </h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            {editingProd && editingProd._id === product._id ? (
              <EditProduct
                key={product._id}
                product={editingProd}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <h2 className="text-3xl">{product.name}</h2>
                <p>Description: {product.description}</p>
                <p>Prize: {product.price}</p>
                <p>Quantiy: {product.quantity}</p>
                <Image
                  src={`http://localhost:3000/${product.image}`}
                  alt="Description of Image"
                  width={400}
                  height={200}
                />
                <div className="text-white flex gap-2">
                  <button className="bg-blue-500 px-4 py-1" onClick={() => { handleEdit(product) }}> Edit</button>
                  <button className="bg-red-400 px-4 py-1" onClick={() => { handleDelete(product._id) }}> Delete </button>
                </div>
              </>
            )
            }
          </div>
        ))}
      </div>
    </div>
  );
}