// Lưu trữ dữ liệu người dùng và bài viết
let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "admin", role: "admin" },
];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Kiểm tra quyền truy cập
if (!currentUser || currentUser.role !== "admin") {
  alert("Bạn không có quyền truy cập trang quản trị");
  window.location.href = "/index.html";
}

// Hiển thị thông tin người dùng
document.getElementById(
  "userInfo"
).textContent = `Xin chào, ${currentUser.username}`;

// Quản lý tab
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".section")
      .forEach((s) => s.classList.remove("active"));

    this.classList.add("active");
    document
      .getElementById(this.dataset.section + "Section")
      .classList.add("active");
  });
});

// Thêm bài viết
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  const newPost = {
    id: Date.now(),
    title,
    content,
    author: currentUser.username,
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();

  // Xóa các trường nhập
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
});

// Render danh sách bài viết
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("div");
    postItem.className = "list-item";
    postItem.innerHTML = `
              <div>
                  <strong>${post.title}</strong>
                  <p>${post.content}</p>
                  <small>Tác giả: ${post.author}</small>
              </div>
              <div>
                  <button onclick="editPost(${post.id})" class="btn btn-secondary">Sửa</button>
                  <button onclick="deletePost(${post.id})" class="btn" style="background-color:red;">Xóa</button>
              </div>
          `;
    postList.appendChild(postItem);
  });
}

// Sửa bài viết
function editPost(id) {
  const post = posts.find((p) => p.id === id);
  if (post) {
    const newTitle = prompt("Nhập tiêu đề mới:", post.title);
    const newContent = prompt("Nhập nội dung mới:", post.content);

    if (newTitle !== null && newContent !== null) {
      post.title = newTitle;
      post.content = newContent;
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
    }
  }
}

// Xóa bài viết
function deletePost(id) {
  if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
    posts = posts.filter((p) => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

// Thêm tài khoản
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("userUsername").value;
  const password = document.getElementById("userPassword").value;
  const role = document.getElementById("userRole").value;

  if (users.some((u) => u.username === username)) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();

  // Xóa các trường nhập
  document.getElementById("userUsername").value = "";
  document.getElementById("userPassword").value = "";
});

// Render danh sách tài khoản
function renderUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "list-item";
    userItem.innerHTML = `
              <div>
                  <strong>${user.username}</strong>
                  <p>Vai trò: ${user.role}</p>
              </div>
              <div>
                  <button onclick="editUser('${user.username}')" class="btn btn-secondary">Sửa</button>
                  <button onclick="deleteUser('${user.username}')" class="btn" style="background-color:red;">Xóa</button>
              </div>
          `;
    userList.appendChild(userItem);
  });
}

// Sửa tài khoản
function editUser(username) {
  const user = users.find((u) => u.username === username);
  if (user) {
    const newPassword = prompt("Nhập mật khẩu mới:", user.password);
    const newRole = prompt("Nhập vai trò mới (user/admin):", user.role);

    if (newPassword !== null && newRole !== null) {
      user.password = newPassword;
      user.role = newRole;
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers();
    }
  }
}

// Xóa tài khoản
function deleteUser(username) {
  if (username === currentUser.username) {
    alert("Bạn không thể xóa tài khoản của chính mình");
    return;
  }

  if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
    users = users.filter((u) => u.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  }
}

// Render initial lists
renderPosts();
renderUsers();
