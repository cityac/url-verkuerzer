import '../envConfig.ts'

export const openApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const domain = process.env.NEXT_PUBLIC_DOMAIN || "localhost"
const port = process.env.NEXT_PUBLIC_PORT || ""
export const AppUrl = port ? `${domain}:${port}` : domain;
