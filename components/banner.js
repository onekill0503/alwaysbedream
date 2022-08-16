import styles from '../styles/Home.module.css'
import {ArrowRightIcon} from '@heroicons/react/outline'
import classnames from 'classnames'
import TextLoop from "react-text-loop";
import Image from "next/image"

const banner = () => {
    return (<div className={classnames("px-60 flex justify-between mt-44 relative" , styles.banner_wrapper)}>
    <img src='/dot.svg' className={styles.banner_dot1}></img>
    <img src='/dot.svg' className={styles.banner_dot2}></img>
    <div className={styles.banner_text}>
      <div className={styles.banner_title}>
        <TextLoop mask={true} fade={false}>
          <span>Experienced Blockchain</span>
          <span>Experienced Website</span>
          <span>Cryptocurrency Project</span>
        </TextLoop>{" "}
        <TextLoop mask={true} delay={1000} fade={false} className={styles.highlight}>
          <span>Validator</span>
          <span>Developer</span>
          <span>Tester</span>
        </TextLoop>
      </div>
      <div className={styles.banner_description}>HI, I&apos;m Aji Dwi Prastio, a freelance web developer from Indonesia. I help brands or individuals build their websites. I am also active in testing products, especially on crypto platforms.</div>
      {/* <button className={styles.banner_btn}>Know Me More <ArrowRightIcon className="inline-block w-5 h-5" /></button> */}
    </div>
    <div className={styles.banner_illustration}>
      <img src='/illustration1.svg' className="h-auto max-w-2xl relative z-10"></img>
      <img src='/rectangle.png' className={styles.banner_rectangle}></img>
    </div>
  </div>)
}

export default banner;