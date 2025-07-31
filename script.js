document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const searchInput = document.querySelector('.search-bar input');
    let products = [];

    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="#" class="btn add-to-cart" data-id="${product.id}">Add to Cart</a>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = event.target.getAttribute('data-id');
                console.log(`Product with ID: ${productId} added to cart.`);
            });
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    async function fetchProducts() {
        productGrid.innerHTML = '<p>Loading products...</p>';
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    // Initial fetch
    fetchProducts();
});