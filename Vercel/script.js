document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const mobileModeToggle = document.getElementById('mobile-mode-toggle');
    const body = document.body;

    // Apply initial mode based on localStorage for theme
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        if (modeToggle) {
            modeToggle.checked = true;
        }
        if (mobileModeToggle) {
            mobileModeToggle.checked = true;
        }
    } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        if (modeToggle) {
            modeToggle.checked = false;
        }
        if (mobileModeToggle) {
            mobileModeToggle.checked = false;
        }
    }

    // Toggle theme mode
    const toggleMode = (isLightMode) => {
        if (isLightMode) {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            toggleMode(modeToggle.checked);
            if (mobileModeToggle) {
                mobileModeToggle.checked = modeToggle.checked;
            }
        });
    }

    if (mobileModeToggle) {
        mobileModeToggle.addEventListener('change', () => {
            toggleMode(mobileModeToggle.checked);
            if (modeToggle) {
                modeToggle.checked = mobileModeToggle.checked;
            }
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img.lazy');

    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    img.setAttribute('src', src);
                    img.classList.remove('lazy');

                    observer.unobserve(img);
                }
            });
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Fade-in animations
    const faders = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Hamburger menu toggle
    document.getElementById('hamburger-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('show');
    });
// JavaScript for Animating Equations
const equations = [
    'Y = β0 + β1X + ε',
    'E(Y|X) = β0 + β1X',
    'ΔY = α + βΔX + γΔZ',
    'Y = α + ΣβiXi + ε',
    'log(Y) = β0 + β1X + ε'
];

const container = document.getElementById('equations-container');

function createEquation() {
    const equation = document.createElement('div');
    equation.className = 'equation';
    equation.textContent = equations[Math.floor(Math.random() * equations.length)];
    equation.style.top = Math.random() * 100 + 'vh';
    equation.style.left = Math.random() * 100 + 'vw';
    equation.style.animationDuration = (Math.random() * 5 + 5) + 's';
    container.appendChild(equation);

    // Remove equation after animation ends
    equation.addEventListener('animationend', () => {
        equation.remove();
    });
}

setInterval(createEquation, 1000); // Create a new equation every second

    // Initialize the Google Map
    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    } else {
        window.initMap = initMap; // Fallback if Google Maps API is loaded asynchronously
    }
});

function initMap() {
    const aueb = { lat: 37.993, lng: 23.732 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: aueb,
    });

    const marker = new google.maps.Marker({
        position: aueb,
        map: map,
        title: 'Athens University of Economics and Business',
    });

    marker.addListener('click', () => {
        window.location.href = 'https://www.aueb.gr/';
    });
}