/* eslint-disable no-undef */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
const supabaseUrl = process.env.VITE_URL;
const supabaseKey = process.env.VITE_SERVICE_ROL;

export const supabase = createClient(supabaseUrl, supabaseKey);
