import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
const driveApiKey = process.env.GOOGLE_DRIVE_API_KEY;
const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

if (!driveApiKey || !rootFolderId) {
    throw new Error("GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_ROOT_FOLDER_ID are required");
}

const requestCache = new Map();

app.get("/api/folders", async (_request, response) => {
    try {
        const folders = await getDriveFiles(
            `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
            "name"
        );
        response.json(folders);
    } catch (error) {
        sendDriveError(response, error);
    }
});

app.get("/api/folders/:folderId/files", async (request, response) => {
    try {
        const files = await getDriveFiles(
            `'${request.params.folderId}' in parents and mimeType contains 'image/'`,
            "createdTime desc"
        );
        response.json(files);
    } catch (error) {
        sendDriveError(response, error);
    }
});

async function getDriveFiles(query, orderBy) {
    const cacheKey = `${query}:${orderBy}`;
    if (requestCache.has(cacheKey)) return requestCache.get(cacheKey);

    const params = new URLSearchParams({
        key: driveApiKey,
        q: query,
        fields: "files(id,name,mimeType)",
        orderBy,
    });
    const request = fetch(`https://www.googleapis.com/drive/v3/files?${params}`)
        .then(async (driveResponse) => {
            if (!driveResponse.ok) {
                throw new Error(`Google Drive request failed: ${driveResponse.status}`);
            }
            const data = await driveResponse.json();
            return data.files ?? [];
        });

    requestCache.set(cacheKey, request);
    return request;
}

function sendDriveError(response, error) {
    console.error(error);
    response.status(502).json({ error: "Unable to retrieve Google Drive data" });
}

app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
});
