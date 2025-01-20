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
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const authMessage = document.getElementById("auth-message");
  const dashboard = document.getElementById("dashboard");
  const logoutBtn = document.getElementById("logout-btn");
  const balanceDisplay = document.getElementById("balance");
  const userInfo = document.getElementById("user-info");
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");
  const videoList = document.getElementById("video-list");
  const linkMessage = document.getElementById("link-message");
  const watchVideoBtn = document.getElementById("watch-video-btn");

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
      displayVideoLinks(user.links || []);
    } else {
      userInfo.textContent = "Bem-vindo!";
      balanceDisplay.textContent = "Saldo: 0 moedas";
      registerForm.classList.remove("hidden");
      loginForm.classList.remove("hidden");
      dashboard.classList.add("hidden");
    }
  };

  // Exibe os links de vídeo na lista
  const displayVideoLinks = (links) => {
    videoList.innerHTML = ""; // Limpa a lista antes de adicionar
    links.forEach((link, index) => {
      const li = document.createElement("li");
      li.textContent = link;
      const watchButton = document.createElement("button");
      watchButton.textContent = "Assistir";
      watchButton.onclick = () => openVideo(link);
      li.appendChild(watchButton);
      videoList.appendChild(li);
    });
    watchVideoBtn.classList.toggle("hidden", links.length === 0);
  };

  // Função para abrir o vídeo
  const openVideo = (link) => {
    window.open(link, "_blank");
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
      users[username] = { password, balance: 50, links: [] }; // Saldo inicial de 50 moedas
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
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
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
      linkMessage.textContent = "Saldo insuf
      document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const authMessage = document.getElementById("auth-message");
  const dashboard = document.getElementById("dashboard");
  const logoutBtn = document.getElementById("logout-btn");
  const balanceDisplay = document.getElementById("balance");
  const userInfo = document.getElementById("user-info");
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");
  const videoList = document.getElementById("video-list");
  const linkMessage = document.getElementById("link-message");

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
      displayVideoLinks(user.links || []);
    } else {
      userInfo.textContent = "Bem-vindo!";
      balanceDisplay.textContent = "Saldo: 0 moedas";
      registerForm.classList.remove("hidden");
      loginForm.classList.remove("hidden");
      dashboard.classList.add("hidden");
    }
  };

  // Exibe os links de vídeo na lista
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

  // Função para abrir o vídeo
  const openVideo = (link) => {
    window.open(link, "_blank");
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
      users[username] = { password, balance: 50, links: [] }; // Saldo inicial de 50 moedas
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
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
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

  // Inicializar a interface
  updateDashboard();
});
      
