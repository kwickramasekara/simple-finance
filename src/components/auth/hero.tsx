import Logo from "@/components/common/logo";

export default function Hero() {
  return (
    <div className="hidden lg:block border-r">
      <div className="flex items-center justify-center h-screen">
        <div className="grid gap-4 text-center">
          <Logo size="lg" align="center" />
          <h1 className="text-4xl font-semibold">Simple Finance</h1>
          <p className="text-muted-foreground">
            The home of your personal finance
          </p>
        </div>
      </div>
    </div>
  );
}
