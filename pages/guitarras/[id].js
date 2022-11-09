import { useState } from 'react';
import Image from 'next/future/image';
import Layout from '../../components/layout';
import styles from '../../styles/guitarras.module.css';
import { formatearDinero } from '../../helpers';
import { toast } from 'react-toastify';

export default function Guitarra({ guitarra, agregarCarrito }) {
    //states
    const [cantidad, setCantidad] = useState(0);

    const { nombre, descripcion, imagen, precio } = guitarra[0].attributes;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cantidad < 1) {
            toast.error('Cantidad no valida');
            return;
        }

        //construir un objeto
        const guitarraAlmacenada = {
            id: guitarra[0].id,
            imagen: imagen.data.attributes.url,
            cantidad,
            nombre,
            precio,
        };

        //? pasando la informacion al context
        agregarCarrito(guitarraAlmacenada);
    };
    return (
        <Layout title={`Guitarra ${nombre}`}>
            <div className={styles.guitarra}>
                <Image
                    src={imagen.data.attributes.url}
                    alt={`Imagen guitarra ${nombre}`}
                    width={600}
                    height={400}
                />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>{formatearDinero(precio)}</p>

                    <form onSubmit={handleSubmit} className={styles.formulario}>
                        <label htmlFor="cantidad">Cantidad</label>
                        <select
                            id="cantidad"
                            onChange={(e) =>
                                setCantidad(Number(e.target.value))
                            }
                        >
                            <option value="0">-- Seleccione --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <input type="submit" value="Agregar al carrito" />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    try {
        const respuesta = await fetch(`${process.env.API_URL}/guitarras`);
        const { data } = await respuesta.json();

        const paths = data.map((guitarra) => ({
            params: { id: guitarra.attributes.url },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.log(error);
    }
}

export async function getStaticProps({ params: { id } }) {
    try {
        const urlApi = `${process.env.API_URL}/guitarras?filters[url]=${id}&populate=imagen`;

        const respuesta = await fetch(urlApi);
        const { data: guitarra } = await respuesta.json();

        return {
            props: {
                guitarra,
            },
        };
    } catch (error) {
        console.log(error);
    }
}

// export async function getServerSideProps({ params: { id } }) {
//     try {
//         const url = `${process.env.API_URL}/guitarras?filters[url]=${id}&populate=imagen`;

//         const respuesta = await fetch(url);
//         const { data: guitarra } = await respuesta.json();

//         return {
//             props: {
//                 guitarra: guitarra[0]['attributes'],
//             },
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }
