import { Link } from 'react-router-dom';
import '../css/creator-card.css';
import { TiInfoLargeOutline } from "react-icons/ti";
import { RiYoutubeFill } from "react-icons/ri";
import { TiSocialInstagram } from "react-icons/ti";
import { RiTwitterXFill } from "react-icons/ri";
import { RiTwitchFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

import { TiEdit } from "react-icons/ti";


function CreatorCard({ creator }) {
  const { id, name, description, image_url, youtube, twitter, tiktok, instagram, twitch} = creator;
  
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
          <div className="card-socials">
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="btn-view-more">
              <RiYoutubeFill />
            </a>
          )}
          {twitch && (
            <a href={twitch} target="_blank" rel="noopener noreferrer" className="btn-view-more">
              <RiTwitchFill />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="btn-view-more">
              <RiTwitterXFill />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-view-more">
              <TiSocialInstagram />
            </a>
          )}
          {tiktok && (
            <a href={tiktok} target="_blank" rel="noopener noreferrer" className="btn-view-more">
              <AiFillTikTok />
            </a>
          )}
        </div>
          <Link to={'/edit/' + id} className="btn-edit-more">
            <TiEdit />
          </Link>
          <Link to={`/view/${id}`} className="btn-view-more">
            <TiInfoLargeOutline />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;