import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import NFTBox from "./NFTBox"

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:3001/graphql"

interface ItemListed {
    nftAddress: string
    tokenId: string
    price: string
    seller: string
    blockTimestamp: string
}

async function fetchRecentListings(): Promise<ItemListed[]> {
    const query = `
        query {
            allItemListeds(
                first: 20
                orderBy: BLOCK_NUMBER_DESC
            ) {
                nodes {
                    nftAddress
                    tokenId
                    price
                    seller
                    blockTimestamp
                }
            }
        }
    `

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        throw new Error("Failed to fetch listings")
    }

    const { data, errors } = await response.json()

    if (errors && errors.length > 0) {
        console.error("GraphQL errors:", errors)
        throw new Error(errors[0].message)
    }

    return data?.allItemListeds?.nodes || []
}

export default function RecentlyListedNFTs() {
    const { data: listings, isLoading, error } = useQuery({
        queryKey: ["recentListings"],
        queryFn: fetchRecentListings,
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

            {isLoading && <p className="text-center">Loading...</p>}

            {error && (
                <p className="text-center text-red-500">
                    Error loading listings. Make sure the indexer is running.
                </p>
            )}

            {!isLoading && !error && listings && listings.length === 0 && (
                <p className="text-center">No NFTs listed yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {!isLoading &&
                    !error &&
                    listings?.map((listing, index) => (
                        <Link
                            key={`${listing.nftAddress}-${listing.tokenId}-${index}`}
                            href={`/buy-nft/${listing.nftAddress}/${listing.tokenId}`}
                            className="block"
                        >
                            <NFTBox
                                contractAddress={listing.nftAddress}
                                tokenId={listing.tokenId}
                                price={listing.price}
                            />
                        </Link>
                    ))}
            </div>
        </div>
    )
}