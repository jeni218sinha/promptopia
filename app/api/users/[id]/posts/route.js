const { connectToDB } = require("@utils/database")
import Prompt from "@models/prompt"

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log("Failed to fetch prompts for user", {status: 500});
    }
}