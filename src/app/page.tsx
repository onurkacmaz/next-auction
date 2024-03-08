/* eslint-disable @next/next/no-img-element */
"use client";
import Menu from "./components/menu";
import Auction from "./components/auction";
import { getAuctions } from "./auctions/api";
import { Key, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

type Pagination = {
  current_page: number;
  total_page: number;
};
type Auctions = Auction[];
type Auction = {
  id: Key;
  title: string;
  description: string;
  image: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [auctions, setAuctions] = useState<Auctions>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 0,
    total_page: 0,
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAuctions().then((response) => {
      setAuctions(response.data.result.auctions);
      setPagination(response.data.result.pagination);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  const Auctions = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        { 
          auctions.map((auction) => {
            return (
              <Auction key={auction.id} auction={auction} />
            )
          })
        }
      </div>
    )
  }

  const handleLoadMore = () => {
    setIsLoading(true);
    getAuctions((pagination?.current_page ?? 0) + 1).then((response) => {
      setAuctions([...auctions, ...response.data.result.auctions]);
      setPagination(response.data.result.pagination);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const LoadMore = () => {
    if (pagination.current_page >= pagination.total_page) {
      return null;
    }
    
    return (
      <div className="flex justify-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleLoadMore()}>
          Load More {isLoading ? <FontAwesomeIcon icon={fas.faSpinner} spin size={"lg"} className="me-1"/> : null}
        </button>
      </div>
    )
  }

  return (
    <main className="">
      <Menu/>
      {
        auctions.length === 0 ? (
          <div className="max-w-7xl mx-auto h-72 flex justify-center items-center">
            <FontAwesomeIcon icon={fas.faSpinner} size="2xl" spin/>
          </div>
        ) : null
      }
      <Auctions/>
      <LoadMore/>
    </main>
  );
}
