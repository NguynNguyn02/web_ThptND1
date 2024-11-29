document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".dot");

  const newsCard = document.querySelector(".news-card");
  const newsTitle = document.querySelector(".news-title");
  const newsExcerpt = document.querySelector(".news-excerpt");
  const newsImage = document.querySelector(".news-image");

  const newsList = [
    {
      title:
        "Di chúc của Chủ tịch Hồ Chí Minh – sự kết tinh tư tưởng, đạo đức, phong cách của Người",
      excerpt:
        "Tìm hiểu về di chúc của Chủ tịch Hồ Chí Minh và những giá trị to lớn của nó đối với dân tộc Việt Nam.",
      img: "./image/BacHo.jpg",
      link: "/news/news-detail/di-chuc-chu-tich-hcm/index.html",
    },
    {
      title:
        "Sôi nổi, hào hứng với các hoạt động chào mừng ngày Phụ nữ Việt Nam 20/10",
      excerpt:
        "Thực hiện kế hoạch tổ chức các hoạt động thiết thực, ý nghĩa kỉ niệm 94 năm ngày Phụ nữ Việt Nam, nhằm tạo sân chơi bổ ích giúp các đoàn viên Công đoàn gắn kết, phát huy tinh thần thể dục thể thao, chiều ngày 19/10, Công đoàn trường THPT Nam Đàn 1 đã tổ chức giải bóng chuyền hơi nam- nữ chào mừng Ngày phụ nữ Việt Nam 20/10.",
      img: "./image/ngayphunuvietnam.jpg",
      link: "/news/news-detail/phu-nu-viet-nam/index.html",
    },
    {
      title:
        "Ý nghĩa lịch sử của chiến thắng Điện Biện Phủ (07/5/1954) và chiến thắng 30/4/1975",
      excerpt:
        "Mấy chục năm trôi qua, chiến thắng Điện Biện Phủ (07/5/1954) và chiến thắng 30/4/1975 vẫn là những thắng lợi vĩ đại đã ghi vào lịch sử dân tộc Việt Nam như những mốc son chói lọi trong thế kỷ XX. Đây là chiến thắng của chủ nghĩa yêu nước, ý chí bất khuất, kiên cường của dân tộc Việt Nam được  hun đúc qua hàng nghìn năm lịch sử... Ý nghĩa, tầm vóc, những bài học lịch sử của những sự kiện lịch sử này vẫn còn nguyên giá trị trong sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa hiện nay.",
      img: "./image/chienthangdienbienphu.webp",
      link: "/news/news-detail/chien-thang-dien-bien-phu/index.html",
    },
  ];

  let currentSlide = 0;
  let slideInterval;

  const updateSlide = (index) => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${index * 100}%)`;
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    const news = newsList[index];
    newsTitle.textContent = news.title;
    newsExcerpt.textContent = news.excerpt;
    newsImage.src = news.img;
    newsCard.href = news.link;
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(currentSlide);
  };

  const startSlideShow = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide(currentSlide);
      stopSlideShow();
      startSlideShow();
    });
  });

  const slider = document.querySelector(".slider");
  slider.addEventListener("mouseenter", stopSlideShow);
  slider.addEventListener("mouseleave", startSlideShow);

  updateSlide(currentSlide);
  startSlideShow();
});
const notices = document.querySelectorAll(".notice-item");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const itemsPerPage = 3; // Số lượng thông báo hiển thị trên mỗi trang
const totalPages = Math.ceil(notices.length / itemsPerPage);

function displayPage(page) {
  notices.forEach((notice, index) => {
    notice.style.display =
      index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
        ? "block"
        : "none";
  });
  pageInfo.textContent = `Trang ${page} của ${totalPages}`;
}

function updatePagination() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
    updatePagination();
  }
});

// Hiển thị trang đầu tiên khi tải trang
displayPage(currentPage);
updatePagination();
document.addEventListener("DOMContentLoaded", function () {
  fetch("/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  fetch("/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
