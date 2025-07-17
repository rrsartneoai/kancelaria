"use client";

import { useState, useEffect, useCallback } from "react";
import { lawFirmAPI } from "./client";
import { type LawFirm, type SearchParams, LawFirmAPIError } from "./types";

export interface UseSearchLawFirmsResult {
  lawFirms: LawFirm[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  search: (params: SearchParams) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
}

export function useSearchLawFirms(
  initialParams: SearchParams = {},
): UseSearchLawFirmsResult {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    pages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [currentParams, setCurrentParams] =
    useState<SearchParams>(initialParams);

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await lawFirmAPI.searchLawFirms(params);

      // Parse JSON:API response
      const firms = Array.isArray(response.data)
        ? response.data.map((item: any) => ({
            id: item.id,
            ...item.attributes,
          }))
        : [];

      setLawFirms(firms);

      if (response.meta) {
        setMeta({
          total: response.meta.total || 0,
          page: response.meta.page || 1,
          pages: response.meta.pages || 0,
          hasNext: response.meta.has_next || false,
          hasPrev: response.meta.has_prev || false,
        });
      }

      setCurrentParams(params);
    } catch (err) {
      const errorMessage =
        err instanceof LawFirmAPIError
          ? err.message
          : "Wystąpił błąd podczas wyszukiwania";
      setError(errorMessage);
      setLawFirms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(async () => {
    if (meta.hasNext) {
      await search({ ...currentParams, page: meta.page + 1 });
    }
  }, [search, currentParams, meta.hasNext, meta.page]);

  const prevPage = useCallback(async () => {
    if (meta.hasPrev) {
      await search({ ...currentParams, page: meta.page - 1 });
    }
  }, [search, currentParams, meta.hasPrev, meta.page]);

  useEffect(() => {
    search(initialParams);
  }, [initialParams, search]);

  return {
    lawFirms,
    loading,
    error,
    total: meta.total,
    page: meta.page,
    pages: meta.pages,
    hasNext: meta.hasNext,
    hasPrev: meta.hasPrev,
    search,
    nextPage,
    prevPage,
  };
}

export interface UseLawFirmResult {
  lawFirm: LawFirm | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useLawFirm(lawFirmId: string): UseLawFirmResult {
  const [lawFirm, setLawFirm] = useState<LawFirm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLawFirm = useCallback(async () => {
    if (!lawFirmId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await lawFirmAPI.getLawFirm(lawFirmId);

      if (response.data) {
        setLawFirm({
          id: response.data.id,
          ...response.data.attributes,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof LawFirmAPIError
          ? err.message
          : "Wystąpił błąd podczas pobierania danych";
      setError(errorMessage);
      setLawFirm(null);
    } finally {
      setLoading(false);
    }
  }, [lawFirmId]);

  useEffect(() => {
    fetchLawFirm();
  }, [fetchLawFirm]);

  return {
    lawFirm,
    loading,
    error,
    refresh: fetchLawFirm,
  };
}

// Hook for creating law firms
export function useCreateLawFirm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLawFirm = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await lawFirmAPI.createLawFirm(data);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof LawFirmAPIError
          ? err.message
          : "Wystąpił błąd podczas tworzenia kancelarii";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createLawFirm,
    loading,
    error,
  };
}
