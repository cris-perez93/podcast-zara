describe("Integriry Functionality", () => {
  beforeEach(() => {
    cy.visit("/"); // Asegúrate de que la ruta sea correcta
  });

  it("muestra el título de la página", () => {
    cy.contains("Podcaster"); // Verificar que el título se muestra
  });

  it("muestra un campo de filtro de búsqueda", () => {
    cy.get('input[data-testid="search-input"]').should("be.visible"); // Verificar que el campo de filtro se muestra
  });

  it("muestra un listado de podcasts en tarjetas", () => {
    // Verificar que al menos 2 tarjetas de podcast se muestran
    cy.get("[data-testid^='podcast-card']").should("have.length", 100);
    // simulamos guardar datos en el localstorage
  });

  it("filtra los podcasts según el término de búsqueda en tiempo real", () => {
    // Introducir el término de búsqueda y verificar que se filtran los podcasts
    cy.get('input[data-testid="search-input"]').type("BIG");
    cy.get("[data-testid^='podcast-card']").should("have.length", 2);
    cy.contains("BIG FACTS with Big Bank & DJ Scream").should("be.visible");
  });

  it("navega a la página de detalles al hacer clic en una tarjeta", () => {
    // Hacer clic en la primera tarjeta de podcast
    cy.get("[data-testid^='podcast-card']:first").click();

    // Verificar que se haya navegado a la url correcta
    cy.url().should("include", "/podcast/1493353598");
    cy.saveLocalStorage();
  });
});
