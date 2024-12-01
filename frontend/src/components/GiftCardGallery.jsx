import React from 'react';
import GiftCard from '../components/GiftCard';

function GiftCardGallery({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="break-inside-avoid">
          <GiftCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default GiftCardGallery;
