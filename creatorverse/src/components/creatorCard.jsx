import { Link } from 'react-router-dom';
import './../css/index.css';
import { AiFillInfoCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";


function CreatorCard({ creator }) {
  const { id, name, description, image_url } = creator;
  
  const displayDescription =
    description && description.length > 100
      ? description.substring(0, 100) + '...'
      : description;

  return (
    <div className="creator-card">
      {image_url && (
        <div className="card-image">
          <img src={image_url} alt={name} />
        </div>
      )}

      <div className="card-content">
        <h3>{name}</h3>
        <p className="description">{displayDescription}</p>
        <div className="card-actions">
          <Link to={'/edit/' + id} className="btn-edit-more">
            <AiFillEdit />
          </Link>
          <Link to={`/view/${id}`} className="btn-view-more">
            <AiFillInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;