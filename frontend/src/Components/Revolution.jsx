import React from 'react'
import { Blo, Comment } from '../Data'
import './revolution.css'
import {Link} from 'react-router-dom'
import BlogCard from '../Blog_Component/BlogCard'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Revolution = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 2,
  }

  return (
    <div className='revolution'>
      <div className="revolute">
        <h1>Revolutionizing Countless Occasions.</h1>
        <p>Join our exceptional community committed to delivering unparalleled experiences for our valued customers. From innovating <br /> new product features to flawlessly executing event setups, and ensuring seamless ticket purchasing and event participation, we <br /> consistently strive for excellence in all aspects of our operations.</p>
        <h1>Our Blog</h1>
        <hr />
        <div className="revulu">
          {
            Blo.slice(0, 4).map((item) => {
              return(
                <BlogCard item={item} key={item.id} />
              )
            })
          }
          <div className="revulu_btn">
            <Link to='/blog'><button>See More</button></Link>
          </div>
        </div>
        <div className="comment">
        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className="dots"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={true}
            sliderClass=""
            slidesToSlide={2}
            swipeable
          >
            {
              Comment.map((item)=>{
                return(
                  <div className="commet">
                    <p>{item.comment}</p>
                    <h3>{item.name}</h3>
                    <span>{item.position}</span>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Revolution