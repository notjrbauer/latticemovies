export default {
  api: {
    base: process.env.MOVE_ENDPOINT || 'https://api.themoviedb.org/3',
    bearer_token:
      process.env.BEARER_TOKEN ||
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTk1N2Y5OTg2ZmJhYTVmNGNlZmMwZDUwNzVjNTY1NyIsInN1YiI6IjVmYmM1ZTQ4ZDlmNGE2MDAzZTk4ODNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jKBy-z1iLpJqLE9dBuaRPgAWMmbbf2-AvECvSZpaLTc'
  }
}
