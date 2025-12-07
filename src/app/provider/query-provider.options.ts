import { toast } from "sonner";

import { QueryCache, MutationCache } from "@tanstack/react-query";

import { CONFIG } from "@/shared/config/config-global";

// ----------------------------------------------------------------------

const MIN = 60 * 1000; // 1 minute in milliseconds
const isPRD = CONFIG.env === "prd";

/**
 * 에러에서 메시지를 추출하는 헬퍼 함수
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "일시적인 오류가 발생했습니다.";
}

/**
 * 에러에서 상태 코드를 추출하는 헬퍼 함수
 */
function getErrorStatus(error: unknown): number | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "status" in error.response &&
    typeof error.response.status === "number"
  ) {
    return error.response.status as number;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return error.status as number;
  }

  return undefined;
}

/**
 * 에러에서 URL을 추출하는 헬퍼 함수
 */
function getErrorUrl(error: unknown): string | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "config" in error &&
    typeof error.config === "object" &&
    error.config !== null &&
    "url" in error.config &&
    typeof error.config.url === "string"
  ) {
    return error.config.url as string;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "request" in error &&
    typeof error.request === "object" &&
    error.request !== null &&
    "responseURL" in error.request &&
    typeof error.request.responseURL === "string"
  ) {
    return error.request.responseURL as string;
  }

  return undefined;
}

// ----------------------------------------------------------------------

export const queryCache = new QueryCache({
  onError: (error, query) => {
    const url = getErrorUrl(error);
    const queryKey = query.queryKey.join(" > ");

    if (!isPRD) {
      console.group(`❌ Query Error: ${url || queryKey}`);
      console.error("Error:", error);
      console.log("Query Key:", query.queryKey);
      console.log("Query Meta:", query.meta);
      console.groupEnd();
    }
  },

  onSuccess: (data, query) => {
    if (!isPRD) {
      const queryKey = query.queryKey.join(" > ");
      const apiName = (query.meta?.api as string) || queryKey;

      console.group(`✅ Query Success: ${apiName}`);
      console.log("Data:", data);
      console.log("Query Key:", query.queryKey);
      console.log("Query Meta:", query.meta);
      console.groupEnd();
    }
  },
});

export const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    const url = getErrorUrl(error);
    const mutationKey =
      mutation.options.mutationKey?.join(" > ") || "Unknown Mutation";
    const status = getErrorStatus(error);
    const message = getErrorMessage(error);

    // 개발 환경에서 상세 로깅
    if (!isPRD) {
      console.group(`❌ Mutation Error: ${url || mutationKey}`);
      console.error("Error:", error);
      console.log("Mutation Key:", mutation.options.mutationKey);
      console.log("Variables:", variables);
      console.log("Context:", context);
      console.log("Mutation Meta:", mutation.meta);

      // 에러 응답 데이터가 있는 경우 표시
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
      ) {
        console.table(error.response.data);
      }

      console.groupEnd();
    }

    // 사용자에게 toast 알림 표시
    // mutation.meta?.skipErrorToast가 true인 경우 스킵
    if (!mutation.meta?.skipErrorToast) {
      const errorMessage = status ? `Error (${status}): ${message}` : message;

      toast.error(errorMessage, {
        duration: status && status >= 500 ? Number.POSITIVE_INFINITY : 5000, // 서버 에러는 무한대, 클라이언트 에러는 5초
      });
    }
  },

  onSuccess: (data, variables, context, mutation) => {
    if (!isPRD) {
      const mutationKey =
        mutation.options.mutationKey?.join(" > ") || "Unknown Mutation";

      console.group(`✅ Mutation Success: ${mutationKey}`);
      console.log("Data:", data);
      console.log("Variables:", variables);
      console.log("Context:", context);
      console.log("Mutation Meta:", mutation.meta);
      console.groupEnd();
    }

    // mutation.meta?.showSuccessToast가 true인 경우 성공 toast 표시
    if (mutation.meta?.showSuccessToast) {
      const successMessage =
        (typeof mutation.meta.showSuccessToast === "string"
          ? mutation.meta.showSuccessToast
          : "성공적으로 처리되었습니다.") || "성공적으로 처리되었습니다.";

      toast.success(successMessage);
    }
  },
});

export const defaultOptions = {
  queries: {
    staleTime: MIN * 5, // 5 minutes
    gcTime: MIN * 10, // 10 minutes (formerly cacheTime)
    retry: (failureCount: number, error: unknown) => {
      // 4xx 에러는 재시도하지 않음
      const status = getErrorStatus(error);
      if (status && status >= 400 && status < 500) {
        return false;
      }
      // 최대 1회 재시도
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  },
  mutations: {
    retry: false, // mutation은 기본적으로 재시도하지 않음
  },
};
