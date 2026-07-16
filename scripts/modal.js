const courseDetails = document.getElementById('course-details');

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">Close</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener('click', () => {
    courseDetails.close();
  });

  courseDetails.showModal();
}