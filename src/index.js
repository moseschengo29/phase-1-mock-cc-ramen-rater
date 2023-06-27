// write your code here
const menu = document.querySelector("#ramen-menu");
const form = document.querySelector("#new-ramen");
const ramenDetails = document.querySelector("#ramen-detail");
const rating = document.querySelector("#rating-display");
const comment = document.querySelector("#comment-display");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const restaurant = e.target.restaurant.value;
  const image = e.target.image.value;
  const rating = e.target.rating.value;
  const comment = e.target.new_comment.value;

  const userInput = {
    name,
    restaurant,
    image,
    rating,
    comment,
  };
  postRamens(userInput);
});

const postRamens = function (obj) {
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

const fetchRamens = function () {
  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then(function (data) {
      data.forEach((element, i) => {
        const img = document.createElement("div");
        img.innerHTML = `
            <img src="${element.image}" alt="Ramen${i}" class="ramen-imgs">
        `;
        img.addEventListener("click", function () {
          fetchRamenDetails(element);
        });
        menu.appendChild(img);
      });
    });
};

fetchRamens();

const fetchRamenDetails = function (ramen) {
  fetch(`http://localhost:3000/ramens/${ramen.id}`)
    .then((res) => res.json())
    .then(function (element) {
      //   console.log(element);
      ramenDetails.innerHTML = `
                <img
        class="detail-image"
        src="${element.image}"
        alt="${element.name}"
      />
      <h2 class="name">${element.name}</h2>
      <h3 class="restaurant">${element.restaraunt}</h3>
        `;
      rating.textContent = `${element.rating}`;
      comment.textContent = `${element.comment}`;
    });
};
