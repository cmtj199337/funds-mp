export const apiBaseUrl = (process.env.NODE_ENV === 'production') ? {
  'main': 'https://api.funds.io/',
} : {
  'main': 'api/',
}