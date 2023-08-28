import '../styles/global.css'
import { helvetica } from "../fonts/fonts";

export default function MyApp({ Component, PageProps }) {
    return (
        <main className={ helvetica.className }>
            <Component { ...PageProps }/>
        </main>
    )
}
