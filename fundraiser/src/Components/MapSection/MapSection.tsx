import './MapSection.css';

const Gallery = () => {
    return (
      <div className='mapSection'>
        <div className="titleSmaller">
          Plánovaná poloha
        </div>
        <iframe 
          src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7147.380461132693!2d17.589753545070142!3d48.32950967146539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDE5JzM4LjMiTiAxN8KwMzUnMTkuNCJF!5e0!3m2!1sen!2ses!4v1683970307773!5m2!1sen!2ses' 
          className='map'
          title='locationMap'
          allowFullScreen={false} 
          loading='eager' 
          referrerPolicy='no-referrer-when-downgrade'/>
      </div>
    );
}

export default Gallery;
