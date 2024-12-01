let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

function logout() {
  localStorage.removeItem("currentUser");

  document.getElementById("loginButton").style.display = "inline-block";
  document.getElementById("registerButton").style.display = "inline-block";

  const userInfo = document.getElementById("userInfo");
  userInfo.textContent = "";
  userInfo.style.display = "none";

  if (window.location.pathname.includes("/admin/")) {
    window.location.href = "/index.html";
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const loginError = document.getElementById("loginError");

  if (!username || !password) {
    loginError.textContent = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu";
    return;
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));

    document.getElementById("loginButton").style.display = "none";
    document.getElementById("registerButton").style.display = "none";

    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
            Xin chào, ${user.username} 
            <button onclick="logout()" class="logout-btn">Đăng xuất</button>
        `;
    userInfo.style.display = "block";

    document.getElementById("loginModal").style.display = "none";

    if (user.role === "admin") {
      window.location.href = "/admin/index.html";
    }
  } else {
    loginError.textContent = "Sai thông tin đăng nhập";
  }
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

function register() {
  if (!document.getElementById("registerModal")) {
    const registerModal = document.createElement("div");
    registerModal.id = "registerModal";
    registerModal.innerHTML = `
            <div class="modal-content">
                <h2>Đăng Ký</h2>
                <div id="registerError" class="error-message"></div>
                <input type="text" id="registerUsername" placeholder="Tên đăng nhập">
                <input type="password" id="registerPassword" placeholder="Mật khẩu">
                <input type="password" id="confirmPassword" placeholder="Xác nhận mật khẩu">
                <button onclick="submitRegistration()">Đăng Ký</button>
                <button onclick="closeRegisterModal()">Hủy</button>
            </div>
        `;
    document.body.appendChild(registerModal);

    const style = document.createElement("style");
    style.textContent = `
            #registerModal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.4);
            }
            #registerModal .modal-content {
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 300px;
                text-align: center;
            }
            .logout-btn {
                margin-left: 10px;
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
            }
        `;
    document.head.appendChild(style);
  }

  document.getElementById("registerModal").style.display = "block";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

function submitRegistration() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const registerError = document.getElementById("registerError");

  if (!username || !password || !confirmPassword) {
    registerError.textContent = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  if (password !== confirmPassword) {
    registerError.textContent = "Mật khẩu xác nhận không khớp";
    return;
  }

  if (users.some((u) => u.username === username)) {
    registerError.textContent = "Tên đăng nhập đã tồn tại";
    return;
  }

  const newUser = {
    username,
    password,
    role: "user",
  };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  closeRegisterModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");

  if (loginButton) {
    loginButton.addEventListener("click", openLoginModal);
  }

  if (registerButton) {
    registerButton.addEventListener("click", register);
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("registerButton").style.display = "none";

    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
            Xin chào, ${currentUser.username} 
            <button onclick="logout()" class="logout-btn">Đăng xuất</button>
        `;
    userInfo.style.display = "block";
  }
});
