document.addEventListener("DOMContentLoaded", () => {
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");

  // Exibir ou ocultar o formulário de adicionar link
  showAddLinkFormBtn.addEventListener("click", () => {
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const authMessage = document.getElementById("auth-message");
  const dashboard = document.getElementById("dashboard");
  const logoutBtn = document.getElementById("logout-btn");
  const balanceDisplay = document.getElementById("balance");
  const userInfo = document.getElementById("user-info");

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUser = localStorage.getItem("currentUser");

  // Atualiza a interface do usuário após login
  const updateDashboard = () => {
    if (currentUser) {
      const user = users[currentUser];
      userInfo.textContent = `Bem-vindo, ${currentUser}!`;
      balanceDisplay.textContent = `Saldo: ${user.balance} moedas`;
      registerForm.classList.add("hidden");
      loginForm.classList.add("hidden");
      dashboard.classList.remove("hidden");
    } else {
      userInfo.textContent = "Bem-vindo!";
      balanceDisplay.textContent = "Saldo: 0 moedas";
      registerForm.classList.remove("hidden");
      loginForm.classList.remove("hidden");
      dashboard.classList.add("hidden");
    }
  };

  // Registro de novo usuário
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username]) {
      authMessage.textContent = "Usuário já registrado. Por favor, faça login.";
      authMessage.style.color = "red";
    } else {
      users[username] = { password, balance: 50 }; // Saldo inicial de 50 moedas
      localStorage.setItem("users", JSON.stringify(users));
      authMessage.textContent = "Registro bem-sucedido! Agora você pode fazer login.";
      authMessage.style.color = "green";
    }
  });

  // Login do usuário
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (users[username] && users[username].password === password) {
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      authMessage.textContent = "Login bem-sucedido!";
      authMessage.style.color = "green";
      updateDashboard();
    } else {
      authMessage.textContent = "Credenciais inválidas. Tente novamente.";
      authMessage.style.color = "red";
    }
  });

  // Logout do usuário
  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateDashboard();
  });

  // Inicializar a interface
  updateDashboard();
});
