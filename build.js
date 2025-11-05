const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Parse markdown with frontmatter
function parseMarkdownWithFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found in content.md');
  }
  
  const frontmatter = yaml.load(match[1]);
  const markdown = match[2];
  
  return { frontmatter, markdown };
}

// Parse sessions from markdown
function parseSessions(markdown) {
  const yearSections = markdown.split(/^##\s+(\d{4})\s*$/m);
  const years = {};
  
  for (let i = 1; i < yearSections.length; i += 2) {
    const year = yearSections[i];
    const content = yearSections[i + 1];
    
    const sessions = [];
    
    // Split content into lines for easier parsing
    const lines = content.split(/\r?\n/);
    let currentSession = null;
    
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      
      // Check for session time (### 8:30am – 8:45am)
      if (line.match(/^###\s+.+$/)) {
        // Save previous session if exists
        if (currentSession) {
          sessions.push(currentSession);
        }
        
        // Start new session
        const time = line.replace(/^###\s+/, '').trim();
        currentSession = {
          time: time,
          speaker: null,
          description: null,
          isLunch: false
        };
      }
      // Check for speaker name (**Speaker Name**)
      else if (line.match(/^\*\*.*\*\*$/) && currentSession) {
        currentSession.speaker = line.replace(/\*\*/g, '').trim();
        
        // Check if it's a lunch break
        if (currentSession.speaker.includes('LUNCH') || currentSession.speaker.includes('BREAK')) {
          currentSession.isLunch = true;
        }
      }
      // Check for description (non-empty line after speaker)
      else if (line.trim() && currentSession && !currentSession.description && !line.match(/^###/) && !line.match(/^\*\*.*\*\*$/)) {
        // Look ahead to collect all description lines
        let description = line.trim();
        let k = j + 1;
        
        while (k < lines.length && lines[k].trim() && !lines[k].match(/^###/) && !lines[k].match(/^\*\*.*\*\*$/)) {
          description += '\n' + lines[k].trim();
          k++;
        }
        
        currentSession.description = description;
        j = k - 1; // Skip the lines we've already processed
      }
    }
    
    // Don't forget the last session
    if (currentSession) {
      sessions.push(currentSession);
    }
    
    years[year] = sessions;
  }
  
  return years;
}

// Generate HTML
function generateHTML(frontmatter, sessions) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Venture Day Archives - Innovation in Biotechnology</title>
    <meta name="description" content="Explore the annual Venture Day Archives showcasing groundbreaking biotechnology presentations from leading researchers and entrepreneurs.">
    <meta name="keywords" content="venture day, biotechnology, innovation, research, presentations, archives">
    <!-- Version ${frontmatter.version} - ${frontmatter.last_updated} -->
    
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="shortcut icon" href="favicon.ico">
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Preload critical fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">
    
    <!-- Microsoft Clarity Analytics -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "u1k88oidlw");
    </script>
</head>
<body>
    <main class="container" role="main">
        <header class="header" role="banner">
            <div class="version" aria-label="Version">v${frontmatter.version}</div>
            <h1>Venture Day Archives</h1>
        </header>
        
        <section class="content" role="main">
            ${Object.keys(sessions).sort((a, b) => b - a).map(year => generateYearSection(year, sessions[year], frontmatter.years[year], frontmatter.default_year)).join('\n')}
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>`;
}

// Generate year section HTML
function generateYearSection(year, sessions, yearMeta, defaultYear) {
  const supporters = yearMeta?.supporters || [];
  const isDefault = defaultYear && String(year) === String(defaultYear);
  
  return `
            <article class="year-section" data-year="${year}" ${isDefault ? 'data-default="true"' : ''}>
                <header class="year-header${isDefault ? ' active' : ''}" onclick="toggleYear(this)" role="button" tabindex="0" aria-expanded="${isDefault ? 'true' : 'false'}" aria-controls="year-${year}-content">
                    <div class="year-header-left">
                        <h2 class="year-title">${year}</h2>
                        ${supporters.length > 0 ? `
                        <div class="year-supporters" role="list" aria-label="Event supporters">
                            ${supporters.map(supporter => 
                              `<a href="${supporter.url}" target="_blank" class="year-supporter-link" role="listitem" aria-label="Visit ${supporter.name}">${supporter.name}</a>`
                            ).join('\n                            ')}
                        </div>
                        ` : ''}
                    </div>
                    <span class="arrow" aria-hidden="true">▶</span>
                </header>
                <div class="year-content ${isDefault ? 'active' : ''}" id="year-${year}-content" role="region" aria-labelledby="year-${year}-title">
                    <div class="year-inner">
                        ${sessions.map(session => generateSessionHTML(session)).join('\n                        ')}
                    </div>
                </div>
            </article>`;
}

// Generate session HTML
function generateSessionHTML(session) {
  if (session.isLunch) {
    return `<div class="lunch" role="note" aria-label="Break period">
                <time datetime="${session.time}">${session.time}</time>
                <span>${session.speaker}</span>
            </div>`;
  }
  
  return `
                        <article class="session" role="article">
                            <header class="session-header">
                                <time class="session-time" datetime="${session.time}">${session.time}</time>
                                <h3 class="session-speaker">${session.speaker}</h3>
                            </header>
                            ${session.description ? `<div class="session-description">${session.description}</div>` : ''}
                        </article>`;
}

// Main build function
function build() {
  try {
    console.log('Building Venture Day Archives...');
    
    // Read content.md
    const content = fs.readFileSync('content.md', 'utf8');
    const { frontmatter, markdown } = parseMarkdownWithFrontmatter(content);
    
    // Parse sessions
    const sessions = parseSessions(markdown);
    
    // Generate HTML
    const html = generateHTML(frontmatter, sessions);
    
    // Write index.html
    fs.writeFileSync('index.html', html);
    
    console.log(`✅ Built successfully! Version ${frontmatter.version}`);
    console.log(`📅 Years: ${Object.keys(sessions).sort((a, b) => b - a).join(', ')}`);
    console.log(`📄 Generated: index.html`);
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  build();
}

module.exports = {
  parseMarkdownWithFrontmatter,
  parseSessions,
  generateHTML,
  build
};
