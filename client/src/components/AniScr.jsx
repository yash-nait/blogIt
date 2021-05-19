import gsap from "gsap";
import { useEffect } from "react";

const tl = gsap.timeline({defaults: {ease: 'power1.out'}})

function AniScr (){

    useEffect(() => {
        tl.to('.Ani',{y: '-100vh',duration: 2})
        // tl.to('.prof-img',{opacity: 1,duration: 1.5})
        // tl.to('.list',{x: '0%', duration: 1, stagger: 0.5})
    })

    return(
        <div className="Ani">
            
        </div>
    );
}

export default AniScr