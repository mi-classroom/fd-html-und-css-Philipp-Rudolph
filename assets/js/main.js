document.querySelectorAll(".submenu li").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove "active" class from all submenu items
    document.querySelectorAll(".submenu").forEach((submenu) => {
      submenu.classList.remove("active");
    });

    // Add "active" class to the clicked submenu item
    item.classList.add("active");
  });
});
