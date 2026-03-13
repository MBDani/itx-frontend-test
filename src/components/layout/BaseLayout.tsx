import { Outlet } from "react-router-dom";
import { Smartphone, ExternalLink } from "lucide-react";
import { Header } from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";

export const BaseLayout = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      <Header />

      <main className="flex-1 flex flex-col">
        <Breadcrumbs />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col animate-in fade-in duration-500">
          <Outlet />
          {/* Dynamic routes injection (PLP / PDP) */}
        </div>
      </main>

      {/* Rich Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">
                  MobiStore
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Premium smartphones and mobile tech delivered to your doorstep.
              </p>
            </div>

            {/* Shop column */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Shop
              </h4>
              <ul className="space-y-2 text-sm text-slate-500">
                {["New Releases", "Tablets", "Wearables", "Accessories"].map(
                  (item) => (
                    <li key={item}>
                      <span className="hover:text-primary transition-colors cursor-default">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Support column */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-slate-500">
                {[
                  "Track Order",
                  "Returns Policy",
                  "Privacy",
                  "Help Center",
                ].map((item) => (
                  <li key={item}>
                    <span className="hover:text-primary transition-colors cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter column */}
            <div>
              <h4 className="mb-4 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  className="flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-white hover:bg-primary/90 transition-opacity"
                  aria-label="Subscribe"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} MobiStore — ITX Frontend Test. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
