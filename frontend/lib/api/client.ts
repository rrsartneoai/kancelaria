import {
  LawFirmAPIError,
  type LawFirmCreate,
  type LawFirmUpdate,
  type JSONAPIResponse,
  type SearchParams,
} from "./types";

export class LawFirmAPIClient {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;
  private retryAttempts: number;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.legalnexus.pl",
    apiKey?: string,
    timeout = 30000,
    retryAttempts = 3,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
    this.timeout = timeout;
    this.retryAttempts = retryAttempts;
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    params?: Record<string, any>,
    data?: any,
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;

    const headers: Record<string, string> = {
      "User-Agent": "LegalNexusSDK/1.0.0",
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    };

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    const config: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    // Add query parameters
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const finalUrl = searchParams.toString() ? `${url}?${searchParams}` : url;

    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const response = await fetch(finalUrl, config);

        if (response.ok) {
          return await response.json();
        }

        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP ${response.status}`;

        throw new LawFirmAPIError(errorMessage, response.status, errorData);
      } catch (error) {
        if (error instanceof LawFirmAPIError) {
          throw error;
        }

        if (attempt === this.retryAttempts - 1) {
          throw new LawFirmAPIError(
            error instanceof Error ? error.message : "Network error",
          );
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000),
        );
      }
    }

    throw new LawFirmAPIError("Max retry attempts exceeded");
  }

  async createLawFirm(data: LawFirmCreate): Promise<JSONAPIResponse> {
    console.log(`Creating law firm: ${data.name}`);
    return this.makeRequest<JSONAPIResponse>(
      "POST",
      "/law-firms",
      undefined,
      data,
    );
  }

  async getLawFirm(lawFirmId: string): Promise<JSONAPIResponse> {
    return this.makeRequest<JSONAPIResponse>("GET", `/law-firms/${lawFirmId}`);
  }

  async searchLawFirms(params: SearchParams = {}): Promise<JSONAPIResponse> {
    const searchParams = {
      page: params.page || 1,
      per_page: params.per_page || 20,
      sort: params.sort || "name",
      order: params.order || "asc",
      ...(params.q && { q: params.q }),
      ...(params.city && { city: params.city }),
      ...(params.specializations && {
        specializations: params.specializations,
      }),
    };

    return this.makeRequest<JSONAPIResponse>("GET", "/law-firms", searchParams);
  }

  async updateLawFirm(
    lawFirmId: string,
    data: LawFirmUpdate,
  ): Promise<JSONAPIResponse> {
    console.log(`Updating law firm: ${lawFirmId}`);
    return this.makeRequest<JSONAPIResponse>(
      "PUT",
      `/law-firms/${lawFirmId}`,
      undefined,
      data,
    );
  }

  async deleteLawFirm(lawFirmId: string): Promise<void> {
    console.warn(`Deleting law firm: ${lawFirmId}`);
    await this.makeRequest<void>("DELETE", `/law-firms/${lawFirmId}`);
  }

  // Specializations endpoints
  async getSpecializations(): Promise<JSONAPIResponse> {
    return this.makeRequest<JSONAPIResponse>("GET", "/specializations");
  }

  // Lawyers endpoints
  async getLawyers(lawFirmId?: string): Promise<JSONAPIResponse> {
    const endpoint = lawFirmId ? `/law-firms/${lawFirmId}/lawyers` : "/lawyers";
    return this.makeRequest<JSONAPIResponse>("GET", endpoint);
  }

  async createLawyer(lawFirmId: string, data: unknown): Promise<JSONAPIResponse> {
    return this.makeRequest<JSONAPIResponse>(
      "POST",
      `/law-firms/${lawFirmId}/lawyers`,
      undefined,
      data,
    );
  }
}

// Singleton instance
export const lawFirmAPI = new LawFirmAPIClient();

// React hook for API client
export function useLawFirmAPI() {
  return lawFirmAPI;
}
