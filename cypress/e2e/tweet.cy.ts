describe("Can create account and create tweet", () => {
  const tweet = "tweet dari cypress" + Math.round(Math.random() * 10);
  it("visits the app root url", () => {
    cy.visit("/");
  });

  it("login account", () => {
    cy.contains("button", "Login").click();
    cy.get("input[placeholder='username']").type("contoh123");
    cy.get("input[placeholder='password']").type("admin12345");
    cy.get('[data-cy="btn-submit-login"]').click();
    cy.get('[data-cy="btn-add-tweet"]').click();
    cy.focused().type(tweet);
    cy.contains("button", "Tweet").click();
    cy.contains("p", tweet);
  });

  it("login account", () => {
    cy.contains("button", "Logout").click();
    cy.contains("a", "Register");
  });
});
