describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Test User",
      username: "user",
      password: "pw1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get(".login-form-username").should("exist");
    cy.get(".login-form-password").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get(".login-form-username").type("user");
      cy.get(".login-form-password").type("pw1234");
      cy.get(".login-form-submit").click();

      cy.contains("logged in");
    });

    it("fails with wrong password", function () {
      cy.get(".login-form-username").type("user");
      cy.get(".login-form-password").type("pw12345");
      cy.get(".login-form-submit").click();

      cy.contains("invalid username or password");
    });

    it("fails with wrong username", function () {
      cy.get(".login-form-username").type("user2");
      cy.get(".login-form-password").type("pw1234");
      cy.get(".login-form-submit").click();

      cy.contains("invalid username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "user",
        password: "pw1234",
      }).then((response) => {
        localStorage.setItem(
          "loggedBloglistUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get(".add-blog-form-title").type("title by cypress");
      cy.get(".add-blog-form-author").type("author by cypress");
      cy.get(".add-blog-form-url").type("url by cypress");
      cy.get(".add-blog-form-submit").click();
      cy.contains("title by cypress");
    });

    it("A blog can be liked", function () {
      cy.contains("new blog").click();
      cy.get(".add-blog-form-title").type("title by cypress");
      cy.get(".add-blog-form-author").type("author by cypress");
      cy.get(".add-blog-form-url").type("url by cypress");
      cy.get(".add-blog-form-submit").click();
      cy.contains("title by cypress");

      cy.contains("show").click();
      cy.contains("0");
      cy.contains("like").click();
      cy.contains("1");
    });

    it("A blog can be deleted", function () {
      cy.contains("new blog").click();
      cy.get(".add-blog-form-title").type("title by cypress");
      cy.get(".add-blog-form-author").type("author by cypress");
      cy.get(".add-blog-form-url").type("url by cypress");
      cy.get(".add-blog-form-submit").click();
      cy.contains("title by cypress");

      cy.contains("show").click();
      cy.contains("delete").click();

      cy.contains("Successfully deleted");
    });

    it("Blogs are sorted based on likes", function () {
      cy.contains("new blog").click();

      // Create first blog
      cy.get(".add-blog-form-title").type("2nd most likes");
      cy.get(".add-blog-form-author").type("2nd");
      cy.get(".add-blog-form-url").type("2nd");
      cy.get(".add-blog-form-submit").click();

      //Create second blog
      cy.get(".add-blog-form-title").type("1st most likes");
      cy.get(".add-blog-form-author").type("1st");
      cy.get(".add-blog-form-url").type("1st");
      cy.get(".add-blog-form-submit").click();

      // "2nd most likes" should be first as it was added first
      cy.get(".blog").should("have.length", 2);
      cy.get(".blog").eq(0).contains("2nd most likes");
      cy.get(".blog").eq(1).contains("1st most likes");

      // like the "1st most likes" once
      cy.get(".blog").eq(1).contains("show").click();
      cy.get(".blog").eq(1).get(".blog-like-btn").click();

      // the order should be switched now
      cy.get(".blog").should("have.length", 2);
      cy.get(".blog").eq(0).contains("1st most likes");
      cy.get(".blog").eq(1).contains("2nd most likes");
    });
  });
});
