import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
interface PortfolioParams {
  category: string;
  name: string;
}
export interface PortfolioItem {
  id: number;
  category: string;
  name: string;
  content: string;
  logo: string;
}

export interface ResponsePortfolioList {
  success: boolean;
  portfolioList?: PortfolioItem[];
  error?: string;
}

export const getPortfolio = async ({
  category,
  name,
}: PortfolioParams): Promise<ResponsePortfolioList> => {
  try {
    const response = await api.get<ResponsePortfolioList>("/portfolio/", {
      params: {
        category,
        name,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getPortfolio:", error);
    throw new Error(
      `프로젝트 리스트 가져오기 실패: ${(error as Error).message}`
    );
  }
};

export interface AddPortfolioBody {
  category: string;
  name: string;
  content: string;
  logo: string | File;
}

export const addPortfolio = async ({
  category,
  name,
  content,
  logo,
}: AddPortfolioBody): Promise<ResponsePortfolioList> => {
  try {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("logo", logo); // logo는 File 타입이어야 함

    const response = await api.post<ResponsePortfolioList>(
      "/portfolio/new",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getPortfolio:", error);
    throw new Error(`프로젝트 추가 실패: ${(error as Error).message}`);
  }
};

interface EditPortfolioProps {
  id: number;
  formData: FormData;
}
export const editPortfolio = async ({
  id,
  formData,
}: EditPortfolioProps): Promise<ResponsePortfolioList> => {
  try {
    const response = await api.patch(`/portfolio/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❗Error editPortfolio:", error);
    throw error;
  }
};

export const deletePortfolio = async ({
  id,
}: {
  id: number;
}): Promise<ResponsePortfolioList> => {
  try {
    const response = await api.delete(`/portfolio/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deletePortfolio:", error);
    throw new Error(`포트폴리오 삭제 실패: ${(error as Error).message}`);
    throw error;
  }
};
