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
            clearNameInputs(); 
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

// RESETS AND CLEARS SCRIPT

function clearNameInputs() {
    const nameFields = [
        'Name-Single',
        'Name-Single-1',
        'Name-Single-2',
        'Name-Single-3',
        'Name-Couple',
        'Name-Couple-1',
        'Name-Couple-2',
        'Name-Couple-3'
    ];

    nameFields.forEach(id => {
        const inputField = document.getElementById(id);
        if (inputField) {
            inputField.value = ''; // Clear the value of the input field
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
        'Service-Single-Label', 'Package-Single-Label', 'Massage-Single-Label', 'Duration-A-Single-Label', 'Duration-B-Single-Label', 'Combination-Single-Label', 'Facial-Single-Label', 'Add-On-Single-Label', 'Body-Treatment-Single-Label',
        'Service-Single-1-Label', 'Package-Single-1-Label', 'Massage-Single-1-Label', 'Duration-A-Single-1-Label', 'Duration-B-Single-1-Label', 'Combination-Single-1-Label', 'Facial-Single-1-Label', 'Add-On-Single-1-Label', 'Body-Treatment-Single-1-Label',
        'Service-Single-2-Label', 'Package-Single-2-Label', 'Massage-Single-2-Label', 'Duration-A-Single-2-Label', 'Duration-B-Single-2-Label', 'Combination-Single-2-Label', 'Facial-Single-2-Label', 'Add-On-Single-2-Label', 'Body-Treatment-Single-2-Label',
        'Service-Single-3-Label', 'Package-Single-3-Label', 'Massage-Single-3-Label', 'Duration-A-Single-3-Label', 'Duration-B-Single-3-Label', 'Combination-Single-3-Label', 'Facial-Single-3-Label', 'Add-On-Single-3-Label', 'Body-Treatment-Single-3-Label'
    ];

    const coupleServiceFields = [
        'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple', 'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple', 'Other-Services-Info-Couple',
        'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1', 'Other-Services-Info-Couple-1',
        'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2', 'Other-Services-Info-Couple-2',
        'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3', 'Other-Services-Info-Couple-3'
    ];

    const coupleServiceLabels = [
        'Service-Couple-Label', 'Package-Couple-Label', 'Massage-Couple-Label', 'Duration-A-Couple-Label', 'Duration-B-Couple-Label', 'Prenatal-Massage-Couple-Label', 'Combination-Guest-1-Couple-Label', 'Combination-Guest-2-Couple-Label', 'Massage-Guest-1-Couple-Label', 'Massage-Guest-2-Couple-Label', 'Duration-A-Guest-1-And-2-Couple-Label', 'Facial-Guest-1-Couple-Label', 'Facial-Guest-2-Couple-Label', 'Facial-Add-On-Guest-1-Couple-Label', 'Facial-Add-On-Guest-2-Couple-Label', 'Body-Treatment-Guest-1-Couple-Label', 'Body-Treatment-Guest-2-Couple-Label',
        'Service-Couple-1-Label', 'Package-Couple-1-Label', 'Massage-Couple-1-Label', 'Duration-A-Couple-1-Label', 'Duration-B-Couple-1-Label', 'Prenatal-Massage-Couple-1-Label', 'Combination-Guest-1-Couple-1-Label', 'Combination-Guest-2-Couple-1-Label', 'Massage-Guest-1-Couple-1-Label', 'Massage-Guest-2-Couple-1-Label', 'Duration-A-Guest-1-And-2-Couple-1-Label', 'Facial-Guest-1-Couple-1-Label', 'Facial-Guest-2-Couple-1-Label', 'Facial-Add-On-Guest-1-Couple-1-Label', 'Facial-Add-On-Guest-2-Couple-1-Label', 'Body-Treatment-Guest-1-Couple-1-Label', 'Body-Treatment-Guest-2-Couple-1-Label',
        'Service-Couple-2-Label', 'Package-Couple-2-Label', 'Massage-Couple-2-Label', 'Duration-A-Couple-2-Label', 'Duration-B-Couple-2-Label', 'Prenatal-Massage-Couple-2-Label', 'Combination-Guest-1-Couple-2-Label', 'Combination-Guest-2-Couple-2-Label', 'Massage-Guest-1-Couple-2-Label', 'Massage-Guest-2-Couple-2-Label', 'Duration-A-Guest-1-And-2-Couple-2-Label', 'Facial-Guest-1-Couple-2-Label', 'Facial-Guest-2-Couple-2-Label', 'Facial-Add-On-Guest-1-Couple-2-Label', 'Facial-Add-On-Guest-2-Couple-2-Label', 'Body-Treatment-Guest-1-Couple-2-Label', 'Body-Treatment-Guest-2-Couple-2-Label',
        'Service-Couple-3-Label', 'Package-Couple-3-Label', 'Massage-Couple-3-Label', 'Duration-A-Couple-3-Label', 'Duration-B-Couple-3-Label', 'Prenatal-Massage-Couple-3-Label', 'Combination-Guest-1-Couple-3-Label', 'Combination-Guest-2-Couple-3-Label', 'Massage-Guest-1-Couple-3-Label', 'Massage-Guest-2-Couple-3-Label', 'Duration-A-Guest-1-And-2-Couple-3-Label', 'Facial-Guest-1-Couple-3-Label', 'Facial-Guest-2-Couple-3-Label', 'Facial-Add-On-Guest-1-Couple-3-Label', 'Facial-Add-On-Guest-2-Couple-3-Label', 'Body-Treatment-Guest-1-Couple-3-Label', 'Body-Treatment-Guest-2-Couple-3-Label'
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

// Define resetField function
function resetField(field) {
    if (field) {
        if (field.tagName === 'SELECT') {
            field.selectedIndex = 0;
        } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
            field.value = '';
        }
    }
}

// Define hideField function
function hideField(field) {
    if (field) {
        field.style.display = 'none';
    }
}

// COUPLE SERVICE ORIGINAL SET CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const coupleService = document.getElementById('Service-Couple');
    const coupleServiceLabel = document.getElementById('Service-Couple-Label');
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
    const facialGuest1CoupleLabel = document.getElementById ('Facial-Guest-1-Couple-Label');
    const facialGuest2CoupleLabel = document.getElementById ('Facial-Guest-2-Couple-Label');
    const facialAddOnGuest1Couple = document.getElementById('Facial-Add-On-Guest-1-Couple');
    const facialAddOnGuest1CoupleLabel = document.getElementById('Facial-Add-On-Guest-1-Couple-Label');
    const facialAddOnGuest2Couple = document.getElementById('Facial-Add-On-Guest-2-Couple');
    const facialAddOnGuest2CoupleLabel = document.getElementById('Facial-Add-On-Guest-2-Couple-Label');
    const bodyTreatmentsSelectsWrapperCouple = document.getElementById('Body-Treatments-Selects-Wrapper-Couple');
    const bodyTreatmentGuest1CoupleLabel = document.getElementById('Body-Treatment-Guest-1-Couple-Label');
    const bodyTreatmentGuest2CoupleLabel = document.getElementById('Body-Treatment-Guest-2-Couple-Label');
    const otherServicesInfoCouple = document.getElementById('Other-Services-Info-Couple');

    function resetAndHideChildrenCoupleOriginal(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Couple':
                resetField(couplePackage);
                resetField(spaDelSolDreamInfoCouple);
                resetField(otherPackagesInfoCouple);
                resetField(coupleMassage);
                resetField(massageDurationACouple);
                resetField(massageDurationBCouple);
                resetField(prenatalMassageCouple);
                resetField(document.getElementById('Combination-Guest-1-Couple'));
                resetField(document.getElementById('Combination-Guest-2-Couple'));
                resetField(document.getElementById('Massage-Guest-1-Couple'));
                resetField(document.getElementById('Massage-Guest-2-Couple'));
                resetField(durationAGuest1And2Couple);
                resetField(document.getElementById('Facial-Guest-1-Couple'));
                resetField(document.getElementById('Facial-Guest-2-Couple'));
                resetField(facialAddOnGuest1Couple);
                resetField(facialAddOnGuest2Couple);
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple'));
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple'));
                resetField(otherServicesInfoCouple);
                hideField(couplePackageLabel);
                hideField(coupleMassageLabel);
                hideField(massageDurationACoupleLabel);
                hideField(massageDurationBCoupleLabel);
                hideField(prenatalMassageCoupleLabel);
                hideField(combinationGuest1CoupleLabel);
                hideField(combinationGuest2CoupleLabel);
                hideField(massageGuest1CoupleLabel);
                hideField(massageGuest2CoupleLabel);
                hideField(durationAGuest1And2CoupleLabel);
                hideField(facialGuest1CoupleLabel);
                hideField(facialGuest2CoupleLabel);
                hideField(facialAddOnGuest1CoupleLabel);
                hideField(facialAddOnGuest2CoupleLabel);
                hideField(bodyTreatmentGuest1CoupleLabel);
                hideField(bodyTreatmentGuest2CoupleLabel);
                break;

            case 'Package-Couple':
                resetField(spaDelSolDreamInfoCouple);
                resetField(otherPackagesInfoCouple);
                break;

            case 'Massage-Couple':
                resetField(massageDurationACouple);
                resetField(massageDurationBCouple);
                resetField(prenatalMassageCouple);
                resetField(document.getElementById('Combination-Guest-1-Couple'));
                resetField(document.getElementById('Combination-Guest-2-Couple'));
                resetField(document.getElementById('Massage-Guest-1-Couple'));
                resetField(document.getElementById('Massage-Guest-2-Couple'));
                resetField(durationAGuest1And2Couple);
                hideField(massageDurationACoupleLabel);
                hideField(massageDurationBCoupleLabel);
                hideField(prenatalMassageCoupleLabel);
                hideField(combinationGuest1CoupleLabel);
                hideField(combinationGuest2CoupleLabel);
                hideField(massageGuest1CoupleLabel);
                hideField(massageGuest2CoupleLabel);
                hideField(durationAGuest1And2CoupleLabel);
                break;

            case 'Facial-Guest-1-Couple':
                resetField(facialAddOnGuest1Couple);
                hideField(facialAddOnGuest1CoupleLabel);
                break;

            case 'Facial-Guest-2-Couple':
                resetField(facialAddOnGuest2Couple);
                hideField(facialAddOnGuest2CoupleLabel);
                break;
        }
    }

    function hideCoupleOriginalSetConditionals() {
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
    }

    function handleCoupleOriginalSetConditionals() {
        hideCoupleOriginalSetConditionals();

        const coupleServiceValue = coupleService.value;
        if (coupleServiceValue === 'Package') {
            couplePackage.style.display = 'block';
            couplePackageLabel.style.display = 'block';
        } else if (coupleServiceValue === 'Massage') {
            coupleMassage.style.display = 'block';
            coupleMassageLabel.style.display = 'block';
        } else if (coupleServiceValue === 'Facial') {
            facialSelectsWrapperCouple.style.display = 'grid';
            facialGuest1CoupleLabel.style.display = 'block';
            facialGuest2CoupleLabel.style.display = 'block';
        } else if (coupleServiceValue === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel.style.display = 'block';
            bodyTreatmentGuest2CoupleLabel.style.display = 'block';
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
            massageDurationACoupleLabel.style.display = 'block';
        } else if (coupleMassageValue === 'Reflexology') {
            massageDurationBCouple.style.display = 'block';
            massageDurationBCoupleLabel.style.display = 'block';
        } else if (coupleMassageValue === 'Prenatal and other') {
            prenatalMassageCouple.style.display = 'block';
            prenatalMassageCoupleLabel.style.display = 'block';
        } else if (coupleMassageValue === 'Relaxing Combination') {
            combinationSelectsWrapperCouple.style.display = 'grid';
            combinationGuest1CoupleLabel.style.display = 'block';
            combinationGuest2CoupleLabel.style.display = 'block';
        } else if (coupleMassageValue === 'Two different types') {
            differentMassagesSelectsWrapperCouple.style.display = 'grid';
            massageGuest1CoupleLabel.style.display = 'block';
            massageGuest2CoupleLabel.style.display = 'block';
        }

        const massageGuest1Value = document.getElementById('Massage-Guest-1-Couple').value;
        const massageGuest2Value = document.getElementById('Massage-Guest-2-Couple').value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            durationAGuest1And2Couple.style.display = 'block';
            durationAGuest1And2CoupleLabel.style.display = 'block';
        }

        const facialGuest1Value = document.getElementById('Facial-Guest-1-Couple').value;
        if (facialGuest1Value === 'Sol Janssen') {
            facialAddOnGuest1Couple.style.display = 'block';
            facialAddOnGuest1CoupleLabel.style.display = 'block';
        }

        const facialGuest2Value = document.getElementById('Facial-Guest-2-Couple').value;
        if (facialGuest2Value === 'Sol Janssen') {
            facialAddOnGuest2Couple.style.display = 'block';
            facialAddOnGuest2CoupleLabel.style.display = 'block';
        }
    }

    coupleService.addEventListener('change', function() {
        resetAndHideChildrenCoupleOriginal(this);
        handleCoupleOriginalSetConditionals();
    });
    couplePackage.addEventListener('change', handleCoupleOriginalSetConditionals);
    coupleMassage.addEventListener('change', handleCoupleOriginalSetConditionals);
    document.getElementById('Massage-Guest-1-Couple').addEventListener('change', handleCoupleOriginalSetConditionals);
    document.getElementById('Massage-Guest-2-Couple').addEventListener('change', handleCoupleOriginalSetConditionals);
    document.getElementById('Facial-Guest-1-Couple').addEventListener('change', handleCoupleOriginalSetConditionals);
    document.getElementById('Facial-Guest-2-Couple').addEventListener('change', handleCoupleOriginalSetConditionals);

    hideCoupleOriginalSetConditionals(); // Initial hide
});

