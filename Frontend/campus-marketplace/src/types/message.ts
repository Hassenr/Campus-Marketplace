export interface Message {
  id: number;
  from: {
    id: number;
    username: string;
  };
  to: {
    id: number;
    username: string;
  };
  content: string;
  timestamp: string;
}