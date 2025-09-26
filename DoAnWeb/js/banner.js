document.addEventListener("DOMContentLoaded", function () {
    const images = ["https://i.postimg.cc/02yZ5x6M/banner1.png", "https://i.postimg.cc/FHtfWVQr/banner2.jpg", "https://i.postimg.cc/SKdJK0YR/banner3.jpg"];  // Danh sách ảnh
    let currentIndex = 0;  // Chỉ số ảnh hiện tại

    const bannerImage = document.getElementById('banner-image');
    
    // Thay đổi ảnh khi click mũi tên trái
    document.querySelector('.left-arrow').addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        bannerImage.src = images[currentIndex];
    });

    // Thay đổi ảnh khi click mũi tên phải
    document.querySelector('.right-arrow').addEventListener('click', function() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        bannerImage.src = images[currentIndex];
    });
    setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    bannerImage.src = images[currentIndex];
}, 3000); // Chuyển ảnh mỗi 3 giây

});