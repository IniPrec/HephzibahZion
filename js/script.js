// scripts/verse.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
    .then((response) => response.json())
    .then((data) => {
      const verse = data.verse.details.text;
      const reference = data.verse.details.reference;
      document.getElementById(
        "daily-verse"
      ).innerHTML = `"${verse}" - <strong>${reference}</strong>`;
    })
    .catch((error) => {
      console.error("Verse API Erro:", error);
      document.getElementById("daily-verse").textContent =
        "Unable to load verse.";
    });
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

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
    status.textContent = "Oops! SOmething went wrong. Please try again.";
  }
});

const scrollBtn = document.getElementById("scrollToTop");

window.onscroll = () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};