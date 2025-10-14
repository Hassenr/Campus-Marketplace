export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  slug: string; // Used for the dynamic route
  stock: number;
}