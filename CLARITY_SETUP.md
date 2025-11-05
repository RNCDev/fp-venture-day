# Microsoft Clarity Analytics Setup Guide

This guide walks you through setting up Microsoft Clarity analytics for the Venture Day Archives website.

## Prerequisites

- Access to the GitHub repository
- A Microsoft account (Outlook, Hotmail, or Microsoft account)
- Local development environment set up (Node.js installed)

---

## Step 1: Create Microsoft Clarity Account

1. **Visit Microsoft Clarity**
   - Go to: https://clarity.microsoft.com/
   - Click **"Sign up free"** or **"Get started"**

2. **Sign in with Microsoft Account**
   - Use your existing Microsoft account, or create a new one
   - Accept the terms of service

3. **Complete initial setup**
   - Follow the on-screen prompts to complete your profile

---

## Step 2: Create a Clarity Project

1. **Add a new project**
   - Once logged in, click **"Add new project"** or **"Create project"**
   - You'll see a form to create your first project

2. **Enter project details**
   - **Project name**: `Venture Day Archives` (or any name you prefer)
   - **Website URL**: `https://rncdev.github.io/fp-venture-day/`
   - **Project visibility**: Choose **"Public"** (recommended for public websites)
   - Click **"Create"**

3. **Copy your Clarity script**
   - After creating the project, you'll be taken to the project dashboard
   - Look for a section titled **"Install Clarity"** or **"Setup"**
   - You'll see a script snippet that looks like this:
     ```html
     <script type="text/javascript">
         (function(c,l,a,r,i,t,y){
             c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
             t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
             y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
         })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
     </script>
     ```
   - **Important**: Copy the entire script tag. It contains a unique project ID (the long string in the `"script"` parameter)

---

## Step 3: Modify the Build Script

1. **Open `build.js` in your code editor**
   - Navigate to the project root directory
   - Open `build.js`

2. **Locate the `generateHTML` function**
   - Find the function that starts around line 91
   - Look for the `<head>` section (around line 94-116)

3. **Add Clarity script to the `<head>` section**
   - You'll add the Clarity script right before the closing `</head>` tag
   - Find this section (around line 116):
     ```javascript
     <!-- Preload critical fonts -->
     <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">
     </head>
     ```
   - Add the Clarity script snippet BEFORE the closing `</head>` tag
   - Replace `YOUR_PROJECT_ID` with the actual project ID from Step 2

4. **Example modification**
   - Your modified section should look like this:
     ```javascript
     <!-- Preload critical fonts -->
     <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">
     
     <!-- Microsoft Clarity Analytics -->
     <script type="text/javascript">
         (function(c,l,a,r,i,t,y){
             c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
             t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
             y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
         })(window, document, "clarity", "script", "YOUR_ACTUAL_PROJECT_ID_HERE");
     </script>
     </head>
     ```

---

## Step 4: Build and Test Locally

1. **Build the site**
   ```bash
   npm run build
   ```
   - This regenerates `index.html` with the Clarity script included

2. **Verify the script was added**
   - Open `index.html` in a text editor
   - Search for "clarity" or "clarity.ms"
   - You should see the script tag in the `<head>` section

3. **Test locally**
   ```bash
   npm run dev
   ```
   - Open your browser to `http://localhost:8000`
   - Open browser Developer Tools (F12 or Right-click → Inspect)
   - Go to the **Network** tab
   - Refresh the page
   - Look for a request to `clarity.ms` - this confirms Clarity is loading

4. **Verify in Clarity dashboard**
   - Go back to your Clarity dashboard: https://clarity.microsoft.com/
   - Open your project
   - You should see activity appear within a few minutes (may take 5-10 minutes for first visit to register)
   - Note: Clarity needs real pageviews to show data, so localhost testing may not show up immediately

---

## Step 5: Deploy to GitHub Pages

1. **Commit your changes**
   ```bash
   # Stage the modified files
   git add build.js index.html
   
   # Commit with a descriptive message
   git commit -m "Add Microsoft Clarity analytics integration"
   ```

2. **Push to GitHub**
   ```bash
   git push
   ```

3. **Wait for GitHub Pages to update**
   - GitHub Pages typically updates within 1-2 minutes
   - Visit your live site: https://rncdev.github.io/fp-venture-day/

4. **Verify Clarity is working on live site**
   - Visit your live site
   - Open Developer Tools → Network tab
   - Look for requests to `clarity.ms`
   - Alternatively, check your Clarity dashboard - you should see a new session appear within 5-10 minutes

---

## Step 6: Verify Setup (Post-Deployment)

1. **Check Clarity Dashboard**
   - Go to: https://clarity.microsoft.com/
   - Open your project
   - Wait 5-10 minutes after visiting the live site
   - You should see:
     - A new session recorded
     - Page views increasing
     - Real-time visitors (if someone is currently on the site)

2. **Test Clarity Features**
   - **Recordings**: Click on "Recordings" tab to see session replays
   - **Heatmaps**: Click on "Heatmaps" to see where users click and scroll
   - **Insights**: Check the dashboard for automatic insights about user behavior

---

## Troubleshooting

### Clarity script not appearing in generated HTML
- **Check**: Make sure you added the script in the correct location (before `</head>`)
- **Rebuild**: Run `npm run build` again after making changes
- **Verify**: Open `index.html` and search for "clarity" to confirm it's there

### No data appearing in Clarity dashboard
- **Wait**: Clarity can take 5-10 minutes to show first data
- **Check**: Make sure you visited the live site (not just localhost)
- **Verify**: Check browser console for any errors related to Clarity
- **Confirm**: Ensure the project ID in your script matches the one in your Clarity dashboard

### Script tag format issues
- **Important**: The script must be a complete, valid JavaScript block
- **Check**: Make sure all quotes are properly escaped if needed
- **Verify**: Test the script in browser console to ensure it runs without errors

### GitHub Pages not updating
- **Wait**: Sometimes GitHub Pages takes a few minutes to rebuild
- **Check**: Verify your commit was pushed successfully (`git log`)
- **Hard refresh**: Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Future Updates

### To update Clarity settings:
- Log into https://clarity.microsoft.com/
- Navigate to your project settings
- Most changes don't require code updates

### To remove Clarity:
- Simply remove the script tag from `build.js`
- Run `npm run build`
- Commit and push the changes

### To disable Clarity temporarily:
- Comment out the script tag in `build.js` using `<!-- -->`
- Rebuild and redeploy

---

## Additional Resources

- **Microsoft Clarity Documentation**: https://docs.microsoft.com/en-us/clarity/
- **Clarity Dashboard**: https://clarity.microsoft.com/
- **Clarity Features**: Heatmaps, Session Recordings, Insights, Funnels

---

## Security & Privacy Notes

- Clarity is GDPR compliant and privacy-focused
- Clarity does not collect personal information
- Session recordings are anonymized
- You can configure data retention in Clarity settings
- Consider adding a privacy policy update if you don't already have one

---

**Setup completed!** Your analytics should start tracking within minutes of deployment.

