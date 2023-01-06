import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/future/image';
import Layout from '../../components/layout';
import styles from '../../styles/discos.module.css';
import { formatearDinero } from '../../helpers';

function Disco({ disco, agregarCarrito }) {
    //state
    const [cantidad, setCantidad] = useState(0);

    const { titulo, descripcion, precio, imagen, url } = disco.attributes;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cantidad < 1) {
            toast.error('Cantidad no valida');
            return;
        }

        const discoSeleccionado = {
            id: url,
            precio,
            titulo,
            imagen: imagen.data.attributes.url,
            cantidad,
        };

        agregarCarrito(discoSeleccionado);
    };

    return (
        <Layout
            title={`Disco ${titulo}`}
            description="GuitarLa - Venta de guitarras, discos y curso sobre musica"
        >
            <div className={styles.discos}>
                <Image
                    src={imagen.data.attributes.url}
                    alt={`Imagen guitarra ${titulo}`}
                    width={600}
                    height={400}
                />

                <div className={styles.contenido}>
                    <h3>{titulo}</h3>
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

export default Disco;

export async function getServerSideProps({ params: { url } }) {
    const urlApi = `${process.env.API_URL}/discos?filters[url]=${url}&populate=imagen`;

    const respuesta = await fetch(urlApi);
    const { data: disco } = await respuesta.json();

    return {
        props: { disco: disco[0] },
    };
}
