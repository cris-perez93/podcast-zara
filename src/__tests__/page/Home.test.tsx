import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/Home";
import fetchMock from "jest-fetch-mock";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PodcastDetail from "../../pages/PodcastDetail/PodcastDetail";

describe("Home", () => {
  const podcasts = [
    {
      id: "1",
      name: "BIG FACTS with Big Bank & DJ Scream",
      artist: "The Black Effect and iHeartPodcasts",
      image:
        "https://is4-ssl.mzstatic.com/image/thumb/Podcasts126/v4/c3/1c/5f/c31c5fe5-2ef7-6604-1c4c-d04c703c586a/mza_3268293942379878303.jpg/170x170bb.png",
    },
    {
      id: "2",
      name: "The Joe Budden Podcast",
      artist: "The Joe Budden Network",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
    },
  ];

  beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify({ feed: { entry: podcasts } }));
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("muestra el título de la página", () => {
    const titulo = screen.getByText(/Podcaster/i);
    expect(titulo).toBeInTheDocument();
  });

  test("muestra un campo de filtro de búsqueda", () => {
    const campoFiltro = screen.getByPlaceholderText(/Filter podcasts/i);
    expect(campoFiltro).toBeInTheDocument();
  });

  test("muestra un listado de podcasts en tarjetas", async () => {
    const tarjetasPodcastName = await Promise.all(
      podcasts.map((podcast) => screen.findAllByText(podcast.name))
    );
    expect(tarjetasPodcastName).toHaveLength(2);
    const tarjetasPodcastArtist = await Promise.all(
      podcasts.map((podcast) => screen.queryAllByText(podcast.artist))
    );
    expect(tarjetasPodcastArtist).toHaveLength(2);
    const tarjetasPodcastImage = await Promise.all(
      podcasts.map((podcast) => screen.findAllByText(podcast.name))
    );
    expect(tarjetasPodcastImage).toHaveLength(2);
  });

  test("filtra los podcasts según el término de búsqueda en tiempo real", async () => {
    const campoFiltro = screen.getByPlaceholderText(/Filter podcasts/i);
    fireEvent.change(campoFiltro, { target: { value: "BIG" } });

    const tarjetaPodcastFiltrada = await screen.findByText(
      /BIG FACTS with Big Bank & DJ Scream/i
    );
    expect(tarjetaPodcastFiltrada).toBeInTheDocument();

    const tarjetaPodcastNoFiltrada = screen.queryByText(
      /The Joe Budden Podcast/i
    );
    expect(tarjetaPodcastNoFiltrada).not.toBeInTheDocument();
  });

  test("navega a la página de detalles al hacer clic en una tarjeta", async () => {
    await Promise.all(
      podcasts.map((podcast) => screen.findAllByText(podcast.name))
    );

    const primeraTarjeta = screen.getByText(
      "BIG FACTS with Big Bank & DJ Scream"
    );
    fireEvent.click(primeraTarjeta);

    const podcastDetailTitle = await screen.findByText("Detalles del Podcast");
    expect(podcastDetailTitle).toBeInTheDocument();
    const idDelPodcast = await screen.findByText("ID del podcast: 1493353598");
    expect(idDelPodcast).toBeInTheDocument();
  });
});
