import Layout from '../components/layout';
import Post from '../components/post';
import styles from '../styles/grid.module.css';

export default function Blog({ posts }) {
    return (
        <Layout
            title="Blog"
            description="Blog sobre cursos, consejos de GuitarLA"
        >
            <main className="contenedor">
                <h1 className="heading">Blog</h1>

                <div className={styles.grid}>
                    {posts?.map((post) => (
                        <Post post={post.attributes} key={post.id} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

export async function getStaticProps() {
    const url = `${process.env.API_URL}/posts?populate=imagen`;

    try {
        const respuesta = await fetch(url);
        const { data: posts } = await respuesta.json();

        return {
            props: {
                posts,
            },
        };
    } catch (error) {
        console.log(error);
    }
}
