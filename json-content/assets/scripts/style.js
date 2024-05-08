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
        if (addedNode.classList.contains("button")) {
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
  const tags = document.querySelectorAll(".tag");

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

  /*
    Frage für Vorlesung: warum wird bei tags keine Klasse hinzugefügt?
  */

  tags.forEach((tag) => {
    tag.addEventListener("click", function () {
      buttons.forEach((button) => {
        if (
          button.getAttribute("data-js-filter") ===
          tag.getAttribute("data-js-filter")
        ) {
          console.log(tag);
          button.classList.add("active");
        }
      });
      tag.classList.add("active");
    });
  });

  stylesInitialized = true;
}
