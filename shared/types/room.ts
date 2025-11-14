export interface Room {
  id: number;
  room_name: string;
  slug: string;
  img_url: string;
  description: string;
  is_active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  full_image_url: string;
}

export interface RoomApiResponse {
  status: boolean;
  message: string;
  result: { data: Room[] };
}
export interface RoomCountApiResponse {
  status: boolean;
  message: string;
  result: { data: Number[] };
}