// COUPLE SERVICE SET 1 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const coupleService1 = document.getElementById('Service-Couple-1');
    const coupleServiceLabel1 = document.getElementById('Service-Couple-1-Label');
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
    const facialGuest1CoupleLabel1 = document.getElementById ('Facial-Guest-1-Couple-1-Label');
    const facialGuest2CoupleLabel1 = document.getElementById ('Facial-Guest-2-Couple-1-Label');
    const facialAddOnGuest1Couple1 = document.getElementById('Facial-Add-On-Guest-1-Couple-1');
    const facialAddOnGuest1CoupleLabel1 = document.getElementById('Facial-Add-On-Guest-1-Couple-1-Label');
    const facialAddOnGuest2Couple1 = document.getElementById('Facial-Add-On-Guest-2-Couple-1');
    const facialAddOnGuest2CoupleLabel1 = document.getElementById('Facial-Add-On-Guest-2-Couple-1-Label');
    const bodyTreatmentsSelectsWrapperCouple1 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-1');
    const bodyTreatmentGuest1CoupleLabel1 = document.getElementById('Body-Treatment-Guest-1-Couple-1-Label');
    const bodyTreatmentGuest2CoupleLabel1 = document.getElementById('Body-Treatment-Guest-2-Couple-1-Label');
    const otherServicesInfoCouple1 = document.getElementById('Other-Services-Info-Couple-1');

    function resetAndHideChildrenCoupleSet1(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Couple-1':
                resetField(couplePackage1);
                resetField(spaDelSolDreamInfoCouple1);
                resetField(otherPackagesInfoCouple1);
                resetField(coupleMassage1);
                resetField(massageDurationACouple1);
                resetField(massageDurationBCouple1);
                resetField(prenatalMassageCouple1);
                resetField(document.getElementById('Combination-Guest-1-Couple-1'));
                resetField(document.getElementById('Combination-Guest-2-Couple-1'));
                resetField(document.getElementById('Massage-Guest-1-Couple-1'));
                resetField(document.getElementById('Massage-Guest-2-Couple-1'));
                resetField(durationAGuest1And2Couple1);
                resetField(document.getElementById('Facial-Guest-1-Couple-1'));
                resetField(document.getElementById('Facial-Guest-2-Couple-1'));
                resetField(facialAddOnGuest1Couple1);
                resetField(facialAddOnGuest2Couple1);
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-1'));
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-1'));
                resetField(otherServicesInfoCouple1);
                hideField(couplePackageLabel1);
                hideField(coupleMassageLabel1);
                hideField(massageDurationACoupleLabel1);
                hideField(massageDurationBCoupleLabel1);
                hideField(prenatalMassageCoupleLabel1);
                hideField(combinationGuest1CoupleLabel1);
                hideField(combinationGuest2CoupleLabel1);
                hideField(massageGuest1CoupleLabel1);
                hideField(massageGuest2CoupleLabel1);
                hideField(durationAGuest1And2CoupleLabel1);
                hideField(facialGuest1CoupleLabel1);
                hideField(facialGuest2CoupleLabel1);
                hideField(facialAddOnGuest1CoupleLabel1);
                hideField(facialAddOnGuest2CoupleLabel1);
                hideField(bodyTreatmentGuest1CoupleLabel1);
                hideField(bodyTreatmentGuest2CoupleLabel1);
                break;

            case 'Package-Couple-1':
                resetField(spaDelSolDreamInfoCouple1);
                resetField(otherPackagesInfoCouple1);
                break;

            case 'Massage-Couple-1':
                resetField(massageDurationACouple1);
                resetField(massageDurationBCouple1);
                resetField(prenatalMassageCouple1);
                resetField(document.getElementById('Combination-Guest-1-Couple-1'));
                resetField(document.getElementById('Combination-Guest-2-Couple-1'));
                resetField(document.getElementById('Massage-Guest-1-Couple-1'));
                resetField(document.getElementById('Massage-Guest-2-Couple-1'));
                resetField(durationAGuest1And2Couple1);
                hideField(massageDurationACoupleLabel1);
                hideField(massageDurationBCoupleLabel1);
                hideField(prenatalMassageCoupleLabel1);
                hideField(combinationGuest1CoupleLabel1);
                hideField(combinationGuest2CoupleLabel1);
                hideField(massageGuest1CoupleLabel1);
                hideField(massageGuest2CoupleLabel1);
                hideField(durationAGuest1And2CoupleLabel1);
                break;

            case 'Facial-Guest-1-Couple-1':
                resetField(facialAddOnGuest1Couple1);
                hideField(facialAddOnGuest1CoupleLabel1);
                break;

            case 'Facial-Guest-2-Couple-1':
                resetField(facialAddOnGuest2Couple1);
                hideField(facialAddOnGuest2CoupleLabel1);
                break;
        }
    }

    function hideCoupleSet1Conditionals() {
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
    }

    function handleCoupleSet1Conditionals() {
        hideCoupleSet1Conditionals();

        const coupleServiceValue1 = coupleService1.value;
        if (coupleServiceValue1 === 'Package') {
            couplePackage1.style.display = 'block';
            couplePackageLabel1.style.display = 'block';
        } else if (coupleServiceValue1 === 'Massage') {
            coupleMassage1.style.display = 'block';
            coupleMassageLabel1.style.display = 'block';
        } else if (coupleServiceValue1 === 'Facial') {
            facialSelectsWrapperCouple1.style.display = 'grid';
            facialGuest1CoupleLabel1.style.display = 'block';
            facialGuest2CoupleLabel1.style.display = 'block';
            facialAddOnGuest1CoupleLabel1.style.display = 'block';
            facialAddOnGuest2CoupleLabel1.style.display = 'block';
        } else if (coupleServiceValue1 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple1.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel1.style.display = 'block';
            bodyTreatmentGuest2CoupleLabel1.style.display = 'block';
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
            massageDurationACoupleLabel1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Reflexology') {
            massageDurationBCouple1.style.display = 'block';
            massageDurationBCoupleLabel1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Prenatal and other') {
            prenatalMassageCouple1.style.display = 'block';
            prenatalMassageCoupleLabel1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple1.style.display = 'grid';
            combinationGuest1CoupleLabel1.style.display = 'block';
            combinationGuest2CoupleLabel1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Two different types') {
            differentMassagesSelectsWrapperCouple1.style.display = 'grid';
            massageGuest1CoupleLabel1.style.display = 'block';
            massageGuest2CoupleLabel1.style.display = 'block';
        }

        const massageGuest1Value1 = document.getElementById('Massage-Guest-1-Couple-1').value;
        const massageGuest2Value1 = document.getElementById('Massage-Guest-2-Couple-1').value;
        if (massageGuest1Value1 !== '' && massageGuest2Value1 !== '') {
            durationAGuest1And2Couple1.style.display = 'block';
            durationAGuest1And2CoupleLabel1.style.display = 'block';
        }

        const facialGuest1Value1 = document.getElementById('Facial-Guest-1-Couple-1').value;
        if (facialGuest1Value1 === 'Sol Janssen') {
            facialAddOnGuest1Couple1.style.display = 'block';
            facialAddOnGuest1CoupleLabel1.style.display = 'block';
        }

        const facialGuest2Value1 = document.getElementById('Facial-Guest-2-Couple-1').value;
        if (facialGuest2Value1 === 'Sol Janssen') {
            facialAddOnGuest2Couple1.style.display = 'block';
            facialAddOnGuest2CoupleLabel1.style.display = 'block';
        }
    }

    coupleService1.addEventListener('change', function() {
        resetAndHideChildrenCoupleSet1(this);
        handleCoupleSet1Conditionals();
    });
    couplePackage1.addEventListener('change', handleCoupleSet1Conditionals);
    coupleMassage1.addEventListener('change', handleCoupleSet1Conditionals);
    document.getElementById('Massage-Guest-1-Couple-1').addEventListener('change', handleCoupleSet1Conditionals);
    document.getElementById('Massage-Guest-2-Couple-1').addEventListener('change', handleCoupleSet1Conditionals);
    document.getElementById('Facial-Guest-1-Couple-1').addEventListener('change', handleCoupleSet1Conditionals);
    document.getElementById('Facial-Guest-2-Couple-1').addEventListener('change', handleCoupleSet1Conditionals);

    hideCoupleSet1Conditionals(); // Initial hide
});

