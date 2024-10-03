document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load cart items from localStorage
    const likeStatus = {};

    // Load cart items into the cart display when the page is loaded
    updateCart();

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const petCard = this.closest('.card');
            const petName = petCard.querySelector('.card-title').textContent;
            
            // Check if pet is already in the cart
            if (!cartItems.includes(petName)) {
                cartItems.push(petName);
                alert(`${petName} added to cart!`);
                localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to localStorage
            } else {
                alert(`${petName} is already in the cart!`);
            }
            
            updateCart(); // Update cart display
        });
    });

    // Like button functionality
    document.querySelectorAll('.like-pet').forEach(button => {
        button.addEventListener('click', function () {
            const petCard = this.closest('.card');
            const petName = petCard.querySelector('.card-title').textContent;

            if (!likeStatus[petName]) {
                this.classList.remove('btn-outline-danger');
                this.classList.add('btn-danger');
                likeStatus[petName] = true;
            } else {
                this.classList.remove('btn-danger');
                this.classList.add('btn-outline-danger');
                likeStatus[petName] = false;
            }
        });
    });

    // Function to update the cart
    function updateCart() {
        const cartElement = document.getElementById('cart-items');
        cartElement.innerHTML = ''; // Clear existing cart items

        if (cartItems.length === 0) {
            cartElement.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('card', 'mb-3');
                cartItem.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${item}</h5>
                        <button class="btn btn-danger remove-from-cart">Remove</button>
                    </div>
                `;

                // Append the cart item to the cart display
                cartElement.appendChild(cartItem);

                // Add functionality to the remove button
                cartItem.querySelector('.remove-from-cart').addEventListener('click', function() {
                    removeFromCart(item); // Call remove function
                });
            });
        }
    }

    // Function to remove item from cart
    function removeFromCart(item) {
        const itemIndex = cartItems.indexOf(item);
        if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1); // Remove item from cart array
            alert(`${item} removed from cart!`);
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
            updateCart(); // Update the cart display
        }
    }
});
