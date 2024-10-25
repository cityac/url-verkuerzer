import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'
import {openApiKey} from '@/utils/config'


/*
You are smart title summarizer
I provide you a link. 
Wait for it. 
Than visit the page find title and suggest my the short 3 words summary to use it as named shortened link 
Each of 3 words must be maximum 5 characters. So be smart and shorten each word and concat
For example automation-income-strategy should be shortened to autom-incom-strat
output 3 options in json array like ["autom-incom-strat", "incom-strat-pilot", "auto-pilot-strat"]
Example: 
Role User 
Input  https://nextjs.org/docs#main-features . 
Role Assistant 
Ouput next-main-features
*/

const schema = z.object({
  shortHashes: z.array(z.string()).describe(
    `array of short 3 words summary to use it as named shortened link. Each of 3 words must be maximum 5 characters. So be smart and shorten each word and concat. For example automation-income-strategy should be shortened to autom-incom-strat
     output 3 options in json array like ["autom-incom-strat", "incom-strat-pilot", "auto-pilot-strat"]`),
  summary: z.string().describe('quick summary of the provided link page.'),
  subject: z.string().describe('header of the page'),
  error: z.string().describe("input provided is not valid URL")
  
})

const parser = StructuredOutputParser.fromZodSchema(schema)

export const analyse = async (content: string) => {
  console.log('Call analyse')
  const input = await getPrompt(content)
  const model = new ChatOpenAI({
    temperature: 0.9,
    model: 'gpt-4o',
    apiKey: openApiKey,
  })
  const result = await model.invoke(input)

  try {
    return parser.parse(result.content as string)
  } catch (e) {
    console.log('Error', e)
  }
}

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      `You are smart title summarizer
      analyse the following URL,
      If it is not valid url, format your response to inlucde error field \n {format_instructions}\n{URL}
      If URL is valid, visit the page find title and suggest my the short 3 words summary to use it as named shortened link 
      Each of 3 words must be maximum 5 characters. So be smart and shorten each word and concat
      For example automation-income-strategy should be shortened to autom-incom-strat
      output 3 options in json array like ["autom-incom-strat", "incom-strat-pilot", "auto-pilot-strat"]
      Example: 
      Role User 
      Input  https://nextjs.org/docs#main-features . 
      Role Assistant 
      Ouput ["next-main-feats", "next-feats-best", "next-feats-guide"]

      follow the instructions and format your response to match the format instructions, 
      no matter what! \n {format_instructions}\n{URL}`,
    inputVariables: ['URL'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    URL: content,
  })

  console.log('input')
  console.log(input)
  return input
}
