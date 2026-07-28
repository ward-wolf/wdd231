// Build a <section> card: an optional image+caption block, a heading,
// a divider, a list of body paragraphs, and an optional action button.

export function buildCard({ headingLevel = "h3", headingText, topImage, topCaption, bodyLines = [], action } = {}) {
    const card = document.createElement("section");

    if (topImage) {
        const top = document.createElement("div");
        top.classList.add("top");

        const image = document.createElement("img");
        image.setAttribute("src", topImage.src);
        image.setAttribute("alt", topImage.alt);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", topImage.width ?? "80");
        image.setAttribute("height", topImage.height ?? "80");
        top.appendChild(image);

        if (topCaption) {
            const caption = document.createElement("p");
            caption.classList.add("tagline");
            caption.innerHTML = topCaption;
            top.appendChild(caption);
        }

        card.appendChild(top);
    }

    const heading = document.createElement(headingLevel);
    heading.textContent = headingText;
    card.appendChild(heading);

    card.appendChild(document.createElement("hr"));

    bodyLines.forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = line;
        card.appendChild(paragraph);
    });

    if (action) {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        if (action.className) {
            button.classList.add(action.className);
        }
        button.textContent = action.label;
        if (action.ariaLabel) {
            button.setAttribute("aria-label", action.ariaLabel);
        }
        button.addEventListener("click", action.onClick);
        card.appendChild(button);
    }

    return card;
}
