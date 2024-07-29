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
        const serviceFields = [
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
            'Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple',
            'Other-Packages-Info-Couple', 'Massage-Couple', 'Duration-A-Couple',
            'Duration-B-Couple', 'Prenatal-Massage-Couple', 'Combination-Selects-Wrapper-Couple',
            'Different-Massages-Selects-Wrapper-Couple', 'Duration-A-Guest-1-And-2-Couple',
            'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple',
            'Facial-Add-On-Guest-2-Couple', 'Body-Treatments-Selects-Wrapper-Couple',
            'Other-Services-Info-Couple', 'Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1',
            'Other-Packages-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1',
            'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1', 'Combination-Selects-Wrapper-Couple-1',
            'Different-Massages-Selects-Wrapper-Couple-1', 'Duration-A-Guest-1-And-2-Couple-1',
            'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1',
            'Facial-Add-On-Guest-2-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1',
            'Other-Services-Info-Couple-1', 'Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2',
            'Other-Packages-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2',
            'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2', 'Combination-Selects-Wrapper-Couple-2',
            'Different-Massages-Selects-Wrapper-Couple-2', 'Duration-A-Guest-1-And-2-Couple-2',
            'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2',
            'Facial-Add-On-Guest-2-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2',
            'Other-Services-Info-Couple-2', 'Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3',
            'Other-Packages-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3',
            'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3', 'Combination-Selects-Wrapper-Couple-3',
            'Different-Massages-Selects-Wrapper-Couple-3', 'Duration-A-Guest-1-And-2-Couple-3',
            'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3',
            'Facial-Add-On-Guest-2-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3',
            'Other-Services-Info-Couple-3'
        ];

        serviceFields.forEach(id => {
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

        ['Service-Single', 'Service-Couple', 'Service-Single-1', 'Service-Couple-1', 'Service-Single-2', 'Service-Couple-2', 'Service-Single-3', 'Service-Couple-3'].forEach(id => {
            document.getElementById(id).style.display = 'block';
        });
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
            if (guestArrangementValue === '1-Couple') {
                coupleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '2-Singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '3') {
            const guestArrangementValue = guestArrangementSelect3.value;
            if (guestArrangementValue === '1-Couple-1-Single') {
                coupleTemplate.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '3-Singles') {
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
                single3Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '4') {
            const guestArrangementValue = guestArrangementSelect4.value;
            if (guestArrangementValue === '2-Couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
            } else if (guestArrangementValue === '1-Couple-2-Singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '5') {
            const guestArrangementValue = guestArrangementSelect5.value;
            if (guestArrangementValue === '2-Couples-1-Single') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                singleTemplate.style.display = 'block';
            } else if (guestArrangementValue === '1-Couple-3-Singles') {
                coupleTemplate.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
                single3Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '6') {
            const guestArrangementValue = guestArrangementSelect6.value;
            if (guestArrangementValue === '3-Couples') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                couple3Template.style.display = 'block';
            } else if (guestArrangementValue === '2-Couples-2-Singles') {
                couple1Template.style.display = 'block';
                couple2Template.style.display = 'block';
                single1Template.style.display = 'block';
                single2Template.style.display = 'block';
            }
        } else if (numberOfGuestsValue === '6-plus') {
            currentStep = getNextStep(currentStep);
            showStep(currentStep);
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

    // Single Service Conditional fields copies
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

    // Couple Service Conditional fields copies
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
        const conditionals = [
            singlePackage, spaDelSolDreamInfo, singleMassage, massageDurationA, massageDurationB, combinationType, singleFacial, facialAddOn, bodyTreatment, waxInfo, multipleServicesInfo,
            singlePackage1, spaDelSolDreamInfo1, singleMassage1, massageDurationA1, massageDurationB1, combinationType1, singleFacial1, facialAddOn1, bodyTreatment1, waxInfo1, multipleServicesInfo1,
            singlePackage2, spaDelSolDreamInfo2, singleMassage2, massageDurationA2, massageDurationB2, combinationType2, singleFacial2, facialAddOn2, bodyTreatment2, waxInfo2, multipleServicesInfo2,
            singlePackage3, spaDelSolDreamInfo3, singleMassage3, massageDurationA3, massageDurationB3, combinationType3, singleFacial3, facialAddOn3, bodyTreatment3, waxInfo3, multipleServicesInfo3,
            couplePackage, spaDelSolDreamInfoCouple, otherPackagesInfoCouple, coupleMassage, massageDurationACouple, massageDurationBCouple, prenatalMassageCouple, combinationSelectsWrapperCouple, differentMassagesSelectsWrapperCouple, durationAGuest1And2Couple, facialSelectsWrapperCouple, facialAddOnGuest1Couple, facialAddOnGuest2Couple, bodyTreatmentsSelectsWrapperCouple, otherServicesInfoCouple,
            couplePackage1, spaDelSolDreamInfoCouple1, otherPackagesInfoCouple1, coupleMassage1, massageDurationACouple1, massageDurationBCouple1, prenatalMassageCouple1, combinationSelectsWrapperCouple1, differentMassagesSelectsWrapperCouple1, durationAGuest1And2Couple1, facialSelectsWrapperCouple1, facialAddOnGuest1Couple1, facialAddOnGuest2Couple1, bodyTreatmentsSelectsWrapperCouple1, otherServicesInfoCouple1,
            couplePackage2, spaDelSolDreamInfoCouple2, otherPackagesInfoCouple2, coupleMassage2, massageDurationACouple2, massageDurationBCouple2, prenatalMassageCouple2, combinationSelectsWrapperCouple2, differentMassagesSelectsWrapperCouple2, durationAGuest1And2Couple2, facialSelectsWrapperCouple2, facialAddOnGuest1Couple2, facialAddOnGuest2Couple2, bodyTreatmentsSelectsWrapperCouple2, otherServicesInfoCouple2,
            couplePackage3, spaDelSolDreamInfoCouple3, otherPackagesInfoCouple3, coupleMassage3, massageDurationACouple3, massageDurationBCouple3, prenatalMassageCouple3, combinationSelectsWrapperCouple3, differentMassagesSelectsWrapperCouple3, durationAGuest1And2Couple3, facialSelectsWrapperCouple3, facialAddOnGuest1Couple3, facialAddOnGuest2Couple3, bodyTreatmentsSelectsWrapperCouple3, otherServicesInfoCouple3
        ];
        conditionals.forEach(element => element.style.display = 'none');
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
            case 'Service-Single-1':
            case 'Service-Single-2':
            case 'Service-Single-3':
                const singleFields = [singlePackage, spaDelSolDreamInfo, singleMassage, massageDurationA, massageDurationB, combinationType, singleFacial, facialAddOn, bodyTreatment, waxInfo, multipleServicesInfo];
                const singleFields1 = [singlePackage1, spaDelSolDreamInfo1, singleMassage1, massageDurationA1, massageDurationB1, combinationType1, singleFacial1, facialAddOn1, bodyTreatment1, waxInfo1, multipleServicesInfo1];
                const singleFields2 = [singlePackage2, spaDelSolDreamInfo2, singleMassage2, massageDurationA2, massageDurationB2, combinationType2, singleFacial2, facialAddOn2, bodyTreatment2, waxInfo2, multipleServicesInfo2];
                const singleFields3 = [singlePackage3, spaDelSolDreamInfo3, singleMassage3, massageDurationA3, massageDurationB3, combinationType3, singleFacial3, facialAddOn3, bodyTreatment3, waxInfo3, multipleServicesInfo3];

                const allSingleFields = [singleFields, singleFields1, singleFields2, singleFields3];
                allSingleFields.forEach(fields => fields.forEach(resetField));
                break;

            case 'Service-Couple':
            case 'Service-Couple-1':
            case 'Service-Couple-2':
            case 'Service-Couple-3':
                const coupleFields = [couplePackage, spaDelSolDreamInfoCouple, otherPackagesInfoCouple, coupleMassage, massageDurationACouple, massageDurationBCouple, prenatalMassageCouple, combinationSelectsWrapperCouple, differentMassagesSelectsWrapperCouple, durationAGuest1And2Couple, facialSelectsWrapperCouple, facialAddOnGuest1Couple, facialAddOnGuest2Couple, bodyTreatmentsSelectsWrapperCouple, otherServicesInfoCouple];
                const coupleFields1 = [couplePackage1, spaDelSolDreamInfoCouple1, otherPackagesInfoCouple1, coupleMassage1, massageDurationACouple1, massageDurationBCouple1, prenatalMassageCouple1, combinationSelectsWrapperCouple1, differentMassagesSelectsWrapperCouple1, durationAGuest1And2Couple1, facialSelectsWrapperCouple1, facialAddOnGuest1Couple1, facialAddOnGuest2Couple1, bodyTreatmentsSelectsWrapperCouple1, otherServicesInfoCouple1];
                const coupleFields2 = [couplePackage2, spaDelSolDreamInfoCouple2, otherPackagesInfoCouple2, coupleMassage2, massageDurationACouple2, massageDurationBCouple2, prenatalMassageCouple2, combinationSelectsWrapperCouple2, differentMassagesSelectsWrapperCouple2, durationAGuest1And2Couple2, facialSelectsWrapperCouple2, facialAddOnGuest1Couple2, facialAddOnGuest2Couple2, bodyTreatmentsSelectsWrapperCouple2, otherServicesInfoCouple2];
                const coupleFields3 = [couplePackage3, spaDelSolDreamInfoCouple3, otherPackagesInfoCouple3, coupleMassage3, massageDurationACouple3, massageDurationBCouple3, prenatalMassageCouple3, combinationSelectsWrapperCouple3, differentMassagesSelectsWrapperCouple3, durationAGuest1And2Couple3, facialSelectsWrapperCouple3, facialAddOnGuest1Couple3, facialAddOnGuest2Couple3, bodyTreatmentsSelectsWrapperCouple3, otherServicesInfoCouple3];

                const allCoupleFields = [coupleFields, coupleFields1, coupleFields2, coupleFields3];
                allCoupleFields.forEach(fields => fields.forEach(resetField));
                break;

            case 'Package-Single':
                resetField(spaDelSolDreamInfo);
                break;
            case 'Package-Single-1':
                resetField(spaDelSolDreamInfo1);
                break;
            case 'Package-Single-2':
                resetField(spaDelSolDreamInfo2);
                break;
            case 'Package-Single-3':
                resetField(spaDelSolDreamInfo3);
                break;

            case 'Massage-Single':
                resetField(massageDurationA);
                resetField(massageDurationB);
                resetField(combinationType);
                break;
            case 'Massage-Single-1':
                resetField(massageDurationA1);
                resetField(massageDurationB1);
                resetField(combinationType1);
                break;
            case 'Massage-Single-2':
                resetField(massageDurationA2);
                resetField(massageDurationB2);
                resetField(combinationType2);
                break;
            case 'Massage-Single-3':
                resetField(massageDurationA3);
                resetField(massageDurationB3);
                resetField(combinationType3);
                break;

            case 'Facial-Single':
                resetField(facialAddOn);
                break;
            case 'Facial-Single-1':
                resetField(facialAddOn1);
                break;
            case 'Facial-Single-2':
                resetField(facialAddOn2);
                break;
            case 'Facial-Single-3':
                resetField(facialAddOn3);
                break;

            case 'Package-Couple':
                resetField(spaDelSolDreamInfoCouple);
                resetField(otherPackagesInfoCouple);
                break;
            case 'Package-Couple-1':
                resetField(spaDelSolDreamInfoCouple1);
                resetField(otherPackagesInfoCouple1);
                break;
            case 'Package-Couple-2':
                resetField(spaDelSolDreamInfoCouple2);
                resetField(otherPackagesInfoCouple2);
                break;
            case 'Package-Couple-3':
                resetField(spaDelSolDreamInfoCouple3);
                resetField(otherPackagesInfoCouple3);
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

            case 'Facial-Guest-1-Couple':
                resetField(facialAddOnGuest1Couple);
                break;
            case 'Facial-Guest-1-Couple-1':
                resetField(facialAddOnGuest1Couple1);
                break;
            case 'Facial-Guest-1-Couple-2':
                resetField(facialAddOnGuest1Couple2);
                break;
            case 'Facial-Guest-1-Couple-3':
                resetField(facialAddOnGuest1Couple3);
                break;

            case 'Facial-Guest-2-Couple':
                resetField(facialAddOnGuest2Couple);
                break;
            case 'Facial-Guest-2-Couple-1':
                resetField(facialAddOnGuest2Couple1);
                break;
            case 'Facial-Guest-2-Couple-2':
                resetField(facialAddOnGuest2Couple2);
                break;
            case 'Facial-Guest-2-Couple-3':
                resetField(facialAddOnGuest2Couple3);
                break;
        }
    }

    // Show/hide and reset conditionals based on selected values
    function handleConditionalsSingle(templateId) {
        hideAllConditionals();

        const singleServiceValue = document.getElementById(`Service-Single${templateId}`).value;
        const singlePackageValue = document.getElementById(`Package-Single${templateId}`).value;
        const singleMassageValue = document.getElementById(`Massage-Single${templateId}`).value;
        const singleFacialValue = document.getElementById(`Facial-Single${templateId}`).value;

        // Single Service Conditionals
        if (singleServiceValue === 'Package') {
            document.getElementById(`Package-Single${templateId}`).style.display = 'block';
            if (singlePackageValue === 'Spa del Sol Dream') {
                document.getElementById(`Spa-del-Sol-Dream-Info-Single${templateId}`).style.display = 'block';
            }
        } else if (singleServiceValue === 'Massage') {
            document.getElementById(`Massage-Single${templateId}`).style.display = 'block';
            if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue)) {
                document.getElementById(`Duration-A-Single${templateId}`).style.display = 'block';
            } else if (singleMassageValue === 'Reflexology') {
                document.getElementById(`Duration-B-Single${templateId}`).style.display = 'block';
            } else if (singleMassageValue === 'Relaxing Combination') {
                document.getElementById(`Combination-Single${templateId}`).style.display = 'block';
            }
        } else if (singleServiceValue === 'Facial') {
            document.getElementById(`Facial-Single${templateId}`).style.display = 'block';
            if (singleFacialValue === 'Sol Janssen') {
                document.getElementById(`Add-On-Single${templateId}`).style.display = 'block';
            }
        } else if (singleServiceValue === 'Body treatment') {
            document.getElementById(`Body-Treatment-Single${templateId}`).style.display = 'block';
        } else if (singleServiceValue === 'Wax') {
            document.getElementById(`Wax-Info-Single${templateId}`).style.display = 'block';
        } else if (singleServiceValue === 'Multiple services') {
            document.getElementById(`Multiple-Services-Info-Single${templateId}`).style.display = 'block';
        }
    }

    function handleConditionalsCouple(templateId) {
        hideAllConditionals();

        const coupleServiceValue = document.getElementById(`Service-Couple${templateId}`).value;
        const couplePackageValue = document.getElementById(`Package-Couple${templateId}`).value;
        const coupleMassageValue = document.getElementById(`Massage-Couple${templateId}`).value;

        // Couple Service Conditionals
        if (coupleServiceValue === 'Package') {
            document.getElementById(`Package-Couple${templateId}`).style.display = 'block';
            if (couplePackageValue === '2x Spa del Sol Dream') {
                document.getElementById(`Spa-Del-Sol-Dream-Info-Couple${templateId}`).style.display = 'block';
            } else if (couplePackageValue === 'Two different packages') {
                document.getElementById(`Other-Packages-Info-Couple${templateId}`).style.display = 'block';
            }
        } else if (coupleServiceValue === 'Massage') {
            document.getElementById(`Massage-Couple${templateId}`).style.display = 'block';
            if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue)) {
                document.getElementById(`Duration-A-Couple${templateId}`).style.display = 'block';
            } else if (coupleMassageValue === 'Reflexology') {
                document.getElementById(`Duration-B-Couple${templateId}`).style.display = 'block';
            } else if (coupleMassageValue === 'Prenatal and other') {
                document.getElementById(`Prenatal-Massage-Couple${templateId}`).style.display = 'block';
            } else if (coupleMassageValue === 'Relaxing Combination') {
                document.getElementById(`Combination-Selects-Wrapper-Couple${templateId}`).style.display = 'grid';
            } else if (coupleMassageValue === 'Two different types') {
                document.getElementById(`Different-Massages-Selects-Wrapper-Couple${templateId}`).style.display = 'grid';
            }
        } else if (coupleServiceValue === 'Facial') {
            document.getElementById(`Facial-Selects-Wrapper-Couple${templateId}`).style.display = 'grid';
        } else if (coupleServiceValue === 'Body treatment') {
            document.getElementById(`Body-Treatments-Selects-Wrapper-Couple${templateId}`).style.display = 'grid';
        } else if (coupleServiceValue === 'Other') {
            document.getElementById(`Other-Services-Info-Couple${templateId}`).style.display = 'block';
        }

        const massageGuest1Value = document.getElementById(`Massage-Guest-1-Couple${templateId}`).value;
        const massageGuest2Value = document.getElementById(`Massage-Guest-2-Couple${templateId}`).value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            document.getElementById(`Duration-A-Guest-1-And-2-Couple${templateId}`).style.display = 'block';
        }

        const facialGuest1Value = document.getElementById(`Facial-Guest-1-Couple${templateId}`).value;
        if (facialGuest1Value === 'Sol Janssen') {
            document.getElementById(`Facial-Add-On-Guest-1-Couple${templateId}`).style.display = 'block';
        }

        const facialGuest2Value = document.getElementById(`Facial-Guest-2-Couple${templateId}`).value;
        if (facialGuest2Value === 'Sol Janssen') {
            document.getElementById(`Facial-Add-On-Guest-2-Couple${templateId}`).style.display = 'block';
        }
    }

    // Add change event listeners to all select fields
    function addChangeEventListener(id, handleChange) {
        document.getElementById(id).addEventListener('change', function() {
            resetAndHideChildren(this);
            handleChange();
        });
    }

    addChangeEventListener('Service-Single', () => handleConditionalsSingle(''));
    addChangeEventListener('Package-Single', () => handleConditionalsSingle(''));
    addChangeEventListener('Massage-Single', () => handleConditionalsSingle(''));
    addChangeEventListener('Facial-Single', () => handleConditionalsSingle(''));

    addChangeEventListener('Service-Single-1', () => handleConditionalsSingle('-1'));
    addChangeEventListener('Package-Single-1', () => handleConditionalsSingle('-1'));
    addChangeEventListener('Massage-Single-1', () => handleConditionalsSingle('-1'));
    addChangeEventListener('Facial-Single-1', () => handleConditionalsSingle('-1'));

    addChangeEventListener('Service-Single-2', () => handleConditionalsSingle('-2'));
    addChangeEventListener('Package-Single-2', () => handleConditionalsSingle('-2'));
    addChangeEventListener('Massage-Single-2', () => handleConditionalsSingle('-2'));
    addChangeEventListener('Facial-Single-2', () => handleConditionalsSingle('-2'));

    addChangeEventListener('Service-Single-3', () => handleConditionalsSingle('-3'));
    addChangeEventListener('Package-Single-3', () => handleConditionalsSingle('-3'));
    addChangeEventListener('Massage-Single-3', () => handleConditionalsSingle('-3'));
    addChangeEventListener('Facial-Single-3', () => handleConditionalsSingle('-3'));

    addChangeEventListener('Service-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Package-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Massage-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Massage-Guest-1-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Massage-Guest-2-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Facial-Guest-1-Couple', () => handleConditionalsCouple(''));
    addChangeEventListener('Facial-Guest-2-Couple', () => handleConditionalsCouple(''));

    addChangeEventListener('Service-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Package-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Massage-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Massage-Guest-1-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Massage-Guest-2-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Facial-Guest-1-Couple-1', () => handleConditionalsCouple('-1'));
    addChangeEventListener('Facial-Guest-2-Couple-1', () => handleConditionalsCouple('-1'));

    addChangeEventListener('Service-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Package-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Massage-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Massage-Guest-1-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Massage-Guest-2-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Facial-Guest-1-Couple-2', () => handleConditionalsCouple('-2'));
    addChangeEventListener('Facial-Guest-2-Couple-2', () => handleConditionalsCouple('-2'));

    addChangeEventListener('Service-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Package-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Massage-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Massage-Guest-1-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Massage-Guest-2-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Facial-Guest-1-Couple-3', () => handleConditionalsCouple('-3'));
    addChangeEventListener('Facial-Guest-2-Couple-3', () => handleConditionalsCouple('-3'));

    // Initial setup
    hideAllConditionals();
});
