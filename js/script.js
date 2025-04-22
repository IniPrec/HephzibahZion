// scripts/verse.js
document.addEventListener("DOMContentLoaded", () => {
  // ✝️ Daily Bible Verse
  const verseBox = document.getElementById("daily-verse");
  if (verseBox) {
    fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const verse = data.verse.details.text;
        const reference = data.verse.details.reference;
        verseBox.innerHTML = `"${verse}" - <strong>${reference}</strong>`;
      })
      .catch((error) => {
        console.error("Verse API Error:", error);
        verseBox.textContent = "Unable to load verse.";
      });
  }

  // 📩 Contact Form
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        status.textContent = "Message sent! We'll get back to you soon.";
        form.reset();
      } else {
        status.textContent = "Oops! Something went wrong. Please try again.";
      }
    });
  }

  // ⬆️ Scroll-to-top Button
  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) {
    window.onscroll = () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };

    scrollBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  // 🛒 Cart Loader
  const cartItems = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");

  if (cartItems && totalDisplay) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
      totalDisplay.textContent = "₦0";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `<h3>${item.name}</h3>
        <p>₦${item.price.toLocaleString()}</p>
        <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
        </div>
      `;
      cartItems.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    totalDisplay.textContent = `₦${total.toLocaleString()}`;
  }
});

// 🛒 Add to Cart
function addToCart(button) {
  const product = button.closest(".product-card");
  const id = product.dataset.id;
  const name = product.dataset.name;
  const price = parseFloat(product.dataset.price);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removedItem = cart.splice(index, 1)[0]; //Remove item
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${removedItem.name} removed from cart.`);
  location.reload(); // Refresh to update cart view
}

function increaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // re-render
}

function decreaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Remove item if quantity is 0
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // re-render
}

function filterProducts(criteria) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const category = product.dataset.category;
    const price = parseFloat(product.dataset.price);

    let show = false;

    if (criteria === "all") show = true;
    else if (criteria === "affordable" && price <= 5000) show = true;
    else if (category === criteria) show = true;

    product.style.display = show ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userGreeting = document.getElementById("user-greeting");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.name) {
    userGreeting.innerHTML = `<a href="#">Hi, ${user.name.split(" ")[0]}!</a>`;
  }
});
