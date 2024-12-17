import httpClient from '@/common/lib/httpClient';

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: string;
  contacts_per_day_limit: number;
  active: number;
  created_at: string;
  updated_at: string;
}

export default class ChannelService {
	static async getChannels(): Promise<Channel[]> {
		try {
			const response = await httpClient.get('/channels');
			return response.data;
		} catch (error) {
			console.error('ChannelService.getChannels:', error);
			throw new Error('ChannelService.getChannels');
		}
	}
}
