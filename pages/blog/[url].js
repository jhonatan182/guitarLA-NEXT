import Image from 'next/future/image';
import Layout from '../../components/layout';
import { formatearFecha } from '../../helpers';
import styles from '../../styles/blog.module.css';

export default function Blog({ post }) {
    const { titulo, contenido, imagen, url, publishedAt } = post.attributes;

    return (
        <Layout title={titulo}>
            <article className={`${styles.post} ${styles['mt-3']}`}>
                <Image
                    src={imagen.data.attributes.url}
                    width={1000}
                    height={600}
                    alt={`Imagen ${titulo}`}
                />

                <div className={styles.contenido}>
                    <h3>{titulo}</h3>
                    <p className={styles.fecha}>
                        {formatearFecha(publishedAt)}
                    </p>
                    <p className={styles.texto}>{contenido}</p>
                </div>
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const urlFetch = `${process.env.API_URL}/posts`;

    try {
        const respuesta = await fetch(urlFetch);
        const { data: posts } = await respuesta.json();

        const paths = posts.map((post) => ({
            params: { url: post.attributes.url },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.log(error);
    }
}

export async function getStaticProps({ params: { url } }) {
    const urlFetch = `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`;

    try {
        const respuesta = await fetch(urlFetch);
        const { data } = await respuesta.json();

        return {
            props: {
                post: data[0],
            },
        };
    } catch (error) {
        console.log(error);
    }
}

// export async function getServerSideProps({ params: { url } }) {
//     const urlFetch = `http://localhost:1337/api/posts?filters[url]=${url}&populate=imagen`;

//     try {
//         const respuesta = await fetch(urlFetch);
//         const { data } = await respuesta.json();

//         return {
//             props: {
//                 post: data[0],
//             },
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }
