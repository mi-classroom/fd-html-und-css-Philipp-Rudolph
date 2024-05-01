document.addEventListener("DOMContentLoaded", function () {
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
  const bodyElement = document.querySelector("body");
  const mainMenuTrigger = document.querySelector(".main-menu-trigger");

  burgerIcon.addEventListener("click", function () {
    asideMenu.classList.toggle("is-active");
    bodyElement.classList.toggle("no-scroll");
    mainMenuTrigger.classList.toggle("is-active");
  });

  // tab navigation
  const tabNav = document.querySelectorAll("[data-js-tab-nav] li");
  tabNav.forEach((tab) => {
    tab.addEventListener("click", handleTabNavClick);
  });
  function handleTabNavClick(event) {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    const tabID = currentTarget.children[0].getAttribute("href");
    const currentTabSelection = document.querySelector(tabID);

    currentTabSelection.classList.add("is-active");
    tabNav.forEach((tab) => {
      if (tab !== currentTarget) {
        const tabID = tab.children[0].getAttribute("href");
        const tabSelection = document.querySelector(tabID);
        tabSelection.classList.remove("is-active");
      }
    });
  }
});
