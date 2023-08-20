describe("EpisodeDetail", () => {
  it("muestra el título, la descripción y el reproductor de audio", () => {
    cy.restoreLocalStorage();
    // Visitar la página del episodio de ejemplo
    cy.visit("/podcast/1493353598/episode/1000624594388");

    // Asegurarse de que el título del episodio se muestre
    cy.get('[data-testid="episode-title"]').should("be.visible");

    // Asegurarse de que la descripción del episodio se muestre con el HTML interpretado
    cy.get('[data-testid="episode-description"]').should("be.visible");
    cy.get('[data-testid="episode-description"]').should(
      "include.html",
      "Descripción"
    );

    // Asegurarse de que el reproductor de audio se muestre con la fuente correcta
    cy.get('[data-testid="audio-player"]').should("be.visible");
    cy.get('[data-testid="audio-player"] source').should(
      "have.attr",
      "src",
      "url-del-audio.mp3"
    );
  });
});
