import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import EditProductForm from "./EditProduct";

const ProductCardList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:8080/getProducts?email=${userEmail}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [userEmail]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(
      products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  return (
    <div className="p-6">
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onUpdate={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
