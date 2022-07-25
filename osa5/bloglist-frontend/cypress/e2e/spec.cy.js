describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "otdot",
      password: "yksikaksikolme123",
    });
    cy.visit("http://localhost:3000");
  });

  it("website loads", function () {
    cy.contains("Login");
  });

  it("logging in with wrong credentials", function () {
    cy.get("#username").type("otdot");
    cy.get("#password").type("asd");
    cy.get("#login-button").click();

    cy.contains("wrong credentials");
  });

  it("logging in with right credentials", function () {
    cy.get("#username").type("otdot");
    cy.get("#password").type("yksikaksikolme123");
    cy.get("#login-button").click();

    cy.contains("add blog");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "otdot",
        password: "yksikaksikolme123",
      });
    });

    it("posting a blog", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("title from cypress");
      cy.get("#url").type("url from cypress");
      cy.get("#add-button").click();
      cy.contains("title: title from cypress");
    });

    describe("when initial blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "beforeEach title from cypress tests",
          url: "www.cypress.com",
        });
        cy.createBlog({
          title: "blog2",
          url: "www.cypress.com",
        });
        cy.createBlog({
          title: "blog3",
          url: "www.cypress.com",
        });
      });

      it("user may like blogs", function () {
        cy.contains("title: beforeEach title from cypress tests")
          .find("button")
          .as("theButton");
        cy.get("@theButton").contains("more").click();
        cy.contains("like").click();
        cy.get("@theButton").contains("more").click();

        cy.contains("likes: 1");
      });

      it("user may delete ones blogs", function () {
        cy.contains("title: beforeEach title from cypress tests");
        cy.contains("title: beforeEach title from cypress tests")
          .find("button")
          .as("theButton");
        cy.get("@theButton").contains("more").click();
        cy.contains("delete").click();
        cy.on("window:confirm", () => true);

        cy.get("body").should(
          "not.contain",
          "title: beforeEach title from cypress tests"
        );
      });

      it.only("blogs are sorted by like amount", function () {
        cy.contains("title: blog2").as("mostLikes");
        cy.contains("title: blog3").as("secondLikes");

        cy.get("@mostLikes")
          .contains("more")
          .click()
          .then(() => cy.contains("like").click())
          .then(() => cy.reload());
        cy.wait(1000);
        cy.get("@secondLikes")
          .contains("more")
          .click()
          .then(() => cy.contains("like").click())
          .then(() => cy.reload());
        cy.wait(1000);
        cy.get("@mostLikes")
          .contains("more")
          .click()
          .then(() => cy.contains("like").click())
          .then(() => cy.reload());

        cy.get(".blog").eq(0).should("contain", "title: blog2");
        cy.get(".blog").eq(1).should("contain", "title: blog3");
      });
    });
  });
});
