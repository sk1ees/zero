'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Workflow, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const pathname = usePathname();

  const workspaceMatch = pathname.match(/^\/w\/([^/]+)/);
  const workspaceId = workspaceMatch ? workspaceMatch[1] : undefined;

  const dashboardHref = workspaceId ? `/w/${workspaceId}` : '/dashboard';
  const flowsHref = workspaceId ? `/w/${workspaceId}/f` : '/flow';
  const settingsHref = '/settings';

  const navigation = [
    {
      name: 'Dashboard',
      href: dashboardHref,
      icon: LayoutDashboard,
      current: pathname === dashboardHref
    },
    {
      name: 'Flow Editor',
      href: flowsHref,
      icon: Workflow,
      current: pathname === flowsHref || pathname.startsWith(`${flowsHref}/`)
    },
    {
      name: 'Settings',
      href: settingsHref,
      icon: Settings,
      current: pathname === settingsHref
    }
  ];

  return (
    <nav className="flex space-x-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              item.current
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
