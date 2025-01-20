document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const authMessage = document.getElementById("auth-message");
  const dashboard = document.getElementById("dashboard");
  const logoutBtn = document.getElementById("logout-btn");
  const balanceDisplay = document.getElementById("balance");
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");
  const videoList = document.getElementById("video-list");
  const linkMessage = document.getElementById("link-message");

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUser = localStorage.getItem("currentUser");

  // Atualiza a interface após login
  const updateDashboard = () => {
    if (currentUser) {
      const user = users[currentUser];
      balanceDisplay.textContent = `Saldo: ${user.balance} moedas`;
      registerForm.classList.add("hidden");
      loginForm.classList.add("hidden");
      dashboard.classList.remove("hidden");
      displayVideoLinks(user.links || []);
    } else {
      balanceDisplay.textContent = "Saldo: 0 moedas";
      registerForm.classList.remove("hidden");
      loginForm.classList.remove("hidden");
      dashboard.classList.add("hidden");
    }
  };

  // Exibe links de vídeos na lista
  const displayVideoLinks = (links) => {
    videoList.innerHTML = ""; // Limpa a lista antes de adicionar
    links.forEach((link) => {
      const li = document.createElement("li");
      li.textContent = link;
      const watchButton = document.createElement("button");
      watchButton.textContent = "Assistir";
      watchButton.onclick = () => openVideo(link);
      li.appendChild(watchButton);
      videoList.appendChild(li);
    });
  };

  // Abre o vídeo
  const openVideo = (link) => {
    window.open(link, "_blank");
    updateBalanceAfterWatching();
  };

  // Adiciona novo usuário
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username]) {
      authMessage.textContent = "Usuário já registrado. Faça login.";
      authMessage.style.color = "red";
    } else {
      users[username] = { password, balance: 50, links: [] }; // 50 moedas iniciais
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

  // Exibir ou ocultar o formulário de adicionar link
  showAddLinkFormBtn.addEventListener("click", () => {
    addLinkForm.classList.toggle("hidden");
  });

  // Adicionar link de vídeo
  addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const linkInput = document.getElementById("tiktok-link");
    const link = linkInput.value.trim();
    const user = users[currentUser];

    if (user.balance >= 50) {
      user.links.push(link);
      user.balance -= 50; // Deduz 50 moedas
      localStorage.setItem("users", JSON.stringify(users));
      balanceDisplay.textContent = `Saldo: ${user.balance} moedas`;
      linkMessage.textContent = `Link adicionado com sucesso: ${link}`;
      linkInput.value = "";
      displayVideoLinks(user.links);
    } else {
      linkMessage.textContent = "Saldo insuficiente para adicionar um novo link.";
      linkMessage.style.color = "red";
    }
  });

  // Atualiza o saldo após assistir ao vídeo
  const updateBalanceAfterWatching = () => {
    const user = users[currentUser];
    user.balance += 10; // Adiciona 10 moedas
    localStorage.setItem("users", JSON.stringify(users));
    balanceDisplay.textContent =
        
