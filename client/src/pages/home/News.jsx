import React, { useEffect, useState } from 'react'
import { getImgUrl } from '../../utils/getImgUrl'

import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import { Link } from 'react-router-dom'

const News = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch("news.json")
    .then(res => res.json())
    .then(data => setNews(data))
  }, [])


  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>
        Recommended For You
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 2,
              spaceBetween: 50,
            }
          }
        }
        modules={[Navigation]}
        className='mySwiper'
      >

        {
          news.length > 0 && news.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                <div className='py-4'>
                  <Link to="/">
                    <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                  </Link>
                  <div className='w-20 bg-primary h-[4px] mb-5'></div>
                  <p className='text-sm text-gray-600'>
                    {item.description}
                  </p>
                </div>

                <div className='flex-shrink-0'>
                  <img src={`${getImgUrl(item?.image, "news")}`} className='w-full object-cover'/>
    
                </div>
              </div>
            </SwiperSlide>
          ))
        }


      </Swiper>
    </div>
  )
}


export default News