export enum ApiErrorKey {
	UNSAFE_URL = 'unsafe.url',
}

export const API_ERROR_MESSAGES: Record<ApiErrorKey, string> = {
	[ApiErrorKey.UNSAFE_URL]: 'This URL has been flagged as unsafe and cannot be shortened.',
};

export const DEFAULT_ERROR_MESSAGE = 'Failed to shorten URL. Please try again.';