import { client } from "@/sanity/lib/client";
import { bannerQuery, bestSellersProductQuery, productQuery } from "./query";
export const revalidate = 0;
export const getBannerData = async () => await client.fetch(bannerQuery);
export const getProductData = async () => await client.fetch(productQuery);
export const getBestSellersProductData = async () => await client.fetch(bestSellersProductQuery);