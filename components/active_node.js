
import {StatusOnlineIcon} from '@heroicons/react/outline'
import Particles from "react-tsparticles";
import styles from '../styles/Home.module.css'
import { loadFull } from "tsparticles";
import { useCallback } from 'react'
import classnames from 'classnames'
import Image from 'next/image';

const Active_node = (props) => {
    var key = 0

    const useParticlesInit = useCallback(async (engine) => {
        await loadFull(engine);
      }, []);
    
      const useParticlesLoaded = useCallback(async (container) => {
          await console.log(container);
      }, []);

    return (<div id="active_node" className={styles.active_node}>
        <Particles 
          id="tsparticles"
          init={useParticlesInit}
          loaded={useParticlesLoaded}
          options={{
            "style": {
              "position": "absolute"
            },
            "particles": {
              "number": {
                "value": 40,
                "density": {
                  "enable": false,
                  "value_area": 552.4033491425909
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "edge",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "window",
              "events": {
                "onhover": {
                  "enable": false,
                  "mode": "repulse"
                },
                "onclick": {
                  "enable": false,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
          style={"position:absolute !important;"}
          />
        {/* Dot Elements */}
        <img src='/dot_white.svg' className={classnames(styles.an_dots , styles.an_dot1)}></img>
        <img src='/dot_white.svg' className={classnames(styles.an_dots , styles.an_dot2)}></img>

        <span className={styles.an_title}>Active Node</span>
        <span className={styles.an_description}>here is a list of active validators running on my machine.</span>
        {/* Component Items */}
        <div className={classnames(styles.an_wrapper , "flex justify-between align-baseline flex-wrap flex-row")}>
          {props.data.map(node => {
            key++
            return (
              <div key={key} className='basis-1/4'>
                <div className={styles.an_item}>
                  <div className="flex justify-between">
                    <Image width={35} height={35} className={styles.an_item_image} src={node.logo}></Image>
                    <div className={styles.an_item_title}>{node.name}</div>
                  </div>
                  <div className={styles.an_status_wrapper}>
                    <span className={classnames(styles.an_status_title , "block mb-2")}>Network Status</span>
                    <span className={classnames(styles.an_status_title , `block ${node.online ? 'text-green-500' : 'text-red-500'}`)}><StatusOnlineIcon className='h-6 w-6 inline-block' /> {node.online ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>)
}

export default Active_node;