import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard'
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import { useFetchAllQuery } from '../../redux/features/books/booksApi'

const Recommended = () => {

  const {data = []} = useFetchAllQuery()
  const books = data.books || []

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
              slidesPerView: 3,
              spaceBetween: 50,
            }
          }
        }
        modules={[Navigation]}
        className='mySwiper'
      >

        {
          books.length > 0 && books.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard  book={book}/>
            </SwiperSlide>
          ))
        }


      </Swiper>
    </div>
  )
}

export default Recommended