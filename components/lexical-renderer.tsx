"use client";

import { useMemo } from "react";

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

function renderText(text: string, format: number = 0): React.ReactNode {
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

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`;

  switch (node.type) {
    case "text":
      return <span key={key}>{renderText(node.text || "", node.format)}</span>;

    case "paragraph":
      return (
        <p key={key} className="mb-4 leading-relaxed">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );

    case "heading":
      const tag = node.tag || "h2";
      const headingClasses: Record<string, string> = {
        h1: "text-3xl font-bold mt-8 mb-4",
        h2: "text-2xl font-bold mt-6 mb-3",
        h3: "text-xl font-semibold mt-5 mb-2",
        h4: "text-lg font-semibold mt-4 mb-2",
        h5: "text-base font-semibold mt-3 mb-2",
        h6: "text-sm font-semibold mt-3 mb-2",
      };
      const headingContent = node.children?.map((child, i) => renderNode(child, i));

      switch (tag) {
        case "h1": return <h1 key={key} className={headingClasses.h1}>{headingContent}</h1>;
        case "h2": return <h2 key={key} className={headingClasses.h2}>{headingContent}</h2>;
        case "h3": return <h3 key={key} className={headingClasses.h3}>{headingContent}</h3>;
        case "h4": return <h4 key={key} className={headingClasses.h4}>{headingContent}</h4>;
        case "h5": return <h5 key={key} className={headingClasses.h5}>{headingContent}</h5>;
        case "h6": return <h6 key={key} className={headingClasses.h6}>{headingContent}</h6>;
        default: return <h2 key={key} className={headingClasses.h2}>{headingContent}</h2>;
      }

    case "link":
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
        <ListTag key={key} className={listClass}>
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
        <blockquote key={key} className="border-s-4 border-primary ps-4 my-4 italic text-muted-foreground">
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

    case "linebreak":
      return <br key={key} />;

    default:
      // Handle unknown node types by rendering children if they exist
      if (node.children) {
        return (
          <div key={key}>
            {node.children.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
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
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="lexical-content">
      {parsedContent.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}

