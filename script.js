// ==========================================
// 1. Theme Toggle Controller
// ==========================================
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// ==========================================
// 2. Active Scroll Navigation Highlighter
// ==========================================
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if the scroll position is within the boundaries of the section
        if (window.scrollY >= (sectionTop - 150)) {
            currentSectionId = section.getAttribute('id') || '';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        }
    });
});

// ==========================================
// 3. Dynamic Toast Notification System
// ==========================================
function showNotification(message) {
    // Prevent duplicate toast windows
    const existingToast = document.getElementById('toast-alert');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-alert';
    toast.className = `fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3.5 rounded-xl shadow-xl font-medium text-sm flex items-center gap-3 transition-all duration-300 transform translate-y-10 opacity-0`;
    toast.innerHTML = `🌟 <span>${message}</span>`;
    
    document.body.appendChild(toast);

    // Smooth animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);

    // Smooth animate out and self-destroy
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// 4. WhatsApp Checkout Engine
// ==========================================
const WHATSAPP_NUMBER = "2349035823482"; // <-- REPLACE WITH YOUR REAL PHONE NUMBER WITH COUNTRY CODE

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const selectedSize = card.querySelector('.size-select').value;
        const productName = e.target.getAttribute('data-name');
        const productPrice = e.target.getAttribute('data-price');

        // Trigger our brand new micro-interaction popup
        showNotification(`Preparing order for ${productName} (Size ${selectedSize})...`);

        // Generate clean template strings formatted for WhatsApp
        const baseText = `Hello! I would like to place an order from your website:\n\n` +
                         `🛒 *Product:* ${productName}\n` +
                         `📏 *Size Chosen:* ${selectedSize}\n` +
                         `💰 *Price:* ${productPrice}\n\n` +
                         `Please confirm if this is available for delivery. Thank you!`;

        const encodedText = encodeURIComponent(baseText);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

        // Delay external link execution slightly so the user sees the popup interaction
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 800);
    });
});

// ==========================================
// 5. Dynamic Category Filtering Engine
// ==========================================
const filterButtons = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedFilter = button.getAttribute('data-filter');

        // 1. Manage Active Button Focus States
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-brand-light', 'text-white', 'dark:bg-brand-dark', 'dark:text-slate-900');
            btn.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
        });
        
        // Highlight clicked button
        button.classList.remove('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
        button.classList.add('bg-brand-light', 'text-white', 'dark:bg-brand-dark', 'dark:text-slate-900');

        // 2. Filter Grid Items
        productCards.forEach(card => {
            const productCategory = card.getAttribute('data-category');

            if (selectedFilter === 'all' || productCategory === selectedFilter) {
                // Smooth fade-in effect
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                // Smooth fade-out effect
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Matches transitions
            }
        });
    });
});

// ==========================================
// 6. Image Lightbox Preview System
// ==========================================
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-target-img');
const closeModalBtn = document.getElementById('close-modal');

// Select all clickable product images
document.querySelectorAll('.product-card img').forEach(img => {
    // Add styling to show the image is clickable
    img.classList.add('cursor-zoom-in', 'hover:scale-105', 'transition-transform', 'duration-300');
    
    img.addEventListener('click', () => {
        const highResSrc = img.getAttribute('src');
        modalImg.setAttribute('src', highResSrc);
        
        // Show the modal container smoothly
        imageModal.classList.remove('hidden');
        setTimeout(() => {
            imageModal.classList.remove('opacity-0');
            imageModal.querySelector('div').classList.remove('scale-95');
        }, 10);
    });
});


// Function to close the preview window cleanly
function closeImageModal() {
    imageModal.classList.add('opacity-0');
    imageModal.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
        imageModal.classList.add('hidden');
    }, 300); // Matches transition timelines
}

// Close listeners
if (closeModalBtn && imageModal) {
    closeModalBtn.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
        // Close if the background overlay backdrop itself is clicked
        if (e.target === imageModal || e.target === closeModalBtn) {
            closeImageModal();
        }
    });
}


// ==========================================
// 0. Service Worker Local Cache Register
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Asset Caching Active.'))
            .catch(err => console.log('Cache registration failed:', err));
    });
}