/* eslint-disable @next/next/no-img-element */
"use client";
import Menu from "../../components/menu";
import { Key, useEffect, useState } from "react";
import Artwork from "@/app/components/artwork";
import { getAuction } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { notFound } from 'next/navigation';

type Pagination = {
  current_page: number;
  total_page: number;
};
type Auction = {
  id: Key;
  title: string;
  description: string;
  image: string;
  price: number;
  created_at: string;
  updated_at: string;
  artworks: Artwork[];
};
type Artwork = {
  id: Key;
  title: string;
  description: string;
  images: string[];
  price: number;
  created_at: string;
  updated_at: string;
};

export default function Artworks(params: { params: { auctionId: string } }) {
  const { auctionId } = params.params;
  const [auction, setAuction] = useState<Auction>({
    id: "",
    title: "",
    description: "",
    image: "",
    price: 0,
    created_at: "",
    updated_at: "",
    artworks: [],
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAuction(Number(auctionId)).then((response) => {
      setAuction(response.data.result.auction);
    })
    .catch(e => {
      setError(true);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [auctionId]);

  const Artworks = () => {
    if (error) {
      return notFound();
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        { 
          auction?.artworks.map((artwork: Artwork) => {
            return (
              <Artwork key={artwork.id} artwork={artwork} />
            )
          })
        }
      </div>
    )
  }

  return (
    <main className="">
      <Menu/>
      {
        isLoading ? (
          <div className="max-w-7xl mx-auto h-72 flex justify-center items-center">
            <FontAwesomeIcon icon={fas.faSpinner} size="2xl" spin/>
          </div>
        ) : null
      }
      <Artworks/>
    </main>
  );
}
