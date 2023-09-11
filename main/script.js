// select mobile manu
let manu = document.querySelector(".header__left ul");
let manuIcon = document.querySelector(".svgs");
const overlay = document.querySelector(".overlay");
manuIcon.onclick = function () {
  manu.classList.toggle("active");
  overlay.classList.toggle("on");
};
// select cart manu
let cart = document.querySelector(".cart");
let cartSVG = document.querySelector(".header__right div");

cartSVG.onclick = function () {
  cart.classList.toggle("active");
};

// select count of the product
let add = document.querySelector(".add");
let remove = document.querySelector(".remove");
let count = document.querySelector(".count");
let btn = document.querySelector(".checkout button");
let cartBtn = document.querySelector(".cart button");

// assigning the value of the count to cart value

let cartValue = document.querySelector(".cart__value");
let totalPrice = document.querySelector(".total__price");
let cartContent = document.querySelector(".cart__content");
let productFound = document.querySelector(".cart__content > div");
let productNotFound = document.querySelector(".empty");

// select alert of the count
let alertCount = document.querySelector(".alert__count");
let clearCart = document.querySelector(".delete");

add.onclick = function () {
  count.innerHTML++;
  btn.style.opacity = "1";
};
remove.onclick = function () {
  if (count.innerHTML > 0) {
    count.innerHTML--;
  }
};
if (window.localStorage.getItem("amount")) {
  addAmount(window.localStorage.getItem("amount"));
}

btn.addEventListener("click", () => {
  addAmount(count.textContent);
  // Adding it to localStorage to save user settings
  window.localStorage.setItem("amount", count.innerHTML);
});
// function to adding amount of product to the cart
function addAmount(value) {
  productFound.style.display = "flex";
  productNotFound.style.display = "none";
  alertCount.style.display = "block";
  cartBtn.style.display = "block";
  alertCount.textContent = value;
  cartValue.innerHTML = value;
  cartValue.innerHTML = value;
  totalPrice.textContent = `$${125 * value}`;
  if (value == 0) {
    cartContent.style.fontWeight = "700";
    productFound.style.display = "none";
    alertCount.style.display = "none";
    cartBtn.style.display = "none";
    productNotFound.style.display = "block";
  }
}
clearCart.addEventListener("click", () => {
  productNotFound.style.display = "block";
  productFound.style.display = "none";
  alertCount.style.display = "none";
  cartBtn.style.display = "none";
  window.localStorage.removeItem("amount");
});

//remove cart when click outside it on the window
window.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cart__btn")) {
    if (cart.classList.contains("active")) {
      cart.classList.remove("active");
    }
  }
});

cart.addEventListener("click", (e) => e.stopPropagation());

// filp product photos on mobile and on lightbox
let productImg = document.querySelectorAll(".product__pic > img");
let nextImg = document.querySelector(".next__img");
let previousImg = document.querySelector(".previous__img");
let increment = 2;
let decrement = 4;
nextImg.onclick = () => {
  productImg[0].src = `images/image-product-${
    increment < 5 ? increment++ : (increment = 1)
  }.jpg`;
};
previousImg.onclick = () => {
  productImg[0].src = `images/image-product-${
    decrement > 0 ? decrement-- : (decrement = 4)
  }.jpg`;
};
// change product photo on click on any thumbnails
let allPic = document.querySelectorAll(".thumbnails img");

allPic.forEach((e) => {
  e.onclick = () => {
    let splImg = e.src.split("");
    splImg.splice(90, 10);
    if (lightbox.classList.contains("active")) {
      productImg[1].src = splImg.join("");
    } else {
      productImg[0].src = splImg.join("");
    }
    allPic.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  };
});
//lightbox
let lightbox = document.querySelector(".lightbox");
let allPicLB = document.querySelectorAll(".lightbox .thumbnails img");
let nextImgLB = document.querySelector(".lightbox .next__img");
let previousImgLB = document.querySelector(".lightbox .previous__img");
if (window.matchMedia("(min-width: 768px)").matches) {
  productImg[0].onclick = () => {
    lightbox.classList.add("active");
    overlay.classList.add("on");
    productImg[1].src = productImg[0].src;
    nextImgLB.onclick = () => {
      productImg[1].src = `images/image-product-${
        increment < 5 ? increment++ : (increment = 1)
      }.jpg`;
      checkImg();
    };
    previousImgLB.onclick = () => {
      productImg[1].src = `images/image-product-${
        decrement > 0 ? decrement-- : (decrement = 4)
      }.jpg`;
      checkImg();
    };
  };
}
// close lightbox onclick on the close btn
let closeBtn = document.querySelector(".lightbox button");
closeBtn.onclick = function () {
  overlay.classList.remove("on");
  lightbox.classList.remove("active");
};

//remove lightbox when click outside it on the window
window.addEventListener("click", (e) => {
  if (e.target != productImg[0]) {
    if (lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      overlay.classList.remove("on");
    }
  }
});
lightbox.addEventListener("click", (e) => e.stopPropagation());

function checkImg() {
  allPicLB.forEach((e) => {
    let splImg = e.src.split("");
    splImg.splice(90, 10);
    if (productImg[1].src == splImg.join("")) {
      allPic.forEach((e) => {
        e.classList.remove("active");
      });
      e.classList.add("active");
    }
  });
}
