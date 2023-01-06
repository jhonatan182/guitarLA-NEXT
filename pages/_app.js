import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { toast } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    //solucion al localstorage con next  react 18
    const carritoLS =
        typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem('carrito')) ?? []
            : [];

    //state
    const [carrito, setCarrito] = useState(carritoLS);
    const [paginaLista, setPaginaLista] = useState(false);

    //solucionando el error de la hidratracion
    useEffect(() => {
        setPaginaLista(true);
    }, []);

    //actualizar LS cada que carrito cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarCarrito = (producto) => {
        //verificar si un producto ya existe en el carrito
        if (
            carrito?.some((productoState) => productoState.id === producto.id)
        ) {
            const carritoActualizado = carrito.map((productoState) => {
                if (productoState.id === producto.id) {
                    productoState.cantidad = producto.cantidad;
                }
                return productoState;
            });

            setCarrito(carritoActualizado);
            toast.success('Cambios guardados correctamente');
        } else {
            setCarrito([...carrito, producto]);
            toast.success('Agregado al carrito');
        }
    };

    const actualizarCantidad = (producto) => {
        const carritoActualizado = carrito?.map((productoState) => {
            if (productoState.id === producto.id) {
                productoState.cantidad = producto.cantidad;
            }
            return productoState;
        });

        setCarrito(carritoActualizado);
        toast.success('Cambios guardados correctamente');
    };

    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito?.filter(
            (productoState) => productoState.id !== id
        );

        setCarrito(carritoActualizado);
        toast.success('Producto eliminado de tu carrito');
    };

    //aqui usando el state de pagina lista
    return paginaLista ? (
        <Component
            {...pageProps}
            agregarCarrito={agregarCarrito}
            carrito={carrito}
            actualizarCantidad={actualizarCantidad}
            eliminarGuitarra={eliminarGuitarra}
        />
    ) : null;
}

export default MyApp;
