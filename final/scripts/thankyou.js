const queryString = window.location.search;

const myInfo = new URLSearchParams(queryString);

const programLabels = {
    cs: 'Computer Science',
    ai: 'Artificial Intelligence',
    ml: 'Machine Learning',
    qc: 'Quantum Computing'
};

const submittedDate = new Date(myInfo.get('timestamp'));

// Reformat dob field to match the month/day/year order used everywhere else
function formatDob(dobString) {
    if (!dobString) return dobString;
    const [year, month, day] = dobString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

document.querySelector('#welcome').innerHTML = `
    <h2>Your Application Details</h2>
    <p><strong>Name:</strong> ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
    <p><strong>Date of Birth:</strong> ${formatDob(myInfo.get('dob'))}</p>
    <p><strong>Country of Residence:</strong> ${myInfo.get('country')}</p>
    <p><strong>Email:</strong> ${myInfo.get('email')}</p>
    <p><strong>Mobile Phone:</strong> ${myInfo.get('mobilePhone')}</p>
    <p><strong>Has WhatsApp:</strong> ${myInfo.get('hasWhatsApp') ? 'Yes' : 'No'}</p>
    <p><strong>Program of Interest:</strong> ${programLabels[myInfo.get('programChoice')] || 'Not selected'}</p>
    <p><strong>About You:</strong> ${myInfo.get('description')}</p>
    <p><strong>Date of Application:</strong> ${submittedDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
    `
