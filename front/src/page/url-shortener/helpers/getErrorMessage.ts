import { DEFAULT_ERROR_MESSAGE, API_ERROR_MESSAGES } from "./constants";
import { ApiErrorKey } from "./constants";

function isApiErrorKey(message: string): boolean {
	return Object.values(ApiErrorKey).includes(message as ApiErrorKey);
};

export const getErrorMessage = (error: unknown): string => {
	if (!(error instanceof Error) || !isApiErrorKey(error.message)) {
		return DEFAULT_ERROR_MESSAGE;
	}

	switch (error.message) {
		case ApiErrorKey.UNSAFE_URL:
			return API_ERROR_MESSAGES[ApiErrorKey.UNSAFE_URL];
		default:
			return DEFAULT_ERROR_MESSAGE;
	}
};
