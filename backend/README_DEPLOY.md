# Backend Deployment Guide

## Option 1: Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `pip install -r requirements.txt && playwright install chromium && playwright install-deps chromium`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
5. Add environment variable:
   - `FRONTEND_URL`: Your Vercel URL
6. Deploy!

## Option 2: Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch` in the backend directory
3. Follow prompts
4. Add environment variable: `fly secrets set FRONTEND_URL=https://your-app.vercel.app`
5. Deploy: `fly deploy`

## After Deployment

1. Update your frontend code to use the backend URL instead of `localhost:8000`
2. Set environment variable in Vercel:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)

## Environment Variables Needed

**Backend:**
- `FRONTEND_URL`: Your Vercel frontend URL
- `ALLOWED_ORIGINS`: (Optional) Comma-separated list of additional allowed origins

**Frontend:**
- `NEXT_PUBLIC_API_URL`: Your backend URL
