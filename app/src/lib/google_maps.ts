export const load_google_maps = (() => {
  let is_loaded = false;

  return () => {
    if (is_loaded) {
      return;
    }

    ((g: Record<string, string>) => {
      let h: Promise<void> | undefined;
      let a: HTMLScriptElement | undefined;
      let k: string;
      const p = "The Google Maps JavaScript API";
      const c = "google";
      const l = "importLibrary";
      const q = "__ib__";
      const m = document;
      let b = ((window as unknown) as Record<string, unknown>)[c] as Record<string, unknown> | undefined;
      b = b || (((window as unknown) as Record<string, unknown>)[c] = {});
      const d = (b.maps as Record<string, unknown>) || (b.maps = {} as Record<string, unknown>);
      const r = new Set<string>();
      const e = new URLSearchParams();
      const u = () =>
        h ||
        (h = new Promise<void>(async (f, n) => {
          a = m.createElement("script");
          e.set("libraries", [...r].join(","));
          for (k in g) {
            e.set(
              k.replace(/[A-Z]/g, (t: string) => "_" + t[0].toLowerCase()),
              g[k]
            );
          }
          e.set("callback", c + ".maps." + q);
          if (a) {
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => {
              n(Error(p + " could not load."));
            };
            a.nonce = (m.querySelector("script[nonce]") as HTMLScriptElement)?.nonce || "";
            m.head.append(a);
          }
        }));
      if (d[l]) {
        console.warn(p + " only loads once. Ignoring:", g);
      } else {
        d[l] = (f: string, ...n: string[]) => {
          r.add(f);
          return u().then(() => {
            const importLib = d[l] as (f: string, ...n: string[]) => Promise<unknown>;
            return importLib(f, ...n);
          });
        };
      }
    })({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      v: "weekly",
    });

    is_loaded = true;
  };
})();
