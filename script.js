const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=9");
  const products = await response.json();
  return products;
};

const renderProducts = async () => {
  const products = await getProducts();
  const container = document.querySelector(".products-container");
  for (const item of products) {
    const productWrapper = document.createElement("li");
    const productImage = document.createElement("img");
    const productTitle = document.createElement("h4");
    const productDescription = document.createElement("p");
    const productPriceSection = document.createElement("section");
    const productPrice = document.createElement("span");
    const productBuyButton = document.createElement("button");

    productWrapper.classList.add("product-item");
    productPriceSection.classList.add("product-item-price");
    productImage.src = item.image;
    productTitle.innerText = item.title;
    productDescription.innerText = item.description;
    productPriceSection.innerText = `${item.price}$`;
    productBuyButton.innerText = "Add to card";
    productBuyButton.addEventListener("click", () => {
      addToCard(item);
    });
    productPriceSection.appendChild(productPrice);
    productPriceSection.appendChild(productBuyButton);
    productWrapper.appendChild(productImage);
    productWrapper.appendChild(productTitle);
    productWrapper.appendChild(productDescription);
    productWrapper.appendChild(productPriceSection);

    container.appendChild(productWrapper);
  }
};

const removeProductFromCart = (event) => {
  event.target.parentElement.parentElement.remove();
  const cartListItems = document.getElementsByClassName("cart-list-item");
  updateCartTotal();
  if (!cartListItems.length) {
    const cartListWrapper = document.querySelector(".cart-list-wrapper");
    const emptyCartTitle = document.querySelector(".cart-empty-title");
    cartListWrapper.style.display = "none";
    emptyCartTitle.style.display = "block";
  }
};

const addToCard = (product) => {
  const cartItems = document.getElementsByClassName("cart-list-item");
  for (const item of cartItems) {
    if ((product.id === +item.getAttribute("id"))) {
      const quantityInput = item.querySelector(
        ".cart-list-quantity-section > input"
      );
      quantityInput.value++;
      updateCartTotal();
      return;
    }
  }
  const cart = document.querySelector(".cart-list");
  const emptyCartTitle = document.querySelector(".cart-empty-title");
  const cartListWrapper = document.querySelector(".cart-list-wrapper");

  const cartListItem = document.createElement("li");
  const cartListImgSection = document.createElement("section");
  const cartListPriceSection = document.createElement("section");
  const cartListQuantitySection = document.createElement("section");
  const image = document.createElement("img");
  const title = document.createElement("h4");
  const price = document.createElement("span");
  const quantity = document.createElement("input");
  const removeBtn = document.createElement("button");
  quantity.addEventListener("change", updateCartTotal);
  removeBtn.addEventListener("click", (event) => removeProductFromCart(event));
  cartListItem.classList.add("cart-list-item");
  cartListImgSection.classList.add(
    "cart-list-item-section",
    "cart-list-img-section"
  );
  cartListPriceSection.classList.add(
    "cart-list-item-section",
    "cart-list-price-section"
  );
  cartListQuantitySection.classList.add(
    "cart-list-item-section",
    "cart-list-quantity-section"
  );

  image.src = product.image;
  title.innerText = product.title;
  price.innerText = `${product.price}`;
  quantity.type = "number";
  quantity.value = 1;
  quantity.min = 1;
  removeBtn.innerText = "REMOVE";
  emptyCartTitle.style.display = "none";
  cartListWrapper.style.display = "block";

  cartListImgSection.append(image, title);
  cartListPriceSection.appendChild(price);
  cartListQuantitySection.append(quantity, removeBtn);
  cartListItem.setAttribute("id", product.id);
  cartListItem.append(
    cartListImgSection,
    cartListPriceSection,
    cartListQuantitySection
  );
  cart.appendChild(cartListItem);
  updateCartTotal();
};

const updateCartTotal = () => {
  const totalAmount = document.querySelector(".total-amount > span");
  const cartItems = document.getElementsByClassName("cart-list-item");
  let total = 0;
  for (const item of cartItems) {
    const price = item.querySelector(".cart-list-price-section > span");
    const quantity = item.querySelector(".cart-list-quantity-section > input");
    const currentAmount = parseFloat(price.innerText) * quantity.value;
    total += currentAmount;
  }
  totalAmount.innerText = `${total.toFixed(2)}`;
};

renderProducts();
