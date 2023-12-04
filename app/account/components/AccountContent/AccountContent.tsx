"use client";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const AccountContent = () => {
  const router = useRouter();

  const { isLoaded, user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded && !user) {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="mb-7 px-6">
      <div className="flex flex-col gap-y-4">
        <p>
          You are currently on <b>Spotify Premium Plan</b>
        </p>
        <Button className="w-[300px]" disabled={isLoading}>
          Open Customer Portal
        </Button>
      </div>
    </div>
  );
};

export default AccountContent;
