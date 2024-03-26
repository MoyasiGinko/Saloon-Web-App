
import { useState } from "react";
import axios from "axios";
import { Product } from "./products";

interface EditProductProps {
  product: Product;
  onSave: () => void;
  onCancel: () => void;
}

export const EditProduct = ({ product, onSave, onCancel }: EditProductProps) => {
  const [editedProd, setEditedProd] = useState({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    image: product.image
  })

  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('the eidted product is', editedProd)
    try {
      await axios.put(`http://localhost:3000/api/prod/edit/${editedProd._id}`, editedProd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSave();
    } catch (err) {
      console.log("Error updating product", err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedProd({ ...editedProd, [e.target.name]: e.target.value })
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || editedProd.image;
    if (!selectedImage) {
      setError('Please choose a file')
      return;
    }
    setEditedProd({ ...editedProd, image: selectedImage })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="py-5 flex flex-col gap-2 w-[250px] items-start">
        <span className="text-red-500">{error}</span>
        <input type="text" name="name" value={editedProd.name} placeholder="Product" onChange={handleChange} />
        <textarea cols={20} rows={2} name="description" value={editedProd.description} placeholder="Description" onChange={handleChange} />
        <input type="number" name="price" value={editedProd.price} placeholder="Price" onChange={handleChange} />
        <input type="number" name="quantity" value={editedProd.quantity} placeholder="Quantity" onChange={handleChange} />
        <input type="file" name="image" placeholder="Image" onChange={handleChangeImg} />
        <div className="flex gap-2">
          <button className="bg-blue-300 py-1 px-3" type="submit">Save</button>
          <button className="bg-red-300 py-1 px-3" type="button" onClick={onCancel}>Cancel</button>
        </div>

      </form>
    </>
  );
}