// MAIN STEP HANDLING SCRIPT

console.log("Script started");

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
            scrollToFormTop(); // Scroll to the top of the form after showing the next step
        } else {
            alert('Please fill out all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentStep === 'step-4') {
            resetServiceConditionals();
            clearGroupBookingInfo(); 
            clearNameInputsAndRevertLabels();
            resetLabelsForDefaultSelects();
        }
        if (currentStep === 'step-3') {
            resetNumberOfGuestsField();
            resetGuestArrangements();
        }
        currentStep = getPrevStep(currentStep);
        showStep(currentStep);
        scrollToFormTop(); // Scroll to the top of the form after showing the previous step
    });

    function getNextStep(current) {
        return hierarchicalSteps[current]?.next || current;
    }

    function getPrevStep(current) {
        return hierarchicalSteps[current]?.prev || current;
    }

    function scrollToFormTop() {
        const landingDiv = document.getElementById('landing-div');
        if (landingDiv) {
            landingDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn("Form section not found.");
        }
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

    // MOVE LABELS BACK

    const selects = document.querySelectorAll('select.floating-input');

    // Function to reset labels for select elements with default values
    function resetLabelsForDefaultSelects() {
        selects.forEach(select => {
            const label = select.nextElementSibling;

            if (label) {
                if (!select.value || select.value === "") {
                    label.classList.remove('active');
                    console.log(`Label reset for select with id: ${select.id}`);
                } else {
                    label.classList.add('active');
                }
            }
        });
    }

    // Event listener for select elements to manage label states dynamically
    selects.forEach(select => {
        const label = select.nextElementSibling;

        if (label) {
            // Initial state check based on the select's current value
            if (!select.value || select.value === "") {
                label.classList.remove('active');
            } else {
                label.classList.add('active');
            }

            // Listen for changes in the select element
            select.addEventListener('change', function() {
                if (!this.value || this.value === "") {
                    label.classList.remove('active');
                    this.blur(); // Blur to trigger the label movement
                } else {
                    label.classList.add('active');
                }
            });

            // Optional blur event to ensure label behavior
            select.addEventListener('blur', function() {
                if (!this.value || this.value === "") {
                    label.classList.remove('active');
                }
            });
        } else {
            console.warn(`No label found for select element with id: ${select.id}`);
        }
    });

    // Event listener for the previous button to trigger the label reset
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log("Previous button clicked");
            resetLabelsForDefaultSelects();
        });
    } else {
        console.warn("Previous button not found");
    }

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

    // NUMBER OF GUESTS CONDITIONALS SCRIPT

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

    const elements = {};
    const labels = {};
    
    ['Couple', 'Couple-1', 'Couple-2', 'Couple-3'].forEach(setId => {
        elements[setId] = {
            couplePackage: document.getElementById(`Package-${setId}`),
            spaDelSolDreamInfo: document.getElementById(`Spa-Del-Sol-Dream-Info-${setId}`),
            otherPackagesInfo: document.getElementById(`Other-Packages-Info-${setId}`),
            coupleMassage: document.getElementById(`Massage-${setId}`),
            massageDurationA: document.getElementById(`Duration-A-${setId}`),
            massageDurationB: document.getElementById(`Duration-B-${setId}`),
            prenatalMassage: document.getElementById(`Prenatal-Massage-${setId}`),
            combinationSelectsWrapper: document.getElementById(`Combination-Selects-Wrapper-${setId}`),
            combinationGuest1: document.getElementById(`Combination-Guest-1-${setId}`),
            combinationGuest2: document.getElementById(`Combination-Guest-2-${setId}`),
            differentMassagesSelectsWrapper: document.getElementById(`Different-Massages-Selects-Wrapper-${setId}`),
            massageGuest1: document.getElementById(`Massage-Guest-1-${setId}`),
            massageGuest2: document.getElementById(`Massage-Guest-2-${setId}`),
            durationGuest1And2: document.getElementById(`Duration-A-Guest-1-And-2-${setId}`),
            facialSelectsWrapper: document.getElementById(`Facial-Selects-Wrapper-${setId}`),
            facialGuest1: document.getElementById(`Facial-Guest-1-${setId}`),
            facialGuest2: document.getElementById(`Facial-Guest-2-${setId}`),
            facialAddOnGuest1: document.getElementById(`Facial-Add-On-Guest-1-${setId}`),
            facialAddOnGuest2: document.getElementById(`Facial-Add-On-Guest-2-${setId}`),
            bodyTreatmentsSelectsWrapper: document.getElementById(`Body-Treatments-Selects-Wrapper-${setId}`),
            bodyTreatmentGuest1: document.getElementById(`Body-Treatment-Guest-1-${setId}`),
            bodyTreatmentGuest2: document.getElementById(`Body-Treatment-Guest-2-${setId}`),
            otherServicesInfo: document.getElementById(`Other-Services-Info-${setId}`),
        };
    
        labels[setId] = {
            couplePackageLabel: document.getElementById(`Package-${setId}-Label`),
            coupleMassageLabel: document.getElementById(`Massage-${setId}-Label`),
            massageDurationALabel: document.getElementById(`Duration-A-${setId}-Label`),
            massageDurationBLabel: document.getElementById(`Duration-B-${setId}-Label`),
            prenatalMassageLabel: document.getElementById(`Prenatal-Massage-${setId}-Label`),
            combinationGuest1Label: document.getElementById(`Combination-Guest-1-${setId}-Label`),
            combinationGuest2Label: document.getElementById(`Combination-Guest-2-${setId}-Label`),
            massageGuest1Label: document.getElementById(`Massage-Guest-1-${setId}-Label`),
            massageGuest2Label: document.getElementById(`Massage-Guest-2-${setId}-Label`),
            durationGuest1And2Label: document.getElementById(`Duration-A-Guest-1-And-2-${setId}-Label`),
            facialGuest1Label: document.getElementById(`Facial-Guest-1-${setId}-Label`),
            facialGuest2Label: document.getElementById(`Facial-Guest-2-${setId}-Label`),
            facialAddOnGuest1Label: document.getElementById(`Facial-Add-On-Guest-1-${setId}-Label`),
            facialAddOnGuest2Label: document.getElementById(`Facial-Add-On-Guest-2-${setId}-Label`),
            bodyTreatmentGuest1Label: document.getElementById(`Body-Treatment-Guest-1-${setId}-Label`),
            bodyTreatmentGuest2Label: document.getElementById(`Body-Treatment-Guest-2-${setId}-Label`),
        };
    });
    
    // Function to reset fields and hide elements based on the selected parent field for each set
    function resetAndHideChildrenCoupleSet(parentSelect, setId) {
        switch (parentSelect.id) {
            case `Service-${setId}`:
                resetField(elements[setId].couplePackage);
                resetField(elements[setId].spaDelSolDreamInfo);
                resetField(elements[setId].otherPackagesInfo);
                resetField(elements[setId].coupleMassage);
                resetField(elements[setId].massageDurationA);
                resetField(elements[setId].massageDurationB);
                resetField(elements[setId].prenatalMassage);
                resetField(elements[setId].combinationGuest1);
                resetField(elements[setId].combinationGuest2);
                resetField(elements[setId].massageGuest1);
                resetField(elements[setId].massageGuest2);
                resetField(elements[setId].durationGuest1And2);
                resetField(elements[setId].facialGuest1);
                resetField(elements[setId].facialGuest2);
                resetField(elements[setId].facialAddOnGuest1);
                resetField(elements[setId].facialAddOnGuest2);
                resetField(elements[setId].bodyTreatmentGuest1);
                resetField(elements[setId].bodyTreatmentGuest2);
                resetField(elements[setId].otherServicesInfo);
                hideField(labels[setId].couplePackageLabel);
                hideField(labels[setId].coupleMassageLabel);
                hideField(labels[setId].massageDurationALabel);
                hideField(labels[setId].massageDurationBLabel);
                hideField(labels[setId].prenatalMassageLabel);
                hideField(labels[setId].combinationGuest1Label);
                hideField(labels[setId].combinationGuest2Label);
                hideField(labels[setId].massageGuest1Label);
                hideField(labels[setId].massageGuest2Label);
                hideField(labels[setId].durationGuest1And2Label);
                hideField(labels[setId].facialGuest1Label);
                hideField(labels[setId].facialGuest2Label);
                hideField(labels[setId].facialAddOnGuest1Label);
                hideField(labels[setId].facialAddOnGuest2Label);
                hideField(labels[setId].bodyTreatmentGuest1Label);
                hideField(labels[setId].bodyTreatmentGuest2Label);
                break;
    
            case `Package-${setId}`:
                resetField(elements[setId].spaDelSolDreamInfo);
                resetField(elements[setId].otherPackagesInfo);
                break;
    
            case `Massage-${setId}`:
                resetField(elements[setId].massageDurationA);
                resetField(elements[setId].massageDurationB);
                resetField(elements[setId].prenatalMassage);
                resetField(elements[setId].combinationGuest1);
                resetField(elements[setId].combinationGuest2);
                resetField(elements[setId].massageGuest1);
                resetField(elements[setId].massageGuest2);
                resetField(elements[setId].durationGuest1And2);
                hideField(labels[setId].massageDurationALabel);
                hideField(labels[setId].massageDurationBLabel);
                hideField(labels[setId].prenatalMassageLabel);
                hideField(labels[setId].combinationGuest1Label);
                hideField(labels[setId].combinationGuest2Label);
                hideField(labels[setId].massageGuest1Label);
                hideField(labels[setId].massageGuest2Label);
                hideField(labels[setId].durationGuest1And2Label);
                break;
    
            case `Facial-Guest-1-${setId}`:
                resetField(elements[setId].facialAddOnGuest1);
                hideField(labels[setId].facialAddOnGuest1Label);
                break;
    
            case `Facial-Guest-2-${setId}`:
                resetField(elements[setId].facialAddOnGuest2);
                hideField(labels[setId].facialAddOnGuest2Label);
                break;
        }
    }
    
    // Function to hide all fields for a specific set
    function hideCoupleSetConditionals(setId) {
        elements[setId].couplePackage.style.display = 'none';
        labels[setId].couplePackageLabel.style.display = 'none';
        elements[setId].spaDelSolDreamInfo.style.display = 'none';
        elements[setId].otherPackagesInfo.style.display = 'none';
        elements[setId].coupleMassage.style.display = 'none';
        labels[setId].coupleMassageLabel.style.display = 'none';
        elements[setId].massageDurationA.style.display = 'none';
        labels[setId].massageDurationALabel.style.display = 'none';
        elements[setId].massageDurationB.style.display = 'none';
        labels[setId].massageDurationBLabel.style.display = 'none';
        elements[setId].prenatalMassage.style.display = 'none';
        labels[setId].prenatalMassageLabel.style.display = 'none';
        elements[setId].combinationSelectsWrapper.style.display = 'none';
        elements[setId].combinationGuest1.style.display = 'none';
        labels[setId].combinationGuest1Label.style.display = 'none';
        elements[setId].combinationGuest2.style.display = 'none';
        labels[setId].combinationGuest2Label.style.display = 'none';
        elements[setId].differentMassagesSelectsWrapper.style.display = 'none';
        elements[setId].massageGuest1.style.display = 'none';
        labels[setId].massageGuest1Label.style.display = 'none';
        elements[setId].massageGuest2.style.display = 'none';
        labels[setId].massageGuest2Label.style.display = 'none';
        elements[setId].durationGuest1And2.style.display = 'none';
        labels[setId].durationGuest1And2Label.style.display = 'none';
        elements[setId].facialSelectsWrapper.style.display = 'none';
        labels[setId].facialGuest1Label.style.display = 'none';
        labels[setId].facialGuest2Label.style.display = 'none';
        elements[setId].facialAddOnGuest1.style.display = 'none';
        labels[setId].facialAddOnGuest1Label.style.display = 'none';
        elements[setId].facialAddOnGuest2.style.display = 'none';
        labels[setId].facialAddOnGuest2Label.style.display = 'none';
        elements[setId].bodyTreatmentsSelectsWrapper.style.display = 'none';
        labels[setId].bodyTreatmentGuest1Label.style.display = 'none';
        labels[setId].bodyTreatmentGuest2Label.style.display = 'none';
        elements[setId].otherServicesInfo.style.display = 'none';
    }
    
    // Function to handle conditional display of elements for a specific set
    function handleCoupleSetConditionals(setId) {
        hideCoupleSetConditionals(setId);
    
        const serviceValue = document.getElementById(`Service-${setId}`).value;
        if (serviceValue === 'Package') {
            elements[setId].couplePackage.style.display = 'block';
            labels[setId].couplePackageLabel.style.display = 'block';
        } else if (serviceValue === 'Massage') {
            elements[setId].coupleMassage.style.display = 'block';
            labels[setId].coupleMassageLabel.style.display = 'block';
        } else if (serviceValue === 'Facial') {
            elements[setId].facialSelectsWrapper.style.display = 'grid';
            elements[setId].facialGuest1.style.display = 'block';
            elements[setId].facialGuest2.style.display = 'block';
            labels[setId].facialGuest1Label.style.display = 'block';
            labels[setId].facialGuest2Label.style.display = 'block';
        } else if (serviceValue === 'Body treatment') {
            elements[setId].bodyTreatmentsSelectsWrapper.style.display = 'grid';
            elements[setId].bodyTreatmentGuest1.style.display = 'block';
            elements[setId].bodyTreatmentGuest2.style.display = 'block';
            labels[setId].bodyTreatmentGuest1Label.style.display = 'block';
            labels[setId].bodyTreatmentGuest2Label.style.display = 'block';
        } else if (serviceValue === 'Other') {
            elements[setId].otherServicesInfo.style.display = 'block';
        }
    
        const packageValue = elements[setId].couplePackage.value;
        if (packageValue === '2x Spa del Sol Dream') {
            elements[setId].spaDelSolDreamInfo.style.display = 'block';
        } else if (packageValue === 'Two different packages') {
            elements[setId].otherPackagesInfo.style.display = 'block';
        }
    
        const massageValue = elements[setId].coupleMassage.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(massageValue)) {
            elements[setId].massageDurationA.style.display = 'block';
            labels[setId].massageDurationALabel.style.display = 'block';
        } else if (massageValue === 'Reflexology') {
            elements[setId].massageDurationB.style.display = 'block';
            labels[setId].massageDurationBLabel.style.display = 'block';
        } else if (massageValue === 'Prenatal and other') {
            elements[setId].prenatalMassage.style.display = 'block';
            labels[setId].prenatalMassageLabel.style.display = 'block';
        } else if (massageValue === 'Relaxing Combination') {
            elements[setId].combinationSelectsWrapper.style.display = 'grid';
            elements[setId].combinationGuest1.style.display = 'block';
            elements[setId].combinationGuest2.style.display = 'block';
            labels[setId].combinationGuest1Label.style.display = 'block';
            labels[setId].combinationGuest2Label.style.display = 'block';
        } else if (massageValue === 'Two different types') {
            elements[setId].differentMassagesSelectsWrapper.style.display = 'grid';
            elements[setId].massageGuest1.style.display = 'block';
            elements[setId].massageGuest2.style.display = 'block';
            labels[setId].massageGuest1Label.style.display = 'block';
            labels[setId].massageGuest2Label.style.display = 'block';
        }
    
        const massageGuest1Value = elements[setId].massageGuest1.value;
        const massageGuest2Value = elements[setId].massageGuest2.value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            elements[setId].durationGuest1And2.style.display = 'block';
            labels[setId].durationGuest1And2Label.style.display = 'block';
        }
    
        const facialGuest1Value = elements[setId].facialGuest1.value;
        if (facialGuest1Value === 'Sol Janssen') {
            elements[setId].facialAddOnGuest1.style.display = 'block';
            labels[setId].facialAddOnGuest1Label.style.display = 'block';
        }
    
        const facialGuest2Value = elements[setId].facialGuest2.value;
        if (facialGuest2Value === 'Sol Janssen') {
            elements[setId].facialAddOnGuest2.style.display = 'block';
            labels[setId].facialAddOnGuest2Label.style.display = 'block';
        }
    }
    
    // Add event listeners and handle initial conditions for all sets
    ['Couple', 'Couple-1', 'Couple-2', 'Couple-3'].forEach(setId => {
        document.getElementById(`Service-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Package-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Massage-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Massage-Guest-1-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Massage-Guest-2-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Facial-Guest-1-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
        document.getElementById(`Facial-Guest-2-${setId}`).addEventListener('change', function() {
            resetAndHideChildrenCoupleSet(this, setId);
            handleCoupleSetConditionals(setId);
        });
    
        hideCoupleSetConditionals(setId); // Initial hide of all elements
    });

    // SINGLE SERVICE ORIGINAL SET CONDITIONALS SCRIPT

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
        hideSingleOriginalSetConditionals(); // Hide all fields first

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
    singlePackage.addEventListener('change', function() {
        resetAndHideChildrenSingleOriginal(this);
        handleSingleOriginalSetConditionals();
    });
    singleMassage.addEventListener('change', function() {
        resetAndHideChildrenSingleOriginal(this);
        handleSingleOriginalSetConditionals();
    });
    singleFacial.addEventListener('change', function() {
        resetAndHideChildrenSingleOriginal(this);
        handleSingleOriginalSetConditionals();
    });
    
    hideSingleOriginalSetConditionals(); // Initial hide

    // SINGLE SERVICE SET 1 CONDITIONALS SCRIPT

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
        hideSingleSet1Conditionals(); // Hide all fields first

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
    singlePackage1.addEventListener('change', function() {
        resetAndHideChildrenSingleSet1(this);
        handleSingleSet1Conditionals();
    });
    singleMassage1.addEventListener('change', function() {
        resetAndHideChildrenSingleSet1(this);
        handleSingleSet1Conditionals();
    });
    singleFacial1.addEventListener('change', function() {
        resetAndHideChildrenSingleSet1(this);
        handleSingleSet1Conditionals();
    });
    
    hideSingleSet1Conditionals(); // Initial hide

    // SINGLE SERVICE SET 2 CONDITIONALS SCRIPT

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
    singlePackage2.addEventListener('change', function() {
        resetAndHideChildrenSingleSet2(this);
        handleSingleSet2Conditionals();
    });
    singleMassage2.addEventListener('change', function() {
        resetAndHideChildrenSingleSet2(this);
        handleSingleSet2Conditionals();
    });
    singleFacial2.addEventListener('change', function() {
        resetAndHideChildrenSingleSet2(this);
        handleSingleSet2Conditionals();
    });
    
    hideSingleSet2Conditionals(); // Initial hide

    // SINGLE SERVICE SET 3 CONDITIONALS SCRIPT

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
    singlePackage3.addEventListener('change', function() {
        resetAndHideChildrenSingleSet3(this);
        handleSingleSet3Conditionals();
    });
    singleMassage3.addEventListener('change', function() {
        resetAndHideChildrenSingleSet3(this);
        handleSingleSet3Conditionals();
    });
    singleFacial3.addEventListener('change', function() {
        resetAndHideChildrenSingleSet3(this);
        handleSingleSet3Conditionals();
    });
    
    hideSingleSet3Conditionals(); // Initial hide