// COUPLE SERVICE SET 2 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const coupleService2 = document.getElementById('Service-Couple-2');
    const coupleServiceLabel2 = document.getElementById('Service-Couple-2-Label');
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
    const facialGuest1CoupleLabel2 = document.getElementById ('Facial-Guest-1-Couple-2-Label');
    const facialGuest2CoupleLabel2 = document.getElementById ('Facial-Guest-2-Couple-2-Label');
    const facialAddOnGuest1Couple2 = document.getElementById('Facial-Add-On-Guest-1-Couple-2');
    const facialAddOnGuest1CoupleLabel2 = document.getElementById('Facial-Add-On-Guest-1-Couple-2-Label');
    const facialAddOnGuest2Couple2 = document.getElementById('Facial-Add-On-Guest-2-Couple-2');
    const facialAddOnGuest2CoupleLabel2 = document.getElementById('Facial-Add-On-Guest-2-Couple-2-Label');
    const bodyTreatmentsSelectsWrapperCouple2 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-2');
    const bodyTreatmentGuest1CoupleLabel2 = document.getElementById('Body-Treatment-Guest-1-Couple-2-Label');
    const bodyTreatmentGuest2CoupleLabel2 = document.getElementById('Body-Treatment-Guest-2-Couple-2-Label');
    const otherServicesInfoCouple2 = document.getElementById('Other-Services-Info-Couple-2');

    function resetAndHideChildrenCoupleSet2(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Couple-2':
                resetField(couplePackage2);
                resetField(spaDelSolDreamInfoCouple2);
                resetField(otherPackagesInfoCouple2);
                resetField(coupleMassage2);
                resetField(massageDurationACouple2);
                resetField(massageDurationBCouple2);
                resetField(prenatalMassageCouple2);
                resetField(document.getElementById('Combination-Guest-1-Couple-2'));
                resetField(document.getElementById('Combination-Guest-2-Couple-2'));
                resetField(document.getElementById('Massage-Guest-1-Couple-2'));
                resetField(document.getElementById('Massage-Guest-2-Couple-2'));
                resetField(durationAGuest1And2Couple2);
                resetField(document.getElementById('Facial-Guest-1-Couple-2'));
                resetField(document.getElementById('Facial-Guest-2-Couple-2'));
                resetField(facialAddOnGuest1Couple2);
                resetField(facialAddOnGuest2Couple2);
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-2'));
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-2'));
                resetField(otherServicesInfoCouple2);
                hideField(couplePackageLabel2);
                hideField(coupleMassageLabel2);
                hideField(massageDurationACoupleLabel2);
                hideField(massageDurationBCoupleLabel2);
                hideField(prenatalMassageCoupleLabel2);
                hideField(combinationGuest1CoupleLabel2);
                hideField(combinationGuest2CoupleLabel2);
                hideField(massageGuest1CoupleLabel2);
                hideField(massageGuest2CoupleLabel2);
                hideField(durationAGuest1And2CoupleLabel2);
                hideField(facialGuest1CoupleLabel2);
                hideField(facialGuest2CoupleLabel2);
                hideField(facialAddOnGuest1CoupleLabel2);
                hideField(facialAddOnGuest2CoupleLabel2);
                hideField(bodyTreatmentGuest1CoupleLabel2);
                hideField(bodyTreatmentGuest2CoupleLabel2);
                break;

            case 'Package-Couple-2':
                resetField(spaDelSolDreamInfoCouple2);
                resetField(otherPackagesInfoCouple2);
                break;

            case 'Massage-Couple-2':
                resetField(massageDurationACouple2);
                resetField(massageDurationBCouple2);
                resetField(prenatalMassageCouple2);
                resetField(document.getElementById('Combination-Guest-1-Couple-2'));
                resetField(document.getElementById('Combination-Guest-2-Couple-2'));
                resetField(document.getElementById('Massage-Guest-1-Couple-2'));
                resetField(document.getElementById('Massage-Guest-2-Couple-2'));
                resetField(durationAGuest1And2Couple2);
                hideField(massageDurationACoupleLabel2);
                hideField(massageDurationBCoupleLabel2);
                hideField(prenatalMassageCoupleLabel2);
                hideField(combinationGuest1CoupleLabel2);
                hideField(combinationGuest2CoupleLabel2);
                hideField(massageGuest1CoupleLabel2);
                hideField(massageGuest2CoupleLabel2);
                hideField(durationAGuest1And2CoupleLabel2);
                break;

            case 'Facial-Guest-1-Couple-2':
                resetField(facialAddOnGuest1Couple2);
                hideField(facialAddOnGuest1CoupleLabel2);
                break;

            case 'Facial-Guest-2-Couple-2':
                resetField(facialAddOnGuest2Couple2);
                hideField(facialAddOnGuest2CoupleLabel2);
                break;
        }
    }

    function hideCoupleSet2Conditionals() {
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
    }

    function handleCoupleSet2Conditionals() {
        hideCoupleSet2Conditionals();

        const coupleServiceValue2 = coupleService2.value;
        if (coupleServiceValue2 === 'Package') {
            couplePackage2.style.display = 'block';
            couplePackageLabel2.style.display = 'block';
        } else if (coupleServiceValue2 === 'Massage') {
            coupleMassage2.style.display = 'block';
            coupleMassageLabel2.style.display = 'block';
        } else if (coupleServiceValue2 === 'Facial') {
            facialSelectsWrapperCouple2.style.display = 'grid';
            facialGuest1CoupleLabel2.style.display = 'block';
            facialGuest2CoupleLabel2.style.display = 'block';
        } else if (coupleServiceValue2 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple2.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel2.style.display = 'block';
            bodyTreatmentGuest2CoupleLabel2.style.display = 'block';
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
            massageDurationACoupleLabel2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Reflexology') {
            massageDurationBCouple2.style.display = 'block';
            massageDurationBCoupleLabel2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Prenatal and other') {
            prenatalMassageCouple2.style.display = 'block';
            prenatalMassageCoupleLabel2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple2.style.display = 'grid';
            combinationGuest1CoupleLabel2.style.display = 'block';
            combinationGuest2CoupleLabel2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Two different types') {
            differentMassagesSelectsWrapperCouple2.style.display = 'grid';
            massageGuest1CoupleLabel2.style.display = 'block';
            massageGuest2CoupleLabel2.style.display = 'block';
        }

        const massageGuest1Value2 = document.getElementById('Massage-Guest-1-Couple-2').value;
        const massageGuest2Value2 = document.getElementById('Massage-Guest-2-Couple-2').value;
        if (massageGuest1Value2 !== '' && massageGuest2Value2 !== '') {
            durationAGuest1And2Couple2.style.display = 'block';
            durationAGuest1And2CoupleLabel2.style.display = 'block';
        }

        const facialGuest1Value2 = document.getElementById('Facial-Guest-1-Couple-2').value;
        if (facialGuest1Value2 === 'Sol Janssen') {
            facialAddOnGuest1Couple2.style.display = 'block';
            facialAddOnGuest1CoupleLabel2.style.display = 'block';
        }

        const facialGuest2Value2 = document.getElementById('Facial-Guest-2-Couple-2').value;
        if (facialGuest2Value2 === 'Sol Janssen') {
            facialAddOnGuest2Couple2.style.display = 'block';
            facialAddOnGuest2CoupleLabel2.style.display = 'block';
        }
    }

    coupleService2.addEventListener('change', function() {
        resetAndHideChildrenCoupleSet2(this);
        handleCoupleSet2Conditionals();
    });
    couplePackage2.addEventListener('change', handleCoupleSet2Conditionals);
    coupleMassage2.addEventListener('change', handleCoupleSet2Conditionals);
    document.getElementById('Massage-Guest-1-Couple-2').addEventListener('change', handleCoupleSet2Conditionals);
    document.getElementById('Massage-Guest-2-Couple-2').addEventListener('change', handleCoupleSet2Conditionals);
    document.getElementById('Facial-Guest-1-Couple-2').addEventListener('change', handleCoupleSet2Conditionals);
    document.getElementById('Facial-Guest-2-Couple-2').addEventListener('change', handleCoupleSet2Conditionals);

    hideCoupleSet2Conditionals(); // Initial hide
});

