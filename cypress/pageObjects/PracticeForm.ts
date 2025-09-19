// cypress/pageObjects/PracticeForm.ts
import { faker } from '@faker-js/faker';

type Gender = 'Male' | 'Female' | 'Other';

export class PracticeFormPage {
    // Keep a snapshot of what we filled, for exact assertions
    private snapshot = {
        first: '',
        last: '',
        email: '',
        gender: '' as Gender | '',
        mobile: '',
        subject: '',
        hobby: '',
        picture: 'sampleImage.jpg',
        address: '',
        state: 'NCR',
        city: 'Delhi',
    };


    typeFirstName(v: string): void {
        this.snapshot.first = v;
        cy.get('#firstName').should('be.visible').clear().type(v);
    }

    typeLastName(v: string): void {
        this.snapshot.last = v;
        cy.get('#lastName').should('be.visible').clear().type(v);
    }

    typeEmail(v: string): void {
        this.snapshot.email = v;
        cy.get('#userEmail').should('be.visible').clear().type(v);
    }

    selectGender(v: Gender): void {
        this.snapshot.gender = v;
        cy.contains('label.custom-control-label', v).should('be.visible').click({ force: true });
    }

    typeMobile(v: string): void {
        this.snapshot.mobile = v;
        cy.get('#userNumber').should('be.visible').clear().type(v);
    }


    selectAnySubjectByTypingA(): void {
        cy.get('#subjectsInput').should('be.visible').type('a');

        cy.get('.subjects-auto-complete__menu', { timeout: 10000 })
            .should('be.visible')
            .find('.subjects-auto-complete__option')
            .first()
            .click();

        // Guard + capture the chosen subject text from the chip
        cy.get('#subjectsContainer')
            .find('.subjects-auto-complete__multi-value__label')
            .first()
            .should('be.visible')
            .invoke('text')
            .then((t) => {
                this.snapshot.subject = t.trim();
            });
    }

    checkHobby(label: 'Sports' | 'Reading' | 'Music'): void {
        this.snapshot.hobby = label;
        cy.contains('label.custom-control-label', label).should('be.visible').click({ force: true });
    }

    uploadPictureFrom(relPath: string): void {
        // keep snapshot.picture as the displayed filename (no path)
        cy.get('#uploadPicture').should('exist').selectFile(relPath, { force: true });
    }

    // robust against overlays/ads
    typeCurrentAddress(v: string): void {
        this.snapshot.address = v;
        cy.get('#currentAddress')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
            .clear({ force: true })
            .type(v, { force: true });
    }

    // boxed selects: NCR then Delhi, with guards
    selectStateNCR(): void {
        cy.get('#state').should('be.visible').click();
        cy.get('#react-select-3-input').type('NCR{enter}');
        cy.get('#state').should('contain.text', 'NCR'); // guard
        this.snapshot.state = 'NCR';
    }

    selectCityDelhi(): void {
        cy.get('#city').should('be.visible').click();
        cy.get('#react-select-4-input').type('Delhi{enter}');
        cy.get('#city').should('contain.text', 'Delhi'); // guard
        this.snapshot.city = 'Delhi';
    }

    // LAST action
    submit(): void {
        cy.get('#submit').scrollIntoView().should('be.visible').click({ force: true });
    }

    verifySubmissionVisible(): void {
        cy.get('.modal-content').should('be.visible');
    }

    private assertSubmissionRow(label: string, expected: string | RegExp): void {
        // Find the row by the left-hand label and assert the right-hand value
        cy.get('.modal-content .table-responsive table tbody tr')
            .contains('td', label)
            .parent('tr')
            .within(() => {
                cy.get('td').eq(1).should('contain.text', ''); // ensure value cell exists
                if (expected instanceof RegExp) {
                    cy.get('td').eq(1).invoke('text').should((txt) => {
                        expect(txt.trim()).to.match(expected);
                    });
                } else {
                    cy.get('td').eq(1).should('contain.text', expected);
                }
            });
    }

    // Assert all values shown match what we provided
    verifySubmissionMatchesSnapshot(): void {
        const fullName = `${this.snapshot.first} ${this.snapshot.last}`;

        this.assertSubmissionRow('Student Name', fullName);
        this.assertSubmissionRow('Student Email', this.snapshot.email);
        this.assertSubmissionRow('Gender', this.snapshot.gender);
        this.assertSubmissionRow('Mobile', this.snapshot.mobile);
        this.assertSubmissionRow('Subjects', this.snapshot.subject);
        this.assertSubmissionRow('Hobbies', this.snapshot.hobby);
        this.assertSubmissionRow('Picture', this.snapshot.picture);
        this.assertSubmissionRow('Address', this.snapshot.address);

        // "State and City" is shown together, e.g., "NCR Delhi"
        // accept either "NCR Delhi" or "NCR, Delhi" just in case
        const stateCityRegex = new RegExp(`${this.snapshot.state}.*${this.snapshot.city}`);
        this.assertSubmissionRow('State and City', stateCityRegex);
    }

    // ========== high-level flow using your latest rules ==========
    fillWithFakerThenSubmit(): void {
        const first = faker.person.firstName();
        const last = faker.person.lastName();
        const email = faker.internet.email({ firstName: first, lastName: last });
        const mobile = faker.string.numeric({ length: 10 });
        const address = `${faker.location.streetAddress()}, ${faker.location.city()}`;

        this.typeFirstName(first);
        this.typeLastName(last);
        this.typeEmail(email);
        this.selectGender('Male');
        this.typeMobile(mobile);

        // SUBJECT: type "a" and pick the first option
        this.selectAnySubjectByTypingA();

        // HOBBY: Music
        this.checkHobby('Music');

        // PICTURE: put this file in cypress/fixtures/
        this.uploadPictureFrom('cypress/fixtures/sampleImage.jpg');

        // ADDRESS
        this.typeCurrentAddress(address);

        // STATE/CITY
        this.selectStateNCR();
        this.selectCityDelhi();

        // submit at the end
        this.submit();

        // verify modal and all values
        this.verifySubmissionVisible();
        this.verifySubmissionMatchesSnapshot();
    }

    submitEmptyAndAssertRequireds(): void {
        // click submit first
        cy.get('#submit')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        // First Name required & invalid
        cy.get('#firstName').then(($el) => {
            const el = $el[0] as HTMLInputElement;
            expect(el.required, 'firstName has required').to.be.true;
            expect(el.checkValidity(), 'firstName validity').to.be.false;
            expect(el.validationMessage, 'firstName validation message').to.not.equal('');
        });

        // Last Name required & invalid
        cy.get('#lastName').then(($el) => {
            const el = $el[0] as HTMLInputElement;
            expect(el.required, 'lastName has required').to.be.true;
            expect(el.checkValidity(), 'lastName validity').to.be.false;
            expect(el.validationMessage, 'lastName validation message').to.not.equal('');
        });

        // Gender radio group required & invalid
        cy.get('input[name="gender"]').then(($radios) => {
            const firstRadio = $radios[0] as HTMLInputElement;
            expect(firstRadio.required, 'gender has required').to.be.true;
        });
        cy.get('input[name="gender"]:invalid').should('have.length.greaterThan', 0);

        // Mobile required & invalid
        cy.get('#userNumber').then(($el) => {
            const el = $el[0] as HTMLInputElement;
            expect(el.required, 'mobile has required').to.be.true;
            expect(el.checkValidity(), 'mobile validity').to.be.false;
            expect(el.validationMessage, 'mobile validation message').to.not.equal('');
        });

    }
}
