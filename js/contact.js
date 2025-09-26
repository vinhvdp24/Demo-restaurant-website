document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hiển thị thông báo thành công
    document.getElementById('successMessage').style.display = 'block';

    // Xóa các trường nhập sau khi gửi
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
});