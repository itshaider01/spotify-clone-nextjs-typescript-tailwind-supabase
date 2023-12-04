"use client";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

type SpotifyTokenProps = {
  children: React.ReactNode;
};

const SpotifyToken = ({ children }: SpotifyTokenProps) => {
  const { user } = useUser();

  const router = useRouter();

  const CLIENT_ID = "9313baaa3a2f49378b849b9ec21fd9d5";

  const REDIRECT_URI = "http://localhost:3000";

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

  const RESPONSE_TYPE = "token";

  //   useEffect(() => {
  //     if (user) {
  //       router.push(
  //         `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
  //       );
  //     }
  //     return;
  //   });

  return <>{children}</>;
};

export default SpotifyToken;
