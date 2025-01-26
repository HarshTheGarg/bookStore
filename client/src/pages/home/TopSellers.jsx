import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard'
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import { useFetchAllQuery } from '../../redux/features/books/booksApi'

const categories =["Choose a genre", 
  "Business", 
  "Fiction", 
  "Horror",
  "Adventure"
]

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const {data = []} = useFetchAllQuery()
  const books = data.books || []

  const filteredBooks = selectedCategory === categories[0] ? books : books.filter(book => book.category == selectedCategory.toLowerCase())

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>
        Top Sellers
      </h2>

      {/* Category Filtering */}
      <div className='mb-8 flex items-center'>
        <select name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none' onChange={(e) => setSelectedCategory(e.target.value)}>
          {
            categories.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))
          }
        </select>
      </div>

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
          filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard  book={book}/>
            </SwiperSlide>
          ))
        }


      </Swiper>
    </div>
  )
}

export default TopSellers