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
  const productItems = Array.from(
    document.querySelectorAll(".product-grid .product-item"),
  );

  const filterButtons = document.querySelectorAll(".product-filter");
  const pagination = document.querySelector(".product-pagination");
  const productsSection = document.getElementById("all-products");

  // Ek page par kitne products dikhenge
  const productsPerPage = 8;

  let activeCategory = "all";
  let currentPage = 1;

  // ==========================================
  // GET FILTERED PRODUCTS
  // ==========================================
  function getFilteredProducts() {
    if (activeCategory === "all") {
      return productItems;
    }

    return productItems.filter(function (item) {
      return item.dataset.category === activeCategory;
    });
  }

  // ==========================================
  // UPDATE ACTIVE FILTER BUTTON
  // ==========================================
  function updateActiveFilter() {
    filterButtons.forEach(function (button) {
      const buttonCategory = button.dataset.category;

      button.classList.toggle("active", buttonCategory === activeCategory);
    });
  }

  // ==========================================
  // SHOW PRODUCTS
  // ==========================================
  function showProducts() {
    const filteredProducts = getFilteredProducts();

    // Sabhi products hide karo
    productItems.forEach(function (item) {
      item.style.display = "none";
      item.classList.remove("product-show");
    });

    // Current page ke products
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;

    const productsToShow = filteredProducts.slice(start, end);

    // Products show karo
    productsToShow.forEach(function (item) {
      item.style.display = "";

      // Animation restart
      void item.offsetWidth;

      item.classList.add("product-show");
    });

    // Pagination update
    createPagination(filteredProducts.length);
  }

  // ==========================================
  // CREATE PAGINATION
  // ==========================================
  function createPagination(totalProducts) {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Agar sirf ek page hai
    if (totalPages <= 1) {
      return;
    }

    // PREVIOUS BUTTON
    if (currentPage > 1) {
      const prevButton = document.createElement("button");

      prevButton.className = "pagination-btn";

      prevButton.innerHTML = '<i class="fa fa-angle-left"></i>';

      prevButton.addEventListener("click", function () {
        currentPage--;

        showProducts();

        scrollToProducts();
      });

      pagination.appendChild(prevButton);
    }

    // PAGE NUMBERS
    for (let page = 1; page <= totalPages; page++) {
      const pageButton = document.createElement("button");

      pageButton.className = "pagination-btn";

      pageButton.textContent = page;

      if (page === currentPage) {
        pageButton.classList.add("active");
      }

      pageButton.addEventListener("click", function () {
        currentPage = page;

        showProducts();

        scrollToProducts();
      });

      pagination.appendChild(pageButton);
    }

    // NEXT BUTTON
    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");

      nextButton.className = "pagination-btn";

      nextButton.innerHTML = '<i class="fa fa-angle-right"></i>';

      nextButton.addEventListener("click", function () {
        currentPage++;

        showProducts();

        scrollToProducts();
      });

      pagination.appendChild(nextButton);
    }
  }

  // ==========================================
  // FILTER BUTTON CLICK
  // ==========================================
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      activeCategory = this.dataset.category;

      // Category change hone par first page
      currentPage = 1;

      updateActiveFilter();

      showProducts();

      updateURL(activeCategory);
    });
  });

  // ==========================================
  // UPDATE URL
  // ==========================================
  function updateURL(category) {
    const url = new URL(window.location.href);

    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }

    window.history.replaceState({}, "", url);
  }

  // ==========================================
  // SCROLL TO PRODUCTS
  // ==========================================
  function scrollToProducts() {
    if (!productsSection) {
      return;
    }

    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // ==========================================
  // LOAD CATEGORY FROM URL
  // ==========================================
  function loadCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    // Agar URL me category nahi hai
    if (!category) {
      activeCategory = "all";
      currentPage = 1;

      updateActiveFilter();
      showProducts();

      return;
    }

    // Check karo category exist karti hai ya nahi
    const categoryExists = productItems.some(function (item) {
      return item.dataset.category === category;
    });

    if (categoryExists) {
      activeCategory = category;
    } else {
      activeCategory = "all";
    }

    currentPage = 1;

    updateActiveFilter();
    showProducts();
  }

  // ==========================================
  // INITIAL LOAD
  // ==========================================
  loadCategoryFromURL();
});
