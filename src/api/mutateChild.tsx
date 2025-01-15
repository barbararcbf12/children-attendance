import { API_URL, ACCESS_TOKEN } from "../constants/api";
import type { ApiMutationResponse } from "../types/api";

export const checkInChild: (
  id: string
) => Promise<ApiMutationResponse> = async (id) => {
  const date = new Date();
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();

  // Pad the hours and minutes with leading zeros if necessary
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  const pickupTime = `${hours}:${minutes}`;

  try {
    const response = await fetch(
      `${API_URL}v2/children/${id}/checkins?accessToken=${ACCESS_TOKEN}&pickupTime=${pickupTime}`,
      { method: "POST" }
    );
    if (!response.ok)
      throw new Error("Network response was not ok. Please try again later.");
    return await response.json();
  } catch (error) {
    console.error("POST error on check in:", error);
    return null;
  }
};

export const checkOutChild: (
  id: string
) => Promise<ApiMutationResponse> = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}v2/children/${id}/checkout?accessToken=${ACCESS_TOKEN}`,
      { method: "POST" }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("POST error on check out:", error);
    return null;
  }
};
