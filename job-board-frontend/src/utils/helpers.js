export const truncate = (str, length) => 
    str.length > length ? str.slice(0, length) + '...' : str;