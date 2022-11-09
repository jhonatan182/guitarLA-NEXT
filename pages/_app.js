import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { toast } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];

        setCarrito(carritoLS);
    }, []);

    const agregarCarrito = (guitarra) => {
        if (
            carrito?.some((guitarraState) => guitarraState.id === guitarra.id)
        ) {
            const carritoActualizado = carrito.map((guitarraState) => {
                if (guitarraState.id === guitarra.id) {
                    guitarraState.cantidad = guitarra.cantidad;
                }
                return guitarraState;
            });

            setCarrito(carritoActualizado);
            toast.success('Cambios guardados correctamente');
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            setCarrito([...carrito, guitarra]);
            toast.success('Agregado al carrito');
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    };

    const actualizarCantidad = (guitarra) => {
        const carritoActualizado = carrito?.map((guitarraState) => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad;
            }
            return guitarraState;
        });

        setCarrito(carritoActualizado);
        toast.success('Cambios guardados correctamente');
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito?.filter(
            (guitarraState) => guitarraState.id !== id
        );

        setCarrito(carritoActualizado);
        toast.success('Guitarra eliminada de tu carrito');
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    return (
        <Component
            {...pageProps}
            agregarCarrito={agregarCarrito}
            carrito={carrito}
            actualizarCantidad={actualizarCantidad}
            eliminarGuitarra={eliminarGuitarra}
        />
    );
}

export default MyApp;
