import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  FileText,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  ListTodo,
  Clock,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useUserRoles } from '@/hooks/useUserRoles';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/tasks', icon: ListTodo, label: 'Tasks & Projects' },
  { href: '/admin/time', icon: Clock, label: 'Time Tracking' },
  { href: '/admin/clients', icon: UserCircle, label: 'Clients' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/suppliers', icon: Truck, label: 'Suppliers' },
  { href: '/admin/reports', icon: FileText, label: 'Reports' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isLoading: authLoading } = useAuth();
  const { isAdmin, isManager, isLoading: rolesLoading } = useUserRoles();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect if not authenticated or not admin/manager
  useEffect(() => {
    if (!authLoading && !rolesLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin && !isManager) {
        navigate('/');
      }
    }
  }, [user, isAdmin, isManager, authLoading, rolesLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || (!isAdmin && !isManager)) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 border-b px-4", collapsed && "justify-center")}>
          <Link to="/admin" className="flex items-center gap-2">
            <span className={cn("text-2xl font-bold font-serif", collapsed && "hidden")}>
              LULU Admin
            </span>
            {collapsed && <span className="text-xl font-bold">L</span>}
          </Link>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/admin' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full justify-start", collapsed && "justify-center px-2")}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full justify-start text-destructive hover:text-destructive", collapsed && "justify-center px-2")}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
