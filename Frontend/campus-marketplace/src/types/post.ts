export interface User {
  id: number;
  username: string;
  email: string;
  college: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  askingPrice: number;
  category: string;
  imageUrl: string;
  Owner: User;
}