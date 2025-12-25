# Debug Guide - Services/Blogs Disappearing Issue

## 🔍 What I Added

I've added comprehensive logging to track exactly what's happening when data disappears:

### Logging Tags:
- `[POSTS]` - Blog posts fetching
- `[POST]` - Individual blog post fetching
- `[SERVICES]` - Services listing fetching
- `[SERVICE]` - Individual service fetching
- `[TAGS]` - Tag data fetching

---

## 🚀 Steps to Debug

### 1. Rebuild Docker Image
```bash
# On your deployment machine
cd /path/to/dama_demo

# Rebuild with new logging
docker-compose build

# Start with fresh container
docker-compose up -d

# Watch logs in real-time
docker-compose logs -f app
```

### 2. Test the Issue
Open your browser and:
1. Visit `https://demo.center-phone.com/en` (main page)
2. Check if services appear
3. Visit `/en/blog` (blog listing)
4. Check if blogs appear
5. Wait 2-3 minutes (for ISR revalidation)
6. Refresh pages and see if content disappears

### 3. Check Logs During This Process
In another terminal, monitor logs:
```bash
# Watch all activity
docker-compose logs -f app

# Filter for errors only
docker-compose logs -f app | grep -E "(ERROR|Critical|Failed)"

# Filter for specific components
docker-compose logs -f app | grep "\[SERVICES\]"
docker-compose logs -f app | grep "\[POSTS\]"
docker-compose logs -f app | grep "\[TAGS\]"
```

---

## 📊 What to Look For

### ✅ **Successful Logs** (what you SHOULD see):
```
[SERVICES] Fetching services with limit: 100
[SERVICES] Successfully fetched 6 services
[POSTS] Successfully fetched 1 posts
[TAGS] Fetching all tags
[TAGS] Successfully fetched 1 tags
[POST] Successfully fetched post: t
```

### ❌ **Error Scenarios**:

#### Scenario 1: Connection Timeout
```
[SERVICES] Critical error fetching services: FetchError: request to https://api.center-phone.com/v1/... failed
[SERVICES] Error details: {
  "code": "ECONNREFUSED",
  "errno": -111,
  "syscall": "connect"
}
```
**Diagnosis:** Appwrite server unreachable from Docker container
**Fix:** Check network connectivity, verify APPWRITE_ENDPOINT in docker-compose.yml

#### Scenario 2: Rate Limiting
```
[SERVICES] Critical error fetching services: AppwriteException
[SERVICES] Error details: {
  "code": 429,
  "message": "Rate limit exceeded"
}
```
**Diagnosis:** Too many requests to Appwrite
**Fix:** Increase ISR revalidation time from 60s to 300s (5 minutes)

#### Scenario 3: Tag Fetching Failure
```
[POSTS] Failed to fetch tags, continuing without tag data: AppwriteException
```
**Diagnosis:** Tags table connection issue (but posts still work)
**Fix:** Check tags table permissions in Appwrite

#### Scenario 4: Silent Empty Response
```
[SERVICES] Successfully fetched 0 services
```
**Diagnosis:** Query returned no results (possible database issue)
**Fix:** Check `is_active` field in Appwrite dashboard

---

## 🔧 Quick Fixes Based on Logs

### Fix 1: Increase Revalidation Time (if rate limiting)
Edit these files and change `revalidate: 60` to `revalidate: 300`:
- `app/[lang]/page.tsx`
- `app/[lang]/blog/page.tsx`
- `app/[lang]/services/page.tsx`
- `app/[lang]/blog/[slug]/page.tsx`
- `app/[lang]/services/[slug]/page.tsx`
- `app/[lang]/tags/[slug]/page.tsx`

```typescript
// Change from:
export const revalidate = 60;

// To:
export const revalidate = 300; // 5 minutes
```

### Fix 2: Add Connection Retry Logic
If seeing connection timeouts, we can add retry logic to Appwrite client.

### Fix 3: Disable Tag Fetching Temporarily
If tags are causing issues, we can serve posts without tag data (already handled gracefully).

---

## 📋 Share These With Me

After running the debug steps, please share:

1. **First Visit Logs** (when it works):
```bash
docker-compose logs app | grep -E "\[SERVICES\]|\[POSTS\]" | head -20
```

2. **After Disappearing Logs** (when it fails):
```bash
docker-compose logs app | grep -E "\[SERVICES\]|\[POSTS\]" | tail -30
```

3. **All Errors**:
```bash
docker-compose logs app | grep -i "critical\|error" | tail -50
```

4. **Current Appwrite Endpoint**:
```bash
docker-compose exec app env | grep APPWRITE
```

---

## 🎯 Expected Output

**On Docker Start:**
```
[TAGS] Fetching all tags
[TAGS] Successfully fetched 1 tags
[SERVICES] Fetching services with limit: 3
[SERVICES] Successfully fetched 6 services
[POSTS] Successfully fetched 3 posts
```

**On Page Visit:**
```
[SERVICE] Fetching service with slug: new-media-services
[SERVICE] Successfully fetched service: new-media-services
```

**On ISR Revalidation (after 60s):**
```
[SERVICES] Fetching services with limit: 100
[SERVICES] Successfully fetched 6 services
```

---

## 🆘 If Still Stuck

If logs don't reveal the issue, we can:
1. Add request timing logs
2. Add connection pool monitoring
3. Add Appwrite client health checks
4. Switch from ISR to full static generation temporarily
5. Add a simple HTTP health endpoint to verify Appwrite connectivity

Let me know what you find in the logs! 🔍
