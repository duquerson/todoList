/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl = process.env.VITE_URL;
const supabaseKey = process.env.VITE_SERVICE_ROL;
if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase URL or Key");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
