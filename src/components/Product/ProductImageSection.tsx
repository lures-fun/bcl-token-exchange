import { Product } from '@/types/Product';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const ProductImageSection = ({ product }: { product: Product }) => {
  const [selectedImage] = useState(product.imageUrl);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Image
        src={selectedImage}
        alt="Product Image"
        width={500}
        height={500}
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '500px',
          borderRadius: '8px',
        }}
      />
      {/* サブ画像を追加する場合の領域 */}
      {/* <Box display="flex" justifyContent="center" mt={3}>
        {product.subImages.map((image: string, index: number) => (
          <Image
            width={60}
            height={60}
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              margin: '0 5px',
              borderRadius: '8px',
              border: selectedImage === image ? '2px solid #000' : '2px solid transparent',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box> */}
    </Box>
  );
};

export default ProductImageSection;