// COUPLE SERVICE SET 3 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const coupleService3 = document.getElementById('Service-Couple-3');
    const coupleServiceLabel3 = document.getElementById('Service-Couple-3-Label');
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
    const facialGuest1CoupleLabel3 = document.getElementById ('Facial-Guest-1-Couple-3-Label');
    const facialGuest2CoupleLabel3 = document.getElementById ('Facial-Guest-2-Couple-3-Label');
    const facialAddOnGuest1Couple3 = document.getElementById('Facial-Add-On-Guest-1-Couple-3');
    const facialAddOnGuest1CoupleLabel3 = document.getElementById('Facial-Add-On-Guest-1-Couple-3-Label');
    const facialAddOnGuest2Couple3 = document.getElementById('Facial-Add-On-Guest-2-Couple-3');
    const facialAddOnGuest2CoupleLabel3 = document.getElementById('Facial-Add-On-Guest-2-Couple-3-Label');
    const bodyTreatmentsSelectsWrapperCouple3 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-3');
    const bodyTreatmentGuest1CoupleLabel3 = document.getElementById('Body-Treatment-Guest-1-Couple-3-Label');
    const bodyTreatmentGuest2CoupleLabel3 = document.getElementById('Body-Treatment-Guest-2-Couple-3-Label');
    const otherServicesInfoCouple3 = document.getElementById('Other-Services-Info-Couple-3');

    function resetAndHideChildrenCoupleSet3(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Couple-3':
                resetField(couplePackage3);
                resetField(spaDelSolDreamInfoCouple3);
                resetField(otherPackagesInfoCouple3);
                resetField(coupleMassage3);
                resetField(massageDurationACouple3);
                resetField(massageDurationBCouple3);
                resetField(prenatalMassageCouple3);
                resetField(document.getElementById('Combination-Guest-1-Couple-3'));
                resetField(document.getElementById('Combination-Guest-2-Couple-3'));
                resetField(document.getElementById('Massage-Guest-1-Couple-3'));
                resetField(document.getElementById('Massage-Guest-2-Couple-3'));
                resetField(durationAGuest1And2Couple3);
                resetField(document.getElementById('Facial-Guest-1-Couple-3'));
                resetField(document.getElementById('Facial-Guest-2-Couple-3'));
                resetField(facialAddOnGuest1Couple3);
                resetField(facialAddOnGuest2Couple3);
                resetField(document.getElementById('Body-Treatment-Guest-1-Couple-3'));
                resetField(document.getElementById('Body-Treatment-Guest-2-Couple-3'));
                resetField(otherServicesInfoCouple3);
                hideField(couplePackageLabel3);
                hideField(coupleMassageLabel3);
                hideField(massageDurationACoupleLabel3);
                hideField(massageDurationBCoupleLabel3);
                hideField(prenatalMassageCoupleLabel3);
                hideField(combinationGuest1CoupleLabel3);
                hideField(combinationGuest2CoupleLabel3);
                hideField(massageGuest1CoupleLabel3);
                hideField(massageGuest2CoupleLabel3);
                hideField(durationAGuest1And2CoupleLabel3);
                hideField(facialGuest1CoupleLabel3);
                hideField(facialGuest2CoupleLabel3);
                hideField(facialAddOnGuest1CoupleLabel3);
                hideField(facialAddOnGuest2CoupleLabel3);
                hideField(bodyTreatmentGuest1CoupleLabel3);
                hideField(bodyTreatmentGuest2CoupleLabel3);
                break;

            case 'Package-Couple-3':
                resetField(spaDelSolDreamInfoCouple3);
                resetField(otherPackagesInfoCouple3);
                break;

            case 'Massage-Couple-3':
                resetField(massageDurationACouple3);
                resetField(massageDurationBCouple3);
                resetField(prenatalMassageCouple3);
                resetField(document.getElementById('Combination-Guest-1-Couple-3'));
                resetField(document.getElementById('Combination-Guest-2-Couple-3'));
                resetField(document.getElementById('Massage-Guest-1-Couple-3'));
                resetField(document.getElementById('Massage-Guest-2-Couple-3'));
                resetField(durationAGuest1And2Couple3);
                hideField(massageDurationACoupleLabel3);
                hideField(massageDurationBCoupleLabel3);
                hideField(prenatalMassageCoupleLabel3);
                hideField(combinationGuest1CoupleLabel3);
                hideField(combinationGuest2CoupleLabel3);
                hideField(massageGuest1CoupleLabel3);
                hideField(massageGuest2CoupleLabel3);
                hideField(durationAGuest1And2CoupleLabel3);
                break;

            case 'Facial-Guest-1-Couple-3':
                resetField(facialAddOnGuest1Couple3);
                hideField(facialAddOnGuest1CoupleLabel3);
                break;

            case 'Facial-Guest-2-Couple-3':
                resetField(facialAddOnGuest2Couple3);
                hideField(facialAddOnGuest2CoupleLabel3);
                break;
        }
    }

    function hideCoupleSet3Conditionals() {
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

    function handleCoupleSet3Conditionals() {
        hideCoupleSet3Conditionals();

        const coupleServiceValue3 = coupleService3.value;
        if (coupleServiceValue3 === 'Package') {
            couplePackage3.style.display = 'block';
            couplePackageLabel3.style.display = 'block';
        } else if (coupleServiceValue3 === 'Massage') {
            coupleMassage3.style.display = 'block';
            coupleMassageLabel3.style.display = 'block';
        } else if (coupleServiceValue3 === 'Facial') {
            facialSelectsWrapperCouple3.style.display = 'grid';
            facialGuest1CoupleLabel3.style.display = 'block';
            facialGuest2CoupleLabel3.style.display = 'block';
        } else if (coupleServiceValue3 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple3.style.display = 'grid';
            bodyTreatmentGuest1CoupleLabel3.style.display = 'block';
            bodyTreatmentGuest2CoupleLabel3.style.display = 'block';
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
            massageDurationACoupleLabel3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Reflexology') {
            massageDurationBCouple3.style.display = 'block';
            massageDurationBCoupleLabel3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Prenatal and other') {
            prenatalMassageCouple3.style.display = 'block';
            prenatalMassageCoupleLabel3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple3.style.display = 'grid';
            combinationGuest1CoupleLabel3.style.display = 'block';
            combinationGuest2CoupleLabel3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Two different types') {
            differentMassagesSelectsWrapperCouple3.style.display = 'grid';
            massageGuest1CoupleLabel3.style.display = 'block';
            massageGuest2CoupleLabel3.style.display = 'block';
        }

        const massageGuest1Value3 = document.getElementById('Massage-Guest-1-Couple-3').value;
        const massageGuest2Value3 = document.getElementById('Massage-Guest-2-Couple-3').value;
        if (massageGuest1Value3 !== '' && massageGuest2Value3 !== '') {
            durationAGuest1And2Couple3.style.display = 'block';
            durationAGuest1And2CoupleLabel3.style.display = 'block';
        }

        const facialGuest1Value3 = document.getElementById('Facial-Guest-1-Couple-3').value;
        if (facialGuest1Value3 === 'Sol Janssen') {
            facialAddOnGuest1Couple3.style.display = 'block';
            facialAddOnGuest1CoupleLabel3.style.display = 'block';
        }

        const facialGuest2Value3 = document.getElementById('Facial-Guest-2-Couple-3').value;
        if (facialGuest2Value3 === 'Sol Janssen') {
            facialAddOnGuest2Couple3.style.display = 'block';
            facialAddOnGuest2CoupleLabel3.style.display = 'block';
        }
    }

    coupleService3.addEventListener('change', function() {
        resetAndHideChildrenCoupleSet3(this);
        handleCoupleSet3Conditionals();
    });
    couplePackage3.addEventListener('change', handleCoupleSet3Conditionals);
    coupleMassage3.addEventListener('change', handleCoupleSet3Conditionals);
    document.getElementById('Massage-Guest-1-Couple-3').addEventListener('change', handleCoupleSet3Conditionals);
    document.getElementById('Massage-Guest-2-Couple-3').addEventListener('change', handleCoupleSet3Conditionals);
    document.getElementById('Facial-Guest-1-Couple-3').addEventListener('change', handleCoupleSet3Conditionals);
    document.getElementById('Facial-Guest-2-Couple-3').addEventListener('change', handleCoupleSet3Conditionals);

    hideCoupleSet3Conditionals(); // Initial hide
});

