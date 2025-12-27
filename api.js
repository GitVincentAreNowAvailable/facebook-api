import { ACCESS_TOKEN, BASE_URL } from "./config.js";

export async function getUserData(userId) {
  const fields = [
    "id",
    "name",
    "birthday",
    "hometown",
    "location",
    "likes",
    "events",
    "photos",
    "videos",
    "friends",
    "posts",
    "gender",
    "link",
    "age_range",
    "email",
    "picture"
  ].join(",");

  const url = `${BASE_URL}/${userId}?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  // Handle 401 Unauthorized Error - Invalid Token
  if (response.status === 401 || response.status === 400) {
    if (data?.error?.code === 190) {
      throw new Error("❌ Error 401 (Unauthorized): Invalid or missing access token. Please add a valid token in config.js from https://developers.facebook.com/tools/explorer");
    }
  }

  if (!response.ok) {
    const errorMsg = data?.error?.message || "Facebook API request failed";
    throw new Error(`Error ${response.status}: ${errorMsg}`);
  }

  return data;
}

export async function getPagePosts(pageId) {
  const url = `${BASE_URL}/${pageId}/posts?fields=message,created_time&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  // Handle 401 Unauthorized Error - Invalid Token
  if (response.status === 401 || response.status === 400) {
    if (data?.error?.code === 190) {
      throw new Error("❌ Error 401 (Unauthorized): Invalid or missing access token. Please add a valid token in config.js from https://developers.facebook.com/tools/explorer");
    }
  }

  if (!response.ok) {
    const errorMsg = data?.error?.message || "Facebook API request failed";
    throw new Error(`Error ${response.status}: ${errorMsg}`);
  }

  return data;
}
