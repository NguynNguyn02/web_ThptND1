document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".teacher-slider");
  const slides = document.querySelectorAll(".teacher-slide");
  const prevBtn = document.querySelector(".teacher-slider-prev");
  const nextBtn = document.querySelector(".teacher-slider-next");
  const dots = document.querySelectorAll(".teacher-dot");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Ẩn tất cả các slide
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? "flex" : "none";
  });

  // Hàm cập nhật slide và dot active
  function updateSlide() {
    // Ẩn tất cả các slide
    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // Hiển thị slide hiện tại
    slides[currentSlide].style.display = "flex";

    // Cập nhật trạng thái dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Nút next
  nextBtn.addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  // Nút previous
  prevBtn.addEventListener("click", function () {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      updateSlide();
    });
  });
});
