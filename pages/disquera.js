import Layout from '../components/layout';
import Disco from '../components/disco';
import styles from '../styles/grid.module.css';

function Discos({ discos }) {
    return (
        <Layout title="Disquera">
            <main className="contenedor">
                <h1 className="heading">Nuestros Discos</h1>

                <div className={styles.grid}>
                    {discos.map((disco) => (
                        <Disco key={disco.id} disco={disco} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.API_URL}/discos?populate=imagen`);
    const discos = await res.json();

    return {
        props: {
            discos: discos.data,
        },
    };
}

export default Discos;
