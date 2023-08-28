import classNames from "@/utils/classNames";
import { Footer, Header } from "@/components/Layout";
import { AdminBar, useGlobals } from "cloakwp";

export function Layout({ children }) {
  const { pageData, isPreview, previewParams } = useGlobals()

  return (
    <div
      className="flex flex-col min-h-screen"
    >
      <AdminBar
        isPreview={isPreview}
        previewParams={previewParams}
        pageData={pageData}
      />
      <Header />
      <main className={classNames("w-full max-w-none overflow-hidden min-h-[300px]")}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
