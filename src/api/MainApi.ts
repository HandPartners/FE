import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export interface portfolioList {
  id: number;
  logo: string;
}

export interface newsItem {
  id: number;
  thumbnail: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
}
interface MainItem {
  sucess: boolean;
  portfolioList: portfolioList[];
  newsList: newsItem[];
}

export const getMain = async (): Promise<MainItem> => {
  try {
    const response = await api.get<MainItem>("/");
    return response.data;
  } catch (error) {
    console.error("Error getMain:", error);
    throw new Error(`메인 정보 가져오기 실패: ${(error as Error).message}`);
  }
};


