export function buildPaginationData(basePath, result, originalQuery = {}) {
    const queryParams = (page) => {
      const params = new URLSearchParams({
        ...originalQuery,
        page,
      }).toString();
      return `${basePath}?${params}`;
    };
  
    return {
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? queryParams(result.prevPage) : null,
      nextLink: result.hasNextPage ? queryParams(result.nextPage) : null
    };
  }
  