import { Injectable, Logger } from '@nestjs/common';
import { HttpClientService } from '../../http/http-client.service';

interface ThreatMatch {
	threatType: string;
	platformType: string;
	threat: { url: string };
}

interface SafeBrowsingResponse {
	matches?: ThreatMatch[];
}

@Injectable()
export class UrlSafetyService {
	private readonly logger = new Logger(UrlSafetyService.name);
	private readonly isEnabled: boolean;
	private readonly apiUrl: string | null;

	constructor(private readonly httpClient: HttpClientService) {
		this.isEnabled = process.env.ACTIVATE_GOOGLE_SAFE_BROWSING === 'true';

		if (this.isEnabled) {
			const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
			if (!apiKey) {
				throw new Error('GOOGLE_SAFE_BROWSING_API_KEY is required when ACTIVATE_GOOGLE_SAFE_BROWSING is enabled');
			}
			this.apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
		} else {
			this.apiUrl = null;
		}
	}

	async checkUrlSafety(url: string): Promise<boolean> {
		if (!this.isEnabled) {
			return true;
		}

		try {
			return await this.checkUrlSafetyWithApi(url);
		} catch (error) {
			this.logger.error('Failed to reach Safe Browsing API', error);
			return true;
		}
	}

	private async checkUrlSafetyWithApi(url: string): Promise<boolean> {
		const response = await this.httpClient.post<SafeBrowsingResponse>(this.apiUrl!, {
			body: {
				client: {
					clientId: 'url-shortener',
					clientVersion: '1.0.0',
				},
				threatInfo: {
					threatTypes: [
						'MALWARE',
						'SOCIAL_ENGINEERING',
						'UNWANTED_SOFTWARE',
						'POTENTIALLY_HARMFUL_APPLICATION',
					],
					platformTypes: ['ANY_PLATFORM'],
					threatEntryTypes: ['URL'],
					threatEntries: [{ url }],
				},
			},
		});

		if (!response.ok) {
			this.logger.error(`Safe Browsing API returned status ${response.status}`);
			return false;
		}

		return !response.data.matches?.length;
	}
}
