import { useParams } from "react-router-dom";

const PodcastDetail = () => {
  const { id } = useParams();

  // Aquí podrías obtener los detalles del podcast utilizando el ID
  // y mostrar la información en la página.

  return (
    <div>
      <h2>Detalles del Podcast</h2>
      <p>ID del podcast: {id}</p>
      {/* Aquí mostrar el resto de la información del podcast */}
    </div>
  );
};

export default PodcastDetail;
