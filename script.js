const products = [
  { id: 1, name: "Wireless Mouse", price: 599, category: "accessories", image: "images/product1.jpg" },
  { id: 2, name: "Keyboard", price: 899, category: "accessories", image: "images/product1.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 1299, category: "audio", image: "images/product1.jpg" }
];

const productContainer = document.getElementById("product-container");

function displayProducts(productsToDisplay) {
  productContainer.innerHTML = "";
  productsToDisplay.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

function filterProducts() {
  const selected = document.getElementById("filter").value;
  const filtered = selected === "all" ? products : products.filter(p => p.category === selected);
  displayProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Banner slider logic
let currentBanner = 0;
let banners;

document.addEventListener("DOMContentLoaded", () => {
  if (productContainer) displayProducts(products);
  banners = document.querySelectorAll('.banner-img');
  showBanner(currentBanner);
  setInterval(nextBanner, 4000);
});

function showBanner(index) {
  if (!banners) return;
  banners.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

function nextBanner() {
  if (!banners) return;
  currentBanner = (currentBanner + 1) % banners.length;
  showBanner(currentBanner);
}

function prevBanner() {
  if (!banners) return;
  currentBanner = (currentBanner - 1 + banners.length) % banners.length;
  showBanner(currentBanner);
}