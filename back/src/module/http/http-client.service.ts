import { Injectable } from '@nestjs/common';

type HttpMethod = 'GET' | 'POST';

interface HttpRequestOptions {
	headers?: Record<string, string>;
	body?: unknown;
	timeout?: number;
}

interface HttpResponse<T> {
	status: number;
	data: T;
	ok: boolean;
}

@Injectable()
export class HttpClientService {
	async get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
		return this.request<T>('GET', url, options);
	}

	async post<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
		return this.request<T>('POST', url, options);
	}

	private async request<T>(method: HttpMethod, url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
		const fetchOptions: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		};

		if (options?.body && method !== 'GET') {
			fetchOptions.body = JSON.stringify(options.body);
		}

		const response = await fetch(url, fetchOptions);
		// TODO: handle validation with a library like zod
		const data = await response.json() as T;

		return {
			status: response.status,
			data,
			ok: response.ok,
		};
	}
}
