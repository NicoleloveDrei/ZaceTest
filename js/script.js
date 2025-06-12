document.addEventListener('DOMContentLoaded', function() {
    let prefix = '';
    // Adjust prefix for nested folders
    if (window.location.pathname.includes('/category/') || window.location.pathname.includes('/products/')) {
        prefix = '../';
    }

    // --- Contact Form Confirmation Logic ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('formConfirmation').style.display = 'block';
            contactForm.reset();
        });
    }

    // --- Fetch and inject header ---
    fetch(prefix + 'header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                // Dropdown menu logic
                const shopDropdownToggle = document.getElementById('shopDropdownToggle');
                if (shopDropdownToggle) {
                    const dropdown = shopDropdownToggle.closest('.dropdown');
                    shopDropdownToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    });
                    document.addEventListener('click', function(event) {
                        if (!dropdown.contains(event.target)) {
                            dropdown.classList.remove('open');
                        }
                    });
                }

                // --- Smooth fade animation for category navigation ---
                document.querySelectorAll('.category-link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        // Only animate if navigating to another category page
                        if (this.classList.contains('active')) return; // Don't animate if already active

                        const grid = document.querySelector('.product-grid');
                        if (grid) {
                            e.preventDefault();
                            grid.classList.add('fade-out');
                            setTimeout(() => {
                                window.location.href = this.href;
                            }, 400); // Match the CSS transition duration
                        }
                    });
                });
            }
        });

    // --- Fetch and inject footer ---
    fetch(prefix + 'footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        });

    // --- Featured Selections Modal Logic for index.html ---
    const featuredBtn = document.querySelector('.hero .button');
    const featuredModal = document.getElementById('featuredModal');
    const closeFeaturedModal = document.getElementById('closeFeaturedModal');

    if (featuredBtn && featuredModal && closeFeaturedModal) {
        featuredBtn.addEventListener('click', function(e) {
            e.preventDefault();
            featuredModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        closeFeaturedModal.addEventListener('click', function() {
            featuredModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        // Close modal when clicking outside the modal content
        featuredModal.addEventListener('click', function(e) {
            if (e.target === featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        // Optional: Add to Cart button in modal
        featuredModal.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Product added to cart!');
            });
        });
    }

    // --- Basic 'Add to Cart' functionality for product grid elsewhere ---
    document.querySelectorAll('.product-item button').forEach(button => {
        button.addEventListener('click', function() {
            alert('Product added to cart!');
        });
    });
});