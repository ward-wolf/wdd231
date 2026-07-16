const getString = window.location.search;

const myInfo = new URLSearchParams(getString);

const membershipLabels = {
    np: 'Non Profit Membership',
    bronze: 'Bronze Membership',
    silver: 'Silver Membership',
    gold: 'Gold Membership'
};

const submittedDate = new Date(myInfo.get('timestamp'));

document.querySelector('#welcome').innerHTML = `
    <h2>Your Application Details</h2>
    <p><strong>Name:</strong> ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
    <p><strong>Organizational Title:</strong> ${myInfo.get('orgTitle')}</p>
    <p><strong>Email:</strong> ${myInfo.get('email')}</p>
    <p><strong>Mobile Phone:</strong> ${myInfo.get('mobilePhone')}</p>
    <p><strong>Business/Organization:</strong> ${myInfo.get('orgName')}</p>
    <p><strong>Membership Level:</strong> ${membershipLabels[myInfo.get('membershipLevel')] || 'Not selected'}</p>
    <p><strong>Description:</strong> ${myInfo.get('description')}</p>
    <p><strong>Submitted:</strong> ${submittedDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
    `