// SINGLE SERVICE ORIGINAL SET CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const singleService = document.getElementById('Service-Single');
    const singleServiceLabel = document.getElementById('Service-Single-Label');
    const singlePackage = document.getElementById('Package-Single');
    const singlePackageLabel = document.getElementById('Package-Single-Label');
    const spaDelSolDreamInfo = document.getElementById('Spa-Del-Sol-Dream-Info-Single');
    const singleMassage = document.getElementById('Massage-Single');
    const singleMassageLabel = document.getElementById('Massage-Single-Label');
    const massageDurationA = document.getElementById('Duration-A-Single');
    const massageDurationALabel = document.getElementById('Duration-A-Single-Label');
    const massageDurationB = document.getElementById('Duration-B-Single');
    const massageDurationBLabel = document.getElementById('Duration-B-Single-Label');
    const combinationType = document.getElementById('Combination-Single');
    const combinationTypeLabel = document.getElementById('Combination-Single-Label');
    const singleFacial = document.getElementById('Facial-Single');
    const singleFacialLabel = document.getElementById('Facial-Single-Label');
    const facialAddOn = document.getElementById('Add-On-Single');
    const facialAddOnLabel = document.getElementById('Add-On-Single-Label');
    const bodyTreatment = document.getElementById('Body-Treatment-Single');
    const bodyTreatmentLabel = document.getElementById('Body-Treatment-Single-Label');
    const waxInfo = document.getElementById('Wax-Info-Single');
    const multipleServicesInfo = document.getElementById('Multiple-Services-Info-Single');

    function resetAndHideChildrenSingleOriginal(parentSelect) {
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
                hideField(singlePackageLabel);
                hideField(singleMassageLabel);
                hideField(massageDurationALabel);
                hideField(massageDurationBLabel);
                hideField(combinationTypeLabel);
                hideField(singleFacialLabel);
                hideField(facialAddOnLabel);
                hideField(bodyTreatmentLabel);
                break;

            case 'Package-Single':
                resetField(spaDelSolDreamInfo);
                break;

            case 'Massage-Single':
                resetField(massageDurationA);
                resetField(massageDurationB);
                resetField(combinationType);
                hideField(massageDurationALabel);
                hideField(massageDurationBLabel);
                hideField(combinationTypeLabel);
                break;

            case 'Facial-Single':
                resetField(facialAddOn);
                hideField(facialAddOnLabel);
                break;
        }
    }

    function hideSingleOriginalSetConditionals() {
        singlePackage.style.display = 'none';
        singlePackageLabel.style.display = 'none';
        spaDelSolDreamInfo.style.display = 'none';
        singleMassage.style.display = 'none';
        singleMassageLabel.style.display = 'none';
        massageDurationA.style.display = 'none';
        massageDurationALabel.style.display = 'none';
        massageDurationB.style.display = 'none';
        massageDurationBLabel.style.display = 'none';
        combinationType.style.display = 'none';
        combinationTypeLabel.style.display = 'none';
        singleFacial.style.display = 'none';
        singleFacialLabel.style.display = 'none';
        facialAddOn.style.display = 'none';
        facialAddOnLabel.style.display = 'none';
        bodyTreatment.style.display = 'none';
        bodyTreatmentLabel.style.display = 'none';
        waxInfo.style.display = 'none';
        multipleServicesInfo.style.display = 'none';
    }

    function handleSingleOriginalSetConditionals() {
        hideSingleOriginalSetConditionals();

        const singleServiceValue = singleService.value;
        if (singleServiceValue === 'Package') {
            singlePackage.style.display = 'block';
            singlePackageLabel.style.display = 'block';
        } else if (singleServiceValue === 'Massage') {
            singleMassage.style.display = 'block';
            singleMassageLabel.style.display = 'block';
        } else if (singleServiceValue === 'Facial') {
            singleFacial.style.display = 'block';
            singleFacialLabel.style.display = 'block';
        } else if (singleServiceValue === 'Body treatment') {
            bodyTreatment.style.display = 'block';
            bodyTreatmentLabel.style.display = 'block';
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
            massageDurationALabel.style.display = 'block';
        } else if (singleMassageValue === 'Reflexology') {
            massageDurationB.style.display = 'block';
            massageDurationBLabel.style.display = 'block';
        } else if (singleMassageValue === 'Relaxing Combination') {
            combinationType.style.display = 'block';
            combinationTypeLabel.style.display = 'block';
        }

        const singleFacialValue = singleFacial.value;
        if (singleFacialValue === 'Sol Janssen') {
            facialAddOn.style.display = 'block';
            facialAddOnLabel.style.display = 'block';
        }
    }

    singleService.addEventListener('change', function() {
        resetAndHideChildrenSingleOriginal(this);
        handleSingleOriginalSetConditionals();
    });
    singlePackage.addEventListener('change', handleSingleOriginalSetConditionals);
    singleMassage.addEventListener('change', handleSingleOriginalSetConditionals);
    singleFacial.addEventListener('change', handleSingleOriginalSetConditionals);

    hideSingleOriginalSetConditionals(); // Initial hide
});

