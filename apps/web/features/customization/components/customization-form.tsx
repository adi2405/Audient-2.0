import { toast } from "sonner";
import { useMutation } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormSchema } from "../types";
import { VapiFormFields } from "./vapi-form-fields";
import { Input } from "@workspace/ui/components/input";
import { widgetSettingsSchema } from "../form-schemas";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { Separator } from "@workspace/ui/components/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";

type WidgetSettings = Doc<"widgetSettings">;

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

export function CustomizationForm({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) {
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<FormSchema>({
    resolver: zodResolver(widgetSettingsSchema),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hello there! How may I assist you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings.assistantId || "",
        phoneNumber: initialData?.vapiSettings.phoneNumber || "",
      },
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const vapiSettings: WidgetSettings["vapiSettings"] = {
        assistantId:
          values.vapiSettings.assistantId === "none"
            ? ""
            : values.vapiSettings.assistantId,
        phoneNumber:
          values.vapiSettings.phoneNumber === "none"
            ? ""
            : values.vapiSettings.phoneNumber,
      };

      await upsertWidgetSettings({
        greetMessage: values.greetMessage,
        defaultSuggestions: values.defaultSuggestions,
        vapiSettings,
      });

      toast.success("Widget settings saved");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>General Chat Settings</CardTitle>
          <CardDescription>
            Configure basic chat widget behavior and messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="greetMessage"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="greeting-message">
                    Greeting Message
                  </FieldLabel>
                  <FieldDescription>
                    The first message customers see when they open the chat
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="greeting-message"
                    aria-invalid={fieldState.invalid}
                    placeholder="Welcome message"
                    rows={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Separator />
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm">Default Suggestions</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Quick reply suggestions shown to customers to help guide the
                  conversation
                </p>
                <div className="space-y-4">
                  <Controller
                    name="defaultSuggestions.suggestion1"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="suggestion-1">
                          Suggestion 1
                        </FieldLabel>
                        <Input
                          {...field}
                          id="suggestion-1"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g., How do I get started?"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="defaultSuggestions.suggestion2"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="suggestion-2">
                          Suggestion 2
                        </FieldLabel>
                        <Input
                          {...field}
                          id="suggestion-2"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g., What are your pricing plans?"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="defaultSuggestions.suggestion3"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="suggestion-3">
                          Suggestion 3
                        </FieldLabel>
                        <Input
                          {...field}
                          id="suggestion-3"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g., I need help with my account."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
      {hasVapiPlugin && (
        <Card>
          <CardHeader>
            <CardTitle>Voice Assistant Settings</CardTitle>
            <CardDescription>
              Configure voice calling features powered by Vapi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <VapiFormFields form={form} />
          </CardContent>
        </Card>
      )}
      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Save Settings
        </Button>
      </div>
    </form>
  );
};
