import { AppSidebar } from '@/components/app-sidebar';
import HBread from '@/components/custom/HBread';
import { Button } from '@/components/custom/ui/buttons';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Iconify from '@/components/custom/ui/Iconify';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className={`${inter.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="border-2 border-sidebar-accent bg-background">
            <header className="flex flex-row shrink-0 w-full h-fit items-center justify-between p-[15px]">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1 " />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <HBread />
              </div>

              <div className='flex flex-row w-fit h-fit gap-[10px] p-[10px] justify-end'>
                <Button
                  variant="desktop_header"
                  font="desktop">
                  <Iconify icon="tabler:notification" />
                  Notification
                </Button>
                <Button
                  variant="desktop_header"
                  font="desktop">
                  <Iconify icon="material-symbols:logout" />
                  Logout
                </Button>
              </div>

            </header>
            <hr className="w-full border border-[#27272A]" />
            <div className=" gap-4 p-4 pt-0">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