// SINGLE SERVICE SET 1 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const singleService1 = document.getElementById('Service-Single-1');
    const singleServiceLabel1 = document.getElementById('Service-Single-1-Label');
    const singlePackage1 = document.getElementById('Package-Single-1');
    const singlePackageLabel1 = document.getElementById('Package-Single-1-Label');
    const spaDelSolDreamInfo1 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-1');
    const singleMassage1 = document.getElementById('Massage-Single-1');
    const singleMassageLabel1 = document.getElementById('Massage-Single-1-Label');
    const massageDurationA1 = document.getElementById('Duration-A-Single-1');
    const massageDurationALabel1 = document.getElementById('Duration-A-Single-1-Label');
    const massageDurationB1 = document.getElementById('Duration-B-Single-1');
    const massageDurationBLabel1 = document.getElementById('Duration-B-Single-1-Label');
    const combinationType1 = document.getElementById('Combination-Single-1');
    const combinationTypeLabel1 = document.getElementById('Combination-Single-1-Label');
    const singleFacial1 = document.getElementById('Facial-Single-1');
    const singleFacialLabel1 = document.getElementById('Facial-Single-1-Label');
    const facialAddOn1 = document.getElementById('Add-On-Single-1');
    const facialAddOnLabel1 = document.getElementById('Add-On-Single-1-Label');
    const bodyTreatment1 = document.getElementById('Body-Treatment-Single-1');
    const bodyTreatmentLabel1 = document.getElementById('Body-Treatment-Single-1-Label');
    const waxInfo1 = document.getElementById('Wax-Info-Single-1');
    const multipleServicesInfo1 = document.getElementById('Multiple-Services-Info-Single-1');

    function resetAndHideChildrenSingleSet1(parentSelect) {
        switch (parentSelect.id) {
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
                hideField(singlePackageLabel1);
                hideField(singleMassageLabel1);
                hideField(massageDurationALabel1);
                hideField(massageDurationBLabel1);
                hideField(combinationTypeLabel1);
                hideField(singleFacialLabel1);
                hideField(facialAddOnLabel1);
                hideField(bodyTreatmentLabel1);
                break;

            case 'Package-Single-1':
                resetField(spaDelSolDreamInfo1);
                break;

            case 'Massage-Single-1':
                resetField(massageDurationA1);
                resetField(massageDurationB1);
                resetField(combinationType1);
                hideField(massageDurationALabel1);
                hideField(massageDurationBLabel1);
                hideField(combinationTypeLabel1);
                break;

            case 'Facial-Single-1':
                resetField(facialAddOn1);
                hideField(facialAddOnLabel1);
                break;
        }
    }

    function hideSingleSet1Conditionals() {
        singlePackage1.style.display = 'none';
        singlePackageLabel1.style.display = 'none';
        spaDelSolDreamInfo1.style.display = 'none';
        singleMassage1.style.display = 'none';
        singleMassageLabel1.style.display = 'none';
        massageDurationA1.style.display = 'none';
        massageDurationALabel1.style.display = 'none';
        massageDurationB1.style.display = 'none';
        massageDurationBLabel1.style.display = 'none';
        combinationType1.style.display = 'none';
        combinationTypeLabel1.style.display = 'none';
        singleFacial1.style.display = 'none';
        singleFacialLabel1.style.display = 'none';
        facialAddOn1.style.display = 'none';
        facialAddOnLabel1.style.display = 'none';
        bodyTreatment1.style.display = 'none';
        bodyTreatmentLabel1.style.display = 'none';
        waxInfo1.style.display = 'none';
        multipleServicesInfo1.style.display = 'none';
    }

    function handleSingleSet1Conditionals() {
        hideSingleSet1Conditionals();

        const singleServiceValue1 = singleService1.value;
        if (singleServiceValue1 === 'Package') {
            singlePackage1.style.display = 'block';
            singlePackageLabel1.style.display = 'block';
        } else if (singleServiceValue1 === 'Massage') {
            singleMassage1.style.display = 'block';
            singleMassageLabel1.style.display = 'block';
        } else if (singleServiceValue1 === 'Facial') {
            singleFacial1.style.display = 'block';
            singleFacialLabel1.style.display = 'block';
        } else if (singleServiceValue1 === 'Body treatment') {
            bodyTreatment1.style.display = 'block';
            bodyTreatmentLabel1.style.display = 'block';
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
            massageDurationALabel1.style.display = 'block';
        } else if (singleMassageValue1 === 'Reflexology') {
            massageDurationB1.style.display = 'block';
            massageDurationBLabel1.style.display = 'block';
        } else if (singleMassageValue1 === 'Relaxing Combination') {
            combinationType1.style.display = 'block';
            combinationTypeLabel1.style.display = 'block';
        }

        const singleFacialValue1 = singleFacial1.value;
        if (singleFacialValue1 === 'Sol Janssen') {
            facialAddOn1.style.display = 'block';
            facialAddOnLabel1.style.display = 'block';
        }
    }

    singleService1.addEventListener('change', function() {
        resetAndHideChildrenSingleSet1(this);
        handleSingleSet1Conditionals();
    });
    singlePackage1.addEventListener('change', handleSingleSet1Conditionals);
    singleMassage1.addEventListener('change', handleSingleSet1Conditionals);
    singleFacial1.addEventListener('change', handleSingleSet1Conditionals);

    hideSingleSet1Conditionals(); // Initial hide
});

