 // Products data
        const products = [
            { id: 1, name: "iPhone 15 Pro", category: "smartphone", price: 1299, image :"./Assets/iphone-15pro.jpg" },
            { id: 2, name: "MacBook Pro M3", category: "laptop", price: 2399, image:"./Assets/macbookm3pro.jpeg" },
            { id: 3, name: "AirPods Pro", category: "headphones", price: 249, image:"./Assets/Airpods-pro.jpg" },
            { id: 4, name: "Apple Watch Ultra", category: "smartwatch", price: 799, image:"./Assets/applewatch.jpg" },
            { id: 5, name: "Canon EOS R5", category: "camera", price: 3899, image:"./Assets/canon eosr5.jpg" },
            { id: 6, name: "Samsung Galaxy S24", category: "smartphone", price: 999, image:"./Assets/samsung24.jpg" },
            { id: 7, name: "Dell XPS 13", category: "laptop", price: 1199, image:"./Assets/dellxps13.jpg" },
            { id: 8, name: "Sony WH-1000XM5", category: "headphones", price: 399, image:"./Assets/Sony WH-1000XM5.jpg" },
            { id: 9, name: "Garmin Forerunner", category: "smartwatch", price: 449, image:"./Assets/Garmin Forerunner.jpg" },
            { id: 10, name: "Sony A7 IV", category: "camera", price: 2498, image:"./Assets/Sony A7 IV.webp" },
            { id: 11, name: "Google Pixel 8", category: "smartphone", price: 699, image:"./Assets/Google Pixel 8.jpg" },
            { id: 12, name: "ASUS ROG Laptop", category: "laptop", price: 1599, image:"./Assets/ASUS ROG Laptop.jpg" },
            { id: 13, name: "Bose QuietComfort", category: "headphones", price: 329, image:"./Assets/Bose QuietComfort.jpg" },
            { id: 14, name: "Samsung Watch 6", category: "smartwatch", price: 329, image:"./Assets/Samsung Watch 6.jpg" },
            { id: 15, name: "Fujifilm X-T5", category: "camera", price: 1699, image:"./Assets/Fujifilm X-T5.jpg" },
            { id: 16, name: "OnePlus 12", category: "smartphone", price: 899, image:"./Assets/OnePlus 12.jpg" },
            { id: 17, name: "HP Spectre x360", category: "laptop", price: 1349, image:"./Assets/HP Spectre x360.webp" },
            { id: 18, name: "Sennheiser HD 660S", category: "headphones", price: 499, image:"./Assets/Sennheiser HD 660S.jpg" },
            { id: 19, name: "Fitbit Sense 2", category: "smartwatch", price: 299, image:"./Assets/Fitbit Sense 2.jpg" },
            { id: 20, name: "Nikon Z9", category: "camera", price: 5499, image:"./Assets/Nikon Z9.jpg" }
        ];

        let cart = [];
        let currentFilter = 'all';

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderFeaturedProducts();
            updateCartCount();
            
            // Add scroll effect to navbar
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                }
            });
        });

        // Render featured products on home page (first 6 products)
        function renderFeaturedProducts() {
            const grid = document.getElementById('featuredGrid');
            const featuredProducts = products.slice(0, 6); // Show first 6 products
            
            grid.innerHTML = '';
            
            featuredProducts.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style.animationDelay = `${index * 0.1}s`;
                
                productCard.innerHTML = `
                    <div class="product-image">
    <img src="${product.image}" alt="${product.name}" />
  </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                `;
                
                grid.appendChild(productCard);
            });
        }

        // Render products
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            const filteredProducts = currentFilter === 'all' ? 
                products : products.filter(p => p.category === currentFilter);
            
            grid.innerHTML = '';
            
            filteredProducts.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style.animationDelay = `${index * 0.1}s`;
                
                productCard.innerHTML = `
                     <div class="product-image">
    <img src="${product.image}" alt="${product.name}" />
  </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                `;
                
                grid.appendChild(productCard);
            });
        }

        // Filter products
        function filterProducts(category) {
            currentFilter = category;
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Re-render products with animation
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            setTimeout(() => {
                renderProducts();
            }, 200);
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartCount();
            
            // Add visual feedback
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }

        // Update cart count
        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.getElementById('cartCount');
            cartCount.textContent = count;
            
            if (count > 0) {
                cartCount.style.display = 'flex';
                cartCount.classList.add('bounce');
                setTimeout(() => cartCount.classList.remove('bounce'), 300);
            } else {
                cartCount.style.display = 'none';
            }
        }

        // Toggle cart modal
        function toggleCart() {
            const modal = document.getElementById('cartModal');
            const isVisible = modal.style.display === 'flex';
            
            if (isVisible) {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'flex';
                renderCartItems();
            }
        }

        // Render cart items
        function renderCartItems() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="color: #666; font-size: 0.9rem;">Quantity: ${item.quantity}</div>
                    </div>
                    <div style="font-weight: bold; color: #2ed573;">$${(item.price * item.quantity).toLocaleString()}</div>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: $${total.toLocaleString()}`;
        }

        // Close modal when clicking outside
        document.getElementById('cartModal').addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });

        // Add smooth scrolling to navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showPage(targetId);
            });
        });

        // Page navigation functions
        function showPage(pageId) {
            // Hide all page sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target page section
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Load products if showing products page
                if (pageId === 'products') {
                    renderProducts();
                }
                
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-nav');
                });
                const navLink = document.querySelector(`[href="#${pageId}"]`);
                if (navLink) {
                    navLink.classList.add('active-nav');
                }
            }
        }

        // Contact form submission
        function submitContactForm(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you, ${data.name}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Add active nav link styling
        const style = document.createElement('style');
        style.textContent = `
            .nav-links a.active-nav {
                color: #667eea !important;
            }
            .nav-links a.active-nav::after {
                width: 100%;
            }
        `;
        document.head.appendChild(style);