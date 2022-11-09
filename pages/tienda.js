import Layout from '../components/layout';
import Guitarra from '../components/guitarra';
import styles from '../styles/grid.module.css';

export default function Tienda({ guitarras }) {
    return (
        <Layout title="Tienda" description="Coleccion de guitarras GuitarLA">
            <main className="contenedor">
                <h1 className="heading">Nuestra Coleccion</h1>

                <div className={styles.grid}>
                    {guitarras?.map((guitarra) => (
                        <Guitarra
                            guitarra={guitarra.attributes}
                            key={guitarra.id}
                        />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps() {
    try {
        const url = `${process.env.API_URL}/guitarras?populate=imagen`;
        const respuesta = await fetch(url);
        const { data: guitarras } = await respuesta.json();

        return {
            props: {
                guitarras,
            },
        };
    } catch (error) {
        console.log(error);
    }
}
// export async function getStaticProps() {
//     try {
//         const url = `${process.env.API_URL}/guitarras?populate=imagen`;
//         const respuesta = await fetch(url);
//         const { data: guitarras } = await respuesta.json();

//         return {
//             props: {
//                 guitarras,
//             },
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }
