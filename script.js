

const productList = [];

async function getProducts(){
  const response = await fetch(`https://dummyjson.com/products`);
  const products = await response.json();

 return products;
}
  
getProducts().then(products => {
  products.products.forEach(product => productList.push({ name: product.title, price: product.price, image: product.images }));
productList.forEach((product) => cardFunction(product));

  return;
})

function cardFunction(product){
const productContainer = document.querySelector(".product-grid");
const productElement = document.createElement("div");
productElement.classList.add("card");
productElement.innerHTML =
    `
        <img src="${product["image"][0]}"alt="Product 1" />
        <h3 class="p1">${product["name"]}</h3>
        <p>$${product["price"]}</p>
        <button>Add to Cart</button>      
`;
productContainer.appendChild(productElement);
}

