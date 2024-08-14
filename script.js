// MAIN STEP HANDLING SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Step navigation elements
    const steps = {
        'step-1': document.getElementById('step-1'),
        'step-2': document.getElementById('step-2'),
        'step-3': document.getElementById('step-3'),
        'step-4': document.getElementById('step-4'),
        'step-5': document.getElementById('step-5'), // review step
    };

    const nextBtn = document.getElementById('next-button');
    const prevBtn = document.getElementById('previous-button');
    const submitBtn = document.getElementById('submit');
    const recaptchaContainer = document.getElementById('recaptcha-container');
    let currentStep = 'step-1';

    // Define the hierarchical order for the steps
    const hierarchicalSteps = {
        'step-1': { next: 'step-2' },
        'step-2': { next: 'step-3', prev: 'step-1' },
        'step-3': { next: 'step-4', prev: 'step-2' },
        'step-4': { next: 'step-5', prev: 'step-3' },
        'step-5': { prev: 'step-4' },
    };

    function showStep(step) {
        Object.keys(steps).forEach(key => {
            steps[key].style.display = key === step ? 'block' : 'none';
        });
        prevBtn.style.display = step === 'step-1' ? 'none' : 'inline-block';
        nextBtn.style.display = step === 'step-5' ? 'none' : 'inline-block';
        submitBtn.style.display = step === 'step-5' ? 'inline-block' : 'none';

        // Show or hide recaptcha-container based on the step
        if (step === 'step-5') {
            recaptchaContainer.style.display = 'flex';
        } else {
            recaptchaContainer.style.display = 'none';
        }

        // Populate review fields if on step-5
        if (step === 'step-5') {
            populateReviewStep();
        }
    }

    function validateStep(step) {
        const inputs = steps[step].querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            // Check if the field is visible and its parent element is visible as well
            if (input.style.display !== 'none' && input.offsetParent !== null && input.id !== 'Date-Flexibility') {
                if (input.type === 'select-one') {
                    if (input.selectedIndex === 0) {
                        return false;
                    }
                } else if (input.value.trim() === "") {
                    return false;
                }
            }
        }
        return true;
    }

    nextBtn.addEventListener('click', function () {
        if (validateStep(currentStep)) {
            currentStep = getNextStep(currentStep);
            showStep(currentStep);
        } else {
            alert('Please fill out all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentStep === 'step-4') {
            resetServiceConditionals();
            clearGroupBookingInfo(); // Clear the textarea in step-4
            clearNameInputsAndResetLabels(); // Clear the specific name input fields and reset placeholders
            revertLabelToOriginal();
        }
        if (currentStep === 'step-3') {
            resetNumberOfGuestsField();
            resetGuestArrangements();
        }
        currentStep = getPrevStep(currentStep);
        showStep(currentStep);
    });

    function getNextStep(current) {
        return hierarchicalSteps[current]?.next || current;
    }

    function getPrevStep(current) {
        return hierarchicalSteps[current]?.prev || current;
    }

    // Function to update the label text for services based on name inputs
function updateServiceLabels() {
    const inputsToLabels = {
        'Name-Single': 'Service-Single-Label',
        'Name-Single-1': 'Service-Single-1-Label',
        'Name-Single-2': 'Service-Single-2-Label',
        'Name-Single-3': 'Service-Single-3-Label',
        'Name-Couple': 'Service-Couple-Label',
        'Name-Couple-1': 'Service-Couple-1-Label',
        'Name-Couple-2': 'Service-Couple-2-Label',
        'Name-Couple-3': 'Service-Couple-3-Label'
    };

    Object.keys(inputsToLabels).forEach(nameId => {
        const nameInput = document.getElementById(nameId);
        const serviceLabel = document.getElementById(inputsToLabels[nameId]);

        if (nameInput && serviceLabel) {
            nameInput.addEventListener('input', function () {
                const name = nameInput.value.trim();
                if (name) {
                    serviceLabel.innerText = `Service for ${name}`;
                } else {
                    serviceLabel.innerText = 'Service'; // Default label if name is empty
                }
            });
        }
    });
}

// Call the function to update service labels
updateServiceLabels();

// Initial setup
showStep(currentStep);
console.log("Step navigation elements initialized");
});

// RESETS AND CLEARS SCRIPT

function clearNameInputsAndResetLabels() {
    const inputsToLabels = {
        'Name-Single': 'Label-SS-Single',
        'Name-Single-1': 'Label-SS-Single-1',
        'Name-Single-2': 'Label-SS-Single-2',
        'Name-Single-3': 'Label-SS-Single-3',
        'Name-Couple': 'Label-SS-Couple',
        'Name-Couple-1': 'Label-SS-Couple-1',
        'Name-Couple-2': 'Label-SS-Couple-2',
        'Name-Couple-3': 'Label-SS-Couple-3'
    };

    const nameFields = Object.keys(inputsToLabels);

    nameFields.forEach(id => {
        const inputField = document.getElementById(id);
        const serviceLabel = document.getElementById(inputsToLabels[id]);

        if (inputField) {
            inputField.value = ''; // Clear the value of the input field
            if (serviceLabel) {
                serviceLabel.innerText = 'Select service'; // Reset the label text
            }
        }
    });
}

function clearGroupBookingInfo() {
    const groupBookingInfoField = document.getElementById('Group-Booking-Info');
    if (groupBookingInfoField) {
        groupBookingInfoField.value = '';
        console.log('Group-Booking-Info field cleared');
    }
}

function resetServiceConditionals() {
    const singleServiceFields = [
        'Service-Single', 'Package-Single', 'Spa-Del-Sol-Dream-Info-Single', 'Massage-Single', 'Duration-A-Single', 'Duration-B-Single', 'Combination-Single', 'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single',
        'Service-Single-1', 'Package-Single-1', 'Spa-Del-Sol-Dream-Info-Single-1', 'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1', 'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1',
        'Service-Single-2', 'Package-Single-2', 'Spa-Del-Sol-Dream-Info-Single-2', 'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2', 'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2',
        'Service-Single-3', 'Package-Single-3', 'Spa-Del-Sol-Dream-Info-Single-3', 'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3', 'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3'
    ];

    const coupleServiceFields = [
        'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple', 'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple', 'Other-Services-Info-Couple',
        'Package-Couple-Label', 'Massage-Couple-Label', 'Duration-A-Couple-Label', 'Duration-B-Couple-Label', 'Prenatal-Massage-Couple-Label', 'Combination-Guest-1-Couple-Label', 'Combination-Guest-2-Couple-Label', 'Massage-Guest-1-Couple-Label', 'Massage-Guest-2-Couple-Label', 'Duration-A-Guest-1-And-2-Couple-Label', 'Facial-Guest-1-Couple-Label', 'Facial-Guest-2-Couple-Label', 'Facial-Add-On-Guest-1-Couple-Label', 'Facial-Add-On-Guest-2-Couple-Label', 'Body-Treatment-Guest-1-Couple-Label', 'Body-Treatment-Guest-2-Couple-Label',

        'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1', 'Other-Services-Info-Couple-1',
        'Package-Couple-1-Label', 'Massage-Couple-1-Label', 'Duration-A-Couple-1-Label', 'Duration-B-Couple-1-Label', 'Prenatal-Massage-Couple-1-Label', 'Combination-Guest-1-Couple-1-Label', 'Combination-Guest-2-Couple-1-Label', 'Massage-Guest-1-Couple-1-Label', 'Massage-Guest-2-Couple-1-Label', 'Duration-A-Guest-1-And-2-Couple-1-Label', 'Facial-Guest-1-Couple-1-Label', 'Facial-Guest-2-Couple-1-Label', 'Facial-Add-On-Guest-1-Couple-1-Label', 'Facial-Add-On-Guest-2-Couple-1-Label', 'Body-Treatment-Guest-1-Couple-1-Label', 'Body-Treatment-Guest-2-Couple-1-Label',

        'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2', 'Other-Services-Info-Couple-2',
        'Package-Couple-2-Label', 'Massage-Couple-2-Label', 'Duration-A-Couple-2-Label', 'Duration-B-Couple-2-Label', 'Prenatal-Massage-Couple-2-Label', 'Combination-Guest-1-Couple-2-Label', 'Combination-Guest-2-Couple-2-Label', 'Massage-Guest-1-Couple-2-Label', 'Massage-Guest-2-Couple-2-Label', 'Duration-A-Guest-1-And-2-Couple-2-Label', 'Facial-Guest-1-Couple-2-Label', 'Facial-Guest-2-Couple-2-Label', 'Facial-Add-On-Guest-1-Couple-2-Label', 'Facial-Add-On-Guest-2-Couple-2-Label', 'Body-Treatment-Guest-1-Couple-2-Label', 'Body-Treatment-Guest-2-Couple-2-Label',

        'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3', 'Other-Services-Info-Couple-3',
        'Package-Couple-3-Label', 'Massage-Couple-3-Label', 'Duration-A-Couple-3-Label', 'Duration-B-Couple-3-Label', 'Prenatal-Massage-Couple-3-Label', 'Combination-Guest-1-Couple-3-Label', 'Combination-Guest-2-Couple-3-Label', 'Massage-Guest-1-Couple-3-Label', 'Massage-Guest-2-Couple-3-Label', 'Duration-A-Guest-1-And-2-Couple-3-Label', 'Facial-Guest-1-Couple-3-Label', 'Facial-Guest-2-Couple-3-Label', 'Facial-Add-On-Guest-1-Couple-3-Label', 'Facial-Add-On-Guest-2-Couple-3-Label', 'Body-Treatment-Guest-1-Couple-3-Label', 'Body-Treatment-Guest-2-Couple-3-Label'
    ];

    singleServiceFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
            if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            } else if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
                element.value = '';
            }
        }
    });

    coupleServiceFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
            if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            } else if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
                element.value = '';
            }
        }
    });

    document.getElementById('Service-Single').style.display = 'flex';
    document.getElementById('Service-Couple').style.display = 'flex';
    document.getElementById('Service-Single-1').style.display = 'flex';
    document.getElementById('Service-Couple-1').style.display = 'flex';
    document.getElementById('Service-Single-2').style.display = 'flex';
    document.getElementById('Service-Couple-2').style.display = 'flex';
    document.getElementById('Service-Single-3').style.display = 'flex';
    document.getElementById('Service-Couple-3').style.display = 'flex';
}

function resetNumberOfGuestsField() {
    const numberOfGuestsField = document.getElementById('Number-of-Guests');
    if (numberOfGuestsField) {
        numberOfGuestsField.value = '';
        console.log('Number-of-Guests field reset');
    }
}

