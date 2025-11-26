
export interface Review {
  id: number // Corresponds to 'id' (bigint, primary key)
  order_detail_id: number // Corresponds to 'order_detail_id' (bigint, foreign key)
  rating: number // Corresponds to 'rating' (decimal(2,1))
  comment: string | null // Corresponds to 'comment' (text)
  status: number // Corresponds to 'status' (tinyint)
  created_at: string // Corresponds to 'created_at' (timestamp)
  updated_at: string // Corresponds to 'updated_at' (timestamp)
}