import gsap from "gsap";
import { useEffect } from "react";

const tl = gsap.timeline({defaults: {ease: 'power1.out'}})

function AniScr (){

    useEffect(() => {
        tl.to('.Ani_sub',{x: '100vw',duration: 2.5, delay: .5})
        tl.to('.Ani',{y: '-100vh',duration: 2})
        tl.to('.text-ani',{opacity: '0%', duration: 2})
    })

    return(
        <div>
            <div className="Ani"></div>
            <div className="Ani_sub"></div>
            <h1 className="text-ani">BLOG IT<span className="home-bkg-text-dash"> |</span></h1>
        </div>
    );
}

export default AniScr