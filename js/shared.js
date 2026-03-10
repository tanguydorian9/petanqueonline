// Dark mode persistence
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Auth state UI management
let isUserLoggedIn = false;

function updateAuthUI() {
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    if (!loggedOutView || !loggedInView) return;
    if (isUserLoggedIn) {
        loggedOutView.style.display = 'none';
        loggedInView.style.display = 'block';
    } else {
        loggedOutView.style.display = 'block';
        loggedInView.style.display = 'none';
    }
}

function simulateLogout() {
    isUserLoggedIn = false;
    updateAuthUI();
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});
