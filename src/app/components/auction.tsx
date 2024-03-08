/* eslint-disable react/jsx-no-undef */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Auction = (props: { auction: any }) => {
  
  const {auction} = props
  const [isShown, setIsShown] = useState('');
  const [isBookmark, setIsBookmark] = useState('');
  
  return (
    <div key={auction.id} className="bg-white rounded-lg shadow dark:bg-gray-800">
        <Link href={`/auctions/${auction.id}`}>
            <Image loading='eager' src={auction.image} width={0} height={0} style={{width:'100%'}} className='border rounded-t' sizes='100vw' alt={auction.title} objectFit='cover'/>
        </Link>
        <div className="px-5 pb-5 mt-4">
            <Link href={`/auctions/${auction.id}`}>
            <h5 className="font-semibold text-center break-words tracking-tight text-gray-900 dark:text-white">{auction.name}</h5>
            </Link>
            <div className="flex items-center justify-center mt-2.5">
                <span className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  <FontAwesomeIcon icon={fas.faGrip} size={"lg"} className="me-1"/>
                  <span>{auction.artworks?.length ?? 0}</span>
                </span>
                <button className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3" onMouseEnter={() => setIsShown(auction.id)} onMouseLeave={() => setIsShown('')}>
                  <FontAwesomeIcon icon={auction.isFavorite ? fas.faHeart : isShown === auction.id ? fas.faHeart : far.faHeart} size={"lg"} className="text-rose-500"/>
                </button>
                <button className="flex bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-3" onMouseEnter={() => setIsBookmark(auction.id)} onMouseLeave={() => setIsBookmark('')}>
                  <FontAwesomeIcon icon={auction.isBookmark ? fas.faBookmark : isBookmark === auction.id ? fas.faBookmark : far.faBookmark} size={"lg"}/>
                </button>
            </div>
        </div>
    </div>            
  )
}

export default Auction