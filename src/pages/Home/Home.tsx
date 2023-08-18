import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface IPodcast {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const Home = () => {
  // Almacenamos los podcasts en el estado
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  // Almacenamos el término de búsqueda en el estado
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Agarramos el último tiempo de actualización de localStorage en el caso de que exista o lo inicializamos a null
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(
    localStorage.getItem('lastFetchTime')
      ? parseInt(localStorage.getItem('lastFetchTime') || '')
      : null
  );


  // Obtiene los podcasts de la API de iTunes
  const fetchPodcast = async () => {
    try {
      const currentTime = Date.now();
      // Si no hay lastFetchTime o si han pasado más de 24 horas desde la última actualización, actualizamos los podcasts
      if (!lastFetchTime || currentTime - lastFetchTime > 24 * 60 * 60 * 1000) {
      const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const data = await response.json();
      const podcastEntries = data.feed.entry.map((entry: any) => {
        const id = entry.id.attributes['im:id'];
        const name = entry['im:name'].label;
        const artist = entry['im:artist'].label;
        const image = entry['im:image'][2].label;
        return {
          id,
          name,
          artist,
          image,
        };
      });
      setPodcasts(podcastEntries);
      setLastFetchTime(currentTime);
      localStorage.setItem('lastFetchTime', currentTime.toString());
    } else {
        const cachedPodcasts = JSON.parse(localStorage.getItem('cachedPodcasts') || '');
        setPodcasts(cachedPodcasts);
    }
    } catch (error) {
      console.error('Error al obtener los podcasts:', error);
    }
  }

  useEffect(() => {
    fetchPodcast();
  }, []);

  useEffect(() => {
    // Almacenamos en caché los podcasts en localStorage
    localStorage.setItem('cachedPodcasts', JSON.stringify(podcasts));
  }, [podcasts]);

  // Filtra los podcasts según el término de búsqueda tanto por name como por artist
  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Podcaster</h1>
      <input
        type="text"
        placeholder="Buscar podcasts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPodcasts.map(podcast => (
          <li key={podcast.id}>
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.name} />
              <h2>{podcast.name}</h2>
              <p>{podcast.artist}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
