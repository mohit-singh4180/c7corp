module.exports = `
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 12mm 14mm 12mm;

      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-left {
        content: "React Native Architectural & Engineering Reference";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #94a3b8;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.48;
      font-size: 8.8pt;
      margin: 0;
      padding: 0;
    }

    .cover-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%);
      color: #ffffff;
      padding: 24px 28px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.15);
    }

    .cover-title {
      font-size: 20pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0 0 6px 0;
      color: #ffffff;
      line-height: 1.2;
    }

    .cover-subtitle {
      font-size: 10.5pt;
      color: #93c5fd;
      font-weight: 500;
      margin: 0 0 14px 0;
      line-height: 1.4;
    }

    .cover-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .cover-tag {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #f8fafc;
      font-size: 7.2pt;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.3px;
    }

    .toc-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 18px;
      margin-bottom: 20px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .toc-title {
      font-size: 10pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .toc-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px 16px;
    }

    .toc-item {
      font-size: 8pt;
      color: #2563eb;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .toc-item:hover {
      text-decoration: underline;
    }

    h1 {
      font-size: 16pt;
      font-weight: 800;
      color: #1e3a8a;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 4px;
      margin: 0 0 10px 0;
    }

    h2 {
      font-size: 11pt;
      font-weight: 700;
      color: #1e40af;
      background-color: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 6px 10px;
      margin: 22px 0 10px 0;
      border-radius: 0 4px 4px 0;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3 {
      font-size: 9.3pt;
      font-weight: 700;
      color: #0369a1;
      margin: 12px 0 4px 0;
      page-break-after: avoid;
      break-after: avoid;
    }

    p {
      margin: 0 0 6px 0;
      text-align: justify;
    }

    ul, ol {
      margin: 3px 0 7px 18px;
      padding: 0;
    }

    li {
      margin-bottom: 3px;
    }

    strong {
      color: #0f172a;
      font-weight: 650;
    }

    code {
      font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, Menlo, monospace;
      font-size: 7.8pt;
      background-color: #f1f5f9;
      color: #0369a1;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }

    pre {
      background-color: #0f172a;
      color: #e2e8f0;
      font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, Menlo, monospace;
      font-size: 7.4pt;
      line-height: 1.36;
      padding: 8px 12px;
      border-radius: 6px;
      margin: 4px 0 8px 0;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
      border-left: 3px solid #38bdf8;
      page-break-inside: auto;
      break-inside: auto;
    }

    pre code {
      background-color: transparent;
      color: #f8fafc;
      padding: 0;
      border: none;
      font-size: 7.4pt;
    }

    .code-container {
      margin: 8px 0 12px 0;
      page-break-inside: auto;
      break-inside: auto;
    }

    .code-label {
      display: block;
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #475569;
      margin-bottom: 2px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .diagram-box {
      background-color: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 8px 0 12px 0;
      font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace;
      font-size: 7.1pt;
      line-height: 1.35;
      color: #0f172a;
      white-space: pre;
      overflow-x: auto;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 7.8pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #1e3a8a;
      color: #ffffff;
      font-weight: 700;
      font-size: 7.9pt;
      letter-spacing: 0.2px;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    .qa-section {
      background: #fdfefe;
      border: 1.5px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px 14px;
      margin: 14px 0 10px 0;
      page-break-inside: auto;
      break-inside: auto;
    }

    .qa-section h3 {
      color: #1d4ed8;
      font-size: 9.8pt;
      margin: 0 0 10px 0;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #93c5fd;
      page-break-after: avoid;
      break-after: avoid;
    }

    .qa-block {
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 8px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .qa-block:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .qa-block pre {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .qa-q {
      font-weight: 700;
      color: #0f172a;
      font-size: 8.6pt;
      margin-bottom: 4px;
      display: flex;
      align-items: baseline;
      gap: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .qa-badge {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }

    .qa-a {
      color: #334155;
      font-size: 8.3pt;
      line-height: 1.45;
      padding-left: 2px;
    }

    .qa-a strong {
      color: #1e293b;
    }

    .qa-a pre {
      margin: 5px 0 6px 0;
    }

    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @media print {
      body {
        font-size: 8.2pt;
        line-height: 1.38;
      }
      .cover-header {
        padding: 16px 20px;
        margin-bottom: 14px;
      }
      .cover-title {
        font-size: 17pt;
      }
      h2 {
        margin: 16px 0 8px 0;
      }
      pre {
        font-size: 7pt;
        line-height: 1.32;
        padding: 6px 10px;
      }
      .diagram-box {
        font-size: 6.6pt;
        padding: 8px 10px;
      }
    }
  </style>
`;
