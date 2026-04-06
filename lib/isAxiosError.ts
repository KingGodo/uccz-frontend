export function isAxiosError(error: unknown): error is {
  isAxiosError: boolean;
  response?: {
    data?: {
      message?: string;
    };
  };
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error
  );
}