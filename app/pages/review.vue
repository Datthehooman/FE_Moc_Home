<template>
    <div class="bg-gray-50 p-6 sm:p-8">
        <div class="review-container mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        
        <div class="bg-[#AC8972] text-white p-5 sm:p-6">
            <h1 class="text-3xl font-extrabold mb-1">Đánh Giá Sản Phẩm Nội Thất</h1>
            <p class="opacity-90 text-sm">Chia sẻ trải nghiệm của bạn để giúp chúng tôi tốt hơn!</p>
        </div>

        <div class="p-5 border-b border-gray-200 flex items-center space-x-4">
            <div class="w-24 h-24 flex-shrink-0 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden shadow-inner border border-gray-200">
                <span class="text-gray-400 text-xs text-center">Ảnh sản phẩm</span>
            </div>
            <div>
                <h2 class="text-lg font-bold text-gray-800 mb-1">Ghế Sofa Đơn Bọc Da Cao Cấp</h2>
                <p class="text-sm text-gray-600 mb-1">Phân loại: <span class="font-medium text-gray-700">Màu Nâu Đậm, Kích thước L</span></p>
                <p class="text-xl font-extrabold text-[#623B27]">5.500.000 <span class="text-base">VNĐ</span></p>
            </div>
        </div>

        <div class="p-5 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span class="mr-2 text-[#AC8972]">✨</span> Bạn cảm thấy sản phẩm này như thế nào?
            </h3>
            <div class="star-rating flex flex-row-reverse justify-center md:justify-start items-center space-x-1 my-3">
                <input type="radio" id="star5" name="rating" value="5" class="hidden">
                <label for="star5" title="Tuyệt vời - 5 sao" data-rating-text="Tuyệt vời! Rất hài lòng về sản phẩm và dịch vụ."></label>
                <input type="radio" id="star4" name="rating" value="4" class="hidden">
                <label for="star4" title="Rất tốt - 4 sao" data-rating-text="Rất tốt, chất lượng đạt yêu cầu, sẽ mua lại."></label>
                <input type="radio" id="star3" name="rating" value="3" class="hidden">
                <label for="star3" title="Bình thường - 3 sao" data-rating-text="Bình thường, có một vài điểm cần cải thiện."></label>
                <input type="radio" id="star2" name="rating" value="2" class="hidden">
                <label for="star2" title="Tệ - 2 sao" data-rating-text="Không hài lòng, chất lượng kém hơn mong đợi."></label>
                <input type="radio" id="star1" name="rating" value="1" class="hidden">
                <label for="star1" title="Rất tệ - 1 sao" data-rating-text="Rất tệ! Có lỗi nghiêm trọng hoặc không sử dụng được."></label>
            </div>
            <p id="rating-message" class="text-sm text-gray-500 text-center md:text-left">Chạm để chọn số sao bạn muốn đánh giá.</p>
        </div>
        
        <div class="p-5">
            <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span class="mr-2 text-[#AC8972]">✍️</span> Viết nhận xét của bạn
            </h3>
            <textarea 
                id="comment-textarea"
                class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AC8E] resize-y text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Hãy chia sẻ cảm nhận về chất lượng, thiết kế, và trải nghiệm của bạn..."
            ></textarea>
            
            <div class="mt-4 text-center md:text-right">
                <button 
                    id="submit-review-btn"
                    class="btn-primary"
                >
                    Gửi Đánh Giá
                </button>
            </div>
        </div>
        </div>
    </div>
</template>
<style>
        /* Áp dụng phông chữ Roboto cho toàn bộ trang */
        body {
            font-family: 'Roboto', sans-serif;
        }

        /* CSS Tùy Chỉnh cho Màu và Sao */
        .star-rating input[type="radio"] { display: none; }
        .star-rating label {
            font-size: 2.25rem;
            color: #ccc; 
            cursor: pointer;
            transition: color 0.2s ease-in-out;
            display: inline-block;
            margin: 0 2px;
        }

        /* Định nghĩa Icon Sao rỗng và đầy */
        .star-rating label:before { content: "☆"; }
        .star-rating input[type="radio"]:checked ~ label:before,
        .star-rating label:hover:before,
        .star-rating label:hover ~ label:before { content: "★"; }

        /* Đổi màu khi được chọn / hover */
        .star-rating input[type="radio"]:checked ~ label,
        .star-rating label:hover,
        .star-rating label:hover ~ label {
            color: #D4AC8E; /* Màu nhạt từ bảng màu của bạn */
        }
        .star-rating input[type="radio"]:checked + label { color: #D4AC8E; }
        .star-rating input[type="radio"]:checked + label:before { content: "★"; }


        /* Định nghĩa Nút Chính (Màu #623B27) */
        .btn-primary {
            background-color: #623B27;
            color: white;
            font-weight: bold;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: none;
        }
        .btn-primary:hover {
            background-color: #88604A; /* Màu nhạt hơn khi hover */
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        }
        .btn-primary:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Căn giữa và chiếm 80% chiều ngang */
        .review-container {
            width: 80%; /* Chiếm 80% chiều ngang màn hình */
            max-width: 1000px; /* Giới hạn tối đa để không quá lớn trên màn hình rộng */
        }
</style>
<script lang="ts" setup>

</script>
