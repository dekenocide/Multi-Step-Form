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
            'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3'
        ];

        const coupleServiceFields = [
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
        document.getElementById('Service-Couple').style.display = 'block';
        document.getElementById('Service-Single-1').style.display = 'block';
        document.getElementById('Service-Couple-1').style.display = 'block';
        document.getElementById('Service-Single-2').style.display = 'block';
        document.getElementById('Service-Couple-2').style.display = 'block';
        document.getElementById('Service-Single-3').style.display = 'block';
        document.getElementById('Service-Couple-3').style.display = 'block';
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
    // Define Single Service Conditional fields and copies
    const singleServiceElements = {
        '': {
            service: document.getElementById('Service-Single'),
            package: document.getElementById('Package-Single'),
            spaDelSolDreamInfo: document.getElementById('Spa-del-Sol-Dream-Info-Single'),
            massage: document.getElementById('Massage-Single'),
            durationA: document.getElementById('Duration-A-Single'),
            durationB: document.getElementById('Duration-B-Single'),
            combination: document.getElementById('Combination-Single'),
            facial: document.getElementById('Facial-Single'),
            addOn: document.getElementById('Add-On-Single'),
            bodyTreatment: document.getElementById('Body-Treatment-Single'),
            waxInfo: document.getElementById('Wax-Info-Single'),
            multipleServicesInfo: document.getElementById('Multiple-Services-Info-Single')
        },
        '1': {
            service: document.getElementById('Service-Single-1'),
            package: document.getElementById('Package-Single-1'),
            spaDelSolDreamInfo: document.getElementById('Spa-del-Sol-Dream-Info-Single-1'),
            massage: document.getElementById('Massage-Single-1'),
            durationA: document.getElementById('Duration-A-Single-1'),
            durationB: document.getElementById('Duration-B-Single-1'),
            combination: document.getElementById('Combination-Single-1'),
            facial: document.getElementById('Facial-Single-1'),
            addOn: document.getElementById('Add-On-Single-1'),
            bodyTreatment: document.getElementById('Body-Treatment-Single-1'),
            waxInfo: document.getElementById('Wax-Info-Single-1'),
            multipleServicesInfo: document.getElementById('Multiple-Services-Info-Single-1')
        },
        '2': {
            service: document.getElementById('Service-Single-2'),
            package: document.getElementById('Package-Single-2'),
            spaDelSolDreamInfo: document.getElementById('Spa-del-Sol-Dream-Info-Single-2'),
            massage: document.getElementById('Massage-Single-2'),
            durationA: document.getElementById('Duration-A-Single-2'),
            durationB: document.getElementById('Duration-B-Single-2'),
            combination: document.getElementById('Combination-Single-2'),
            facial: document.getElementById('Facial-Single-2'),
            addOn: document.getElementById('Add-On-Single-2'),
            bodyTreatment: document.getElementById('Body-Treatment-Single-2'),
            waxInfo: document.getElementById('Wax-Info-Single-2'),
            multipleServicesInfo: document.getElementById('Multiple-Services-Info-Single-2')
        },
        '3': {
            service: document.getElementById('Service-Single-3'),
            package: document.getElementById('Package-Single-3'),
            spaDelSolDreamInfo: document.getElementById('Spa-del-Sol-Dream-Info-Single-3'),
            massage: document.getElementById('Massage-Single-3'),
            durationA: document.getElementById('Duration-A-Single-3'),
            durationB: document.getElementById('Duration-B-Single-3'),
            combination: document.getElementById('Combination-Single-3'),
            facial: document.getElementById('Facial-Single-3'),
            addOn: document.getElementById('Add-On-Single-3'),
            bodyTreatment: document.getElementById('Body-Treatment-Single-3'),
            waxInfo: document.getElementById('Wax-Info-Single-3'),
            multipleServicesInfo: document.getElementById('Multiple-Services-Info-Single-3')
        }
    };

    // Define Couple Service Conditional fields and copies
    const coupleServiceElements = {
        '': {
            service: document.getElementById('Service-Couple'),
            package: document.getElementById('Package-Couple'),
            spaDelSolDreamInfo: document.getElementById('Spa-Del-Sol-Dream-Info-Couple'),
            otherPackagesInfo: document.getElementById('Other-Packages-Info-Couple'),
            massage: document.getElementById('Massage-Couple'),
            durationA: document.getElementById('Duration-A-Couple'),
            durationB: document.getElementById('Duration-B-Couple'),
            prenatalMassage: document.getElementById('Prenatal-Massage-Couple'),
            combinationSelectsWrapper: document.getElementById('Combination-Selects-Wrapper-Couple'),
            differentMassagesSelectsWrapper: document.getElementById('Different-Massages-Selects-Wrapper-Couple'),
            durationAGuest1And2: document.getElementById('Duration-A-Guest-1-And-2-Couple'),
            facialSelectsWrapper: document.getElementById('Facial-Selects-Wrapper-Couple'),
            facialAddOnGuest1: document.getElementById('Facial-Add-On-Guest-1-Couple'),
            facialAddOnGuest2: document.getElementById('Facial-Add-On-Guest-2-Couple'),
            bodyTreatmentsSelectsWrapper: document.getElementById('Body-Treatments-Selects-Wrapper-Couple'),
            otherServicesInfo: document.getElementById('Other-Services-Info-Couple')
        },
        '1': {
            service: document.getElementById('Service-Couple-1'),
            package: document.getElementById('Package-Couple-1'),
            spaDelSolDreamInfo: document.getElementById('Spa-Del-Sol-Dream-Info-Couple-1'),
            otherPackagesInfo: document.getElementById('Other-Packages-Info-Couple-1'),
            massage: document.getElementById('Massage-Couple-1'),
            durationA: document.getElementById('Duration-A-Couple-1'),
            durationB: document.getElementById('Duration-B-Couple-1'),
            prenatalMassage: document.getElementById('Prenatal-Massage-Couple-1'),
            combinationSelectsWrapper: document.getElementById('Combination-Selects-Wrapper-Couple-1'),
            differentMassagesSelectsWrapper: document.getElementById('Different-Massages-Selects-Wrapper-Couple-1'),
            durationAGuest1And2: document.getElementById('Duration-A-Guest-1-And-2-Couple-1'),
            facialSelectsWrapper: document.getElementById('Facial-Selects-Wrapper-Couple-1'),
            facialAddOnGuest1: document.getElementById('Facial-Add-On-Guest-1-Couple-1'),
            facialAddOnGuest2: document.getElementById('Facial-Add-On-Guest-2-Couple-1'),
            bodyTreatmentsSelectsWrapper: document.getElementById('Body-Treatments-Selects-Wrapper-Couple-1'),
            otherServicesInfo: document.getElementById('Other-Services-Info-Couple-1')
        },
        '2': {
            service: document.getElementById('Service-Couple-2'),
            package: document.getElementById('Package-Couple-2'),
            spaDelSolDreamInfo: document.getElementById('Spa-Del-Sol-Dream-Info-Couple-2'),
            otherPackagesInfo: document.getElementById('Other-Packages-Info-Couple-2'),
            massage: document.getElementById('Massage-Couple-2'),
            durationA: document.getElementById('Duration-A-Couple-2'),
            durationB: document.getElementById('Duration-B-Couple-2'),
            prenatalMassage: document.getElementById('Prenatal-Massage-Couple-2'),
            combinationSelectsWrapper: document.getElementById('Combination-Selects-Wrapper-Couple-2'),
            differentMassagesSelectsWrapper: document.getElementById('Different-Massages-Selects-Wrapper-Couple-2'),
            durationAGuest1And2: document.getElementById('Duration-A-Guest-1-And-2-Couple-2'),
            facialSelectsWrapper: document.getElementById('Facial-Selects-Wrapper-Couple-2'),
            facialAddOnGuest1: document.getElementById('Facial-Add-On-Guest-1-Couple-2'),
            facialAddOnGuest2: document.getElementById('Facial-Add-On-Guest-2-Couple-2'),
            bodyTreatmentsSelectsWrapper: document.getElementById('Body-Treatments-Selects-Wrapper-Couple-2'),
            otherServicesInfo: document.getElementById('Other-Services-Info-Couple-2')
        },
        '3': {
            service: document.getElementById('Service-Couple-3'),
            package: document.getElementById('Package-Couple-3'),
            spaDelSolDreamInfo: document.getElementById('Spa-Del-Sol-Dream-Info-Couple-3'),
            otherPackagesInfo: document.getElementById('Other-Packages-Info-Couple-3'),
            massage: document.getElementById('Massage-Couple-3'),
            durationA: document.getElementById('Duration-A-Couple-3'),
            durationB: document.getElementById('Duration-B-Couple-3'),
            prenatalMassage: document.getElementById('Prenatal-Massage-Couple-3'),
            combinationSelectsWrapper: document.getElementById('Combination-Selects-Wrapper-Couple-3'),
            differentMassagesSelectsWrapper: document.getElementById('Different-Massages-Selects-Wrapper-Couple-3'),
            durationAGuest1And2: document.getElementById('Duration-A-Guest-1-And-2-Couple-3'),
            facialSelectsWrapper: document.getElementById('Facial-Selects-Wrapper-Couple-3'),
            facialAddOnGuest1: document.getElementById('Facial-Add-On-Guest-1-Couple-3'),
            facialAddOnGuest2: document.getElementById('Facial-Add-On-Guest-2-Couple-3'),
            bodyTreatmentsSelectsWrapper: document.getElementById('Body-Treatments-Selects-Wrapper-Couple-3'),
            otherServicesInfo: document.getElementById('Other-Services-Info-Couple-3')
        }
    };

    // Function to hide and reset single service conditionals
    function hideAndResetSingleService(id) {
        const elements = singleServiceElements[id];
        elements.package.style.display = 'none';
        elements.spaDelSolDreamInfo.style.display = 'none';
        elements.massage.style.display = 'none';
        elements.durationA.style.display = 'none';
        elements.durationB.style.display = 'none';
        elements.combination.style.display = 'none';
        elements.facial.style.display = 'none';
        elements.addOn.style.display = 'none';
        elements.bodyTreatment.style.display = 'none';
        elements.waxInfo.style.display = 'none';
        elements.multipleServicesInfo.style.display = 'none';

        elements.package.selectedIndex = 0;
        elements.massage.selectedIndex = 0;
        elements.facial.selectedIndex = 0;
        elements.durationA.selectedIndex = 0;
        elements.durationB.selectedIndex = 0;
        elements.combination.selectedIndex = 0;
        elements.addOn.selectedIndex = 0;
        elements.bodyTreatment.selectedIndex = 0;
        elements.waxInfo.selectedIndex = 0;
        elements.multipleServicesInfo.selectedIndex = 0;
    }

    // Function to hide and reset couple service conditionals
    function hideAndResetCoupleService(id) {
        const elements = coupleServiceElements[id];
        elements.package.style.display = 'none';
        elements.spaDelSolDreamInfo.style.display = 'none';
        elements.otherPackagesInfo.style.display = 'none';
        elements.massage.style.display = 'none';
        elements.durationA.style.display = 'none';
        elements.durationB.style.display = 'none';
        elements.prenatalMassage.style.display = 'none';
        elements.combinationSelectsWrapper.style.display = 'none';
        elements.differentMassagesSelectsWrapper.style.display = 'none';
        elements.durationAGuest1And2.style.display = 'none';
        elements.facialSelectsWrapper.style.display = 'none';
        elements.facialAddOnGuest1.style.display = 'none';
        elements.facialAddOnGuest2.style.display = 'none';
        elements.bodyTreatmentsSelectsWrapper.style.display = 'none';
        elements.otherServicesInfo.style.display = 'none';

        elements.package.selectedIndex = 0;
        elements.massage.selectedIndex = 0;
        elements.durationA.selectedIndex = 0;
        elements.durationB.selectedIndex = 0;
        elements.prenatalMassage.selectedIndex = 0;
        elements.combinationSelectsWrapper.selectedIndex = 0;
        elements.differentMassagesSelectsWrapper.selectedIndex = 0;
        elements.durationAGuest1And2.selectedIndex = 0;
        elements.facialSelectsWrapper.selectedIndex = 0;
        elements.facialAddOnGuest1.selectedIndex = 0;
        elements.facialAddOnGuest2.selectedIndex = 0;
        elements.bodyTreatmentsSelectsWrapper.selectedIndex = 0;
        elements.otherServicesInfo.selectedIndex = 0;
    }

    // Add event listeners for single services
    for (const id in singleServiceElements) {
        const elements = singleServiceElements[id];
        elements.service.addEventListener('change', function() {
            hideAndResetSingleService(id);
            handleConditionalsSingle(id);
        });
        elements.package.addEventListener('change', function() {
            hideAndResetSingleService(id);
            handleConditionalsSingle(id);
        });
        elements.massage.addEventListener('change', function() {
            hideAndResetSingleService(id);
            handleConditionalsSingle(id);
        });
        elements.facial.addEventListener('change', function() {
            hideAndResetSingleService(id);
            handleConditionalsSingle(id);
        });
    }

    // Add event listeners for couple services
    for (const id in coupleServiceElements) {
        const elements = coupleServiceElements[id];
        elements.service.addEventListener('change', function() {
            hideAndResetCoupleService(id);
            handleConditionalsCouple(id);
        });
        elements.package.addEventListener('change', function() {
            hideAndResetCoupleService(id);
            handleConditionalsCouple(id);
        });
        elements.massage.addEventListener('change', function() {
            hideAndResetCoupleService(id);
            handleConditionalsCouple(id);
        });
    }

    // Conditional handling functions
    function handleConditionalsSingle(id) {
        const elements = singleServiceElements[id];
        const singleServiceValue = elements.service.value;

        if (singleServiceValue === 'Package') {
            elements.package.style.display = 'block';
        } else if (singleServiceValue === 'Massage') {
            elements.massage.style.display = 'block';
        } else if (singleServiceValue === 'Facial') {
            elements.facial.style.display = 'block';
        } else if (singleServiceValue === 'Body treatment') {
            elements.bodyTreatment.style.display = 'block';
        } else if (singleServiceValue === 'Wax') {
            elements.waxInfo.style.display = 'block';
        } else if (singleServiceValue === 'Multiple services') {
            elements.multipleServicesInfo.style.display = 'block';
        }

        const singlePackageValue = elements.package.value;
        if (singlePackageValue === 'Spa del Sol Dream') {
            elements.spaDelSolDreamInfo.style.display = 'block';
        }

        const singleMassageValue = elements.massage.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(singleMassageValue)) {
            elements.durationA.style.display = 'block';
        } else if (singleMassageValue === 'Reflexology') {
            elements.durationB.style.display = 'block';
        } else if (singleMassageValue === 'Relaxing Combination') {
            elements.combination.style.display = 'block';
        }

        const singleFacialValue = elements.facial.value;
        if (singleFacialValue === 'Sol Janssen') {
            elements.addOn.style.display = 'block';
        }
    }

    function handleConditionalsCouple(id) {
        const elements = coupleServiceElements[id];
        const coupleServiceValue = elements.service.value;

        if (coupleServiceValue === 'Package') {
            elements.package.style.display = 'block';
        } else if (coupleServiceValue === 'Massage') {
            elements.massage.style.display = 'block';
        } else if (coupleServiceValue === 'Facial') {
            elements.facialSelectsWrapper.style.display = 'grid';
        } else if (coupleServiceValue === 'Body treatment') {
            elements.bodyTreatmentsSelectsWrapper.style.display = 'grid';
        } else if (coupleServiceValue === 'Other') {
            elements.otherServicesInfo.style.display = 'block';
        }

        const couplePackageValue = elements.package.value;
        if (couplePackageValue === '2x Spa del Sol Dream') {
            elements.spaDelSolDreamInfo.style.display = 'block';
        } else if (couplePackageValue === 'Two different packages') {
            elements.otherPackagesInfo.style.display = 'block';
        }

        const coupleMassageValue = elements.massage.value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(coupleMassageValue)) {
            elements.durationA.style.display = 'block';
        } else if (coupleMassageValue === 'Reflexology') {
            elements.durationB.style.display = 'block';
        } else if (coupleMassageValue === 'Prenatal and other') {
            elements.prenatalMassage.style.display = 'block';
        } else if (coupleMassageValue === 'Relaxing Combination') {
            elements.combinationSelectsWrapper.style.display = 'grid';
        } else if (coupleMassageValue === 'Two different types') {
            elements.differentMassagesSelectsWrapper.style.display = 'grid';
        }

        const massageGuest1Value = document.getElementById('Massage-Guest-1-Couple' + id).value;
        const massageGuest2Value = document.getElementById('Massage-Guest-2-Couple' + id).value;
        if (massageGuest1Value !== '' && massageGuest2Value !== '') {
            elements.durationAGuest1And2.style.display = 'block';
        }

        const facialGuest1Value = document.getElementById('Facial-Guest-1-Couple' + id).value;
        if (facialGuest1Value === 'Sol Janssen') {
            elements.facialAddOnGuest1.style.display = 'block';
        }

        const facialGuest2Value = document.getElementById('Facial-Guest-2-Couple' + id).value;
        if (facialGuest2Value === 'Sol Janssen') {
            elements.facialAddOnGuest2.style.display = 'block';
        }
    }

    // Initial setup
    for (const id in singleServiceElements) {
        hideAndResetSingleService(id);
    }

    for (const id in coupleServiceElements) {
        hideAndResetCoupleService(id);
    }
});
