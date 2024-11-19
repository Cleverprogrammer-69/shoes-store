import { groq } from "next-sanity";
 
export const bannerQuery = groq`*[_type == 'banner']{
    ...
}|order(_createdAt asc)`;
export const productQuery = groq`*[_type == 'product']{
    ...
}|order(_createdAt asc)`;
export const bestSellersProductQuery = groq`*[_type == 'product' && position == 'BestSellers']{
    ...
}|order(_createdAt asc)`;
export const categoryQuery = groq`*[_type == 'category']{
    ...
}|order(_createdAt asc)`;