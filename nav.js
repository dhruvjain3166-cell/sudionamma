let menuToggle = document.getElementById("menuToggle");
let navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  let allLinks = navMenu.querySelectorAll("a");
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });
}

let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") {
  currentPage = "index.html";
}

let navItems = document.querySelectorAll(".nav-menu a");

navItems.forEach((item) => {
  let itemPage = item.getAttribute("href");
  if (itemPage === currentPage) {
    item.classList.add("active");
  }
});

let navbar = document.getElementById("navbar");
let progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  if (progressBar) {
    let scrollTop = window.scrollY;
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }
});

let themeSwitch = document.getElementById("themeSwitch");
let savedTheme = localStorage.getItem("studioTheme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeSwitch) {
    themeSwitch.textContent = "☀️";
  }
} else {
  document.documentElement.setAttribute("data-theme", "light");
  if (themeSwitch) {
    themeSwitch.textContent = "🌙";
  }
}

if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("studioTheme", "light");
      themeSwitch.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("studioTheme", "dark");
      themeSwitch.textContent = "☀️";
    }
  });
}

let revealItems = document.querySelectorAll(".animate");

let revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting === true) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

let fadeItems = document.querySelectorAll(".reveal-up");

fadeItems.forEach((item, index) => {
  let delayInGroup = index % 4;
  item.style.setProperty("--reveal-delay", (delayInGroup * 0.12) + "s");
});

let fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting === true) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

fadeItems.forEach((item) => {
  fadeObserver.observe(item);
});

let pointer = document.getElementById("pointer");

if (pointer) {
  document.addEventListener("mousemove", (e) => {
    pointer.style.left = e.clientX + "px";
    pointer.style.top = e.clientY + "px";
    pointer.style.transform = "translate(-50%, -50%)";
  });

  document.addEventListener("mouseleave", () => {
    pointer.style.transform = "translate(150%, 150%)";
  });

  let hoverTargets = document.querySelectorAll("a, button, .card, .listing-item, input, textarea");

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      pointer.classList.add("pointer-expand");
    });
    target.addEventListener("mouseleave", () => {
      pointer.classList.remove("pointer-expand");
    });
  });
}
