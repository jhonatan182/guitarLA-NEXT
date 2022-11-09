export const formatearDinero = (cantidad) => {
    const nuevaCantidad = Number(cantidad);

    return nuevaCantidad.toLocaleString('HNL', {
        style: 'currency',
        currency: 'HNL',
    });
};

export const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);

    return nuevaFecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
};
