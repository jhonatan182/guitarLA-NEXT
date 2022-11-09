import { useEffect, useState } from 'react';
import Image from 'next/future/image';
import Layout from '../components/layout';
import { formatearDinero } from '../helpers';
import styles from '../styles/carrito.module.css';

export default function Carrito({
    carrito,
    actualizarCantidad,
    eliminarGuitarra,
}) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalPagar = carrito?.reduce(
            (total, guitarraState) =>
                guitarraState.precio * guitarraState.cantidad + total,
            0
        );

        setTotal(totalPagar);
    }, [carrito]);

    return (
        <Layout
            title="Carrito"
            description="Carrito de compras de GuitarLa- Tienda de musica y venta de instrumentos"
        >
            <main className="contenedor">
                <h1 className="heading">Carrito</h1>

                <div className={styles.contenido}>
                    <div className={styles.carrito}>
                        <h2>Productos</h2>

                        {carrito?.length === 0
                            ? 'Carrito Vacio'
                            : carrito?.map((producto) => (
                                  <div
                                      key={producto.id}
                                      className={styles.producto}
                                  >
                                      <div>
                                          <Image
                                              src={producto.imagen}
                                              width={250}
                                              height={480}
                                              alt={producto.nombre}
                                          />
                                      </div>

                                      <div>
                                          <p className={styles.nombre}>
                                              {producto.nombre}
                                          </p>

                                          <div className={styles.cantidad}>
                                              <label htmlFor="cantidad">
                                                  Cantidad:
                                              </label>
                                              <select
                                                  className={styles.select}
                                                  id="cantidad"
                                                  value={producto.cantidad}
                                                  onChange={(e) =>
                                                      actualizarCantidad({
                                                          cantidad:
                                                              e.target.value,
                                                          id: producto.id,
                                                      })
                                                  }
                                              >
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                              </select>
                                          </div>

                                          <p className={styles.precio}>
                                              Precio:
                                              <span>
                                                  {formatearDinero(
                                                      producto.precio
                                                  )}
                                              </span>
                                          </p>
                                          <p className={styles.subtotal}>
                                              Subtotal:
                                              <span>
                                                  {formatearDinero(
                                                      producto.precio *
                                                          producto.cantidad
                                                  )}
                                              </span>
                                          </p>
                                      </div>
                                      <button
                                          onClick={() =>
                                              eliminarGuitarra(producto.id)
                                          }
                                          className={styles.btn_eliminar}
                                          type="button"
                                      >
                                          X
                                      </button>
                                  </div>
                              ))}
                    </div>

                    <aside className={styles.resumen}>
                        <h3>Resumen del pedido</h3>
                        <p>Total a pagar: {formatearDinero(total)} </p>
                    </aside>
                </div>
            </main>
        </Layout>
    );
}
