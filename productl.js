const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("name");

fetch("http://tolloman.com/mmd21ex/wp-json/wp/v2/categories?_fields=name")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleBreadCrumbs(data);
  });

function handleBreadCrumbs(data) {
  // console.log(data);
  data.forEach(showCate);
}

function showCate(painting) {
  console.log(painting.name);
  const template = document.querySelector(".catetemp").content;
  const copy = template.cloneNode(true);
  copy.querySelector("a.cate-link").textContent = painting.name;
  copy
    .querySelector("a.cate-link")
    .setAttribute("href", "productp.html?_fields=" + painting.name);
  const parent = document.querySelector(".menu-op");
  parent.appendChild(copy);
}
// filtering
window.addEventListener("DOMContentLoaded", init);

function init() {
  const allbtns = document.querySelectorAll(".cate-like");
  allbtns.forEach((btn) => {
    //console.log(btn);
    btn.addEventListener("click", changeUrl);
  });
}
function changeUrl(event) {
  event.preventDefault();
  const filter = event.target.dataset.painting.name;
  //console.log(filter);
  location.href = "productp.html?_fields=" + filter;
}

fetch(
  "http://tolloman.com/mmd21ex/wp-json/wp/v2/painting?per_page=100&orderby=title&order=asc&_embed"
)
  .then(function (source) {
    return source.json();
  })
  .then(function (data) {
    productList(data);
  });

function productList(data) {
  //console.log(data);
  data.forEach(showpaint);
}

function showpaint(painting) {
  //console.log(bags);
  //grap the template
  const template = document.querySelector("#painting-temp").content;
  //clont it
  const copy = template.cloneNode(true);
  //change the content
  copy.querySelector(".img-display").src =
    painting._embedded[
      "wp:featuredmedia"
    ][0].media_details.sizes.medium.source_url;
  copy.querySelector(".name").textContent = `${painting.title.rendered}`;
  copy.querySelector(".price").textContent = `${painting.price}` + " DDK";
  copy
    .querySelector("a")
    .setAttribute("href", "product-page.html?id=" + painting.id);
  //grab parent
  const parent = document.querySelector(".product-list");
  //append
  parent.appendChild(copy);
}
//window.addEventListener("load", startmain);
