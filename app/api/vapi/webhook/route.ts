import { NextRequest, NextResponse } from "next/server";

/**
 * Vapi Webhook / Server URL Handler
 *
 * This endpoint receives POST requests from Vapi during conversations.
 * Event types include:
 * - assistant-request: Vapi asks your server for assistant configuration
 * - function-call: The assistant wants to execute a server-side function
 * - status-update: Call status changes (started, ended, etc.)
 * - transcript: Real-time transcript updates
 * - end-of-call-report: Final call summary with transcript and metadata
 * - hang: The assistant failed to respond for too long
 */

interface VapiMessage {
    message: {
        type: string;
        call?: Record<string, unknown>;
        functionCall?: {
            name: string;
            parameters: Record<string, unknown>;
        };
        status?: string;
        transcript?: string;
        [key: string]: unknown;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: VapiMessage = await request.json();
        const { message } = body;

        console.log(`[Vapi Webhook] Received: ${message.type}`);

        switch (message.type) {
            case "assistant-request": {
                // Vapi is asking for assistant configuration
                // This allows dynamic assistant config per call
                console.log("[Vapi Webhook] Assistant request received");
                return NextResponse.json({
                    // Return empty to use the assistant config from the SDK/dashboard
                });
            }

            case "function-call": {
                // Handle custom server-side function calls
                const functionCall = message.functionCall;
                console.log(
                    `[Vapi Webhook] Function call: ${functionCall?.name}`,
                    functionCall?.parameters
                );

                // Google Calendar events are handled natively by Vapi's built-in tools,
                // so we don't need to handle them here. This is for any additional
                // custom server-side functions you might add later.

                return NextResponse.json({
                    result: "Function executed successfully",
                });
            }

            case "status-update": {
                console.log(`[Vapi Webhook] Call status: ${message.status}`);
                return NextResponse.json({ ok: true });
            }

            case "transcript": {
                console.log(`[Vapi Webhook] Transcript update`);
                return NextResponse.json({ ok: true });
            }

            case "end-of-call-report": {
                console.log("[Vapi Webhook] Call ended. Report:", {
                    duration: message.call,
                });
                // You could store call data, send notifications, etc.
                return NextResponse.json({ ok: true });
            }

            case "hang": {
                console.log("[Vapi Webhook] Hang notification — assistant unresponsive");
                return NextResponse.json({ ok: true });
            }

            default: {
                console.log(`[Vapi Webhook] Unhandled event: ${message.type}`);
                return NextResponse.json({ ok: true });
            }
        }
    } catch (error) {
        console.error("[Vapi Webhook] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Voice Scheduling Agent — Vapi Webhook",
        timestamp: new Date().toISOString(),
    });
}
