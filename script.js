// STEPS SCRIPTS

document.addEventListener('DOMContentLoaded', function() {
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
        'step-8': { prev: 'step-7' },
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
            if (input.style.display !== 'none') {
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

    function resetServiceConditionals() {
        const singleServiceFields = [
            'Service-Single', 'Package-Single', 'Spa-del-Sol-Dream-Info-Single',
            'Massage-Single', 'Duration-A-Single', 'Duration-B-Single',
            'Combination-Single', 'Facial-Single', 'Add-On-Single',
            'Body-Treatment-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single',
            'Service-Single-1', 'Package-Single-1', 'Spa-del-Sol-Dream-Info-Single-1',
            'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1',
            'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1',
            'Body-Treatment-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1',
            'Service-Single-2', 'Package-Single-2', 'Spa-del-Sol-Dream-Info-Single-2',
            'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2',
            'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2',
            'Body-Treatment-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2',
            'Service-Single-3', 'Package-Single-3', 'Spa-del-Sol-Dream-Info-Single-3',
            'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3',
            'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3',
            'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3',
        ];

        const coupleServiceFields = [
            'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple',
            'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple',
            'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple',
            'Different-Massages-Selects-Wrapper-Couple', 'Duration-A-Guest-1-And-2-Couple',
            'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple',
            'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple',
            'Other-Services-Info-Couple',
            'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1',
            'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1',
            'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1',
            'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1',
            'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1',
            'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1',
            'Other-Services-Info-Couple-1',
            'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2',
            'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2',
            'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2',
            'Different-Massages-Selects-Wrapper-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2',
            'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2',
            'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2',
            'Other-Services-Info-Couple-2',
            'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3',
            'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3',
            'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3',
            'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3',
            'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3',
            'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3',
            'Other-Services-Info-Couple-3',
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

        document.getElementById('Service-Single').style.display = 'block';
        document.getElementById('Service-Single-1').style.display = 'block';
        document.getElementById('Service-Single-2').style.display = 'block';
        document.getElementById('Service-Single-3').style.display = 'block';
        document.getElementById('Service-Couple').style.display = 'block';
        document.getElementById('Service-Couple-1').style.display = 'block';
        document.getElementById('Service-Couple-2').style.display = 'block';
        document.getElementById('Service-Couple-3').style.display = 'block';
    }

    function resetNumberOfGuests() {
        const numberOfGuestsSelect = document.getElementById('Number-of-Guests');
        numberOfGuestsSelect.selectedIndex = 0;
    }

    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep = getNextStep(currentStep);
            showStep(currentStep);
        } else {
            alert('Please fill out all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentStep === 'step-8') {
            resetServiceConditionals();
        } else if (currentStep === 'step-7') {
            resetNumberOfGuests();
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
});

// SHOW STEP-8 TEMPLATE SCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const numberOfGuestsSelect = document.getElementById('Number-of-Guests');
    const guestArrangementSelect2 = document.getElementById('2-Guest-Arrangement');
    const guestArrangementSelect3 = document.getElementById('3-Guest-Arrangement');
    const guestArrangementSelect4 = document.getElementById('4-Guest-Arrangement');
    const guestArrangementSelect4 = document.getElementById('5-Guest-Arrangement');
    const guestArrangementSelect4 = document.getElementById('6-Guest-Arrangement');
    const singleTemplate = document.getElementById('Single');
    const single1Template = document.getElementById('Single-1');
    const single2Template = document.getElementById('Single-2');
    const single3Template = document.getElementById('Single-3');
    const coupleTemplate = document.getElementById('Couple');
    const couple1Template = document.getElementById('Couple-1');
    const couple2Template = document.getElementById('Couple-2');
    const couple2Template = document.getElementById('Couple-3');

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
            if (guestArrangementValue === '1-Couple') {
                coupleTemplate.style.display = 'block';
            } else if (numberOfGuestsValue === '2-Singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '3') {
            const guestArrangementValue = guestArrangementSelect3.value;
            if (guestArrangementValue === '1-Couple-1-Single') {
                coupleTemplate.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (numberOfGuestsValue === '3-Singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
                single3Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '4') {
            const guestArrangementValue = guestArrangementSelect4.value;
            if (guestArrangementValue === '2-Couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
            } else if (numberOfGuestsValue === '1-Couple-2-Singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Tempalte.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '5') {
            const guestArrangementValue = guestArrangementSelect5.value;
            if (guestArrangementValue === '2-Couples-1-Single') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (numberOfGuestsValue === '1-Couple-3-Singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Tempalte.style.display = 'block';
                single3Tempalte.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '6') {
            const guestArrangementValue = guestArrangementSelect6.value;
            if (guestArrangementValue === '3-Couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                couple3Template.style.display = 'block';
            } else if (numberOfGuestsValue === '2-Couples-2-Singles') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                single1Template.style.display = 'block';
                single2Tempalte.style.display = 'block';
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
    const guestArrangement4 = document.getElementById('5-Guest-Arrangement');
    const guestArrangement4 = document.getElementById('6-Guest-Arrangement');

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
    // Single Service Conditional fields - Original
    const singleService = document.getElementById('Service-Single');
    const singlePackage = document.getElementById('Package-Single');
    const spaDelSolDreamInfo = document.getElementById('Spa-del-Sol-Dream-Info-Single');
    const singleMassage = document.getElementById('Massage-Single');
    const massageDurationA = document.getElementById('Duration-A-Single');
    const massageDurationB = document.getElementById('Duration-B-Single');
    const combinationType = document.getElementById('Combination-Single');
    const singleFacial = document.getElementById('Facial-Single');
    const facialAddOn = document.getElementById('Add-On-Single');
    const bodyTreatment = document.getElementById('Body-Treatment-Single');
    const waxInfo = document.getElementById('Wax-Info-Single');
    const multipleServicesInfo = document.getElementById('Multiple-Services-Info-Single');

    // Single Service Conditional fields - Copy 1
    const singleService1 = document.getElementById('Service-Single-1');
    const singlePackage1 = document.getElementById('Package-Single-1');
    const spaDelSolDreamInfo1 = document.getElementById('Spa-del-Sol-Dream-Info-Single-1');
    const singleMassage1 = document.getElementById('Massage-Single-1');
    const massageDurationA1 = document.getElementById('Duration-A-Single-1');
    const massageDurationB1 = document.getElementById('Duration-B-Single-1');
    const combinationType1 = document.getElementById('Combination-Single-1');
    const singleFacial1 = document.getElementById('Facial-Single-1');
    const facialAddOn1 = document.getElementById('Add-On-Single-1');
    const bodyTreatment1 = document.getElementById('Body-Treatment-Single-1');
    const waxInfo1 = document.getElementById('Wax-Info-Single-1');
    const multipleServicesInfo1 = document.getElementById('Multiple-Services-Info-Single-1');

    // Single Service Conditional fields - Copy 2
    const singleService2 = document.getElementById('Service-Single-2');
    const singlePackage2 = document.getElementById('Package-Single-2');
    const spaDelSolDreamInfo2 = document.getElementById('Spa-del-Sol-Dream-Info-Single-2');
    const singleMassage2 = document.getElementById('Massage-Single-2');
    const massageDurationA2 = document.getElementById('Duration-A-Single-2');
    const massageDurationB2 = document.getElementById('Duration-B-Single-2');
    const combinationType2 = document.getElementById('Combination-Single-2');
    const singleFacial2 = document.getElementById('Facial-Single-2');
    const facialAddOn2 = document.getElementById('Add-On-Single-2');
    const bodyTreatment2 = document.getElementById('Body-Treatment-Single-2');
    const waxInfo2 = document.getElementById('Wax-Info-Single-2');
    const multipleServicesInfo2 = document.getElementById('Multiple-Services-Info-Single-2');

    // Single Service Conditional fields - Copy 3
    const singleService3 = document.getElementById('Service-Single-3');
    const singlePackage3 = document.getElementById('Package-Single-3');
    const spaDelSolDreamInfo3 = document.getElementById('Spa-del-Sol-Dream-Info-Single-3');
    const singleMassage3 = document.getElementById('Massage-Single-3');
    const massageDurationA3 = document.getElementById('Duration-A-Single-3');
    const massageDurationB3 = document.getElementById('Duration-B-Single-3');
    const combinationType3 = document.getElementById('Combination-Single-3');
    const singleFacial3 = document.getElementById('Facial-Single-3');
    const facialAddOn3 = document.getElementById('Add-On-Single-3');
    const bodyTreatment3 = document.getElementById('Body-Treatment-Single-3');
    const waxInfo3 = document.getElementById('Wax-Info-Single-3');
    const multipleServicesInfo3 = document.getElementById('Multiple-Services-Info-Single-3');

    // Couple Service Conditional fields - Original
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

    // Couple Service Conditional fields - Copy 1
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

    // Couple Service Conditional fields - Copy 2
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

    // Couple Service Conditional fields - Copy 3
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
        // Single Service
        [
            singlePackage, spaDelSolDreamInfo, singleMassage, massageDurationA, massageDurationB,
            combinationType, singleFacial, facialAddOn, bodyTreatment, waxInfo, multipleServicesInfo,
            singlePackage1, spaDelSolDreamInfo1, singleMassage1, massageDurationA1, massageDurationB1,
            combinationType1, singleFacial1, facialAddOn1, bodyTreatment1, waxInfo1, multipleServicesInfo1,
            singlePackage2, spaDelSolDreamInfo2, singleMassage2, massageDurationA2, massageDurationB2,
            combinationType2, singleFacial2, facialAddOn2, bodyTreatment2, waxInfo2, multipleServicesInfo2,
            singlePackage3, spaDelSolDreamInfo3, singleMassage3, massageDurationA3, massageDurationB3,
            combinationType3, singleFacial3, facialAddOn3, bodyTreatment3, waxInfo3, multipleServicesInfo3
        ].forEach(field => field.style.display = 'none');

        // Couple Service
        [
            couplePackage, spaDelSolDreamInfoCouple, otherPackagesInfoCouple, coupleMassage, massageDurationACouple,
            massageDurationBCouple, prenatalMassageCouple, combinationSelectsWrapperCouple, differentMassagesSelectsWrapperCouple,
            durationAGuest1And2Couple, facialSelectsWrapperCouple, facialAddOnGuest1Couple, facialAddOnGuest2Couple,
            bodyTreatmentsSelectsWrapperCouple, otherServicesInfoCouple,
            couplePackage1, spaDelSolDreamInfoCouple1, otherPackagesInfoCouple1, coupleMassage1, massageDurationACouple1,
            massageDurationBCouple1, prenatalMassageCouple1, combinationSelectsWrapperCouple1, differentMassagesSelectsWrapperCouple1,
            durationAGuest1And2Couple1, facialSelectsWrapperCouple1, facialAddOnGuest1Couple1, facialAddOnGuest2Couple1,
            bodyTreatmentsSelectsWrapperCouple1, otherServicesInfoCouple1,
            couplePackage2, spaDelSolDreamInfoCouple2, otherPackagesInfoCouple2, coupleMassage2, massageDurationACouple2,
            massageDurationBCouple2, prenatalMassageCouple2, combinationSelectsWrapperCouple2, differentMassagesSelectsWrapperCouple2,
            durationAGuest1And2Couple2, facialSelectsWrapperCouple2, facialAddOnGuest1Couple2, facialAddOnGuest2Couple2,
            bodyTreatmentsSelectsWrapperCouple2, otherServicesInfoCouple2,
            couplePackage3, spaDelSolDreamInfoCouple3, otherPackagesInfoCouple3, coupleMassage3, massageDurationACouple3,
            massageDurationBCouple3, prenatalMassageCouple3, combinationSelectsWrapperCouple3, differentMassagesSelectsWrapperCouple3,
            durationAGuest1And2Couple3, facialSelectsWrapperCouple3, facialAddOnGuest1Couple3, facialAddOnGuest2Couple3,
            bodyTreatmentsSelectsWrapperCouple3, otherServicesInfoCouple3
        ].forEach(field => field.style.display = 'none');
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
        const singleFields = [
            'singlePackage', 'spaDelSolDreamInfo', 'singleMassage', 'massageDurationA', 'massageDurationB',
            'combinationType', 'singleFacial', 'facialAddOn', 'bodyTreatment', 'waxInfo', 'multipleServicesInfo',
            'singlePackage1', 'spaDelSolDreamInfo1', 'singleMassage1', 'massageDurationA1', 'massageDurationB1',
            'combinationType1', 'singleFacial1', 'facialAddOn1', 'bodyTreatment1', 'waxInfo1', 'multipleServicesInfo1',
            'singlePackage2', 'spaDelSolDreamInfo2', 'singleMassage2', 'massageDurationA2', 'massageDurationB2',
            'combinationType2', 'singleFacial2', 'facialAddOn2', 'bodyTreatment2', 'waxInfo2', 'multipleServicesInfo2',
            'singlePackage3', 'spaDelSolDreamInfo3', 'singleMassage3', 'massageDurationA3', 'massageDurationB3',
            'combinationType3', 'singleFacial3', 'facialAddOn3', 'bodyTreatment3', 'waxInfo3', 'multipleServicesInfo3'
        ];

        const coupleFields = [
            'couplePackage', 'spaDelSolDreamInfoCouple', 'otherPackagesInfoCouple', 'coupleMassage', 'massageDurationACouple',
            'massageDurationBCouple', 'prenatalMassageCouple', 'combinationSelectsWrapperCouple', 'differentMassagesSelectsWrapperCouple',
            'durationAGuest1And2Couple', 'facialSelectsWrapperCouple', 'facialAddOnGuest1Couple', 'facialAddOnGuest2Couple',
            'bodyTreatmentsSelectsWrapperCouple', 'otherServicesInfoCouple',
            'couplePackage1', 'spaDelSolDreamInfoCouple1', 'otherPackagesInfoCouple1', 'coupleMassage1', 'massageDurationACouple1',
            'massageDurationBCouple1', 'prenatalMassageCouple1', 'combinationSelectsWrapperCouple1', 'differentMassagesSelectsWrapperCouple1',
            'durationAGuest1And2Couple1', 'facialSelectsWrapperCouple1', 'facialAddOnGuest1Couple1', 'facialAddOnGuest2Couple1',
            'bodyTreatmentsSelectsWrapperCouple1', 'otherServicesInfoCouple1',
            'couplePackage2', 'spaDelSolDreamInfoCouple2', 'otherPackagesInfoCouple2', 'coupleMassage2', 'massageDurationACouple2',
            'massageDurationBCouple2', 'prenatalMassageCouple2', 'combinationSelectsWrapperCouple2', 'differentMassagesSelectsWrapperCouple2',
            'durationAGuest1And2Couple2', 'facialSelectsWrapperCouple2', 'facialAddOnGuest1Couple2', 'facialAddOnGuest2Couple2',
            'bodyTreatmentsSelectsWrapperCouple2', 'otherServicesInfoCouple2',
            'couplePackage3', 'spaDelSolDreamInfoCouple3', 'otherPackagesInfoCouple3', 'coupleMassage3', 'massageDurationACouple3',
            'massageDurationBCouple3', 'prenatalMassageCouple3', 'combinationSelectsWrapperCouple3', 'differentMassagesSelectsWrapperCouple3',
            'durationAGuest1And2Couple3', 'facialSelectsWrapperCouple3', 'facialAddOnGuest1Couple3', 'facialAddOnGuest2Couple3',
            'bodyTreatmentsSelectsWrapperCouple3', 'otherServicesInfoCouple3'
        ];

        if (singleFields.includes(parentSelect.id)) {
            singleFields.forEach(field => resetField(document.getElementById(field)));
            hideAllConditionals();
        }

        if (coupleFields.includes(parentSelect.id)) {
            coupleFields.forEach(field => resetField(document.getElementById(field)));
            hideAllConditionals();
        }
    }

    // Show/hide and reset conditionals based on selected values
    function handleConditionalsSingle() {
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
    }

    function handleConditionalsSingle1() {
        hideAllConditionals();

        // Single Service Conditionals - Copy 1
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
    }

    function handleConditionalsSingle2() {
        hideAllConditionals();

        // Single Service Conditionals - Copy 2
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
    }

    function handleConditionalsSingle3() {
        hideAllConditionals();

        // Single Service Conditionals - Copy 3
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
    }

    function handleConditionalsCouple() {
        hideAllConditionals();

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
    }

    function handleConditionalsCouple1() {
        hideAllConditionals();

        // Couple Service Conditionals - Copy 1
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
    }

    function handleConditionalsCouple2() {
        hideAllConditionals();

        // Couple Service Conditionals - Copy 2
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
    }

    function handleConditionalsCouple3() {
        hideAllConditionals();

        // Couple Service Conditionals - Copy 3
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

    // Original Single Service
    addChangeEventListener('Service-Single', handleConditionalsSingle);
    addChangeEventListener('Package-Single', handleConditionalsSingle);
    addChangeEventListener('Massage-Single', handleConditionalsSingle);
    addChangeEventListener('Facial-Single', handleConditionalsSingle);

    // Single Service Copy 1
    addChangeEventListener('Service-Single-1', handleConditionalsSingle1);
    addChangeEventListener('Package-Single-1', handleConditionalsSingle1);
    addChangeEventListener('Massage-Single-1', handleConditionalsSingle1);
    addChangeEventListener('Facial-Single-1', handleConditionalsSingle1);

    // Single Service Copy 2
    addChangeEventListener('Service-Single-2', handleConditionalsSingle2);
    addChangeEventListener('Package-Single-2', handleConditionalsSingle2);
    addChangeEventListener('Massage-Single-2', handleConditionalsSingle2);
    addChangeEventListener('Facial-Single-2', handleConditionalsSingle2);

    // Single Service Copy 3
    addChangeEventListener('Service-Single-3', handleConditionalsSingle3);
    addChangeEventListener('Package-Single-3', handleConditionalsSingle3);
    addChangeEventListener('Massage-Single-3', handleConditionalsSingle3);
    addChangeEventListener('Facial-Single-3', handleConditionalsSingle3);

    // Original Couple Service
    addChangeEventListener('Service-Couple', handleConditionalsCouple);
    addChangeEventListener('Package-Couple', handleConditionalsCouple);
    addChangeEventListener('Massage-Couple', handleConditionalsCouple);
    addChangeEventListener('Massage-Guest-1-Couple', handleConditionalsCouple);
    addChangeEventListener('Massage-Guest-2-Couple', handleConditionalsCouple);
    addChangeEventListener('Facial-Guest-1-Couple', handleConditionalsCouple);
    addChangeEventListener('Facial-Guest-2-Couple', handleConditionalsCouple);

    // Couple Service Copy 1
    addChangeEventListener('Service-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Package-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Massage-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Massage-Guest-1-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Massage-Guest-2-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Facial-Guest-1-Couple-1', handleConditionalsCouple1);
    addChangeEventListener('Facial-Guest-2-Couple-1', handleConditionalsCouple1);

    // Couple Service Copy 2
    addChangeEventListener('Service-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Package-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Massage-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Massage-Guest-1-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Massage-Guest-2-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Facial-Guest-1-Couple-2', handleConditionalsCouple2);
    addChangeEventListener('Facial-Guest-2-Couple-2', handleConditionalsCouple2);

    // Couple Service Copy 3
    addChangeEventListener('Service-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Package-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Massage-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Massage-Guest-1-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Massage-Guest-2-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Facial-Guest-1-Couple-3', handleConditionalsCouple3);
    addChangeEventListener('Facial-Guest-2-Couple-3', handleConditionalsCouple3);

    // Initial setup
    hideAllConditionals();
});

