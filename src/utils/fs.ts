// Support running in both node and the browser
export default typeof window === 'object'
  ? null
  : eval('require("fs")')