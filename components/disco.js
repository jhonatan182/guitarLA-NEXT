import Image from 'next/future/image';
import Link from 'next/link';
import { formatearDinero } from '../helpers';
import styles from '../styles/discos.module.css';

function Disco({ disco }) {
    const { titulo, imagen, descripcion, precio, url } = disco.attributes;
    console.log(imagen.data.attributes.formats.small.url);

    return (
        <div className={styles.discos}>
            <Image
                width={600}
                height={400}
                src={imagen.data.attributes.formats.small.url}
                alt={`Caratula del disco ${titulo}`}
            />

            <div className={styles.contenido}>
                <h3>{titulo}</h3>
                <p className={styles.descripcion}>{descripcion}</p>
                <p className={styles.precio}>{formatearDinero(precio)}</p>
                <Link href={`/discos/${url}`}>
                    <a className={styles.enlace}>Ver Disco</a>
                </Link>
            </div>
        </div>
    );
}

export default Disco;
