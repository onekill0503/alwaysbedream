import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Banner from '../components/banner'
import ActiveNode from '../components/active_node'
import Portofolio from '../components/portofolio'
import classnames from 'classnames'
import {EmojiSadIcon} from '@heroicons/react/outline'
import axios from 'axios'
import { useState } from 'react'
// import tcp from 'tcp-port-used'


const asyncLoop = async (siteData , i) => {
  if(i < 0){
    return false
  }else{
    if(siteData.node[i].endpoint.type == 'http'){
      console.log('http')
      siteData.node[i].online = await testHttp(siteData.node[i].endpoint.host , siteData.node[i].endpoint.param ? siteData.node[i].endpoint.param : undefined)
    }else if(siteData.node[i].endpoint.type == 'tcp'){
      console.log('tcp')
      siteData.node[i].online = await testTcp(siteData.node[i].endpoint)
    }else {
      siteData.node[i].online = false
    }
    await asyncLoop(siteData , (i - 1))
  }
}

function Home(props) {

  const [data , setData] = useState({})

  return (
    <div>
      <Head>
        <title>AlwaysBeDream | Personal Site</title>
        <meta name="description" content="HI, I'm Aji Dwi Prastio, a freelance web developer from Indonesia. I help brands or individuals build their websites. I am also active in testing products, especially on crypto platforms." />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classnames(styles.unsupported)}>
        <div className={classnames(styles.unsupported_text)}>
          <span>Sorry <EmojiSadIcon className='w-5 h-5 inline-block' /></span>
          <span>This Website not support yet for mobile view</span>
        </div>
      </div>

      <main className={styles.main}>
        {/* Header Component */}
        <Header />

        {/* Banner Component */}
        <Banner />

        {/* Technolgy Component */}

        <div className={classnames(styles.tech_wrapper , "text-center")}>
          <img src="/blob1.png" className={styles.blob1} />
          <img src="/blob2.png" className={styles.blob2} />
          <center>
            <span className={classnames(styles.tech_title , "block")}>What Technolgy do I use</span>
            <img src="/tech.svg" className={styles.tech_illustration} />
          </center>
        </div>

        {/* Portofolio Component */}
        <Portofolio data={props.siteData.portofolio} />
        
        {/* Active Node Component */}
        <ActiveNode data={props.siteData.node} />

        {/* Get in touch Component */}
        <div id="git" className={classnames(styles.git_wrapper , "mx-20 my-32")}>
          <div className='flex justify-between'>
            <div className={classnames(styles.git_text , "basis-1/2")}>
              <span className={classnames(styles.git_text_title)}>Have Project in Mind ?</span>
              <div className={styles.rectangle_wrapper}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className={classnames(styles.git_text_description , "mt-14")}>
              If you want to chat about a project — email me on aji@alwaysbedream.com<br /><br />

              I can help design and build a personal or business website for your product .I can build a back-end for your program or website. I also can create a telegram or discord bot to help you manage your brand community<br /><br />

              Currently based in Yogyakarta, Indonesia — available for remote-friendly work.
              </p>
            </div>
            <div className={classnames(styles.git_image , "basis-1/2 relative block")}>
              <Image layout='responsive' width={100} height={100} src='/illustration2.svg'></Image>
            </div>
          </div>
        </div>

      </main>

      <footer>
        <center>
          <span className={styles.footer_text}>2022 &copy; AlwaysBeDream</span>
        </center>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  var siteData = await axios.get("https://raw.githubusercontent.com/onekill0503/personal-site/main/data.json")
    .then(res => {return res.data})
    .catch(err => setSiteData({node: [], portofolio: []}))
  
  // // testing endpoint
  // for(let i = 0;i < siteData.node.length;i++){
  //   if(siteData.node[i].endpoint.type == 'http'){
  //     siteData.node[i].online = await testHttp(siteData.node[i].endpoint.host , siteData.node[i].endpoint.param ? siteData.node[i].endpoint.param : undefined)
  //   }else if(siteData.node[i].endpoint.type == 'tcp'){
  //     siteData.node[i].online = await testTcp(siteData.node[i].endpoint)
  //   }else {
  //     siteData.node[i].online = false
  //   }
  // }
  
  // // Pass data to the page via props
  return { props: { siteData } }
}

export default Home;