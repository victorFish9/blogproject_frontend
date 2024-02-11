describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
    const user = {
      name: "Victor Cherkasov",
      username: "vcherkasov",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    //cy.login({ username: 'vcherkasov', password: '12345' })
  });
  it("front page can opened", function () {
    cy.contains("Blogs");
  });
  it("Login form is shown", function () {
    cy.contains("username");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("vcherkasov");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.contains("Logged as");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("vcherkasov");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();
      cy.contains("Wrong password or login");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("vcherkasov");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.contains("Logged as");
    });

    it("A blog can be created", function () {
      cy.contains("Create new Blog").click();
      cy.get("#title").type("10 things to do at Summer");
      cy.get("#author").type("Henrick");
      cy.get("#url").type("https//:hello");
      cy.get("#save-button").click();
      cy.contains("10 things to do at Summer");
    });

    describe("When blog is created", function () {
      beforeEach(function () {
        cy.contains("Create new Blog").click();
        cy.get("#title").type("10 things to do at Summer");
        cy.get("#author").type("Henrick");
        cy.get("#url").type("https//:hello");
        cy.get("#save-button").click();
      });

      it("A blog can like", function () {
        cy.get("#show-more").click().get("#like").click();
        cy.should("not.contain", "0");
      });

      it("User can delete own blog", function () {
        cy.reload().get("#show-more").click().get("#delete").click();
      });

      it("User can see own blog", function () {
        cy.reload().get("#show-more").click().get("#delete");
      });

      it.only("Likes order", function () {
        cy.get("#show-more").click().get("#like").click({ multiple: true });
        cy.eq(0).should("contain", "The title with the most likes");
      });
    });
  });
});
