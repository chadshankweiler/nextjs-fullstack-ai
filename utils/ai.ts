import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { PromptTemplate } from "langchain/prompts";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe("The mood of the person who wrote the journal entry."),
        summary: z.string().describe("quick summery of the entire entry."),
        subject: z.string().describe("The subject of the journal entry."),
        negative: z
            .boolean()
            .describe(
                "Is the journal entry negative? (i.e. does it contain negative emotion?)."
            ),
        color: z
            .string()
            .describe(
                "a hexidecimal color code that represents the mood of the journal entry. Example #1010fe for blue representing happiness."
            ),
    })
);

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
            "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
        inputVariables: ["entry"],
        partialVariables: { format_instructions },
    });

    const input = await prompt.format({
        entry: content,
    });

    return input;
};

export const analyse = async (content) => {
    const input = await getPrompt(content);
    const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
    const result = await model.call(input);

    try {
        return parser.parse(result);
    } catch (e) {
        console.log(e);
    }
};
