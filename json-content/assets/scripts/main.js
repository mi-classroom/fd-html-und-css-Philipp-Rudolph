import {
  initArticleList,
  filterArticles,
  resetFilters,
} from "./articlelist.js";
import { initStyles } from "./style.js";

document.addEventListener("DOMContentLoaded", function () {
  initArticleList();
  filterArticles();
  resetFilters();
  initStyles();
});
