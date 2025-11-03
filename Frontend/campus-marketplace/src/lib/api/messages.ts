// API functions for messaging
import { Message } from '@/src/types/message';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
  const response = await fetch(`${API_BASE_URL}/messages/between?user1Id=${user1Id}&user2Id=${user2Id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

export async function sendMessage(fromUserId: number, toUserId: number, content: string): Promise<Message> {
  const response = await fetch(`${API_BASE_URL}/messages/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
    params: {
      fromUserId,
      toUserId,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}