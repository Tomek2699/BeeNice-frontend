class SearchHelper<T> {
    static search<T>(query: string, data: T[], keys: (keyof T)[]): T[] {
      const formattedQuery = query.toLowerCase();
      return data.filter(item => 
        keys.some(key => 
          String(item[key]).toLowerCase().includes(formattedQuery)
        )
      );
    }
  }
  
  export default SearchHelper;