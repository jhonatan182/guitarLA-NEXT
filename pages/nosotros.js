import Image from 'next/future/image';
import Layout from '../components/layout';
import styles from '../styles/nosotros.module.css';

export default function Nosotros() {
    return (
        <Layout
            title="Nosotros"
            description="Sobre nosotros GuitarLA, tienda de musica"
        >
            <main className="contenedor">
                <h1 className="heading">Nosotros</h1>

                <div className={styles.contenido}>
                    <Image
                        src={'/img/nosotros.jpg'}
                        width={1000}
                        height={800}
                        alt="Imagen sobre nosotros"
                    />
                    <div>
                        <p>
                            Sed ac gravida est. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac
                            turpis egestas. Donec id auctor urna. Nulla eget
                            suscipit tellus. Vestibulum luctus ipsum eu risus
                            commodo dictum mattis eu leo. Duis fermentum at
                            tortor quis dignissim. Cras porta magna vel ultrices
                            molestie.
                        </p>
                        <p>
                            Quisque sed diam et lacus pharetra convallis quis
                            laoreet mi. Nam et molestie massa. Sed dignissim
                            justo et accumsan efficitur. Vestibulum ante ipsum
                            primis in faucibus orci luctus et ultrices posuere
                            cubilia curae; Sed vitae purus risus. Curabitur
                            pretium est orci, vel ultrices ligula lobortis a.
                            Vestibulum ante ipsum primis in faucibus orci luctus
                            et ultrices posuere cubilia curae; Nunc semper sem
                            non neque suscipit, ac vehicula lacus hendrerit.
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
