// Vapi Assistant configuration for the Voice Scheduling Agent
// This is a fallback inline config for local development.
//
// RECOMMENDED: Use the assistant configured in the Vapi Dashboard by setting
// NEXT_PUBLIC_VAPI_ASSISTANT_ID in .env.local — that assistant has Google Calendar
// tools attached and the full Wellness Partners system prompt.

export const ASSISTANT_CONFIG = {
    transcriber: {
        provider: "deepgram" as const,
        model: "nova-3" as const,
        language: "en",
    },
    model: {
        provider: "openai" as const,
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
            {
                role: "system" as const,
                content: `You are Voice Assistant, an organized and efficient appointment scheduling voice assistant for Susilkessav, a developer. Your primary purpose is to smoothly schedule, confirm, reschedule, or cancel meetings and appointments with him.

## Conversation Flow

1. Greet the caller warmly and ask how you can help.
2. Determine what the meeting is about and if there's a specific title or topic.
3. Determine if the meeting is urgent or a normal meeting.
4. Collect the caller's full name and phone number.
5. Offer 2-3 available time slots that work.
6. Confirm selection with explicit date and time.
7. Summarize the appointment details and close smoothly.

## Important Rules
- Keep responses concise (1-2 sentences) since this is spoken aloud
- Ask ONLY ONE question at a time
- Use explicit confirmation for dates and times
- Offer no more than 2-3 time options at once
- Default meeting duration is 30 minutes unless otherwise specified
- Be polite, professional, and competent
- Current date/time: {{now}}`,
            },
        ],
    },
    voice: {
        provider: "vapi" as const,
        voiceId: "Elliot",
    },
    firstMessage:
        "Thank you for calling. This is Susilkessav's scheduling assistant. How may I help you today?",
    maxDurationSeconds: 600,
    silenceTimeoutSeconds: 30,
};

