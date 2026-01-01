import { DefaultProps } from "@/lib/default-props";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface HeaderComponentProps extends DefaultProps {
    title?: string;
    subtitle?: string;
    target: string;
}


export function HeaderComponent({ dictionary, lang, title, subtitle, target }: HeaderComponentProps) {
    const isRTL = lang === "ar";
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    return (
        <div className="max-w-7xl mx-auto overflow-y-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        {title}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        {subtitle}
                    </p>
                </div>
                <Link href={`/${lang}/${target}`}>
                    <Button variant="outline" className="group">
                        {dictionary.common.viewAll}
                        <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
