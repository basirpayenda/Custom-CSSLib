/*********************** navbar ***********************/
/*  navbar variables */
let links = document.querySelectorAll("nav ul li a:not(:only-child)");
let burger = document.querySelector(".nav_toggler");
let dropdown_btns = document.querySelectorAll(".dropdown_btn");

/* Hamburger to X toggle and toggle navbar */
burger.addEventListener("click", e => {
  document.querySelector(".navbar_list").classList.toggle("toggle_navbar");
  e.currentTarget.classList.toggle("active");
});

/*  If a link has a dropdown, add sub menu toggle */
dropdown_btns.forEach(link => {
  link.addEventListener("click", e => {
    e.currentTarget.childNodes[1].classList.toggle("fa-caret-up");
    const ownDropdown = e.currentTarget.nextElementSibling;
    ownDropdown.classList.toggle("show_dropdown");

    document.querySelectorAll(".dropdown_btn + .dropdown_list").forEach(el => {
      if (el !== ownDropdown) {
        el.classList.remove("show_dropdown");
        el.previousElementSibling.childNodes[1].classList.remove("fa-caret-up");
      }
    });
  });
});

/*  Clicking away from dropdown will remove the dropdown class */
window.onclick = function(e) {
  if (!e.target.matches(".dropdown_btn")) {
    var dropdowns = document.getElementsByClassName("dropdown_list");
    for (i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains("show_dropdown")) {
        dropdowns[i].previousElementSibling.childNodes[1].classList.remove(
          "fa-caret-up"
        );
        dropdowns[i].classList.remove("show_dropdown");
      }
    }
  }
};

/*********************** messages ***********************/
let close_btn = [...document.getElementsByClassName("close")];

close_btn.forEach(close => {
  close.addEventListener("click", function() {
    let parent_elem = this.parentElement;
    parent_elem.style.opacity = 0;
    setTimeout(function() {
      parent_elem.style.display = "none";
    }, 500);
  });
});

/************************* carousel **************************/
const carousel_slide = document.querySelector(".carousel-inner");
const carousel_images = document.querySelectorAll(".slide-item");

const dots = document.querySelector(".dots");
const dot = document.querySelectorAll(".dot");

const prev_btn = document.querySelector("#prevBtn");
const next_btn = document.querySelector("#nextBtn");

// vars
let counter = 0;
let size;

/* initial configuration upon opening the carousel in browser */
size = carousel_images[0].clientWidth;
carousel_slide.style.transform = `translateX(${-size}px)`;

/* updating `size` variable when resizing browser */
window.addEventListener("resize", () => {
  size = carousel_images[0].clientWidth;
  carousel_slide.style.transform = `translateX(${-size}px)`;
});

/* cloning first and last slide for smooth transition between first and last slide */
carousel_slide.insertAdjacentHTML(
  "afterbegin",
  carousel_images[carousel_images.length - 1].outerHTML
);
carousel_slide.insertAdjacentHTML("beforeend", carousel_images[0].outerHTML);

/* adding logic to next button */
next_btn.addEventListener("click", () => {
  carousel_slide.style.transition = "all 0.3s ease-in-out";
  dot.forEach(e => e.classList.remove("active"));
  counter++;
  carousel_slide.style.transform = `translateX(${-size * (counter + 1)}px)`;
  if (counter >= carousel_images.length) {
    setTimeout(() => {
      counter = 0;
      dot[counter].classList.add("active");
      carousel_slide.style.transition = "none";
      carousel_slide.style.transform = `translateX(${-size}px)`;
    }, 300);
  } else {
    dot[counter].classList.add("active");
  }
});

/* adding logic to prev button */
prev_btn.addEventListener("click", () => {
  carousel_slide.style.transition = "all 0.3s ease-in-out";
  dot.forEach(e => e.classList.remove("active"));
  counter--;
  carousel_slide.style.transform = `translateX(${-size * (counter + 1)}px)`;
  if (counter < 0) {
    setTimeout(() => {
      counter = carousel_images.length - 1;
      dot[counter].classList.add("active");
      carousel_slide.style.transition = "none";
      carousel_slide.style.transform = `translateX(${-size * (counter + 1)}px)`;
    }, 300);
  } else {
    dot[counter].classList.add("active");
  }
});

/* adding `click` event for carousel indicators */
dot.forEach(function(e, i) {
  e.addEventListener("click", elem => {
    dot.forEach(e => e.classList.remove("active"));
    counter = i;
    dot[counter].classList.add("active");
    carousel_slide.style.transform = `translateX(${-size * (counter + 1)}px)`;
  });
});
