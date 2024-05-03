document.addEventListener("DOMContentLoaded", function () {
  // wait for article list to be fully loaded
  setTimeout(() => {
    initStyles();
  }, 100);
});

function initStyles() {
  // set timeout 10 s

  const buttons = document.querySelectorAll(".button");
  const resetButton = document.querySelector("[data-js-reset-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      if (button !== resetButton) {
        button.classList.add("active");
      }
    });
  });
}
