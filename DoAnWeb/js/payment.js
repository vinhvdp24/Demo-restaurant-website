      document.addEventListener("DOMContentLoaded", function () {
  // Lấy tổng tiền từ localStorage và hiển thị lên giao diện
  const totalAmount = document.getElementById("order-total");
  const paymentMethod = document.getElementById("payment-method");
  const bankingQR = document.getElementById("banking-qr");
  const qrImage = document.getElementById("qr-image");
  const successMessage = document.getElementById("success-message");
   updateCartDisplay();

  // Kiểm tra nếu có tổng tiền đã lưu trong localStorage
  const savedTotalAmount = localStorage.getItem('totalAmount');
  if (savedTotalAmount) {
    totalAmount.textContent = parseInt(savedTotalAmount).toLocaleString(); // Hiển thị tổng tiền đã lưu
  } else {
    totalAmount.textContent = "0"; // Nếu không có, hiển thị 0
  }

  paymentMethod.addEventListener("change", function () {
    if (paymentMethod.value === "banking") {
      bankingQR.classList.remove("hidden");
      // Cập nhật hình ảnh QR code, ví dụ:
      qrImage.src = "path-to-qr-code.png";
    } else {
      bankingQR.classList.add("hidden");
    }
  });

  // Xử lý submit form
  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();  // Ngừng hành động submit mặc định

    // Giả sử thanh toán thành công
    successMessage.classList.remove("hidden");
  });
});