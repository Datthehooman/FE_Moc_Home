export interface Category {
  id: number;
  category_name: string;
  parent_id: number | null;
  image: string;
  description: string;
  slug: string;
  is_active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FetchCategoriesResponse {
  status: boolean;
  message: string;
  result: Category[];
}
