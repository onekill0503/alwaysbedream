import styles from '../styles/Home.module.css'
import classnames from 'classnames'
import {scroller} from 'react-scroll'

const header = () => {

  const goto = (props) => {
    const target = props.target.attributes[0].value
    // Somewhere else, even another file
    scroller.scrollTo(target, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 0,
    })
  }

    return (
        <div className={classnames("px-52 flex justify-between my-5 items-baseline" , styles.header_wrapper)}>
          <div className={styles.logo}>
            <img src='/logo.png' className={styles.logo_image}></img>
          </div>
          <div className={styles.navbar}>
            <div onClick={(e) => goto(e)} target="portofolio" className={styles.nav_item}>Portofolio</div>
            <div onClick={(e) => goto(e)} target="active_node" className={styles.nav_item}>Acitve Node</div>
            <div onClick={(e) => goto(e)} target="git" className={styles.nav_item}>Get in touch</div>
          </div>
          <div className={styles.socialmedia}>
            <span className='inline-block mx-5'>
              <a href="https://github.com/onekill0503" target='_blank'>
                <img src='/platform/github.png'></img>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://www.instagram.com/alwaysbedream/" target='_blank'>
                <img src='/platform/instagram.png'></img>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://twitter.com/GM_Aji123" target='_blank'>
                <img src='/platform/twitter.png'></img>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://facebook.com/aji.d.prasetio" target='_blank'>
                <img src='/platform/facebook.png'></img>
              </a>
            </span>
          </div>
        </div>
    )
}

export default header;