"use client";

import { useEffect, useState } from "react";
import { listTags, type Tag } from "@/lib/appwrite/cms-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsInput({ value, onChange }: TagsInputProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadTags() {
      try {
        const result = await listTags();
        setTags(result.documents);
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    }
    loadTags();
  }, []);

  const selectedTags = tags.filter((tag) => value.includes(tag.$id));

  const toggleTag = (tagId: string) => {
    if (value.includes(tagId)) {
      onChange(value.filter((id) => id !== tagId));
    } else {
      onChange([...value, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    onChange(value.filter((id) => id !== tagId));
  };

  return (
    <div className="space-y-2">
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.$id}
              variant="secondary"
              className="gap-1 pr-1"
            >
              {tag.name_en}
              <button
                type="button"
                onClick={() => removeTag(tag.$id)}
                className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Tag Selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {value.length > 0 ? `${value.length} tag(s) selected` : "Select tags..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="max-h-64 overflow-y-auto">
            {tags.length > 0 ? (
              <div className="p-1">
                {tags.map((tag) => (
                  <button
                    key={tag.$id}
                    type="button"
                    onClick={() => toggleTag(tag.$id)}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors",
                      value.includes(tag.$id)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value.includes(tag.$id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{tag.name_en}</span>
                    <span className="text-muted-foreground text-xs">({tag.name_ar})</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No tags available
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

