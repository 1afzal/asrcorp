import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, BarChart3, Package, Inbox, Upload } from 'lucide-react';
import { clearToken, getAdminEmail, isAuthenticated } from '../../utils/auth';
import ThemeToggle from '../ui/ThemeToggle';

const TABS = [
  { to: '/admin', label: 'Products', icon: Package, exact: true },
  { to: '/admin/orders', label: 'Orders', icon: Inbox },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/import', label: 'Import', icon: Upload },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = getAdminEmail();
  const authed = isAuthenticated();

  const signOut = () => {
    clearToken();
    navigate('/admin/login', { replace: true });
  };

  // Hide tabs on the login screen
  const showTabs = authed && !location.pathname.startsWith('/admin/login');

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen text-foreground">
      {authed && (
        <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <nav className="glass-nav flex h-12 flex-1 items-center justify-between gap-4 rounded-pill pl-4 pr-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-overlay/10 text-foreground">
                  <ShieldCheck size={14} />
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Softwaresellr Admin
                </span>
              </div>

              {showTabs && (
                <div className="hidden items-center gap-1 md:flex">
                  {TABS.map((t) => {
                    const active = isActive(t.to, t.exact);
                    return (
                      <NavLink
                        key={t.to}
                        to={t.to}
                        end={t.exact}
                        className={[
                          'flex h-8 items-center gap-1.5 rounded-pill px-3 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                          active
                            ? 'bg-overlay/10 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                            : 'text-muted-foreground hover:bg-overlay/5 hover:text-foreground',
                        ].join(' ')}
                      >
                        <t.icon size={12} />
                        {t.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-2">
                {email && (
                  <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>
                )}
                <ThemeToggle className="!h-8 !w-8" />
                <button
                  onClick={signOut}
                  className="flex h-8 items-center gap-1.5 rounded-pill border border-overlay/10 bg-overlay/5 px-3 text-xs text-muted-foreground transition-colors hover:bg-overlay/10 hover:text-foreground"
                >
                  <LogOut size={12} />
                  Sign out
                </button>
              </div>
            </nav>
          </div>

          {showTabs && (
            <div className="-mx-4 mt-2 overflow-x-auto px-4 md:hidden">
              <div className="mx-auto flex max-w-6xl gap-1">
                {TABS.map((t) => {
                  const active = isActive(t.to, t.exact);
                  return (
                    <NavLink
                      key={t.to}
                      to={t.to}
                      end={t.exact}
                      className={[
                        'flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill px-3 text-xs font-medium tracking-tight transition-all duration-200 ease-apple',
                        active
                          ? 'glass-nav text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      ].join(' ')}
                    >
                      <t.icon size={12} />
                      {t.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </header>
      )}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
