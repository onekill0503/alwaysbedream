
import classnames from 'classnames'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from '../styles/Home.module.css'

const portofolio = (props) => {
    var id = 0
    return (<div id="portofolio" className={styles.portofolio_wrapper}>
        <span className={styles.porto_title}>Portofolio</span>
        <span className={styles.porto_description}>this is a list of my portfolio that I have made during my time as a freelancer</span>

        {/* Carousel Items */}
        <div className={classnames(styles.carousel_wrapper)}>
          <Carousel 
            showArrows={false}
            showStatus={false}
            swipeable={true}
            interval={2000}
            autoPlay={true}
            showThumbs={false}
          >
            {props.data.map(porto => {
              id++
              return (
                <div key={id} className={classnames(styles.carousel_item , "flex")}>
                  <div
                    style={{backgroundImage: `url('${porto.image}')`}}
                    className={classnames(styles.porto_image,"flex-1 relative bg-cover bg-center")}
                  ></div>
                  <div className={classnames(styles.carousel_description , "flex-1")}>
                    <div className={styles.carousel_des_title}>{porto.name}</div>
                    <div className={classnames(styles.carousel_tag)}>
                      {porto.tags.map(tag => {
                        return (<div key={tag} className={styles.carousel_tag_item}>{tag}</div>)
                      })}
                    </div>
                    <div className={styles.carousel_des}>
                      {porto.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>)
}

export default portofolio