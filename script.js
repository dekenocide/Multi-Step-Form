// MAIN STEP HANDLING SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Step navigation elements
    const steps = {
        'step-1': document.getElementById('step-1'),
        'step-2': document.getElementById('step-2'),
        'step-3': document.getElementById('step-3'),
        'step-4': document.getElementById('step-4'),
        'step-5': document.getElementById('step-5'),
    };

    const nextBtn = document.getElementById('next-button');
    const prevBtn = document.getElementById('previous-button');
    const submitBtn = document.getElementById('submit');
    const recaptchaContainer = document.getElementById('recaptcha-container');
    let currentStep = 'step-1';

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

        if (step === 'step-5') {
            recaptchaContainer.style.display = 'flex';
        } else {
            recaptchaContainer.style.display = 'none';
        }

        if (step === 'step-5') {
            populateReviewStep();
        }
    }

    function validateStep(step) {
        const inputs = steps[step].querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            // Check if the field is visible and its parent element is visible as well
            if (input.style.display !== 'none' && input.offsetParent !== null) {
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
            clearGroupBookingInfo(); 
            clearNameInputsAndRevertLabels();
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

let originalLabelTexts = {}; // Declare in a higher scope to store original label texts

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

    // Store the original label text for each label
    Object.keys(inputsToLabels).forEach(nameId => {
        const labelId = inputsToLabels[nameId];
        const labelElement = document.getElementById(labelId);
        if (labelElement) {
            originalLabelTexts[labelId] = labelElement.innerText;
        }
    });

    // Function to update labels based on input value
    Object.keys(inputsToLabels).forEach(nameId => {
        const inputField = document.getElementById(nameId);
        const labelId = inputsToLabels[nameId];
        const labelElement = document.getElementById(labelId);

        if (inputField && labelElement) {
            inputField.addEventListener('input', function() {
                if (inputField.value.trim() !== "") {
                    labelElement.innerText = `Service for ${inputField.value.trim()}`;
                } else {
                    labelElement.innerText = originalLabelTexts[labelId]; // Revert to the original text if input is cleared
                }
            });
        }
    });

// RESETS AND CLEARS SCRIPT

function clearNameInputsAndRevertLabels() {
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

    // Clear the input fields and revert labels to original text
    Object.keys(inputsToLabels).forEach(nameId => {
        const inputField = document.getElementById(nameId);
        const labelId = inputsToLabels[nameId];
        const labelElement = document.getElementById(labelId);

        if (inputField) {
            inputField.value = ''; // Clear the value of the input field
        }

        if (labelElement && originalLabelTexts[labelId]) {
            labelElement.innerText = originalLabelTexts[labelId]; // Revert to the original text
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

    const singleServiceLabels = [
        'Package-Single-Label', 'Massage-Single-Label', 'Duration-A-Single-Label', 'Duration-B-Single-Label', 'Combination-Single-Label', 'Facial-Single-Label', 'Add-On-Single-Label', 'Body-Treatment-Single-Label',
        'Package-Single-1-Label', 'Massage-Single-1-Label', 'Duration-A-Single-1-Label', 'Duration-B-Single-1-Label', 'Combination-Single-1-Label', 'Facial-Single-1-Label', 'Add-On-Single-1-Label', 'Body-Treatment-Single-1-Label',
        'Package-Single-2-Label', 'Massage-Single-2-Label', 'Duration-A-Single-2-Label', 'Duration-B-Single-2-Label', 'Combination-Single-2-Label', 'Facial-Single-2-Label', 'Add-On-Single-2-Label', 'Body-Treatment-Single-2-Label',
        'Package-Single-3-Label', 'Massage-Single-3-Label', 'Duration-A-Single-3-Label', 'Duration-B-Single-3-Label', 'Combination-Single-3-Label', 'Facial-Single-3-Label', 'Add-On-Single-3-Label', 'Body-Treatment-Single-3-Label'
    ];

    const coupleServiceFields = [
        'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple', 'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple', 'Other-Services-Info-Couple',
        'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1', 'Other-Services-Info-Couple-1',
        'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2', 'Other-Services-Info-Couple-2',
        'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3', 'Other-Services-Info-Couple-3'
    ];

    const coupleServiceLabels = [
        'Package-Couple-Label', 'Massage-Couple-Label', 'Duration-A-Couple-Label', 'Duration-B-Couple-Label', 'Prenatal-Massage-Couple-Label', 'Combination-Guest-1-Couple-Label', 'Combination-Guest-2-Couple-Label', 'Massage-Guest-1-Couple-Label', 'Massage-Guest-2-Couple-Label', 'Duration-A-Guest-1-And-2-Couple-Label', 'Facial-Guest-1-Couple-Label', 'Facial-Guest-2-Couple-Label', 'Facial-Add-On-Guest-1-Couple-Label', 'Facial-Add-On-Guest-2-Couple-Label', 'Body-Treatment-Guest-1-Couple-Label', 'Body-Treatment-Guest-2-Couple-Label',
        'Package-Couple-1-Label', 'Massage-Couple-1-Label', 'Duration-A-Couple-1-Label', 'Duration-B-Couple-1-Label', 'Prenatal-Massage-Couple-1-Label', 'Combination-Guest-1-Couple-1-Label', 'Combination-Guest-2-Couple-1-Label', 'Massage-Guest-1-Couple-1-Label', 'Massage-Guest-2-Couple-1-Label', 'Duration-A-Guest-1-And-2-Couple-1-Label', 'Facial-Guest-1-Couple-1-Label', 'Facial-Guest-2-Couple-1-Label', 'Facial-Add-On-Guest-1-Couple-1-Label', 'Facial-Add-On-Guest-2-Couple-1-Label', 'Body-Treatment-Guest-1-Couple-1-Label', 'Body-Treatment-Guest-2-Couple-1-Label',
        'Package-Couple-2-Label', 'Massage-Couple-2-Label', 'Duration-A-Couple-2-Label', 'Duration-B-Couple-2-Label', 'Prenatal-Massage-Couple-2-Label', 'Combination-Guest-1-Couple-2-Label', 'Combination-Guest-2-Couple-2-Label', 'Massage-Guest-1-Couple-2-Label', 'Massage-Guest-2-Couple-2-Label', 'Duration-A-Guest-1-And-2-Couple-2-Label', 'Facial-Guest-1-Couple-2-Label', 'Facial-Guest-2-Couple-2-Label', 'Facial-Add-On-Guest-1-Couple-2-Label', 'Facial-Add-On-Guest-2-Couple-2-Label', 'Body-Treatment-Guest-1-Couple-2-Label', 'Body-Treatment-Guest-2-Couple-2-Label',
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

    singleServiceLabels.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
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

    coupleServiceLabels.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
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

// REVIEW STEP SCRIPT

    populateReviewStep(); // Ensure this runs after the DOM is ready

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

function resetField(field) {
    if (field) {
        field.value = ''; // Reset the value of the field
        field.style.display = 'none'; // Optionally hide the field after resetting (this line can be removed if not needed)
    }
}

// COUPLE SERVICE ORIGINAL SET CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const coupleSets = [
        { suffix: '', idSuffix: '' },
        { suffix: '1', idSuffix: '-1' },
        { suffix: '2', idSuffix: '-2' },
        { suffix: '3', idSuffix: '-3' }
    ];

    coupleSets.forEach(({ suffix, idSuffix }) => {
        const elements = {
            coupleService: document.getElementById(`Service-Couple${idSuffix}`),
            couplePackage: document.getElementById(`Package-Couple${idSuffix}`),
            couplePackageLabel: document.getElementById(`Package-Couple${suffix}-Label`),
            spaDelSolDreamInfoCouple: document.getElementById(`Spa-Del-Sol-Dream-Info-Couple${idSuffix}`),
            otherPackagesInfoCouple: document.getElementById(`Other-Packages-Info-Couple${idSuffix}`),
            coupleMassage: document.getElementById(`Massage-Couple${idSuffix}`),
            coupleMassageLabel: document.getElementById(`Massage-Couple${suffix}-Label`),
            massageDurationACouple: document.getElementById(`Duration-A-Couple${idSuffix}`),
            massageDurationACoupleLabel: document.getElementById(`Duration-A-Couple${suffix}-Label`),
            massageDurationBCouple: document.getElementById(`Duration-B-Couple${idSuffix}`),
            massageDurationBCoupleLabel: document.getElementById(`Duration-B-Couple${suffix}-Label`),
            prenatalMassageCouple: document.getElementById(`Prenatal-Massage-Couple${idSuffix}`),
            prenatalMassageCoupleLabel: document.getElementById(`Prenatal-Massage-Couple${suffix}-Label`),
            combinationSelectsWrapperCouple: document.getElementById(`Combination-Selects-Wrapper-Couple${idSuffix}`),
            combinationGuest1CoupleLabel: document.getElementById(`Combination-Guest-1-Couple${suffix}-Label`),
            combinationGuest2CoupleLabel: document.getElementById(`Combination-Guest-2-Couple${suffix}-Label`),
            differentMassagesSelectsWrapperCouple: document.getElementById(`Different-Massages-Selects-Wrapper-Couple${idSuffix}`),
            massageGuest1CoupleLabel: document.getElementById(`Massage-Guest-1-Couple${suffix}-Label`),
            massageGuest2CoupleLabel: document.getElementById(`Massage-Guest-2-Couple${suffix}-Label`),
            durationAGuest1And2Couple: document.getElementById(`Duration-A-Guest-1-And-2-Couple${idSuffix}`),
            durationAGuest1And2CoupleLabel: document.getElementById(`Duration-A-Guest-1-And-2-Couple${suffix}-Label`),
            facialSelectsWrapperCouple: document.getElementById(`Facial-Selects-Wrapper-Couple${idSuffix}`),
            facialGuest1CoupleLabel: document.getElementById(`Facial-Guest-1-Couple${suffix}-Label`),
            facialGuest2CoupleLabel: document.getElementById(`Facial-Guest-2-Couple${suffix}-Label`),
            facialAddOnGuest1Couple: document.getElementById(`Facial-Add-On-Guest-1-Couple${idSuffix}`),
            facialAddOnGuest1CoupleLabel: document.getElementById(`Facial-Add-On-Guest-1-Couple${suffix}-Label`),
            facialAddOnGuest2Couple: document.getElementById(`Facial-Add-On-Guest-2-Couple${idSuffix}`),
            facialAddOnGuest2CoupleLabel: document.getElementById(`Facial-Add-On-Guest-2-Couple${suffix}-Label`),
            bodyTreatmentsSelectsWrapperCouple: document.getElementById(`Body-Treatments-Selects-Wrapper-Couple${idSuffix}`),
            bodyTreatmentGuest1CoupleLabel: document.getElementById(`Body-Treatment-Guest-1-Couple${suffix}-Label`),
            bodyTreatmentGuest2CoupleLabel: document.getElementById(`Body-Treatment-Guest-2-Couple${suffix}-Label`),
            otherServicesInfoCouple: document.getElementById(`Other-Services-Info-Couple${idSuffix}`)
        };

        function resetAndHideChildren(parentSelect) {
            if (!parentSelect) return;
            switch (parentSelect.id) {
                case `Service-Couple${idSuffix}`:
                    resetFields([
                        elements.couplePackage,
                        elements.spaDelSolDreamInfoCouple,
                        elements.otherPackagesInfoCouple,
                        elements.coupleMassage,
                        elements.massageDurationACouple,
                        elements.massageDurationBCouple,
                        elements.prenatalMassageCouple,
                        document.getElementById(`Combination-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Combination-Guest-2-Couple${idSuffix}`),
                        document.getElementById(`Massage-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Massage-Guest-2-Couple${idSuffix}`),
                        elements.durationAGuest1And2Couple,
                        document.getElementById(`Facial-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Facial-Guest-2-Couple${idSuffix}`),
                        elements.facialAddOnGuest1Couple,
                        elements.facialAddOnGuest2Couple,
                        document.getElementById(`Body-Treatment-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Body-Treatment-Guest-2-Couple${idSuffix}`),
                        elements.otherServicesInfoCouple
                    ]);
                    hideFields([
                        elements.couplePackageLabel,
                        elements.coupleMassageLabel,
                        elements.massageDurationACoupleLabel,
                        elements.massageDurationBCoupleLabel,
                        elements.prenatalMassageCoupleLabel,
                        elements.combinationGuest1CoupleLabel,
                        elements.combinationGuest2CoupleLabel,
                        elements.massageGuest1CoupleLabel,
                        elements.massageGuest2CoupleLabel,
                        elements.durationAGuest1And2CoupleLabel,
                        elements.facialGuest1CoupleLabel,
                        elements.facialGuest2CoupleLabel,
                        elements.facialAddOnGuest1CoupleLabel,
                        elements.facialAddOnGuest2CoupleLabel,
                        elements.bodyTreatmentGuest1CoupleLabel,
                        elements.bodyTreatmentGuest2CoupleLabel
                    ]);
                    break;

                case `Package-Couple${idSuffix}`:
                    resetFields([elements.spaDelSolDreamInfoCouple, elements.otherPackagesInfoCouple]);
                    break;

                case `Massage-Couple${idSuffix}`:
                    resetFields([
                        elements.massageDurationACouple,
                        elements.massageDurationBCouple,
                        elements.prenatalMassageCouple,
                        document.getElementById(`Combination-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Combination-Guest-2-Couple${idSuffix}`),
                        document.getElementById(`Massage-Guest-1-Couple${idSuffix}`),
                        document.getElementById(`Massage-Guest-2-Couple${idSuffix}`),
                        elements.durationAGuest1And2Couple
                    ]);
                    hideFields([
                        elements.massageDurationACoupleLabel,
                        elements.massageDurationBCoupleLabel,
                        elements.prenatalMassageCoupleLabel,
                        elements.combinationGuest1CoupleLabel,
                        elements.combinationGuest2CoupleLabel,
                        elements.massageGuest1CoupleLabel,
                        elements.massageGuest2CoupleLabel,
                        elements.durationAGuest1And2CoupleLabel
                    ]);
                    break;

                case `Facial-Guest-1-Couple${idSuffix}`:
                    resetFields([elements.facialAddOnGuest1Couple]);
                    hideFields([elements.facialAddOnGuest1CoupleLabel]);
                    break;

                case `Facial-Guest-2-Couple${idSuffix}`:
                    resetFields([elements.facialAddOnGuest2Couple]);
                    hideFields([elements.facialAddOnGuest2CoupleLabel]);
                    break;
            }
        }

        function hideConditionals() {
            hideFields([
                elements.couplePackage,
                elements.couplePackageLabel,
                elements.spaDelSolDreamInfoCouple,
                elements.otherPackagesInfoCouple,
                elements.coupleMassage,
                elements.coupleMassageLabel,
                elements.massageDurationACouple,
                elements.massageDurationACoupleLabel,
                elements.massageDurationBCouple,
                elements.massageDurationBCoupleLabel,
                elements.prenatalMassageCouple,
                elements.prenatalMassageCoupleLabel,
                elements.combinationSelectsWrapperCouple,
                elements.combinationGuest1CoupleLabel,
                elements.combinationGuest2CoupleLabel,
                elements.differentMassagesSelectsWrapperCouple,
                elements.massageGuest1CoupleLabel,
                elements.massageGuest2CoupleLabel,
                elements.durationAGuest1And2Couple,
                elements.durationAGuest1And2CoupleLabel,
                elements.facialSelectsWrapperCouple,
                elements.facialGuest1CoupleLabel,
                elements.facialGuest2CoupleLabel,
                elements.facialAddOnGuest1Couple,
                elements.facialAddOnGuest1CoupleLabel,
                elements.facialAddOnGuest2Couple,
                elements.facialAddOnGuest2CoupleLabel,
                elements.bodyTreatmentsSelectsWrapperCouple,
                elements.bodyTreatmentGuest1CoupleLabel,
                elements.bodyTreatmentGuest2CoupleLabel,
                elements.otherServicesInfoCouple
            ]);
        }

        function handleConditionals() {
            // First, hide all conditionally shown fields
            hideConditionals();

            // Get the value of the selected couple service
            const coupleServiceValue = elements.coupleService?.value;

            // Handle the visibility based on the selected service
            if (coupleServiceValue === 'Package') {
                showFields([elements.couplePackage, elements.couplePackageLabel]);
            } else if (coupleServiceValue === 'Massage') {
                showFields([elements.coupleMassage, elements.coupleMassageLabel]);
            } else if (coupleServiceValue === 'Facial') {
                showFields([elements.facialSelectsWrapperCouple, elements.facialGuest1CoupleLabel, elements.facialGuest2CoupleLabel]);
            } else if (coupleServiceValue === 'Body treatment') {
                showFields([elements.bodyTreatmentsSelectsWrapperCouple, elements.bodyTreatmentGuest1CoupleLabel, elements.bodyTreatmentGuest2CoupleLabel]);
            } else if (coupleServiceValue === 'Other') {
                showFields([elements.otherServicesInfoCouple]);
            }

            // Handle visibility based on the selected package
            const couplePackageValue = elements.couplePackage?.value;
            if (couplePackageValue === '2x Spa del Sol Dream') {
                showFields([elements.spaDelSolDreamInfoCouple]);
            } else if (couplePackageValue === 'Two different packages') {
                showFields([elements.otherPackagesInfoCouple]);
            }

            // Handle visibility based on the selected massage type
            const coupleMassageValue = elements.coupleMassage?.value;
            if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue)) {
                showFields([elements.massageDurationACouple, elements.massageDurationACoupleLabel]);
            } else if (coupleMassageValue === 'Reflexology') {
                showFields([elements.massageDurationBCouple, elements.massageDurationBCoupleLabel]);
            } else if (coupleMassageValue === 'Prenatal and other') {
                showFields([elements.prenatalMassageCouple, elements.prenatalMassageCoupleLabel]);
            } else if (coupleMassageValue === 'Relaxing Combination') {
                showFields([elements.combinationSelectsWrapperCouple, elements.combinationGuest1CoupleLabel, elements.combinationGuest2CoupleLabel]);
            } else if (coupleMassageValue === 'Two different types') {
                showFields([elements.differentMassagesSelectsWrapperCouple, elements.massageGuest1CoupleLabel, elements.massageGuest2CoupleLabel]);
            }

            // Handle visibility based on the selected guest massages
            const massageGuest1Value = document.getElementById(`Massage-Guest-1-Couple${idSuffix}`)?.value;
            const massageGuest2Value = document.getElementById(`Massage-Guest-2-Couple${idSuffix}`)?.value;
            if (massageGuest1Value && massageGuest2Value) {
                showFields([elements.durationAGuest1And2Couple, elements.durationAGuest1And2CoupleLabel]);
            }

            // Handle visibility based on the selected guest facials
            const facialGuest1Value = document.getElementById(`Facial-Guest-1-Couple${idSuffix}`)?.value;
            if (facialGuest1Value === 'Sol Janssen') {
                showFields([elements.facialAddOnGuest1Couple, elements.facialAddOnGuest1CoupleLabel]);
            }

            const facialGuest2Value = document.getElementById(`Facial-Guest-2-Couple${idSuffix}`)?.value;
            if (facialGuest2Value === 'Sol Janssen') {
                showFields([elements.facialAddOnGuest2Couple, elements.facialAddOnGuest2CoupleLabel]);
            }
        }

        elements.coupleService?.addEventListener('change', function() {
            resetAndHideChildren(this);
            handleConditionals();
        });
        elements.couplePackage?.addEventListener('change', handleConditionals);
        elements.coupleMassage?.addEventListener('change', handleConditionals);
        document.getElementById(`Massage-Guest-1-Couple${idSuffix}`)?.addEventListener('change', handleConditionals);
        document.getElementById(`Massage-Guest-2-Couple${idSuffix}`)?.addEventListener('change', handleConditionals);
        document.getElementById(`Facial-Guest-1-Couple${idSuffix}`)?.addEventListener('change', handleConditionals);
        document.getElementById(`Facial-Guest-2-Couple${idSuffix}`)?.addEventListener('change', handleConditionals);

        hideConditionals(); // Initial hide
    });

    function resetFields(fields) {
        fields.forEach(field => {
            if (field) resetField(field);
        });
    }

    function hideFields(fields) {
        fields.forEach(field => {
            if (field) field.style.display = 'none';
        });
    }

    function showFields(fields) {
        fields.forEach(field => {
            if (field) field.style.display = 'block';
        });
    }
});
