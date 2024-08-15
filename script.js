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
    
        console.log("DOM fully loaded and parsed");
    
        populateReviewStep(); // Ensure this runs after the DOM is ready
    });
