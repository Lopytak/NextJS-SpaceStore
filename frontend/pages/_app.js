import '../styles/global.css'
import { helvetica } from "../public/fonts/fonts";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import CartProvider from "../providers/CartProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

export default function MyApp({ Component, PageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <main className={ helvetica.className }>
                    <Component { ...PageProps }/>
                </main>
            </CartProvider>
        </QueryClientProvider>
    )
}
