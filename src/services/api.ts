
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Type definitions based on the API documentation
export interface Product {
  id: number;
  name: string;
  ean?: string;
  createdAt: string;
}

export interface Price {
  id: number;
  price: string;
  date: string;
  product: Product;
}

export interface MinRecentPrice {
  product_id: number;
  product_name: string;
  min_price: number;
  min_date: string;
}

// API functions
export const getMinRecentPrices = async (days: number = 14): Promise<MinRecentPrice[]> => {
  const response = await api.get<{ data: MinRecentPrice[] }>(`/prices/min-recent?days=${days}`);
  return response.data.data;
};

export const getPriceHistory = async (productId: number): Promise<Price[]> => {
  const response = await api.get<{ data: Price[] }>(`/prices?product_id=${productId}`);
  return response.data.data;
};

export const getProducts = async (name?: string): Promise<Product[]> => {
  const response = await api.get<{ data: Product[] }>(`/products`, { params: { name } });
  return response.data.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<{ data: Product }>(`/products/${id}`);
    return response.data.data;
};
