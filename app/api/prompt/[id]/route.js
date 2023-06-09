import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Cannot fetch post", {status: 500});
    }
}

//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    console.log(prompt);
    try {
        await connectToDB();
        const exisitingPrompt = await Prompt.findById(params.id);
        if (!exisitingPrompt) {
            return new Response("Prompt Not found", {status: 404});
        }
        console.log(exisitingPrompt);
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;
        await exisitingPrompt.save();
        return new Response(JSON.stringify(exisitingPrompt), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Cannot update post", {status: 500});
    }
}

// DELETE
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted", {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Unable to delete the post", {status: 500});
    }
}