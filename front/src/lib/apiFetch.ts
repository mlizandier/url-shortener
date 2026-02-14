type HttpMethod = 'GET' | 'POST';

interface ApiFetchOptions {
	route: string;
	method: HttpMethod;
	body?: unknown;
}

export async function apiFetch<T = unknown>({
	route,
	method,
	body,
}: ApiFetchOptions): Promise<T | null> {
	const API_URL = process.env.BUN_PUBLIC_API_URL;
	if (!API_URL) {
		throw new Error('API_URL is not set');
	}
	const url = `${API_URL}${route}`;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (body && (method === 'POST')) {
		options.body = JSON.stringify(body);
	}

	const response = await fetch(url, options);

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.message ?? `Request failed with status ${response.status}`);
	}

	if (response.status === 204 || response.headers.get('content-length') === '0') {
		return null;
	}

	return response.json();
}
