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

    addChangeEventListener('Service-Couple', handleConditionals);
    addChangeEventListener('Package-Couple', handleConditionals);
    addChangeEventListener('Massage-Couple', handleConditionals);
    addChangeEventListener('Massage-Guest-1-Couple', handleConditionals);
    addChangeEventListener('Massage-Guest-2-Couple', handleConditionals);
    addChangeEventListener('Facial-Guest-1-Couple', handleConditionals);
    addChangeEventListener('Facial-Guest-2-Couple', handleConditionals);

    // Initial setup
    hideAllConditionals();
});
