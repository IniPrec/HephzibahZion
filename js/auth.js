document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // REGISTER
  const regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value;

      const existingUser = users.find((u) => u.email === email);
      const status = document.getElementById("register-status");

      if (existingUser) {
        status.textContent = "User already exists. Try logging in.";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));
      status.textContent = "Registration successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  }

  // LOGIN
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const status = document.getElementById("login-status");

      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        status.textContent = `Welcome back, ${
          user.name.split(" ")[0]
        }! Redirecting...`;
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        status.textContent = "Invalid email or password.";
      }
    });
  }

  // Show Greeting in Navbar
  const userGreeting = document.getElementById("user-greeting");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (userGreeting && currentUser) {
    userGreeting.innerHTML = `
        <span>Hi, ${currentUser.name.split(" ")[0]}!</span>
        <a href="#" id="logout-link">Logout</a>
      `;

    document.getElementById("logout-link").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  }
});
