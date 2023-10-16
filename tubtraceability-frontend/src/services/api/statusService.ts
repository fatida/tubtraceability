import axiosService from './axiosService';

interface Status {
  id: number;
  machine: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

class StatusService {
  async getMachineStatus(): Promise<Status[]> {
    try {
      const response = await axiosService.get('/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default new StatusService();
