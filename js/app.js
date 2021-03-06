const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  // fetch(url)
  fetch('../js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product mx-3 mb-4">
            <div>
              <img class="product-image" src=${image}></img>
            </div>
            <div class="card-body">
            <h5 class="text-break">${product.title.slice(0,30)}..</h5>
            <p>Category: ${product.category}</p>
            <p class="fw-normal fw-light">Rating: <span class="text-warning">${product.rating.rate} </span class="">( <i class="fas fa-user"></i> ${product.rating.count} )</p>
            <p class="text-warning">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </p>
            <p></p>
            <h4>Price: <span class="text-danger">$ ${product.price}</span></h4>
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn     btn-warning">add to cart</button>
            <button onclick="productDetail() id="details-btn" class="btn btn-secondary">Details</button>
            </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // const converted = parseInt(element); 
  const converted = parseFloat(element); 
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const pds = getInputValue("price")
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
