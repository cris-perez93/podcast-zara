import { useParams } from "react-router-dom";
import { useMutation } from "../../hooks/useMutation";
import { useEffect } from "react";
import { usePodcast } from "../../context/PodcastContext/PodcastContext";

const PodcastDetail = () => {
  const { id } = useParams();
  const [fetchDetail] = useMutation(`/lookup`);

  const { podcastDetail, setPodcastDetail, podcasts } = usePodcast();

  const getPodcastDetail = async () => {
    const { data, success } = await fetchDetail({
      method: "get",
      addToURL: `?id=${id}`,
    });
    if (success && data) {
      const currentPodcast = podcasts?.find(
        (podcast: any) => podcast.id === id
      );
      const description = currentPodcast?.description;
      const NewPodcastDetail = {
        ...data.results[0],
        name: data.results[0].trackName,
        author: data.results[0].artistName,
        description,
      };
      setPodcastDetail(NewPodcastDetail);
      // Obtener los episodios del podcast a través de collectionViewUrl
      if (data.results[0].collectionViewUrl) {
        const { data: episodesData, success: episodesSuccess } =
          await fetchDetail({
            method: "get",
            addToURL: `?id=${data.results[0].collectionId}&country=US&media=podcast&entity=podcastEpisode&limit=100`,
          });
        if (episodesSuccess && episodesData) {
          // guardar la informacion que necesitamos de los episodios
          const episodes = episodesData.results.map((episode: any) => {
            return {
              date: episode.releaseDate,
              duration: episode.trackTimeMillis,
              title: episode.trackName,
              audio: episode.previewUrl,
            };
          });
          // filtrar solo los episodios que no tengan audo undefined
          const episodesWithAudio = episodes.filter(
            (episode: any) => episode.audio !== undefined
          );
          setPodcastDetail((prevState: any) => ({
            ...prevState,
            episodesWithAudio,
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (podcasts.length > 0) {
      getPodcastDetail();
    }
  }, [podcasts]);

  return (
    <div className="py-10 flex">
      {podcastDetail && (
        <>
          <div className=" p-5 shadow-md">
            <img
              src={podcastDetail.artworkUrl100}
              alt={`${podcastDetail.name} Artwork`}
              data-testid="podcast-image"
            />
            <p data-testid="podcast-name">{podcastDetail.name}</p>
            <p data-testid="podcast-author">{podcastDetail.author}</p>
            <div data-testid="description">
              <p>Description:</p>
              <p data-testid="podcast-description">
                {podcastDetail.description}
              </p>
            </div>
            {/* Agrega otros elementos con los atributos del podcast */}
          </div>
          <div>
            <h2>Episodes</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default PodcastDetail;
