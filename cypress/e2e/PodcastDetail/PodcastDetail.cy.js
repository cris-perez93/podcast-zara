it("debe mostrar los detalles del podcast", () => {
  // get the local storage
  cy.restoreLocalStorage();
  cy.visit("/podcast/1493353598"); // Asegúrate de que la ruta sea correcta
  const podcastDetail = {
    name: "BIG FACTS with Big Bank & DJ Scream",
    author: "The Black Effect and iHeartPodcasts",
    description:
      "Two Atlanta legends Big Bank and DJ Scream bring you the long awaited BIG FACTS Podcast!",
  };

  // Verificar que el título de la página está presente
  cy.get('[data-testid="podcast-name"]')
    .should("exist")
    .and("contain", podcastDetail.name);
  // Verificar que la imagen del podcast está presente
  cy.get('[data-testid="podcast-image"]')
    .should("exist")
    .and("have.attr", "src");
  // Verificar que el autor del podcast está presente
  cy.get('[data-testid="podcast-author"]')
    .should("exist")
    .and("contain", podcastDetail.author);
  // Verificar que la descripción del podcast está presente
  cy.get('[data-testid="podcast-description"]').should("exist");

  // Verificar que el número de episodios está presente
  cy.get('[data-testid="podcast-episodes"]').should("exist");

  // Verificar que al menos un episodio se muestra
  cy.get("[data-testid='episode-card']").should("have.length.greaterThan", 0);

  // Verificar que el enlace al detalle del episodio funciona
  cy.get("[data-testid='episode-card']").first().click();

  // Verificar que la URL cambia al detalle del episodio
  cy.url().should("include", "/podcast/1493353598/episode/1000624751003");
});
