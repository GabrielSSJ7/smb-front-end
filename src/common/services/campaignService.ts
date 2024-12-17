import httpClient from '@/common/lib/httpClient';

interface IndexParams {
  page: number;
  limit: number;
  status?: string;
  type?: string;
}

export interface ICampaign {
  id: string;
  client_id: string;
  rule_id: string;
  channel_id: string;
  name: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  active: number;
  content: string;
  monthly_pattern: string;
  weekly_pattern: string;
  daily_pattern: string;
  hourly_pattern: string;
  minutely_pattern: string;
  event_id: string;
  contacts_per_day_limit: number;
  ignore_channel_contacts_per_day_limit: number;
  ignore_client_contacts_per_day_limit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>; // Use Record<string, any> for a flexible object type
  created_at: string;
  updated_at: string;
}

export interface IResponseCampaign {
  data: ICampaign[];
  total: number;
  page: string;
  limit: string;
}

export default class CampaignService {
  static async getCampaigns(indexParams: IndexParams): Promise<IResponseCampaign> {
    try {
      const response = await httpClient.get('/campaigns', {
	params: indexParams,
      });
      return response.data;
    } catch (error) {
      console.error('CampaignService.getCampaigns:', error);
      throw new Error('CampaignService.getCampaigns');
    }
  }

  static async updateCampaign(id: string, data: Record<string, unknown>): Promise<ICampaign> {
    try {
      const response = await httpClient.patch(`/campaigns/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('CampaignService.updateCampaign:', error);
      throw new Error('CampaignService.updateCampaign');
    }
  }
}
