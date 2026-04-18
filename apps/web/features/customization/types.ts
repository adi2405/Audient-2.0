import { z } from "zod";
import { widgetSettingsSchema } from "./form-schemas";

export type FormSchema = z.infer<typeof widgetSettingsSchema>;
