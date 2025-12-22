import { ref } from "vue";

// Định nghĩa kiểu dữ liệu cơ bản cho Bài viết để tăng tính dễ đọc
interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  image: string | null;
  created_at: string; // ISO 8601 string
  category: {
    id: number;
    name: string;
    slug: string;
  };
  // Thêm các thuộc tính khác nếu cần cho chi tiết/danh sách
  // ...
}

interface ArticleDetail {
  article: Article;
  related_articles: Article[];
}

export function useArticle() {
  const articles = ref<Article[]>([]);
  const articleDetail = ref<ArticleDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const BASE_URL = "https://api.mocfurni.shop/api/client";

  /**
   * Lấy danh sách tất cả bài viết hoặc bài viết theo trang/số lượng (mặc định)
   * URL: /articles
   * @param params Các tham số truy vấn (ví dụ: page, per_page)
   */
  const fetchArticles = async (params: Record<string, any> = {}) => {
    loading.value = true;
    error.value = null;
    articles.value = []; // Reset danh sách trước khi fetch

    try {
      const res: any = await $fetch(`${BASE_URL}/articles`, {
        params: params,
      });

      // 🛠️ SỬA LỖI: Lấy dữ liệu từ trường result.data thay vì result.data.data
      const raw: any[] = res?.result?.data ?? [];

      articles.value = raw.map((a: any) => ({
        ...a,
        // Format ngày tạo cho dễ đọc
        created_at: a.created_at
          ? new Date(a.created_at).toLocaleDateString("vi-VN")
          : "",
      }));
    } catch (err: any) {
      error.value = err?.data?.message || "Không lấy được danh sách bài viết";
      console.error("Error fetching articles:", err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Lấy danh sách bài viết theo danh mục (slug)
   * URL: /articles/category/{slug}
   * @param categorySlug Slug của danh mục cần tìm
   * @param params Các tham số truy vấn (ví dụ: page, per_page)
   */
  const fetchArticlesByCategory = async (
    categorySlug: string,
    params: Record<string, any> = {}
  ) => {
    loading.value = true;
    error.value = null;
    articles.value = []; // Reset danh sách trước khi fetch

    try {
      const res: any = await $fetch(
        `${BASE_URL}/articles/category/${categorySlug}`,
        {
          params: params,
        }
      );

      // 🛠️ SỬA LỖI: Lấy dữ liệu từ trường result.data thay vì result.data.data
      const raw: any[] = res?.result?.data ?? [];

      articles.value = raw.map((a: any) => ({
        ...a,
        // Format ngày tạo
        created_at: a.created_at
          ? new Date(a.created_at).toLocaleDateString("vi-VN")
          : "",
      }));
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        `Không lấy được bài viết cho danh mục: ${categorySlug}`;
      console.error("Error fetching articles by category:", err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Lấy chi tiết một bài viết theo slug
   * URL: /articles/{slug}
   * @param articleSlug Slug của bài viết cần xem chi tiết
   */
  const fetchArticleDetail = async (articleSlug: string) => {
    loading.value = true;
    error.value = null;
    articleDetail.value = null; // Reset chi tiết trước khi fetch

    try {
      const res: any = await $fetch(`${BASE_URL}/articles/${articleSlug}`);

      const articleData = res?.result?.data;

      // Map dữ liệu chi tiết - article data is directly at res.result.data
      if (articleData) {
        articleDetail.value = {
          article: {
            ...articleData,
            created_at: articleData.created_at
              ? new Date(articleData.created_at).toLocaleDateString("vi-VN")
              : "",
          },
          // Ánh xạ các bài viết liên quan nếu có
          related_articles: (articleData.related_articles ?? []).map(
            (ra: any) => ({
              ...ra,
              created_at: ra.created_at
                ? new Date(ra.created_at).toLocaleDateString("vi-VN")
                : "",
            })
          ),
        };
      }
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        `Không lấy được chi tiết bài viết: ${articleSlug}`;
      console.error("Error fetching article detail:", err);
    } finally {
      loading.value = false;
    }
  };

  fetchArticles();

  return {
    articles,
    articleDetail,
    loading,
    error,
    fetchArticles,
    fetchArticlesByCategory,
    fetchArticleDetail,
  };
}
