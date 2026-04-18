"use client";

import { BotIcon } from "lucide-react";

import { useVapiAssistants } from "../hooks/use-vapi-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

export function VapiAssistantsTab() {
  const { data: assistants, isLoading } = useVapiAssistants();

  return (
    <div className="border-t bg-background">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4 text-center">Assistants</TableHead>
            <TableHead className="px-6 py-4 text-center">Model</TableHead>
            <TableHead className="px-6 py-4 text-center">
              First Message
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Loading assistants...
                  </TableCell>
                </TableRow>
              );
            }
            if (assistants.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No assistants configured.
                  </TableCell>
                </TableRow>
              );
            }

            return assistants.map((assistant) => (
              <TableRow key={assistant.id} className="hover:bg-muted/50">
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <BotIcon className="size-4 text-muted-foreground" />
                    <span>{assistant.name || "Anonymous assistant"}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <span className="text-sm">
                    {assistant.model?.model || "Not configured"}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs px-6 py-4 text-center">
                  <p className="truncate text-sm text-muted-foreground">
                    {assistant.firstMessage || "No geeting configured"}
                  </p>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
}
