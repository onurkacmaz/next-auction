/* eslint-disable react/jsx-key */
"use client"
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import Menu from '@/app/components/menu'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { bid, getArtwork } from '@/app/auctions/api'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ArtworkDetail(props: any) {  
  const { auctionId, artworkId } = props.params
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [artwork, setArtwork] = useState<any>({})

  useEffect(() => {
    getArtwork(artworkId)
    .then((response) => {
      setArtwork(response.data.result.artwork)
    })
    
    return () => {
      setArtwork({})
    }
  }, [auctionId, artworkId])
  
  const toggleImagePreview = (imagePosition: number) => {
    setShowImagePreview(!showImagePreview)
    setSelectedImage(imagePosition)
  }

  const nextImage = () => {
    setSelectedImage(selectedImage + 1)
  }

  const prevImage = () => {
    setSelectedImage(selectedImage - 1)
  }

  const handleBid = () => {
    bid(artworkId, artwork.end_price)
    .then((response) => {
      console.log(response)
    })
  }

  const ImagePreview = () => {
    return (
      (!showImagePreview) ? null : 
      <div className='fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-40 flex items-center'>
        <div className='w-fit mx-auto'>
          <div className='flex items-center gap-4'>
            {
              selectedImage > 0 ? 
              <FontAwesomeIcon className='cursor-pointer' onClick={() => prevImage()} icon={fas.faChevronLeft} size='2xl' color={'white'}/> : null
            }
            {
              artwork.images.map((image: any, index: number) => (
                (index === selectedImage) ? 
                  <Image
                    key={index}
                    width={0}
                    height={0}
                    sizes='100vw'
                    src={image.image}
                    alt={artwork.title}
                    className="object-center rounded-lg w-fit"
                  /> : null
              ))
            }
            {
              selectedImage + 1 < artwork?.images.length ? 
              <FontAwesomeIcon className='cursor-pointer' onClick={() => nextImage()} icon={fas.faChevronRight} size='2xl' color={'white'}/> : null
            }
          </div>
          <button onClick={() => toggleImagePreview(0)} className='absolute top-5 right-5'>
            <FontAwesomeIcon icon={fas.faTimesCircle} size='2xl' color={'white'}/>
          </button>
        </div>
      </div>
    )
  }

  const ArtworkImage = (props: any) => {
    const { index } = props
    
    return (
      <>
      {
        artwork.images ? 
        <Image
          onClick={() => toggleImagePreview(index)}
          width={0}
          height={0}
          style={{width:'100%', cursor: 'pointer' }}
          sizes='100vw'
          src={artwork.images ? artwork.images[index].image : ''}
          alt={artwork.title}
          className="h-full w-full object-cover"
        /> : 
        <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
        </div>
      }
      </>
    )
  }

  return (
    <main className='relative'>
      <ImagePreview />
      <Menu/>
      <div className="bg-white">
        <div className="pt-1">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <ArtworkImage index={0}/>
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <ArtworkImage index={1}/>
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <ArtworkImage index={2}/>
              </div>
            </div>
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <ArtworkImage index={3}/>
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold break-words tracking-tight text-gray-900 sm:text-3xl">{artwork.title}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 flex justify-between">
                <strong>Start Price </strong>
                <span>${artwork?.end_price?.toFixed(2)}</span>
              </p>
              <p className="text-3xl tracking-tight text-gray-900 flex justify-between">
                <strong>End Price </strong>
                <span>${artwork?.end_price?.toFixed(2)}</span>
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>               
                <button
                  onClick={() => handleBid()}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Bid
                </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{artwork.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
