fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    createUI(data.products);
  })
  .catch((err) => {
    console.log("Error Occurred\n", err);
  });

const main = document.getElementById("root");

function createUI(products) {
  main.innerHTML = ''; 

  products.forEach(product => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}" alt="${product.title}">
      <p>Price: ₹${convertToINR(product.price)}</p>
      <p>Brand: ${product.brand}</p>
      <p>Category: ${product.category}</p>
      <p>Description: ${product.description}</p>
    `;
    main.appendChild(newCard);
  });
}

function searchProducts(e) {
  const searchText = e.target.value;
  fetch(`https://dummyjson.com/products/search?q=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      createUI(data.products);
    })
    .catch((err) => {
      console.log("Error Occurred\n", err);
    });
}

function convertToINR(price) {
  const exchangeRate = 82;
  return (price * exchangeRate).toFixed(2);
}
