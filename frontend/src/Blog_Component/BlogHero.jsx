import React from 'react'
import './bloghero.css'
import { Blo } from '../Data'
import BloCard from './BloCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogHero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='bloghero'>
      <div className="blo_hero">
        <Slider {...settings}>
        {
          Blo.slice(0,4).map((item)=>{
            return(
              <BloCard item={item} key={item.id} />
            )
          })
        }
        </Slider>
      </div>
    </div>
  )
}

export default BlogHero