/* eslint-disable react/jsx-no-undef */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Artwork = (props: { artwork: any }) => {
  
  const {artwork} = props
  const [isShown, setIsShown] = useState('');
  const [isBookmark, setIsBookmark] = useState('');

  const ArtworkImages = () => {
    return (
      <div className='grid grid-cols-2'>
        <Image src={artwork.images[0]?.image} width={0} height={0} style={{width:'100%'}} className='border rounded-tl' sizes='100vw' alt={artwork.title}/>
        <Image src={artwork.images[1]?.image} width={0} height={0} style={{width:'100%'}} className='border rounded-tr' sizes='100vw' alt={artwork.title}/>
        <Image src={artwork.images[2]?.image} width={0} height={0} style={{width:'100%'}} className='border' sizes='100vw' alt={artwork.title}/>
        <div className='relative'>
          {
            artwork.images.length > 4 ? 
            <div className='absolute top-0 z-10 bg-black/[.40] w-full h-full text-white font-bold text-lg justify-center flex items-center'>+{artwork.images.length - 4}</div>
            : ''
          }
          <Image src={artwork.images[3]?.image} width={0} height={0} style={{width:'100%'}} className='border' sizes='100vw' alt={artwork.title}/>
        </div>
      </div>
    )
  }
  
  return (
    <div key={artwork.id} className="bg-white rounded-lg shadow dark:bg-gray-800">
        <Link href={`/auctions/${artwork.auction_id}/artworks/${artwork.id}`}>
            <ArtworkImages/>
        </Link>
        <div className="px-5 pb-5 mt-4">
            <Link href={`/auctions/${artwork.auction_id}/artworks/${artwork.id}`}>
                <h5 className="font-semibold text-center break-words tracking-tight text-gray-900 dark:text-white">{artwork.title}</h5>
            </Link>
            <div className="flex items-center justify-center mt-2.5">
                <span className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
                  <FontAwesomeIcon icon={far.faClock} size={"lg"} className="me-1"/>
                  <span className='font-bold'>${artwork.bids?.length > 0 ? artwork.bids[0]?.amount?.toFixed(2) : artwork.start_price.toFixed(2)}</span>
                </span>
                <span className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  <FontAwesomeIcon icon={fas.faGrip} size={"lg"} className="me-1"/>
                  <span className='font-bold'>{artwork.artworks?.length ?? 0}</span>
                </span>
                <button className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3" onMouseEnter={() => setIsShown(artwork.id)} onMouseLeave={() => setIsShown('')}>
                  <FontAwesomeIcon icon={artwork.isFavorite ? fas.faHeart : isShown === artwork.id ? fas.faHeart : far.faHeart} size={"lg"} className="text-rose-500"/>
                </button>
                <button className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3" onMouseEnter={() => setIsBookmark(artwork.id)} onMouseLeave={() => setIsBookmark('')}>
                  <FontAwesomeIcon icon={artwork.isBookmark ? fas.faBookmark : isBookmark === artwork.id ? fas.faBookmark : far.faBookmark} size={"lg"}/>
                </button>
            </div>
        </div>
    </div>            
  )
}

export default Artwork