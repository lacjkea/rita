const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = "http://tolloman.com/mmd21ex/wp-json/wp/v2/painting/" + id;

fetch(url)
  .then((res) => res.json())
  .then((data) => showpaint(data));

function showpaint(painting) {
  //grap the template
  const template = document.querySelector("#painting-temp").content;
  //clont it
  const copy = template.cloneNode(true);
  //???
  copy.querySelector(".img-display-page").src =
    painting._links["wp:featuredmedia"][0].source_url;
  //copy.querySelector(".img-display-page").src = painting.photo[0].guid;
  //bags._links["wp:featuredmedia"][0].href;
  copy.querySelector(".name").textContent = `${painting.title.rendered}`;
  copy.querySelector(".price").textContent = `${painting.price}` + " DDK";
  copy.querySelector(".descripition").textContent = `${painting.description}`;
  //grab parent
  const parent = document.querySelector(".product-list");
  console.log(parent);
  //append
  parent.appendChild(copy);
}
