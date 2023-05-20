import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [ modelClass, setModelClass ] = useState<string>('modelOne');

    const handlePictureChange = () => {
        switch (modelClass) {
          case 'modelOne':
            setModelClass('modelTwo');
            break;
          case 'modelTwo':
            setModelClass('modelThree');
            break;
          case 'modelThree':
            setModelClass('modelOne');
            break;
          default:
            setModelClass('modelOne');
            break;
        }
    }
    
    return (
        <div className={`galleryContainer ${modelClass} paddingInner`}>
            <div className="arrows" onClick={handlePictureChange}>{"<"}</div>
            <div className="arrows" onClick={handlePictureChange}>{">"}</div>
      </div>
    );
}

export default Gallery;
