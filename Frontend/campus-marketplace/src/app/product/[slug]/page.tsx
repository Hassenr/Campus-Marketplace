import { IProduct } from '@/src/types/product';
import { getProductBySlug } from '@/src/lib/api/product';
import AddToCartButton from '@/src/components/product/AddToCartButton';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { slug: string };
}

// Server Component for the product details page
export default async function ProductPage({ params }: ProductPageProps) {
  const product: IProduct | null = await getProductBySlug(params.slug);

  if (!product) {
    notFound(); // Next.js 404
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img src={product.imageUrls[0]} alt={product.name} className="w-full object-cover rounded-lg" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold mb-2">{product.name}</h1>
        <p className="text-2xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        {/* The button would be a 'use client' component */}
        <AddToCartButton productId={product.id} />
        
        <p className="mt-4 text-sm text-gray-500">
          In Stock: {product.stock}
        </p>
      </div>
    </div>
  );
}