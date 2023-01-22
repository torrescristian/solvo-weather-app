import { useEffect } from "react";
import { Workbox } from "workbox-window";

export default function useSWRegister () {
  useEffect(() => {
    const fn = async () => {
      if (!("serviceWorker" in navigator)) {
        console.log('serviceWorker does not exists on navigator')
        return;
      }
      const wb = new Workbox("/sw.js");

      await wb.register();

      try {
        const swVersion = await wb.messageSW({ type: "GET_VERSION" });
        console.log("Service Worker version:", swVersion);
      } catch (error) {
        console.error(error)
      }
    };

    fn();
  }, []);
}
