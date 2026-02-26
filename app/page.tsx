"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { ASSISTANT_CONFIG } from "@/lib/vapi-config";

// ---------- Types ----------
interface TranscriptMessage {
  role: "assistant" | "user";
  text: string;
  id: string;
}

type CallStatus = "idle" | "connecting" | "active" | "speaking";

// ---------- Component ----------
export default function Home() {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const vapiRef = useRef<Vapi | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // ---- Initialize Vapi ----
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey || publicKey === "your_vapi_public_key_here") {
      console.warn(
        "⚠️ VAPI public key not configured. Set NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env.local"
      );
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    // Event handlers
    vapi.on("call-start", () => {
      setCallStatus("active");
    });

    vapi.on("call-end", () => {
      setCallStatus("idle");
      setIsSpeaking(false);
      setVolumeLevel(0);
    });

    vapi.on("speech-start", () => {
      setIsSpeaking(true);
      setCallStatus("speaking");
    });

    vapi.on("speech-end", () => {
      setIsSpeaking(false);
      setCallStatus("active");
    });

    vapi.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapi.on("message", (msg: Record<string, unknown>) => {
      if (msg.type === "transcript" && msg.transcriptType === "final") {
        const role = msg.role as "assistant" | "user";
        const text = msg.transcript as string;
        if (text && text.trim()) {
          setMessages((prev) => [
            ...prev,
            { role, text, id: `${Date.now()}-${Math.random()}` },
          ]);
        }
      }
    });

    vapi.on("error", (error: unknown) => {
      console.error("Vapi error:", error);
      setCallStatus("idle");
    });

    return () => {
      vapi.stop();
    };
  }, []);

  // ---- Auto-scroll transcript ----
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  // ---- Start / Stop Call ----
  const toggleCall = useCallback(async () => {
    const vapi = vapiRef.current;
    if (!vapi) {
      alert(
        "Vapi is not initialized. Please set your NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env.local"
      );
      return;
    }

    if (callStatus === "idle") {
      setCallStatus("connecting");
      setMessages([]);
      try {
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
        const overrides = {
          variableValues: {
            now: new Date().toLocaleString()
          }
        };

        if (assistantId) {
          await vapi.start(assistantId, overrides);
        } else {
          // Use inline assistant config
          await vapi.start(ASSISTANT_CONFIG as Parameters<typeof vapi.start>[0]);
        }
      } catch (err) {
        console.error("Failed to start call:", err);
        setCallStatus("idle");
      }
    } else {
      vapi.stop();
      setCallStatus("idle");
    }
  }, [callStatus]);

  // ---- Derive UI state ----
  const orbClass = `orb-container orb-container--${isSpeaking ? "speaking" : callStatus}`;

  const statusText: Record<CallStatus, string> = {
    idle: "Ready to schedule",
    connecting: "Connecting...",
    active: "Listening...",
    speaking: "Assistant speaking...",
  };

  const statusDotClass = `status-dot ${callStatus === "active" || callStatus === "speaking"
    ? "status-dot--active"
    : callStatus === "connecting"
      ? "status-dot--connecting"
      : ""
    }`;

  // ---- Orb dynamic style from volume ----
  const orbDynamicStyle =
    callStatus === "active" || callStatus === "speaking"
      ? {
        transform: `scale(${1 + volumeLevel * 0.15})`,
        boxShadow: `0 0 ${40 + volumeLevel * 60}px var(--accent-glow), 0 0 ${80 + volumeLevel * 120
          }px rgba(124, 88, 255, ${0.1 + volumeLevel * 0.15})`,
      }
      : {};

  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <span className="header__badge-dot" />
          Susilkessav&apos;s Assistant
        </div>
        <h1 className="header__title">Schedule a Meeting</h1>
        <p className="header__subtitle">
          Speak with my AI assistant to easily schedule, reschedule, or manage
          a meeting with me.
        </p>
      </header>

      {/* Orb */}
      <div className={orbClass} onClick={toggleCall} title="Click to start/stop">
        <div className="orb" style={orbDynamicStyle} />
        <div className="orb-ring" />
        <div className="orb-ring" />
        <div className="orb-ring" />
      </div>

      {/* Status */}
      <div className="status-label">
        <span className={statusDotClass} />
        {statusText[callStatus]}
      </div>

      {/* Button */}
      <button
        id="call-toggle-btn"
        className={`call-btn ${callStatus === "idle" ? "call-btn--start" : "call-btn--stop"
          }`}
        onClick={toggleCall}
        disabled={callStatus === "connecting"}
      >
        <span className="call-btn__icon">
          {callStatus === "idle" ? "🎙️" : "⏹️"}
        </span>
        {callStatus === "idle"
          ? "Start Scheduling"
          : callStatus === "connecting"
            ? "Connecting..."
            : "End Call"}
      </button>

      {/* Transcript */}
      {messages.length > 0 && (
        <div className="transcript-panel">
          <div className="transcript-panel__header">
            <span className="transcript-panel__header-icon">💬</span>
            Live Transcript
          </div>
          <div className="transcript-panel__body" ref={transcriptRef}>
            {messages.map((msg) => (
              <div key={msg.id} className="message">
                <div
                  className={`message__avatar message__avatar--${msg.role === "assistant" ? "ai" : "user"
                    }`}
                >
                  {msg.role === "assistant" ? "AI" : "You"}
                </div>
                <div className="message__content">
                  <div
                    className={`message__role message__role--${msg.role === "assistant" ? "ai" : "user"
                      }`}
                  >
                    {msg.role === "assistant" ? "Assistant" : "You"}
                  </div>
                  <div className="message__text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
