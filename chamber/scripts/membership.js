const membershipDetails = document.getElementById('membership-details');

const membershipLevels = {
    np: {
        name: 'Non Profit Membership',
        price: 'Free',
        benefits: [
            'Listing in the online business directory',
            'Access to Chamber networking events',
            'Ability to post volunteer opportunities',
            'Discounted rates on event space rentals'
        ]
    },
    bronze: {
        name: 'Bronze Membership',
        price: '$150/year',
        benefits: [
            'Directory listing with business logo',
            '1 free ticket to the annual Chamber gala',
            '10% discount on Chamber-hosted event tickets',
            'Access to member-only training workshops'
        ]
    },
    silver: {
        name: 'Silver Membership',
        price: '$350/year',
        benefits: [
            'Everything in Bronze Membership',
            'Rotating spotlight placement on the Chamber home page',
            'Gala tickets increased to 3 total',
            'Event ticket discount increased to 20%',
            'Quarterly ad spot in the Chamber newsletter',
            'Priority booking for Chamber event space'
        ]
    },
    gold: {
        name: 'Gold Membership',
        price: '$750/year',
        benefits: [
            'Everything in Silver Membership',
            'Gala tickets increased to 5 total',
            'Event ticket discount increased to 30%',
            'Featured banner ad on the Chamber website',
            'One complimentary business training session per quarter',
            'Invitation to exclusive Gold Member networking dinners'
        ]
    }
};

function displayMembershipDetails(levelKey) {
    const level = membershipLevels[levelKey];
    let benefitsList = '';
    level.benefits.forEach((benefit) => {
        benefitsList += `<li>${benefit}</li>`;
    });

    membershipDetails.innerHTML = `
        <button id="closeMembershipModal">Close</button>
        <h2 id="membership-modal-title">${level.name}</h2>
        <p><strong>Price</strong>: ${level.price}</p>
        <p><strong>Benefits</strong>:</p>
        <ul>${benefitsList}</ul>
    `;

    const closeMembershipModal = document.getElementById('closeMembershipModal');
    closeMembershipModal.addEventListener('click', () => {
        membershipDetails.close();
    });

    membershipDetails.setAttribute('aria-labelledby', 'membership-modal-title');
    membershipDetails.showModal();
}

const learnMoreButtons = document.querySelectorAll('.membership-levels .cta-button');
learnMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        displayMembershipDetails(button.getAttribute('data-level'));
    });
});
