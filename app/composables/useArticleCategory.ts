import { ref } from "vue";

// Định nghĩa kiểu dữ liệu cơ bản cho Danh mục Bài viết
interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  desc: string;
  created_at: string;
  updated_at: string;
}

// Định nghĩa kiểu dữ liệu cho Bài viết đơn giản (dùng trong chi tiết danh mục)
interface SimpleArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  created_at: string;
}

// Định nghĩa kiểu dữ liệu cho Chi tiết Danh mục (bao gồm cả các bài viết)
interface CategoryDetail extends ArticleCategory {
  articles: SimpleArticle[];
}

export function useArticleCategory() {
  const categories = ref<ArticleCategory[]>([]);
  const categoryDetail = ref<CategoryDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const BASE_URL = "https://api.mocfurni.shop/api/client";

  /**
   * Lấy danh sách tất cả danh mục bài viết.
   * URL: /article-categories
   */
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    categories.value = []; // Reset danh sách

    try {
      const res: any = await $fetch(`${BASE_URL}/article-categories`);

      // Dữ liệu danh mục nằm trực tiếp trong result.data
      const raw: any[] = res?.result?.data ?? [];

      categories.value = raw.map((c: any) => ({
        ...c,
        // Format ngày tạo cho dễ đọc
        created_at: c.created_at
          ? new Date(c.created_at).toLocaleDateString("vi-VN")
          : "",
        updated_at: c.updated_at
          ? new Date(c.updated_at).toLocaleDateString("vi-VN")
          : "",
      }));
    } catch (err: any) {
      error.value =
        err?.data?.message || "Không lấy được danh sách danh mục bài viết";
      console.error("Error fetching article categories:", err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Lấy chi tiết một danh mục theo slug, bao gồm danh sách các bài viết thuộc danh mục đó.
   * URL: /article-categories/{slug}
   * @param categorySlug Slug của danh mục cần xem chi tiết
   */
  const fetchCategoryDetail = async (categorySlug: string) => {
    loading.value = true;
    error.value = null;
    categoryDetail.value = null; // Reset chi tiết

    try {
      const res: any = await $fetch(
        `${BASE_URL}/article-categories/${categorySlug}`
      );

      const categoryData = res?.result?.data?.category;

      if (categoryData) {
        // Map dữ liệu danh mục và các bài viết
        categoryDetail.value = {
          id: categoryData.id,
          name: categoryData.name,
          slug: categoryData.slug,
          desc: categoryData.desc,
          status: categoryData.status,
          created_at: categoryData.created_at
            ? new Date(categoryData.created_at).toLocaleDateString(
                "vi-VN"
              )
            : "",
          updated_at: categoryData.updated_at
            ? new Date(categoryData.updated_at).toLocaleDateString(
                "vi-VN"
              )
            : "",
          articles: (categoryData.articles ?? []).map((a: any) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            content: a.content,
            image: a.image,
            created_at: a.created_at
              ? new Date(a.created_at).toLocaleDateString("vi-VN")
              : "",
          })),
        } as CategoryDetail;
      }
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        `Không lấy được chi tiết danh mục: ${categorySlug}`;
      console.error("Error fetching category detail:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    categoryDetail,
    loading,
    error,
    fetchCategories,
    fetchCategoryDetail,
  };
}