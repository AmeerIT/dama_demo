"use client";

import { useMemo, useEffect, useState } from "react";
import { listFonts, getFontUrl } from "@/lib/appwrite/cms-data";
import { extractYouTubeId, isYouTubeUrl } from "@/lib/utils/youtube";

interface LexicalRendererProps {
  content: string;
}

interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  url?: string;
  src?: string;
  alt?: string;
  listType?: string;
  videoId?: string;
  style?: string;
  direction?: 'ltr' | 'rtl' | null;
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
  };
}

// Format flags
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

function renderText(text: string, format: number = 0, style?: string): React.ReactNode {
  let node: React.ReactNode = text;

  if (format & IS_CODE) {
    node = <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{node}</code>;
  }
  if (format & IS_BOLD) {
    node = <strong>{node}</strong>;
  }
  if (format & IS_ITALIC) {
    node = <em>{node}</em>;
  }
  if (format & IS_UNDERLINE) {
    node = <u>{node}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    node = <s>{node}</s>;
  }

  return node;
}

function parseInlineStyles(styleString?: string): React.CSSProperties {
  if (!styleString) return {};

  const styles: React.CSSProperties = {};
  const stylePairs = styleString.split(';').filter(Boolean);

  stylePairs.forEach(pair => {
    const [key, value] = pair.split(':').map(s => s.trim());
    if (key && value) {
      // Convert CSS property names to camelCase for React
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styles[camelKey as keyof React.CSSProperties] = value as any;
    }
  });

  return styles;
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`;

  switch (node.type) {
    case "text":
      const inlineStyles = parseInlineStyles(node.style);
      const hasStyles = Object.keys(inlineStyles).length > 0;

      return (
        <span key={key} style={hasStyles ? inlineStyles : undefined}>
          {renderText(node.text || "", node.format, node.style)}
        </span>
      );

    case "paragraph":
      return (
        <div
          key={key}
          className="mb-6 leading-[1.8] text-lg text-foreground"
          dir={node.direction || undefined}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </div>
      );

    case "heading":
      const tag = node.tag || "h2";
      const headingClasses: Record<string, string> = {
        h1: "text-4xl md:text-5xl font-bold mt-12 mb-6",
        h2: "text-3xl md:text-4xl font-bold mt-10 mb-5",
        h3: "text-2xl md:text-3xl font-semibold mt-8 mb-4",
        h4: "text-xl md:text-2xl font-semibold mt-6 mb-3",
        h5: "text-lg md:text-xl font-semibold mt-5 mb-2",
        h6: "text-base md:text-lg font-semibold mt-4 mb-2",
      };
      const headingContent = node.children?.map((child, i) => renderNode(child, i));
      const dirAttr = node.direction || undefined;

      switch (tag) {
        case "h1": return <h1 key={key} className={headingClasses.h1} dir={dirAttr}>{headingContent}</h1>;
        case "h2": return <h2 key={key} className={headingClasses.h2} dir={dirAttr}>{headingContent}</h2>;
        case "h3": return <h3 key={key} className={headingClasses.h3} dir={dirAttr}>{headingContent}</h3>;
        case "h4": return <h4 key={key} className={headingClasses.h4} dir={dirAttr}>{headingContent}</h4>;
        case "h5": return <h5 key={key} className={headingClasses.h5} dir={dirAttr}>{headingContent}</h5>;
        case "h6": return <h6 key={key} className={headingClasses.h6} dir={dirAttr}>{headingContent}</h6>;
        default: return <h2 key={key} className={headingClasses.h2} dir={dirAttr}>{headingContent}</h2>;
      }

    case "link":
      // Check if link is a YouTube URL and convert to embed
      if (node.url && isYouTubeUrl(node.url)) {
        const videoId = extractYouTubeId(node.url);
        if (videoId) {
          return (
            <figure key={key} className="my-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video"
                />
              </div>
            </figure>
          );
        }
      }

      // Regular link
      return (
        <a
          key={key}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );

    case "list":
      const ListTag = node.listType === "number" ? "ol" : "ul";
      const listClass = node.listType === "number"
        ? "list-decimal list-inside mb-4 space-y-1"
        : "list-disc list-inside mb-4 space-y-1";
      return (
        <ListTag key={key} className={listClass} dir={node.direction || undefined}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );

    case "listitem":
      return (
        <li key={key}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-s-4 border-primary ps-4 my-4 italic text-muted-foreground"
          dir={node.direction || undefined}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case "code":
      return (
        <pre key={key} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
          <code className="text-sm font-mono">
            {node.children?.map((child, i) => renderNode(child, i))}
          </code>
        </pre>
      );

    case "image":
      return (
        <figure key={key} className="my-6">
          <img
            src={node.src}
            alt={node.alt || ""}
            className="rounded-lg max-w-full h-auto"
          />
          {node.alt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {node.alt}
            </figcaption>
          )}
        </figure>
      );

    case "youtube":
      return (
        <figure key={key} className="my-6">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${node.videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={node.alt || "YouTube video"}
            />
          </div>
          {node.alt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {node.alt}
            </figcaption>
          )}
        </figure>
      );

    case "linebreak":
      return <br key={key} />;

    default:
      // Handle unknown node types by rendering children if they exist
      if (node.children) {
        return (
          <div key={key}
            style={{
              fontSize: "clamp(10vw, 14vw, 15vw)",
            }}
          >
            {node.children.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const result = await listFonts();

        // Inject font CSS
        const fontCSS = result.documents
          .map((font) => {
            const url = getFontUrl(font.file_id);
            return `
@font-face {
  font-family: '${font.family}';
  src: url('${url}') format('woff2');
  font-weight: ${font.weight};
  font-style: ${font.style};
  font-display: swap;
}`;
          })
          .join('\n');

        // Remove existing custom font style if present
        const existingStyle = document.getElementById('custom-fonts-renderer-style');
        if (existingStyle) {
          existingStyle.remove();
        }

        // Inject new style
        if (fontCSS.trim()) {
          const styleElement = document.createElement('style');
          styleElement.id = 'custom-fonts-renderer-style';
          styleElement.textContent = fontCSS;
          document.head.appendChild(styleElement);
        }

        setFontsLoaded(true);
      } catch (error) {
        console.error('Failed to load fonts:', error);
        setFontsLoaded(true); // Continue rendering even if fonts fail
      }
    };

    loadFonts();
  }, []);

  const parsedContent = useMemo(() => {
    try {
      // Try parsing as JSON (Lexical format)
      const parsed: LexicalContent = JSON.parse(content);
      return parsed;
    } catch {
      // If not JSON, treat as plain text or HTML
      return null;
    }
  }, [content]);

  if (!parsedContent) {
    // Fallback: render as HTML or plain text
    return (
      <div
        className="w-full overflow-hidden"
        style={{
          containerType: "inline-size",
        }}>

        <div
          className="max-w-full break-all overflow-hidden"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            fontSize: "clamp(10vw, 14vw, 15vw)",
            overflowWrap: "break-word",
            wordBreak: "break-all",
          }}
        />
      </div>
    );
  }

  return (
    <div className="lexical-content">
      {parsedContent.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}

