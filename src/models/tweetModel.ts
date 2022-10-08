export interface Tweet {
  id: string;
  content: string;
  user_id: string;
  likes: number;
  created_at: number;
  is_like?: boolean;
}
