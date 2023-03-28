export const toggleDarkMode = () => {
    const root = document.documentElement;
    const isDarkMode = root.getAttribute('data-theme') === 'dark';

    if (isDarkMode) {
        root.setAttribute('data-theme', 'light');
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#1c1c1c');
        root.style.setProperty('--border-color', '#aaaaaa');
    } else {
        root.setAttribute('data-theme', 'dark');
        root.style.setProperty('--bg-color', '#1c1c1c');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#555555');
    }
};

// Add event listener to toggle button
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', toggleDarkMode);