function resetGuestArrangements() {
    const guestArrangementLabel = document.getElementById('Guest-Arrangement-Label');
    const guestArrangementLabel2 = document.getElementById('2-Guest-Arrangement-Label');
    const guestArrangementLabel3 = document.getElementById('3-Guest-Arrangement-Label');
    const guestArrangementLabel4 = document.getElementById('4-Guest-Arrangement-Label');
    const guestArrangementLabel5 = document.getElementById('5-Guest-Arrangement-Label');
    const guestArrangementLabel6 = document.getElementById('6-Guest-Arrangement-Label');
    const guestArrangement2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangement3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangement4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangement5 = document.getElementById('5-Guest-Arrangement');
    const guestArrangement6 = document.getElementById('6-Guest-Arrangement');

    function hideAllGuestArrangements() {
        guestArrangementLabel.style.display = 'none';
        guestArrangementLabel2.style.display = 'none';
        guestArrangementLabel3.style.display = 'none';
        guestArrangementLabel4.style.display = 'none';
        guestArrangementLabel5.style.display = 'none';
        guestArrangementLabel6.style.display = 'none';
        guestArrangement2.style.display = 'none';
        guestArrangement3.style.display = 'none';
        guestArrangement4.style.display = 'none';
        guestArrangement5.style.display = 'none';
        guestArrangement6.style.display = 'none';
    }

    function resetField(field) {
        if (field) {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
                field.value = '';
            }
        }
    }

    resetField(guestArrangement2);
    resetField(guestArrangement3);
    resetField(guestArrangement4);
    resetField(guestArrangement5);
    resetField(guestArrangement6);
    hideAllGuestArrangements();

    console.log('Guest arrangements reset');
}

// NAME INPUT LABEL CHANGE

let originalLabelText; // Declare in a higher scope

document.addEventListener('DOMContentLoaded', function() {
    const nameCoupleInput = document.getElementById('Name-Couple');
    const coupleLabel = document.getElementById('Label-Couple');

    // Store the original label text in the higher scope variable
    originalLabelText = coupleLabel.innerText;

    nameCoupleInput.addEventListener('input', function() {
        if (nameCoupleInput.value.trim() !== "") {
            coupleLabel.innerText = 'Couple Service';
        } else {
            coupleLabel.innerText = originalLabelText; // Revert to the original text if input is cleared
        }
    });
});

function revertLabelToOriginal() {
    const coupleLabel = document.getElementById('Label-Couple');

    if (coupleLabel) {
        coupleLabel.innerText = originalLabelText; // Revert to the original label text when prevBtn is clicked
    }
}

// REVIEW STEP SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    populateReviewStep(); // Ensure this runs after the DOM is ready
});

function populateReviewStep() {
    console.log("populateReviewStep function called");

    const reviewRows = document.querySelectorAll('.review-row');
    
    reviewRows.forEach(row => {
        const valueDiv = row.querySelector('.review-value');
        const dataValueId = valueDiv ? valueDiv.getAttribute('data-value-id') : null;

        if (dataValueId) {
            const ids = dataValueId.split(',');

            let combinedValue = '';
            
            ids.forEach(id => {
                const inputElement = document.getElementById(id.trim());

                if (inputElement) {
                    let value = '';

                    if (inputElement.tagName === 'SELECT' && inputElement.selectedIndex > 0) {
                        value = inputElement.options[inputElement.selectedIndex].text;
                    } else if (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
                        value = inputElement.value.trim();
                    }

                    if (value) {
                        combinedValue += value + ' '; // Combine values, separate with a space or comma as needed
                    }
                } else {
                    console.log(`Input element not found for ${id}`);
                }
            });

            if (combinedValue.trim()) {
                valueDiv.innerText = combinedValue.trim();
                row.style.display = 'flex'; // Ensure the row is displayed
            } else {
                row.style.display = 'none'; // Hide the row if no values are found
            }
        } else {
            row.style.display = 'none'; // Hide the row if the data-value-id attribute is not found
        }
    });
}

const steps = {
    'step-1': document.getElementById('step-1'),
    'step-2': document.getElementById('step-2'),
    'step-3': document.getElementById('step-3'),
    'step-4': document.getElementById('step-4'),
    'step-5': document.getElementById('step-5'), // review step
};

// REMOVE EMPTY FIELDS SCRIPT

function removeEmptyFields() {
    console.log("removeEmptyFields function called");

    var nameInputIds = [
        'Name-Single', 'Name-Single-1', 'Name-Single-2', 'Name-Single-3', 
        'Name-Couple', 'Name-Couple-1', 'Name-Couple-2', 'Name-Couple-3'
    ];

    var selectFieldIds = [
        '2-Guest-Arrangement', '3-Guest-Arrangement', '4-Guest-Arrangement', '5-Guest-Arrangement', '6-Guest-Arrangement', 
        'Service-Single', 'Package-Single', 'Massage-Single', 'Duration-A-Single', 'Duration-B-Single', 'Combination-Single', 'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single', 
        'Service-Single-1', 'Package-Single-1', 'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1', 'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1', 
        'Service-Single-2', 'Package-Single-2', 'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2', 'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2', 
        'Service-Single-3', 'Package-Single-3', 'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3', 'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3', 
        'Service-Couple', 'Package-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Guest-1-Couple', 'Combination-Guest-2-Couple', 'Massage-Guest-1-Couple', 'Massage-Guest-2-Couple', 'Duration-A-Guest-1-And-2-Couple', 'Facial-Guest-1-Couple', 'Facial-Guest-2-Couple', 'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple', 'Body-Treatment-Guest-1-Couple', 'Body-Treatment-Guest-2-Couple', 'Other-Services-Couple',
        'Service-Couple-1', 'Package-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Guest-1-Couple-1', 'Combination-Guest-2-Couple-1', 'Massage-Guest-1-Couple-1', 'Massage-Guest-2-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Guest-1-Couple-1', 'Facial-Guest-2-Couple-1', 'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatment-Guest-1-Couple-1', 'Body-Treatment-Guest-2-Couple-1', 'Other-Services-Couple-1',
        'Service-Couple-2', 'Package-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Guest-1-Couple-2', 'Combination-Guest-2-Couple-2', 'Massage-Guest-1-Couple-2', 'Massage-Guest-2-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Guest-1-Couple-2', 'Facial-Guest-2-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatment-Guest-1-Couple-2', 'Body-Treatment-Guest-2-Couple-2', 'Other-Services-Couple-2',
        'Service-Couple-3', 'Package-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Guest-1-Couple-3', 'Combination-Guest-2-Couple-3', 'Massage-Guest-1-Couple-3', 'Massage-Guest-2-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Guest-1-Couple-3', 'Facial-Guest-2-Couple-3', 'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatment-Guest-1-Couple-3', 'Body-Treatment-Guest-2-Couple-3', 'Other-Services-Couple-3'
    ];

    var textAreaIds = [
        'Date-Flexibility', 
        'Spa-Del-Sol-Dream-Info-Single', 'Multiple-Services-Info-Single', 
        'Spa-Del-Sol-Dream-Info-Single-1', 'Multiple-Services-Info-Single-1', 
        'Spa-Del-Sol-Dream-Info-Single-2', 'Multiple-Services-Info-Single-2', 
        'Spa-Del-Sol-Dream-Info-Single-3', 'Multiple-Services-Info-Single-3', 
        'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Other-Services-Info-Couple', 
        'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1', 'Other-Services-Info-Couple-1', 
        'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Other-Services-Info-Couple-2', 
        'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3', 'Other-Services-Info-Couple-3',
        'Group-Booking-Info'
    ];

    nameInputIds.forEach(function (id) {
        var nameInput = document.getElementById(id);
        if (nameInput && !nameInput.value.trim()) {
            nameInput.parentElement.removeChild(nameInput);
            console.log(`Empty name input field removed: ${id}`);
        }
    });

    selectFieldIds.forEach(function (id) {
        var selectField = document.getElementById(id);
        if (selectField && !selectField.value) {
            selectField.parentElement.removeChild(selectField);
            console.log(`Empty select field removed: ${id}`);
        }
    });

    textAreaIds.forEach(function (id) {
        var textArea = document.getElementById(id);
        if (textArea && !textArea.value.trim()) {
            textArea.parentElement.removeChild(textArea);
            console.log(`Empty textarea field removed: ${id}`);
        }
    });
}

// Form submission handling
var form = document.getElementById('Appointment-Inquiry');
if (form) {
    console.log("Form element found");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Form submission handler initialized");

        removeEmptyFields(); // Remove empty fields before submission
        form.submit(); // Submit the form
        console.log("Form submitted via Webflow's native handling");
    });
} else {
    console.log("Form element not found");
}

