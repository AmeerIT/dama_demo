# Appwrite Database Setup Guide

This guide provides step-by-step instructions for manually setting up the Appwrite database, tables (collections), and storage buckets for the Dama Productions CMS.

## Prerequisites

- An Appwrite project created (Project ID: `694beec300098b09a52c`)
- Access to the Appwrite Console
- Admin permissions for the project

## Database Setup

### Step 1: Create Database

1. Navigate to **Databases** in the Appwrite Console
2. Click **Create Database**
3. Enter the following:
   - **Database ID**: `dama_db`
   - **Name**: `Dama Productions Database`
4. Click **Create**

## Table (Collection) Setup

### Table 1: `posts`

**Purpose**: Store blog posts with dual-language support

#### Create Collection

1. In the `dama_db` database, click **Create Collection**
2. Enter:
   - **Collection ID**: `posts`
   - **Name**: `Posts`
3. Click **Create**

#### Set Permissions

1. Go to the **Settings** tab
2. Under **Permissions**, add:
   - **Read**: `any` (public access)
   - **Create**: `users` (authenticated users)
   - **Update**: `users` (authenticated users)
   - **Delete**: `users` (authenticated users)

#### Create Attributes

Go to the **Attributes** tab and create the following:

| Attribute ID | Type | Size | Required | Default | Array |
|-------------|------|------|----------|---------|-------|
| `slug_ar` | String | 255 | ✓ | - | - |
| `slug_en` | String | 255 | ✓ | - | - |
| `title_ar` | String | 500 | ✓ | - | - |
| `title_en` | String | 500 | ✓ | - | - |
| `excerpt_ar` | String | 1000 | - | - | - |
| `excerpt_en` | String | 1000 | - | - | - |
| `body_ar` | String | 100000 | ✓ | - | - |
| `body_en` | String | 100000 | ✓ | - | - |
| `featured_image` | String | 255 | - | - | - |
| `published_at` | DateTime | - | ✓ | - | - |
| `is_published` | Boolean | - | ✓ | `false` | - |
| `status` | String | 20 | ✓ | `draft` | - |
| `keywords` | String | 100 | - | - | ✓ |
| `tags` | String | 255 | - | - | ✓ |
| `author_id` | String | 255 | - | - | - |

**Note**: Wait for each attribute to show status "available" before creating the next one.

#### Create Indexes

Go to the **Indexes** tab and create:

| Index ID | Type | Attributes | Unique |
|----------|------|------------|--------|
| `idx_slug_ar` | Unique | `slug_ar` | ✓ |
| `idx_slug_en` | Unique | `slug_en` | ✓ |
| `idx_is_published` | Key | `is_published` | - |
| `idx_published_at` | Key | `published_at` | - |
| `idx_status` | Key | `status` | - |

---

### Table 2: `services`

**Purpose**: Store service pages with dual-language support

#### Create Collection

1. Click **Create Collection**
2. Enter:
   - **Collection ID**: `services`
   - **Name**: `Services`
3. Click **Create**

#### Set Permissions

Same as `posts` table:
- **Read**: `any`
- **Create/Update/Delete**: `users`

#### Create Attributes

| Attribute ID | Type | Size | Required | Default |
|-------------|------|------|----------|---------|
| `slug_ar` | String | 255 | ✓ | - |
| `slug_en` | String | 255 | ✓ | - |
| `title_ar` | String | 500 | ✓ | - |
| `title_en` | String | 500 | ✓ | - |
| `description_ar` | String | 2000 | ✓ | - |
| `description_en` | String | 2000 | ✓ | - |
| `content_ar` | String | 100000 | - | - |
| `content_en` | String | 100000 | - | - |
| `icon` | String | 50 | ✓ | - |
| `image` | String | 255 | - | - |
| `order` | Integer | - | ✓ | `0` |
| `is_active` | Boolean | - | ✓ | `true` |

#### Create Indexes

| Index ID | Type | Attributes | Unique |
|----------|------|------------|--------|
| `idx_slug_ar` | Unique | `slug_ar` | ✓ |
| `idx_slug_en` | Unique | `slug_en` | ✓ |
| `idx_is_active` | Key | `is_active` | - |
| `idx_order` | Key | `order` | - |

---

### Table 3: `tags`

**Purpose**: Store tags for blog post categorization

#### Create Collection

1. Click **Create Collection**
2. Enter:
   - **Collection ID**: `tags`
   - **Name**: `Tags`
3. Click **Create**

#### Set Permissions

Same as `posts` table:
- **Read**: `any`
- **Create/Update/Delete**: `users`

#### Create Attributes

| Attribute ID | Type | Size | Required |
|-------------|------|------|----------|
| `name_ar` | String | 100 | ✓ |
| `name_en` | String | 100 | ✓ |
| `slug` | String | 100 | ✓ |

#### Create Indexes

