window.addEventListener("DOMContentLoaded", start);

let fetchURL =
  "http://tolloman.com/mmd21ex/wp-json/wp/v2/painting?per_page=100&orderby=title&order=asc&_embed";

const urlParams = new URLSearchParams(window.location.search);
const catid = urlParams.get("catid"); //lacj

function start() {
  getProducts(catid);
  makeBreadCrumb();
}

function makeBreadCrumb() {
  fetch("http://tolloman.com/mmd21ex/wp-json/wp/v2/categories?_fields=name,id")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      handleBreadCrumbs(data);
    });

  function handleBreadCrumbs(data) {
    console.log(data);
    data.forEach(showCate);
  }
}

function showCate(category) {
  //console.log(painting.name);
  const template = document.querySelector(".catetemp").content;
  const copy = template.cloneNode(true);
  copy.querySelector("a.cate-link").textContent = category.name;
  copy
    .querySelector("a.cate-link")
    .setAttribute("href", "product-list.html?catid=" + category.id);
  const parent = document.querySelector(".menu-op");
  parent.appendChild(copy);
}

function getProducts(catid) {
  if (catid) {
    fetchURL += "&categories=" + catid;
  } //lacj
  console.log("hej" + fetchURL);
  fetch(fetchURL)
    .then(function (source) {
      return source.json();
    })
    .then(function (data) {
      productList(data);
    });
}
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
