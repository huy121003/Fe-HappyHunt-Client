import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  ICountSold,
  ICountStatus,
  IPost,
  IPostItem,
  IPostPayload,
  ISearchPost,
} from "../data/interface";

const convertObjectToFormData = (data: IPostPayload) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("isIndividual", data.isIndividual.toString());
  if (data.category) {
    formData.append("category", data.category.toString());
  }
  formData.append("categoryParent", data.categoryParent.toString());
  if (data.saveImages) {
    formData.append("saveImages", JSON.stringify(data.saveImages));
  }
  if (Array.isArray(data.images) && data.images.length > 0) {
    data.images.forEach((image) => {
      formData.append("images", image as Blob);
    });
  }
  if (data.pricePayment) {
    formData.append("pricePayment", data.pricePayment.toString());
  }

  formData.append("address", JSON.stringify(data.address));
  formData.append("attributes", JSON.stringify(data.attributes));
  return formData;
};

class PostService {
  private static baseUrl = "/post";
  static create = (data: IPostPayload): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${PostService.baseUrl}`,
      true,
      convertObjectToFormData(data)
    );
  };
  static update = (
    id: number,
    data: IPostPayload
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/${id}`,
      true,
      convertObjectToFormData(data)
    );
  };

  static countStatus = (
    idUser: number
  ): Promise<ICommonResponse<ICountStatus>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/count-status/${idUser}`,
      false
    );
  };
  static updateStatus = (
    id: number,
    status: string
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/${id}/status`,
      true,
      {
        status,
      }
    );
  };

  static getAllPagination = (
    params: ISearchPost
  ): Promise<IPagedResponse<IPostItem[]>> => {
    const { attribute, ...filter } = params;
    let newParams = new URLSearchParams(filter as any).toString();
    if (attribute && attribute.length > 0) {
      attribute.forEach(({ name, value }) => {
        newParams += `&attribute[]=${name}:${value}`;
      });
    }
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/pagination?${newParams}`,
      false
    );
  };
  static getAllPagiantionManager = (
    params: ISearchPost
  ): Promise<IPagedResponse<IPostItem[]>> => {
    const { attribute, ...filter } = params;
    let newParams = new URLSearchParams(filter as any).toString();
    if (attribute && attribute.length > 0) {
      attribute.forEach(({ name, value }) => {
        newParams += `&attribute[]=${name}:${value}`;
      });
    }
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/pagination-manager?${newParams}`,
      false
    );
  };
  static getById = (id: number): Promise<ICommonResponse<IPost>> => {
    return apiRequest(EMethod.GET, `${PostService.baseUrl}/${id}`, false);
  };
  static getBySlug = (slug: string): Promise<ICommonResponse<IPost>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/slug/${slug}`,
      false
    );
  };
  static remove = (id: number): Promise<ICommonResponse> => {
    return apiRequest(EMethod.DELETE, `${PostService.baseUrl}/${id}`, false);
  };
  static countSold = (idUser: number): Promise<ICommonResponse<ICountSold>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/count-sold/${idUser}`,
      false
    );
  };
  static updateClickCount = (id: number): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/click-count/${id}`,
      false
    );
  };
  static getAllSuggestion = (): Promise<IPagedResponse<IPostItem[]>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/suggestion?sort=relevance`,
      false
    );
  };
  static countStatusProfile = (
    id: number
  ): Promise<ICommonResponse<ICountSold>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/count-status-profile/${id}`,
      false
    );
  };
  static pushAt = (id: number, price: Number): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/push/${id}`,
      true,
      {
        price,
      }
    );
  };
  static getPushAt = (
    id: number
  ): Promise<ICommonResponse<{ pushedAt: Date }>> => {
    return apiRequest(EMethod.GET, `${PostService.baseUrl}/push/${id}`, false);
  };
  static renew = (id: number): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/renew/${id}`,
      false
    );
  };
}

export default PostService;