| Index ID | Type | Attributes | Unique |
|----------|------|------------|--------|
| `idx_slug` | Unique | `slug` | ✓ |
| `idx_name_en` | Key | `name_en` | - |

---

### Table 4: `fonts`

**Purpose**: Store custom font metadata

#### Create Collection

1. Click **Create Collection**
2. Enter:
   - **Collection ID**: `fonts`
   - **Name**: `Fonts`
3. Click **Create**

#### Set Permissions

Same as `posts` table:
- **Read**: `any`
- **Create/Update/Delete**: `users`

#### Create Attributes

| Attribute ID | Type | Size | Required |
|-------------|------|------|----------|
| `name` | String | 200 | ✓ |
| `file_id` | String | 255 | ✓ |
| `family` | String | 100 | ✓ |
| `weight` | String | 50 | ✓ |
| `style` | String | 50 | ✓ |

#### Create Indexes

| Index ID | Type | Attributes | Unique |
|----------|------|------------|--------|
| `idx_family` | Key | `family` | - |
| `idx_name` | Key | `name` | - |

---

## Storage Buckets Setup

### Bucket 1: `images`

**Purpose**: Store featured images for posts and services

1. Navigate to **Storage** in the Appwrite Console
2. Click **Create Bucket**
3. Enter:
   - **Bucket ID**: `images`
   - **Name**: `images`
4. Configure settings:
   - **Maximum File Size**: `10485760` (10 MB)
   - **Allowed File Extensions**: `jpg`, `jpeg`, `png`, `gif`, `webp`, `svg`
   - **Compression**: `none`
   - **Encryption**: `enabled`
   - **Antivirus**: `enabled`
   - **File Security**: `disabled` (public read access)
5. Set Permissions:
   - **Read**: `any`
   - **Create/Update/Delete**: `users`
6. Click **Create**

---

### Bucket 2: `media`

**Purpose**: Store uploaded media files from CMS

1. Click **Create Bucket**
2. Enter:
   - **Bucket ID**: `media`
   - **Name**: `media`
3. Configure settings:
   - **Maximum File Size**: `52428800` (50 MB)
   - **Allowed File Extensions**: `jpg`, `jpeg`, `png`, `gif`, `webp`, `svg`, `pdf`, `mp4`, `mov`, `mp3`
   - **Compression**: `none`
   - **Encryption**: `enabled`
   - **Antivirus**: `enabled`
   - **File Security**: `disabled` (public read access)
4. Set Permissions:
   - **Read**: `any`
   - **Create/Update/Delete**: `users`
5. Click **Create**

---

### Bucket 3: `fonts`

**Purpose**: Store custom font files

1. Click **Create Bucket**
2. Enter:
   - **Bucket ID**: `fonts`
   - **Name**: `fonts`
3. Configure settings:
   - **Maximum File Size**: `314572800` (300 MB)
   - **Allowed File Extensions**: `ttf`, `woff`, `woff2`, `otf`
   - **Compression**: `none`
   - **Encryption**: `enabled`
   - **Antivirus**: `enabled`
   - **File Security**: `disabled` (public read access)
4. Set Permissions:
   - **Read**: `any`
   - **Create/Update/Delete**: `users`
5. Click **Create**

---

## Verification

After completing the setup:

1. **Verify Database**:
   - Check that `dama_db` database exists
   - Verify all 4 collections are present

2. **Verify Tables**:
   - Check each collection has all required attributes
   - Verify all indexes are created
   - Confirm permissions are set correctly

3. **Verify Buckets**:
   - Check all 3 buckets exist
   - Verify bucket settings match specifications
   - Test uploading a file to each bucket

## Troubleshooting

### Attribute Creation Fails

- Ensure previous attributes are in "available" status before creating new ones
- Check attribute size limits (Appwrite has maximum size limits)
- Verify attribute names don't conflict with reserved names

### Index Creation Fails

- Ensure the attribute exists and is "available"
- For unique indexes, ensure no duplicate values exist
- Wait a few seconds between index creations

### Bucket Creation Fails

- Verify bucket ID is unique
- Check file size limits are within Appwrite's maximum
- Ensure allowed extensions are valid file types

### Permission Issues

- Verify `users` role exists in your Appwrite project
- Check that authentication is properly configured
- Ensure API keys have proper permissions

## Next Steps

1. Test the CMS by creating a test post
2. Upload a test image to verify bucket functionality
3. Create a test service to verify all fields work
4. Test tag creation and association with posts

## Automated Setup Alternative

If you prefer automated setup, you can use the setup script:

```bash
# Set required environment variables
export APPWRITE_API_KEY="your-api-key"
export NEXT_PUBLIC_APPWRITE_ENDPOINT="https://api.center-phone.com.io/v1"
export NEXT_PUBLIC_APPWRITE_DATABASE_ID="dama_db"

# Run the setup script
npx tsx scripts/setup-appwrite.ts
```

See `scripts/setup-appwrite.ts` for the automated setup script.

