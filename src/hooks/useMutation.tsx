import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import apiBaseURL from "../constants/api";
import { useNavigate } from "react-router-dom";

type HttpMethod = "get" | "post" | "put" | "delete";

type FetchProps = {
  method?: "get" | "post" | "put" | "delete";
  data?: Record<string, any>;
  addToURL?: string;
  token?: string;
};

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: any;
};
interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers: {
    Accept: string;
    "Content-Type": string;
    Authorization?: string;
    AccessControlAllowOrigin?: string;
  };
  data?: Record<string, any>;
  params?: Record<string, any>;
}

const BASE_URL = apiBaseURL;

export const useMutation = (
  endpoint: string,
  cleanBaseURL: boolean = false
): [(props: FetchProps) => Promise<ApiResponse>, { loading: boolean }] => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const fetch = async ({
    method = "post",
    data,
    addToURL = "",
  }: FetchProps): Promise<ApiResponse> => {
    let queryString = "";
    setLoading(true);
    const URL = cleanBaseURL ? "" : BASE_URL;
    const config: RequestConfig = {
      method,
      url: URL + endpoint + addToURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (data) {
      if (method === "get") {
        queryString = Object.keys(data)
          .map((key) => key + "=" + data[key] || "")
          .join("%26");
        const queriesString = queryString ? queryString.replace("", "") : "";
        config.url += "?filter=" + queriesString;
      }
      config.data = data;
    }

    try {
      const response: AxiosResponse = await axios(config);

      setLoading(false);
      if (response.status !== 200 && response.status !== 202) {
        return {
          success: false,
          error: response,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      setLoading(false);
      if (!error?.response?.status) {
        return {
          success: false,
        };
      }

      const { status } = error?.response;
      if (status === 401) {
        return {
          success: false,
          error: error?.response?.data,
        };
      }
      if (status === 403) {
        navigation("/403");
      }

      return {
        success: false,
        error: error?.response?.data,
      };
    }
  };

  return [fetch, { loading }];
};
