import './Gallery.css';
import { useState } from 'react';
import one from '../../resources/rigPictures/city_1.png';
import two from '../../resources/rigPictures/city_2.png';
import three from '../../resources/rigPictures/city_3.png';
import four from '../../resources/rigPictures/city_4.png';

const Gallery = () => {
    const [ modelClass, setModelClass ] = useState<string>('one');

    const handlePictureChangeForward = () => {
        switch (modelClass) {
          case 'one':
            setModelClass('two');
            break;
          case 'two':
            setModelClass('three');
            break;
          case 'three':
            setModelClass('four');
            break;
          case 'four':
            setModelClass('one');
            break;
          default:
            setModelClass('one');
            break;
        }
    }

    const handlePictureChangeBackward = () => {
        switch (modelClass) {
          case 'one':
            setModelClass('four');
            break;
          case 'two':
            setModelClass('one');
            break;
          case 'three':
            setModelClass('two');
            break;
          case 'four':
            setModelClass('three');
            break;
          default:
            setModelClass('one');
            break;
        }
    }

    const renderPicture = () => {
        switch (modelClass) {
            case 'one':
                return <img className='imageOne' src={one} alt='gear' />;
            case 'two':
                return <img className='imageTwo' src={two} alt='gear' />;
            case 'three':
                return <img className='imageThree' src={three} alt='gear' />;
            case 'four':
                return <img className='imageFour' src={four} alt='gear' />;
            default:
                return <img className='imageOne' src={one} alt='gear' />;
        }
    }
    
    return (
        <div className={`galleryContainer ${modelClass} paddingInner`}>
            <div className='arrows' onClick={handlePictureChangeBackward}>{'<'}</div>
              {renderPicture()}
            <div className='arrows' onClick={handlePictureChangeForward}>{'>'}</div>
      </div>
    );
}

export default Gallery;