// SINGLE SERVICE SET 2 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const singleService2 = document.getElementById('Service-Single-2');
    const singleServiceLabel2 = document.getElementById('Service-Single-2-Label');
    const singlePackage2 = document.getElementById('Package-Single-2');
    const singlePackageLabel2 = document.getElementById('Package-Single-2-Label');
    const spaDelSolDreamInfo2 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-2');
    const singleMassage2 = document.getElementById('Massage-Single-2');
    const singleMassageLabel2 = document.getElementById('Massage-Single-2-Label');
    const massageDurationA2 = document.getElementById('Duration-A-Single-2');
    const massageDurationALabel2 = document.getElementById('Duration-A-Single-2-Label');
    const massageDurationB2 = document.getElementById('Duration-B-Single-2');
    const massageDurationBLabel2 = document.getElementById('Duration-B-Single-2-Label');
    const combinationType2 = document.getElementById('Combination-Single-2');
    const combinationTypeLabel2 = document.getElementById('Combination-Single-2-Label');
    const singleFacial2 = document.getElementById('Facial-Single-2');
    const singleFacialLabel2 = document.getElementById('Facial-Single-2-Label');
    const facialAddOn2 = document.getElementById('Add-On-Single-2');
    const facialAddOnLabel2 = document.getElementById('Add-On-Single-2-Label');
    const bodyTreatment2 = document.getElementById('Body-Treatment-Single-2');
    const bodyTreatmentLabel2 = document.getElementById('Body-Treatment-Single-2-Label');
    const waxInfo2 = document.getElementById('Wax-Info-Single-2');
    const multipleServicesInfo2 = document.getElementById('Multiple-Services-Info-Single-2');

    function resetAndHideChildrenSingleSet2(parentSelect) {
        switch (parentSelect.id) {
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
                hideField(singlePackageLabel2);
                hideField(singleMassageLabel2);
                hideField(massageDurationALabel2);
                hideField(massageDurationBLabel2);
                hideField(combinationTypeLabel2);
                hideField(singleFacialLabel2);
                hideField(facialAddOnLabel2);
                hideField(bodyTreatmentLabel2);
                break;

            case 'Package-Single-2':
                resetField(spaDelSolDreamInfo2);
                break;

            case 'Massage-Single-2':
                resetField(massageDurationA2);
                resetField(massageDurationB2);
                resetField(combinationType2);
                hideField(massageDurationALabel2);
                hideField(massageDurationBLabel2);
                hideField(combinationTypeLabel2);
                break;

            case 'Facial-Single-2':
                resetField(facialAddOn2);
                hideField(facialAddOnLabel2);
                break;
        }
    }

    function hideSingleSet2Conditionals() {
        singlePackage2.style.display = 'none';
        singlePackageLabel2.style.display = 'none';
        spaDelSolDreamInfo2.style.display = 'none';
        singleMassage2.style.display = 'none';
        singleMassageLabel2.style.display = 'none';
        massageDurationA2.style.display = 'none';
        massageDurationALabel2.style.display = 'none';
        massageDurationB2.style.display = 'none';
        massageDurationBLabel2.style.display = 'none';
        combinationType2.style.display = 'none';
        combinationTypeLabel2.style.display = 'none';
        singleFacial2.style.display = 'none';
        singleFacialLabel2.style.display = 'none';
        facialAddOn2.style.display = 'none';
        facialAddOnLabel2.style.display = 'none';
        bodyTreatment2.style.display = 'none';
        bodyTreatmentLabel2.style.display = 'none';
        waxInfo2.style.display = 'none';
        multipleServicesInfo2.style.display = 'none';
    }

    function handleSingleSet2Conditionals() {
        hideSingleSet2Conditionals();

        const singleServiceValue2 = singleService2.value;
        if (singleServiceValue2 === 'Package') {
            singlePackage2.style.display = 'block';
            singlePackageLabel2.style.display = 'block';
        } else if (singleServiceValue2 === 'Massage') {
            singleMassage2.style.display = 'block';
            singleMassageLabel2.style.display = 'block';
        } else if (singleServiceValue2 === 'Facial') {
            singleFacial2.style.display = 'block';
            singleFacialLabel2.style.display = 'block';
        } else if (singleServiceValue2 === 'Body treatment') {
            bodyTreatment2.style.display = 'block';
            bodyTreatmentLabel2.style.display = 'block';
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
            massageDurationALabel2.style.display = 'block';
        } else if (singleMassageValue2 === 'Reflexology') {
            massageDurationB2.style.display = 'block';
            massageDurationBLabel2.style.display = 'block';
        } else if (singleMassageValue2 === 'Relaxing Combination') {
            combinationType2.style.display = 'block';
            combinationTypeLabel2.style.display = 'block';
        }

        const singleFacialValue2 = singleFacial2.value;
        if (singleFacialValue2 === 'Sol Janssen') {
            facialAddOn2.style.display = 'block';
            facialAddOnLabel2.style.display = 'block';
        }
    }

    singleService2.addEventListener('change', function() {
        resetAndHideChildrenSingleSet2(this);
        handleSingleSet2Conditionals();
    });
    singlePackage2.addEventListener('change', handleSingleSet2Conditionals);
    singleMassage2.addEventListener('change', handleSingleSet2Conditionals);
    singleFacial2.addEventListener('change', handleSingleSet2Conditionals);

    hideSingleSet2Conditionals(); // Initial hide
});

