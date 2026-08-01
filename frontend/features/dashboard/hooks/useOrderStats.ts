"use client";

import api from "@/config/axoisconfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderStatsRecentOrder {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  totalPrice: number;
  createdAt: string;
  product: { id: number; title: string };
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  statusCounts: Record<OrderStatus, number>;
  recentOrders: OrderStatsRecentOrder[];
}

export function useOrderStats() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      try {
        const response = await api.get<OrderStats>("/order/order-stats");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    staleTime: 60_000,
    retry: false,
  });

  return { orderStats: data, isLoading, isError, error, isFetching };
}
