const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy-btn")) {
        const hexVal = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexVal)
        .then(() => showCopySuccessIcon(e.target))
        .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexVal = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        
        navigator.clipboard.writeText(hexVal)
        .then(() => showCopySuccessIcon(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));
    }
});

function showCopySuccessIcon(element) {
    const originalColor = element.style.color;

    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = '#48bb78';
    
    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = originalColor;
    }, 1500);
}

function generatePalette() {
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors)
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, id) => {
        const color = colors[id];
        const colorDiv = box.querySelector(".color");
        const hexVal = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexVal.textContent = color;
    });
}

generatePalette();