import { Controller, UseFormReturn } from "react-hook-form";

import { FormSchema } from "../types";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/features/plugins/hooks/use-vapi-data";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

interface VapiFormFieldsProps {
  form: UseFormReturn<FormSchema>;
}

export function VapiFormFields({ form }: VapiFormFieldsProps) {
  const { data: assistants = [], isLoading: assistantsLoading } =
    useVapiAssistants();
  const { data: phoneNumbers = [], isLoading: phoneNumbersLoading } =
    useVapiPhoneNumbers();

  const disabled = form.formState.isSubmitting;

  return (
    <>
      <Controller
        control={form.control}
        name="vapiSettings.assistantId"
        render={({ field, fieldState }) => {
          const assistantExists = assistants.some((a) => a.id === field.value);

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Voice Assistant</FieldLabel>
              <FieldDescription>
                The Vapi assistant to use for voice calls
              </FieldDescription>

              <FieldContent>
                <Select
                  disabled={assistantsLoading || disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue
                      placeholder={
                        assistantsLoading
                          ? "Loading assistants..."
                          : "Select an assistant"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent position="popper">
                    {assistantsLoading && field.value && !assistantExists && (
                      <SelectItem value={field.value}>
                        Loading assistants...
                      </SelectItem>
                    )}

                    <SelectItem value="none">None</SelectItem>

                    {assistants.map((assistant) => (
                      <SelectItem key={assistant.id} value={assistant.id}>
                        {assistant.name || "Anonymous Assistant"} -{" "}
                        {assistant.model?.model || "Unknown Model"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          );
        }}
      />

      <Controller
        control={form.control}
        name="vapiSettings.phoneNumber"
        render={({ field, fieldState }) => {
          const phoneNumberExists = phoneNumbers.some(
            (p) => (p.number || p.id) === field.value
          );

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Display Phone Numbers</FieldLabel>
              <FieldDescription>
                Phone number to display in the widget
              </FieldDescription>

              <FieldContent>
                <Select
                  disabled={phoneNumbersLoading || disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue
                      placeholder={
                        phoneNumbersLoading
                          ? "Loading phone numbers..."
                          : "Select a phone number"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent position="popper">
                    {phoneNumbersLoading &&
                      field.value &&
                      !phoneNumberExists && (
                        <SelectItem value={field.value}>
                          Loading phone numbers...
                        </SelectItem>
                      )}

                    <SelectItem value="none">None</SelectItem>

                    {phoneNumbers.map((phone) => (
                      <SelectItem
                        key={phone.id}
                        value={phone.number || phone.id}
                      >
                        {phone.number || "Anonymous"} -{" "}
                        {phone.name || "Unknown"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          );
        }}
      />
    </>
  );
}