// SHOW STEP-8 TEMPLATE SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const numberOfGuestsSelect = document.getElementById('Number-of-Guests');
    const guestArrangementSelect2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangementSelect3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangementSelect4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangementSelect5 = document.getElementById('5-Guest-Arrangement');
    const guestArrangementSelect6 = document.getElementById('6-Guest-Arrangement');
    const singleTemplate = document.getElementById('Single');
    const single1Template = document.getElementById('Single-1');
    const single2Template = document.getElementById('Single-2');
    const single3Template = document.getElementById('Single-3');
    const coupleTemplate = document.getElementById('Couple');
    const couple1Template = document.getElementById('Couple-1');
    const couple2Template = document.getElementById('Couple-2');
    const couple3Template = document.getElementById('Couple-3');
    const sixPlusTemplate = document.getElementById('6-Plus');

    function hideAllTemplates() {
        singleTemplate.style.display = 'none';
        single1Template.style.display = 'none';
        single2Template.style.display = 'none';
        single3Template.style.display = 'none';
        coupleTemplate.style.display = 'none';
        couple1Template.style.display = 'none';
        couple2Template.style.display = 'none';
        couple3Template.style.display = 'none';
        sixPlusTemplate.style.display = 'none';
    }

    function handleTemplateVisibility() {
        hideAllTemplates();

        const numberOfGuestsValue = numberOfGuestsSelect.value;
        if (numberOfGuestsValue === '1') {
            singleTemplate.style.display = 'flex';
        } else if (numberOfGuestsValue === '2') {
            const guestArrangementValue = guestArrangementSelect2.value;
            if (guestArrangementValue === '1 Couple') {
                coupleTemplate.style.display = 'flex';
            } else if (guestArrangementValue === '2 Singles') {
                single1Template.style.display = 'flex';
                single2Template.style.display = 'flex';
            }
        } else if (numberOfGuestsValue === '3') {
            const guestArrangementValue = guestArrangementSelect3.value;
            if (guestArrangementValue === '1 Couple and 1 Single') {
                coupleTemplate.style.display = 'flex';
                singleTemplate.style.display = 'flex';
            } else if (guestArrangementValue === '3 Singles') {
                single1Template.style.display = 'flex';
                single2Template.style.display = 'flex';
                single3Template.style.display = 'flex';
            }
        } else if (numberOfGuestsValue === '4') {
            const guestArrangementValue = guestArrangementSelect4.value;
            if (guestArrangementValue === '2 Couples') {
                couple1Template.style.display = 'flex';
                couple2Template.style.display = 'flex';
            } else if (guestArrangementValue === '1 Couple and 2 Singles') {
                coupleTemplate.style.display = 'flex';
                single1Template.style.display = 'flex';
                single2Template.style.display = 'flex';
            }
        } else if (numberOfGuestsValue === '5') {
            const guestArrangementValue = guestArrangementSelect5.value;
            if (guestArrangementValue === '2 Couples and 1 Single') {
                couple1Template.style.display = 'flex';
                couple2Template.style.display = 'flex';
                singleTemplate.style.display = 'flex';
            } else if (guestArrangementValue === '1 Couple and 3 Singles') {
                coupleTemplate.style.display = 'flex';
                single1Template.style.display = 'flex';
                single2Template.style.display = 'flex';
                single3Template.style.display = 'flex';
            }
        } else if (numberOfGuestsValue === '6') {
            const guestArrangementValue = guestArrangementSelect6.value;
            if (guestArrangementValue === '3 Couples') {
                couple1Template.style.display = 'flex';
                couple2Template.style.display = 'flex';
                couple3Template.style.display = 'flex';
            } else if (guestArrangementValue === '2 Couples and 2 Singles') {
                couple1Template.style.display = 'flex';
                couple2Template.style.display = 'flex';
                single1Template.style.display = 'flex';
                single2Template.style.display = 'flex';
            }
        } else if (numberOfGuestsValue === '6 plus') {
            sixPlusTemplate.style.display = 'flex';
        }
    }

    numberOfGuestsSelect.addEventListener('change', function() {
        hideAllTemplates();
        handleTemplateVisibility();
    });

    guestArrangementSelect2.addEventListener('change', function() {
        handleTemplateVisibility();
    });

    guestArrangementSelect3.addEventListener('change', function() {
        handleTemplateVisibility();
    });

    guestArrangementSelect4.addEventListener('change', function() {
        handleTemplateVisibility();
    });

    guestArrangementSelect5.addEventListener('change', function() {
        handleTemplateVisibility();
    });

    guestArrangementSelect6.addEventListener('change', function() {
        handleTemplateVisibility();
    });

    // Initial setup
    hideAllTemplates();
});

// NUMBER OF GUESTS CONDITIONALS SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    const numberOfGuests = document.getElementById('Number-of-Guests');
    const guestArrangementLabel = document.getElementById('Guest-Arrangement-Label');
    const guestArrangementLabel2 = document.getElementById('2-Guest-Arrangement-Label');
    const guestArrangementLabel3 = document.getElementById('3-Guest-Arrangement-Label');
    const guestArrangementLabel4 = document.getElementById('4-Guest-Arrangement-Label');
    const guestArrangementLabel5 = document.getElementById('5-Guest-Arrangement-Label');
    const guestArrangementLabel6 = document.getElementById('6-Guest-Arrangement-Label');
    const guestArrangement2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangement3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangement4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangement5 = document.getElementById('5-Guest-Arrangement');
    const guestArrangement6 = document.getElementById('6-Guest-Arrangement');

    function hideAllGuestArrangements() {
        guestArrangementLabel.style.display = 'none';
        guestArrangementLabel2.style.display = 'none';
        guestArrangementLabel3.style.display = 'none';
        guestArrangementLabel4.style.display = 'none';
        guestArrangementLabel5.style.display = 'none';
        guestArrangementLabel6.style.display = 'none';
        guestArrangement2.style.display = 'none';
        guestArrangement3.style.display = 'none';
        guestArrangement4.style.display = 'none';
        guestArrangement5.style.display = 'none';
        guestArrangement6.style.display = 'none';
    }

    function resetField(field) {
        if (field) {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
                field.value = '';
            }
        }
    }

    function resetAndHideChildren(parentSelect) {
        switch (parentSelect.id) {
            case 'Number-of-Guests':
                resetField(guestArrangement2);
                resetField(guestArrangement3);
                resetField(guestArrangement4);
                resetField(guestArrangement5);
                resetField(guestArrangement6);
                hideAllGuestArrangements();
                break;
        }
    }

    function handleGuestArrangements() {
        hideAllGuestArrangements();

        const numberOfGuestsValue = numberOfGuests.value;
        if (numberOfGuestsValue === '2') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementLabel2.style.display = 'block';
            guestArrangement2.style.display = 'block';
        } else if (numberOfGuestsValue === '3') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementLabel3.style.display = 'block';
            guestArrangement3.style.display = 'block';
        } else if (numberOfGuestsValue === '4') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementLabel4.style.display = 'block';
            guestArrangement4.style.display = 'block';
        } else if (numberOfGuestsValue === '5') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementLabel5.style.display = 'block';
            guestArrangement5.style.display = 'block';
        } else if (numberOfGuestsValue === '6') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementLabel6.style.display = 'block';
            guestArrangement6.style.display = 'block';
        }
    }

    numberOfGuests.addEventListener('change', function() {
        resetAndHideChildren(this);
        handleGuestArrangements();
    });

    // Initial setup
    hideAllGuestArrangements();
});

