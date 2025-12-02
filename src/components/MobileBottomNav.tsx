/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Clover,
  Film,
  Home,
  Search,
  Star,
  Tv,
  Swords,
  MessageCircleHeart,
  MountainSnow,
  VenetianMask,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // 引入 useSearchParams
import { useEffect, useState, useMemo } from 'react'; // 引入 useMemo 和 useSearchParams
import { useSite } from './SiteProvider';

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

interface MobileBottomNavProps {
  activePath?: string;
}

const MobileBottomNav = ({ activePath: propActivePath }: MobileBottomNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // 获取查询参数
  const { siteName } = useSite();

  // 1. 优先使用传入的 activePath，否则根据当前路由动态生成完整路径
  const currentActivePath = useMemo(() => {
    if (propActivePath) {
      return propActivePath;
    }
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [propActivePath, pathname, searchParams]);


  const [navItems, setNavItems] = useState<NavItem[]>([
    { icon: Home, label: '首页', href: '/' },
    { icon: Search, label: '搜索', href: '/search' },
    { icon: Film, label: '电影', href: '/douban?type=movie' },
    { icon: Tv, label: '剧集', href: '/douban?type=tv' },
    { icon: Clover, label: '综艺', href: '/douban?type=show' },
    { icon: Swords, label: '美剧', href: '/douban?type=tv&tag=美剧' },
    { icon: MessageCircleHeart, label: '韩剧', href: '/douban?type=tv&tag=韩剧' },
    { icon: MountainSnow, label: '日剧', href: '/douban?type=tv&tag=日剧' },
    { icon: VenetianMask, label: '日漫', href: '/douban?type=tv&tag=日本动画' },
  ]);

  // 根据 siteName 追加“打赏作者”
  useEffect(() => {
    if (siteName !== 'MoonTV') {
      setNavItems((prev) => {
        if (prev.some((item) => item.href === '/donate')) return prev;
        return [...prev, { icon: Github, label: '打赏作者', href: '/donate' }];
      });
    }
  }, [siteName]);

  // 根据 runtimeConfig 追加“自定义”
  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;
    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      setNavItems((prevItems) => {
        if (prevItems.some((item) => item.href === '/douban?type=custom')) {
          return prevItems;
        }
        return [...prevItems, { icon: Star, label: '自定义', href: '/douban?type=custom' }];
      });
    }
  }, []);

  // 2. 简化的 isActive 判断逻辑
  const isActive = (href: string) => {
    // 直接比较解码后的完整 URL
    return decodeURIComponent(currentActivePath) === decodeURIComponent(href);
  };

  return (
    <nav
      className='md:hidden fixed left-0 right-0 z-[600] bg-white/90 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden dark:bg-gray-900/80 dark:border-gray-700/50'
      style={{
        bottom: 0,
        paddingBottom: 'env(safe-area-inset-bottom)',
        minHeight: 'calc(3.5rem + env(safe-area-inset-bottom))',
      }}
    >
      <ul className='flex items-center overflow-x-auto scrollbar-hide'>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <li
              key={item.href}
              className='flex-shrink-0'
              style={{ width: '20vw', minWidth: '20vw' }}
            >
              <Link
                href={item.href}
                className='flex flex-col items-center justify-center w-full h-14 gap-1 text-xs'
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    active
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
                <span
                  className={`transition-colors duration-200 ${
                    active
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
