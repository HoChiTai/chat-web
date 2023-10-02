export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
};

export type Message = {
  sender_id: number;
  receiver_id: number | null | undefined;
  group_id: number | null;
  content: string;
  type: string;
};
