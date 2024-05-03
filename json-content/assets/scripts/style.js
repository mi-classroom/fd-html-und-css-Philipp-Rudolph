document.addEventListener("DOMContentLoaded", function () {
  // wait for article list to be fully loaded
  setTimeout(() => {
    initStyles();
  }, 400);
});

/* 
  Frage für Vorlesung: wie löse ich das Problem, dass die initStyles 
  Funktion mehrfahr (~48 mal) aufgerufen wird, wenn Buttons hinzugefügt werden?
*/

let stylesInitialized = false;

// Function to monitor DOM changes
function monitorDOMChanges() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.classList && addedNode.classList.contains("button")) {
          console.log("Button added");
          stylesInitialized = false;
          if (!stylesInitialized) {
            initStyles();
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

monitorDOMChanges();

function initStyles() {
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

  console.log("Styles initialized");
  stylesInitialized = true;
}
