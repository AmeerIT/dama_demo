"use client"

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@base-ui/react";

export default function Page() {
    return (
        <div className="px-4 sm:px-6">
            <Empty className="border">
                <EmptyHeader>
                    We are still filming
                    <EmptyTitle>
                        <EmptyDescription>
                            Nothing here yet
                        </EmptyDescription>
                    </EmptyTitle >
                    <EmptyContent>
                        have an idea?
                        <Button className="bg-primary text-5xl p-20 text-white rounded-2xl">
                            Submit it
                        </Button>
                    </EmptyContent>
                </EmptyHeader>
            </Empty>
        </div>
    )
}
