document.addEventListener("DOMContentLoaded", () => {
  const summary = document.getElementById("checkout-summary");
  const form = document.getElementById("checkout-form");
  const status = document.getElementById("checkout-status");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    form.style.display = "none";
    return;
  }

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("checkout-item");
    itemDiv.innerHTML = `
        <p><strong>${item.name}</strong> - ₦${item.price.toLocaleString()} x ${
      item.quantity
    }</p>
      `;
    summary.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<p><strong>Total:</strong> ₦${total.toLocaleString()}</p>`;
  summary.appendChild(totalDiv);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const orderId = Math.floor(Math.random() * 1000000);
    form.style.display = "none";
    summary.style.display = "none";
    status.innerHTML = `🎉 Order #${orderId} placed successfully! We'll reach out shortly.`;

    localStorage.removeItem("cart");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
  });
});
