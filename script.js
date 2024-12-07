const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const addToCartBtn = document.querySelector('.add-to-cart-btn'); 
const openModal = document.querySelector('.open-modal');
const decreaseQuantity = document.querySelector('.decrease-quantity');
const increaseQuantity = document.querySelector('.increase-quantity');
const showQuantity = document.querySelector('.quantity');
const cartContainer = document.querySelector('.cart-container');
const cartBtn = document.querySelector('.cart-icon');
const cartIconCounter = document.querySelector('.cart-icon-counter');
const productImg = document.querySelectorAll('.product-img');
const prevIcon = document.querySelector('.prev-icon');
const nextIcon = document.querySelector('.next-icon');
const avatarIcon = document.querySelector('.avatar-icon'); 
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const modalGallery = document.getElementById('modal-gallery');
const modalMainImage = document.getElementById('modal-main-image');
const closeModal = document.querySelector('.close-modal');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const modalThumbnails = document.querySelectorAll('.modal-thumbnail');


let quantity = 0;
const price = 125.00;
let currentIndex = 0;

avatarIcon.addEventListener('click', () => {
  avatarIcon.classList.toggle('active');
});

// Menu toggling
menuIcon.addEventListener('click', () => {
  navLinks.classList.add('active');
  openModal.classList.add('show');
});

closeIcon.addEventListener('click', () => {
  navLinks.classList.remove('active');
  openModal.classList.remove('show');
});

// Quantity adjustments
increaseQuantity.addEventListener('click', () => {
  quantity++;
  showQuantity.textContent = quantity;
});

decreaseQuantity.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    showQuantity.textContent = quantity;
  }
});

// Add to cart functionality
addToCartBtn.addEventListener('click', () => {
  if (quantity > 0) {
    const totalPrice = (quantity * price).toFixed(2);
    cartContainer.innerHTML = `
      <h3>Cart</h3>
      <div class="cart-item">
        <div class="cart-item-details">
          <img class="small-product-img" src="./images/image-product-1.jpg" alt="Small product img" />
          <div class="item-details">
            <p class="item-name">Fall Limited Edition Sneakers</p>
            <div class="item-price">
              <p>$${price}</p>
              <p class="quantity">x ${quantity}</p>
              <p class="total">$${totalPrice}</p>
            </div>
          </div>
        </div>
        <img class="delete-icon" src="./images/icon-delete.svg" alt="Delete from cart" />
      </div>
      <h3 class="checkout">Checkout</h3>
    `;
    cartContainer.classList.add('show');
    cartIconCounter.textContent = quantity;
    cartIconCounter.style.visibility = 'visible'; // Show cart counter
  } else {
    cartContainer.innerHTML = `
      <h3>Cart</h3>
      <p class="empty-cart">Your cart is empty</p>
    `;
    cartContainer.classList.remove('show');
    cartIconCounter.style.display = 'none'; // Hide cart counter when empty
  }
});

// Cart toggling
cartBtn.addEventListener('click', () => {
  if (quantity === 0) {
    cartContainer.innerHTML = `
      <h3>Cart</h3>
      <p class="empty-cart">Your cart is empty</p>
    `;
  }
  cartContainer.classList.toggle('show');
});

// Delete item from cart
cartContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-icon')) {
    quantity = 0;
    showQuantity.textContent = quantity;
    cartContainer.innerHTML = `
      <h3>Cart</h3>
      <p>Your cart is empty</p>
    `;
    cartContainer.classList.remove('show');
    cartIconCounter.textContent = '';
    cartIconCounter.style.display = 'none'; 
  }
});

// Product image carousel
const productImages = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg',
];

function showImage(indexChange) {
  currentIndex += indexChange;

  if (currentIndex < 0) {
    currentIndex = productImages.length - 1;
  } else if (currentIndex >= productImages.length) {
    currentIndex = 0;
  }

  mainImage.src = productImages[currentIndex];
}

// Carousel controls
prevIcon.addEventListener('click', () => {
  showImage(-1);
});

nextIcon.addEventListener('click', () => {
  showImage(1);
});

showImage(0); //

// Thumbnail click event
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
	  thumbnails.forEach(t => t.classList.remove('active'))
    const largeImage = thumbnail.getAttribute('data-large');
    mainImage.src = largeImage;
	thumbnail.classList.add('active');
  });
});

let modalCurrentIndex = 0;
const modalImages = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg',
];

// Open the modal gallery when clicking the main image
mainImage.addEventListener('click', () => {
  modalGallery.style.display = 'flex';
  modalMainImage.src = modalImages[modalCurrentIndex];
});

// Close the modal
closeModal.addEventListener('click', () => {
  modalGallery.style.display = 'none';
});

// Function to show modal image based on index
function showModalImage(indexChange) {
  modalCurrentIndex += indexChange;

  if (modalCurrentIndex < 0) {
    modalCurrentIndex = modalImages.length - 1;
  } else if (modalCurrentIndex >= modalImages.length) {
    modalCurrentIndex = 0;
  }

  modalMainImage.src = modalImages[modalCurrentIndex];
}

// Navigate through the modal gallery with arrows
modalPrev.addEventListener('click', () => {
  showModalImage(-1);
});

modalNext.addEventListener('click', () => {
  showModalImage(1);
});

// Handle thumbnail clicks inside the modal
modalThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
	  modalThumbnails.forEach(t => t.classList.remove('active'))
    modalMainImage.src = thumbnail.getAttribute('data-large')
	thumbnail.classList.add('active');
    modalCurrentIndex = index;
  });
});