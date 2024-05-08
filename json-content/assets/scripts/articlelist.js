"use strict";
const articleListURL =
  "https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json";

let currentData = null;

// wait for the DOM to be fully loaded

document.addEventListener("DOMContentLoaded", function () {
  initArticleList();
});

/*  inits
######################################################################################### 
*/

// initialize the article list

function initArticleList() {
  const responsePromise = fetch(articleListURL);
  responsePromise.then(function (response) {
    const dataPromise = response.json();
    dataPromise.then(function (data) {
      currentData = data;
      renderArticleListe(data.articles);
      // initFilterButtons(data.articles);
      initFilters();
    });
  });
}

function initFilters() {
  const keywordsSection = document.querySelector(
    '[data-js-category="keywords"]'
  );

  // keyword tags
  createTagButtons("keywords");
  // file format tags
  createTagButtons("fileFormat");
  // modules tags
  createTagButtons("modules");
  // project phase tags
  createTagButtons("projectphase");

  const filterButtons = document.querySelectorAll("[data-js-filter]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const filter = e.currentTarget.getAttribute("data-js-filter");
      filterArticles(filter);
    });
  });

  resetFilters();
}

function createTagButtons(category) {
  const section = document.querySelector(`[data-js-category="${category}"]`);

  const tags = currentData.articles
    .map((article) => article.tags[category])
    .flat();

  const uniqueTags = tags.filter((item, index) => {
    return tags.indexOf(item) === index;
  });

  section.innerHTML = uniqueTags
    .map((tag) => {
      return `<button data-js-filter="${tag}" class="button button-primary">${tag}</button>`;
    })
    .join("");
}

// reset the filters

function resetFilters() {
  const resetButton = document.querySelector("[data-js-reset-filter]");
  resetButton.addEventListener("click", () => {
    initArticleList();
  });
}

/* renderings
######################################################################################### 
*/

// filter the articles by the given filter

function filterArticles(filter) {
  const filteredArticles = currentData.articles.filter((article) => {
    return Object.values(article.tags).some((tag) => tag.includes(filter));
  });
  renderArticleListe(filteredArticles);
}

// render the article list

function renderArticleListe(articles) {
  const articleListElement = document.querySelector(
    "[data-js-generate-articlelist]"
  );

  const cards = articles.map((article) => {
    // create the card elements
    const cardElement = document.createElement("li");
    cardElement.classList.add("card");

    // create the figure & image element
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = `./images/${article.teaserImg}`;
    img.alt = article.title;

    // create the figcaption element
    const figCaption = document.createElement("figcaption");
    const h3 = document.createElement("h3");
    h3.textContent = article.title;
    const address = document.createElement("address");
    address.textContent = article.author;

    // create the tags list
    const ul = document.createElement("ul");
    ul.classList.add("tag-list");
    const fileFormatTags = article.tags.fileFormat.map((tag) => {
      const li = document.createElement("li");
      li.classList.add("tag");
      li.textContent = tag;
      // add data attribute to li
      li.setAttribute("data-js-filter", tag);
      return li;
    });
    const keywordsTags = article.tags.keywords.map((tag) => {
      const li = document.createElement("li");
      li.classList.add("tag");
      li.textContent = tag;
      // add data attribute to li
      li.setAttribute("data-js-filter", tag);
      return li;
    });
    const modulesTags = article.tags.modules.map((tag) => {
      const li = document.createElement("li");
      li.classList.add("tag");
      li.textContent = tag;
      // add data attribute to li
      li.setAttribute("data-js-filter", tag);
      return li;
    });
    const projectphaseTags = article.tags.projectphase.map((tag) => {
      const li = document.createElement("li");
      li.classList.add("tag");
      li.textContent = tag;
      // add data attribute to li
      li.setAttribute("data-js-filter", tag);
      return li;
    });

    // append the elements
    ul.append(
      ...fileFormatTags,
      ...keywordsTags,
      ...modulesTags,
      ...projectphaseTags
    );
    figCaption.append(h3, address, ul);
    figure.append(img, figCaption);
    cardElement.append(figure);

    return cardElement;
  });

  // clear the article list and append the new cards
  articleListElement.innerHTML = "";
  articleListElement.append(...cards);

  // const cards = articles
  //   .map((article) => {
  //     return `
  //       <li class="card">
  //         <figure>
  //           <img src="./images/${article.teaserImg}" alt="${article.title}" />
  //           <figcaption>
  //             <h3>${article.title}</h3>
  //             <address>${article.author}</address>
  //             <ul class="tag-list">
  //               ${article.tags.fileFormat
  //                 .map((tag) => `<li class="tag">${tag}</li>`)
  //                 .join("")}
  //               ${article.tags.keywords
  //                 .map((tag) => `<li class="tag">${tag}</li>`)
  //                 .join("")}
  //               ${article.tags.modules
  //                 .map((tag) => `<li class="tag">${tag}</li>`)
  //                 .join("")}
  //               ${article.tags.projectphase
  //                 .map((tag) => `<li class="tag">${tag}</li>`)
  //                 .join("")}
  //             </ul>
  //           </figcaption>
  //         </figure>
  //       </li>`;
  //   })
  //   .join("");
  // articleListElement.innerHTML = cards;
}
