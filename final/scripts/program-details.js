// Create variables for the data file URLs

const programsUrl = "data/programs.json";
const tracksUrl = "data/program-tracks.json";
const classesUrl = "data/classes.json";

// Select the "Learn More" buttons and the dialog

const learnMoreButtons = document.querySelectorAll(".program-choices button[data-level]");
const programDialog = document.querySelector("#program-details");

// async function to fetch program, track, and class data

async function getProgramData(dataProgramsUrl, dataTracksUrl, dataClassesUrl) {
    try {
        const programsResponse = await fetch(dataProgramsUrl);
        const programs = await programsResponse.json();

        const tracksResponse = await fetch(dataTracksUrl);
        const programTracks = await tracksResponse.json();

        const classesResponse = await fetch(dataClassesUrl);
        const classes = await classesResponse.json();

        const classesByCode = {};
        classes.forEach((course) => {
            classesByCode[course.code] = course;
        });

        const programsByLevel = {};
        programs.forEach((program) => {
            programsByLevel[program.level] = program;
        });

        learnMoreButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const program = programsByLevel[button.dataset.level];
                const codes = programTracks[program.track];
                const courses = codes.map((code) => classesByCode[code]);

                showProgramDetails(program, courses);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

getProgramData(programsUrl, tracksUrl, classesUrl);

// Function to display a program's details and class list in the dialog

function showProgramDetails(program, courses) {
    programDialog.innerHTML = "";

    let heading = document.createElement("h2");
    let description = document.createElement("p");
    let classesHeading = document.createElement("h3");
    let classesList = document.createElement("ul");
    let closeButton = document.createElement("button");

    heading.textContent = program.track;
    heading.setAttribute("id", "program-details-heading");
    heading.setAttribute("tabindex", "-1");
    programDialog.setAttribute("aria-labelledby", "program-details-heading");

    description.textContent = program.description;

    classesHeading.textContent = "Classes";

    courses.forEach((course) => {
        const item = document.createElement("li");
        item.textContent = `${course.code}: ${course.name}`;
        classesList.appendChild(item);
    });

    closeButton.setAttribute("type", "button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        programDialog.close();
    });

    programDialog.appendChild(heading);
    programDialog.appendChild(description);
    programDialog.appendChild(classesHeading);
    programDialog.appendChild(classesList);
    programDialog.appendChild(closeButton);

    programDialog.showModal();
    heading.focus();
    programDialog.scrollTop = 0;
}
