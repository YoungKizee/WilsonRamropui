"use client";

import { useState, useEffect } from "react";

export default function useDetectBrowser() {
  const [browser, setBrowser] = useState<string>("Unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Firefox") > -1) {
      setBrowser("Firefox");
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
      setBrowser("SamsungBrowser");
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      setBrowser("Opera");
    } else if (userAgent.indexOf("Trident") > -1) {
      setBrowser("Internet Explorer");
    } else if (userAgent.indexOf("Edge") > -1) {
      setBrowser("Edge");
    } else if (userAgent.indexOf("Chrome") > -1) {
      setBrowser("Chrome");
    } else if (userAgent.indexOf("Safari") > -1) {
      setBrowser("Safari");
    } else {
      setBrowser("Unknown");
    }
  }, []);

  return browser;
}
