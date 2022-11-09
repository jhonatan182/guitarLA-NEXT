import Layout from '../components/layout';
import Guitarra from '../components/guitarra';
import Post from '../components/post';
import Curso from '../components/curso';
import styles from '../styles/grid.module.css';

export default function Home({ guitarras, posts, curso }) {
    return (
        <Layout
            title={'Inicio'}
            description="Blog de musica, venta de guitarras y mas"
        >
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

            <Curso curso={curso} />

            <section className="contenedor">
                <h1 className="heading">Blog</h1>

                <div className={styles.grid}>
                    {posts?.map((post) => (
                        <Post post={post.attributes} key={post.id} />
                    ))}
                </div>
            </section>
        </Layout>
    );
}

export async function getServerSideProps() {
    const urlGuitarras = `${process.env.API_URL}/guitarras?populate=imagen`;
    const urlPosts = `${process.env.API_URL}/posts?populate=imagen`;
    const urlCurso = `${process.env.API_URL}/curso?populate=imagen`;
    try {
        const [resGuitarras, resPosts, resCurso] = await Promise.all([
            fetch(urlGuitarras),
            fetch(urlPosts),
            fetch(urlCurso),
        ]);

        const [{ data: guitarras }, { data: posts }, { data: curso }] =
            await Promise.all([
                resGuitarras.json(),
                resPosts.json(),
                resCurso.json(),
            ]);

        return {
            props: {
                guitarras,
                posts,
                curso,
            },
        };
    } catch (error) {
        console.log(error);
    }
}
