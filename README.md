# 🎙️ Voice Scheduling Agent

A real-time voice assistant that schedules meetings by collecting your name, preferred date & time, and an optional meeting title — then creates a real Google Calendar event.

**Tech Stack:** [Vapi](https://vapi.ai) · Next.js · Google Calendar · Vercel

---

## ✨ Features

- 🗣️ **Natural Voice Conversation** — Speak naturally to schedule meetings
- 📅 **Google Calendar Integration** — Creates real calendar events
- 🤖 **GPT-4o Powered** — Intelligent conversation with context awareness
- 🎧 **Real-time Transcription** — Live transcript display during calls
- 🎨 **Premium UI** — Animated voice orb with volume-reactive effects
- ⚡ **Instant Deployment** — One-click Vercel deploy

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VAPI_PRIVATE_KEY=your_vapi_private_key_here
```

### 3. Set up Vapi + Google Calendar

1. Create an account at [dashboard.vapi.ai](https://dashboard.vapi.ai)
2. Go to **Organization Settings** → copy your **Public Key** and **Private Key**
3. Go to **Integrations → Tools Provider → Google Calendar** → click **Connect** and authorize
4. *(Optional)* Create an assistant in the dashboard and add Google Calendar tools

> ℹ️ The app can either use a pre-configured assistant ID (`NEXT_PUBLIC_VAPI_ASSISTANT_ID`) or create the assistant inline with the config in `lib/vapi-config.ts`.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Start Scheduling**.

---

## 🌐 Deploy to Vercel

### Option A: CLI

```bash
npx vercel
```

### Option B: GitHub Integration

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Post-Deploy

After deploying, set your **Server URL** in the Vapi Dashboard:
```
https://your-app.vercel.app/api/vapi/webhook
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/vapi/webhook/
│   │   └── route.ts          # Vapi webhook handler
│   ├── globals.css            # Global styles & animations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main voice UI page
├── lib/
│   └── vapi-config.ts         # Vapi assistant configuration
├── .env.example               # Environment variable template
└── README.md
```

## 🔧 How It Works

1. **User clicks "Start Scheduling"** → `@vapi-ai/web` SDK opens a WebSocket to Vapi
2. **Vapi orchestrates the conversation** using GPT-4o with the system prompt in `lib/vapi-config.ts`
3. **User speaks naturally** — name, date/time, optional title are collected conversationally
4. **Assistant confirms details** and calls the `google.calendar.event.create` tool
5. **Vapi's built-in Google Calendar integration** creates the real calendar event
6. **Webhook** at `/api/vapi/webhook` receives status updates and call reports

---

## 📝 License

MIT
