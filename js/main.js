document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const productToggle = document.getElementById("mobileProductToggle");
  const productMenu = document.getElementById("mobileProductMenu");

  /* MOBILE MENU OPEN / CLOSE */

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (mobileMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");

      productMenu.classList.remove("active");
      productToggle.classList.remove("active");
    }
  });

  /* MOBILE PRODUCT ACCORDION */

  productToggle.addEventListener("click", function () {
    productMenu.classList.toggle("active");
    productToggle.classList.toggle("active");
  });

  /* CLOSE MOBILE MENU AFTER CLICKING LINK */

  const mobileLinks = document.querySelectorAll(
    ".mobile-menu-link, .mobile-product-menu a, .mobile-order-btn",
  );

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");

      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");
  const dots = document.querySelectorAll(".hero-dot");

  let currentSlide = 0;
  let autoSlide;

  /* SHOW SLIDE */

  function showSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  /* NEXT SLIDE */

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  /* PREVIOUS SLIDE */

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  /* NEXT BUTTON */

  nextBtn.addEventListener("click", function () {
    nextSlide();

    resetAutoSlide();
  });

  /* PREVIOUS BUTTON */

  prevBtn.addEventListener("click", function () {
    prevSlide();

    resetAutoSlide();
  });

  /* DOT CLICK */

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);

      resetAutoSlide();
    });
  });

  /* AUTO SLIDER */

  function startAutoSlide() {
    autoSlide = setInterval(function () {
      nextSlide();
    }, 3000);
  }

  /* RESET AUTO SLIDER */

  function resetAutoSlide() {
    clearInterval(autoSlide);

    startAutoSlide();
  }

  /* START */

  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
  const products = Array.from(document.querySelectorAll(".product-card"));
  const filterButtons = document.querySelectorAll(".filter-btn");
  const pagination = document.getElementById("productPagination");
  const productsGrid = document.getElementById("productsGrid");
  /* ==========================================
       SETTINGS
    ========================================== */
  const productsPerPage = 8;
  let currentFilter = "all";
  let currentPage = 1;
  /* ==========================================
       FILTER PRODUCTS
    ========================================== */
  function getFilteredProducts() {
    if (currentFilter === "all") {
      return products;
    }
    return products.filter(function (product) {
      return product.dataset.category === currentFilter;
    });
  }
  /* ==========================================
       SHOW PRODUCTS
    ========================================== */
  function showProducts() {
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    /* Fix page if filter has fewer products */
    if (currentPage > totalPages) {
      currentPage = 1;
    }
    /* Hide all products */
    products.forEach(function (product) {
      product.style.display = "none";
    });
    /* Calculate start/end */
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    /* Show current page products */
    filteredProducts.slice(start, end).forEach(function (product) {
      product.style.display = "block";
      /* Restart animation */
      product.style.animation = "none";
      product.offsetHeight;
      product.style.animation = "productFade 0.5s ease";
    });
    createPagination(totalPages);
  }
  /* ==========================================
       CREATE PAGINATION
    ========================================== */
  function createPagination(totalPages) {
    pagination.innerHTML = "";
    /* Don't show pagination if only one page */
    if (totalPages <= 1) {
      return;
    }
    /* PREVIOUS */
    if (currentPage > 1) {
      const prev = document.createElement("button");
      prev.className = "pagination-btn";
      prev.innerHTML = '<i class="fa fa-angle-left"></i>';
      prev.addEventListener("click", function () {
        currentPage--;
        showProducts();
        scrollToProducts();
      });
      pagination.appendChild(prev);
    }
    /* PAGE NUMBERS */
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.className = "pagination-btn";
      if (i === currentPage) {
        button.classList.add("active");
      }
      button.textContent = i;
      button.addEventListener("click", function () {
        currentPage = i;
        showProducts();
        scrollToProducts();
      });
      pagination.appendChild(button);
    }
    /* NEXT */
    if (currentPage < totalPages) {
      const next = document.createElement("button");
      next.className = "pagination-btn";
      next.innerHTML = '<i class="fa fa-angle-right"></i>';
      next.addEventListener("click", function () {
        currentPage++;
        showProducts();
        scrollToProducts();
      });
      pagination.appendChild(next);
    }
  }
  /* ==========================================
       FILTER BUTTON CLICK
    ========================================== */
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      /* Remove active */
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      /* Add active */
      this.classList.add("active");
      /* Set filter */
      currentFilter = this.dataset.filter;
      /* Reset page */
      currentPage = 1;
      /* Display products */
      showProducts();
    });
  });
  /* ==========================================
       SCROLL TO PRODUCTS
    ========================================== */
  function scrollToProducts() {
    productsGrid.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  /* ==========================================
       INITIAL LOAD
    ========================================== */
  showProducts();
});


function slideProducts(sliderId, direction) {
    const slider =
        document.getElementById(sliderId);
    if (!slider) return;
    const card =
        slider.querySelector(".product-card");
    if (!card) return;
    const cardWidth =
        card.offsetWidth;
    const gap =
        parseInt(
            window.getComputedStyle(slider).gap
        ) || 0;
    const scrollAmount =
        cardWidth + gap;
    slider.scrollBy({
        left:
            direction *
            scrollAmount,
        behavior: "smooth"
    });
}
/* ==========================================
   TOUCH / MOUSE DRAG SUPPORT
========================================== */
document.querySelectorAll(
    ".product-slider"
).forEach(function (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener(
        "mousedown",
        function (e) {
            isDown = true;
            slider.classList.add(
                "is-dragging"
            );
            startX = e.pageX -
                slider.offsetLeft;
            scrollLeft =
                slider.scrollLeft;
        }
    );
    slider.addEventListener(
        "mouseleave",
        function () {
            isDown = false;
            slider.classList.remove(
                "is-dragging"
            );
        }
    );
    slider.addEventListener(
        "mouseup",
        function () {
            isDown = false;
            slider.classList.remove(
                "is-dragging"
            );
        }
    );
    slider.addEventListener(
        "mousemove",
        function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x =
                e.pageX -
                slider.offsetLeft;
            const walk =
                (x - startX) * 1.5;
            slider.scrollLeft =
                scrollLeft - walk;
        }
    );
});



function moveShowcase(sliderId, direction) {
    const slider =
        document.getElementById(sliderId);
    if (!slider) return;
    const card =
        slider.querySelector(
            ".showcase-product-card"
        );
    if (!card) return;
    const gap =
        parseInt(
            window.getComputedStyle(slider).gap
        ) || 0;
    const scrollAmount =
        card.offsetWidth + gap;
    slider.scrollBy({
        left:
            scrollAmount *
            direction,
        behavior: "smooth"
    });
}
/* ==========================================
   DRAG TO SLIDE
========================================== */
document.querySelectorAll(
    ".showcase-products"
).forEach(function (slider) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    slider.addEventListener(
        "mousedown",
        function (e) {
            isDown = true;
            startX =
                e.pageX -
                slider.offsetLeft;
            startScroll =
                slider.scrollLeft;
            slider.style.cursor =
                "grabbing";
        }
    );
    slider.addEventListener(
        "mousemove",
        function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x =
                e.pageX -
                slider.offsetLeft;
            const distance =
                (x - startX) * 1.3;
            slider.scrollLeft =
                startScroll -
                distance;
        }
    );
    ["mouseup", "mouseleave"].forEach(
        function (event) {
            slider.addEventListener(
                event,
                function () {
                    isDown = false;
                    slider.style.cursor =
                        "grab";
                }
            );
        }
    );
});