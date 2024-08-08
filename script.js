// STEPS SCRIPTS
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Step navigation elements
    const steps = {
        'step-1': document.getElementById('step-1'),
        'step-2': document.getElementById('step-2'),
        'step-3': document.getElementById('step-3'),
        'step-4': document.getElementById('step-4'),
        'step-5': document.getElementById('step-5'),
        'step-6': document.getElementById('step-6'),
        'step-7': document.getElementById('step-7'),
        'step-8': document.getElementById('step-8'),
        'step-9': document.getElementById('step-9')
    };

    const nextBtn = document.getElementById('next-button');
    const prevBtn = document.getElementById('previous-button');
    const submitBtn = document.getElementById('submit');
    let currentStep = 'step-1';

    // Define the hierarchical order for the steps
    const hierarchicalSteps = {
        'step-1': { next: 'step-2' },
        'step-2': { next: 'step-3', prev: 'step-1' },
        'step-3': { next: 'step-4', prev: 'step-2' },
        'step-4': { next: 'step-5', prev: 'step-3' },
        'step-5': { next: 'step-6', prev: 'step-4' },
        'step-6': { next: 'step-7', prev: 'step-5' },
        'step-7': { next: 'step-8', prev: 'step-6' },
        'step-8': { next: 'step-9', prev: 'step-7' },
        'step-9': { prev: 'step-7' }
    };

    function showStep(step) {
        Object.keys(steps).forEach(key => {
            steps[key].style.display = key === step ? 'block' : 'none';
        });
        prevBtn.style.display = step === 'step-1' ? 'none' : 'inline-block';
        nextBtn.style.display = (step === 'step-8' || step === 'step-9') ? 'none' : 'inline-block';
        submitBtn.style.display = nextBtn.style.display === 'none' ? 'inline-block' : 'none';
    }

    function validateStep(step) {
        const inputs = steps[step].querySelectorAll('input, select, textarea');
        for (let input of inputs) {
            if (input.style.display !== 'none' && input.id !== 'Date-Flexibility') {
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

    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep === 'step-7' && document.getElementById('Number-of-Guests').value === '6 plus') {
                currentStep = 'step-9';
            } else {
                currentStep = getNextStep(currentStep);
            }
            showStep(currentStep);
        } else {
            alert('Please fill out all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentStep === 'step-9') {
            resetGroupBookingInfo();
        }
        if (currentStep === 'step-8') {
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

    // Initial setup
    showStep(currentStep);
    console.log("Step navigation elements initialized");

    // Function to remove empty fields
    function removeEmptyFields() {
        console.log("removeEmptyFields function called");
        // Array of all select and textarea field IDs
        var selectFieldIds = [
            '2-Guest-Arrangement', '3-Guest-Arrangement', '4-Guest-Arrangement', '5-Guest-Arrangement', '6-Guest-Arrangement',
            'Service-Single', 'Package-Single', 'Massage-Single', 'Duration-A-Single', 'Duration-B-Single',
            'Combination-Single', 'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single',
            'Service-Single-1', 'Package-Single-1', 'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1',
            'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1',
            'Service-Single-2', 'Package-Single-2', 'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2',
            'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2',
            'Service-Single-3', 'Package-Single-3', 'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3',
            'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3',
            'Service-Couple', 'Package-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple',
            'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple',
            'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple',
            'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple',
            'Service-Couple-1', 'Package-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1',
            'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1',
            'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1',
            'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1',
            'Service-Couple-2', 'Package-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2',
            'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2',
            'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2',
            'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2',
            'Service-Couple-3', 'Package-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3',
            'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3',
            'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3',
            'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3',
            'Group-Booking-Info', 'Spa-Del-Sol-Dream-Info-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single',
            'Spa-Del-Sol-Dream-Info-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1',
            'Spa-Del-Sol-Dream-Info-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2',
            'Spa-Del-Sol-Dream-Info-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3',
            'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Other-Services-Info-Couple',
            'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1', 'Other-Services-Info-Couple-1',
            'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Other-Services-Info-Couple-2',
            'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3', 'Other-Services-Info-Couple-3'
        ];

        // Remove empty select fields
        selectFieldIds.forEach(function(id) {
            var field = document.getElementById(id);
            if (field && !field.value.trim()) {
                field.parentElement.removeChild(field);
                console.log(`Empty field removed: ${id}`);
            }
        });
    }

    // Call the function before form submission to ensure fields are removed
    var form = document.getElementById('Appointment-Inquiry');
    if (form) {
        console.log("Form element found");
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submission handler initialized");
            removeEmptyFields(); // Remove empty fields
            form.submit(); // Submit the form
            console.log("Form submitted via Webflow's native handling");
        });
    } else {
        console.log("Form element not found");
    }

    function resetServiceConditionals() {
        const singleServiceFields = [
            'Service-Single', 'Package-Single', 'Spa-Del-Sol-Dream-Info-Single', 'Massage-Single', 'Duration-A-Single', 'Duration-B-Single',
            'Combination-Single', 'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single',
            'Service-Single-1', 'Package-Single-1', 'Spa-Del-Sol-Dream-Info-Single-1', 'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1',
            'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1',
            'Service-Single-2', 'Package-Single-2', 'Spa-Del-Sol-Dream-Info-Single-2', 'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2',
            'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2',
            'Service-Single-3', 'Package-Single-3', 'Spa-Del-Sol-Dream-Info-Single-3', 'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3',
            'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3'
        ];

        const coupleServiceFields = [
            'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple',
            'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple',
            'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple',
            'Body-Treatments-Selects-Wrapper-Couple', 'Other-Services-Info-Couple', 'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1',
            'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1',
            'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1',
            'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1', 'Other-Services-Info-Couple-1',
            'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2',
            'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2',
            'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2',
            'Body-Treatments-Selects-Wrapper-Couple-2', 'Other-Services-Info-Couple-2', 'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3',
            'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3',
            'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3',
            'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3', 'Other-Services-Info-Couple-3'
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

        console.log('Service conditionals reset');
    }

    function resetNumberOfGuestsField() {
        const numberOfGuests = document.getElementById('Number-of-Guests');
        if (numberOfGuests) {
            numberOfGuests.selectedIndex = 0;
            console.log('Number of Guests field reset');
        }
    }

    function resetGuestArrangements() {
        const guestArrangement2 = document.getElementById('2-Guest-Arrangement');
        const guestArrangement3 = document.getElementById('3-Guest-Arrangement');
        const guestArrangement4 = document.getElementById('4-Guest-Arrangement');
        const guestArrangement5 = document.getElementById('5-Guest-Arrangement');
        const guestArrangement6 = document.getElementById('6-Guest-Arrangement');

        function hideAllGuestArrangements() {
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

    function resetGroupBookingInfo() {
        const groupBookingInfo = document.getElementById('Group-Booking-Info');
        if (groupBookingInfo) {
            groupBookingInfo.value = '';
            console.log('Group Booking Info reset');
        }
    }
});

// NUMBER OF GUESTS CONDITIONALS SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    const numberOfGuests = document.getElementById('Number-of-Guests');
    const guestArrangementLabel = document.getElementById('Guest-Arrangement-Label');
    const guestArrangement2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangement3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangement4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangement5 = document.getElementById('5-Guest-Arrangement');
    const guestArrangement6 = document.getElementById('6-Guest-Arrangement');

    function hideAllGuestArrangements() {
        guestArrangementLabel.style.display = 'none';
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
            guestArrangement2.style.display = 'block';
        } else if (numberOfGuestsValue === '3') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement3.style.display = 'block';
        } else if (numberOfGuestsValue === '4') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement4.style.display = 'block';
        } else if (numberOfGuestsValue === '5') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement5.style.display = 'block';
        } else if (numberOfGuestsValue === '6') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement6.style.display = 'block';
        } else if (numberOfGuestsValue === '6 plus') {
            guestArrangementLabel.style.display = 'none';
        }
    }

    numberOfGuests.addEventListener('change', function() {
        resetAndHideChildren(this);
        handleGuestArrangements();
    });

    // Initial setup
    hideAllGuestArrangements();
});

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

    function hideAllTemplates() {
        singleTemplate.style.display = 'none';
        single1Template.style.display = 'none';
        single2Template.style.display = 'none';
        single3Template.style.display = 'none';
        coupleTemplate.style.display = 'none';
        couple1Template.style.display = 'none';
        couple2Template.style.display = 'none';
        couple3Template.style.display = 'none';
    }

    function handleTemplateVisibility() {
        hideAllTemplates();

        const numberOfGuestsValue = numberOfGuestsSelect.value;
        if (numberOfGuestsValue === '1') {
            singleTemplate.style.display = 'block';
        } else if (numberOfGuestsValue === '2') {
            const guestArrangementValue = guestArrangementSelect2.value;
            if (guestArrangementValue === '1 couple') {
                coupleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '2 singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '3') {
            const guestArrangementValue = guestArrangementSelect3.value;
            if (guestArrangementValue === '1 couple and 1 single') {
                coupleTemplate.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '3 singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
                single3Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '4') {
            const guestArrangementValue = guestArrangementSelect4.value;
            if (guestArrangementValue === '2 couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
            } else if (guestArrangementValue === '1 couple and 2 singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '5') {
            const guestArrangementValue = guestArrangementSelect5.value;
            if (guestArrangementValue === '2 couples and 1 single') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '1 couple and 3 singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
                single3Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '6') {
            const guestArrangementValue = guestArrangementSelect6.value;
            if (guestArrangementValue === '3 couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                couple3Template.style.display = 'block';
            } else if (guestArrangementValue === '2 couples and 2 singles') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
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
    const guestArrangement2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangement3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangement4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangement5 = document.getElementById('5-Guest-Arrangement');
    const guestArrangement6 = document.getElementById('6-Guest-Arrangement');

    function hideAllGuestArrangements() {
        guestArrangementLabel.style.display = 'none';
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
            guestArrangement2.style.display = 'block';
        } else if (numberOfGuestsValue === '3') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement3.style.display = 'block';
        } else if (numberOfGuestsValue === '4') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement4.style.display = 'block';
        } else if (numberOfGuestsValue === '5') {
            guestArrangementLabel.style.display = 'block';
            guestArrangement5.style.display = 'block';
        } else if (numberOfGuestsValue === '6') {
            guestArrangementLabel.style.display = 'block';
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
    const spaDelSolDreamInfoCouple = document.getElementById('Spa-Del-Sol-Dream-Info-Couple');
    const otherPackagesInfoCouple = document.getElementById('Other-Packages-Info-Couple');
    const coupleMassage = document.getElementById('Massage-Couple');
    const massageDurationACouple = document.getElementById('Duration-A-Couple');
    const massageDurationBCouple = document.getElementById('Duration-B-Couple');
    const prenatalMassageCouple = document.getElementById('Prenatal-Massage-Couple');
    const combinationSelectsWrapperCouple = document.getElementById('Combination-Selects-Wrapper-Couple');
    const differentMassagesSelectsWrapperCouple = document.getElementById('Different-Massages-Selects-Wrapper-Couple');
    const durationAGuest1And2Couple = document.getElementById('Duration-A-Guest-1-And-2-Couple');
    const facialSelectsWrapperCouple = document.getElementById('Facial-Selects-Wrapper-Couple');
    const facialAddOnGuest1Couple = document.getElementById('Facial-Add-On-Guest-1-Couple');
    const facialAddOnGuest2Couple = document.getElementById('Facial-Add-On-Guest-2-Couple');
    const bodyTreatmentsSelectsWrapperCouple = document.getElementById('Body-Treatments-Selects-Wrapper-Couple');
    const otherServicesInfoCouple = document.getElementById('Other-Services-Info-Couple');

    // Couple Service Conditional fields (Set 1)
    const coupleService1 = document.getElementById('Service-Couple-1');
    const couplePackage1 = document.getElementById('Package-Couple-1');
    const spaDelSolDreamInfoCouple1 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-1');
    const otherPackagesInfoCouple1 = document.getElementById('Other-Packages-Info-Couple-1');
    const coupleMassage1 = document.getElementById('Massage-Couple-1');
    const massageDurationACouple1 = document.getElementById('Duration-A-Couple-1');
    const massageDurationBCouple1 = document.getElementById('Duration-B-Couple-1');
    const prenatalMassageCouple1 = document.getElementById('Prenatal-Massage-Couple-1');
    const combinationSelectsWrapperCouple1 = document.getElementById('Combination-Selects-Wrapper-Couple-1');
    const differentMassagesSelectsWrapperCouple1 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-1');
    const durationAGuest1And2Couple1 = document.getElementById('Duration-A-Guest-1-And-2-Couple-1');
    const facialSelectsWrapperCouple1 = document.getElementById('Facial-Selects-Wrapper-Couple-1');
    const facialAddOnGuest1Couple1 = document.getElementById('Facial-Add-On-Guest-1-Couple-1');
    const facialAddOnGuest2Couple1 = document.getElementById('Facial-Add-On-Guest-2-Couple-1');
    const bodyTreatmentsSelectsWrapperCouple1 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-1');
    const otherServicesInfoCouple1 = document.getElementById('Other-Services-Info-Couple-1');

    // Couple Service Conditional fields (Set 2)
    const coupleService2 = document.getElementById('Service-Couple-2');
    const couplePackage2 = document.getElementById('Package-Couple-2');
    const spaDelSolDreamInfoCouple2 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-2');
    const otherPackagesInfoCouple2 = document.getElementById('Other-Packages-Info-Couple-2');
    const coupleMassage2 = document.getElementById('Massage-Couple-2');
    const massageDurationACouple2 = document.getElementById('Duration-A-Couple-2');
    const massageDurationBCouple2 = document.getElementById('Duration-B-Couple-2');
    const prenatalMassageCouple2 = document.getElementById('Prenatal-Massage-Couple-2');
    const combinationSelectsWrapperCouple2 = document.getElementById('Combination-Selects-Wrapper-Couple-2');
    const differentMassagesSelectsWrapperCouple2 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-2');
    const durationAGuest1And2Couple2 = document.getElementById('Duration-A-Guest-1-And-2-Couple-2');
    const facialSelectsWrapperCouple2 = document.getElementById('Facial-Selects-Wrapper-Couple-2');
    const facialAddOnGuest1Couple2 = document.getElementById('Facial-Add-On-Guest-1-Couple-2');
    const facialAddOnGuest2Couple2 = document.getElementById('Facial-Add-On-Guest-2-Couple-2');
    const bodyTreatmentsSelectsWrapperCouple2 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-2');
    const otherServicesInfoCouple2 = document.getElementById('Other-Services-Info-Couple-2');

    // Couple Service Conditional fields (Set 3)
    const coupleService3 = document.getElementById('Service-Couple-3');
    const couplePackage3 = document.getElementById('Package-Couple-3');
    const spaDelSolDreamInfoCouple3 = document.getElementById('Spa-Del-Sol-Dream-Info-Couple-3');
    const otherPackagesInfoCouple3 = document.getElementById('Other-Packages-Info-Couple-3');
    const coupleMassage3 = document.getElementById('Massage-Couple-3');
    const massageDurationACouple3 = document.getElementById('Duration-A-Couple-3');
    const massageDurationBCouple3 = document.getElementById('Duration-B-Couple-3');
    const prenatalMassageCouple3 = document.getElementById('Prenatal-Massage-Couple-3');
    const combinationSelectsWrapperCouple3 = document.getElementById('Combination-Selects-Wrapper-Couple-3');
    const differentMassagesSelectsWrapperCouple3 = document.getElementById('Different-Massages-Selects-Wrapper-Couple-3');
    const durationAGuest1And2Couple3 = document.getElementById('Duration-A-Guest-1-And-2-Couple-3');
    const facialSelectsWrapperCouple3 = document.getElementById('Facial-Selects-Wrapper-Couple-3');
    const facialAddOnGuest1Couple3 = document.getElementById('Facial-Add-On-Guest-1-Couple-3');
    const facialAddOnGuest2Couple3 = document.getElementById('Facial-Add-On-Guest-2-Couple-3');
    const bodyTreatmentsSelectsWrapperCouple3 = document.getElementById('Body-Treatments-Selects-Wrapper-Couple-3');
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
        spaDelSolDreamInfoCouple.style.display = 'none';
        otherPackagesInfoCouple.style.display = 'none';
        coupleMassage.style.display = 'none';
        massageDurationACouple.style.display = 'none';
        massageDurationBCouple.style.display = 'none';
        prenatalMassageCouple.style.display = 'none';
        combinationSelectsWrapperCouple.style.display = 'none';
        differentMassagesSelectsWrapperCouple.style.display = 'none';
        durationAGuest1And2Couple.style.display = 'none';
        facialSelectsWrapperCouple.style.display = 'none';
        facialAddOnGuest1Couple.style.display = 'none';
        facialAddOnGuest2Couple.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple.style.display = 'none';
        otherServicesInfoCouple.style.display = 'none';

        couplePackage1.style.display = 'none';
        spaDelSolDreamInfoCouple1.style.display = 'none';
        otherPackagesInfoCouple1.style.display = 'none';
        coupleMassage1.style.display = 'none';
        massageDurationACouple1.style.display = 'none';
        massageDurationBCouple1.style.display = 'none';
        prenatalMassageCouple1.style.display = 'none';
        combinationSelectsWrapperCouple1.style.display = 'none';
        differentMassagesSelectsWrapperCouple1.style.display = 'none';
        durationAGuest1And2Couple1.style.display = 'none';
        facialSelectsWrapperCouple1.style.display = 'none';
        facialAddOnGuest1Couple1.style.display = 'none';
        facialAddOnGuest2Couple1.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple1.style.display = 'none';
        otherServicesInfoCouple1.style.display = 'none';

        couplePackage2.style.display = 'none';
        spaDelSolDreamInfoCouple2.style.display = 'none';
        otherPackagesInfoCouple2.style.display = 'none';
        coupleMassage2.style.display = 'none';
        massageDurationACouple2.style.display = 'none';
        massageDurationBCouple2.style.display = 'none';
        prenatalMassageCouple2.style.display = 'none';
        combinationSelectsWrapperCouple2.style.display = 'none';
        differentMassagesSelectsWrapperCouple2.style.display = 'none';
        durationAGuest1And2Couple2.style.display = 'none';
        facialSelectsWrapperCouple2.style.display = 'none';
        facialAddOnGuest1Couple2.style.display = 'none';
        facialAddOnGuest2Couple2.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple2.style.display = 'none';
        otherServicesInfoCouple2.style.display = 'none';

        couplePackage3.style.display = 'none';
        spaDelSolDreamInfoCouple3.style.display = 'none';
        otherPackagesInfoCouple3.style.display = 'none';
        coupleMassage3.style.display = 'none';
        massageDurationACouple3.style.display = 'none';
        massageDurationBCouple3.style.display = 'none';
        prenatalMassageCouple3.style.display = 'none';
        combinationSelectsWrapperCouple3.style.display = 'none';
        differentMassagesSelectsWrapperCouple3.style.display = 'none';
        durationAGuest1And2Couple3.style.display = 'none';
        facialSelectsWrapperCouple3.style.display = 'none';
        facialAddOnGuest1Couple3.style.display = 'none';
        facialAddOnGuest2Couple3.style.display = 'none';
        bodyTreatmentsSelectsWrapperCouple3.style.display = 'none';
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
                break;

            case 'Facial-Guest-1-Couple':
                resetField(facialAddOnGuest1Couple);
                break;

            case 'Facial-Guest-2-Couple':
                resetField(facialAddOnGuest2Couple);
                break;

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
                break;

            case 'Facial-Guest-1-Couple-1':
                resetField(facialAddOnGuest1Couple1);
                break;

            case 'Facial-Guest-2-Couple-1':
                resetField(facialAddOnGuest2Couple1);
                break;

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
                break;

            case 'Facial-Guest-1-Couple-2':
                resetField(facialAddOnGuest1Couple2);
                break;

            case 'Facial-Guest-2-Couple-2':
                resetField(facialAddOnGuest2Couple2);
                break;

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
                break;

            case 'Facial-Guest-1-Couple-3':
                resetField(facialAddOnGuest1Couple3);
                break;

            case 'Facial-Guest-2-Couple-3':
                resetField(facialAddOnGuest2Couple3);
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
        } else if (coupleServiceValue === 'Massage') {
            coupleMassage.style.display = 'block';
        } else if (coupleServiceValue === 'Facial') {
            facialSelectsWrapperCouple.style.display = 'grid';
        } else if (coupleServiceValue === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple.style.display = 'grid';
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
        } else if (coupleMassageValue === 'Reflexology') {
            massageDurationBCouple.style.display = 'block';
        } else if (coupleMassageValue === 'Prenatal and other') {
            prenatalMassageCouple.style.display = 'block';
        } else if (coupleMassageValue === 'Relaxing Combination') {
            combinationSelectsWrapperCouple.style.display = 'grid';
        } else if (coupleMassageValue === 'Two different types') {
            differentMassagesSelectsWrapperCouple.style.display = 'grid';
        }

        const massageGuest1Value = document.getElementById('Massage-Guest-1-Couple').value;
        const massageGuest2Value = document.getElementById('Massage-Guest-2-Couple').value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            durationAGuest1And2Couple.style.display = 'block';
        }

        const facialGuest1Value = document.getElementById('Facial-Guest-1-Couple').value;
        if (facialGuest1Value === 'Sol Janssen') {
            facialAddOnGuest1Couple.style.display = 'block';
        }

        const facialGuest2Value = document.getElementById('Facial-Guest-2-Couple').value;
        if (facialGuest2Value === 'Sol Janssen') {
            facialAddOnGuest2Couple.style.display = 'block';
        }

        // Couple Service Conditionals (Set 1)
        const coupleServiceValue1 = coupleService1.value;
        if (coupleServiceValue1 === 'Package') {
            couplePackage1.style.display = 'block';
        } else if (coupleServiceValue1 === 'Massage') {
            coupleMassage1.style.display = 'block';
        } else if (coupleServiceValue1 === 'Facial') {
            facialSelectsWrapperCouple1.style.display = 'grid';
        } else if (coupleServiceValue1 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple1.style.display = 'grid';
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
        } else if (coupleMassageValue1 === 'Reflexology') {
            massageDurationBCouple1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Prenatal and other') {
            prenatalMassageCouple1.style.display = 'block';
        } else if (coupleMassageValue1 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple1.style.display = 'grid';
        } else if (coupleMassageValue1 === 'Two different types') {
            differentMassagesSelectsWrapperCouple1.style.display = 'grid';
        }

        const massageGuest1Value1 = document.getElementById('Massage-Guest-1-Couple-1').value;
        const massageGuest2Value1 = document.getElementById('Massage-Guest-2-Couple-1').value;
        if (massageGuest1Value1 !== '' && massageGuest2Value1 !== '') {
            durationAGuest1And2Couple1.style.display = 'block';
        }

        const facialGuest1Value1 = document.getElementById('Facial-Guest-1-Couple-1').value;
        if (facialGuest1Value1 === 'Sol Janssen') {
            facialAddOnGuest1Couple1.style.display = 'block';
        }

        const facialGuest2Value1 = document.getElementById('Facial-Guest-2-Couple-1').value;
        if (facialGuest2Value1 === 'Sol Janssen') {
            facialAddOnGuest2Couple1.style.display = 'block';
        }

        // Couple Service Conditionals (Set 2)
        const coupleServiceValue2 = coupleService2.value;
        if (coupleServiceValue2 === 'Package') {
            couplePackage2.style.display = 'block';
        } else if (coupleServiceValue2 === 'Massage') {
            coupleMassage2.style.display = 'block';
        } else if (coupleServiceValue2 === 'Facial') {
            facialSelectsWrapperCouple2.style.display = 'grid';
        } else if (coupleServiceValue2 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple2.style.display = 'grid';
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
        } else if (coupleMassageValue2 === 'Reflexology') {
            massageDurationBCouple2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Prenatal and other') {
            prenatalMassageCouple2.style.display = 'block';
        } else if (coupleMassageValue2 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple2.style.display = 'grid';
        } else if (coupleMassageValue2 === 'Two different types') {
            differentMassagesSelectsWrapperCouple2.style.display = 'grid';
        }

        const massageGuest1Value2 = document.getElementById('Massage-Guest-1-Couple-2').value;
        const massageGuest2Value2 = document.getElementById('Massage-Guest-2-Couple-2').value;
        if (massageGuest1Value2 !== '' && massageGuest2Value2 !== '') {
            durationAGuest1And2Couple2.style.display = 'block';
        }

        const facialGuest1Value2 = document.getElementById('Facial-Guest-1-Couple-2').value;
        if (facialGuest1Value2 === 'Sol Janssen') {
            facialAddOnGuest1Couple2.style.display = 'block';
        }

        const facialGuest2Value2 = document.getElementById('Facial-Guest-2-Couple-2').value;
        if (facialGuest2Value2 === 'Sol Janssen') {
            facialAddOnGuest2Couple2.style.display = 'block';
        }

        // Couple Service Conditionals (Set 3)
        const coupleServiceValue3 = coupleService3.value;
        if (coupleServiceValue3 === 'Package') {
            couplePackage3.style.display = 'block';
        } else if (coupleServiceValue3 === 'Massage') {
            coupleMassage3.style.display = 'block';
        } else if (coupleServiceValue3 === 'Facial') {
            facialSelectsWrapperCouple3.style.display = 'grid';
        } else if (coupleServiceValue3 === 'Body treatment') {
            bodyTreatmentsSelectsWrapperCouple3.style.display = 'grid';
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
        } else if (coupleMassageValue3 === 'Reflexology') {
            massageDurationBCouple3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Prenatal and other') {
            prenatalMassageCouple3.style.display = 'block';
        } else if (coupleMassageValue3 === 'Relaxing Combination') {
            combinationSelectsWrapperCouple3.style.display = 'grid';
        } else if (coupleMassageValue3 === 'Two different types') {
            differentMassagesSelectsWrapperCouple3.style.display = 'grid';
        }

        const massageGuest1Value3 = document.getElementById('Massage-Guest-1-Couple-3').value;
        const massageGuest2Value3 = document.getElementById('Massage-Guest-2-Couple-3').value;
        if (massageGuest1Value3 !== '' && massageGuest2Value3 !== '') {
            durationAGuest1And2Couple3.style.display = 'block';
        }

        const facialGuest1Value3 = document.getElementById('Facial-Guest-1-Couple-3').value;
        if (facialGuest1Value3 === 'Sol Janssen') {
            facialAddOnGuest1Couple3.style.display = 'block';
        }

        const facialGuest2Value3 = document.getElementById('Facial-Guest-2-Couple-3').value;
        if (facialGuest2Value3 === 'Sol Janssen') {
            facialAddOnGuest2Couple3.style.display = 'block';
        }
    }

    // Add change event listeners to all select fields
    function addChangeEventListener(id, handleChange) {
        document.getElementById(id).addEventListener('change', function() {
            resetAndHideChildren(this);
            handleChange();
        });
    }

    addChangeEventListener('Service-Single', handleConditionals);
    addChangeEventListener('Package-Single', handleConditionals);
    addChangeEventListener('Massage-Single', handleConditionals);
    addChangeEventListener('Facial-Single', handleConditionals);

    addChangeEventListener('Service-Single-1', handleConditionals);
    addChangeEventListener('Package-Single-1', handleConditionals);
    addChangeEventListener('Massage-Single-1', handleConditionals);
    addChangeEventListener('Facial-Single-1', handleConditionals);

    addChangeEventListener('Service-Single-2', handleConditionals);
    addChangeEventListener('Package-Single-2', handleConditionals);
    addChangeEventListener('Massage-Single-2', handleConditionals);
    addChangeEventListener('Facial-Single-2', handleConditionals);

    addChangeEventListener('Service-Single-3', handleConditionals);
    addChangeEventListener('Package-Single-3', handleConditionals);
    addChangeEventListener('Massage-Single-3', handleConditionals);
    addChangeEventListener('Facial-Single-3', handleConditionals);

    addChangeEventListener('Service-Couple', handleConditionals);
    addChangeEventListener('Package-Couple', handleConditionals);
    addChangeEventListener('Massage-Couple', handleConditionals);
    addChangeEventListener('Massage-Guest-1-Couple', handleConditionals);
    addChangeEventListener('Massage-Guest-2-Couple', handleConditionals);
    addChangeEventListener('Facial-Guest-1-Couple', handleConditionals);
    addChangeEventListener('Facial-Guest-2-Couple', handleConditionals);

    addChangeEventListener('Service-Couple-1', handleConditionals);
    addChangeEventListener('Package-Couple-1', handleConditionals);
    addChangeEventListener('Massage-Couple-1', handleConditionals);
    addChangeEventListener('Massage-Guest-1-Couple-1', handleConditionals);
    addChangeEventListener('Massage-Guest-2-Couple-1', handleConditionals);
    addChangeEventListener('Facial-Guest-1-Couple-1', handleConditionals);
    addChangeEventListener('Facial-Guest-2-Couple-1', handleConditionals);

    addChangeEventListener('Service-Couple-2', handleConditionals);
    addChangeEventListener('Package-Couple-2', handleConditionals);
    addChangeEventListener('Massage-Couple-2', handleConditionals);
    addChangeEventListener('Massage-Guest-1-Couple-2', handleConditionals);
    addChangeEventListener('Massage-Guest-2-Couple-2', handleConditionals);
    addChangeEventListener('Facial-Guest-1-Couple-2', handleConditionals);
    addChangeEventListener('Facial-Guest-2-Couple-2', handleConditionals);

    addChangeEventListener('Service-Couple-3', handleConditionals);
    addChangeEventListener('Package-Couple-3', handleConditionals);
    addChangeEventListener('Massage-Couple-3', handleConditionals);
    addChangeEventListener('Massage-Guest-1-Couple-3', handleConditionals);
    addChangeEventListener('Massage-Guest-2-Couple-3', handleConditionals);
    addChangeEventListener('Facial-Guest-1-Couple-3', handleConditionals);
    addChangeEventListener('Facial-Guest-2-Couple-3', handleConditionals);

    // Initial setup
    hideAllConditionals();
});
