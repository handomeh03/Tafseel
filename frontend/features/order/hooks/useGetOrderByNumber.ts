"use client";

import api from "@/config/axoisconfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrderStatus } from "@/features/order/types/order-status";

export interface TrackedOrder {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  city: string;
  shippingAddress: string;
  quantity: number;
  unitPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    title: string;
    images: string[];
    store: { id: number; storeName: string };
  };
}

export function useGetOrderByNumber(orderNumber: string) {
  const trimmed = orderNumber.trim();

  const {
    data: order,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["order-tracking", trimmed],

    queryFn: async () => {
      try {
        const response = await api.get<TrackedOrder>(
          `/order/track/${encodeURIComponent(trimmed)}`
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          throw new Error(message);
        }
        throw new Error("حدث خطأ غير متوقع أثناء البحث عن الطلب");
      }
    },

    staleTime: 30_000,
    retry: false,
    enabled: false,
  });

  return { order, isLoading, isError, error, isFetching, refetch };
}
