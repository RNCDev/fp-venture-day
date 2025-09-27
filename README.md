# Venture Day Archives

A clean, modern website showcasing the Venture Day speaker archives from since 2021. Built with a custom Node.js build system that converts Markdown content to a fast-loading, static site optimized for GitHub Pages.

## 🚀 Live Site

Visit: [https://rncdev.github.io/fp-venture-day/](https://rncdev.github.io/fp-venture-day/)

## 📋 Features

- **Clean Design**: Modern, professional interface with subtle animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Optimized static HTML with minimal CSS
- **Collapsible Years**: Easy navigation through different event years
- **Supporter Integration**: Dynamic supporter links per year
- **Version Tracking**: Built-in version numbering for easy updates

## 🎨 Design

- **Color Scheme**: Dark blue header with light gray background
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Card-based design with hover effects
- **Time Styling**: Dark orange time slots for easy scanning

## 📁 Project Structure

```
fp-venture-day/
├── content.md             # Source content with YAML frontmatter
├── build.js               # Build script
├── styles.css             # External CSS
├── script.js              # External JavaScript
├── index.html             # Generated output
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## 🔧 Development Workflow

### 1. Installation
First, install the necessary Node.js dependencies:
```bash
npm install
```

### 2. Local Development
To make changes, use the watch script:
```bash
npm run watch
```
This command automatically rebuilds `index.html` every time you save a change to `content.md`. You can open the `index.html` file directly in your browser to see your updates.

For a live-reloading server, run this command in a separate terminal:
```bash
npm run dev
```

### 3. Making Changes
All content is managed in `content.md`. This file uses YAML frontmatter for metadata (like version and supporters) and Markdown for the session content. See the `Adding Content` section below for formatting details.

## 🚀 Deployment Workflow

When you're ready to publish your changes:

1.  **Stop the Watcher**: Press `Ctrl+C` in the terminal where `npm run watch` is running.
2.  **Final Build**: It's good practice to run `npm run build` one last time manually to ensure you have the final version.
3.  **Commit and Push**: You **must** commit both the source file (`content.md`) and the generated output file (`index.html`) for your changes to appear on the live site.

    ```bash
    # Add both the content you changed and the resulting html file
    git add content.md index.html

    # Commit the changes
    git commit -m "Update speaker list for 2025"

    # Push to GitHub to deploy
    git push
    ```
GitHub Pages will automatically serve the updated content.

## 📝 Adding Content

#### New Year
1. Add year to YAML frontmatter in `content.md`:
   ```yaml
   years:
     2026:
       supporters:
         - name: "New Supporter"
           url: "https://example.com"
   ```

2. Add year section to Markdown:
   ```markdown
   ## 2026
   
   ### 9:00am – 9:30am
   **New Speaker**
   
   Speaker description...
   ```

#### New Sessions
Use consistent Markdown format:
```markdown
### 9:00am – 9:30am
**Speaker Name**

Speaker description or presentation details.
```

For lunch breaks:
```markdown
### 12:00pm – 1:00pm
**LUNCH**
```

#### New Supporters
Edit the `supporters` array in YAML frontmatter:
```yaml
years:
  2025:
    supporters:
      - name: "Company Name"
        url: "https://company-website.com"
```

## 🛠️ Build System

### Commands

- `npm run build` - Build the site once
- `npm run dev` - Build and serve locally
- `npm run watch` - Watch for changes and rebuild

### How It Works

1. **Parse YAML Frontmatter** - Extract version, supporters, and year metadata
2. **Parse Markdown Content** - Convert sessions and speaker information to structured data
3. **Generate HTML** - Create responsive HTML with collapsible year sections
4. **Output Files** - Write `index.html`, `styles.css`, and `script.js`

### Key Features

- **Automatic supporter links** - Generated from YAML frontmatter per year
- **Responsive design** - Mobile-friendly collapsible interface
- **Version management** - Automatic version display in header
- **Session parsing** - Handles regular sessions and lunch breaks
- **Clean separation** - CSS and JS in external files

## 🛠️ Technical Details

- **Build System**: Custom Node.js with js-yaml
- **Framework**: Pure HTML/CSS/JavaScript
- **Hosting**: GitHub Pages
- **Cache Control**: Optimized headers to prevent caching issues
- **Mobile First**: Responsive design with mobile optimization
- **Performance**: Minimal dependencies, fast loading

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🔧 Development

### Prerequisites
- Node.js 18+ (LTS recommended)
- Git and GitHub repository access

### Local Development
```bash
# Clone the repository
git clone https://github.com/rncdev/fp-venture-day.git
cd fp-venture-day

# Install dependencies
npm install

# Build the site
npm run build

# Serve locally
npm run dev
```

### Troubleshooting

- **Build Issues**: Check YAML syntax in frontmatter and Markdown formatting
- **Deployment Issues**: Check your local build and ensure `index.html` is committed.
- **Content Issues**: Validate supporter URLs and speaker name formatting

## 📞 Contact

For questions or updates, contact the development team.

---

*Built with ❤️ for Venture Day*