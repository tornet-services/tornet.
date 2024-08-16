window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('contactModal');
    var openModalButton = document.getElementById('openModal');
    var closeModalButton = document.getElementById('closeModal');

    // Open the modal
    openModalButton.onclick = function () {
        modal.style.display = 'block';
    };

    // Close the modal
    closeModalButton.onclick = function () {
        modal.style.display = 'none';
    };

    // Close the modal if the user clicks outside of the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

// JavaScript to handle form submission and send data to Discord webhook
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contactForm');

    // Show the modal when the CONTACT button is clicked
    document.querySelector('.contact-button').addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Get current date and time
        const now = new Date();
        const dateTime = now.toLocaleString();

        // Prepare the data to be sent
        const webhookData = {
            content: null,
            embeds: [
                {
                    title: "Contact from tornet.",
                    fields: [
                        { name: "Name", value: name, inline: false },
                        { name: "Email", value: email, inline: false },
                        { name: "Message", value: message, inline: false },
                        { name: "Date & Time of Contact", value: dateTime, inline: false }
                    ],
                    color: 0x5865F2 // Green color for the embed
                }
            ]
        };

        // Send the data to the Discord webhook
        fetch('https://discord.com/api/webhooks/1249981583264583720/8Ef3Sd__IEzuZMzaj5BzVxvHqZw48t-2zijJ0jjpYtyEpUWqtN6BOnBedryWmwKCLXnd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookData)
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
                modal.style.display = 'none';
            } else {
                alert('Failed to send message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    let index = 0;

    function cycleCarousel() {
        index++;
        if (index >= 9) { // Assuming there are 9 items in total
            index = 0;
        }
        const offset = -index * 33.33; // Moves the carousel by 33.33% of its width
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    setInterval(cycleCarousel, 6000); // Change slides every 6 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const leaveReviewBtn = document.getElementById('leave-review-btn');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeFeedbackModal = document.getElementById('closeFeedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');

    // Function to get current date and time
    function getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString(); // Adjust the format as needed
    }

    // Open the feedback modal
    leaveReviewBtn.addEventListener('click', () => {
        feedbackModal.style.display = 'block';
    });

    // Close the feedback modal
    closeFeedbackModal.addEventListener('click', () => {
        feedbackModal.style.display = 'none';
    });

    // Close the feedback modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    });

    // Submit feedback
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('feedback-name').value.trim();
        const email = document.getElementById('feedback-email').value.trim();
        const feedbackText = document.getElementById('feedback-text').value.trim();
        const dateTime = getCurrentDateTime(); // Get current date and time

        if (name && feedbackText) {
            fetch('https://discord.com/api/webhooks/1249981583264583720/8Ef3Sd__IEzuZMzaj5BzVxvHqZw48t-2zijJ0jjpYtyEpUWqtN6BOnBedryWmwKCLXnd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [
                        {
                            title: 'User Feedback',
                            fields: [
                                {
                                    name: 'Name',
                                    value: name,
                                    inline: true
                                },
                                {
                                    name: 'Email',
                                    value: email || 'Not Provided',
                                    inline: true
                                },
                                {
                                    name: 'Feedback',
                                    value: feedbackText,
                                    inline: false
                                },
                                {
                                    name: 'Date & Time',
                                    value: dateTime,
                                    inline: false
                                }
                            ],
                            color: 0x5865F2 // Embed color
                        }
                    ]
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for your feedback!');
                feedbackForm.reset();
                feedbackModal.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Thank you for your feedback!');
            });
        } else {
            alert('Please enter your name and feedback before submitting.');
        }
    });
});
