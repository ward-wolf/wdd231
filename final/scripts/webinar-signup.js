// Confirm the webinar sign-up inline, without navigating to another page

const signupForm = document.querySelector("#webinar-signup");
const signupKey = "nta-webinar-signup";

function showConfirmation(container, name) {
    const confirmation = document.createElement("p");
    confirmation.textContent = `Thanks, ${name}! You're signed up — check your email for the link to our next webinar.`;
    container.replaceWith(confirmation);
}

if (signupForm) {
    const savedName = localStorage.getItem(signupKey);

    if (savedName) {
        showConfirmation(signupForm, savedName);
    } else {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = signupForm.querySelector("#name").value;
            localStorage.setItem(signupKey, name);

            showConfirmation(signupForm, name);
        });
    }
}
