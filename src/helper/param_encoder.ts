const encodeParams = (params: Record<string, string>): string => {
  return new URLSearchParams(params).toString();
};

export default encodeParams;
