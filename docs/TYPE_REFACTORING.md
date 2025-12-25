# Type System Refactoring

## Problem
Types were scattered across multiple files with duplicate declarations:
- `Post`, `Service`, `Tag` types declared in 3 different places
- Inconsistent field naming (`id` vs `$id`)
- Confusion about which file to import from

## Solution
All types are now centralized in **`lib/appwrite/types.ts`** - the single source of truth.

## Type Organization

### Public Types (Frontend)
Used in the public-facing website. Use clean `id` field instead of Appwrite's `$id`:

```typescript
import type { Post, Service, Tag, Font } from "@/lib/appwrite/types";
```

### CMS Types (Admin Panel)
Used in the admin dashboard. Include Appwrite metadata fields (`$id`, `$createdAt`, `$updatedAt`):

```typescript
import type { CMSPost, CMSService, CMSTag, CMSFont } from "@/lib/appwrite/types";
```

### Form Data Types
For creating/updating entities (without Appwrite metadata):

```typescript
import type { PostFormData, ServiceFormData } from "@/lib/appwrite/types";
```

## Import Patterns

### Option 1: Direct Import from types.ts (Recommended)
```typescript
import type { Post, Service, CMSPost } from "@/lib/appwrite/types";
```

### Option 2: Import from specific modules (Backward Compatible)
```typescript
import type { Post } from "@/lib/appwrite/posts";
import type { Service } from "@/lib/appwrite/services";
import type { CMSPost } from "@/lib/appwrite/cms-data";
```

### Option 3: Import from centralized index (Future)
```typescript
import type { Post, Service, CMSPost } from "@/lib/appwrite";
```

## Migration Guide

### Before:
```typescript
// Multiple inconsistent declarations
import { type Post } from "@/lib/appwrite/posts";
import { type Post } from "@/lib/appwrite/cms-data"; // ❌ Different!
```

### After:
```typescript
import type { Post, CMSPost } from "@/lib/appwrite/types";
```

## Type Mapping

| Collection | Public Type | CMS Type | Form Data Type |
|-----------|-------------|----------|----------------|
| Posts | `Post` | `CMSPost` | `PostFormData` |
| Services | `Service` | `CMSService` | `ServiceFormData` |
| Tags | `Tag` | `CMSTag` | N/A |
| Fonts | `Font` | `CMSFont` | N/A |

## Key Differences

### Public Types vs CMS Types

**Public Types** (e.g., `Post`):
- Use `id` field
- No `$createdAt`, `$updatedAt`
- Cleaner for frontend consumption

**CMS Types** (e.g., `CMSPost`):
- Use `$id` field (Appwrite convention)
- Include `$createdAt`, `$updatedAt`
- Match raw Appwrite document structure

## Files Modified

1. **Created**: `lib/appwrite/types.ts` - All type definitions
2. **Created**: `lib/appwrite/index.ts` - Centralized exports
3. **Updated**: `lib/appwrite/posts.ts` - Imports from types.ts
4. **Updated**: `lib/appwrite/services.ts` - Imports from types.ts
5. **Updated**: `lib/appwrite/tags.ts` - Imports from types.ts
6. **Updated**: `lib/appwrite/cms-data.ts` - Imports from types.ts
7. **Updated**: All components and pages importing types

## Benefits

✅ Single source of truth for all types
✅ No more duplicate declarations
✅ Clear distinction between public and CMS types
✅ Easier to maintain and update
✅ Better TypeScript IntelliSense
✅ Backward compatible (re-exports from old locations)
