// Dữ liệu giả lập
let users = JSON.parse(localStorage.getItem("users")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = null;

function showLogin() {
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("registerContainer").style.display = "none";
}

function showRegister() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("registerContainer").style.display = "block";
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    currentUser = user;
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("adminContainer").style.display = "block";
    renderPosts();
  } else {
    alert("Đăng nhập thất bại");
  }
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  if (users.some((u) => u.username === username)) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }

  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công");
  showLogin();
}

function addPost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  if (!title || !content) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

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
}

function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post-item";
    postElement.innerHTML = `
              <div>
                  <strong>${post.title}</strong>
                  <p>${post.content}</p>
                  <small>Tác giả: ${post.author}</small>
              </div>
              <div>
                  <button onclick="editPost(${post.id})">Sửa</button>
                  <button onclick="deletePost(${post.id})">Xóa</button>
              </div>
          `;
    postList.appendChild(postElement);
  });
}

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

function deletePost(id) {
  if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
    posts = posts.filter((p) => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}
