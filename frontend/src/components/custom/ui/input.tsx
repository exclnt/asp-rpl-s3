import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'flex flex-row w-[500px] h-fit items-center justify-between p-[10px] rounded-[10px] bg-[#151419] border-2 border-[#27272A] text-[15px] outline-none capitalize',
                className
            )}
            {...props}
        />
    );
}

export { Input };
