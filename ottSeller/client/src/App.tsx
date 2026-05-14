import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandMenu from './components/ui/CommandMenu';
import AdminLayout from './components/admin/AdminLayout';
import { usePageTracking } from './hooks/usePageTracking';
import { useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin bundle is lazy-loaded so public visitors never download it. Vite splits
// each `lazy(() => import(…))` into its own chunk automatically.
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminNewProduct = lazy(() => import('./pages/AdminNewProduct'));
const AdminEditProduct = lazy(() => import('./pages/AdminEditProduct'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminImport = lazy(() => import('./pages/AdminImport'));

function PublicLayout() {
  usePageTracking();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandMenu />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminFallback() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-20 sm:px-6">
      <div className="glass rounded-lg px-6 py-4 text-sm text-muted-foreground">Loading…</div>
    </div>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? 'rgba(28, 28, 30, 0.72)' : 'rgba(255, 255, 255, 0.85)',
          color: isDark ? '#F5F5F7' : '#0A0A0A',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
          borderRadius: '12px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif',
          fontSize: '13px',
          letterSpacing: '-0.01em',
          padding: '10px 14px',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: isDark
            ? '0 1px 0 0 rgba(255, 255, 255, 0.1) inset, 0 20px 60px -20px rgba(0, 0, 0, 0.6)'
            : '0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 20px 60px -20px rgba(0, 0, 0, 0.15)',
        },
        success: {
          iconTheme: {
            primary: '#30D158',
            secondary: isDark ? '#1C1C1E' : '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF453A',
            secondary: isDark ? '#1C1C1E' : '#FFFFFF',
          },
        },
      }}
    />
  );
}

// Reset the scroll position on every in-app navigation so a product link
// clicked from halfway down the listing doesn't open the detail page at the
// same scroll offset. Browser Back/Forward (POP) is left alone so its native
// scroll restoration still works.
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, navigationType]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ThemedToaster />
      <Routes>
        {/* Admin routes — own layout, no public Navbar/Footer/CommandMenu, no nav links anywhere. */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<AdminFallback />}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminOrders />
              </Suspense>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminAnalytics />
              </Suspense>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminNewProduct />
              </Suspense>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminEditProduct />
              </Suspense>
            }
          />
          <Route
            path="/admin/import"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminImport />
              </Suspense>
            }
          />
        </Route>

        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
