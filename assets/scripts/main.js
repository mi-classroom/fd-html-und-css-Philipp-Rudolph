// submenu active class toggle

const submenuItems = document.querySelectorAll(".submenu li");

submenuItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove "active" class from all submenu items
    document.querySelectorAll(".submenu").forEach((submenu) => {
      submenu.classList.remove("active");
    });

    // Add "active" class to the clicked submenu item
    item.classList.add("active");
  });
});

// burger icon toggle

const burgerIcon = document.querySelector("[data-js-menu-trigger]");
const asideMenu = document.querySelector("[data-js-side-menu]");
const body = document.querySelector("body");

burgerIcon.addEventListener("click", function () {
  asideMenu.classList.toggle("is-active");
  body.classList.toggle("no-scroll");
});
