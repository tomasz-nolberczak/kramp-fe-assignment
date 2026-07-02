import { NextRequest } from 'next/server';

export const getQueryParamFromRequest = (
  request: any,
  param: string,
): string | null => {
  const url = new URL(
    request.url!,
    `http://${request.headers.host || 'localhost'}`,
  );

  return url.searchParams.get(param) || '';
};
