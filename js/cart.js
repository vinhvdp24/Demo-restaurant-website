   function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}

function saveTotalAmountFromCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        const priceNumber = Number(item.price.replace(/[^\d]/g, ''));
        total += priceNumber * item.quantity;
    });
    localStorage.setItem('totalAmount', total);
}


// Đoạn mã 1: Xử lý sự kiện thêm sản phẩm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    const cartCount = document.getElementById('cart-count');

// Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];



   addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Lấy thông tin sản phẩm
                const productItem = button.closest('.product-item');
                const productName = productItem.querySelector('h3').textContent;
                const productPrice = productItem.querySelector('.price').textContent;
                const productImage = productItem.querySelector("img").getAttribute("src");

                // Thêm sản phẩm vào giỏ hàng
                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };

                // Kiểm tra nếu sản phẩm đã có trong giỏ thì chỉ tăng số lượng
                const existingProduct = cart.find(item => item.name === productName);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push(product);
                }

                // Lưu giỏ hàng vào localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Cập nhật số lượng giỏ hàng
                updateCartCount();
                saveTotalAmountFromCart(); // <- gọi hàm này để tính và lưu tổng tiền

            });
    });
    updateCartCount();

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const index = cart.findIndex(item => item.name === product.name);
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");

        
    }
});



// Đoạn mã 2: Hiển thị sản phẩm trong giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");

    let total = 0;
    cartBody.innerHTML = "";

    cartItems.forEach(item => {
        const priceNumber = Number(item.price.replace(/[^\d]/g, ''));
        const itemTotal = priceNumber * item.quantity;
        total += itemTotal;

        const row = `
            <tr>
                <td><img src="${item.image}" class="cart-img" style="width: 60px;"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button class="decrease-quantity" data-name="${item.name}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-name="${item.name}">+</button>
                </td>
                <td>VND${itemTotal.toLocaleString()}</td>
                <td><button class="remove-item" data-name="${item.name}">Remove</button></td>
            </tr>
        `;
        cartBody.insertAdjacentHTML("beforeend", row);
    });

    totalAmount.textContent = `VND${total.toLocaleString()}`;

    // Lắng nghe sự kiện giảm và tăng số lượng
    cartBody.addEventListener('click', function (event) {
    const productName = event.target.getAttribute('data-name');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (event.target.classList.contains('decrease-quantity')) {
        cart = cart.map(item => {
            if (item.name === productName && item.quantity > 1) {
                item.quantity--;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    if (event.target.classList.contains('increase-quantity')) {
        cart = cart.map(item => {
            if (item.name === productName) {
                item.quantity++;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    if (event.target.classList.contains('remove-item')) {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
});

    function saveTotalAmount() {
    const totalAmount = document.getElementById("total-amount").textContent;
    const totalNumber = totalAmount.replace(/[^\d]/g, ''); // Loại bỏ các ký tự không phải số (VND, dấu chấm)
    localStorage.setItem('totalAmount', totalNumber); // Lưu vào localStorage
}


    // Cập nhật giỏ hàng sau khi thay đổi số lượng hoặc xóa sản phẩm
    function updateCartDisplay() {
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartBody = document.getElementById("cart-items");
        const totalAmount = document.getElementById("total-amount");

        let total = 0;
        cartBody.innerHTML = "";

        updatedCart.forEach(item => {
            const priceNumber = Number(item.price.replace(/[^\d]/g, ''));
            const itemTotal = priceNumber * item.quantity;
            total += itemTotal;

            const row = `
                <tr>
                    <td><img src="${item.image}" class="cart-img" style="width: 60px;"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="decrease-quantity" data-name="${item.name}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-name="${item.name}">+</button>
                    </td>
                    <td>VND${itemTotal.toLocaleString()}</td>
                    <td><button class="remove-item" data-name="${item.name}">Remove</button></td>
                </tr>
            `;
            cartBody.insertAdjacentHTML("beforeend", row);
        });

        totalAmount.textContent = `VND${total.toLocaleString()}`;
        saveTotalAmount();
        updateCartCount();

    }

});







function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}

document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('active');
});


      document.addEventListener("DOMContentLoaded", function () {
         updateCartDisplay();
  // Lấy tổng tiền từ localStorage và hiển thị lên giao diện
  const totalAmount = document.getElementById("order-total");
  const paymentMethod = document.getElementById("payment-method");
  const bankingQR = document.getElementById("banking-qr");
  const qrImage = document.getElementById("qr-image");
  const successMessage = document.getElementById("success-message");

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