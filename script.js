async function getProducts() {
  const response = await fetch(`https://dummyjson.com/products`);
  const products = await response.json();

  return products;
}

getProducts().then((products) => {
  products.products.forEach((product) =>
    productList.push({
      name: product.title,
      price: product.price,
      image: product.images,
    })
  );
  productList.forEach((product) => cardFunction(product));

  return;
});

function cardFunction(product) {
  const productContainer = document.querySelector(".product-grid");
  const productElement = document.createElement("div");
  productElement.classList.add("card");
  productElement.innerHTML = `
        <img src="${product["image"][0]}"alt="Product 1" />
        <h3 class="p1">${product["name"]}</h3>
        <p>$${product["price"]}</p>
        <button>Add to Cart</button>      
`;
  productContainer.appendChild(productElement);
}

// for pagination code
const productList = [];
let currentPage = 1;
const productsPerPage = 10;
function displayProducts(page) {
  const productContainer = document.querySelector(".product-grid");
  productContainer.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = productList.slice(start, end);

  paginatedProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("card");
    productElement.innerHTML = `
      <img src="${product.image[0]}" alt="${product.name}" />
      <h3 class="p1">${product.name}</h3>
      <p>$${product.price}</p>
      <button>Add to Cart</button>      
    `;
    productContainer.appendChild(productElement);
  });
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  prevButton.disabled = page === 1;
  nextButton.disabled = end >= productList.length;
}

function setupPagination() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(productList.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(currentPage);
    }
  });
}
getProducts().then((products) => {
  products.products.forEach((product) =>
    productList.push({
      name: product.title,
      price: product.price,
      image: product.images,
    })
  );

  displayProducts(currentPage);
  setupPagination();
});
