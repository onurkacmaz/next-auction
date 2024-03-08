import config from "@/api/config";

export async function getAuctions(page: number = 1, limit: number = 10) {
  return config.axiosInstance.get(`auctions`, {
    params: {
      page,
      limit,
      preload: true
    }
  })
}

export async function getAuction(id: number) {
  return config.axiosInstance.get(`auctions/${id}`)
}

export async function getArtwork(id: number) {
  return config.axiosInstance.get(`artworks/${id}`)
}