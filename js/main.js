// DARK MODE
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// TYPING
const typing = document.getElementById("typing");
const words = ["Cyrus Akacha", "Python Developer", "Problem Solver"];

let i = 0, j = 0, del = false;

function type() {
    let word = words[i];
    typing.textContent = del ? word.slice(0, j--) : word.slice(0, j++);

    if (!del && j === word.length) {
        del = true;
        setTimeout(type, 1000);
    } else if (del && j === 0) {
        del = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, del ? 50 : 100);
}
type();

// MODAL
function openModal(title, desc, link) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    document.getElementById("modalLink").href = link;
    document.getElementById("modal").style.display = "block";
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
};

window.onclick = (e) => {
    if (e.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
};

// SCROLL ANIMATION
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("show");
    });
});

document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
