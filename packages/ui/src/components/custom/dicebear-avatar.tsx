"use client";

import { useMemo } from "react";
import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { cn } from "@workspace/ui/lib/utils";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
  badgeClassName?: string;
}

export const DicebearAvatar = ({
  seed,
  size = 32,
  className,
  imageUrl,
  badgeImageUrl,
  badgeClassName,
}: DicebearAvatarProps) => {
  const avatarSrc = useMemo(() => {
    if (imageUrl) {
      return imageUrl;
    }

    const avatar = createAvatar(glass, {
      seed: seed.toLowerCase().trim(),
      size,
    });

    return avatar.toDataUri();
  }, [seed, size, imageUrl]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{
        width: size,
        height: size,
      }}
    >
      {imageUrl ? (
        <div
          className={cn(className)}
          style={{
            width: size,
            height: size,
          }}
        >
          <img
            src={avatarSrc}
            alt="Avatar"
            width={size}
            height={size}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <Avatar
          className={cn("border", className)}
          style={{
            width: size,
            height: size,
          }}
        >
          <AvatarImage src={avatarSrc} alt="Avatar" />
        </Avatar>
      )}
      {badgeImageUrl && (
        <div
          className={cn(
            "absolute right-0 bottom-0 flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <img
            src={badgeImageUrl}
            alt="Badge"
            height={badgeSize}
            width={badgeSize}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
