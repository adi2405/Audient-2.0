import Image from "next/image";

export function CoversationsView() {
  return (
    <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted p-4 text-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-2">
        <Image src={"/logo.svg"} alt="Logo" height={40} width={40} />
        <p className="text-lg font-semibold md:text-xl">Audient</p>
        <p className="text-muted-foreground">
          Click on the conversation to get started.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground/60">
          Copyright &copy; 2025-2026 Audient. All rights reserved.
        </p>
      </div>
    </div>
  );
}
