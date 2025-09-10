import lineClamp from "@tailwindcss/line-clamp";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  plugins: [typography, lineClamp],
} satisfies Config;
