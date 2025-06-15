# 🚀 GitHub Deployment Guide

## Automated Deployment (Recommended)

### Step 1: Repository Setup
1. Create a new repository on GitHub
2. Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MomentScience Developer Hub"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Update Configuration
1. Edit `vite.config.ts` and update the `base` path:
   ```typescript
   base: '/your-repo-name/', // Replace with your actual repo name
   ```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Choose "gh-pages" branch
5. Click Save

### Step 4: Automatic Deployment
The GitHub Actions workflow will automatically:
- Build the project when you push to main
- Deploy to GitHub Pages
- Your site will be available at: `https://yourusername.github.io/your-repo-name/`

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Alternative Hosting Options

### Vercel (Recommended for Production)
1. Visit [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Vercel will auto-detect Vite and deploy automatically
4. Get a custom domain like `momentscience-hub.vercel.app`

### Netlify
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder after running `npm run build`
3. Or connect your GitHub repository for automatic deploys

## Environment Variables
For production deployment, you may want to add:
- API endpoints
- Analytics tracking
- Error monitoring

## Domain Setup
Once deployed, you can:
1. Add a custom domain in GitHub Pages settings
2. Use Cloudflare for CDN and SSL
3. Set up proper DNS records

## Troubleshooting

### Build Fails
- Check Node.js version (requires 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors with `npm run lint`

### Deployment Issues
- Ensure the `base` path in `vite.config.ts` matches your repository name
- Check that GitHub Pages is enabled in repository settings
- Verify the `gh-pages` branch exists after first deployment

### Routing Issues
- React Router requires proper server configuration
- GitHub Pages serves static files, so routing works correctly
- For custom domains, ensure proper redirects are set up
