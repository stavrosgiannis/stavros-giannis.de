/**
 * Service Worker Registration
 * Enables offline support and caching strategies
 */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          if (process.env.NODE_ENV !== "production") {
            console.log("Service Worker registered:", registration);
          }

          // Check for updates when the user returns to the tab (avoids interval leak)
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
              registration.update();
            }
          });
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Service Worker registration failed:", error);
          }
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
}

const serviceWorkerAPI = {
  registerServiceWorker,
  unregisterServiceWorker,
};

export default serviceWorkerAPI;
