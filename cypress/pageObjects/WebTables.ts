import { faker } from "@faker-js/faker";

export class WebTablesPage {
  // Single user (used by your other test)
  readonly user = {
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 30000, max: 120000 }),
    dept: faker.commerce.department(),
  };

  openAddModal(): void {
    cy.get("#addNewRecordButton").should("be.visible").click();
  }

  fillForm(
    firstName: string,
    lastName: string,
    email: string,
    age: string | number,
    salary: string | number,
    department: string
  ): void {
    cy.get("#firstName").should("be.visible").clear().type(String(firstName));
    cy.get("#lastName").should("be.visible").clear().type(String(lastName));
    cy.get("#userEmail").should("be.visible").clear().type(String(email));
    cy.get("#age").should("be.visible").clear().type(String(age));
    cy.get("#salary").should("be.visible").clear().type(String(salary));
    cy.get("#department").should("be.visible").clear().type(String(department));
  }

  submit(): void {
    cy.get("#submit").should("be.visible").click();
  }

  addUser(): void {
    this.openAddModal();
    this.fillForm(
      this.user.first,
      this.user.last,
      this.user.email,
      this.user.age,
      this.user.salary,
      this.user.dept
    );
    this.submit();
  }

  // Generate & add ONE random user (new data each call)
  addRandomUser(): void {
    const u = {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 30000, max: 120000 }),
      dept: faker.commerce.department(),
    };
    this.openAddModal();
    this.fillForm(u.first, u.last, u.email, u.age, u.salary, u.dept);
    this.submit();
  }

  // Add N random users
  addNRandomUsers(count: number): void {
    for (let i = 0; i < count; i += 1) {
      this.addRandomUser();
    }
  }

  search(term: string): void {
    cy.get("#searchBox").should("be.visible").clear().type(term);
  }

  clearSearch(): void {
    cy.get("#searchBox").should("be.visible").clear();
  }

  verifyRowVisibleByEmail(email: string): void {
    cy.get(".rt-tbody").contains(".rt-td", email).should("be.visible");
  }

  deleteRowByEmail(email: string): void {
    this.search(email);
    cy.contains(".rt-tr-group", email)
      .should("exist")
      .within(() => {
        cy.get('span[title="Delete"], [id^="delete-record-"]').click();
      });
  }

  verifyRowNotPresentByEmail(email: string): void {
    this.search(email);
    cy.get(".rt-tbody").should("not.contain", email);
    cy.get(".rt-noData")
      .should("be.visible")
      .and("have.text", "No rows found")
      .then(() => {
        cy.log("✅ User created was not found");
      });
    this.clearSearch();
  }

  setRowsPerPage(rows: 5 | 10 | 20 | 25 | 50 | 100): void {
    cy.get('select[aria-label="rows per page"]')
      .should("be.visible")
      .select(String(rows));
  }

  verifyCurrentPage(n: number): void {
    cy.get('.-pageJump input[type="number"]').should("have.value", String(n));
  }

  verifyTotalPages(n: number): void {
    cy.get(".-totalPages").should("have.text", String(n));
  }

  nextPage(): void {
    cy.get(".-next .-btn").should("not.be.disabled").click();
  }

  prevPage(): void {
    cy.get(".-previous .-btn").should("not.be.disabled").click();
  }

  verifyHasRowsOnPage(): void {
    cy.get(".rt-tbody .rt-tr-group")
      .filter((_, el) => el.innerText.trim().length > 0)
      .should("have.length.greaterThan", 0);
  }
}
