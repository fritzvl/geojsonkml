import dynamic from 'next/dynamic';
import MyComponent from "@/app/map";

const DynamicMapContainer = dynamic(
    () => import('@/app/map'),
    { ssr: false }  // This line is important. It disables server-side render for this component.
);

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <DynamicMapContainer />
            </div>
        </main>
    );
}