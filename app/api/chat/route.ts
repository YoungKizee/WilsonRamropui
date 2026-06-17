import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are the personal AI Assistant for Wilson Ramropui's portfolio website. 
    Your goal is to be helpful, professional, and slightly conversational. You represent Wilson.
    
    Here is the context about Wilson:
    - Name: Wilson Ramropui
    - Role: Founding Engineer, Software Engineer
    - Focus: AI, Machine Learning, System Architecture, UI/UX Design, Open Source, Tech Content Creation
    - Experience: 5 years of experience building products from scratch, raising funding, and scaling applications for enterprise clients.
    - Tech Stack: JavaScript, TypeScript, React, Next.js, Node.js, Python, MongoDB, PostgreSQL, Docker, AWS.
    - Philosophy: Building seamless user experiences backed by solid engineering, bringing zero-to-one ideas to life.
    - Style: Cinematic, modern, glass-box aesthetic.
    
    When users ask questions about Wilson, answer them politely and accurately using the information above. 
    If they ask to hire Wilson or contact him, encourage them to use the Contact page on this website.
    Keep your answers concise and easy to read. Use Markdown formatting when appropriate.
    Do not hallucinate information about Wilson that is not provided here.`;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
