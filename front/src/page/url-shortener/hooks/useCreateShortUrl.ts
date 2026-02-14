import { apiFetch } from '@/lib/apiFetch';
import { useMutation } from '@tanstack/react-query';

interface ShortUrlResponse {
	shortCode: string;
	originalUrl: string;
	createdAt: string;
}

export const useCreateShortUrl = () => {
	return useMutation({
		mutationFn: async (originalUrl: string) => {
			return apiFetch<ShortUrlResponse>({
				route: '/short-urls',
				method: 'POST',
				body: { originalUrl },
			});
		},
	});
};