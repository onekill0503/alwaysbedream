import styles from '../styles/Home.module.css'
import classnames from 'classnames'
import {scroller} from 'react-scroll'
import Image from 'next/image'

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
            <Image width={227} height={49} alt="Logo" src='/logo.png' className={styles.logo_image}></Image>
          </div>
          <div className={styles.navbar}>
            <div onClick={(e) => goto(e)} target="portofolio" className={styles.nav_item}>Portofolio</div>
            <div onClick={(e) => goto(e)} target="active_node" className={styles.nav_item}>Acitve Node</div>
            <div onClick={(e) => goto(e)} target="git" className={styles.nav_item}>Get in touch</div>
          </div>
          <div className={styles.socialmedia}>
            <span className='inline-block mx-5'>
              <a href="https://github.com/onekill0503" target='_blank' rel="noreferrer">
                <Image width="25px" height="25px" src='/platform/github.png'></Image>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://www.instagram.com/alwaysbedream/" target='_blank' rel="noreferrer">
                <Image width="25px" height="25px" src='/platform/instagram.png'></Image>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://twitter.com/GM_Aji123" target='_blank' rel="noreferrer">
                <Image width="25px" height="25px" src='/platform/twitter.png'></Image>
              </a>
            </span>
            <span className='inline-block mx-5'>
              <a href="https://facebook.com/aji.d.prasetio" target='_blank' rel="noreferrer">
                <Image width="25px" height="25px" src='/platform/facebook.png'></Image>
              </a>
            </span>
          </div>
        </div>
    )
}

export default header;