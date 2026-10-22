const interestSelect = document.getElementById("interest");
const interestMessage = document.getElementById("interest-message");

const interests = {
    volunteer: "Volunteers help with animal care and rescue events.",
    foster: "Fostering gives animals a temporary home while they wait for adoption.",
    adoption: "Adopting gives a rescued animal a permanent home."
};

// Update the message and save the selected interest
function updateInterest() {
    const selected = interestSelect.value;

    localStorage.setItem("savedInterest", selected);

    if (selected === "") {
        interestMessage.textContent = "";
    } else {
        interestMessage.textContent = interests[selected];
    }
}

// Load the saved interest when the page opens
function loadInterest() {
    const savedInterest = localStorage.getItem("savedInterest");

    if (savedInterest && interests[savedInterest]) {
        interestSelect.value = savedInterest;
        interestMessage.textContent = interests[savedInterest];
    }
}

interestSelect.addEventListener("change", updateInterest);
loadInterest();

const contactForm = document.getElementById("contact-form");

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "-error");
    errorElement.textContent = message;
}

function validateRequired(fieldId) {
    const field = document.getElementById(fieldId);

    if (field.value.trim() === "") {
        showError(fieldId, "This field is required.");
        return false;
    }

    showError(fieldId, "");
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("email", "Please enter your email address.");
        return false;
    }

    if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email address.");
        return false;
    }

    showError("email", "");
    return true;
}

function validateForm(event) {
    event.preventDefault();

    const nameValid = validateRequired("name");
    const emailValid = validateEmail();
    const interestValid = validateRequired("form-interest");
    const availabilityValid = validateRequired("availability");
    const experienceValid = validateRequired("experience");
    const messageValid = validateRequired("message");

    const formStatus = document.getElementById("form-status");

    if (
        nameValid &&
        emailValid &&
        interestValid &&
        availabilityValid &&
        experienceValid &&
        messageValid
    ) {
        formStatus.textContent =
            "Your information looks good! This is a demo form and has not been sent.";
    } else {
        formStatus.textContent =
            "Please correct the errors before submitting.";
    }
}

contactForm.addEventListener("submit", validateForm);