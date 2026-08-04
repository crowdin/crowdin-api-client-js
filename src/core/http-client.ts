/**
 * @internal
 */
export interface HttpClient {
    get<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    delete<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    head<T>(url: string, config?: { headers: Record<string, string> }): Promise<T>;
    post<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    put<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
    patch<T>(url: string, data?: unknown, config?: { headers: Record<string, string> }): Promise<T>;
}
