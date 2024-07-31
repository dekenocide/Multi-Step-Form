document.addEventListener('DOMContentLoaded', function() {
    // Step Navigation
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

    const hierarchicalSteps = {
        'step-1': { next: 'step-2' },
        'step-2': { next: 'step-3', prev: 'step-1' },
        'step-3': { next: 'step-4', prev: 'step-2' },
        'step-4': { next: 'step-5', prev: 'step-3' },
        'step-5': { next: 'step-6', prev: 'step-4' },
        'step-6': { next: 'step-7', prev: 'step-5' },
        'step-7': { next: 'step-8', prev: 'step-6' },
        'step-8': { prev: 'step-7' },
        'step-9': { prev: 'step-8' }
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
            if (input.style.display !== 'none' && input.required && input.value.trim() === "") {
                return false;
            }
        }
        return true;
    }

    function resetFields(fields) {
        fields.forEach(id => {
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
    }

    const singleServiceFields = [
        'Package-Single', 'Spa-del-Sol-Dream-Info-Single', 'Massage-Single',
        'Duration-A-Single', 'Duration-B-Single', 'Combination-Single',
        'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single', 'Wax-Info-Single',
        'Multiple-Services-Info-Single'
    ];

    const singleServiceFieldsCopies = [
        'Package-Single-1', 'Spa-del-Sol-Dream-Info-Single-1', 'Massage-Single-1',
        'Duration-A-Single-1', 'Duration-B-Single-1', 'Combination-Single-1',
        'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1', 'Wax-Info-Single-1',
        'Multiple-Services-Info-Single-1',
        'Package-Single-2', 'Spa-del-Sol-Dream-Info-Single-2', 'Massage-Single-2',
        'Duration-A-Single-2', 'Duration-B-Single-2', 'Combination-Single-2',
        'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2', 'Wax-Info-Single-2',
        'Multiple-Services-Info-Single-2',
        'Package-Single-3', 'Spa-del-Sol-Dream-Info-Single-3', 'Massage-Single-3',
        'Duration-A-Single-3', 'Duration-B-Single-3', 'Combination-Single-3',
        'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3', 'Wax-Info-Single-3',
        'Multiple-Services-Info-Single-3'
    ];

    const coupleServiceFields = [
        'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Other-Packages-Info-Couple',
        'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Prenatal-Massage-Couple',
        'Combination-Selects-Wrapper-Couple', 'Different-Massages-Selects-Wrapper-Couple',
        'Duration-A-Guest-1-And-2-Couple', 'Facial-Selects-Wrapper-Couple',
        'Facial-Add-On-Guest-1-Couple', 'Facial-Add-On-Guest-2-Couple',
        'Body-Treatments-Selects-Wrapper-Couple', 'Other-Services-Info-Couple'
    ];

    const coupleServiceFieldsCopies = [
        'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1', 'Other-Packages-Info-Couple-1',
        'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Prenatal-Massage-Couple-1',
        'Combination-Selects-Wrapper-Couple-1', 'Different-Massages-Selects-Wrapper-Couple-1',
        'Duration-A-Guest-1-And-2-Couple-1', 'Facial-Selects-Wrapper-Couple-1',
        'Facial-Add-On-Guest-1-Couple-1', 'Facial-Add-On-Guest-2-Couple-1',
        'Body-Treatments-Selects-Wrapper-Couple-1', 'Other-Services-Info-Couple-1',
        'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Other-Packages-Info-Couple-2',
        'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Prenatal-Massage-Couple-2',
        'Combination-Selects-Wrapper-Couple-2', 'Different-Massages-Selects-Wrapper-Couple-2',
        'Duration-A-Guest-1-And-2-Couple-2', 'Facial-Selects-Wrapper-Couple-2',
        'Facial-Add-On-Guest-1-Couple-2', 'Facial-Add-On-Guest-2-Couple-2',
        'Body-Treatments-Selects-Wrapper-Couple-2', 'Other-Services-Info-Couple-2',
        'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3', 'Other-Packages-Info-Couple-3',
        'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Prenatal-Massage-Couple-3',
        'Combination-Selects-Wrapper-Couple-3', 'Different-Massages-Selects-Wrapper-Couple-3',
        'Duration-A-Guest-1-And-2-Couple-3', 'Facial-Selects-Wrapper-Couple-3',
        'Facial-Add-On-Guest-1-Couple-3', 'Facial-Add-On-Guest-2-Couple-3',
        'Body-Treatments-Selects-Wrapper-Couple-3', 'Other-Services-Info-Couple-3'
    ];

    function handleServiceChange(serviceType) {
        if (serviceType.startsWith('Service-Single')) {
            resetFields(singleServiceFields);
            resetFields(singleServiceFieldsCopies);
            document.getElementById(serviceType).style.display = 'block';
        } else if (serviceType.startsWith('Service-Couple')) {
            resetFields(coupleServiceFields);
            resetFields(coupleServiceFieldsCopies);
            document.getElementById(serviceType).style.display = 'block';
        }
    }

    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep = hierarchicalSteps[currentStep]?.next || currentStep;
            showStep(currentStep);
        } else {
            alert('Please fill out all required fields before proceeding.');
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentStep === 'step-8') {
            resetFields(singleServiceFields);
            resetFields(singleServiceFieldsCopies);
            resetFields(coupleServiceFields);
            resetFields(coupleServiceFieldsCopies);
        }
        currentStep = hierarchicalSteps[currentStep]?.prev || currentStep;
        showStep(currentStep);
    });

    document.querySelectorAll('.service-single').forEach(el => {
        el.addEventListener('change', function() {
            handleServiceChange(this.id);
        });
    });

    document.querySelectorAll('.service-couple').forEach(el => {
        el.addEventListener('change', function() {
            handleServiceChange(this.id);
        });
    });

    showStep(currentStep);

    // Show step-8 template script
    const numberOfGuestsSelect = document.getElementById('Number-of-Guests');
    const guestArrangementSelects = [
        document.getElementById('2-Guest-Arrangement'),
        document.getElementById('3-Guest-Arrangement'),
        document.getElementById('4-Guest-Arrangement'),
        document.getElementById('5-Guest-Arrangement'),
        document.getElementById('6-Guest-Arrangement')
    ];
    const templates = {
        'Single': document.getElementById('Single'),
        'Single-1': document.getElementById('Single-1'),
        'Single-2': document.getElementById('Single-2'),
        'Single-3': document.getElementById('Single-3'),
        'Couple': document.getElementById('Couple'),
        'Couple-1': document.getElementById('Couple-1'),
        'Couple-2': document.getElementById('Couple-2'),
        'Couple-3': document.getElementById('Couple-3')
    };

    function hideAllTemplates() {
        Object.values(templates).forEach(template => {
            template.style.display = 'none';
        });
    }

    function handleTemplateVisibility() {
        hideAllTemplates();
        const numberOfGuestsValue = numberOfGuestsSelect.value;
        if (numberOfGuestsValue === '1') {
            templates['Single'].style.display = 'block';
        } else if (numberOfGuestsValue === '2') {
            const guestArrangementValue = guestArrangementSelects[0].value;
            if (guestArrangementValue === '1-Couple') {
                templates['Couple'].style.display = 'block';
            } else if (guestArrangementValue === '2-Singles') {
                templates['Single-1'].style.display = 'block';
                templates['Single-2'].style.display = 'block';
            }
        } else if (numberOfGuestsValue === '3') {
            const guestArrangementValue = guestArrangementSelects[1].value;
            if (guestArrangementValue === '1-Couple-1-Single') {
                templates['Couple'].style.display = 'block';
                templates['Single'].style.display = 'block';
            } else if (guestArrangementValue === '3-Singles') {
                templates['Single-1'].style.display = 'block';
                templates['Single-2'].style.display = 'block';
                templates['Single-3'].style.display = 'block';
            }
        } else if (numberOfGuestsValue === '4') {
            const guestArrangementValue = guestArrangementSelects[2].value;
            if (guestArrangementValue === '2-Couples') {
                templates['Couple-1'].style.display = 'block';
                templates['Couple-2'].style.display = 'block';
            } else if (guestArrangementValue === '1-Couple-2-Singles') {
                templates['Couple'].style.display = 'block';
                templates['Single-1'].style.display = 'block';
                templates['Single-2'].style.display = 'block';
            }
        } else if (numberOfGuestsValue === '5') {
            const guestArrangementValue = guestArrangementSelects[3].value;
            if (guestArrangementValue === '2-Couples-1-Single') {
                templates['Couple-1'].style.display = 'block';
                templates['Couple-2'].style.display = 'block';
                templates['Single'].style.display = 'block';
            } else if (guestArrangementValue === '1-Couple-3-Singles') {
                templates['Couple'].style.display = 'block';
                templates['Single-1'].style.display = 'block';
                templates['Single-2'].style.display = 'block';
                templates['Single-3'].style.display = 'block';
            }
        } else if (numberOfGuestsValue === '6') {
            const guestArrangementValue = guestArrangementSelects[4].value;
            if (guestArrangementValue === '3-Couples') {
                templates['Couple-1'].style.display = 'block';
                templates['Couple-2'].style.display = 'block';
                templates['Couple-3'].style.display = 'block';
            } else if (guestArrangementValue === '2-Couples-2-Singles') {
                templates['Couple-1'].style.display = 'block';
                templates['Couple-2'].style.display = 'block';
                templates['Single-1'].style.display = 'block';
                templates['Single-2'].style.display = 'block';
            }
        }
    }

    numberOfGuestsSelect.addEventListener('change', function() {
        hideAllTemplates();
        handleTemplateVisibility();
    });

    guestArrangementSelects.forEach(select => {
        select.addEventListener('change', function() {
            handleTemplateVisibility();
        });
    });

    hideAllTemplates();

    // Number of Guests conditionals
    const guestArrangementLabel = document.getElementById('Guest-Arrangement-Label');
    function hideAllGuestArrangements() {
        guestArrangementLabel.style.display = 'none';
        guestArrangementSelects.forEach(select => {
            select.style.display = 'none';
        });
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
                guestArrangementSelects.forEach(select => {
                    resetField(select);
                });
                hideAllGuestArrangements();
                break;
        }
    }

    function handleGuestArrangements() {
        hideAllGuestArrangements();
        const numberOfGuestsValue = numberOfGuestsSelect.value;
        if (numberOfGuestsValue >= '2' && numberOfGuestsValue <= '6') {
            guestArrangementLabel.style.display = 'block';
            guestArrangementSelects[numberOfGuestsValue - 2].style.display = 'block';
        }
    }

    numberOfGuestsSelect.addEventListener('change', function() {
        resetAndHideChildren(this);
        handleGuestArrangements();
    });

    hideAllGuestArrangements();

    // Services conditionals script
    function handleConditionals(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId) {
        resetFields([
            packageId, spaId, massageId, durationAId, durationBId, combinationId,
            facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId
        ]);

        const serviceValue = document.getElementById(serviceId).value;
        if (serviceValue === 'Package') {
            document.getElementById(packageId).style.display = 'block';
        } else if (serviceValue === 'Massage') {
            document.getElementById(massageId).style.display = 'block';
        } else if (serviceValue === 'Facial') {
            document.getElementById(facialId).style.display = 'block';
        } else if (serviceValue === 'Body treatment') {
            document.getElementById(bodyTreatmentId).style.display = 'block';
        } else if (serviceValue === 'Wax') {
            document.getElementById(waxId).style.display = 'block';
        } else if (serviceValue === 'Multiple services') {
            document.getElementById(multipleServicesId).style.display = 'block';
        }

        const packageValue = document.getElementById(packageId).value;
        if (packageValue === 'Spa del Sol Dream') {
            document.getElementById(spaId).style.display = 'block';
        }

        const massageValue = document.getElementById(massageId).value;
        if (['Relaxing', 'Aromatherapy', 'Deep Tissue', 'Hot Stones', 'Bamboo', 'Therapeutic', 'Lomi Lomi', 'Shiatsu'].includes(massageValue)) {
            document.getElementById(durationAId).style.display = 'block';
        } else if (massageValue === 'Reflexology') {
            document.getElementById(durationBId).style.display = 'block';
        } else if (massageValue === 'Relaxing Combination') {
            document.getElementById(combinationId).style.display = 'block';
        }

        const facialValue = document.getElementById(facialId).value;
        if (facialValue === 'Sol Janssen') {
            document.getElementById(addOnId).style.display = 'block';
        }
    }

    function addChangeEventListener(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId) {
        document.getElementById(serviceId).addEventListener('change', function() {
            handleConditionals(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId);
        });

        document.getElementById(packageId).addEventListener('change', function() {
            handleConditionals(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId);
        });

        document.getElementById(massageId).addEventListener('change', function() {
            handleConditionals(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId);
        });

        document.getElementById(facialId).addEventListener('change', function() {
            handleConditionals(serviceId, packageId, spaId, massageId, durationAId, durationBId, combinationId, facialId, addOnId, bodyTreatmentId, waxId, multipleServicesId);
        });
    }

    addChangeEventListener('Service-Single', 'Package-Single', 'Spa-del-Sol-Dream-Info-Single', 'Massage-Single', 'Duration-A-Single', 'Duration-B-Single', 'Combination-Single', 'Facial-Single', 'Add-On-Single', 'Body-Treatment-Single', 'Wax-Info-Single', 'Multiple-Services-Info-Single');
    addChangeEventListener('Service-Single-1', 'Package-Single-1', 'Spa-del-Sol-Dream-Info-Single-1', 'Massage-Single-1', 'Duration-A-Single-1', 'Duration-B-Single-1', 'Combination-Single-1', 'Facial-Single-1', 'Add-On-Single-1', 'Body-Treatment-Single-1', 'Wax-Info-Single-1', 'Multiple-Services-Info-Single-1');
    addChangeEventListener('Service-Single-2', 'Package-Single-2', 'Spa-del-Sol-Dream-Info-Single-2', 'Massage-Single-2', 'Duration-A-Single-2', 'Duration-B-Single-2', 'Combination-Single-2', 'Facial-Single-2', 'Add-On-Single-2', 'Body-Treatment-Single-2', 'Wax-Info-Single-2', 'Multiple-Services-Info-Single-2');
    addChangeEventListener('Service-Single-3', 'Package-Single-3', 'Spa-del-Sol-Dream-Info-Single-3', 'Massage-Single-3', 'Duration-A-Single-3', 'Duration-B-Single-3', 'Combination-Single-3', 'Facial-Single-3', 'Add-On-Single-3', 'Body-Treatment-Single-3', 'Wax-Info-Single-3', 'Multiple-Services-Info-Single-3');

    addChangeEventListener('Service-Couple', 'Package-Couple', 'Spa-Del-Sol-Dream-Info-Couple', 'Massage-Couple', 'Duration-A-Couple', 'Duration-B-Couple', 'Combination-Selects-Wrapper-Couple', 'Facial-Selects-Wrapper-Couple', 'Facial-Add-On-Guest-1-Couple', 'Body-Treatments-Selects-Wrapper-Couple', 'Wax-Info-Couple', 'Multiple-Services-Info-Couple');
    addChangeEventListener('Service-Couple-1', 'Package-Couple-1', 'Spa-Del-Sol-Dream-Info-Couple-1', 'Massage-Couple-1', 'Duration-A-Couple-1', 'Duration-B-Couple-1', 'Combination-Selects-Wrapper-Couple-1', 'Facial-Selects-Wrapper-Couple-1', 'Facial-Add-On-Guest-1-Couple-1', 'Body-Treatments-Selects-Wrapper-Couple-1', 'Wax-Info-Couple-1', 'Multiple-Services-Info-Couple-1');
    addChangeEventListener('Service-Couple-2', 'Package-Couple-2', 'Spa-Del-Sol-Dream-Info-Couple-2', 'Massage-Couple-2', 'Duration-A-Couple-2', 'Duration-B-Couple-2', 'Combination-Selects-Wrapper-Couple-2', 'Facial-Selects-Wrapper-Couple-2', 'Facial-Add-On-Guest-1-Couple-2', 'Body-Treatments-Selects-Wrapper-Couple-2', 'Wax-Info-Couple-2', 'Multiple-Services-Info-Couple-2');
    addChangeEventListener('Service-Couple-3', 'Package-Couple-3', 'Spa-Del-Sol-Dream-Info-Couple-3', 'Massage-Couple-3', 'Duration-A-Couple-3', 'Duration-B-Couple-3', 'Combination-Selects-Wrapper-Couple-3', 'Facial-Selects-Wrapper-Couple-3', 'Facial-Add-On-Guest-1-Couple-3', 'Body-Treatments-Selects-Wrapper-Couple-3', 'Wax-Info-Couple-3', 'Multiple-Services-Info-Couple-3');

    hideAllTemplates();
    hideAllGuestArrangements();
    resetFields(singleServiceFields);
    resetFields(singleServiceFieldsCopies);
    resetFields(coupleServiceFields);
    resetFields(coupleServiceFieldsCopies);
});
