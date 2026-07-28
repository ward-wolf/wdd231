// Autosave the enrollment form to localStorage so an in-progress
// application survives an accidental refresh or navigating away

const enrollForm = document.querySelector(".join-form");
const draftKey = "nta-enroll-draft";
const draftFields = [
    "firstName", "lastName", "dob", "country",
    "email", "mobilePhone", "hasWhatsApp",
    "programChoice", "description",
];

if (enrollForm) {
    // Restore a saved draft, if there is one
    try {
        const saved = JSON.parse(localStorage.getItem(draftKey));
        if (saved) {
            draftFields.forEach((name) => {
                const field = enrollForm.elements[name];
                if (!field) return;

                if (field.type === "checkbox") {
                    field.checked = Boolean(saved[name]);
                } else {
                    field.value = saved[name] || "";
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

    // Save the draft as the user fills out the form
    enrollForm.addEventListener("input", () => {
        const draft = {};
        draftFields.forEach((name) => {
            const field = enrollForm.elements[name];
            if (!field) return;

            draft[name] = field.type === "checkbox" ? field.checked : field.value;
        });
        localStorage.setItem(draftKey, JSON.stringify(draft));
    });

    // Clear the draft once the application is actually submitted
    enrollForm.addEventListener("submit", () => {
        localStorage.removeItem(draftKey);
    });
}
