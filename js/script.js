document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Typing Effect ---
  const textElement = document.querySelector(".typing");
  if (textElement) {
    const text = "Front-End Developer & Graphic Designer";
    let index = 0;
    textElement.textContent = "";

    function typeEffect() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 120);
      }
    }
    typeEffect();
  }

  // --- 2. Mobile Menu (Fixed Animation & Drawer) ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("is-active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("is-active");
      });
    });
  }

  // --- 3. Theme Toggle (With Memory Sync & Link Color Update) ---
  const themeBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLink = document.querySelector(".links"); // This targets your social/nav links container
function setTheme(theme) {
    const allLinks = document.querySelectorAll(".links"); // Get all links
    
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      
      // Loop through each link and set to light mode
      allLinks.forEach(link => {
        link.classList.add("light");
        link.classList.remove("dark");
      });
      
      if (themeIcon) themeIcon.className = "ri-sun-line";
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      
      // Loop through each link and set to dark mode
      allLinks.forEach(link => {
        link.classList.add("dark");
        link.classList.remove("light");
      });
      
      if (themeIcon) themeIcon.className = "ri-moon-line";
    }
  }

  const initialTheme = localStorage.getItem("portfolio-theme") || "dark";
  setTheme(initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    });
  }

  // --- 4. 3D Tilt Effect (Skills Only) ---
  const cards = document.querySelectorAll(".skill-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      const rotateX = (centerY - y) / 10;
      const rotateY = (x - centerX) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // --- 5. Navigation Control (Scroll & Click Outside) ---
  window.addEventListener("scroll", () => {
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("is-active");
    }
  }, { passive: true });

  document.addEventListener("click", (event) => {
    if (navLinks && menuToggle && navLinks.classList.contains("active")) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnButton = menuToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnButton) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("is-active");
      }
    }
  });
});