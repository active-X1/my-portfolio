// DARK MODE
const toggle = document.getElementById("darkToggle");

toggle.onclick = () => {
    document.body.classList.toggle("dark");
};

// TYPING EFFECT
const typing = document.getElementById("typing");
const words = ["Cyrus Akacha", "Python Developer", "Problem Solver"];

let i = 0, j = 0, deleting = false;

function type() {
    let word = words[i];
    typing.textContent = deleting ? word.slice(0, j--) : word.slice(0, j++);

    if (!deleting && j === word.length) {
        deleting = true;
        setTimeout(type, 1000);
    } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 200);
    } else {
        setTimeout(type, deleting ? 50 : 100);
    }
}
type();

// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
