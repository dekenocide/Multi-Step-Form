document.addEventListener('DOMContentLoaded', function() {
    // Single Service Conditional fields (Original)
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

    // Single Service Conditional fields (Copy 1)
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

    // Single Service Conditional fields (Copy 2)
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

    // Couple Service Conditional fields (Original)
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

    // Couple Service Conditional fields (Copy 1)
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

    // Couple Service Conditional fields (Copy 2)
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

    // Hide all single service conditional fields initially
    function hideAllSingleConditionals() {
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
    }

    // Hide all couple service conditional fields initially
    function hideAllCoupleConditionals() {
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
    }

    // Reset a specific single service field
    function resetSingleField(field) {
        if (field) {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
                field.value = '';
            }
        }
    }

    // Reset a specific couple service field
    function resetCoupleField(field) {
        if (field) {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
                field.value = '';
            }
        }
    }

    // Function to reset and hide children conditionals for single service fields
    function resetAndHideChildrenSingle(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Single':
                resetSingleField(singlePackage);
                resetSingleField(spaDelSolDreamInfo);
                resetSingleField(singleMassage);
                resetSingleField(massageDurationA);
                resetSingleField(massageDurationB);
                resetSingleField(combinationType);
                resetSingleField(singleFacial);
                resetSingleField(facialAddOn);
                resetSingleField(bodyTreatment);
                resetSingleField(waxInfo);
                resetSingleField(multipleServicesInfo);
                break;

            case 'Package-Single':
                resetSingleField(spaDelSolDreamInfo);
                break;

            case 'Massage-Single':
                resetSingleField(massageDurationA);
                resetSingleField(massageDurationB);
                resetSingleField(combinationType);
                break;

            case 'Facial-Single':
                resetSingleField(facialAddOn);
                break;

            case 'Service-Single-1':
                resetSingleField(singlePackage1);
                resetSingleField(spaDelSolDreamInfo1);
                resetSingleField(singleMassage1);
                resetSingleField(massageDurationA1);
                resetSingleField(massageDurationB1);
                resetSingleField(combinationType1);
                resetSingleField(singleFacial1);
                resetSingleField(facialAddOn1);
                resetSingleField(bodyTreatment1);
                resetSingleField(waxInfo1);
                resetSingleField(multipleServicesInfo1);
                break;

            case 'Package-Single-1':
                resetSingleField(spaDelSolDreamInfo1);
                break;

            case 'Massage-Single-1':
                resetSingleField(massageDurationA1);
                resetSingleField(massageDurationB1);
                resetSingleField(combinationType1);
                break;

            case 'Facial-Single-1':
                resetSingleField(facialAddOn1);
                break;

            case 'Service-Single-2':
                resetSingleField(singlePackage2);
                resetSingleField(spaDelSolDreamInfo2);
                resetSingleField(singleMassage2);
                resetSingleField(massageDurationA2);
                resetSingleField(massageDurationB2);
                resetSingleField(combinationType2);
                resetSingleField(singleFacial2);
                resetSingleField(facialAddOn2);
                resetSingleField(bodyTreatment2);
                resetSingleField(waxInfo2);
                resetSingleField(multipleServicesInfo2);
                break;

            case 'Package-Single-2':
                resetSingleField(spaDelSolDreamInfo2);
                break;

            case 'Massage-Single-2':
                resetSingleField(massageDurationA2);
                resetSingleField(massageDurationB2);
                resetSingleField(combinationType2);
                break;

            case 'Facial-Single-2':
                resetSingleField(facialAddOn2);
                break;
        }
    }

    // Function to reset and hide children conditionals for couple service fields
    function resetAndHideChildrenCouple(parentSelect) {
        switch (parentSelect.id) {
            case 'Service-Couple':
                resetCoupleField(couplePackage);
                resetCoupleField(spaDelSolDreamInfoCouple);
                resetCoupleField(otherPackagesInfoCouple);
                resetCoupleField(coupleMassage);
                resetCoupleField(massageDurationACouple);
                resetCoupleField(massageDurationBCouple);
                resetCoupleField(prenatalMassageCouple);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple'));
                resetCoupleField(durationAGuest1And2Couple);
                resetCoupleField(document.getElementById('Facial-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Facial-Guest-2-Couple'));
                resetCoupleField(facialAddOnGuest1Couple);
                resetCoupleField(facialAddOnGuest2Couple);
                resetCoupleField(document.getElementById('Body-Treatment-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Body-Treatment-Guest-2-Couple'));
                resetCoupleField(otherServicesInfoCouple);
                break;

            case 'Package-Couple':
                resetCoupleField(spaDelSolDreamInfoCouple);
                resetCoupleField(otherPackagesInfoCouple);
                break;

            case 'Massage-Couple':
                resetCoupleField(massageDurationACouple);
                resetCoupleField(massageDurationBCouple);
                resetCoupleField(prenatalMassageCouple);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple'));
                resetCoupleField(durationAGuest1And2Couple);
                break;

            case 'Facial-Guest-1-Couple':
                resetCoupleField(facialAddOnGuest1Couple);
                break;

            case 'Facial-Guest-2-Couple':
                resetCoupleField(facialAddOnGuest2Couple);
                break;

            case 'Service-Couple-1':
                resetCoupleField(couplePackage1);
                resetCoupleField(spaDelSolDreamInfoCouple1);
                resetCoupleField(otherPackagesInfoCouple1);
                resetCoupleField(coupleMassage1);
                resetCoupleField(massageDurationACouple1);
                resetCoupleField(massageDurationBCouple1);
                resetCoupleField(prenatalMassageCouple1);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple-1'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple-1'));
                resetCoupleField(durationAGuest1And2Couple1);
                resetCoupleField(document.getElementById('Facial-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Facial-Guest-2-Couple-1'));
                resetCoupleField(facialAddOnGuest1Couple1);
                resetCoupleField(facialAddOnGuest2Couple1);
                resetCoupleField(document.getElementById('Body-Treatment-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Body-Treatment-Guest-2-Couple-1'));
                resetCoupleField(otherServicesInfoCouple1);
                break;

            case 'Package-Couple-1':
                resetCoupleField(spaDelSolDreamInfoCouple1);
                resetCoupleField(otherPackagesInfoCouple1);
                break;

            case 'Massage-Couple-1':
                resetCoupleField(massageDurationACouple1);
                resetCoupleField(massageDurationBCouple1);
                resetCoupleField(prenatalMassageCouple1);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple-1'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple-1'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple-1'));
                resetCoupleField(durationAGuest1And2Couple1);
                break;

            case 'Facial-Guest-1-Couple-1':
                resetCoupleField(facialAddOnGuest1Couple1);
                break;

            case 'Facial-Guest-2-Couple-1':
                resetCoupleField(facialAddOnGuest2Couple1);
                break;

            case 'Service-Couple-2':
                resetCoupleField(couplePackage2);
                resetCoupleField(spaDelSolDreamInfoCouple2);
                resetCoupleField(otherPackagesInfoCouple2);
                resetCoupleField(coupleMassage2);
                resetCoupleField(massageDurationACouple2);
                resetCoupleField(massageDurationBCouple2);
                resetCoupleField(prenatalMassageCouple2);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple-2'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple-2'));
                resetCoupleField(durationAGuest1And2Couple2);
                resetCoupleField(document.getElementById('Facial-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Facial-Guest-2-Couple-2'));
                resetCoupleField(facialAddOnGuest1Couple2);
                resetCoupleField(facialAddOnGuest2Couple2);
                resetCoupleField(document.getElementById('Body-Treatment-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Body-Treatment-Guest-2-Couple-2'));
                resetCoupleField(otherServicesInfoCouple2);
                break;

            case 'Package-Couple-2':
                resetCoupleField(spaDelSolDreamInfoCouple2);
                resetCoupleField(otherPackagesInfoCouple2);
                break;

            case 'Massage-Couple-2':
                resetCoupleField(massageDurationACouple2);
                resetCoupleField(massageDurationBCouple2);
                resetCoupleField(prenatalMassageCouple2);
                resetCoupleField(document.getElementById('Combination-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Combination-Guest-2-Couple-2'));
                resetCoupleField(document.getElementById('Massage-Guest-1-Couple-2'));
                resetCoupleField(document.getElementById('Massage-Guest-2-Couple-2'));
                resetCoupleField(durationAGuest1And2Couple2);
                break;

            case 'Facial-Guest-1-Couple-2':
                resetCoupleField(facialAddOnGuest1Couple2);
                break;

            case 'Facial-Guest-2-Couple-2':
                resetCoupleField(facialAddOnGuest2Couple2);
                break;
        }
    }

    // Show/hide and reset conditionals based on selected values for single service
    function handleConditionalsSingle() {
        hideAllSingleConditionals();

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

    // Show/hide and reset conditionals based on selected values for couple service
    function handleConditionalsCouple() {
        hideAllCoupleConditionals();

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

    // Add change event listeners to all select fields for single service
    function addChangeEventListenerSingle(id, handleChange) {
        document.getElementById(id).addEventListener('change', function() {
            resetAndHideChildrenSingle(this);
            handleChange();
        });
    }

    // Add change event listeners to all select fields for couple service
    function addChangeEventListenerCouple(id, handleChange) {
        document.getElementById(id).addEventListener('change', function() {
            resetAndHideChildrenCouple(this);
            handleChange();
        });
    }

    addChangeEventListenerSingle('Service-Single', handleConditionalsSingle);
    addChangeEventListenerSingle('Package-Single', handleConditionalsSingle);
    addChangeEventListenerSingle('Massage-Single', handleConditionalsSingle);
    addChangeEventListenerSingle('Facial-Single', handleConditionalsSingle);
    addChangeEventListenerSingle('Service-Single-1', handleConditionalsSingle);
    addChangeEventListenerSingle('Package-Single-1', handleConditionalsSingle);
    addChangeEventListenerSingle('Massage-Single-1', handleConditionalsSingle);
    addChangeEventListenerSingle('Facial-Single-1', handleConditionalsSingle);
    addChangeEventListenerSingle('Service-Single-2', handleConditionalsSingle);
    addChangeEventListenerSingle('Package-Single-2', handleConditionalsSingle);
    addChangeEventListenerSingle('Massage-Single-2', handleConditionalsSingle);
    addChangeEventListenerSingle('Facial-Single-2', handleConditionalsSingle);

    addChangeEventListenerCouple('Service-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Package-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-1-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-2-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-1-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-2-Couple', handleConditionalsCouple);
    addChangeEventListenerCouple('Service-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Package-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-1-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-2-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-1-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-2-Couple-1', handleConditionalsCouple);
    addChangeEventListenerCouple('Service-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Package-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-1-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Massage-Guest-2-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-1-Couple-2', handleConditionalsCouple);
    addChangeEventListenerCouple('Facial-Guest-2-Couple-2', handleConditionalsCouple);

    // Initial setup
    hideAllSingleConditionals();
    hideAllCoupleConditionals();
});