// SERVICES CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    // Single Service Conditional fields
    const singleService = document.getElementById('Service-Single');
    const singlePackage = document.getElementById('Package-Single');
    const spaDelSolDreamInfo = document.getElementById('Spa-Del-Sol-Dream-Info-Single');
    const singleMassage = document.getElementById('Massage-Single');
    const massageDurationA = document.getElementById('Duration-A-Single');
    const massageDurationB = document.getElementById('Duration-B-Single');
    const combinationType = document.getElementById('Combination-Single');
    const singleFacial = document.getElementById('Facial-Single');
    const facialAddOn = document.getElementById('Add-On-Single');
    const bodyTreatment = document.getElementById('Body-Treatment-Single');
    const waxInfo = document.getElementById('Wax-Info-Single');
    const multipleServicesInfo = document.getElementById('Multiple-Services-Info-Single');

    // Single Service Conditional fields (Set 1)
    const singleService1 = document.getElementById('Service-Single-1');
    const singlePackage1 = document.getElementById('Package-Single-1');
    const spaDelSolDreamInfo1 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-1');
    const singleMassage1 = document.getElementById('Massage-Single-1');
    const massageDurationA1 = document.getElementById('Duration-A-Single-1');
    const massageDurationB1 = document.getElementById('Duration-B-Single-1');
    const combinationType1 = document.getElementById('Combination-Single-1');
    const singleFacial1 = document.getElementById('Facial-Single-1');
    const facialAddOn1 = document.getElementById('Add-On-Single-1');
    const bodyTreatment1 = document.getElementById('Body-Treatment-Single-1');
    const waxInfo1 = document.getElementById('Wax-Info-Single-1');
    const multipleServicesInfo1 = document.getElementById('Multiple-Services-Info-Single-1');

    // Single Service Conditional fields (Set 2)
    const singleService2 = document.getElementById('Service-Single-2');
    const singlePackage2 = document.getElementById('Package-Single-2');
    const spaDelSolDreamInfo2 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-2');
    const singleMassage2 = document.getElementById('Massage-Single-2');
    const massageDurationA2 = document.getElementById('Duration-A-Single-2');
    const massageDurationB2 = document.getElementById('Duration-B-Single-2');
    const combinationType2 = document.getElementById('Combination-Single-2');
    const singleFacial2 = document.getElementById('Facial-Single-2');
    const facialAddOn2 = document.getElementById('Add-On-Single-2');
    const bodyTreatment2 = document.getElementById('Body-Treatment-Single-2');
    const waxInfo2 = document.getElementById('Wax-Info-Single-2');
    const multipleServicesInfo2 = document.getElementById('Multiple-Services-Info-Single-2');

    // Single Service Conditional fields (Set 3)
    const singleService3 = document.getElementById('Service-Single-3');
    const singlePackage3 = document.getElementById('Package-Single-3');
    const spaDelSolDreamInfo3 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-3');
    const singleMassage3 = document.getElementById('Massage-Single-3');
    const massageDurationA3 = document.getElementById('Duration-A-Single-3');
    const massageDurationB3 = document.getElementById('Duration-B-Single-3');
    const combinationType3 = document.getElementById('Combination-Single-3');
    const singleFacial3 = document.getElementById('Facial-Single-3');
    const facialAddOn3 = document.getElementById('Add-On-Single-3');
    const bodyTreatment3 = document.getElementById('Body-Treatment-Single-3');
    const waxInfo3 = document.getElementById('Wax-Info-Single-3');
    const multipleServicesInfo3 = document.getElementById('Multiple-Services-Info-Single-3');

    // Couple Service Conditional fields
    const coupleService = document.getElementById('Service-Couple');
    const couplePackage = document.getElementById('Package-Couple');
    const couplePackageLabel = document.getElementById('Package-Couple-Label');
    const spaDelSolDreamInfoCouple = document.getElementById('Spa-Del-Sol-Dream-Info-Couple');
    const otherPackagesInfoCouple = document.getElementById('Other-Packages-Info-Couple');
    const coupleMassage = document.getElementById('Massage-Couple');
    const coupleMassageLabel = document.getElementById('Massage-Couple-Label');
    const massageDurationACouple = document.getElementById('Duration-A-Couple');
    const massageDurationACoupleLabel = document.getElementById('Duration-A-Couple-Label');
    const massageDurationBCouple = document.getElementById('Duration-B-Couple');
    const massageDurationBCoupleLabel = document.getElementById('Duration-B-Couple-Label');
    const prenatalMassageCouple = document.getElementById('Prenatal-Massage-Couple');
    const prenatalMassageCoupleLabel = document.getElementById('Prenatal-Massage-Couple-Label');
    const combinationSelectsWrapperCouple = document.getElementById('Combination-Selects-Wrapper-Couple');
    const combinationGuest1CoupleLabel = document.getElementById('Combination-Guest-1-Couple-Label');
    const combinationGuest2CoupleLabel = document.getElementById('Combination-Guest-2-Couple-Label');
    const differentMassagesSelectsWrapperCouple = document.getElementById('Different-Massages-Selects-Wrapper-Couple');
    const massageGuest1CoupleLabel = document.getElementById('Massage-Guest-1-Couple-Label');
    const massageGuest2CoupleLabel = document.getElementById('Massage-Guest-2-Couple-Label');
    const durationAGuest1And2Couple = document.getElementById('Duration-A-Guest-1-And-2-Couple');
    const durationAGuest1And2CoupleLabel = document.getElementById('Duration-A-Guest-1-And-2-Couple-Label');
    const facialSelectsWrapperCouple = document.getElementById('Facial-Selects-Wrapper-Couple');
    const facialGuest1CoupleLabel = document.getElementById('Facial-Guest-1-Couple-Label');
    const facialGuest2CoupleLabel = document.getElementById('Facial-Guest-2-Couple-Label');
    const facialAddOnGuest1Couple = document.getElementById('Facial-Add-On-Guest-1-Couple');
    const facialAddOnGuest1CoupleLabel = document.getElementById('Facial-Add-On-Guest-1-Couple-Label');
    const facialAddOnGuest2Couple = document.getElementById('Facial-Add-On-Guest-2-Couple');
    const facialAddOnGuest2CoupleLabel = document.getElementById('Facial-Add-On-Guest-2-Couple-Label');
    const bodyTreatmentsSelectsWrapperCouple = document.getElementById('Body-Treatments-Selects-Wrapper-Couple');
    const bodyTreatmentGuest1CoupleLabel = document.getElementById('Body-Treatment-Guest-1-Couple-Label');
    const bodyTreatmentGuest2CoupleLabel = document.getElementById('Body-Treatment-Guest-2-Couple-Label');
    const otherServicesInfoCouple = document.getElementById('Other-Services-Info-Couple');

    // Couple Service Conditional fields (Set 1)
    const coupleService1 = document.getElementById('Service-Couple-1');
    const couplePackage1 = document.getElementById('Package-Couple-1');
    const couplePackageLabel1 = document.getElementById('Package-Couple-1-Label');
    const spaDelSolDreamInfoCouple1 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-1');
    const otherPackagesInfoCouple1 = document.getElementById('Other-Packages-Info-Couple-1');
    const coupleMassage1 = document.getElementById('Massage-Couple-1');
    const coupleMassageLabel1 = document.getElementById('Massage-Couple-1-Label');
    const massageDurationACouple1 = document.getElementById('Duration-A-Couple-1');
    const massageDurationACoupleLabel1 = document.getElementById('Duration-A-Couple-1-Label');
    const massageDurationBCouple1 = document.getElementById('Duration-B-Couple-1');
    const massageDurationBCoupleLabel1 = document.getElementById('Duration-B-Couple-1-Label');
    const prenatalMassageCouple1 = document.getElementById('Prenatal-Massage-Couple-1');
    const prenatalMassageCoupleLabel1 = document.getElementById('Prenatal-Massage-Couple-1-Label');
    const combinationSelectsWrapperCouple1 = document.getElementById('Combination-Selects-Wrapper-Couple-1');
    const combinationGuest1CoupleLabel1 = document.getElementById('Combination-Guest-1-Couple-1-Label');
    const combinationGuest2CoupleLabel1 = document.getElementById('Combination-Guest-2-Couple-1-Label');
    const differentMassagesSelectsWrapperCouple1 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-1');
    const massageGuest1CoupleLabel1 = document.getElementById('Massage-Guest-1-Couple-1-Label');
    const massageGuest2CoupleLabel1 = document.getElementById('Massage-Guest-2-Couple-1-Label');
    const durationAGuest1And2Couple1 = document.getElementById('Duration-A-Guest-1-And-2-Couple-1');
    const durationAGuest1And2CoupleLabel1 = document.getElementById('Duration-A-Guest-1-And-2-Couple-1-Label');
    const facialSelectsWrapperCouple1 = document.getElementById('Facial-Selects-Wrapper-Couple-1');
    const facialGuest1CoupleLabel1 = document.getElementById('Facial-Guest-1-Couple-1-Label');
    const facialGuest2CoupleLabel1 = document.getElementById('Facial-Guest-2-Couple-1-Label');
    const facialAddOnGuest1Couple1 = document.getElementById('Facial-Add-On-Guest-1-Couple-1');
    const facialAddOnGuest1CoupleLabel1 = document.getElementById('Facial-Add-On-Guest-1-Couple-1-Label');
    const facialAddOnGuest2Couple1 = document.getElementById('Facial-Add-On-Guest-2-Couple-1');
    const facialAddOnGuest2CoupleLabel1 = document.getElementById('Facial-Add-On-Guest-2-Couple-1-Label');
    const bodyTreatmentsSelectsWrapperCouple1 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-1');
    const bodyTreatmentGuest1CoupleLabel1 = document.getElementById('Body-Treatment-Guest-1-Couple-1-Label');
    const bodyTreatmentGuest2CoupleLabel1 = document.getElementById('Body-Treatment-Guest-2-Couple-1-Label');
    const otherServicesInfoCouple1 = document.getElementById('Other-Services-Info-Couple-1');

    // Couple Service Conditional fields (Set 2)
    const coupleService2 = document.getElementById('Service-Couple-2');
    const couplePackage2 = document.getElementById('Package-Couple-2');
    const couplePackageLabel2 = document.getElementById('Package-Couple-2-Label');
    const spaDelSolDreamInfoCouple2 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-2');
    const otherPackagesInfoCouple2 = document.getElementById('Other-Packages-Info-Couple-2');
    const coupleMassage2 = document.getElementById('Massage-Couple-2');
    const coupleMassageLabel2 = document.getElementById('Massage-Couple-2-Label');
    const massageDurationACouple2 = document.getElementById('Duration-A-Couple-2');
    const massageDurationACoupleLabel2 = document.getElementById('Duration-A-Couple-2-Label');
    const massageDurationBCouple2 = document.getElementById('Duration-B-Couple-2');
    const massageDurationBCoupleLabel2 = document.getElementById('Duration-B-Couple-2-Label');
    const prenatalMassageCouple2 = document.getElementById('Prenatal-Massage-Couple-2');
    const prenatalMassageCoupleLabel2 = document.getElementById('Prenatal-Massage-Couple-2-Label');
    const combinationSelectsWrapperCouple2 = document.getElementById('Combination-Selects-Wrapper-Couple-2');
    const combinationGuest1CoupleLabel2 = document.getElementById('Combination-Guest-1-Couple-2-Label');
    const combinationGuest2CoupleLabel2 = document.getElementById('Combination-Guest-2-Couple-2-Label');
    const differentMassagesSelectsWrapperCouple2 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-2');
    const massageGuest1CoupleLabel2 = document.getElementById('Massage-Guest-1-Couple-2-Label');
    const massageGuest2CoupleLabel2 = document.getElementById('Massage-Guest-2-Couple-2-Label');
    const durationAGuest1And2Couple2 = document.getElementById('Duration-A-Guest-1-And-2-Couple-2');
    const durationAGuest1And2CoupleLabel2 = document.getElementById('Duration-A-Guest-1-And-2-Couple-2-Label');
    const facialSelectsWrapperCouple2 = document.getElementById('Facial-Selects-Wrapper-Couple-2');
    const facialGuest1CoupleLabel2 = document.getElementById('Facial-Guest-1-Couple-2-Label');
    const facialGuest2CoupleLabel2 = document.getElementById('Facial-Guest-2-Couple-2-Label');
    const facialAddOnGuest1Couple2 = document.getElementById('Facial-Add-On-Guest-1-Couple-2');
    const facialAddOnGuest1CoupleLabel2 = document.getElementById('Facial-Add-On-Guest-1-Couple-2-Label');
    const facialAddOnGuest2Couple2 = document.getElementById('Facial-Add-On-Guest-2-Couple-2');
    const facialAddOnGuest2CoupleLabel2 = document.getElementById('Facial-Add-On-Guest-2-Couple-2-Label');
    const bodyTreatmentsSelectsWrapperCouple2 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-2');
    const bodyTreatmentGuest1CoupleLabel2 = document.getElementById('Body-Treatment-Guest-1-Couple-2-Label');
    const bodyTreatmentGuest2CoupleLabel2 = document.getElementById('Body-Treatment-Guest-2-Couple-2-Label');
    const otherServicesInfoCouple2 = document.getElementById('Other-Services-Info-Couple-2');

    // Couple Service Conditional fields (Set 3)
    const coupleService3 = document.getElementById('Service-Couple-3');
    const couplePackage3 = document.getElementById('Package-Couple-3');
    const couplePackageLabel3 = document.getElementById('Package-Couple-3-Label');
    const spaDelSolDreamInfoCouple3 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-3');
    const otherPackagesInfoCouple3 = document.getElementById('Other-Packages-Info-Couple-3');
    const coupleMassage3 = document.getElementById('Massage-Couple-3');
    const coupleMassageLabel3 = document.getElementById('Massage-Couple-3-Label');
    const massageDurationACouple3 = document.getElementById('Duration-A-Couple-3');
    const massageDurationACoupleLabel3 = document.getElementById('Duration-A-Couple-3-Label');
    const massageDurationBCouple3 = document.getElementById('Duration-B-Couple-3');
    const massageDurationBCoupleLabel3 = document.getElementById('Duration-B-Couple-3-Label');
    const prenatalMassageCouple3 = document.getElementById('Prenatal-Massage-Couple-3');
    const prenatalMassageCoupleLabel3 = document.getElementById('Prenatal-Massage-Couple-3-Label');
    const combinationSelectsWrapperCouple3 = document.getElementById('Combination-Selects-Wrapper-Couple-3');
    const combinationGuest1CoupleLabel3 = document.getElementById('Combination-Guest-1-Couple-3-Label');
    const combinationGuest2CoupleLabel3 = document.getElementById('Combination-Guest-2-Couple-3-Label');
    const differentMassagesSelectsWrapperCouple3 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-3');
    const massageGuest1CoupleLabel3 = document.getElementById('Massage-Guest-1-Couple-3-Label');
    const massageGuest2CoupleLabel3 = document.getElementById('Massage-Guest-2-Couple-3-Label');
    const durationAGuest1And2Couple3 = document.getElementById('Duration-A-Guest-1-And-2-Couple-3');
    const durationAGuest1And2CoupleLabel3 = document.getElementById('Duration-A-Guest-1-And-2-Couple-3-Label');
    const facialSelectsWrapperCouple3 = document.getElementById('Facial-Selects-Wrapper-Couple-3');
    const facialGuest1CoupleLabel3 = document.getElementById('Facial-Guest-1-Couple-3-Label');
    const facialGuest2CoupleLabel3 = document.getElementById('Facial-Guest-2-Couple-3-Label');
    const facialAddOnGuest1Couple3 = document.getElementById('Facial-Add-On-Guest-1-Couple-3');
    const facialAddOnGuest1CoupleLabel3 = document.getElementById('Facial-Add-On-Guest-1-Couple-3-Label');
    const facialAddOnGuest2Couple3 = document.getElementById('Facial-Add-On-Guest-2-Couple-3');
    const facialAddOnGuest2CoupleLabel3 = document.getElementById('Facial-Add-On-Guest-2-Couple-3-Label');
    const bodyTreatmentsSelectsWrapperCouple3 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-3');
    const bodyTreatmentGuest1CoupleLabel3 = document.getElementById('Body-Treatment-Guest-1-Couple-3-Label');
    const bodyTreatmentGuest2CoupleLabel3 = document.getElementById('Body-Treatment-Guest-2-Couple-3-Label');
    const otherServicesInfoCouple3 = document.getElementById('Other-Services-Info-Couple-3');

    // Hide all conditional fields initially
    function hideAllConditionals() {
        singlePackage.style.display = 'none';
        spaDelSolDreamInfo.style.display = 'none';
        singleMassage.style.display = 'none';
        massageDurationA.style.display = 'none';
        massageDurationB.style.display = 'none';
        combinationType.style.display = 'none';
        singleFacial.style.display = 'none';
        facialAddOn.style.display = 'none';
        bodyTreatment.style.display = 'none';
        waxInfo.style.display = 'none';
        multipleServicesInfo.style.display = 'none';

        singlePackage1.style.display = 'none';
        spaDelSolDreamInfo1.style.display = 'none';
        singleMassage1.style.display = 'none';
        massageDurationA1.style.display = 'none';
        massageDurationB1.style.display = 'none';
        combinationType1.style.display = 'none';
        singleFacial1.style.display = 'none';
        facialAddOn1.style.display = 'none';
        bodyTreatment1.style.display = 'none';
        waxInfo1.style.display = 'none';
        multipleServicesInfo1.style.display = 'none';

        singlePackage2.style.display = 'none';
        spaDelSolDreamInfo2.style.display = 'none';
        singleMassage2.style.display = 'none';
        massageDurationA2.style.display = 'none';
        massageDurationB2.style.display = 'none';
        combinationType2.style.display = 'none';
        singleFacial2.style.display = 'none';
        facialAddOn2.style.display = 'none';
        bodyTreatment2.style.display = 'none';
        waxInfo2.style.display = 'none';
        multipleServicesInfo2.style.display = 'none';

        singlePackage3.style.display = 'none';
        spaDelSolDreamInfo3.style.display = 'none';
        singleMassage3.style.display = 'none';
        massageDurationA3.style.display = 'none';
        massageDurationB3.style.display = 'none';
        combinationType3.style.display = 'none';
        singleFacial3.style.display = 'none';
        facialAddOn3.style.display = 'none';
        bodyTreatment3.style.display = 'none';
        waxInfo3.style.display = 'none';
        multipleServicesInfo3.style.display = 'none';

        couplePackage.style.display = 'none';
        couplePackageLabel.style.display = 'none';
        spaDelSolDreamInfoCouple.style.display = 'none';
        otherPackagesInfoCouple.style.display = 'none';
        coupleMassage.style.display = 'none';
        coupleMassageLabel.style.display = 'none';
        massageDurationACouple.style.display = 'none';
        massageDurationACoupleLabel.style.display = 'none';
        massageDurationBCouple.style.display = 'none';
        massageDurationBCoupleLabel.style.display = 'none';
        prenatalMassageCouple.style.display = 'none';
        prenatalMassageCoupleLabel.style.display = 'none';
        combinationSelectsWrapperCouple.style.display = 'none';
        combinationGuest1CoupleLabel.style.display = 'none';
        combinationGuest2CoupleLabel.style.display = 'none';
        differentMassagesSelectsWrapperCouple.style.display = 'none';
        massageGuest1CoupleLabel.style.display = 'none';
        massageGuest2CoupleLabel.style.display = 'none';
        durationAGuest1And2Couple.style.display = 'none';
        durationAGuest1And2CoupleLabel.style.display = 'none';
        facialSelectsWrapperCouple.style.display = 'none';
        facialGuest1CoupleLabel.style.display = 'none';
        facialGuest2CoupleLabel.style.display = 'none';
        facialAddOnGuest1Couple.style.display = 'none';
        facialAddOnGuest1CoupleLabel.style.display = 'none';
        facialAddOnGuest2Couple.style.display = 'none';
        facialAddOnGuest2CoupleLabel.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple.style.display = 'none';
        bodyTreatmentGuest1CoupleLabel.style.display = 'none';
        bodyTreatmentGuest2CoupleLabel.style.display = 'none';
        otherServicesInfoCouple.style.display = 'none';

        couplePackage1.style.display = 'none';
        couplePackageLabel1.style.display = 'none';
        spaDelSolDreamInfoCouple1.style.display = 'none';
        otherPackagesInfoCouple1.style.display = 'none';
        coupleMassage1.style.display = 'none';
        coupleMassageLabel1.style.display = 'none';
        massageDurationACouple1.style.display = 'none';
        massageDurationACoupleLabel1.style.display = 'none';
        massageDurationBCouple1.style.display = 'none';
        massageDurationBCoupleLabel1.style.display = 'none';
        prenatalMassageCouple1.style.display = 'none';
        prenatalMassageCoupleLabel1.style.display = 'none';
        combinationSelectsWrapperCouple1.style.display = 'none';
        combinationGuest1CoupleLabel1.style.display = 'none';
        combinationGuest2CoupleLabel1.style.display = 'none';
        differentMassagesSelectsWrapperCouple1.style.display = 'none';
        massageGuest1CoupleLabel1.style.display = 'none';
        massageGuest2CoupleLabel1.style.display = 'none';
        durationAGuest1And2Couple1.style.display = 'none';
        durationAGuest1And2CoupleLabel1.style.display = 'none';
        facialSelectsWrapperCouple1.style.display = 'none';
        facialGuest1CoupleLabel1.style.display = 'none';
        facialGuest2CoupleLabel1.style.display = 'none';
        facialAddOnGuest1Couple1.style.display = 'none';
        facialAddOnGuest1CoupleLabel1.style.display = 'none';
        facialAddOnGuest2Couple1.style.display = 'none';
        facialAddOnGuest2CoupleLabel1.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple1.style.display = 'none';
        bodyTreatmentGuest1CoupleLabel1.style.display = 'none';
        bodyTreatmentGuest2CoupleLabel1.style.display = 'none';
        otherServicesInfoCouple1.style.display = 'none';

        couplePackage2.style.display = 'none';
        couplePackageLabel2.style.display = 'none';
        spaDelSolDreamInfoCouple2.style.display = 'none';
        otherPackagesInfoCouple2.style.display = 'none';
        coupleMassage2.style.display = 'none';
        coupleMassageLabel2.style.display = 'none';
        massageDurationACouple2.style.display = 'none';
        massageDurationACoupleLabel2.style.display = 'none';
        massageDurationBCouple2.style.display = 'none';
        massageDurationBCoupleLabel2.style.display = 'none';
        prenatalMassageCouple2.style.display = 'none';
        prenatalMassageCoupleLabel2.style.display = 'none';
        combinationSelectsWrapperCouple2.style.display = 'none';
        combinationGuest1CoupleLabel2.style.display = 'none';
        combinationGuest2CoupleLabel2.style.display = 'none';
        differentMassagesSelectsWrapperCouple2.style.display = 'none';
        massageGuest1CoupleLabel2.style.display = 'none';
        massageGuest2CoupleLabel2.style.display = 'none';
        durationAGuest1And2Couple2.style.display = 'none';
        durationAGuest1And2CoupleLabel2.style.display = 'none';
        facialSelectsWrapperCouple2.style.display = 'none';
        facialGuest1CoupleLabel2.style.display = 'none';
        facialGuest2CoupleLabel2.style.display = 'none';
        facialAddOnGuest1Couple2.style.display = 'none';
        facialAddOnGuest1CoupleLabel2.style.display = 'none';
        facialAddOnGuest2Couple2.style.display = 'none';
        facialAddOnGuest2CoupleLabel2.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple2.style.display = 'none';
        bodyTreatmentGuest1CoupleLabel2.style.display = 'none';
        bodyTreatmentGuest2CoupleLabel2.style.display = 'none';
        otherServicesInfoCouple2.style.display = 'none';

        couplePackage3.style.display = 'none';
        couplePackageLabel3.style.display = 'none';
        spaDelSolDreamInfoCouple3.style.display = 'none';
        otherPackagesInfoCouple3.style.display = 'none';
        coupleMassage3.style.display = 'none';
        coupleMassageLabel3.style.display = 'none';
        massageDurationACouple3.style.display = 'none';
        massageDurationACoupleLabel3.style.display = 'none';
        massageDurationBCouple3.style.display = 'none';
        massageDurationBCoupleLabel3.style.display = 'none';
        prenatalMassageCouple3.style.display = 'none';
        prenatalMassageCoupleLabel3.style.display = 'none';
        combinationSelectsWrapperCouple3.style.display = 'none';
        combinationGuest1CoupleLabel3.style.display = 'none';
        combinationGuest2CoupleLabel3.style.display = 'none';
        differentMassagesSelectsWrapperCouple3.style.display = 'none';
        massageGuest1CoupleLabel3.style.display = 'none';
        massageGuest2CoupleLabel3.style.display = 'none';
        durationAGuest1And2Couple3.style.display = 'none';
        durationAGuest1And2CoupleLabel3.style.display = 'none';
        facialSelectsWrapperCouple3.style.display = 'none';
        facialGuest1CoupleLabel3.style.display = 'none';
        facialGuest2CoupleLabel3.style.display = 'none';
        facialAddOnGuest1Couple3.style.display = 'none';
        facialAddOnGuest1CoupleLabel3.style.display = 'none';
        facialAddOnGuest2Couple3.style.display = 'none';
        facialAddOnGuest2CoupleLabel3.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple3.style.display = 'none';
        bodyTreatmentGuest1CoupleLabel3.style.display = 'none';
        bodyTreatmentGuest2CoupleLabel3.style.display = 'none';
        otherServicesInfoCouple3.style.display = 'none';
    }

    // Reset a specific field
    function resetField(field) {
        if (field) {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
                field.value = '';
            }
        }
    }

    // Function to reset and hide children conditionals
    function resetAndHideChildren(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Single':
                resetField(singlePackage);
                resetField(spaDelSolDreamInfo);
                resetField(singleMassage);
                resetField(massageDurationA);
                resetField(massageDurationB);
                resetField(combinationType);
                resetField(singleFacial);
                resetField(facialAddOn);
                resetField(bodyTreatment);
                resetField(waxInfo);
                resetField(multipleServicesInfo);
                break;

            case 'Package-Single':
                resetField(spaDelSolDreamInfo);
                break;

            case 'Massage-Single':
                resetField(massageDurationA);
                resetField(massageDurationB);
                resetField(combinationType);
                break;

            case 'Facial-Single':
                resetField(facialAddOn);
                break;

            case 'Service-Single-1':
                resetField(singlePackage1);
                resetField(spaDelSolDreamInfo1);
                resetField(singleMassage1);
                resetField(massageDurationA1);
                resetField(massageDurationB1);
                resetField(combinationType1);
                resetField(singleFacial1);
                resetField(facialAddOn1);
                resetField(bodyTreatment1);
                resetField(waxInfo1);
                resetField(multipleServicesInfo1);
                break;

            case 'Package-Single-1':
                resetField(spaDelSolDreamInfo1);
                break;

            case 'Massage-Single-1':
                resetField(massageDurationA1);
                resetField(massageDurationB1);
                resetField(combinationType1);
                break;

            case 'Facial-Single-1':
                resetField(facialAddOn1);
                break;

            case 'Service-Single-2':
                resetField(singlePackage2);
                resetField(spaDelSolDreamInfo2);
                resetField(singleMassage2);
                resetField(massageDurationA2);
                resetField(massageDurationB2);
                resetField(combinationType2);
                resetField(singleFacial2);
                resetField(facialAddOn2);
                resetField(bodyTreatment2);
                resetField(waxInfo2);
                resetField(multipleServicesInfo2);
                break;

            case 'Package-Single-2':
                resetField(spaDelSolDreamInfo2);
                break;

            case 'Massage-Single-2':
                resetField(massageDurationA2);
                resetField(massageDurationB2);
                resetField(combinationType2);
                break;

            case 'Facial-Single-2':
                resetField(facialAddOn2);
                break;

            case 'Service-Single-3':
                resetField(singlePackage3);
                resetField(spaDelSolDreamInfo3);
                resetField(singleMassage3);
                resetField(massageDurationA3);
                resetField(massageDurationB3);
                resetField(combinationType3);
                resetField(singleFacial3);
                resetField(facialAddOn3);
                resetField(bodyTreatment3);
                resetField(waxInfo3);
                resetField(multipleServicesInfo3);
                break;

            case 'Package-Single-3':
                resetField(spaDelSolDreamInfo3);
                break;

            case 'Massage-Single-3':
                resetField(massageDurationA3);
                resetField(massageDurationB3);
                resetField(combinationType3);
                break;

            case 'Facial-Single-3':
                resetField(facialAddOn3);
                break;

            case 'Service-Couple':
                resetField(couplePackage);
                couplePackageLabel.style.display = 'none'; // Hide the label
                resetField(spaDelSolDreamInfoCouple);
                resetField(otherPackagesInfoCouple);
                resetField(coupleMassage);
                coupleMassageLabel.style.display = 'none'; // Hide the label
                resetField(massageDurationACouple);
                massageDurationACoupleLabel.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple);
                massageDurationBCoupleLabel.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple);
                prenatalMassageCoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple'));
                combinationGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple'));
                combinationGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple'));
                massageGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple'));
                massageGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple);
                durationAGuest1And2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-1-Couple'));
                facialGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-2-Couple'));
                facialGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest1Couple);
                facialAddOnGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest2Couple);
                facialAddOnGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple'));
                bodyTreatmentGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple'));
                bodyTreatmentGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(otherServicesInfoCouple);
                break;

            case 'Package-Couple':
                resetField(spaDelSolDreamInfoCouple);
                resetField(otherPackagesInfoCouple);
                break;

            case 'Massage-Couple':
                resetField(massageDurationACouple);
                massageDurationACoupleLabel.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple);
                massageDurationBCoupleLabel.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple);
                prenatalMassageCoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple'));
                combinationGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple'));
                combinationGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple'));
                massageGuest1CoupleLabel.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple'));
                massageGuest2CoupleLabel.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple);
                durationAGuest1And2CoupleLabel.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-1-Couple':
                resetField(facialAddOnGuest1Couple);
                facialAddOnGuest1CoupleLabel.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-2-Couple':
                resetField(facialAddOnGuest2Couple);
                facialAddOnGuest2CoupleLabel.style.display = 'none'; // Hide the label
                break;

            case 'Service-Couple-1':
                resetField(couplePackage1);
                couplePackageLabel1.style.display = 'none'; // Hide the label
                resetField(spaDelSolDreamInfoCouple1);
                resetField(otherPackagesInfoCouple1);
                resetField(coupleMassage1);
                coupleMassageLabel1.style.display = 'none'; // Hide the label
                resetField(massageDurationACouple1);
                massageDurationACoupleLabel1.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple1);
                massageDurationBCoupleLabel1.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple1);
                prenatalMassageCoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-1'));
                combinationGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-1'));
                combinationGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-1'));
                massageGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-1'));
                massageGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple1);
                durationAGuest1And2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-1-Couple-1'));
                facialGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-2-Couple-1'));
                facialGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest1Couple1);
                facialAddOnGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest2Couple1);
                facialAddOnGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-1'));
                bodyTreatmentGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-1'));
                bodyTreatmentGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(otherServicesInfoCouple1);
                break;

            case 'Package-Couple-1':
                resetField(spaDelSolDreamInfoCouple1);
                resetField(otherPackagesInfoCouple1);
                break;

            case 'Massage-Couple-1':
                resetField(massageDurationACouple1);
                massageDurationACoupleLabel1.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple1);
                massageDurationBCoupleLabel1.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple1);
                prenatalMassageCoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-1'));
                combinationGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-1'));
                combinationGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-1'));
                massageGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-1'));
                massageGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple1);
                durationAGuest1And2CoupleLabel1.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-1-Couple-1':
                resetField(facialAddOnGuest1Couple1);
                facialAddOnGuest1CoupleLabel1.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-2-Couple-1':
                resetField(facialAddOnGuest2Couple1);
                facialAddOnGuest2CoupleLabel1.style.display = 'none'; // Hide the label
                break;

            case 'Service-Couple-2':
                resetField(couplePackage2);
                couplePackageLabel2.style.display = 'none'; // Hide the label
                resetField(spaDelSolDreamInfoCouple2);
                resetField(otherPackagesInfoCouple2);
                resetField(coupleMassage2);
                coupleMassageLabel2.style.display = 'none'; // Hide the label
                resetField(massageDurationACouple2);
                massageDurationACoupleLabel2.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple2);
                massageDurationBCoupleLabel2.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple2);
                prenatalMassageCoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-2'));
                combinationGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-2'));
                combinationGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-2'));
                massageGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-2'));
                massageGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple2);
                durationAGuest1And2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-1-Couple-2'));
                facialGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-2-Couple-2'));
                facialGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest1Couple2);
                facialAddOnGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest2Couple2);
                facialAddOnGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-2'));
                bodyTreatmentGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-2'));
                bodyTreatmentGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(otherServicesInfoCouple2);
                break;

            case 'Package-Couple-2':
                resetField(spaDelSolDreamInfoCouple2);
                resetField(otherPackagesInfoCouple2);
                break;

            case 'Massage-Couple-2':
                resetField(massageDurationACouple2);
                massageDurationACoupleLabel2.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple2);
                massageDurationBCoupleLabel2.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple2);
                prenatalMassageCoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-2'));
                combinationGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-2'));
                combinationGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-2'));
                massageGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-2'));
                massageGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple2);
                durationAGuest1And2CoupleLabel2.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-1-Couple-2':
                resetField(facialAddOnGuest1Couple2);
                facialAddOnGuest1CoupleLabel2.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-2-Couple-2':
                resetField(facialAddOnGuest2Couple2);
                facialAddOnGuest2CoupleLabel2.style.display = 'none'; // Hide the label
                break;

            case 'Service-Couple-3':
                resetField(couplePackage3);
                couplePackageLabel3.style.display = 'none'; // Hide the label
                resetField(spaDelSolDreamInfoCouple3);
                resetField(otherPackagesInfoCouple3);
                resetField(coupleMassage3);
                coupleMassageLabel3.style.display = 'none'; // Hide the label
                resetField(massageDurationACouple3);
                massageDurationACoupleLabel3.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple3);
                massageDurationBCoupleLabel3.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple3);
                prenatalMassageCoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-3'));
                combinationGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-3'));
                combinationGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-3'));
                massageGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-3'));
                massageGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple3);
                durationAGuest1And2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-1-Couple-3'));
                facialGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Facial-Guest-2-Couple-3'));
                facialGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest1Couple3);
                facialAddOnGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(facialAddOnGuest2Couple3);
                facialAddOnGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-3'));
                bodyTreatmentGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-3'));
                bodyTreatmentGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(otherServicesInfoCouple3);
                break;

            case 'Package-Couple-3':
                resetField(spaDelSolDreamInfoCouple3);
                resetField(otherPackagesInfoCouple3);
                break;

            case 'Massage-Couple-3':
                resetField(massageDurationACouple3);
                massageDurationACoupleLabel3.style.display = 'none'; // Hide the label
                resetField(massageDurationBCouple3);
                massageDurationBCoupleLabel3.style.display = 'none'; // Hide the label
                resetField(prenatalMassageCouple3);
                prenatalMassageCoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-1-Couple-3'));
                combinationGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Combination-Guest-2-Couple-3'));
                combinationGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-1-Couple-3'));
                massageGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(document.getElementById('Massage-Guest-2-Couple-3'));
                massageGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                resetField(durationAGuest1And2Couple3);
                durationAGuest1And2CoupleLabel3.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-1-Couple-3':
                resetField(facialAddOnGuest1Couple3);
                facialAddOnGuest1CoupleLabel3.style.display = 'none'; // Hide the label
                break;

            case 'Facial-Guest-2-Couple-3':
                resetField(facialAddOnGuest2Couple3);
                facialAddOnGuest2CoupleLabel3.style.display = 'none'; // Hide the label
                break;
        }
    }

    // Show/hide and reset conditionals based on selected values
    function handleConditionals() {
        hideAllConditionals();

        // Single Service Conditionals
        const singleServiceValue = singleService.value;
        if (singleServiceValue === 'Package') {
            singlePackage.style.display = 'block';
        } else if (singleServiceValue === 'Massage') {
            singleMassage.style.display = 'block';
        } else if (singleServiceValue === 'Facial') {
            singleFacial.style.display = 'block';
        } else if (singleServiceValue === 'Body treatment') {
            bodyTreatment.style.display = 'block';
        } else if (singleServiceValue === 'Wax') {
            waxInfo.style.display = 'block';
        } else if (singleServiceValue === 'Multiple services') {
            multipleServicesInfo.style.display = 'block';
        }

        const singlePackageValue = singlePackage.value;
        if (singlePackageValue === 'Spa del Sol Dream') {
            spaDelSolDreamInfo.style.display = 'block';
        }

        const singleMassageValue = singleMassage.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue)) {
            massageDurationA.style.display = 'block';
        } else if (singleMassageValue === 'Reflexology') {
            massageDurationB.style.display = 'block';
        } else if (singleMassageValue === 'Relaxing Combination') {
            combinationType.style.display = 'block';
        }

        const singleFacialValue = singleFacial.value;
        if (singleFacialValue === 'Sol Janssen') {
            facialAddOn.style.display = 'block';
        }

        // Single Service Conditionals (Set 1)
        const singleServiceValue1 = singleService1.value;
        if (singleServiceValue1 === 'Package') {
            singlePackage1.style.display = 'block';
        } else if (singleServiceValue1 === 'Massage') {
            singleMassage1.style.display = 'block';
        } else if (singleServiceValue1 === 'Facial') {
            singleFacial1.style.display = 'block';
        } else if (singleServiceValue1 === 'Body treatment') {
            bodyTreatment1.style.display = 'block';
        } else if (singleServiceValue1 === 'Wax') {
            waxInfo1.style.display = 'block';
        } else if (singleServiceValue1 === 'Multiple services') {
            multipleServicesInfo1.style.display = 'block';
        }

        const singlePackageValue1 = singlePackage1.value;
        if (singlePackageValue1 === 'Spa del Sol Dream') {
            spaDelSolDreamInfo1.style.display = 'block';
        }

        const singleMassageValue1 = singleMassage1.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue1)) {
            massageDurationA1.style.display = 'block';
        } else if (singleMassageValue1 === 'Reflexology') {
            massageDurationB1.style.display = 'block';
        } else if (singleMassageValue1 === 'Relaxing Combination') {
            combinationType1.style.display = 'block';
        }

        const singleFacialValue1 = singleFacial1.value;
        if (singleFacialValue1 === 'Sol Janssen') {
            facialAddOn1.style.display = 'block';
        }

        // Single Service Conditionals (Set 2)
        const singleServiceValue2 = singleService2.value;
        if (singleServiceValue2 === 'Package') {
            singlePackage2.style.display = 'block';
        } else if (singleServiceValue2 === 'Massage') {
            singleMassage2.style.display = 'block';
        } else if (singleServiceValue2 === 'Facial') {
            singleFacial2.style.display = 'block';
        } else if (singleServiceValue2 === 'Body treatment') {
            bodyTreatment2.style.display = 'block';
        } else if (singleServiceValue2 === 'Wax') {
            waxInfo2.style.display = 'block';
        } else if (singleServiceValue2 === 'Multiple services') {
            multipleServicesInfo2.style.display = 'block';
        }

        const singlePackageValue2 = singlePackage2.value;
        if (singlePackageValue2 === 'Spa del Sol Dream') {
            spaDelSolDreamInfo2.style.display = 'block';
        }

        const singleMassageValue2 = singleMassage2.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue2)) {
            massageDurationA2.style.display = 'block';
        } else if (singleMassageValue2 === 'Reflexology') {
            massageDurationB2.style.display = 'block';
        } else if (singleMassageValue2 === 'Relaxing Combination') {
            combinationType2.style.display = 'block';
        }

        const singleFacialValue2 = singleFacial2.value;
        if (singleFacialValue2 === 'Sol Janssen') {
            facialAddOn2.style.display = 'block';
        }

        // Single Service Conditionals (Set 3)
        const singleServiceValue3 = singleService3.value;
        if (singleServiceValue3 === 'Package') {
            singlePackage3.style.display = 'block';
        } else if (singleServiceValue3 === 'Massage') {
            singleMassage3.style.display = 'block';
        } else if (singleServiceValue3 === 'Facial') {
            singleFacial3.style.display = 'block';
        } else if (singleServiceValue3 === 'Body treatment') {
            bodyTreatment3.style.display = 'block';
        } else if (singleServiceValue3 === 'Wax') {
            waxInfo3.style.display = 'block';
        } else if (singleServiceValue3 === 'Multiple services') {
            multipleServicesInfo3.style.display = 'block';
        }

        const singlePackageValue3 = singlePackage3.value;
        if (singlePackageValue3 === 'Spa del Sol Dream') {
            spaDelSolDreamInfo3.style.display = 'block';
        }

        const singleMassageValue3 = singleMassage3.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue3)) {
            massageDurationA3.style.display = 'block';
        } else if (singleMassageValue3 === 'Reflexology') {
            massageDurationB3.style.display = 'block';
        } else if (singleMassageValue3 === 'Relaxing Combination') {
            combinationType3.style.display = 'block';
        }

        const singleFacialValue3 = singleFacial3.value;
        if (singleFacialValue3 === 'Sol Janssen') {
            facialAddOn3.style.display = 'block';
        }

        // Couple Service Conditionals
        const coupleServiceValue = coupleService.value;
        if (coupleServiceValue === 'Package') {
            couplePackage.style.display = 'block';
            couplePackageLabel.style.display = 'block'; // Show the label
        } else if (coupleServiceValue === 'Massage') {
            coupleMassage.style.display = 'block';
            coupleMassageLabel.style.display = 'block'; // Show the label
        } else if (coupleServiceValue === 'Facial') {
            facialSelectsWrapperCouple.style.display = 'grid';
            facialGuest1CoupleLabel.style.display = 'block'; // Show the label
            facialGuest2CoupleLabel.style.display = 'block'; // Show the label
            facialAddOnGuest1CoupleLabel.style.display = 'block'; // Show the label
            facialAddOnGuest2CoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleServiceValue === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel.style.display = 'block'; // Show the label
            bodyTreatmentGuest2CoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleServiceValue === 'Other') {
            otherServicesInfoCouple.style.display = 'block';
        }

        const couplePackageValue = couplePackage.value;
        if (couplePackageValue === '2x Spa del Sol Dream') {
            spaDelSolDreamInfoCouple.style.display = 'block';
        } else if (couplePackageValue === 'Two different packages') {
            otherPackagesInfoCouple.style.display = 'block';
        }

        const coupleMassageValue = coupleMassage.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue)) {
            massageDurationACouple.style.display = 'block';
            massageDurationACoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleMassageValue === 'Reflexology') {
            massageDurationBCouple.style.display = 'block';
            massageDurationBCoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleMassageValue === 'Prenatal and other') {
            prenatalMassageCouple.style.display = 'block';
            prenatalMassageCoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleMassageValue === 'Relaxing Combination') {
            combinationSelectsWrapperCouple.style.display = 'grid';
            combinationGuest1CoupleLabel.style.display = 'block'; // Show the label
            combinationGuest2CoupleLabel.style.display = 'block'; // Show the label
        } else if (coupleMassageValue === 'Two different types') {
            differentMassagesSelectsWrapperCouple.style.display = 'grid';
            massageGuest1CoupleLabel.style.display = 'block'; // Show the label
            massageGuest2CoupleLabel.style.display = 'block'; // Show the label
        }

        const massageGuest1Value = document.getElementById('Massage-Guest-1-Couple').value;
        const massageGuest2Value = document.getElementById('Massage-Guest-2-Couple').value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            durationAGuest1And2Couple.style.display = 'block';
            durationAGuest1And2CoupleLabel.style.display = 'block'; // Show the label
        }

        const facialGuest1Value = document.getElementById('Facial-Guest-1-Couple').value;
        if (facialGuest1Value === 'Sol Janssen') {
            facialAddOnGuest1Couple.style.display = 'block';
            facialAddOnGuest1CoupleLabel.style.display = 'block'; // Show the label
        }

        const facialGuest2Value = document.getElementById('Facial-Guest-2-Couple').value;
        if (facialGuest2Value === 'Sol Janssen') {
            facialAddOnGuest2Couple.style.display = 'block';
            facialAddOnGuest2CoupleLabel.style.display = 'block'; // Show the label
        }

        // Couple Service Conditionals (Set 1)
        const coupleServiceValue1 = coupleService1.value;
        if (coupleServiceValue1 === 'Package') {
            couplePackage1.style.display = 'block';
            couplePackageLabel1.style.display = 'block'; // Show the label
        } else if (coupleServiceValue1 === 'Massage') {
            coupleMassage1.style.display = 'block';
            coupleMassageLabel1.style.display = 'block'; // Show the label
        } else if (coupleServiceValue1 === 'Facial') {
            facialSelectsWrapperCouple1.style.display = 'grid';
            facialGuest1CoupleLabel1.style.display = 'block'; // Show the label
            facialGuest2CoupleLabel1.style.display = 'block'; // Show the label
            facialAddOnGuest1CoupleLabel1.style.display = 'block'; // Show the label
            facialAddOnGuest2CoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleServiceValue1 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple1.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel1.style.display = 'block'; // Show the label
            bodyTreatmentGuest2CoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleServiceValue1 === 'Other') {
            otherServicesInfoCouple1.style.display = 'block';
        }

        const couplePackageValue1 = couplePackage1.value;
        if (couplePackageValue1 === '2x Spa del Sol Dream') {
            spaDelSolDreamInfoCouple1.style.display = 'block';
        } else if (couplePackageValue1 === 'Two different packages') {
            otherPackagesInfoCouple1.style.display = 'block';
        }

        const coupleMassageValue1 = coupleMassage1.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue1)) {
            massageDurationACouple1.style.display = 'block';
            massageDurationACoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleMassageValue1 === 'Reflexology') {
            massageDurationBCouple1.style.display = 'block';
            massageDurationBCoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleMassageValue1 === 'Prenatal and other') {
            prenatalMassageCouple1.style.display = 'block';
            prenatalMassageCoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleMassageValue1 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple1.style.display = 'grid';
            combinationGuest1CoupleLabel1.style.display = 'block'; // Show the label
            combinationGuest2CoupleLabel1.style.display = 'block'; // Show the label
        } else if (coupleMassageValue1 === 'Two different types') {
            differentMassagesSelectsWrapperCouple1.style.display = 'grid';
            massageGuest1CoupleLabel1.style.display = 'block'; // Show the label
            massageGuest2CoupleLabel1.style.display = 'block'; // Show the label
        }

        const massageGuest1Value1 = document.getElementById('Massage-Guest-1-Couple-1').value;
        const massageGuest2Value1 = document.getElementById('Massage-Guest-2-Couple-1').value;
        if (massageGuest1Value1 !== '' && massageGuest2Value1 !== '') {
            durationAGuest1And2Couple1.style.display = 'block';
            durationAGuest1And2CoupleLabel1.style.display = 'block'; // Show the label
        }

        const facialGuest1Value1 = document.getElementById('Facial-Guest-1-Couple-1').value;
        if (facialGuest1Value1 === 'Sol Janssen') {
            facialAddOnGuest1Couple1.style.display = 'block';
            facialAddOnGuest1CoupleLabel1.style.display = 'block'; // Show the label
        }

        const facialGuest2Value1 = document.getElementById('Facial-Guest-2-Couple-1').value;
        if (facialGuest2Value1 === 'Sol Janssen') {
            facialAddOnGuest2Couple1.style.display = 'block';
            facialAddOnGuest2CoupleLabel1.style.display = 'block'; // Show the label
        }

        // Couple Service Conditionals (Set 2)
        const coupleServiceValue2 = coupleService2.value;
        if (coupleServiceValue2 === 'Package') {
            couplePackage2.style.display = 'block';
            couplePackageLabel2.style.display = 'block'; // Show the label
        } else if (coupleServiceValue2 === 'Massage') {
            coupleMassage2.style.display = 'block';
            coupleMassageLabel2.style.display = 'block'; // Show the label
        } else if (coupleServiceValue2 === 'Facial') {
            facialSelectsWrapperCouple2.style.display = 'grid';
            facialGuest1CoupleLabel2.style.display = 'block'; // Show the label
            facialGuest2CoupleLabel2.style.display = 'block'; // Show the label
            facialAddOnGuest1CoupleLabel2.style.display = 'block'; // Show the label
            facialAddOnGuest2CoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleServiceValue2 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple2.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel2.style.display = 'block'; // Show the label
            bodyTreatmentGuest2CoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleServiceValue2 === 'Other') {
            otherServicesInfoCouple2.style.display = 'block';
        }

        const couplePackageValue2 = couplePackage2.value;
        if (couplePackageValue2 === '2x Spa del Sol Dream') {
            spaDelSolDreamInfoCouple2.style.display = 'block';
        } else if (couplePackageValue2 === 'Two different packages') {
            otherPackagesInfoCouple2.style.display = 'block';
        }

        const coupleMassageValue2 = coupleMassage2.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue2)) {
            massageDurationACouple2.style.display = 'block';
            massageDurationACoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleMassageValue2 === 'Reflexology') {
            massageDurationBCouple2.style.display = 'block';
            massageDurationBCoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleMassageValue2 === 'Prenatal and other') {
            prenatalMassageCouple2.style.display = 'block';
            prenatalMassageCoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleMassageValue2 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple2.style.display = 'grid';
            combinationGuest1CoupleLabel2.style.display = 'block'; // Show the label
            combinationGuest2CoupleLabel2.style.display = 'block'; // Show the label
        } else if (coupleMassageValue2 === 'Two different types') {
            differentMassagesSelectsWrapperCouple2.style.display = 'grid';
            massageGuest1CoupleLabel2.style.display = 'block'; // Show the label
            massageGuest2CoupleLabel2.style.display = 'block'; // Show the label
        }

        const massageGuest1Value2 = document.getElementById('Massage-Guest-1-Couple-2').value;
        const massageGuest2Value2 = document.getElementById('Massage-Guest-2-Couple-2').value;
        if (massageGuest1Value2 !== '' && massageGuest2Value2 !== '') {
            durationAGuest1And2Couple2.style.display = 'block';
            durationAGuest1And2CoupleLabel2.style.display = 'block'; // Show the label
        }

        const facialGuest1Value2 = document.getElementById('Facial-Guest-1-Couple-2').value;
        if (facialGuest1Value2 === 'Sol Janssen') {
            facialAddOnGuest1Couple2.style.display = 'block';
            facialAddOnGuest1CoupleLabel2.style.display = 'block'; // Show the label
        }

        const facialGuest2Value2 = document.getElementById('Facial-Guest-2-Couple-2').value;
        if (facialGuest2Value2 === 'Sol Janssen') {
            facialAddOnGuest2Couple2.style.display = 'block';
            facialAddOnGuest2CoupleLabel2.style.display = 'block'; // Show the label
        }

        // Couple Service Conditionals (Set 3)
        const coupleServiceValue3 = coupleService3.value;
        if (coupleServiceValue3 === 'Package') {
            couplePackage3.style.display = 'block';
            couplePackageLabel3.style.display = 'block'; // Show the label
        } else if (coupleServiceValue3 === 'Massage') {
            coupleMassage3.style.display = 'block';
            coupleMassageLabel3.style.display = 'block'; // Show the label
        } else if (coupleServiceValue3 === 'Facial') {
            facialSelectsWrapperCouple3.style.display = 'grid';
            facialGuest1CoupleLabel3.style.display = 'block'; // Show the label
            facialGuest2CoupleLabel3.style.display = 'block'; // Show the label
            facialAddOnGuest1CoupleLabel3.style.display = 'block'; // Show the label
            facialAddOnGuest2CoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleServiceValue3 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple3.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel3.style.display = 'block'; // Show the label
            bodyTreatmentGuest2CoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleServiceValue3 === 'Other') {
            otherServicesInfoCouple3.style.display = 'block';
        }

        const couplePackageValue3 = couplePackage3.value;
        if (couplePackageValue3 === '2x Spa del Sol Dream') {
            spaDelSolDreamInfoCouple3.style.display = 'block';
        } else if (couplePackageValue3 === 'Two different packages') {
            otherPackagesInfoCouple3.style.display = 'block';
        }

        const coupleMassageValue3 = coupleMassage3.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue3)) {
            massageDurationACouple3.style.display = 'block';
            massageDurationACoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleMassageValue3 === 'Reflexology') {
            massageDurationBCouple3.style.display = 'block';
            massageDurationBCoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleMassageValue3 === 'Prenatal and other') {
            prenatalMassageCouple3.style.display = 'block';
            prenatalMassageCoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleMassageValue3 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple3.style.display = 'grid';
            combinationGuest1CoupleLabel3.style.display = 'block'; // Show the label
            combinationGuest2CoupleLabel3.style.display = 'block'; // Show the label
        } else if (coupleMassageValue3 === 'Two different types') {
            differentMassagesSelectsWrapperCouple3.style.display = 'grid';
            massageGuest1CoupleLabel3.style.display = 'block'; // Show the label
            massageGuest2CoupleLabel3.style.display = 'block'; // Show the label
        }

        const massageGuest1Value3 = document.getElementById('Massage-Guest-1-Couple-3').value;
        const massageGuest2Value3 = document.getElementById('Massage-Guest-2-Couple-3').value;
        if (massageGuest1Value3 !== '' && massageGuest2Value3 !== '') {
            durationAGuest1And2Couple3.style.display = 'block';
            durationAGuest1And2CoupleLabel3.style.display = 'block'; // Show the label
        }

        const facialGuest1Value3 = document.getElementById('Facial-Guest-1-Couple-3').value;
        if (facialGuest1Value3 === 'Sol Janssen') {
            facialAddOnGuest1Couple3.style.display = 'block';
            facialAddOnGuest1CoupleLabel3.style.display = 'block'; // Show the label
        }

        const facialGuest2Value3 = document.getElementById('Facial-Guest-2-Couple-3').value;
        if (facialGuest2Value3 === 'Sol Janssen') {
            facialAddOnGuest2Couple3.style.display = 'block';
            facialAddOnGuest2CoupleLabel3.style.display = 'block'; // Show the label
        }
    }

    // Add event listeners to the single and couple select fields
    singleService.addEventListener('change', handleConditionals);
    singlePackage.addEventListener('change', handleConditionals);
    singleMassage.addEventListener('change', handleConditionals);
    singleFacial.addEventListener('change', handleConditionals);

    singleService1.addEventListener('change', handleConditionals);
    singlePackage1.addEventListener('change', handleConditionals);
    singleMassage1.addEventListener('change', handleConditionals);
    singleFacial1.addEventListener('change', handleConditionals);

    singleService2.addEventListener('change', handleConditionals);
    singlePackage2.addEventListener('change', handleConditionals);
    singleMassage2.addEventListener('change', handleConditionals);
    singleFacial2.addEventListener('change', handleConditionals);

    singleService3.addEventListener('change', handleConditionals);
    singlePackage3.addEventListener('change', handleConditionals);
    singleMassage3.addEventListener('change', handleConditionals);
    singleFacial3.addEventListener('change', handleConditionals);

    coupleService.addEventListener('change', handleConditionals);
    couplePackage.addEventListener('change', handleConditionals);
    coupleMassage.addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-1-Couple').addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-2-Couple').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-1-Couple').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-2-Couple').addEventListener('change', handleConditionals);

    coupleService1.addEventListener('change', handleConditionals);
    couplePackage1.addEventListener('change', handleConditionals);
    coupleMassage1.addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-1-Couple-1').addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-2-Couple-1').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-1-Couple-1').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-2-Couple-1').addEventListener('change', handleConditionals);

    coupleService2.addEventListener('change', handleConditionals);
    couplePackage2.addEventListener('change', handleConditionals);
    coupleMassage2.addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-1-Couple-2').addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-2-Couple-2').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-1-Couple-2').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-2-Couple-2').addEventListener('change', handleConditionals);

    coupleService3.addEventListener('change', handleConditionals);
    couplePackage3.addEventListener('change', handleConditionals);
    coupleMassage3.addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-1-Couple-3').addEventListener('change', handleConditionals);
    document.getElementById('Massage-Guest-2-Couple-3').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-1-Couple-3').addEventListener('change', handleConditionals);
    document.getElementById('Facial-Guest-2-Couple-3').addEventListener('change', handleConditionals);

    // Initial hide of all conditionals
    hideAllConditionals();
});
