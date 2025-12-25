"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
  date: string;
  locale?: string;
}

export function FormattedDate({ date, locale = "en-US" }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    // Format the date only on the client side to avoid hydration mismatch
    const formatted = new Intl.DateTimeFormat(locale === "ar" ? "ar-IQ" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
    setFormattedDate(formatted);
  }, [date, locale]);

  // Render the raw date initially, then the formatted version after hydration
  return <>{formattedDate || new Date(date).toLocaleDateString()}</>;
}
