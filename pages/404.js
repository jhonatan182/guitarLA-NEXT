import Link from 'next/link';
import Layout from '../components/layout';

export default function Error() {
    return (
        <Layout title="Guitarra No encontrada">
            <h1 className="heading">Guiatarra no encontrada</h1>

            <Link href="/">
                <a className="error404">Volver al Inicio</a>
            </Link>
        </Layout>
    );
}
