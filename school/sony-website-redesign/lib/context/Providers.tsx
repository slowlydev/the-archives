"use client";

import { ReactNode } from "react";
import { ScreenSizeProvider } from "./ScreenSizeProvider";

export default function Providers({ children }: { children: ReactNode }) {
	return <ScreenSizeProvider>{children}</ScreenSizeProvider>;
}