// SINGLE SERVICE SET 3 CONDITIONALS SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const singleService3 = document.getElementById('Service-Single-3');
    const singleServiceLabel3 = document.getElementById('Service-Single-3-Label');
    const singlePackage3 = document.getElementById('Package-Single-3');
    const singlePackageLabel3 = document.getElementById('Package-Single-3-Label');
    const spaDelSolDreamInfo3 = document.getElementById('Spa-Del-Sol-Dream-Info-Single-3');
    const singleMassage3 = document.getElementById('Massage-Single-3');
    const singleMassageLabel3 = document.getElementById('Massage-Single-3-Label');
    const massageDurationA3 = document.getElementById('Duration-A-Single-3');
    const massageDurationALabel3 = document.getElementById('Duration-A-Single-3-Label');
    const massageDurationB3 = document.getElementById('Duration-B-Single-3');
    const massageDurationBLabel3 = document.getElementById('Duration-B-Single-3-Label');
    const combinationType3 = document.getElementById('Combination-Single-3');
    const combinationTypeLabel3 = document.getElementById('Combination-Single-3-Label');
    const singleFacial3 = document.getElementById('Facial-Single-3');
    const singleFacialLabel3 = document.getElementById('Facial-Single-3-Label');
    const facialAddOn3 = document.getElementById('Add-On-Single-3');
    const facialAddOnLabel3 = document.getElementById('Add-On-Single-3-Label');
    const bodyTreatment3 = document.getElementById('Body-Treatment-Single-3');
    const bodyTreatmentLabel3 = document.getElementById('Body-Treatment-Single-3-Label');
    const waxInfo3 = document.getElementById('Wax-Info-Single-3');
    const multipleServicesInfo3 = document.getElementById('Multiple-Services-Info-Single-3');

    function resetAndHideChildrenSingleSet3(parentSelect) {
        switch (parentSelect.id) {
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
                hideField(singlePackageLabel3);
                hideField(singleMassageLabel3);
                hideField(massageDurationALabel3);
                hideField(massageDurationBLabel3);
                hideField(combinationTypeLabel3);
                hideField(singleFacialLabel3);
                hideField(facialAddOnLabel3);
                hideField(bodyTreatmentLabel3);
                break;

            case 'Package-Single-3':
                resetField(spaDelSolDreamInfo3);
                break;

            case 'Massage-Single-3':
                resetField(massageDurationA3);
                resetField(massageDurationB3);
                resetField(combinationType3);
                hideField(massageDurationALabel3);
                hideField(massageDurationBLabel3);
                hideField(combinationTypeLabel3);
                break;

            case 'Facial-Single-3':
                resetField(facialAddOn3);
                hideField(facialAddOnLabel3);
                break;
        }
    }

    function hideSingleSet3Conditionals() {
        singlePackage3.style.display = 'none';
        singlePackageLabel3.style.display = 'none';
        spaDelSolDreamInfo3.style.display = 'none';
        singleMassage3.style.display = 'none';
        singleMassageLabel3.style.display = 'none';
        massageDurationA3.style.display = 'none';
        massageDurationALabel3.style.display = 'none';
        massageDurationB3.style.display = 'none';
        massageDurationBLabel3.style.display = 'none';
        combinationType3.style.display = 'none';
        combinationTypeLabel3.style.display = 'none';
        singleFacial3.style.display = 'none';
        singleFacialLabel3.style.display = 'none';
        facialAddOn3.style.display = 'none';
        facialAddOnLabel3.style.display = 'none';
        bodyTreatment3.style.display = 'none';
        bodyTreatmentLabel3.style.display = 'none';
        waxInfo3.style.display = 'none';
        multipleServicesInfo3.style.display = 'none';
    }

    function handleSingleSet3Conditionals() {
        hideSingleSet3Conditionals();

        const singleServiceValue3 = singleService3.value;
        if (singleServiceValue3 === 'Package') {
            singlePackage3.style.display = 'block';
            singlePackageLabel3.style.display = 'block';
        } else if (singleServiceValue3 === 'Massage') {
            singleMassage3.style.display = 'block';
            singleMassageLabel3.style.display = 'block';
        } else if (singleServiceValue3 === 'Facial') {
            singleFacial3.style.display = 'block';
            singleFacialLabel3.style.display = 'block';
        } else if (singleServiceValue3 === 'Body treatment') {
            bodyTreatment3.style.display = 'block';
            bodyTreatmentLabel3.style.display = 'block';
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
            massageDurationALabel3.style.display = 'block';
        } else if (singleMassageValue3 === 'Reflexology') {
            massageDurationB3.style.display = 'block';
            massageDurationBLabel3.style.display = 'block';
        } else if (singleMassageValue3 === 'Relaxing Combination') {
            combinationType3.style.display = 'block';
            combinationTypeLabel3.style.display = 'block';
        }

        const singleFacialValue3 = singleFacial3.value;
        if (singleFacialValue3 === 'Sol Janssen') {
            facialAddOn3.style.display = 'block';
            facialAddOnLabel3.style.display = 'block';
        }
    }

    singleService3.addEventListener('change', function() {
        resetAndHideChildrenSingleSet3(this);
        handleSingleSet3Conditionals();
    });
    singlePackage3.addEventListener('change', handleSingleSet3Conditionals);
    singleMassage3.addEventListener('change', handleSingleSet3Conditionals);
    singleFacial3.addEventListener('change', handleSingleSet3Conditionals);

    hideSingleSet3Conditionals(); // Initial hide
});
